import type { Domain, KnowledgeNode, Resource } from '../types'

export const domains: Domain[] = [
  { id: 'how-computers-work', title: 'How Computers Work', prereqDomainIds: [] },
  { id: 'programming', title: 'Programming Fundamentals', prereqDomainIds: [] },
  { id: 'math', title: 'Math for CS & Robotics', prereqDomainIds: [] },
  { id: 'physics', title: 'Physics Foundations', prereqDomainIds: [] },
  { id: 'algorithms', title: 'Algorithms & Data Structures', prereqDomainIds: ['programming', 'math'] },
  { id: 'os', title: 'Operating Systems', prereqDomainIds: ['how-computers-work', 'programming'] },
  { id: 'networks', title: 'Networks', prereqDomainIds: ['programming'] },
  { id: 'databases', title: 'Databases', prereqDomainIds: ['programming'] },
  { id: 'theory', title: 'Theory of Computation', prereqDomainIds: ['math', 'algorithms'] },
  { id: 'ai-ml', title: 'AI & Machine Learning', prereqDomainIds: ['math', 'algorithms'] },
  { id: 'security', title: 'Security & Crypto', prereqDomainIds: ['networks'] },
  { id: 'robotics-bridge', title: 'Robotics Bridge', prereqDomainIds: ['how-computers-work', 'physics'] },
  { id: 'history', title: 'History of Science & Technology', prereqDomainIds: [] },
  { id: 'chemistry', title: 'Chemistry', prereqDomainIds: [] },
]

