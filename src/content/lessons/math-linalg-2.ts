import type { Lesson } from '../../types'

export const mathLinalg2Lesson: Lesson = {
  nodeId: 'math-linalg-2',
  screens: [
    {
      kind: 'explain',
      title: 'A matrix is a function that moves space',
      body: [
        'You already know a vector is an arrow. Now the big idea: a 2×2 matrix is a machine — feed it a vector, it hands you back a new vector.',
        'It isn’t moving one arrow; it applies the SAME rule to every point of the plane at once — rotating, stretching, or shearing all of space together.',
        'Every camera rotation, every robot joint, every screen transform is one of these functions in action.',
      ],
      deeper: [
        'The rule is fixed: a matrix [[a, b], [c, d]] sends the vector (x, y) to (a·x + b·y, c·x + d·y). Two dot products, that’s the whole machine.',
        'A quick shortcut for reading a matrix: its first column is where the arrow (1, 0) lands, and its second column is where (0, 1) lands. Know those two, and you know what the matrix does to everything — because every vector is just a combination of those two building blocks.',
      ],
    },
    {
      kind: 'predict',
      question:
        'The matrix [[2, 0], [0, 2]] applied to the vector (3, 1) gives (2·3 + 0·1, 0·3 + 2·1). What comes out?',
      options: ['(6, 2) — twice as long, same direction', '(5, 3)', '(3, 1) — unchanged', '(6, 6)'],
      correctIndex: 0,
      reveal:
        'Row 1 gives 2·3 + 0·1 = 6, row 2 gives 0·3 + 2·1 = 2. So (3, 1) → (6, 2): the arrow points the same way but is twice as long. That’s a SCALING matrix — the 2s on the diagonal stretch every vector by 2.',
    },
    {
      kind: 'explain',
      title: 'Three transforms to recognize',
      body: [
        'Scaling: a diagonal matrix [[sx, 0], [0, sy]] stretches x by sx and y by sy. Equal numbers zoom uniformly; unequal ones squash one axis.',
        'Rotation: the matrix [[cos θ, −sin θ], [sin θ, cos θ]] spins every vector counter-clockwise by angle θ, keeping its length. At θ = 90° that’s [[0, −1], [1, 0]].',
        'Shear: [[1, 1], [0, 1]] slides points sideways more the higher they are — like pushing the top of a deck of cards. It turns squares into slanted parallelograms.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Take the 90° counter-clockwise rotation [[0, −1], [1, 0]] and apply it to (1, 0) — the arrow pointing right. Row 1: 0·1 + (−1)·0. Row 2: 1·1 + 0·0. Where does it land?',
      options: ['(0, 1) — pointing straight up', '(−1, 0) — pointing left', '(1, 0) — unchanged', '(0, −1) — pointing down'],
      correctIndex: 0,
      reveal:
        'Row 1 = 0, row 2 = 1, so (1, 0) → (0, 1): “right” swings up, exactly a 90° counter-clockwise turn. Notice length is preserved — rotations never stretch. A robot re-aiming a lidar reading into its body frame is doing precisely this multiply.',
    },
    {
      kind: 'code',
      prompt:
        'Let’s run a transform by hand. `apply(M, v)` multiplies a 2×2 matrix by a vector using the rule out = (a·x + b·y, c·x + d·y). The 90° CCW rotation R is filled in. Finish the ONE missing number in R (the top-right entry) so R = [[0, −1], [1, 0]], then run it. It rotates (3, 2) once, then twice (which should be a 180° flip).',
      starter: `function apply(M, v) {
  const [[a, b], [c, d]] = M
  const x = a * v[0] + b * v[1]
  const y = c * v[0] + d * v[1]
  return [x, y]
}

// 90° counter-clockwise rotation. Fill in the missing top-right entry:
const R = [[0, ___], [1, 0]]

const v = [3, 2]
const rotated = apply(R, v)
print('rotated:', rotated[0], rotated[1])

// Apply R twice = 180° rotation (negates the vector)
const twice = apply(R, apply(R, v))
print('twice:', twice[0], twice[1])`,
      expected: `rotated: -2 3
twice: -3 -2`,
      hint: 'The rotation matrix is [[0, −1], [1, 0]], so the top-right entry is −1. Replace ___ with -1.',
      success:
        'That’s a real transformation engine. (3, 2) rotated 90° CCW becomes (−2, 3), and rotating twice flips it to (−3, −2) — a 180° turn. Chain more rotations and you’ve built the core of forward kinematics.',
    },
    {
      kind: 'explain',
      title: 'Multiplying matrices = composing transforms',
      body: [
        'Do one transform, then another. Multiplying the two matrices together makes a SINGLE matrix that does both in one shot — that’s what matrix × matrix means.',
        'Order matters: A·B means “do B first, then A.” Rotate-then-shear is not the same as shear-then-rotate, so matrix multiplication is non-commutative (A·B ≠ B·A in general).',
        'This is exactly how a robot arm works: one rotation matrix per joint, multiplied in order down the arm, gives the hand’s final position.',
      ],
      deeper: [
        'To multiply two matrices, each entry of the result is a row of the left matrix dotted with a column of the right. It’s the same dot-product move as matrix × vector, just done for every column.',
        'Because “do B, then A” reads right-to-left, the joint nearest the hand often sits at the right of the product and the base at the left — the whole arm is one long chain of these multiplications.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You rotate a shape 90°, then rotate it 90° again. What single transform equals doing both?',
      options: [
        'A 180° rotation',
        'No change — the two cancel out',
        'A 90° rotation (they don’t add)',
        'A reflection (a mirror flip)',
      ],
      correctIndex: 0,
      reveal:
        'Composing two 90° rotations gives a 180° rotation — the angles add. Multiply [[0, −1], [1, 0]] by itself and you get [[−1, 0], [0, −1]], which negates every vector: exactly a 180° turn. This is why joint rotations chain so cleanly.',
    },
    {
      kind: 'explain',
      title: 'The identity: the do-nothing matrix',
      body: [
        'The identity matrix I = [[1, 0], [0, 1]] leaves every vector exactly where it is — it’s the number 1 of matrix world.',
        'Multiplying by I changes nothing: I·v = v, and A·I = A. Its columns are (1, 0) and (0, 1), the arrows that stay put.',
        'It’s the natural “home” pose — a joint at zero rotation, a frame not yet moved. Lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does it mean to multiply a 2×2 matrix by a vector?',
      options: [
        'You apply a transformation — the matrix is a function that maps the input vector to a new vector',
        'You add the matrix’s numbers to the vector’s components',
        'You get a single number measuring the vector’s length',
        'Nothing changes unless the matrix is bigger than 2×2',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a matrix is a rule (a linear function) that takes a vector in and returns a transformed vector — rotated, scaled, sheared, or some mix.',
        'Matrix × vector is not component addition. Each output entry is a dot product: a·x + b·y for the top, c·x + d·y for the bottom.',
        'A single number (a length) comes from magnitude, not from a matrix multiply. The output of matrix × vector is another vector.',
        'Even a 2×2 matrix transforms a 2D vector; size isn’t the issue. The identity leaves it unchanged, but most matrices move it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Applying the rotation [[0, −1], [1, 0]] to the vector (0, 1) — pointing up — gives which result?',
      options: [
        '(−1, 0) — pointing left',
        '(1, 0) — pointing right',
        '(0, 1) — unchanged',
        '(0, −1) — pointing down',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: row 1 = 0·0 + (−1)·1 = −1, row 2 = 1·0 + 0·1 = 0, so (0, 1) → (−1, 0). “Up” swings to “left,” a 90° counter-clockwise turn.',
        'Right would be a clockwise turn; this matrix rotates counter-clockwise, so up goes to the left, not the right.',
        'Unchanged would need the identity [[1, 0], [0, 1]]. This rotation actively turns the vector 90°.',
        'Down is a 180° result. One application of this matrix is only 90° counter-clockwise, sending up to left.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does the ORDER of matrix multiplication matter (A·B ≠ B·A)?',
      options: [
        'Because A·B does B’s transform first then A’s, and doing transforms in a different order lands you somewhere else',
        'Because matrices are always bigger than vectors',
        'It doesn’t matter — matrix multiplication is commutative like numbers',
        'Because multiplying flips the sign of every entry',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: A·B means apply B, then A. Rotate-then-shear lands differently from shear-then-rotate, so the product depends on order.',
        'Size isn’t the reason. Even two same-size 2×2 transforms generally give different results when you swap their order.',
        'That’s the trap — unlike plain numbers, matrix multiplication is non-commutative. A·B and B·A usually differ.',
        'Multiplication doesn’t flip signs. Order matters because it changes which transform happens first.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the identity matrix [[1, 0], [0, 1]] do to a vector?',
      options: [
        'Leaves it exactly unchanged — it’s the “do nothing” transform',
        'Doubles its length',
        'Rotates it 90°',
        'Sets it to (0, 0)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: I·v = v for every vector. Its columns are (1, 0) and (0, 1), the basis arrows that stay put — it’s the 1 of matrix multiplication.',
        'Doubling needs [[2, 0], [0, 2]]. The identity’s diagonal is 1s, so lengths are preserved, not scaled.',
        'A 90° rotation is [[0, −1], [1, 0]], not the identity. The identity performs no rotation at all.',
        'The zero matrix [[0, 0], [0, 0]] collapses everything to the origin. The identity keeps each vector where it is.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The scaling matrix [[3, 0], [0, 1]] is applied to (2, 5). What comes out?',
      options: [
        '(6, 5) — x tripled, y untouched',
        '(6, 15) — both tripled',
        '(5, 8) — components added',
        '(2, 5) — unchanged',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: row 1 = 3·2 + 0·5 = 6, row 2 = 0·2 + 1·5 = 5, so (2, 5) → (6, 5). Only the x-axis is stretched, by 3.',
        'The y-diagonal entry is 1, not 3, so y stays 5. Only x is tripled: (6, 5).',
        'Matrix × vector isn’t adding components. Each output is a dot product of a row with the vector.',
        'A diagonal of 3 and 1 does change the vector — x is scaled by 3. Only the identity leaves it unchanged.',
      ],
    },
    {
      question:
        'Composing a 90° rotation with another 90° rotation is the same single transform as…',
      options: [
        'A 180° rotation',
        'The identity (no change)',
        'A 45° rotation',
        'A horizontal reflection',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rotation angles add when you compose them, so 90° + 90° = a 180° rotation, which negates every vector.',
        'They cancel only if the second undoes the first (e.g. +90° then −90°). Two turns the SAME way add up.',
        'Composing does not average the angles — it adds them. Two 90° turns give 180°, not 45°.',
        'A reflection flips across a line; composing two rotations just gives a bigger rotation, here 180°.',
      ],
    },
    {
      question:
        'On a robot arm, the hand’s position is computed by multiplying one rotation matrix per joint. Why must they be multiplied in joint order?',
      options: [
        'Because each joint’s rotation is relative to the one before it, and matrix multiplication is non-commutative — swapping the order moves the hand elsewhere',
        'Because the matrices must all be identical',
        'Because addition of matrices requires an order',
        'Order doesn’t actually matter for robot arms',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each joint transforms the frame set up by the previous joint, and since A·B ≠ B·A, the product must follow the physical chain from base to hand.',
        'The joint matrices are generally different (different angles/axes); what matters is chaining them in order, not that they match.',
        'Forward kinematics multiplies the matrices, it doesn’t add them — and multiplication order is what changes the result.',
        'Order is critical: multiplying joint rotations in the wrong order sends the hand to the wrong place.',
      ],
    },
    {
      question:
        'You apply the identity matrix [[1, 0], [0, 1]], then a 90° rotation. What’s the net effect?',
      options: [
        'Just the 90° rotation — the identity contributes nothing',
        'A 180° rotation',
        'No change at all',
        'The vector is set to (0, 0)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the identity leaves the vector untouched, so composing it with a 90° rotation is exactly the 90° rotation. I is the do-nothing step.',
        'The identity adds no rotation, so the total is 90°, not 180°. Only a second real rotation would reach 180°.',
        'There IS a change — the 90° rotation still turns the vector. The identity is the only part that does nothing.',
        'The identity never zeroes a vector; that’s the zero matrix. Here the result is just the rotated vector.',
      ],
    },
  ],
}
