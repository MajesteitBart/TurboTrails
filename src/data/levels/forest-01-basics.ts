import type { LevelDefinition } from '../../types/LevelDefinition';

export const forest01Basics: LevelDefinition = {
  id: 'forest-01-basics',
  title: 'Forest 01: Basics',
  worldId: 'forest',
  targetTimes: {
    threeStars: 30000,
    twoStars: 45000,
    oneStar: 60000,
  },
  bounds: {
    width: 3150,
    height: 720,
  },
  start: {
    x: 145,
    y: 486,
    rotation: 0,
  },
  terrain: [
    { id: 'start-run', x: 510, y: 568, width: 820, height: 28, rotation: -0.04, material: 'wood' },
    { id: 'first-ramp', x: 1050, y: 520, width: 360, height: 28, rotation: -0.32, material: 'wood' },
    { id: 'landing-bridge', x: 1450, y: 510, width: 370, height: 28, rotation: 0.18, material: 'wood' },
    { id: 'big-air-ramp', x: 1900, y: 470, width: 420, height: 28, rotation: -0.25, material: 'wood' },
    { id: 'downhill', x: 2350, y: 500, width: 460, height: 28, rotation: 0.24, material: 'wood' },
    { id: 'finish-run', x: 2790, y: 545, width: 520, height: 28, rotation: 0, material: 'wood' },
  ],
  objects: [
    { type: 'coin', id: 'coin-1', x: 520, y: 505 },
    { type: 'coin', id: 'coin-2', x: 620, y: 492 },
    { type: 'coin', id: 'coin-3', x: 720, y: 486 },
    { type: 'coin', id: 'coin-4', x: 1170, y: 415 },
    { type: 'coin', id: 'coin-5', x: 1260, y: 388 },
    { type: 'coin', id: 'coin-6', x: 1350, y: 402 },
    { type: 'chest', id: 'chest-1', x: 1540, y: 420 },
    { type: 'coin', id: 'coin-7', x: 1990, y: 365 },
    { type: 'coin', id: 'coin-8', x: 2090, y: 342 },
    { type: 'coin', id: 'coin-9', x: 2190, y: 362 },
  ],
  checkpoints: [{ id: 'checkpoint-1', x: 1440, y: 438, respawnX: 1440, respawnY: 438 }],
  finish: {
    x: 2860,
    y: 456,
    width: 64,
    height: 150,
  },
};
