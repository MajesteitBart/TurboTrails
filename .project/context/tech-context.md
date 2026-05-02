# Tech Context

## Stack

- Engine: Phaser 4.1.0.
- Physics: Phaser Matter Physics.
- Language: TypeScript.
- Build tool: Vite.
- Unit tests: Vitest.
- Browser tests: Playwright.
- Storage: versioned `localStorage` save under `turbo-trails-2-save-v1`.
- Hosting: static web hosting from `npm run build`.

## Commands

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run e2e`

## Important Constraints

- Keep `phaser` on `4.1.0` unless a documented Matter blocker forces fallback to `3.90.0`.
- Use data-driven levels and vehicles.
- Keep gameplay code browser-only.
- Prevent page scroll during gameplay with `touch-action: none` and full-viewport canvas styles.
