import type { Lesson } from '../../types'

export const mathLinalg5Lesson: Lesson = {
  nodeId: 'math-linalg-5',
  screens: [
    {
      kind: 'explain',
      title: 'Every matrix is rotate, stretch, rotate',
      body: [
        'The single most useful fact in applied linear algebra: ANY matrix A — square or not, invertible or not — factors as A = U·Σ·Vᵀ. That is the singular value decomposition, the SVD.',
        'Read right to left it says every linear map is three simple moves: rotate the input (Vᵀ), stretch along the axes by non-negative amounts (Σ), then rotate the output (U). No shears, no mystery — just two rotations around a pure stretch.',
        'The stretch factors on Σ’s diagonal are the singular values σ₁ ≥ σ₂ ≥ … ≥ 0. They rank the directions from most-amplified to most-squashed, and they carry nearly everything you want to know about the matrix.',
      ],
      deeper: [
        'For a symmetric matrix the SVD coincides with the eigen-decomposition and the singular values are the sizes of the eigenvalues. In general, σᵢ = √(eigenvalue of AᵀA) — which is why AᵀA (the matrix from least squares) keeps reappearing: its eigenvalues are the squared stretch factors.',
        'The columns of V are the input directions that come out un-rotated (mapped straight to scaled columns of U). So the SVD literally names the principal axes of the transformation, longest stretch first — the same idea as PCA finding the axes of a data cloud.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'Cousin idea: eigenvectors as un-turned directions' }],
    },
    {
      kind: 'predict',
      question:
        'A matrix has singular values σ = (5, 3, 0). One of them is exactly zero. What does that zero tell you about the matrix?',
      options: [
        'It is rank-deficient (rank 2) — it crushes one whole direction to nothing, so it’s singular and non-invertible',
        'It stretches every direction by 5',
        'It is invertible with a clean inverse',
        'It rotates without stretching',
      ],
      correctIndex: 0,
      reveal:
        'A zero singular value means one input direction is flattened to zero — no stretch at all — so the matrix loses a dimension. The rank equals the number of NON-zero singular values (here 2), and any zero σ makes the matrix singular. This is a far more honest test than the determinant: a matrix can have a tiny-but-non-zero σ and be “technically invertible” yet numerically hopeless. The singular values grade exactly how close to collapse you are.',
    },
    {
      kind: 'explain',
      title: 'The condition number: how trustworthy the inverse is',
      body: [
        'The ratio σ_max / σ_min is the condition number. It measures how lopsided the stretch is — how much a matrix amplifies the worst-case error when you invert it.',
        'A condition number near 1 is a healthy, well-behaved matrix. A huge condition number means one direction is stretched vastly more than another, so inverting blows up tiny measurement noise into huge errors — the matrix is “ill-conditioned”.',
        'The determinant can’t see this: a matrix can have a perfectly fine non-zero determinant yet a condition number of a million. Roboticists watch σ_min and the condition number, not just det, to know when a computation is about to become garbage.',
      ],
      deeper: [
        'This is the precise version of “near a singularity everything blows up.” A robot arm’s Jacobian rarely hits det = 0 exactly, but as it APPROACHES a singularity its smallest singular value slides toward zero, the condition number rockets, and the joint speeds needed to follow a path explode. Monitoring σ_min gives an early, graded warning where the determinant only flips at the very end.',
      ],
      links: [{ nodeId: 'robo-kinematics-3', label: 'Where this bites: arm Jacobian near a singularity' }],
    },
    {
      kind: 'code',
      prompt:
        'The pseudoinverse of a diagonal Σ inverts each NON-zero singular value and leaves the zeros as zero. Fill in the reciprocal so tiny/zero directions are safely dropped instead of blowing up.',
      starter: `// Pseudoinverse of a diagonal Sigma: 1/sigma for real stretches,
// 0 for any direction at (or below) the tolerance — that's how A+
// refuses to divide by an almost-zero singular value.
const TOL = 1e-9
function pinvDiag(sigmas) {
  return sigmas.map(s => (s > TOL ? 0 /* fill in: 1 / s */ : 0))
}

print('pinv [2,5]:', pinvDiag([2, 5]).join(' '))
print('pinv [4,0]:', pinvDiag([4, 0]).join(' '))`,
      expected: `pinv [2,5]: 0.5 0.2
pinv [4,0]: 0.25 0`,
      hint: 'Replace the placeholder 0 with 1 / s. The second case has a zero singular value, so that slot stays 0 instead of becoming 1/0 = Infinity.',
      success:
        'Notice the second output: the null direction (σ = 0) maps to 0, NOT to Infinity. That one guard is the whole trick — the pseudoinverse inverts what it can and quietly zeroes what it can’t, so a rank-deficient or noisy matrix still yields a sane answer. Wrap this Σ⁺ between the rotations (A⁺ = V·Σ⁺·Uᵀ) and you have the pseudoinverse of ANY matrix.',
    },
    {
      kind: 'explain',
      title: 'The pseudoinverse: one inverse for every matrix',
      body: [
        'A true inverse A⁻¹ only exists for square, full-rank matrices. The pseudoinverse A⁺ = V·Σ⁺·Uᵀ exists for every matrix and does the sensible thing in every case.',
        'Tall A (more equations than unknowns): A⁺·b gives exactly the least-squares answer from last lesson — the best fit to noisy over-determined data.',
        'Wide A (more unknowns than equations, like a redundant robot arm with more joints than task dimensions): infinitely many exact solutions exist, and A⁺·b picks the one with the smallest norm — the least-effort motion. Same symbol, both problems solved.',
      ],
      links: [{ nodeId: 'math-linalg-4', label: 'The tall case: least squares, revisited' }],
    },
    {
      kind: 'predict',
      question:
        'A 7-joint arm must place its hand at one 6-D pose — 7 unknowns, 6 equations, so infinitely many joint combinations work. You solve with the pseudoinverse J⁺. Which solution do you get?',
      options: [
        'The minimum-norm one — the smallest, gentlest joint motion that still reaches the pose',
        'A random valid pose each time',
        'The one that moves the joints as much as possible',
        'No solution, because the system is underdetermined',
      ],
      correctIndex: 0,
      reveal:
        'For an underdetermined (wide) system the pseudoinverse returns the minimum-norm solution: of all the joint vectors that reach the target, it picks the one with the least total motion. That’s exactly what you want from a redundant arm — reach the goal while doing the least work, keeping spare joints calm. The extra degrees of freedom aren’t a problem; the pseudoinverse resolves them for you, and you can even steer that leftover freedom to dodge obstacles.',
    },
    {
      kind: 'explain',
      title: 'Where the SVD earns its keep in robotics',
      body: [
        'Redundant-arm inverse kinematics: J⁺ turns a desired hand velocity into least-effort joint speeds, and σ_min warns you before a singularity wrecks it.',
        'Point-cloud registration (lining up two lidar scans): the SVD of a cross-covariance matrix gives the exact optimal rotation — the core of the ICP algorithm every mapping robot runs.',
        'And low-rank approximation: keep only the biggest singular values and you compress an image, denoise a signal, or shrink a covariance while keeping its dominant structure. One decomposition, quietly running underneath perception, control and learning. Lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the SVD A = U·Σ·Vᵀ, what sits on the diagonal of Σ, and what does it represent?',
      options: [
        'The singular values σ₁ ≥ σ₂ ≥ … ≥ 0 — the non-negative stretch factors along the transformation’s principal axes',
        'The eigenvectors of A',
        'The rotation angles of U and V',
        'The entries of A itself, unchanged',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Σ is diagonal with the singular values, the amounts A stretches each principal axis, ordered largest to smallest and never negative.',
        'Eigenvectors are directions, not diagonal entries; the columns of V/U hold the directions, Σ holds the stretch sizes.',
        'U and V ARE the rotations, but Σ stores stretch magnitudes, not angles.',
        'The SVD deliberately re-expresses A as rotate-stretch-rotate; Σ holds the stretches, not A’s raw entries.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How do you read a matrix’s rank off its singular values?',
      options: [
        'Rank = the number of NON-zero singular values',
        'Rank = the largest singular value',
        'Rank = the sum of the singular values',
        'Rank = the number of rows',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each non-zero σ is one genuine, un-collapsed direction, so counting them gives the rank; every zero σ is a flattened direction that doesn’t count.',
        'The largest σ is just the biggest stretch, not a count of independent directions.',
        'Summing the singular values gives a size measure (the nuclear norm), not the rank.',
        'Row count is the matrix’s height; rank can be smaller if rows/columns are dependent.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is the condition number σ_max/σ_min a better health check than the determinant?',
      options: [
        'It reveals near-singularity: a matrix can have a fine non-zero determinant yet a huge condition number, meaning inversion amplifies noise catastrophically',
        'The determinant is always wrong',
        'The condition number is always exactly 1',
        'They are the same quantity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the determinant only flips at exact collapse, but the condition number climbs smoothly as σ_min shrinks, warning you early that the inverse is becoming numerically explosive.',
        'The determinant isn’t wrong, just blind to conditioning — it can be healthily non-zero while the matrix is nearly singular.',
        'The condition number is 1 only for a perfectly balanced matrix; ill-conditioned ones have huge condition numbers.',
        'They measure different things: determinant is a signed volume factor, condition number is a stretch RATIO.',
      ],
    },
    {
      kind: 'quiz',
      question: 'For a wide matrix (more unknowns than equations) with infinitely many exact solutions, what does the pseudoinverse A⁺·b return?',
      options: [
        'The minimum-norm solution — the smallest vector among all the exact solutions',
        'The largest-norm solution',
        'No solution, since there are too many',
        'The least-squares residual',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: among all vectors that satisfy the underdetermined system, A⁺ selects the one with the smallest norm — the least-effort choice, ideal for a redundant arm.',
        'It returns the SMALLEST-norm solution, not the largest; minimum effort is the whole appeal.',
        'Infinitely many solutions is not a failure — the pseudoinverse cleanly picks the minimum-norm one.',
        'The residual is what you get in the tall/overdetermined case; here exact solutions exist and A⁺ chooses among them.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A matrix has singular values (10, 0.001). Its determinant is 10·0.001 = 0.01, comfortably non-zero. Should you trust its inverse?',
      options: [
        'No — the condition number is 10/0.001 = 10,000, so inverting hugely amplifies noise even though det ≠ 0',
        'Yes — a non-zero determinant guarantees a safe inverse',
        'Yes — small singular values make matrices more stable',
        'No — the determinant is zero, so it’s singular',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: σ_min = 0.001 is nearly a collapse; the condition number 10,000 means the inverse magnifies measurement error 10,000-fold in the worst direction. Non-zero det doesn’t save you.',
        'A non-zero determinant only rules out EXACT collapse; it says nothing about conditioning, which is what actually wrecks the inverse here.',
        'A tiny singular value is destabilizing, not stabilizing — it’s the direction about to collapse.',
        'The determinant is 0.01, not zero; the problem is conditioning (the ratio of singular values), not exact singularity.',
      ],
    },
    {
      question: 'In the pseudoinverse of Σ, why do we set 1/σ to 0 (rather than a huge number) for singular values at or below the tolerance?',
      options: [
        'Those directions carry no reliable information; zeroing them avoids dividing by ~0 and keeps the solution sane and minimum-norm',
        'Because 1/0 rounds to 0 in JavaScript',
        'To make the pseudoinverse equal to the transpose',
        'Because singular values are never actually zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a (near-)zero σ is a collapsed direction with no trustworthy data; inverting it would explode, so the pseudoinverse drops it, giving the stable minimum-norm answer.',
        '1/0 is Infinity in JavaScript, not 0 — the TOL guard is a deliberate choice, not rounding.',
        'The pseudoinverse equals the transpose only for special (orthonormal) matrices; the zeroing rule is about handling null directions.',
        'Singular values very much can be zero (rank-deficient matrices); handling that case gracefully is the pseudoinverse’s whole purpose.',
      ],
    },
    {
      question: 'Point-cloud registration (ICP) finds the best rotation aligning two lidar scans using the SVD of a cross-covariance matrix. Why the SVD specifically?',
      options: [
        'The SVD extracts the optimal orthogonal rotation directly — U·Vᵀ from the decomposition is provably the best-fit rotation',
        'Because the SVD is the fastest matrix operation',
        'Because rotations have zero determinant',
        'Because point clouds are always square matrices',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the SVD of the cross-covariance matrix yields U and V whose product U·Vᵀ is the exact least-squares optimal rotation aligning the clouds — the mathematical core of ICP.',
        'The SVD is powerful, not merely fast; its value here is that it delivers the provably optimal rotation.',
        'Rotations have determinant +1, not 0 — a zero-determinant “rotation” would be a collapse.',
        'Point clouds aren’t square matrices; the SVD works precisely because it handles any shape.',
      ],
    },
    {
      question: 'A 7-DOF arm uses J⁺ (the pseudoinverse of its Jacobian) for inverse kinematics. As the arm nears a singular configuration, what happens?',
      options: [
        'The smallest singular value of J slides toward 0, the condition number rockets, and the commanded joint speeds explode',
        'Nothing — the pseudoinverse makes singularities harmless',
        'The determinant of J becomes exactly 1',
        'The arm gains an extra degree of freedom',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: approaching a singularity drives σ_min → 0, so 1/σ_min in J⁺ blows up and the joint-speed commands diverge — which is exactly why σ_min is monitored as an early warning.',
        'The pseudoinverse degrades gracefully but does NOT make singularities harmless; near one, its outputs still blow up unless you damp them.',
        'The determinant heads toward 0 near a singularity, not 1 — that collapse is the whole problem.',
        'A singularity is the LOSS of a usable degree of freedom, not the gain of one.',
      ],
    },
  ],
}
