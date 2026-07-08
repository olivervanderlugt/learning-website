import type { Lesson } from '../../types'

export const physStaticsLesson: Lesson = {
  nodeId: 'phys-statics',
  screens: [
    {
      kind: 'explain',
      title: 'Nothing moving means everything balances',
      body: [
        'A bridge, a robot chassis, a shelf bracket — none of them accelerate. Newton says that for anything at rest, the forces on it must SUM TO ZERO in every direction: ΣF = 0.',
        'But force balance alone isn’t enough. A object can have zero net force and still spin, so we add a second rule: the TORQUES (moments) must also sum to zero: ΣM = 0. A moment is a force times its perpendicular distance from a pivot, M = F·d.',
        'Statics is those two equations applied to a FREE-BODY DIAGRAM — a sketch of one object with every force that acts on it drawn as an arrow. Solve ΣF = 0 and ΣM = 0 and the unknown forces fall out.',
      ],
      deeper: [
        'Why does the moment need a DISTANCE? Because the same force twists harder the farther out you apply it — a long wrench loosens a bolt a short one can’t. The perpendicular distance from the pivot to the force’s line of action is called the moment arm. In 2-D you get three equations total (ΣFx = 0, ΣFy = 0, ΣM = 0), so you can solve for up to three unknown reactions — exactly enough for a beam on two supports.',
      ],
      links: [{ nodeId: 'phys-forces-3', label: 'Refresher: torque, τ = F·d' }],
    },
    {
      kind: 'predict',
      question:
        'A seesaw pivots at its center. A 40 kg child sits 2 m left of the pivot. Where must a 20 kg child sit on the right to balance it (ΣM = 0)?',
      options: [
        '4 m from the pivot — half the weight needs twice the distance to make the same moment',
        '2 m from the pivot — same distance balances any weights',
        '1 m from the pivot — lighter child sits closer',
        'It can never balance — the weights differ',
      ],
      correctIndex: 0,
      reveal:
        'Balance means equal and opposite moments about the pivot: 40·2 = 20·x, so x = 80/20 = 4 m. The lighter child needs a LONGER moment arm to match the heavier one’s twist. This is the whole trick of statics — a small force far out balances a big force close in, because what matters is force TIMES distance.',
    },
    {
      kind: 'explain',
      title: 'Supports push back: reaction forces',
      body: [
        'Rest a beam on two supports and each support pushes up with a REACTION force. Those reactions are exactly what keep ΣF = 0 (they balance the loads) and ΣM = 0 (they balance the twist). Finding them is the bread-and-butter of statics.',
        'The trick: take moments about ONE support. Its own reaction has zero moment arm there (distance 0), so it drops out of the equation, leaving a single unknown — the OTHER reaction — which you solve directly.',
        'Then ΣF = 0 gives the first reaction: it’s just the total load minus the reaction you already found. Two equations, two supports, done.',
      ],
      deeper: [
        'Different supports resist different things: a PIN (or hinge) can push in any direction (two force components) but not resist rotation; a ROLLER pushes only perpendicular to its surface (one component). Choosing which support to take moments about is a free choice — pick the one that kills the most unknowns. A load close to a support is carried mostly by that support; a load at the midpoint splits evenly. That’s why you brace a shelf near where the weight sits.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A 4 m beam rests on supports A (left) and B (right). A heavy box sits 1 m from A (so 3 m from B). Which support carries more of the box’s weight?',
      options: [
        'A — the load is closer to A, so A carries the larger share',
        'B — the farther support always carries more',
        'They split it exactly in half regardless of position',
        'Neither carries any weight until the beam bends',
      ],
      correctIndex: 0,
      reveal:
        'The closer support carries more. Taking moments about A: R_B·4 = W·1, so R_B = W/4 — only a quarter of the weight — leaving R_A = 3W/4. The load leans on whichever support it sits nearer. Slide the box to the middle and the two reactions equalize; slide it over a support and that support takes nearly everything. The code screen sweeps the load across the beam and watches the split shift.',
    },
    {
      kind: 'code',
      prompt:
        'Solve a simply-supported beam. A 100 N load sits distance d from support A on a 4 m beam (A left, B right). Take moments about A — R_B·L = W·d — then use ΣF = 0 for R_A. Fill in the two missing lines and watch the reactions shift as the load moves.',
      starter: `function reactions(L, W, d) {
  const RB = 0 // fill in: W * d / L   (moments about A)
  const RA = 0 // fill in: W - RB       (vertical force balance)
  return 'RA=' + RA.toFixed(1) + 'N  RB=' + RB.toFixed(1) + 'N'
}
const L = 4, W = 100
print('load at 1m: ' + reactions(L, W, 1))
print('load at 2m: ' + reactions(L, W, 2))
print('load at 3m: ' + reactions(L, W, 3))`,
      expected: `load at 1m: RA=75.0N  RB=25.0N
load at 2m: RA=50.0N  RB=50.0N
load at 3m: RA=25.0N  RB=75.0N`,
      hint: 'Moments about A: R_B·L = W·d, so RB = W * d / L. Then vertical balance ΣF = 0 gives RA = W − RB.',
      success:
        'Watch the split slide: load near A (1 m) → A carries 75 N; dead center (2 m) → 50/50; near B (3 m) → B carries 75 N. Every reaction came from just ΣM = 0 (about A) and ΣF = 0. This is the exact calculation that sizes the supports under a robot’s arm, a shelf, or a bridge deck.',
    },
    {
      kind: 'quiz',
      question: 'What two conditions define static equilibrium for a rigid body in 2-D?',
      options: [
        'The forces sum to zero (ΣF = 0) AND the moments sum to zero (ΣM = 0)',
        'Only the forces must sum to zero',
        'Only the moments must sum to zero',
        'The total mass must equal the total force',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: zero net force stops translation and zero net moment stops rotation — both are required for a body to stay at rest.',
        'Force balance alone allows the body to still SPIN; you also need ΣM = 0.',
        'Moment balance alone allows the body to accelerate in a straight line; you also need ΣF = 0.',
        'Mass and force aren’t compared directly; equilibrium is about the force and moment SUMS being zero.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A moment (torque) about a pivot is calculated as…',
      options: [
        'Force times the perpendicular distance from the pivot to the force’s line of action',
        'Force divided by distance',
        'Force plus distance',
        'Mass times acceleration',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: M = F·d, where d is the moment arm — the perpendicular distance from the pivot to the line of the force.',
        'Moment multiplies force by distance, it doesn’t divide — a longer arm gives MORE moment, not less.',
        'Adding force and distance mixes incompatible units; the moment is a product, F·d.',
        'Mass times acceleration is a force (Newton’s second law), not a moment.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'When solving for the two reactions on a beam, why is it smart to take moments about one of the supports?',
      options: [
        'That support’s reaction has zero moment arm there, so it drops out, leaving one equation with one unknown',
        'It makes the beam lighter in the calculation',
        'It doubles the number of equations available',
        'Moments can only ever be taken about a support',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a force at the pivot has distance 0, so its moment is 0 and it vanishes from ΣM — isolating the other reaction so you can solve it directly.',
        'The beam’s weight is unchanged by where you take moments; the trick is about eliminating an unknown, not mass.',
        'You still have the same equations (ΣFx, ΣFy, ΣM); the choice just makes ΣM simpler to solve.',
        'You may take moments about ANY point; a support is chosen because it conveniently cancels a reaction.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A load sits directly above support B. How is it shared between supports A and B?',
      options: [
        'B carries essentially all of it; A carries almost nothing',
        'They split it evenly, 50/50',
        'A carries all of it',
        'Neither carries it; the load floats',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: taking moments about A, R_B·L = W·L (the load’s distance equals the full span), so R_B = W and R_A ≈ 0 — the load leans entirely on the nearest support.',
        'Even splitting only happens when the load is at the MIDPOINT; here it’s over B.',
        'A is the FAR support here, so it carries the least, not the most.',
        'The load is real and supported — it presses down on B, which pushes back up.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A 6 m beam on supports A (left) and B (right) carries a 300 N load 2 m from A. What is the reaction at B? (Moments about A: R_B·6 = 300·2.)',
      options: ['100 N', '200 N', '300 N', '150 N'],
      correctIndex: 0,
      explanations: [
        'Correct: R_B = 300·2/6 = 600/6 = 100 N (and R_A = 300 − 100 = 200 N).',
        '200 N is the reaction at A (the closer support), not B.',
        '300 N is the whole load; the supports share it, they don’t each carry all of it.',
        '150 N would be an even split, but the load isn’t at the midpoint (3 m) — it’s at 2 m.',
      ],
    },
    {
      question:
        'On a balanced seesaw, a 30 N weight sits 3 m left of the pivot. A weight sits 2 m right of the pivot. How heavy is it?',
      options: ['45 N', '20 N', '30 N', '90 N'],
      correctIndex: 0,
      explanations: [
        'Correct: equal moments, 30·3 = W·2, so W = 90/2 = 45 N — the closer weight must be heavier to match.',
        '20 N would give a moment of 40, far short of the 90 on the left.',
        '30 N at 2 m gives moment 60, not the 90 needed to balance.',
        '90 N is the left side’s moment value (N·m), not the weight — divide by the 2 m arm to get 45 N.',
      ],
    },
    {
      question: 'What is a free-body diagram?',
      options: [
        'A sketch of a single object showing every external force acting on it as an arrow',
        'A diagram of the whole structure with no forces marked',
        'A graph of force versus time',
        'A list of the object’s material properties',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: you isolate one body and draw all the forces on it (loads, reactions, weight) — the starting point for applying ΣF = 0 and ΣM = 0.',
        'The whole point is to ISOLATE one body and SHOW its forces, not omit them.',
        'A force-vs-time graph is a different tool; an FBD is a spatial sketch of forces at an instant.',
        'Material properties (like strength) come later; the FBD is purely about the forces acting.',
      ],
    },
    {
      question: 'A pin (hinge) support differs from a roller support because…',
      options: [
        'A pin can react force in any direction; a roller reacts only perpendicular to its surface',
        'A roller can resist rotation but a pin cannot',
        'A pin carries no load at all',
        'They are identical in every way',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a pin provides two force components (any direction) while a roller provides just one (normal to its surface) — which is why a beam typically uses one of each.',
        'Neither a pin nor a simple roller resists rotation; they resist FORCES, and the pin resists more directions.',
        'A pin carries load in two directions — it certainly carries load.',
        'They differ precisely in how many force directions they can react.',
      ],
    },
  ],
}
