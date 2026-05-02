import type { VehicleConfig } from '../types/VehicleConfig';

export const vehicles: VehicleConfig[] = [
  {
    id: 'starter-dirt-bike',
    displayName: 'Starter Dirt Bike',
    type: 'bike',
    unlockCostCoins: 0,
    body: { chassisWidth: 92, chassisHeight: 34, wheelRadius: 18, wheelBase: 78, massScale: 1 },
    physics: {
      acceleration: 0.0018,
      reverseAcceleration: 0.001,
      maxSpeed: 18,
      brakeForce: 0.035,
      airTorque: 0.0024,
      groundTorque: 0.001,
      jumpImpulse: 0.03,
      suspensionStiffness: 0.75,
      suspensionDamping: 0.18,
      wheelFriction: 0.95,
      restitution: 0.05,
    },
    stunt: { flipMultiplier: 1, wheelieMultiplier: 1, rotationSpeedBias: 1 },
    cosmetics: { primaryColor: '#facc15', secondaryColor: '#111827' },
  },
];
