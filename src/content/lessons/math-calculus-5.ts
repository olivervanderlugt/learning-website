import type { Lesson } from '../../types'

export const mathCalculus5Lesson: Lesson = {
  nodeId: 'math-calculus-5',
  screens: [
    {
      kind: 'explain',
      title: 'Reversing the derivative rules',
      body: [
        'You know what an integral IS (accumulated area). Now the goal is being able to EVALUATE one that isn’t obvious. The trick: every integration technique is a derivative rule run backwards.',
        'u-SUBSTITUTION undoes the chain rule. Spot an inside function whose derivative also appears in the integrand, rename it u, and the integral collapses. Example: ∫2x·cos(x²) dx — let u = x², so du = 2x dx, and it becomes ∫cos(u) du = sin(u) = sin(x²).',
        'The whole move is pattern-matching: "is there an inside function whose derivative is sitting right there as a factor?"',
      ],
      deeper: [
        'PARTIAL FRACTIONS is a third technique: split a messy rational function like 1/((x−1)(x+2)) into simple pieces A/(x−1) + B/(x+2), each of which integrates to a logarithm. It’s the same partial-fraction move used to solve linear ODEs — the calculus and differential-equations chains meet here.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Which substitution cracks ∫2x·e^(x²) dx in one step?',
      options: [
        'u = x²  (then du = 2x dx, and the integral becomes ∫e^u du)',
        'u = 2x  (then du = 2 dx)',
        'u = e^x',
        'It can’t be done with substitution',
      ],
      correctIndex: 0,
      reveal:
        'Let u = x². Then du = 2x dx — and that 2x dx is exactly sitting in the integral. It becomes ∫e^u du = e^u = e^(x²). u-substitution works precisely because the inside function’s derivative (2x) was already a factor, ready to be swallowed by du.',
    },
    {
      kind: 'explain',
      title: 'Integration by parts',
      body: [
        'When the integrand is a PRODUCT of two unrelated things (like x·eˣ), reach for integration by parts — the reverse of the product rule: ∫u dv = uv − ∫v du.',
        'Worked example: ∫x·eˣ dx. Choose u = x (because its derivative, 1, is simpler) and dv = eˣ dx (so v = eˣ). Then ∫x·eˣ dx = x·eˣ − ∫eˣ·1 dx = x·eˣ − eˣ = eˣ(x − 1).',
        'The art is the choice of u: pick the part that gets SIMPLER when differentiated, so the leftover integral ∫v du is easier than the one you started with.',
      ],
      deeper: [
        'A handy priority for choosing u is LIATE: Logs, Inverse-trig, Algebraic (powers of x), Trig, Exponential — earlier in the list makes the better u. For ∫x·ln(x) dx you pick u = ln x (a Log) even though x looks simpler, because differentiating ln x to 1/x is what tames the integral.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Finish ∫x·cos(x) dx by parts with u = x (du = dx) and dv = cos(x) dx (v = sin x): the formula gives x·sin(x) − ∫sin(x) dx. What is the completed result?',
      options: [
        'x·sin(x) + cos(x)',
        'x·sin(x) − cos(x)',
        'x·sin(x) − sin(x)',
        'x·cos(x) + sin(x)',
      ],
      correctIndex: 0,
      reveal:
        '∫sin(x) dx = −cos(x), so the formula gives x·sin(x) − (−cos(x)) = x·sin(x) + cos(x). The two minus signs (one from the parts formula, one from integrating sine) combine into a plus — a classic sign trap worth slowing down for.',
    },
    {
      kind: 'explain',
      title: 'Taylor series: any function as a polynomial',
      body: [
        'Here is the payoff. A Taylor series builds a polynomial that matches a function’s value AND all its derivatives at a point: f(x) ≈ f(a) + f′(a)(x − a) + f″(a)/2!·(x − a)² + … Around a = 0 this gives clean, famous series: eˣ = 1 + x + x²/2 + x³/6 + …, cos(x) = 1 − x²/2 + x⁴/24 − …, sin(x) = x − x³/6 + …',
        'Keep only the first two terms and you get LINEARIZATION: f(x) ≈ f(a) + f′(a)(x − a) — a straight-line stand-in that’s excellent near a. The small-angle approximations sin θ ≈ θ and cos θ ≈ 1 − θ²/2 are just truncated Taylor series.',
        'This is how a calculator or an IMU’s firmware actually computes sin and cos: sum a handful of polynomial terms. No magic hardware — just arithmetic.',
      ],
      deeper: [
        'That first-order term is the SAME linearization the robotics chains already lean on. An Extended Kalman Filter linearizes its nonlinear motion and sensor models with exactly the first Taylor term (the Jacobian) at each step; a controller is designed by linearizing the plant about an operating point. Taylor series is the mathematical license for both.',
      ],
      links: [
        { nodeId: 'robo-estimation-3', label: 'The EKF: first-order Taylor = the Jacobian step' },
        { nodeId: 'robo-control-3', label: 'State-space control linearizes about a point' },
        { nodeId: 'math-ode', label: 'Series solutions of differential equations' },
      ],
    },
    {
      kind: 'predict',
      question:
        'Using the two-term Taylor approximation cos(x) ≈ 1 − x²/2, estimate cos(0.1).',
      options: ['0.995', '0.9', '1.0', '0.005'],
      correctIndex: 0,
      reveal:
        '1 − (0.1)²/2 = 1 − 0.01/2 = 1 − 0.005 = 0.995. The true value is cos(0.1) = 0.995004… — two polynomial terms already nail it to five decimals. That accuracy near the expansion point is why linearization is so useful.',
    },
    {
      kind: 'code',
      prompt:
        'Watch a Taylor series converge. eˣ = 1 + x + x²/2 + x³/6 + … Each term is the previous one times x/n. Fill in that update so term becomes the next term, then run it at x = 1: the partial sums should climb toward e ≈ 2.718282.',
      starter: `const x = 1
let term = 1     // the n=0 term: x^0 / 0! = 1
let sum = term

for (let n = 1; n <= 12; n++) {
  term = term // fill in: term * x / n   (build the next term)
  sum = sum + term
  if (n === 1 || n === 3 || n === 6 || n === 12) print('first', n + 1, 'terms:', sum.toFixed(6))
}`,
      expected: `first 2 terms: 2.000000
first 4 terms: 2.666667
first 7 terms: 2.718056
first 13 terms: 2.718282`,
      hint: 'Turn term_(n−1) into term_n by multiplying: term = term * x / n.',
      success:
        'With just 13 terms the sum reaches 2.718282 — the value of e to six decimals. Each extra term shrinks fast (it carries another 1/n!), so a short polynomial approximates a transcendental function beautifully. This IS how eˣ, sin and cos get computed under the hood.',
    },
    {
      kind: 'quiz',
      question: 'Which technique is the natural first choice for ∫3x²·cos(x³) dx?',
      options: [
        'u-substitution with u = x³ (its derivative 3x² is already a factor)',
        'Integration by parts with u = cos(x³)',
        'Partial fractions',
        'It cannot be integrated by elementary methods',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: u = x³ gives du = 3x² dx, exactly the factor present, so the integral becomes ∫cos(u) du = sin(x³). The tell-tale sign is an inside function whose derivative sits alongside it.',
        'By parts is for products of unrelated factors; here the 3x² is the derivative of the inside function, which is the substitution signal, not a parts signal.',
        'Partial fractions is for rational functions (ratios of polynomials); there is no such ratio here.',
        'It integrates cleanly to sin(x³) via substitution — very much elementary.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'For ∫x·ln(x) dx by parts, which choice of u leads to a simpler leftover integral?',
      options: [
        'u = ln(x), dv = x dx  — differentiating ln(x) to 1/x tames the integral',
        'u = x, dv = ln(x) dx',
        'u = x·ln(x), dv = dx',
        'Either choice is equally good',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with u = ln x (du = dx/x) and dv = x dx (v = x²/2), the leftover ∫(x²/2)(1/x) dx = ∫x/2 dx is trivial. Differentiating the log is what simplifies things (the LIATE rule: Logs first).',
        'Taking dv = ln(x) dx requires already knowing ∫ln x dx — you’d be stuck integrating the harder piece.',
        'Choosing u = x·ln x throws away the point of parts; you haven’t split the product usefully.',
        'The choices are not equal — picking u = ln x is markedly easier, which is exactly what LIATE predicts.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What are the first three terms of the Taylor (Maclaurin) series of eˣ about x = 0?',
      options: [
        '1 + x + x²/2',
        '1 + x + x²',
        'x + x²/2 + x³/6',
        '1 − x + x²/2',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: eˣ = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + …, so the first three terms are 1 + x + x²/2.',
        'The x² term carries 1/2! = 1/2, not 1 — factorials in the denominator are what make the series converge.',
        'This drops the constant term: eˣ starts at 1 (since e⁰ = 1), so the series must begin with 1, not x.',
        'The signs alternate for cos or e^(−x), not for eˣ — every term of eˣ is positive.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'The first-order Taylor term f(a) + f′(a)(x − a) is exactly the "linearization" a robot’s Extended Kalman Filter uses at each step. Why is a first-order (straight-line) approximation good enough there?',
      options: [
        'Between tiny time-steps the state barely moves, so x stays near a — and near the expansion point the linear term dominates the error',
        'Because robot dynamics are always perfectly linear',
        'Because higher-order terms are impossible to compute',
        'Because the Kalman filter ignores the model entirely',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: over a small step the state stays close to the point you linearized about, where the neglected x² term is tiny. That is why the EKF re-linearizes every step — to keep x near a.',
        'Real robot dynamics are nonlinear (that is why it’s the EXTENDED Kalman filter); the trick is that linearization is only local.',
        'Higher-order terms are computable; they’re simply dropped because they’re negligible near the point, not because they’re impossible.',
        'The EKF relies heavily on the model — it linearizes the model each step; it does not ignore it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Evaluate ∫cos(x)·e^(sin(x)) dx.',
      options: [
        'e^(sin(x)) + C  (substitute u = sin x, du = cos x dx)',
        'sin(x)·e^(sin(x)) + C',
        'e^(cos(x)) + C',
        'It requires integration by parts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: u = sin x gives du = cos x dx, so the integral is ∫e^u du = e^u = e^(sin x). The cos x factor is precisely du.',
        'That would be the by-parts-style guess, but plain substitution already gives the clean answer e^(sin x).',
        'The exponent stays sin x, not cos x — you substitute the inside function sin x, whose derivative cos x is present.',
        'No parts needed: the derivative of the inside function is sitting right there, so substitution finishes it in one step.',
      ],
    },
    {
      question: 'Using cos(x) ≈ 1 − x²/2, estimate cos(0.2).',
      options: ['0.98', '0.96', '1.0', '0.9'],
      correctIndex: 0,
      explanations: [
        'Correct: 1 − (0.2)²/2 = 1 − 0.04/2 = 1 − 0.02 = 0.98 (true value 0.98007).',
        '0.96 would be 1 − 0.04, forgetting to divide the x² term by 2.',
        '1.0 is the zeroth-order guess (constant term only); the x²/2 correction pulls it down to 0.98.',
        '0.9 is far too low — the quadratic correction at x = 0.2 is only 0.02.',
      ],
    },
    {
      question: 'What is ∫x·sin(x) dx (by parts)?',
      options: [
        '−x·cos(x) + sin(x) + C',
        'x·cos(x) − sin(x) + C',
        '−x·cos(x) − sin(x) + C',
        'x·sin(x) + cos(x) + C',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: u = x (du = dx), dv = sin x dx (v = −cos x). Then ∫x·sin x dx = −x·cos x − ∫(−cos x) dx = −x·cos x + sin x.',
        'The leading sign is wrong: v = −cos x, so the uv term is −x·cos x, not +x·cos x.',
        'The leftover integral −∫(−cos x) dx = +∫cos x dx = +sin x, so the second term is +sin x, not −sin x.',
        'That is the answer to ∫x·cos x dx, a different integral — sine and cosine swap roles.',
      ],
    },
    {
      question:
        'A Taylor series for f centered at a is most accurate where?',
      options: [
        'For x close to a; the error grows as x moves away from the expansion point',
        'For x far from a; distance improves the fit',
        'Everywhere equally, for any number of terms',
        'Only exactly at x = a and nowhere else',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each dropped term carries a power of (x − a), so near a they vanish fastest — accuracy is best close to the center and degrades with distance.',
        'The opposite is true: the neglected (x − a)ⁿ terms grow as x moves away, so the fit worsens with distance.',
        'A truncated series is not uniformly accurate; it trades accuracy for simplicity, best near the center.',
        'It is exact at a, but a good approximation in a whole neighborhood around a — not only at the single point.',
      ],
    },
  ],
}
