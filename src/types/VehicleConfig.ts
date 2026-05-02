export interface VehicleConfig {
  id: string;
  displayName: string;
  type: 'bike' | 'car' | 'truck';
  unlockCostCoins: number;
  body: {
    chassisWidth: number;
    chassisHeight: number;
    wheelRadius: number;
    wheelBase: number;
    massScale: number;
  };
  physics: {
    acceleration: number;
    reverseAcceleration: number;
    maxSpeed: number;
    brakeForce: number;
    airTorque: number;
    groundTorque: number;
    jumpImpulse: number;
    suspensionStiffness: number;
    suspensionDamping: number;
    wheelFriction: number;
    restitution: number;
  };
  stunt: {
    flipMultiplier: number;
    wheelieMultiplier: number;
    rotationSpeedBias: number;
  };
  cosmetics: {
    primaryColor: string;
    secondaryColor: string;
    spriteKey?: string;
  };
}
