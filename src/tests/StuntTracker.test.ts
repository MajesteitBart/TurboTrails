import { describe, expect, it } from 'vitest';
import { shortestAngleDelta, StuntTracker } from '../systems/StuntTracker';

describe('StuntTracker', () => {
  it('normalizes angle deltas', () => {
    expect(shortestAngleDelta(0, Math.PI)).toBeCloseTo(Math.PI);
    expect(shortestAngleDelta(Math.PI, -Math.PI + 0.1)).toBeCloseTo(0.1);
  });

  it('awards a flip only after landing', () => {
    const tracker = new StuntTracker();
    tracker.begin(0);
    expect(tracker.update(Math.PI * 0.75, false)).toEqual([]);
    expect(tracker.update(Math.PI * 1.5, false)).toEqual([]);
    expect(tracker.update(Math.PI * 2.25, false)).toEqual([]);
    expect(tracker.update(Math.PI * 2.25, true)).toEqual(['frontflip']);
  });
});
