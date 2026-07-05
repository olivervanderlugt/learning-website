import type { Lesson } from '../../types'

export const mathProb2Lesson: Lesson = {
  nodeId: 'math-prob-2',
  screens: [
    {
      kind: 'explain',
      title: 'Describing a whole random variable',
      body: [
        'Last time you watched randomness stabilize in bulk. Now we describe a random quantity fully — before rolling, flipping, or reading a single sensor.',
        'A probability distribution lists every possible outcome next to its probability. Because SOMETHING must happen, those probabilities always add up to exactly 1.',
        'From that list we can squeeze out one number that summarizes the whole thing: the average you’d expect over the long run.',
      ],
      deeper: [
        'A quantity whose value is decided by chance is called a random variable (a die roll, a noisy distance reading). Its distribution is the full picture: outcomes and their weights.',
        'Distributions come in two flavours. Discrete ones (die faces, packet counts) have a countable list of outcomes each with its own probability. Continuous ones (a temperature, a voltage) spread probability smoothly over a range — there the “list” becomes a curve, but the total area under it is still exactly 1.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A distance sensor can read 48, 50, or 52 cm. You’re told the reading is 48 with probability 0.3 and 50 with probability 0.5. What MUST the probability of 52 be?',
      options: ['0.2', '0.5', '1.0', 'Impossible to know'],
      correctIndex: 0,
      reveal:
        'The three probabilities must total 1, so 52 gets whatever is left: 1 − 0.3 − 0.5 = 0.2. That “sums to 1” rule is what makes a list of outcomes a valid distribution — and it’s how you fill in a missing probability without any extra measurement.',
    },
    {
      kind: 'explain',
      title: 'Expected value: the long-run average',
      body: [
        'The expected value E[X] is the average outcome you’d get if you repeated the experiment forever. You compute it by weighting each outcome by its probability and adding: E[X] = Σ xᵢ·pᵢ.',
        'It is NOT the most likely single outcome, and it need not even be a possible outcome — a fair die averages 3.5, a face that doesn’t exist.',
        'For a fair die: (1+2+3+4+5+6)/6 = 21/6 = 3.5. Each face is weighted equally, so this is just the plain average — but weighting is the general move.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A weighted sensor reads 2 cm with probability 0.25 and 4 cm with probability 0.75. What’s its expected reading E[X]?',
      options: ['3.5 cm', '3 cm', '6 cm', '2 cm (the most likely low value)'],
      correctIndex: 0,
      reveal:
        'E[X] = 2·0.25 + 4·0.75 = 0.5 + 3 = 3.5 cm. Notice the answer leans toward 4 because 4 is far more likely — that’s the whole point of WEIGHTING. The plain average of 2 and 4 would be 3, but ignoring the probabilities gives the wrong expectation.',
    },
    {
      kind: 'code',
      prompt:
        'Compute the expected value of a fair die directly. The outcomes and their probabilities are given as two arrays. Fill in the ONE missing piece of the accumulation so it prints "Expected value: 3.5".',
      starter: `// outcomes[i] happens with probability probs[i]
const outcomes = [1, 2, 3, 4, 5, 6]
const probs    = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]

let ev = 0
for (let i = 0; i < outcomes.length; i++) {
  // E[X] = sum of outcome * probability.
  // Add this outcome's weighted contribution to ev:
  ev = ev + outcomes[i] * ______
}
print('Expected value:', ev)`,
      expected: 'Expected value: 3.5',
      hint: 'Each term is the outcome TIMES its probability. You already have outcomes[i]; multiply it by the matching probs[i].',
      success:
        'That’s E[X] = Σ xᵢ·pᵢ in code — six equal 1/6 weights average the faces to exactly 3.5. Swap in unequal probabilities and the same loop handles a weighted (biased) die or noisy sensor with no other change.',
    },
    {
      kind: 'explain',
      title: 'Same average, different noise',
      body: [
        'Two distance sensors both average 50 cm. Sensor A reads 49–51; sensor B swings 30–70. Same expected value — wildly different trustworthiness.',
        'Expected value tells you where the readings CENTER, but not how far they scatter. That scatter is the variance (its square root, in the original units, is the standard deviation).',
        'Variance measures spread: the average squared distance of outcomes from the mean. Big variance = noisy; zero variance = the same value every time.',
      ],
      deeper: [
        'Concretely, Var(X) = E[(X − E[X])²] — take each outcome’s gap from the mean, square it (so overshoots and undershoots both count as error), then average those squared gaps weighted by probability.',
        'Squaring is why variance punishes big deviations disproportionately: a reading twice as far off contributes four times the variance. Taking the square root gives the standard deviation, back in centimetres, which is the number engineers actually quote as “sensor noise”.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Sensor A and sensor B both have expected reading 50 cm. A scatters within ±1 cm; B scatters within ±20 cm. Which should a robot trust for precise navigation?',
      options: [
        'Sensor A — same mean but much lower variance',
        'Sensor B — a wider range covers more possibilities',
        'They’re equally good — the means are identical',
        'Neither, since both can be wrong',
      ],
      correctIndex: 0,
      reveal:
        'Equal expected value does NOT mean equal quality. A’s low variance means any single reading is close to the truth; B’s huge variance means one reading could be 20 cm off. When you can only measure once or twice, low variance is what keeps a robot from steering into a wall.',
    },
    {
      kind: 'explain',
      title: 'Why robots live and die by these two numbers',
      body: [
        'Expected value is the reading you’d bet on; variance is how much you should distrust any single measurement. Together they summarize a whole noisy sensor in two numbers.',
        'This is exactly why sensor datasheets quote a value ± an error, why fusing sensors favors the low-variance one, and why averaging many readings shrinks the variance (recall the Law of Large Numbers).',
        'Lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the expected value E[X] of a random variable?',
      options: [
        'The sum of each outcome times its probability — the long-run average',
        'The single most likely outcome',
        'The plain average of the possible outcomes, ignoring probabilities',
        'The largest possible outcome',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: E[X] = Σ xᵢ·pᵢ weights every outcome by how likely it is, giving the average you’d converge to over many repetitions.',
        'That’s the mode (most likely value). Expected value can differ from it and can even be an outcome that never occurs — a fair die averages 3.5.',
        'That’s only right when every outcome is equally likely. In general you must WEIGHT by probability, or a biased die/sensor gives the wrong answer.',
        'The maximum ignores probability entirely. Expected value blends all outcomes by their weights, so it lands somewhere in the middle, not at the top.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A biased coin pays 10 with probability 0.5 and 0 with probability 0.5. What is E[X]?',
      options: ['5', '10', '0', '0.5'],
      correctIndex: 0,
      explanations: [
        'Correct: E[X] = 10·0.5 + 0·0.5 = 5. The average payout is 5 even though 5 is never actually paid out — a classic reminder that E[X] need not be a possible outcome.',
        '10 is the best case, not the average. Half the time you get 0, which drags the expectation down to 5.',
        '0 is the worst case. Expected value blends both outcomes by their probabilities, landing halfway at 5.',
        '0.5 is a PROBABILITY, not an outcome. You multiply outcomes by probabilities and add — don’t report the weight itself as the answer.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Two sensors have the SAME expected reading but different variances. What does the higher-variance sensor’s reading behave like?',
      options: [
        'It scatters further from the true value — noisier, less reliable per reading',
        'It reads a higher average value',
        'It is always wrong',
        'It has a different expected value',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: variance measures spread around the mean, so higher variance means individual readings land further from the truth even though the average matches.',
        'No — they share the same expected value. Variance is about spread, not about shifting the center up or down.',
        'Not always wrong, just less precise: it can still be right, but any single reading is more likely to be far off.',
        'The expected values are equal by assumption — only the variance (spread) differs, which is exactly why the means alone don’t tell them apart.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why isn’t the expected value alone enough to choose between two sensors?',
      options: [
        'It ignores spread — variance tells you how much any single reading might deviate',
        'It’s always inaccurate',
        'Expected value can’t be computed for sensors',
        'Because expected value equals the most likely reading',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: two sensors can share a mean yet differ hugely in reliability; variance captures that spread, and low variance is what you want when you can only measure a few times.',
        'Expected value isn’t inaccurate — it’s just incomplete. It nails the center but says nothing about scatter, which is why you also need variance.',
        'It’s perfectly computable: E[X] = Σ xᵢ·pᵢ over the sensor’s possible readings and their probabilities.',
        'Expected value is the weighted average, not the most likely reading (the mode) — and even if it were, you’d still need variance to judge reliability.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A game gives 0 points with probability 0.5 and 10 points with probability 0.5. What is E[X]?',
      options: ['5', '10', '0', '2'],
      correctIndex: 0,
      explanations: [
        'Correct: 0·0.5 + 10·0.5 = 5 — the average is exactly halfway even though 5 is never actually scored.',
        '10 is the best outcome, not the average. Half the time you score 0, pulling the expectation down to 5.',
        '0 is the worst outcome; weighting both outcomes equally lands the expectation at 5, not 0.',
        '2 doesn’t come from any correct weighting here — recompute Σ xᵢ·pᵢ = 0·0.5 + 10·0.5 = 5.',
      ],
    },
    {
      question:
        'A weighted sensor reads 2 with probability 0.25 and 4 with probability 0.75. What is its expected reading?',
      options: ['3.5', '3', '4', '6'],
      correctIndex: 0,
      explanations: [
        'Correct: 2·0.25 + 4·0.75 = 0.5 + 3 = 3.5 — the answer leans toward 4 because 4 is three times as likely.',
        '3 is the PLAIN average of 2 and 4, which ignores the probabilities. Weighting toward the likelier 4 pushes it up to 3.5.',
        '4 is the most likely single reading, not the expectation — the 25% chance of a 2 pulls the average below 4.',
        '6 exceeds every possible reading; the expected value must lie between the smallest (2) and largest (4) outcomes.',
      ],
    },
    {
      question:
        'A bet wins +3 with probability 0.5 and loses −1 with probability 0.5. What is the expected payout E[X]?',
      options: ['1', '2', '0', '1.5'],
      correctIndex: 0,
      explanations: [
        'Correct: 3·0.5 + (−1)·0.5 = 1.5 − 0.5 = 1 — a positive expectation, so the bet pays off on average.',
        '2 forgets the loss term. You must include the −1 outcome: 1.5 − 0.5 = 1, not 1.5 alone.',
        '0 would mean a fair bet; here the +3 outweighs the −1, giving a positive expectation of 1.',
        '1.5 is only the win term (3·0.5). Subtract the loss term (−1·0.5 = −0.5) to get the true expectation of 1.',
      ],
    },
    {
      question:
        'A die shows only its even faces: 2, 4, or 6, each with probability 1/3. What is E[X]?',
      options: ['4', '3.5', '6', '3'],
      correctIndex: 0,
      explanations: [
        'Correct: (2 + 4 + 6)/3 = 12/3 = 4 — equal weights make it the plain average of the three faces.',
        '3.5 is the expected value of a FULL fair die (1–6). With only the even faces the average shifts up to 4.',
        '6 is the largest face, not the average; equal weighting centers the expectation at 4.',
        '3 would be the average of 2 and 4 only — you must include the 6, giving (2+4+6)/3 = 4.',
      ],
    },
  ],
}
