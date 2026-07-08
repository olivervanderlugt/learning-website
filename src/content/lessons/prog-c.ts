import type { Lesson } from '../../types'

export const progCLesson: Lesson = {
  nodeId: 'prog-c',
  screens: [
    {
      kind: 'explain',
      title: 'Memory is just a numbered street',
      body: [
        'Picture memory as one enormous row of boxes, each holding one byte, each with a number — its ADDRESS. Address 0, 1, 2, … all the way up.',
        'Every variable you make lives in some of those boxes. `x = 42` puts 42 in a box; the box also has an address, like 1000.',
        'A POINTER is a variable whose value IS an address — a box that holds the number of another box. That one idea is the whole foundation of C.',
      ],
      links: [{ nodeId: 'prog-data', label: 'Refresher: Data in Memory' }],
    },
    {
      kind: 'predict',
      question:
        'In C: `int x = 42;` lives at address 1000. Then `int *p = &x;` (`&` means “address of”). What number does p hold?',
      options: [
        '1000 — the ADDRESS of x, not its value',
        '42 — a copy of x’s value',
        'Nothing — pointers start empty',
        'Both 42 and 1000 at once',
      ],
      correctIndex: 0,
      reveal:
        'p holds 1000 — the address WHERE x lives, not the 42 inside. To get the value you DEREFERENCE with `*p`, which means “go to the address in p and read the box there” → 42. So `&` takes an address, `*` follows one. A pointer is a signpost: it doesn’t contain the house, it contains the house’s street number.',
    },
    {
      kind: 'code',
      prompt:
        'Let’s model memory as an array of boxes and a pointer as an index into it. Three numbers live at addresses 10–12. Dereference the pointer after advancing it, to read the third value.',
      starter:
        "// memory[address] = value. A pointer is just an address (index).\nconst memory = []\nmemory[10] = 5\nmemory[11] = 8\nmemory[12] = 13\nlet ptr = 10                         // ptr points at the first number\nprint('start *ptr =', memory[ptr])   // dereference: read the box ptr points at\nptr = ptr + 2                        // pointer arithmetic: advance 2 elements\n// Dereference ptr again to read the value it now points at:\nprint('after ptr+2, *ptr =', )",
      expected: 'start *ptr = 5\nafter ptr+2, *ptr = 13',
      hint: 'memory[ptr]',
      success:
        'Dereferencing is just `memory[ptr]` — follow the address, read the box. Adding 2 to the pointer moved it two boxes along to address 12, holding 13. That’s POINTER ARITHMETIC, and it’s exactly how C walks an array: `arr[i]` is really `*(arr + i)`.',
    },
    {
      kind: 'explain',
      title: 'The stack, the heap, and the null trap',
      body: [
        'Local variables live on the STACK — created when a function starts, wiped the instant it returns. Fast and automatic, but gone when the function ends.',
        'Long-lived data you request from the HEAP (next lesson). An array is just a pointer to the first of several boxes sitting back-to-back in memory.',
        'A pointer can also hold 0 — the NULL pointer, meaning “points at nothing”. Dereferencing NULL is the classic crash.',
      ],
      deeper: [
        'Why does C hand you raw addresses when Python and JavaScript hide them? Control. Following a pointer is one machine instruction with zero safety net — no bounds check, no garbage collector pausing your control loop. That’s why every real-time and embedded system is C/C++: predictable, direct memory access, nothing happening behind your back.',
        'Arrays “decay” to pointers: `arr` on its own evaluates to the address of `arr[0]`. So `arr[i]`, `*(arr + i)`, and `*(i + arr)` are all the same thing — which is the useless-but-legal reason `3[arr]` compiles in C.',
        'Passing a big struct BY VALUE copies every byte; passing a POINTER to it copies one address. This is why C code passes pointers everywhere — and why a function can change its caller’s variable only if you hand it `&x`, the address, so it can write back through the pointer.',
      ],
      links: [{ nodeId: 'os-memory', label: 'Where addresses really point: Virtual Memory' }],
    },
    {
      kind: 'quiz',
      question: 'What does a pointer actually store?',
      options: [
        'A memory address — the location of some data, not the data itself',
        'A private copy of the data it refers to',
        'The name of a variable as text',
        'Nothing until the program crashes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a pointer is a signpost holding an address. To reach the data you dereference it — follow the address to the box.',
        'That would be a copy, the opposite of a pointer. The whole point is to refer to ONE piece of data from many places without copying.',
        'Variable names vanish at compile time; a pointer holds a numeric address, not a name.',
        'A valid pointer holds a real address from the moment you set it — only an uninitialized or NULL one is dangerous.',
      ],
    },
    {
      kind: 'quiz',
      question: 'If `p` holds the address 2000, what does dereferencing (`*p`) give you?',
      options: [
        'The value stored in the box at address 2000',
        'The number 2000 itself',
        'The address of p',
        'A new copy of p',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `*p` means “go to the address in p and read what’s there.” The `*` follows the signpost.',
        '2000 is what p holds directly — reading it needs no `*`. Dereferencing goes one hop further, to the box AT 2000.',
        'The address OF p comes from `&p`. `*p` goes the other direction — to the thing p points at.',
        'Dereferencing reads through the pointer; it doesn’t duplicate the pointer.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In C, why is `arr[i]` equivalent to `*(arr + i)`?',
      options: [
        'The array name is the address of its first element, so adding i and dereferencing lands on element i',
        'The compiler stores every array index in a hidden lookup table',
        'Arrays are secretly linked lists',
        'It isn’t — that’s a coincidence of syntax',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `arr` decays to a pointer to `arr[0]`; `arr + i` advances i elements, and `*` reads that box. Indexing IS pointer arithmetic.',
        'No table exists — the address is computed directly as base + i × element-size.',
        'An array is a contiguous block, not a chain of nodes with pointers — that’s next lesson’s linked list.',
        'It’s exactly defined this way in the language, not a coincidence — the two forms compile to the same code.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Dereferencing a NULL pointer typically…',
      options: [
        'Crashes the program — you told it to read the box at “nowhere” (address 0)',
        'Returns 0 safely every time',
        'Allocates new memory automatically',
        'Is how you free memory',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: NULL means “points at nothing.” Following it reads a forbidden address and the OS kills the process (the segfault) — thanks to the per-process page tables from virtual memory.',
        'There’s no value to return — the access itself is illegal. C won’t quietly hand you 0.',
        'Allocation is `malloc`’s job; NULL is the ABSENCE of an allocation.',
        'Freeing is `free`; dereferencing NULL is just a bug.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The `&` operator in C gives you…',
      options: [
        'The address of a variable (so you can store it in a pointer)',
        'The value a pointer points to',
        'A logical AND of two numbers',
        'A copy of the variable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `&x` is “address of x.” It’s the mirror image of `*`, which follows an address back to a value.',
        'That’s `*` (dereference). `&` goes the other way — from a variable to where it lives.',
        'Bitwise AND is `&` between two values; `&x` on a single variable is the address-of operator (context tells them apart).',
        '`&x` doesn’t copy x — it reports x’s location.',
      ],
    },
    {
      question:
        'A function needs to modify its caller’s variable `x`. In C you pass `&x` instead of `x`. Why does that work?',
      options: [
        'The function receives x’s address and writes through it, changing the original box',
        'Passing `&x` makes a faster copy of x',
        'C variables are modified by any function automatically',
        'It doesn’t — C can never change a caller’s variable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `&x` hands over the location, so `*p = 5` inside the function overwrites the real x. Plain `x` would pass a copy the function can’t reach back through.',
        'It passes an address (usually smaller than x), but speed isn’t the point — reaching the ORIGINAL is.',
        'By default C passes copies; a function can only touch the original if you give it the address.',
        'Passing the address is exactly how C does “pass by reference” — it works precisely because of the pointer.',
      ],
    },
    {
      question: 'Why do local (stack) variables become invalid after their function returns?',
      options: [
        'Their stack space is reclaimed for the next call, so their boxes may be overwritten',
        'The compiler encrypts them on return',
        'They move to the heap automatically',
        'They stay valid forever — this is a myth',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the stack frame is popped on return and reused by the next call — returning a pointer to a local gives a DANGLING pointer to a box that no longer belongs to you.',
        'Nothing is encrypted; the memory is simply handed back and later reused.',
        'They do NOT migrate to the heap — that’s exactly why long-lived data must be malloc’d there yourself.',
        'It’s real and important: a pointer to a returned-from local is a classic bug (next lesson names it).',
      ],
    },
    {
      question: 'An `int` array of 4 elements starts at address 2000 (4 bytes per int). Where is element `arr[2]`?',
      options: [
        'Address 2008 — base + 2 × 4 bytes',
        'Address 2002 — base + the index',
        'Address 2000 — all elements share the start',
        'Somewhere random on the heap',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pointer arithmetic scales by element size — 2 ints × 4 bytes = 8, so `arr[2]` is at 2000 + 8 = 2008. Contiguous boxes, evenly spaced.',
        'Adding the raw index forgets the element size — C advances by whole elements (4 bytes each), not single bytes.',
        'Elements sit back-to-back at DIFFERENT addresses; only `arr[0]` is at the base.',
        'A stack or global array is contiguous and predictable, not random — that’s what makes indexing O(1).',
      ],
    },
  ],
}
