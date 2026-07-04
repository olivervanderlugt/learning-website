import type { Lesson } from '../../types'

export const mathCalculusLesson: Lesson = {
  nodeId: 'math-calculus',
  screens: [
    {
      kind: 'explain',
      title: 'The mathematics of change',
      body: [
        'Everything a robot does is about change: position changing into velocity, velocity into acceleration, error shrinking toward zero.',
        'Calculus has exactly two moves. The derivative measures how fast something is changing right now. The integral adds up change to get a total.',
        'We’ll build both from pictures — starting with the derivative as nothing more than the steepness of a curve.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot’s position over time traces a curve. What does the STEEPNESS (slope) of that curve at an instant tell you?',
      options: [
        'Its velocity — how fast it’s moving right then',
        'Its total distance travelled',
        'Its exact position',
        'Nothing physical',
      ],
      correctIndex: 0,
      reveal:
        'Steepness of a position-vs-time curve IS velocity — steep means fast, flat means stopped, downhill means reversing. That instantaneous steepness is the derivative. You’re about to measure it by dragging a point along a curve.',
    },
    { kind: 'game', gameId: 'slope-explorer' },
    {
      kind: 'explain',
      title: 'Derivative = instantaneous rate of change',
      body: [
        'You just saw it: the derivative is the slope of the tangent line — the curve’s steepness at a single point.',
        'It’s zero exactly at peaks and valleys, which is why setting a derivative to zero is how engineers find a maximum or minimum — the fastest route, the least energy, the best angle.',
        'Position’s derivative is velocity; velocity’s derivative is acceleration. Stack the idea and you describe all of motion.',
      ],
    },
    {
      kind: 'predict',
      question:
        'The integral is the reverse: it accumulates. If you know a robot’s velocity at every instant, what does integrating (adding it all up) give you?',
      options: [
        'The distance it travelled',
        'Its top speed',
        'Its acceleration',
        'Its weight',
      ],
      correctIndex: 0,
      reveal:
        'Adding up velocity over time gives distance — geometrically, it’s the AREA under the velocity-time graph. Derivative and integral are opposites: one splits motion into instants, the other glues instants back into a total. This pairing is the Fundamental Theorem of Calculus.',
    },
    {
      kind: 'explain',
      title: 'Why this unlocks robot control',
      body: [
        'Remember the PID controller mentioned on the map? Its three letters are literally calculus: the D term is a Derivative, the I term is an Integral, applied to the error between where the robot is and where you want it.',
        'The D term reacts to how fast the error is changing; the I term remembers the accumulated past error. Without calculus, “Control Loops & PID” is just three mysterious knobs.',
        'Lock it in — quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the derivative of a function tell you at a given point?',
      options: [
        'The slope — its instantaneous rate of change',
        'The total area under it',
        'Its average value',
        'Its highest point',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the derivative is the slope of the tangent line — how fast the output changes as the input nudges, right at that point.',
        'Area under the curve is the INTEGRAL — the derivative’s opposite. The derivative is about steepness, not accumulation.',
        'Average value smooths over a range; the derivative is local — the rate of change at one exact instant.',
        'The highest point is found USING the derivative (where it’s zero), but the derivative itself is the slope, not the peak.',
      ],
    },
    {
      kind: 'quiz',
      question: 'On a position-vs-time graph, a flat (zero-slope) section means the object is…',
      options: ['Stationary', 'Moving fastest', 'Accelerating', 'Reversing'],
      correctIndex: 0,
      explanations: [
        'Correct: zero slope means position isn’t changing — velocity is zero, so it’s stopped.',
        'Fastest is the STEEPEST part, not the flattest. Flat = not moving.',
        'Acceleration is about the slope CHANGING; a flat line has constant (zero) slope, so no motion at all.',
        'Reversing shows as a downward slope (position decreasing). Flat means simply stationary.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Integrating a robot’s velocity over a time interval gives you…',
      options: [
        'The distance travelled in that interval',
        'Its acceleration',
        'Its maximum speed',
        'The time elapsed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the integral of velocity is the area under the velocity-time curve, which equals the distance covered.',
        'Acceleration is the DERIVATIVE of velocity (rate of change), not its integral.',
        'Max speed is a single peak value; integrating sums contributions across the whole interval into a distance.',
        'Time is what you integrate OVER, not the result — the result carries velocity’s units × time = distance.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Setting a derivative equal to zero is a standard trick for…',
      options: [
        'Finding maximum or minimum points',
        'Finding the area under a curve',
        'Measuring average speed',
        'Converting units',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at a peak or valley the tangent is flat (slope 0), so solving “derivative = 0” locates those optimal points — the backbone of optimization.',
        'Area is an integral problem; zero-derivative is about locating turning points, not accumulation.',
        'Average speed is total distance over total time — no derivative-zeroing involved.',
        'Unit conversion is arithmetic; the zero-derivative trick is about the geometry of peaks and valleys.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a PID controller, which parts come straight from calculus?',
      options: [
        'The D term is a derivative and the I term is an integral of the error',
        'All three terms are integrals',
        'None — PID is unrelated to calculus',
        'Only the P term uses calculus',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: D = derivative of the error (how fast it’s changing), I = integral of the error (accumulated past). P is just proportional — the plain error itself.',
        'Only one term integrates (I). The D term differentiates, and P uses the raw error with no calculus.',
        'PID is calculus in disguise — the “I” and “D” literally stand for Integral and Derivative.',
        'The P term is the one WITHOUT calculus — it’s directly proportional to the current error. The calculus lives in I and D.',
      ],
    },
  ],
}
