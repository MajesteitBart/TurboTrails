---
name: WS-G Next Level Content
owner: team
status: done
created: 2026-05-02T09:22:00Z
updated: 2026-05-02T09:22:00Z
---

# Workstream: WS-G Next Level Content

## Objective

Add the second Forest level to start growing from a first playable into a small level set.

## Owned Files/Areas

- `src/data/levels/`
- `src/data/worlds.ts`
- `src/scenes/GameScene.ts`
- `src/systems/LevelState.ts`

## Dependencies

Completed save/progression slice.

## Risks

GameScene currently defaults to Forest 01. Level payload handling must become real before multiple levels are useful.

## Handoff Criteria

Forest 02 appears in Level Select and can be launched with its own terrain, collectibles, finish, and saved completion.
