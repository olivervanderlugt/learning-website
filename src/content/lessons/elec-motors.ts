import type { Lesson } from '../../types'

export const elecMotorsLesson: Lesson = {
  nodeId: 'elec-motors',
  screens: [
    {
      kind: 'explain',
      title: 'Why you can’t wire a motor to a pin',
      body: [
        'A microcontroller pin sources a few milliamps at a fixed voltage; a motor wants amps and a way to reverse. So between the brain and the motor sits a DRIVER built from transistors.',
        'Worse, a motor is an INDUCTIVE load. When you suddenly switch its current off, the collapsing magnetic field forces the current to keep flowing — spiking a large voltage (V = L·di/dt) that can destroy your transistor.',
        'The cure is a FLYBACK (freewheeling) diode across the motor that gives that inductive current a safe path to circulate until it dies away, clamping the spike.',
      ],
      deeper: [
        'This is the same back-EMF physics from the electricity chain: an inductor opposes CHANGES in current. Switching hard is the biggest change of all, so it produces the biggest spike. The flyback diode is reverse-biased during normal operation (invisible) but the instant you switch off and the motor terminal flies above the supply, the diode conducts and routes the current in a harmless loop. In an H-bridge these diodes are often built into the transistors (body diodes) or added explicitly.',
      ],
      links: [{ nodeId: 'phys-electricity-3', label: 'Refresher: induction & motor back-EMF' }],
    },
    {
      kind: 'predict',
      question:
        'You switch a 12 V supply to a motor ON and OFF very fast, spending 50% of the time on and 50% off (a 50% duty cycle). What AVERAGE voltage does the motor effectively see?',
      options: [
        '6 V — the average of 12 V (on) and 0 V (off), weighted by the 50/50 duty cycle',
        '12 V — the motor sees the full supply',
        '0 V — switching cancels out',
        '24 V — the switching doubles the voltage',
      ],
      correctIndex: 0,
      reveal:
        'The motor’s inertia and inductance smooth the fast on/off pulses into their AVERAGE. At 50% duty that’s halfway between 12 V and 0 V → 6 V effective, so the motor runs at roughly half speed. This is PWM (pulse-width modulation): you control speed by the FRACTION of time the switch is on, not by wasting energy in a resistor. The code screen computes it.',
    },
    {
      kind: 'explain',
      title: 'The H-bridge: four switches for direction',
      body: [
        'PWM sets speed, but a single switch can only drive the motor one way. To REVERSE, you need to flip which terminal is positive — and that takes four switches arranged in an “H,” with the motor as the bridge across the middle.',
        'Close the top-left and bottom-right (one diagonal) → current flows one way, motor spins forward. Close the other diagonal (top-right, bottom-left) → current reverses, motor spins backward. Close both switches on one side → the motor is braked; open everything → it coasts.',
        'The deadly mistake is “shoot-through”: turning on both switches on the SAME side at once shorts the supply straight to ground through two transistors. Drivers insert a tiny “dead-time” gap when switching to prevent it.',
      ],
      deeper: [
        'Combine the two ideas and you have full motor control: an H-bridge picks direction with its diagonal, and PWM on those switches sets the speed — the exact scheme inside every driver IC (L293D, L298N, DRV8833, TB6612FNG). PWM frequency is usually ~20 kHz: above human hearing (no annoying whine) yet low enough that switching losses stay small. Each of the four switches needs its flyback path, which is why H-bridge transistors rely on body or added diodes.',
      ],
      links: [
        { nodeId: 'robo-embedded', label: 'Where this lives: the microcontroller' },
        { nodeId: 'elec-transistors', label: 'The switches: MOSFETs' },
      ],
    },
    {
      kind: 'predict',
      question:
        'In an H-bridge, you close the top-LEFT and bottom-RIGHT switches (one diagonal). To make the motor spin the OTHER direction, what should you do?',
      options: [
        'Open those two and close the OTHER diagonal (top-right and bottom-left), reversing the current',
        'Close all four switches at once',
        'Close both switches on the left side',
        'Add more voltage to the same diagonal',
      ],
      correctIndex: 0,
      reveal:
        'Direction is set by WHICH diagonal conducts. Top-left + bottom-right sends current one way; the opposite diagonal (top-right + bottom-left) sends it the other way, reversing the motor. Closing both switches on one side would short the supply (shoot-through) — never do that — and closing all four is the same fatal short. More voltage changes speed, not direction.',
    },
    {
      kind: 'code',
      prompt:
        'Compute the effective (average) voltage a PWM signal delivers to a motor: Vavg = duty · Vsupply. Fill in that one line, then check three duty cycles on a 12 V supply.',
      starter: `function pwmAverage(Vsupply, duty) {
  return 0 // fill in: duty * Vsupply
}
const Vsupply = 12
print('duty 0.25 -> ' + pwmAverage(Vsupply, 0.25).toFixed(2))
print('duty 0.50 -> ' + pwmAverage(Vsupply, 0.50).toFixed(2))
print('duty 0.75 -> ' + pwmAverage(Vsupply, 0.75).toFixed(2))`,
      expected: `duty 0.25 -> 3.00
duty 0.50 -> 6.00
duty 0.75 -> 9.00`,
      hint: 'Average voltage is just the duty fraction times the supply: duty * Vsupply.',
      success:
        'A linear knob: 25% duty → 3 V, 50% → 6 V, 75% → 9 V on a 12 V rail. The motor smooths the fast pulses into this average, so duty cycle IS your speed control — and it wastes almost no energy, because the switch is either fully on (no voltage drop) or fully off (no current). That efficiency is why PWM, not a variable resistor, drives every real motor.',
    },
    {
      kind: 'quiz',
      question: 'What is the job of the flyback (freewheeling) diode across a motor?',
      options: [
        'It gives the motor’s inductive current a safe path when the switch opens, clamping the voltage spike',
        'It increases the motor’s top speed',
        'It converts AC to DC for the motor',
        'It measures the motor’s current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: switching off an inductive load makes the current spike (V = L·di/dt); the diode lets that current circulate and decay safely instead of arcing across (and destroying) the transistor.',
        'The diode protects the switch — it doesn’t add speed.',
        'It isn’t a rectifier here; the motor already runs on the switched DC. Its role is spike protection.',
        'Current sensing uses a shunt resistor, not the flyback diode.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does PWM control a motor’s speed?',
      options: [
        'By varying the fraction of time (duty cycle) the switch is on, setting the average voltage — with almost no wasted energy',
        'By dropping the excess voltage across a large resistor',
        'By changing the supply voltage continuously with an analog knob',
        'By reversing the current many times per second',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the motor averages the fast on/off pulses, so duty cycle sets the effective voltage; because the switch is fully on or fully off, it dissipates almost no power.',
        'A series resistor WOULD set the voltage but burns the excess as heat — exactly what PWM avoids.',
        'PWM keeps a fixed supply and switches it; it doesn’t need a continuously variable source.',
        'Reversing current is direction control (the H-bridge), not speed control.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In an H-bridge, what does “shoot-through” mean and why is it dangerous?',
      options: [
        'Both switches on one side are on at once, shorting the supply to ground through two transistors — a destructive current',
        'The motor spins too fast and flies apart',
        'The PWM frequency is set above 20 kHz',
        'The flyback diode conducts during normal operation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a high-side and low-side switch on the same leg both on creates a direct low-resistance path from supply to ground — huge current that can destroy the transistors; dead-time prevents it.',
        'Shoot-through is an electrical short in the bridge, not a mechanical over-speed.',
        'A 20 kHz PWM frequency is normal and desirable — unrelated to shoot-through.',
        'The flyback diode conducting during switching is intended behavior, not the shoot-through fault.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which switch combination in an H-bridge makes the motor spin FORWARD?',
      options: [
        'One diagonal pair on (e.g. top-left + bottom-right), the other pair off',
        'All four switches on',
        'Both left-side switches on',
        'All four switches off',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a single diagonal conducting routes current through the motor one way (forward); the opposite diagonal reverses it.',
        'All four on is a double short (shoot-through on both legs) — destructive, not motion.',
        'Both switches on one side short that leg (shoot-through) — never a valid drive state.',
        'All four off means the motor coasts (no drive) — no forward motion.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'On a 9 V supply, what average voltage does a 40% PWM duty cycle deliver?',
      options: ['3.6 V', '4.5 V', '5.4 V', '9 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vavg = duty · Vsupply = 0.40 · 9 = 3.6 V.',
        '4.5 V would be a 50% duty cycle, not 40%.',
        '5.4 V is 60% duty (the “off” fraction) — the on-fraction is 40%.',
        '9 V is 100% duty (always on); 40% gives less.',
      ],
    },
    {
      question: 'A motor’s current spikes dangerously the instant you switch it OFF. Which physical property causes this?',
      options: [
        'Its inductance — the collapsing magnetic field forces current to keep flowing (V = L·di/dt)',
        'Its resistance — Ohm’s law makes the voltage jump',
        'Its capacitance — stored charge dumps out',
        'Its mass — the rotor’s inertia creates voltage',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a motor coil is an inductor; interrupting its current makes the field collapse and drive a large V = L·di/dt spike — what the flyback diode tames.',
        'Ohm’s law alone gives no spike on switch-off; the inductive kick does.',
        'The dominant switch-off transient is inductive, not capacitive.',
        'Rotor inertia produces mechanical coasting and back-EMF while spinning, but the switch-off VOLTAGE spike is the coil’s inductance.',
      ],
    },
    {
      question: 'Why is motor PWM commonly run at around 20 kHz?',
      options: [
        'Above human hearing (no audible whine) yet low enough to keep switching losses small',
        'Because motors physically cannot respond below 20 kHz',
        'To match the microcontroller’s clock exactly',
        'Because 20 kHz is the motor’s resonant frequency',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ~20 kHz sits just above the audible range (silent) while staying low enough that each switching event’s losses don’t add up to excessive heat.',
        'Motors respond to the low-frequency AVERAGE regardless; the 20 kHz is about the switching, not the mechanical response.',
        'PWM frequency is chosen for audibility and losses, not to equal the CPU clock.',
        'It’s chosen to avoid audible noise, not because it’s a resonance (driving a resonance would be undesirable).',
      ],
    },
    {
      question: 'What do you close in an H-bridge to actively BRAKE the motor (short its terminals)?',
      options: [
        'Both low-side switches (or both high-side) — shorting the motor’s terminals together',
        'One diagonal pair',
        'All four switches',
        'No switches at all (open everything)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: shorting both motor terminals to the same rail (both low-side, or both high-side) makes the spinning motor’s back-EMF drive an opposing current — dynamic braking.',
        'A diagonal pair DRIVES the motor (forward or reverse), it doesn’t brake.',
        'All four on is shoot-through on both legs — a destructive short of the supply, not braking.',
        'Opening everything lets the motor COAST freely (no braking).',
      ],
    },
  ],
}
