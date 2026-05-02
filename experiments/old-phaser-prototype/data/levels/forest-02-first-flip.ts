import type { LevelDefinition } from '../../types/LevelDefinition';

export const forest02FirstFlip: LevelDefinition = {
  id: 'forest-02-first-flip',
  title: 'Forest 02: First Flip',
  worldId: 'forest',
  targetTimes: {
    threeStars: 34000,
    twoStars: 50000,
    oneStar: 70000,
  },
  bounds: {
    width: 3400,
    height: 720,
  },
  start: {
    x: 145,
    y: 486,
    rotation: 0,
  },
  terrain: [
    { id: 'start-run', x: 470, y: 570, width: 760, height: 28, rotation: -0.02, material: 'wood' },
    { id: 'flip-ramp', x: 980, y: 500, width: 430, height: 28, rotation: -0.48, material: 'wood' },
    { id: 'air-landing', x: 1600, y: 500, width: 470, height: 28, rotation: 0.16, material: 'wood' },
    { id: 'checkpoint-run', x: 2110, y: 548, width: 560, height: 28, rotation: 0.04, material: 'wood' },
    { id: 'second-kicker', x: 2600, y: 505, width: 340, height: 28, rotation: -0.34, material: 'wood' },
    { id: 'finish-deck', x: 3100, y: 540, width: 470, height: 28, rotation: 0.08, material: 'wood' },
  ],
  objects: [
    { type: 'coin', id: 'coin-1', x: 450, y: 510 },
    { type: 'coin', id: 'coin-2', x: 550, y: 500 },
    { type: 'coin', id: 'coin-3', x: 650, y: 494 },
    { type: 'coin', id: 'coin-4', x: 1120, y: 365 },
    { type: 'coin', id: 'coin-5', x: 1240, y: 320 },
    { type: 'coin', id: 'coin-6', x: 1360, y: 330 },
    { type: 'chest', id: 'chest-1', x: 1460, y: 348 },
    { type: 'coin', id: 'coin-7', x: 2500, y: 420 },
    { type: 'coin', id: 'coin-8', x: 2620, y: 370 },
    { type: 'coin', id: 'coin-9', x: 2740, y: 390 },
  ],
  checkpoints: [{ id: 'checkpoint-1', x: 2050, y: 470, respawnX: 2050, respawnY: 470 }],
  finish: {
    x: 3260,
    y: 456,
    width: 64,
    height: 150,
  },
};
