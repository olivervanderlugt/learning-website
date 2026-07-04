import type { Lesson } from '../../types'

export const progVariablesLesson: Lesson = {
  nodeId: 'prog-variables',
  screens: [
    {
      kind: 'explain',
      title: 'Telling a computer what to do',
      body: [
        'A program is a list of instructions. The computer runs them top to bottom, exactly as written — no guessing, no common sense.',
        'You’ll write real code in this lesson, in a language called JavaScript, and run it live. We use one command: print(...) shows a value on screen.',
        'Let’s run your first line.',
      ],
    },
    {
      kind: 'code',
      prompt: 'Here is a complete program. Read it, predict what it shows, then hit Run.',
      starter: "print('Hello, robot')",
      expected: 'Hello, robot',
      success:
        'That text in quotes is a “string” — literal characters. print displayed it unchanged. You just ran a program.',
    },
    {
      kind: 'explain',
      title: 'Variables: labelled boxes',
      body: [
        'A variable is a named box that holds a value. `let speed = 5` creates a box called speed with 5 inside.',
        'Later you can read it, or change it: `speed = speed + 1` takes what’s inside, adds one, and puts it back.',
        'The name is yours to choose — pick names that say what they hold.',
      ],
    },
    {
      kind: 'predict',
      question: 'What does this print?\n\nlet x = 4\nx = x + 3\nprint(x)',
      options: ['4', '7', '43', 'x + 3'],
      correctIndex: 1,
      reveal:
        'x starts as 4. The line x = x + 3 reads the current value (4), adds 3 to get 7, and stores 7 back in x. So print(x) shows 7. The right side is calculated first, then assigned to the left — that’s the heart of how variables change over time.',
    },
    {
      kind: 'code',
      prompt:
        'Finish this program so it prints the robot’s new position. It starts at 10 and moves forward by 5. Fill in the calculation.',
      starter: 'let position = 10\nlet step = 5\n// change this line so position becomes 15:\nposition = 0\nprint(position)',
      expected: '15',
      hint: 'Replace the 0 with position + step (or 10 + 5).',
      success:
        'You updated a variable using another variable. This exact pattern — position = position + step — is how every robot tracks where it is, tick after tick.',
    },
    {
      kind: 'explain',
      title: 'Making decisions: if / else',
      body: [
        'Real programs choose. `if (condition) { ... } else { ... }` runs the first block when the condition is true, otherwise the second.',
        'Conditions compare values: `distance < 20` is true when distance is under 20. That’s a robot deciding whether to stop.',
        'You write the decision next.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A sensor reads distance = 12. What prints?\n\nif (distance < 20) {\n  print("STOP")\n} else {\n  print("GO")\n}',
      options: ['STOP', 'GO', 'both', 'nothing'],
      correctIndex: 0,
      reveal:
        'distance is 12, and 12 < 20 is true, so only the first block runs: STOP. The else block is skipped entirely. This tiny structure is a robot’s entire obstacle reflex — sense a number, compare, act.',
    },
    {
      kind: 'code',
      prompt:
        'Write the robot’s reflex. If temperature is above 50, print "COOLING"; otherwise print "OK". temperature is already set to 63 — write the if/else.',
      starter: 'let temperature = 63\n// write an if/else that prints COOLING or OK:\n',
      expected: 'COOLING',
      hint: 'Use: if (temperature > 50) { print("COOLING") } else { print("OK") }',
      success:
        '63 is above 50, so your condition was true and it printed COOLING. Change 63 to 40 mentally — your else branch would fire instead. That’s branching.',
    },
    {
      kind: 'explain',
      title: 'Loops: repeat without repeating yourself',
      body: [
        'To do something many times, use a loop. `for (let i = 0; i < 3; i = i + 1) { ... }` runs its block for i = 0, 1, 2.',
        'Loops are why one short program can process a 360-point laser scan or drive a motor for a million steps.',
        'One challenge left — make a loop count.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Make this loop print the numbers 1, 2, 3 (each on its own line). The loop is started for you — fix the parts so it counts 1 to 3.',
      starter: 'for (let i = 1; i <= 3; i = i + 1) {\n  print(i)\n}',
      expected: '1\n2\n3',
      hint: 'This one already works — read it, run it, and watch i climb from 1 to 3. Change <= to < and see what drops off.',
      success:
        'The loop ran its body three times, with i counting 1, 2, 3. Loops + variables + if/else are literally everything — every program you will ever write is built from these three.',
    },
    {
      kind: 'quiz',
      question: 'After these lines, what is in the variable count?\n\nlet count = 2\ncount = count + count',
      options: ['2', '4', '22', '0'],
      correctIndex: 1,
      explanations: [
        'count changes on the second line — it doesn’t stay 2. The right side count + count is computed first.',
        'Correct: count + count is 2 + 2 = 4, which is stored back into count.',
        '22 would be joining two texts ("2"+"2"). But count holds the number 2, and numbers add: 2 + 2 = 4.',
        'Nothing sets it to 0 — it starts at 2 and doubles to 4.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In `if (x < 10) { A } else { B }`, when does block B run?',
      options: [
        'When x is less than 10',
        'When x is 10 or greater',
        'Always, after A',
        'Never',
      ],
      correctIndex: 1,
      explanations: [
        'That’s when block A runs — the condition x < 10 being true picks the FIRST block.',
        'Correct: else runs exactly when the condition is false, i.e. when x is not less than 10 (10 or more).',
        'else is an alternative to A, not an addition — only one of the two blocks runs, never both.',
        'B runs whenever the condition is false — that happens for any x of 10 or above.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How many times does the body run?\n\nfor (let i = 0; i < 4; i = i + 1) { ... }',
      options: ['3', '4', '5', 'forever'],
      correctIndex: 1,
      explanations: [
        '3 would be i < 3, or counting from 1. Here i takes 0, 1, 2, 3 — that’s four values.',
        'Correct: i starts at 0 and runs while i < 4, so i = 0, 1, 2, 3 — four iterations.',
        'i stops as soon as it reaches 4 (4 < 4 is false), so 4 never runs the body — that’s four runs, not five.',
        'It ends: once i reaches 4 the condition i < 4 is false and the loop stops. Forever only happens if i never reaches the limit.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does `position = position + step` need the OLD value of position on the right?',
      options: [
        'It reads the current position, adds step, and stores the result back',
        'It creates a brand-new position from scratch',
        'It compares position to step',
        'The right side is ignored',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the right side is evaluated using the current value, then that result replaces the old one — how state advances step by step.',
        'It reuses the existing value, not a fresh one — that’s the whole point of accumulating movement.',
        'There’s no comparison here (no <, >, ==); the + adds, and = stores.',
        'The right side is exactly what gets computed and stored — it’s the most important part.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A program does the same three things in the same order every run, with no randomness. This predictability is…',
      options: [
        'The foundation you rely on — computers execute instructions literally and repeatably',
        'A bug to be fixed',
        'Unique to JavaScript',
        'Only true for short programs',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: determinism is the bedrock — same instructions and inputs give the same result, which is why you can reason about and debug code at all.',
        'It’s the opposite of a bug — reliable repetition is what makes programs trustworthy. Bugs come from OUR mistakes, not the machine improvising.',
        'Every mainstream language is deterministic this way — it’s a property of how CPUs run instructions, not of one language.',
        'It holds for programs of any size — a million-line robot stack is just as literal and repeatable as three lines.',
      ],
    },
  ],
}
