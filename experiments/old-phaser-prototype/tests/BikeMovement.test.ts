import { describe, expect, it } from 'vitest';
import { canBikeJump, createBikeContactState } from '../systems/BikeContact';

describe('BikeMovement', () => {
  it('allows jump while grounded', () => {
    expect(canBikeJump({ grounded: true, lastGroundedAtMs: 0 }, 1000)).toBe(true);
  });

  it('allows a short coyote-time jump after leaving ground', () => {
    expect(canBikeJump({ grounded: false, lastGroundedAtMs: 1000 }, 1120)).toBe(true);
  });

  it('blocks jump after coyote time expires', () => {
    expect(canBikeJump({ grounded: false, lastGroundedAtMs: 1000 }, 1300)).toBe(false);
  });

  it('creates grounded contact state by default', () => {
    expect(createBikeContactState(42)).toEqual({ grounded: true, lastGroundedAtMs: 42 });
  });
});
