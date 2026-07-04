import type { Lesson } from '../../types'

export const bitsLesson: Lesson = {
  nodeId: 'bits',
  screens: [
    {
      kind: 'explain',
      title: 'Your computer is billions of light switches',
      body: [
        'Strip away the screen, the keyboard, the apps — underneath, a computer is just switches. Each one is either ON or OFF, nothing in between.',
        'One switch can say two things: yes/no, true/false, 1/0. That seems hopelessly little. The magic is what happens when you combine them.',
      ],
    },
    {
      kind: 'predict',
      question: 'You have 3 switches in a row. How many different messages (combinations) can they represent?',
      options: ['3', '6', '8', '9'],
      correctIndex: 2,
      reveal:
        'Each switch doubles the possibilities: 1 switch → 2, 2 switches → 4, 3 switches → 2×2×2 = 8. This doubling is the single most important fact about digital information — 8 switches give 256 messages, and 64 switches give more combinations than there are grains of sand on Earth.',
    },
    {
      kind: 'game',
      gameId: 'binary-counter',
    },
    {
      kind: 'explain',
      title: 'Place values: how switches become numbers',
      body: [
        'You just felt it: each switch has a value — 1, 2, 4, 8, 16 — doubling as you go left. A number is simply the sum of the switches that are ON.',
        'This is exactly like decimal, where places are worth 1, 10, 100. Binary just doubles instead of ×10, because switches have 2 states instead of 10.',
        'Time to master converting in both directions — this is the skill everything else builds on.',
      ],
    },
    {
      kind: 'game',
      gameId: 'binary-converter',
    },
    {
      kind: 'explain',
      title: 'Bits, bytes, and a robot’s eyes',
      body: [
        'One switch = one bit. Eight bits = one byte, which can hold any number from 0 to 255.',
        'That’s why so much tech speaks in 0–255: the brightness of a camera pixel, a color channel, a servo angle command — each is one byte.',
        'When a distance sensor tells your robot “obstacle at 47 cm”, the wire literally carries 00101111. You can now read your robot’s mind.',
      ],
    },
    {
      kind: 'predict',
      question: 'A sensor upgrades from 8-bit to 9-bit readings. What happens to the number of distinct values it can report?',
      options: [
        'It goes up by 1 (256 → 257)',
        'It doubles (256 → 512)',
        'It goes up by 8 (256 → 264)',
        'It squares (256 → 65,536)',
      ],
      correctIndex: 1,
      reveal:
        'Every extra bit doubles the combinations, because the new bit can be 0 or 1 for each existing combination: 2⁸ = 256 → 2⁹ = 512. This is why “10-bit” sensors are noticeably more precise than 8-bit ones — each bit is a doubling, not a small step.',
    },
    {
      kind: 'quiz',
      question: 'How many different values can 4 bits represent?',
      options: ['4', '8', '16', '32'],
      correctIndex: 2,
      explanations: [
        '4 would mean each bit adds one value — but each bit doubles the total. 4 bits give 2×2×2×2 = 16.',
        '8 is what 3 bits give (2³). The fourth bit doubles that again: 16.',
        'Right: 2⁴ = 16, because each of the 4 bits independently doubles the possibilities.',
        '32 is 2⁵ — that would take 5 bits. With 4 bits: 2×2×2×2 = 16.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is binary 101 in decimal?',
      options: ['3', '5', '6', '101'],
      correctIndex: 1,
      explanations: [
        '3 comes from counting the digits or adding 1+0+1 as plain digits — but each position has a VALUE: 4, 2, 1. Only ON positions count: 4+1 = 5.',
        'Correct: the places are worth 4, 2, 1 and the ON ones are 4 and 1, so 4+1 = 5.',
        '6 would be binary 110 — that has the 4s and 2s switches on (4+2). In 101 the ON switches are 4 and 1.',
        '“101” is what it looks like, not what it means — binary digits use place values 4, 2, 1, giving 4+1 = 5.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do computers use binary instead of decimal?',
      options: [
        'Two-state switches are cheap, tiny and reliable to build in hardware',
        'Binary math is fundamentally faster than decimal math',
        'Computers can’t handle numbers bigger than 1',
        'It’s a historical convention we’re stuck with',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a transistor is either conducting or not — two states you can tell apart even with electrical noise. Building a reliable TEN-state switch is vastly harder.',
        'The speed comes from the hardware being simple, not from binary arithmetic being magically faster — the same math in decimal hardware would just be much harder to build reliably.',
        'Computers handle enormous numbers fine — they just spell them with many bits, the way you spell big numbers with many digits.',
        'It’s a physics-driven choice, not habit: two clearly distinguishable voltage levels survive noise; ten levels would constantly get misread.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is decimal 9 in binary?',
      options: ['1001', '1010', '1100', '111'],
      correctIndex: 0,
      explanations: [
        'Correct: 9 = 8 + 1, so switch on the 8s and 1s places: 1001.',
        '1010 is 8+2 = 10 — one too many. For 9 you need 8 and 1: 1001.',
        '1100 is 8+4 = 12. Greedy method: 9−8 = 1, then 1−1 = 0 — so only 8 and 1 are used.',
        '111 is 4+2+1 = 7. Nine needs the 8s place: 9 = 8+1 = 1001.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Each extra bit ___ the number of values you can represent.',
      options: ['adds 2 to', 'doubles', 'triples', 'squares'],
      correctIndex: 1,
      explanations: [
        'Adding 2 would make bits barely useful — the new bit can be 0 or 1 for EVERY existing combination, so the total doubles.',
        'Correct: every existing combination now exists twice (new bit 0, new bit 1) — 2ⁿ growth is why 64 bits can index the whole internet.',
        'Tripling would need three-state switches. Ours have two states, so each bit multiplies possibilities by 2.',
        'Squaring would mean 8 bits → 65,536 values, but 8 bits give 256. Each single bit multiplies by 2, so n bits give 2ⁿ.',
      ],
    },
  ],
}
