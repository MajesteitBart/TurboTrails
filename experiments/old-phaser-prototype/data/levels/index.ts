import { forest01Basics } from './forest-01-basics';
import { forest02FirstFlip } from './forest-02-first-flip';

export const levels = {
  [forest01Basics.id]: forest01Basics,
  [forest02FirstFlip.id]: forest02FirstFlip,
};

export type LevelId = keyof typeof levels;
