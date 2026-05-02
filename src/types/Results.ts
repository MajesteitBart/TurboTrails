export interface LevelResults {
  levelId: string;
  levelTitle: string;
  timeMs: number;
  coins: number;
  totalCoins: number;
  chests: number;
  totalChests: number;
  stars: 0 | 1 | 2 | 3;
  score: number;
}
