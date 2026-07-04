import type { Lesson } from '../../types'

export const progDataLesson: Lesson = {
  nodeId: 'prog-data',
  screens: [
    {
      kind: 'explain',
      title: 'Holding many values at once',
      body: [
        'One variable holds one value. But a robot’s laser scan is 360 distances, a path is a list of points, a mission is a queue of tasks.',
        'An array (a list) holds many values in order, each reachable by its position number, called an index — and indexes start at 0.',
        'Run this to see indexing in action.',
      ],
      links: [{ nodeId: 'prog-functions', label: 'Refresher: Functions & Abstraction' }],
    },
    {
      kind: 'code',
      prompt: 'Arrays are indexed from 0. Predict what each line prints, then Run.',
      starter: "let readings = [10, 20, 30]\nprint(readings[0])\nprint(readings[2])\nprint(readings.length)",
      expected: '10\n30\n3',
      success:
        'readings[0] is the FIRST element (10), readings[2] is the third (30), and .length is how many there are (3). Index 0 = first is the #1 source of off-by-one bugs — worth burning in now.',
    },
    {
      kind: 'predict',
      question: 'For readings = [10, 20, 30], what is readings[3]?',
      options: ['30', 'undefined — there is no index 3', '3', '0'],
      correctIndex: 1,
      reveal:
        'With 3 elements the valid indexes are 0, 1, 2 — so index 3 is past the end and gives undefined. A length-3 array’s last index is 2, not 3. Reading past the end is a classic bug (and in some languages, a crash).',
    },
    {
      kind: 'code',
      prompt: 'Finish the loop so it adds up every reading. (The accumulation line is blank.)',
      starter:
        'let readings = [10, 20, 30, 40]\nlet total = 0\nfor (let i = 0; i < readings.length; i = i + 1) {\n  total =   // <-- total + readings[i]\n}\nprint(total)',
      expected: '100',
      hint: 'Write: total = total + readings[i]',
      success:
        'Looping i from 0 to length−1 visits every element; total = total + readings[i] accumulates them to 100. Walking an array with a for-loop is the workhorse of nearly all data processing.',
    },
    {
      kind: 'code',
      prompt: 'All yours: print HOW MANY readings are below 15. (Loop, and count with an if.)',
      starter: 'let readings = [10, 20, 5, 30, 12]\nlet count = 0\n// loop over readings; if a reading < 15, add 1 to count\n\nprint(count)',
      expected: '3',
      hint: 'for (let i = 0; i < readings.length; i = i + 1) { if (readings[i] < 15) { count = count + 1 } }',
      success:
        'The under-15 readings are 10, 5 and 12 → count 3. Loop + index + if is how a robot filters a noisy scan for “which points are close enough to matter”.',
    },
    {
      kind: 'explain',
      title: 'Records: values with labels',
      body: [
        'Arrays order things by number, but sometimes you want labels. An object (record) groups named fields: { x: 3, y: 5, name: "goal" }.',
        'You read a field by name: point.x. Arrays for “many of the same”, objects for “one thing with several attributes” — most real data mixes both.',
        'A robot’s waypoint list, for instance, is an array of {x, y} objects. Quiz to lock it in.',
      ],
      deeper: [
        'Underneath, an array is a contiguous block of memory; readings[i] is just “start address + i × element size” — which is why indexed access is instant and why index 0 is the natural first slot (zero offset from the start).',
        'Different structures trade off different superpowers: arrays give instant indexed access, a stack gives cheap add/remove at the end, a hash map gives instant lookup by key. Choosing the right one is half of writing fast code — the whole point of the Algorithms & Data Structures domain next door.',
        'A lidar scan as an array, a task queue as a stack, a map of landmarks as a hash map: every robot program is really a careful choice of which structure holds which data.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the array [7, 8, 9], what is the index of the value 7?',
      options: ['0', '1', '7', '3'],
      correctIndex: 0,
      explanations: [
        'Correct: indexing starts at 0, so the first element (7) is at index 0.',
        'Index 1 is the SECOND element (8). Counting starts at 0, not 1.',
        '7 is the value, not its position. Its position (index) is 0.',
        '3 is the length (number of elements), not an index — valid indexes here are 0, 1, 2.',
      ],
    },
    {
      kind: 'quiz',
      question: 'An array has length 5. What is the index of its LAST element?',
      options: ['4', '5', '6', '1'],
      correctIndex: 0,
      explanations: [
        'Correct: indexes run 0 to length−1, so a length-5 array’s last index is 4.',
        'Index 5 is one past the end (undefined) — the off-by-one trap. Last valid index is length−1 = 4.',
        '6 is well past the end; the highest valid index is 4.',
        '1 is only the second element. The last is at index 4.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How do you read the field y from an object point = { x: 3, y: 5 }?',
      options: ['point.y', 'point[5]', 'point(y)', 'y.point'],
      correctIndex: 0,
      explanations: [
        'Correct: dot notation point.y reads the field named y, giving 5.',
        'Square-bracket numbers are for arrays; objects are keyed by name, so use point.y.',
        'Parentheses are for calling functions, not reading fields.',
        'It’s object.field order: point.y, not y.point.',
      ],
    },
    {
      kind: 'quiz',
      question: 'To total up all values in an array, you typically…',
      options: [
        'Loop over every index, adding each element to a running total',
        'Print the array once',
        'Read only the first element',
        'Use the array’s name directly as the sum',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: start a total at 0 and add readings[i] for each i — the standard accumulation loop.',
        'Printing shows the values but doesn’t compute their sum; you need to loop and add.',
        'The first element is only part of the total; you must visit them all.',
        'An array’s name is the whole list, not a number — summing requires walking it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot stores 360 lidar distances. Which structure fits best, and why?',
      options: [
        'An array — many values of the same kind, accessed by position (angle)',
        'A single variable — one number is enough',
        'An object with 360 differently-named fields',
        'No structure — print them as they arrive',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 360 same-kind distances indexed by angle is exactly what an array is for — readings[angle] gives that direction’s distance.',
        'One variable holds one number; you need all 360 to see the whole surroundings.',
        '360 hand-named fields would be unusable — arrays exist precisely so you can index by number instead.',
        'To reason about obstacles the robot must STORE and scan the readings, not just print and forget them.',
      ],
    },
  ],
}
