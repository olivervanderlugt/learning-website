import type { Lesson } from '../../types'

export const progData2Lesson: Lesson = {
  nodeId: 'prog-data-2',
  screens: [
    {
      kind: 'explain',
      title: 'A function that calls itself',
      body: [
        'You know functions can call other functions. Recursion is the strange, powerful special case: a function calling ITSELF — on a smaller version of the same problem.',
        'Every recursion needs exactly two ingredients: a BASE CASE (the smallest problem, answered directly, no more calls) and a RECURSIVE CASE (shrink the problem one step, call yourself on the rest).',
        'Miss either ingredient and it breaks — you’ll see exactly how in a minute.',
      ],
      deeper: [
        'Under the hood, every active call gets a FRAME on the call stack — the stack data structure you met in Arrays, Stacks & Hash Maps. Call countdown(3) and three frames stack up, each waiting for the one above it to finish.',
        'Anything a loop can do, recursion can do, and vice versa. Recursion earns its keep on SELF-SIMILAR problems — folders inside folders, decisions branching into decisions — where the loop version gets ugly and the recursive version reads like the problem itself.',
      ],
      links: [{ nodeId: 'prog-functions', label: 'Refresher: Functions & Abstraction' }],
    },
    {
      kind: 'predict',
      question:
        'countdown(n) does: if n is 0, print “liftoff!” and stop; otherwise print n, then call countdown(n − 1). What does countdown(3) print?',
      options: [
        '3, 2, 1, liftoff!',
        'liftoff!, 1, 2, 3',
        '3, 3, 3, … forever',
        'Just “liftoff!” — the recursion skips ahead',
      ],
      correctIndex: 0,
      reveal:
        'Each call prints its own n FIRST, then hands off to the next smaller one: 3, 2, 1 — until n = 0 hits the base case and prints liftoff!. The problem shrinks by one every call, so it is guaranteed to reach the stop.',
    },
    {
      kind: 'explain',
      title: 'Worked example: factorial, unrolled',
      body: [
        'factorial(n) = n × factorial(n − 1), with base case factorial(0) = 1. Watch factorial(3) unfold:',
        'factorial(3) = 3 × factorial(2) = 3 × 2 × factorial(1) = 3 × 2 × 1 × factorial(0) = 3 × 2 × 1 × 1 = 6.',
        'Notice the shape: the calls DIVE all the way down to the base case, then the answers multiply back up on the way out. Every recursion has this dive-and-return rhythm.',
      ],
      deeper: [
        'During the dive, every unfinished call waits on the stack: factorial(3) can’t multiply until factorial(2) returns, which waits on factorial(1)… The deepest point holds 4 stacked frames.',
        'That’s also recursion’s cost: n nested calls means n frames of memory. Dive too deep (say, factorial(100000)) and the stack runs out — the famous STACK OVERFLOW.',
      ],
      links: [{ nodeId: 'algo-structures', label: 'The stack lives here: Arrays, Stacks & Hash Maps' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — same rhythm, new function. sum(n) = n + sum(n − 1), base case sum(0) = 0. What is sum(3)?',
      options: [
        '6 — it unrolls to 3 + 2 + 1 + 0',
        '3 — only the first call counts',
        '9 — 3 × 3',
        '0 — the base case wins',
      ],
      correctIndex: 0,
      reveal:
        'sum(3) = 3 + sum(2) = 3 + 2 + sum(1) = 3 + 2 + 1 + sum(0) = 3 + 2 + 1 + 0 = 6. Same dive-and-return as factorial, with + instead of ×.',
    },
    {
      kind: 'predict',
      question:
        'Independent step. You delete the base case from countdown, leaving only: print n, call countdown(n − 1). What happens when you run countdown(3)?',
      options: [
        'It never stops — 3, 2, 1, 0, −1, −2… until the machine cuts it off',
        'It stops at 0 automatically',
        'It prints 3 and exits',
        'It refuses to run — the computer detects the missing base case',
      ],
      correctIndex: 0,
      reveal:
        'Nothing stops it: n just keeps shrinking past zero forever, piling frame on frame until the stack overflows (or, in our code runner, the 2-second timeout kills it). The base case isn’t decoration — it is the ONLY thing standing between recursion and infinity.',
    },
    {
      kind: 'code',
      prompt:
        'This countdown is missing its base case — as written it would recurse forever (our runner would cut it off after 2 seconds). Add the base case at the top of the function: if n is 0, print “liftoff!” and return. Then run it.',
      starter: `function countdown(n) {
  // base case missing! if n is 0: print('liftoff!') and return
  print(n)
  countdown(n - 1)
}
countdown(3)`,
      expected: `3
2
1
liftoff!`,
      hint: "The first two lines inside the function should be: if (n === 0) { print('liftoff!'); return }",
      success:
        'The base case caught n = 0, printed liftoff! and STOPPED — no call for n = −1 ever happened. Two ingredients, working together: the recursive case shrinks 3 → 2 → 1 → 0, the base case ends the dive.',
    },
    {
      kind: 'quiz',
      question: 'What are the two ingredients every working recursion must have?',
      options: [
        'A base case that stops, and a recursive case that shrinks the problem toward it',
        'A loop and a counter',
        'At least two different functions calling each other',
        'A global variable to track progress',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the recursive case makes progress toward smaller inputs; the base case answers the smallest one directly. Remove either and the recursion never ends or never starts.',
        'Recursion replaces the loop-and-counter — the shrinking argument IS the counter, and the base case IS the loop condition.',
        'A single function calling itself is the classic form. Two functions calling each other (mutual recursion) exists but isn’t required.',
        'Each call carries its own n as an argument — the call stack tracks progress for free, no globals needed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'f(n) = n × f(n − 1), with f(1) = 1. What is f(4)?',
      options: ['24', '4', '10', '256'],
      correctIndex: 0,
      explanations: [
        'Correct: f(4) = 4 × 3 × 2 × 1 = 24 — the calls dive to f(1) and the products multiply back up.',
        'That’s just the first factor — you stopped before the recursive calls returned their parts.',
        '10 is 4 + 3 + 2 + 1 — you added when the recursive case says multiply.',
        '256 is 4⁴ — the argument shrinks each call (4, 3, 2, 1), it doesn’t stay 4.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A recursive function calls itself with the SAME argument: solve(n) calls solve(n). What happens?',
      options: [
        'It never reaches the base case — infinite recursion until the stack overflows',
        'It works, just more slowly',
        'It stops after two identical calls',
        'The base case rescues it eventually',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: no shrinking means no progress — solve(5) calls solve(5) calls solve(5)… The recursive case MUST move the input toward the base case.',
        'It never finishes at all — this isn’t slow, it’s infinite. Each call spawns an identical next one.',
        'Nothing detects repetition — the machine happily makes the same call forever (until memory runs out).',
        'The base case only fires when the input REACHES it — an input that never changes never arrives.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'During countdown(3), what keeps track of the three unfinished calls waiting for their turn to resume?',
      options: [
        'The call stack — one frame per active call, popped as each returns',
        'A hidden loop the computer inserts',
        'The function’s source code',
        'Nothing — earlier calls are discarded',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each call pushes a frame (its own n, its place in the code); returns pop them in reverse order. Recursion is powered by the stack data structure.',
        'There is no secret loop — just function calls, exactly like any other, stacked up.',
        'The source code is the same for every call — what differs per call (its n, its resume point) lives in the stack frame.',
        'They can’t be discarded — countdown(3) still has work after countdown(2) finishes (it just returns, but factorial-style functions still multiply).',
      ],
    },
    {
      kind: 'quiz',
      question: 'When is recursion the NATURAL tool, rather than a loop?',
      options: [
        'On self-similar problems — folders in folders, branching decisions, divide-and-conquer',
        'Whenever you want the fastest possible code',
        'Never — loops can always do the job, so always use loops',
        'Only for mathematical formulas',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: when a problem contains smaller copies of itself, the recursive solution reads like the problem’s own definition. Trees, searches and divide-and-conquer live here.',
        'Recursion often costs MORE (a stack frame per call) — you choose it for clarity on self-similar structure, not raw speed.',
        'Loops CAN always do it, but try walking a folder tree of unknown depth with plain loops — the recursion is three lines, the loop version needs you to build your own stack anyway.',
        'File systems, robot planning trees and parsers aren’t formulas — self-similar STRUCTURE, not math, is the trigger.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'digits(n) = 1 + digits(n ÷ 10, floored), base case digits(n) = 1 when n < 10. What is digits(305)?',
      options: ['3', '1', '305', 'It never stops'],
      correctIndex: 0,
      explanations: [
        'Correct: digits(305) = 1 + digits(30) = 1 + 1 + digits(3) = 1 + 1 + 1 = 3. Each call strips one digit.',
        'That’s just the base case’s contribution — the two recursive calls each add 1 too.',
        'The function counts digits, not the value — the answer is how many strips it took to get under 10.',
        'n shrinks by ÷10 every call, so it reliably drops below 10 — the base case is reachable.',
      ],
    },
    {
      question: 'Which line is the base case in: function f(xs) { if (xs.length === 0) return 0; return xs[0] + f(xs.slice(1)) }',
      options: [
        'if (xs.length === 0) return 0',
        'return xs[0] + f(xs.slice(1))',
        'function f(xs)',
        'It has no base case',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the empty list is answered directly (0), with no further calls — that’s what makes it the base case.',
        'That’s the recursive case — it shrinks the list by one and calls f again.',
        'That’s just the function header — it doesn’t decide when to stop.',
        'It has one: the empty-list check. Without it, slice would eventually pass [] forever.',
      ],
    },
    {
      question: 'A recursive function crashes with “maximum call stack size exceeded”. Most likely cause?',
      options: [
        'The base case is missing or unreachable, so calls pile up forever',
        'The computer is out of disk space',
        'Recursion is banned in this language',
        'The function is too short',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: that error means frames stacked up until memory ran out — the signature of a recursion that never reaches its stop condition.',
        'The call stack lives in RAM, not on disk — and the message names the stack directly.',
        'The language clearly allows recursion — it ran thousands of calls before complaining.',
        'Length is irrelevant — a two-line function with no base case overflows just as fast.',
      ],
    },
    {
      question: 'Your robot must search a folder tree of unknown depth for a config file. Why does recursion fit perfectly?',
      options: [
        'Each folder is a smaller copy of the whole problem — search this folder, recurse into each subfolder',
        'Recursion is faster than any loop here',
        'Folders can only be opened recursively',
        'It avoids reading the disk',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the problem is self-similar — “search a folder” contains “search each subfolder”. The recursive code mirrors the structure exactly, at any depth.',
        'Speed is similar either way — the win is that the code stays three lines no matter how deep the tree goes.',
        'Loops can open folders fine — but tracking your place across unknown depth means hand-building a stack, which recursion gives you for free.',
        'Both approaches read the same folders — recursion changes the code’s shape, not the I/O.',
      ],
    },
  ],
}
