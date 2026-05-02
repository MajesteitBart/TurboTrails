---
id: T-004
name: Basic results flow
status: done
created: 2026-05-02T09:00:00Z
updated: 2026-05-02T09:00:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-003]
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: Basic results flow

## Description

Show a basic results screen after finishing `forest-01-basics` so the first playable has a complete loop.

## Acceptance Criteria

- [x] Finish transitions to a results view or overlay.
- [x] Results show time, coins, chests, and stars.
- [x] Retry returns to `forest-01-basics`.
- [x] Menu returns to the main menu.
- [x] Score/stars use existing `ScoreSystem` helpers.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Keep savegame/progression out of this task unless it is trivial. This task is about loop completeness.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created after first bike feel pass.
- 2026-05-02: Added `ResultsScene` and finish handoff from `GameScene`.
- 2026-05-02: Results use `ScoreSystem` for score and stars.
- 2026-05-02: Added Playwright coverage for retry and menu actions.
- 2026-05-02: `npm run build`, `npm run test`, `npm run e2e`, and `npx delano validate` passed.
