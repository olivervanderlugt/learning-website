import type { Lesson } from '../../types'

export const algoSortingLesson: Lesson = {
  nodeId: 'algo-sorting',
  screens: [
    {
      kind: 'explain',
      title: 'Divide, conquer, combine',
      body: [
        'Sorting is the workhorse that makes searching, deduping and merging fast — so it’s worth doing well. The naive approaches (compare-and-swap neighbours) cost O(n²): 1,000 items → a million operations.',
        'DIVIDE-AND-CONQUER does better. Merge sort splits the list in half, sorts each half (by the same method, recursively), then MERGES the two sorted halves into one. Splitting is trivial; the cleverness is in the cheap merge.',
        'This same split-recurse-combine shape underlies FFTs, closest-pair geometry and fast multiplication — learn it once here.',
      ],
      links: [
        { nodeId: 'algo-structures', label: 'Recap: arrays & the cost of operations' },
        { nodeId: 'prog-data-2', label: 'Recursion: functions that call themselves' },
      ],
    },
    {
      kind: 'predict',
      question:
        'Merge sort splits n items into 2 halves, recurses, then does an O(n) merge. Each level of splitting does O(n) total merging work, and there are log₂n levels of halving. So the total cost is about…',
      options: [
        'n · log n — n work per level, times log n levels',
        'n² — every item is compared with every other',
        'n — one pass is enough',
        '2ⁿ — it doubles with each item',
      ],
      correctIndex: 0,
      reveal:
        'Halving from n down to 1 takes log₂n levels (1000 → 500 → 250 → … → 1 is ~10 halvings). At EVERY level the merges together touch all n items once, so each level is O(n) work. Multiply: O(n log n). For a million items that’s ~20 million operations instead of a trillion — the difference between instant and never. This n·log n barrier is also provably the BEST any comparison sort can do.',
    },
    {
      kind: 'explain',
      title: 'The merge, step by step',
      body: [
        'Merging two already-sorted lists is the whole trick. Put a finger on the front of each; repeatedly take the SMALLER of the two fronts and advance that finger. When one list empties, dump the rest of the other.',
        'Merge [1, 4, 7] with [2, 3, 8]: compare 1<2 → take 1; 4>2 → take 2; 4>3 → take 3; 4<8 → take 4; 7<8 → take 7; 8 → take 8. Result [1, 2, 3, 4, 7, 8], in a single linear pass.',
        'Code the merge. The load-bearing line is the comparison that decides which finger to take.',
      ],
      deeper: [
        'Because the merge only ever compares the two current fronts and preserves their order, equal elements keep their original relative order — merge sort is STABLE. That matters when you sort by one key then another (sort by name, then by date, and same-date rows stay name-ordered).',
        'Quicksort is the other famous divide-and-conquer sort: it PARTITIONs around a pivot instead of merging. It’s usually faster in practice (in-place, cache-friendly) but its worst case is O(n²) on bad pivots, whereas merge sort is O(n log n) always — the classic time-vs-guarantee trade.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Complete the merge of two sorted arrays: at each step take the SMALLER front. Fix the comparison so the output stays sorted. Expected: 1 2 3 4 7 8.',
      starter: `function merge(a, b) {
  let i = 0, j = 0
  const out = []
  while (i < a.length && j < b.length) {
    if (true) {            // <-- fix: take a[i] only when it's <= b[j]
      out.push(a[i]); i++
    } else {
      out.push(b[j]); j++
    }
  }
  while (i < a.length) out.push(a[i++])
  while (j < b.length) out.push(b[j++])
  return out
}
print(merge([1, 4, 7], [2, 3, 8]).join(' '))`,
      expected: `1 2 3 4 7 8`,
      hint: 'Replace the condition with a[i] <= b[j] — take from a only when its front is the smaller one.',
      success:
        'Comparing the two fronts and taking the smaller keeps the output sorted in one linear pass — the O(n) merge that makes the whole O(n log n) sort work. Leave it as “true” and you always drain a first, producing 1 4 7 2 3 8: not sorted at all.',
    },
    {
      kind: 'quiz',
      question: 'Why is merge sort O(n log n) rather than O(n²)?',
      options: [
        'There are log n levels of halving, and each level does O(n) total merge work',
        'It only looks at each element once, ever',
        'Because it uses recursion, which is always faster',
        'It sorts without comparing elements',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: log n levels (from halving) × O(n) merging per level = O(n log n). The structure of the recursion is where the log comes from.',
        'Each element is touched once PER LEVEL, and there are log n levels — not just once total.',
        'Recursion isn’t automatically fast; it’s the halving structure that cuts the cost, and a bad recursion can be exponential.',
        'Merge sort is a comparison sort — it absolutely compares elements; that’s how it decides order.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Merging two sorted lists of total length n takes how long, and why does that matter?',
      options: [
        'O(n) — a single pass taking the smaller front each step; it’s what keeps each level of merge sort linear',
        'O(n²) — every element is compared with every other',
        'O(log n) — it halves the work each step',
        'O(1) — merging is free',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one finger per list, advance the smaller — each element is emitted once, so the merge is linear. Linear-per-level × log levels = n log n.',
        'Merging never compares all pairs — it only ever looks at the two current fronts.',
        'Merging must touch every element to place it, so it can’t be sub-linear.',
        'It does real work proportional to the number of elements — not constant.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A comparison-based sort can never beat which asymptotic bound?',
      options: [
        'Ω(n log n) — no sort that works by comparing pairs can be faster in the worst case',
        'Ω(n²) — comparisons force quadratic time',
        'Ω(n) — you can always sort in linear time with enough cleverness',
        'There is no lower bound',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: there are n! possible orderings and each comparison gives one bit of information, which forces at least ~n log n comparisons. Merge sort hits this bound.',
        'Good sorts beat n²; the true floor for comparison sorts is n log n, not n².',
        'Linear sorting is only possible by NOT comparing (e.g. counting/radix sort on bounded integers) — pure comparison sorts can’t.',
        'The n log n comparison lower bound is a proven theorem, not an open question.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You sort records by date, then sort the result by name. You need same-name records to stay in date order. Which property must your sort have?',
      options: [
        'Stability — equal keys keep their prior relative order, which merge sort guarantees',
        'In-place operation — it must use no extra memory',
        'Worst-case O(n) — it must be linear',
        'Randomized pivots — to avoid worst cases',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a stable sort preserves the existing order among equal keys, so a prior date-sort survives inside each name group. Merge sort is stable.',
        'Memory use is unrelated to preserving order among equals.',
        'Linear-time comparison sorting is impossible; stability, not speed, is what this task needs.',
        'Pivot choice is a quicksort concern and doesn’t provide stability.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Quicksort is often faster than merge sort in practice yet has a worse worst case. What’s the trade?',
      options: [
        'Quicksort is in-place and cache-friendly (fast average O(n log n)) but degrades to O(n²) on bad pivots; merge sort is always O(n log n) but needs extra memory',
        'Quicksort is always faster and better in every way',
        'Merge sort is always faster; quicksort is obsolete',
        'They are identical algorithms with different names',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: quicksort trades a rare quadratic worst case (mitigated by randomized pivots) for excellent average-case, low-memory performance; merge sort trades memory for a guaranteed bound.',
        'Its O(n²) worst case and lack of stability are real downsides.',
        'Quicksort’s in-place, cache-friendly behavior makes it the default in many libraries — far from obsolete.',
        'They use different strategies: quicksort partitions around a pivot, merge sort merges sorted halves.',
      ],
    },
    {
      question: 'The recurrence T(n) = 2T(n/2) + O(n) describes merge sort. What do the pieces mean?',
      options: [
        'Two subproblems of half size (2T(n/2)) plus O(n) to merge — which solves to O(n log n)',
        'It squares the input each step, giving O(n²)',
        'It halves the total work each step, giving O(log n)',
        'It means merge sort recurses n times',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: two half-sized recursive calls and a linear merge; expanding the recurrence gives log n levels of O(n) work = O(n log n).',
        'Nothing is squared — the +O(n) is the linear merge, not quadratic.',
        'The whole array is re-touched at every level, so total work is n log n, not log n.',
        'It recurses to depth log n (halving), doing 2 calls per level — not n calls total at one level.',
      ],
    },
    {
      question: 'Counting sort can sort n integers in the range 0..k in O(n + k) — beating n log n. How does it dodge the comparison lower bound?',
      options: [
        'It never compares elements — it tallies how many of each value occur, so the Ω(n log n) comparison bound doesn’t apply',
        'It secretly uses merge sort underneath',
        'The lower bound is wrong',
        'It only works on already-sorted data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the n log n floor is specifically for COMPARISON sorts; counting/radix sorts use the values as array indices instead, sidestepping it (at the cost of needing bounded, integer-like keys).',
        'Counting sort does no merging or comparing — it uses a tally array.',
        'The comparison lower bound is a proven theorem; counting sort simply isn’t a comparison sort.',
        'It works on any integers in range, sorted or not — order of input doesn’t matter.',
      ],
    },
  ],
}
