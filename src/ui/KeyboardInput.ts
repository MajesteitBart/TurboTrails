import type { PlayerInputState } from '../types/Input';

export class KeyboardInput {
  constructor(private readonly input: PlayerInputState) {}

  bind(): void {
    window.addEventListener('keydown', (event) => this.setKey(event, true));
    window.addEventListener('keyup', (event) => this.setKey(event, false));
  }

  private setKey(event: KeyboardEvent, pressed: boolean): void {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space'].includes(event.code)) {
      event.preventDefault();
    }
    if (event.code === 'ArrowRight' || event.code === 'KeyW') this.input.throttle = pressed;
    if (event.code === 'ArrowLeft' || event.code === 'KeyS') this.input.brake = pressed;
    if (event.code === 'KeyA' || event.code === 'ArrowDown') this.input.tiltBack = pressed;
    if (event.code === 'KeyD' || event.code === 'ArrowUp') this.input.tiltForward = pressed;
    if (event.code === 'Space') {
      this.input.jumpHeld = pressed;
      this.input.jumpPressed = pressed;
    }
    if (event.code === 'KeyR' && pressed) this.input.restartPressed = true;
    if (event.code === 'Escape' && pressed) this.input.pausePressed = true;
  }
}
