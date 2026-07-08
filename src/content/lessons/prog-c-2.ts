import type { Lesson } from '../../types'

export const progC2Lesson: Lesson = {
  nodeId: 'prog-c-2',
  screens: [
    {
      kind: 'explain',
      title: 'Asking the heap for memory',
      body: [
        'The stack is automatic but temporary. When you need memory that OUTLIVES the function that made it, you ask the HEAP: `malloc(n)` reserves n bytes and returns a pointer to them.',
        'That memory is yours until you hand it back with `free`. Forget to free and it leaks; free twice and you corrupt the heap.',
        'A STRUCT bundles related fields into one unit — `struct Node { int value; struct Node *next; };` — and a pointer to a struct is how you build things that grow.',
      ],
      links: [{ nodeId: 'prog-c', label: 'Refresher: Pointers & the Memory Model' }],
    },
    {
      kind: 'predict',
      question:
        'A function calls `malloc`, fills the memory, and returns the pointer. The caller uses it long after the function ended. Is that pointer still valid?',
      options: [
        'Yes — heap memory lives until you `free` it, independent of any function',
        'No — all memory dies when the function returns',
        'Only if the caller is in the same file',
        'Only for exactly one more line of code',
      ],
      correctIndex: 0,
      reveal:
        'Yes — that’s the whole point of the heap. Unlike a stack variable (which vanishes on return), malloc’d memory persists until YOU free it, so returning its pointer is safe and normal. Returning the address of a LOCAL variable would be the bug — that box is reclaimed on return. Heap = you own the lifetime; stack = the compiler owns it.',
    },
    {
      kind: 'code',
      prompt:
        'A linked list is nodes scattered in memory, each holding a value and the ADDRESS of the next (or -1 for the end = NULL). We’ve modeled the heap as an address→node map. Complete the traversal by following each node’s `next` pointer.',
      starter:
        "// heap[address] = { value, next }.  next = address of the next node, -1 = end.\nconst heap = {\n  3: { value: 10, next: 7 },\n  7: { value: 20, next: 1 },\n  1: { value: 30, next: -1 },\n}\nlet addr = 3            // 'head' pointer: address of the first node\nwhile (addr !== -1) {   // -1 is our NULL: stop at the end\n  print(heap[addr].value)\n  // advance to the next node by following its 'next' pointer:\n\n}",
      expected: '10\n20\n30',
      hint: 'addr = heap[addr].next',
      success:
        'You walked the chain by pointer-chasing: read a node, jump to `heap[addr].next`, repeat until NULL (-1). The nodes need not be next to each other in memory — the pointers stitch them into order. (Drop the advance line and `addr` never changes: an infinite loop, just like a recursion with no base case.)',
    },
    {
      kind: 'explain',
      title: 'Why chain nodes instead of using an array?',
      body: [
        'A linked list inserts in O(1) — just rewire two pointers — while an array must shift everything to make a gap. But an array gives instant `arr[i]`; a list must walk from the head every time.',
        'The price of the heap is bookkeeping: every `malloc` needs a matching `free`. A lost pointer to malloc’d memory is a LEAK — the memory is reserved forever but unreachable.',
        'Ownership — “who is responsible for freeing this?” — is the question that dominates real C and C++ code.',
      ],
      deeper: [
        'Pointer-chasing has a hidden cost the array doesn’t: each node can sit anywhere in memory, so following `next` often misses the CPU cache and stalls waiting on RAM. An array’s contiguous layout streams through cache. This is why, despite the O(1) insert, engineers frequently prefer arrays (or array-backed structures) in performance-critical robot code.',
        'A DOUBLY-linked list adds a `prev` pointer so you can walk backward and delete a node you already hold without re-finding its predecessor — at the cost of a second pointer to keep consistent on every edit.',
        'Manual `free` is so error-prone that C++ invented RAII (destructors free automatically when a scope ends) and smart pointers (`unique_ptr`, `shared_ptr`) that free when the last owner disappears — the same “release on scope exit” idea you’ll meet with locks. Rust bakes ownership into the compiler so a leak or double-free won’t build.',
      ],
      links: [{ nodeId: 'algo-structures', label: 'Lists vs arrays, formally: Data Structures' }],
    },
    {
      kind: 'quiz',
      question: 'What is the essential difference between stack and heap memory?',
      options: [
        'The stack is freed automatically when a function returns; the heap you allocate and free yourself',
        'The stack is on disk and the heap is in RAM',
        'The heap is faster because it skips address translation',
        'They are two names for the same region',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: stack lifetime is automatic and scope-bound; heap lifetime is manual (`malloc`/`free`), which is what lets heap data outlive the function that made it.',
        'Both live in RAM — the difference is who manages the lifetime, not the storage medium.',
        'The heap is generally SLOWER to allocate (it must find a free block); both go through the same virtual-memory translation.',
        'They’re distinct regions with opposite lifetime rules — mixing them up causes dangling-pointer bugs.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You `malloc` a buffer, then lose the only pointer to it (overwrite it, or return without freeing). What happened?',
      options: [
        'A memory leak — the block stays reserved but is now unreachable and can never be freed',
        'The block is freed automatically since nothing points to it',
        'The program crashes immediately',
        'Nothing — C tracks all allocations and cleans up',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: without garbage collection, unreachable ≠ freed. The address is gone, so you can never call `free` on it — the memory is lost until the process exits.',
        'That’s garbage collection, which C does NOT have — losing the pointer strands the memory.',
        'A single leak rarely crashes at once; leaks accumulate and slowly starve a long-running robot of memory.',
        'C tracks nothing for you — every `malloc` is your responsibility to `free`.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Inserting a new node at the FRONT of a linked list is O(1), but at the front of an array is O(n). Why?',
      options: [
        'The list just rewires two pointers; the array must shift every existing element up one slot',
        'Arrays cannot be inserted into at all',
        'Linked lists store their length and arrays don’t',
        'The list secretly copies itself each time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a front-insert on a list is “new node points to old head, head points to new node” — constant work. An array must move all n elements to open slot 0.',
        'Arrays can be inserted into — it just costs the shifting, which is the whole point.',
        'Storing length is unrelated to insertion cost; the cost is the shifting versus the rewiring.',
        'Nothing is copied — the list only touches a couple of pointers.',
      ],
    },
    {
      kind: 'quiz',
      question: 'To find the 500th element, a linked list is much slower than an array because…',
      options: [
        'The list must walk 500 “next” pointers from the head; the array computes the address directly',
        'The list has to be sorted first',
        'Arrays cache the answer and lists don’t',
        'There is no speed difference',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: no random access on a list — reaching index i is O(i) of pointer-chasing. The array’s `base + i × size` is a single O(1) calculation.',
        'Sorting is unrelated; even an unsorted array indexes in O(1).',
        'Neither caches indices; the array is fast because the location is computable, not stored.',
        'The difference is exactly the O(n) walk versus O(1) address arithmetic — it’s the core list-vs-array trade-off.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Every `malloc` should be paired with exactly one…',
      options: [
        '`free`, to return the block to the heap when you’re done',
        'second `malloc`, to reserve a backup',
        '`print`, to log the address',
        'dereference, or the memory won’t work',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one owner, one free. Zero frees leaks; two frees corrupt the heap (double-free) — exactly one is the rule.',
        'A backup allocation just doubles the leak; it doesn’t pair anything.',
        'Logging is optional and unrelated to the allocate/free contract.',
        'You can allocate memory and legitimately never dereference it (e.g. a resized buffer); the required pair is `free`.',
      ],
    },
    {
      question: 'Returning the address of a LOCAL variable from a C function gives the caller…',
      options: [
        'A dangling pointer — it points at stack space that’s already been reclaimed',
        'A safe, permanent pointer',
        'A copy of the local’s value',
        'A pointer that automatically moves to the heap',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the local’s stack frame is gone on return, so the pointer aims at memory the next call will reuse — reading or writing it is undefined behavior.',
        'It’s the opposite of safe — the target no longer belongs to you. Use `malloc` for memory that must outlive the function.',
        'A pointer isn’t a value copy; it’s an address, and here the address is stale.',
        'Locals never migrate to the heap — that’s exactly why long-lived data must be malloc’d deliberately.',
      ],
    },
    {
      question: 'A `struct` in C is best described as…',
      options: [
        'A bundle of named fields stored together as one compound value',
        'A function that returns multiple values',
        'A special kind of loop',
        'Another word for an array',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a struct groups related fields (like `value` and `next`) into a single unit you can point at and pass around — the building block of every record and node.',
        'Structs hold data, not behavior; a function is separate (though it can take/return a struct).',
        'No control flow involved — a struct is pure data layout.',
        'An array is many elements of the SAME type; a struct is named fields that can each be a DIFFERENT type.',
      ],
    },
    {
      question: 'Why do performance-critical robot loops often prefer arrays even when a linked list has cheaper inserts?',
      options: [
        'Contiguous arrays stream through the CPU cache, while pointer-chasing a scattered list stalls on RAM',
        'Linked lists can’t hold numbers',
        'Arrays never need memory allocation',
        'Compilers forbid linked lists in loops',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: cache locality often beats big-O on real hardware — each `next` hop can be a cache miss, whereas an array’s neighbors are already loaded.',
        'Lists hold any type; the issue is memory LAYOUT, not what they store.',
        'Arrays can absolutely be heap-allocated (`malloc`); the win is layout, not avoiding allocation.',
        'Nothing forbids lists — it’s a performance choice about cache behavior.',
      ],
    },
  ],
}
