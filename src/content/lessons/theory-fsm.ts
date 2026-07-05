import type { Lesson } from '../../types'

export const theoryFsmLesson: Lesson = {
  nodeId: 'theory-fsm',
  screens: [
    {
      kind: 'explain',
      title: 'The smallest possible machine',
      body: [
        'Strip a computer to its bones: a handful of STATES, and rules — “in state X, when event E happens, go to state Y”. Nothing else. No memory, no variables. That’s a finite state machine.',
        'It sounds too simple to matter, and it runs the world: traffic lights, elevators, vending machines, network protocols, text search, and — crucially for you — robot behaviors.',
        'FSMs are also where theory begins: the first rung on the ladder of “what can machines compute?”',
      ],
      links: [{ nodeId: 'math-logic', label: 'Refresher: Logic (the rules are boolean)' }],
    },
    {
      kind: 'predict',
      question: 'An FSM’s ENTIRE knowledge of the past is which state it’s in now. A turnstile FSM (locked/unlocked) has seen 1,000 coins today. What does it remember about them?',
      options: [
        'Nothing except its current state — it can’t count to 1,000, only be locked or unlocked',
        'The exact sequence of all 1,000 coins',
        'The total count, stored internally',
        'The time each coin arrived',
      ],
      correctIndex: 0,
      reveal:
        'A state IS the memory — all of it. Two states can distinguish exactly two histories: “last relevant thing made me locked” vs “…unlocked”. Counting to 1,000 would need 1,001 states. This finite-memory ceiling is precisely what makes FSMs fast, provable and predictable — and what they CAN’T do defines why bigger machines (next lesson) must exist.',
    },
    {
      kind: 'game',
      gameId: 'fsm-lab',
    },
    {
      kind: 'explain',
      title: 'Why engineers love the straitjacket',
      body: [
        'You just drove a robot behavior controller. Notice what could NOT happen: no undefined situation, no “what if avoiding AND docking?”. Every (state, event) pair has exactly one answer, checkable in a table.',
        'That checkability is gold for safety: you can enumerate every state and PROVE “the robot never drives with the charger attached” — try proving that about a pile of if-statements.',
        'The regex you’ll use in any language compiles to an FSM. So does every network protocol’s connection logic (TCP’s open/established/closing states). Small machine, everywhere.',
      ],
      deeper: [
        'The formal power of FSMs is exactly the REGULAR LANGUAGES: patterns like “an even number of 1s” (yes) but NOT “more 0s than 1s” or “balanced parentheses” (no — those need unbounded counting). The pumping lemma proves these impossibilities rigorously; the intuition is the turnstile: finite states can’t count arbitrarily.',
        'Real robot stacks often upgrade to hierarchical state machines or BEHAVIOR TREES (states within states; reusable subtrees) — engineering sugar over the same idea, keeping the enumerate-and-verify property while taming state explosion.',
        'The ignored-event behavior you tested (charged while patrolling → nothing) is a design choice: explicit tables force you to DECIDE every combination. The alternative — scattered if-statements — hides the undecided combinations until 3 AM in the field.',
      ],
      links: [{ nodeId: 'robo-control', label: 'FSM decides WHAT; PID does HOW' }],
    },
    {
      kind: 'quiz',
      question: 'An FSM consists of exactly…',
      options: [
        'A finite set of states plus transition rules (state, event → next state)',
        'States, plus unlimited memory for counting',
        'A CPU and RAM',
        'A list of if-statements executed top to bottom',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: states + table — the whole machine fits on a napkin, which is why it can be verified exhaustively.',
        'Unlimited memory is exactly what an FSM does NOT have — that ceiling defines it.',
        'FSMs are a mathematical model — implementable on a CPU, or in relays, or on paper.',
        'You can IMPLEMENT one with ifs, but the model is the table — and the table forces completeness where scattered ifs don’t.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the lab, firing “charged” while PATROLLING did nothing. Why is that a feature in safety-critical systems?',
      options: [
        'Every (state, event) combination has an explicitly decided outcome — including “ignore” — so no input can cause undefined behavior',
        'It saves battery power',
        'Events are usually errors',
        'It makes the robot faster',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the table has no gaps. Undefined behavior — the “nobody thought of this combination” bug — is structurally impossible.',
        'Negligible energy is involved; PREDICTABILITY is the prize.',
        'Events are normal inputs; ignoring irrelevant ones is policy, not error handling.',
        'Speed is unaffected — certainty is what improves.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why can’t any FSM recognize “this string has balanced parentheses”, like ((())) ?',
      options: [
        'Balance requires counting arbitrarily deep nesting, and finite states can only count to a fixed ceiling',
        'Parentheses aren’t valid input symbols',
        'FSMs can’t read strings',
        'It can, with about 100 states',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: depth 1,000,001 defeats a million-state machine — any finite ceiling has a deeper input. Unbounded counting needs unbounded memory: the next lesson’s machine.',
        'Symbols are arbitrary labels — FSMs read parentheses fine; they just can’t COUNT them.',
        'Reading strings symbol-by-symbol is exactly what FSMs do (it’s how regex works).',
        'Any fixed number of states has a nesting depth it can’t track — that’s the proof’s whole shape.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot needs: “if battery low, finish the CURRENT room (remembering which of 50 rooms), then dock.” A plain FSM handles this how?',
      options: [
        'Awkwardly — “current room” must be baked into the states (50× more states) or held outside the FSM',
        'Perfectly — FSMs have variables for this',
        'It can’t be done by any machine',
        'By adding a second event type',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pure FSMs store nothing but the state id, so data multiplies states (state explosion). Practical systems bolt on variables (extended state machines) or use behavior trees — knowing WHERE the pure model strains is the engineering insight.',
        'Pure FSMs have no variables — the moment you add them you’ve (usefully) left the pure model.',
        'A computer handles it fine — it’s beyond pure-FSM elegance, not beyond computation.',
        'Events don’t add memory; states are the only storage.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Regex search (“find /rob[oa]t/ in this file”) runs blazing fast on gigabytes because…',
      options: [
        'The pattern compiles to an FSM that consumes one character at a time in O(n), no backtracking needed',
        'The file is loaded into the CPU cache whole',
        'Regex engines use neural networks',
        'It rechecks every position from scratch quickly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pattern → FSM, then one linear scan where each character is one table hop — the theory of this lesson powering your grep.',
        'Gigabytes don’t fit in cache — the LINEAR algorithm is the speed.',
        'Pure 1950s automata theory, no learning involved.',
        'From-scratch rechecking is the slow naive method the FSM construction eliminates.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'TCP’s connection handling (CLOSED → SYN-SENT → ESTABLISHED → …) is specified as an FSM so that…',
      options: [
        'Every implementation reacts identically to every packet in every state — interoperability by table',
        'Connections use less bandwidth',
        'The diagram looks good in textbooks',
        'It can avoid using IP',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: billions of devices from thousands of vendors interoperate because the standard is an enumerable table, not prose. Ambiguity would fork the internet.',
        'The FSM governs control logic, not data volume.',
        'It does, but the engineering reason is exhaustive specification.',
        'TCP rides on IP regardless — the FSM is about connection lifecycle.',
      ],
    },
    {
      question: 'Behavior trees improved on flat FSMs for game AI and robots mainly by…',
      options: [
        'Making behaviors hierarchical and reusable, taming the state-explosion of flat tables',
        'Removing the need to define behaviors',
        'Running without a computer',
        'Being impossible to verify',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: subtrees like “navigate-to-X” compose and reuse; a flat FSM would duplicate those states everywhere. Same rigor, better modularity.',
        'Behaviors still must be designed — just organized better.',
        'They’re software like anything else.',
        'They remain analyzable — losing that would defeat the purpose.',
      ],
    },
  ],
}
