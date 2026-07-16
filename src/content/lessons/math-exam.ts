import type { Lesson } from '../../types'

export const mathExamLesson: Lesson = {
  nodeId: 'math-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — math that moves robots',
      body: [
        'Thirty-four questions spanning logic, sets & functions, proof technique, vectors, matrices, rank & least squares, the SVD, probability, statistics, calculus, differential equations and multivariable calculus — all NEW, no repeats from the lesson quizzes. No notes, no calculator: retrieval from memory is the point.',
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
    {
      kind: 'quiz',
      question: 'For f(x, y) = x²y + y, what is the partial derivative ∂f/∂x?',
      options: [
        '2xy — hold y frozen; the +y term is constant in x and drops',
        'x² + 1 — that’s ∂f/∂y, not ∂f/∂x',
        '2xy + 1 — the +y term shouldn’t contribute to ∂f/∂x',
        '2x — the frozen y must stay as a multiplier',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: freeze y. ∂/∂x of x²y is 2xy (y is a constant multiplier), and the bare +y term is constant in x, so it vanishes — leaving 2xy.',
        'x² + 1 is ∂f/∂y (differentiating x²y and y with respect to y) — a different partial.',
        'The +y term has no x in it, so its x-partial is 0, not 1 — the answer shouldn’t carry a +1.',
        'Dropping the y multiplier is the classic error: ∂/∂x of x²y keeps the frozen y, giving 2xy, not 2x.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'At a point, a loss surface has gradient ∇L = [3, −4]. In which direction, and how steeply, does the loss increase fastest?',
      options: [
        'Along [3, −4], with steepest slope |∇L| = 5',
        'Along [−3, 4], with slope 5',
        'Along [3, −4], with slope 7',
        'Along [4, 3], with slope 5',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the gradient itself points the steepest way UP, and its length √(3² + 4²) = 5 is that maximum slope.',
        '[−3, 4] is the steepest DECREASE (−∇L); the question asks for the fastest increase.',
        'The slope is the gradient’s magnitude, √(9 + 16) = 5, not the sum 3 + 4 = 7.',
        'Swapping the components changes the direction; steepest ascent is along the gradient’s actual components [3, −4].',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A map sends (u, v) to (2u + v, u·v). What is its Jacobian J = [[∂p/∂u, ∂p/∂v], [∂q/∂u, ∂q/∂v]] at the point (u, v) = (1, 1)?',
      options: [
        '[[2, 1], [1, 1]]',
        '[[2, 1], [1, 2]]',
        '[[1, 1], [2, 1]]',
        '[[3, 1], [1, 1]]',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: p = 2u + v gives ∂p/∂u = 2, ∂p/∂v = 1; q = u·v gives ∂q/∂u = v = 1, ∂q/∂v = u = 1 at (1, 1). So J = [[2, 1], [1, 1]].',
        '∂q/∂v = u = 1 at (1, 1), not 2 — the lower-right entry is 1.',
        'The rows are swapped: row 1 must be p’s partials (2, 1), not q’s.',
        '∂p/∂u = 2 (from 2u + v), not 3 — the constant coefficient of u is 2.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You minimize f(x, y) subject to a constraint g(x, y) = 0. Which condition characterizes the constrained optimum?',
      options: [
        '∇f = λ∇g — the gradients of objective and constraint are parallel',
        '∇f = 0 — the free critical point, ignoring the constraint',
        '∇g = 0 — the constraint’s own gradient must vanish',
        'f(x, y) = 0 — the objective must be zero there',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at the constrained optimum f’s contour is tangent to the constraint curve, so ∇f and ∇g point the same way — ∇f = λ∇g (Lagrange).',
        '∇f = 0 finds the UNCONSTRAINED minimum, which usually violates g = 0.',
        '∇g = 0 describes the constraint degenerating, not the optimization condition — Lagrange matches f’s gradient to g’s, not sets g’s to zero.',
        'The objective value f need not be zero at the optimum; Lagrange is about gradient alignment, not function values.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You have 200 noisy sensor readings and want the best-fit line (2 unknowns). Written A·x = b this is overdetermined with no exact solution. What system does least squares solve instead?',
      options: [
        'AᵀA·x̂ = Aᵀb — the normal equations, a 2×2 solve that gives the closest reachable fit',
        'A·x̂ = b exactly — force every reading to be satisfied',
        'A⁻¹·x̂ = b — invert the 200×2 matrix directly',
        'x̂ = Aᵀb — just apply the transpose once',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: multiplying by Aᵀ enforces the residual ⟂ column space, collapsing 200 rows into the 2×2 normal equations AᵀA·x̂ = Aᵀb whose solution is the least-squares fit.',
        'An exact solution can’t exist for noisy overdetermined data — that’s exactly why least squares projects onto the closest point instead.',
        'A tall 200×2 matrix has no inverse; forming AᵀA (which IS square) is the way around that.',
        'x̂ = Aᵀb has the wrong shape and skips the AᵀA solve; the normal equations require inverting AᵀA, not just applying Aᵀ.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A matrix has singular values (8, 2, 0). What are its rank and its most important weakness?',
      options: [
        'Rank 2 (two non-zero singular values) — the zero singular value means it collapses a direction, so it is singular / non-invertible',
        'Rank 3 — every listed singular value counts toward rank',
        'Rank 1 — only the largest singular value counts',
        'Rank 2, and it is perfectly well-conditioned',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rank = number of NON-zero singular values = 2, and the zero σ flattens one direction to nothing, making the matrix singular and non-invertible.',
        'The zero singular value does NOT count — it marks a collapsed direction, so the rank is 2, not 3.',
        'Every non-zero singular value counts, so two of them give rank 2, not 1.',
        'A zero singular value makes the matrix outright singular (condition number infinite), the opposite of well-conditioned.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A redundant 7-joint arm must hit one 6-D pose — more unknowns than equations, so infinitely many joint solutions exist. Solving with the pseudoinverse J⁺ returns which one?',
      options: [
        'The minimum-norm solution — the smallest, least-effort joint motion that still reaches the pose',
        'The largest-norm solution — the biggest joint motion',
        'No solution, because the system is underdetermined',
        'The least-squares residual of the pose',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for a wide (underdetermined) system the pseudoinverse selects the minimum-norm solution among all exact ones — the gentlest motion, ideal for a redundant arm.',
        'It returns the SMALLEST-norm solution; least effort is the whole benefit.',
        'Infinitely many solutions is not failure — the pseudoinverse cleanly picks the minimum-norm one.',
        'A residual arises in the tall/overdetermined case; here exact solutions exist and J⁺ chooses the smallest among them.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A matrix has a non-zero determinant of 0.02 but a condition number (σ_max/σ_min) of 50,000. What should you conclude?',
      options: [
        'It is ill-conditioned — inverting it amplifies tiny errors enormously, even though det ≠ 0',
        'It is safe to invert, because the determinant is non-zero',
        'It is exactly singular',
        'The condition number is irrelevant to inversion',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a huge condition number means σ_min is nearly zero, so the inverse magnifies noise ~50,000-fold in the worst direction — the determinant being non-zero doesn’t protect you.',
        'A non-zero determinant only rules out EXACT collapse; conditioning (the singular-value ratio) is what governs numerical safety.',
        'It is not exactly singular (det = 0.02 ≠ 0), but it is dangerously close in the conditioning sense.',
        'The condition number is precisely the measure of how badly inversion amplifies error — it is the key quantity here.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot stores its position uncertainty as a 2×2 covariance matrix. What sits on the diagonal, and what property must the matrix always have?',
      options: [
        'The variances of x and y sit on the diagonal, and the matrix is symmetric (cov(x, y) = cov(y, x))',
        'The means of x and y sit on the diagonal, and the matrix is anti-symmetric',
        'The correlations sit on the diagonal, always equal to 0',
        'The covariances sit on the diagonal, and the matrix can be any shape',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the (i, i) entry is cov(variable i, itself) = its variance, and since cov(x, y) = cov(y, x) the matrix is symmetric (and positive-semidefinite).',
        'Means are not stored in a covariance matrix, and covariance matrices are symmetric, not anti-symmetric.',
        'A correlation MATRIX has 1s on its diagonal; a covariance matrix has variances there, and off-diagonal correlations need not be 0.',
        'Variances (not the cross-covariances) sit on the diagonal, and the matrix is always square and symmetric.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'One sensor reading has a standard deviation of 6 cm. You average 36 readings. What is the standard error of that average?',
      options: ['1 cm', '6 cm', '0.17 cm', '3 cm'],
      correctIndex: 0,
      explanations: [
        'Correct: SE = σ/√n = 6/√36 = 6/6 = 1 cm — 36 readings cut the error 6-fold (√36), not 36-fold.',
        '6 cm is the single-reading spread; averaging must reduce it.',
        '0.17 cm divides by n = 36 instead of √36 — the classic 1/n-vs-1/√n error.',
        '3 cm would be σ/√4; here n = 36, so you divide by √36 = 6, giving 1 cm.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You change your controller and a test reports p = 0.02 for the improvement. What is the correct interpretation?',
      options: [
        'If the change truly did nothing, a result this extreme would occur only 2% of the time',
        'There is a 2% chance the change did nothing',
        'There is a 98% chance the change is a real improvement',
        'The controller improved by 2%',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the p-value is P(data this extreme | null), computed assuming no effect — a statement about the data, not the null’s truth.',
        'That flips the conditional; p is not the probability the null is true.',
        'Same inversion — p doesn’t give the probability the alternative (real improvement) is true.',
        'p-values measure surprise under the null, not effect SIZE; the 2% is a probability, not a percentage improvement.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You fit a least-squares line to data where cov(x, y) = 6 and var(x) = 3. What is the slope of the best-fit line?',
      options: ['2', '0.5', '18', '3'],
      correctIndex: 0,
      explanations: [
        'Correct: slope = cov(x, y) / var(x) = 6 / 3 = 2 — the rise in y per unit x.',
        '0.5 is the reciprocal (var(x)/cov), which has the wrong units and value.',
        '18 multiplies instead of dividing; the slope divides covariance by the variance of x.',
        '3 is var(x) alone; the slope is the ratio cov/var(x) = 2.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Two sensor whitelists: A allows IDs {2, 4, 6, 8} and B allows {6, 8, 10}. A reading is accepted if it’s on EITHER list. How many distinct IDs does the combined system accept?',
      options: ['5', '7', '2', '4'],
      correctIndex: 0,
      explanations: [
        'Correct: the union is {2, 4, 6, 8, 10} — inclusion–exclusion gives |A| + |B| − |A ∩ B| = 4 + 3 − 2 = 5 (6 and 8 are shared, counted once).',
        '7 = 4 + 3 double-counts the two shared IDs (6 and 8); the union subtracts the overlap.',
        '2 is the size of the overlap A ∩ B alone, not the union.',
        '4 is |A| alone; “either list” means the union of both.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A hash maps thousands of possible packets onto 256 slots, so distinct packets sometimes land in the same slot. In function terms, the hash is therefore NOT…',
      options: [
        'injective — distinct inputs share an output, so you can’t invert it to recover the packet',
        'a function — a function can’t have repeated outputs',
        'surjective — it must miss some slots',
        'defined — collisions make it undefined',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a collision is two inputs with one output, which breaks injectivity — exactly why a hash can’t be reversed to the original.',
        'It’s still a genuine function: each input has ONE output. Repeated outputs across inputs are allowed.',
        'Nothing forces a hash to miss slots; a good one hits all 256. The property collisions destroy is injectivity, not surjectivity.',
        'It’s perfectly well-defined — each packet gets a definite slot; collisions just mean the mapping isn’t one-to-one.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'To prove “if n² is even then n is even”, the cleanest route is the CONTRAPOSITIVE. Which statement do you prove instead?',
      options: [
        'If n is odd, then n² is odd',
        'If n is even, then n² is even',
        'If n² is odd, then n is even',
        'If n is even, then n² is odd',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the contrapositive of “A → B” is “not-B → not-A” — “if n is odd (not even), then n² is odd (not even)”, and n = 2k+1 gives n² = 2(2k²+2k)+1, odd. It’s logically equivalent to the original.',
        'That’s the converse-ish restatement, not the contrapositive, and it doesn’t prove the target statement.',
        'This mixes the pieces up — it negates one side and swaps wrongly; it isn’t the contrapositive.',
        'Simply false (an even n has an even square) and not the contrapositive form.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A proof by induction shows a formula holds for n = 1 and that “holding for n forces holding for n+1”. Why does that establish it for ALL positive integers?',
      options: [
        'The base case starts the ladder and the step passes truth from each rung to the next, so every rung is reached',
        'Because it was checked for enough values to be statistically certain',
        'Because n+1 is always larger than n',
        'Because contradiction rules out every counterexample directly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: base case (n=1 true) plus the step (n true ⇒ n+1 true) chains truth up through every integer — the domino principle covering infinitely many cases.',
        'Induction is not statistical; a finite number of checks never certifies all n — the step is what generalises.',
        '“n+1 > n” is just counting; it’s the IMPLICATION n ⇒ n+1, together with the base, that does the work.',
        'That describes contradiction, a different technique; induction works by propagating truth upward, not by refuting counterexamples.',
      ],
    },
  ],
}
