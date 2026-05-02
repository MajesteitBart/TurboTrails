---
name: Turbo Trails 3D Visual Prototype
slug: turbo-trails-3d-visual-prototype
owner: team
status: active
created: 2026-05-02T09:58:00Z
updated: 2026-05-02T09:58:00Z
outcome: Prove a realistic side-view 3D visual direction for Turbo Trails before replacing the current Phaser 2D rendering.
uncertainty: medium
probe_required: true
probe_status: active
---

# Spec: Turbo Trails 3D Visual Prototype

## Executive Summary

The current Phaser first playable is functional but visually too primitive. This project builds a separate Three.js + Rapier prototype at `/3d.html` to prove a higher-quality side-view 3D direction with terrain depth, lighting, shadows, a 3D bike placeholder, and a fixed side camera with slight top-down perspective.

## Problem and Users

The target users should see a game that feels like a real 3D trialbike world, not flat debug shapes. Parents and children should immediately understand ramps, depth, terrain, and vehicle form from a side perspective.

## Outcome and Success Metrics

- `/3d.html` renders a side-view 3D forest stunt scene.
- Camera is orthographic side-view with a slight top-down/depth angle.
- Terrain, ramps, props, bike, and rider are 3D meshes with lighting/shadows.
- `npm run build` and `npm run e2e` pass.
- Screenshots are captured under `screenshots/`.

## Scope

### In Scope

- Three.js visual prototype.
- Rapier initialization and simple physics world stepping.
- Static 3D forest stunt track with height variation.
- 3D bike placeholder with chassis, wheels, fork, rider silhouette.
- E2E render checks and screenshot capture.

### Out of Scope

- Replacing the Phaser game flow.
- Full 3D vehicle simulation.
- GLTF asset pipeline.
- Final art or animation.

## Functional Requirements

- Add a standalone `/3d.html` entry.
- Add `src/three/` prototype code.
- Render a complete scene without external art assets.
- Expose dev test state for Playwright render checks.

## Non-Functional Requirements

- Keep static hosting compatible.
- Avoid copyrighted assets.
- Favor low-poly/stylized-realistic shapes with strong composition.
- Keep prototype isolated from existing Phaser first playable.

## Dependencies

- `three`
- `@dimforge/rapier3d-compat`
- Vite + TypeScript

## Approval Notes

Created after user feedback on 2026-05-02 that the existing quality was too low and a realistic side-view 3D design direction is needed.
