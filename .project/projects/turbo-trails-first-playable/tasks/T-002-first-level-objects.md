---
id: T-002
name: First level objects
status: done
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-001]
conflicts_with: []
parallel: true
priority: high
estimate: M
---

# Task: First level objects

## Description

Add the first data-backed Forest level objects: coins, chest, checkpoint, finish, and simple pickup/finish state.

## Acceptance Criteria

- [x] `forest-01-basics` exists as level data.
- [x] Coins and chest render on the path.
- [x] Player can collect visible objects.
- [x] Checkpoint can become active.
- [x] Finish triggers a basic results/status state.

## Technical Notes

Keep object handling simple. Generalize only where it directly supports the next level.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created.
- 2026-05-02: Added `src/data/levels/forest-01-basics.ts`.
- 2026-05-02: Added typed level contracts and runtime helpers.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
