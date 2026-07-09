import type { Lesson } from '../../types'

export const algoDpLesson: Lesson = {
  nodeId: 'algo-dp',
  screens: [
    {
      kind: 'explain',
      title: 'Stop recomputing the same thing',
      body: [
        'Some problems break into smaller versions of THEMSELVES that OVERLAP — the same sub-question gets asked again and again. Naive recursion re-solves each one from scratch, and the work explodes exponentially.',
        'DYNAMIC PROGRAMMING is the fix: solve each subproblem ONCE, store the answer, and reuse it. Two ingredients make a problem DP-able — overlapping subproblems (reuse pays off) and optimal substructure (the best overall answer is built from best sub-answers).',
        'It turns intractable exponential blow-ups into fast linear passes — the technique behind route optimizers, diff tools and sequence alignment.',
      ],
      links: [
        { nodeId: 'algo-sorting', label: 'Divide-and-conquer: split without overlap' },
        { nodeId: 'prog-data-2', label: 'Recursion: the thing DP makes efficient' },
      ],
    },
    {
      kind: 'predict',
      question:
        'To climb n stairs you take 1 or 2 steps at a time; ways(n) = ways(n−1) + ways(n−2). Computed by naive recursion, ways(n−1) and ways(n−2) each recompute smaller values independently. How does the work grow with n?',
      options: [
        'Exponentially — the call tree branches and re-solves the same ways(k) enormously many times',
        'Linearly — each value is computed once',
        'It stays constant regardless of n',
        'Logarithmically — the problem halves each step',
      ],
      correctIndex: 0,
      reveal:
        'The naive tree for ways(n) computes ways(n−2) inside BOTH ways(n−1) and ways(n−2), and that duplication compounds all the way down — the number of calls grows like the Fibonacci numbers themselves, ~1.6ⁿ. ways(50) would take billions of calls. But there are only n DISTINCT subproblems (ways(1)…ways(n)). Compute each once, store it, and the cost collapses to O(n). Same recurrence, exponential vs linear — that gap IS dynamic programming.',
    },
    {
      kind: 'explain',
      title: 'Build a table from the bottom up',
      body: [
        'TABULATION solves DP by filling an array from the smallest subproblems upward, so every value it needs is already computed. For the stairs: dp[1] = 1, dp[2] = 2, and each dp[i] = dp[i−1] + dp[i−2].',
        'Fill upward: dp = 1, 2, 3, 5, 8 for n = 1..5. ways(5) = 8, in five additions instead of a branching tree of dozens of calls.',
        'Code the recurrence. The load-bearing line adds the TWO previous subproblems — miss one and the table is wrong from that cell on.',
      ],
      deeper: [
        'The other style is MEMOIZATION: keep the natural recursion but cache each result in a lookup the first time it’s computed; later calls return instantly. Same O(n) work — top-down (memoized recursion) vs bottom-up (tabulation) are two roads to the same table.',
        'Because dp[i] only needs the previous two values, you can throw away the rest and keep just two variables — O(1) memory. Many DPs shrink their table this way once you see which cells are actually still needed.',
        'This stairs recurrence IS the Fibonacci sequence. The leap from the exponential naive version to the linear DP version is the single clearest picture of what DP buys you.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Fill the DP table bottom-up: each dp[i] is the sum of the two previous subproblems. Fix the recurrence. Expected: n=5 ways 8 and n=10 ways 89.',
      starter: `function ways(n) {
  const dp = [0, 1, 2]          // dp[1]=1 way, dp[2]=2 ways
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1]           // <-- fix: also add dp[i - 2]
  }
  return dp[n]
}
print('n=5 ways', ways(5))
print('n=10 ways', ways(10))`,
      expected: `n=5 ways 8
n=10 ways 89`,
      hint: 'Each step you could have arrived from one stair below OR two below: dp[i] = dp[i - 1] + dp[i - 2].',
      success:
        'Each cell reuses the two already-solved cells below it — O(n) additions replace an exponential call tree. Drop the “+ dp[i − 2]” and dp just copies dp[2] forever (every answer becomes 2): the recurrence must combine BOTH sub-answers. That reuse is the whole idea of DP.',
    },
    {
      kind: 'quiz',
      question: 'What two properties must a problem have for dynamic programming to help?',
      options: [
        'Overlapping subproblems (the same sub-answers recur) and optimal substructure (the best answer is built from best sub-answers)',
        'Random input and a sorted array',
        'A single base case and no recursion',
        'Negative edge weights and a heap',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: overlap makes caching pay off, and optimal substructure means combining optimal sub-answers gives the optimal whole. Both are needed.',
        'Neither randomness nor sortedness is what DP requires — it’s about subproblem structure.',
        'DP is precisely about recursion with reused subproblems, not the absence of recursion.',
        'Those are shortest-path ingredients, not the defining properties of a DP problem.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Naive recursive Fibonacci/stairs is exponential, but the DP version is O(n). Where did the savings come from?',
      options: [
        'There are only n distinct subproblems; storing each result once eliminates the massive re-computation of the naive call tree',
        'DP uses a faster kind of addition',
        'DP avoids the base cases',
        'Recursion was replaced by sorting',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the exponential cost was all duplication; with only n unique values, computing each once (and reusing) is linear.',
        'The arithmetic is identical — what changed is how MANY times it runs.',
        'Base cases are still needed (dp[1], dp[2]); they seed the table.',
        'No sorting is involved — the fix is caching subproblem results.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does dynamic programming differ from plain divide-and-conquer (like merge sort)?',
      options: [
        'DP’s subproblems OVERLAP, so results are stored and reused; divide-and-conquer splits into INDEPENDENT subproblems that don’t recur',
        'They are the same technique',
        'DP never uses recursion; divide-and-conquer always does',
        'Divide-and-conquer stores a table; DP never does',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: merge sort’s halves never share sub-work, so there’s nothing to cache; DP exists precisely because its subproblems repeat.',
        'They’re related but distinct — the presence of overlap is the dividing line.',
        'DP can be written recursively (memoization) or iteratively; the distinction is overlap, not recursion.',
        'It’s the reverse: DP stores the table of reused answers; divide-and-conquer doesn’t need to.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The stairs DP only ever reads dp[i−1] and dp[i−2]. What optimization does that permit?',
      options: [
        'Keep just the last two values in two variables — O(1) memory instead of an O(n) array',
        'Skip the base cases entirely',
        'Sort the array first for speed',
        'Nothing — you must always keep the full table',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: since older cells are never revisited, two rolling variables suffice — a common DP space optimization.',
        'The base cases seed the two variables; you still need them.',
        'There’s nothing to sort — it’s a linear recurrence.',
        'You only need the full table if later steps read arbitrary earlier cells; here they don’t.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Memoization (top-down) and tabulation (bottom-up) both make the stairs problem O(n). How do they differ?',
      options: [
        'Memoization keeps the natural recursion and caches results on first computation; tabulation fills a table iteratively from the smallest cases up',
        'Memoization is exponential; only tabulation is linear',
        'They produce different answers',
        'Tabulation uses recursion; memoization never does',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same subproblems, same O(n) — one caches lazily during recursion, the other builds the table eagerly. Choose by which is clearer for the problem.',
        'Memoization is also O(n) — caching removes the exponential duplication just as tabulation does.',
        'Both compute the identical values; they only differ in evaluation order.',
        'It’s the reverse: memoization decorates recursion; tabulation is the iterative one.',
      ],
    },
    {
      question: 'Minimum coins to make amount A from denominations is a classic DP: dp[a] = 1 + min over coins c of dp[a − c]. Why is DP the right tool here?',
      options: [
        'The best way to make A reuses the best ways to make smaller amounts (optimal substructure), and those overlap heavily across coins',
        'Because coins must be sorted first',
        'Because there are no subproblems',
        'Because greedy always gives the optimum for any coin system',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dp[a−c] is asked repeatedly across different a and c, and the optimum for A is built from optima of smaller amounts — textbook DP.',
        'Sorting isn’t required; the DP fills amounts from 0 up regardless of coin order.',
        'It is ALL subproblems (dp[0..A]) — that’s why DP applies.',
        'Greedy fails for some coin systems (e.g. coins 1, 3, 4 making 6) — DP is needed for the true minimum.',
      ],
    },
    {
      question: 'Edit distance (min single-character edits to turn one string into another) is solved with a 2D DP table. What are its subproblems?',
      options: [
        'Edit distances between PREFIXES of the two strings — each cell reuses the three neighbouring smaller prefixes',
        'The lengths of the two strings only',
        'Whether the strings are already sorted',
        'The number of distinct characters',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dp[i][j] is the distance between the first i and first j characters, built from dp[i−1][j], dp[i][j−1] and dp[i−1][j−1] — overlapping prefix subproblems.',
        'Lengths bound the table size but aren’t the subproblems; the prefixes are.',
        'Sortedness is irrelevant to editing one string into another.',
        'Character counts don’t capture ordering, which edit distance depends on.',
      ],
    },
  ],
}
