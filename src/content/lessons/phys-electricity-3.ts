import type { Lesson } from '../../types'

export const physElectricity3Lesson: Lesson = {
  nodeId: 'phys-electricity-3',
  screens: [
    {
      kind: 'explain',
      title: 'Circuits that remember: the capacitor',
      body: [
        'Resistors respond instantly. A CAPACITOR stores charge, so it responds over TIME. Connect one through a resistor to a supply and its voltage doesn’t jump — it climbs a curve toward the supply: V(t) = Vin·(1 − e^(−t/RC)).',
        'That RC product is the "time constant": after one RC it’s ~63% charged, after ~5·RC it’s essentially full.',
        'You’ve seen this exact e^(−t/RC) shape before — it’s the exponential from the differential-equations chain, wearing a circuit.',
      ],
      deeper: [
        'The capacitor’s current is I = C·dV/dt — current is proportional to the RATE the voltage changes. Feed that into Ohm’s law around the loop and you get a first-order differential equation whose solution is the charging exponential. Capacitors smooth power supplies, set timing in oscillators, and filter noise out of sensor signals — anywhere a robot needs to average over time or debounce a jittery input.',
      ],
      links: [{ nodeId: 'math-ode', label: 'Refresher: exponential decay (dV/dt = −kV)' }],
    },
    {
      kind: 'predict',
      question:
        'A capacitor charges through a resistor with time constant RC = 2 s. Roughly how charged is it after 2 seconds (one time constant)?',
      options: [
        'About 63% of the way to full',
        'Exactly 100% — fully charged',
        'Exactly 50%',
        '0% — nothing has happened yet',
      ],
      correctIndex: 0,
      reveal:
        'After one time constant (t = RC), V = Vin·(1 − e^(−1)) = Vin·(1 − 0.37) ≈ 63% of full. The charging is fast at first (big gap to close) then slows as it approaches the supply — the mirror image of the exponential DECAY you simulated in the ODE lesson. Five time constants gets you to ~99%.',
    },
    {
      kind: 'explain',
      title: 'Magnetism, induction & the motor',
      body: [
        'Current makes magnetism: a coil of wire becomes an electromagnet. And the reverse — Faraday’s law — is the miracle: a CHANGING magnetic field induces a voltage in a nearby wire.',
        'That two-way street is the electric motor and generator. Push current through a coil in a magnet’s field and it feels a force (motor); spin a coil in that field and it generates voltage (generator).',
        'Every wheel motor, every servo, every encoder on your robot runs on exactly this coupling of electricity and magnetism.',
      ],
      deeper: [
        'A spinning motor is also a generator, producing a "back-EMF" that opposes the supply — which is why a motor draws huge current when stalled (no spin, no back-EMF, nothing to oppose the inflow) and less when running free. An encoder often works the OTHER way, sensing induced pulses as a magnet spins past a coil or Hall sensor. Faraday’s law, dΦ/dt, is the single equation under motors, generators, transformers and inductive sensors.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A DC motor draws a big surge of current the instant you switch it on, then settles to a lower steady current once it’s spinning. Why?',
      options: [
        'Spinning generates a back-EMF that opposes the supply; at startup there’s no spin, so nothing limits the current',
        'The motor gets more efficient as it heats up',
        'The battery voltage rises once it’s spinning',
        'Friction adds voltage',
      ],
      correctIndex: 0,
      reveal:
        'At the instant of switch-on the motor isn’t turning, so there’s no back-EMF — only the coil’s small resistance limits current, and it spikes. As it spins up, Faraday’s law generates an opposing voltage that throttles the current down to its running value. This inrush is why motor drivers need current headroom and why stalled motors overheat.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — you want a microcontroller (tiny current) to switch a motor (big current) on and off thousands of times a second. What component do you reach for?',
      options: [
        'A transistor — a small signal current controls a large load current, and it switches fast',
        'A bigger resistor',
        'Another capacitor',
        'A longer wire',
      ],
      correctIndex: 0,
      reveal:
        'A TRANSISTOR: a tiny current (or voltage) at its control terminal switches a much larger current through the load — an electrically-controlled switch with no moving parts, flipping millions of times a second. Four of them wired as an H-bridge let an MCU drive a motor forwards AND backwards. This is the doorway into real electronics and motor control.',
    },
    {
      kind: 'code',
      prompt:
        'Simulate a capacitor charging. Fill in the charging curve V(t) = Vin·(1 − e^(−t/RC)), then read the voltage at one, two, and three time constants (RC = 2 s, Vin = 10 V).',
      starter: `function charge(vin, rc, t) {
  const v = 0 // fill in: vin * (1 - Math.exp(-t / rc))
  return v.toFixed(2)
}
print('t=2s (1 RC):', charge(10, 2, 2))
print('t=4s (2 RC):', charge(10, 2, 4))
print('t=6s (3 RC):', charge(10, 2, 6))`,
      expected: `t=2s (1 RC): 6.32
t=4s (2 RC): 8.65
t=6s (3 RC): 9.50`,
      hint: 'The charging curve is v = vin * (1 - Math.exp(-t / rc))',
      success:
        'One time constant → 6.32 V (63% of 10). Two → 8.65 V (86%). Three → 9.50 V (95%). The capacitor rushes up at first then eases in, never quite touching 10 V — the same slowing-approach shape as exponential decay, just flipped to rise. That predictable RC curve is what sets the tick of a timer, the cutoff of a filter, and the debounce on a button.',
    },
    {
      kind: 'quiz',
      question: 'What is the "time constant" RC of a resistor–capacitor circuit?',
      options: [
        'A measure of how fast the capacitor charges/discharges — ~63% of the way after one RC',
        'The maximum voltage the capacitor can hold',
        'The resistance divided by the capacitance',
        'The current through the resistor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: RC (in seconds) sets the timescale — one time constant gets ~63% of the way, five gets ~99%.',
        'The final voltage is set by the supply, not by RC — RC controls the SPEED of getting there.',
        'It’s the PRODUCT R×C, not the quotient — larger R or C both slow the circuit down.',
        'RC is a time, not a current — though it does govern how the current decays over time.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Faraday’s law of induction says a voltage is induced in a coil when…',
      options: [
        'The magnetic field through it CHANGES',
        'A steady magnetic field sits nearby',
        'Current flows through a resistor',
        'The coil is at rest in no field',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s the CHANGE (dΦ/dt) that induces voltage — a moving magnet, a spinning coil, or a switching current.',
        'A steady, unchanging field induces nothing — motion or change is essential.',
        'That’s Ohm’s law territory; induction is specifically about changing magnetic flux.',
        'No field and no motion means no induction — you need a changing flux.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a DC motor draw its largest current when stalled (not spinning)?',
      options: [
        'With no rotation there is no back-EMF to oppose the supply, so only the coil’s small resistance limits the current',
        'Stalling increases the supply voltage',
        'A stalled motor has infinite resistance',
        'Friction generates extra current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: back-EMF (a generator voltage) only appears when the motor spins; stalled, it vanishes, and the low coil resistance lets a large current through.',
        'The supply voltage is set by the battery, not by whether the motor spins.',
        'A stalled motor has LOW resistance (just the coil wire) — that’s exactly why current is high.',
        'Friction is a mechanical loss; the current surge is due to the missing back-EMF, an electrical effect.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A transistor is best described in a robot power circuit as…',
      options: [
        'An electrically-controlled switch: a small signal controls a large load current, switching very fast',
        'A component that stores charge over time',
        'A resistor whose value never changes',
        'A source of magnetic fields',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a transistor lets a tiny control current/voltage switch a much larger current — the basis of logic gates AND motor drivers (H-bridges).',
        'That’s a capacitor; a transistor switches/amplifies rather than storing charge.',
        'A transistor is the opposite of a fixed resistor — its conduction is CONTROLLED by its input.',
        'It controls current flow; it isn’t primarily a magnetic-field source (that’s a coil).',
      ],
    },
    {
      kind: 'quiz',
      question: 'The capacitor charging curve and the radioactive-decay curve share the same e^(−t/τ) shape. Why?',
      options: [
        'Both are governed by a first-order differential equation where the rate of change is proportional to the remaining gap',
        'It is a coincidence of unrelated formulas',
        'Both involve radioactivity',
        'Both are straight lines',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: capacitor charging, decay, and cooling all obey dx/dt ∝ (remaining gap), whose solution is always the exponential — one equation, many disguises.',
        'It’s no coincidence — they’re literally the same differential equation with different labels.',
        'Capacitors have nothing to do with radioactivity; the shared shape comes from the shared MATH.',
        'The exponential is a curve, not a straight line — the rate changes as it goes.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A capacitor charges with RC = 5 s. After about how long is it ~99% charged?',
      options: ['~25 s (five time constants)', '~5 s', '~50 s', '~1 s'],
      correctIndex: 0,
      explanations: [
        'Correct: ~5 time constants reach ~99%, so 5 × 5 s = 25 s.',
        '5 s is ONE time constant (~63%), not fully charged.',
        '50 s is ten time constants — well past 99%; the rule of thumb is five.',
        '1 s is a fraction of one time constant — barely charged.',
      ],
    },
    {
      question: 'You spin a magnet past a coil of wire. What happens?',
      options: [
        'A voltage is induced in the coil (Faraday’s law) — the basis of a generator and many encoders',
        'Nothing, unless the coil already carries current',
        'The coil melts',
        'The magnet loses its magnetism',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the changing magnetic flux induces a voltage — exactly how generators and inductive/Hall encoders sense motion.',
        'No pre-existing current is needed; the changing field itself induces the voltage.',
        'Nothing melts — a modest induced voltage appears, that’s all.',
        'The magnet keeps its magnetism; only a voltage is induced in the coil.',
      ],
    },
    {
      question: 'An H-bridge is built from four transistors. What does it let a microcontroller do?',
      options: [
        'Drive a motor in BOTH directions (forward and reverse) by switching which pairs conduct',
        'Store energy like a battery',
        'Measure temperature',
        'Increase the battery voltage',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the four transistors steer current through the motor one way or the other, so a logic-level MCU can command forward, reverse, brake or coast.',
        'It switches current direction; it doesn’t store energy.',
        'Temperature sensing is a separate job (e.g. a thermistor divider), not what an H-bridge does.',
        'It routes the supply to the motor; it doesn’t boost voltage (that’s a converter).',
      ],
    },
    {
      question: 'Why are capacitors placed across a robot’s power rails near hungry components?',
      options: [
        'They store charge and release it during brief current spikes, smoothing the supply voltage',
        'They increase the resistance of the rail',
        'They generate extra voltage from nothing',
        'They block all current permanently',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a decoupling capacitor acts as a local reservoir, supplying quick bursts so the rail voltage doesn’t sag when a motor or chip suddenly draws current.',
        'They don’t add series resistance; they buffer voltage in parallel.',
        'They release STORED charge — they don’t create energy from nothing.',
        'They block steady DC but pass fast changes — which is exactly how they absorb spikes.',
      ],
    },
  ],
}
