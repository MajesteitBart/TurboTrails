import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import { setThreeState } from './threeState';
import './styles3d.css';

interface InputState3D {
  throttle: boolean;
  brake: boolean;
  tiltBack: boolean;
  tiltForward: boolean;
  jumpPressed: boolean;
}

const mount = document.querySelector<HTMLDivElement>('#three-game');
if (!mount) {
  throw new Error('Missing #three-game mount');
}
const root = mount;

const materials = {
  dirt: new THREE.MeshStandardMaterial({ color: 0x7b5735, roughness: 0.92, metalness: 0.02 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x3d8a4f, roughness: 0.82 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x8a6038, roughness: 0.72 }),
  bark: new THREE.MeshStandardMaterial({ color: 0x5b3926, roughness: 0.9 }),
  leafDark: new THREE.MeshStandardMaterial({ color: 0x1f6b44, roughness: 0.86 }),
  leafLight: new THREE.MeshStandardMaterial({ color: 0x3f9b61, roughness: 0.82 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x222833, roughness: 0.42, metalness: 0.45 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.84 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xf6c431, roughness: 0.5, metalness: 0.12 }),
  red: new THREE.MeshStandardMaterial({ color: 0xdb3f35, roughness: 0.58 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x2864b7, roughness: 0.55 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xf2c38b, roughness: 0.62 }),
  coin: new THREE.MeshStandardMaterial({ color: 0xffcc33, roughness: 0.3, metalness: 0.45 }),
  hud: new THREE.MeshBasicMaterial({ color: 0x0f172a }),
};

const trackSegments = [
  [-16, -0.3, 0, 14, 0.55, 3.2, -0.02],
  [-7.2, 0.6, 0, 7.6, 0.55, 3.2, 0.34],
  [0.7, 1.3, 0, 8.6, 0.55, 3.2, -0.08],
  [9.2, 2.1, 0, 8.2, 0.55, 3.2, 0.28],
  [17.3, 2.9, 0, 8.4, 0.55, 3.2, -0.04],
] as const;

class TurboTrails3DPrototype {
  private readonly scene = new THREE.Scene();
  private readonly renderer = new THREE.WebGLRenderer({ antialias: true });
  private readonly camera = new THREE.OrthographicCamera(-18, 18, 10.2, -10.2, 0.1, 180);
  private readonly clock = new THREE.Clock();
  private readonly input: InputState3D = {
    throttle: false,
    brake: false,
    tiltBack: false,
    tiltForward: false,
    jumpPressed: false,
  };
  private rapierWorld!: RAPIER.World;
  private bikeBody!: RAPIER.RigidBody;
  private bikeGroup!: THREE.Group;
  private wheelMeshes: THREE.Mesh[] = [];
  private hudText!: HTMLDivElement;
  private grounded = true;
  private progress = 0;

  async start(): Promise<void> {
    await RAPIER.init();
    this.rapierWorld = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
    this.configureRenderer();
    this.configureScene();
    this.createWorld();
    this.createBike();
    this.createHud();
    this.bindInput();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    setThreeState({ ready: true, meshCount: this.scene.children.length, camera: 'orthographic-side', bikeX: -14.5 });
    this.animate();
  }

  private configureRenderer(): void {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(this.renderer.domElement);
  }

