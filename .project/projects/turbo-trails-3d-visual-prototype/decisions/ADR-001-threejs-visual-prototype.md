---
id: ADR-001
status: accepted
created: 2026-05-02T09:58:00Z
updated: 2026-05-02T09:58:00Z
---

# ADR-001: Use Three.js/Rapier for 3D Visual Prototype

## Context

The Phaser 2D first playable proves game flow but does not meet the requested realistic side-view 3D quality bar.

## Decision

Build a standalone `/3d.html` prototype with Three.js and Rapier before migrating the main game.

## Consequences

- The existing Phaser first playable remains stable.
- We can compare screenshots before committing to a full engine migration.
- The prototype proves depth, lighting, shadows, and a side/top orthographic camera.
- Final quality will still require authored 3D assets or a more deliberate procedural art pipeline.
