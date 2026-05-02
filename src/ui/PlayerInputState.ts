import type { PlayerInputState } from '../types/Input';

export function createInputState(): PlayerInputState {
  return {
    throttle: false,
    brake: false,
    tiltBack: false,
    tiltForward: false,
    jumpPressed: false,
    jumpHeld: false,
    restartPressed: false,
    pausePressed: false,
  };
}
