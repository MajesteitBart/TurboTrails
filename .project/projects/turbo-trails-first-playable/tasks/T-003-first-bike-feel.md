---
id: T-003
name: First bike feel
status: done
created: 2026-05-02T08:55:00Z
updated: 2026-05-02T08:55:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-002]
conflicts_with: []
parallel: false
priority: high
estimate: L
---

# Task: First bike feel

## Description

Improve the first playable bike movement enough that the Forest level can be driven end to end. This is not the final suspension system; it is the first feel pass.

## Acceptance Criteria

- [x] Throttle and brake feel controllable across the first route.
- [x] Jump is gated by recent ground contact instead of raw y-position.
- [x] Tilt torque works in air and is softer on ground.
- [x] Restart returns to start or active checkpoint without breaking collectible state.
- [x] Bike visual remains aligned with the physics body.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Use `VehicleConfig` values where possible. If Matter compound bodies are introduced here, keep the implementation small and documented.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created after first level data work.
- 2026-05-02: Added `BikeMovement` and Phaser-free `BikeContact` helpers.
- 2026-05-02: Movement now uses Starter Dirt Bike tuning from `VehicleConfig`.
- 2026-05-02: Added coyote-time jump tests.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
