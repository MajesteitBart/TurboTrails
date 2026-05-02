---
name: Turbo Trails First Playable
status: planned
lead: team
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
linear_project_id:
risk_level: medium
spec_status_at_plan_time: active
---

# Delivery Plan: Turbo Trails First Playable

## What Changed After Probe

The project is narrowed from the full MVP to one first playable Forest Trails level. This gives a concrete target for visual quality and playability before the full 12-level plan.

## Architecture Decisions

- Keep the broad `stuntgame` project as the long-range MVP umbrella.
- Use this project as the detailed implementation slice.
- Disable Matter debug rendering by default.
- Build first visuals from Phaser primitives and gradients where possible.
- Add level data and UI structure incrementally, without blocking on final art.

## Probe-Driven Architecture Changes

- Playwright tests assert canvas/title instead of in-canvas text.
- Visual acceptance now includes screenshot review.

## Workstream Design

- WS-A Visual First Playable: menu, forest scene, HUD, touch overlay, screenshot quality.
- WS-B Level Slice Systems: level data, collectibles, checkpoint, finish, restart.
- WS-C Movement Feel: improve simple bike movement enough for the first level while full composite physics remains later work.
- WS-D Verification: build, unit tests, e2e, screenshot review.

## Milestone Strategy

1. Replace ugly scaffold presentation.
2. Add first Forest level objects and HUD state.
3. Improve movement and restart loop.
4. Verify and capture new screenshot.

## Rollout Strategy

Keep `npm run dev` as the playable entry point. The first playable should become the default game view from the menu.

## Test Strategy

- Existing Vitest suite remains required.
- Existing Playwright desktop/touch smoke tests remain required.
- Add focused tests for level data or collection logic when pure helpers exist.

## Rollback Strategy

Changes are mostly visual and scene-local. Revert scene code if it destabilizes build or game boot, while retaining the Delano project decomposition.

## Remaining Delivery Risks

- Phaser primitive visuals can still look cheap if composition is not deliberate.
- Simple bike physics may not feel good enough until WS-C.
