import Phaser from 'phaser';
import { canBikeJump, type BikeContactState } from './BikeContact';
import type { PlayerInputState } from '../types/Input';
import type { VehicleConfig } from '../types/VehicleConfig';

export type BikeMotionBody = MatterJS.BodyType & {
  angularVelocity: number;
  speed: number;
  velocity: { x: number; y: number };
};

export function updateBikeContactFromProbe(
  bike: Phaser.Physics.Matter.Image,
  contact: BikeContactState,
  nowMs: number,
  groundY: number,
): void {
  const grounded = bike.y >= groundY || Math.abs((bike.body as BikeMotionBody).velocity.y) < 0.18;
  contact.grounded = grounded;
  if (grounded) {
    contact.lastGroundedAtMs = nowMs;
  }
}

export function applyBikeInput(
  bike: Phaser.Physics.Matter.Image,
  body: BikeMotionBody,
  input: PlayerInputState,
  vehicle: VehicleConfig,
  contact: BikeContactState,
  nowMs: number,
): void {
  if (input.throttle && body.velocity.x < vehicle.physics.maxSpeed) {
    bike.applyForce(new Phaser.Math.Vector2(vehicle.physics.acceleration, 0));
  }

  if (input.brake) {
    const reverseForce = body.velocity.x > 0.6 ? -vehicle.physics.brakeForce * 0.001 : -vehicle.physics.reverseAcceleration;
    bike.applyForce(new Phaser.Math.Vector2(reverseForce, 0));
  }

  const torque = contact.grounded ? vehicle.physics.groundTorque : vehicle.physics.airTorque;
  if (input.tiltBack) {
    bike.setAngularVelocity(body.angularVelocity - torque);
  }
  if (input.tiltForward) {
    bike.setAngularVelocity(body.angularVelocity + torque);
  }

  if (input.jumpPressed && canBikeJump(contact, nowMs)) {
    bike.applyForce(new Phaser.Math.Vector2(0, -vehicle.physics.jumpImpulse));
    contact.grounded = false;
  }
}
