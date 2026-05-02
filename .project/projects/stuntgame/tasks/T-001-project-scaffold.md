---
id: T-001
name: Project scaffold
status: done
created: 2026-05-02T08:29:56Z
updated: 2026-05-02T08:29:56Z
linear_issue_id:
github_issue:
github_pr:
depends_on: []
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: Project scaffold

## Description

Set up Phaser 4.1.0, TypeScript, Vite, Vitest, Playwright, Matter Physics, and the first playable shell for Turbo Trails 2.0.

## Acceptance Criteria

- [x] `npm run dev` launches the game.
- [x] `npm run build` passes.
- [x] `npm run test` passes.
- [x] One scene shows a background, ground, placeholder bike, and debug text.
- [x] Canvas scales to viewport and page does not scroll.

## Technical Notes

Manual Vite setup is used because this repository already contains Delano and npm metadata.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Scaffold files created.
- 2026-05-02: `npm run build` passed.
- 2026-05-02: `npm run test` passed with 3 files and 6 tests.
- 2026-05-02: `npm run e2e` passed with desktop and touch-emulated smoke tests.
