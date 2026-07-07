import type { Lesson } from '../../types'

export const mathExamLesson: Lesson = {
  nodeId: 'math-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — math that moves robots',
      body: [
        'Eighteen questions spanning logic, vectors, matrices, probability, calculus and differential equations — all NEW, no repeats from the lesson quizzes. No notes, no calculator: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot’s safety rule says: “IF an obstacle is detected, THEN stop.” Which log entry proves the rule was violated?',
      options: [
        'Obstacle detected, robot kept moving',
        'No obstacle detected, robot stopped anyway',
        'No obstacle detected, robot kept moving',
        'Obstacle detected, robot stopped',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “if A then B” is broken in exactly one case — A true, B false. The condition fired and the promised action didn’t happen.',
        'Stopping without an obstacle feels odd, but the rule says nothing about what to do when A is false — no promise, no violation.',
        'With no obstacle, the rule is vacuously satisfied — an “if” that never triggers can’t be broken.',
        'That’s the promise kept perfectly: condition true, action delivered.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Firmware refuses to launch when NOT(motor_ok OR battery_ok). By De Morgan, that’s the same as refusing when…',
      options: [
        '(NOT motor_ok) AND (NOT battery_ok)',
        '(NOT motor_ok) OR (NOT battery_ok)',
        'motor_ok AND battery_ok',
        'NOT motor_ok, regardless of the battery',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “not (either one is ok)” means “neither is ok” — BOTH have failed. Negation flips OR into AND.',
        'That’s the mirror law, NOT(A AND B) — “at least one failed”. Here the negation sits on an OR, so it becomes an AND.',
        'Dropping the NOT inverts the meaning entirely — that would refuse to launch exactly when everything is healthy.',
        'Ignoring the battery changes the rule: a dead motor with a good battery makes the OR true, so the original check passes.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A rover sits at position (7, 3); its charging dock is at (2, 6). Which vector drives it straight to the dock?',
      options: ['(−5, 3)', '(5, −3)', '(9, 9)', '(5, 3)'],
      correctIndex: 0,
      explanations: [
        'Correct: destination minus position, component-wise — (2−7, 6−3) = (−5, 3). Five left, three up.',
        '(5, −3) is position minus destination — the arrow pointing AWAY from the dock. Order matters in subtraction.',
        '(9, 9) adds the two positions — but a displacement is a DIFFERENCE between points, not a sum.',
        'The sizes are right but the signs carry the direction: the dock is to the LEFT (x decreases), so the x-component must be negative.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A delivery drone’s velocity vector is (5, 12) m/s. What speed does that give it?',
      options: ['13 m/s', '17 m/s', '60 m/s', '8.5 m/s'],
      correctIndex: 0,
      explanations: [
        'Correct: √(5² + 12²) = √(25 + 144) = √169 = 13 m/s — the classic 5-12-13 right triangle.',
        '17 is 5 + 12 — but components don’t add into a length. The arrow is the hypotenuse: √(25+144) = 13.',
        '60 is 5 × 12, a rectangle’s area, not the diagonal’s length. Pythagoras gives 13.',
        'Averaging the components throws away the geometry — magnitude is √(5²+12²) = 13.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Compute the scalar multiplication −3 · (2, −1).',
      options: ['(−6, 3)', '(6, −3)', '(−6, −3)', '(−6, −1)'],
      correctIndex: 0,
      explanations: [
        'Correct: multiply EVERY component by −3 — (−3·2, −3·(−1)) = (−6, 3). Three times longer, pointing the opposite way.',
        '(6, −3) is 3·(2, −1) — the minus sign got dropped. Negative scalars flip the arrow’s direction.',
        'The minus must hit the y-component too: −3 × −1 = +3. Two negatives make a positive.',
        'A scalar scales the WHOLE vector — the y-component doesn’t get to sit it out: −3 × −1 = 3.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You flip a fair coin 10,000 times. What should you expect for the number of heads?',
      options: [
        'Very close to 50% of flips, but almost never exactly 5,000',
        'Exactly 5,000 — the Law of Large Numbers guarantees it',
        'Completely unpredictable — every flip is random, so the total is too',
        'If tails led early, heads will overshoot 50% to compensate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the Law of Large Numbers pins the FRACTION near 50%, while the exact count still wobbles — landing on precisely 5,000 is actually rare.',
        'The law speaks about the average converging, not about exact counts — 4,963 or 5,041 heads are perfectly normal outcomes.',
        'Each flip stays random, yet the aggregate is remarkably stable — that tension is the whole point of the law.',
        'That’s the gambler’s fallacy — the coin has no memory and never “owes” anything. The early deficit just gets diluted, not repaid.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A warehouse has a fire on roughly 1 in 1,000 nights. Its smoke detector is 99% accurate. The alarm rings at 3 a.m. — what’s the smart first belief?',
      options: [
        'Probably a false alarm — the many fire-free nights produce more false positives than the rare fires produce true ones',
        'Fire is ~99% certain — that’s the detector’s accuracy',
        'It’s 50/50 — either there’s a fire or there isn’t',
        'The alarm tells you nothing at all about fire',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: per 1,000 nights, ~1 real fire but ~10 false alarms from the 999 quiet nights (1% of 999). A ringing alarm is real only ~1 time in 11 — rare events stay unlikely. (Still check, of course!)',
        '99% is the DETECTOR’s hit rate, not the chance of fire given an alarm — confusing the two is the base-rate fallacy. The rarity of fires dominates.',
        'Two possible outcomes doesn’t make them equally likely — the prior (1 in 1,000) and the false-positive count set the real odds.',
        'The alarm IS evidence — it raises the fire probability from 0.1% to roughly 9%. Just not anywhere near certainty.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot’s distance sensor returns 48, 52, 50, 49, 51 cm in quick succession. What’s the best single estimate of the true distance?',
      options: [
        '50 cm — average the readings so the noise cancels',
        '51 cm — always trust the newest reading',
        '52 cm — take the largest, to be safe',
        '48 cm — the first reading, before the sensor drifted',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: (48+52+50+49+51)/5 = 250/5 = 50. Random noise scatters above and below the truth, so averaging cancels it — the Law of Large Numbers doing real work.',
        'The newest reading is just as noisy as the rest — recency doesn’t reduce randomness, averaging does.',
        'Picking the max builds in a systematic bias — noise here goes both ways, so the extremes are the LEAST trustworthy values.',
        'The first reading holds no special truth — these are random fluctuations, not drift, and one sample is the noisiest estimate of all.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A rover moving at constant speed is at the 4 m mark at t = 2 s and the 10 m mark at t = 5 s. What is its velocity?',
      options: ['2 m/s', '6 m/s', '5 m/s', '3 m/s'],
      correctIndex: 0,
      explanations: [
        'Correct: slope of position over time — Δposition / Δtime = (10−4)/(5−2) = 6/3 = 2 m/s. Velocity IS that slope.',
        '6 m is the distance covered — you still have to divide by the 3 seconds it took. Slope needs both rise AND run.',
        '5 mixes endpoints (10/2) instead of taking differences — slope uses the CHANGE in position over the CHANGE in time.',
        '3 s is the elapsed time — that’s the denominator of the slope, not the answer.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A drone cruises at a steady 3 m/s for 4 seconds. Using the integral idea — area under the velocity-time graph — how far does it travel?',
      options: ['12 m', '7 m', '0.75 m', 'Can’t tell without knowing the acceleration'],
      correctIndex: 0,
      explanations: [
        'Correct: constant velocity draws a rectangle on the graph — 3 m/s tall, 4 s wide — so the area (distance) is 3 × 4 = 12 m.',
        '7 adds speed and time, but their units don’t even match — the area multiplies height by width: 3 × 4 = 12 m.',
        '0.75 divides speed by time, which gives an acceleration-flavored number — accumulating velocity means multiplying by time.',
        'You already know it: steady speed means zero acceleration. Velocity at every instant is all the integral needs — 12 m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Using the power rule, what is the derivative of x³ (a term that shows up when you model a joint’s position over time)?',
      options: ['3x²', 'x²', '3x', '¼x⁴'],
      correctIndex: 0,
      explanations: [
        'Correct: the power rule drops the exponent down as a multiplier and subtracts one — d/dx of xⁿ = n·xⁿ⁻¹, so x³ becomes 3x².',
        'You subtracted one from the exponent but forgot to bring the 3 down out front — the old power multiplies the term.',
        'That’s the derivative of a squared term (x² → 2x flavour), not a cubic — cubing means the exponent 3 leads the answer: 3x².',
        '¼x⁴ is the INTEGRAL of x³ (raise the power, divide by it). Differentiating goes the other way — down to 3x².',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A rover holds a steady 6 m/s for 5 seconds. Reading distance as the area under the velocity-time graph, how far does it go?',
      options: ['30 m', '11 m', '1.2 m', '0.83 m'],
      correctIndex: 0,
      explanations: [
        'Correct: constant velocity is a rectangle on the graph — 6 m/s tall by 5 s wide — so the area (distance) is 6 × 5 = 30 m.',
        '11 adds the speed and the time, but you accumulate by MULTIPLYING height by width, not summing them: 6 × 5 = 30 m.',
        '1.2 divides speed by time (6/5), which points toward acceleration — distance multiplies velocity by time instead.',
        '0.83 is time over speed (5/6) — upside down. The rectangle’s area is height × width = 30 m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 2×2 matrix has determinant 0. Geometrically, what does the transformation it represents do to a shape?',
      options: [
        'Collapses it flat onto a line (or a point) — area becomes zero, and it can’t be undone',
        'Rotates it while keeping its area exactly the same',
        'Doubles its area but keeps the same shape',
        'Leaves it completely unchanged — a determinant of 0 is the “do nothing” matrix',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the determinant is the area-scaling factor, so det 0 squashes all of space onto a lower dimension — the map is singular and has no inverse, so the original can’t be recovered.',
        'Rotations preserve area, so their determinant is 1, not 0 — a zero determinant means area is destroyed, not preserved.',
        'Any nonzero area-scaling (like doubling) gives a nonzero determinant. Zero specifically means the area is crushed to nothing.',
        'The “do nothing” map is the identity, whose determinant is 1. Determinant 0 is the opposite of harmless — it flattens space irreversibly.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot gripper picks up 0, 1, or 2 parts per cycle with probabilities 0.5, 0.3, and 0.2. What is the expected number of parts per cycle, E[X]?',
      options: ['0.7', '1.0', '1.5', '3.0'],
      correctIndex: 0,
      explanations: [
        'Correct: E[X] = Σ x·p = 0(0.5) + 1(0.3) + 2(0.2) = 0 + 0.3 + 0.4 = 0.7 parts per cycle.',
        '1.0 is the plain average of the outcomes 0, 1, 2 — but expected value WEIGHTS each outcome by its probability, and the low counts are more likely here.',
        '1.5 splits the difference between 1 and 2, ignoring that grabbing 0 parts (probability 0.5) drags the average down.',
        '3.0 sums the three probabilities (0.5+0.3+0.2=1), which just confirms they’re a valid distribution — it isn’t the expected value.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A quantity obeys dy/dt = −0.5y with y(0) = 80. What is the general shape of its solution y(t)?',
      options: [
        'y(t) = 80·e^(−0.5t) — exponential decay',
        'y(t) = 80 − 0.5t — a straight line dropping steadily',
        'y(t) = 80·e^(0.5t) — exponential growth',
        'y(t) = 0.5·e^(−80t) — decay from a start of 0.5',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dy/dt = ky solves to y = y(0)·e^(kt); here k = −0.5 (decay) and y(0) = 80, giving 80·e^(−0.5t).',
        'A straight line would need a CONSTANT rate — but here the rate is proportional to y, so it slows as y shrinks, curving into an exponential.',
        'The negative sign on 0.5 means decay, not growth — the exponent must be negative.',
        'The roles are swapped: 80 is the starting amount (out front) and 0.5 is the rate (in the exponent).',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A mass–spring–damper with m = 1, k = 9 is given damping c. For what c is it critically damped (ζ = 1, fastest settle with no overshoot)?',
      options: ['c = 6', 'c = 9', 'c = 3', 'c = 18'],
      correctIndex: 0,
      explanations: [
        'Correct: critical damping is c = 2·√(k·m) = 2·√(9×1) = 2×3 = 6.',
        'c = 9 equals k, but that isn’t the critical-damping formula — you need 2·√(km) = 6.',
        'c = 3 gives ζ = 3/(2·√9) = 0.5, which is underdamped (it would still overshoot).',
        'c = 18 gives ζ = 2, overdamped — past critical, so sluggish rather than fastest.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You write a robot’s dynamics as x′ = A·x and find A’s eigenvalues are +1 and −4. Is the system stable?',
      options: [
        'No — the +1 eigenvalue makes one mode grow exponentially, so the state diverges',
        'Yes — the −4 eigenvalue dominates and pulls everything to rest',
        'Yes — having one negative eigenvalue is enough for stability',
        'It is exactly marginally stable, oscillating forever',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: stability needs EVERY eigenvalue to have a negative real part. The +1 eigenvalue grows like e^(t) and eventually dominates, so the system is unstable.',
        'A more negative eigenvalue doesn’t rescue a positive one — the growing mode wins in the long run regardless.',
        'One negative eigenvalue is NOT enough; a single positive one is sufficient to cause divergence.',
        'Marginal stability requires eigenvalues with zero real part; +1 is strictly positive, so this diverges, not oscillates steadily.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A phase portrait of [position, velocity] shows the state spiralling INWARD toward the origin. What does this tell you?',
      options: [
        'The system is a stable, damped oscillator — it rings but the rings shrink to rest',
        'The system is unstable and gaining energy',
        'The system conserves energy perfectly',
        'The system is already at rest and never moved',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an inward spiral means oscillation (the looping) plus decay (the shrinking radius) — a stable underdamped system, eigenvalues with negative real parts and nonzero imaginary parts.',
        'Gaining energy would spiral OUTWARD — inward is the opposite, energy bleeding away.',
        'Perfect energy conservation traces a fixed-radius closed loop, not an inward spiral.',
        'A system at rest is a single point at the origin; a spiral shows it actively moving and settling.',
      ],
    },
  ],
}
