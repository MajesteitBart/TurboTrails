import { SAVE_KEY } from '../game/constants';
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

  reset(): SaveGameV1 {
    const next = createDefaultSave();
    this.save(next);
    return next;
  }
}
