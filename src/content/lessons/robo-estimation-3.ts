import type { Lesson } from '../../types'

export const roboEstimation3Lesson: Lesson = {
  nodeId: 'robo-estimation-3',
  screens: [
    {
      kind: 'explain',
      title: 'The world is not linear',
      body: [
        'The plain Kalman filter assumes everything is linear: motion and measurements are matrix multiplications. But real sensors aren’t. A range sensor reports √(x² + y²); a bearing reports an arctangent. Curved, not linear.',
        'The Extended Kalman Filter (EKF) handles this with one trick: at each step, LINEARIZE the nonlinear function around the current best estimate.',
        'And "linearize" means exactly what it did in kinematics — take the Jacobian.',
      ],
      deeper: [
        'The EKF replaces the constant matrices A and H of the linear filter with Jacobians evaluated at the current state: the motion Jacobian F = ∂f/∂x and the measurement Jacobian H = ∂h/∂x. Everything else — predict grows P, update shrinks it with a Kalman gain — runs unchanged. The EKF is just "the Kalman filter, re-linearized every step." It’s the workhorse in the vast majority of real drones, cars and robots.',
      ],
      links: [{ nodeId: 'robo-kinematics-3', label: 'Refresher: the Jacobian' }],
    },
    {
      kind: 'predict',
      question:
        'The EKF works by linearizing a curved function around the current estimate. When does this approximation get DANGEROUS?',
      options: [
        'When uncertainty is large or the function is very curved — the straight-line approximation drifts far from the truth',
        'When the estimate is already perfect',
        'When the sensor is perfectly linear',
        'Never — linearization is always exact',
      ],
      correctIndex: 0,
      reveal:
        'Linearization is only trustworthy CLOSE to the point you linearized about. If your uncertainty is huge (the state could be far away) or the function bends sharply, the tangent line is a poor stand-in and the EKF can diverge — confidently wrong. That failure mode is exactly why fancier filters (UKF, particle filters) exist for strongly nonlinear problems.',
    },
    {
      kind: 'explain',
      title: 'The measurement Jacobian',
      body: [
        'Take a robot at position (x, y) and a beacon at the origin. The range sensor measures r = √(x² + y²) — nonlinear. The EKF needs how r changes with x and y: its Jacobian H = [ x/r, y/r ].',
        'That row vector points in the direction the measurement is most sensitive to — literally the unit vector from the beacon to the robot.',
        'Plug H into the same update machinery and the EKF corrects the full (x, y) state from a single distance reading.',
      ],
      deeper: [
        'H = [x/r, y/r] has length 1 — it’s the direction from beacon to robot. This tells the filter that a range measurement pins down position ALONG that line of sight but says nothing SIDEWAYS (perpendicular to it). One beacon leaves you uncertain along an arc; a second beacon in a different direction supplies a complementary H, and the two range circles intersect to fix your position — trilateration, which is literally how GPS works.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a robot is at (3, 4), beacon at origin. Range r = √(3²+4²) = 5. The measurement Jacobian is H = [x/r, y/r]. Compute it.',
      options: [
        'H = [0.6, 0.8] — the unit vector pointing from origin to the robot',
        'H = [3, 4] — just the position',
        'H = [5, 5] — the range in both slots',
        'H = [0.8, 0.6] — y first',
      ],
      correctIndex: 0,
      reveal:
        'H = [3/5, 4/5] = [0.6, 0.8] — a unit vector (0.6² + 0.8² = 1) pointing straight from the beacon to the robot. It tells the EKF that this range reading constrains position along that line of sight. A perpendicular beacon would give a different H, and together they’d nail down (x, y).',
    },
    {
      kind: 'predict',
      question:
        'Independent step — a self-driving car fuses a wheel encoder (smooth but drifts over time), a GPS (absolute but jumpy), and an IMU (fast but drifts fast). Why run all three through one EKF instead of picking the "best" one?',
      options: [
        'Each covers the others’ weaknesses — the EKF weights each by its uncertainty, moment to moment',
        'More sensors always just means more noise',
        'Because one sensor is secretly perfect',
        'To drain the battery faster',
      ],
      correctIndex: 0,
      reveal:
        'No single sensor is best at everything: the IMU is great for a split second then drifts, GPS is absolute but coarse and jumpy, encoders are smooth but accumulate error. The EKF fuses all three, trusting each exactly where and when it’s strong (via its covariance). That complementary fusion — not any one sensor — is what makes modern localization robust.',
    },
    {
      kind: 'code',
      prompt:
        'Compute the EKF’s measurement Jacobian for a range sensor. Fill in r and the Jacobian H = [x/r, y/r], then evaluate it at two robot positions. Notice H always comes out as a unit vector.',
      starter: `function rangeJacobian(x, y) {
  const r = 0 // fill in: Math.sqrt(x*x + y*y)
  const Hx = 0 // fill in: x / r
  const Hy = 0 // fill in: y / r
  return 'r=' + r.toFixed(2) + ' H=[' + Hx.toFixed(2) + ', ' + Hy.toFixed(2) + ']'
}
print('robot at (3,4):', rangeJacobian(3, 4))
print('robot at (0,5):', rangeJacobian(0, 5))`,
      expected: `robot at (3,4): r=5.00 H=[0.60, 0.80]
robot at (0,5): r=5.00 H=[0.00, 1.00]`,
      hint: 'r = Math.sqrt(x*x + y*y); then Hx = x/r and Hy = y/r',
      success:
        'At (3,4): r=5, H=[0.60, 0.80] — the unit direction from beacon to robot. At (0,5): H=[0.00, 1.00] — straight up the y-axis, since the robot is directly above the beacon. H always has length 1 and points along the line of sight: the range reading fixes position along that line, but not sideways. Two beacons with different H directions triangulate you completely — that’s GPS in one sentence.',
    },
    {
      kind: 'quiz',
      question: 'What problem does the Extended Kalman Filter (EKF) solve that the basic Kalman filter cannot?',
      options: [
        'Nonlinear motion and measurement models — it linearizes them each step with a Jacobian',
        'Running faster on small computers',
        'Working without any sensors',
        'Eliminating all uncertainty',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the basic filter assumes linear (matrix) models; the EKF extends it to curved functions by linearizing about the current estimate via the Jacobian.',
        'The EKF adds computation (Jacobians), so speed isn’t its purpose.',
        'It still needs measurements — it just handles nonlinear ones.',
        'No filter eliminates uncertainty; the EKF manages it through nonlinear models.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does the EKF "linearize" a nonlinear measurement function h(x)?',
      options: [
        'It computes the Jacobian ∂h/∂x at the current estimate — the local slope, used as the measurement matrix H',
        'It ignores the nonlinear part',
        'It averages many random guesses',
        'It converts the robot to a linear track',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the Jacobian is the multivariable derivative — the best local linear approximation — and the EKF uses it in place of the constant H every step.',
        'It approximates, not ignores — the Jacobian captures the function’s local behaviour.',
        'That describes a particle filter or UKF; the EKF uses a single derivative-based linearization.',
        'The robot moves freely; it’s the MATH that’s locally linearized, not the physical path.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The range-sensor Jacobian H = [x/r, y/r] is a unit vector. What does its direction tell you?',
      options: [
        'The line of sight from beacon to robot — the direction the range reading constrains position along',
        'The robot’s velocity',
        'The sensor’s battery level',
        'Nothing — it is an arbitrary number',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: H points from beacon to robot; a range measurement tightens position along that line but leaves the perpendicular (sideways) direction unconstrained.',
        'It’s a spatial direction from a geometry derivative, not a velocity.',
        'Battery has nothing to do with the measurement Jacobian.',
        'It’s highly meaningful — the sensitivity direction of the measurement.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When can an EKF diverge (become confidently wrong)?',
      options: [
        'When uncertainty is large or the model is strongly curved, so the linear approximation is far off',
        'Only when the battery dies',
        'Whenever any measurement arrives',
        'It can never diverge',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: linearization is only valid near the estimate; big uncertainty or sharp curvature makes the tangent a poor model, and errors can compound into divergence.',
        'Divergence is a mathematical failure of linearization, not a power issue.',
        'Measurements normally HELP; divergence comes from bad linearization, not from receiving data.',
        'It certainly can — handling that risk is why UKFs and particle filters exist.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why fuse an IMU, GPS and wheel encoder together rather than trusting the single best one?',
      options: [
        'They have complementary strengths; the EKF weights each by its uncertainty so the estimate is robust when any one fails',
        'It looks more impressive on a spec sheet',
        'Because they all measure exactly the same thing identically',
        'To guarantee zero error',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: IMU is great briefly then drifts, GPS is absolute but jumpy, encoders are smooth but accumulate error — fusing lets each cover the others’ blind spots, weighted by covariance.',
        'It’s about robustness and accuracy, not appearances.',
        'They measure different things with different noise — that DIFFERENCE is exactly why fusing helps.',
        'No fusion gives zero error; it gives a better, more reliable estimate than any single sensor.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A robot is at (6, 8), beacon at origin. What is the range r and the measurement Jacobian H = [x/r, y/r]?',
      options: ['r = 10, H = [0.6, 0.8]', 'r = 14, H = [6, 8]', 'r = 10, H = [6, 8]', 'r = 100, H = [0.06, 0.08]'],
      correctIndex: 0,
      explanations: [
        'Correct: r = √(36+64) = √100 = 10; H = [6/10, 8/10] = [0.6, 0.8], a unit vector.',
        'r = 14 adds 6+8 instead of using the Pythagorean √(x²+y²) = 10.',
        'r = 10 is right, but H must be NORMALIZED by r: [6/10, 8/10], not the raw [6, 8].',
        'r = 100 forgot the square root (100 is x²+y², r is its root, 10).',
      ],
    },
    {
      question: 'The EKF uses Jacobians for BOTH the motion model and the measurement model. What are these called?',
      options: [
        'F = ∂f/∂x (motion) and H = ∂h/∂x (measurement)',
        'Just P and Q',
        'The Kalman gain and its inverse',
        'The state and the control input',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: F linearizes the motion function f, H linearizes the measurement function h — the EKF’s stand-ins for the linear filter’s constant A and H.',
        'P (covariance) and Q (process noise) are separate quantities, not the linearizing Jacobians.',
        'The Kalman gain K is computed FROM F, H and the covariances — it isn’t the Jacobian itself.',
        'State x and control u are inputs; F and H are the derivatives of the model functions.',
      ],
    },
    {
      question: 'One range beacon gives H along the line of sight. Why do GPS receivers need signals from multiple satellites?',
      options: [
        'Each satellite constrains position along a different direction; several intersect to pin down the full 3D position (trilateration)',
        'For redundancy only — one would work fine',
        'To drain less battery',
        'Because satellites are unreliable individually',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a single range fixes you to a sphere/circle; multiple ranges with different H directions intersect to a point — that geometric intersection is trilateration, the basis of GPS.',
        'One range genuinely can’t fix a 3D position — you need several different directions, not just backups.',
        'It’s about geometry (independent directions), not power.',
        'The issue is geometric constraint, not per-satellite reliability.',
      ],
    },
    {
      question: 'A particle filter or UKF is sometimes used instead of an EKF when…',
      options: [
        'The system is strongly nonlinear or very uncertain, where a single linearization would be too inaccurate',
        'The system is perfectly linear',
        'You want to avoid using any probability',
        'The robot has only one sensor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: heavy nonlinearity or large uncertainty breaks the EKF’s single tangent-line approximation, so methods that sample the distribution (particle filter) or its spread (UKF) do better.',
        'A perfectly linear system needs only the basic Kalman filter — no EKF or beyond.',
        'These are MORE deeply probabilistic, not less — they represent the distribution more richly.',
        'Sensor count isn’t the deciding factor; the nonlinearity of the models is.',
      ],
    },
  ],
}
