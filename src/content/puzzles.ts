import type { GatePuzzle } from '../types'

export const puzzles: Record<string, GatePuzzle> = {
  'not-from-nand': {
    id: 'not-from-nand',
    title: 'Build NOT from NAND',
    goal: 'Make the output the OPPOSITE of input A — using only NAND.',
    inputLabels: ['A'],
    outputLabels: ['NOT A'],
    palette: ['NAND'],
    truthTable: [
      { inputs: [0], outputs: [1] },
      { inputs: [1], outputs: [0] },
    ],
    intro: [
      'Meet NAND, the gate you get almost for free from two transistors. Its rule: output 1, UNLESS both inputs are 1.',
      'Your prediction was right (or about to be proven): feed the SAME signal into both NAND inputs and see what comes out.',
      'Add a NAND, wire A into BOTH its inputs, then wire it to the output. Watch the truth table light up.',
    ],
  },
  'and-from-nand': {
    id: 'and-from-nand',
    title: 'Build AND from NAND',
    goal: 'Output 1 only when A AND B are both 1.',
    inputLabels: ['A', 'B'],
    outputLabels: ['A AND B'],
    palette: ['NAND', 'NOT'],
    truthTable: [
      { inputs: [0, 0], outputs: [0] },
      { inputs: [0, 1], outputs: [0] },
      { inputs: [1, 0], outputs: [0] },
      { inputs: [1, 1], outputs: [1] },
    ],
    intro: [
      'Worked example — what you just built: NAND with its inputs tied together flips a signal. 0→1, 1→0. That’s a NOT gate, and you now have it in your palette.',
      'NAND literally means NOT-AND: it’s an AND with a built-in flip at the end.',
      'So to get a plain AND back… undo the flip. Two gates total.',
    ],
  },
  'or-from-nand': {
    id: 'or-from-nand',
    title: 'Build OR from NAND',
    goal: 'Output 1 when A OR B (or both) are 1.',
    inputLabels: ['A', 'B'],
    outputLabels: ['A OR B'],
    palette: ['NAND', 'NOT', 'AND'],
    truthTable: [
      { inputs: [0, 0], outputs: [0] },
      { inputs: [0, 1], outputs: [1] },
      { inputs: [1, 0], outputs: [1] },
      { inputs: [1, 1], outputs: [1] },
    ],
    intro: [
      'Worked example — AND from NAND: NAND(A,B) → NOT. You flipped the flip. AND is now yours.',
      'Now the clever one. Compare the tables: OR fails only on (0,0); NAND fails only on (1,1). They’re mirror images.',
      'The trick (De Morgan’s law in the wild): flip BOTH inputs first, THEN NAND them. Three gates.',
    ],
  },
  'xor-from-parts': {
    id: 'xor-from-parts',
    title: 'Build XOR',
    goal: 'Output 1 only when A and B are DIFFERENT.',
    inputLabels: ['A', 'B'],
    outputLabels: ['A XOR B'],
    palette: ['NAND', 'NOT', 'AND', 'OR'],
    truthTable: [
      { inputs: [0, 0], outputs: [0] },
      { inputs: [0, 1], outputs: [1] },
      { inputs: [1, 0], outputs: [1] },
      { inputs: [1, 1], outputs: [0] },
    ],
    intro: [
      'Worked example — OR from NAND: NOT A and NOT B into a NAND. Flipping inputs turned “not both” into “at least one”. De Morgan strikes.',
      'Final boss: XOR, the difference detector. In words: “A OR B… but NOT (A AND B)”.',
      'That sentence IS the circuit — an OR, an AND, a NOT and one more AND to combine them. (Other solutions exist; any circuit matching the table wins.)',
    ],
  },
}
