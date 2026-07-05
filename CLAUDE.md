# Learn — personal learning app (Ollie, SBI student → robotics)

One shared knowledge graph across CS/math/physics/engineering/robotics. MVP: full CS skill tree + module 1 "How Computers Work" fully playable. Long-term: every domain grows to FULL bachelor's-degree depth (one graph, cross-subject links), robotics as the converging goal.

Project lives at `~/Claude/Projects/Learning website` (moved from "GSP IoT" — open sessions HERE).

## Stack
Vite + React + TS · Tailwind v4 (@tailwindcss/vite, no config file) · zustand+persist (one versioned localStorage blob) · @xyflow/react (skill tree AND gate sandbox) · motion (unlock/completion animations only). No backend, no router.

## Layout
- `src/types.ts` — ALL types (KnowledgeNode, Screen union, Progress)
- `src/content/curriculum.ts` — knowledge graph, hand-authored x/y positions
- `src/content/lessons/*.ts` — one file per lesson node
- `src/components/` — SkillTreeView, LessonPlayer, GateSandbox, screen components
- `src/store.ts` — zustand store; node status (locked/available/mastered) computed via selector, never stored

## Screen union (discriminated on `kind`)
`explain` | `predict {question, options, reveal}` | `quiz {question, options, correctIndex, explanations[]}` | `gatePuzzle {puzzleId}` | `sandbox {presetId?}`

## Pedagogy (non-negotiable — this IS the product)
1. Max ~3 sentences prose before the learner must DO something.
2. Predict → observe → explain before any sim reveals a result.
3. Quizzes answered from memory; every wrong option gets a specific misconception explanation.
4. Mastery gating: unlock = prereqs mastered (lesson done + quiz ≥ 80%). Locked nodes visible+titled.
5. Worked-example fading: full example → completion step → independent.
6. XP only for mastery. No streaks/leagues. Celebrate unlocks with animation.
7. Every concept: one-line real-world/robotics hook (whyItMatters).

