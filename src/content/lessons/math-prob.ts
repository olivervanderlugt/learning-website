import type { Lesson } from '../../types'

export const mathProbLesson: Lesson = {
  nodeId: 'math-prob',
  screens: [
    {
      kind: 'explain',
      title: 'Reasoning when you can’t be sure',
      body: [
        'Robots live in a fog. Every sensor lies a little — a distance reading of “50 cm” might really be 48 or 53. Certainty is a luxury the real world never grants.',
        'Probability is the math of controlled uncertainty: it lets you act sensibly on noisy, incomplete information instead of pretending you know exactly.',
        'We start with the most surprising fact — that randomness becomes predictable in bulk.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You flip a fair coin 10 times. Which is the MOST likely number of heads — and how sure can you be?',
      options: [
        'Exactly 5, and you can count on it',
        'Around 5, but 3 or 7 wouldn’t be surprising',
        'Any number is equally likely',
        'Always 10 or always 0',
      ],
      correctIndex: 1,
      reveal:
        '5 is the single most likely count, but in just 10 flips the result bounces around a lot — 3, 4, 6, 7 are all common. Small samples are noisy. The magic appears only when the sample grows large, which you’ll see next.',
    },
    { kind: 'game', gameId: 'probability-sim' },
    {
      kind: 'explain',
      title: 'The Law of Large Numbers',
      body: [
        'Each flip stayed unpredictable, yet the average marched toward 50%. That’s the Law of Large Numbers: individual events are random, but their aggregate is reliable.',
        'This is exactly why a robot takes many sensor readings and averages them — the random noise cancels out, leaving the true value.',
        'Next: how to UPDATE a belief when fresh evidence arrives.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot’s obstacle detector is right 90% of the time. It fires an alarm. Before any sensor, obstacles are rare here — only 1 in 100 spots has one. Is an obstacle now more likely than not?',
      options: [
        'Yes — the sensor is 90% accurate, so ~90% chance',
        'No — obstacles are so rare that most alarms are still false',
        'It’s exactly 50/50',
        'Impossible to say',
      ],
      correctIndex: 1,
      reveal:
        'Counter-intuitive but true: out of 100 spots, ~1 real obstacle (sensor likely catches it) but ~10 of the 99 empty spots also trigger a false alarm. So a firing alarm means roughly 1 real vs 10 false — under 10% chance it’s real! Rare things stay unlikely even after a decent test. This is Bayes’ rule, and ignoring it is how robots (and doctors) get fooled.',
    },
    {
      kind: 'explain',
      title: 'Priors, evidence, and Bayes',
      body: [
        'Bayes’ rule combines what you believed before (the “prior” — obstacles are rare) with new evidence (the alarm) to get an updated belief.',
        'A single noisy sensor rarely settles the question; you weigh it against how likely the thing was to begin with, and you fuse many sensors over time.',
        'That continuous updating IS how self-driving cars and drones stay safe. Lock it in with the quiz.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the Law of Large Numbers say?',
      options: [
        'Big numbers are always more accurate',
        'As a random process repeats many times, the average outcome converges toward the true probability',
        'Rare events never happen',
        'Every outcome becomes equally likely over time',
      ],
      correctIndex: 1,
      explanations: [
        'It’s not about big numbers being accurate — it’s that a LARGE SAMPLE of a random process has a stable average, even though each trial is unpredictable.',
        'Correct: individual trials stay random, but their running average homes in on the true probability — exactly what you watched converge to 50%.',
        'Rare events still happen — the law is about averages stabilizing, not about eliminating rare outcomes.',
        'The opposite — outcomes keep their true probabilities; it’s the AVERAGE that stabilizes, not the individual odds equalizing.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a robot average many readings from a noisy sensor?',
      options: [
        'Averaging cancels random noise, revealing the true value',
        'It makes the sensor physically more accurate',
        'One reading is illegal',
        'To use up spare CPU time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: random errors scatter above and below the truth, so averaging many readings cancels them out — the Law of Large Numbers put to work.',
        'The hardware doesn’t change — averaging is a software trick that extracts a better estimate from the same imperfect sensor.',
        'Nothing illegal about one reading — it’s just noisier and less trustworthy than an average.',
        'It’s about accuracy, not busywork — averaging meaningfully improves the estimate.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A test is 90% accurate for a condition present in just 1% of cases. A positive result means the condition is…',
      options: [
        'Almost certain (~90%)',
        'Still unlikely — most positives are false alarms',
        'Exactly 90%',
        'Guaranteed',
      ],
      correctIndex: 1,
      explanations: [
        'This is the classic trap: the 90% is the test’s accuracy, NOT the chance you have the condition. The rarity dominates.',
        'Correct: with the condition so rare, false positives from the huge healthy majority outnumber true positives — so a positive is still probably wrong. That’s Bayes’ rule.',
        '90% is the test’s hit rate, not the updated probability — those are different numbers, and confusing them is the base-rate fallacy.',
        'Nothing is guaranteed from one imperfect test — you must weigh it against how rare the condition was to begin with.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In Bayes’ rule, what is the “prior”?',
      options: [
        'What you believed before seeing the new evidence',
        'The most recent sensor reading',
        'The final answer',
        'A type of sensor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the prior is your belief BEFORE the new evidence (e.g. “obstacles are rare here”); Bayes updates it with the evidence into a new belief.',
        'That’s the evidence/likelihood — the new data. The prior is what you held beforehand.',
        'The final answer is the “posterior” — the prior AFTER updating with evidence, not the prior itself.',
        'It’s a belief/probability, not hardware — the prior is a number describing how likely something was before you measured.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is probability foundational for AI and self-driving robots?',
      options: [
        'They act on noisy, incomplete data and must reason about uncertainty to stay safe',
        'It makes the code run faster',
        'It replaces the need for sensors',
        'It’s only used for random number generation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: perception is uncertain, so robots represent beliefs as probabilities and update them (Bayes, sensor fusion, Kalman filters) to act safely under doubt.',
        'Probability is about correct reasoning under uncertainty, not raw speed — sometimes it costs computation to do it right.',
        'It works WITH sensors, interpreting their noisy output — it doesn’t replace them.',
        'Random generation is a tiny corner; the big role is reasoning and updating beliefs from evidence.',
      ],
    },
  ],
}
