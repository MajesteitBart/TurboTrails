---
id: T-008
name: Touch and portrait polish
status: ready
created: 2026-05-02T09:24:00Z
updated: 2026-05-02T09:24:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-007]
conflicts_with: []
parallel: false
priority: medium
estimate: M
---

# Task: Touch and portrait polish

## Description

Add a portrait orientation warning and tighten touch-control behavior for the first playable.

## Acceptance Criteria

- [ ] Portrait viewport shows clear rotate-screen guidance.
- [ ] Landscape viewport keeps gameplay visible.
- [ ] Touch controls remain multi-touch capable.
- [ ] Page scroll remains disabled.
- [ ] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Technical Notes

Use Phaser UI or CSS, whichever stays simpler and reliable in canvas.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Review complete
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created after second Forest level.
