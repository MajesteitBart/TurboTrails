---
name: Turbo Trails 2.0
slug: stuntgame
owner: team
status: active
created: 2026-05-02T08:17:25Z
updated: 2026-05-02T08:29:56Z
outcome: Build a browser-playable MVP stunt/trialbike game with 3 worlds, 12 levels, 4 vehicles, collectibles, stunts, progression, and local saves.
uncertainty: medium
probe_required: true
probe_status: pending
---

# Spec: Turbo Trails 2.0

## Executive Summary

Turbo Trails 2.0 is an original, child-friendly 2D side-scrolling stunt/trialbike browser game inspired by the general trialbike genre, not by copied assets, levels, UI, names, or sounds. Players drive bikes and later cars through short obstacle levels, collect coins and chests, perform stunts, hit checkpoints, finish levels, earn stars, and unlock vehicles.

The implementation uses Phaser 4.1.0, Matter Physics, TypeScript, and Vite. The game ships as static browser files with local progress stored in `localStorage`.

## Problem and Users

The primary users are children who want a fast, readable stunt game that works on desktop keyboards and touch devices. The game should be easy to restart, generous with checkpoints, and visually clear enough that crashes feel fair.

## Outcome and Success Metrics

- `npm run dev` launches a playable browser game.
- `npm run build` produces a static production bundle.
- MVP includes 3 worlds, 12 levels, 4 vehicles, checkpoints, finish detection, coins, chests, backflip/frontflip/wheelie/stoppie detection, results, garage unlocks, and local saves.
- Keyboard and touch controls share one input state.
- Vitest covers save, score, and stunt logic.
- Playwright loads the game in desktop and touch-emulated browsers.

## Scope

### In Scope

- Phaser 4.1.0 + Matter Physics + TypeScript + Vite setup.
- Forest Trails, Warehouse Blast, and Underground Mine MVP worlds.
- Data-driven vehicle and level definitions.
- Four MVP vehicles: Starter Dirt Bike, Donky Mini Bike, Long Stunt Bike, and Stunt Buggy.
- Rider choices: `Levi`, `Noah`, and `Player` with simple helmet colors.
- Local-only savegame under `turbo-trails-2-save-v1`.
- Placeholder art using Phaser shapes and organized asset folders.

### Out of Scope

- Backend, accounts, multiplayer, ads, microtransactions, lootboxes, real brands, copied assets, or exact clone behavior.
- Realistic violence. Obstacle arenas must stay cartoon and non-graphic.
- Photo/avatar import before Phase 2.

## Functional Requirements

- Implement scene flow: Boot, Preload, Main Menu, World Select, Level Select, Garage, Game, Results, Settings.
- Implement shared `PlayerInputState` for keyboard and touch.
- Build Matter vehicle physics with chassis, wheels, constraints, jump impulse, torque, wheel contact state, checkpoints, and crash/reset.
- Load levels from JSON-like data without code changes per level.
- Detect and score backflips, frontflips, wheelies, and stoppies.
- Award coins, chests, EXP, stars, personal bests, and unlocks.
- Add debug mode via `?debug=1`.

## Non-Functional Requirements

- Static hosting only.
- Canvas design resolution: 1280 x 720, responsive fit to viewport.
- Landscape-first with portrait warning overlay.
- Target 60 FPS on normal laptops and 30-60 FPS on average tablets.
- `touch-action: none` and no page scrolling during gameplay.
- No external copyrighted assets from the reference game.

## Hypotheses and Unknowns

- Phaser 4.1.0 Matter APIs are sufficient for a compound bike with stable constraints.
- Phaser 4 package compatibility with current TypeScript and Vite versions must be verified early.
- Touch multi-pointer behavior should work cleanly through Phaser pointer events.
- Browser performance with Matter composites and 12 levels should stay within target using simple assets.

## Touchpoints to Exercise

- Bike composite stability on ramps, jumps, and loop/half-loop geometry.
- Touch and keyboard parity through `InputController`.
- Save migration and corrupt-save recovery.
- Level JSON loading and object placement.
- Playwright tablet/touch launch smoke test.

## Probe Findings

Pending. Milestone 1 has created the app shell and a simple Matter placeholder body to verify Phaser/Vite integration.

## Footguns Discovered

- On this PowerShell version, `&&` is not a valid command separator.
- Running npm installs in parallel can race on `package.json`; package installs should be sequential when they mutate npm metadata.

## Remaining Unknowns

- Exact bike tuning values need playtesting once chassis and wheel constraints exist.
- Phaser 4 Matter API types may require targeted wrappers or a Phaser 3.90 fallback if structural issues appear.

## Dependencies

- Node.js compatible with current Vite requirements.
- Phaser `4.1.0`.
- Matter Physics through Phaser.
- Vite, TypeScript, Vitest, Playwright, ESLint, and Prettier.

## Approval Notes

User supplied the product and technical spec on 2026-05-02. Implementation should proceed milestone by milestone and record assumptions in `docs/ASSUMPTIONS.md`.
