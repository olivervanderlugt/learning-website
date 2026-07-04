import type { Lesson } from '../../types'

export const mathLinalgLesson: Lesson = {
  nodeId: 'math-linalg',
  screens: [
    {
      kind: 'explain',
      title: 'The math robots actually run on',
      body: [
        'Pick up your phone and move it: its position, its velocity, the force you apply — every one is a vector, an arrow with a direction and a length.',
        'Master vectors and you can describe where a robot is, where it’s heading, and how hard to push. This is the most-used math in all of robotics.',
        'We’ll build the intuition by dragging arrows, not by memorizing formulas.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot sits at position (2, 1). It moves by the vector (3, 1) — 3 right, 1 up. Where does it end up?',
      options: ['(5, 2)', '(6, 1)', '(3, 1)', '(5, 1)'],
      correctIndex: 0,
      reveal:
        'You add the x-parts and the y-parts separately: (2+3, 1+1) = (5, 2). That component-wise addition IS vector addition, and it’s the same operation whether you’re moving a robot, stacking forces, or blending velocities. Go feel it on the plane next.',
    },
    { kind: 'game', gameId: 'vector-playground' },
    {
      kind: 'explain',
      title: 'How long is an arrow?',
      body: [
        'A vector’s length (its “magnitude”) is how far the arrow reaches. For (3, 4) you can drop a right triangle: 3 across, 4 up.',
        'Pythagoras finishes the job — the length is √(3² + 4²). Direction tells you which way; magnitude tells you how much.',
      ],
    },
    {
      kind: 'predict',
      question: 'What is the magnitude (length) of the vector (3, 4)?',
      options: ['7', '5', '12', '25'],
      correctIndex: 1,
      reveal:
        '√(3² + 4²) = √(9 + 16) = √25 = 5. The famous 3-4-5 triangle. When a robot’s velocity is (3, 4) m/s, its actual speed — the number on a speedometer — is this magnitude, 5 m/s.',
    },
    {
      kind: 'explain',
      title: 'Matrices: machines that move space',
      body: [
        'A matrix is a rule for transforming every vector at once — rotate them, stretch them, flip them. Feed a vector in, a new vector comes out.',
        'A robot arm’s hand position is just its base vector run through one matrix per joint — rotate at the shoulder, rotate at the elbow, and so on.',
        'That’s why linear algebra is non-negotiable for robotics: joints ARE matrices.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A rotation matrix turns every vector 90° counter-clockwise about the origin. Where does the arrow (1, 0) — pointing right — end up?',
      options: ['(0, 1) pointing up', '(-1, 0) pointing left', '(1, 0) unchanged', '(0, -1) pointing down'],
      correctIndex: 0,
      reveal:
        'Rotating “right” by 90° counter-clockwise points it straight up: (1, 0) → (0, 1). Apply the same matrix again and up becomes left (-1, 0). Every camera gimbal and robot joint is applying rotations exactly like this, continuously.',
    },
    {
      kind: 'explain',
      title: 'One idea, two subjects',
      body: [
        'Remember the logic gates you built? Boolean algebra and linear algebra are cousins — both are ways of computing with structured rules.',
        'When you reach the AI nodes, a neural network will be nothing but vectors multiplied by matrices, over and over. You’re building that foundation right now.',
        'Time to lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How do you add the vectors (2, 5) and (4, -1)?',
      options: [
        'Add components: (6, 4)',
        'Multiply components: (8, -5)',
        'Add everything into one number: 10',
        'Add the larger parts only: (4, 5)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: (2+4, 5+(-1)) = (6, 4). Vectors add component-wise — x with x, y with y — which geometrically is laying them tip-to-tail.',
        'That’s not how addition works — multiplying components has no geometric meaning as “combining” two arrows. Add them: (6, 4).',
        'Collapsing to one number throws away direction — the whole point of a vector. Keep the components separate: (6, 4).',
        'You never discard components — each dimension is tracked independently. (2+4, 5−1) = (6, 4).',
      ],
    },
    {
      kind: 'quiz',
      question: 'A drone’s velocity vector is (6, 8) m/s. What is its speed?',
      options: ['14 m/s', '10 m/s', '48 m/s', '7 m/s'],
      correctIndex: 1,
      explanations: [
        '14 is 6+8 — but speed isn’t the sum of components, it’s the arrow’s length: √(6²+8²) = 10.',
        'Correct: √(6² + 8²) = √(36+64) = √100 = 10 m/s. (Another scaled 3-4-5 triangle — here ×2.)',
        '48 is 6×8, the area of the rectangle, not the diagonal length. Speed is √(6²+8²) = 10.',
        'Averaging the components loses the geometry. Magnitude uses Pythagoras: √(36+64) = 10.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does multiplying a vector by the scalar −2 do to it geometrically?',
      options: [
        'Doubles its length and flips it to the opposite direction',
        'Doubles its length, same direction',
        'Halves its length',
        'Rotates it 90°',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the “2” doubles the length; the minus sign reverses the direction (180°). So −2·(1, 1) = (−2, −2).',
        'The negative sign matters — it flips the arrow to point the opposite way. Positive 2 would keep the direction.',
        'Multiplying by 2 (even negative 2) makes it longer, not shorter. Halving would be ×0.5.',
        'Scalars never rotate — they only stretch/shrink and possibly flip. Rotation needs a matrix.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is linear algebra called the foundation of robot kinematics?',
      options: [
        'Robots are built from linear rails',
        'Each joint’s effect is a matrix, and the arm’s position chains those matrices on a vector',
        'It’s the only math that uses arrows',
        'Kinematics avoids numbers entirely',
      ],
      correctIndex: 1,
      explanations: [
        'The name “linear” is about linear functions, not physical rails — robots have plenty of rotating joints.',
        'Correct: forward kinematics multiplies one rotation/translation matrix per joint onto the base position — the whole arm is a product of matrices. That’s the Kinematics node waiting on the map.',
        'Vectors appear elsewhere too; the real reason is that transformations (matrices) compose exactly the way robot joints stack.',
        'Kinematics is drenched in numbers — but the STRUCTURE that organizes them is vectors and matrices.',
      ],
    },
  ],
}
