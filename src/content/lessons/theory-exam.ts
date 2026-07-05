import type { Lesson } from '../../types'

export const theoryExamLesson: Lesson = {
  nodeId: 'theory-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — map the limits of machines',
      body: [
        'Ten questions across the three fences — finite states, computability, complexity — all NEW, no repeats from the lesson quizzes. No notes: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which fence you tripped on, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A delivery drone runs this FSM — states GROUNDED, HOVERING, CRUISING. Rules: GROUNDED+takeoff→HOVERING, HOVERING+advance→CRUISING, CRUISING+slow→HOVERING, HOVERING+land→GROUNDED; every other (state, event) pair is ignored. Starting GROUNDED, the events arrive: takeoff, advance, land, slow, slow. Final state?',
      options: ['HOVERING', 'GROUNDED', 'CRUISING', 'Undefined — “land” while CRUISING is an error'],
      correctIndex: 0,
      explanations: [
        'Correct: GROUNDED→HOVERING→CRUISING, then “land” is ignored (only defined in HOVERING), “slow” drops to HOVERING, and the last “slow” is ignored there. HOVERING it is.',
        'GROUNDED means you let “land” fire from CRUISING — but the table only defines land in HOVERING. Ignored means the state doesn’t move.',
        'CRUISING means you froze the trace at the ignored event — but ignoring an event doesn’t stop the machine. The next event, “slow”, still fires and drops it to HOVERING.',
        'There IS no undefined — “ignore” is a decided outcome, which is the whole safety point of the table. The machine shrugs and keeps running.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A behavior controller has 12 states. At any moment, how many different summaries of its ENTIRE input history can it possibly be holding?',
      options: ['12', '2¹² = 4096', 'Unlimited — it remembers everything', '144'],
      correctIndex: 0,
      explanations: [
        'Correct: the current state IS the memory, all of it — and the machine sits in exactly ONE of the 12. Every history that led to the same state is indistinguishable from then on.',
        '2¹² would be right for 12 BITS, which combine — but states don’t combine, they exclude. One machine, one state at a time.',
        'Unlimited memory is exactly what an FSM doesn’t have — that finite ceiling is its definition, and its superpower for verification.',
        '144 = 12² counts state PAIRS or transitions — but memory is the single current state, nothing more.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which of these jobs can a plain FSM actually do?',
      options: [
        'Flag whenever the last three commands received were exactly L, L, R',
        'Flag whenever the robot has made more left turns than right turns overall',
        'Flag whether nested begin/end blocks in a mission script are balanced',
        'Count exactly how many packages it has ever delivered, for any number',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a FIXED pattern needs only a handful of states tracking “how much of L,L,R have I just seen” — this is precisely what regex-style matching compiles to.',
        'More-lefts-than-rights means comparing two unbounded counts — a million-state machine loses at a million and one turns. Finite states can’t track an unbounded difference.',
        'Balanced nesting is the classic FSM-killer: depth can exceed any fixed number of states. That job needs unbounded memory — a tape.',
        '“For any number” is the giveaway — counting without a ceiling needs a state per count, and an FSM only has finitely many.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A safety watchdog must cut motor power after exactly 5 consecutive missed heartbeats (any received heartbeat resets the count). Can a plain FSM implement this?',
      options: [
        'Yes — 5 is a fixed bound, so a state per missed-count (missed-0 … missed-5) does it in a handful of states',
        'No — FSMs have no memory, so they can’t count at all',
        'No — any counting requires a Turing machine’s tape',
        'Yes, but only by bolting on a separate counter variable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: FSMs count fine up to any FIXED ceiling — states ARE the memory. The impossibility only bites when the count must be unbounded. Watchdogs are FSM home turf.',
        'States are memory — a 6-state chain remembers “how many missed in a row, up to 5” perfectly. The no-memory claim overshoots the theorem.',
        'The tape is needed for UNBOUNDED counting. Bounded counting is exactly what finite states are for — don’t pay for a bigger machine than the job needs.',
        'A counter variable would make it an extended state machine — legal engineering, but unnecessary here: the fixed bound fits in pure states, keeping the enumerate-and-prove property.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A teammate pitches an app-store review tool: “for EVERY submitted app, it certifies whether the app will ever hang forever.” Your verdict?',
      options: [
        'Impossible as specified — that’s the halting problem; the buildable version answers “hangs / fine / can’t tell”',
        'Feasible — an app is a finite file, so just analyze all the code',
        'Feasible if the store caps submissions at 10,000 lines',
        'Impossible even to detect SOME hangs, so don’t bother',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a universal hang-certifier is exactly Turing’s H — no algorithm can be right for ALL programs. Tools with an honest “can’t tell” bucket (or a timeout) are the mathematically legal product.',
        'Finite source, unbounded behavior — a five-line loop can run forever, and reading the code doesn’t simulate every future. Finiteness of the FILE isn’t the barrier the proof cares about.',
        'Size isn’t the boundary — tiny programs can be undecidable and huge ones provable. The impossibility hangs on the word EVERY, not on line count.',
        'Detecting many hangs is easy and valuable (your code runner’s 2s timeout catches every one that trips it) — only the universal, always-correct claim is impossible.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Could a future quantum computer decide the halting problem?',
      options: [
        'No — the proof is a logical contradiction, not a speed limit; any algorithmic device hits the same wall',
        'Yes — quantum computers are more powerful than Turing machines',
        'Yes — halting is just extremely slow to decide, and quantum speedup covers it',
        'Yes — the Church-Turing thesis only applies to 1930s-style machines',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the self-reference trap springs on ANY claimed decider — build the program that asks it about itself and does the opposite. Qubits change speed, never the contradiction.',
        'For computability, quantum machines are exactly Turing-equivalent — they can be simulated by a tape machine (slowly). They speed up SOME problems; they unlock zero new ones.',
        'Halting isn’t slow to decide — it’s not decidable at all. No amount of speedup helps a program that cannot exist.',
        'The thesis is about all mechanical procedures, and 90 years of rival models — lambda calculus, your CPU, quantum circuits — have all landed exactly equal. That convergence is the evidence.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which of these questions about programs IS computable?',
      options: [
        'Whether a given program halts within one billion steps',
        'Whether a given program halts, ever',
        'Whether a given program ever prints the word ERROR',
        'Whether two given programs produce identical output on every input',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: bounded questions are decidable — run it for a billion steps and watch. It either stopped or it didn’t; no prophecy required. That’s why timeouts are the honest engineering move.',
        '“Ever” is the trap — with no bound you can’t distinguish “about to finish” from “never will”. That’s the halting problem itself.',
        'Feels easier than halting, but Rice’s theorem says essentially ANY question about what a program will eventually do is undecidable in general — “prints ERROR” included.',
        'Program equivalence is undecidable too — if you could decide it, you could decide halting (compare the program against one that plainly loops forever).',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Warehouse puzzle: pack 40 delivery crates into 3 vans. Given a PROPOSED packing, checking it fits takes moments; nobody knows a fast way to FIND one. Which class does this land the problem in?',
      options: [
        'NP — a solution is verifiable in polynomial time, even if finding one may take exponential search',
        'P — if checking is fast, solving must be fast too',
        'Uncomputable — no machine can pack the vans',
        'Not NP — NP means “not polynomial”, and the check is polynomial',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: cheap-to-check is NP’s membership card — the find/check gap is the whole story. Bin packing is a card-carrying member.',
        'That’s exactly the P vs NP question — and it’s open! Fast checking is NOT known to imply fast solving; near-universal belief says it doesn’t.',
        'A brute-force machine packs the vans fine — eventually. This is a TIME wall (complexity), not Turing’s possibility wall.',
        'NP stands for NONDETERMINISTIC polynomial — the most misread acronym in CS. Fast verification is what puts you IN, not out.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your fleet-routing problem turns out to be NP-complete. What does that actually guarantee?',
      options: [
        'No polynomial algorithm is KNOWN — and finding one would crack every NP problem at once — but impossibility is unproven',
        'It is mathematically proven that no fast algorithm can ever exist',
        'The problem is uncomputable, like the halting problem',
        'It cannot be solved at all beyond about 100 robots',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: NP-complete means “hardest of NP, all reducible to each other” — one fast algorithm topples them all, which is exactly why nobody believes one exists. Believed ≠ proven; the $1,000,000 is still on the table.',
        'Overstated — that proof would settle P ≠ NP, the biggest open question in the field. NP-complete is a strong warning label, not an impossibility theorem.',
        'Wrong wall — NP-complete problems are perfectly computable, just (apparently) slow to solve exactly. Turing’s wall is about CAN, complexity’s is about WHEN.',
        'Exact optimal answers get brutal at scale, but solvers, approximation and heuristics routinely handle hundreds of robots — NP-complete means “stop expecting perfect-and-fast”, not “stop”.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Sorting a list has a fast (polynomial) algorithm, so it’s in P. Is sorting also in NP?',
      options: [
        'Yes — anything you can solve fast you can check fast, so P sits entirely inside NP',
        'No — NP contains only the hard problems',
        'No — a problem must be either P or NP, never both',
        'Only for lists above a certain size',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: P ⊆ NP — solve it fast and you’ve verified it fast for free. NP is the umbrella; the famous question is whether anything in the umbrella is truly outside P.',
        'NP is “fast to CHECK”, and easy problems check easiest of all — the hard ones (NP-complete) are just NP’s upper floor, not the whole building.',
        'The classes nest, they don’t partition — every P problem is automatically an NP problem. “P vs NP” asks if the nesting is actually equality.',
        'Class membership is about how cost GROWS with size, not about any particular size — sorting is in P (and NP) at every n.',
      ],
    },
  ],
}
