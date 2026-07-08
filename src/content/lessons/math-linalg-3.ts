import type { Lesson } from '../../types'

export const mathLinalg3Lesson: Lesson = {
  nodeId: 'math-linalg-3',
  screens: [
    {
      kind: 'explain',
      title: 'The number hiding inside a matrix',
      body: [
        'You already know a matrix moves every vector at once — rotating, stretching, flipping the whole plane. But two single numbers summarize what that motion DOES to space.',
        'The first is the determinant: how much the transformation scales AREA. The second lives in the eigenvectors: the special directions the transformation only stretches, never turns.',
        'Get these two and you can read a matrix at a glance — is it invertible, does it flip orientation, which way does it pull hardest.',
      ],
      deeper: [
        'For a 2×2 matrix the columns are two arrows. The unit square (spanned by (1,0) and (0,1)) gets carried to the parallelogram spanned by those two columns.',
        'The determinant is exactly the (signed) area of that parallelogram. Because every shape is built from tiny squares, the SAME factor scales every area on the plane — so one number tells you how the whole transformation swells or shrinks regions.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A matrix takes the unit square (area 1) and stretches it into a rectangle of area 6. If you now draw ANY shape and apply the same matrix, how does its area change?',
      options: [
        'It also gets multiplied by 6',
        'It gets multiplied by a different amount depending on the shape',
        'It stays the same — only the square is affected',
        'It gets multiplied by √6',
      ],
      correctIndex: 0,
      reveal:
        'Every area scales by the SAME factor, 6 — that factor is the determinant. A transformation that sextuples the unit square sextuples a circle, a triangle, anything. That single number is the area-scaling factor of the whole transformation.',
    },
    {
      kind: 'explain',
      title: 'Computing it: ad − bc',
      body: [
        'For the 2×2 matrix with top row (a, b) and bottom row (c, d), the determinant is simply ad − bc.',
        'The identity matrix (1,0 / 0,1) leaves space untouched, and indeed 1·1 − 0·0 = 1 — area unchanged. A matrix that doubles both axes (2,0 / 0,2) gives 2·2 − 0·0 = 4 — area quadrupled, because area is two-dimensional.',
        'The sign matters too: a negative determinant means the transformation FLIPPED orientation, turning the plane over like a mirror. You are about to compute one in code.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Finish the determinant function so it returns ad − bc for the matrix [[a, b], [c, d]]. The two test matrices are already set up — just complete the one returned line.',
      starter: `// Matrix [[a, b], [c, d]]  ->  determinant = a*d - b*c
function det(a, b, c, d) {
  return a * d - /* fill in: what gets subtracted? */ 0
}

// A = [[2, 1], [1, 3]]
print('det A =', det(2, 1, 1, 3))

// B = [[2, 4], [1, 2]]
const dB = det(2, 4, 1, 2)
print('det B =', dB)
if (dB === 0) print('B is singular')`,
      expected: `det A = 5
det B = 0
B is singular`,
      hint: 'The subtracted term is b*c — the product of the OTHER diagonal. For B, 2*2 − 4*1 = 0, which is why it prints "singular".',
      success:
        'det A = 5 means matrix A scales area ×5 and stays invertible. det B = 0 means B collapses the plane — its two columns point the same way, so it is singular. That zero is the most important number in the lesson.',
    },
    {
      kind: 'explain',
      title: 'When the determinant is zero',
      body: [
        'A determinant of 0 means the parallelogram has area 0 — the transformation squashes the whole 2D plane down onto a single line (or even a point).',
        'Once space is flattened like that, different input vectors get mapped to the SAME output. You cannot undo it: there is no way to recover which point you started from, so the matrix has no inverse. We call it singular.',
        'Geometrically, det = 0 exactly means the two columns are linearly dependent — one is just a scaled copy of the other, so they can only sweep out a line, never fill an area.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot arm’s reachable directions are the columns of a matrix. At one pose those columns line up (become parallel), so the determinant hits 0. What has happened to the arm?',
      options: [
        'It has hit a singular configuration — it lost a degree of freedom and can’t move in some direction',
        'It can now move twice as fast',
        'Nothing — a zero determinant is the ideal operating point',
        'It has gained an extra joint',
      ],
      correctIndex: 0,
      reveal:
        'This is a singular configuration (think of gimbal lock, or an arm stretched dead straight). With the determinant 0 the arm momentarily can’t produce motion in some direction, and solving for the joint speeds needed to follow a path blows up. Roboticists deliberately keep det well away from 0 — a healthy, invertible matrix is what lets you solve for joint angles at all.',
    },
    {
      kind: 'explain',
      title: 'Eigenvectors: the directions that don’t turn',
      body: [
        'Most vectors get rotated when a matrix acts on them. But almost every transformation has a few special directions that come out pointing the exact same way — only longer or shorter. Those are its eigenvectors.',
        'The amount each one is stretched is its eigenvalue. Written compactly: A·v = λ·v — “applying A to v just scales v by the number λ.” No rotation, pure stretch.',
        'Take the matrix (3,0 / 0,2). The arrow (1,0) becomes (3,0) — same direction, stretched ×3 (eigenvalue 3). The arrow (0,1) becomes (0,2) — stretched ×2 (eigenvalue 2). Those two axes are its eigenvectors.',
      ],
      deeper: [
        'For a diagonal matrix like (3,0 / 0,2) the eigenvectors are obviously the x- and y-axes, because the matrix scales each axis on its own. General matrices hide their eigenvectors at other angles, but the idea is identical: find the directions the matrix leaves pointing where they were.',
        'The eigenvalue can be negative (the eigenvector flips 180° but stays on the same line) or, for a pure rotation, there may be no real eigenvectors at all — because a rotation turns every direction. That’s a clean way to tell “this matrix rotates” from “this matrix stretches.”',
      ],
    },
    {
      kind: 'predict',
      question:
        'The matrix (5, 0 / 0, 1) acts on the vector (0, 1) — the arrow pointing straight up. What comes out?',
      options: [
        '(0, 1) — unchanged; it’s an eigenvector with eigenvalue 1',
        '(5, 1) — shifted to the right',
        '(0, 5) — stretched five times taller',
        '(5, 0) — rotated onto the x-axis',
      ],
      correctIndex: 0,
      reveal:
        '(0, 1) stays exactly (0, 1): the matrix stretches the x-axis ×5 but leaves the y-axis alone, so (0, 1) is an eigenvector with eigenvalue 1 (unchanged). Meanwhile (1, 0) → (5, 0) is the other eigenvector, eigenvalue 5. Every transformation is easiest to understand along its own eigen-directions.',
    },
    {
      kind: 'explain',
      title: 'Why robots care about both',
      body: [
        'Determinant: it must stay non-zero for the equations that turn a desired hand motion into joint commands to be solvable. When det → 0 you’re at a singularity, and control gets ill-conditioned — the reason arm planners actively avoid those poses.',
        'Eigenvectors: they’re the principal axes of a system. The eigenvectors of a robot’s inertia tell you the natural axes it spins about cleanly; the eigenvalues of a control system tell you whether wobbles grow (unstable) or die out (stable).',
        'Two numbers, read straight off a matrix, that decide whether a robot can move and whether it stays upright. Lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the determinant of the matrix with top row (3, 2) and bottom row (1, 4)?',
      options: ['10', '14', '5', '11'],
      correctIndex: 0,
      explanations: [
        'Correct: ad − bc = 3·4 − 2·1 = 12 − 2 = 10. Space, and every area, is scaled ×10 by this matrix.',
        '14 adds the diagonals (12 + 2) instead of subtracting. The rule is ad − bc, so 12 − 2 = 10.',
        '5 looks like ad − bc with the wrong products; carefully, 3·4 = 12 and 2·1 = 2, giving 12 − 2 = 10.',
        '11 is 12 − 1, but bc = 2·1 = 2, not 1. The full off-diagonal product must be subtracted: 12 − 2 = 10.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A 2×2 matrix has determinant 0. What does that tell you about it?',
      options: [
        'It’s singular — it collapses the plane onto a line and has no inverse',
        'It scales every area to zero size but stays invertible',
        'It rotates the plane by exactly 90°',
        'It’s the identity matrix that leaves everything unchanged',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: det 0 means area is crushed to nothing — the plane flattens onto a line, distinct inputs collide, and the transformation can’t be undone. That’s the definition of singular / non-invertible.',
        'A matrix can’t crush areas to zero and still be invertible — flattening loses information, so no inverse exists. det 0 ⇔ singular.',
        'A 90° rotation preserves area, so its determinant is 1, not 0. Zero determinant is about collapse, not rotation.',
        'The identity has determinant 1·1 − 0·0 = 1. Determinant 0 is the opposite situation: total collapse.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What makes a vector v an eigenvector of a matrix A?',
      options: [
        'Applying A to v gives a scaled copy of v — same direction, A·v = λ·v',
        'Applying A rotates v by 90°',
        'v has length exactly 1',
        'v is the first column of A',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an eigenvector keeps its direction under the transformation; A only stretches (or flips) it by the eigenvalue λ, so A·v = λ·v with no rotation.',
        'The whole point of an eigenvector is that it does NOT get rotated — it stays on its own line. Rotated vectors are the non-eigen directions.',
        'Length doesn’t define an eigenvector (they’re usually given as unit vectors only for convenience). What matters is the DIRECTION being preserved.',
        'A column of A is just a column; an eigenvector is defined by the behaviour A·v = λ·v, which most columns don’t satisfy.',
      ],
    },
    {
      kind: 'quiz',
      question: 'For the diagonal matrix (4, 0 / 0, 7), what are the eigenvectors and their eigenvalues?',
      options: [
        'The x-axis (1, 0) with eigenvalue 4, and the y-axis (0, 1) with eigenvalue 7',
        'The x-axis with eigenvalue 7 and the y-axis with eigenvalue 4',
        'Only the vector (4, 7), with eigenvalue 1',
        'There are none — diagonal matrices rotate every vector',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: this matrix scales x ×4 and y ×7, so (1, 0) → (4, 0) — direction kept, eigenvalue 4 — and (0, 1) → (0, 7) — eigenvalue 7. The axes are its eigenvectors.',
        'The eigenvalues are swapped: the top-left entry 4 scales the x-axis, and the bottom-right 7 scales the y-axis. So x → eigenvalue 4, y → eigenvalue 7.',
        '(4, 7) is not preserved — it maps to (16, 49), a different direction. The preserved directions are the two axes themselves.',
        'Diagonal matrices don’t rotate at all; they scale each axis independently, which is exactly why the axes ARE the eigenvectors here.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The determinant of a 2×2 matrix is −3. What does the NEGATIVE sign tell you (beyond the area factor of 3)?',
      options: [
        'The transformation flips orientation — it mirrors the plane, like turning it over',
        'The matrix is singular',
        'The area actually shrinks to a third',
        'The determinant was calculated incorrectly — it can’t be negative',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the magnitude 3 is the area-scaling factor, and the minus sign means orientation was reversed — the plane got flipped over, as a reflection does.',
        'Singular means determinant exactly 0. −3 is non-zero, so the matrix is perfectly invertible.',
        'The area scales by |−3| = 3 (it grows ×3). The sign concerns orientation, not the size of the scaling.',
        'Determinants are routinely negative — that’s precisely how the math records an orientation flip.',
      ],
    },
    {
      question: 'Why must a robot arm’s Jacobian matrix have a non-zero determinant to solve for the joint speeds that follow a path?',
      options: [
        'A non-zero determinant means the matrix is invertible, so you can work backward from desired hand motion to joint speeds',
        'A non-zero determinant makes the arm move faster',
        'The determinant has to be exactly 1 or the arm can’t move',
        'It doesn’t matter — any determinant works fine',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: solving for joint speeds means inverting the matrix, and only a non-zero determinant guarantees an inverse exists. At det 0 (a singularity) the solution blows up or vanishes.',
        'Speed comes from the commanded motion, not the determinant. The determinant governs whether the inverse — and thus a solution — exists at all.',
        'Any non-zero determinant gives an invertible matrix; it needn’t be 1. Only det = 0 is the problem.',
        'It matters enormously: at det 0 the arm is in a singular configuration and you can’t solve for the required joint motion.',
      ],
    },
    {
      question: 'A pure rotation matrix (turning every vector by 30°) has no real eigenvectors. Why?',
      options: [
        'A rotation changes the direction of every vector, so none come out pointing the same way',
        'Its determinant is zero',
        'Rotation matrices aren’t square',
        'It has infinitely many eigenvectors instead of none',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an eigenvector must keep its direction, but a rotation turns EVERY direction, so no real vector survives unrotated — hence no real eigenvectors.',
        'A rotation preserves area, so its determinant is 1, not 0. The lack of eigenvectors is about direction, not collapse.',
        'Rotation matrices are perfectly square (2×2 here); squareness isn’t the issue.',
        'It’s the opposite of infinitely many — a genuine rotation leaves no direction pointing where it started, so there are none.',
      ],
    },
    {
      question: 'The matrix (1, 0 / 0, 1) — the identity — has what determinant, and what does that mean geometrically?',
      options: [
        'Determinant 1 — area is unchanged because it leaves every vector exactly where it was',
        'Determinant 0 — it collapses the plane',
        'Determinant 2 — it doubles every area',
        'Determinant −1 — it flips the plane',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 1·1 − 0·0 = 1, and a determinant of 1 with no flip means areas are preserved — fitting, since the identity moves nothing.',
        'Determinant 0 would mean collapse, but the identity keeps the full plane intact; its determinant is 1.',
        'Doubling areas needs a factor 2; the identity changes nothing, so the factor is 1.',
        'A −1 would signal an orientation flip, but the identity neither flips nor scales — determinant 1.',
      ],
    },
  ],
}
