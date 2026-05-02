## Mission

Build and maintain Turbo Trails 3D: a static browser stunt-bike game prototype with a playable, testable 3D warehouse slice.

## First-Turn Workflow

1. Inspect repo structure and `git status --short` before assuming file ownership.
2. Read the source files and local docs relevant to the requested change.
3. Prefer current repo reality over stale plans, generated notes, or model memory.
4. Make the smallest coherent change that satisfies the task.
5. Verify with the narrowest meaningful command, then report done, partial, or blocked explicitly.

## Source of Truth

- `README.md`: current product state, setup, commands, and runtime notes.
- `package.json`: authoritative scripts and installed runtime dependencies.
- `src/`: implemented game surface.
- `e2e/`: Playwright browser smoke tests.
- `.project/context/`: Delano project memory; useful, but may lag behind active source.
- `.project/projects/`: delivery contracts, tasks, decisions, and workstreams.
- `.agents/`: Delano runtime assets, skills, rules, hooks, and PM scripts.
- `HANDBOOK.md`: Delano delivery model and continuity rules.
- `.delano/`: optional presentation layer only; do not treat it as process truth.

## Retrieval Index

- Current stack and commands -> `README.md`, `package.json`, `src/app/TurboTrailsApp.ts`
- Active gameplay -> `src/levels/WarehouseLevel.ts`, `src/vehicle/RaycastBike.ts`, `src/systems/`
- Input, HUD, and touch controls -> `src/ui/`
- Browser state hooks -> `src/app/state.ts`, `e2e/warehouse-vertical-slice.spec.ts`
- Delano delivery flow -> `HANDBOOK.md`, `.agents/skills/*/SKILL.md`
- Project status and intent -> `.project/context/progress.md`, `.project/projects/*/spec.md`
- GUI testing expectations -> `.project/context/gui-testing.md`, `playwright.config.ts`

## Delano Order of Operations

Use the full Delano flow for features, contract changes, or material improvements:

1. Discovery: define a measurable outcome in `spec.md`.
2. Prototype Probe: time-box only when technical uncertainty is high.
3. Planning: capture architecture, milestones, rollout, rollback, and tests in `plan.md`.
4. Breakdown: create atomic tasks with binary acceptance and acyclic dependencies.
5. Synchronization: reconcile tracker state when GitHub or Linear is involved.
6. Execution: work inside task and workstream boundaries, preserving evidence.
7. Quality Ops: run risk-based checks before closure.
8. Closeout: compare against the outcome and update project memory when needed.

For small local fixes, follow the first-turn workflow and update Delano context only when scope, architecture, status, or evidence changes.

## Engineering Rules

- Do not revert user changes or unrelated dirty worktree files.
- No destructive git or filesystem operations without explicit approval.
- Treat the current branch as user-owned; do not create commits, change branches, or rewrite history unless asked.
- Keep gameplay code browser-only and static-hosting friendly.
- Prefer data-driven level, vehicle, input, and scoring changes where existing structure supports it.
- Keep pure logic testable with Vitest where practical.
- Preserve Playwright state hooks used by `window.__TURBO_TRAILS_3D_STATE__` unless updating tests with the behavior.
- Follow the existing TypeScript style: ES modules, explicit domain types where useful, Prettier formatting, and small classes for engine-facing systems.
- Keep visible UI text short and child-friendly; avoid backend, accounts, ads, paid mechanics, copied assets, real brands, or realistic violence.
- Avoid broad refactors unless they directly reduce risk for the requested work.

## Verification

- Build: `npm run build`
- Unit tests: `npm run test`
- Browser tests: `npm run e2e`
- Delano validation: `npx delano validate`

Run lint, build, unit, e2e, and Delano validation when relevant to the blast radius. If a check is skipped, say why in the handoff.
