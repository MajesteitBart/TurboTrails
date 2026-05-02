export interface SaveGameV1 {
  version: 1;
  coins: number;
  totalExp: number;
  unlockedWorlds: string[];
  unlockedLevels: string[];
  unlockedVehicles: string[];
  selectedVehicleId: string;
  selectedRiderId: string;
  levelRecords: Record<
    string,
    {
      bestTimeMs?: number;
      stars: 0 | 1 | 2 | 3;
      chestsCollected: string[];
      bestScore: number;
      completed: boolean;
    }
  >;
  settings: {
    sound: boolean;
    music: boolean;
    showTouchControls: 'auto' | 'always' | 'never';
  };
}
