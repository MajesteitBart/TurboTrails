---
name: WS-A Visual First Playable
owner: team
status: done
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
---

# Workstream: WS-A Visual First Playable

## Objective

Replace the ugly scaffold view with an intentionally composed game screen: attractive menu, readable Forest level, HUD, touch controls, and no debug physics overlay by default.

## Owned Files/Areas

- `src/scenes/MainMenuScene.ts`
- `src/scenes/GameScene.ts`
- `src/ui/`
- `src/styles.css`
- `playwright.config.ts`

## Dependencies

Existing scaffold.

## Risks

Primitive art must still be composed carefully enough to read as a game.

## Handoff Criteria

- Screenshot no longer looks like a debug scaffold.
- HUD and controls are visible and stable.
- Build, tests, and e2e pass.