## Quality gate (run EVERY time you add/change content)
1. `npm run build` (this is the real typecheck — `tsc -b`).
2. Content validator: `src/content/validate.ts` runs automatically on dev boot and logs to the browser console: `[content-validation] ✓ all content valid` or a list of problems. It checks duplicate ids, prereq/link targets exist, quiz explanations==options, gameId/puzzleId resolve, lessons end with a quiz, puzzle truth-table widths, resource URLs. ADD a new invariant here whenever a new content rule matters.
3. For any new interactive game/sim, browser-verify it actually completes (drive it via preview). For sims with a win condition, also confirm it's WINNABLE (e.g. PID: numeric node script).
4. Fact-check technical claims by hand (validator can't). All current lessons hand-verified.

## Feature notes (adaptive tempo, interlinking, theming)
- **Interlinking + mid-session save**: any Screen can carry `links: LessonLink[]`. Clicking a link calls `jumpToLesson` (pushes a return entry onto `navStack`, persisted), opens the target lesson; a "↩ return" banner + the results "Back to X" button call `exitLesson` which pops the stack. Lesson position is saved per node in `lessonProgress` (persisted) and resumed on reopen (quiz section restarts fresh to keep scoring whole).
- **Adaptive tempo**: `ExplainScreen.deeper?: string[]` → "Go deeper" toggle. `Lesson.extraPractice?: QuizQuestion[]` → "Extra practice" button on the results screen (ungraded reinforcement).
- **Light/dark mode**: `store.theme` toggled in header; App applies `light`/`dark` class to `<html>`. Light mode = `html.light` block in index.css that REVERSES the slate ramp + darkens accent-300 text (Tailwind v4 emits `var(--color-*)`, so this re-themes with zero component edits). React Flow `colorMode` follows theme.

## Conventions
- Extend working files; small targeted diffs; one game = one file with `{ onComplete(score) }`.
- Content ONLY in src/content — components never hardcode lesson text.
- Definition of done per phase: `npm run build && npx tsc --noEmit` clean, git commit.
- Node.js lives at `~/.local/node/bin` (not on default PATH) — prepend `export PATH="$HOME/.local/node/bin:$PATH"` in shell commands.
- NOTE: `npx tsc --noEmit` alone does NOT catch errors (root tsconfig only references projects) — the real check is `npm run build` (runs `tsc -b`).
- Dark theme, vivid accent per subject: cs=cyan, math=violet, physics=amber, engineering=emerald, robotics=rose.
- The `sandbox` Screen kind is defined but unused so far (adder lessons used gatePuzzles + games instead); free-play sandbox is a future feature.

## Deploy (manual — gh CLI not installed)
1. Create an empty repo on github.com (e.g. `learning-website`, private is fine). No README/gitignore.
2. In `~/Claude/Projects/Learning website`:
   `git remote add origin https://github.com/<username>/learning-website.git && git push -u origin main`
   (or `master` — check `git branch`).
3. On vercel.com: Add New → Project → import the repo. Vercel auto-detects Vite. Build command `npm run build`, output `dist` (defaults). Deploy.
4. Every future `git push` auto-deploys.

## Newer conventions (added with the comprehensiveness pass)
- `resources?: Resource[]` on KnowledgeNode → "Go deeper" links (video/interactive/article/book/course) in the detail panel; curated in `resourcesByNode` at the bottom of curriculum.ts.
- `optional?: boolean` on any Screen → renders a "Bonus challenge — skip" button (learner control; never make core pedagogy optional).
- `isExam?: boolean` on KnowledgeNode → module exam: mixed FRESH retrieval questions (never reuse lesson quiz questions), prereqs = all module nodes.
- Map: jump-to-domain select + whole-map button + subject legend + MiniMap; initial view focuses "How Computers Work".

## Roadmap to bachelor depth (honest gap analysis)
The graph is a solid skeleton, NOT yet a bachelor's. To get there, per domain: ~8-15 nodes with playable lessons + module exam + external-resource pairing (a real bachelor ≈ 180 ECTS ≈ years; this app should be the SPINE that sequences and tests, with Nand2Tetris/OCW/3B1B/CS50 etc. as the muscle). Priority order for Ollie's robotics goal:
1. Robotics Bridge + Control (needs: calculus, linalg lessons first)
2. Programming Fundamentals (hands-on code runner screens — new Screen kind needed)
3. Math (calculus, linalg, probability as interactive lessons)
4. Physics Foundations (forces, energy, circuits)
5. The rest of CS breadth
Missing domains to add eventually: electromagnetism, signals & systems, mechanical design/CAD, software engineering practice (git, testing), business/entrepreneurship track for the startup.

## Playable lessons so far (47 nodes — ALL 14 domains COMPLETE)
- How Computers Work: bits, gates, adder, cpu, hcw-exam (module exam).
- Math: math-linalg (vector playground), math-calculus (slope/derivative explorer), math-prob (law-of-large-numbers coin sim).
- Programming: prog-variables (live code runner).
- Physics: phys-forces (F=ma launch sim), phys-electricity (Ohm's-law circuit sim).
- Programming (COMPLETE): prog-variables, prog-functions, prog-data — all use the live code runner.
- Math (COMPLETE): math-linalg, math-calculus, math-prob, math-logic.
- Physics (COMPLETE): phys-forces, phys-electricity, phys-energy.
- Robotics Bridge (COMPLETE): robo-sensing, robo-control, robo-kinematics, robo-embedded (reuses cpu-sim), robo-ros.
COMPLETE domains (all nodes have lessons): How Computers Work, Programming, Math, Physics, Robotics Bridge, History of Science & Tech, Chemistry, Algorithms & Data Structures.
- History (COMPLETE): hist-scientific-revolution, hist-computing (computing-timeline game), hist-industrial. All prereq-free entry points. Subject color fuchsia.
- Chemistry (COMPLETE): chem-atoms (atom-builder game) → chem-reactions → chem-materials (prereq chain). Subject color teal.
- Algorithms (COMPLETE): algo-bigo (big-o-race game + code screens) → algo-structures (3 code screens) → algo-graphs (pathfinder-sim game: BFS vs A* on a wall-drawing grid; verified BFS explores ~80 cells vs A* ~11 for the same shortest path).
- AI & ML (COMPLETE): ai-search (state-space planning, no game — predict-rich), ai-learning (gradient-descent game: converge/diverge/precision challenges on L(x)=x²), ai-neural (neural-playground game: perceptron sliders separate clusters, then hit the XOR wall — the give-up button IS the win, reveals hidden-layer fix).
- OS (COMPLETE): os-processes (round-robin code screen), os-memory (page-table translation code screen), os-io (polling vs interrupts, predict-rich).
- Networks (COMPLETE): net-stack (envelope-wrapping code screen), net-packets (routing/TTL/head-of-line predicts), net-protocols (HTTP vs MQTT pub/sub — mirrors the polling/interrupt pattern).
- Databases (COMPLETE): db-relational (foreign-key lookup code screen), db-sql (SELECT/WHERE + JOIN as loops, 2 code screens), db-transactions (indexes + ACID + lost-update race).
- Theory (COMPLETE): theory-fsm (fsm-lab game: drive a 4-state robot behavior FSM, incl. proving ignored events do nothing), theory-turing (halting problem, ties to the code-runner's 2s timeout), theory-complexity (P vs NP, ties to crypto + ai-search).
- Security (COMPLETE): sec-threats (threat models, Mirai, weakest link), sec-crypto (Caesar code screen → key space → public keys), sec-systems (least privilege, signed updates, secure boot).
ALL code-screen expected outputs are Node-verified (run the completed solution, compare to `expected`) — do this for every new code screen.
The full vertical slice Physics → Robotics → tuned PID controller is playable. robo-control unlocks once robo-sensing + phys-forces are mastered (chain: phys-forces + phys-electricity → robo-sensing → robo-control).
Games live in src/components/games/, all implement `{ onComplete(score) }`.
- PID sim (PidSim.tsx): simulation is deterministic; constants (STEPS=400, DRAG=0.8, GRAVITY=2.5, TOL=0.5) were numerically tuned so P-only and PI-without-D FAIL but P≈4/I≈2/D≈4 settles — verify any change to these still leaves it winnable (quick node script simulating the loop).

Gotchas learned:
- SVG-drag games (VectorPlayground, SlopeExplorer): wrap `setPointerCapture` in try/catch (some pointers/headless reject it and abort the drag). Drag works via the svg's onPointerMove + dragKey state.
- Batch/rapid-click games (ProbabilitySim): use FUNCTIONAL setState (setX(prev=>...)) or rapid clicks race on stale closure state; fire onComplete from useEffect, not inside the updater.
- `code` Screen kind runs learner JS in a Web Worker (blob URL) with a 2s terminate timeout — infinite-loop safe. Output captured via injected `print()`, compared line-normalized to `expected`.
- Quiz/predict options are SHUFFLED at render (QuizScreenView/PredictScreenView useMemo keyed on screen) — authoring with correctIndex 0 everywhere is fine and convenient; the learner never sees a position pattern. Don't "fix" content by varying correctIndex.
- Light mode: never use `text-white` in games — use `text-slate-100` (the html.light block reverses the slate ramp, white stays white on light cards). Older games (ProbabilitySim etc.) still violate this; fix opportunistically.

## Next (resume here)
STATE as of last session: 47 playable lessons; ALL 14 domains COMPLETE — full breadth reached. All committed on `main`, working tree clean, build green, content validator clean, all 7 new games browser-verified winnable, all code screens Node-verified. Quiz/predict option shuffling added app-wide.

To restart the dev server: `export PATH="$HOME/.local/node/bin:$PATH"` then `cd ~/Claude/Projects/"Learning website"` then `npm run dev` → open the printed http://localhost:5173.

Breadth is DONE. Next priorities (Stage 1+ of the bachelor-depth roadmap):
1. Module exams per domain (like hcw-exam: FRESH mixed retrieval questions, prereqs = all domain nodes, isExam: true) — History, Chemistry, Algorithms, AI/ML, OS, Networks, Databases, Theory, Security all lack one. Highest learning-science value per effort.
2. Spaced repetition: resurface mastered nodes' extraPractice after N days (needs a lastMastered timestamp in Progress).
3. Deepen high-value nodes toward bachelor rigor (calculus limits/chain rule, linalg determinants/eigen, prob distributions/Bayes as full lessons).
4. Deploy to Vercel (manual steps above) for a permanent/mobile URL.

Bigger arc (see "Roadmap to bachelor depth" above): after breadth, deepen each node (Stage 1) → rigor/proofs (Stage 2) → labs/projects (Stage 3) → spaced-repetition retention (Stage 4) → cross-domain capstones + business track (Stage 5).

Nice-to-haves: extract a lesson-generation prompt template; give GateSandbox `colorMode` from theme (still hardcoded dark); deploy to Vercel for a permanent/mobile URL (manual steps above — gh CLI not installed).
