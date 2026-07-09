import type { Lesson } from '../../types'

export const algoPathsLesson: Lesson = {
  nodeId: 'algo-paths',
  screens: [
    {
      kind: 'explain',
      title: 'When edges have weights',
      body: [
        'BFS finds the path with the FEWEST edges — perfect when every step costs the same. But real maps have weights: roads have lengths, links have latencies, moves have energy costs. Fewest-hops is no longer cheapest.',
        'DIJKSTRA’S algorithm finds the true shortest (lowest total weight) path from a start to everywhere else. Its engine is one operation — RELAXATION: if going to v via u is cheaper than v’s best known distance, update it.',
        'This is the literal math inside your robot’s route planner and every GPS.',
      ],
      links: [
        { nodeId: 'algo-graphs', label: 'Recap: graphs, BFS & A*' },
        { nodeId: 'ai-search', label: 'A*: Dijkstra with a heuristic' },
      ],
    },
    {
      kind: 'predict',
      question:
        'Dijkstra repeatedly picks the UNVISITED node with the smallest known distance, finalizes it, and relaxes its neighbours. Why is it always safe to finalize the closest unvisited node — never revisit it?',
      options: [
        'With non-negative edges, no later path can arrive cheaper — any detour only ADDS weight, so its current distance is already optimal',
        'Because nodes are finalized in the order they were added to the graph',
        'Because every node has the same distance eventually',
        'It isn’t safe — Dijkstra revisits nodes constantly',
      ],
      correctIndex: 0,
      reveal:
        'The greedy guarantee: if the closest unvisited node is at distance d, any OTHER route to it must pass through a still-unvisited node that is already ≥ d away, then add more non-negative weight — so it can’t beat d. That’s why the closest node is safe to lock in. It also reveals Dijkstra’s one hard requirement: NEGATIVE edges break this argument (a later negative edge could undercut a “finalized” distance), which is why negative weights need a different algorithm (Bellman–Ford).',
    },
    {
      kind: 'explain',
      title: 'Relaxation, on a tiny graph',
      body: [
        'Distances start at ∞ except the source at 0. Repeat: pick the nearest unvisited node u, mark it done, and RELAX each edge (u→v, weight w): if dist[u] + w < dist[v], lower dist[v].',
        'Graph from 0: edges 0→1 (4), 0→2 (1), 2→1 (2), 1→3 (1), 2→3 (5). Pick 0; relax → dist[2]=1, dist[1]=4. Pick 2 (nearest); relax → dist[1]=min(4, 1+2)=3, dist[3]=1+5=6. Pick 1; relax → dist[3]=min(6, 3+1)=4. Final: [0, 3, 1, 4].',
        'Code the relaxation. The load-bearing line is dist[u] + w (the cost SO FAR plus this edge), not w alone.',
      ],
      deeper: [
        'Picking “the nearest unvisited node” fast is what a PRIORITY QUEUE (a heap) is for: it hands you the minimum in O(log n) instead of scanning all nodes. That turns Dijkstra from O(V²) into O((V+E) log V) — the reason heaps and shortest paths are taught together.',
        'A* is Dijkstra plus a HEURISTIC: it prioritizes nodes by dist-so-far PLUS an estimate of distance-to-go, steering the search toward the goal. With an admissible (never-overestimating) heuristic it’s still optimal, but explores far fewer nodes — the exact BFS-vs-A* contrast from the graphs lesson.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Finish Dijkstra’s relaxation: a path to v through u costs dist[u] + w. Fix the comparison and update. Expected shortest distances from node 0: 0 3 1 4.',
      starter: `const adj = { 0: [[1, 4], [2, 1]], 1: [[3, 1]], 2: [[1, 2], [3, 5]], 3: [] }
const N = 4
const dist = [Infinity, Infinity, Infinity, Infinity]
dist[0] = 0
const done = [false, false, false, false]

for (let k = 0; k < N; k++) {
  // pick the nearest unvisited node
  let u = -1, best = Infinity
  for (let v = 0; v < N; v++) if (!done[v] && dist[v] < best) { best = dist[v]; u = v }
  if (u < 0) break
  done[u] = true
  // relax each edge out of u
  for (const [v, w] of adj[u]) {
    if (w < dist[v]) {          // <-- fix: compare the WHOLE path cost dist[u] + w
      dist[v] = w              // <-- and store dist[u] + w
    }
  }
}
print(dist.join(' '))`,
      expected: `0 3 1 4`,
      hint: 'A path to v arrives with cost dist[u] + w, so: if (dist[u] + w < dist[v]) dist[v] = dist[u] + w.',
      success:
        'Relaxation compares the full accumulated cost (dist[u] + w), not just this edge — that’s how distance builds up along a path. Using w alone forgets everything before u, giving nonsense like 0 2 1 1. Wrap a heap around “pick the nearest” and this is production route-finding.',
    },
    {
      kind: 'quiz',
      question: 'What does Dijkstra’s algorithm compute that plain BFS does not?',
      options: [
        'Shortest paths by total EDGE WEIGHT, not just fewest edges — correct when steps have different costs',
        'The path with the fewest turns',
        'All possible paths between two nodes',
        'Nothing different — they are the same algorithm',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: BFS minimizes hop count (equal-weight case); Dijkstra minimizes summed weight, so it handles roads of different lengths or links of different latencies.',
        'Neither optimizes turns — they optimize hops (BFS) or total weight (Dijkstra).',
        'Dijkstra finds the SHORTEST path to each node, not an enumeration of all paths.',
        'They coincide only when all weights are equal; with varied weights Dijkstra is needed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In relaxation, you consider updating dist[v]. What is the correct comparison?',
      options: [
        'If dist[u] + w < dist[v], set dist[v] = dist[u] + w — the accumulated cost to u plus this edge',
        'If w < dist[v], set dist[v] = w — just this edge’s weight',
        'If dist[u] < dist[v], set dist[v] = dist[u]',
        'Always set dist[v] = w regardless',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the cost to reach v THROUGH u is everything spent getting to u (dist[u]) plus the edge w. That running total is the whole point of shortest paths.',
        'Using w alone throws away the cost of reaching u — you’d record edge weights, not path lengths.',
        'This ignores the edge weight entirely; distance must grow by w along the edge.',
        'Overwriting unconditionally would erase a shorter path already found — you update only when cheaper.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does Dijkstra require non-negative edge weights?',
      options: [
        'Its greedy “finalize the closest node” step assumes no later path can be cheaper — a negative edge could undercut a finalized distance, breaking that assumption',
        'Negative numbers can’t be stored in a computer',
        'Because heaps only hold positive numbers',
        'It doesn’t — Dijkstra works fine with negative weights',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: finalizing the nearest node is only safe if detours can’t reduce distance; a negative edge later on could, so you’d need Bellman–Ford instead.',
        'Computers store negative numbers fine — the issue is the algorithm’s correctness argument.',
        'Heaps order any comparable numbers, negatives included — that’s not the constraint.',
        'Negative weights genuinely break Dijkstra’s greedy guarantee; that’s a real limitation.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Wrapping a priority queue (heap) around “pick the nearest unvisited node” changes Dijkstra’s complexity how?',
      options: [
        'From O(V²) (scan all nodes each step) to about O((V + E) log V) — the heap returns the minimum in O(log V)',
        'It makes no difference to the complexity',
        'It makes it O(V²·E), which is slower',
        'It removes the need to relax edges',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: scanning for the minimum is the bottleneck; a heap gives it in log time, so on sparse graphs Dijkstra becomes near-linearithmic.',
        'The data structure for “find the minimum” directly sets the cost — it matters a lot.',
        'A heap speeds selection up, not down — the complexity improves on sparse graphs.',
        'Relaxation still happens for every edge; the heap only accelerates node selection.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A* prioritizes nodes by dist-so-far + heuristic-to-go, while Dijkstra uses only dist-so-far. What must the heuristic satisfy to keep A* optimal?',
      options: [
        'It must be admissible — never OVERESTIMATE the true remaining distance; then A* explores fewer nodes yet still finds the shortest path',
        'It must exactly equal the remaining distance, always',
        'It must overestimate to be safe',
        'Any heuristic keeps A* optimal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an admissible (optimistic) heuristic never claims a path is longer than it is, so A* can’t be fooled into skipping the true shortest route — and the guidance prunes the search.',
        'Exact remaining distance is ideal but usually uncomputable; admissibility (never over) is the achievable requirement.',
        'Overestimating breaks optimality — A* may commit to a route that isn’t shortest.',
        'Only admissible heuristics preserve optimality; an overestimating one does not.',
      ],
    },
    {
      question: 'Dijkstra finalizes node A at distance 7. Later it processes node B (distance 9) which has an edge of weight 1 back to A. Is A’s distance updated?',
      options: [
        'No — a path through B costs 9 + 1 = 10 > 7, so relaxation makes no change; finalized nodes stay put with non-negative edges',
        'Yes — any new edge to A always updates it',
        'Yes — A becomes 10',
        'A is deleted from the graph',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: relaxation only lowers a distance when the new path is cheaper. 10 > 7, so nothing changes — and this is exactly why finalizing A was safe.',
        'Relaxation updates only when strictly cheaper, not on every edge encountered.',
        '10 is worse than 7, so A keeps its shorter distance.',
        'Nodes aren’t removed; they’re marked done and their optimal distance stands.',
      ],
    },
    {
      question: 'Your delivery robot must find the lowest-ENERGY route across a warehouse where some segments cost energy and downhill ramps RECOVER energy (negative cost). Which algorithm fits?',
      options: [
        'Bellman–Ford — it handles negative edge weights, which break Dijkstra’s greedy assumption',
        'Dijkstra — it always works regardless of weights',
        'BFS — negative weights are just fewest-hops',
        'No algorithm can handle this',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: negative edges (energy recovery) invalidate Dijkstra’s finalize-the-closest step; Bellman–Ford relaxes all edges repeatedly and copes with negatives (and can even detect negative cycles).',
        'Dijkstra can give wrong answers with negative edges — that’s its key limitation.',
        'BFS ignores weights entirely, so it can’t minimize energy with varied costs.',
        'Bellman–Ford solves exactly this, as long as there’s no negative cycle to exploit forever.',
      ],
    },
  ],
}
