---
id: T-001
name: 3D side-view prototype
status: done
created: 2026-05-02T09:58:00Z
updated: 2026-05-02T09:58:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: []
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: 3D side-view prototype

## Description

Build a standalone Three.js prototype that demonstrates the intended realistic side-view 3D direction.

## Acceptance Criteria

- [x] `/3d.html` loads a Three.js scene.
- [x] Scene has orthographic side-view camera with slight top-down depth.
- [x] Scene has 3D terrain, ramps, props, bike, rider, lighting, fog, and shadows.
- [x] E2E test verifies 3D render state.
- [x] Screenshot saved to `screenshots/3d-visual-prototype.png`.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Screenshot captured
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created.
- 2026-05-02: Added standalone `/3d.html` Three.js/Rapier prototype.
- 2026-05-02: Added side-view orthographic 3D forest track, bike, rider, props, lighting, shadows, and fog.
- 2026-05-02: Captured `screenshots/3d-visual-prototype.png`.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
