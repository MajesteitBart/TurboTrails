---
name: WS-H Touch and Portrait Polish
owner: team
status: planned
created: 2026-05-02T09:24:00Z
updated: 2026-05-02T09:24:00Z
---

# Workstream: WS-H Touch and Portrait Polish

## Objective

Improve mobile/touch readiness with orientation guidance and cleaner touch control behavior.

## Owned Files/Areas

- `src/scenes/GameScene.ts`
- `src/systems/InputController.ts`
- `src/styles.css`
- `e2e/`

## Dependencies

First two Forest levels.

## Risks

Do not overbuild responsive UI. Focus on clear landscape play and portrait warning.

## Handoff Criteria

Portrait view shows rotate guidance, landscape controls remain playable, and e2e still passes on desktop and touch emulation.
