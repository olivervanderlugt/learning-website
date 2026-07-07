import type { Lesson } from '../../types'

export const physForces2Lesson: Lesson = {
  nodeId: 'phys-forces-2',
  screens: [
    {
      kind: 'explain',
      title: 'The suvat toolkit',
      body: [
        'Five quantities describe motion under CONSTANT acceleration: s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time) — "suvat".',
        'Four equations link them, and each one is missing exactly one letter: v = u + at (no s), s = ut + ½at² (no v), v² = u² + 2as (no t), s = ½(u+v)t (no a).',
        'Know any three of the five, and one equation always hands you a fourth. Pick the equation that already excludes the variable you don’t have.',
      ],
      deeper: [
        'These aren’t separate facts — they’re all one idea, integrated. Acceleration is constant, so v(t) = u + at is just "start speed plus the ramp acceleration builds." Integrate velocity over time and you get position: s(t) = ut + ½at² — the ½ comes from integrating the straight ramp v(t), which is the area of a triangle sitting on a rectangle.',
        'v² = u² + 2as is algebra, not new physics: solve v = u + at for t, substitute into s = ut + ½at², and the t drops out entirely. It exists purely so you never have to detour through time when you don’t care about it.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A rover accelerates from rest at 2 m/s² for 3 seconds. Which suvat equation gets you its final velocity fastest?',
      options: [
        'v = u + at — you have u, a and t, and want v',
        'v² = u² + 2as — you don’t know s yet',
        's = ut + ½at² — that solves for distance, not speed',
        's = ½(u+v)t — v is unknown on both sides of what you’re missing',
      ],
      correctIndex: 0,
      reveal:
        'v = u + at = 0 + 2×3 = 6 m/s. The move is always: look at what you HAVE (u, a, t) and what you WANT (v), then grab the one equation built from exactly those letters.',
    },
    {
      kind: 'explain',
      title: 'Projectiles: two 1D problems wearing a trenchcoat',
      body: [
        'Throw something and gravity only pulls DOWN. So split the motion into horizontal (x) and vertical (y) — they don’t interact. Horizontally, a = 0 (constant velocity, ignoring drag). Vertically, a = −g ≈ −9.8 m/s².',
        'A payload dropped from a moving drone still moves forward at the drone’s speed the whole way down — the horizontal motion doesn’t know gravity exists.',
        'Solve the fall time with the VERTICAL suvat equation alone, then multiply by the horizontal speed to get how far it travels.',
      ],
      deeper: [
        'Time of flight for a level launch-and-land: t = 2u·sinθ/g (found by setting vertical displacement back to zero). Range: R = u²·sin(2θ)/g. Because sin(2θ) is symmetric around 90°, a 30° and a 60° launch land at the SAME range — only 45° is the unique maximum.',
      ],
      links: [{ nodeId: 'math-calculus', label: 'Refresher: Calculus & Change' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a drone flying level drops a package from 20 m up (starts with zero VERTICAL velocity). Which equation finds the fall time?',
      options: [
        's = ut + ½at² with u = 0, s = 20, a = 9.8 — solve for t',
        'v = u + at — you don’t know the final speed yet',
        'v² = u² + 2as — that gives speed, not time',
        'You need the horizontal speed first',
      ],
      correctIndex: 0,
      reveal:
        's = ½at² (u=0) → 20 = ½×9.8×t² → t² ≈ 4.08 → t ≈ 2.02 s. The horizontal speed is irrelevant to HOW LONG the fall takes — that’s decided purely by the vertical drop, exactly like the trenchcoat metaphor says.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — a robot arm’s gripper swings in a circle at a perfectly constant speed. Is there any acceleration?',
      options: [
        'Yes — constant SPEED but changing DIRECTION means the velocity vector is changing, which is acceleration',
        'No — constant speed means zero acceleration by definition',
        'Only if the speed is also changing',
        'Only at the very start and end of the swing',
      ],
      correctIndex: 0,
      reveal:
        'Velocity is speed AND direction. Turning at constant speed still changes the velocity vector every instant — that’s centripetal acceleration, a = v²/r, always pointing toward the center. It’s why your arm has to keep pulling inward on anything it swings, even at steady speed.',
    },
    {
      kind: 'code',
      prompt:
        'Prove the range formula yourself. R = v0² · sin(2θ) / g. Fill in the missing line, then compare launch angles of 30°, 45° and 60° at the same speed — which one wins, and does anything surprising tie with it?',
      starter: `function range(v0, angleDeg, g) {
  const theta = angleDeg * Math.PI / 180
  const R = 0 // fill in: v0*v0 * Math.sin(2*theta) / g
  return R.toFixed(1)
}
print('30°:', range(20, 30, 10))
print('45°:', range(20, 45, 10))
print('60°:', range(20, 60, 10))`,
      expected: `30°: 34.6
45°: 40.0
60°: 34.6`,
      hint: 'The formula is: R = v0 * v0 * Math.sin(2 * theta) / g',
      success:
        '45° maximizes range at 40.0 m — but 30° and 60° TIE at 34.6 m. That’s not a coincidence: sin(2θ) is symmetric around 90°, so any two launch angles that add up to 90° land at the same distance. A trajectory-planning robot arm can trade a steep, safe arc for a flat, fast one and land in the exact same spot.',
    },
    {
      kind: 'quiz',
      question:
        'A cart starts at rest and accelerates at 4 m/s² for 5 seconds. How far does it travel?',
      options: ['50 m', '20 m', '100 m', '10 m'],
      correctIndex: 0,
      explanations: [
        'Correct: s = ut + ½at² = 0×5 + ½×4×25 = 50 m. With u = 0, only the ½at² term survives.',
        '20 m comes from a×t = 20, which is the FINAL VELOCITY, not distance. Distance needs the ½at² formula.',
        '100 m drops the ½ — s = ½at² = ½×4×5² = 50 m, not at² = 100.',
        '10 m is a×t²/2 with t used as 5 instead of squared correctly some other way — recompute: ½×4×25 = 50 m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A ball is thrown horizontally off a cliff. Compared to a ball simply dropped from the same height at the same instant, which hits the ground first?',
      options: [
        'They land at the same time — horizontal speed doesn’t affect the fall',
        'The thrown ball lands first — it’s moving faster overall',
        'The dropped ball lands first — it falls "more purely"',
        'It depends on how hard it was thrown',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: horizontal and vertical motion are independent. Both start with zero VERTICAL velocity and feel the same g, so both hit the ground at the identical instant — one just lands farther away.',
        'Total speed is irrelevant to fall TIME — only the vertical component of motion decides when it reaches the ground, and both start with zero of that.',
        '"More purely" isn’t a physical quantity — the vertical equation s = ½gt² is identical for both balls.',
        'Throw speed changes horizontal distance traveled, not the time spent falling — that’s the whole point of decomposing into x and y.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A satellite orbits at constant speed in a circle. What provides the centripetal acceleration that keeps it turning?',
      options: [
        'Gravity, pulling it toward the planet’s center',
        'Its engines, firing continuously',
        'Nothing — constant speed needs no force',
        'Air resistance',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: gravity supplies exactly the inward pull needed for a = v²/r. No engine burn required — that’s literally why orbits are "free" once you’re moving fast enough sideways.',
        'A satellite in a stable orbit needs no thrust to stay in its circle — gravity alone provides the centripetal force.',
        'Constant SPEED still means changing VELOCITY (direction) in a circle — that always requires a net inward force, satellite or not.',
        'There’s no meaningful air resistance in orbit, and it wouldn’t point inward anyway — it opposes motion, not centers the path.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You know u, v and a for a robot arm segment, but not t. Which suvat equation solves for s directly?',
      options: [
        'v² = u² + 2as — the only equation with no t in it',
        'v = u + at — this still needs t',
        's = ut + ½at² — this still needs t',
        's = ½(u+v)t — this still needs t',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: v² = u² + 2as is the one equation built without t — exactly the tool for "I don’t know or care about time."',
        'That equation has t in it — useless without knowing time first.',
        'Also needs t — you’d have to solve for it first, an unnecessary detour.',
        'Same issue — every other suvat equation needs t; only v² = u² + 2as skips it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A projectile is launched at 20° and lands at the same height it launched from. Which OTHER angle gives it the exact same range?',
      options: ['70°', '20° again is the only one', '40°', '90° minus half of 20°'],
      correctIndex: 0,
      explanations: [
        'Correct: range depends on sin(2θ), which is symmetric about 90° — any two angles that sum to 90° (here, 20° and 70°) land at the same distance.',
        'Not quite — a DIFFERENT angle, 70°, ties it: 20° + 70° = 90°.',
        '40° would need to pair with 50° to sum to 90°, not with 20°.',
        'The rule is θ₁ + θ₂ = 90°, so the partner of 20° is 70°, not a formula involving half of 20°.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A drone accelerates from 5 m/s to 15 m/s over 4 seconds. What was its acceleration?',
      options: ['2.5 m/s²', '10 m/s²', '3.75 m/s²', '20 m/s²'],
      correctIndex: 0,
      explanations: [
        'Correct: v = u + at → 15 = 5 + a×4 → a = 10/4 = 2.5 m/s².',
        '10 is v − u without dividing by time — that’s the CHANGE in velocity, not the rate of change.',
        '3.75 comes from a wrong rearrangement — solve v = u + at for a: a = (v − u)/t = 10/4 = 2.5 m/s².',
        '20 is (v−u)×t — multiplying instead of dividing by time inverts the relationship.',
      ],
    },
    {
      question:
        'A ball is launched straight up at 15 m/s. Using v² = u² + 2as (a = −9.8), how high does it rise before its velocity hits zero?',
      options: ['≈11.5 m', '≈15 m', '≈22.9 m', '≈7.5 m'],
      correctIndex: 0,
      explanations: [
        'Correct: 0 = 15² − 2×9.8×s → s = 225/19.6 ≈ 11.5 m.',
        '15 m just restates the launch speed in different units — it isn’t the height reached.',
        '22.9 m forgets to divide by 2×9.8 fully — check: 225 ÷ 19.6 ≈ 11.5 m, not 22.9.',
        '7.5 m is half of 15 — height doesn’t come from halving the speed; use v² = u² + 2as.',
      ],
    },
    {
      question: 'Why does a longer wrench make it easier to loosen a stuck bolt?',
      options: [
        'It increases the lever arm, so the same hand-force produces more torque',
        'It makes your hand physically stronger',
        'It reduces the bolt’s friction',
        'Longer tools always weigh more, adding force',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: torque = force × lever arm (τ = rF, roughly). A longer wrench increases r, so the same push you supply creates more twisting effect on the bolt.',
        'Your hand-force is unchanged — what changes is how far from the pivot that force acts, which is exactly what torque depends on.',
        'The wrench doesn’t touch the bolt’s threads or friction at all — it changes the mechanical leverage of your push.',
        'Weight has nothing to do with it — a longer LEVER ARM is the entire mechanism, regardless of the tool’s mass.',
      ],
    },
    {
      question:
        'Two identical robot arms swing their grippers in circles of different radii at the SAME angular speed (same rad/s). Which gripper needs more centripetal force?',
      options: [
        'The one on the LARGER circle — centripetal acceleration a = ω²r grows with r',
        'The one on the SMALLER circle — tighter turns always need more force',
        'Both need the same force — angular speed is all that matters',
        'Neither needs any force at constant angular speed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at fixed angular speed ω, centripetal acceleration is a = ω²r — bigger radius means a bigger swept speed and more inward pull needed to hold the curve.',
        'That intuition applies at fixed LINEAR speed (a = v²/r, smaller r needs more force there) — but here angular speed is fixed, which flips the relationship.',
        'Angular speed alone doesn’t fix the force — the radius scales it too, since the linear speed (v = ωr) differs between the two arms.',
        'Any circular motion at constant speed still changes the velocity DIRECTION continuously — that always requires centripetal force.',
      ],
    },
  ],
}
