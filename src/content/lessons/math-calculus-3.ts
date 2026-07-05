import type { Lesson } from '../../types'

export const mathCalculus3Lesson: Lesson = {
  nodeId: 'math-calculus-3',
  screens: [
    {
      kind: 'explain',
      title: 'Adding up change: the integral',
      body: [
        'The derivative split motion into instants. The integral does the opposite — it glues instants back together into a total.',
        'Its picture is the AREA under a curve. Distance is the area under a velocity graph; charge is the area under a current graph; accumulated error is the area under an error graph.',
        'We’ll compute that area the only honest way a computer can: slice it into thin rectangles and add them up.',
      ],
      deeper: [
        'For a straight, constant curve the area is just a rectangle (height × width) — no calculus needed. The integral earns its keep when the curve BENDS, so no single rectangle fits.',
        'The trick: cover the region with many skinny rectangles, each short enough that the curve is almost flat across its width. Their combined area approximates the true area, and the thinner they get, the smaller the leftover gaps.',
        'The exact integral is the limit of that sum as the rectangle width shrinks toward zero — infinitely many, infinitely thin. That limiting sum is written ∫, an elongated “S” for “sum”.',
      ],
    },
    {
      kind: 'predict',
      question:
        'To estimate the area under a curve, you tile it with rectangles and add their areas. What happens to your estimate as you use MORE, THINNER rectangles?',
      options: [
        'It gets more accurate — the gaps between rectangles and curve shrink',
        'It gets less accurate — more rectangles means more rounding error',
        'It stays exactly the same no matter how many you use',
        'It overshoots further and further above the true area',
      ],
      correctIndex: 0,
      reveal:
        'Thinner rectangles hug the curve more closely, so the little triangular gaps between the rectangle tops and the curve shrink toward nothing. As the width heads to zero the sum converges on the exact area — that limiting sum IS the integral. This is a Riemann sum, and you’re about to code one.',
    },
    {
      kind: 'explain',
      title: 'Accumulation: distance is stored-up velocity',
      body: [
        'Think of a running total. Each tiny slice of time, the robot moves velocity × dt; keep a running sum and you’re accumulating distance as it happens.',
        'That running sum is exactly a Riemann sum of velocity over time — one rectangle (height = velocity, width = dt) added per time step.',
        'If velocity is constant, every rectangle is identical and the total is just velocity × time. Next you’ll build that sum in code.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'A robot drives at a constant 3 m/s for 4 seconds. Approximate the distance as a Riemann sum: 4 rectangles, each of height = velocity and width = dt. Fill in the accumulation line so `distance` adds one rectangle’s area (velocity × dt) each pass through the loop.',
      starter: `const velocity = 3      // m/s, constant
const totalTime = 4     // seconds
const N = 4             // number of rectangles
const dt = totalTime / N

let distance = 0
for (let i = 0; i < N; i++) {
  // add one rectangle's area (height * width) to the running total:
  distance = distance + ______
}

print('Distance:', distance, 'm')`,
      expected: 'Distance: 12 m',
      hint: 'One rectangle’s area is its height times its width. Height is `velocity`, width is `dt`. Replace the blank with `velocity * dt`.',
      success:
        'Four rectangles of area 3 × 1 = 3 each, summed to 12 m — exactly velocity × time. You just integrated velocity into distance. A real robot does this every control tick with its wheel speed: that’s odometry.',
    },
    {
      kind: 'explain',
      title: 'The Fundamental Theorem: they undo each other',
      body: [
        'You now have both halves of calculus. The derivative of distance is velocity (rate of change); the integral of velocity is distance (accumulation).',
        'That’s the Fundamental Theorem of Calculus: integration and differentiation are inverse operations. Differentiate then integrate, and you’re back where you started.',
        'It’s why one tool answers both “how fast?” and “how much total?” — they’re two views of the same relationship.',
      ],
      deeper: [
        'Concretely: if a function F has derivative f, then the area under f from a to b equals F(b) − F(a). The messy business of summing infinitely many rectangles collapses into subtracting two values of the antiderivative.',
        'That’s the theorem’s practical punch: to integrate, you don’t actually add up rectangles by hand — you find a function whose derivative is your curve, then evaluate it at the endpoints.',
        'Robotics lives on both directions at once: differentiate sensor position to get velocity, integrate motor velocity to predict position. The Fundamental Theorem guarantees these two estimates describe the same motion.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A PID controller’s I (integral) term accumulates the error between where the robot IS and where you WANT it, over time. A robot sits slightly below its target and never quite reaches it. What does the I term do?',
      options: [
        'It grows as the small error piles up over time, eventually pushing hard enough to close the gap',
        'It stays at zero because each individual error is tiny',
        'It measures how fast the error is changing right now',
        'It instantly jumps to the correct output with no accumulation',
      ],
      correctIndex: 0,
      reveal:
        'The I term integrates the error — it’s the running area under the error-vs-time graph. A persistent small error keeps adding the same little rectangle every tick, so the accumulated total climbs until it’s big enough to eliminate the steady-state offset. That’s the “I” in PID being literally an integral. (Measuring how fast the error changes is the D term — a derivative.)',
    },
    {
      kind: 'explain',
      title: 'Why this runs a robot',
      body: [
        'Odometry: a robot integrates each wheel’s velocity over time to estimate how far it has travelled and where it now is — a Riemann sum ticking away in real time.',
        'Control: the I term of a PID controller integrates accumulated error to erase the stubborn steady-state gap that a proportional term alone leaves behind.',
        'Same idea, both times — add up a rate to get a total. Lock it in; quiz from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Geometrically, the definite integral of a function over an interval is…',
      options: [
        'The area between the curve and the horizontal axis over that interval',
        'The slope of the curve at the interval’s midpoint',
        'The curve’s highest value on the interval',
        'The length of the interval itself',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the integral accumulates the function across the interval, which is exactly the area under the curve.',
        'Slope at a point is the DERIVATIVE, the integral’s opposite — it’s about steepness, not accumulated area.',
        'The highest value is a single peak; the integral sums contributions across the whole interval, not just the top.',
        'The interval length is only the WIDTH of the region. Area also depends on the curve’s height, i.e. the function’s values.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You approximate an area with rectangles (a Riemann sum). Making the rectangles thinner and more numerous…',
      options: [
        'Converges the estimate toward the exact integral',
        'Makes the estimate worse as errors accumulate',
        'Has no effect on the estimate’s accuracy',
        'Turns the integral into a derivative',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: as the width shrinks toward zero the rectangles hug the curve, gaps vanish, and the sum converges on the true integral.',
        'Backwards: thinner rectangles reduce the gap between the tops and the curve, so error shrinks, not grows.',
        'Width matters a lot — fewer, fatter rectangles leave big gaps or overhangs; thin ones fit the curve tightly.',
        'Refining the rectangles just improves the same integral. Differentiation is a different operation entirely.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot estimates how far it has driven by integrating each wheel’s velocity over time. This technique is called…',
      options: [
        'Odometry — accumulating velocity into distance',
        'Differentiation of position',
        'Proportional control',
        'Taking the derivative of acceleration',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: odometry integrates measured wheel velocity over time to accumulate distance travelled and infer position.',
        'That’s the reverse: differentiating position gives velocity. Odometry goes velocity → distance, an integral.',
        'Proportional control is the P term of PID — output proportional to current error, with no accumulation over time.',
        'The derivative of acceleration is jerk, unrelated to summing velocity into distance.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Fundamental Theorem of Calculus says that differentiation and integration are…',
      options: [
        'Inverse operations — one undoes the other',
        'The exact same operation with two names',
        'Completely unrelated procedures',
        'Both just ways of measuring slope',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the integral of a rate gives back the total, and the derivative of that total gives back the rate — they undo each other.',
        'Not identical — they’re opposites. One finds instantaneous rate of change, the other accumulates it back into a total.',
        'They’re intimately related: the theorem is precisely the statement linking them as inverses.',
        'Only the DERIVATIVE measures slope. The integral measures accumulated area; the theorem ties the two together.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A robot’s velocity is constant at 5 m/s for 6 seconds. Estimating distance with 6 equal rectangles gives…',
      options: [
        '30 m — six rectangles of area 5 × 1 = 5 each',
        '11 m — velocity plus time',
        '5 m — just the velocity',
        '0.83 m — velocity divided by time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each rectangle has height 5 (velocity) and width 1 s (dt = 6/6), area 5; six of them sum to 30 m = velocity × time.',
        'Integrating multiplies rate by time; it doesn’t add them. The area is height × width, not height + width.',
        'That’s just the height of one rectangle. You must sum the area across all 6 seconds of width.',
        'That divides instead of accumulating. Distance grows with time here, so it can’t shrink below the velocity.',
      ],
    },
    {
      question: 'For a curve that bends, why do we use MANY thin rectangles instead of one big one?',
      options: [
        'A single rectangle can’t match a curved top, but thin ones each cover a nearly-flat slice and sum closer to the true area',
        'One rectangle is always exact; extra ones are just decoration',
        'Thin rectangles make the area smaller so it’s easier to compute',
        'Because integrals require an even number of rectangles',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: across a thin slice the curve is almost flat, so a rectangle fits it well; summing many such slices approaches the exact area.',
        'One rectangle only equals the area when the top is flat (constant function). A bending curve leaves gaps or overhangs.',
        'The rectangles approximate the SAME area — they don’t shrink it. Thinner ones just fit the curve more faithfully.',
        'There’s no even/odd rule; accuracy depends on width shrinking toward zero, not on the count’s parity.',
      ],
    },
    {
      question: 'In a PID controller, the I term integrates the error over time. Its job is to…',
      options: [
        'Accumulate persistent error and eliminate the steady-state offset a proportional term leaves',
        'React to how fast the error is changing at this instant',
        'Output a value directly proportional to the current error',
        'Randomly perturb the output to escape local minima',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: integrating a small lingering error builds up its accumulated area until the output is strong enough to close the gap.',
        'Reacting to the RATE of error change is the D (derivative) term, not the integral.',
        'Output proportional to the current error is the P term — no accumulation over time involved.',
        'That’s not what PID does; the I term is a deterministic integral of the error, not random noise.',
      ],
    },
    {
      question: 'If F(t) is total distance and its derivative is velocity v(t), then the distance travelled between t = a and t = b equals…',
      options: [
        'F(b) − F(a), the integral of v from a to b',
        'v(b) − v(a), the change in speed',
        'F(a) + F(b), the sum of the endpoints',
        'the slope of v between a and b',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: by the Fundamental Theorem, integrating v (whose antiderivative is F) over [a, b] gives F(b) − F(a).',
        'That’s the change in velocity, not distance. Distance comes from the antiderivative F, not from v’s endpoints.',
        'You subtract the antiderivative’s endpoint values, not add them — adding wouldn’t give an accumulated interval.',
        'The slope of v is acceleration (a derivative), not the accumulated distance the integral gives.',
      ],
    },
  ],
}
