export interface BikeContactState {
  grounded: boolean;
  lastGroundedAtMs: number;
}

export function createBikeContactState(nowMs = 0): BikeContactState {
  return {
    grounded: true,
    lastGroundedAtMs: nowMs,
  };
}

export function canBikeJump(contact: BikeContactState, nowMs: number, coyoteTimeMs = 160): boolean {
  return contact.grounded || nowMs - contact.lastGroundedAtMs <= coyoteTimeMs;
}
