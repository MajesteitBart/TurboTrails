export interface TurboTrails3DState {
  ready: boolean;
  meshCount: number;
  camera: 'orthographic-side';
  bikeX?: number;
  progress?: number;
  grounded?: boolean;
}

declare global {
  interface Window {
    __TURBO_TRAILS_3D_STATE__?: TurboTrails3DState;
  }
}

export function setThreeState(state: TurboTrails3DState): void {
  if (!import.meta.env.DEV) {
    return;
  }

  window.__TURBO_TRAILS_3D_STATE__ = state;
}
