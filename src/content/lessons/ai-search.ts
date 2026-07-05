import type { Lesson } from '../../types'

export const aiSearchLesson: Lesson = {
  nodeId: 'ai-search',
  screens: [
    {
      kind: 'explain',
      title: '“What should I do?” is a graph',
      body: [
        'You used A* to find paths through PHYSICAL space. Here’s the leap that founded AI: do the same through POSSIBILITY space.',
        'Make each situation a node — the robot’s position AND the world’s state — and each action an edge to a new situation. “What should I do?” becomes “find a path from here to a goal state”.',
        'A chess engine, a puzzle solver and a warehouse robot planning its shift are all running graph search on futures.',
      ],
      links: [{ nodeId: 'algo-graphs', label: 'Refresher: Graphs & Pathfinding (A*)' }],
    },
    {
      kind: 'predict',
      question: 'A robot arm must move 3 blocks into a target stack. Roughly how big is its “possibility graph” compared to its physical workspace?',
      options: [
        'Vastly bigger — every ARRANGEMENT of blocks is its own node, and arrangements multiply explosively',
        'The same size — it’s the same room',
        'Smaller — blocks limit where the arm can go',
        'Exactly 3× bigger, one layer per block',
      ],
      correctIndex: 0,
      reveal:
        'State space ≠ floor space. A node here is a full snapshot: block A on B, B on the table, gripper empty… With just a few blocks that’s dozens of states; with 10 blocks, millions. This COMBINATORIAL EXPLOSION is the defining enemy of planning — and why blind search dies fast and heuristics become oxygen.',
    },
    {
      kind: 'explain',
      title: 'Heuristics: search with a sense of smell',
      body: [
        'Blind BFS through a state space drowns — too many futures. A* saves the day again, if you can ESTIMATE “how far from the goal is this state?”.',
        'For the block stack: count the blocks not yet in position — never overestimates, so A* stays optimal. Good heuristics come from SIMPLIFYING the problem (ignore obstacles, ignore order).',
        'This is planning: search + a relaxed-problem heuristic. It’s how logistics robots sequence a warehouse shift.',
      ],
      deeper: [
        'Why does simplifying give a legal heuristic? A relaxed problem (rules removed) can only be EASIER, so its exact cost is a guaranteed underestimate of the real cost — admissible by construction. “Straight-line distance” is exactly this: pathfinding with the walls deleted.',
        'When the world fights back (an opponent in chess), search alternates “my best move” and “their best response” — minimax. Same tree, adversarial layers; pruning (alpha-beta) skips branches that provably can’t matter.',
        'Real robot stacks split planning in two: a task planner searches the symbolic state space (“fetch, then charge”), and your A* path planner executes each step in physical space. Two searches, two abstraction levels, one mission.',
      ],
    },
    {
      kind: 'predict',
      question: 'Your delivery robot plans 10 stops. Checking all orders one-by-one is 10! ≈ 3.6 million routes — fine. At 20 stops it’s 20! ≈ 2 × 10¹⁸. What’s the practical response?',
      options: [
        'Give up on perfect: use heuristics/approximations that find a very good route fast',
        'Buy a computer a million times faster',
        'Refuse jobs with more than 10 stops',
        'Check routes in a random order until one looks nice',
      ],
      correctIndex: 0,
      reveal:
        'A million-times-faster machine still needs ~2 × 10¹² seconds — 60,000 years. Exponential walls don’t fall to hardware (that’s your Big-O lesson at full violence). Real systems trade guaranteed-optimal for provably-good: greedy + smart improvement gets within a few percent in milliseconds. Knowing WHEN to make that trade is the engineering skill.',
    },
    {
      kind: 'quiz',
      question: 'In AI search, a “state” is…',
      options: [
        'A complete snapshot of the situation — everything relevant, not just the robot’s position',
        'The robot’s x,y position only',
        'One single action',
        'The final goal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: position + held objects + world arrangement — whatever tomorrow’s decisions depend on belongs in the node.',
        'Position alone works for pure pathfinding; planning needs the rest of the world in the snapshot too.',
        'Actions are the EDGES between states, not the states.',
        'The goal is one special state you’re searching FOR — the space contains all the others too.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does the “count misplaced blocks” heuristic keep A* optimal for the stacking robot?',
      options: [
        'Every misplaced block needs ≥1 move, so the count never overestimates the true remaining cost',
        'Because counting is fast to compute',
        'It exactly equals the remaining cost',
        'Optimality doesn’t depend on the heuristic',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s a guaranteed underestimate (admissible) — the same rule that made straight-line distance legal for pathfinding.',
        'Speed makes it PRACTICAL; never-overestimating is what makes it CORRECT.',
        'It usually underestimates (a buried block can take several moves) — that’s allowed and expected.',
        'It does: an OVERestimating heuristic can make A* commit to a worse plan — admissibility is the whole guarantee.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The combinatorial explosion means…',
      options: [
        'State counts grow multiplicatively with problem size, dwarfing any hardware speedup',
        'Robots physically explode under load',
        'Graphs cannot contain cycles',
        'Search always fails beyond 10 items',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each added block/stop/piece MULTIPLIES the possibilities (10! → 20! is a trillion-fold jump). Exponential growth eats constant-factor speedups for breakfast.',
        'Only metaphorically — the explosion is in the size of possibility space.',
        'Cycles are fine (visited-sets handle them); the issue is sheer state count.',
        'No hard cliff at any number — heuristics and approximations push the practical frontier out; blind search just falls behind exponentially.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A relaxed problem (some rules deleted) is the standard SOURCE of heuristics because…',
      options: [
        'Its exact solution cost is guaranteed ≤ the real cost — admissible by construction',
        'It is always harder than the real problem',
        'It changes the goal to something easier',
        'It eliminates the need for search entirely',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: removing constraints can only shorten solutions, so the relaxed cost is a legal underestimate. Delete walls → straight-line distance; ignore stacking order → misplaced-count.',
        'Backwards — relaxation makes it EASIER, which is precisely why its cost underestimates.',
        'Same goal, fewer rules — that’s what keeps the estimate connected to the real problem.',
        'You still search the real problem; the relaxed one just supplies the compass.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Chess search differs from route search because…',
      options: [
        'An opponent picks every other move, so you plan against their BEST reply (minimax)',
        'Chess boards are bigger than warehouses',
        'Route search has no goal state',
        'Chess uses no graph at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: alternating layers of “my choice / their best counter” — you optimize the worst case, not the happy path.',
        'Size isn’t the difference (warehouse state spaces are enormous too) — the ADVERSARY is.',
        'Route search has clear goals; that’s not the distinction.',
        'Chess is a giant graph of positions — the founding example of state-space search, in fact.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Your vacuum robot’s “possibility graph” for cleaning includes dirt locations and its battery level. Why include battery?',
      options: [
        'Future options depend on it — a plan that strands the robot at 0% far from the dock is invalid',
        'Batteries make the graph smaller',
        'It’s decoration; position is all that matters',
        'Only the manufacturer needs it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the rule for state design — include everything tomorrow’s choices depend on. Same room + 5% battery is a genuinely different situation than same room + 90%.',
        'Extra dimensions make the space BIGGER — you pay that cost because plans are otherwise wrong.',
        'A position-only planner happily plans routes the battery can’t finish.',
        'The robot’s own planner needs it every tick — that’s the point.',
      ],
    },
    {
      question: 'Alpha-beta pruning speeds up minimax by…',
      options: [
        'Skipping branches that provably cannot change the final decision',
        'Randomly ignoring half the moves',
        'Looking only one move ahead',
        'Making the opponent play badly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: once a branch is already worse than a known alternative, exploring it further can’t matter — cut it. Same answer, fraction of the work (A*’s spirit, adversarial edition).',
        'Nothing random — every skipped branch is skipped by proof.',
        'Depth stays; the width is what gets trimmed.',
        'It assumes the opponent plays BEST — pruning only which futures need examining.',
      ],
    },
  ],
}
