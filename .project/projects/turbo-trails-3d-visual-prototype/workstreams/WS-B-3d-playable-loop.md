---
name: WS-B 3D Playable Loop
owner: team
status: done
created: 2026-05-02T12:05:00Z
updated: 2026-05-02T12:05:00Z
---

# Workstream: WS-B 3D Playable Loop

## Objective

Turn the standalone 3D visual prototype into a first playable 3D side-view loop with input, bike movement, camera follow, HUD, reset, and e2e coverage.

## Owned Files/Areas

- `src/three/`
- `e2e/three-prototype.spec.ts`
- `screenshots/3d-visual-prototype.png`

## Dependencies

WS-A 3D render prototype.

## Risks

This is not the final vehicle physics model. Keep the first loop stable and simple before adding suspension/wheels.

## Handoff Criteria

Player can move the 3D bike along the first track with keyboard input, camera follows, HUD updates, reset works, and e2e validates state changes.
