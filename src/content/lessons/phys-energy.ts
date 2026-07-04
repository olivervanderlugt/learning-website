import type { Lesson } from '../../types'

export const physEnergyLesson: Lesson = {
  nodeId: 'phys-energy',
  screens: [
    {
      kind: 'explain',
      title: 'The currency of the physical world',
      body: [
        'Energy is what lets things happen — move, heat up, lift. It comes in forms: kinetic (motion), potential (stored, like a raised weight or a charged battery), thermal, and more.',
        'The golden rule is conservation: energy is never created or destroyed, only converted from one form to another.',
        'For a robot, energy is the budget every design decision spends.',
      ],
      links: [{ nodeId: 'phys-forces', label: 'Refresher: Forces & Motion' }],
    },
    {
      kind: 'predict',
      question:
        'You lift a robot onto a shelf (giving it potential energy), then it falls off. Just before it hits the floor, that stored potential energy has mostly become…',
      options: [
        'Kinetic energy (motion)',
        'It has disappeared',
        'More potential energy',
        'Electrical energy',
      ],
      correctIndex: 0,
      reveal:
        'Energy is conserved, so the potential energy converts into kinetic energy — the robot speeds up as it falls. At impact that kinetic energy becomes sound and heat (and dents). Nothing is lost; it just changes form. This swapping is why a pendulum trades height for speed and back forever (minus friction).',
    },
    {
      kind: 'explain',
      title: 'Power: how fast you spend energy',
      body: [
        'Power is the RATE of energy use — energy per second — measured in watts. A strong motor isn’t one with more energy; it’s one that delivers energy faster.',
        'From the electricity lesson: electrical power is P = V·I. A battery stores a fixed amount of energy; power is how quickly you drain it.',
        'That trade-off — how much energy you carry vs how fast you use it — is THE central budget of any mobile robot.',
      ],
      deeper: [
        'Battery capacity is often quoted in watt-hours (Wh) — energy — or amp-hours (Ah) at a voltage. Runtime ≈ energy stored ÷ power drawn. A 100 Wh battery driving a 50 W load lasts about 2 hours; double the load, halve the runtime.',
        'This is why fast, powerful robots have short battery lives, and why efficiency (doing the same task with less power) directly buys range. Engineers obsess over every idle watt.',
        'It also links back to Forces: more mass needs more force to accelerate (F = m·a), more force means more power drawn, which means shorter runtime. Weight, power and endurance are one connected budget.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot carries a 100 Wh battery and draws 25 W while driving. Roughly how long can it run?',
      options: ['4 hours', '2500 hours', '75 hours', '25 hours'],
      correctIndex: 0,
      reveal:
        'Runtime ≈ energy ÷ power = 100 Wh ÷ 25 W = 4 hours. Draw more power (say 50 W) and it drops to 2 hours. This one division decides whether your robot finishes its mission or dies in a hallway — energy budgeting is real engineering, not an afterthought.',
    },
    {
      kind: 'quiz',
      question: 'What does “conservation of energy” mean?',
      options: [
        'Energy is never created or destroyed, only converted between forms',
        'Energy always decreases over time',
        'Batteries never run out',
        'Energy can be created if you push hard enough',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: total energy stays constant; it just changes form (potential → kinetic → heat, etc.).',
        'Energy isn’t destroyed — it disperses into less useful forms like heat, but the total is conserved.',
        'Batteries deplete because their stored energy converts to motion and heat — conservation doesn’t mean infinite supply.',
        'You can’t create energy; pushing converts energy you already have (from food, fuel, or a battery).',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is power?',
      options: [
        'The rate of energy use — energy per unit time (watts)',
        'The total amount of energy stored',
        'The same thing as force',
        'The voltage of a battery',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: power is energy per second (watts) — how FAST energy is used, not how much is stored.',
        'That’s energy (e.g. watt-hours). Power is the rate at which that energy is spent.',
        'Force is a push (newtons); power is energy per time. Related through motion, but different quantities.',
        'Voltage is electrical “push”; power is V·I — voltage times current — not voltage alone.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A falling object speeds up as it drops. In energy terms, this is…',
      options: [
        'Potential energy converting into kinetic energy',
        'Kinetic energy converting into potential energy',
        'Energy being created by gravity',
        'Thermal energy turning into height',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: height (potential) is traded for speed (kinetic) as it falls — conservation in action.',
        'That’s the reverse (a rising object). Falling converts potential INTO kinetic.',
        'Gravity converts stored energy; it doesn’t create new energy from nothing.',
        'It’s potential → kinetic; thermal energy appears mainly at impact, not as the cause of the fall.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot’s battery holds 200 Wh and it draws 50 W. Approximate runtime?',
      options: ['4 hours', '10000 hours', '250 hours', '40 hours'],
      correctIndex: 0,
      explanations: [
        'Correct: 200 Wh ÷ 50 W = 4 hours (energy divided by power).',
        '10000 is 200 × 50 — multiplying gives nonsense units. Runtime is energy ÷ power.',
        '250 has no basis here; divide 200 by 50 to get 4 hours.',
        '40 isn’t the right division; 200 ÷ 50 = 4, not 40.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do more powerful, faster robots tend to have shorter battery life?',
      options: [
        'Higher power means the fixed stored energy drains faster',
        'Powerful motors store less energy',
        'Speed creates energy loss from nothing',
        'Batteries shrink when you go fast',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: runtime ≈ energy ÷ power, so for a fixed battery, drawing more power shortens runtime.',
        'The battery’s stored energy is set by the battery, not the motor; the motor just drains it faster.',
        'No energy is created or lost from nothing — higher speed simply demands more power draw.',
        'The battery’s capacity doesn’t change; you’re just spending its energy more quickly.',
      ],
    },
  ],
}
