import type { Lesson } from '../../types'

export const roboKinematics3Lesson: Lesson = {
  nodeId: 'robo-kinematics-3',
  screens: [
    {
      kind: 'explain',
      title: 'From positions to velocities: the Jacobian',
      body: [
        'Forward kinematics maps joint ANGLES to hand POSITION. Take its derivative and you map joint SPEEDS to hand VELOCITY. That derivative — a matrix — is the Jacobian, J.',
        'It answers the question every moving robot asks: "if I spin my joints at these rates, how fast and in what direction does the hand move?" In symbols: ẋ = J·θ̇.',
        'And running it backward, θ̇ = J⁻¹·ẋ, tells you the joint speeds needed to move the hand a chosen way — the heart of controlling an arm.',
      ],
      deeper: [
        'The Jacobian is literally the matrix of partial derivatives of the FK map: each column is how the hand position changes when ONE joint moves. For our 2-link arm, J = [[−L₁s₁ − L₂s₁₂, −L₂s₁₂], [L₁c₁ + L₂c₁₂, L₂c₁₂]] (s₁₂ = sin(θ₁+θ₂)). It’s the same Jacobian object you meet in multivariable calculus — robotics just gives it arms and legs.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'Refresher: Determinants & Eigenvectors' }],
    },
    {
      kind: 'predict',
      question:
        'To move the hand a desired way you use θ̇ = J⁻¹·ẋ. What has to be true about J for its inverse J⁻¹ to exist?',
      options: [
        'Its determinant must be nonzero',
        'It must be all positive numbers',
        'It must be symmetric',
        'Its determinant must equal exactly 1',
      ],
      correctIndex: 0,
      reveal:
        'A matrix is invertible exactly when its determinant is nonzero — the same rule from Determinants & Eigenvectors. When det(J) hits ZERO, J⁻¹ blows up and the "what joint speeds do I need?" question has no finite answer. That failure has a physical name: a singularity.',
    },
    {
      kind: 'explain',
      title: 'Singularities: where the arm loses a direction',
      body: [
        'At a singularity, det(J) = 0 and the arm instantaneously loses the ability to move its hand in some direction — no matter how it spins its joints. For our 2-link arm, det(J) = L₁·L₂·sin(θ₂).',
        'That’s zero when θ₂ = 0° (arm fully stretched out) or θ₂ = 180° (fully folded): stretched straight, the hand simply cannot move any further outward.',
        'This is the same phenomenon as gimbal lock — the det = 0 alarm from the linear-algebra lesson, now wearing a robot arm.',
      ],
      deeper: [
        'Near a singularity the inverse J⁻¹ contains huge numbers, so asking for a modest hand velocity demands insane joint speeds — real arms lurch, alarm, or refuse. Path planners deliberately route AROUND singular configurations, and redundant arms (7+ joints) use their extra freedom to dodge them. "Manipulability," a common robot health metric, is basically how far det(J) is from zero.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'Refresher: Determinants & Eigenvectors' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — our 2-link arm has det(J) = L₁·L₂·sin(θ₂), with L₁ = 3, L₂ = 2. At which elbow angle θ₂ is the arm MOST capable of moving in every direction (det farthest from 0)?',
      options: [
        'θ₂ = 90° — sin is largest there, det = 6',
        'θ₂ = 0° — the arm is fully extended',
        'θ₂ = 180° — the arm is folded',
        'θ₂ = 45° — halfway is always best',
      ],
      correctIndex: 0,
      reveal:
        'det(J) = 6·sin(θ₂) peaks at θ₂ = 90°, where det = 6 — the elbow bent square, giving the hand maximum freedom to move any direction. At θ₂ = 0° or 180° det = 0 (singular). "Elbow at a right angle" is genuinely the arm’s most dexterous pose.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — a 6-joint arm is commanded to hold a straight-line path, but as it fully extends to reach the far end, the motors suddenly scream and the controller faults. What happened?',
      options: [
        'It hit a singularity — near full extension det(J)→0, so J⁻¹ demanded impossible joint speeds',
        'It ran out of battery',
        'The forward kinematics formula broke',
        'The arm is too short to reach, so nothing moved',
      ],
      correctIndex: 0,
      reveal:
        'Full extension is the classic singularity: det(J) → 0, so θ̇ = J⁻¹·ẋ explodes — a small commanded hand speed asks for enormous joint rates. Forward kinematics is perfectly fine (angles → position always works); it’s the INVERSE velocity problem that detonates. Good planners keep the path away from that edge.',
    },
    {
      kind: 'code',
      prompt:
        'Find the singularities yourself. Fill in the determinant of the 2-link arm’s Jacobian, det(J) = L₁·L₂·sin(θ₂), then scan the elbow angle. Where does it hit zero?',
      starter: `function detJ(L1, L2, t2deg) {
  const t2 = t2deg * Math.PI / 180
  const det = 0 // fill in: L1 * L2 * Math.sin(t2)
  return det.toFixed(2)
}
print('elbow 0 (extended):', detJ(3, 2, 0))
print('elbow 90 (bent):', detJ(3, 2, 90))
print('elbow 180 (folded):', detJ(3, 2, 180))`,
      expected: `elbow 0 (extended): 0.00
elbow 90 (bent): 6.00
elbow 180 (folded): 0.00`,
      hint: 'The determinant is L1 * L2 * Math.sin(t2)',
      success:
        'det(J) = 0 at both θ₂ = 0° (arm stretched straight) and θ₂ = 180° (arm folded on itself) — the two singular poses where the hand loses a direction of motion. It peaks at 6.00 when the elbow is square (θ₂ = 90°). This one number — how far det(J) sits from zero — is the arm’s manipulability, and keeping it healthy is a real job for motion planners.',
    },
    {
      kind: 'quiz',
      question: 'What does the Jacobian J of a robot arm relate?',
      options: [
        'Joint velocities to end-effector velocity: ẋ = J·θ̇',
        'Joint angles to motor temperature',
        'Link lengths to mass',
        'Battery charge to reach',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: J is the derivative of forward kinematics, mapping how fast the joints turn to how fast (and which way) the hand moves.',
        'Temperature is a thermal/electrical quantity — the Jacobian is pure geometry of motion.',
        'Link lengths and mass relate through dynamics, not the (kinematic) Jacobian.',
        'Battery and reach are unrelated to J, which is about instantaneous velocity mapping.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot arm is at a configuration where det(J) = 0. What does this mean?',
      options: [
        'It is at a singularity — it has lost the ability to move its hand in some direction',
        'It is in its strongest, most capable pose',
        'The arm has broken',
        'The joint angles are all zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: det(J) = 0 means J is non-invertible — a singularity, where some hand-motion direction is instantaneously unreachable.',
        'It’s the opposite of capable — capability (manipulability) is HIGH when det(J) is far from zero.',
        'Nothing is broken physically; it’s a geometric configuration the planner should avoid.',
        'Singularities happen at specific relative angles (e.g. θ₂ = 0° or 180°), not necessarily all-zero angles.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do joint speeds "explode" as an arm approaches a singularity?',
      options: [
        'θ̇ = J⁻¹·ẋ, and near a singularity J⁻¹ contains huge values, so even a small hand velocity demands enormous joint rates',
        'The motors gain extra power near singularities',
        'The forward kinematics formula becomes undefined',
        'Gravity increases at those angles',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: as det(J) → 0, the inverse J⁻¹ grows without bound, so a modest commanded ẋ maps to impractically large θ̇.',
        'The motors don’t gain power — they’re ASKED for impossible speeds, which is why they fault.',
        'Forward kinematics stays perfectly well-defined; it’s the inverse velocity map that blows up.',
        'Gravity is a dynamics effect, unrelated to the kinematic singularity.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How is a robot-arm singularity related to gimbal lock?',
      options: [
        'Both are det = 0 situations where a rotational/motion degree of freedom is instantaneously lost',
        'They are completely unrelated ideas',
        'Gimbal lock only happens in software, singularities only in hardware',
        'Gimbal lock adds a degree of freedom; singularities remove one',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: both are the same math — a determinant hitting zero, collapsing the reachable directions, whether it’s an arm’s Jacobian or a gimbal’s orientation.',
        'They’re the SAME underlying phenomenon (loss of a DOF at det = 0), just in different mechanisms.',
        'Both are physical/mathematical realities regardless of hardware vs software — the det = 0 condition is universal.',
        'Both REMOVE an available degree of freedom; neither adds one.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Inverse kinematics for a 6-joint arm usually can’t be solved with a neat formula. What is the common practical approach?',
      options: [
        'Iterate using the Jacobian — step the joints in the direction that reduces the hand’s error, repeatedly',
        'Guess random angles until one works',
        'Only ever use forward kinematics instead',
        'Add more motors until it becomes easy',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: numerical IK uses J (often J⁻¹ or its pseudoinverse) to nudge the joints downhill toward the target — the same gradient-style iteration seen in optimization and ML.',
        'Random guessing is hopeless in a high-dimensional joint space; the Jacobian gives a principled direction each step.',
        'Forward kinematics alone can’t answer "what angles reach this point" — that’s exactly the inverse problem IK solves.',
        'Extra motors add redundancy (useful for dodging singularities) but don’t remove the need to solve IK numerically.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'For the 2-link arm, det(J) = L₁·L₂·sin(θ₂) with L₁ = 5, L₂ = 4. What is det(J) at θ₂ = 30°?',
      options: ['10', '20', '0', '17.3'],
      correctIndex: 0,
      explanations: [
        'Correct: 5 · 4 · sin(30°) = 20 · 0.5 = 10.',
        '20 is L₁·L₂ with sin treated as 1 — but sin(30°) = 0.5, giving 10.',
        '0 would require θ₂ = 0° or 180°; at 30° the arm is not singular.',
        '17.3 is 20·sin(60°) — that’s the wrong angle; sin(30°) = 0.5 gives 10.',
      ],
    },
    {
      question: 'A "redundant" arm has 7 joints to position a hand that needs only 6 numbers (3 position + 3 orientation). What does the spare joint buy you?',
      options: [
        'Freedom to reconfigure — e.g. dodge singularities and obstacles while keeping the hand fixed',
        'Nothing useful — it is wasted',
        'Twice the reach',
        'It removes the need for inverse kinematics',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the extra DOF lets the elbow roam while the hand stays put, so the arm can avoid singularities, joint limits and obstacles.',
        'It’s highly useful — redundancy is precisely how arms stay dexterous and safe.',
        'Reach is set by link lengths, not joint count; the spare joint adds flexibility, not length.',
        'IK is still required — in fact redundancy makes IK have infinitely many solutions to choose among.',
      ],
    },
    {
      question: 'Manipulability is high when…',
      options: [
        'det(J) is far from zero — the arm can move its hand freely in every direction',
        'det(J) is exactly zero',
        'the arm is fully extended',
        'all joint angles are equal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the farther det(J) is from zero, the more freely and precisely the hand can move — that’s what manipulability measures.',
        'det(J) = 0 is a singularity: the WORST manipulability, not the best.',
        'Full extension (θ₂ = 0°) is a singularity — low manipulability, not high.',
        'Equal joint angles has no special meaning here; manipulability depends on det(J), maximized near a square elbow.',
      ],
    },
    {
      question: 'Numerical inverse kinematics resembles which other technique you have seen?',
      options: [
        'Gradient descent — iteratively step toward lower error using a derivative (here, the Jacobian)',
        'Sorting a list',
        'Binary search on a sorted array',
        'Hashing keys into buckets',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: IK nudges joints downhill along the Jacobian to shrink the hand’s position error — the same iterate-with-a-derivative idea as gradient descent in ML.',
        'Sorting arranges values; it has nothing to do with converging on joint angles.',
        'Binary search needs a sorted 1-D structure; IK searches a continuous multi-joint space via the Jacobian.',
        'Hashing is about lookup, unrelated to iteratively reducing a geometric error.',
      ],
    },
  ],
}
