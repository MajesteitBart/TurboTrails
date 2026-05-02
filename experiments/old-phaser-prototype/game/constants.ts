export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
export const SAVE_KEY = 'turbo-trails-2-save-v1';

export function isDebugEnabled(): boolean {
  return import.meta.env.DEV && new URLSearchParams(window.location.search).get('debug') === '1';
}
