import type { Lesson } from '../../types'

export const algoGraphsLesson: Lesson = {
  nodeId: 'algo-graphs',
  screens: [
    {
      kind: 'explain',
      title: 'Dots and connections',
      body: [
        'A graph is just dots (nodes) and connections (edges) — and it’s the most reusable model in computing: road maps, social networks, the internet, this skill tree you’re looking at.',
        'For a robot, the killer app: chop the floor into grid cells (nodes), connect neighboring cells (edges), and “drive to the charger” becomes “find a path in a graph”.',
        'Once a problem is a graph, decades of ready-made algorithms apply. Let’s meet the big three.',
      ],
      links: [{ nodeId: 'algo-structures', label: 'Refresher: stacks, queues & maps' }],
    },
    {
      kind: 'predict',
      question: 'BFS explores a maze level by level: all cells 1 step away, then 2, then 3… When it first touches the goal, what do you know for sure?',
      options: [
        'The route it took is a shortest one — nothing reaches the goal in fewer steps',
        'It explored the fewest possible cells',
        'The goal is reachable, but the route may be far from shortest',
        'Nothing — BFS gives no guarantees',
      ],
      correctIndex: 0,
      reveal:
        'Because BFS finishes ALL distance-k cells before touching any distance-k+1 cell, the first arrival at the goal must use the minimum number of steps — a mathematical guarantee, not luck. The price: it explores in every direction equally, including straight away from the goal. Optimal path, wasteful search.',
    },
    {
      kind: 'explain',
      title: 'BFS → Dijkstra → A*',
      body: [
        'BFS assumes every step costs the same. DIJKSTRA generalizes: edges get weights (carpet is slow, gravel is slower), and it always expands the cheapest-so-far node — shortest path by total COST.',
        'A* adds one idea: a HEURISTIC, an estimate of remaining distance to the goal. It expands the node with the best (cost-so-far + estimated-remaining) — search with a compass.',
        'If the heuristic never overestimates (straight-line distance can’t), A* keeps the shortest-path guarantee while exploring far less. See it yourself.',
      ],
      deeper: [
        'Why must the heuristic never OVERestimate (be “admissible”)? If it exaggerated remaining distance, A* might shelve the truly best route as “probably expensive” and commit to a worse one. Underestimating only costs extra exploration; overestimating costs correctness.',
        'Set the heuristic to zero and A* IS Dijkstra; set edge costs all equal and Dijkstra behaves like BFS. One family: each adds one piece of knowledge — costs, then direction.',
        'Real robots run this on an occupancy grid from their sensors, replanning several times a second as obstacles appear. That’s why the explored-cell count you’ll see matters: it’s the difference between replanning in 5 ms and 500 ms.',
      ],
      links: [{ nodeId: 'robo-sensing', label: 'Where the map comes from: Sensors' }],
    },
    {
      kind: 'game',
      gameId: 'pathfinder-sim',
    },
    {
      kind: 'quiz',
      question: 'Why is BFS guaranteed to find a shortest path (in an unweighted maze)?',
      options: [
        'It explores strictly by distance: all k-step cells before any (k+1)-step cell, so the first arrival is optimal',
        'It checks literally every possible path and picks the best',
        'It always moves toward the goal',
        'It isn’t guaranteed — it’s just usually right',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: level-by-level order makes an earlier arrival by a longer route impossible — the queue enforces it.',
        'It never enumerates whole paths (there can be astronomically many) — it visits each CELL once, which is the efficiency trick.',
        'BFS has no sense of direction at all — it floods outward equally, even away from the goal. That’s A*’s upgrade.',
        'It IS a hard guarantee — one of the cleanest theorems in algorithms.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does Dijkstra handle that plain BFS can’t?',
      options: [
        'Edges with different costs — slow carpet vs fast corridor',
        'Larger maps',
        'Graphs with cycles',
        'Moving obstacles',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: BFS counts steps; Dijkstra sums WEIGHTS and expands cheapest-total-first, so a longer-but-faster route wins when it should.',
        'Both scale to big maps; size isn’t the distinction — edge costs are.',
        'BFS handles cycles fine (visited-set prevents loops) — cycles aren’t the issue.',
        'Neither handles motion by itself — you replan when the map changes (which is why search speed matters).',
      ],
    },
    {
      kind: 'quiz',
      question: 'A* explored far fewer cells than BFS in the sim but found an equally short path. What made that legal?',
      options: [
        'Its heuristic never overestimates remaining distance, so it can skip provably-unpromising cells without losing the guarantee',
        'A* is simply luckier on most maps',
        'A* accepts slightly longer paths in exchange for speed',
        'A* pre-computes all paths offline',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with an admissible heuristic (straight-line distance can’t overestimate), the math guarantees the first arrival is still optimal — direction without deception.',
        'No luck involved: same guarantee as BFS, proven, on every map.',
        'That trade exists (weighted A*, greedy search) but standard admissible A* concedes NOTHING on path length.',
        'It searches live, from scratch — that’s exactly why its small explored set matters for replanning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which heuristic would BREAK A*’s shortest-path guarantee on a grid?',
      options: [
        'Straight-line distance × 3 — it can overestimate the true remaining cost',
        'Straight-line distance to the goal',
        'Always zero',
        'Manhattan distance (grid steps, no diagonals)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: tripling can claim a cell is “farther than it truly is”, making A* discard the genuinely best route — overestimation kills admissibility.',
        'Straight-line can never exceed the real travel distance (no path is shorter than the crow flies) — admissible, safe.',
        'Zero never overestimates — A* just degrades gracefully into Dijkstra: slower, still correct.',
        'On a 4-direction grid, Manhattan distance is exact-or-under — the classic admissible choice.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your vacuum robot replans 5× per second on a growing map. Which change helps MOST, per this lesson?',
      options: [
        'Guide the search with an admissible heuristic (A*) so each replan touches far fewer cells',
        'Switch from a queue to a stack for exploration',
        'Explore the whole map every time to be safe',
        'Raise path length tolerance so any route is accepted',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same optimal path, fraction of the work — you watched explored-cell counts collapse. Search less, not worse.',
        'Stack = depth-first: loses the shortest-path guarantee AND doesn’t reduce work — worst of both.',
        'Full-map floods are exactly the waste A* eliminates; “safe” here just means slow.',
        'Accepting bad paths costs battery and time forever after — fix the search, not the standard.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'This app’s skill tree is a graph. The rule “a node unlocks when its prereqs are mastered” treats edges as…',
      options: [
        'Dependencies — directed edges meaning “must come before”',
        'Physical distances between topics',
        'Random decorations',
        'Costs in euros',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a directed edge prereq → node encodes ordering. (Fun fact: a valid learning order = topological sort of this graph.)',
        'No geometry here — the x/y positions are hand-drawn for the map; the MEANING is in the arrows.',
        'Every edge is load-bearing: remove one and something unlocks too early.',
        'No weights needed — pure “before/after” structure.',
      ],
    },
    {
      question: 'Why does A* with heuristic = 0 behave exactly like Dijkstra?',
      options: [
        'Its priority becomes cost-so-far + 0 — precisely Dijkstra’s cheapest-first rule',
        'It crashes without a heuristic',
        'It switches to depth-first exploration',
        'It explores randomly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the compass goes silent and only accumulated cost steers — Dijkstra IS A* minus the guess.',
        'Zero is a perfectly valid (if useless) heuristic — everything still works, just slower.',
        'The priority queue still governs order — nothing becomes stack-like.',
        'It stays fully deterministic: cheapest-first, ties broken by rule.',
      ],
    },
  ],
}
