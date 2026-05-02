import {
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Quaternion,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders/glTF';
import RAPIER from '@dimforge/rapier3d-compat';
import { FollowCamera2D } from '../camera/FollowCamera2D';
import { GameStateReporter } from '../app/state';
import { RaycastBike } from '../vehicle/RaycastBike';
import { StuntTracker } from '../systems/StuntTracker';
import type { PlayerInputState } from '../types/Input';
import type { GameHud } from '../ui/GameHud';

interface Collectible {
  mesh: Mesh;
  kind: 'coin' | 'chest';
  collected: boolean;
}

const START = new Vector3(-18, 2.4, 0);
const FINISH_X = 31;

export class WarehouseLevel {
  readonly scene: Scene;
  private world?: RAPIER.World;
  private bike?: RaycastBike;
  private cameraRig?: FollowCamera2D;
  private readonly stuntTracker = new StuntTracker();
  private readonly collectibles: Collectible[] = [];
  private readonly smokePuffs: Mesh[] = [];
  private elapsed = 0;
  private coins = 0;
  private exp = 0;
  private checkpoint = false;
  private finished = false;
  private crashed = false;
  private recentlyGrounded = true;
  private readonly mats: Record<string, StandardMaterial> = {};

  constructor(
    engine: Engine,
    private readonly canvas: HTMLCanvasElement,
    private readonly input: PlayerInputState,
    private readonly hud: GameHud,
  ) {
    this.scene = new Scene(engine);
  }

  async load(): Promise<void> {
    await RAPIER.init();
    this.world = new RAPIER.World({ x: 0, y: -18, z: 0 });
    this.setupScene();
    this.createMaterials();
    this.createWarehouse();
    this.createTrack();
    this.createProps();
    await this.createAssetProps();
    this.createCollectibles();
    this.bike = new RaycastBike(this.scene, this.world, START);
    this.cameraRig = new FollowCamera2D(this.scene.activeCamera as FreeCamera);
    this.stuntTracker.begin(0);
  }

  update(deltaMs: number): void {
    if (!this.world || !this.bike) return;
    const dt = Math.min(deltaMs / 1000, 1 / 30);
    if (this.input.restartPressed) this.restart();
    if (this.input.pausePressed) {
      this.input.pausePressed = false;
      return;
    }
    if (!this.finished && !this.crashed) {
      this.elapsed += dt;
      this.bike.update(dt, this.input);
      this.world.timestep = dt;
      this.world.step();
      this.bike.afterPhysics();
      this.updateGameplay();
    }
    this.animateScene(dt);
    this.scene.render();
  }

  private setupScene(): void {
    this.scene.clearColor = new Color4(0.05, 0.06, 0.07, 1);
    this.scene.fogMode = Scene.FOGMODE_EXP;
    this.scene.fogColor = new Color3(0.12, 0.13, 0.13);
    this.scene.fogDensity = 0.022;
    const camera = new FreeCamera('side-follow-camera', new Vector3(-12, 8, -24), this.scene);
    camera.setTarget(new Vector3(-8, 3, 0));
    camera.fov = 0.72;
    this.scene.activeCamera = camera;
    camera.attachControl(this.canvas, true);

    new HemisphericLight('warehouse-ambient', new Vector3(0, 1, 0), this.scene).intensity = 0.45;
    const key = new DirectionalLight('warm-spotlight-wash', new Vector3(-0.35, -0.8, 0.45), this.scene);
    key.position = new Vector3(-8, 18, -12);
    key.intensity = 1.8;
  }

  private createMaterials(): void {
    const mat = (name: string, color: Color3, rough = 0.8): StandardMaterial => {
      const material = new StandardMaterial(name, this.scene);
      material.diffuseColor = color;
      material.specularColor = Color3.White().scale(1 - rough);
      this.mats[name] = material;
      return material;
    };
    mat('brick', new Color3(0.45, 0.18, 0.12));
    mat('darkBrick', new Color3(0.24, 0.1, 0.08));
    mat('wood', new Color3(0.58, 0.34, 0.16));
    mat('dirt', new Color3(0.32, 0.23, 0.17));
    mat('container', new Color3(0.86, 0.26, 0.1));
    mat('crate', new Color3(0.5, 0.31, 0.15));
    mat('metal', new Color3(0.42, 0.46, 0.48), 0.35);
    mat('coin', new Color3(1, 0.72, 0.08), 0.25);
    mat('checkpoint', new Color3(0.2, 0.85, 1), 0.35);
    mat('finish', new Color3(0.95, 0.9, 0.75), 0.45);
    mat('smoke', new Color3(0.62, 0.65, 0.66), 0.95).alpha = 0.28;
  }

  private createWarehouse(): void {
    this.box('floor', new Vector3(70, 1, 10), new Vector3(7, -1.2, 0), this.mats.dirt, true);
    for (let i = 0; i < 18; i += 1) {
      const x = -24 + i * 4;
      const wall = this.box(`brick-wall-${i}`, new Vector3(3.8, 7, 0.45), new Vector3(x, 3, 3.25), this.mats.brick, false);
      wall.material = i % 2 ? this.mats.brick : this.mats.darkBrick;
    }
    for (let i = 0; i < 7; i += 1) {
      this.pipe(-20 + i * 8, 6.8, 2.82);
      const lamp = MeshBuilder.CreateSphere(`spotlight-${i}`, { diameter: 0.35 }, this.scene);
      lamp.position = new Vector3(-21 + i * 8.5, 7.2, -1.8);
      lamp.material = this.mats.finish;
    }
  }

  private createTrack(): void {
    const pieces: Array<[string, Vector3, Vector3, number]> = [
      ['start-deck', new Vector3(10, 0.5, 3.1), new Vector3(-17, 0.4, 0), 0],
      ['ramp-one', new Vector3(8, 0.45, 3.1), new Vector3(-8.2, 1.15, 0), 0.26],
      ['landing-one', new Vector3(7, 0.45, 3.1), new Vector3(-0.5, 1.9, 0), -0.07],
      ['backflip-kicker', new Vector3(5.2, 0.45, 3.1), new Vector3(6.2, 2.15, 0), 0.55],
      ['landing-two', new Vector3(9, 0.5, 3.1), new Vector3(15.4, 2.7, 0), -0.16],
      ['finish-deck', new Vector3(13, 0.5, 3.1), new Vector3(26, 1.4, 0), 0],
    ];
    pieces.forEach(([name, size, pos, rot]) => {
      this.box(name, size, pos, this.mats.wood, true, rot);
    });
  }

  private createProps(): void {
    for (let i = 0; i < 8; i += 1) {
      this.box(`crate-${i}`, new Vector3(1.2, 1.2, 1.2), new Vector3(-13 + i * 5.2, 0.25, 2.2), this.mats.crate, false);
    }
    this.box('orange-container-a', new Vector3(5, 2.2, 2), new Vector3(2, 0.15, 2.2), this.mats.container, false);
    this.box('orange-container-b', new Vector3(6, 2.4, 2), new Vector3(21, 0.25, 2.25), this.mats.container, false);
    this.box('checkpoint-gate', new Vector3(0.22, 4.2, 0.22), new Vector3(10.2, 4.2, 0), this.mats.checkpoint, false);
    this.box('finish-trigger-visual', new Vector3(0.28, 5, 0.28), new Vector3(FINISH_X, 3.8, 0), this.mats.finish, false);
    for (let i = 0; i < 14; i += 1) {
      const puff = MeshBuilder.CreateSphere(`smoke-puff-${i}`, { diameter: 0.34 + i * 0.02 }, this.scene);
      puff.material = this.mats.smoke;
      puff.setEnabled(false);
      this.smokePuffs.push(puff);
    }
  }

  private async createAssetProps(): Promise<void> {
    await Promise.all([
      this.loadVisualAsset('asset-crate-a', 'crate.glb', new Vector3(-17, 0.55, -2.65), 0.85, Math.PI * 0.08),
      this.loadVisualAsset('asset-crate-b', 'crate-color.glb', new Vector3(-4.4, 2.3, -2.45), 0.75, -Math.PI * 0.12),
      this.loadVisualAsset('asset-garage-door', 'door-garage.glb', new Vector3(-23.5, 1.6, 2.72), 1.15),
      this.loadVisualAsset('asset-ladder', 'ladder-color.glb', new Vector3(18.5, 1.25, -2.58), 1, Math.PI * 0.5),
      this.loadVisualAsset('asset-pipe-stack', 'pipe.glb', new Vector3(28.2, 1.05, -2.6), 1.15, Math.PI * 0.5),
      this.loadVisualAsset('asset-window', 'wall-window-large.glb', new Vector3(8.5, 3.6, 2.73), 1.1),
      this.loadVisualAsset('asset-wall-panel', 'wall.glb', new Vector3(15.3, 3.6, 2.73), 1.1),
    ]);
  }

  private async loadVisualAsset(name: string, fileName: string, position: Vector3, scale: number, rotY = 0): Promise<void> {
    try {
      const result = await SceneLoader.ImportMeshAsync('', '/assets/models/kenney/prototype-kit/', fileName, this.scene);
      result.meshes.forEach((mesh) => {
        mesh.name = `${name}-${mesh.name}`;
        mesh.isPickable = false;
      });
      const root = result.meshes[0];
      if (!root) return;
      root.position = position;
      root.scaling.setAll(scale);
      root.rotation.y = rotY;
    } catch (error) {
      console.warn(`Unable to load visual asset ${fileName}`, error);
    }
  }

  private createCollectibles(): void {
    [-12, -7, -1.5, 5.8, 9, 14, 21].forEach((x, index) => {
      const coin = MeshBuilder.CreateTorus(`coin-${index}`, { diameter: 0.72, thickness: 0.14 }, this.scene);
      coin.position = new Vector3(x, 3.2 + Math.sin(index) * 0.8, 0);
      coin.material = this.mats.coin;
      this.collectibles.push({ mesh: coin, kind: 'coin', collected: false });
    });
    const chest = this.box('reward-chest', new Vector3(1.1, 0.8, 0.8), new Vector3(24, 2.25, 0), this.mats.coin, false);
    this.collectibles.push({ mesh: chest, kind: 'chest', collected: false });
  }

  private updateGameplay(): void {
    if (!this.bike) return;
    const pos = this.bike.position;
    const progress = Math.max(0, Math.min(1, (pos.x + 20) / (FINISH_X + 20)));
    if (pos.x > 9.8) this.checkpoint = true;
    if (pos.x > FINISH_X) {
      this.finished = true;
      this.hud.flash('FINISH');
    }
    if (pos.y < -5 || Math.abs(this.bike.roll) > Math.PI * 0.78 && this.bike.grounded) {
      this.crashed = true;
      this.stuntTracker.cancelCombo();
      this.hud.flash('CRASH - PRESS R');
    }
    for (const item of this.collectibles) {
      if (!item.collected && Vector3.Distance(item.mesh.position, pos) < 1.3) {
        item.collected = true;
        item.mesh.setEnabled(false);
        this.coins += item.kind === 'coin' ? 1 : 5;
        this.exp += item.kind === 'coin' ? 10 : 75;
        this.hud.flash(item.kind === 'coin' ? '+1 COIN' : 'CHEST +75 EXP');
      }
    }
    const flips = this.stuntTracker.update(this.bike.roll, this.bike.grounded);
    if (flips.includes('backflip') && !this.crashed) {
      this.exp += 100;
      this.hud.flash('1x BACKFLIP +100 EXP');
    }
    this.recentlyGrounded = this.bike.grounded;
    this.hud.update(this.elapsed, this.coins, this.exp, progress);
    this.cameraRig?.follow(pos);
    GameStateReporter.set({
      ready: true,
      bikeX: pos.x,
      progress,
      grounded: this.recentlyGrounded,
      coins: this.coins,
      checkpoint: this.checkpoint,
      finish: this.finished,
      status: this.crashed ? 'crashed' : this.finished ? 'finished' : 'playing',
      lastStunt: flips[0],
      meshCount: this.scene.meshes.length,
    });
  }

  private animateScene(dt: number): void {
    for (const item of this.collectibles) {
      if (!item.collected) item.mesh.rotation.y += dt * 3;
    }
    if (!this.bike) return;
    const speed = Math.abs(this.bike.body.linvel().x);
    if (speed > 2 && this.bike.grounded) {
      const puff = this.smokePuffs.shift();
      if (puff) {
        puff.position = this.bike.position.add(new Vector3(-1.25, -0.55, 0.06));
        puff.scaling.setAll(0.7);
        puff.setEnabled(true);
        this.smokePuffs.push(puff);
      }
    }
    this.smokePuffs.forEach((puff, index) => {
      if (!puff.isEnabled()) return;
      puff.position.x -= dt * (0.6 + index * 0.015);
      puff.position.y += dt * 0.24;
      puff.scaling.addInPlaceFromFloats(dt * 0.55, dt * 0.55, dt * 0.55);
      if (puff.scaling.x > 1.6) puff.setEnabled(false);
    });
  }

  private restart(): void {
    this.input.restartPressed = false;
    this.elapsed = 0;
    this.coins = 0;
    this.exp = 0;
    this.finished = false;
    this.crashed = false;
    this.checkpoint = false;
    this.collectibles.forEach((item) => {
      item.collected = false;
      item.mesh.setEnabled(true);
    });
    this.bike?.reset(START);
    this.stuntTracker.begin(0);
    this.hud.flash('RESTART');
  }

  private box(name: string, size: Vector3, position: Vector3, material: StandardMaterial, collider: boolean, rotZ = 0): Mesh {
    const mesh = MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, this.scene);
    mesh.position = position;
    mesh.rotationQuaternion = Quaternion.FromEulerAngles(0, 0, rotZ);
    mesh.material = material;
    if (collider && this.world) {
      const body = this.world.createRigidBody(
        RAPIER.RigidBodyDesc.fixed().setTranslation(position.x, position.y, position.z).setRotation({
          x: 0,
          y: 0,
          z: Math.sin(rotZ / 2),
          w: Math.cos(rotZ / 2),
        }),
      );
      this.world.createCollider(RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2).setFriction(1.2), body);
    }
    return mesh;
  }

  private pipe(x: number, y: number, z: number): void {
    const pipe = MeshBuilder.CreateCylinder(`pipe-${x}`, { diameter: 0.22, height: 5.5 }, this.scene);
    pipe.position = new Vector3(x, y, z);
    pipe.rotation.z = Math.PI / 2;
    pipe.material = this.mats.metal;
  }
}
