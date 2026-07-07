import type { Lesson } from '../../types'

export const roboKinematics2Lesson: Lesson = {
  nodeId: 'robo-kinematics-2',
  screens: [
    {
      kind: 'explain',
      title: 'Orientation is a matrix',
      body: [
        'You met forward kinematics as a formula. Now the real machinery: a rotation by angle θ in the plane IS the matrix R(θ) = [[cosθ, −sinθ], [sinθ, cosθ]]. Multiply a point by it and the point rotates.',
        'Every joint of a robot arm applies one of these rotations to everything downstream of it.',
        'Chain the joints — multiply their rotation matrices — and you have the arm’s orientation, exactly.',
      ],
      deeper: [
        'The columns of R(θ) are where the x-axis and y-axis land after rotating: the x-axis (1,0) becomes (cosθ, sinθ), the y-axis (0,1) becomes (−sinθ, cosθ). That’s the whole "matrices are where the basis vectors go" idea from linear algebra, applied to a spinning joint. In 3D the same holds with 3×3 rotation matrices — one per axis you can rotate about.',
      ],
      links: [{ nodeId: 'math-linalg-2', label: 'Refresher: Matrices as Transformations' }],
    },
    {
      kind: 'predict',
      question:
        'A rotation matrix R(θ) turns any vector by θ without changing its length. What is the determinant of R(θ)?',
      options: [
        '1 — rotations preserve area and orientation',
        '0 — rotations collapse space',
        'cosθ — it depends on the angle',
        'It has no determinant',
      ],
      correctIndex: 0,
      reveal:
        'det R(θ) = cos²θ + sin²θ = 1, for EVERY angle. A determinant of 1 means area and orientation are perfectly preserved — nothing is stretched, squashed or flipped. (Hold onto that fact: a determinant that DROPS to 0 somewhere is the alarm bell of the next lesson.)',
    },
    {
      kind: 'explain',
      title: 'Rotation + translation = a transform',
      body: [
        'A joint doesn’t just rotate — it also sits at a position. Combining "rotate by θ" with "then shift by the link length" is a homogeneous transform: rotation and translation packed into one operation.',
        'Forward kinematics is then just: start at the base, apply joint 1’s transform, then joint 2’s, then joint 3’s… and read off where the hand ends up.',
        'For a 2-link planar arm this collapses to the formula you saw: x = L₁cosθ₁ + L₂cos(θ₁+θ₂), y = L₁sinθ₁ + L₂sin(θ₁+θ₂).',
      ],
      deeper: [
        'The trick that makes it "one operation" is adding a dummy coordinate: a 2D point (x, y) becomes (x, y, 1), and the transform becomes a 3×3 matrix whose top-left 2×2 block is the rotation and whose last column is the translation. Multiplying these 3×3 matrices chains rotation-and-translation together in one clean product — which is exactly why robotics code represents every joint as a 4×4 matrix in 3D.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a 2-link arm has L₁ = 3, L₂ = 2. Both joints at 0° means the arm is straight along the x-axis. Where is the hand?',
      options: [
        '(5, 0) — the two links add up along x',
        '(0, 5) — straight up',
        '(3, 2) — one link along each axis',
        '(6, 0) — the links multiply',
      ],
      correctIndex: 0,
      reveal:
        'x = 3·cos0 + 2·cos0 = 3 + 2 = 5, y = 0. Straight arm, links laid end to end along x, reach = L₁ + L₂ = 5. The forward map is just the transforms evaluated — no mystery once you plug in.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — same arm (L₁ = 3, L₂ = 2). Now shoulder θ₁ = 0° but elbow θ₂ = 90° (forearm turned to point "up"). Roughly where is the hand?',
      options: [
        '(3, 2) — 3 out along x, then 2 up',
        '(5, 0) — still straight out',
        '(0, 3) — straight up',
        '(2, 3) — swap the links',
      ],
      correctIndex: 0,
      reveal:
        'x = 3·cos0 + 2·cos(90) = 3 + 0 = 3; y = 3·sin0 + 2·sin(90) = 0 + 2 = 2. The upper arm reaches 3 along x, then the elbow bend sends the forearm 2 straight up — hand at (3, 2). Chaining the transforms is exactly this bookkeeping, done by matrix multiplication.',
    },
    {
      kind: 'code',
      prompt:
        'Implement forward kinematics for a 2-link planar arm yourself. Fill in the two missing lines using the transform-chain formula, then read off three poses. (Angles are already converted to radians for you.)',
      starter: `function fk(L1, L2, t1deg, t2deg) {
  const t1 = t1deg * Math.PI / 180
  const t2 = t2deg * Math.PI / 180
  const x = 0 // fill in: L1*Math.cos(t1) + L2*Math.cos(t1 + t2)
  const y = 0 // fill in: L1*Math.sin(t1) + L2*Math.sin(t1 + t2)
  return x.toFixed(2) + ', ' + y.toFixed(2)
}
print('straight (0,0):', fk(3, 2, 0, 0))
print('elbow up (0,90):', fk(3, 2, 0, 90))
print('both bent (90,90):', fk(3, 2, 90, 90))`,
      expected: `straight (0,0): 5.00, 0.00
elbow up (0,90): 3.00, 2.00
both bent (90,90): -2.00, 3.00`,
      hint: 'x = L1*Math.cos(t1) + L2*Math.cos(t1 + t2), and y is the same with sin instead of cos',
      success:
        'Straight arm → (5, 0), reach 5. Elbow up → (3, 2). Both at 90° → (−2, 3): the shoulder swings the whole arm up (+y), then the elbow folds the forearm back toward −x. Notice the elbow term always uses θ₁+θ₂ — the forearm’s angle is measured in the WORLD, because joint 2 stacks on top of joint 1. That "angles add down the chain" is the signature of chained transforms.',
    },
    {
      kind: 'quiz',
      question: 'The 2D rotation matrix is R(θ) = [[cosθ, −sinθ], [sinθ, cosθ]]. What do its columns represent?',
      options: [
        'Where the x-axis and y-axis land after rotating by θ',
        'The lengths of the two robot links',
        'The joint velocities',
        'The determinant and trace',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: column 1 = (cosθ, sinθ) is where (1,0) goes; column 2 = (−sinθ, cosθ) is where (0,1) goes. A matrix is defined by where it sends the basis vectors.',
        'Link lengths are separate scalars (L₁, L₂) — the rotation matrix only encodes orientation, not size.',
        'Velocities involve derivatives (next lesson’s Jacobian) — R(θ) itself is a static orientation.',
        'Determinant (1) and trace (2cosθ) are properties you can compute FROM R, but they aren’t what the columns are.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is a "homogeneous transform" used instead of just a rotation matrix?',
      options: [
        'It packs rotation AND translation into a single matrix you can chain by multiplication',
        'It makes the numbers smaller',
        'It removes the need for angles',
        'It only works in 2D',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a joint both rotates and sits at an offset; the homogeneous transform combines both so chaining joints is one clean matrix product.',
        'It actually adds a dummy coordinate (bigger matrix), trading size for the ability to combine rotation and translation.',
        'Angles are still there — they live inside the rotation block of the transform.',
        'It generalizes directly to 3D (4×4 matrices); 2D is just the small case.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'For a 2-link arm, the forearm’s term in the FK formula uses the angle (θ₁ + θ₂) rather than just θ₂. Why?',
      options: [
        'Joint 2 is mounted on joint 1, so its orientation in the world is the sum of both joint angles',
        'It’s an arbitrary convention with no physical meaning',
        'Because θ₂ is always larger than θ₁',
        'To make the numbers come out positive',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: transforms chain — the elbow rotation stacks on top of the shoulder rotation, so the forearm’s world angle is θ₁ + θ₂.',
        'It’s deeply physical: it’s exactly what chaining the two joint transforms produces.',
        'No such rule — either angle can be larger; the sum reflects stacking, not magnitude.',
        'It can be negative just fine; the sum comes from the geometry, not sign-fixing.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A rotation matrix always has determinant 1. What does that tell you geometrically?',
      options: [
        'It preserves lengths and areas — it only turns things, never stretches or flips them',
        'It doubles every area',
        'It collapses space to a line',
        'It has no inverse',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: determinant 1 means area and orientation are unchanged — the hallmark of a pure rotation.',
        'Doubling area would be determinant 2 — a rotation never changes area at all.',
        'Collapsing to a line is determinant 0 — the opposite of a rotation (that’s a singularity, coming next).',
        'Determinant 1 ≠ 0, so it very much has an inverse: R(θ)⁻¹ = R(−θ), just rotate back.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does chaining transforms let you handle a 6-joint industrial arm?',
      options: [
        'Multiply the six joint transforms in order; the product places the end-effector in world coordinates',
        'You can’t — chaining only works for 2 joints',
        'You average the six joint angles',
        'Each joint is solved completely independently',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: forward kinematics of ANY serial arm is just the ordered product of its joint transforms — 2 joints or 20, same rule.',
        'Chaining scales to any number of joints — that generality is exactly why the matrix formulation is used.',
        'Averaging angles is meaningless here; the joints compose by matrix multiplication, not averaging.',
        'Joints are coupled through the chain — joint 6’s world position depends on all five joints before it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A 2-link arm (L₁ = 4, L₂ = 3) has θ₁ = 90°, θ₂ = 0° (straight, pointing up). Where is the hand?',
      options: ['(0, 7)', '(7, 0)', '(0, 1)', '(4, 3)'],
      correctIndex: 0,
      explanations: [
        'Correct: straight arm (θ₂=0) pointing up (θ₁=90°): x = 0, y = 4 + 3 = 7.',
        '(7, 0) would be pointing along x (θ₁=0), not up.',
        '(0, 1) is the DIFFERENCE 4−3 — that would need the forearm folded back (θ₂=180°), not straight.',
        '(4, 3) treats the links as separate axes; straight and vertical they add along y to give (0, 7).',
      ],
    },
    {
      question: 'What is the inverse of the rotation matrix R(θ)?',
      options: [
        'R(−θ) — rotate back by the same angle',
        'R(θ) itself — rotations are their own inverse',
        'R(2θ)',
        'The zero matrix',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: undoing a rotation by θ is rotating by −θ, so R(θ)⁻¹ = R(−θ) (which also equals its transpose).',
        'Only a 180° rotation is its own inverse; in general you must rotate the opposite way.',
        'R(2θ) rotates twice as far — that compounds the rotation, it doesn’t undo it.',
        'The zero matrix collapses everything to the origin — a rotation is invertible, never zero.',
      ],
    },
    {
      question: 'In 3D, how many independent single-axis rotation matrices are there (one per axis)?',
      options: ['3 — one about each of x, y, z', '1', '2', '6'],
      correctIndex: 0,
      explanations: [
        'Correct: 3D has three axes (x, y, z), so three basic rotations; any orientation is a product of these.',
        'One axis only covers planar (2D-style) spin — 3D needs all three.',
        'Two axes leave one rotational freedom unreachable; you need all three for full 3D orientation.',
        'Six confuses axes with the ± directions — there are three axes, hence three rotation matrices.',
      ],
    },
    {
      question: 'Forward kinematics of a serial arm is the product of its joint transforms. What operation "undoes" a transform to move back up the chain?',
      options: [
        'Multiplying by that transform’s inverse',
        'Adding the negative of the translation only',
        'Transposing the whole 4×4 matrix',
        'Setting the angle to zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each transform is invertible, and its inverse (rotate back, then un-shift) steps you back up the chain.',
        'Translation alone isn’t enough — you must also undo the rotation, which the full inverse does.',
        'Transposing works for the pure rotation BLOCK, but the translation part needs proper inversion, so transposing the whole matrix is wrong.',
        'Zeroing the angle changes the pose entirely; it doesn’t invert the existing transform.',
      ],
    },
  ],
}
