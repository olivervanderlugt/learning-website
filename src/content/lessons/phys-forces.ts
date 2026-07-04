import type { Lesson } from '../../types'

export const physForcesLesson: Lesson = {
  nodeId: 'phys-forces',
  screens: [
    {
      kind: 'explain',
      title: 'Why things move (and stop)',
      body: [
        'A robot is a body in a physical world of pushes and pulls. To make it move on purpose, you need Newton’s three laws — the rulebook of motion.',
        'First law: things keep doing what they’re doing — resting or moving straight — until a force acts. This stubbornness is called inertia.',
        'So motion doesn’t need a force. CHANGING motion does.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot glides across frictionless ice at a steady 2 m/s and its motor switches OFF. What happens?',
      options: [
        'It keeps gliding at 2 m/s forever',
        'It slows down and stops',
        'It speeds up',
        'It stops instantly',
      ],
      correctIndex: 0,
      reveal:
        'With no friction and no force, the first law rules: it coasts at 2 m/s forever. On real ground, friction is a backward force that slows it — but the “natural” state is to keep going. This is why space probes drift for decades on a single push.',
    },
    {
      kind: 'explain',
      title: 'The second law: F = m·a',
      body: [
        'Newton’s second law is the one you’ll use constantly: force equals mass times acceleration, F = m·a.',
        'Rearranged, a = F/m: the same push gives a light thing more acceleration than a heavy thing. Double the force, double the acceleration; double the mass, halve it.',
        'Time to feel it — launch a cart and hit a target speed.',
      ],
    },
    { kind: 'game', gameId: 'force-sim' },
    {
      kind: 'predict',
      question:
        'You just felt v = a·t (speed builds as acceleration acts over time). If acceleration is the rate of change of velocity, then acceleration is the ___ of velocity.',
      options: ['derivative', 'integral', 'square', 'opposite'],
      correctIndex: 0,
      reveal:
        'Acceleration is the DERIVATIVE of velocity — the rate of change you met in Calculus & Change. And velocity is the derivative of position. Physics and calculus are the same language: Newton literally invented calculus to write these laws. One idea, two subjects.',
      links: [{ nodeId: 'math-calculus', label: 'Refresher: Calculus & Change' }],
    },
    {
      kind: 'explain',
      title: 'The third law & torque',
      body: [
        'Third law: every force has an equal, opposite reaction. A drone’s propeller pushes air down; the air pushes the drone up. A robot wheel pushes the ground back; the ground drives the robot forward.',
        'For rotation, the key idea is torque — a twisting force. A motor’s torque decides whether your robot arm can lift a load or stalls trying.',
        'Lock it in with the quiz.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Newton’s first law says an object with no net force on it will…',
      options: [
        'Keep its current motion (rest stays rest, moving stays moving straight)',
        'Always come to a stop',
        'Accelerate steadily',
        'Move in a circle',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: no net force means no change in motion — inertia keeps it resting or coasting straight at constant speed.',
        'Stopping requires a force (like friction). With zero net force, a moving object keeps moving.',
        'Acceleration needs a net force (second law). Zero force means zero acceleration — constant velocity.',
        'Circular motion needs a constant inward force; with none, the object goes straight.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A 2 kg robot needs to accelerate at 3 m/s². What force does its drive need to provide?',
      options: ['6 N', '1.5 N', '5 N', '0.67 N'],
      correctIndex: 0,
      explanations: [
        'Correct: F = m·a = 2 × 3 = 6 N. Force scales with both mass and the acceleration you want.',
        '1.5 is m/a, which has no physical meaning here. F = m·a = 6 N.',
        '5 comes from adding 2 + 3; the law multiplies them: 2 × 3 = 6 N.',
        '0.67 is a/m inverted; you want F = m·a = 6 N.',
      ],
    },
    {
      kind: 'quiz',
      question: 'If you keep the force the same but double a robot’s mass, its acceleration…',
      options: ['Halves', 'Doubles', 'Stays the same', 'Quadruples'],
      correctIndex: 0,
      explanations: [
        'Correct: a = F/m, so doubling m (bottom of the fraction) halves the acceleration. Heavy robots are sluggish for a given motor.',
        'Doubling would need HALF the mass or double the force — mass is in the denominator, so more mass means less acceleration.',
        'Mass directly affects acceleration through a = F/m — more mass, less get-up-and-go for the same push.',
        'Quadrupling would need a ×4 change; doubling mass only halves acceleration.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A drone hovers by pushing air downward. What law explains why this lifts it up?',
      options: [
        'Third law — the air pushes back up with equal force',
        'First law — inertia',
        'F = m·a alone',
        'Gravity reverses',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: action-reaction — pushing air down produces an equal upward push on the drone. Balance that against gravity and it hovers.',
        'Inertia (first law) explains coasting, not the lift force. The upward push is the reaction pair to pushing air down.',
        'F = m·a tells you the effect of a net force, but the SOURCE of the upward force is the third-law reaction to the downdraft.',
        'Gravity still pulls down — the drone counters it with the reaction force, it doesn’t reverse gravity.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Acceleration is to velocity as velocity is to…',
      options: [
        'Position (each is the derivative of the next)',
        'Force',
        'Mass',
        'Time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: velocity is the derivative (rate of change) of position, and acceleration is the derivative of velocity — the calculus chain of motion.',
        'Force causes acceleration but isn’t what velocity is the rate-of-change of — that’s position.',
        'Mass is a property of the object, not something velocity is the derivative of.',
        'Time is what you differentiate WITH RESPECT TO, not the quantity itself — velocity is the rate of change of position over time.',
      ],
    },
  ],
}
