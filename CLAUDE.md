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
4. Suggested-path gating (SOFT — changed by Ollie's request): nothing is ever locked. Nodes with unmet prereqs show as 'later' (🕒, dimmed) with a "Suggested first" list and a de-emphasized "Start anyway →". Any node can be marked "I already know this" (⏩ `knownNodeIds`, reversible everywhere, earns NO XP) which satisfies downstream suggestions. Mastery (quiz ≥ 80%) remains the only source of ✅/XP; real mastery supersedes a known-mark.
5. Worked-example fading: full example → completion step → independent.
6. XP only for mastery. No streaks/leagues. Celebrate unlocks with animation.
7. Every concept: one-line real-world/robotics hook (whyItMatters).

## Quality gate (run EVERY time you add/change content)
1. `npm run build` (this is the real typecheck — `tsc -b`).
2. Content validator: `src/content/validate.ts` runs automatically on dev boot and logs to the browser console: `[content-validation] ✓ all content valid` or a list of problems. It checks duplicate ids, prereq/link targets exist, quiz explanations==options, gameId/puzzleId resolve, lessons end with a quiz, puzzle truth-table widths, resource URLs. ADD a new invariant here whenever a new content rule matters.
3. For any new interactive game/sim, browser-verify it actually completes (drive it via preview). For sims with a win condition, also confirm it's WINNABLE (e.g. PID: numeric node script).
4. Fact-check technical claims by hand (validator can't). All current lessons hand-verified.

## Feature notes (adaptive tempo, interlinking, theming, spaced repetition)
- **Interlinking + mid-session save**: any Screen can carry `links: LessonLink[]`. Clicking a link calls `jumpToLesson` (pushes a return entry onto `navStack`, persisted), opens the target lesson; a "↩ return" banner + the results "Back to X" button call `exitLesson` which pops the stack. Lesson position is saved per node in `lessonProgress` (persisted) and resumed on reopen (quiz section restarts fresh to keep scoring whole).
- **Adaptive tempo**: `ExplainScreen.deeper?: string[]` → "Go deeper" toggle. `Lesson.extraPractice?: QuizQuestion[]` → "Extra practice" button on the results screen (ungraded reinforcement).
- **Light/dark mode**: `store.theme` toggled in header; App applies `light`/`dark` class to `<html>`. Light mode = `html.light` block in index.css that REVERSES the slate ramp + darkens accent-300 text (Tailwind v4 emits `var(--color-*)`, so this re-themes with zero component edits). React Flow `colorMode` follows theme.
- **Soft gating / "I already know this"**: `NodeStatus` = `later | available | known | mastered` (no more `locked`); `nodeStatus()` takes `knownNodeIds` as a 4th arg. Store: `knownNodeIds` (persisted) + `markKnown`/`unmarkKnown`; `masterNode` removes a known-mark when the node is truly mastered. UI: map icons 🕒 (later, dimmed) / ⏩ (known, dashed border); DetailPanel "Suggested first" list has per-prereq "know it"/"↩ undo" chips, later-status nodes get an amber nudge + "Start anyway →", available nodes get "⏩ Too easy? Mark as already known", known nodes get a banner + "↩ back to normal". LessonPlayer's results "Up next on your path" treats known as satisfied. Reviews are NOT scheduled for known-marks (only real mastery). Browser-verified end-to-end incl. persistence + reversal.
- **Spaced repetition (Stage 4 MVP)**: `Progress.reviews: Record<nodeId, {lastSeen, intervalDays}>` — seeded at mastery (3 days), interval DOUBLES per successful review (cap 60d), RESETS to 3 on a failed retake. A review = reopening the mastered lesson and re-passing its quiz (ResultsScreen fires `completeReview(nodeId, passed)` when `alreadyMastered`) OR finishing the whole extraPractice pool (early "exit practice" does NOT count — ExtraPractice has separate onExit/onFinish). Due = now ≥ lastSeen + intervalDays (selector `dueReviewIds` in store.ts). UI: amber "🔁 N due" header chip (ReviewQueue.tsx, dropdown → openLesson) + due map nodes swap ✅→🔁 with an amber ring. Legacy blobs (no `reviews` key): zustand shallow-merge defaults to {}, and `seedMissingReviews()` (called on ReviewQueue mount) backfills mastered nodes at lastSeen=now — no persist migration needed. Reviews earn no XP (XP only for mastery). Browser-verified: backdated review → chip+badge appear → replay quiz 5/5 → interval 3→6d, chip clears.

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
- Map layout (restructured): three horizontal BANDS by dependency depth — band 0 y0-480 foundations (HCW col, Programming col, Math as a ROW, Physics fan, History/Chemistry islands far right), band 1 y760-1180 (OS fan-left, Algorithms staircase-right, Robotics tree), band 2 y1400+ (Networks, Theory, AI, Databases, Security). Layout rules: never place an edge between same-x nodes that aren't vertically adjacent (offset branches sideways); long band-skipping edges get reserved empty corridors (x~1240 math-prob→ai-learning, x~960 graphs→ai-search). Transitively-redundant prereq edges (e.g. bits→hcw-exam when cpu→exam implies it) are HIDDEN on the map only (redundantEdges in SkillTreeView) — prereqIds stay complete for unlock logic + detail panel. When adding nodes: put them in the band matching their depth and screenshot-verify no edge crosses a node.

## Roadmap to bachelor depth (honest gap analysis)
The graph is a broad skeleton, NOT yet a bachelor's. A real bachelor ≈ 180 ECTS ≈ thousands of hours; this app is the SPINE that sequences, motivates and TESTS, with the world's best external material (Nand2Tetris / MIT OCW / 3Blue1Brown / CS50 / Ben Eater, already curated per node in `resourcesByNode`) as the muscle. The end goal: Ollie reaches genuinely bachelor-worthy, hands-on understanding across CS + math + physics + chemistry + robotics, converging on being able to start a robotics company. The path is the six explicit STAGES below. Each future chat should pick the current stage, do a slice of it, keep the quality gate green, and commit.

### The six stages to bachelor-worthy content (with explicit goals)
Progress through them roughly in order, but they overlap — you can deepen one domain (Stage 1) while another is still gaining breadth. Each stage says its GOAL (what the learner gains) and DONE-WHEN (the concrete bar to call it finished).

- **Stage 0 — Foundations / breadth.** GOAL: give the learner intuition + vocabulary for the WHOLE map — one interactive lesson per big idea in every domain, so nothing on the map is a mystery and every subject has an on-ramp. DONE-WHEN: every domain has playable intro lessons for its nodes. → **STATUS: COMPLETE** (47 nodes, 14 domains).
- **Stage 1 — Depth (mini-courses + module exams).** GOAL: turn each single-lesson node from "I get the idea" into "I can actually do this" — multiple lessons per key node (concept → worked problems → independent problem sets via bigger `extraPractice` pools), plus a module exam per domain. DONE-WHEN: every domain has an `isExam` node (fresh mixed retrieval, prereqs = all domain nodes), and the robotics-critical nodes (calculus, linalg, probability, control, programming) each span 2–4 lessons instead of one. THIS IS THE CURRENT FRONTIER — start here (see "Next").
- **Stage 2 — Rigor & formalism.** GOAL: the genuinely hard bachelor content — the notation, proofs and derivations a real exam demands, not just intuition. Math: limits/epsilon-delta, chain rule, eigenvalues, Bayes derivations, basic proof technique. Physics: derive the equations, not just use them. CS: formal complexity analysis, automata proofs. DONE-WHEN: a motivated learner could sit and pass a real first/second-year university exam in the covered topics.
- **Stage 3 — Labs & projects.** GOAL: build real artifacts end-to-end, because you only truly know it once you've built it. Candidate capstones: assemble a working CPU in a sim (extends the gate sandbox), a PID-controlled robot in a physics sim, a tiny OS scheduler, a small SQL/query engine, a neural net from scratch in the code runner, a packet router. DONE-WHEN: each major domain has at least one multi-step build project the learner completes.
- **Stage 4 — Retention (spaced repetition + cumulative exams).** GOAL: make knowledge STICK for years, not days — the difference between "studied it" and "knows it." Resurface mastered nodes' `extraPractice` on an expanding schedule (needs a `lastMastered` timestamp in Progress + a due-review queue on the map), let mastery gently decay and refresh, and add cumulative cross-domain exams. DONE-WHEN: the app schedules reviews automatically and a "due today" review flow exists.
- **Stage 5 — Integration & specialization.** GOAL: fuse the domains into the actual target — a roboticist-founder. Cross-domain capstones that thread perception + control + planning into one working robot, plus a **business & entrepreneurship track** (customer discovery, unit economics, IP, go-to-market) so the learning graph literally leads to launching the company. DONE-WHEN: a full-robot integration capstone exists and a founder track is playable.

### Other subjects worth adding (brainstorm — for future expansion)
New Subject values + domains + nodes (data-only is cheap; lessons come later). Ordered by value for the robotics-founder goal. When adding: pick a distinct subject color, add to `Subject` type + `subjectStyles`/`subjectNames` + `subjectHex` + the `html.light` accent overrides, then place nodes in the correct dependency band (see map-layout notes).
1. **Statistics & Data Science** — beyond probability: estimation, regression, hypothesis testing, experiment design. Underpins ML, sensor calibration, and evaluating whether your robot actually works.
2. **Signal Processing** — filtering, Fourier, sampling. Every camera, lidar, IMU and audio stream is a signal; noise removal and sensor fusion live here.
3. **Control Theory (its own domain, deeper than the PID bridge)** — state space, stability, Kalman filters, optimal control. The mathematical core of making robots move precisely.
4. **Electronics & Circuit Design** — beyond Ohm's law: transistors as amplifiers, op-amps, PCB design, power electronics, motor drivers. Bridges physics/chemistry to real robot hardware you can build.
5. **Economics, Business & Entrepreneurship** — markets, unit economics, product, fundraising, IP/patents. The explicit startup track (also the payoff of Stage 5); Ollie is an SBI student, so this doubles as coursework.
6. **Mechanical Engineering / CAD & Manufacturing** — statics, materials strength, gears/linkages, 3D modelling, tolerances, how parts actually get made. A robot is a physical machine before it's code.
7. **Biology & Biomechanics** — how muscles, locomotion and nervous systems work; bio-inspired robotics (legged robots, soft robotics, swarms).
8. **Neuroscience** — perception, learning and motor control in real brains; the inspiration behind neural nets and modern robot learning.
9. **Optics & Photonics** — lenses, cameras, lidar, structured light — the physics of how robots SEE.
10. **Thermodynamics & Heat** — energy conversion, efficiency, cooling. Motors heat up, batteries have limits, compute throttles.
11. **Software Engineering Practice** — version control (git), testing, debugging, architecture, working in teams. How real, reliable robot codebases are actually built and shipped (distinct from Programming Fundamentals).
12. **Philosophy, Ethics & AI Safety** — logic/epistemology, the ethics of automation and autonomous machines, responsibility. A founder building machines that act in the world needs this.
13. **Design & Human-Computer Interaction** — how humans interact with and trust robots; interfaces, safety, usability.
14. **Law & Intellectual Property** — patents, liability, regulation of robots/AI. Practical survival knowledge for a hardware startup.
Also fold in earlier gaps: **electromagnetism** and **advanced calculus/differential equations** (deepen Physics/Math rather than new domains).

## Stage 1 — structure & backlog (the depth stage, now underway)
**The proven chain pattern** (repeat for every entry below): intro node → `-2` → `-3` vertical-ish chain; each depth lesson = concept → worked-fading → independent, a `deeper?` toggle, ONE Node-verified `code` screen, a ≥4-question `extraPractice` pool, curated `resources`. Grow the domain exam by ~4 FRESH questions and add the new nodes to its prereqs (validator enforces). Repoint long downstream corridors to the chain bottom when geometry demands (see checker below). Verify: build + validator + whole-map zero crossings + browser-play one new lesson end-to-end.
**Backlog, in robotics-priority order:**
- ✅ math-linalg / math-prob / math-calculus (3 chains, done)
- ✅ robo-control → tuning → feedforward/state-space (done)
- ✅ programming: prog-data → recursion → debugging/testing (done)
- ☐ phys-forces: kinematics equations (suvat) → energy/momentum problem sets
- ☐ robo-kinematics: trig + FK worked problems → IK & workspace
- ☐ phys-electricity: series/parallel + dividers → transistors/H-bridge (bridges to future Electronics domain)
- ☐ algo-structures/algo-graphs: complexity problem sets → Dijkstra/A* worked problems
- ☐ math-logic: proof technique teaser (direct/contradiction/induction) — the bridge INTO Stage 2 rigor
- ☐ opportunistic: give every remaining intro lesson an extraPractice pool (many still have none)

## Playable lessons so far (70 nodes — ALL 14 domains COMPLETE + module exams; math, robo-control AND programming deepened into mini-courses)
- **Module exams (Stage 1, part 1 — DONE)**: every domain has an `isExam` node (hcw-exam + 13 new: prog/math/phys/algo/os/net/db/theory/ai/sec/robo/hist/chem-exam). Each: 1 intro + 10 FRESH quiz questions (authored against the domain lessons to avoid reuse), all `correctIndex: 0` (shuffle convention), misconception-specific explanations, numerics hand-verified. Validator ENFORCES: exactly one exam per domain, exam prereqs = all other domain nodes, ≥8 quiz questions. Map: exams sit below their cluster (redundant prereq edges auto-hidden by SkillTreeView's transitive-closure logic); History was restructured into a horizontal ROW (x2600/2840/3080, y0) so its 3 prereq-free nodes fan into hist-exam (2840,240) without edges crossing nodes. hist-exam browser-verified end-to-end (unlock → 10/10 → mastered +100 XP).
- **Math depth (Stage 1, part 2 — DONE for the 3 robotics-critical math nodes)**: linalg, probability and calculus each became a 3-lesson vertical CHAIN (intro → -2 → -3): math-linalg→math-linalg-2 (Matrices as Transformations)→math-linalg-3 (Determinants & Eigenvectors); math-prob→math-prob-2 (Distributions & Expected Value)→math-prob-3 (Bayes' Rule); math-calculus→math-calculus-2 (Derivative Rules & Chain Rule)→math-calculus-3 (Integrals & Accumulation). Each depth lesson: concept→worked-fading→independent, a `deeper?` toggle, ONE Node-verified `code` screen, and an `extraPractice` pool (the "independent problem set"). math-exam grew to 14 questions (added chain-rule, integral, determinant, expected-value Qs) and now gates on all 10 math nodes. Layout: columns at x1000/1240/1480, rows y0/190/380, math-exam moved to (900,600) fanning in from math-logic + the three -3 nodes. CRITICAL FIX: ai-learning was repointed from the math INTROS to the chain BOTTOMS (['math-prob-3','math-linalg-3']) and nudged x1240→1300 — otherwise its long down-edges (esp. the reserved x1240 math-prob→ai-learning corridor) would pierce the new depth nodes stacked below the intros; pointing at the -3 nodes makes those edges exit BELOW the chains and clear algo-graphs. (robo-kinematics still ← math-linalg intro; its right-drifting edge clears the depth column by ~24px.) When stacking future depth chains below a node that has long downstream corridors, repoint the downstream dep to the chain bottom. math-linalg-2 browser-verified end-to-end incl. its code screen (worker output `rotated: -2 3` / `twice: -3 -2` matched expected).
- **Robo-control depth (Stage 1, part 3 — DONE)**: robo-control became a 3-lesson chain: robo-control (1520,880) → robo-control-2 "Tuning PID: Reading the Response" (1400,1060; step-response metrics, symptom→gain table, Ziegler–Nichols, loop rate; code screen proves P-only steady-state error numerically: Kp=3→0.50, Kp=12→0.87) → robo-control-3 "Beyond PID: Feedforward & State Space" (1440,1240; feedforward, state vector, x′=A·x+B·u, u=−K·x, Kalman-as-Bayes teaser; code screen = 3 ticks of the state update; links to math-linalg-2 + math-prob-3). Both have `deeper?` toggles + 4-question extraPractice pools; resources curated (MATLAB Tech Talks, Z–N wiki, bzarg Kalman article). robo-exam grew to 14 questions (spec→metrics, feedforward-vs-I, state-completeness, Kalman-fusion Qs) and gates on all 7 robotics nodes. Layout: robo-exam moved (1520,1300)→(2120,1400) — RIGHT of the db column, below kinematics — so its three visible in-edges (control-3 long east edge, kinematics vertical-ish, ros short diagonal) all get clean lanes; math-exam moved (900,600)→(800,780) out of the cpu→robo-sensing / prog-data→robo-ros / prog-data→db-relational edge highways that pierced it; robo-kinematics math prereq REPOINTED math-linalg→math-linalg-3 (chain-bottom convention; pedagogically apt — det=0 IS gimbal lock) which un-pierced the math depth grid. robo-control-2 browser-played end-to-end (predicts → code screen live-run → 5/5 quiz → mastered +100 XP → robo-control-3 unlocked).
- **Map edge/node crossing checker (USE THIS for any layout change — whole map is at ZERO crossings, keep it there)**: screenshots miss crossings because edges render UNDER nodes. Best version (works even in hidden preview tabs where React Flow skips edge rendering): in a preview_eval, `await import('/src/content/curriculum.ts')` straight from the Vite dev server, rebuild the visible-edge list with the same transitive-closure redundancy filter as SkillTreeView, then sample each edge's bezier MATHEMATICALLY — handles at (x+96, y+80) source-bottom / (x+96, y) target-top, control points (sx, sy+d) and (tx, ty−d) with d = 0.5·(ty−sy) for downward edges (6.25·√Δ if upward), node rects 192×80 — and report per-pair max penetration depth, plus a node-rect overlap pass. DOM-path variant (getPointAtLength on `path.react-flow__edge-path`) works too but only when the tab is visible. Beware: the east-bound corridors out of prog-data funnel through x576-800/y400-700, and the ai-learning corridor holds x≈1336-1396 — don't place nodes there.
- **Programming depth (Stage 1 — DONE) + foundations map finalization**: prog-data grew a chain: prog-data-2 "Recursion: Functions That Call Themselves" (360,420; base/recursive case, dive-and-return, call stack; code screen = add the missing base case, and the missing-base-case predict ties to the runner's 2s timeout) → prog-data-3 "Debugging & Testing: Code You Can Trust" (360,620; scientific-method debugging, minimal repros, off-by-ones, bisection, edge-case tests, regression tests; code screen = fix the off-by-one in sumReadings). prog-exam → 14 Qs (doubling-recursion trace, base-case-before-recursive-call, verify-the-fix discipline, recursion depth vs loops) at (160,880), gating all 5 prog nodes. REPOINTED to the chain bottom prog-data-3: os-processes, algo-bigo, net-stack AND robo-ros — the robo-ros repoint reroutes its old corridor (which passed UNDER robo-control/robo-embedded, the last known crossing) cleanly below the robotics cluster. db-relational deliberately STAYS ← prog-data (from the chain bottom its corridor would pierce robo-control-2). Map moves to clear lanes: algo-bigo (480,760)→(600,710), algo-structures (720,880)→(720,910), math-exam (800,780→ finally (800,770)). Result: whole-map ZERO edge/node crossings + zero rect overlaps (math checker). prog-data-2 browser-played end-to-end (predicts → base-case code screen live → 5/5 quiz → mastered +100 XP → prog-data-3 unlocked). Also foundations polish: all `text-white` → `text-slate-100` in games + GatePuzzleScreenView; GateSandbox colorMode + dots follow store.theme.
- How Computers Work: bits, gates, adder, cpu, hcw-exam (module exam).
- Math: math-linalg (vector playground), math-calculus (slope/derivative explorer), math-prob (law-of-large-numbers coin sim).
- Programming: prog-variables (live code runner).
- Physics: phys-forces (F=ma launch sim), phys-electricity (Ohm's-law circuit sim).
- Programming (COMPLETE): prog-variables, prog-functions, prog-data (+prog-data-2 recursion, prog-data-3 debugging/testing depth chain) — all use the live code runner.
- Math (COMPLETE): math-linalg, math-calculus, math-prob, math-logic.
- Physics (COMPLETE): phys-forces, phys-electricity, phys-energy.
- Robotics Bridge (COMPLETE): robo-sensing, robo-control (+robo-control-2, robo-control-3 depth chain), robo-kinematics, robo-embedded (reuses cpu-sim), robo-ros.
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
STATE as of last session: **Stage 0 (foundations) FINALIZED** — 70 playable nodes, ALL 14 domains complete + a module exam each, light-mode text fixed everywhere, GateSandbox themed, whole-map ZERO edge/node crossings (math checker, incl. the former prog-data→robo-ros offender — fixed via the prog-data-3 repoint). **Stage 1 (depth) STRUCTURED and underway** — see "Stage 1 — structure & backlog" above: chains done for math×3, robo-control and programming; spaced repetition shipped. **Gating switched to SOFT** (suggested order, never locked, reversible "I already know this" — see pedagogy #4 + Feature notes). Build green, validator clean, prog-data-2 + the soft-gating flow browser-verified end-to-end. Committed on `main`.

To restart the dev server: `export PATH="$HOME/.local/node/bin:$PATH"` then `cd ~/Claude/Projects/"Learning website"` then `npm run dev` → open the printed http://localhost:5173.

Next priorities:
1. Work down the **Stage 1 backlog** (see structure section above) — next up: the phys-forces chain (kinematics equations → energy/momentum problem sets), then robo-kinematics (FK worked problems → IK & workspace).
2. Deploy to Vercel (manual steps above) for a permanent/mobile URL.
3. Spaced-repetition follow-ups when bored of content: cumulative cross-domain review exams, gentle mastery-decay visuals.

Bigger arc (see "Roadmap to bachelor depth" above): after breadth, deepen each node (Stage 1) → rigor/proofs (Stage 2) → labs/projects (Stage 3) → spaced-repetition retention (Stage 4) → cross-domain capstones + business track (Stage 5).

Nice-to-haves: extract a lesson-generation prompt template; give GateSandbox `colorMode` from theme (still hardcoded dark); deploy to Vercel for a permanent/mobile URL (manual steps above — gh CLI not installed).
