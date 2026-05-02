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
});
