---
id: T-007
name: Second Forest level
status: done
created: 2026-05-02T09:22:00Z
updated: 2026-05-02T09:22:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-006]
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: Second Forest level

## Description

Add `forest-02-first-flip` as the second playable level and make `GameScene` honor the selected level id.

## Acceptance Criteria

- [x] `forest-02-first-flip` exists as level data.
- [x] Forest Level Select shows Forest 01 and Forest 02.
- [x] Selecting Forest 02 launches its own level data.
- [x] Results/save flow works for Forest 02.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Keep visuals primitive. Focus on data-driven level selection and a higher ramp/coin arc.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created after first save/progression slice.
- 2026-05-02: Added `forest-02-first-flip` level data.
- 2026-05-02: `GameScene` now honors selected level id.
- 2026-05-02: Added unit and e2e coverage for Forest 02.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
