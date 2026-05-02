import { describe, expect, it } from 'vitest';
import { calculateScore, calculateStars } from '../systems/ScoreSystem';

const targetTimes = { threeStars: 30000, twoStars: 45000, oneStar: 60000 };

describe('ScoreSystem', () => {
  it('awards stars from target times', () => {
    expect(
      calculateStars({ finished: true, timeMs: 28000, targetTimes, coins: 0, chests: 0, stuntExp: 0, crashed: false }),
    ).toBe(3);
    expect(
      calculateStars({ finished: true, timeMs: 42000, targetTimes, coins: 0, chests: 0, stuntExp: 0, crashed: false }),
    ).toBe(2);
    expect(
      calculateStars({ finished: false, timeMs: 1000, targetTimes, coins: 0, chests: 0, stuntExp: 0, crashed: false }),
    ).toBe(0);
  });

  it('combines finish, collectibles, stunts, and no-crash bonus', () => {
    expect(
      calculateScore({ finished: true, timeMs: 28000, targetTimes, coins: 4, chests: 1, stuntExp: 200, crashed: false }),
    ).toBe(1640);
  });
});
