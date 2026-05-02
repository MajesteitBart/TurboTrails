---
id: T-006
name: Save first level results
status: ready
created: 2026-05-02T09:12:00Z
updated: 2026-05-02T09:12:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-005]
conflicts_with: []
parallel: false
priority: high
estimate: M
---

# Task: Save first level results

## Description

Persist Forest 01 completion results to localStorage and show completion state in Level Select.

## Acceptance Criteria

- [ ] Results save best time, stars, score, and chest IDs for `forest-01-basics`.
- [ ] Level Select shows completed/star state after returning from results.
- [ ] Refresh keeps saved progress.
- [ ] Corrupt save recovery still works.
- [ ] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Use existing `SaveManager` and `SaveGameV1`. Keep coins simple; full economy can come later.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Review complete
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created after menu/level flow.
