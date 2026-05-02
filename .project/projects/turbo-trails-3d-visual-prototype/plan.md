---
name: Turbo Trails 3D Visual Prototype
status: planned
lead: team
created: 2026-05-02T09:58:00Z
updated: 2026-05-02T09:58:00Z
linear_project_id:
risk_level: medium
spec_status_at_plan_time: active
---

# Delivery Plan: Turbo Trails 3D Visual Prototype

## Architecture Decisions

- Keep Phaser as the current 2D first playable.
- Add a separate Three.js prototype entry at `/3d.html`.
- Use Rapier as the likely future physics direction, but keep this first slice mostly visual.
- Use orthographic side camera with z-depth and slight y/elevation view angle.

## Workstream Design

- WS-A 3D Render Prototype: Three.js scene, lighting, terrain, bike, camera.
- WS-B 3D Verification: e2e render checks and screenshots.
- WS-C Migration Decision: compare 2D and 3D screenshots and decide whether to migrate gameplay.

## Milestone Strategy

1. Render convincing static 3D side-view prototype.
2. Add basic motion/controls if visual direction is accepted.
3. Decide whether to migrate the game shell to Three.js/Rapier.

## Test Strategy

- `npm run build`.
- Playwright checks `/3d.html`, canvas visibility, and dev render state.
- Screenshot artifact saved to `screenshots/3d-visual-prototype.png`.

## Remaining Delivery Risks

- Rapier integration can add complexity. Keep this slice visual-first.
- Realistic 3D quality ultimately needs real authored models/materials; primitives only prove direction.