// Layout (2026-07 refactor — "streets" edition, built for depth-chain growth):
// three horizontal BANDS by dependency depth, with node-free STREETS between
// them where long edges do their horizontal sweeping.
//   band 0 (y 0-1100):  foundations — Programming (x0-750), Math (x1120-2430),
//                       HCW (x2720-3190), Physics (x3500-4570),
//                       History/Chemistry islands (x4950+).
//   street S1 (y~1100-1400): sweep lane for cpu→os and the long honest
//                       prog-data→{os,net,algo,ros} edges. Only math-exam
//                       (1500,1560) sits below it, threaded between the two
//                       vertical math→AI lanes.
//   band 1 (y 1400-2200): Networks (x0), Algorithms staircase (x620-1310),
//                       Theory (x1360), Robotics — the convergence cell —
//                       (x2280-3910), OS (x3760-4230, y1300-1800).
//   band 2 (y 2300-3400): Security (x0), Databases (x300), AI (x1120-1870),
//                       Robotics estimation chain + exam (bottom-right).
// KEY structural choice: HCW lives NEXT TO Physics so cpu→robo-sensing is
// short. Downstream nodes hang off HONEST prereqs (prog-data, not the depth
// chain bottom prog-data-3 — the 2026-07-07 cleanup), so a few long
// prog-data→{os,net,algo,ros} edges sweep street S1; OS was lowered to
// (3900,1300) so cpu→os clears the robotics cell. Verified clear in BOTH tiers.
// RESERVED SLOTS for queued chains (keep empty; re-run the checker on use):
//   math-linalg-4/-5  → col x1400, y620/820 (left of linalg col)
//   math-mv chain     → col x2520, y0-400   (right of calculus col)
//   math-stats chain  → col x2520, y580-940 (below the mv slot)
//   robo-control-4    → (2950,2300), continuing the control column
//   phys-statics      → col x4660, y220-620 (right of energy)
//   Electronics domain→ x4660+, y850+ (hangs off phys-electricity-3)
//   math-logic-2/-3   → col x1120, y200/400 (below logic)
// When a chain lands, exams repoint to the chain bottom (transitive filter
// hides the old edge) — then re-verify both tiers with the bezier checker.
// Rules that keep edges readable: no edge between same-x nodes that aren't
// vertically adjacent (offset branches sideways); exams sit at their cell's
// bottom, offset out of hub out-edge lanes.
// Redundant transitive edges are hidden in SkillTreeView (visual only).
export const nodes: KnowledgeNode[] = [
  // ---- How Computers Work (col x3000, next to Physics) — the playable MVP module ----
  {
    id: 'bits',
    title: 'Speaking in Switches',
    subject: 'cs',
    domainId: 'how-computers-work',
    description:
      'Everything a computer knows — numbers, text, images — is stored in tiny on/off switches. Learn to count, and think, in binary.',
    whyItMatters:
      'Every sensor reading your future robot takes arrives as raw bits — this is the native language of every machine you will ever build.',
    prereqIds: [],
    x: 3000,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'gates',
    title: 'The Logic of Gates',
    subject: 'cs',
    domainId: 'how-computers-work',
    description:
      'From one humble gate — NAND — you can build NOT, AND, OR, XOR and ultimately an entire computer. Build them yourself, wire by wire.',
    whyItMatters:
      'An H-bridge motor driver is four transistor switches — the exact same switches you build gates from here.',
    prereqIds: ['bits'],
    x: 3000,
    y: 200,
    hasLesson: true,
  },
  {
    id: 'adder',
    title: 'Building a Machine that Adds',
    subject: 'cs',
    domainId: 'how-computers-work',
    description:
      'Combine your gates into a half adder, then a full adder, then a 4-bit ripple adder — the literal circuit your laptop uses to do arithmetic.',
    whyItMatters:
      'When your robot computes “turn 3° left”, this circuit — etched a billion times smaller — is doing the math.',
    prereqIds: ['gates'],
    x: 3000,
    y: 400,
    hasLesson: true,
  },
  {
    id: 'cpu',
    title: 'The Heartbeat of the CPU',
    subject: 'cs',
    domainId: 'how-computers-work',
    description:
      'Fetch, decode, execute — billions of times per second, paced by a clock. See how registers, the clock and the instruction cycle turn circuits into a computer.',
    whyItMatters:
      'A microcontroller on a robot is this exact machine, just small and cheap enough to glue onto a motor.',
    prereqIds: ['adder'],
    x: 3000,
    y: 600,
    hasLesson: true,
  },
  {
    id: 'hcw-exam',
    title: 'Module Exam: How Computers Work',
    subject: 'cs',
    domainId: 'how-computers-work',
    description:
      'Ten fresh questions across the whole module — switches, gates, adders and the CPU. From memory, no workbench. 80% to pass.',
    whyItMatters:
      'Retrieval days after learning is what converts lessons into permanent knowledge — an exam is a learning event, not just a measurement.',
    prereqIds: ['bits', 'gates', 'adder', 'cpu'],
    x: 2720,
    y: 780,
    hasLesson: true,
    isExam: true,
  },

  // ---- Programming Fundamentals (far left: intro col x560, depth col x300) ----
  {
    id: 'prog-variables',
    title: 'Variables & Control Flow',
    subject: 'cs',
    domainId: 'programming',
    description:
      'Name a piece of data, then steer the program with if/else and loops — the atoms of every program ever written.',
    whyItMatters:
      '“If obstacle closer than 20 cm, turn” is one variable and one if-statement — robot behavior starts exactly here.',
    prereqIds: [],
    x: 560,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'prog-functions',
    title: 'Functions & Abstraction',
    subject: 'cs',
    domainId: 'programming',
    description:
      'Wrap steps into named, reusable blocks so you can think “driveForward()” instead of thirty lines of motor commands.',
    whyItMatters:
      'Abstraction is how a two-million-line robot codebase stays understandable by humans.',
    prereqIds: ['prog-variables'],
    x: 560,
    y: 200,
    hasLesson: true,
  },
  {
    id: 'prog-data',
    title: 'Data in Memory',
    subject: 'cs',
    domainId: 'programming',
    description:
      'Lists, records and references: how programs organize many values, and what memory actually looks like underneath.',
    whyItMatters:
      'A lidar scan is an array of 360 distances — you need data structures the moment your robot opens its eyes.',
    prereqIds: ['prog-functions'],
    x: 560,
    y: 400,
    hasLesson: true,
  },
  // Depth chain (Stage 1): deepens below-LEFT of prog-data (col x300) so the
  // east/south-bound corridors out of prog-data/-3 (→db, →algo, →os, →ros)
  // leave cleanly to the right of it. prog-exam sits further left again (x0),
  // out of the hub lanes. Future prog-c chain: continue left/below (x0 col).
  {
    id: 'prog-data-2',
    title: 'Recursion: Functions That Call Themselves',
    subject: 'cs',
    domainId: 'programming',
    description:
      'The base case, the shrinking recursive case, the dive-and-return rhythm, and the call stack that powers it — including what happens when you forget to stop.',
    whyItMatters:
      'Robot planners search branching trees of possible futures — recursion is the shape of code that walks self-similar structure.',
    prereqIds: ['prog-data'],
    x: 240,
    y: 620,
    hasLesson: true,
  },
  {
    id: 'prog-data-3',
    title: 'Debugging & Testing: Code You Can Trust',
    subject: 'cs',
    domainId: 'programming',
    description:
      'Debugging as the scientific method: minimal reproductions, hypotheses, print evidence, bisection — then tests that check edge cases and keep fixed bugs fixed.',
    whyItMatters:
      'On a robot a bug can bend metal — professional teams test in simulation first, and this lesson is where that habit starts.',
    prereqIds: ['prog-data-2'],
    x: 240,
    y: 820,
    hasLesson: true,
  },
  {
    id: 'prog-exam',
    title: 'Module Exam: Programming',
    subject: 'cs',
    domainId: 'programming',
    description:
      'Fourteen fresh questions across variables, control flow, functions, data structures, recursion and debugging — including code you trace in your head. 80% to pass.',
    whyItMatters:
      'If you can predict what code does without running it, you actually speak the language — that is what this exam checks.',
    prereqIds: ['prog-variables', 'prog-functions', 'prog-data', 'prog-data-2', 'prog-data-3'],
    x: 0,
    y: 1020,
    hasLesson: true,
    isExam: true,
  },

  // ---- Math (x1120-2430: logic | linalg | prob | calculus+ODE columns) ----
  {
    id: 'math-logic',
    title: 'Logic: The Algebra of Truth',
    subject: 'math',
    domainId: 'math',
    description:
      'AND, OR, NOT, implication and proof — the same Boolean algebra your logic gates compute, done with a pencil.',
    whyItMatters:
      'The gates you build in “The Logic of Gates” are this algebra made of silicon — one idea, two subjects.',
    prereqIds: [],
    x: 1120,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'math-linalg',
    title: 'Vectors & Matrices',
    subject: 'math',
    domainId: 'math',
    description:
      'Vectors point, matrices transform. Build the geometric intuition for rotating, scaling and moving things in space.',
    whyItMatters:
      'A robot arm’s position is a chain of matrix multiplications — kinematics IS linear algebra.',
    prereqIds: [],
    x: 1680,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'math-prob',
    title: 'Probability & Uncertainty',
    subject: 'math',
    domainId: 'math',
    description:
      'Quantify “probably”: distributions, expected value, and updating beliefs when new evidence arrives.',
    whyItMatters:
      'Real sensors are noisy — a robot that can’t reason about uncertainty walks into walls it “saw”.',
    prereqIds: [],
    x: 1960,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'math-calculus',
    title: 'Calculus & Change',
    subject: 'math',
    domainId: 'math',
    description:
      'Derivatives measure how fast things change; integrals accumulate change into totals. The mathematics of motion itself.',
    whyItMatters:
      'A PID controller is literally a Proportional term plus an Integral plus a Derivative — you cannot read robotics without calculus.',
    prereqIds: [],
    x: 2240,
    y: 0,
    hasLesson: true,
  },
  // Depth chains (Stage 1): each robotics-critical math topic is a 3-lesson
  // column — intro (y0) → rules/worked (y200) → independent (y400); the ODE
  // chain continues straight down the calculus column (y580-1020). math-exam
  // lives at (1500,1560), BELOW street S1, threaded between the two vertical
  // math→ai-learning lanes (x1776 / x2056) — verified in both tiers.
  {
    id: 'math-linalg-2',
    title: 'Matrices as Transformations',
    subject: 'math',
    domainId: 'math',
    description:
      'A matrix is a function that moves space — rotating, scaling, shearing. Multiplying matrices composes transformations, the operation behind every change of frame.',
    whyItMatters:
      'Rotating a sensor reading into the robot’s own frame is one matrix multiply; chaining joint rotations is several in a row.',
    prereqIds: ['math-linalg'],
    x: 1680,
    y: 200,
    hasLesson: true,
  },
  {
    id: 'math-linalg-3',
    title: 'Determinants & Eigenvectors',
    subject: 'math',
    domainId: 'math',
    description:
      'The determinant says how much a matrix scales area; zero means space collapses and the map can’t be undone. Eigenvectors are the directions a transform only stretches.',
    whyItMatters:
      'A singular (determinant-0) configuration is a robot arm losing a degree of freedom — gimbal lock captured in a single number.',
    prereqIds: ['math-linalg-2'],
    x: 1680,
    y: 400,
    hasLesson: true,
  },
  {
    id: 'math-prob-2',
    title: 'Distributions & Expected Value',
    subject: 'math',
    domainId: 'math',
    description:
      'Describe a whole random variable: its distribution, its expected value E[X] = Σ x·p, and its spread. The average outcome, and how far reality strays from it.',
    whyItMatters:
      'The expected reading of a noisy sensor is its mean; its variance IS the noise you have to engineer around.',
    prereqIds: ['math-prob'],
    x: 1960,
    y: 200,
    hasLesson: true,
  },
  {
    id: 'math-prob-3',
    title: 'Bayes’ Rule',
    subject: 'math',
    domainId: 'math',
    description:
      'Update a belief with evidence: prior → posterior. Why a 99%-accurate test for a rare event still mostly false-alarms, and how a robot fuses noisy sensors into one estimate.',
    whyItMatters:
      'Localization and sensor fusion are Bayes’ rule run hundreds of times a second.',
    prereqIds: ['math-prob-2'],
    x: 1960,
    y: 400,
    hasLesson: true,
  },
  {
    id: 'math-calculus-2',
    title: 'Derivative Rules & the Chain Rule',
    subject: 'math',
    domainId: 'math',
    description:
      'From intuition to computation: the power rule, the sum and constant rules, and the chain rule for functions nested inside functions.',
    whyItMatters:
      'Velocity is the derivative of position, acceleration the derivative of velocity — every layer of motion is one more derivative.',
    prereqIds: ['math-calculus'],
    x: 2240,
    y: 200,
    hasLesson: true,
  },
  {
    id: 'math-calculus-3',
    title: 'Integrals & Accumulation',
    subject: 'math',
    domainId: 'math',
    description:
      'Add a rate up to get a total: Riemann sums sharpen into integrals, and integration undoes differentiation — the Fundamental Theorem of Calculus.',
    whyItMatters:
      'Odometry integrates wheel speed into distance travelled; the I in a PID controller integrates accumulated error.',
    prereqIds: ['math-calculus-2'],
    x: 2240,
    y: 400,
    hasLesson: true,
  },
  {
    id: 'math-ode',
    title: 'Differential Equations: Change Itself',
    subject: 'math',
    domainId: 'math',
    description:
      'Equations that relate a quantity to its own rate of change — the math of decay, growth, cooling and discharge, solved by separation of variables.',
    whyItMatters:
      'Every physical system a robot touches — a discharging battery, a cooling motor, a settling arm — is described by a differential equation.',
    prereqIds: ['math-calculus-3'],
    x: 2240,
    y: 580,
    hasLesson: true,
  },
  {
    id: 'math-ode-2',
    title: 'Second-Order: Oscillators & Damping',
    subject: 'math',
    domainId: 'math',
    description:
      'Mass–spring–damper systems: the damping ratio ζ sorts every oscillator into underdamped (rings), critical (fastest clean settle) or overdamped (slow) — the exact math of PID overshoot.',
    whyItMatters:
      'A badly tuned arm rings like an underdamped spring; the whole point of tuning Kd is to push ζ toward 1.',
    prereqIds: ['math-ode'],
    x: 2240,
    y: 760,
    hasLesson: true,
  },
  {
    id: 'math-ode-3',
    title: 'Systems, Phase Portraits & Stability',
    subject: 'math',
    domainId: 'math',
    description:
      'Rewrite an ODE as x′ = A·x, read stability off the eigenvalues of A, and see the whole story as a spiral on a phase portrait — the mathematical heart of state-space control.',
    whyItMatters:
      'Control design IS moving A’s eigenvalues into the stable half-plane; this is where the linalg and ODE chains fuse into robotics.',
    prereqIds: ['math-ode-2'],
    x: 2240,
    y: 940,
    hasLesson: true,
  },
  {
    id: 'math-exam',
    title: 'Module Exam: Math',
    subject: 'math',
    domainId: 'math',
    description:
      'Fresh mixed questions across logic, vectors & matrices, probability, calculus and differential equations — the deeper rules, integrals, determinants, Bayes and stability. From memory. 80% to pass.',
    whyItMatters:
      'Robotics runs on all of these at once; the exam checks they coexist in your head, not just in separate lessons.',
    prereqIds: [
      'math-logic',
      'math-linalg',
      'math-linalg-2',
      'math-linalg-3',
      'math-prob',
      'math-prob-2',
      'math-prob-3',
      'math-calculus',
      'math-calculus-2',
      'math-calculus-3',
      'math-ode',
      'math-ode-2',
      'math-ode-3',
    ],
    x: 1500,
    y: 1560,
    hasLesson: true,
    isExam: true,
  },

  // ---- Physics (x3500-4570: elec col x3500, forces top, forces-depth x4100, energy x4380) ----
  {
    id: 'phys-forces',
    title: 'Forces & Motion',
    subject: 'physics',
    domainId: 'physics',
    description:
      'Newton’s laws: why things start moving, stop moving, and push back when shoved.',
    whyItMatters:
      'Torque, friction and inertia decide whether your robot climbs the ramp or tips over on it.',
    prereqIds: [],
    x: 3800,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'phys-energy',
    title: 'Energy & Power',
    subject: 'physics',
    domainId: 'physics',
    description:
      'Energy is the currency of the physical world; power is how fast you spend it.',
    whyItMatters:
      'Battery capacity vs. motor power is THE central budget of every mobile robot design.',
    prereqIds: ['phys-forces'],
    x: 4380,
    y: 220,
    hasLesson: true,
  },
  {
    id: 'phys-electricity',
    title: 'Electricity & Circuits',
    subject: 'physics',
    domainId: 'physics',
    description:
      'Voltage pushes, current flows, resistance resists — Ohm’s law and the circuits that carry your bits.',
    whyItMatters:
      'Your logic gates, sensors and motors all live on the same physics: moving charge through circuits.',
    prereqIds: ['phys-forces'],
    x: 3500,
    y: 220,
    hasLesson: true,
  },
  {
    id: 'phys-electricity-2',
    title: 'Kirchhoff’s Laws & the Voltage Divider',
    subject: 'physics',
    domainId: 'physics',
    description:
      'The two laws (KCL, KVL) that solve any circuit, plus the voltage divider and series/parallel rules — how every resistive sensor talks to a microcontroller.',
    whyItMatters:
      'Reading a thermistor, potentiometer or photoresistor is a voltage divider; sizing any passive circuit is Kirchhoff.',
    prereqIds: ['phys-electricity'],
    x: 3500,
    y: 420,
    hasLesson: true,
  },
  {
    id: 'phys-electricity-3',
    title: 'RC Transients, Induction & the Transistor',
    subject: 'physics',
    domainId: 'physics',
    description:
      'Capacitors charge on an RC exponential; changing magnetic fields drive motors and encoders (Faraday); transistors switch big loads from tiny signals — the bridge to real electronics.',
    whyItMatters:
      'Motor inrush, back-EMF, PWM filtering and the H-bridge that drives your wheels all live here.',
    prereqIds: ['phys-electricity-2'],
    x: 3500,
    y: 620,
    hasLesson: true,
  },
  {
    id: 'phys-forces-2',
    title: 'Kinematics: suvat, Projectiles & Circles',
    subject: 'physics',
    domainId: 'physics',
    description:
      'The five-letter toolkit for constant-acceleration motion, then two of its favorite applications: things you throw, and things that spin in place.',
    whyItMatters:
      'Trajectory planning for a thrown payload or a swinging arm IS suvat — the same four equations, over and over.',
    prereqIds: ['phys-forces'],
    x: 4100,
    y: 220,
    hasLesson: true,
  },
  {
    id: 'phys-forces-3',
    title: 'Momentum, Collisions & Rotation',
    subject: 'physics',
    domainId: 'physics',
    description:
      'What never leaks in a collision, and rotation’s mirror-image version of force, mass and momentum.',
    whyItMatters:
      'A gripper closing on an object, a wheel spinning up, a reaction wheel steering a satellite — all three run on this page.',
    prereqIds: ['phys-forces-2'],
    x: 4100,
    y: 420,
    hasLesson: true,
  },
  {
    id: 'phys-exam',
    title: 'Module Exam: Physics',
    subject: 'physics',
    domainId: 'physics',
    description:
      'Eighteen fresh questions across forces, kinematics, momentum, rotation, energy, Ohm’s law, Kirchhoff, dividers and RC/induction — with numbers, units and the classic traps. From memory. 80% to pass.',
    whyItMatters:
      'Whether your robot climbs the ramp is decided by exactly these equations — better to fail them here than in hardware.',
    prereqIds: ['phys-forces', 'phys-forces-2', 'phys-forces-3', 'phys-energy', 'phys-electricity', 'phys-electricity-2', 'phys-electricity-3'],
    x: 4380,
    y: 850,
    hasLesson: true,
    isExam: true,
  },

  // ---- Operating Systems (x3960-4430, band 1, below Physics-right; cpu + prog-data fan in) ----
  {
    id: 'os-processes',
    title: 'Processes & Scheduling',
    subject: 'cs',
    domainId: 'os',
    description:
      'How one CPU pretends to run a hundred programs at once by slicing time and switching fast.',
    whyItMatters:
      'A robot reads sensors, plans and drives motors “simultaneously” — that illusion is scheduling.',
    // Honest prereq is the intro-programming endpoint prog-data, NOT the depth
    // chain bottom prog-data-3 (recursion/debugging aren't needed to grasp
    // scheduling) — the old -3 pointer was a layout-routing artifact, removed
    // in the 2026-07-07 cleanup. Essentials view already projected it here.
    prereqIds: ['cpu', 'prog-data'],
    x: 3900,
    y: 1300,
    hasLesson: true,
  },
  {
    id: 'os-memory',
    title: 'Memory & Virtual Addresses',
    subject: 'cs',
    domainId: 'os',
    description:
      'Every process believes it owns all of memory. The OS maintains that useful lie with virtual addresses.',
    whyItMatters:
      'When your robot’s vision process crashes, memory isolation is why the motor controller keeps running.',
    prereqIds: ['os-processes'],
    x: 3760,
    y: 1500,
    hasLesson: true,
  },
  {
    id: 'os-io',
    title: 'I/O, Drivers & Interrupts',
    subject: 'cs',
    domainId: 'os',
    description:
      'Hardware taps the CPU on the shoulder: interrupts, drivers, and how data gets in and out of the machine.',
    whyItMatters:
      '“Bumper pressed!” reaching your code in microseconds instead of milliseconds is an interrupt at work.',
    prereqIds: ['os-processes'],
    x: 4040,
    y: 1500,
    hasLesson: true,
  },
  {
    id: 'os-exam',
    title: 'Module Exam: Operating Systems',
    subject: 'cs',
    domainId: 'os',
    description:
      'Ten fresh questions across scheduling, virtual memory and I/O — including traces you compute by hand. 80% to pass.',
    whyItMatters:
      'A robot is a dozen processes sharing one small computer — the OS rules you retrieve here are what keep them from trampling each other.',
    prereqIds: ['os-processes', 'os-memory', 'os-io'],
    x: 4060,
    y: 1720,
    hasLesson: true,
    isExam: true,
  },

  // ---- Algorithms & Data Structures (band 1 staircase x620→1120, below Prog/Math-left) ----
  {
    id: 'algo-bigo',
    title: 'Measuring Speed: Big-O',
    subject: 'cs',
    domainId: 'algorithms',
    description:
      'Some solutions stay fast as the problem grows; others explode. Big-O is the language for telling them apart before you build.',
    whyItMatters:
      'A path planner that is O(n²) on map size freezes your robot the moment it leaves the living room.',
    prereqIds: ['prog-data', 'math-logic'],
    x: 620,
    y: 1500,
    hasLesson: true,
  },
  {
    id: 'algo-structures',
    title: 'Arrays, Stacks & Hash Maps',
    subject: 'cs',
    domainId: 'algorithms',
    description:
      'The classic containers, each with a superpower: instant lookup, cheap growth, or perfect ordering — pick the right one per job.',
    whyItMatters:
      'A robot’s task queue, sensor buffer and landmark lookup are a stack, a ring buffer and a hash map.',
    prereqIds: ['algo-bigo'],
    x: 870,
    y: 1700,
    hasLesson: true,
  },
  {
    id: 'algo-graphs',
    title: 'Graphs, Trees & Pathfinding',
    subject: 'math',
    domainId: 'algorithms',
    description:
      'Model anything as dots and connections, then search it: BFS, Dijkstra and A* — the algorithm that navigates for real robots.',
    whyItMatters:
      'A* over a grid map is literally how vacuum robots and Mars rovers decide where to roll next.',
    prereqIds: ['algo-structures'],
    x: 1120,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'algo-exam',
    title: 'Module Exam: Algorithms',
    subject: 'cs',
    domainId: 'algorithms',
    description:
      'Ten fresh questions across Big-O, data structures and pathfinding — classify new code, pick the right container, reason about A*. 80% to pass.',
    whyItMatters:
      'Choosing the wrong structure or blowing up quadratically is the classic way robot code dies at scale — this exam is the vaccine.',
    prereqIds: ['algo-bigo', 'algo-structures', 'algo-graphs'],
    x: 870,
    y: 2100,
    hasLesson: true,
    isExam: true,
  },

  // ---- Networks (col x0, band 1; Security continues below it in band 2) ----
  {
    id: 'net-stack',
    title: 'The Network Stack',
    subject: 'cs',
    domainId: 'networks',
    description:
      'Layers upon layers: how a message is wrapped, shipped, and unwrapped as it crosses the world.',
    whyItMatters:
      'Teleoperating a robot means your joystick command survives every one of these layers, twice.',
    prereqIds: ['prog-data'],
    x: 0,
    y: 1500,
    hasLesson: true,
  },
  {
    id: 'net-packets',
    title: 'Packets, IP & Routing',
    subject: 'cs',
    domainId: 'networks',
    description:
      'Data travels in small addressed envelopes that each find their own way — and sometimes get lost.',
    whyItMatters:
      'A drone video feed drops packets constantly; designing for loss is what keeps the picture moving.',
    prereqIds: ['net-stack'],
    x: 0,
    y: 1700,
    hasLesson: true,
  },
  {
    id: 'net-protocols',
    title: 'HTTP, MQTT & Real-Time Messaging',
    subject: 'cs',
    domainId: 'networks',
    description:
      'The conversation patterns machines use: request/response for the web, publish/subscribe for swarms of devices.',
    whyItMatters:
      'MQTT — the IoT protocol — is how a fleet of warehouse robots gossips about where the boxes are.',
    prereqIds: ['net-packets'],
    x: 0,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'net-exam',
    title: 'Module Exam: Networks',
    subject: 'cs',
    domainId: 'networks',
    description:
      'Ten fresh questions across layers, packets and protocols — new scenarios, from memory. 80% to pass.',
    whyItMatters:
      'When your robot drops off the network mid-mission, this is the mental model you will debug with.',
    prereqIds: ['net-stack', 'net-packets', 'net-protocols'],
    x: -280,
    y: 2100,
    hasLesson: true,
    isExam: true,
  },

  // ---- Databases (col x300, band 2 — leaf domain off prog-data) ----
  {
    id: 'db-relational',
    title: 'Tables & Relations',
    subject: 'cs',
    domainId: 'databases',
    description:
      'Organize facts into tables with keys linking them — the model that has run the world’s data for 50 years.',
    whyItMatters:
      'Your robot’s map, mission log and battery history all want to be tables the moment they must survive a reboot.',
    prereqIds: ['prog-data'],
    x: 300,
    y: 2700,
    hasLesson: true,
  },
  {
    id: 'db-sql',
    title: 'Querying with SQL',
    subject: 'cs',
    domainId: 'databases',
    description:
      'Describe WHAT data you want, not how to fetch it — the database figures out the rest.',
    whyItMatters:
      '“Which rooms had obstacles this week?” is one SQL query over your robot’s log tables.',
    prereqIds: ['db-relational'],
    x: 300,
    y: 2900,
    hasLesson: true,
  },
  {
    id: 'db-transactions',
    title: 'Indexes & Transactions',
    subject: 'cs',
    domainId: 'databases',
    description:
      'How databases stay fast at a million rows (indexes) and stay correct when everything fails mid-write (transactions).',
    whyItMatters:
      'A robot that loses power mid-save must not wake up with half a map — that guarantee is a transaction.',
    prereqIds: ['db-sql'],
    x: 300,
    y: 3100,
    hasLesson: true,
  },
  {
    id: 'db-exam',
    title: 'Module Exam: Databases',
    subject: 'cs',
    domainId: 'databases',
    description:
      'Ten fresh questions across tables, SQL and transactions — trace new queries on new data, from memory. 80% to pass.',
    whyItMatters:
      'Every mission log and map your robot keeps must survive crashes and queries — prove you know why it does.',
    prereqIds: ['db-relational', 'db-sql', 'db-transactions'],
    x: 300,
    y: 3300,
    hasLesson: true,
    isExam: true,
  },

  // ---- Robotics Bridge (x2280-3910, bands 1-2) — the CONVERGENCE cell ----
  // sensing top (3600,1400) under HCW/Physics; three columns below it:
  // kinematics x2560, control x2950 (control-4 slot at y2300), embedded/ros
  // x3400/x3820; estimation chain x2280 (band 2); robo-exam (3100,2900).
  {
    id: 'robo-sensing',
    title: 'Sensors & Actuators',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'How robots sense the world (encoders, IMUs, lidar) and push back on it (motors, servos) — analog reality meeting your digital bits.',
    whyItMatters:
      'Sense → decide → act is the eternal loop of robotics; this node is the “sense” and “act”.',
    prereqIds: ['cpu', 'phys-electricity-3'],
    x: 3600,
    y: 1400,
    hasLesson: true,
  },
  {
    id: 'robo-control',
    title: 'Control Loops & PID',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Measure the error, correct, repeat — the feedback loop that turns a wobbly motor into a steady arm, and why PID is everywhere.',
    whyItMatters:
      'Every drone hovering perfectly still is running this exact loop hundreds of times per second.',
    prereqIds: ['robo-sensing', 'phys-forces'],
    x: 2950,
    y: 1700,
    hasLesson: true,
  },
  // Depth chain (Stage 1): robo-control deepens straight down the x2950 column.
  {
    id: 'robo-control-2',
    title: 'Tuning PID: Reading the Response',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'The step response and its four numbers — rise time, overshoot, settling time, steady-state error — and the symptom→gain table engineers use to tune real controllers.',
    whyItMatters:
      'Every robot you ever ship will be tuned by staring at this exact curve and knowing which knob its shape is pointing at.',
    prereqIds: ['robo-control'],
    x: 2950,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'robo-control-3',
    title: 'Beyond PID: Feedforward & State Space',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Feedback’s blind spot and the model-based fix: feedforward, the state vector, x′ = A·x + B·u, full-state feedback u = −K·x, and why estimating the state (Kalman) is Bayes’ rule on vectors.',
    whyItMatters:
      'This is the doorway from hobby PID to the control theory that flies rockets, balances Segways and runs every serious robot startup.',
    prereqIds: ['robo-control-2'],
    x: 2950,
    y: 2100,
    hasLesson: true,
  },
  {
    id: 'robo-embedded',
    title: 'Embedded Systems & Microcontrollers',
    subject: 'engineering',
    domainId: 'robotics-bridge',
    description:
      'Programming tiny computers with no OS, kilobytes of RAM, and hard deadlines — where software meets solder.',
    whyItMatters:
      'The CPU you studied, shrunk to €2 and strapped to a motor: this is where your whole skill tree converges.',
    prereqIds: ['robo-sensing'],
    x: 3400,
    y: 1700,
    hasLesson: true,
  },
  {
    id: 'robo-kinematics',
    title: 'Kinematics: Where Is My Arm?',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Forward kinematics: from joint angles to hand position. Inverse kinematics: the (harder) reverse. Chains of rotations and translations — matrices in action.',
    whyItMatters:
      'Every pick-and-place robot solves inverse kinematics dozens of times per second just to reach for an object.',
    prereqIds: ['math-linalg-3', 'robo-sensing'],
    x: 2560,
    y: 1700,
    hasLesson: true,
  },
  {
    id: 'robo-kinematics-2',
    title: 'Rotation Matrices & Homogeneous Transforms',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Orientation IS a matrix; a joint that rotates AND shifts is a homogeneous transform. Chain them and forward kinematics of any arm is one matrix product.',
    whyItMatters:
      'Every joint of every robot arm is a transform; chaining them is how the software knows where the gripper is.',
    prereqIds: ['robo-kinematics'],
    x: 2560,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'robo-kinematics-3',
    title: 'The Jacobian, Singularities & Inverse Kinematics',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'The Jacobian maps joint speeds to hand velocity; where its determinant hits zero the arm is singular (gimbal lock). Inverse kinematics iterates the Jacobian to a target.',
    whyItMatters:
      'Singularities make real arms lurch and fault; every motion planner is built to see the det(J)→0 cliff coming.',
    prereqIds: ['robo-kinematics-2'],
    x: 2560,
    y: 2100,
    hasLesson: true,
  },
  {
    id: 'robo-estimation',
    title: 'State Estimation: Fusing Noisy Senses',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Every sensor lies a little. The Kalman filter fuses a model prediction with a noisy measurement, weighting each by its uncertainty — Bayes’ rule for a moving robot.',
    whyItMatters:
      'It’s how a drone knows where it is: no single sensor is trustworthy, but fused well they are. Highest-leverage idea in robotics.',
    prereqIds: ['robo-control-3'],
    x: 2280,
    y: 2300,
    hasLesson: true,
  },
  {
    id: 'robo-estimation-2',
    title: 'The Multivariate Kalman Filter',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'State vectors and covariance matrices: predict grows uncertainty, update shrinks it, and correlations let one measurement improve many variables at once.',
    whyItMatters:
      'The covariance ellipse tells a robot exactly where its blind spots are — and which sensor would fix them.',
    prereqIds: ['robo-estimation'],
    x: 2280,
    y: 2500,
    hasLesson: true,
  },
  {
    id: 'robo-estimation-3',
    title: 'EKF & Sensor Fusion',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Real sensors are nonlinear, so the Extended Kalman Filter linearizes them each step with a Jacobian — then fuses IMU, GPS and encoders into one robust estimate.',
    whyItMatters:
      'The EKF is the workhorse of real localization; it’s running in essentially every self-driving car and drone.',
    prereqIds: ['robo-estimation-2'],
    x: 2280,
    y: 2700,
    hasLesson: true,
  },
  {
    id: 'robo-ros',
    title: 'Robot Software Stacks (ROS)',
    subject: 'engineering',
    domainId: 'robotics-bridge',
    description:
      'Real robots run dozens of cooperating programs — perception, planning, control — glued together by frameworks like ROS 2 with publish/subscribe messaging.',
    whyItMatters:
      'Your future startup will almost certainly prototype on ROS — it is the lingua franca of modern robotics.',
    prereqIds: ['robo-embedded', 'prog-data'],
    x: 3820,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'robo-exam',
    title: 'Module Exam: Robotics Bridge',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'Twenty-two fresh questions across sensing, control & tuning, state space, kinematics, transforms, the Jacobian, Kalman estimation & sensor fusion, embedded systems and ROS — the capstone check on the whole bridge. 80% to pass.',
    whyItMatters:
      'This module is where every other subject converges into an actual robot — passing it from memory means the convergence happened in your head too.',
    prereqIds: [
      'robo-sensing',
      'robo-control',
      'robo-control-2',
      'robo-control-3',
      'robo-kinematics',
      'robo-kinematics-2',
      'robo-kinematics-3',
      'robo-estimation',
      'robo-estimation-2',
      'robo-estimation-3',
      'robo-embedded',
      'robo-ros',
    ],
    x: 3100,
    y: 2900,
    hasLesson: true,
    isExam: true,
  },

  // ---- Theory of Computation (col x1360, band 1, below math-logic) ----
  {
    id: 'theory-fsm',
    title: 'Finite State Machines',
    subject: 'cs',
    domainId: 'theory',
    description:
      'Machines with a handful of states and rules for hopping between them — simple, yet they run elevators, regexes and robot behaviors.',
    whyItMatters:
      '“Patrolling → obstacle seen → avoiding → patrolling” — robot behavior controllers are literally FSMs.',
    prereqIds: ['math-logic', 'algo-bigo'],
    x: 1360,
    y: 1700,
    hasLesson: true,
  },
  {
    id: 'theory-turing',
    title: 'Turing Machines & Computability',
    subject: 'cs',
    domainId: 'theory',
    description:
      'The simplest machine that can compute anything computable — and the proof that some problems can never be solved by any computer.',
    whyItMatters:
      'Knowing what NO robot can ever compute saves you from burning months on an impossible feature.',
    prereqIds: ['theory-fsm'],
    x: 1360,
    y: 1900,
    hasLesson: true,
  },
  {
    id: 'theory-complexity',
    title: 'P vs NP & Hard Problems',
    subject: 'math',
    domainId: 'theory',
    description:
      'Some problems are checkable in a blink but seemingly unsolvable in a lifetime. Learn to recognize them before they eat your CPU.',
    whyItMatters:
      'Optimal multi-robot task assignment is NP-hard — pros approximate it, and now you’ll know why.',
    prereqIds: ['theory-turing'],
    x: 1360,
    y: 2100,
    hasLesson: true,
  },
  {
    id: 'theory-exam',
    title: 'Module Exam: Theory',
    subject: 'cs',
    domainId: 'theory',
    description:
      'Ten fresh questions across state machines, computability and complexity — trace new FSMs, reason about impossible programs. 80% to pass.',
    whyItMatters:
      'Theory tells you which robot features are impossible before you waste a month on them — worth retrieving precisely.',
    prereqIds: ['theory-fsm', 'theory-turing', 'theory-complexity'],
    x: 840,
    y: 2300,
    hasLesson: true,
    isExam: true,
  },

  // ---- AI & Machine Learning (band 2 x1120-1870, directly below Math) ----
  {
    id: 'ai-search',
    title: 'Search & Planning',
    subject: 'cs',
    domainId: 'ai-ml',
    description:
      'Treat “what should I do?” as a path through a graph of possible futures, then search it cleverly.',
    whyItMatters:
      'A chess engine and a warehouse robot planning its route are running the same idea.',
    prereqIds: ['algo-graphs'],
    x: 1120,
    y: 2700,
    hasLesson: true,
  },
  {
    id: 'ai-learning',
    title: 'Learning from Data',
    subject: 'math',
    domainId: 'ai-ml',
    description:
      'Instead of writing rules, show examples: loss functions, gradient descent, and the honest limits of fitted models.',
    whyItMatters:
      'You can’t hand-code “what a pedestrian looks like” — perception is learned from data.',
    // Depends on the DEEP ends of the prob/linalg chains (Bayes, determinants) —
    // gradient descent needs distributions and matrix math. ai-learning sits
    // directly below the gap between the linalg/prob columns, so both in-edges
    // are clean vertical lanes (x1776 / x2056) that math-exam threads between.
    prereqIds: ['math-prob-3', 'math-linalg-3'],
    x: 1680,
    y: 2700,
    hasLesson: true,
  },
  {
    id: 'ai-neural',
    title: 'Neural Networks',
    subject: 'cs',
    domainId: 'ai-ml',
    description:
      'Stack simple weighted units into layers and something remarkable happens — the workhorse behind modern vision, speech and control.',
    whyItMatters:
      'The network that lets a robot grasp unfamiliar objects is layers of the matrix math you already know.',
    prereqIds: ['ai-learning'],
    x: 1680,
    y: 2900,
    hasLesson: true,
  },
  {
    id: 'ai-exam',
    title: 'Module Exam: AI & ML',
    subject: 'cs',
    domainId: 'ai-ml',
    description:
      'Ten fresh questions across search, learning from data and neural networks — new scenarios, real gradient arithmetic. 80% to pass.',
    whyItMatters:
      'Perception and planning are the hardest half of any robot — this exam checks the foundations actually stuck.',
    prereqIds: ['ai-search', 'ai-learning', 'ai-neural'],
    x: 1400,
    y: 3100,
    hasLesson: true,
    isExam: true,
  },

  // ---- Security & Crypto (col x0, band 2, straight below Networks) ----
  {
    id: 'sec-threats',
    title: 'Thinking Like an Attacker',
    subject: 'cs',
    domainId: 'security',
    description:
      'Security starts with a question: who wants to break this, and what’s the cheapest way in? Threat models before ciphers.',
    whyItMatters:
      'A robot is a computer that can push things — an insecure one is a physical hazard, not just a data leak.',
    prereqIds: ['net-protocols'],
    x: 0,
    y: 2450,
    hasLesson: true,
  },
  {
    id: 'sec-crypto',
    title: 'Ciphers & Keys',
    subject: 'math',
    domainId: 'security',
    description:
      'Scramble data so only the right key unscrambles it: symmetric ciphers, public keys, and why the math holds.',
    whyItMatters:
      'The command channel to your drone is encrypted — or someone else is flying it.',
    prereqIds: ['sec-threats'],
    x: 0,
    y: 2650,
    hasLesson: true,
  },
  {
    id: 'sec-systems',
    title: 'Securing Networked Machines',
    subject: 'cs',
    domainId: 'security',
    description:
      'Authentication, updates, least privilege: turning a hackable gadget into a trustworthy system.',
    whyItMatters:
      'Fleets of IoT robots have been hijacked into botnets — hardening is part of shipping.',
    prereqIds: ['sec-crypto'],
    x: 0,
    y: 2850,
    hasLesson: true,
  },
  {
    id: 'sec-exam',
    title: 'Module Exam: Security',
    subject: 'cs',
    domainId: 'security',
    description:
      'Ten fresh questions across threat models, crypto and hardening — new scenarios, one cipher to crack by hand. 80% to pass.',
    whyItMatters:
      'A robot is a computer that can push things — the security instincts you retrieve here are a safety feature.',
    prereqIds: ['sec-threats', 'sec-crypto', 'sec-systems'],
    x: 0,
    y: 3050,
    hasLesson: true,
    isExam: true,
  },

  // ---- History of Science & Technology (row at x4950-5700 — prereq-free island, far right) ----
  {
    id: 'hist-scientific-revolution',
    title: 'The Scientific Revolution',
    subject: 'history',
    domainId: 'history',
    description:
      'How, in a few centuries, humanity invented the method of careful observation, experiment and mathematics that underlies all modern science.',
    whyItMatters:
      'Knowing HOW knowledge is built — and how it was wrong before — makes you a sharper builder and a harder person to fool.',
    prereqIds: [],
    x: 4950,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'hist-computing',
    title: 'The History of Computing',
    subject: 'history',
    domainId: 'history',
    description:
      'From Babbage’s gears and Lovelace’s first program to Turing, transistors and the internet — the story of the machine you’re learning to master.',
    whyItMatters:
      'Every “new” idea in tech rhymes with an old one; history is a founder’s cheat sheet for what tends to work.',
    prereqIds: [],
    x: 5230,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'hist-industrial',
    title: 'Industrial Revolutions & Automation',
    subject: 'history',
    domainId: 'history',
    description:
      'How steam, electricity and computing each reshaped work, cities and society — and what the coming wave of robotics might do next.',
    whyItMatters:
      'A robotics startup changes how people work; understanding past automation waves is understanding your own impact.',
    prereqIds: [],
    x: 5510,
    y: 0,
    hasLesson: true,
  },
  {
    id: 'hist-exam',
    title: 'Module Exam: History',
    subject: 'history',
    domainId: 'history',
    description:
      'Ten fresh questions across the scientific revolution, computing and automation waves — causes and patterns, not trivia. 80% to pass.',
    whyItMatters:
      'History only pays off if the patterns are retrievable when you face the same choice — that retrieval is what this exam trains.',
    prereqIds: ['hist-scientific-revolution', 'hist-computing', 'hist-industrial'],
    x: 5230,
    y: 240,
    hasLesson: true,
    isExam: true,
  },

  // ---- Chemistry (col x4950, below the History row — prereq-free island) ----
  {
    id: 'chem-atoms',
    title: 'Atoms & the Periodic Table',
    subject: 'chemistry',
    domainId: 'chemistry',
    description:
      'What everything is made of: atoms, electrons, and the periodic table that organizes every element by its structure.',
    whyItMatters:
      'Silicon chips, copper wires and lithium batteries are all just clever uses of particular elements’ chemistry.',
    prereqIds: [],
    x: 4950,
    y: 500,
    hasLesson: true,
  },
  {
    id: 'chem-reactions',
    title: 'Reactions & Energy',
    subject: 'chemistry',
    domainId: 'chemistry',
    description:
      'How bonds break and form, releasing or absorbing energy — the engine behind fuels, batteries and life itself.',
    whyItMatters:
      'A battery is a controlled chemical reaction; its energy density sets what your robot can carry and how long it runs.',
    prereqIds: ['chem-atoms'],
    x: 4950,
    y: 700,
    hasLesson: true,
  },
  {
    id: 'chem-materials',
    title: 'Materials & Electrochemistry',
    subject: 'chemistry',
    domainId: 'chemistry',
    description:
      'Why metals conduct, why plastics don’t, and how electrochemistry turns chemical energy into the electricity that runs everything.',
    whyItMatters:
      'Choosing the right material — light, strong, conductive, cheap — is half of designing real robot hardware.',
    prereqIds: ['chem-reactions'],
    x: 4950,
    y: 900,
    hasLesson: true,
  },
  {
    id: 'chem-exam',
    title: 'Module Exam: Chemistry',
    subject: 'chemistry',
    domainId: 'chemistry',
    description:
      'Ten fresh questions across atoms, reactions and materials — identify elements, track electrons, follow the energy. 80% to pass.',
    whyItMatters:
      'Batteries, wires and chips are applied chemistry — retrieving these basics cold is what lets you read a datasheet critically.',
    prereqIds: ['chem-atoms', 'chem-reactions', 'chem-materials'],
    x: 4950,
    y: 1100,
    hasLesson: true,
    isExam: true,
  },
]


