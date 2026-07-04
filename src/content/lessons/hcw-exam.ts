import type { Lesson } from '../../types'

export const hcwExamLesson: Lesson = {
  nodeId: 'hcw-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — prove the foundation',
      body: [
        'Ten questions covering the whole module, all NEW — no repeats from the lesson quizzes. No workbench, no notes: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A distance sensor sends the byte 11001000. How far away is the obstacle (in cm, reading the byte as a plain number)?',
      options: ['200', '104', '196', '152'],
      correctIndex: 0,
      explanations: [
        'Correct: 128 + 64 + 8 = 200. The ON bits sit in the 128s, 64s and 8s places.',
        '104 = 64+32+8 — that reads the pattern 01101000. Check which places hold the 1s: 128, 64 and 8.',
        '196 = 128+64+4 — close! The third 1 is in the 8s place (fourth from the right), not the 4s.',
        '152 = 128+16+8 — the second 1 is in the 64s place, not the 16s. Place values double leftward: 1,2,4,8,16,32,64,128.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot needs to distinguish 500 different arm positions. How many bits must the position sensor report?',
      options: ['8', '9', '250', '500'],
      correctIndex: 1,
      explanations: [
        '8 bits give 2⁸ = 256 values — not enough for 500. One more bit doubles it.',
        'Correct: 2⁸ = 256 < 500 ≤ 512 = 2⁹. Nine bits is the smallest count that covers 500 values.',
        'Bits don’t divide the target in half like that — each bit DOUBLES the total combinations, so you need far fewer than 250.',
        'One bit per value would be wildly wasteful — n bits give 2ⁿ combinations, so 9 suffice for 500.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You wire signal X into both inputs of a NAND, then wire that output into both inputs of a second NAND. What does the final output equal?',
      options: ['Always 1', 'NOT X', 'X (unchanged)', 'Always 0'],
      correctIndex: 2,
      explanations: [
        'Each stage depends on X — nothing is stuck. Trace it: each NAND with tied inputs is a NOT.',
        'One tied NAND is NOT X — but there are two in a row. The second flips it back.',
        'Correct: tied NAND = NOT, and NOT(NOT X) = X. Two inversions cancel — a “buffer”, which real chips use to boost weak signals.',
        'Trace X=0: first NAND gives 1, second gives 0 — output follows X, it isn’t stuck at 0.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which pair correctly matches gates to the adder’s two jobs?',
      options: [
        'XOR computes the sum bit; AND detects the carry',
        'AND computes the sum bit; OR detects the carry',
        'XOR computes both sum and carry',
        'NAND computes the sum; NOT detects the carry',
      ],
      correctIndex: 0,
      explanations: [
        'Correct — the half adder in one sentence. XOR’s “different?” matches the sum column; AND’s “both?” matches the carry.',
        'AND outputs 0 for 0+1 — but 0+1 must sum to 1. And OR would wrongly carry on a single 1.',
        'XOR outputs 0 for 1+1, which is right for the sum but the carry must be 1 there — a second, different gate is required.',
        'NAND(1,1)=0 matches the sum there, but NAND(0,0)=1 claims 0+0=1. And NOT takes one input — the carry needs to see both bits.',
      ],
    },
    {
      kind: 'quiz',
      question: 'De Morgan’s law says NOT(A AND B) is the same as…',
      options: [
        '(NOT A) AND (NOT B)',
        '(NOT A) OR (NOT B)',
        'NOT(A OR B)',
        'A XOR B',
      ],
      correctIndex: 1,
      explanations: [
        'Tempting symmetry, but wrong: “not both” ≠ “both off”. A=1,B=0: NOT(A AND B)=1 but (NOT A) AND (NOT B)=0.',
        'Correct: “not both on” = “at least one is off”. Flipping through a NOT swaps AND with OR — the trick you used to build OR from NAND.',
        'NOT(A OR B) means “neither is on” — a different (stricter) claim than “not both are on”.',
        'XOR is “exactly one” — for A=0,B=0 it gives 0, but NOT(A AND B) gives 1 there.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A full adder receives A=1, B=1, carry-in=1. What does it output?',
      options: [
        'Sum 1, carry-out 1',
        'Sum 0, carry-out 1',
        'Sum 1, carry-out 0',
        'Sum 0, carry-out 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 1+1+1 = 3 = binary 11 → sum bit 1 AND carry 1. The only row where both outputs fire.',
        'Sum 0 carry 1 is 1+1+0 = 2 = binary 10. With the third 1, the total is 3 = 11.',
        'Sum 1 carry 0 would mean a total of 1 — but three ones make 3, which needs the carry too.',
        'Three ones can’t vanish — 3 in binary is 11, so both output wires light up.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do engineers replace ripple adders with “carry-lookahead” designs in wide (64-bit) CPUs?',
      options: [
        'Ripple adders give wrong answers past 8 bits',
        'The carry chain makes the worst-case delay grow with the number of columns',
        'Lookahead adders need fewer transistors',
        'Ripple adders overheat',
      ],
      correctIndex: 1,
      explanations: [
        'Ripple adders are perfectly correct at any width — the problem is time, not truth.',
        'Correct: each stage may wait on its neighbour, so 64 bits can mean a 64-stage wait per addition. Lookahead circuits predict carries to break the chain — spending extra hardware to buy speed.',
        'It’s the opposite — lookahead spends MORE transistors to win time. Classic hardware trade-off.',
        'Heat scales with transistor count and frequency, not with adder topology — the ripple’s sin is latency.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What exactly does the program counter (PC) hold?',
      options: [
        'The number of programs installed',
        'The location of the next instruction to fetch',
        'The result of the last calculation',
        'The CPU temperature',
      ],
      correctIndex: 1,
      explanations: [
        'Nothing to do with counting programs — it counts THROUGH a program, one instruction at a time.',
        'Correct: PC is the CPU’s finger on the page — fetch reads where it points, and execute moves it along (or jumps it, which is how loops work!).',
        'Results land in general-purpose registers like R3 — PC only ever holds a location in the program.',
        'Temperature sensors exist but feed management circuits — PC is the address of what to run next.',
      ],
    },
    {
      kind: 'quiz',
      question: 'On every clock tick, what happens across the whole CPU?',
      options: [
        'One transistor switches at a time, in order',
        'All registers capture their new values simultaneously',
        'The CPU checks for new programs',
        'Memory is wiped and rewritten',
      ],
      correctIndex: 1,
      explanations: [
        'Millions of gates settle IN PARALLEL between ticks — the tick is the moment everyone commits at once, not a one-by-one parade.',
        'Correct: between ticks, gate signals ripple and settle; the tick says “NOW” and every register latches simultaneously. That lock-step is what the GHz number counts.',
        'Program switching is the operating system’s job, thousands of ticks apart — a single tick is one heartbeat of fetch-decode-execute.',
        'Registers KEEP values across ticks unless told to load — computing would be impossible if state vanished every beat.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot code says `speed = speed + 1`. Which chain of events is the true one?',
      options: [
        'The operating system does the math and tells the CPU the answer',
        'The instruction is fetched and decoded, then full adders — XOR/AND gates — physically compute the sum',
        'The compiler already computed it, the CPU just stores the result',
        'A special “math chip” outside the CPU handles all arithmetic',
      ],
      correctIndex: 1,
      explanations: [
        'The OS is itself just instructions running on the same CPU — it can’t compute anything except through the same gates.',
        'Correct: the full stack you built — the ADD instruction is fetched (PC), decoded (control), and executed by real adder circuits made of the gates you wired from NANDs. Software is instructions; hardware does the work.',
        'The compiler translates code to instructions, but `speed` changes at runtime — the addition must happen live, in the adder, every time.',
        'Historically FPUs were separate chips, but integer addition has always lived in the CPU core — and either way, it’s the same XOR/AND adder logic.',
      ],
    },
  ],
}
