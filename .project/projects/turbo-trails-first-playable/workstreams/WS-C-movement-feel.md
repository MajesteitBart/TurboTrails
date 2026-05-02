---
name: WS-C Movement Feel
owner: team
status: done
created: 2026-05-02T08:55:00Z
updated: 2026-05-02T08:55:00Z
---

# Workstream: WS-C Movement Feel

## Objective

Improve the first playable vehicle from a disguised rectangle into a controllable stunt bike prototype with readable wheel contact, better throttle/brake response, jump gating, and restart feel.

## Owned Files/Areas

- `src/scenes/GameScene.ts`
- `src/entities/Bike.ts`
- `src/systems/BikePhysicsFactory.ts`
- `src/systems/InputController.ts`
- `src/data/vehicles.ts`

## Dependencies

WS-A visual shell and WS-B level slice systems.

## Risks

Full compound physics can become unstable. Keep this slice focused on playable feel, then move full suspension work into the broader MVP project.

## Handoff Criteria

Player can drive across the first level, collect items on the route, use jump with recent-ground gating, activate checkpoint, and reach finish.
