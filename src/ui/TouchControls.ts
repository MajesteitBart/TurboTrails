import type { PlayerInputState } from '../types/Input';

type TouchAction = keyof Pick<PlayerInputState, 'throttle' | 'brake' | 'tiltBack' | 'tiltForward' | 'jumpHeld'>;

export class TouchControls {
  private readonly overlay = document.createElement('div');
  private readonly activeTouches = new Map<number, TouchAction>();

  constructor(
    private readonly root: HTMLElement,
    private readonly input: PlayerInputState,
  ) {}

  mount(): void {
    this.overlay.className = 'touch-controls';
    this.overlay.innerHTML = `
      <button data-action="brake">BRAKE</button>
      <button data-action="throttle">GAS</button>
      <button data-action="tiltBack">LEAN BACK</button>
      <button data-action="tiltForward">LEAN FWD</button>
      <button data-action="jumpHeld">JUMP</button>
    `;
    this.overlay.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      button.addEventListener('pointerdown', (event) => this.press(event, button.dataset.action as TouchAction));
      button.addEventListener('pointerup', (event) => this.release(event));
      button.addEventListener('pointercancel', (event) => this.release(event));
      button.addEventListener('lostpointercapture', (event) => this.release(event));
    });
    this.root.append(this.overlay);
  }

  private press(event: PointerEvent, action: TouchAction): void {
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.activeTouches.set(event.pointerId, action);
    this.input[action] = true;
    if (action === 'jumpHeld') this.input.jumpPressed = true;
  }

  private release(event: PointerEvent): void {
    event.preventDefault();
    const action = this.activeTouches.get(event.pointerId);
    if (action) this.input[action] = false;
    this.activeTouches.delete(event.pointerId);
  }
}
