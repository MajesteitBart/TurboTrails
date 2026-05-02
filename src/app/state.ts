export interface TurboTrails3DGameState {
  ready: boolean;
  scene: 'WarehouseLevel';
  status: 'playing' | 'crashed' | 'finished' | 'paused';
  bikeX?: number;
  progress?: number;
  grounded?: boolean;
  coins?: number;
  checkpoint?: boolean;
  finish?: boolean;
  lastStunt?: string;
  meshCount?: number;
}

declare global {
  interface Window {
    __TURBO_TRAILS_3D_STATE__?: TurboTrails3DGameState;
  }
}

export class GameStateReporter {
  static set(update: Partial<TurboTrails3DGameState> & Pick<TurboTrails3DGameState, 'ready'>): void {
    window.__TURBO_TRAILS_3D_STATE__ = {
      scene: 'WarehouseLevel',
      status: 'playing',
      ...window.__TURBO_TRAILS_3D_STATE__,
      ...update,
    };
  }
}
