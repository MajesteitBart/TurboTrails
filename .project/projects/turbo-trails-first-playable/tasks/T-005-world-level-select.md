---
id: T-005
name: World and level select
status: done
created: 2026-05-02T09:08:00Z
updated: 2026-05-02T09:08:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-004]
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: World and level select

## Description

Add first-pass World Select and Level Select scenes so the game flow looks like a game instead of one start button.

## Acceptance Criteria

- [x] Main menu has Play and Garage actions.
- [x] Play opens World Select.
- [x] Forest Trails world opens Level Select.
- [x] Level Select launches `forest-01-basics`.
- [x] Garage placeholder displays the Starter Dirt Bike and returns to menu.
- [x] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

No unlock progression yet. Keep all worlds except Forest disabled/coming soon.

## Definition of Done

- [x] Implementation complete
- [x] Tests pass
- [x] Review complete
- [x] Docs updated

## Evidence Log

- 2026-05-02: Task created after basic results flow.
- 2026-05-02: Added World Select, Level Select, and Garage scenes.
- 2026-05-02: Added `src/data/worlds.ts` with Forest available and Warehouse/Mine coming soon.
- 2026-05-02: Expanded Playwright navigation coverage.
- 2026-05-02: `npm run build`, `npm run test`, and `npm run e2e` passed.
