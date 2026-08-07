import type { Lesson } from '../../types'

export const mathCalculus4Lesson: Lesson = {
  nodeId: 'math-calculus-4',
  screens: [
    {
      kind: 'explain',
      title: 'What a limit really asks',
      body: [
        'A limit asks one thing: as x gets arbitrarily close to some point a, what single value does f(x) home in on? Crucially, this is NOT the same as f(a) — the two can differ, and f(a) may not even exist.',
        'The famous case: f(x) = sin(x)/x is 0/0 at x = 0, undefined there — yet as x shrinks the value marches steadily toward 1. We write lim(x→0) sin(x)/x = 1.',
        'The function has a hole at x = 0, but the limit sees straight through it to the value the curve is aiming at.',
      ],
      deeper: [
        '0/0 is called an INDETERMINATE form — the answer depends on HOW the top and bottom race to zero. x/x → 1, but x²/x → 0 and x/x² → ∞: all three are "0/0", all different.',
        'L’Hôpital’s rule makes this precise: if f/g → 0/0, the limit equals f′/g′. For sin(x)/x that’s cos(x)/1 → 1 — the same answer the numeric table will show you.',
      ],
    },
    {
      kind: 'predict',
      question:
        'As x → 0, what value does (x² − x)/x approach? (Hint: simplify first — factor the top.)',
      options: ['−1', '0', 'Undefined — it stays 0/0 forever', '1'],
      correctIndex: 0,
      reveal:
        'Factor the top: x(x − 1)/x. For every x ≠ 0 that cancels to just (x − 1), which heads to −1 as x → 0. The 0/0 at x = 0 was REMOVABLE — cancel the shared factor and the hidden limit appears.',
    },
    {
      kind: 'explain',
      title: 'Continuity: no holes, jumps, or blow-ups',
      body: [
        'f is continuous at a when three things line up: f(a) exists, the limit exists, and they’re equal — lim(x→a) f(x) = f(a). Intuitively, you can draw the curve through a without lifting your pen.',
        'Three ways it breaks: a removable HOLE (the limit exists but ≠ f(a), like the sin(x)/x point), a JUMP (the left and right sides approach different values), or a BLOW-UP to ∞ (like 1/x at 0).',
        'Worked example: (x² − 1)/(x − 1) is 0/0 at x = 1, but it simplifies to x + 1, so the limit there is 2. Patch f(1) = 2 and the hole is filled — the function becomes continuous.',
      ],
      deeper: [
        'The two-sided limit at a exists ONLY when the left limit (x → a⁻) and the right limit (x → a⁺) agree. If they disagree, there is no limit — that is exactly a jump.',
        'A perfect step input to a controller is a jump discontinuity: left limit 0, right limit 1, no two-sided limit. That’s the mathematical reason a real motor can only ever approximate a step — it cannot be in two places at one instant.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A thermostat’s display jumps from 19° straight to 21° at exactly noon, showing nothing in between. Treating the reading as a function of time, at noon it has…',
      options: [
        'A jump discontinuity — the left and right limits disagree, so no two-sided limit exists',
        'A removable hole you can patch with one value',
        'Perfect continuity — the reading is always defined',
        'A blow-up to infinity',
      ],
      correctIndex: 0,
      reveal:
        'Approaching noon from before, the reading heads to 19; from after, to 21. The two one-sided limits disagree, so there is no single limit — a JUMP. No single patch value can heal it (unlike a removable hole, where both sides agree on one number).',
    },
    {
      kind: 'predict',
      question:
        'The derivative f′(a) is defined as the limit of the average slope [f(a+h) − f(a)]/h as h → 0. Why must it be a LIMIT instead of just setting h = 0?',
      options: [
        'At h = 0 the slope formula becomes 0/0 — undefined; the limit extracts the value it approaches',
        'Because h is only ever allowed to be negative',
        'Because every derivative is secretly an integral',
        'Because f(a) is always a hole',
      ],
      correctIndex: 0,
      reveal:
        'Set h = 0 and you get [f(a) − f(a)]/0 = 0/0 — meaningless. The entire idea of the derivative is taking that limit: shrink h toward 0 without ever setting it there, exactly the sin(x)/x move. Limits are what make calculus possible at all.',
    },
    {
      kind: 'code',
      prompt:
        'See a limit happen. f(x) = sin(x)/x is undefined at x = 0 (it’s 0/0), but the limit is 1. Fill in the ratio the function returns, then run it: as x shrinks toward the hole, the printed value should climb toward 1.00000.',
      starter: `function f(x) {
  // the ratio whose limit at the hole x=0 we are probing:
  return 0 // fill in: Math.sin(x) / x
}

const xs = [1, 0.1, 0.01, 0.001]
for (const x of xs) print('x =', x, '->', f(x).toFixed(5))`,
      expected: `x = 1 -> 0.84147
x = 0.1 -> 0.99833
x = 0.01 -> 0.99998
x = 0.001 -> 1.00000`,
      hint: 'Return the ratio Math.sin(x) / x.',
      success:
        'The value never actually reaches x = 0 — the function is undefined there — yet the outputs march 0.84147 → 0.99833 → 0.99998 → 1.00000, closing in on 1. That marching-toward IS the limit. It’s also precisely how the derivative extracts a slope: shrink the step, read off what the ratio approaches.',
    },
    {
      kind: 'quiz',
      question: 'What is lim(x→3) (x² − 9)/(x − 3)?',
      options: ['6', '0', 'Undefined — it is 0/0', '3'],
      correctIndex: 0,
      explanations: [
        'Correct: factor the top as (x − 3)(x + 3), cancel the (x − 3), and you are left with x + 3 → 6 as x → 3.',
        'The expression is 0/0 at x = 3, but that does not make the limit 0 — after cancelling, it approaches 6.',
        '0/0 is only the naive plug-in; the removable factor cancels and the real limit is 6. "Indeterminate" means "look closer", not "no answer".',
        '3 is the point x is approaching, not the value of the expression there — after simplifying to x + 3 you get 6.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A function has left limit 4 and right limit 4 at x = 2, but f(2) itself is defined as 9. What kind of point is x = 2?',
      options: [
        'A removable discontinuity — the limit (4) exists but disagrees with f(2); redefine f(2) = 4 to heal it',
        'A jump discontinuity — the two sides disagree',
        'Perfectly continuous — a limit exists, so all is well',
        'A blow-up — the function goes to infinity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: both sides agree on 4, so the limit is 4, but f(2) = 9 sits off the curve — a single misplaced point. Redefining f(2) = 4 fills the hole and restores continuity.',
        'A jump needs the two one-sided limits to DISAGREE; here they both equal 4, so it is removable, not a jump.',
        'Continuity requires lim = f(2); here 4 ≠ 9, so it is discontinuous — just healably so.',
        'Nothing goes to infinity — the limit is a finite 4; only the assigned value at the point is wrong.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which statement about the function f(x) = 1/x at x = 0 is correct?',
      options: [
        'It has a non-removable (infinite) discontinuity — the values blow up to ±∞, so no finite limit exists',
        'It has a removable hole you can patch with a single value',
        'It is continuous at x = 0',
        'Its left and right limits are equal and finite',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: as x → 0⁺ the values shoot to +∞ and as x → 0⁻ to −∞. There is no finite value to patch — this is an infinite (essential) discontinuity, not a hole.',
        'A removable hole needs a finite two-sided limit to patch to; 1/x has none — it diverges.',
        'f is not even defined at 0 and the values are unbounded nearby, so it is emphatically discontinuous there.',
        'The one-sided limits are +∞ and −∞ — neither finite nor equal.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why does the limit lim(x→0) sin(x)/x need to be computed as a limit rather than by direct substitution?',
      options: [
        'Direct substitution gives sin(0)/0 = 0/0, which is indeterminate — the limit resolves what substitution cannot',
        'Because sin(x) is negative near 0',
        'Because the answer is actually undefined and the limit is a trick',
        'Because sin(x)/x equals 1 for every x, so substitution is unnecessary',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: plugging in x = 0 yields 0/0, an indeterminate form. Only by watching the ratio as x → 0 (a table, or L’Hôpital) do you see it settle on 1.',
        'Near 0, sin(x) has the same sign as x, so the ratio is positive — sign is not the issue; the 0/0 form is.',
        'The limit genuinely exists and equals 1 — it is not a trick; substitution just fails on 0/0 forms.',
        'sin(x)/x is NOT 1 for other x (at x = 1 it is 0.841); it only APPROACHES 1 as x → 0, which is why the limit matters.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Evaluate lim(x→0) (5x)/x.',
      options: ['5', '0', '1', 'Undefined'],
      correctIndex: 0,
      explanations: [
        'Correct: for x ≠ 0 the x’s cancel, leaving the constant 5 — so the limit is 5.',
        'It is 0/0 at x = 0, but cancelling gives 5, not 0.',
        '1 would be the answer to x/x; here the extra factor of 5 rides along.',
        'The 0/0 form is removable — cancel and the limit is a clean 5.',
      ],
    },
    {
      question:
        'A function has left limit 2 and right limit 7 at x = 1. What can you say about lim(x→1) f(x)?',
      options: [
        'It does not exist — the one-sided limits disagree',
        'It equals 4.5, the average of the two sides',
        'It equals 2, always taking the left side',
        'It equals 7, always taking the right side',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a two-sided limit exists only when both one-sided limits agree. 2 ≠ 7, so there is no limit — a jump.',
        'A limit is never the average of disagreeing sides; when they differ, it simply does not exist.',
        'There is no rule that the limit defaults to the left value — disagreement means no limit at all.',
        'Likewise there is no default to the right value; the two-sided limit is undefined here.',
      ],
    },
    {
      question:
        'For what value of k is f continuous at x = 2, if f(x) = (x² − 4)/(x − 2) for x ≠ 2 and f(2) = k?',
      options: ['k = 4', 'k = 0', 'k = 2', 'No value of k works'],
      correctIndex: 0,
      explanations: [
        'Correct: (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2, whose limit at x = 2 is 4. Set k = 4 to match the limit and heal the hole.',
        'k = 0 is the naive 0/0; the actual limit after cancelling is 4.',
        'k = 2 is the point being approached, not the limit value (which is x + 2 → 4).',
        'The discontinuity is removable, so exactly one k works: k = 4.',
      ],
    },
    {
      question:
        'Which of these functions is continuous everywhere (no holes, jumps, or blow-ups)?',
      options: [
        'f(x) = 3x² − x + 1 (a polynomial)',
        'f(x) = 1/(x − 2)',
        'f(x) = (x² − 1)/(x − 1)',
        'A step function that is 0 for x < 0 and 1 for x ≥ 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every polynomial is continuous for all x — you can draw it without lifting the pen anywhere.',
        '1/(x − 2) blows up at x = 2 (infinite discontinuity).',
        '(x² − 1)/(x − 1) has a removable hole at x = 1 (it is 0/0 there).',
        'The step function has a jump at x = 0 — its left and right limits disagree.',
      ],
    },
  ],
}
