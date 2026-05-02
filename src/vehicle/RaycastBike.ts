import {
  Color3,
  Mesh,
  MeshBuilder,
  Quaternion,
  Scene,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core/Legacy/legacy';
import RAPIER from '@dimforge/rapier3d-compat';
import type { PlayerInputState } from '../types/Input';

const WHEEL_ANCHORS = [
  new Vector3(-1.08, -0.42, 0),
  new Vector3(1.12, -0.34, 0),
];

export class RaycastBike {
  readonly root: TransformNode;
  readonly body: RAPIER.RigidBody;
  grounded = false;
  roll = 0;
  private recentlyGrounded = 0;
  private readonly rayLength = 1.05;
  private readonly wheelMeshes: Mesh[] = [];
  private wheelSpin = 0;

  constructor(
    private readonly scene: Scene,
    private readonly world: RAPIER.World,
    start: Vector3,
  ) {
    this.root = new TransformNode('bike-root', scene);
    this.body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(start.x, start.y, start.z)
        .setLinearDamping(0.35)
        .setAngularDamping(0.75)
        .setCanSleep(false),
    );
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.25, 0.28, 0.32).setMass(1.4).setFriction(0.9), this.body);
    this.createVisuals();
  }

  get position(): Vector3 {
    const p = this.body.translation();
    return new Vector3(p.x, p.y, p.z);
  }

  update(dt: number, input: PlayerInputState): void {
    const velocity = this.body.linvel();
    const wheelHits = WHEEL_ANCHORS.map((anchor) => this.castWheel(anchor));
    this.grounded = wheelHits.some((hit) => hit.grounded);
    this.recentlyGrounded = this.grounded ? 0.18 : Math.max(0, this.recentlyGrounded - dt);

    for (const hit of wheelHits) {
      if (!hit.grounded) continue;
      const compression = 1 - hit.toi / this.rayLength;
      this.body.applyImpulseAtPoint(
        { x: 0, y: compression * 0.75 - velocity.y * 0.035, z: 0 },
        { x: hit.worldAnchor.x, y: hit.worldAnchor.y, z: 0 },
        true,
      );
    }

    if (this.grounded && input.throttle) this.body.applyImpulse({ x: 0.18, y: 0, z: 0 }, true);
    if (input.brake) this.body.applyImpulse({ x: this.grounded ? -0.14 : -0.025, y: 0, z: 0 }, true);
    if (input.jumpPressed && this.recentlyGrounded > 0) {
      this.body.applyImpulse({ x: 0.12, y: 3.4, z: 0 }, true);
      this.recentlyGrounded = 0;
    }
    input.jumpPressed = false;

    const airTorque = this.grounded ? 0.018 : 0.08;
    if (input.tiltBack) this.body.applyTorqueImpulse({ x: 0, y: 0, z: airTorque }, true);
    if (input.tiltForward) this.body.applyTorqueImpulse({ x: 0, y: 0, z: -airTorque }, true);

    this.body.setLinvel({ x: Math.max(-7, Math.min(15, this.body.linvel().x)), y: this.body.linvel().y, z: 0 }, true);
    this.body.setTranslation({ x: this.body.translation().x, y: this.body.translation().y, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: this.body.angvel().z }, true);
  }

  afterPhysics(): void {
    const p = this.body.translation();
    const r = this.body.rotation();
    this.roll = Math.atan2(2 * (r.w * r.z + r.x * r.y), 1 - 2 * (r.y * r.y + r.z * r.z));
    this.root.position.set(p.x, p.y, 0);
    this.root.rotationQuaternion = new Quaternion(0, 0, Math.sin(this.roll / 2), Math.cos(this.roll / 2));
    this.wheelSpin -= this.body.linvel().x * 0.04;
    this.wheelMeshes.forEach((wheel) => {
      wheel.rotation.z = this.wheelSpin;
    });
  }

  reset(position: Vector3): void {
    this.body.setTranslation({ x: position.x, y: position.y, z: 0 }, true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    this.roll = 0;
  }

  private castWheel(localAnchor: Vector3): { grounded: boolean; toi: number; worldAnchor: Vector3 } {
    const cos = Math.cos(this.roll);
    const sin = Math.sin(this.roll);
    const pos = this.position;
    const worldAnchor = new Vector3(
      pos.x + localAnchor.x * cos - localAnchor.y * sin,
      pos.y + localAnchor.x * sin + localAnchor.y * cos,
      0,
    );
    const ray = new RAPIER.Ray(
      { x: worldAnchor.x, y: worldAnchor.y, z: 0 },
      { x: -sin * 0.15, y: -1, z: 0 },
    );
    const hit = this.world.castRay(ray, this.rayLength, true, undefined, undefined, undefined, this.body);
    return { grounded: hit !== null, toi: hit?.timeOfImpact ?? this.rayLength, worldAnchor };
  }

  private createVisuals(): void {
    const mat = (name: string, color: Color3): StandardMaterial => {
      const material = new StandardMaterial(name, this.scene);
      material.diffuseColor = color;
      return material;
    };
    const yellow = mat('bike-yellow', new Color3(1, 0.72, 0.1));
    const red = mat('bike-red', new Color3(0.9, 0.16, 0.08));
    const rubber = mat('tire-rubber', new Color3(0.015, 0.016, 0.018));
    const metal = mat('bike-metal', new Color3(0.48, 0.5, 0.52));
    const rider = mat('rider-suit', new Color3(0.08, 0.22, 0.9));
    const skin = mat('helmet-orange', new Color3(1, 0.42, 0.12));

    this.part('chassis', new Vector3(2.5, 0.35, 0.48), new Vector3(0, 0, 0), yellow);
    this.part('fuel-tank', new Vector3(0.95, 0.32, 0.56), new Vector3(-0.22, 0.36, 0), red);
    this.part('fork', new Vector3(0.12, 1.1, 0.16), new Vector3(0.9, 0.2, 0), metal, -0.35);
    this.part('swing-arm', new Vector3(1.15, 0.12, 0.14), new Vector3(-0.78, -0.24, 0), metal, 0.18);
    this.part('rider-body', new Vector3(0.42, 1.05, 0.35), new Vector3(0.1, 1.0, 0), rider, -0.25);
    const helmet = MeshBuilder.CreateSphere('placeholder-rider-helmet', { diameter: 0.46 }, this.scene);
    helmet.position = new Vector3(0.36, 1.7, 0);
    helmet.material = skin;
    helmet.parent = this.root;

    for (const anchor of WHEEL_ANCHORS) {
      const wheel = MeshBuilder.CreateTorus('raycast-wheel', { diameter: 1.02, thickness: 0.18 }, this.scene);
      wheel.position = anchor;
      wheel.rotation.x = Math.PI / 2;
      wheel.material = rubber;
      wheel.parent = this.root;
      this.wheelMeshes.push(wheel);
      const hub = MeshBuilder.CreateCylinder('wheel-hub', { diameter: 0.36, height: 0.14 }, this.scene);
      hub.position = anchor;
      hub.rotation.x = Math.PI / 2;
      hub.material = metal;
      hub.parent = this.root;
    }
  }

  private part(name: string, size: Vector3, position: Vector3, material: StandardMaterial, rotZ = 0): void {
    const mesh = MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, this.scene);
    mesh.position = position;
    mesh.rotation.z = rotZ;
    mesh.material = material;
    mesh.parent = this.root;
  }
}
