import type { Lesson } from '../../types'

export const physStatics3Lesson: Lesson = {
  nodeId: 'phys-statics-3',
  screens: [
    {
      kind: 'explain',
      title: 'Why beams are deep, not wide',
      body: [
        'Load a beam in the middle and it bends: the bottom face STRETCHES (tension) while the top face SQUEEZES (compression), with a neutral line in between feeling nothing. The bending stress is largest at the outer faces.',
        'That stress is σ = M·c/I: M is the bending moment, c is the distance from the neutral axis to the outer face, and I is the SECOND MOMENT OF AREA — a measure of how the cross-section’s material is spread out from the axis.',
        'For a rectangle I = b·h³/12, and the outer fibre is at c = h/2, which simplifies to σ = 6M/(b·h²). The DEPTH h matters as a square in stress (and a cube in I) — which is why beams and joists are tall, and why an I-beam puts its material top and bottom.',
      ],
      deeper: [
        'The h³ in I is the whole reason structures look the way they do. Doubling a beam’s depth makes it 2³ = 8× stiffer in bending and drops the peak stress by 4× — far more effect than doubling the width, which only helps linearly. An I-beam is the extreme optimization: it strips out the material near the neutral axis (which barely carries bending stress) and concentrates it in the flanges far from the axis, where it does the most good per kilogram. Same idea makes hollow tubes such efficient beams.',
      ],
      links: [{ nodeId: 'phys-statics-2', label: 'The stress it must stay under: σ vs. yield' }],
    },
    {
      kind: 'predict',
      question:
        'A rectangular beam has bending stress σ = 6M/(b·h²). You keep the same load and width but DOUBLE the depth h. What happens to the peak bending stress?',
      options: [
        'It drops to a quarter — stress goes as 1/h², so doubling h divides stress by 4',
        'It halves — depth affects stress linearly',
        'It doubles — a taller beam carries more stress',
        'It stays the same — only width matters',
      ],
      correctIndex: 0,
      reveal:
        'σ = 6M/(b·h²), so the depth enters as 1/h². Double h and stress falls by 2² = 4×. Depth is a hugely powerful lever — far more than width, which only appears to the first power. This is exactly why you turn a plank on its EDGE to make a shelf stiffer: same board, four times less bending stress. The code screen shows it.',
    },
    {
      kind: 'explain',
      title: 'Twisting instead of bending: torsion',
      body: [
        'A motor shaft doesn’t bend — it TWISTS. Torsion is the same story rotated 90°: a torque T applied along a shaft creates SHEAR stress that is zero at the centre and largest at the outer surface, τ = T·r/J.',
        'Here r is the radius to the outer surface and J is the POLAR second moment of area (J = π·r⁴/2 for a solid round shaft). Just like bending, the material far from the axis does the work — so the outer skin carries almost all the load.',
        'That’s why a HOLLOW tube is nearly as strong in torsion as a solid rod of the same outer diameter but far lighter: you removed the lazy core near the axis. Sizing a robot’s drive shaft against its motor torque is precisely this τ = T·r/J calculation kept under the material’s shear limit.',
      ],
      deeper: [
        'The r⁴ in J is even more dramatic than bending’s h³: shaft strength scales with the fourth power of radius, so a small increase in diameter buys a large jump in torque capacity. This is why a slightly thicker axle is dramatically stiffer, and why the failure of an under-sized shaft is a classic robotics mistake — the motor can deliver more torque than a thin shaft can transmit, and it shears or twists. The neutral-axis idea unifies it all: whether bending or twisting, stress grows with distance from the axis, so smart designs push material outward.',
      ],
      links: [{ nodeId: 'phys-forces-3', label: 'Refresher: torque & rotation' }],
    },
    {
      kind: 'predict',
      question:
        'Two shafts have the same outer diameter, but one is solid and one is a hollow tube (the middle drilled out). In torsion, how do they compare?',
      options: [
        'The hollow tube is nearly as strong but much lighter — the removed core near the axis barely carried any stress',
        'The hollow tube is far weaker — removing material always halves the strength',
        'They are identical in weight and strength',
        'The hollow tube is stronger AND heavier',
      ],
      correctIndex: 0,
      reveal:
        'Torsional shear stress τ = T·r/J is smallest at the centre and largest at the surface, so the material near the axis contributes little to J. Drilling it out removes weight without removing much strength — the hollow tube keeps nearly all the torsional capacity at a fraction of the mass. That’s why drive shafts, bike frames and aircraft spars are tubes, not solid bars.',
    },
    {
      kind: 'code',
      prompt:
        'Compute the peak bending stress of a rectangular beam, σ = 6M/(b·h²), for a fixed load and width at two depths. Fill in the missing line, then see the powerful 1/h² effect of depth.',
      starter: `const M = 1000, b = 0.1 // N·m, metres (bending moment, beam width)
function bendingStress(h) {
  const sigma = 0 // fill in: 6 * M / (b * h * h)   (in pascals)
  return (sigma / 1e6).toFixed(1) + ' MPa'
}
print('h=0.10m: ' + bendingStress(0.10))
print('h=0.20m: ' + bendingStress(0.20))`,
      expected: `h=0.10m: 6.0 MPa
h=0.20m: 1.5 MPa`,
      hint: 'σ = 6 * M / (b * h * h). Doubling h multiplies the h² term by 4, so the stress drops to a quarter.',
      success:
        'Doubling the depth from 0.1 m to 0.2 m dropped the bending stress from 6.0 to 1.5 MPa — exactly a factor of four (1/h²), for no extra width. That’s the whole reason beams are tall and I-beams shove their material to the flanges. The same “put material far from the axis” logic makes hollow tubes the right choice for twisting shafts.',
    },
    {
      kind: 'quiz',
      question: 'When a simply-supported beam is loaded downward in the middle, the stress in its cross-section is…',
      options: [
        'Tension on the bottom face, compression on the top, zero at the neutral axis between them',
        'Uniform tension everywhere across the section',
        'Compression on the bottom, tension on the top',
        'Zero everywhere until the beam breaks',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: bending stretches the bottom fibres (tension) and squeezes the top (compression), with a neutral axis of zero stress in between — peak stress at the outer faces.',
        'Bending stress varies across the depth (tension to compression); it isn’t uniform.',
        'For a downward load the bottom stretches (tension) and the top compresses — this option has them backwards.',
        'The beam carries real internal stresses long before it breaks; they’re just below the failure limit.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'In bending, why does a beam’s DEPTH help so much more than its width?',
      options: [
        'The second moment of area I = b·h³/12 grows with the cube of depth but only linearly with width',
        'Depth adds more weight, and weight resists bending',
        'Width has no effect on stiffness at all',
        'Depth changes the material, making it stronger',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: I ∝ h³ means doubling depth multiplies stiffness by 8 (and cuts bending stress by 4), while doubling width only doubles I — depth is the far stronger lever.',
        'It’s the geometric distribution (material far from the neutral axis), not weight, that resists bending — an I-beam is light yet stiff.',
        'Width does help — linearly — it’s just far less effective than depth.',
        'Depth changes the SHAPE, not the material; the stiffness gain is geometric, not a material property.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a twisted round shaft, where is the shear stress the greatest?',
      options: [
        'At the outer surface (largest radius); it is zero at the centre',
        'At the exact centre of the shaft',
        'Uniform across the whole cross-section',
        'Only where the torque is applied',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: τ = T·r/J grows with radius r, so the outer skin carries the most and the centreline carries none — which is why hollow shafts are so efficient.',
        'The centre has r = 0, so its shear stress is zero, not maximum.',
        'Torsional shear varies linearly with radius; it isn’t uniform.',
        'The stress exists all along the loaded length; it peaks at the largest radius of every section, not just at the ends.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is a hollow tube an efficient shape for a shaft that transmits torque?',
      options: [
        'The material near the axis carries little torsional stress, so removing it saves weight with little strength loss',
        'Hollow shafts can carry no torque, so they never fail',
        'The hollow centre stores extra energy',
        'A tube always has more material than a solid rod',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: since τ grows with radius, the core near the axis is nearly idle; drilling it out cuts mass while keeping most of the torsional capacity — hence tubes for drive shafts and frames.',
        'A tube absolutely carries torque — nearly as much as a solid rod of the same outer diameter, just lighter.',
        'The benefit is weight savings, not energy storage.',
        'A tube has LESS material than a solid rod of the same outer diameter — that’s the point, less weight.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A rectangular beam has bending stress σ = 6M/(b·h²). If you keep h and the load fixed but DOUBLE the width b, the stress…',
      options: ['Halves', 'Drops to a quarter', 'Doubles', 'Stays the same'],
      correctIndex: 0,
      explanations: [
        'Correct: b appears to the first power in the denominator, so doubling b halves the stress (unlike depth, which acts as 1/h²).',
        'Quartering happens when you double DEPTH (1/h²), not width.',
        'More width lowers stress, not raises it.',
        'Width does matter (linearly); doubling it changes the stress.',
      ],
    },
    {
      question:
        'The second moment of area of a rectangle is I = b·h³/12. If depth h is tripled (same width), I increases by a factor of…',
      options: ['27', '3', '9', '81'],
      correctIndex: 0,
      explanations: [
        'Correct: I ∝ h³, so tripling h multiplies I by 3³ = 27 — an enormous stiffness gain.',
        '3× would be the effect if I depended on h linearly; it depends on h³.',
        '9× is h²; the second moment scales with h³.',
        '81× is h⁴ (that’s closer to the polar J’s r⁴ scaling for shafts); a rectangle’s I goes as h³ → 27.',
      ],
    },
    {
      question: 'Torsional shear stress in a solid round shaft is τ = T·r/J. This is largest…',
      options: [
        'At the outer surface, where r is greatest',
        'At the centreline, where r = 0',
        'Everywhere equally',
        'Only at the very ends of the shaft',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: τ scales with radius r, so the maximum is at the outer surface and it falls to zero at the axis.',
        'At r = 0 the shear stress is zero — the opposite of maximum.',
        'It varies linearly with radius, so it isn’t uniform.',
        'It occurs along the whole loaded length, peaking at the surface of each cross-section.',
      ],
    },
    {
      question:
        'A robot’s motor can deliver more torque than its thin drive shaft can handle. What’s the failure and the fix?',
      options: [
        'The shaft twists/shears; increase its diameter (shaft capacity scales strongly with radius) or use a stronger material',
        'The motor overheats; add a bigger battery',
        'The shaft stretches lengthwise; make it shorter',
        'Nothing fails; motors can never out-torque a shaft',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an under-sized shaft exceeds its shear limit and twists or shears off; because torsional capacity rises steeply with radius (J ∝ r⁴), a modest diameter increase fixes it.',
        'The issue is mechanical (torsion in the shaft), not the motor’s thermal or battery limits.',
        'Torsion twists the shaft about its axis; it doesn’t stretch it lengthwise, and shortening doesn’t address shear stress.',
        'A real, classic failure — a motor can absolutely deliver more torque than a thin shaft can transmit.',
      ],
    },
  ],
}
