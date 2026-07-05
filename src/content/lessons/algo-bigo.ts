import type { Lesson } from '../../types'

export const algoBigoLesson: Lesson = {
  nodeId: 'algo-bigo',
  screens: [
    {
      kind: 'explain',
      title: 'Fast today, frozen tomorrow',
      body: [
        'Two programs both run instantly on your test data. Ship them, and at real-world size one still flies while the other takes hours. Same computer — different GROWTH.',
        'Big-O is the language for how work grows as the input grows: double the input, what happens to the runtime?',
        'It’s the single most practical idea in computer science: it tells you a design is doomed BEFORE you build it.',
      ],
      links: [{ nodeId: 'prog-data', label: 'Refresher: arrays & loops (Data in Memory)' }],
    },
    {
      kind: 'predict',
      question: 'Finding a name by checking a list one-by-one takes 1 ms on 1,000 names. Roughly how long on 1,000,000 names?',
      options: ['About 1 second — 1000× the items, 1000× the time', 'Still about 1 ms', 'About 30 ms', 'About 17 minutes'],
      correctIndex: 0,
      reveal:
        'One-by-one checking is LINEAR — O(n): work grows in step with the input, so 1000× the names is 1000× the time (~1 s). Not catastrophic… but now imagine doing that lookup inside a loop that itself runs a million times. That’s how “fast” code becomes a frozen robot.',
    },
    {
      kind: 'code',
      prompt: 'Count the work yourself. This loop-inside-a-loop compares every pair. Run it and see how fast the count grows for n = 10 vs n = 20.',
      starter:
        'function pairs(n) {\n  let count = 0\n  for (let i = 0; i < n; i = i + 1) {\n    for (let j = 0; j < n; j = j + 1) {\n      count = count + 1\n    }\n  }\n  return count\n}\nprint(pairs(10))\nprint(pairs(20))',
      expected: '100\n400',
      success:
        'Doubling n (10 → 20) made the work 4× (100 → 400): a loop inside a loop is O(n²) — work grows with the SQUARE of the input. At n = 1,000 that’s already a million steps; at n = 1,000,000 it’s a trillion.',
    },
    {
      kind: 'explain',
      title: 'The growth families',
      body: [
        'Almost everything you’ll write lands in one of a few families: O(1) constant, O(log n) halving, O(n) linear, O(n log n) good sorting, O(n²) all-pairs.',
        'Big-O ignores constants and small terms — 3n + 20 and n are both O(n) — because at scale, only the growth SHAPE matters.',
        'Time to feel the difference. Race them.',
      ],
      deeper: [
        'Why drop constants? Because a constant factor is a fixed price, while growth compounds: an O(n log n) sort with a clumsy 5× constant still crushes an elegant O(n²) sort once n passes a few hundred. Hardware buys constants; algorithms buy growth.',
        'O(log n) means “halve the problem each step”: binary search on a sorted million-item list takes ~20 steps because 2²⁰ ≈ 1M. Each doubling of the data adds ONE step.',
        'Big-O is usually quoted for the WORST case — the guarantee. A robot’s control loop must meet its deadline every tick, so worst case (not average) is what keeps it from freezing mid-motion.',
      ],
    },
    {
      kind: 'game',
      gameId: 'big-o-race',
    },
    {
      kind: 'quiz',
      question: 'An algorithm is O(n²). Its input doubles. What happens to the work?',
      options: ['About 4× as much', 'About 2× as much', 'It stays the same', 'About 8× as much'],
      correctIndex: 0,
      explanations: [
        'Correct: (2n)² = 4n² — quadratic means doubling input quadruples work. You saw it: pairs(10)=100, pairs(20)=400.',
        '2× is LINEAR growth, O(n) — quadratic grows faster than the input.',
        'Constant work regardless of input is O(1) — the opposite end of the spectrum.',
        '8× on doubling is CUBIC, O(n³) — three nested loops, not two.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Binary search takes ~20 steps on 1,000,000 sorted items. On 2,000,000 items it takes…',
      options: ['~21 steps', '~40 steps', '~200 steps', '~2,000,000 steps'],
      correctIndex: 0,
      explanations: [
        'Correct: O(log n) — each halving cuts the problem in two, so DOUBLING the data adds exactly one step. 2²¹ ≈ 2M.',
        '40 would be doubling the steps — but logs don’t double when data doubles; they tick up by one.',
        '200 has no relation to any growth family here — log₂(2M) ≈ 21.',
        'That’s linear search on unsorted data — the whole point of sorting + binary search is escaping it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does Big-O deliberately ignore constant factors (treating 3n and n as the same)?',
      options: [
        'Constants are a fixed multiplier, but growth compounds — at scale only the shape of growth matters',
        'Constants are impossible to measure',
        'Because all computers run at the same speed',
        'It doesn’t — 3n is written O(3n)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a 3× constant is one-off; n² vs n widens without bound. Past some size, ANY O(n) beats ANY O(n²), whatever their constants.',
        'Constants are perfectly measurable (profilers do) — Big-O just answers a different question: scaling.',
        'Computer speeds differ wildly — that’s exactly why we want a machine-independent measure of growth.',
        'Standard notation drops the constant: 3n, 100n, n/2 are all written O(n).',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot’s path planner must finish within its 10 ms control tick, every tick. Which measure matters most?',
      options: [
        'Worst-case complexity — the guarantee that no input blows the deadline',
        'Best-case complexity — how fast it can be when lucky',
        'The speed on yesterday’s test map',
        'The programming language it’s written in',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a real-time loop is only as good as its worst tick — one 200 ms planning hiccup mid-corridor is a crash, not a statistic.',
        'Best case is marketing: the one input arrangement where it’s fast tells you nothing about the dangerous ones.',
        'One map is one data point; Big-O is about what happens on maps you haven’t met yet.',
        'Language changes the constant factor; growth family dominates it at scale — an O(n²) planner is slow in any language.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A teammate’s “check every pair of sensor points” loop works fine with 100 points. The lidar delivers 100,000. What do you predict?',
      options: [
        'It becomes ~a million times slower — all-pairs is O(n²), and n grew 1000×',
        'It becomes about 1000× slower',
        'No change — computers are fast',
        'It fails to compile at larger n',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 1000× more points → 1000² = 1,000,000× more pairs. Milliseconds become tens of minutes. This exact trap is why Big-O is a design tool, not an afterthought.',
        '1000× would be linear scaling; PAIRS scale with the square.',
        'Fast hardware pays constants, not compounding growth — a trillion operations is a trillion operations.',
        'Compilation doesn’t depend on input size — it runs, it just doesn’t finish in useful time.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Looking up a value by array index (readings[42]) is which family?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 0,
      explanations: [
        'Correct: index → address is one arithmetic step, regardless of array size — constant time.',
        'No halving happens — there’s nothing to search; the position is known.',
        'O(n) would be scanning to find it; indexing jumps straight there.',
        'No pairs involved — just one direct memory access.',
      ],
    },
    {
      question: 'Good general-purpose sorting (merge sort, quicksort typical case) is O(n log n). Sorting 1M items ≈ 20M steps. Sorting 2M items is roughly…',
      options: ['~42M steps — a bit more than double', 'Exactly double: 40M', '4× as much: 80M', 'The same'],
      correctIndex: 0,
      explanations: [
        'Correct: 2M × log₂(2M) ≈ 2M × 21 = 42M — the n doubles AND the log ticks up one, so slightly worse than 2×. That gentle drift is why n log n scales to enormous data.',
        'Close, but the log grows too: log₂(2M) ≈ 21, not the 20 you had at 1M.',
        '4× is quadratic thinking — n log n is far tamer than n².',
        'More items always means more sorting work — only O(1) stays flat.',
      ],
    },
  ],
}
