export interface LevelResults {
  levelId: string;
  levelTitle: string;
  timeMs: number;
  coins: number;
  totalCoins: number;
  chests: number;
  totalChests: number;
  chestIds: string[];
  stars: 0 | 1 | 2 | 3;
  score: number;
}
