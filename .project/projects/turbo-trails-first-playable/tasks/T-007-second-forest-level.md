---
id: T-007
name: Second Forest level
status: ready
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

- [ ] `forest-02-first-flip` exists as level data.
- [ ] Forest Level Select shows Forest 01 and Forest 02.
- [ ] Selecting Forest 02 launches its own level data.
- [ ] Results/save flow works for Forest 02.
- [ ] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Keep visuals primitive. Focus on data-driven level selection and a higher ramp/coin arc.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Review complete
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created after first save/progression slice.
