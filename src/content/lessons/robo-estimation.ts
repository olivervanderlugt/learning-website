import type { Lesson } from '../../types'

export const roboEstimationLesson: Lesson = {
  nodeId: 'robo-estimation',
  screens: [
    {
      kind: 'explain',
      title: 'Two guesses are better than one',
      body: [
        'A robot never knows exactly where it is. It has a PREDICTION (from its motion model: "I drove forward 1 m, so I should be here") and a MEASUREMENT (from a noisy sensor: "GPS says I’m over there"). Both are wrong, differently.',
        'The Kalman filter’s whole job is to fuse them into one estimate that is better than either alone — weighting each by how much you trust it.',
        'Trust is just uncertainty: a tight, confident guess pulls the answer toward itself; a vague one barely nudges it.',
      ],
      deeper: [
        'Represent each belief as a Gaussian — a mean (best guess) and a variance (how unsure). The magic fact: multiplying two Gaussians gives another Gaussian, whose mean sits between the two, closer to the more confident one, and whose variance is SMALLER than either input. Fusing information always sharpens the belief. That single fact IS the Kalman update.',
      ],
      links: [{ nodeId: 'math-prob-3', label: 'Refresher: Bayes’ Rule' }],
    },
    {
      kind: 'predict',
      question:
        'Your prediction says "position ≈ 10 m" and you trust it a lot. A cheap sensor says "12 m" but it’s very noisy. Where should the fused estimate land?',
      options: [
        'Close to 10 — the confident prediction dominates, nudged slightly toward 12',
        'Exactly at 11 — always split the difference',
        'Exactly at 12 — the newest reading wins',
        'Below 10 — averaging pulls it down',
      ],
      correctIndex: 0,
      reveal:
        'The estimate lands near 10, tugged a little toward 12. You only split the difference (11) when you trust both EQUALLY. The Kalman filter weights by certainty: a confident prediction barely moves for a noisy sensor, while a precise sensor would pull it most of the way over. "Split the difference" is just the special equal-trust case.',
    },
    {
      kind: 'explain',
      title: 'The Kalman gain',
      body: [
        'The weighting is one number: the Kalman gain K = σ²_pred / (σ²_pred + σ²_meas) — the prediction’s uncertainty as a fraction of the total.',
        'The fused estimate is: new = prediction + K·(measurement − prediction). K near 0 → ignore the sensor (trust the model); K near 1 → jump to the sensor (trust the measurement).',
        'And the fused uncertainty always shrinks: σ²_new = (1 − K)·σ²_pred. Every fusion makes you more certain.',
      ],
      deeper: [
        'K is a trust dial that sets itself from the variances — no hand-tuning. If your sensor gets noisier (σ²_meas grows), K shrinks and the filter automatically leans on its model instead; if the model drifts (σ²_pred grows), K rises toward 1 and the filter leans on the sensor. That automatic, uncertainty-driven rebalancing is why Kalman filters run in every drone, phone and spacecraft.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — prediction (mean 10, variance 4) and measurement (mean 12, variance 4), equal uncertainty. Compute K = 4/(4+4), then the fused mean = 10 + K·(12−10).',
      options: [
        'K = 0.5, fused mean = 11',
        'K = 1.0, fused mean = 12',
        'K = 0.25, fused mean = 10.5',
        'K = 0, fused mean = 10',
      ],
      correctIndex: 0,
      reveal:
        'K = 4/8 = 0.5, so fused mean = 10 + 0.5·2 = 11 — dead centre, because the two are equally trusted. The fused variance = (1−0.5)·4 = 2, HALF of either input: fusing two equally-good guesses makes you twice as certain.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — now the prediction is vague (variance 9) but the measurement is sharp (variance 1). Without computing exactly, where does K sit and which way does the estimate lean?',
      options: [
        'K is large (near 0.9) — the estimate leans hard toward the sharp measurement',
        'K is small (near 0.1) — the estimate stays near the prediction',
        'K = 0.5 — still a fair split',
        'K is negative — the estimate moves away from both',
      ],
      correctIndex: 0,
      reveal:
        'K = 9/(9+1) = 0.9 — the vague prediction gives way to the confident sensor, so the estimate jumps 90% of the way to the measurement. Uncertainty decides everything: the sharper source always wins the tug-of-war. (K can never be negative — variances are positive, so K is always between 0 and 1.)',
    },
    {
      kind: 'code',
      prompt:
        'Implement the 1D Kalman update yourself. Fill in the gain and the fused mean, then watch how the SAME two means fuse differently when you change which source you trust.',
      starter: `function fuse(mPred, vPred, mMeas, vMeas) {
  const K = 0 // fill in: vPred / (vPred + vMeas)
  const mNew = 0 // fill in: mPred + K * (mMeas - mPred)
  const vNew = (1 - K) * vPred
  return 'K=' + K.toFixed(2) + ' mean=' + mNew.toFixed(2) + ' var=' + vNew.toFixed(2)
}
print('equal trust:   ', fuse(10, 4, 12, 4))
print('trust sensor:  ', fuse(10, 9, 12, 1))`,
      expected: `equal trust:    K=0.50 mean=11.00 var=2.00
trust sensor:   K=0.90 mean=11.80 var=0.90`,
      hint: 'K = vPred / (vPred + vMeas), and mNew = mPred + K * (mMeas - mPred)',
      success:
        'Equal trust → K=0.50, estimate at 11.00 (the midpoint), variance halved to 2.00. Trust the sensor → K=0.90, estimate at 11.80 (90% of the way to 12), variance crushed to 0.90. Same two numbers, opposite outcomes — because the gain listened to the uncertainties, not the means. That is the entire soul of the Kalman filter.',
    },
    {
      kind: 'quiz',
      question: 'What does the Kalman filter fuse at each step?',
      options: [
        'A model-based prediction and a noisy measurement, weighted by their uncertainties',
        'Two identical sensor readings',
        'The past and the future position',
        'Only the most recent measurement, discarding history',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: predict from the motion model, then correct with the measurement, weighting each by how uncertain it is.',
        'The two sources are DIFFERENT in kind (a prediction and a measurement) — that’s why fusing them helps.',
        'It estimates the present state; it doesn’t fuse "the future," which isn’t observed.',
        'It carries a running belief forward — the prediction encodes all past information, so history is not discarded.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Kalman gain K is close to 1. What does the filter do?',
      options: [
        'Trusts the measurement heavily and jumps most of the way toward it',
        'Ignores the measurement and keeps the prediction',
        'Averages prediction and measurement equally',
        'Increases its uncertainty',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: K near 1 means the measurement is far more certain than the prediction, so the estimate moves almost entirely to the sensor.',
        'That’s K near 0 (trust the model, ignore a noisy sensor) — the opposite case.',
        'Equal averaging is K = 0.5 exactly, the special equal-trust case.',
        'Every update DECREASES uncertainty (σ²_new = (1−K)σ²_pred < σ²_pred) — fusing never makes you less sure.',
      ],
    },
    {
      kind: 'quiz',
      question: 'After a Kalman update, how does the estimate’s variance compare to before?',
      options: [
        'It shrinks — combining two sources of information is always more certain than one',
        'It grows — more data means more confusion',
        'It stays exactly the same',
        'It becomes negative',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: σ²_new = (1−K)·σ²_pred, and since 0 < K < 1, the new variance is strictly smaller — the update sharpens the belief.',
        'More independent information reduces uncertainty; it never adds confusion in this framework.',
        'It changes on every update (shrinks); staying the same would mean the measurement added nothing.',
        'Variance is a squared quantity — it can’t be negative; it approaches zero but never crosses it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is the Kalman filter often described as "Bayes’ rule for continuous state"?',
      options: [
        'It updates a prior belief (the prediction) with new evidence (the measurement) to get a posterior — Bayes, with Gaussians',
        'It has nothing to do with Bayes',
        'It only works for discrete coin-flip problems',
        'It replaces probability with fixed rules',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: prediction = prior, measurement = likelihood, fused estimate = posterior. The Gaussian math is just Bayes’ rule made continuous and efficient.',
        'It IS Bayes at its core — the prediction/measurement fusion is exactly prior × likelihood ∝ posterior.',
        'Bayes and the Kalman filter both handle continuous quantities like position — not just coin flips.',
        'It’s thoroughly probabilistic — the whole method reasons about uncertainty as variance.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your GPS suddenly becomes much noisier (its variance spikes). What happens to the Kalman gain, automatically?',
      options: [
        'K drops, so the filter leans more on its motion-model prediction until the sensor recovers',
        'K rises, so the filter trusts the bad GPS even more',
        'K stays fixed — it’s a hand-tuned constant',
        'The filter crashes without a valid measurement',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: bigger σ²_meas shrinks K = σ²_pred/(σ²_pred+σ²_meas), so the filter automatically down-weights the noisy sensor and coasts on its model.',
        'Trusting a noisier sensor MORE would be backwards — the gain moves the opposite way.',
        'K is computed from the variances every step, not hand-set — that self-tuning is the filter’s key strength.',
        'A noisy measurement is still usable; the filter just weights it less. It degrades gracefully, it doesn’t crash.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Prediction (mean 20, variance 2) fuses with measurement (mean 26, variance 2). What is the fused mean?',
      options: ['23', '20', '26', '46'],
      correctIndex: 0,
      explanations: [
        'Correct: equal variances → K = 2/4 = 0.5, fused mean = 20 + 0.5·(26−20) = 23, the midpoint.',
        '20 would mean ignoring the measurement (K=0) — but with equal trust the estimate moves halfway.',
        '26 would mean fully trusting the sensor (K=1) — again, equal trust gives the midpoint, not the extreme.',
        '46 adds the two means — fusion averages (weighted), it never sums them.',
      ],
    },
    {
      question: 'A Kalman gain of K = 0 means…',
      options: [
        'The measurement is infinitely noisy (useless), so the filter keeps its prediction unchanged',
        'The prediction is ignored entirely',
        'The estimate is perfect with zero uncertainty',
        'The filter has failed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: K = 0 happens when σ²_meas dominates — the sensor tells you nothing, so new = prediction + 0 = prediction.',
        'K = 0 keeps the prediction, not discards it; it’s K = 1 that discards the prediction.',
        'K = 0 says the measurement is worthless, not that the estimate is perfect — uncertainty stays at the prediction’s level.',
        'It’s a perfectly valid (if extreme) case — the filter simply relies on its model that step.',
      ],
    },
    {
      question: 'Why represent beliefs as Gaussians (mean + variance) specifically?',
      options: [
        'Multiplying two Gaussians gives a Gaussian, so the belief stays the same simple shape after every fusion',
        'Because Gaussians are the only probability distribution',
        'To make the robot move faster',
        'Because variance can be ignored',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Gaussians are "closed under multiplication" — fuse two and you get another Gaussian, so you only ever track a mean and a variance. That closure is what makes the filter fast and recursive.',
        'There are many distributions; Gaussians are chosen for their convenient closure and because sensor noise is often bell-shaped.',
        'The representation is about tracking uncertainty, not motion speed.',
        'Variance is the ENTIRE point — it encodes the trust that sets the gain.',
      ],
    },
    {
      question: 'Fusing prediction (mean 5, variance 1) with measurement (mean 5, variance 1) gives what variance?',
      options: ['0.5 — certainty improves even when the means agree', '1 — no change', '2 — uncertainty adds', '0 — perfect'],
      correctIndex: 0,
      explanations: [
        'Correct: K = 1/2, so σ²_new = (1−0.5)·1 = 0.5. Two independent agreeing sources make you MORE certain, even though the mean stays at 5.',
        'The variance always shrinks on fusion — agreement doesn’t mean "no new information," it means confirming information.',
        'Independent information reduces variance; it doesn’t add. Variances only add when you PROPAGATE a prediction forward, not when you fuse.',
        'It approaches zero with many measurements but never reaches it in a single fusion — here it’s 0.5.',
      ],
    },
  ],
}
