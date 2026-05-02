---
id: T-004
name: Basic results flow
status: ready
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

- [ ] Finish transitions to a results view or overlay.
- [ ] Results show time, coins, chests, and stars.
- [ ] Retry returns to `forest-01-basics`.
- [ ] Menu returns to the main menu.
- [ ] Score/stars use existing `ScoreSystem` helpers.
- [ ] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Keep savegame/progression out of this task unless it is trivial. This task is about loop completeness.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Review complete
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created after first bike feel pass.
