import Phaser from 'phaser';
import type { PlayerInputState } from '../types/Input';

const EMPTY_STATE: PlayerInputState = {
  throttle: false,
  brake: false,
  tiltBack: false,
  tiltForward: false,
  jumpPressed: false,
  jumpHeld: false,
  restartPressed: false,
  pausePressed: false,
};

export class InputController {
  private state: PlayerInputState = { ...EMPTY_STATE };
  private touchState: PlayerInputState = { ...EMPTY_STATE };
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: Record<string, Phaser.Input.Keyboard.Key>;

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.keys = scene.input.keyboard!.addKeys('W,S,A,D,SPACE,R,ESC') as Record<
      string,
      Phaser.Input.Keyboard.Key
    >;
  }

  getState(): PlayerInputState {
    this.state.throttle = this.touchState.throttle || this.cursors.right.isDown || this.keys.W.isDown;
    this.state.brake = this.touchState.brake || this.cursors.left.isDown || this.keys.S.isDown;
    this.state.tiltBack = this.touchState.tiltBack || this.cursors.down.isDown || this.keys.A.isDown;
    this.state.tiltForward = this.touchState.tiltForward || this.cursors.up.isDown || this.keys.D.isDown;
    this.state.jumpPressed = this.touchState.jumpPressed || Phaser.Input.Keyboard.JustDown(this.keys.SPACE);
    this.state.jumpHeld = this.touchState.jumpHeld || this.keys.SPACE.isDown;
    this.state.restartPressed = this.touchState.restartPressed || Phaser.Input.Keyboard.JustDown(this.keys.R);
    this.state.pausePressed = this.touchState.pausePressed || Phaser.Input.Keyboard.JustDown(this.keys.ESC);
    return { ...this.state };
  }

  setTouchControl(action: keyof PlayerInputState, active: boolean): void {
    this.touchState[action] = active;
    if (action === 'jumpHeld' && active) {
      this.touchState.jumpPressed = true;
    }
  }

  afterUpdate(): void {
    this.state.jumpPressed = false;
    this.state.restartPressed = false;
    this.state.pausePressed = false;
    this.touchState.jumpPressed = false;
    this.touchState.restartPressed = false;
    this.touchState.pausePressed = false;
  }
}
