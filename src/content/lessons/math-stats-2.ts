import type { Lesson } from '../../types'

export const mathStats2Lesson: Lesson = {
  nodeId: 'math-stats-2',
  screens: [
    {
      kind: 'explain',
      title: 'Averages are calmer than the things they average',
      body: [
        'Roll one die: the result jumps wildly between 1 and 6. Roll fifty and take the AVERAGE: it sits stubbornly near 3.5, almost every time. Averaging tames randomness.',
        'Two laws describe this. The Law of Large Numbers says the sample mean converges to the true mean as you collect more data — it tells you WHERE the average lands.',
        'The Central Limit Theorem tells you the SHAPE: no matter how weird the original distribution, the distribution of the sample mean becomes a bell curve (normal) as n grows.',
      ],
      deeper: [
        'The CLT is why the normal distribution is everywhere: almost anything that’s a sum or average of many small independent effects — measurement noise, human heights, exam scores — ends up bell-shaped, regardless of the messy processes underneath. It’s also why "add up lots of little errors" so often gives Gaussian noise, the exact assumption a Kalman filter is built on.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You average n dice rolls and plot that average, thousands of times, for larger and larger n. What happens to the histogram of averages?',
      options: [
        'It gets narrower AND more bell-shaped, tightening around 3.5',
        'It stays a flat, uniform block like a single die',
        'It spreads out wider as n grows',
        'It becomes two separate peaks',
      ],
      correctIndex: 0,
      reveal:
        'The histogram of averages narrows and turns into a bell — the Central Limit Theorem in action. A single die is uniform (flat), but the average of many is normal and increasingly concentrated near 3.5. The original shape is irrelevant; averaging manufactures a bell curve either way.',
    },
    {
      kind: 'explain',
      title: 'How fast does the error shrink? The √n law',
      body: [
        'The spread of the sample mean has its own name: the STANDARD ERROR, and it equals σ/√n, where σ is the spread of a single measurement and n is how many you averaged.',
        'That √n in the denominator is the crucial, humbling fact: to HALVE your error you need FOUR times the data; to make it 10× smaller you need 100× the data. Diminishing returns are baked in.',
        'This is exactly why averaging noisy sensor readings helps — and precisely how much: 100 readings are 10× more precise than one, not 100×.',
      ],
      deeper: [
        'A point estimate (like the sample mean) is one number; a CONFIDENCE INTERVAL wraps it in honest uncertainty. A rough 95% interval is estimate ± 2·SE — "the true value is plausibly within about two standard errors of what I measured." Widen the interval and you’re more confident it contains the truth; that trade-off between precision and confidence never goes away.',
      ],
      links: [
        { nodeId: 'math-prob', label: 'Refresher: the Law of Large Numbers coin sim' },
        { nodeId: 'robo-estimation', label: 'Where this leads: fusing noisy senses' },
      ],
    },
    {
      kind: 'predict',
      question:
        'One temperature reading has a standard deviation of 2°C. You average 16 readings. What is the standard error of that average?',
      options: [
        '0.5°C — SE = σ/√n = 2/√16 = 2/4',
        '2°C — averaging doesn’t change the spread',
        '0.125°C — divide by n = 16',
        '8°C — multiply by √n',
      ],
      correctIndex: 0,
      reveal:
        'SE = σ/√n = 2/√16 = 2/4 = 0.5°C. The common trap is dividing by n (giving 0.125) — but the law divides by √n. Sixteen readings cut the error by a factor of 4 (√16), not 16. That gap between 1/n intuition and the real 1/√n law is what the code screen makes concrete.',
    },
    {
      kind: 'code',
      prompt:
        'Compute the standard error SE = σ/√n for a fixed measurement spread σ = 10 across three sample sizes. Fill in the one missing line, then confirm the √n law: quadrupling n only halves the error.',
      starter: `function standardError(sigma, n) {
  const se = 0 // fill in: sigma / Math.sqrt(n)
  return se.toFixed(2)
}
const sigma = 10
print('n=1:   ' + standardError(sigma, 1))
print('n=4:   ' + standardError(sigma, 4))
print('n=100: ' + standardError(sigma, 100))`,
      expected: `n=1:   10.00
n=4:   5.00
n=100: 1.00`,
      hint: 'Divide sigma by the SQUARE ROOT of n — Math.sqrt(n) — not by n itself.',
      success:
        'The √n law made numeric: 1 sample → error 10, 4 samples → error 5 (quadruple the data, half the error), 100 samples → error 1 (100× the data for a 10× gain). Every robot that averages sensor readings, and every A/B test that needs "enough" users, is paying this exact √n toll.',
    },
    {
      kind: 'quiz',
      question: 'What does the Central Limit Theorem promise about the mean of many independent samples?',
      options: [
        'Its distribution approaches a normal (bell) curve, whatever the original distribution’s shape',
        'The original data becomes normally distributed',
        'The sample mean equals the true mean exactly',
        'Larger samples make the spread of individual data points shrink',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the CLT is about the SAMPLING DISTRIBUTION OF THE MEAN becoming normal, regardless of the underlying shape.',
        'The raw data keeps its own shape; it’s the distribution of the AVERAGE that turns normal.',
        'That’s the Law of Large Numbers’ limit, and even then only as n → ∞ — for finite n the sample mean merely hovers near the truth.',
        'Individual data spread σ is a fixed property; what shrinks with n is the spread of the MEAN (the standard error).',
      ],
    },
    {
      kind: 'quiz',
      question: 'The standard error of a sample mean is σ/√n. To cut your estimation error in HALF, you must…',
      options: [
        'Collect 4× as many samples',
        'Collect 2× as many samples',
        'Collect 16× as many samples',
        'You cannot reduce it by collecting more data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: SE ∝ 1/√n, so halving it needs √n to double, i.e. n to quadruple.',
        'Doubling n only shrinks the error by √2 ≈ 1.41×, not 2×.',
        '16× would cut the error to a QUARTER (√16 = 4), overshooting the goal of halving.',
        'More data absolutely helps — just at the diminishing 1/√n rate rather than 1/n.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the difference between the Law of Large Numbers and the Central Limit Theorem?',
      options: [
        'LLN says the sample mean CONVERGES to the true mean; CLT says HOW it’s distributed (normally) along the way',
        'They are two names for the same theorem',
        'LLN is about normal curves; CLT is about convergence',
        'CLT only applies to dice, LLN only to coins',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: LLN pins down the destination (the true mean); CLT describes the bell-shaped scatter of the sample mean around it.',
        'They’re distinct: one is about the limit value, the other about the distribution’s shape.',
        'That reverses them — LLN is convergence, CLT is the normal shape.',
        'Both are universal theorems about sums/averages of independent variables, not tied to any specific experiment.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A drone’s altimeter is noisy but UNBIASED (no systematic offset). Why does averaging many readings give a better altitude estimate?',
      options: [
        'Random errors scatter above and below the truth and partly cancel; the mean’s standard error falls as σ/√n',
        'Averaging removes bias from the sensor',
        'The newest reading is always the most accurate, so averaging locks it in',
        'It doesn’t help — one good reading is as accurate as the average',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with zero bias, the errors are symmetric noise that cancels on average, and the residual spread shrinks like 1/√n.',
        'Averaging fights RANDOM error, not bias — a systematic offset survives averaging untouched.',
        'Every reading here is equally noisy; recency confers no accuracy, and averaging beats any single one.',
        'The √n law guarantees the average is strictly more precise than a lone reading (for unbiased noise).',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A single measurement has σ = 12. What is the standard error after averaging n = 9 measurements?',
      options: ['4', '1.33', '12', '36'],
      correctIndex: 0,
      explanations: [
        'Correct: SE = σ/√n = 12/√9 = 12/3 = 4.',
        '1.33 divides by n = 9 instead of √9 — the classic 1/n-vs-1/√n slip.',
        '12 is the single-measurement spread; averaging must reduce it.',
        '36 multiplies rather than divides — the error goes DOWN with more data.',
      ],
    },
    {
      question:
        'You want to shrink a poll’s margin of error to one-third of its current value. Roughly how much more data do you need?',
      options: ['9× as many respondents', '3× as many', '6× as many', '1/3 as many'],
      correctIndex: 0,
      explanations: [
        'Correct: error ∝ 1/√n, so a 3× reduction needs √n to triple, i.e. n × 9.',
        '3× only shrinks the error by √3 ≈ 1.7×, not 3×.',
        '6× shrinks by √6 ≈ 2.4×, short of the 3× goal.',
        'Fewer respondents would INCREASE the margin of error, not shrink it.',
      ],
    },
    {
      question:
        'The average of thousands of samples from a heavily skewed (non-normal) distribution is plotted repeatedly. What shape does that plot of averages take?',
      options: [
        'Approximately normal (bell-shaped), by the Central Limit Theorem',
        'The same skewed shape as the original data',
        'Uniform (flat)',
        'Impossible to say without knowing the exact distribution',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the CLT makes the distribution of the mean bell-shaped even when the underlying data is skewed.',
        'The averages LOSE the skew — that’s the surprising power of the theorem.',
        'Averages concentrate into a bell, not a flat block.',
        'The CLT gives a definite answer — normal — precisely so you don’t need the underlying distribution.',
      ],
    },
    {
      question: 'A rough 95% confidence interval is estimate ± 2·SE. If the mean is 50 and SE = 1.5, the interval is about…',
      options: ['47 to 53', '48.5 to 51.5', '50 to 53', '35 to 65'],
      correctIndex: 0,
      explanations: [
        'Correct: 50 ± 2(1.5) = 50 ± 3, i.e. 47 to 53.',
        '48.5 to 51.5 uses ±1·SE (~68%), not the ±2·SE for ~95%.',
        'The interval is symmetric about the estimate — it extends BELOW 50 as well as above.',
        '35 to 65 uses ±10, far more than 2·SE = 3.',
      ],
    },
  ],
}
