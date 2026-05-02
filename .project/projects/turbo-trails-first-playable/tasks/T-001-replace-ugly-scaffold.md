---
id: T-001
name: Replace ugly scaffold view
status: done
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: []
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: Replace ugly scaffold view

## Description

Turn the current blank dark scaffold into a composed first playable screen with a stylized forest background, shaped terrain, HUD, touch controls, and a readable placeholder bike.

## Acceptance Criteria

- [x] Matter debug outlines are off by default.
- [x] Menu looks intentionally designed.
- [x] Game scene has layered forest visuals and clear foreground track.
- [x] HUD shows timer, progress, coins, chests, and status.
- [x] Touch control buttons are visible in landscape.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Use Phaser primitives for now. Do not introduce external copyrighted assets.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Created after screenshot review.
- 2026-05-02: Replaced scaffold scene with first playable Forest presentation.
- 2026-05-02: Captured `screenshots/current-first-playable.png`.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
