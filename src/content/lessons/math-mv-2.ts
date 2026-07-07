import type { Lesson } from '../../types'

export const mathMv2Lesson: Lesson = {
  nodeId: 'math-mv-2',
  screens: [
    {
      kind: 'explain',
      title: 'The chain rule, now with more wires',
      body: [
        'Suppose f depends on x and y, but x and y both depend on time t. How fast does f change as t ticks? Every path from t to f contributes, and you ADD them: df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt).',
        'Read it as "sum over every route": t nudges x which nudges f, plus t nudges y which nudges f. That is the multivariable chain rule.',
        'It is the exact rule that backpropagation runs to train a neural net — error flows backward through every path from output to weight, and the contributions add up.',
      ],
      deeper: [
        'The single-variable chain rule df/dt = (df/dx)(dx/dt) is just this with one wire. Add more intermediate variables and you add more terms — one product per path. When the "paths" become layers of a network, this same summation, applied layer by layer from the output backward, IS backprop; nothing deeper is going on than "add up every route".',
      ],
      links: [{ nodeId: 'math-calculus-2', label: 'Refresher: the single-variable chain rule' }],
    },
    {
      kind: 'predict',
      question:
        'A drone’s altitude cost is f = x² + y², and it flies the unit circle: x = cos t, y = sin t (so it stays exactly distance 1 from the origin). Without computing, what should df/dt be?',
      options: [
        'Zero everywhere — on the unit circle x² + y² = 1 is constant, so f never changes',
        'A large positive number — the drone is always moving',
        'It grows steadily with t',
        'It equals the drone’s speed',
      ],
      correctIndex: 0,
      reveal:
        'On the unit circle x² + y² = 1 by definition, so f = 1 at every instant — a constant. A constant’s rate of change is zero, so df/dt = 0. The chain rule must agree: (2x)(−sin t) + (2y)(cos t) = 2cos t(−sin t) + 2sin t(cos t) = 0. Motion along a level curve costs nothing — the reason the gradient is perpendicular to contours.',
    },
    {
      kind: 'explain',
      title: 'Many outputs at once: the Jacobian',
      body: [
        'Now let a whole VECTOR of outputs depend on a vector of inputs — say a map takes (r, θ) to (x, y). Collect every partial ∂(output_i)/∂(input_j) into a grid and you get the JACOBIAN matrix J.',
        'For polar → cartesian, x = r·cosθ and y = r·sinθ, the Jacobian is J = [[cosθ, −r·sinθ], [sinθ, r·cosθ]]. Row i is the gradient of output i; column j says how every output responds to input j.',
        'This is the SAME Jacobian you met as a robot arm’s velocity map and as the EKF’s linearization — one matrix of partials, wearing three hats.',
      ],
      deeper: [
        'The Jacobian is the best LINEAR approximation of a nonlinear map near a point: a tiny input step d moves the output by roughly J·d. Its determinant is the local area-scaling factor — for polar coordinates det J = r, which is exactly the r that shows up in the area element r·dr·dθ. Where det J = 0 the map crushes area flat and loses invertibility: a robot-arm singularity, or a coordinate system breaking down.',
      ],
      links: [
        { nodeId: 'robo-kinematics-3', label: 'Same object: the arm Jacobian & singularities' },
        { nodeId: 'robo-estimation-3', label: 'Same object: the EKF linearization' },
      ],
    },
    {
      kind: 'predict',
      question:
        'The polar→cartesian Jacobian has determinant det J = r. What happens to this map right at the origin, r = 0?',
      options: [
        'It becomes singular (det J = 0) — every angle θ maps to the same point, so the map can’t be undone there',
        'Nothing special — the origin is an ordinary point',
        'The determinant blows up to infinity',
        'The map becomes perfectly area-preserving',
      ],
      correctIndex: 0,
      reveal:
        'At r = 0, det J = 0. Geometrically the origin is where all the θ values collapse onto a single point — you can’t recover an angle from it, so the map isn’t invertible there. That’s a genuine singularity, the same phenomenon as a robot arm folded to det(J) = 0 or the north-pole gimbal-lock of latitude/longitude.',
    },
    {
      kind: 'code',
      prompt:
        'Build the polar→cartesian Jacobian and read off its determinant. Fill in the four partials of x = r·cosθ and y = r·sinθ, then confirm det J = r at two configurations.',
      starter: `function jacDet(r, th) {
  // J = [[dx/dr, dx/dth], [dy/dr, dy/dth]]
  const dx_dr = 0  // fill in: Math.cos(th)
  const dx_dth = 0 // fill in: -r * Math.sin(th)
  const dy_dr = 0  // fill in: Math.sin(th)
  const dy_dth = 0 // fill in: r * Math.cos(th)
  const det = dx_dr * dy_dth - dx_dth * dy_dr
  return det.toFixed(2)
}
print('det J at r=3, th=0:    ' + jacDet(3, 0))
print('det J at r=5, th=pi/2: ' + jacDet(5, Math.PI / 2))`,
      expected: `det J at r=3, th=0:    3.00
det J at r=5, th=pi/2: 5.00`,
      hint: 'Differentiate x = r·cosθ and y = r·sinθ. With respect to r, cosθ/sinθ are constants; with respect to θ, r is the constant.',
      success:
        'det J = r at both points (3.00 and 5.00), exactly as the algebra promised: cosθ·(r·cosθ) − (−r·sinθ)·sinθ = r·(cos²θ + sin²θ) = r. The determinant tells you how much the map stretches area locally — and it vanishing at r = 0 is precisely the origin singularity.',
    },
    {
      kind: 'quiz',
      question:
        'f depends on x and y, and both depend on t. Which expression is the multivariable chain rule for df/dt?',
      options: [
        '(∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)',
        '(∂f/∂x)(∂f/∂y)',
        '(∂f/∂x) + (∂f/∂y)',
        '(df/dx)(dy/dt)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: sum over both paths t→x→f and t→y→f, each a product of the two links in that path.',
        'That multiplies the two partials together — the chain rule sums PATHS, it doesn’t multiply the partials by each other.',
        'You must weight each partial by how fast its variable changes with t (dx/dt, dy/dt); bare partials omit the second link of each path.',
        'That uses only one path and mismatches the links (∂f/∂x should pair with dx/dt, not dy/dt), and drops the y-path entirely.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What are the entries of a Jacobian matrix J for a map from inputs (u, v) to outputs (p, q)?',
      options: [
        'The partial derivatives ∂(output_i)/∂(input_j) — row i is the gradient of output i',
        'The values of p and q at each point',
        'The second derivatives of a single function',
        'Only the diagonal partials ∂p/∂u and ∂q/∂v',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: J packs every first partial of every output with respect to every input, one row per output.',
        'The Jacobian holds SLOPES (partials), not the output values themselves.',
        'A grid of second derivatives is the Hessian; the Jacobian is first derivatives of a vector-valued map.',
        'The off-diagonal partials (∂p/∂v, ∂q/∂u) are essential — they capture cross-coupling and are exactly what makes a Jacobian more than a list of 1-D slopes.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A Jacobian’s determinant is zero at some point. What does that signal?',
      options: [
        'The map is locally singular there — it collapses area/volume and can’t be inverted',
        'The map is especially well-behaved and easy to invert there',
        'The outputs are all zero there',
        'The inputs must be zero there',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: det J = 0 means the linear approximation flattens some direction to nothing, so information (and invertibility) is lost — a coordinate singularity or a robot-arm singularity.',
        'Zero determinant is the opposite of invertible — it’s exactly where you CAN’T undo the map.',
        'The determinant measures area-scaling, not output magnitude; outputs can be anything when det J = 0.',
        'Inputs need not be zero — for the polar map det J = 0 happens at r = 0, but singularities in general occur at all sorts of input values.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why do robot kinematics, the EKF, and this polar-coordinate example all keep producing "a Jacobian"?',
      options: [
        'Each linearizes a nonlinear vector map by its matrix of first partials — that matrix IS the Jacobian, whatever the application',
        'It is a coincidence of naming across unrelated fields',
        'They all happen to use polar coordinates internally',
        'The Jacobian only ever means the robot-arm velocity map',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: any time you approximate a nonlinear multi-input/multi-output map by its local linear part, you build the grid of first partials — one concept, reused everywhere.',
        'It’s the same mathematical object each time, not a naming accident — that reuse is the whole point of learning it once.',
        'Only this example uses polar coordinates; the arm and the EKF use their own maps but the same partial-derivative construction.',
        'The arm velocity map is one instance; the Jacobian is the general matrix-of-partials that also linearizes the EKF and this coordinate change.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'f = x·y with x = t² and y = t. Using the chain rule df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt), what is df/dt?',
      options: ['3t²', '2t', 't²', '2t³'],
      correctIndex: 0,
      explanations: [
        'Correct: ∂f/∂x = y = t, dx/dt = 2t, ∂f/∂y = x = t², dy/dt = 1. So df/dt = t·2t + t²·1 = 2t² + t² = 3t². (Check: f = t²·t = t³, and d/dt of t³ is 3t².)',
        '2t misses the second path — you must add the ∂f/∂y·dy/dt term.',
        't² is only the second term; the first path t→x→f contributes 2t² more.',
        'That over-multiplies — substitute and differentiate directly (f = t³ → 3t²) to confirm the right answer is 3t².',
      ],
    },
    {
      question: 'For the map p = 2u, q = u + v, what is the Jacobian matrix J = [[∂p/∂u, ∂p/∂v], [∂q/∂u, ∂q/∂v]]?',
      options: ['[[2, 0], [1, 1]]', '[[2, 1], [0, 1]]', '[[2, 0], [0, 1]]', '[[1, 1], [2, 0]]'],
      correctIndex: 0,
      explanations: [
        'Correct: ∂p/∂u = 2, ∂p/∂v = 0, ∂q/∂u = 1, ∂q/∂v = 1 — row by row, [[2, 0], [1, 1]].',
        'The entries are transposed — row 1 must be p’s partials (∂p/∂u, ∂p/∂v) = (2, 0), not (2, 1).',
        'This drops the cross-term ∂q/∂u = 1; q = u + v depends on u, so the lower-left entry is 1, not 0.',
        'The rows are in the wrong order and mixed up; row 1 is always the first output p’s partials.',
      ],
    },
    {
      question: 'For the polar→cartesian map, det J = r. At r = 4, how much does the map scale a tiny patch of area locally?',
      options: [
        'By a factor of 4',
        'By a factor of 16',
        'By a factor of 1 (no scaling)',
        'By a factor of 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: |det J| is the local area-scaling factor, and det J = r = 4 here, so areas are stretched ×4 — the same r that appears in the polar area element r·dr·dθ.',
        '16 would be r²; the determinant is r itself, so the factor is 4.',
        'Factor 1 (area-preserving) would require det J = 1, i.e. r = 1, not r = 4.',
        'Factor 0 (collapse) happens only at r = 0; at r = 4 the map is a healthy ×4 stretch.',
      ],
    },
    {
      question:
        'In backpropagation, why does a weight deep in the network get its gradient by MULTIPLYING partials along a path and ADDING across paths?',
      options: [
        'That is exactly the multivariable chain rule — multiply the links within each path, sum the contributions of every path from loss to weight',
        'Because neural nets use a special rule unrelated to calculus',
        'Because addition is faster than multiplication on a GPU',
        'Because each weight has only a single path to the loss',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: backprop is the chain rule applied through the network — each path multiplies its links, and where multiple paths reach the same weight, their effects add, just like df/dt summed t→x→f and t→y→f.',
        'It is ordinary multivariable calculus, not a bespoke rule — that’s why understanding this lesson demystifies backprop.',
        'The multiply-then-add structure comes from the chain rule’s math, not from hardware performance considerations.',
        'In any real network a weight influences the loss through MANY paths, which is precisely why the contributions must be summed.',
      ],
    },
  ],
}
