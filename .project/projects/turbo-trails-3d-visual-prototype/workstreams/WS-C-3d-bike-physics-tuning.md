---
name: WS-C 3D Bike Physics Tuning
owner: team
status: planned
created: 2026-05-02T12:12:00Z
updated: 2026-05-02T12:12:00Z
---

# Workstream: WS-C 3D Bike Physics Tuning

## Objective

Replace the first playable velocity assist with more convincing 3D bike physics: wheel bodies, constraints, suspension, traction, and jump/contact logic.

## Owned Files/Areas

- `src/three/`
- `e2e/three-prototype.spec.ts`

## Dependencies

Completed 3D playable loop.

## Risks

Compound vehicle physics can become unstable. Keep tuning incremental and screenshot-driven.

## Handoff Criteria

Bike movement looks and feels like a stunt bike rather than a box body with visual wheels.
