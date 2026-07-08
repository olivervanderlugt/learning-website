import type { Lesson } from '../../types'

export const progC3Lesson: Lesson = {
  nodeId: 'prog-c-3',
  screens: [
    {
      kind: 'explain',
      title: 'Flipping one bit at a time',
      body: [
        'A byte is 8 bits, and often each bit is its own on/off flag — a hardware register where bit 2 means “motor enabled”, bit 5 means “fault”. You must change ONE bit without disturbing the others.',
        'The tools are bitwise operators: AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), and shifts (`<<`, `>>`). A MASK is a number with 1s only where you want to act.',
        'Set a bit with OR, clear it with AND-NOT, test it with AND. This is the daily language of embedded robotics.',
      ],
      links: [{ nodeId: 'bits', label: 'Refresher: binary & bits' }],
    },
    {
      kind: 'predict',
      question:
        'A status byte is `0b0101`. You want to turn ON bit 1 (value 2) WITHOUT touching the other bits. Which operation does it?',
      options: [
        'OR with the mask `0b0010` → `0b0111`',
        'AND with `0b0010` → wipes everything else',
        'Add 2 → risks carrying into other bits',
        'XOR with `0b1111` → flips all four bits',
      ],
      correctIndex: 0,
      reveal:
        'OR with a mask that has a 1 only in the target position sets that bit and leaves the rest alone: `0b0101 | 0b0010 = 0b0111`. AND would CLEAR the unmasked bits (any bit AND 0 = 0). Plain addition can carry — adding 2 to a byte where bit 1 is already set would ripple upward. OR is surgical: `x | (1 << n)` sets bit n, every time.',
    },
    {
      kind: 'code',
      prompt:
        'A motor driver’s control register uses bit 2 as MOTOR_ON. Setting it (OR) and testing it (AND) are done. Complete the CLEAR: turn bit 2 off without disturbing other bits, using AND with the inverted mask.',
      starter:
        "let reg = 0                    // all flags off\nconst MOTOR = 1 << 2           // mask for bit 2 = 0b00000100 = 4\nreg = reg | MOTOR             // SET bit 2 (turn the motor on)\nprint('after set, reg =', reg)\nprint('motor on?', (reg & MOTOR) !== 0)   // TEST bit 2\n// CLEAR bit 2: AND with the INVERTED mask (~MOTOR keeps every bit but 2)\nreg = \nprint('after clear, reg =', reg)\nprint('motor on?', (reg & MOTOR) !== 0)",
      expected: 'after set, reg = 4\nmotor on? true\nafter clear, reg = 0\nmotor on? false',
      hint: 'reg & ~MOTOR',
      success:
        '`reg & ~MOTOR` keeps every bit except bit 2, which the inverted mask forces to 0 — the motor flag clears and nothing else moves. Set with `| mask`, clear with `& ~mask`, test with `& mask`: three idioms that configure every peripheral chip you’ll ever wire to a robot.',
    },
    {
      kind: 'explain',
      title: 'The dark side: memory bugs',
      body: [
        'Pointers and manual memory give speed, but C won’t stop you from misusing them — and the bugs are brutal. A BUFFER OVERFLOW writes past the end of an array into whatever sits next in memory.',
        'A DANGLING pointer points at freed or reclaimed memory; USE-AFTER-FREE reads or writes it. A DOUBLE FREE frees the same block twice, corrupting the heap. A LEAK never frees at all.',
        'None of these necessarily crash right away — they corrupt quietly, then fail somewhere far from the cause. That’s what makes them the hardest bugs in software.',
      ],
      deeper: [
        'Buffer overflows aren’t just crashes — they’re the classic SECURITY hole. Overrun a stack buffer and you can overwrite the function’s saved RETURN ADDRESS, redirecting the CPU into attacker-supplied bytes. Decades of worms (including the Morris worm and Heartbleed’s over-read) trace back to exactly this.',
        'Because humans can’t reliably free everything correctly, the industry built guardrails: valgrind and AddressSanitizer catch overflows and use-after-free at runtime; static analyzers flag leaks; and Rust’s borrow checker makes whole classes of these bugs fail at COMPILE time. The lesson isn’t “be more careful” — it’s “use tools that make the bug impossible.”',
        'The OFF-BY-ONE is the everyday version: a loop `for (i = 0; i <= n; i++)` on an n-element array touches `arr[n]`, one past the end. The valid indices are 0..n-1; `<=` reaches n. This is the same fencepost error you met in debugging — here it corrupts memory instead of just miscounting.',
      ],
      links: [
        { nodeId: 'prog-data-3', label: 'The fencepost error again: Debugging & Testing' },
        { nodeId: 'sec-threats', label: 'When bugs become exploits: Threat Models' },
      ],
    },
    {
      kind: 'quiz',
      question: 'To SET bit n of a register without disturbing the others, you use…',
      options: [
        '`reg = reg | (1 << n)` — OR with a mask that’s 1 only at bit n',
        '`reg = reg & (1 << n)` — AND with the mask',
        '`reg = reg + n` — add the bit number',
        '`reg = ~reg` — invert everything',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: OR-ing with a single-1 mask forces bit n to 1 and leaves every 0 in the mask (all other positions) unchanged.',
        'AND with that mask CLEARS every other bit (they AND with 0) — it isolates bit n instead of setting it.',
        'Adding can carry into neighboring bits and does the wrong thing entirely if the bit is already set.',
        'Inverting flips all 8 bits, trampling every other flag — the opposite of “without disturbing the others.”',
      ],
    },
    {
      kind: 'quiz',
      question: 'A buffer overflow is dangerous mainly because…',
      options: [
        'Writing past an array’s end corrupts adjacent memory — and can overwrite a return address into an exploit',
        'It always prints an error and stops safely',
        'It only ever affects the array itself',
        'It makes the program run faster but use more memory',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: C doesn’t bounds-check, so the extra bytes land on whatever is next — a variable, or the saved return address, which is how overflows become code-execution exploits.',
        'There’s no automatic bounds check in C — that’s exactly the problem; the write just happens.',
        'The damage spreads to NEIGHBORING memory, which is what makes it corrupt unrelated state.',
        'It’s pure corruption, not an optimization — nothing about it is faster or intended.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You `free(p)` and then read `*p` later. This is…',
      options: [
        'Use-after-free — p now dangles at reclaimed memory that may hold anything',
        'Perfectly safe, since the data is still there',
        'The correct way to release memory',
        'A memory leak',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: after `free`, the block can be handed to another `malloc`, so reading through p sees stale or foreign data — a use-after-free, and a common exploit primitive.',
        'The data is NOT guaranteed to survive — freeing returns the block to the allocator, which may reuse it immediately.',
        'Freeing is correct; USING the pointer afterward is the bug. Setting `p = NULL` after free prevents it.',
        'A leak is the opposite — never freeing. Here you freed, then wrongly kept using the pointer.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does `for (int i = 0; i <= n; i++)` over an n-element array corrupt memory?',
      options: [
        'Valid indices are 0..n-1; `<=` also touches `arr[n]`, one element past the end',
        'Loops can’t use `<=` in C',
        'It skips the first element',
        'It runs forever',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the classic off-by-one. n elements occupy indices 0 through n-1, so `<=` reaches index n — outside the array — and reads/writes whatever sits after it.',
        '`<=` is legal; the bug is the boundary it chooses, not the operator.',
        'It starts at 0 and includes the first element fine — the error is at the END, not the start.',
        'It terminates normally after n+1 iterations — the harm is the one out-of-bounds access, not an infinite loop.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'To TEST whether bit 3 of `reg` is set, you evaluate…',
      options: [
        '`(reg & (1 << 3)) !== 0` — AND with the mask, then check for non-zero',
        '`reg | (1 << 3)` — OR with the mask',
        '`reg + 8` — add the bit’s value',
        '`~reg` — invert reg',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: AND with a single-1 mask keeps only bit 3; the result is non-zero exactly when that bit was 1.',
        'OR would SET the bit and tell you nothing about its previous state.',
        'Adding changes the value and can carry — it doesn’t test anything.',
        'Inverting flips all bits and still doesn’t isolate bit 3.',
      ],
    },
    {
      question: 'The shift `1 << 5` produces…',
      options: [
        'A mask with a single 1 in bit position 5 (the value 32)',
        'The number 5',
        'The number 6',
        'A left-rotation of the digits of 1',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `<<` slides the lone 1 up five places → `0b100000` = 32. Shifting left by n multiplies by 2ⁿ, and here it builds the bit-n mask.',
        '`1 << 5` isn’t 5 — the 5 is how FAR to shift, not the result.',
        '6 would be 1 + 5; shifting is not adding.',
        'It’s a bit shift, not a digit rotation — the single 1 moves to position 5.',
      ],
    },
    {
      question: 'Setting a freed pointer to NULL (`free(p); p = NULL;`) helps because…',
      options: [
        'A later accidental dereference of NULL crashes loudly instead of silently reading reclaimed memory',
        'It frees the memory a second time for safety',
        'It makes the memory reusable again',
        'It converts the pointer into a value',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: turning a dangling pointer into NULL swaps a silent, unpredictable use-after-free for an immediate, obvious crash — and it makes a double-free (free(NULL)) a harmless no-op.',
        'It does NOT free again — that’s the double-free bug it actually prevents.',
        '`free` already returned the memory; nulling the pointer is about safety, not reuse.',
        'It stores the address 0; the pointer stays a pointer, just one that points at nothing.',
      ],
    },
    {
      question: 'Why is “just be more careful” a weak defense against memory bugs, per professional practice?',
      options: [
        'Humans miss them at scale, so teams rely on tools — sanitizers, analyzers, or languages that make the bug impossible',
        'Memory bugs are actually harmless',
        'Careful programmers never write bugs',
        'C automatically prevents them anyway',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at millions of lines, vigilance fails — valgrind/AddressSanitizer catch bugs at runtime and Rust’s borrow checker rejects them at compile time. Make the bug unrepresentable, don’t just hope.',
        'They’re among the most damaging bugs there are — crashes and security exploits both.',
        'Even expert C programmers ship memory bugs; that’s exactly why the tooling exists.',
        'C provides no such protection — the absence of checks is the root of the problem.',
      ],
    },
  ],
}
