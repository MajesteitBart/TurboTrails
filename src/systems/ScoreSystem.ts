export interface ScoreInput {
  finished: boolean;
  timeMs: number;
  targetTimes: {
    threeStars: number;
    twoStars: number;
    oneStar: number;
  };
  coins: number;
  chests: number;
  stuntExp: number;
  crashed: boolean;
}

export function calculateStars(input: ScoreInput): 0 | 1 | 2 | 3 {
  if (!input.finished) {
    return 0;
  }
  if (input.timeMs <= input.targetTimes.threeStars) {
    return 3;
  }
  if (input.timeMs <= input.targetTimes.twoStars) {
    return 2;
  }
  return 1;
}

export function calculateScore(input: ScoreInput): number {
  const finishBonus = input.finished ? 1000 : 0;
  const collectibleScore = input.coins * 10 + input.chests * 150;
  const noCrashBonus = input.finished && !input.crashed ? 250 : 0;
  return finishBonus + collectibleScore + input.stuntExp + noCrashBonus;
}
