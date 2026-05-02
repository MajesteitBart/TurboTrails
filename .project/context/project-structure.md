# Project Structure

```text
src/
  main.ts
  game/
  scenes/
  entities/
  systems/
  ui/
  data/
  types/
  tests/
public/assets/
  sprites/
  backgrounds/
  ui/
  audio/
e2e/
docs/
.project/
.agents/
```

Level and vehicle data should remain separate from scene implementation. Pure logic should live in `src/systems/` and be covered by Vitest where practical.
