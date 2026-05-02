# Turbo Trails 3D

Turbo Trails 3D is a browser stunt-bike prototype built with TypeScript, Vite, Babylon.js, and Rapier. The current playable slice launches directly into a side-view 3D warehouse level with keyboard and touch controls, collectibles, stunt scoring hooks, a checkpoint, crash handling, and finish progress.

## Current State

- Main entry point: `src/main.ts`
- App shell: `src/app/TurboTrailsApp.ts`
- Active level: `src/levels/WarehouseLevel.ts`
- Vehicle physics: `src/vehicle/RaycastBike.ts`
- Input and HUD: `src/ui/`
- Gameplay systems and tests: `src/systems/` and `src/tests/`
- Browser smoke tests: `e2e/warehouse-vertical-slice.spec.ts`

The repository also contains Delano delivery context under `.project/` and `.agents/`. Some older project notes still refer to earlier Phaser and Three.js prototypes, so verify against the current source and `package.json` before making implementation decisions.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite serves the game locally. Open the printed local URL and use:

- `ArrowLeft` / `ArrowRight`: drive
- `ArrowUp`: tilt forward
- `ArrowDown`: tilt back
- `Space`: jump
- `R`: restart

Touch controls are rendered in-game for mobile and tablet smoke testing.

## Verification

```bash
npm run build
npm run test
npm run e2e
npx delano validate
```

Use the narrowest meaningful check while iterating. Run the full set before handing off material gameplay, engine, or Delano workflow changes.

## Project Notes

- This is a static browser app; production output is generated in `dist/`.
- `window.__TURBO_TRAILS_3D_STATE__` is exposed for Playwright assertions.
- Screenshots and videos from e2e runs may appear under `screenshots/` and `test-results/`.
- Delano source-of-truth policy: `.project/` holds delivery context; `.delano/` is only an optional UI layer.
