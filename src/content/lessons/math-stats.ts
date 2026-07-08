import type { Lesson } from '../../types'

export const mathStatsLesson: Lesson = {
  nodeId: 'math-stats',
  screens: [
    {
      kind: 'explain',
      title: 'How spread out is it?',
      body: [
        'An average tells you the center of a pile of numbers, but not how tightly they cluster. Two sensors can share an average of 50 cm and yet one reads 49–51 while the other swings 20–80.',
        'VARIANCE measures that spread: take each value’s distance from the mean, SQUARE it (so overs and unders don’t cancel), and average those squares. Bigger variance = wider scatter.',
        'The standard deviation is just √variance — the spread back in the original units (cm, not cm²).',
      ],
      deeper: [
        'Why square the deviations instead of taking absolute values? Squaring is smooth and differentiable (so calculus and least-squares work cleanly), it punishes big outliers more than small wobbles, and it makes variances of independent things simply ADD. That additivity is exactly why a Kalman filter tracks variances rather than raw errors.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Dataset A is {49, 50, 51} and dataset B is {30, 50, 70}. Both average 50. Which has the larger variance?',
      options: [
        'B — its values sit much farther from the mean, so its squared deviations are far bigger',
        'A — it has three values close together',
        'They are equal — both have the same mean of 50',
        'Neither — variance depends only on the mean',
      ],
      correctIndex: 0,
      reveal:
        'B is far more spread out. A’s deviations are {−1, 0, +1} → squares {1, 0, 1}, variance = 2/3 ≈ 0.67. B’s deviations are {−20, 0, +20} → squares {400, 0, 400}, variance = 800/3 ≈ 266.7. Same center, wildly different spread — which is exactly the information the mean throws away.',
    },
    {
      kind: 'explain',
      title: 'Do two things move together? Covariance',
      body: [
        'Now take TWO variables at once — say a motor’s current and its temperature. COVARIANCE asks: when one is above its mean, is the other usually above too? Multiply each pair of deviations (x−x̄)(y−ȳ) and average them.',
        'Positive covariance → they rise and fall together; negative → one up, other down; near zero → no linear relationship. But the raw number’s SIZE depends on the units, so it’s hard to read.',
        'CORRELATION fixes that: divide covariance by the two standard deviations to land in a clean [−1, +1]. +1 is a perfect upward line, −1 a perfect downward one, 0 no linear link.',
      ],
      deeper: [
        'Stack the variances and covariances of several variables into a grid — var on the diagonal, cov off it — and you get the COVARIANCE MATRIX. That single object is exactly how a Kalman filter stores “how uncertain am I about each state, and how are my uncertainties correlated?” The matrix is always symmetric (cov(x,y) = cov(y,x)) and positive-semidefinite (no direction has negative variance).',
      ],
      links: [
        { nodeId: 'robo-estimation', label: 'Where this leads: the Kalman covariance' },
        { nodeId: 'math-linalg-4', label: 'Related: least squares = fitting a line' },
      ],
    },
    {
      kind: 'predict',
      question:
        'Ice-cream sales and drowning deaths are strongly POSITIVELY correlated across the year. What’s the honest conclusion?',
      options: [
        'Correlation isn’t causation — a hidden third factor (summer heat) drives both up together',
        'Ice cream causes drowning; ban the ice cream',
        'Drowning causes people to buy ice cream',
        'The correlation must be a calculation error',
      ],
      correctIndex: 0,
      reveal:
        'Both are driven by a lurking variable: hot weather. Heat sends ice-cream sales AND swimming (hence drownings) up together, manufacturing a strong correlation with no direct causal link between the two. Correlation measures co-movement; it can never, by itself, prove which thing causes which — or whether either does.',
    },
    {
      kind: 'code',
      prompt:
        'Compute variance, covariance and correlation from scratch (population formulas: divide by n). Fill in the two missing sums, then check the result against the hand math for x = [1,2,3,4,5], y = [2,4,6,8,10] (y is exactly 2x, so they should be perfectly correlated).',
      starter: `function stats(x, y) {
  const n = x.length
  const mx = x.reduce((a, b) => a + b, 0) / n
  const my = y.reduce((a, b) => a + b, 0) / n
  let vx = 0, vy = 0, cov = 0
  for (let i = 0; i < n; i++) {
    vx += (x[i] - mx) ** 2 / n
    vy += (y[i] - my) ** 2 / n
    cov += 0 // fill in: (x[i] - mx) * (y[i] - my) / n
  }
  const corr = cov / Math.sqrt(vx * vy)
  print('var(x): ' + vx.toFixed(2))
  print('cov(x,y): ' + cov.toFixed(2))
  print('corr: ' + corr.toFixed(2))
}
stats([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])`,
      expected: `var(x): 2.00
cov(x,y): 4.00
corr: 1.00`,
      hint: 'Covariance multiplies the TWO deviations together: (x[i] − mx) × (y[i] − my), then divide by n and accumulate — just like variance but pairing x with y instead of x with itself.',
      success:
        'Perfect. var(x) = 2, cov(x,y) = 4, and corr = 1.00 — a flawless straight line, because y is exactly 2x. Notice variance is just covariance of a variable WITH ITSELF: cov(x,x) = var(x). You built the whole covariance-matrix machinery from three running sums.',
    },
    {
      kind: 'quiz',
      question: 'Why does the variance formula SQUARE each deviation from the mean?',
      options: [
        'So positive and negative deviations don’t cancel out — squaring makes every deviation contribute positively',
        'To convert the answer back into the original units',
        'Because squaring is required to make the mean equal to zero',
        'To make the variance always smaller than the mean',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: deviations above and below the mean would sum to exactly zero if left signed, so squaring makes them all positive and lets spread accumulate.',
        'Squaring puts you in SQUARED units (cm²); it’s the standard deviation (√variance) that returns to the original units.',
        'The deviations sum to zero because of how the mean is defined, not because of squaring — squaring is about preventing cancellation.',
        'Variance has no fixed size relationship to the mean; squaring is about signs, not magnitude comparisons.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two variables have a correlation of −0.9. What does that tell you?',
      options: [
        'They have a strong INVERSE linear relationship — when one is high, the other is usually low',
        'They are almost unrelated, since −0.9 is close to 0',
        'One variable causes the other to decrease',
        'The covariance must be exactly −0.9 as well',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: correlation near −1 means a strong downward line — the two move oppositely and tightly.',
        '−0.9 is close to −1, not 0 — it signals a STRONG relationship, just a negative one.',
        'Correlation shows co-movement, never causation; a lurking variable could drive both.',
        'Correlation is covariance NORMALIZED by the two standard deviations, so it generally differs from the raw covariance value.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What sits on the DIAGONAL of a covariance matrix?',
      options: [
        'The variance of each variable (since cov(x, x) = var(x))',
        'The correlations, which are always 1 on the diagonal',
        'The means of each variable',
        'Always zeros',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the (i, i) entry is cov(variable i, itself) = its variance; off-diagonal entries are the cross-covariances.',
        'The correlation MATRIX has 1s on its diagonal, but the covariance matrix has the variances there.',
        'Means aren’t stored in the covariance matrix at all — it captures spread and co-movement only.',
        'The diagonal holds variances, which are zero only if a variable never varies — generally they’re positive.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot fuses two sensors and reports its position uncertainty as a covariance matrix. Why a MATRIX rather than two separate variances?',
      options: [
        'The off-diagonal entries capture how the errors in x and y are correlated — “observe one, learn about the other”',
        'A matrix is just a tidier way to write two independent numbers',
        'Because all robotics code requires matrices for speed',
        'To store the sensor’s mean readings alongside the spread',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the cross-covariances encode correlation between the state variables, so a measurement of one can shrink uncertainty in another — the heart of sensor fusion.',
        'If the errors were truly independent the off-diagonals would be zero, but in general they aren’t — the matrix carries that extra coupling information.',
        'It’s about representing correlation, not raw performance — independent errors genuinely need only the diagonal.',
        'Means live elsewhere (in the state estimate); the covariance matrix stores only variances and covariances.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'What is the variance of the dataset {2, 4, 6} (population, divide by n)?',
      options: ['≈ 2.67', '4', '2', '8'],
      correctIndex: 0,
      explanations: [
        'Correct: mean = 4, deviations {−2, 0, 2}, squares {4, 0, 4}, sum 8, divided by n = 3 → 2.67.',
        '4 is the mean, not the variance — you still must average the squared deviations.',
        '2 is the standard deviation of a different set; here √2.67 ≈ 1.63, and the variance itself is 2.67.',
        '8 is the SUM of squared deviations before dividing by n = 3.',
      ],
    },
    {
      question:
        'For two variables, when one is above its mean the other is reliably BELOW its mean. What is the sign of their covariance?',
      options: ['Negative', 'Positive', 'Zero', 'It depends on the units'],
      correctIndex: 0,
      explanations: [
        'Correct: (x−x̄) positive paired with (y−ȳ) negative gives a negative product every time, so the average — the covariance — is negative.',
        'Positive covariance means they move TOGETHER; here they move oppositely.',
        'Zero covariance would mean no linear pattern, but there’s a clear consistent one here.',
        'The SIGN of covariance is unit-independent; only its magnitude scales with units.',
      ],
    },
    {
      question: 'Correlation is always squeezed into which range?',
      options: ['[−1, +1]', '[0, 1]', '[0, ∞)', 'Any real number'],
      correctIndex: 0,
      explanations: [
        'Correct: dividing covariance by both standard deviations normalizes it to lie between −1 and +1.',
        '[0, 1] misses negative correlations, which are perfectly valid (down-together patterns).',
        '[0, ∞) describes variance, not correlation — correlation is bounded.',
        'Raw COVARIANCE can be any real number; correlation is the bounded, unit-free version.',
      ],
    },
    {
      question:
        'A study finds cities with more firefighters have more fire damage. What’s the most likely explanation?',
      options: [
        'A lurking variable — bigger fires cause both more firefighters to be sent AND more damage; correlation isn’t causation',
        'Firefighters cause fire damage',
        'Fire damage hires firefighters directly',
        'The correlation is impossible and must be fake',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: fire SIZE drives both — larger fires summon more firefighters and cause more damage — so the two correlate without one causing the other.',
        'That reverses the logic absurdly; the firefighters are a response to the fire, not its cause.',
        'Damage doesn’t hire anyone; both are downstream of the fire’s severity.',
        'The correlation is real and easily explained by the lurking severity variable — that’s the whole lesson.',
      ],
    },
  ],
}
