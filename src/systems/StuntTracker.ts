export type FlipType = 'frontflip' | 'backflip';

export function shortestAngleDelta(previous: number, current: number): number {
  return Math.atan2(Math.sin(current - previous), Math.cos(current - previous));
}

export class StuntTracker {
  private previousAngle = 0;
  private airborneRotation = 0;
  private pendingFlips: FlipType[] = [];
  private wasGrounded = true;

  begin(angle: number): void {
    this.previousAngle = angle;
    this.airborneRotation = 0;
    this.pendingFlips = [];
    this.wasGrounded = true;
  }

  update(angle: number, grounded: boolean): FlipType[] {
    const awarded: FlipType[] = [];

    if (!grounded) {
      this.airborneRotation += shortestAngleDelta(this.previousAngle, angle);

      while (Math.abs(this.airborneRotation) >= Math.PI * 2) {
        const type: FlipType = this.airborneRotation > 0 ? 'frontflip' : 'backflip';
        this.pendingFlips.push(type);
        this.airborneRotation -= Math.sign(this.airborneRotation) * Math.PI * 2;
      }
    }

    if (grounded && !this.wasGrounded) {
      awarded.push(...this.pendingFlips);
      this.pendingFlips = [];
      this.airborneRotation = 0;
    }

    this.previousAngle = angle;
    this.wasGrounded = grounded;
    return awarded;
  }

  cancelCombo(): void {
    this.pendingFlips = [];
    this.airborneRotation = 0;
  }
}
