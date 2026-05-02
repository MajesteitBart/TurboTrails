import { FreeCamera, Vector3 } from '@babylonjs/core/Legacy/legacy';

export class FollowCamera2D {
  constructor(private readonly camera: FreeCamera) {}

  follow(target: Vector3): void {
    const desired = new Vector3(target.x + 4.2, Math.max(5, target.y + 4.2), -23);
    this.camera.position = Vector3.Lerp(this.camera.position, desired, 0.08);
    this.camera.setTarget(new Vector3(target.x + 2, target.y + 1.2, 0));
  }
}
