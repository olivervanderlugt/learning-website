import type { Lesson } from '../../types'

export const adderLesson: Lesson = {
  nodeId: 'adder',
  screens: [
    {
      kind: 'explain',
      title: 'From logic to arithmetic',
      body: [
        'Gates make decisions. Today they learn to COUNT — you’re going to build the circuit that does addition, the workhorse of every processor.',
        'Binary addition has just four facts: 0+0=0, 0+1=1, 1+0=1, and 1+1=10 (that’s “zero, carry one” — like 7+5 on paper).',
        'That last fact is the whole puzzle: sometimes one column of addition produces TWO bits.',
      ],
    },
    {
      kind: 'predict',
      question: 'Your circuit adds two 1-bit numbers. Since 1+1 = binary 10, how many output wires does it need, and what do they mean?',
      options: [
        'One wire: the total',
        'Two wires: a sum bit and a carry bit',
        'Two wires: the two inputs echoed back',
        'Four wires: one per possible answer',
      ],
      correctIndex: 1,
      reveal:
        'Two wires it is: a SUM bit (the ones place) and a CARRY bit (the twos place). 1+1 → sum 0, carry 1. Exactly like writing 7+5=12: write the 2, carry the 1. Every adder in every chip is built around this split.',
    },
    {
      kind: 'predict',
      question:
        'Look at the sum bit only: 0+0→0, 0+1→1, 1+0→1, 1+1→0. Which gate from last lesson computes exactly that?',
      options: ['AND', 'OR', 'XOR', 'NAND'],
      correctIndex: 2,
      reveal:
        'It’s XOR — the difference detector outputs 1 exactly when the bits differ, which is precisely the sum column. And check the carry column: 0,0,0,1 — only on when BOTH inputs are 1. That’s AND. The adder was hiding in last lesson all along.',
      links: [{ nodeId: 'gates', label: 'Rebuild XOR & AND (The Logic of Gates)' }],
    },
    { kind: 'gatePuzzle', puzzleId: 'half-adder' },
    {
      kind: 'explain',
      title: 'Why “half”?',
      body: [
        'Add 6+7 on paper: the ones column makes a carry, and the TENS column must add three things — its own two digits plus that carry.',
        'Your half adder only takes two inputs, so it can only ever be the rightmost column. Every other column needs a third input for the incoming carry.',
        'That upgraded circuit is the full adder: 3 bits in (A, B, carry-in), 2 bits out (Sum, carry-out).',
      ],
    },
    {
      kind: 'predict',
      question: 'You already own half adders. What’s the cheapest way to build a FULL adder (A + B + carry-in)?',
      options: [
        'Impossible — you need a brand-new gate type',
        'Two half adders chained, plus an OR to merge their carries',
        'Three half adders in a triangle',
        'One half adder with doubled voltage',
      ],
      correctIndex: 1,
      reveal:
        'Half-add A and B, then half-add that result with the carry-in. Each half adder might produce a carry, but never both at once — so a single OR merges them into the carry-out. Engineering is exactly this: composing small proven blocks into bigger ones.',
    },
    { kind: 'gatePuzzle', puzzleId: 'full-adder' },
    {
      kind: 'explain',
      title: 'Chaining adders: the ripple',
      body: [
        'One full adder handles one column. To add 4-bit numbers, place four of them in a row and connect each carry-out to the next one’s carry-in.',
        'The carry “ripples” down the chain like a wave — each adder waiting for its neighbour. Now watch YOUR adder design compute a real sum.',
      ],
    },
    { kind: 'game', gameId: 'ripple-adder' },
    {
      kind: 'explain',
      title: 'This is literally how your laptop adds',
      body: [
        'Scale it up: 64 full adders instead of 4, and you have the adder inside a real 64-bit CPU. Subtraction, multiplication, even video decoding — all built on top of this circuit.',
        'Robot hook: when your robot fuses two sensor readings or increments a motor position, THIS circuit fires — millions of times per second, drawn microscopically in silicon.',
        'One fun fact for later: real chips use “carry-lookahead” tricks because the ripple is too slow at 64 bits. The problem you just felt (waiting for the carry) is a real engineering bottleneck.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a half adder, which gates produce the Sum and the Carry?',
      options: [
        'Sum: XOR, Carry: AND',
        'Sum: AND, Carry: XOR',
        'Sum: OR, Carry: AND',
        'Sum: XOR, Carry: OR',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: XOR matches the sum column (1 when bits differ) and AND matches the carry column (1 only for 1+1).',
        'Swapped: AND would make “sum” of 1+1 equal 1 — but 1+1 is 10, so the ones digit must be 0. XOR gives that; AND detects the carry case.',
        'OR gets 0+1 and 1+0 right but also outputs 1 for 1+1 — and the sum bit there must be 0. Only XOR matches all four rows.',
        'The carry only happens when BOTH bits are 1 — that’s AND. OR would wrongly carry on 0+1.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a FULL adder need three inputs?',
      options: [
        'To add three separate numbers at once',
        'Middle columns must also accept the carry from the previous column',
        'Three inputs make the circuit run faster',
        'One input is a spare in case a wire breaks',
      ],
      correctIndex: 1,
      explanations: [
        'It adds three BITS, but they’re not three numbers — two are digits of the numbers being added, the third is the carry rippling in from the column before.',
        'Correct: exactly like paper addition — every column after the first adds its two digits PLUS the incoming carry.',
        'The third input is about correctness, not speed — without it, every column except the rightmost computes the wrong answer.',
        'Chips have no spare wires — every input is load-bearing. The third is the carry-in.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a 4-bit ripple adder, why can’t all four full adders compute simultaneously?',
      options: [
        'They share a single power supply',
        'Each adder needs the carry-out of the previous one as its input',
        'Binary numbers must be processed left to right',
        'They actually do — the order never matters',
      ],
      correctIndex: 1,
      explanations: [
        'Power is shared but plentiful — the dependency is informational: adder 2 literally doesn’t know its third input until adder 1 finishes.',
        'Correct: the carry chain creates a dependency — each stage’s carry-in IS the previous stage’s carry-out. That waiting is the “ripple”, and it’s why wider adders get slower.',
        'It’s the opposite — addition starts at the RIGHT (ones column), like on paper. And the constraint isn’t convention, it’s the carry dependency.',
        'They can’t: give adder 2 a wrong carry-in and its sum bit is simply wrong. (Real chips “cheat” with carry-lookahead circuits that predict carries.)',
      ],
    },
    {
      kind: 'quiz',
      question: 'You add 1011 + 0001 (11 + 1). What happens in the rightmost column, and what does it pass left?',
      options: [
        '1+1: sum 0, carry 1 passes left',
        '1+1: sum 2 passes left',
        '1+1: sum 1, carry 1 passes left',
        'Nothing — the rightmost column has no carry logic',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 1+1 = binary 10 → sum bit 0 stays in that column, carry 1 ripples to the twos column (making 11+1 = 1100 = 12).',
        'There is no “2” in binary — a single wire carries 0 or 1 only. Two-ness is expressed as a carry into the next column.',
        'If both sum and carry were 1, that column would claim 1+1=3 (1 in the ones AND 2 passed left). It’s sum 0, carry 1.',
        'The rightmost column is where carries START — it’s the one place a half adder suffices, but it absolutely produces a carry-out.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which statement about your laptop’s adder is true?',
      options: [
        'It uses a completely different principle than your circuit',
        'It’s your full-adder design, scaled to 64 bits with speed tricks for the carry',
        'It adds in decimal using ten-state switches',
        'Addition is done by software, not a circuit',
      ],
      correctIndex: 1,
      explanations: [
        'The principle is identical — XORs for sums, ANDs and ORs for carries. Only the scale (64 bits) and carry-speed tricks differ.',
        'Correct: same Sum/Carry logic you wired, 64 columns wide, with carry-lookahead so it doesn’t wait for a 64-stage ripple.',
        'Everything is two-state switches — that’s the entire reason binary won (remember the reliability argument from Speaking in Switches).',
        'Software ultimately becomes instructions that trigger hardware — and “ADD” triggers exactly the gate circuit you built. Circuits do the work; software chooses when.',
      ],
    },
  ],
}
