---
name: WS-D Finish Results Flow
owner: team
status: planned
created: 2026-05-02T09:00:00Z
updated: 2026-05-02T09:00:00Z
---

# Workstream: WS-D Finish Results Flow

## Objective

Turn the current finish status text into a basic results flow with time, collectibles, stars, retry, and menu navigation.

## Owned Files/Areas

- `src/scenes/GameScene.ts`
- `src/scenes/ResultsScene.ts`
- `src/systems/ScoreSystem.ts`
- `src/ui/`

## Dependencies

WS-B level data and WS-C movement feel.

## Risks

Scene state handoff should stay simple until save/progression is added.

## Handoff Criteria

Finishing the first level opens a results view with time, coins, chest count, stars, and retry/menu actions.
