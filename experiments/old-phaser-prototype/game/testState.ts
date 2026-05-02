export interface TurboTrailsTestState {
  scene?: string;
  levelId?: string;
  worldId?: string;
  savedLevelIds?: string[];
}

declare global {
  interface Window {
    __TURBO_TRAILS_STATE__?: TurboTrailsTestState;
  }
}

export function setTestState(nextState: TurboTrailsTestState): void {
  if (!import.meta.env.DEV) {
    return;
  }

  window.__TURBO_TRAILS_STATE__ = {
    ...window.__TURBO_TRAILS_STATE__,
    ...nextState,
  };
}
