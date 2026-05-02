---
id: T-002
name: 3D playable loop
status: done
created: 2026-05-02T12:05:00Z
updated: 2026-05-02T12:05:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-001]
conflicts_with: []
parallel: false
priority: high
estimate: L
---

# Task: 3D playable loop

## Description

Add keyboard-controlled 3D bike movement to `/3d.html` with camera follow, HUD, reset, and state exposed for e2e.

## Acceptance Criteria

- [x] Arrow/WASD input moves the 3D bike.
- [x] Space jumps when near the track.
- [x] Camera follows the bike from side/top perspective.
- [x] HUD shows controls and progress.
- [x] R resets the bike.
- [x] E2E verifies bike x-position changes after input.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Screenshot captured
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created.
- 2026-05-02: Added keyboard-controlled 3D bike body, camera follow, HUD, reset, and movement e2e assertion.
- 2026-05-02: Captured updated `screenshots/3d-visual-prototype.png`.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
