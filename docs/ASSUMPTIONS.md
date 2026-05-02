# Assumptions

- The working title is `Turbo Trails 2.0`, while the repository and Delano slug remain `stuntgame`.
- The initial implementation uses a manual Vite setup because this repository already contains Delano and npm metadata.
- Phaser is pinned to the `4.1.0` range in `package.json`; if Matter support proves unstable during the bike composite work, the documented fallback is Phaser `3.90.0`.
- Placeholder art is acceptable for early milestones as long as source folders and data contracts are shaped for replacement assets.
- MVP saves are local only and use `localStorage`; no backend, accounts, ads, or paid mechanics are planned.
