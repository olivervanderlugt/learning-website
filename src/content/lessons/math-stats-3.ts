import type { Lesson } from '../../types'

export const mathStats3Lesson: Lesson = {
  nodeId: 'math-stats-3',
  screens: [
    {
      kind: 'explain',
      title: 'Is it real, or is it noise?',
      body: [
        'You tweak your robot’s controller and the average settling time drops from 2.0 s to 1.8 s. Real improvement, or just the luck of a few noisy runs? Hypothesis testing answers exactly this.',
        'You start from a NULL HYPOTHESIS — "nothing changed" — then measure how many standard errors your result sits from what the null predicts (a z- or t-statistic).',
        'From that distance you read a P-VALUE: the probability of seeing a result this extreme IF the null were true. Small p (say < 0.05) means "this would be a surprising fluke under the null," so you doubt the null.',
      ],
      deeper: [
        'The p-value’s #1 misconception: it is NOT the probability that the null is true. It’s the probability of the DATA (or something more extreme) GIVEN the null — a conditional in the other direction. p = 0.03 does not mean "3% chance there’s no effect"; it means "if there were truly no effect, data this extreme would happen only 3% of the time." Confusing P(data | null) with P(null | data) is the single most common statistical error.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A drug trial reports p = 0.04. Which statement is the correct reading?',
      options: [
        'If the drug truly did nothing, we’d see an effect this large only ~4% of the time — surprising enough to doubt "nothing"',
        'There is a 4% chance the drug does nothing',
        'There is a 96% chance the drug works',
        'The drug’s effect size is 0.04',
      ],
      correctIndex: 0,
      reveal:
        'The p-value is computed ASSUMING the null (no effect) is true, and measures how extreme the data would be under that assumption. It is P(data this extreme | null), not P(null | data). So "4% chance the drug does nothing" and "96% chance it works" both invert the conditional — a tempting but wrong flip. And p says nothing about effect SIZE, only about surprise under the null.',
    },
    {
      kind: 'explain',
      title: 'Regression: the best-fit line, tested',
      body: [
        'Often you don’t just compare two averages — you fit a LINE through a cloud of points: y ≈ slope·x + intercept. This is the same least-squares fit you met in linear algebra, now doing statistics.',
        'The slope has a tidy formula from lesson 1’s building blocks: slope = cov(x, y) / var(x), and intercept = ȳ − slope·x̄. The slope estimates "how much does y change per unit of x?"',
        'Then you can TEST that slope: is it significantly different from zero, or could a flat "no relationship" line explain the data just as well? Same p-value logic, applied to a slope.',
      ],
      deeper: [
        'R² (the coefficient of determination) reports what fraction of y’s variance the line explains — 1.0 is a perfect fit, 0 is no better than guessing ȳ. And a confidence interval for the slope is the dual of the test: if the 95% interval for the slope excludes 0, the slope is "significant" at p < 0.05. Test and interval are two views of the same evidence.',
      ],
      links: [
        { nodeId: 'math-linalg-4', label: 'Same fit: least squares & normal equations' },
        { nodeId: 'math-stats', label: 'Building blocks: covariance & variance' },
      ],
    },
    {
      kind: 'predict',
      question:
        'You fit a line to data and get slope = 0.02 with a 95% confidence interval of [−0.5, 0.54]. Is the relationship statistically significant?',
      options: [
        'No — the interval includes 0, so a flat (zero-slope) line is still plausible',
        'Yes — the slope is positive, so x drives y',
        'Yes — any nonzero slope estimate proves a relationship',
        'Impossible to tell from a confidence interval',
      ],
      correctIndex: 0,
      reveal:
        'The 95% interval [−0.5, 0.54] straddles 0, meaning "no relationship" (slope 0) is well within the plausible range — so the result is NOT significant. A point estimate of 0.02 looks nonzero, but its uncertainty swamps it. This interval-excludes-zero test is exactly equivalent to checking whether the slope’s p-value is below 0.05.',
    },
    {
      kind: 'code',
      prompt:
        'Fit a least-squares line using the covariance/variance formulas from lesson 1: slope = cov(x,y)/var(x), intercept = ȳ − slope·x̄. Fill in the missing slope line, then check the fit for the given points.',
      starter: `function fitLine(x, y) {
  const n = x.length
  const mx = x.reduce((a, b) => a + b, 0) / n
  const my = y.reduce((a, b) => a + b, 0) / n
  let cov = 0, varx = 0
  for (let i = 0; i < n; i++) {
    cov += (x[i] - mx) * (y[i] - my)
    varx += (x[i] - mx) ** 2
  }
  const slope = 0 // fill in: cov / varx
  const intercept = my - slope * mx
  print('slope: ' + slope.toFixed(2))
  print('intercept: ' + intercept.toFixed(2))
}
fitLine([0, 1, 2, 3, 4], [1, 3, 4, 6, 7])`,
      expected: `slope: 1.50
intercept: 1.20`,
      hint: 'slope = cov / varx (the /n cancels top and bottom, so you can leave both as raw sums). Then intercept = ȳ − slope·x̄, already wired for you.',
      success:
        'slope = 1.50, intercept = 1.20 — the best line through the cloud is y ≈ 1.5x + 1.2. This is the least-squares fit from linear algebra, now expressed purely in covariance and variance: slope = cov(x,y)/var(x). The exact toolkit for "does my input actually move my output, and by how much?"',
    },
    {
      kind: 'quiz',
      question: 'A p-value of 0.03 means…',
      options: [
        'If the null hypothesis were true, data this extreme would occur only 3% of the time',
        'There is a 3% probability the null hypothesis is true',
        'There is a 97% probability the alternative hypothesis is true',
        'The measured effect size is 3%',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the p-value is computed assuming the null, so it’s P(data this extreme | null) — a statement about the data, not about the null’s truth.',
        'That flips the conditional; p is NOT the probability the null is true (a Bayesian posterior, which also needs a prior).',
        'Same inversion error — p doesn’t give the probability the alternative is true.',
        'p-values measure surprise under the null, not the size of the effect; a tiny effect can have a small p with enough data.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In simple linear regression, the least-squares slope equals…',
      options: [
        'cov(x, y) / var(x)',
        'var(x) / cov(x, y)',
        'corr(x, y) always',
        'ȳ − x̄',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: slope = cov(x,y)/var(x) — rise in y per unit x, built from the covariance and the variance of x.',
        'That’s the reciprocal; dividing var(x) by covariance gives the wrong units and value.',
        'Correlation is the UNIT-FREE cousin (cov normalized by both SDs); the slope keeps y’s units per x’s units.',
        'ȳ − x̄ isn’t the slope; the intercept is ȳ − slope·x̄, a different quantity.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 95% confidence interval for a regression slope is [0.8, 1.6]. What can you conclude at the 5% level?',
      options: [
        'The slope is significantly different from 0 (the interval excludes 0), so x and y are linearly related',
        'The slope is not significant, because the interval is wide',
        'The slope is exactly 1.2, the midpoint',
        'Nothing — confidence intervals can’t be used for testing',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: since 0 lies OUTSIDE [0.8, 1.6], "no relationship" is implausible — equivalent to p < 0.05 for the slope.',
        'Width alone doesn’t decide significance; what matters is whether the interval contains 0, and this one doesn’t.',
        '1.2 is the point estimate, but the true slope is only known to lie somewhere in the interval with 95% confidence.',
        'An interval excluding the null value IS a hypothesis test — the two are dual views of the same evidence.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You lower a threshold to declare "significant" from p < 0.05 to p < 0.30 so more of your results pass. What have you done?',
      options: [
        'Made false positives far more likely — you’ll now call random noise "significant" ~30% of the time under the null',
        'Made your tests more rigorous',
        'Increased the effect size of your experiments',
        'Nothing meaningful; the threshold is arbitrary and harmless',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the threshold IS your false-positive rate under the null — 0.30 means a 30% chance of crying "effect!" when nothing is happening.',
        'A looser threshold is LESS rigorous — it waves through results that could easily be chance.',
        'Changing a decision cutoff doesn’t alter the real effect in your data at all.',
        'The threshold directly controls your false-positive rate, so inflating it is far from harmless.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A one-sample z-test uses z = (x̄ − μ₀)/(σ/√n). With x̄ = 52, μ₀ = 50, σ = 10, n = 25, what is z?',
      options: ['1.0', '2.0', '0.2', '5.0'],
      correctIndex: 0,
      explanations: [
        'Correct: σ/√n = 10/5 = 2, and (52 − 50)/2 = 1.0 — the sample mean sits one standard error above μ₀.',
        '2.0 forgets to divide by the standard error; that’s just the raw difference x̄ − μ₀.',
        '0.2 divides by n = 25 instead of the standard error σ/√n = 2.',
        '5.0 uses σ/√n in the numerator or divides wrongly; the correct standard error is 2, giving z = 1.',
      ],
    },
    {
      question:
        'Which is the correct interpretation of "the result was significant at p < 0.05"?',
      options: [
        'Under the null hypothesis, a result this extreme would arise less than 5% of the time',
        'There is less than a 5% chance the null hypothesis is true',
        'The experiment will replicate 95% of the time',
        'The effect is large and important',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: significance at 0.05 means the data would be this extreme under the null less than 5% of the time.',
        'That inverts the conditional — p is about the data given the null, not the probability the null is true.',
        'p-values say nothing about replication rates, which depend on power and true effect size.',
        'Statistical significance ≠ practical importance; a trivial effect can be significant with a big sample.',
      ],
    },
    {
      question: 'Data points (0,0), (1,2), (2,4) lie exactly on a line. What is the least-squares slope?',
      options: ['2', '1', '0.5', '4'],
      correctIndex: 0,
      explanations: [
        'Correct: y is exactly 2x, so the best-fit slope is 2 (a perfect fit with zero residual).',
        '1 would fit y = x, but these points double each step in y.',
        '0.5 is the reciprocal (x per y); the slope is rise-over-run = 2.',
        '4 overshoots; between x = 0 and x = 2, y rises by 4 over a run of 2, giving slope 2.',
      ],
    },
    {
      question:
        'A regression gives R² = 0.9. What does that mean?',
      options: [
        'The line explains 90% of the variance in y; the fit is strong',
        '90% of the data points lie exactly on the line',
        'The slope is 0.9',
        'There is a 90% chance the relationship is causal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: R² is the fraction of y’s variance the model accounts for — 0.9 means a strong, though not perfect, fit.',
        'R² is about variance explained, not the count of points exactly on the line (real data rarely sits exactly on it).',
        'R² and the slope are different quantities; a steep or shallow slope can each have any R².',
        'R² measures fit quality, never causation — a lurking variable can produce a high R² with no causal link.',
      ],
    },
  ],
}