/** Curated external material per node — videos, interactives, books, courses. */
const resourcesByNode: Record<string, Resource[]> = {
  bits: [
    { type: 'video', title: 'Crash Course CS #1–4 (electricity → binary)', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo', note: 'The best 40-minute video overview of everything this module covers.' },
    { type: 'book', title: 'Code — Charles Petzold', url: 'https://www.codehiddenlanguage.com', note: 'THE book: from flashlight signals to a working computer, zero prior knowledge.' },
  ],
  gates: [
    { type: 'interactive', title: 'Nandgame', url: 'https://nandgame.com', note: 'Free browser game: keep building past our puzzles, all the way to a full computer.' },
    { type: 'video', title: 'Sebastian Lague — Exploring How Computers Work', url: 'https://www.youtube.com/watch?v=QZwneRb-zqA', note: 'Gorgeous visual walkthrough of gates → adders, great after this lesson.' },
    { type: 'interactive', title: 'Turing Complete (Steam, paid)', url: 'https://turingcomplete.game', note: 'The deluxe version of what you did here — build a CPU from NAND, then program it.' },
  ],
  adder: [
    { type: 'video', title: 'Ben Eater — How computers add numbers', url: 'https://www.youtube.com/watch?v=wvJc9CZcvBc', note: 'He builds YOUR half/full adder from real chips on a breadboard.' },
    { type: 'course', title: 'Nand2Tetris (free course)', url: 'https://www.nand2tetris.org', note: 'The famous course: from NAND to a complete working computer in 12 projects.' },
  ],
  cpu: [
    { type: 'video', title: 'Ben Eater — 8-bit CPU from scratch (series)', url: 'https://eater.net/8bit', note: 'Legendary series: a full CPU on breadboards, wire by wire. The deep end.' },
    { type: 'video', title: 'Crash Course CS #7 — The CPU', url: 'https://www.youtube.com/watch?v=cNN_tTXABUA', note: 'Fetch-decode-execute animated in 12 minutes — perfect revision.' },
  ],
  'math-logic': [
    { type: 'course', title: 'Brilliant — Logic', url: 'https://brilliant.org/courses/logic-deduction/', note: 'Interactive puzzles in the same predict-first style as this app (paid).' },
  ],
  'math-linalg': [
    { type: 'video', title: '3Blue1Brown — Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', note: 'The gold standard. Watch it twice; robotics runs on these animations.' },
    { type: 'interactive', title: 'Immersive Linear Algebra', url: 'http://immersivemath.com/ila/index.html', note: 'A textbook where every figure is draggable.' },
    { type: 'course', title: 'MIT 18.06 — Gilbert Strang', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', note: 'The real bachelor course, free, when you want full depth.' },
  ],
  'math-prob': [
    { type: 'interactive', title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu', note: 'Beautiful interactive intro to probability & statistics.' },
    { type: 'video', title: '3Blue1Brown — Bayes theorem', url: 'https://www.youtube.com/watch?v=HZGCoVF3YvM', note: 'The single most important idea for sensor fusion, explained visually.' },
  ],
  'math-calculus': [
    { type: 'video', title: '3Blue1Brown — Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', note: 'Derivatives and integrals as pictures, not rules. Start here.' },
    { type: 'course', title: 'Khan Academy — Calculus', url: 'https://www.khanacademy.org/math/calculus-1', note: 'Unlimited practice problems with instant feedback for drilling.' },
  ],
  'prog-variables': [
    { type: 'course', title: 'Harvard CS50x (free)', url: 'https://cs50.harvard.edu/x/', note: 'The world-famous intro-to-programming course — pairs perfectly with this track.' },
  ],
  'prog-data-2': [
    { type: 'interactive', title: 'Python Tutor — visualize the call stack', url: 'https://pythontutor.com', note: 'Paste a recursive function and WATCH the frames stack up and unwind, step by step. Works for JavaScript too.' },
    { type: 'course', title: 'CS50x — Recursion (week 3)', url: 'https://cs50.harvard.edu/x/', note: 'David Malan’s recursion segment — the pyramid example is a classic.' },
  ],
  'prog-data-3': [
    { type: 'article', title: 'Julia Evans — The Pocket Guide to Debugging', url: 'https://wizardzines.com/zines/debugging-guide/', note: 'The best modern zine on debugging as a systematic skill (sample pages free).' },
    { type: 'course', title: 'CS50x — Debugging tools', url: 'https://cs50.harvard.edu/x/', note: 'printf debugging, debuggers and rubber ducks, from week 2 onward.' },
  ],
  'os-processes': [
    { type: 'video', title: 'CS50 — Operating Systems concepts', url: 'https://cs50.harvard.edu/x/', note: 'Context for how the OS sits between your code and the hardware.' },
    { type: 'book', title: 'OSTEP — Three Easy Pieces (free)', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', note: 'THE free OS textbook — the scheduling chapters read like a story.' },
  ],
  'os-memory': [
    { type: 'book', title: 'OSTEP — Virtual memory chapters', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', note: 'Address translation, TLBs and paging, one gentle chapter at a time.' },
    { type: 'video', title: 'Computerphile — Virtual memory', url: 'https://www.youtube.com/watch?v=5lFnKYCZT5o', note: '10-minute whiteboard version of exactly this lesson.' },
  ],
  'os-io': [
    { type: 'video', title: 'Ben Eater — Interrupts (6502 series)', url: 'https://eater.net/6502', note: 'Watch real interrupt hardware wired on a breadboard — polling vs interrupts made physical.' },
    { type: 'book', title: 'OSTEP — I/O devices chapter', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', note: 'Polling, interrupts and DMA formalized.' },
  ],
  'net-stack': [
    { type: 'video', title: 'Practical Networking — OSI/TCP-IP model', url: 'https://www.youtube.com/watch?v=E5bSumTAHZE', note: 'The layer model with concrete packet examples.' },
    { type: 'article', title: 'High Performance Browser Networking (free book)', url: 'https://hpbn.co', note: 'How TCP/UDP actually behave in the wild — skim chapters 1-3.' },
  ],
  'net-packets': [
    { type: 'video', title: 'Computerphile — Internet routing', url: 'https://www.youtube.com/watch?v=AkxqkoxErRk', note: 'How packets find their way with no map of the whole internet.' },
    { type: 'interactive', title: 'Wireshark', url: 'https://www.wireshark.org', note: 'Capture YOUR packets and see the headers from this lesson, live. Free.' },
  ],
  'net-protocols': [
    { type: 'article', title: 'MQTT Essentials (HiveMQ series)', url: 'https://www.hivemq.com/mqtt-essentials/', note: 'The standard pub/sub-for-IoT tutorial series — QoS, last will, all of it.' },
    { type: 'video', title: 'Computerphile — HTTP & the web', url: 'https://www.youtube.com/watch?v=tb8gHvYlCFs', note: 'Request/response from first principles.' },
  ],
  'db-relational': [
    { type: 'course', title: 'SQLBolt — interactive lessons', url: 'https://sqlbolt.com', note: 'Learn tables and queries by typing real SQL in the browser — start here.' },
    { type: 'article', title: 'SQLite — When to use', url: 'https://www.sqlite.org/whentouse.html', note: 'Why a single-file database powers phones, planes and (soon) your robot logs.' },
  ],
  'db-sql': [
    { type: 'course', title: 'SQLBolt — SELECT/WHERE/JOIN drills', url: 'https://sqlbolt.com', note: 'Interactive practice for every verb in this lesson.' },
    { type: 'interactive', title: 'DB Fiddle', url: 'https://www.db-fiddle.com', note: 'A scratchpad database in your browser — paste schemas, try queries.' },
  ],
  'db-transactions': [
    { type: 'article', title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com', note: 'The classic free guide to what indexes do and when they don’t.' },
    { type: 'video', title: 'Hussein Nasser — ACID explained', url: 'https://www.youtube.com/watch?v=pomxJOFVcQs', note: 'Transactions, isolation levels and WAL by a database engineer.' },
  ],
  'theory-fsm': [
    { type: 'video', title: 'Computerphile — Finite State Machines', url: 'https://www.youtube.com/watch?v=vhiiia1_hC4', note: 'FSMs and what regular languages can’t do.' },
    { type: 'article', title: 'Behavior Trees in robotics (intro)', url: 'https://arxiv.org/abs/1709.00084', note: 'The free survey paper — how industry upgrades FSMs for real robots.' },
  ],
  'theory-turing': [
    { type: 'video', title: 'Computerphile — Turing Machines', url: 'https://www.youtube.com/watch?v=dNRDvLACg5Q', note: 'The tape machine explained by Professor Brailsford — a treasure.' },
    { type: 'video', title: 'Computerphile — The Halting Problem', url: 'https://www.youtube.com/watch?v=macM_MtS_w4', note: 'The self-reference proof from this lesson, drawn out step by step.' },
  ],
  'theory-complexity': [
    { type: 'video', title: 'Up and Atom — P vs NP', url: 'https://www.youtube.com/watch?v=EHp4FPyajKQ', note: 'The clearest gentle intro to the million-dollar question.' },
    { type: 'book', title: 'The Golden Ticket — Lance Fortnow', url: 'https://goldenticket.fortnow.com', note: 'A whole popular-science book on P vs NP and what P=NP would mean.' },
  ],
  'sec-threats': [
    { type: 'video', title: 'Computerphile — security interviews (Mirai etc.)', url: 'https://www.youtube.com/playlist?list=PLzH6n4zXuckpfMu_4Ff8E7Z1behQks5ba', note: 'Real attacks dissected — botnets, injections, social engineering.' },
    { type: 'article', title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', note: 'The canonical list of what actually gets systems breached.' },
  ],
  'sec-crypto': [
    { type: 'video', title: 'Computerphile — Public key cryptography', url: 'https://www.youtube.com/watch?v=GSIDS_lvRv4', note: 'The padlock/key intuition made rigorous.' },
    { type: 'interactive', title: 'CryptoHack', url: 'https://cryptohack.org', note: 'Learn crypto by breaking it — free capture-the-flag puzzles.' },
  ],
  'sec-systems': [
    { type: 'article', title: 'NIST IoT security guidance', url: 'https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program', note: 'What “secure networked device” officially means — skim the core baseline.' },
    { type: 'video', title: 'Computerphile — Secure boot & trust', url: 'https://www.youtube.com/watch?v=0FVUKVwWSNs', note: 'Chains of trust from hardware upward.' },
  ],
  'ai-search': [
    { type: 'video', title: 'Sebastian Lague — A* and beyond (Coding Adventures)', url: 'https://www.youtube.com/watch?v=-L-WgKMFuhE', note: 'Watch state-space search come alive with gorgeous visuals.' },
    { type: 'course', title: 'CS50 AI — Search (lecture 0)', url: 'https://cs50.harvard.edu/ai/', note: 'Harvard’s free AI course opens with exactly this lesson: search, minimax, heuristics.' },
  ],
  'ai-learning': [
    { type: 'video', title: '3Blue1Brown — Gradient descent (ch. 2)', url: 'https://www.youtube.com/watch?v=IHZwWFHWa-w', note: 'The descent-a-landscape picture from this lesson, animated beautifully.' },
    { type: 'interactive', title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org', note: 'Train tiny networks live in your browser — watch overfitting happen.' },
    { type: 'course', title: 'Karpathy — Zero to Hero (micrograd)', url: 'https://karpathy.ai/zero-to-hero.html', note: 'Build gradient descent + backprop from scratch in Python, line by line.' },
  ],
  'ai-neural': [
    { type: 'video', title: '3Blue1Brown — Neural networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', note: 'What a neural net actually IS, visually.' },
    { type: 'course', title: 'Karpathy — Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', note: 'Build neural nets from scratch in code, taught by an OpenAI founding member.' },
    { type: 'interactive', title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org', note: 'Solve XOR with a real hidden layer — the exact wall you just hit, then broke.' },
  ],
  'robo-sensing': [
    { type: 'video', title: 'Paul McWhorter — Arduino tutorials', url: 'https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP', note: 'Hands-on: real sensors and motors on a €30 board. Do this alongside the theory.' },
    { type: 'article', title: 'Arduino documentation', url: 'https://docs.arduino.cc', note: 'Reference for when you start wiring your own.' },
  ],
  'robo-control': [
    { type: 'video', title: 'Brian Douglas — Understanding PID (MATLAB)', url: 'https://www.youtube.com/watch?v=wkfEZmsQqiA', note: 'The classic PID explanation every robotics engineer has watched.' },
    { type: 'video', title: 'Brian Douglas — Control systems channel', url: 'https://www.youtube.com/user/ControlLectures', note: 'A whole free control-theory education, one animation at a time.' },
  ],
  'phys-forces-2': [
    { type: 'video', title: 'Walter Lewin — 8.01 Lecture 4 (Projectile Motion)', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e', note: 'MIT’s legendary lecturer derives and demonstrates suvat and projectiles live in the lecture hall.' },
    { type: 'interactive', title: 'PhET — Projectile Motion', url: 'https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html', note: 'Drag the launch angle and speed, watch the trajectory and range update live.' },
    { type: 'course', title: 'MIT 8.01SC — Kinematics', url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/', note: 'Full free course with problem sets and solutions for everything in this lesson.' },
  ],
  'phys-forces-3': [
    { type: 'video', title: 'Walter Lewin — 8.01 Rotation Lectures (19–24, 31–32)', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e', note: 'Torque, moment of inertia and angular momentum, including a live spinning-chair demo.' },
    { type: 'video', title: 'The Mechanical Universe — Conservation of Momentum', url: 'https://www.youtube.com/playlist?list=PL8_xPU5epJddRABXqJ5h5G0dk-XGtA5cZ', note: 'Caltech’s classic series; the momentum and rotation episodes pair perfectly with this lesson.' },
    { type: 'interactive', title: 'PhET — Torque & Rotation sims', url: 'https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html', note: 'Play with levers, spinning platforms and moment of inertia hands-on.' },
  ],
  'math-ode': [
    { type: 'video', title: '3Blue1Brown — Differential Equations, ch. 1', url: 'https://www.3blue1brown.com/topics/differential-equations', note: 'The clearest visual intro to what a differential equation even is. Start here.' },
    { type: 'course', title: 'Khan Academy — Differential Equations', url: 'https://www.khanacademy.org/math/differential-equations', note: 'Separable equations and exponential models with unlimited practice.' },
    { type: 'course', title: 'MIT 18.03SC — Differential Equations', url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/', note: 'The full free MIT course when you want the real depth — problem sets with solutions.' },
  ],
  'math-ode-2': [
    { type: 'video', title: '3Blue1Brown — Differential Equations (harmonic oscillator)', url: 'https://www.3blue1brown.com/topics/differential-equations', note: 'The mass-spring-damper and why it rings, animated.' },
    { type: 'interactive', title: 'PhET — Masses & Springs', url: 'https://phet.colorado.edu/en/simulations/masses-and-springs', note: 'Drag the damping slider and watch under/critical/overdamped in real time.' },
    { type: 'video', title: 'Brian Douglas — Second-order systems & damping', url: 'https://engineeringmedia.com/', note: 'The control-engineer’s take on ζ, ω_n and step response — bridges straight to PID.' },
  ],
  'math-ode-3': [
    { type: 'video', title: '3Blue1Brown — Differential Equations (phase space & stability)', url: 'https://www.3blue1brown.com/topics/differential-equations', note: 'Phase portraits and the connection to eigenvalues, drawn out beautifully.' },
    { type: 'video', title: '3Blue1Brown — Essence of Linear Algebra (eigenvectors)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', note: 'Why eigenvalues are the natural axes of a matrix — the key to reading x′ = A·x.' },
    { type: 'course', title: 'MIT 18.03SC — Systems of ODEs', url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/', note: 'The matrix-exponential and phase-portrait units, free with solutions.' },
  ],
  'robo-kinematics-2': [
    { type: 'course', title: 'Modern Robotics — Ch. 3 (Rigid-Body Motions)', url: 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics', note: 'Lynch & Park’s free book + lightboard videos: rotations, transforms, the undergrad canon.' },
    { type: 'interactive', title: 'Ben Eater — Visualizing quaternions/rotations', url: 'https://eater.net/quaternions', note: 'A gorgeous interactive explorable for how 3D rotations actually compose.' },
    { type: 'video', title: '3Blue1Brown — Linear transformations & matrices', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', note: 'The "matrix = where the basis vectors land" intuition that makes transforms click.' },
  ],
  'robo-kinematics-3': [
    { type: 'course', title: 'Modern Robotics — Ch. 5 (Velocity Kinematics & the Jacobian)', url: 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics', note: 'The canonical treatment of Jacobians, singularities and manipulability.' },
    { type: 'article', title: 'Modern Robotics practice exercises (with solutions)', url: 'https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf', note: 'Real problem sets — work the Jacobian and singularity exercises after this lesson.' },
    { type: 'video', title: 'Brian Douglas — Robotics/control channel', url: 'https://engineeringmedia.com/', note: 'Clear animated intuition for Jacobians and why singularities wreck a controller.' },
  ],
  'phys-electricity-2': [
    { type: 'interactive', title: 'Falstad CircuitJS (live circuit simulator)', url: 'https://www.falstad.com/circuit/', note: 'Draw a divider or resistor network and watch current and voltage animate — the best way to feel KVL/KCL.' },
    { type: 'video', title: 'Khan Academy — Circuit analysis', url: 'https://www.khanacademy.org/science/physics/circuits-topic', note: 'Kirchhoff’s laws and dividers worked step by step.' },
    { type: 'course', title: 'MIT 8.02 — DC circuits', url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/', note: 'The real course; the problem-solving sessions cover resistor networks in depth.' },
  ],
  'phys-electricity-3': [
    { type: 'video', title: 'Ben Eater — Capacitors, transistors & clocks', url: 'https://eater.net/', note: 'He builds RC timing and transistor switches on breadboards — theory made physical.' },
    { type: 'interactive', title: 'Falstad CircuitJS — RC & inductors', url: 'https://www.falstad.com/circuit/', note: 'Watch a capacitor charge on its exponential curve and see induction live.' },
    { type: 'course', title: 'MIT 8.02 — Faraday’s law & induction', url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/', note: 'Induction, RC/RL circuits and the physics behind motors.' },
  ],
  'robo-estimation': [
    { type: 'article', title: 'How a Kalman filter works, in pictures (bzarg)', url: 'https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/', note: 'THE best first read on Kalman filters — start here, it builds the exact intuition of this lesson.' },
    { type: 'interactive', title: 'kalmanfilter.net', url: 'https://www.kalmanfilter.net/', note: 'Fully worked numerical examples, 1D → multivariate, step by step.' },
    { type: 'video', title: 'MATLAB Tech Talks — Understanding Kalman Filters', url: 'https://www.mathworks.com/videos/series/understanding-kalman-filters.html', note: 'A 7-part animated series covering exactly this chain, predict/update to EKF.' },
  ],
  'robo-estimation-2': [
    { type: 'book', title: 'Kalman and Bayesian Filters in Python (rlabbe)', url: 'https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python', note: 'Free Jupyter book: g-h → KF → EKF/UKF/particle, with exercises AND solutions. The deep dive.' },
    { type: 'interactive', title: 'kalmanfilter.net — multivariate', url: 'https://www.kalmanfilter.net/multiSummary.html', note: 'The covariance-matrix version worked out numerically, matrices and all.' },
  ],
  'robo-estimation-3': [
    { type: 'book', title: 'rlabbe — the EKF & UKF chapters', url: 'https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python', note: 'Nonlinear filtering: linearization, the EKF, and when to reach for a UKF or particle filter.' },
    { type: 'course', title: 'Stachniss — Mobile Sensing & Robotics (SLAM)', url: 'https://www.ipb.uni-bonn.de/online-training-robotics/index.html', note: 'Free full course: Bayes filter → EKF/MCL → sensor fusion → graph SLAM.' },
  ],
  'robo-control-2': [
    { type: 'video', title: 'MATLAB Tech Talks — Understanding PID Control (series)', url: 'https://www.mathworks.com/videos/series/understanding-pid-control.html', note: 'Parts 2–3 cover exactly this lesson: reading responses and the tuning trade-offs, beautifully animated.' },
    { type: 'article', title: 'Ziegler–Nichols method (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method', note: 'The 1942 recipe from the deeper-dive, with its full tuning table.' },
  ],
  'robo-control-3': [
    { type: 'video', title: 'MATLAB Tech Talks — State Space (series)', url: 'https://www.mathworks.com/videos/series/state-space.html', note: 'Brian Douglas takes x′ = Ax + Bu from this lesson’s sketch to full working control.' },
    { type: 'article', title: 'How a Kalman Filter Works, in Pictures', url: 'https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/', note: 'The legendary illustrated walkthrough of the predict-then-correct dance.' },
  ],
  'robo-embedded': [
    { type: 'video', title: 'Ben Eater — 6502 computer (series)', url: 'https://eater.net/6502', note: 'Build and program a real retro computer — embedded systems from first principles.' },
  ],
  'robo-ros': [
    { type: 'course', title: 'ROS 2 official tutorials', url: 'https://docs.ros.org/en/rolling/Tutorials.html', note: 'The standard entry point once you can program.' },
  ],
  'algo-bigo': [
    { type: 'video', title: 'CS50 — Algorithms (week 3)', url: 'https://cs50.harvard.edu/x/weeks/3/', note: 'Harvard’s free intro: search, sort and Big-O with brilliant live demos.' },
    { type: 'interactive', title: 'VisuAlgo — sorting visualizations', url: 'https://visualgo.net/en/sorting', note: 'Watch O(n²) vs O(n log n) sorts race on the same array.' },
  ],
  'algo-structures': [
    { type: 'video', title: 'CS50 — Data Structures (week 5)', url: 'https://cs50.harvard.edu/x/weeks/5/', note: 'Stacks, queues, hash tables — built live in C so you see the memory.' },
    { type: 'interactive', title: 'VisuAlgo — hash table', url: 'https://visualgo.net/en/hashtable', note: 'Watch keys hash into slots (and collide) interactively.' },
  ],
  'algo-graphs': [
    { type: 'article', title: 'Red Blob Games — Introduction to A*', url: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html', note: 'THE interactive A* tutorial — beautiful, gentle, definitive.' },
    { type: 'video', title: 'Computerphile — A* search', url: 'https://www.youtube.com/watch?v=ySN5Wnu88nE', note: 'A* explained on a whiteboard in 14 minutes — ideal right after the sim.' },
    { type: 'interactive', title: 'PathFinding.js visualizer', url: 'https://qiao.github.io/PathFinding.js/visual/', note: 'The deluxe version of this lesson’s game: BFS, Dijkstra, A* and more on big grids.' },
  ],
  'hist-scientific-revolution': [
    { type: 'video', title: 'Crash Course History of Science #1–14', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNppY8ZHMPDH5TKK2UpU8Ng', note: 'The full arc from ancient knowledge to Newton, 12 minutes at a time.' },
    { type: 'book', title: 'The Sleepwalkers — Arthur Koestler', url: 'https://en.wikipedia.org/wiki/The_Sleepwalkers_(Koestler_book)', note: 'Copernicus, Kepler and Galileo as flawed, stumbling humans — the best story version of this lesson.' },
  ],
  'hist-computing': [
    { type: 'video', title: 'Crash Course Computer Science #1–10', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo', note: 'Babbage to microprocessors with great visuals — pairs exactly with this lesson.' },
    { type: 'book', title: 'The Innovators — Walter Isaacson', url: 'https://en.wikipedia.org/wiki/The_Innovators_(book)', note: 'Lovelace to Google as one connected story of teams, not lone geniuses.' },
    { type: 'article', title: 'Computer History Museum timeline', url: 'https://www.computerhistory.org/timeline/', note: 'Browsable year-by-year timeline with photos of the actual machines.' },
  ],
  'hist-industrial': [
    { type: 'video', title: 'Crash Course European History — Industrial Revolution', url: 'https://www.youtube.com/watch?v=zjK7PWmRRyg', note: 'The first wave in 15 minutes: steam, factories, cities.' },
    { type: 'video', title: 'CGP Grey — Humans Need Not Apply', url: 'https://www.youtube.com/watch?v=7Pq-S557XQU', note: 'The provocative "wave 4" argument — watch critically after this lesson.' },
  ],
  'chem-atoms': [
    { type: 'interactive', title: 'PhET — Build an Atom', url: 'https://phet.colorado.edu/en/simulations/build-an-atom', note: 'The deluxe version of this lesson’s atom builder, with neutrons and isotope notation.' },
    { type: 'interactive', title: 'Ptable — interactive periodic table', url: 'https://ptable.com', note: 'Live periodic table: click any element for shells, properties and uses.' },
    { type: 'video', title: 'Crash Course Chemistry #1 (The Nucleus)', url: 'https://www.youtube.com/watch?v=FSyAehMdpyI', note: 'Fast, funny 10-minute reinforcement of atoms, isotopes and ions.' },
  ],
  'chem-reactions': [
    { type: 'video', title: 'Crash Course Chemistry #16–17 (energy & enthalpy)', url: 'https://www.youtube.com/watch?v=SV7U4yAXL5I', note: 'Exothermic/endothermic and the energy bookkeeping, one level more formal.' },
    { type: 'interactive', title: 'PhET — Reactions & Rates', url: 'https://phet.colorado.edu/en/simulations/reactions-and-rates', note: 'Fire molecules at each other and SEE activation energy decide what reacts.' },
  ],
  'chem-materials': [
    { type: 'video', title: 'Engineerguy — batteries series (Bill Hammack)', url: 'https://www.youtube.com/watch?v=9OVtk6G2TnQ', note: 'How real lithium-ion cells work, from an engineer who takes them apart.' },
    { type: 'video', title: 'Real Engineering — The truth about carbon fiber', url: 'https://www.youtube.com/watch?v=QO9Ledxlx-c', note: 'Why composites dominate aerospace and drones — specific strength made visual.' },
    { type: 'interactive', title: 'PhET — Battery-Resistor Circuit', url: 'https://phet.colorado.edu/en/simulations/battery-resistor-circuit', note: 'Connects this lesson’s electrochemistry to the circuits you already know.' },
  ],
}

for (const n of nodes) {
  const r = resourcesByNode[n.id]
  if (r) n.resources = r
}

export const nodeById: Map<string, KnowledgeNode> = new Map(nodes.map((n) => [n.id, n]))

/** Domain title blocks rendered on the map above each cluster. */
export const domainLabels: { id: string; title: string; x: number; y: number }[] = [
  { id: 'label-hcw', title: 'How Computers Work', x: 3000, y: -60 },
  { id: 'label-prog', title: 'Programming Fundamentals', x: 560, y: -60 },
  { id: 'label-math', title: 'Math for CS & Robotics', x: 1120, y: -60 },
  { id: 'label-phys', title: 'Physics Foundations', x: 3800, y: -60 },
  { id: 'label-os', title: 'Operating Systems', x: 3900, y: 1240 },
  { id: 'label-algo', title: 'Algorithms & Data Structures', x: 620, y: 1440 },
  { id: 'label-net', title: 'Networks', x: 0, y: 1440 },
  { id: 'label-db', title: 'Databases', x: 300, y: 2640 },
  { id: 'label-robo', title: 'Robotics Bridge', x: 3600, y: 1340 },
  { id: 'label-theory', title: 'Theory of Computation', x: 1360, y: 1640 },
  { id: 'label-ai', title: 'AI & Machine Learning', x: 1120, y: 2640 },
  { id: 'label-sec', title: 'Security & Crypto', x: 0, y: 2390 },
  { id: 'label-hist', title: 'History of Science & Tech', x: 4950, y: -60 },
  { id: 'label-chem', title: 'Chemistry', x: 4950, y: 440 },
]

export const XP_PER_NODE = 100

// ---- Map view tiers (cumulative content layers) ----

/** Depth-chain lessons: ids ending in -2/-3 (e.g. math-linalg-2). */
export const isDepthId = (id: string) => /-\d$/.test(id)

/**
 * Content layer of a node: 0 = essentials/intro, 1 = depth chain. Inferred
 * from the id suffix unless the node sets `tier` explicitly. Future stages
 * (rigor, labs…) claim higher tiers by setting `tier` on their nodes.
 */
export const nodeTier = (n: KnowledgeNode): number => n.tier ?? (isDepthId(n.id) ? 1 : 0)

/**
 * The map's selectable view layers, cumulative: picking a tier shows every
 * node at that tier or below. ADD AN ENTRY here when a new stage's nodes land
 * — the map's segmented control renders straight from this list.
 */
export const viewTiers: { tier: number; icon: string; label: string; desc: string }[] = [
  { tier: 0, icon: '🌱', label: 'Essentials', desc: 'One intro lesson per topic — the breadth spine, nothing else.' },
  { tier: 1, icon: '🌳', label: 'Depth', desc: 'Everything: intros plus the deep-dive chains (-2/-3 lessons).' },
]

/** The highest defined tier — the "show everything" view. */
export const MAX_TIER = viewTiers[viewTiers.length - 1].tier
