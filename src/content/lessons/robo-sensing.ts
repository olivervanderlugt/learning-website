import type { Lesson } from '../../types'

export const roboSensingLesson: Lesson = {
  nodeId: 'robo-sensing',
  screens: [
    {
      kind: 'explain',
      title: 'How a robot feels the world',
      body: [
        'A robot’s loop is eternal: sense → decide → act. This lesson is the sense and the act — the bridge between the physical world and the bits inside the CPU.',
        'Sensors turn physical quantities into electrical signals: an encoder counts wheel turns, an IMU feels tilt and acceleration, a lidar measures distance with light.',
        'Actuators do the reverse — motors and servos turn electricity into motion.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A distance sensor outputs a smooth voltage from 0–5 V. But your CPU only stores bits. What has to happen to that voltage before the CPU can use it?',
      options: [
        'It must be converted to a digital number (sampled and quantized)',
        'Nothing — the CPU reads voltage directly',
        'It must be amplified to a higher voltage',
        'It must be turned into sound',
      ],
      correctIndex: 0,
      reveal:
        'The voltage must be digitized by an ADC — analog-to-digital converter — which snaps the continuous voltage to the nearest of a fixed set of levels and reports it as bits. This is the exact moment the physical world becomes the binary you learned in Speaking in Switches. Try it next.',
      links: [{ nodeId: 'bits', label: 'Refresher: Speaking in Switches (bits)' }],
    },
    { kind: 'game', gameId: 'adc-sim' },
    {
      kind: 'explain',
      title: 'Actuators: pushing back on the world',
      body: [
        'To act, a robot sends current through a motor (via an H-bridge — those four transistor switches again) or positions a servo to a commanded angle.',
        'A DC motor spins fast with little torque; add gears to trade speed for the twisting force needed to lift or push. A servo takes a target angle and holds it.',
        'Sensing and actuation are two halves of one loop — which the next node closes with feedback control.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You upgrade a robot’s distance sensor from an 8-bit ADC to a 12-bit ADC. What improves?',
      options: [
        'It resolves far finer distinctions — 4096 levels instead of 256',
        'It reads twice as far',
        'It reads four times faster',
        'Nothing measurable',
      ],
      correctIndex: 0,
      reveal:
        'More bits = more levels = finer resolution: 2⁸ = 256 vs 2¹² = 4096 distinct readings across the same range, so smaller quantization error. Range and speed are separate specs — bits buy you precision. Every extra bit doubles the levels, exactly the doubling from your very first lesson.',
    },
    {
      kind: 'explain',
      title: 'Why this is the whole bridge',
      body: [
        'You’ve now connected every layer: physical quantity → sensor voltage → ADC → bits → CPU decision → current → motor → motion.',
        'That full round trip IS robotics. Everything else is making it fast, accurate and reliable.',
        'Quiz, then on to closing the loop with control.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does an ADC (analog-to-digital converter) do?',
      options: [
        'Converts a continuous voltage into a digital number the CPU can read',
        'Amplifies a weak signal',
        'Turns digital signals into motion',
        'Stores data permanently',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it samples a continuous analog voltage and quantizes it to the nearest digital level — bits the CPU understands.',
        'Amplification is a separate job (done by an amplifier); an ADC digitizes, it doesn’t boost.',
        'That’s roughly what a motor driver / DAC does — the ADC goes the other way, world → bits.',
        'Storage is memory’s job; the ADC just performs the analog-to-digital translation.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A 3-bit ADC can represent how many distinct levels?',
      options: ['8', '3', '6', '9'],
      correctIndex: 0,
      explanations: [
        'Correct: 2³ = 8 levels — the same doubling rule from Speaking in Switches, now in a sensor.',
        '3 is the number of bits, not the levels. Each bit doubles the count: 2×2×2 = 8.',
        '6 would be 2×3; bits multiply as powers of two: 2³ = 8.',
        '9 is 3²; it’s 2 to the power of the bits, 2³ = 8, not bits squared.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why add gears between a fast DC motor and a robot wheel?',
      options: [
        'To trade some speed for more torque (twisting force)',
        'To make the motor spin faster',
        'To reduce the battery voltage',
        'To convert AC to DC',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: gearing down trades rotational speed for torque, giving the force needed to move a load or climb.',
        'Gearing down REDUCES output speed — the gain is torque, not more speed.',
        'Gears are mechanical; they don’t change electrical voltage.',
        'AC/DC conversion is electrical (a rectifier’s job), unrelated to a gearbox.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is “quantization error”?',
      options: [
        'The gap between the true analog value and the nearest digital level',
        'A bug in the sensor firmware',
        'Electrical noise on the wire',
        'The time an ADC takes to respond',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: because digital levels are discrete, the stored value rarely equals the true one exactly — that small rounding gap is quantization error, shrunk by using more bits.',
        'It’s not a bug — it’s an inherent consequence of representing continuous values with finite levels.',
        'Noise is a separate error source; quantization error exists even with a perfectly clean signal, purely from rounding to levels.',
        'That’s conversion time/latency — a different spec. Quantization error is about value resolution, not speed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The core robotics loop is best summarized as…',
      options: [
        'Sense → decide → act, repeated continuously',
        'Boot → run → shut down',
        'Charge → discharge',
        'Input → store → forget',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read sensors, decide what to do, drive actuators — then loop, hundreds of times per second.',
        'That’s a device’s power lifecycle, not the moment-to-moment control loop that produces behavior.',
        'Charging describes the battery, not how the robot perceives and acts.',
        'A robot must ACT on what it senses, not forget it — the loop is sense, decide, act.',
      ],
    },
  ],
}
