import type { Lesson } from '../../types'

export const histScientificRevolutionLesson: Lesson = {
  nodeId: 'hist-scientific-revolution',
  screens: [
    {
      kind: 'explain',
      title: 'Before the method',
      body: [
        'For nearly 2,000 years, the standard way to answer “why do objects fall?” was to look it up in Aristotle. Knowledge came from AUTHORITY — ancient texts — not from testing.',
        'It mostly worked well enough for daily life, and it was spectacularly wrong about the big things: heavy objects don’t fall faster, and the Sun doesn’t orbit the Earth.',
        'The Scientific Revolution (roughly 1543–1687) is the story of replacing “who said it?” with “can you show me?”',
      ],
    },
    {
      kind: 'predict',
      question: 'Aristotle taught that heavy objects fall faster than light ones. For ~1,900 years almost everyone believed it. How was it finally overturned?',
      options: [
        'Someone actually tested it — rolling and dropping objects and measuring',
        'A more convincing philosopher argued better than Aristotle',
        'The church officially changed its position',
        'It was never overturned — heavy objects DO fall faster',
      ],
      correctIndex: 0,
      reveal:
        'Galileo tested it (~1600) — with inclined-plane experiments, and by reasoning about falling bodies — and found that ignoring air resistance, everything falls at the same rate. The revolutionary act wasn’t the answer; it was the METHOD: settle questions by experiment, not by argument from authority. (Drop a hammer and a feather in vacuum — as an Apollo 15 astronaut did on the Moon — and they land together.)',
    },
    {
      kind: 'explain',
      title: 'The pattern: observe, model, test',
      body: [
        'Copernicus (1543) proposed the Sun-centered model. Kepler mined decades of precise observations to find that planets move in ellipses. Galileo pointed the brand-new telescope up (1609–10) and saw moons orbiting Jupiter — direct evidence that not everything circles Earth.',
        'Newton (1687) then unified it all: ONE law of gravity explains falling apples AND orbiting planets, written in mathematics that predicts, not just describes.',
        'Notice the loop: careful observation → mathematical model → testable prediction → better observation. That loop, run again and again, is science.',
      ],
      deeper: [
        'Each step needed the previous one: Kepler’s ellipses needed Tycho Brahe’s 20 years of naked-eye planet data (the best ever collected); Newton’s gravity needed Kepler’s ellipses to check against. Data → pattern → law: the pipeline hasn’t changed.',
        'Institutions mattered as much as geniuses: the Royal Society (founded 1660) established publishing, peer review and its motto “Nullius in verba” — take nobody’s word for it. Replication by strangers is what separates science from anecdote.',
        'The same loop runs in engineering today: your PID tuning was literally hypothesis (“more D will damp the overshoot”) → experiment (run the sim) → revise. Debugging IS the scientific method at high speed.',
      ],
      links: [
        { nodeId: 'phys-forces', label: 'Newton’s laws, hands-on: Forces & Motion' },
        { nodeId: 'robo-control', label: 'The loop in action: Feedback & Control' },
      ],
    },
    {
      kind: 'predict',
      question: 'Kepler found planets orbit in ellipses, not perfect circles. What did he need MOST to make that discovery?',
      options: [
        'Decades of unusually precise observational data',
        'A more powerful telescope than Galileo’s',
        'The theory of gravity',
        'Permission from the church',
      ],
      correctIndex: 0,
      reveal:
        'Kepler inherited Tycho Brahe’s ~20 years of planet positions — the most precise ever measured (all WITHOUT telescopes). Circles almost fit Mars, but Tycho’s data was precise enough that “almost” was a contradiction. Trusting a tiny 8-arcminute mismatch over a beautiful 2,000-year-old assumption is the whole revolution in one decision. Gravity came 60 years later — Newton EXPLAINED the ellipses Kepler found.',
    },
    {
      kind: 'quiz',
      question: 'What was the core change the Scientific Revolution made to how humans decide what’s true?',
      options: [
        'From trusting ancient authorities to testing claims with experiment and observation',
        'From religion to atheism',
        'From mathematics to philosophy',
        'From observation to pure logic',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the shift was epistemological — “Aristotle said so” lost to “here is the experiment, run it yourself.”',
        'Most revolutionaries (Copernicus, Kepler, Newton) were devout — the change was HOW claims get verified, not belief itself.',
        'Backwards on math: the revolution made nature MORE mathematical (Kepler’s ellipses, Newton’s laws).',
        'Also backwards: pure logic from authority was the OLD way; the new way anchored logic to observation.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why was Galileo’s telescope observation of Jupiter’s moons (1610) such powerful evidence?',
      options: [
        'It showed bodies orbiting something other than Earth — so Earth isn’t the center of all motion',
        'It proved Jupiter was made of gas',
        'It showed the Moon orbits the Sun',
        'It measured the speed of light',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: four moons visibly circling Jupiter broke the rule “everything orbits Earth” — anyone with a telescope could check.',
        'Jupiter’s composition was unknowable then and irrelevant to the Earth-centered debate.',
        'Our Moon orbits Earth (that part survived) — the point was JUPITER’s moons orbiting Jupiter.',
        'Light speed came later (Rømer, 1676 — ironically using those same moons’ eclipse timings).',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Royal Society’s motto “Nullius in verba” (take nobody’s word for it) captures which scientific principle?',
      options: [
        'Claims must be verifiable and replicable by others, regardless of who made them',
        'Scientists should never publish their findings',
        'Only society members may perform experiments',
        'Older sources are more trustworthy',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: replication is the filter — a result that only works for its discoverer isn’t knowledge yet.',
        'The opposite — the Royal Society pioneered scientific PUBLISHING so others could scrutinize and repeat work.',
        'Anyone can experiment; the motto invites everyone to verify rather than defer.',
        'That’s the pre-revolution mindset the motto explicitly rejects.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What made Newton’s Principia (1687) the revolution’s climax?',
      options: [
        'One mathematical law explained both earthly falling and planetary orbits — and predicted new phenomena',
        'It was the first book to claim the Earth moves',
        'It proved Aristotle right after all',
        'It described the telescope’s invention',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: universal gravitation unified the heavens and the Earth under one equation, with predictions (comet returns, Earth’s flattened poles) that kept coming true.',
        'Copernicus made that claim 144 years earlier — Newton explained WHY the motions are as they are.',
        'It buried Aristotle’s physics: no natural places, no heavier-falls-faster — just forces and mathematics.',
        'Telescopes predate the Principia by ~80 years; Newton’s contribution was the theory (though he did invent a reflecting telescope).',
      ],
    },
    {
      kind: 'quiz',
      question: 'Kepler trusted an 8-arcminute mismatch between circle-based predictions and Tycho’s data over the 2,000-year-old assumption of circular orbits. The transferable lesson is:',
      options: [
        'When reliable data contradicts a beautiful assumption, the assumption goes',
        'Small errors in data should be ignored as noise',
        'Older theories deserve the benefit of the doubt',
        'Beautiful theories are usually true',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: because he KNEW Tycho’s error bars were smaller than the mismatch, the discrepancy was signal — and it pointed at ellipses. Trustworthy data beats seniority of ideas.',
        'Only if the error is within your measurement uncertainty — Kepler’s point was that this one was too big to be noise.',
        'Age earns a theory nothing; surviving hard tests does.',
        'Beauty is a heuristic at best — circular orbits were beautiful and wrong.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Put the chain in order: who provided what?',
      options: [
        'Tycho: precise data → Kepler: elliptical orbits → Newton: the law explaining them',
        'Newton: data → Tycho: orbits → Kepler: the law',
        'Kepler: data → Newton: orbits → Tycho: the law',
        'They all worked together in one lab',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: decades of naked-eye measurements (Tycho) → pattern found in the data (Kepler) → deep law predicting the pattern (Newton). Data, pattern, law.',
        'Newton was born in 1642/43, after both had died — he stood on their shoulders, not before them.',
        'Kepler analyzed data he inherited FROM Tycho; Newton came last with the explanation.',
        'They spanned three generations and never all met — the collaboration happened through published work, which is rather the point.',
      ],
    },
    {
      question: 'A modern echo of “Nullius in verba” in engineering practice is:',
      options: [
        'Rerunning a teammate’s benchmark before believing the speedup',
        'Trusting a result because a famous engineer posted it',
        'Choosing the oldest library because it has authority',
        'Never measuring anything twice',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: replication before belief — the Royal Society would approve of “works on my machine” skepticism.',
        'Fame is authority, and authority is exactly what the motto says to discount.',
        'Age alone is Aristotle-logic; maturity matters only insofar as it reflects surviving tests.',
        'Repeated measurement is how you learn your error bars — Tycho’s superpower.',
      ],
    },
  ],
}
