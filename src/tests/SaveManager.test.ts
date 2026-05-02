import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SAVE_KEY } from '../game/constants';
import { createDefaultSave, SaveManager } from '../systems/SaveManager';

function createStorageMock(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
}

describe('SaveManager', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createStorageMock());
    localStorage.clear();
  });

  it('creates a default save when no save exists', () => {
    expect(new SaveManager().load()).toEqual(createDefaultSave());
  });

  it('resets corrupt saves safely', () => {
    localStorage.setItem(SAVE_KEY, 'not-json');
    expect(new SaveManager().load()).toEqual(createDefaultSave());
  });

  it('records level results and keeps best values', () => {
    const manager = new SaveManager();
    manager.recordLevelResults({
      levelId: 'forest-01-basics',
      levelTitle: 'Forest 01: Basics',
      timeMs: 40000,
      coins: 3,
      totalCoins: 9,
      chests: 1,
      totalChests: 1,
      chestIds: ['chest-1'],
      stars: 2,
      score: 1200,
    });
    const updated = manager.recordLevelResults({
      levelId: 'forest-01-basics',
      levelTitle: 'Forest 01: Basics',
      timeMs: 50000,
      coins: 2,
      totalCoins: 9,
      chests: 1,
      totalChests: 1,
      chestIds: ['chest-1'],
      stars: 1,
      score: 900,
    });

    expect(updated.coins).toBe(5);
    expect(updated.levelRecords['forest-01-basics']).toEqual({
      bestTimeMs: 40000,
      stars: 2,
      chestsCollected: ['chest-1'],
      bestScore: 1200,
      completed: true,
    });
  });
});
