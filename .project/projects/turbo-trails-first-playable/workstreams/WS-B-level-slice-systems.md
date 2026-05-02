---
name: WS-B Level Slice Systems
owner: team
status: done
created: 2026-05-02T08:45:00Z
updated: 2026-05-02T08:45:00Z
---

# Workstream: WS-B Level Slice Systems

## Objective

Create the first Forest level as data with terrain, coins, chest, checkpoint, and finish.

## Owned Files/Areas

- `src/types/LevelDefinition.ts`
- `src/data/levels/`
- `src/systems/LevelLoader.ts`
- `src/entities/Collectible.ts`

## Dependencies

WS-A visual shell.

## Risks

Too much loader generality could slow the first playable. Keep it minimal and extensible.

## Handoff Criteria

First level can be adjusted from data and renders all MVP object categories.
