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
]

// Layout: three depth columns (x = 0 / 360 / 720), domain blocks stacked
// vertically, nodes top-to-bottom by prereq depth within each block.
export const nodes: KnowledgeNode[] = [
  // ---- How Computers Work (col 0, y 50-350) — the playable MVP module ----
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
    x: 0,
    y: 50,
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
    x: 0,
    y: 150,
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
    x: 0,
    y: 250,
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
    x: 0,
    y: 350,
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
    x: 0,
    y: 450,
    hasLesson: true,
    isExam: true,
  },

  // ---- Programming Fundamentals (col 0, y 580-780) ----
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
    x: 0,
    y: 680,
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
    x: 0,
    y: 780,
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
    x: 0,
    y: 880,
  },

  // ---- Math for CS & Robotics (col 0, y 1010-1210) ----
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
    x: 0,
    y: 1110,
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
    x: 0,
    y: 1210,
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
    x: 0,
    y: 1310,
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
    x: 0,
    y: 1410,
    hasLesson: true,
  },

  // ---- Physics Foundations (col 1, y -380..-180) — coming soon ----
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
    x: 360,
    y: -380,
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
    x: 360,
    y: -280,
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
    x: 360,
    y: -180,
  },

  // ---- Operating Systems (col 1, y 50-250) ----
  {
    id: 'os-processes',
    title: 'Processes & Scheduling',
    subject: 'cs',
    domainId: 'os',
    description:
      'How one CPU pretends to run a hundred programs at once by slicing time and switching fast.',
    whyItMatters:
      'A robot reads sensors, plans and drives motors “simultaneously” — that illusion is scheduling.',
    prereqIds: ['cpu', 'prog-data'],
    x: 360,
    y: 50,
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
    x: 360,
    y: 150,
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
    x: 360,
    y: 250,
  },

  // ---- Algorithms & Data Structures (col 1, y 480-680) ----
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
    x: 360,
    y: 480,
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
    x: 360,
    y: 580,
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
    x: 360,
    y: 680,
  },

  // ---- Networks (col 1, y 910-1110) ----
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
    x: 360,
    y: 910,
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
    x: 360,
    y: 1010,
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
    x: 360,
    y: 1110,
  },

  // ---- Databases (col 1, y 1340-1540) ----
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
    x: 360,
    y: 1340,
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
    x: 360,
    y: 1440,
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
    x: 360,
    y: 1540,
  },

  // ---- Robotics Bridge (col 2, y -280..-80) ----
  {
    id: 'robo-sensing',
    title: 'Sensors & Actuators',
    subject: 'robotics',
    domainId: 'robotics-bridge',
    description:
      'How robots sense the world (encoders, IMUs, lidar) and push back on it (motors, servos) — analog reality meeting your digital bits.',
    whyItMatters:
      'Sense → decide → act is the eternal loop of robotics; this node is the “sense” and “act”.',
    prereqIds: ['cpu', 'phys-electricity'],
    x: 720,
    y: -280,
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
    x: 720,
    y: -180,
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
    x: 720,
    y: -80,
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
    prereqIds: ['math-linalg', 'robo-sensing'],
    x: 720,
    y: 20,
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
    x: 720,
    y: 120,
  },

  // ---- Theory of Computation (col 2, y 480-680) ----
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
    x: 720,
    y: 480,
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
    x: 720,
    y: 580,
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
    x: 720,
    y: 680,
  },

  // ---- AI & Machine Learning (col 2, y 910-1110) ----
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
    x: 720,
    y: 910,
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
    prereqIds: ['math-prob', 'math-linalg'],
    x: 720,
    y: 1010,
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
    x: 720,
    y: 1110,
  },

  // ---- Security & Crypto (col 2, y 1340-1540) ----
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
    x: 720,
    y: 1340,
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
    x: 720,
    y: 1440,
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
    x: 720,
    y: 1540,
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
  'algo-graphs': [
    { type: 'interactive', title: 'Red Blob Games — A* pathfinding', url: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html', note: 'The best interactive explanation on the internet, period. Robot navigation in your browser.' },
    { type: 'interactive', title: 'VisuAlgo', url: 'https://visualgo.net', note: 'Animated visualizations of every classic algorithm and data structure.' },
  ],
  'ai-neural': [
    { type: 'video', title: '3Blue1Brown — Neural networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', note: 'What a neural net actually IS, visually.' },
    { type: 'course', title: 'Karpathy — Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', note: 'Build neural nets from scratch in code, taught by an OpenAI founding member.' },
  ],
  'robo-sensing': [
    { type: 'video', title: 'Paul McWhorter — Arduino tutorials', url: 'https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP', note: 'Hands-on: real sensors and motors on a €30 board. Do this alongside the theory.' },
    { type: 'article', title: 'Arduino documentation', url: 'https://docs.arduino.cc', note: 'Reference for when you start wiring your own.' },
  ],
  'robo-control': [
    { type: 'video', title: 'Brian Douglas — Understanding PID (MATLAB)', url: 'https://www.youtube.com/watch?v=wkfEZmsQqiA', note: 'The classic PID explanation every robotics engineer has watched.' },
    { type: 'video', title: 'Brian Douglas — Control systems channel', url: 'https://www.youtube.com/user/ControlLectures', note: 'A whole free control-theory education, one animation at a time.' },
  ],
  'robo-embedded': [
    { type: 'video', title: 'Ben Eater — 6502 computer (series)', url: 'https://eater.net/6502', note: 'Build and program a real retro computer — embedded systems from first principles.' },
  ],
  'robo-ros': [
    { type: 'course', title: 'ROS 2 official tutorials', url: 'https://docs.ros.org/en/rolling/Tutorials.html', note: 'The standard entry point once you can program.' },
  ],
}

for (const n of nodes) {
  const r = resourcesByNode[n.id]
  if (r) n.resources = r
}

export const nodeById: Map<string, KnowledgeNode> = new Map(nodes.map((n) => [n.id, n]))

/** Domain title blocks rendered on the map above each cluster. */
export const domainLabels: { id: string; title: string; x: number; y: number }[] = [
  { id: 'label-hcw', title: 'How Computers Work', x: 0, y: 0 },
  { id: 'label-prog', title: 'Programming Fundamentals', x: 0, y: 630 },
  { id: 'label-math', title: 'Math for CS & Robotics', x: 0, y: 1060 },
  { id: 'label-phys', title: 'Physics Foundations · coming soon', x: 360, y: -430 },
  { id: 'label-os', title: 'Operating Systems', x: 360, y: 0 },
  { id: 'label-algo', title: 'Algorithms & Data Structures', x: 360, y: 430 },
  { id: 'label-net', title: 'Networks', x: 360, y: 860 },
  { id: 'label-db', title: 'Databases', x: 360, y: 1290 },
  { id: 'label-robo', title: 'Robotics Bridge', x: 720, y: -330 },
  { id: 'label-theory', title: 'Theory of Computation', x: 720, y: 430 },
  { id: 'label-ai', title: 'AI & Machine Learning', x: 720, y: 860 },
  { id: 'label-sec', title: 'Security & Crypto', x: 720, y: 1290 },
]

export const XP_PER_NODE = 100
