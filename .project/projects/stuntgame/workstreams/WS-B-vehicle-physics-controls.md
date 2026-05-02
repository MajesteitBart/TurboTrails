---
name: WS-B Vehicle Physics and Controls
owner: team
status: planned
created: 2026-05-02T08:29:56Z
updated: 2026-05-02T08:29:56Z
---

# Workstream: WS-B Vehicle Physics and Controls

## Objective

Implement Matter vehicle bodies, controls, wheel contact, jump, torque, camera follow, crash/reset, and touch controls.

## Owned Files/Areas

- `src/entities/`
- `src/systems/InputController.ts`
- `src/systems/TouchControls.ts`
- `src/systems/KeyboardControls.ts`
- `src/systems/BikePhysicsFactory.ts`
- `src/systems/CollisionSystem.ts`
- `src/systems/CameraFollowSystem.ts`

## Dependencies

WS-A app shell.

## Risks

Bike stability and loop traversal require tuning.

## Handoff Criteria

Player can drive, brake, tilt, jump, crash, and restart in a simple test level with keyboard and touch.
