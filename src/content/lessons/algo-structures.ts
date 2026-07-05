import type { Lesson } from '../../types'

export const algoStructuresLesson: Lesson = {
  nodeId: 'algo-structures',
  screens: [
    {
      kind: 'explain',
      title: 'Containers with superpowers',
      body: [
        'You know arrays: ordered boxes, instant access by index. But “find the box containing Amsterdam” still means checking every box — O(n).',
        'Data structures are containers with different superpowers, bought by organizing data differently: hash maps buy instant lookup BY NAME, stacks buy perfect undo order, queues buy fairness.',
        'The skill isn’t building them — it’s picking the right one per job.',
      ],
      links: [{ nodeId: 'algo-bigo', label: 'Refresher: Measuring Speed (Big-O)' }],
    },
    {
      kind: 'predict',
      question: 'A hash map (JS object) finds a value by key — {"amsterdam": 52.4} — in O(1), no matter if it holds 10 or 10 million entries. What’s the trick?',
      options: [
        'The key is converted by a hash function into a storage position — computing WHERE to look instead of searching',
        'It keeps everything sorted and binary-searches',
        'It secretly checks every entry very fast',
        'It stores everything in the CPU cache',
      ],
      correctIndex: 0,
      reveal:
        'A hash function turns the key ("amsterdam") into a number that IS the slot to check — like knowing your hotel room from your keycard instead of knocking on every door. No search happens at all. (Sorted + binary search is the O(log n) alternative; both beat scanning, but hashing wins when order doesn’t matter.)',
    },
    {
      kind: 'code',
      prompt: 'A robot’s landmark table: look up positions by name. Run it — note there’s no loop anywhere.',
      starter:
        'let landmarks = { dock: 0, door: 12, window: 27 }\nprint(landmarks["door"])\nlandmarks["shelf"] = 40\nprint(landmarks["shelf"])\nprint(landmarks["dock"])',
      expected: '12\n40\n0',
      success:
        'Every lookup and insert was a single direct step — O(1). If landmarks were an array of {name, pos} records, each lookup would be a scan. When you find yourself scanning for a KEY, you want a map.',
    },
    {
      kind: 'explain',
      title: 'Stacks and queues: order as a feature',
      body: [
        'A STACK only touches the top: push to add, pop to remove the newest item first (LIFO). Undo history, function calls, backtracking.',
        'A QUEUE is the opposite: first in, first out (FIFO). Print jobs, message buffers, BFS exploring a maze level by level.',
        'The restriction is the point: by promising you’ll only take from one end, both stay O(1) per operation.',
      ],
      deeper: [
        'Your function calls live on THE call stack: calling pushes a frame (where to return to + local variables), returning pops it. Infinite recursion literally overflows this stack — that’s the error name.',
        'A robot’s sensor buffer is usually a RING buffer: a fixed-size queue where new readings overwrite the oldest. Fixed memory, O(1) writes, and “the last N readings” always available — perfect for a 100 Hz sensor stream.',
        'Stack vs queue in search: explore-a-maze with a stack and you get depth-first (dive one corridor to its end); with a queue you get breadth-first (all corridors one step at a time — which finds shortest paths). Same code, one container swapped, completely different behavior.',
      ],
    },
    {
      kind: 'code',
      prompt: 'An array can be a stack: push adds to the end, pop removes from the end. Predict the print order, then run.',
      starter:
        "let undoStack = []\nundoStack.push('draw circle')\nundoStack.push('draw square')\nundoStack.push('erase corner')\nprint(undoStack.pop())\nprint(undoStack.pop())\nprint(undoStack.length)",
      expected: 'erase corner\ndraw square\n1',
      success:
        'Last in, first out: the most recent action ("erase corner") pops first — exactly what Ctrl+Z needs. One item ("draw circle") remains. If you wanted FIFO instead, you’d take from the FRONT (shift) — and you’d have a queue.',
    },
    {
      kind: 'code',
      prompt: 'All yours: count how often each command appears, using an object as a counter. (Fill in the counting line.)',
      starter:
        "let commands = ['go', 'turn', 'go', 'stop', 'go']\nlet counts = {}\nfor (let i = 0; i < commands.length; i = i + 1) {\n  let c = commands[i]\n  if (counts[c] === undefined) { counts[c] = 0 }\n  // add 1 to this command's count\n\n}\nprint(counts['go'])\nprint(counts['turn'])\nprint(counts['stop'])",
      expected: '3\n1\n1',
      hint: 'counts[c] = counts[c] + 1',
      success:
        'counts[c] = counts[c] + 1 tallies each command in O(1) per item — the whole count is one linear pass. This “map as counter” pattern shows up everywhere: word counts, sensor-event tallies, vote counting.',
    },
    {
      kind: 'quiz',
      question: 'Which container gives O(1) lookup BY KEY (like "door" → 12)?',
      options: ['A hash map', 'An array', 'A stack', 'A queue'],
      correctIndex: 0,
      explanations: [
        'Correct: the hash function computes the storage slot from the key — no searching, any size.',
        'Arrays are O(1) by INDEX (position number); finding a key’s entry means scanning — O(n).',
        'Stacks only offer the top item — they don’t do lookup at all.',
        'Queues only offer the front item — lookup isn’t their job either.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You push A, then B, then C onto a stack, then pop twice. What comes off, in order?',
      options: ['C then B', 'A then B', 'C then A', 'B then C'],
      correctIndex: 0,
      explanations: [
        'Correct: LIFO — the newest (C) pops first, then B. A is still inside.',
        'A first would be FIFO — that’s a queue, the opposite end.',
        'After C pops, B is the new top — A is buried beneath it.',
        'B can’t come off while C is on top of it — the stack only touches the top.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Tasks should be handled in the order they arrived. Which container?',
      options: ['A queue (FIFO)', 'A stack (LIFO)', 'A hash map', 'Any of them — order always comes out the same'],
      correctIndex: 0,
      explanations: [
        'Correct: first in, first out is literally the fairness rule — arrival order preserved.',
        'A stack would serve the NEWEST task first — the last customer jumps the whole line.',
        'Hash maps have no meaningful order at all — great for lookup, wrong for sequencing.',
        'Order is exactly where they differ — that’s the whole choice.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does exploring a maze with a QUEUE (BFS) find the shortest path, while a STACK (DFS) may not?',
      options: [
        'A queue explores all positions at distance 1, then 2, then 3 — so the goal is first reached by the shortest route',
        'Queues are faster than stacks',
        'Stacks can’t store maze positions',
        'A stack visits fewer cells, missing the goal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: FIFO order = level-by-level expansion, so the first time you touch the goal, you got there in the fewest steps. LIFO dives down one corridor arbitrarily far first.',
        'Both are O(1) per operation — the difference is ORDER of exploration, not speed.',
        'A stack stores positions fine — it just explores them depth-first.',
        'DFS can visit MORE cells on bad mazes; the issue is it may reach the goal via a long detour, not miss it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot logs 1M sensor events and you repeatedly ask “how many events of type X?”. A teammate scans the whole array per question. Your fix?',
      options: [
        'One pass to build a counts map, then every question is O(1)',
        'Sort the array alphabetically first, then still scan',
        'Use a stack so recent events pop first',
        'Scan but with a faster for-loop',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pay O(n) once to build {type: count}, then answers are instant — the counting pattern you just coded. n questions go from O(n²) total to O(n).',
        'Sorting helps binary search (O(log n) per question) — decent, but the map’s O(1) is better and simpler here.',
        'Stacks answer “what’s newest?”, not “how many of X?” — wrong superpower.',
        'A faster scan improves the constant; the map changes the FAMILY — that’s the Big-O lesson applied.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The error “stack overflow” literally means…',
      options: [
        'The call stack ran out of space — usually runaway recursion pushing frames forever',
        'An array got too many elements',
        'A hash map had two keys collide',
        'The CPU overheated',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every call pushes a return-address frame; a function calling itself without a stopping case pushes until the stack’s memory is gone.',
        'Arrays grow on the heap — a different memory region with a different failure (out of memory).',
        'Hash collisions are normal and handled internally — they degrade speed, not crash.',
        'It’s a memory-layout error, nothing thermal — despite how it feels when you hit it.',
      ],
    },
    {
      question: 'Why does a robot’s 100 Hz sensor stream use a RING buffer (fixed-size, overwrite-oldest)?',
      options: [
        'Fixed memory forever + O(1) writes + always the freshest N readings — old data is worthless anyway',
        'It stores the entire history of all readings',
        'It sorts readings by importance',
        'It compresses the data to save disk',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: control decisions need RECENT readings; a buffer that silently drops the stale ones can run for months without growing a byte.',
        'The whole point is NOT keeping history — unbounded logs eventually eat all memory on an embedded board.',
        'It’s pure arrival order — no sorting; importance-ranking would be a priority queue.',
        'No compression involved — it’s about bounding memory, not shrinking data.',
      ],
    },
  ],
}
