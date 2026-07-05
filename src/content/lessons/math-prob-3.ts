import type { Lesson } from '../../types'

export const mathProb3Lesson: Lesson = {
  nodeId: 'math-prob-3',
  screens: [
    {
      kind: 'explain',
      title: 'Bayes’ rule — updating beliefs',
      body: [
        'Perception is never certainty. A robot doesn’t KNOW where it is or what it sees — it holds a belief, and every noisy sensor reading nudges that belief.',
        'Bayes’ rule is the exact recipe for that nudge: start with a prior (what you believed), fold in evidence (what you just measured), and get a posterior (your updated belief).',
        'It is the single most important idea for robot perception — localization, mapping and sensor fusion are all Bayes running in a loop.',
      ],
      deeper: [
        'Written out, Bayes says: posterior ∝ likelihood × prior. The likelihood is how well the evidence fits the hypothesis; the prior is how plausible the hypothesis was beforehand. Multiply, then renormalize so the probabilities sum to 1.',
        'The renormalizing denominator is just “the total probability of seeing this evidence” — across every hypothesis. That’s why the counting tables below work: you tally ALL the ways the evidence can appear, then ask what fraction came from the cause you care about.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A leak sensor on a pipe is a solid 90% accurate at flagging real leaks. But leaks are rare — only 2 pipes in 100 are actually leaking. The sensor beeps. How likely is a real leak?',
      options: [
        'Low — most beeps will still be false alarms',
        'About 90% — that’s the sensor’s accuracy',
        'Exactly 50/50',
        'Certain — a beep means a leak',
      ],
      correctIndex: 0,
      reveal:
        'Counter-intuitive but true. Because leaks are rare, the tiny false-alarm rate acting on the HUGE pile of good pipes produces more false beeps than the few real leaks produce true ones. The 90% is the sensor’s hit rate, not the chance of a leak given a beep — those are different numbers. Let’s count it out.',
    },
    {
      kind: 'explain',
      title: 'Count it out: imagine 1,000 pipes',
      body: [
        'Natural frequencies beat formulas. Instead of juggling percentages, imagine a concrete crowd and just tally.',
        'Take 1,000 pipes. 2% leak → 20 real leaks, 980 sound pipes. The sensor catches 90% of leaks → 18 true beeps. Say it false-alarms on 5% of sound pipes → 49 false beeps.',
        'So a beep happens 18 + 49 = 67 times, but only 18 are real. The chance a beep means a leak is 18 / 67 ≈ 27% — not 90%.',
      ],
      deeper: [
        'Notice which numbers moved the answer. The false-positive count 49 comes from 5% × 980 — the rarity of leaks means the “5%” is multiplied by a big number, while the “90%” is multiplied by a tiny one (20).',
        'This is why a rare-disease test, a rare-obstacle sensor and a rare-fraud flag all share the same trap: a good test on a rare thing still yields mostly false positives. Raise the base rate and the same sensor suddenly looks trustworthy.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Same 90% sensor, same 5% false-alarm rate — but now you point it at pipes in an old, failing section where 50% actually leak. A beep here means a leak with probability closest to…',
      options: ['~95%', '~50%', '~27%', '~5%'],
      correctIndex: 0,
      reveal:
        'Per 1,000 pipes: 500 leak → 450 true beeps; 500 sound → 25 false beeps. So 450 / (450 + 25) = 450/475 ≈ 95%. Same sensor, wildly different verdict — because the PRIOR changed. The evidence didn’t get better; the base rate did. Bayes always weighs both.',
    },
    {
      kind: 'explain',
      title: 'The base-rate fallacy',
      body: [
        'The trap has a name: the base-rate fallacy — confusing P(beep | leak) with P(leak | beep). The sensor gives you the first; you actually care about the second.',
        'They’re only equal when the thing is common. For anything rare, ignoring the base rate makes you wildly overconfident — doctors, jurors and robots all fall for it.',
        'Next you’ll compute a posterior yourself from raw counts.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Compute a posterior from natural frequencies. We have 10,000 pipes, a 2% leak rate, a 90% true-positive rate and a 5% false-positive rate. truePos is filled in; finish falsePos (5% of the sound pipes) and the posterior fraction. Then run.',
      starter: `const population = 10000
const baseRate = 0.02        // fraction of pipes actually leaking
const truePosRate = 0.90     // sensor catches this fraction of real leaks
const falsePosRate = 0.05    // sensor false-alarms on this fraction of sound pipes

const leaks = population * baseRate
const sound = population - leaks

const truePos = leaks * truePosRate
const falsePos = // TODO: sound pipes that false-alarm
const posterior = // TODO: truePos / (all the beeps)

print('True positives:', truePos)
print('False positives:', falsePos)
print('P(leak | alarm) =', (posterior * 100).toFixed(0) + '%')`,
      expected: `True positives: 180
False positives: 490
P(leak | alarm) = 27%`,
      hint: 'falsePos = sound * falsePosRate. The posterior is truePos divided by ALL the beeps: truePos + falsePos.',
      success:
        'There it is: 180 real beeps vs 490 false ones, so a beep means a leak only 27% of the time — even with a 90% sensor. The rare base rate dominates.',
    },
    {
      kind: 'explain',
      title: 'Bayes IS sensor fusion',
      body: [
        'Now the payoff. A robot rarely trusts one reading — it fuses many. Each new sensor value is “evidence”; the robot’s current belief is the “prior”. Bayes multiplies them into an updated belief, then that becomes the prior for the next reading.',
        'Localization works exactly this way: start with a belief about where you are, take a noisy measurement (GPS, lidar, wheel odometry), and Bayes-update the belief. Repeat, and the estimate sharpens.',
        'A Kalman filter — the workhorse of drones and self-driving cars — is just Bayes’ rule applied to bell-curve beliefs, running every tick.',
      ],
      deeper: [
        'Because updating is multiplicative, order doesn’t matter and evidence compounds: two independent so-so sensors can combine into a confident belief neither could reach alone. That’s the whole point of fusing a camera, a lidar and an IMU.',
        'It also means a strong prior resists a single surprising reading — exactly what you want when one sensor glitches. The belief bends toward good evidence but doesn’t snap to noise.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A warehouse gas detector fires. Gas leaks happen on 1% of shifts; the detector catches 95% of real leaks and false-alarms on 4% of safe shifts. Roughly how likely is a real leak given the alarm?',
      options: [
        'About 19% — most alarms are still false',
        'About 95% — that’s the detector’s catch rate',
        'About 50% — leak or no leak',
        'About 4% — the false-alarm rate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: per 10,000 shifts, 100 leaks → 95 true alarms; 9,900 safe → 396 false alarms. 95 / (95 + 396) ≈ 19%. The rarity of leaks swamps the strong detector.',
        '95% is P(alarm | leak) — the detector’s catch rate — not P(leak | alarm). Swapping them is the base-rate fallacy; the true answer is far lower.',
        'Two outcomes doesn’t make them equally likely. The 1% prior and the false-alarm count set the odds, and they land near 19%, not 50%.',
        '4% is the false-alarm RATE, not the posterior. You still have to weigh the 95 true alarms against the 396 false ones.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In Bayes’ rule, the “posterior” is…',
      options: [
        'Your updated belief AFTER folding in the new evidence',
        'Your belief BEFORE seeing any evidence',
        'The accuracy of the sensor',
        'The false-positive rate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: prior (before) + evidence → posterior (after). It’s the whole output of an update, and it becomes the prior for the next reading.',
        'That’s the PRIOR — what you believed beforehand. The posterior is what you get after updating on evidence.',
        'Sensor accuracy is the likelihood (how well evidence fits a cause), one INPUT to the update — not the posterior itself.',
        'The false-positive rate is part of the likelihood too; the posterior is the final updated probability, not a single rate.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'The same 90%-accurate leak sensor gives a beep-means-leak chance of 27% on random pipes but 95% in a failing section. What changed?',
      options: [
        'The prior (base rate) — leaks are common in the failing section, so the same beep means much more',
        'The sensor got physically better in the failing section',
        'The false-positive rate dropped to zero',
        'Nothing real — 27% was simply a miscalculation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: identical sensor, identical likelihoods — only the base rate rose (2% → 50%), so the posterior rose with it. Bayes always weighs evidence against the prior.',
        'The hardware is unchanged; its true-positive and false-positive rates are the same. What moved is the prior, not the sensor.',
        'The false-alarm rate is still 5% — false beeps still happen. They’re just outnumbered now by the many real leaks.',
        '27% is the correct posterior for a 2% base rate. Both numbers are right; the difference is entirely the prior.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is Bayes’ rule described as the engine of robot localization and sensor fusion?',
      options: [
        'Each noisy reading becomes evidence that updates the robot’s belief, and that posterior becomes the prior for the next reading',
        'It lets the robot ignore its sensors and trust a map instead',
        'It makes each individual sensor physically more precise',
        'It only matters for generating random numbers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: localization and fusion are Bayes in a loop — prior belief × new evidence → sharper posterior, repeated every tick. That’s exactly what a Kalman filter automates.',
        'The opposite — Bayes is how the robot USES its sensors, weighing each noisy reading against its current belief rather than ignoring them.',
        'The hardware doesn’t change; Bayes extracts a better estimate from the same imperfect sensors by combining them intelligently.',
        'Random numbers are a side show — Bayes’ real job is reasoning about beliefs under uncertainty, the core of perception.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A face-recognition door lock matches the right person 98% of the time but also matches a random stranger 1% of the time. In a building where only 1 in 500 people at the door is the authorized owner, a “match” means the owner with probability closest to…',
      options: ['~16%', '~98%', '~50%', '~1%'],
      correctIndex: 0,
      explanations: [
        'Correct: per 500 people, 1 owner → 0.98 true matches; 499 strangers → 4.99 false matches. 0.98 / (0.98 + 4.99) ≈ 16%. A rare owner + many strangers makes most matches false.',
        '98% is the true-match RATE, not P(owner | match). With owners this rare, false matches dominate — the base-rate fallacy again.',
        'Two outcomes aren’t automatically 50/50; the 1-in-500 prior and the stranger count pull the answer down to ~16%.',
        '1% is the stranger false-match rate, one input. The posterior weighs the single true match against the ~5 false ones.',
      ],
    },
    {
      question:
        'You update a robot’s position belief with a lidar reading, then a wheel-odometry reading. What role does the belief-after-lidar play for the odometry update?',
      options: [
        'It becomes the PRIOR for the odometry update',
        'It is thrown away — only the newest reading counts',
        'It becomes the posterior of the odometry update before that update runs',
        'It has no effect; the two readings are independent',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Bayes chains — each posterior becomes the next update’s prior, so evidence accumulates rather than overwriting.',
        'That would waste information. Bayes keeps the running belief precisely so past evidence still counts.',
        'The posterior is the OUTPUT of an update, not its input. The belief-after-lidar is the input (prior) here.',
        'Independent readings still combine — that independence is exactly what lets you multiply their likelihoods and sharpen the estimate.',
      ],
    },
    {
      question:
        'Doubling a rare condition’s base rate (say 1% → 2%) while keeping the same test accuracy does what to the posterior P(condition | positive)?',
      options: [
        'Roughly doubles it — the posterior scales up with the prior when the condition is rare',
        'Leaves it unchanged — accuracy is all that matters',
        'Halves it',
        'Drives it to 100%',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for a rare condition the true positives scale with the base rate while false positives barely move, so doubling the prior roughly doubles the posterior. Base rate drives the answer.',
        'Accuracy is only half the story — the prior sets how many true cases exist to detect. Change it and the posterior moves.',
        'It rises, not falls: more real cases means more true positives among the same false ones, so the posterior goes UP.',
        'A single doubling of a tiny prior won’t hit certainty — it just lifts a small posterior to a modestly larger one.',
      ],
    },
  ],
}
