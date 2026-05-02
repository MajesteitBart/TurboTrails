---
name: WS-F Local Progress Save
owner: team
status: done
created: 2026-05-02T09:12:00Z
updated: 2026-05-02T09:12:00Z
---

# Workstream: WS-F Local Progress Save

## Objective

Persist the first playable completion locally so refreshes keep best time, stars, coins, and chest progress.

## Owned Files/Areas

- `src/systems/SaveManager.ts`
- `src/scenes/ResultsScene.ts`
- `src/scenes/LevelSelectScene.ts`
- `src/scenes/GarageScene.ts`
- `src/types/SaveGame.ts`

## Dependencies

Completed results and menu/level flow.

## Risks

Do not overbuild full progression. Keep this to Forest 01 persistence and unlock-ready structure.

## Handoff Criteria

Finishing Forest 01 writes level results to localStorage, and Level Select reflects completed/star state after refresh.
