// The bachelor-depth roadmap, surfaced in-app as a preview so the plan stays
// visible (not just buried in CLAUDE.md). PURELY informational — no lessons,
// no unlock logic. Kept in src/content per the content-lives-here convention.
// Mirror any change to the "Roadmap to bachelor depth" section of CLAUDE.md.

export type StageStatus = 'done' | 'current' | 'later'

export interface RoadmapStage {
  /** Stage number as authored in CLAUDE.md (0..5). */
  n: number
  title: string
  status: StageStatus
  /** What the learner gains. */
  goal: string
  /** The concrete bar to call the stage finished. */
  doneWhen: string
  /** Optional extra note shown under the stage (e.g. current progress). */
  note?: string
}

export const stages: RoadmapStage[] = [
  {
    n: 0,
    title: 'Foundations / breadth',
    status: 'done',
    goal: 'Give intuition + vocabulary for the WHOLE map — one interactive lesson per big idea in every domain, so nothing on the map is a mystery and every subject has an on-ramp.',
    doneWhen: 'Every domain has playable intro lessons for its nodes.',
    note: 'Complete — 47 playable nodes across 14 domains. This is what you can play right now.',
  },
  {
    n: 1,
    title: 'Depth — mini-courses + module exams',
    status: 'current',
    goal: 'Turn each single-lesson node from "I get the idea" into "I can actually do this" — multiple lessons per key node (concept → worked problems → independent problem sets via bigger extra-practice pools), plus a module exam per domain.',
    doneWhen: 'Every domain has an exam node (fresh mixed retrieval, prereqs = all domain nodes), and the robotics-critical nodes (calculus, linear algebra, probability, control, programming) each span 2–4 lessons instead of one.',
    note: 'The current frontier — the next few build sessions start here.',
  },
  {
    n: 2,
    title: 'Rigor & formalism',
    status: 'later',
    goal: 'The genuinely hard bachelor content — the notation, proofs and derivations a real exam demands, not just intuition. Math: limits/epsilon-delta, chain rule, eigenvalues, Bayes derivations, proof technique. Physics: derive the equations. CS: formal complexity analysis, automata proofs.',
    doneWhen: 'A motivated learner could sit and pass a real first/second-year university exam in the covered topics.',
  },
  {
    n: 3,
    title: 'Labs & projects',
    status: 'later',
    goal: 'Build real artifacts end-to-end — you only truly know it once you’ve built it. Candidates: assemble a working CPU in a sim, a PID-controlled robot in a physics sim, a tiny OS scheduler, a small SQL/query engine, a neural net from scratch, a packet router.',
    doneWhen: 'Each major domain has at least one multi-step build project the learner completes.',
  },
  {
    n: 4,
    title: 'Retention — spaced repetition + cumulative exams',
    status: 'later',
    goal: 'Make knowledge STICK for years, not days. Resurface mastered nodes’ extra-practice on an expanding schedule, let mastery gently decay and refresh, and add cumulative cross-domain exams.',
    doneWhen: 'The app schedules reviews automatically and a "due today" review flow exists.',
  },
  {
    n: 5,
    title: 'Integration & specialization',
    status: 'later',
    goal: 'Fuse the domains into the actual target — a roboticist-founder. Cross-domain capstones that thread perception + control + planning into one working robot, plus a business & entrepreneurship track (customer discovery, unit economics, IP, go-to-market).',
    doneWhen: 'A full-robot integration capstone exists and a founder track is playable.',
  },
]

export interface FutureSubject {
  /** Priority rank for the robotics-founder goal (1 = highest value). */
  rank: number
  name: string
  /** One line: why this subject matters for building robots / the company. */
  why: string
  /** Suggested accent color (hex) for when it becomes a real subject. */
  color: string
}

// Ordered by value for the robotics-founder goal (see CLAUDE.md brainstorm).
export const futureSubjects: FutureSubject[] = [
  { rank: 1, name: 'Statistics & Data Science', color: '#818cf8', why: 'Beyond probability: estimation, regression, hypothesis testing, experiment design. Underpins ML, sensor calibration, and telling whether your robot actually works.' },
  { rank: 2, name: 'Signal Processing', color: '#38bdf8', why: 'Filtering, Fourier, sampling. Every camera, lidar, IMU and audio stream is a signal; noise removal and sensor fusion live here.' },
  { rank: 3, name: 'Control Theory (deep)', color: '#f472b6', why: 'State space, stability, Kalman filters, optimal control — the mathematical core of making robots move precisely (far past the PID bridge).' },
  { rank: 4, name: 'Electronics & Circuit Design', color: '#4ade80', why: 'Transistors as amplifiers, op-amps, PCB design, power electronics, motor drivers. Bridges physics/chemistry to real robot hardware you can build.' },
  { rank: 5, name: 'Economics, Business & Entrepreneurship', color: '#fbbf24', why: 'Markets, unit economics, product, fundraising, IP/patents. The explicit startup track — and SBI coursework, so it does double duty.' },
  { rank: 6, name: 'Mechanical Engineering / CAD', color: '#2dd4bf', why: 'Statics, materials strength, gears/linkages, 3D modelling, tolerances, how parts actually get made. A robot is a machine before it is code.' },
  { rank: 7, name: 'Biology & Biomechanics', color: '#a3e635', why: 'How muscles, locomotion and nervous systems work; bio-inspired robotics — legged robots, soft robotics, swarms.' },
  { rank: 8, name: 'Neuroscience', color: '#c084fc', why: 'Perception, learning and motor control in real brains — the inspiration behind neural nets and modern robot learning.' },
  { rank: 9, name: 'Optics & Photonics', color: '#22d3ee', why: 'Lenses, cameras, lidar, structured light — the physics of how robots SEE.' },
  { rank: 10, name: 'Thermodynamics & Heat', color: '#fb923c', why: 'Energy conversion, efficiency, cooling. Motors heat up, batteries have limits, compute throttles.' },
  { rank: 11, name: 'Software Engineering Practice', color: '#60a5fa', why: 'Version control (git), testing, debugging, architecture, working in teams — how real, reliable robot codebases get shipped.' },
  { rank: 12, name: 'Philosophy, Ethics & AI Safety', color: '#94a3b8', why: 'Logic/epistemology, the ethics of automation and autonomous machines, responsibility. A founder building machines that act in the world needs this.' },
  { rank: 13, name: 'Design & Human-Computer Interaction', color: '#f0abfc', why: 'How humans interact with and trust robots; interfaces, safety, usability.' },
  { rank: 14, name: 'Law & Intellectual Property', color: '#fca5a5', why: 'Patents, liability, regulation of robots/AI. Practical survival knowledge for a hardware startup.' },
]

/** Deepen existing domains rather than add a new subject. */
export const foldInNote =
  'Also fold in earlier gaps by deepening what already exists: electromagnetism into Physics, and advanced calculus / differential equations into Math — new lessons, not new subjects.'
