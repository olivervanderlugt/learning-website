import type { Lesson } from '../../types'

export const mecheMachinesLesson: Lesson = {
  nodeId: 'meche-machines',
  screens: [
    {
      kind: 'explain',
      title: 'The oldest trick: trade distance for force',
      body: [
        'A simple machine — lever, pulley, ramp, wheel-and-axle, screw, wedge — lets a small force do a big job by spreading it over a longer distance. That multiplication is MECHANICAL ADVANTAGE.',
        'But there is no free lunch: WORK IN = WORK OUT (force × distance). If a lever doubles your force, you must push twice as far. Energy is conserved, always.',
        'Every gearbox, winch and robot joint is this same bargain, dressed up.',
      ],
      links: [{ nodeId: 'phys-forces', label: 'The force basics: Forces & Motion' }],
    },
    {
      kind: 'predict',
      question:
        'A lever lifts a heavy rock. You push the long end down 1 metre and the rock rises only 20 cm — but with 5× the force you applied. Did you get something for nothing?',
      options: [
        'No — you traded distance for force: 5× force over 1/5 the distance, so work in equals work out',
        'Yes — the lever created extra energy',
        'No — the lever actually wasted most of your effort',
        'Yes — force and distance are unrelated',
      ],
      correctIndex: 0,
      reveal:
        'Perfectly fair trade. Your hand moved 5× as far as the rock, and the rock felt 5× your force — force×distance is identical on both sides, so no energy appears from nowhere. That ratio (here 5) is the mechanical advantage, and for a lever it equals the effort arm divided by the load arm. A machine reshapes a force; it never manufactures energy.',
    },
    {
      kind: 'code',
      prompt:
        'A lever’s mechanical advantage = effort arm ÷ load arm; the output force is your input force × MA. Because work is conserved, the load moves LESS than your hand by the same factor. Compute how far the load rises.',
      starter:
        "// Lever: effort arm 2 m from pivot, load arm 1 m. You push with 50 N.\nconst effortArm = 2\nconst loadArm = 1\nconst forceIn = 50\nconst MA = effortArm / loadArm      // mechanical advantage\nconst forceOut = forceIn * MA\nprint('mechanical advantage:', MA)\nprint('force out (N):', forceOut)\n// You move your end 0.4 m. Work in = Work out, so the load rises dIn / MA:\nconst dIn = 0.4\nconst dOut = \nprint('load rises (m):', dOut)",
      expected: 'mechanical advantage: 2\nforce out (N): 100\nload rises (m): 0.2',
      hint: 'dIn / MA',
      success:
        'MA of 2 turned your 50 N into 100 N — but the load rose only 0.2 m while your hand fell 0.4 m. Force × distance is 50×0.4 = 20 J going in, 100×0.2 = 20 J coming out: identical. That conservation is the iron law behind every mechanism in the next lesson.',
    },
    {
      kind: 'explain',
      title: 'Advantage cuts both ways',
      body: [
        'Mechanical advantage above 1 multiplies force (a bottle-jack, a crowbar). Below 1 it multiplies SPEED and distance instead (your forearm: muscle moves a little, hand moves a lot).',
        'Robots use both directions: a gripper wants high force (slow, strong), a wheel wants high speed (fast, less torque). You pick the trade per joint.',
        'Real machines also lose some work to FRICTION as heat — so actual advantage is always a little less than the ideal geometry predicts.',
      ],
      deeper: [
        'A pulley system’s MA is simply the number of rope segments supporting the load: a block-and-tackle with 4 supporting ropes lifts 4× the force, and you haul 4× the rope length. Count the strands and you know the trade.',
        'An inclined plane (ramp) has MA = ramp length ÷ height — a gentle ramp lets you push a heavy load up with little force, over a long distance. A SCREW is just an inclined plane wrapped into a spiral, which is why a small turn of a screw jack lifts a car.',
        'EFFICIENCY = work out ÷ work in, always below 100% because friction steals some as heat. A worm gear can be so “lossy” it’s self-locking (it won’t back-drive) — sometimes a bug, often a feature when you want a joint to hold position with the motor off.',
      ],
      links: [{ nodeId: 'meche-gears', label: 'Next: doing this with teeth — Gears & Linkages' }],
    },
    {
      kind: 'quiz',
      question: 'A machine gives you a mechanical advantage of 4. What is the trade-off?',
      options: [
        'You get 4× the force, but must apply it over 4× the distance — work is conserved',
        'You get 4× the force AND 4× the speed for free',
        'You get 4× the force at no cost at all',
        'The machine outputs 4× more energy than you put in',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: force up by 4, distance up by 4 on your side, so force×distance (work) matches. A machine reshapes effort, it never creates energy.',
        'You can’t multiply both — gaining force costs you distance/speed, that’s the whole bargain.',
        'There’s always a cost: your input moves proportionally farther (and friction takes a cut too).',
        'That would violate energy conservation — output work can only be ≤ input work.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your forearm moves your hand fast over a big arc while the muscle contracts only a little — a mechanical advantage BELOW 1. What does that buy?',
      options: [
        'Speed and range of motion, at the cost of needing more muscle force',
        'Extra force, at the cost of speed',
        'Nothing — MA below 1 is always a mistake',
        'Free energy from the leverage',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: MA < 1 trades force for SPEED and distance — the hand outruns the muscle, which is exactly what a limb wants. The price is that the muscle must pull harder.',
        'That’s MA above 1; below 1 does the opposite, favoring speed over force.',
        'MA below 1 is a deliberate, useful choice whenever speed matters more than force — like a limb or a drive wheel.',
        'No leverage makes free energy; the fast hand still obeys work-in = work-out.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is a real machine’s useful output always a little less than its ideal mechanical advantage predicts?',
      options: [
        'Friction converts some of the input work into heat, so efficiency is below 100%',
        'Machines slowly gain energy over time',
        'Mechanical advantage is just a guess',
        'The load secretly gets heavier',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the ideal MA is pure geometry; friction always skims some work as heat, so efficiency (out ÷ in) is under 100%.',
        'Machines never gain energy — they lose a bit to friction and heat.',
        'Ideal MA is exact geometry; the shortfall is friction, not uncertainty in the ratio.',
        'The load is fixed — the lost work goes to heat, not to a heavier load.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A block-and-tackle has 3 rope segments supporting the load. Ideal mechanical advantage and rope you must pull to raise the load 1 m?',
      options: [
        'MA 3; pull 3 m of rope',
        'MA 3; pull 1 m of rope',
        'MA 1; pull 3 m of rope',
        'MA 6; pull 0.5 m of rope',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: MA equals the supporting strands (3), so you lift 3× the force — but must pull 3× the distance, 3 m, to raise the load 1 m. Work conserved again.',
        'Gaining 3× force costs 3× distance — you can’t raise it 1 m by pulling only 1 m.',
        'The supporting strands ARE the mechanical advantage; 3 strands give MA 3, not 1.',
        'Three strands give MA 3, not 6 — count the ropes actually holding the load.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A ramp is 5 m long and lifts a crate to a height of 1 m. Its ideal mechanical advantage is…',
      options: ['5 — length ÷ height', '1 — ramps give no advantage', '0.2 — height ÷ length', '6 — length + height'],
      correctIndex: 0,
      explanations: [
        'Correct: an inclined plane’s MA = ramp length ÷ height = 5 ÷ 1 = 5. Push with 1/5 the force, over 5× the distance.',
        'A ramp very much helps — that’s why loading ramps and switchback roads exist.',
        'That inverts the ratio — MA is the long distance over the short height, giving 5, not 0.2.',
        'You divide length by height, not add them; 5 ÷ 1 = 5.',
      ],
    },
    {
      question: 'A crowbar multiplies your 200 N push into 1000 N on a stuck nail. Ignoring friction, how far does the nail move while you push the handle 10 cm?',
      options: ['2 cm — 5× force means 1/5 the distance', '10 cm — the same as your hand', '50 cm — 5× your hand', '0 cm — the nail never moves'],
      correctIndex: 0,
      explanations: [
        'Correct: MA = 1000 ÷ 200 = 5, so the nail moves 1/5 as far as your hand — 10 cm ÷ 5 = 2 cm. Work in (200×0.10) equals work out (1000×0.02).',
        'If it moved the same distance with 5× the force, you’d have created energy — impossible.',
        'That has the load moving FARTHER than your hand, which would need LESS force, not more.',
        'It does move — 2 cm — just far less than your hand, which is the whole point.',
      ],
    },
    {
      question: 'Efficiency of a machine is defined as…',
      options: [
        'Work out ÷ work in — always below 100% because of friction losses',
        'Work in ÷ work out — usually above 100%',
        'The mechanical advantage times the load',
        'The speed of the output',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: efficiency = useful work out ÷ work in, and friction (lost as heat) keeps it under 100% for any real machine.',
        'That ratio is upside down and would imply more out than in — impossible.',
        'MA times load isn’t a ratio of energies; efficiency compares output work to input work.',
        'Output speed is a different quantity; efficiency is about energy, not speed.',
      ],
    },
    {
      question: 'A worm gear is often “self-locking” (the output can’t back-drive the input). For a robot joint, this is…',
      options: [
        'Often useful — the joint holds its position even with the motor powered off',
        'Always a defect to eliminate',
        'A sign the gear is broken',
        'Proof the gear creates energy',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: high friction makes it self-locking, so a robot arm can hold a load without burning motor power to resist back-driving — a handy feature, not a fault.',
        'It’s frequently designed IN on purpose — holding position without power is valuable.',
        'Self-locking is a normal property of worm gears’ geometry and friction, not damage.',
        'It still loses energy to friction like any machine — self-locking is about friction, not free energy.',
      ],
    },
  ],
}
