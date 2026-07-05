import type { Lesson } from '../../types'

export const osMemoryLesson: Lesson = {
  nodeId: 'os-memory',
  screens: [
    {
      kind: 'explain',
      title: 'Every program thinks it owns the machine',
      body: [
        'A hundred processes all believe they have address 0, address 1, address 2… of one memory. They can’t ALL have address 0 — yet none of them ever collide. How?',
        'The addresses a program uses are FAKE. Every single memory access is translated, on the fly, from the program’s virtual address to a real physical location.',
        'That translation layer — virtual memory — is one of the great tricks in computing: isolation, safety and flexibility from one level of indirection.',
      ],
      links: [{ nodeId: 'os-processes', label: 'Refresher: Processes & Scheduling' }],
    },
    {
      kind: 'predict',
      question: 'Process A writes to “its” address 1000. Process B also writes to “its” address 1000. What happens?',
      options: [
        'Nothing collides — the same virtual address maps to different physical locations per process',
        'B overwrites A’s value',
        'The OS crashes with a conflict error',
        'They share the value at 1000 automatically',
      ],
      correctIndex: 0,
      reveal:
        'Each process has its own translation table, so A’s 1000 might really be physical 47000 and B’s 1000 might be 91000. Neither can even EXPRESS an address in the other’s memory — isolation isn’t a rule that’s enforced, it’s a language in which violations can’t be written. (Sharing does exist, but only when the OS deliberately maps two virtual pages to one physical page.)',
    },
    {
      kind: 'code',
      prompt: 'Translation works per PAGE: virtual address = page number × 256 + offset. The page table (a hash map!) says where each page really lives. Complete the translation.',
      starter:
        'let pageTable = { 0: 5, 1: 9, 2: 3 }   // virtual page -> physical frame\n\nlet vaddr = 2 * 256 + 34   // virtual address 546: page 2, offset 34\nlet page = Math.floor(vaddr / 256)\nlet offset = vaddr % 256\n// physical address = (physical frame for this page) * 256 + offset\nlet paddr =\n\nprint(page)\nprint(offset)\nprint(paddr)',
      expected: '2\n34\n802',
      hint: 'pageTable[page] * 256 + offset',
      success:
        'Virtual 546 = page 2 + offset 34; the table says page 2 lives in physical frame 3, so physical = 3×256+34 = 802. Real hardware does EXACTLY this (with 4096-byte pages) on every single memory access — accelerated by a tiny cache called the TLB.',
    },
    {
      kind: 'explain',
      title: 'What the indirection buys',
      body: [
        'Protection: touch a page not in your table and the hardware traps to the OS — that’s a segmentation fault. Bugs get contained to one process instead of corrupting the machine.',
        'Flexibility: pages needn’t be contiguous, or even in RAM — rarely-used pages can be parked on disk (swap) and reloaded on demand.',
        'And a growing program just gets more entries in its table — no reshuffling of physical memory. One table, three superpowers.',
      ],
      deeper: [
        'The dark side of swap: disk is ~10,000× slower than RAM. If active memory exceeds RAM, the OS evicts pages that are immediately needed back — THRASHING: the machine grinds, doing almost pure disk traffic. The fix is less memory pressure, not patience.',
        'The TLB (translation lookaside buffer) caches recent translations because doing a table walk per access would halve memory speed. TLB hit ≈ free; miss ≈ extra memory reads. This is why iterating an array in ORDER is faster than hopping randomly — same Big-O, friendlier pages.',
        'Embedded twist: many microcontrollers (your robo-embedded board) have NO virtual memory — every address is physical, one bad pointer can overwrite the motor-control variables, and there is no segfault to save you. That’s why embedded C programmers are paranoid, and why bigger robots run Linux for the protections this lesson describes.',
      ],
      links: [{ nodeId: 'robo-embedded', label: 'The no-protection world: Embedded Systems' }],
    },
    {
      kind: 'quiz',
      question: 'A virtual address is…',
      options: [
        'A program’s private, fake address — translated to a real physical location on every access',
        'The physical location of data on the RAM chips',
        'An address on the internet',
        'A backup address used if RAM fails',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: programs live entirely in their private fake address space; the page table + hardware do the live translation.',
        'That’s the PHYSICAL address — the translation’s output, which programs never see.',
        'Different world — that’s IP addressing (networks domain).',
        'No failover involved — translation happens on every access, always.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A segmentation fault is…',
      options: [
        'The hardware catching a process touching memory outside its page table, and the OS stopping it',
        'RAM physically cracking into segments',
        'A disk running out of space',
        'A syntax error in the code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the access has no valid translation → hardware trap → OS kills the process. Annoying, but it means the bug was CONTAINED.',
        'Nothing physical breaks — it’s a protection mechanism doing its job.',
        'Disk-full is a different error; segfaults are about memory permissions.',
        'Syntax errors are caught before running — a segfault is a RUNTIME memory violation.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why can two processes use “the same” address 1000 without conflict?',
      options: [
        'Each has its own page table, so the same virtual address maps to different physical frames',
        'The OS quickly copies memory back and forth between them',
        'Address 1000 is reserved for sharing',
        'Modern RAM has two slots per address',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the mapping is per-process — identical virtual numbers, disjoint physical destinations.',
        'No copying — the tables simply point at different places; the isolation is free.',
        'No addresses are magically shared; deliberate sharing needs the OS to map pages together.',
        'Physical RAM has one location per physical address — the trick is in the translation, not the chips.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot’s Linux vision process leaks memory until RAM is full and the system “thrashes”. What is happening?',
      options: [
        'Pages are constantly evicted to disk and immediately needed back — the machine does disk traffic instead of work',
        'The CPU overheats from too many calculations',
        'The page tables are full and no process can run',
        'RAM permanently loses the leaked bytes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: swap turns a memory shortage into a 10,000×-slower disk workload. On a robot the symptom is missed control deadlines — fix the leak, don’t add patience.',
        'Thermals aren’t the mechanism — the CPU is mostly WAITING on disk.',
        'Tables have room; it’s the physical RAM behind them that’s oversubscribed.',
        'A reboot reclaims everything — leaks waste RAM while running, they don’t damage it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your microcontroller (no virtual memory) has a pointer bug. Compared to Linux, the consequence is…',
      options: [
        'Worse: it can silently overwrite ANY variable — motor commands included — with no segfault to catch it',
        'Better: microcontrollers ignore bad writes',
        'Identical: all computers fault the same way',
        'Nothing: pointers don’t exist without an OS',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every address is physical and every write lands SOMEWHERE. The scariest bugs corrupt unrelated state and surface minutes later — this is why safety-critical embedded code is written so defensively.',
        'Hardware doesn’t judge — it obeys. The write happens.',
        'The fault needs translation hardware to detect it; no MMU, no protection.',
        'Pointers are just addresses — they exist wherever memory does.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Iterating a big array in order is often faster than random hopping, despite identical Big-O. Why?',
      options: [
        'Sequential access reuses the same pages/translations (TLB + cache hits); random access misses constantly',
        'Arrays are stored alphabetically',
        'The CPU predicts the FUTURE values',
        'Big-O was wrong',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same complexity, different CONSTANTS — locality keeps the fast caches warm. Big-O picks the family; memory layout tunes the constant.',
        'Arrays are stored by index — the win is spatial locality, not ordering of contents.',
        'Prefetchers do guess the next ADDRESS (easy when sequential) — values still come from memory.',
        'Big-O never promised equal constants — this is exactly the constant-factor fine print.',
      ],
    },
    {
      question: 'Why does the OS park rarely-used pages on disk (swap)?',
      options: [
        'To free scarce RAM for what’s actually active — disk is slow but vast',
        'Disk is faster than RAM',
        'To create permanent backups of programs',
        'Because pages expire after an hour',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a background app’s sleeping pages don’t deserve prime real estate. Used gently, swap extends memory; oversubscribed, it becomes thrashing.',
        'Backwards by a factor of ~10,000 — that gap is the entire trade-off.',
        'Swap is scratch space, wiped on reboot — not a backup.',
        'No timers involved — eviction is driven by memory pressure and usage patterns.',
      ],
    },
  ],
}
