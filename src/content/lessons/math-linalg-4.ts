import type { Lesson } from '../../types'

export const mathLinalg4Lesson: Lesson = {
  nodeId: 'math-linalg-4',
  screens: [
    {
      kind: 'explain',
      title: 'What a matrix can and cannot reach',
      body: [
        'Multiply a matrix A by every possible vector x and collect all the outputs. That set — everything A can produce — is its column space, because A·x is just a weighted blend of A’s columns.',
        'The number of genuinely independent columns is the rank: how many directions the outputs actually span. Two columns pointing the same way count once, so they add nothing new to reach.',
        'This matters the instant you have more equations than unknowns: the answer b you want may simply not live in the column space, and then A·x = b has NO exact solution.',
      ],
      deeper: [
        'The flip side of the column space is the null space: all the vectors x that A crushes to zero (A·x = 0). A full-rank square matrix has only the zero vector in its null space — nothing gets lost, so it is invertible.',
        'When rank is less than the number of columns, some directions collapse to zero (a non-trivial null space), and different x’s produce the same output. That is exactly the det = 0 / singular story from the last lesson, now stated in terms of rank.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'Refresher: determinant 0 = singular' }],
    },
    {
      kind: 'predict',
      question:
        'You have 100 noisy GPS pings and want the single (x, y) that best explains them. Written as A·x = b that is 100 equations for 2 unknowns. What is true of an exact solution?',
      options: [
        'There is almost certainly none — b won’t sit exactly in the 2-dimensional column space, so no x hits every equation',
        'There are infinitely many exact solutions',
        'There is exactly one exact solution, as always',
        'The system is unsolvable and must be thrown away',
      ],
      correctIndex: 0,
      reveal:
        'With 100 noisy readings and only 2 unknowns the equations contradict each other — no single (x, y) satisfies all of them exactly, because the noisy b almost never lands in the 2-D column space A can reach. The system is overdetermined. We don’t throw it away: we ask for the x that comes CLOSEST, which is the whole idea of least squares.',
    },
    {
      kind: 'explain',
      title: 'Closest instead of exact: least squares',
      body: [
        'If we can’t hit b, we settle for the point in the column space nearest to b — its projection. The error we minimize is the squared length ‖A·x − b‖², which is why it’s called LEAST SQUARES.',
        'The best x̂ is found by demanding the leftover error be perpendicular to everything A can reach. That single condition gives the normal equations: AᵀA·x̂ = Aᵀb.',
        'AᵀA is a small square matrix (2×2 for a line fit), so you solve those normal equations exactly even when the original system had thousands of rows. You are about to fit a line this way.',
      ],
      deeper: [
        'Why perpendicular? The projection of b onto the column space is the closest point in it, and “closest” means the residual b − A·x̂ makes a right angle with the subspace. Writing “Aᵀ(b − A·x̂) = 0” IS that perpendicularity, and rearranged it becomes AᵀA·x̂ = Aᵀb.',
        'As long as A’s columns are independent (full column rank), AᵀA is invertible and the least-squares answer is unique: x̂ = (AᵀA)⁻¹Aᵀb. That combination (AᵀA)⁻¹Aᵀ is the pseudoinverse you’ll build next lesson.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Fit the line y = m·x + c to three points by least squares. The sums that make up AᵀA and Aᵀb are already accumulated; finish the intercept with Cramer’s rule (the slope is done for you as a template).',
      starter: `// Points (0,1), (1,1), (2,3) — not collinear, so no exact line fits.
const xs = [0, 1, 2]
const ys = [1, 1, 3]

// Normal equations (AtA)[m,c] = At b, with
//   AtA = [[Sxx, Sx], [Sx, n]]   and   At b = [Sxy, Sy]
let Sxx = 0, Sx = 0, Sxy = 0, Sy = 0, n = xs.length
for (let i = 0; i < n; i++) {
  Sxx += xs[i] * xs[i]
  Sx  += xs[i]
  Sxy += xs[i] * ys[i]
  Sy  += ys[i]
}

const det = Sxx * n - Sx * Sx
const m = (Sxy * n  - Sx  * Sy) / det
const c = 0 /* fill in: (Sxx * Sy - Sx * Sxy) / det */

print('slope m =', m.toFixed(3))
print('intercept c =', c.toFixed(3))`,
      expected: `slope m = 1.000
intercept c = 0.667`,
      hint: 'Cramer’s rule replaces a column of AtA with At b. For c, swap in the second column: c = (Sxx·Sy − Sx·Sxy) / det. Here det = 5·3 − 3·3 = 6.',
      success:
        'The best-fit line is y = 1.000·x + 0.667 — no line hits all three points, but this one minimizes the total squared vertical error. You just solved a 100-could-have-been-1000-row problem by collapsing it to a 2×2 normal-equation solve. That collapse is what makes least squares practical.',
    },
    {
      kind: 'explain',
      title: 'Why robots live and breathe least squares',
      body: [
        'Every calibration, every sensor fit, every “best pose given noisy measurements” is a least-squares problem: more data than unknowns, no exact answer, so project onto what the model can reach.',
        'Fitting a plane to a lidar point cloud, calibrating a camera, estimating a robot’s trajectory from odometry — all are AᵀA·x̂ = Aᵀb at heart.',
        'It’s also the backbone of machine learning: linear regression is exactly this normal-equation solve, and the projection idea generalizes to fitting any model to noisy reality.',
      ],
      links: [{ nodeId: 'ai-learning', label: 'Same math: linear regression as least squares' }],
    },
    {
      kind: 'predict',
      question:
        'A least-squares fit gives a residual (leftover error) vector. What is special about this residual relative to the columns of A?',
      options: [
        'It is perpendicular to the column space — that perpendicularity is exactly what “closest” means and what defines the solution',
        'It is parallel to the first column of A',
        'It is always the zero vector',
        'It points in a random direction each time',
      ],
      correctIndex: 0,
      reveal:
        'The residual b − A·x̂ is perpendicular to everything A can produce. That’s not a coincidence — “the closest point in a subspace” is precisely the one whose error makes a right angle with the subspace, and writing that condition down (Aᵀ·residual = 0) gives the normal equations. If the residual were zero we’d have an exact solution; in real noisy problems it isn’t, but it’s always orthogonal.',
    },
    {
      kind: 'quiz',
      question: 'What is the column space of a matrix A?',
      options: [
        'The set of all vectors A can output — every possible A·x, i.e. all combinations of A’s columns',
        'The set of all x that A sends to zero',
        'The list of A’s diagonal entries',
        'The largest determinant among A’s submatrices',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: since A·x is a weighted sum of A’s columns, the reachable outputs are exactly all combinations of those columns — the column space.',
        'That describes the NULL space (vectors crushed to zero), which is a different subspace from the column space.',
        'The diagonal entries are just numbers in the matrix; they don’t form the column space.',
        'Determinants of submatrices relate to rank but are not the column space, which is a set of output vectors.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A system A·x = b is overdetermined (more equations than unknowns) with noisy data. What does least squares find?',
      options: [
        'The x̂ that minimizes ‖A·x − b‖² — the closest reachable point to b',
        'An exact solution that satisfies every equation',
        'The x that makes b zero',
        'The largest possible x',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: when no exact solution exists, least squares returns the x̂ whose output is as close to b as possible, minimizing the total squared error.',
        'The whole premise is that NO exact solution exists — the noisy equations contradict each other, so we settle for closest.',
        'Least squares doesn’t zero out b; it finds the reachable output nearest to b.',
        '“Largest x” is meaningless here; the goal is smallest error, not largest solution.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What are the normal equations for the least-squares solution of A·x = b?',
      options: [
        'AᵀA·x̂ = Aᵀb',
        'A·x̂ = b exactly',
        'A⁻¹·x̂ = b',
        'x̂ = A·b',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: multiplying through by Aᵀ enforces that the residual is perpendicular to the column space, giving the small square system AᵀA·x̂ = Aᵀb.',
        'A·x̂ = b exactly is what has NO solution for an overdetermined noisy system — the normal equations are how we get around that.',
        'A⁻¹ doesn’t even exist for a non-square (tall) A; that’s exactly why we form AᵀA, which IS square.',
        'x̂ = A·b has the wrong shapes and no geometric meaning; the correct projection condition is AᵀA·x̂ = Aᵀb.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The rank of a matrix equals the number of independent columns. If a 3-column matrix has rank 2, what follows?',
      options: [
        'One column is a combination of the others, so the outputs only span a 2-D space and the matrix has a non-trivial null space',
        'The matrix is invertible and full rank',
        'The matrix has three independent output directions',
        'The matrix must be the zero matrix',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rank 2 with 3 columns means the columns are dependent — one is redundant — so outputs fill only a 2-D space and some non-zero x gets crushed to zero (a non-trivial null space).',
        'Rank below the column count is exactly NOT full rank; such a matrix is singular/non-invertible.',
        'Rank 2 means only two independent output directions, not three — that redundancy is the point.',
        'A rank-2 matrix has real content; only rank 0 is the zero matrix.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'You fit a line to 500 noisy sensor points. How big is the matrix AᵀA that the normal equations actually make you solve?',
      options: [
        '2×2 — one row/column per unknown (slope and intercept), no matter how many data points',
        '500×500 — one per data point',
        '500×2 — the same shape as A',
        '1×1 — a single number',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: AᵀA has size (#unknowns)×(#unknowns). A line has 2 unknowns, so AᵀA is 2×2 — the 500 rows get summed away. That collapse is why least squares scales.',
        'The data-point count sets A’s height, but AᵀA is governed by the number of unknowns, so it stays 2×2.',
        '500×2 is the shape of A itself; AᵀA multiplies Aᵀ (2×500) by A (500×2) to give 2×2.',
        'A single number would only be right for one unknown; a line has two (slope and intercept).',
      ],
    },
    {
      question: 'Why must A have independent columns (full column rank) for the least-squares solution to be unique?',
      options: [
        'Only then is AᵀA invertible, so x̂ = (AᵀA)⁻¹Aᵀb is a single well-defined answer',
        'Because otherwise b would be zero',
        'Because independent columns make the data noiseless',
        'It doesn’t matter — least squares is always unique',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dependent columns make AᵀA singular (non-invertible), so the normal equations have infinitely many solutions. Full column rank makes AᵀA invertible and pins down one x̂.',
        'b’s value is unrelated to column independence; the issue is whether AᵀA can be inverted.',
        'Independence is about the model’s columns, not the noise in the measurements.',
        'It very much matters: a rank-deficient A gives a non-unique least-squares solution — the case the pseudoinverse handles next lesson.',
      ],
    },
    {
      question: 'The least-squares residual b − A·x̂ is orthogonal to the column space of A. What does that geometrically guarantee?',
      options: [
        'A·x̂ is the closest point in the column space to b — the orthogonal projection of b',
        'The residual is the longest possible error',
        'b lies inside the column space',
        'The fit passes exactly through every data point',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dropping a perpendicular from b to the subspace lands on the nearest point, so orthogonality of the residual is exactly the condition that A·x̂ is the closest (projected) point.',
        'Orthogonal projection gives the SHORTEST error, not the longest.',
        'If b were in the column space there’d be an exact solution and zero residual; the residual being non-zero and orthogonal means b is outside it.',
        'Passing through every point would mean zero residual — the overdetermined noisy case specifically can’t do that.',
      ],
    },
    {
      question: 'A matrix A sends some non-zero vector x to A·x = 0. What does this tell you?',
      options: [
        'A has a non-trivial null space, so it is rank-deficient and not invertible — different inputs can map to the same output',
        'A is the identity matrix',
        'A must be full rank',
        'x was measured incorrectly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a non-zero vector in the null space means A collapses a direction to zero, so it loses information — rank-deficient, non-invertible, and multiple inputs share an output.',
        'The identity sends only the zero vector to zero; a non-zero x → 0 is the opposite situation.',
        'Having a non-trivial null space is precisely what makes A NOT full rank.',
        'It’s a genuine property of A, not a measurement error — it’s the algebraic face of “singular”.',
      ],
    },
  ],
}
