import type { LevelDefinition } from '../types/LevelDefinition';

export interface LevelRuntimeState {
  collectedObjectIds: Set<string>;
  activeCheckpointId?: string;
  finishReached: boolean;
}

export function createLevelRuntimeState(): LevelRuntimeState {
  return {
    collectedObjectIds: new Set<string>(),
    finishReached: false,
  };
}

export function countObjects(level: LevelDefinition, type: 'coin' | 'chest'): number {
  return level.objects.filter((object) => object.type === type).length;
}

export function calculateLevelProgress(level: LevelDefinition, x: number): number {
  const distance = level.finish.x - level.start.x;
  if (distance <= 0) {
    return 1;
  }

  return Math.min(1, Math.max(0, (x - level.start.x) / distance));
}
