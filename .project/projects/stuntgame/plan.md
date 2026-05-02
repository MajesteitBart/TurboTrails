---
name: Turbo Trails 2.0
status: planned
lead: team
created: 2026-05-02T08:17:25Z
updated: 2026-05-02T08:29:56Z
linear_project_id:
risk_level: medium
spec_status_at_plan_time: active
---

# Delivery Plan: Turbo Trails 2.0

## What Changed After Probe

Initial probe is not complete. The repository now has a Phaser/Vite/Matter shell to validate the chosen stack before full bike physics.

## Architecture Decisions

- Use Phaser 4.1.0, Matter Physics, TypeScript, and Vite.
- Keep level and vehicle data outside scene code.
- Use Phaser shapes for placeholder assets until sprite production starts.
- Store save state locally through a versioned `SaveManager`.
- Keep keyboard and touch input behind one `InputController`.

## Probe-Driven Architecture Changes

Pending. The first probe should validate Phaser 4 Matter body creation, Vite build, and test runner compatibility.

## Workstream Design

- WS-A Project Scaffold and Runtime: build tooling, app shell, scenes, static hosting readiness.
- WS-B Vehicle Physics and Controls: bike/car factories, Matter bodies, input, camera, crash/reset.
- WS-C Level Data and World Flow: level schema, loader, worlds, checkpoints, finish, 12 MVP levels.
- WS-D Stunts, Score, Save, and Garage: stunt detection, collectibles, results, unlocks, save migration.
- WS-E Quality, Touch QA, and Polish: Vitest, Playwright, performance, settings, audio placeholders.

## Milestone Strategy

1. Project scaffold.
2. Bike physics prototype.
3. Touch controls.
4. Level loader.
5. Stunts, score, and collectibles.
6. Garage and progression.
7. Worlds and polish.
8. Tests and CI.

## Rollout Strategy

Build a static browser app. Each milestone must leave `npm run build` passing. Playable slices should be available through `npm run dev`.

## Test Strategy

- Vitest for pure systems: save, score, stunt detection, level parsing.
- Playwright for game boot and touch-emulated smoke tests.
- Manual playtesting after physics-affecting changes.

## Rollback Strategy

Keep milestone changes scoped. If Phaser 4 Matter integration blocks bike physics, document evidence and switch to Phaser 3.90.0 as the approved fallback.

## Remaining Delivery Risks

- Physics tuning can consume time if the bike composite is unstable.
- Phaser 4 ecosystem/tooling may be newer than dependencies expect.
- Touch controls need real-device or touch-emulated verification.
