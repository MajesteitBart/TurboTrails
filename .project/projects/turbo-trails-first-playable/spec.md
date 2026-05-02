---
name: Turbo Trails First Playable
slug: turbo-trails-first-playable
owner: team
status: active
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
outcome: Replace the bare scaffold with one attractive, playable Forest Trails level that proves the game loop before building the full MVP.
uncertainty: medium
probe_required: true
probe_status: active
---

# Spec: Turbo Trails First Playable

## Executive Summary

This project is the first real vertical slice for `Turbo Trails 2.0`. It intentionally does not attempt the full 12-level MVP. It focuses on making one browser-playable Forest Trails level feel like an actual game: readable art direction, HUD, controls, collectibles, checkpoint, finish, restart, and a first version of bike movement.

## Problem and Users

The current scaffold is visually ugly and too abstract. It proves rendering, but it does not help evaluate whether kids will understand the game, want to play, or feel the trialbike fantasy.

## Outcome and Success Metrics

- The first screen looks like a game, not an engine test.
- One Forest level has start, terrain, coins, chest, checkpoint, finish, and restart.
- Keyboard controls move and tilt the vehicle.
- Touch control buttons are visible and sized for landscape play.
- HUD shows timer, progress, coins, chests, stunt/status message, and restart/pause affordances.
- `npm run build`, `npm run test`, and `npm run e2e` pass.

## Scope

### In Scope

- Improve Main Menu and GameScene visual presentation.
- Add a data file for `forest-01-basics`.
- Add simple collectible/checkpoint/finish rendering and state.
- Add HUD and on-screen control overlays.
- Improve placeholder bike from a rectangle into a readable stylized vehicle made from simple shapes.
- Keep physics simple enough to remain stable.

### Out of Scope

- Full compound wheel suspension bike.
- All 12 levels.
- Garage/unlocks.
- Audio polish.
- Production art assets.

## Functional Requirements

- Player can start the first level from the menu.
- Player can drive right, brake/reverse, tilt, jump, and restart.
- Coins and chest visibly exist on the level path.
- Checkpoint and finish have clear markers.
- HUD updates timer and progress.
- Touch controls use Phaser pointer events and do not scroll the page.

## Non-Functional Requirements

- Cartoon, bright, readable, child-friendly.
- Avoid debug-blue Matter outlines in normal screenshots.
- Keep visual elements sized for 1280 x 720.
- Keep code structured for later replacement by real data loader and entities.

## Hypotheses and Unknowns

- Better presentation can be achieved with Phaser shapes before real sprite assets.
- Current simple Matter body is enough for visual slice while the next project develops full bike physics.

## Touchpoints to Exercise

- Full viewport canvas.
- Camera follow.
- HUD and touch overlay fixed to camera.
- Forest level readability.
- Smoke tests on desktop and touch emulation.

## Probe Findings

The screenshot from `screenshots/screenshot-scaffold.png` shows the initial scaffold is visually unacceptable: dark empty space, crude tree blobs, visible debug physics outlines, and no game feedback.

## Footguns Discovered

- Matter debug rendering must be disabled for normal development screenshots.
- Canvas text is not DOM text; Playwright smoke tests should assert title/canvas or game state hooks.

## Remaining Unknowns

- The final compound-bike feel still requires a separate physics task.

## Dependencies

- Existing Phaser/Vite scaffold.
- Existing `InputController`, save, score, and stunt systems.

## Approval Notes

Created after user feedback on 2026-05-02 that the scaffold was too broad and visually poor.
