---
id: T-002
name: Bike physics prototype
status: ready
created: 2026-05-02T08:29:56Z
updated: 2026-05-02T08:29:56Z
linear_issue_id:
github_issue:
github_pr:
depends_on: [T-001]
conflicts_with: []
parallel: false
priority: high
estimate: L
---

# Task: Bike physics prototype

## Description

Replace the placeholder bike body with a Matter composite bike using chassis, wheels, constraints, wheel contact state, torque, throttle, brake, jump, camera follow, and basic crash/reset.

## Acceptance Criteria

- [ ] Player can drive at least 20 meters.
- [ ] Player can climb or cross a simple ramp.
- [ ] Player can make a small jump.
- [ ] Restart resets to the current checkpoint/start.
- [ ] Physics values come from `VehicleConfig`.

## Technical Notes

Start with Starter Dirt Bike values from the product spec. Add comments only around non-obvious Matter constraint or contact logic.

## Definition of Done

- [ ] Implementation complete
- [ ] Tests pass
- [ ] Review complete
- [ ] Docs updated

## Evidence Log

- 2026-05-02: Task created.