  private configureScene(): void {
    this.scene.background = new THREE.Color(0x9fc7df);
    this.scene.fog = new THREE.Fog(0x9fc7df, 34, 86);
    this.camera.position.set(0, 9.5, 32);
    this.camera.lookAt(0, 1.8, 0);
    this.scene.add(this.camera);

    this.scene.add(new THREE.HemisphereLight(0xddefff, 0x32543b, 1.8));
    const sun = new THREE.DirectionalLight(0xfff2d2, 3.8);
    sun.position.set(-12, 22, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -36;
    sun.shadow.camera.right = 36;
    sun.shadow.camera.top = 24;
    sun.shadow.camera.bottom = -14;
    this.scene.add(sun);
  }

  private addMesh<T extends THREE.Mesh>(mesh: T): T {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    return mesh;
  }

  private box(
    name: string,
    size: [number, number, number],
    pos: [number, number, number],
    mat: THREE.Material,
    rotZ = 0,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    mesh.name = name;
    mesh.position.set(...pos);
    mesh.rotation.z = rotZ;
    return this.addMesh(mesh);
  }

  private cylinder(
    name: string,
    radius: number,
    depth: number,
    pos: [number, number, number],
    mat: THREE.Material,
    rot: [number, number, number] = [0, 0, 0],
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 32), mat);
    mesh.name = name;
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    return this.addMesh(mesh);
  }

  private createWorld(): void {
    this.box('distant-ground', [92, 2.4, 18], [0, -2.4, -5], materials.grass);
    this.box('near-soil', [92, 4.2, 14], [0, -5.6, 0], materials.dirt);

    trackSegments.forEach(([x, y, z, width, height, depth, rot], index) => {
      this.box(`wood-track-${index}`, [width, height, depth], [x, y, z], materials.wood, rot);
      this.box(`dark-track-side-${index}`, [width, 0.28, depth + 0.16], [x, y - 0.42, z], materials.dirt, rot);

      const body = this.rapierWorld.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z).setRotation({ x: 0, y: 0, z: Math.sin(rot / 2), w: Math.cos(rot / 2) }));
      this.rapierWorld.createCollider(RAPIER.ColliderDesc.cuboid(width / 2, height / 2, depth / 2).setFriction(1.2), body);
    });

    for (let i = 0; i < 16; i += 1) {
      this.addTree(-25 + i * 3.6, -6.8 - (i % 3) * 1.4, 0.75 + (i % 4) * 0.08);
    }

    for (let i = 0; i < 9; i += 1) {
      this.cylinder('coin', 0.35, 0.12, [-10 + i * 3.2, 2.5 + Math.sin(i * 0.8) * 1.4, 0.25], materials.coin, [
        Math.PI / 2,
        0,
        0,
      ]);
    }

    this.box('finish-post', [0.18, 3.1, 0.18], [21.7, 2.7, 0], materials.metal);
    this.box('finish-flag', [1.1, 0.7, 0.08], [22.25, 4.1, 0], materials.red);
  }

  private addTree(x: number, z: number, scale: number): void {
    this.cylinder('tree-trunk', 0.32 * scale, 3.8 * scale, [x, -0.8 + scale, z], materials.bark);
    const crownA = new THREE.Mesh(new THREE.DodecahedronGeometry(1.25 * scale, 0), materials.leafDark);
    crownA.position.set(x - 0.4 * scale, 2.4 * scale, z);
    this.addMesh(crownA);
    const crownB = new THREE.Mesh(new THREE.DodecahedronGeometry(1.45 * scale, 0), materials.leafLight);
    crownB.position.set(x + 0.35 * scale, 2.9 * scale, z - 0.25);
    this.addMesh(crownB);
  }

  private createBike(): void {
    this.bikeBody = this.rapierWorld.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(-14.5, 1.05, 0.15)
        .setLinearDamping(0.55)
        .setAngularDamping(1.4),
    );
    this.rapierWorld.createCollider(RAPIER.ColliderDesc.cuboid(1.28, 0.28, 0.38).setMass(1.2).setFriction(1.1), this.bikeBody);

    this.bikeGroup = new THREE.Group();
    this.scene.add(this.bikeGroup);
    this.bikeGroup.add(this.localBox([2.55, 0.38, 0.7], [0, 0, 0], materials.yellow, -0.08));
    this.bikeGroup.add(this.localBox([0.95, 0.2, 0.55], [-0.25, 0.42, 0], materials.red, -0.08));
    this.bikeGroup.add(this.localBox([0.42, 1.02, 0.34], [0.15, 1.06, 0], materials.blue, -0.22));
    this.bikeGroup.add(this.localCylinder(0.32, 0.34, [0.45, 1.78, 0], materials.skin));
    this.bikeGroup.add(this.localBox([0.12, 1.22, 0.16], [0.95, 0.25, 0.05], materials.metal, -0.32));

    const rearWheel = this.localCylinder(0.55, 0.42, [-1.05, -0.45, 0.03], materials.rubber);
    const frontWheel = this.localCylinder(0.55, 0.42, [1.2, -0.28, 0.03], materials.rubber);
    const rearRim = this.localCylinder(0.32, 0.46, [-1.05, -0.45, 0.03], materials.metal);
    const frontRim = this.localCylinder(0.32, 0.46, [1.2, -0.28, 0.03], materials.metal);
    this.wheelMeshes = [rearWheel, frontWheel, rearRim, frontRim];
    this.bikeGroup.add(rearWheel, frontWheel, rearRim, frontRim);
  }

  private localBox(size: [number, number, number], pos: [number, number, number], mat: THREE.Material, rotZ = 0): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    mesh.position.set(...pos);
    mesh.rotation.z = rotZ;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private localCylinder(radius: number, depth: number, pos: [number, number, number], mat: THREE.Material): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 32), mat);
    mesh.position.set(...pos);
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private createHud(): void {
    this.hudText = document.createElement('div');
    this.hudText.className = 'three-hud';
    this.hudText.textContent = 'W/Right: gas  S/Left: brake  A/D: tilt  Space: jump  R: reset';
    root.appendChild(this.hudText);
  }

  private bindInput(): void {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight' || event.code === 'KeyW') this.input.throttle = true;
      if (event.code === 'ArrowLeft' || event.code === 'KeyS') this.input.brake = true;
      if (event.code === 'KeyA' || event.code === 'ArrowDown') this.input.tiltBack = true;
      if (event.code === 'KeyD' || event.code === 'ArrowUp') this.input.tiltForward = true;
      if (event.code === 'Space') this.input.jumpPressed = true;
      if (event.code === 'KeyR') this.resetBike();
    });
    window.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowRight' || event.code === 'KeyW') this.input.throttle = false;
      if (event.code === 'ArrowLeft' || event.code === 'KeyS') this.input.brake = false;
      if (event.code === 'KeyA' || event.code === 'ArrowDown') this.input.tiltBack = false;
      if (event.code === 'KeyD' || event.code === 'ArrowUp') this.input.tiltForward = false;
    });
  }

  private animate(): void {
    const delta = Math.min(this.clock.getDelta(), 1 / 30);
    this.step(delta);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }

  private step(delta: number): void {
    const pos = this.bikeBody.translation();
    const velocity = this.bikeBody.linvel();
    this.grounded = pos.y < this.trackHeightAt(pos.x) + 1.05 && Math.abs(velocity.y) < 2.6;

    if (this.input.throttle && velocity.x < 13) {
      this.bikeBody.applyImpulse({ x: 0.24, y: 0, z: 0 }, true);
      this.bikeBody.setLinvel({ x: Math.max(velocity.x + 0.08, 1.2), y: velocity.y, z: 0 }, true);
    }
    if (this.input.brake && velocity.x > -4) {
      this.bikeBody.applyImpulse({ x: -0.07, y: 0, z: 0 }, true);
    }
    if (this.input.tiltBack) {
      this.bikeBody.applyTorqueImpulse({ x: 0, y: 0, z: this.grounded ? 0.012 : 0.035 }, true);
    }
    if (this.input.tiltForward) {
      this.bikeBody.applyTorqueImpulse({ x: 0, y: 0, z: this.grounded ? -0.012 : -0.035 }, true);
    }
    if (this.input.jumpPressed && this.grounded) {
      this.bikeBody.applyImpulse({ x: 0.03, y: 2.4, z: 0 }, true);
    }
    this.input.jumpPressed = false;

    this.rapierWorld.timestep = delta;
    this.rapierWorld.step();
    this.syncBike();
    this.followCamera();
    this.updateHud();
  }

  private syncBike(): void {
    const pos = this.bikeBody.translation();
    const rot = this.bikeBody.rotation();
    this.bikeGroup.position.set(pos.x, pos.y, pos.z);
    this.bikeGroup.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    this.wheelMeshes.forEach((wheel) => {
      wheel.rotation.z -= this.bikeBody.linvel().x * 0.035;
    });
  }

  private followCamera(): void {
    const pos = this.bikeBody.translation();
    const targetX = THREE.MathUtils.clamp(pos.x + 5.4, -2, 14);
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetX, 0.045);
    this.camera.lookAt(this.camera.position.x, 1.75, 0);
  }

  private updateHud(): void {
    const pos = this.bikeBody.translation();
    this.progress = THREE.MathUtils.clamp((pos.x + 16) / 38, 0, 1);
    this.hudText.textContent = `3D prototype | progress ${Math.round(this.progress * 100)}% | ${this.grounded ? 'grounded' : 'airborne'} | W/Right gas, Space jump, R reset`;
    setThreeState({
      ready: true,
      meshCount: this.scene.children.length,
      camera: 'orthographic-side',
      bikeX: pos.x,
      progress: this.progress,
      grounded: this.grounded,
    });
  }

  private trackHeightAt(x: number): number {
    const nearest = trackSegments.reduce((best, segment) => {
      const [segmentX, y, , width, height] = segment;
      const distance = Math.abs(x - segmentX);
      if (distance < best.distance && distance <= width / 2 + 1.2) {
        return { distance, height: y + height / 2 };
      }
      return best;
    }, { distance: Number.POSITIVE_INFINITY, height: -0.2 });
    return nearest.height;
  }

  private resetBike(): void {
    this.bikeBody.setTranslation({ x: -14.5, y: 1.05, z: 0.15 }, true);
    this.bikeBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.bikeBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.bikeBody.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
  }

  private resize(): void {
    const aspect = window.innerWidth / window.innerHeight;
    const viewHeight = 20.4;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2;
    this.camera.left = (-viewHeight * aspect) / 2;
    this.camera.right = (viewHeight * aspect) / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

new TurboTrails3DPrototype().start();
