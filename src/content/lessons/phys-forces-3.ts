import type { Lesson } from '../../types'

export const physForces3Lesson: Lesson = {
  nodeId: 'phys-forces-3',
  screens: [
    {
      kind: 'explain',
      title: 'Momentum: the quantity that never leaks',
      body: [
        'Momentum is p = m·v — mass times velocity. Newton actually stated his second law in terms of it: force is the RATE at which momentum changes.',
        'That rearranges into the impulse-momentum theorem: impulse J = F·Δt = Δp. A small force acting a LONG time changes momentum just as much as a huge force acting briefly.',
        'That’s why airbags and crumple zones work: same crash, same Δp to absorb — but stretching the collision over more time means less peak force on the body inside.',
      ],
      deeper: [
        'Total momentum in a system is conserved whenever no EXTERNAL force acts — internal forces (like two carts colliding) always come in third-law pairs that cancel out of the total. This is why "what goes in must come out" for momentum, even through violent collisions.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A 1000 kg cart moving at 2 m/s couples (perfectly inelastic collision) with an identical stationary 1000 kg cart. What’s their speed right after?',
      options: [
        '1 m/s — momentum is shared across double the mass',
        '2 m/s — the moving cart’s speed doesn’t change',
        '0.5 m/s — half of the original, guessing',
        '4 m/s — momentum doubles somehow',
      ],
      correctIndex: 0,
      reveal:
        'Total momentum before = 1000×2 + 1000×0 = 2000 kg·m/s. After coupling the combined mass is 2000 kg, so v = 2000/2000 = 1 m/s. Momentum is conserved; kinetic energy is NOT (½×1000×2² = 2000 J before, but ½×2000×1² = 1000 J after — half of it became heat and sound in the coupling).',
    },
    {
      kind: 'explain',
      title: 'Elastic vs. inelastic — where does the energy go?',
      body: [
        'Every collision conserves MOMENTUM. Only some collisions — "elastic" ones — also conserve kinetic energy: billiard balls, gas molecules, a Newton’s cradle.',
        'In a real robot gripper closing around an object, the collision is inelastic: momentum balances, but some kinetic energy vanishes into heat, sound and deformation.',
        'A clean special case: two equal masses, one moving and one at rest, colliding elastically. The moving one stops DEAD and the resting one takes off with its exact original speed — the velocities simply swap.',
      ],
      deeper: [
        'That "swap" result falls straight out of solving conservation of momentum AND conservation of kinetic energy simultaneously for equal masses — it’s not a special rule, just what the two equations force to be true. Newton’s cradle is this exact scenario, repeated ball after ball.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — you just learned the equal-mass elastic swap. A rolling cart at 3 m/s elastically strikes an identical stationary cart. What happens?',
      options: [
        'The first cart stops completely; the second moves off at 3 m/s',
        'Both carts move at 1.5 m/s afterward',
        'The first cart keeps most of its speed; the second barely moves',
        'They stick together and move at 1.5 m/s',
      ],
      correctIndex: 0,
      reveal:
        'Equal masses, elastic collision, one starts at rest — the velocities swap completely. The moving cart hands off ALL its velocity and stops; the target cart leaves at exactly 3 m/s. (Sticking together at 1.5 m/s is what an INELASTIC collision would do instead.)',
    },
    {
      kind: 'explain',
      title: 'The spin analogs',
      body: [
        'Rotation mirrors straight-line motion, term for term: force becomes torque (τ = r·F, a twist that depends on how far from the pivot you push), mass becomes moment of inertia I (resistance to spinning up), and momentum becomes angular momentum L = I·ω.',
        'Moment of inertia isn’t just "how much mass" — it’s how mass is DISTRIBUTED. A hoop (all mass at the rim, I = mr²) resists spin-up far more than a solid disk of the same mass (I = ½mr², mass closer to the axis).',
        'And just like linear momentum, angular momentum is conserved when no external torque acts.',
      ],
      deeper: [
        'The classic demo: a figure skater spinning with arms out, then pulling them in. Pulling arms in shrinks I (mass moves closer to the spin axis). With no external torque, L = I·ω must stay constant, so ω has to grow to compensate — she spins faster with no extra push. Curiously, her rotational KINETIC ENERGY actually increases (her muscles do real work pulling her arms in against the spin) — only L is conserved here, not KE. This exact trick is how satellites and some robots reorient themselves with reaction wheels: spin a wheel one way, the body rotates the other way, conserving total angular momentum.',
      ],
      links: [{ nodeId: 'robo-control-3', label: 'Refresher: State-space & the state vector' }],
    },
    {
      kind: 'predict',
      question:
        'Independent step — a skater spins at 2 rad/s with arms out (I = 4 kg·m²). She pulls her arms in, halving her moment of inertia to I = 2 kg·m². No external torque acts. What’s her new spin rate?',
      options: [
        '4 rad/s — L = Iω is conserved, so halving I must double ω',
        '1 rad/s — halving I should halve ω too',
        '2 rad/s — unchanged, since nothing pushed her',
        '8 rad/s — L must have doubled along with the speed-up',
      ],
      correctIndex: 0,
      reveal:
        'L = I·ω is conserved: 4×2 = 8 kg·m²/s before, so afterward 2×ω = 8 → ω = 4 rad/s. It DOUBLES precisely because I was HALVED — L stays fixed, so I and ω move in opposite directions.',
    },
    {
      kind: 'code',
      prompt:
        'Prove momentum conservation yourself. The final speed after a perfectly inelastic collision is (total momentum) ÷ (total mass). Fill in the missing total-momentum line and run both scenarios.',
      starter: `function inelasticCollision(m1, v1, m2, v2) {
  const totalP = 0 // fill in: m1*v1 + m2*v2
  const totalMass = m1 + m2
  return (totalP / totalMass).toFixed(2)
}
print('Cart A (1000kg, 2m/s) couples with stationary cart B (1000kg):', inelasticCollision(1000, 2, 1000, 0))
print('Truck (3000kg, 4m/s) couples with parked car (1000kg):', inelasticCollision(3000, 4, 1000, 0))`,
      expected: `Cart A (1000kg, 2m/s) couples with stationary cart B (1000kg): 1.00
Truck (3000kg, 4m/s) couples with parked car (1000kg): 3.00`,
      hint: 'Total momentum before the collision is simply each mass times its own velocity, added together: m1*v1 + m2*v2',
      success:
        'Cart A settles at 1.00 m/s (shared across double the mass); the truck barely slows to 3.00 m/s because it outweighs the parked car 3-to-1 and drags it along. Neither answer needed to know anything about WHAT happened during the crash — only what went in and what came out.',
    },
    {
      kind: 'quiz',
      question: 'What quantity does impulse (J = F·Δt) equal?',
      options: [
        'The change in momentum, Δp',
        'The change in kinetic energy',
        'The final velocity',
        'The force alone',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the impulse-momentum theorem — a force applied over time changes momentum by exactly that impulse.',
        'Impulse and kinetic-energy change are different bookkeeping systems entirely — impulse is Newton’s second law integrated over time, not energy.',
        'Impulse tells you the CHANGE in momentum, which depends on both mass and the change in velocity — not velocity alone.',
        'Impulse is force multiplied by the TIME it acts — force alone, with no duration, is not an impulse.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do airbags reduce injury in a crash, given that the change in momentum is the same either way?',
      options: [
        'They stretch the collision over more time, lowering the PEAK force for the same impulse',
        'They reduce the total impulse needed to stop you',
        'They add extra momentum to cancel yours',
        'They make your body lighter',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: J = FΔt is fixed by how much your momentum must change. Airbags increase Δt, so the average (and peak) force F needed drops — same impulse, gentler force.',
        'The impulse needed to stop a given momentum is fixed by physics — airbags change HOW that impulse is delivered, not its total size.',
        'Airbags cushion, they don’t add opposing momentum from nowhere — energy and momentum both still come from the crash itself.',
        'Mass doesn’t change in a crash — the entire airbag trick is about stretching TIME, not altering mass.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A hoop and a solid disk have the same mass and radius. Which one is easier to spin up to a given angular speed?',
      options: [
        'The solid disk — its mass sits closer to the axis, giving it a smaller moment of inertia',
        'The hoop — rims always spin easier',
        'They’re identical — same mass, same radius',
        'The hoop, because it has more surface area',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: I = ½mr² for a solid disk vs. I = mr² for a hoop of the same mass and radius — the disk’s mass is distributed closer to the axis, so it resists angular acceleration less.',
        'The opposite is true — pushing mass OUT to the rim (like a hoop) increases moment of inertia, making it HARDER to spin up.',
        'Same mass and radius does NOT mean same moment of inertia — distribution of that mass around the axis is what I actually measures.',
        'Surface area has nothing to do with rotational inertia — it’s entirely about how far each bit of mass sits from the spin axis.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot reaction wheel spins up clockwise inside a satellite body that was previously motionless (no external torque on the system). What happens to the satellite body?',
      options: [
        'It rotates counter-clockwise, keeping total angular momentum at zero',
        'Nothing — internal wheels can’t affect the body',
        'It also spins clockwise, matching the wheel',
        'It accelerates in a straight line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: total angular momentum starts at zero and no external torque acts, so it must STAY zero — the wheel’s clockwise L is exactly canceled by the body turning counter-clockwise.',
        'This is exactly how real spacecraft reorient without thrusters — spinning an internal wheel does turn the body, in the opposite sense.',
        'Matching direction would make total angular momentum nonzero out of nothing — conservation forbids it.',
        'Angular momentum concerns rotation, not straight-line (linear) momentum — nothing here pushes the satellite sideways.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Two carts of equal mass collide. Cart A moves at 4 m/s, cart B is at rest. After an ELASTIC collision, what are their speeds?',
      options: [
        'Cart A: 0 m/s, Cart B: 4 m/s — the velocities swap',
        'Both move at 2 m/s',
        'Cart A: 4 m/s, Cart B: 0 m/s — nothing changes',
        'Cart A: 2 m/s, Cart B: 2 m/s, then they stick',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for equal masses in an elastic collision with one initially at rest, the velocities swap completely — A stops, B leaves at A’s original speed.',
        'Both moving at 2 m/s (splitting the momentum evenly) is what you’d get from an inelastic STICK — not from an elastic collision.',
        'Nothing changing would mean no collision happened at all — momentum must transfer on contact.',
        'Sticking together only happens in a perfectly INELASTIC collision, and even then the shared speed would be 2 m/s, not what’s described here as elastic.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A 0.5 kg ball moving at 6 m/s is caught by a 4.5 kg cart at rest and sticks (perfectly inelastic). What’s the cart+ball speed afterward?',
      options: ['0.6 m/s', '3 m/s', '6 m/s', '1.2 m/s'],
      correctIndex: 0,
      explanations: [
        'Correct: total momentum = 0.5×6 + 4.5×0 = 3 kg·m/s; total mass = 5 kg; v = 3/5 = 0.6 m/s.',
        '3 m/s is the momentum value itself, not divided by the combined mass — v = 3 ÷ 5 = 0.6 m/s.',
        '6 m/s ignores that the much heavier cart must now also be moved — momentum spreads across the full 5 kg.',
        '1.2 m/s would be the answer if the cart weighed only 2 kg — recompute with the actual masses: 3 ÷ 5 = 0.6 m/s.',
      ],
    },
    {
      question:
        'A 0.2 kg hockey puck hits a wall at 10 m/s and bounces straight back at 8 m/s. What is the magnitude of its change in momentum?',
      options: ['3.6 kg·m/s', '0.4 kg·m/s', '2 kg·m/s', '1.6 kg·m/s'],
      correctIndex: 0,
      explanations: [
        'Correct: taking the incoming direction as positive, Δp = m(v_final − v_initial) = 0.2×(−8 − 10) = 0.2×(−18) = −3.6, magnitude 3.6 kg·m/s. The bounce means the two speeds SUBTRACT in effect (they point opposite ways), not cancel.',
        '0.4 kg·m/s treats the puck as if it only changed by (10−8)=2 and forgot the mass entirely — and even then, ignores that it reversed direction.',
        '2 kg·m/s is 0.2×10, just the incoming momentum alone, ignoring the bounce-back entirely.',
        '1.6 kg·m/s is 0.2×8, the outgoing momentum alone — the CHANGE needs both momenta, and the reversal means they add in magnitude, not subtract.',
      ],
    },
    {
      question: 'What does moment of inertia measure?',
      options: [
        'How much an object resists ANGULAR acceleration — depends on mass and how far it sits from the axis',
        'The total mass of an object, nothing more',
        'How fast an object is currently spinning',
        'The torque an object can produce',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: moment of inertia is the rotational analog of mass — resistance to a CHANGE in spin, and it depends on both mass and its distance from the rotation axis.',
        'Total mass is only half the story — the SAME mass gives a different moment of inertia depending on how far from the axis it’s distributed.',
        'Current spin speed is angular velocity (ω), a completely separate quantity from the resistance-to-spinning-up that I describes.',
        'Torque is what CAUSES angular acceleration; moment of inertia is what RESISTS it — they’re related by τ = Iα but are not the same thing.',
      ],
    },
    {
      question:
        'A spinning ice skater has L = 6 kg·m²/s with arms out (I = 3 kg·m²). She then extends her arms even further, raising I to 6 kg·m². What happens to her spin rate?',
      options: [
        'It halves — L stays at 6, so ω must drop as I rises',
        'It doubles — extending arms always speeds things up',
        'It stays the same — spin rate is independent of arm position',
        'It becomes zero — extending arms stops all rotation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: L = Iω is conserved at 6 kg·m²/s. Originally ω = 6/3 = 2 rad/s; with I raised to 6, ω = 6/6 = 1 rad/s — it halves.',
        'Extending (not retracting) the arms INCREASES I, which must DECREASE ω to keep L fixed — the opposite of speeding up.',
        'Arm position changes I directly, and since L is conserved, ω must change to match — it is very much dependent on arm position.',
        'Angular momentum conservation means ω approaches zero only if I approaches infinity — doubling I merely halves ω, it doesn’t stop the spin.',
      ],
    },
  ],
}
