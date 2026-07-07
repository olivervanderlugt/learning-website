import type { Lesson } from '../../types'

export const mathMvLesson: Lesson = {
  nodeId: 'math-mv',
  screens: [
    {
      kind: 'explain',
      title: 'Slopes in more than one direction',
      body: [
        'Single-variable calculus asks "how fast does f change as x changes?". But a robot’s cost, a hill’s height, a neural net’s loss all depend on MANY variables at once. Which way is "downhill" now?',
        'A PARTIAL derivative answers half the question: ∂f/∂x is the slope if you change x while holding every other variable frozen. Treat y as a constant and differentiate as usual.',
        'For f(x, y) = x² + 3y²: ∂f/∂x = 2x (y is frozen, so 3y² is a constant and vanishes), and ∂f/∂y = 6y.',
      ],
      deeper: [
        'Geometrically, f(x, y) is a surface — a landscape. Standing at a point, ∂f/∂x is the slope you feel walking due east; ∂f/∂y is the slope walking due north. Each partial is an ordinary 1-D derivative along one axis; nothing new to compute, you just have to say which direction you meant.',
      ],
    },
    {
      kind: 'predict',
      question:
        'For f(x, y) = x²·y (a product of both variables), what is ∂f/∂x — the slope in the x-direction with y held frozen?',
      options: [
        '2x·y — differentiate x² normally, and the frozen y just rides along as a constant multiplier',
        'x² — the y disappears entirely',
        '2x — treat the whole thing as x² and ignore y',
        'x²·y — nothing changes',
      ],
      correctIndex: 0,
      reveal:
        'Hold y frozen: f = (y)·x², and y is just a constant out front. d/dx of x² is 2x, so ∂f/∂x = 2x·y. The frozen variable does NOT vanish — it stays as a constant multiplier. (And by the same logic ∂f/∂y = x², since now x² is the frozen constant and d/dy of y is 1.)',
    },
    {
      kind: 'explain',
      title: 'Stack the partials into the gradient',
      body: [
        'Collect all the partials into one vector and you get the GRADIENT, written ∇f = [∂f/∂x, ∂f/∂y]. For f = x² + 3y² at the point (1, 2): ∇f = [2·1, 6·2] = [2, 12].',
        'The gradient is not just bookkeeping — it POINTS in the direction of steepest ascent, and its length says how steep. To go downhill (minimize), step in the OPPOSITE direction, −∇f.',
        'That single fact — "downhill is −∇f" — is the engine inside gradient descent, the workhorse that trains almost every machine-learning model.',
      ],
      deeper: [
        'Why does the gradient point the steepest way up? The slope in an arbitrary direction (a unit vector u) turns out to be the dot product ∇f · u. A dot product is largest when the two vectors are parallel — so the steepest direction IS the gradient’s own direction, and the maximum slope equals |∇f|. Every other direction is a cosine-shaded fraction of it.',
      ],
      links: [
        { nodeId: 'ai-learning', label: 'Where this leads: gradient descent' },
        { nodeId: 'math-calculus-2', label: 'Refresher: derivative rules' },
      ],
    },
    {
      kind: 'predict',
      question:
        'You are standing on the surface f(x, y) = x² + 3y² at the point (1, 2), where ∇f = [2, 12]. Which way should you step to DECREASE your height the fastest?',
      options: [
        'In the direction [−2, −12] — straight opposite the gradient',
        'In the direction [2, 12] — straight along the gradient',
        'In the direction [12, 2] — swap the components',
        'Any direction works equally; the surface is a bowl',
      ],
      correctIndex: 0,
      reveal:
        'The gradient [2, 12] points the steepest way UP, so the steepest way DOWN is exactly its negative, [−2, −12]. Notice it’s tilted much more toward the y-axis (−12 vs −2): the surface is three times steeper in y than in x, so the fastest descent leans hard in the y-direction. That imbalance is exactly what you’ll watch play out in the code screen.',
    },
    {
      kind: 'code',
      prompt:
        'Compute a gradient yourself — numerically, with no calculus rules, using the central-difference estimate of each partial: ∂f/∂x ≈ (f(x+h, y) − f(x−h, y)) / (2h). Fill in the two missing lines, then check the result against the hand-derived ∇f = [2x, 6y].',
      starter: `function gradient(f, x, y) {
  const h = 1e-5
  const fx = 0 // fill in: (f(x + h, y) - f(x - h, y)) / (2 * h)
  const fy = 0 // fill in: (f(x, y + h) - f(x, y - h)) / (2 * h)
  return fx.toFixed(2) + ', ' + fy.toFixed(2)
}
const f = (x, y) => x * x + 3 * y * y
print('grad at (1, 2): ' + gradient(f, 1, 2))
print('grad at (3, -1): ' + gradient(f, 3, -1))`,
      expected: `grad at (1, 2): 2.00, 12.00
grad at (3, -1): 6.00, -6.00`,
      hint: 'Each partial nudges only ONE argument by ±h and divides the change by 2h. fx nudges x; fy nudges y.',
      success:
        'Both match the calculus exactly: [2x, 6y] gives [2, 12] at (1, 2) and [6, −6] at (3, −1). You just computed a gradient from nothing but function evaluations — which is precisely how software gets slopes for functions too messy to differentiate by hand (a cheap cousin of what autodiff does inside every ML library).',
    },
    {
      kind: 'quiz',
      question: 'What does the partial derivative ∂f/∂x measure?',
      options: [
        'The rate of change of f as x varies, with all other variables held constant',
        'The rate of change of f as ALL variables vary together',
        'The total area under f',
        'The value of f at x = 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a partial freezes every variable except the one named, reducing a multivariable slope to an ordinary 1-D derivative along that axis.',
        'That would be the total derivative along a specific path — the whole point of a PARTIAL is that only one variable moves at a time.',
        'Area under a curve is an integral, the opposite operation — derivatives measure slope, not accumulation.',
        'A derivative is a rate of change, not a function value at a point; ∂f/∂x at a point is a slope there, not f itself.',
      ],
    },
    {
      kind: 'quiz',
      question: 'For f(x, y) = 3x + y², what is the gradient ∇f?',
      options: ['[3, 2y]', '[3x, 2y]', '[3, y]', '[3 + 2y]'],
      correctIndex: 0,
      explanations: [
        'Correct: ∂f/∂x = 3 (the y² term is constant in x), ∂f/∂y = 2y (the 3x term is constant in y), so ∇f = [3, 2y].',
        '∂f/∂x of 3x is 3, not 3x — the derivative of a linear term is its constant coefficient.',
        '∂f/∂y of y² is 2y, not y — apply the power rule to the y² term.',
        'The gradient is a VECTOR of the separate partials, not a single summed number.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'At a point the gradient of a loss function is ∇L = [4, −2]. In which direction does gradient DESCENT step (before scaling by a learning rate)?',
      options: [
        '[−4, 2] — opposite the gradient',
        '[4, −2] — along the gradient',
        '[2, −4] — the components swapped',
        '[0, 0] — descent never moves',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: descent moves along −∇L to reduce the loss, so [4, −2] becomes [−4, 2].',
        'Stepping ALONG the gradient increases the loss — that’s gradient ascent, the wrong way for minimization.',
        'Swapping components points in an unrelated direction; descent uses the exact negative of the gradient, component for component.',
        'A nonzero gradient means the surface is sloped, so there is a strictly downhill direction to move — descent only stalls where ∇L = 0.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The gradient ∇f of a surface always points…',
      options: [
        'In the direction of steepest ASCENT, with length equal to that steepest slope',
        'In the direction of steepest descent',
        'Horizontally, along a level contour',
        'Straight down toward the minimum, wherever you are',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ∇f points the steepest way uphill and |∇f| is how steep that is; the steepest way down is simply −∇f.',
        'That’s −∇f. The gradient itself points UP; you negate it to descend.',
        'The gradient is PERPENDICULAR to level contours, not along them — moving along a contour keeps f constant (zero slope).',
        'It points toward locally-higher ground, not toward the global minimum; only by repeatedly stepping DOWN (−∇f) do you drift toward a minimum.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'For f(x, y) = x·y + y³, what is ∂f/∂y?',
      options: ['x + 3y²', 'y + 3y²', 'x·y', '1 + 3y²'],
      correctIndex: 0,
      explanations: [
        'Correct: hold x frozen. ∂/∂y of x·y is x (x is a constant multiplier), and ∂/∂y of y³ is 3y², giving x + 3y².',
        'The first term’s partial is x, not y — with x frozen, x·y differentiates to x, the constant out front.',
        'That drops the y³ term entirely; its partial 3y² must be included.',
        '∂/∂y of x·y is x (the frozen constant), not 1 — 1 would be the partial of a bare y with no coefficient.',
      ],
    },
    {
      question: 'For f(x, y) = x² + 3y², what is the gradient at the point (2, 1)?',
      options: ['[4, 6]', '[2, 6]', '[4, 3]', '[4, 6y]'],
      correctIndex: 0,
      explanations: [
        'Correct: ∇f = [2x, 6y] = [2·2, 6·1] = [4, 6].',
        '∂f/∂x = 2x = 4 at x = 2, not 2 — you must plug in the point.',
        '∂f/∂y = 6y = 6 at y = 1, not 3 — the coefficient is 6 (from differentiating 3y²), not 3.',
        'Evaluate fully: at a specific POINT the gradient is a vector of numbers, so 6y must become 6·1 = 6.',
      ],
    },
    {
      question:
        'A hiker reads the gradient of the terrain as ∇h = [0, 0] at her feet. What does that tell her?',
      options: [
        'She is at a flat spot — a peak, a valley bottom, or a saddle (a critical point)',
        'She is on the steepest slope on the whole mountain',
        'The terrain is undefined there',
        'She must be at the exact summit',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a zero gradient means every partial slope is zero — locally flat. That’s a critical point, which could be a max, a min, or a saddle (telling them apart is the next chain’s job).',
        'Zero gradient is the FLATTEST possible reading, the opposite of steepest.',
        'A zero gradient is a perfectly ordinary, well-defined value — it just means no slope.',
        'It could be a summit, but equally a basin or a mountain pass — the gradient alone can’t distinguish them.',
      ],
    },
    {
      question:
        'Why is the gradient direction special compared to, say, the direction [∂f/∂y, ∂f/∂x] with the components swapped?',
      options: [
        'Only the true gradient [∂f/∂x, ∂f/∂y] gives the direction of maximum increase; swapping components points somewhere else entirely',
        'They are the same direction, just written differently',
        'The swapped version points downhill instead',
        'Swapping components always gives a perpendicular direction of equal steepness',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the steepest-ascent property holds for the gradient with its components in the RIGHT slots; permuting them yields an unrelated direction with no special meaning.',
        'They are equal only in the rare case ∂f/∂x = ∂f/∂y; in general they point different ways.',
        'The genuine downhill direction is −∇f (negate, don’t swap); swapping is simply wrong, not reversed.',
        'Swapping is perpendicular only for special functions and generally changes the steepness too — it is not a reliable geometric operation.',
      ],
    },
  ],
}
