---
id: T-003
name: 3D bike physics tuning
status: ready
created: 2026-05-02T12:12:00Z
updated: 2026-05-02T12:12:00Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-002]
conflicts_with: []
parallel: false
priority: high
estimate: L
---

# Task: 3D bike physics tuning

## Description

Improve the first playable 3D bike physics so it behaves more like a stunt bike with grounded traction, airborne tilt, and better ramp handling.

## Acceptance Criteria

- [ ] Movement no longer depends primarily on direct velocity assist.
- [ ] Wheels visibly rotate and align with terrain motion.
- [ ] Jump/contact logic is based on track proximity or Rapier contacts.
- [ ] Camera follow remains smooth.
- [ ] `npm run build`, `npm run test`, and `npm run e2e` pass.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Screenshot captured
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created after first playable 3D loop.
