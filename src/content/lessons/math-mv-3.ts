import type { Lesson } from '../../types'

export const mathMv3Lesson: Lesson = {
  nodeId: 'math-mv-3',
  screens: [
    {
      kind: 'explain',
      title: 'Finding the bottom of the bowl',
      body: [
        'To minimize (or maximize) a multivariable function, look for its CRITICAL POINTS: places where the gradient is the zero vector, ∇f = 0. Every partial slope is flat, so no direction is downhill.',
        'A critical point can be a minimum (a bowl), a maximum (a dome), or a SADDLE — up in one direction, down in another, like a mountain pass. The gradient being zero doesn’t say which; a second-derivative test does.',
        'For f = x² + 3y², setting ∇f = [2x, 6y] = [0, 0] gives the single critical point (0, 0) — the bottom of the bowl.',
      ],
      deeper: [
        'The second-derivative test uses the HESSIAN, the matrix of second partials. Its eigenvalues (the eigenvector idea from the linear-algebra chain) classify the point: all positive ⇒ a minimum (bowl curves up every way), all negative ⇒ a maximum, mixed signs ⇒ a saddle. It’s the multivariable version of "f″ > 0 means a min" from single-variable calculus.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'The eigenvalue test uses this' }],
    },
    {
      kind: 'predict',
      question:
        'The function f(x, y) = x² − y² has gradient ∇f = [2x, −2y], which is zero only at the origin. Is (0, 0) a minimum, a maximum, or a saddle?',
      options: [
        'A saddle — f curves UP along x (x² term) but DOWN along y (−y² term)',
        'A minimum — the gradient is zero, so it must be the lowest point',
        'A maximum — the minus sign makes everything curve down',
        'None of these; a zero gradient means the function is flat everywhere',
      ],
      correctIndex: 0,
      reveal:
        'Walk along the x-axis: f = x², a valley curving up. Walk along the y-axis: f = −y², a ridge curving down. Up one way, down another — that’s a saddle. A zero gradient marks a critical point but NOT necessarily a minimum; this is the classic trap that a naive "set the derivative to zero" can walk right into.',
    },
    {
      kind: 'explain',
      title: 'Optimizing under a constraint: Lagrange',
      body: [
        'Real problems add a CONSTRAINT: minimize cost f(x, y) but stay on a budget line g(x, y) = 0. You usually can’t just set ∇f = 0 — the free minimum may be off-budget.',
        'Lagrange’s insight: at the constrained best point, the gradient of f is PARALLEL to the gradient of g, i.e. ∇f = λ·∇g for some number λ (the multiplier). Any leftover sideways slope along the constraint could still be exploited, so at the optimum none is left.',
        'This is how you minimize a controller’s effort subject to hitting a target, or fit a model subject to a limit on its weights.',
      ],
      deeper: [
        'Picture the level curves ("contour lines") of f and the constraint curve g = 0. As you slide along g, you cross to lower and lower contours of f until the constraint curve just KISSES a contour — touches without crossing. At that tangent point the two curves share a normal direction, which is exactly ∇f ∥ ∇g. The multiplier λ measures how hard the constraint is pushing back — the "shadow price" of relaxing the budget by one unit.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You run gradient descent on the bowl f = x² + 3y², stepping by −∇f = [−2x, −6y] each time. The y-direction is 3× steeper than the x-direction. Which coordinate will collapse to ~0 FIRST?',
      options: [
        'y — its steeper slope means each step shrinks it by a larger fraction',
        'x — the shallower direction always wins',
        'They reach zero at exactly the same step',
        'Neither ever reaches zero',
      ],
      correctIndex: 0,
      reveal:
        'Each step multiplies y by (1 − η·6) and x by (1 − η·2). With η = 0.1 that’s ×0.4 for y but ×0.8 for x — so y shrinks far faster and flattens first, while x crawls in. This lopsided crawl (fast in steep directions, slow in shallow ones) is why ill-scaled problems train slowly, and why preconditioning and adaptive step sizes exist. Watch it in the code screen.',
    },
    {
      kind: 'code',
      prompt:
        'Run gradient descent yourself on f(x, y) = x² + 3y² from the start (2, 2). Fill in the two update lines — each coordinate steps by −(learning rate)·(its partial) — and watch the steep y-axis empty out well before the shallow x-axis.',
      starter: `function descend(steps) {
  let x = 2, y = 2
  const eta = 0.1
  for (let i = 0; i < steps; i++) {
    x -= 0 // fill in: eta * 2 * x   (that's eta * df/dx)
    y -= 0 // fill in: eta * 6 * y   (that's eta * df/dy)
  }
  return 'x=' + x.toFixed(3) + ' y=' + y.toFixed(3)
}
print('after 10 steps: ' + descend(10))
print('after 40 steps: ' + descend(40))`,
      expected: `after 10 steps: x=0.215 y=0.000
after 40 steps: x=0.000 y=0.000`,
      hint: 'The partials of x² + 3y² are 2x and 6y. Each update subtracts eta times the matching partial.',
      success:
        'By step 10, y has already collapsed to 0.000 while x still sits at 0.215 — the steep direction emptied first, exactly as predicted. By step 40 both are at the minimum (0, 0). You just watched −∇f walk a surface downhill to its critical point: the whole of machine-learning training, in eight lines.',
    },
    {
      kind: 'quiz',
      question: 'What defines a critical point of a multivariable function f?',
      options: [
        'The gradient is the zero vector there: every partial derivative equals 0',
        'The function value is exactly zero there',
        'At least one partial derivative is very large',
        'The function is undefined there',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ∇f = 0 means the surface is locally flat in every direction — the candidate spots for maxima, minima and saddles.',
        'That’s where f = 0 (a root), unrelated to the SLOPE being zero.',
        'A large partial means a steep slope — the opposite of a critical point, where all slopes vanish.',
        'Critical points are where f is perfectly well-defined and flat, not where it breaks down.',
      ],
    },
    {
      kind: 'quiz',
      question: 'At a critical point, f increases in some directions and decreases in others. What is it?',
      options: ['A saddle point', 'A strict minimum', 'A strict maximum', 'Impossible — critical points are always minima'],
      correctIndex: 0,
      explanations: [
        'Correct: up some ways and down others is the defining feature of a saddle (think of a mountain pass or a Pringle).',
        'A minimum curves UP in every direction — no direction goes down.',
        'A maximum curves DOWN in every direction — no direction goes up.',
        'Many critical points are saddles or maxima; a zero gradient never guarantees a minimum on its own.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You must minimize f(x, y) while staying on the constraint curve g(x, y) = 0. What condition holds at the optimum (Lagrange’s method)?',
      options: [
        '∇f = λ·∇g — the gradients of f and g are parallel',
        '∇f = 0 — the unconstrained gradient must still vanish',
        'f = g at that point',
        'The constraint can be ignored at the optimum',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at the constrained optimum the contour of f is tangent to the constraint, so their gradients line up: ∇f = λ∇g.',
        'Forcing ∇f = 0 finds the FREE minimum, which generally sits off the constraint curve and isn’t allowed.',
        'Setting the function values equal (f = g) confuses values with gradients — Lagrange is about gradient DIRECTIONS matching.',
        'The constraint is exactly what binds the problem; ignoring it returns the wrong (unconstrained) answer.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Gradient descent on f = x² + 3y² moves toward the minimum by repeatedly stepping in which direction?',
      options: [
        '−∇f — opposite the gradient, i.e. [−2x, −6y]',
        '+∇f — along the gradient, [2x, 6y]',
        'A fixed direction [−1, −1] regardless of position',
        'Perpendicular to ∇f, along a contour',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: descent follows −∇f, the steepest-downhill direction, recomputed at each new point.',
        '+∇f climbs UPHILL — that’s gradient ascent, which would run away from the minimum.',
        'The step direction must track the local gradient; a fixed [−1, −1] ignores the surface’s actual shape.',
        'Moving perpendicular to ∇f follows a level curve and never changes f — you’d circle, never descend.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Find the critical point of f(x, y) = (x − 2)² + (y + 1)² by setting ∇f = 0.',
      options: ['(2, −1)', '(−2, 1)', '(0, 0)', '(2, 1)'],
      correctIndex: 0,
      explanations: [
        'Correct: ∇f = [2(x − 2), 2(y + 1)] = 0 gives x = 2 and y = −1 — the center of this shifted bowl.',
        'The signs are flipped — solving x − 2 = 0 gives x = +2, and y + 1 = 0 gives y = −1.',
        '(0, 0) is the critical point only for an unshifted bowl like x² + y²; this one is centered at (2, −1).',
        'The y-coordinate is wrong: y + 1 = 0 means y = −1, not +1.',
      ],
    },
    {
      question: 'For f(x, y) = x² + y², is the critical point (0, 0) a minimum, maximum, or saddle?',
      options: [
        'A minimum — f curves upward in every direction (both x² and y² are ≥ 0)',
        'A maximum',
        'A saddle',
        'Cannot be determined from the information given',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: x² + y² ≥ 0 with equality only at the origin, and it grows in every direction — a bowl, so (0, 0) is a strict minimum.',
        'A maximum would require f to curve DOWN away from the point; here it curves up.',
        'A saddle needs opposite curvatures; both terms curve up, so there’s no downhill direction.',
        'It’s fully determined: both second partials are positive (2 and 2), a clear minimum.',
      ],
    },
    {
      question:
        'In a Lagrange problem, the multiplier λ comes out large. What does a large λ intuitively mean?',
      options: [
        'The constraint is "expensive" — relaxing it slightly would improve the objective a lot (a high shadow price)',
        'The constraint is irrelevant to the optimum',
        'The objective f must be negative',
        'There is no valid solution',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: λ is the sensitivity of the optimal value to loosening the constraint — a big λ means the budget is tightly binding and worth a lot to relax.',
        'A large λ means the constraint is strongly ACTIVE, the opposite of irrelevant (an irrelevant constraint gives λ = 0).',
        'λ’s size says nothing about the sign of f; it measures the constraint’s pressure, not the objective’s value.',
        'A large λ is a perfectly ordinary, meaningful solution — it just flags a costly constraint.',
      ],
    },
    {
      question:
        'Gradient descent on a bowl that is far steeper in one direction than another tends to do what?',
      options: [
        'Progress fast along the steep axis but crawl along the shallow one, slowing overall convergence',
        'Converge equally fast in all directions',
        'Diverge and blow up every time',
        'Ignore the steep direction entirely',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the steep coordinate shrinks quickly while the shallow one inches along, so the slow axis bottlenecks convergence — the motivation for adaptive/scaled step sizes.',
        'Equal speed happens only on a perfectly round bowl; unequal steepness gives unequal progress.',
        'It diverges only if the learning rate is too large for the steepest direction; with a sensible η it converges, just unevenly.',
        'It still moves along the steep direction (in fact fastest there) — the problem is the SHALLOW direction lagging, not being ignored.',
      ],
    },
  ],
}
