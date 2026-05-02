export interface LevelDefinition {
  id: string;
  title: string;
  worldId: string;
  targetTimes: {
    threeStars: number;
    twoStars: number;
    oneStar: number;
  };
  bounds: {
    width: number;
    height: number;
  };
  start: {
    x: number;
    y: number;
    rotation: number;
  };
  terrain: TerrainSegment[];
  objects: LevelObject[];
  checkpoints: CheckpointDefinition[];
  finish: FinishDefinition;
}

export interface TerrainSegment {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  material: 'wood' | 'dirt';
}

export type LevelObject =
  | { type: 'coin'; id: string; x: number; y: number }
  | { type: 'chest'; id: string; x: number; y: number };

export interface CheckpointDefinition {
  id: string;
  x: number;
  y: number;
  respawnX: number;
  respawnY: number;
}

export interface FinishDefinition {
  x: number;
  y: number;
  width: number;
  height: number;
}
