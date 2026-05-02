import { describe, expect, it } from 'vitest';
import { forest01Basics } from '../data/levels/forest-01-basics';
import { levels } from '../data/levels';
import { calculateLevelProgress, countObjects, createLevelRuntimeState } from '../systems/LevelState';

describe('LevelState', () => {
  it('counts first level collectibles from data', () => {
    expect(countObjects(forest01Basics, 'coin')).toBe(9);
    expect(countObjects(forest01Basics, 'chest')).toBe(1);
  });

  it('creates isolated runtime state', () => {
    const first = createLevelRuntimeState();
    const second = createLevelRuntimeState();
    first.collectedObjectIds.add('coin-1');
    expect(second.collectedObjectIds.has('coin-1')).toBe(false);
  });

  it('calculates progress from start to finish', () => {
    expect(calculateLevelProgress(forest01Basics, forest01Basics.start.x)).toBe(0);
    expect(calculateLevelProgress(forest01Basics, forest01Basics.finish.x)).toBe(1);
  });

  it('registers Forest 02 as a playable level', () => {
    expect(levels['forest-02-first-flip'].title).toBe('Forest 02: First Flip');
    expect(countObjects(levels['forest-02-first-flip'], 'coin')).toBe(9);
    expect(countObjects(levels['forest-02-first-flip'], 'chest')).toBe(1);
  });
});
