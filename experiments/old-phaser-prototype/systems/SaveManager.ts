import { SAVE_KEY } from '../game/constants';
import type { LevelResults } from '../types/Results';
import type { SaveGameV1 } from '../types/SaveGame';

export function createDefaultSave(): SaveGameV1 {
  return {
    version: 1,
    coins: 0,
    totalExp: 0,
    unlockedWorlds: ['forest'],
    unlockedLevels: ['forest-01-basics'],
    unlockedVehicles: ['starter-dirt-bike'],
    selectedVehicleId: 'starter-dirt-bike',
    selectedRiderId: 'player',
    levelRecords: {},
    settings: {
      sound: true,
      music: true,
      showTouchControls: 'auto',
    },
  };
}

export class SaveManager {
  load(): SaveGameV1 {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      return createDefaultSave();
    }

    try {
      const parsed = JSON.parse(raw) as Partial<SaveGameV1>;
      if (parsed.version !== 1) {
        return createDefaultSave();
      }

      return {
        ...createDefaultSave(),
        ...parsed,
        settings: { ...createDefaultSave().settings, ...parsed.settings },
      };
    } catch {
      return createDefaultSave();
    }
  }

  save(saveGame: SaveGameV1): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveGame));
  }

  recordLevelResults(results: LevelResults): SaveGameV1 {
    const saveGame = this.load();
    const current = saveGame.levelRecords[results.levelId];
    const bestTimeMs =
      current?.bestTimeMs === undefined ? results.timeMs : Math.min(current.bestTimeMs, results.timeMs);

    saveGame.levelRecords[results.levelId] = {
      bestTimeMs,
      stars: Math.max(current?.stars ?? 0, results.stars) as 0 | 1 | 2 | 3,
      chestsCollected: Array.from(new Set([...(current?.chestsCollected ?? []), ...results.chestIds])),
      bestScore: Math.max(current?.bestScore ?? 0, results.score),
      completed: true,
    };
    saveGame.coins += results.coins;

    this.save(saveGame);
    return saveGame;
  }

  reset(): SaveGameV1 {
    const next = createDefaultSave();
    this.save(next);
    return next;
  }
}
