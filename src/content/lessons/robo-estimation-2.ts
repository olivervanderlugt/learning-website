import type { Lesson } from '../../types'

export const roboEstimation2Lesson: Lesson = {
  nodeId: 'robo-estimation-2',
  screens: [
    {
      kind: 'explain',
      title: 'From one number to a state vector',
      body: [
        'Real robots track more than one number: position AND velocity, or x, y and heading. So the mean becomes a state VECTOR, and the single variance becomes a COVARIANCE MATRIX P.',
        'P’s diagonal holds each variable’s own uncertainty; its off-diagonal entries capture how they’re CORRELATED — e.g. "if I’m wrong about velocity, I’m probably wrong about position too."',
        'The 1D update you built generalizes exactly: same predict-then-correct, now with matrices.',
      ],
      deeper: [
        'The full loop: PREDICT pushes the state through the motion model (x ← A·x, the same A from state-space control) and GROWS the covariance (P ← A·P·Aᵀ + Q, adding process noise Q). UPDATE folds in a measurement, computing the matrix Kalman gain K and SHRINKING P. Predict inflates uncertainty as you coast blind; update deflates it when data arrives. The robot’s confidence literally breathes in and out.',
      ],
      links: [{ nodeId: 'robo-control-3', label: 'Refresher: State-space (x′ = A·x + B·u)' }],
    },
    {
      kind: 'predict',
      question:
        'A robot drives for 5 seconds with NO sensor updates, using only its motion model to predict. What happens to its position covariance (uncertainty)?',
      options: [
        'It grows — each blind prediction step adds process noise, so confidence decays',
        'It shrinks — moving makes the robot more certain',
        'It stays constant — prediction doesn’t change uncertainty',
        'It drops to zero',
      ],
      correctIndex: 0,
      reveal:
        'Coasting on prediction alone, uncertainty GROWS every step (P ← A·P·Aᵀ + Q). Wheels slip, models are imperfect — dead reckoning drifts, and the covariance ellipse balloons. Only a measurement (the update step) can shrink it back down. This predict-grows / update-shrinks rhythm is the heartbeat of the filter.',
    },
    {
      kind: 'explain',
      title: 'Covariance is an uncertainty ellipse',
      body: [
        'For a 2D position, the covariance matrix P draws an uncertainty ELLIPSE: big where you’re unsure, thin where you’re confident, tilted when errors are correlated.',
        'A GPS fix (good sideways, poor forward) and a lane sensor (good forward, poor sideways) have ellipses stretched in different directions.',
        'Fuse them and the combined ellipse is smaller than either — you inherit the best axis of each. That is sensor fusion’s superpower: complementary sensors covering each other’s blind spots.',
      ],
      deeper: [
        'The off-diagonal covariance is what lets a measurement of ONE variable improve another. Measure only position, and if position and velocity are correlated in P, the update corrects your velocity estimate too — for free, without ever measuring velocity. That "observe one, fix many" leverage is why the full-matrix filter beats running separate 1D filters per variable.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — you fuse the same measurement into an estimate three times in a row (no motion between). Each update uses measurement variance 2. Starting from variance 10, does the uncertainty keep dropping?',
      options: [
        'Yes — each update shrinks it further (10 → 1.67 → 0.91 → 0.63), with diminishing returns',
        'No — after the first update it stays flat',
        'It grows back between updates',
        'It drops straight to zero on the first update',
      ],
      correctIndex: 0,
      reveal:
        'Each update adds information, so variance keeps falling: 10 → 1.67 → 0.91 → 0.63. But notice the DIMINISHING returns — the first measurement helps enormously, the third barely moves it. Once you’re confident, extra measurements of the same thing add little. (In a real moving robot, the predict step would inflate it back up between updates.)',
    },
    {
      kind: 'predict',
      question:
        'Independent step — a drone’s covariance ellipse is a long thin cigar: tiny sideways uncertainty, huge forward uncertainty. Which new sensor helps MOST?',
      options: [
        'One that measures the FORWARD direction well — it collapses the ellipse’s long axis',
        'One that measures sideways well — the direction it’s already sure about',
        'Any sensor helps equally, regardless of direction',
        'No sensor can change the ellipse shape',
      ],
      correctIndex: 0,
      reveal:
        'Attack the long axis. The drone is already sure sideways, so a sideways sensor adds little; a forward-measuring sensor collapses the direction of greatest ignorance. Good sensor suites are chosen precisely so each covers another’s worst axis — the covariance matrix tells you exactly where the blind spots are.',
    },
    {
      kind: 'code',
      prompt:
        'Watch covariance shrink under repeated updates. Fill in the information-form update (1/variance adds up), then fuse the same measurement three times and print the variance after each.',
      starter: `function repeatedUpdate(startVar, measVar, n) {
  let v = startVar
  const out = []
  for (let i = 0; i < n; i++) {
    v = 0 // fill in: 1 / (1 / v + 1 / measVar)
    out.push(v.toFixed(2))
  }
  return out.join(' -> ')
}
print('variance:', repeatedUpdate(10, 2, 3))`,
      expected: `variance: 1.67 -> 0.91 -> 0.63`,
      hint: 'In information form, precisions (1/variance) add: v = 1 / (1 / v + 1 / measVar)',
      success:
        'Variance falls 10 → 1.67 → 0.91 → 0.63. The trick: precisions (1/variance) simply ADD when you fuse independent information, so three measurements of variance 2 contribute 1/2 each on top of the prior’s 1/10. The first update dominates; later ones show diminishing returns — a real robot must keep MOVING and re-measuring to fight the predict step pushing uncertainty back up.',
    },
    {
      kind: 'quiz',
      question: 'In a multivariate Kalman filter, what does the covariance matrix P represent?',
      options: [
        'The uncertainty of each state variable AND the correlations between them',
        'The robot’s exact position',
        'The motor torques',
        'The number of sensors',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: P’s diagonal is each variable’s variance; its off-diagonals encode how their errors correlate — the full shape of the uncertainty.',
        'The state VECTOR holds the best-guess position; P holds the uncertainty AROUND it, not the position itself.',
        'Torques belong to dynamics/control; P is purely about estimation uncertainty.',
        'P’s size relates to the number of state variables, not the number of sensors.',
      ],
    },
    {
      kind: 'quiz',
      question: 'During the PREDICT step (moving with no measurement), the covariance P…',
      options: [
        'Grows — process noise Q is added, so the robot gets less certain',
        'Shrinks — motion adds information',
        'Is unchanged',
        'Becomes the identity matrix',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: P ← A·P·Aᵀ + Q inflates uncertainty each blind step — dead reckoning drifts.',
        'Motion without measurement adds no information; it can only erode certainty.',
        'Predict actively changes P (grows it); only a perfect noise-free model would leave it merely rotated.',
        'There’s no reason P becomes the identity — it evolves according to the motion model and process noise.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why can measuring only POSITION also improve a Kalman filter’s VELOCITY estimate?',
      options: [
        'The covariance’s off-diagonal terms correlate position and velocity, so correcting one corrects the other',
        'It can’t — you must measure velocity directly',
        'Because velocity is always zero',
        'Because position and velocity are the same quantity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: if P says position and velocity errors are correlated, a position measurement propagates through those off-diagonals to sharpen velocity too — "observe one, fix many."',
        'You can absolutely improve unmeasured variables through correlation — that’s a core strength of the full-matrix filter.',
        'Velocity is generally nonzero; the point is correlation, not a special value.',
        'They’re distinct variables — position is the integral of velocity — linked through the model, not identical.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two sensors have uncertainty ellipses stretched in perpendicular directions. Fusing them gives…',
      options: [
        'A smaller ellipse that borrows the good axis from each sensor',
        'A larger ellipse combining both errors',
        'The same ellipse as the worse sensor',
        'No change, since they disagree',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each sensor is precise along a different axis, so the fusion is tight in BOTH — the combined ellipse shrinks below either input.',
        'Fusing independent information reduces uncertainty; the ellipse gets smaller, not larger.',
        'The result is better than the worse sensor AND better than the better one along the axis it lacks.',
        'Complementary sensors don’t "disagree" — they cover different directions, which is exactly why fusing them helps.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The predict step grows P and the update step shrinks it. What does a healthy filter’s uncertainty do over time?',
      options: [
        'Breathes — rising as it coasts between measurements, falling each time one arrives, staying bounded',
        'Falls monotonically to zero and stays there',
        'Rises forever without bound',
        'Stays perfectly constant',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: uncertainty oscillates in a bounded band — predict inflates it, update deflates it — reaching a steady rhythm as long as measurements keep coming.',
        'It can’t stay at zero — the predict step always reintroduces uncertainty as the robot moves.',
        'Unbounded growth only happens if measurements STOP; with regular updates the update step caps it.',
        'It’s constantly changing (up on predict, down on update); constant P would mean nothing is happening.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Information form: fusing precisions 1/v. Prior variance 4, measurement variance 4. What is the updated variance?',
      options: ['2', '4', '8', '0'],
      correctIndex: 0,
      explanations: [
        'Correct: 1/v = 1/4 + 1/4 = 1/2, so v = 2 — matching the 1D result that two equal sources halve the variance.',
        '4 would be no change — but fusing information always reduces variance.',
        '8 adds the variances; it’s the PRECISIONS (1/v) that add, not the variances themselves.',
        'A single fusion can’t reach zero variance — that needs infinite precision.',
      ],
    },
    {
      question: 'What is the process noise Q in the predict step?',
      options: [
        'A model of how much the motion prediction itself is uncertain (slip, bumps, unmodeled forces)',
        'The sensor’s measurement noise',
        'The robot’s battery drain',
        'The number of state variables',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Q captures the imperfection of the motion model — it’s what inflates P each predict step to account for reality drifting from the model.',
        'Measurement noise (R) lives in the UPDATE step; Q is about the prediction/model.',
        'Battery is unrelated to the filter’s uncertainty bookkeeping.',
        'Q is a covariance matrix sized by the state, but it represents process noise, not a count.',
      ],
    },
    {
      question: 'A robot fuses the same static measurement many times without moving. Its variance approaches…',
      options: [
        'Zero (with diminishing returns) — but real motion would push it back up via the predict step',
        'A large constant',
        'The measurement variance exactly, forever',
        'Infinity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: repeatedly adding precision drives variance toward zero, though each new measurement helps less; in practice motion + process noise stops it from ever truly bottoming out.',
        'It falls toward zero, not toward a large value — every fusion adds information.',
        'It drops BELOW the single-measurement variance as more are fused — it doesn’t stall there.',
        'Fusing reduces variance; only the predict step (with motion) increases it.',
      ],
    },
    {
      question: 'Why is a full covariance matrix better than running a separate 1D Kalman filter for each variable?',
      options: [
        'The off-diagonal correlations let one measurement improve several variables at once',
        'It uses less memory',
        'It avoids all matrix math',
        'Separate filters are actually always better',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: independent 1D filters ignore correlations, throwing away the "observe one, fix many" leverage that the off-diagonal covariance terms provide.',
        'It uses MORE memory (a full matrix), but the accuracy gain from correlations is worth it.',
        'It embraces matrix math — that’s exactly how it captures the couplings.',
        'For coupled states (like position/velocity), the joint filter is strictly more informative than separate ones.',
      ],
    },
  ],
}
