import { forest01Basics } from './forest-01-basics';

export const levels = {
  [forest01Basics.id]: forest01Basics,
};

export type LevelId = keyof typeof levels;
