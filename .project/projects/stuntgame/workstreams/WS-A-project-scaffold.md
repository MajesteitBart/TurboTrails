---
name: WS-A Project Scaffold and Runtime
owner: team
status: done
created: 2026-05-02T08:29:56Z
updated: 2026-05-02T08:29:56Z
---

# Workstream: WS-A Project Scaffold and Runtime

## Objective

Create a working Phaser 4 + TypeScript + Vite app shell with Matter enabled, responsive canvas, no page scroll, basic scene flow, and build/test commands.

## Owned Files/Areas

- `package.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.ts`
- `src/game/`
- `src/scenes/`
- `src/styles.css`

## Dependencies

None.

## Risks

Phaser 4 and current TypeScript/Vite versions may expose type or runtime compatibility issues.

## Handoff Criteria

- `npm run build` passes.
- `npm run test` passes.
- Browser shows the game shell through `npm run dev`.
