import type { Lesson } from '../../types'

export const mathCalculus2Lesson: Lesson = {
  nodeId: 'math-calculus-2',
  screens: [
    {
      kind: 'explain',
      title: 'From intuition to computation',
      body: [
        'You already know the derivative IS the slope of a curve. Now the goal changes: stop dragging tangent lines by eye and start COMPUTING the derivative exactly, from the formula.',
        'Almost every function you meet is built from powers of x, so one rule does most of the work: the power rule. d/dx[xⁿ] = n·xⁿ⁻¹ — pull the exponent down in front, then subtract one from it.',
        'Example: d/dx[x³] = 3·x². The 3 comes down; the 3 becomes a 2.',
      ],
      deeper: [
        'Why n·xⁿ⁻¹? Expand (x+h)ⁿ with the binomial theorem: xⁿ + n·xⁿ⁻¹·h + (terms with h², h³, …). Subtract xⁿ, divide by h, and every leftover term still has an h in it.',
        'As h → 0 those h-terms vanish and only n·xⁿ⁻¹ survives. That’s the slope-explorer limit you already played with, done symbolically instead of by dragging.',
      ],
    },
    {
      kind: 'predict',
      question: 'Using the power rule d/dx[xⁿ] = n·xⁿ⁻¹, what is the derivative of x⁵?',
      options: ['5x⁴', 'x⁴', '5x⁵', '4x⁵'],
      correctIndex: 0,
      reveal:
        'Correct: bring the 5 down as a coefficient, then drop the exponent by one (5 → 4). So d/dx[x⁵] = 5x⁴. The two moves ALWAYS happen together — multiply by the old exponent, then subtract one from it.',
    },
    {
      kind: 'explain',
      title: 'Constants and sums',
      body: [
        'Two rules let you handle whole polynomials. Constant-multiple: a number sitting in front just rides along — d/dx[7x²] = 7·(2x) = 14x.',
        'Sum rule: differentiate a sum term by term — d/dx[x³ + x²] = 3x² + 2x. And any plain constant differentiates to 0 (a flat line has zero slope).',
        'Worked example: d/dx[4x³ − 2x + 9] = 12x² − 2 + 0 = 12x² − 2.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — finish the worked example. d/dx[6x² + 3x − 5] = 12x + ? − ?  (what fills the two blanks?)',
      options: [
        '3 and 0  →  12x + 3',
        '3 and 5  →  12x + 3 − 5',
        '0 and 0  →  12x',
        '6 and 5  →  12x + 6 − 5',
      ],
      correctIndex: 0,
      reveal:
        'Correct: 3x differentiates to 3 (the x becomes x⁰ = 1), and the constant −5 differentiates to 0 and disappears. So d/dx[6x² + 3x − 5] = 12x + 3.',
    },
    {
      kind: 'explain',
      title: 'The chain rule: rate × rate',
      body: [
        'What about a function INSIDE a function, like (2x + 1)³? You can’t just power-rule it — the “x” isn’t alone in the base.',
        'The chain rule: d/dx f(g(x)) = f′(g(x)) · g′(x). Differentiate the OUTER function (leaving the inside alone), then MULTIPLY by the derivative of the inside. It’s “rate times rate”.',
        'Worked: for (2x+1)³, outer is (…)³ → 3(2x+1)²; inner is 2x+1 → 2. Multiply: 3(2x+1)²·2 = 6(2x+1)².',
      ],
      deeper: [
        'Why multiply? Think units. A wheel’s travelled distance changes with its angle (metres per radian), and the angle changes with time (radians per second). How fast does distance change with TIME? Multiply the two rates: m/rad × rad/s = m/s — the rad cancels.',
        'That cancellation IS the chain rule. Composed functions chain their rates the same way gears chain their speeds.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Independent step — a wheel gives distance s = (3t)². Using the chain rule (outer squared → inner 3t), what is ds/dt?',
      options: ['18t', '9t', '6t', '3t²'],
      correctIndex: 0,
      reveal:
        'Correct: outer (…)² → 2·(3t) = 6t; inner 3t → 3; multiply: 6t · 3 = 18t. (Check: (3t)² = 9t², and d/dt[9t²] = 18t. Same answer — the chain rule and expanding-first must always agree.)',
    },
    {
      kind: 'code',
      prompt:
        'Prove the power rule numerically. The derivative is a limit of a slope: for tiny h, f′(x) ≈ (f(x+h) − f(x−h)) / (2h) — the “central difference”. With f(x)=x², the analytic answer is 2x. Fill in the numerator of the central-difference formula, then run it: at x=3 it should match 2·3 = 6.',
      starter: `function f(x) { return x * x }   // try changing this later

const x = 3
const h = 0.0001

// central difference: (f(x+h) - f(x-h)) / (2h)
const slope = (/* fill in the numerator */) / (2 * h)

print('Numeric derivative at x=3:', Math.round(slope))
print('Analytic 2x at x=3:', 2 * x)`,
      expected: `Numeric derivative at x=3: 6
Analytic 2x at x=3: 6`,
      hint: 'The numerator is f(x + h) minus f(x - h). Write it as: f(x + h) - f(x - h).',
      success:
        'The finite-difference slope lands on 6 — exactly 2·3, the power-rule answer. This is how a computer estimates a derivative when it can’t do the algebra: nudge the input a hair and measure the rise over run.',
    },
    {
      kind: 'quiz',
      question: 'What is the derivative of 5x⁴?',
      options: ['20x³', '5x³', '20x⁴', '4x³'],
      correctIndex: 0,
      explanations: [
        'Correct: constant-multiple keeps the 5, power rule turns x⁴ into 4x³, so 5·4x³ = 20x³.',
        'You forgot to bring the exponent 4 down and multiply — you only reduced the power. The coefficient must become 5·4 = 20.',
        'You kept the exponent at 4 instead of subtracting one. The power rule drops it: x⁴ → 4x³, not 4x⁴.',
        'You dropped the exponent correctly (x⁴ → x³) but ignored the 5 out front and forgot to multiply by the old exponent 4. It should be 5·4 = 20.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the derivative of 3x² + 8x − 7?',
      options: ['6x + 8', '6x + 8 − 7', '6x + 8x', '3x + 8'],
      correctIndex: 0,
      explanations: [
        'Correct: 3x² → 6x, 8x → 8, and the constant −7 → 0. Differentiate term by term: 6x + 8.',
        'You kept the −7. A constant differentiates to 0 (its graph is flat), so it drops out entirely.',
        'The 8x differentiates to just 8, not 8x — the x becomes x⁰ = 1. A linear term’s derivative is its slope, a plain number.',
        'You forgot to bring down the exponent on the first term: 3x² → 6x (multiply by 2), not 3x. And 8x → 8, not 8.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Using the chain rule, what is the derivative of (5x)³?',
      options: ['15(5x)²  =  375x²', '(5x)²', '3(5x)²  =  75x²', '5(5x)²'],
      correctIndex: 0,
      explanations: [
        'Correct: outer (…)³ → 3(5x)²; inner 5x → 5; multiply: 3(5x)²·5 = 15(5x)² = 375x². (Check: (5x)³ = 125x³, derivative 375x².)',
        'You differentiated the outer power but forgot both the exponent-3 out front AND the inner derivative. Missing 3 and the ·5 entirely.',
        'You applied the outer power rule (3(5x)²) but forgot to MULTIPLY by the inner derivative (5x)′ = 5. That missing ×5 is the whole point of the chain rule.',
        'You multiplied by the inner derivative 5 but forgot the exponent 3 from the outer power rule. Both factors are needed: 3 · 5 = 15.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A wheel’s angle is θ = 4t and its distance is s = 2θ. By the chain rule, how fast does distance change with time (ds/dt)?',
      options: [
        '8  (multiply the two rates: ds/dθ · dθ/dt = 2 · 4)',
        '2  (just ds/dθ)',
        '4  (just dθ/dt)',
        '6  (add the two rates: 2 + 4)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ds/dθ = 2 and dθ/dt = 4; the chain rule MULTIPLIES them: 2 · 4 = 8. Units chain too: (m/rad)·(rad/s) = m/s.',
        'That’s only ds/dθ — how distance changes per radian. You still need to account for how fast the angle itself moves with time.',
        'That’s only dθ/dt — how fast the angle turns. You ignored that each radian also produces 2 units of distance.',
        'The chain rule multiplies rates, it doesn’t add them. Think of gears: their speed ratios multiply. 2 · 4 = 8, not 6.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'What is the derivative of x⁷?',
      options: ['7x⁶', '7x⁷', 'x⁶', '6x⁷'],
      correctIndex: 0,
      explanations: [
        'Correct: power rule — bring the 7 down, drop the exponent by one: 7x⁶.',
        'You kept the exponent at 7 instead of subtracting one. x⁷ → 7x⁶.',
        'You dropped the exponent but forgot to multiply by the old exponent 7 out front.',
        'You brought a coefficient down but left the exponent at 7 and used the wrong number — it should be 7·x⁶.',
      ],
    },
    {
      question: 'What is the derivative of 10x³ − 4x + 2?',
      options: ['30x² − 4', '30x² − 4 + 2', '30x³ − 4', '10x² − 4'],
      correctIndex: 0,
      explanations: [
        'Correct: 10x³ → 30x², −4x → −4, constant 2 → 0. Term by term: 30x² − 4.',
        'You kept the constant 2. Constants differentiate to 0 and disappear.',
        'You forgot to drop the exponent on the first term: x³ → 3x² (so 30x²), not 30x³.',
        'You forgot to multiply the first term by its exponent 3: 10x³ → 30x², not 10x².',
      ],
    },
    {
      question: 'Using the chain rule, what is the derivative of (x² + 1)³?',
      options: ['3(x² + 1)² · 2x  =  6x(x² + 1)²', '3(x² + 1)²', '(x² + 1)² · 2x', '3(2x)²'],
      correctIndex: 0,
      explanations: [
        'Correct: outer (…)³ → 3(x²+1)²; inner x²+1 → 2x; multiply: 3(x²+1)²·2x = 6x(x²+1)².',
        'You did the outer power rule but forgot to multiply by the inner derivative 2x. That’s the chain rule’s whole job.',
        'You multiplied by the inner derivative 2x but forgot the exponent 3 from the outer power rule.',
        'You differentiated the inside and then squared it — but the outer power is the cube (→ 3·(…)²), applied to the whole (x²+1), not to 2x.',
      ],
    },
    {
      question: 'What is the derivative of the constant function f(x) = 42?',
      options: ['0', '42', '42x', '1'],
      correctIndex: 0,
      explanations: [
        'Correct: a constant is a flat horizontal line — zero slope everywhere — so its derivative is 0.',
        'That’s the function’s value, not its rate of change. A flat line isn’t changing, so its slope is 0.',
        'You treated 42 like a coefficient of x, but there’s no x here — it’s a constant, and its slope is 0.',
        'The derivative of x is 1, but this function has no x at all — it’s constant, so the derivative is 0.',
      ],
    },
  ],
}
