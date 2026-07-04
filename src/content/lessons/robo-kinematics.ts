import type { Lesson } from '../../types'

export const roboKinematicsLesson: Lesson = {
  nodeId: 'robo-kinematics',
  screens: [
    {
      kind: 'explain',
      title: 'Where is my hand?',
      body: [
        'A robot arm is a chain of joints. Tell each joint an angle and the hand ends up somewhere in space. Working out WHERE, from the angles, is forward kinematics.',
        'It sounds simple, but it’s the question a robot must answer dozens of times a second to place a gripper, weld a seam, or hold a camera steady.',
        'The tool for the job is the linear algebra you already met — each joint is a rotation.',
      ],
      links: [{ nodeId: 'math-linalg', label: 'Refresher: Vectors & Matrices' }],
    },
    {
      kind: 'predict',
      question:
        'A 2-joint arm has a fixed shoulder. If you keep the shoulder angle the same but rotate ONLY the elbow, what does the hand do?',
      options: [
        'Traces a circle around the elbow joint',
        'Moves in a straight line',
        'Stays put',
        'Moves the shoulder too',
      ],
      correctIndex: 0,
      reveal:
        'The forearm pivots about the elbow, so the hand sweeps a circle centred on the elbow, with radius equal to the forearm length. Rotating the shoulder instead sweeps the whole arm. Combine the two and the hand can reach a whole 2-D region. Go pose one.',
    },
    { kind: 'game', gameId: 'arm-sim' },
    {
      kind: 'explain',
      title: 'Forward vs inverse — and why one is hard',
      body: [
        'You just did forward kinematics: angles → position, which is a direct calculation (a chain of rotations).',
        'The reverse — “I want the hand HERE, what angles do I need?” — is inverse kinematics, and it’s much harder: there can be many solutions, or none, and it usually needs iteration.',
        'Every pick-and-place robot solves inverse kinematics constantly; forward kinematics is the foundation it’s built on.',
      ],
      deeper: [
        'Formally, each joint contributes a rotation matrix; the hand position is the base point transformed by joint-1’s rotation, then joint-2’s, and so on — a product of matrices, exactly the “matrices transform space” idea from linear algebra.',
        'For our 2-joint arm the forward map is: hand = (L1·cosθ₁ + L2·cos(θ₁+θ₂), L1·sinθ₁ + L2·sin(θ₁+θ₂)). That’s the formula the simulator computed live as you moved the sliders.',
        'Inverse kinematics inverts that relationship — solvable with trig for two joints, but for a 6-joint arm it becomes a genuine numerical problem, often handled by the same gradient ideas used in machine learning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is forward kinematics?',
      options: [
        'Computing the hand/end-effector position from the joint angles',
        'Computing the joint angles needed to reach a target',
        'Making the robot move forward',
        'Measuring motor current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: forward kinematics goes angles → position, a direct calculation by chaining the joints.',
        'That’s INVERSE kinematics (the harder reverse direction): target position → required angles.',
        '“Forward” refers to the direction of the calculation (angles → position), not the robot driving forward.',
        'Motor current is an electrical measurement; kinematics is about geometry — angles and positions.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is inverse kinematics generally harder than forward kinematics?',
      options: [
        'There can be many angle solutions (or none) for one target, often needing iteration',
        'It requires more electricity',
        'It only works on real robots, not in simulation',
        'It ignores the joint lengths',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: several joint combinations can reach the same point (elbow-up vs elbow-down), or none can, so solving backward is ambiguous and often iterative.',
        'Difficulty is mathematical, not electrical — it’s about inverting a many-to-one geometric map.',
        'It’s a math problem, equally present in simulation; nothing about it is hardware-only.',
        'Joint lengths are essential inputs to both directions — inverse kinematics very much depends on them.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Rotating only the elbow of a 2-joint arm moves the hand along…',
      options: [
        'A circular arc centred on the elbow',
        'A straight line',
        'A spiral',
        'It doesn’t move',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the forearm pivots about the elbow, so the hand traces a circle of radius = forearm length.',
        'A single rotation produces circular motion, not a straight line — straight-line motion needs both joints coordinated.',
        'A spiral needs a changing radius; a fixed-length forearm rotating gives a constant-radius circle.',
        'It does move — only if BOTH joint angles are fixed does the hand stay put.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does kinematics connect to linear algebra?',
      options: [
        'Each joint is a rotation (a matrix), and the arm’s pose is a chain of those matrix transforms',
        'It doesn’t — kinematics avoids matrices',
        'Only the motor speeds use vectors',
        'Kinematics replaces linear algebra',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: joints are rotations, rotations are matrices, and chaining joints multiplies those matrices onto the base position — kinematics IS applied linear algebra.',
        'Matrices are central: every joint transform is one, which is exactly why Vectors & Matrices is a prerequisite here.',
        'The whole position calculation — not just motor speeds — is vector/matrix math.',
        'They work together; kinematics is a direct application of linear algebra, not a replacement for it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A 2-joint arm has segments of length 90 and 70. What is the farthest the hand can reach from the base?',
      options: ['160', '20', '6300', '130'],
      correctIndex: 0,
      explanations: [
        'Correct: fully extended (both segments in line), reach = 90 + 70 = 160.',
        '20 is the DIFFERENCE (90−70) — that’s roughly the closest it can fold, not the farthest.',
        '6300 is 90×70 (an area-like product), not a length. Maximum reach adds the lengths: 160.',
        '130 isn’t either sum or difference — straight-out reach is 90 + 70 = 160.',
      ],
    },
    {
      question: 'If forward kinematics is angles → position, inverse kinematics is…',
      options: ['position → angles', 'position → velocity', 'angles → torque', 'speed → distance'],
      correctIndex: 0,
      explanations: [
        'Correct: inverse kinematics starts from a desired hand position and solves for the joint angles that achieve it.',
        'That would be a different (dynamics/derivative) relationship; inverse kinematics is about position → angles.',
        'Angles → torque is part of dynamics/control, not kinematics, which is purely geometric.',
        'Speed → distance is basic motion, unrelated to the joint-angle/position mapping.',
      ],
    },
  ],
}
