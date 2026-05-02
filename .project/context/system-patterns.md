# System Patterns

- Phaser scenes manage lifecycle and rendering.
- Systems hold reusable gameplay logic that can be tested without Phaser where possible.
- `InputController` normalizes keyboard and touch into `PlayerInputState`.
- `SaveManager` owns save defaults, migration, corrupt-save recovery, and writes.
- Level definitions describe terrain, collectibles, checkpoints, hazards, and finish objects.
- Vehicle configs describe body dimensions, physics tuning, stunt multipliers, and cosmetics.
- Debug mode is gated behind `?debug=1` and development mode.
