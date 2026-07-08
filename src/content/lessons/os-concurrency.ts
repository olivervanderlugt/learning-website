import type { Lesson } from '../../types'

export const osConcurrencyLesson: Lesson = {
  nodeId: 'os-concurrency',
  screens: [
    {
      kind: 'explain',
      title: 'Two hands on the same variable',
      body: [
        'A process can split into several THREADS — separate flows of execution that share the same memory. Your robot runs sensing, planning and motor control as threads so they progress together on one program’s data.',
        'Sharing memory is fast and convenient — no copying, everyone sees the latest value. It is also where the hardest bugs in computing live.',
        'The danger: the scheduler can freeze a thread mid-operation (that’s the context switch from the last lesson) and let another thread touch the very same variable.',
      ],
      links: [{ nodeId: 'os-processes', label: 'Refresher: Processes & the context switch' }],
    },
    {
      kind: 'predict',
      question:
        'Two threads share a counter starting at 0. Each runs `count = count + 1` exactly 1000 times. With no coordination, what is the final value?',
      options: [
        'Somewhere below 2000 — some increments are silently lost',
        'Exactly 2000 — each thread adds its full 1000',
        'Exactly 1000 — the second thread overwrites the first',
        'More than 2000 — the threads double-count',
      ],
      correctIndex: 0,
      reveal:
        '`count = count + 1` is not one action — the CPU LOADS count into a register, ADDS one, then STORES it back. If thread B loads the old value before thread A stores its new one, B overwrites A’s work and one increment vanishes. The result is at most 2000 and usually less — the exact number changes every run because it depends on timing. This is a RACE CONDITION: correctness that depends on who wins the clock.',
    },
    {
      kind: 'code',
      prompt:
        'Let’s make the race concrete. A shared balance is 100. Thread 1 deposits 50, thread 2 deposits 30 — correct total 180. But they interleave: BOTH read 100 before either writes. Thread 1 already wrote its result; finish thread 2’s write, which clobbers it.',
      starter:
        "// balance = 100. Each deposit is LOAD -> ADD -> STORE, and the two overlap:\n// T1 load, T2 load, T1 add, T2 add, T1 store, T2 store\nlet balance = 100\nlet r1, r2\nr1 = balance      // T1 reads 100\nr2 = balance      // T2 also reads 100 (T1 hasn't written yet!)\nr1 = r1 + 50      // T1 computes 150\nr2 = r2 + 30      // T2 computes 130\nbalance = r1      // T1 writes 150\n// T2 store: write r2 back into balance, on top of T1's deposit\n\nprint('final balance =', balance)\nprint('should be 180 — lost:', 180 - balance)",
      expected: 'final balance = 130\nshould be 180 — lost: 50',
      hint: 'balance = r2',
      success:
        'Correct total was 180, but the balance is 130 — thread 1’s entire $50 deposit vanished. Both threads read 100, so thread 2’s write (130) overwrote thread 1’s (150) as if it never happened. The buggy stretch — from LOAD to STORE — is called the CRITICAL SECTION.',
    },
    {
      kind: 'explain',
      title: 'The critical section must be protected',
      body: [
        'The bug isn’t the arithmetic — it’s that a switch can land BETWEEN the load and the store. Any span where a thread touches shared state and must not be interrupted is a critical section.',
        'The cure is MUTUAL EXCLUSION: guarantee that only one thread is inside the critical section at a time, so its load-add-store runs as an indivisible unit.',
        'How you enforce that — locks, atomic instructions, condition variables — is the whole next lesson.',
      ],
      deeper: [
        'Why can’t the hardware just make `count++` atomic? On most CPUs it genuinely compiles to three instructions, and a timer interrupt can fire between any two of them. Special ATOMIC instructions (like compare-and-swap) do exist and are how locks are built — but ordinary reads and writes are fair game for interleaving.',
        'Races don’t need multiple cores. Even on a single core, preemptive scheduling (last lesson) freezes a thread anywhere, so the same lost-update bug appears — it’s just harder to reproduce, which makes it worse. A race that fires once a week in the field is a debugging nightmare.',
        'This is why ROS 2 warns you loudly about callbacks that share data: two subscription callbacks writing the same variable are exactly the two threads above, and your robot’s state can quietly corrupt.',
      ],
      links: [{ nodeId: 'robo-control', label: 'Shared state in a control loop: PID' }],
    },
    {
      kind: 'quiz',
      question: 'What makes a RACE CONDITION so dangerous compared to an ordinary bug?',
      options: [
        'It appears only under certain timings, so it can pass every test and still fail in the field',
        'It always crashes the program immediately',
        'It corrupts the program’s source code on disk',
        'It only happens on computers with many CPU cores',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the outcome depends on the scheduler’s exact interleaving, which changes run to run — a race can hide for months, then strike once under load.',
        'The opposite — races usually produce silently wrong results, not clean crashes. A crash you could at least catch.',
        'Source code on disk is untouched; the damage is to values in memory at runtime.',
        'Preemption creates races on a single core too — the thread is just frozen mid-operation instead of truly parallel.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is `count = count + 1` vulnerable when two threads run it on a shared count?',
      options: [
        'It is really three steps — load, add, store — and a switch can strike between them',
        'Addition is too slow for the CPU to finish in one turn',
        'The `+` operator is not defined for shared variables',
        'Threads cannot read the same memory address at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the non-atomic read-modify-write is the whole problem. Interleave two of them and one store clobbers the other.',
        'Speed isn’t the issue — even an instant operation made of separate load/store steps can be split by a switch.',
        '`+` works fine; the trouble is the invisible load and store around it, not the arithmetic.',
        'Shared reads are exactly what threads DO — that sharing is the point, and the hazard.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A “critical section” is…',
      options: [
        'A stretch of code touching shared state that must run without interruption from other threads',
        'The most important function in the whole program',
        'The part of the OS that handles crashes',
        'A section of memory reserved for the operating system',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s defined by the shared data it touches, not by importance — the load-to-store window in the counter is a critical section.',
        '“Critical” here means timing-sensitive, not high-priority — a two-line increment can be a critical section.',
        'Crash handling is unrelated; the term is about mutual exclusion over shared data.',
        'It’s about code that must not overlap in time, not a fixed region of RAM.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Threads within one process share memory, but each has its own program counter and stack. Why give threads a private stack?',
      options: [
        'Each thread runs its own functions, so it needs its own call frames and local variables',
        'Stacks are read-only and cannot be shared',
        'To keep the threads from ever communicating',
        'Because the heap is always full',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: locals and return addresses are per-thread — that’s why one thread’s function calls don’t stomp another’s. Shared HEAP + private STACK is the thread model.',
        'Stacks are read-write; the reason for separateness is per-thread call state, not permissions.',
        'Threads share the heap precisely SO they can communicate — the private stack just keeps their call chains apart.',
        'Heap fullness is irrelevant; every thread needs its own stack even in an empty program.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A thread and a process differ mainly in that…',
      options: [
        'Threads of one process share its memory; separate processes each get their own isolated address space',
        'Threads run faster because they use a different CPU',
        'Processes share memory while threads never do',
        'There is no real difference — the words are interchangeable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: shared memory is the defining feature of threads — cheap communication, but the source of races. Processes trade that for isolation (the last lesson’s crash containment).',
        'Both run on the same CPUs under the same scheduler; the difference is memory sharing, not speed.',
        'Backwards — threads share, processes are isolated.',
        'They differ exactly on memory sharing and isolation, which is why you’d pick one over the other.',
      ],
    },
    {
      question:
        'Two threads each add 1 to a shared balance of 100, with no coordination. Which final value is IMPOSSIBLE?',
      options: ['103', '102', '101', 'All are possible depending on timing'],
      correctIndex: 0,
      explanations: [
        'Correct: two increments can only produce 101 (one lost) or 102 (both counted) — you can never gain more than you added, so 103 is impossible.',
        '102 happens when the two increments don’t overlap — the normal, hoped-for result.',
        '101 happens when the increments interleave and one is lost — the race showing itself.',
        'A race loses updates, it never invents them; 103 exceeds the two real increments.',
      ],
    },
    {
      question:
        'You “fix” a race by adding print statements to debug it, and now it never reproduces. What most likely happened?',
      options: [
        'The prints changed the timing, hiding the interleaving — a classic “heisenbug”',
        'Printing permanently repaired the shared memory',
        'The race was never real',
        'The compiler removed the buggy code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: I/O is slow, so it perturbs scheduling and makes the bad interleaving rarer — the bug is still there, just hiding. Timing-dependent bugs shift when you observe them.',
        'Prints don’t protect shared state; the critical section is still unguarded.',
        'It reproduced before you added prints — the race is real, merely timing-sensitive.',
        'The code still runs; the interleaving just became less likely, not impossible.',
      ],
    },
    {
      question:
        'Which situation is genuinely safe WITHOUT any locking?',
      options: [
        'Many threads only READ a value that never changes after startup',
        'Many threads increment a shared counter',
        'One thread writes a variable while others read it concurrently',
        'Two threads swap the values of two shared variables',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read-only shared data has no critical section — with no writes, there’s nothing to interleave. Immutability is the cheapest concurrency strategy there is.',
        'Concurrent increments are the canonical race — read-modify-write on shared state.',
        'A write racing with reads can hand a reader a half-updated value — that needs synchronization.',
        'A swap is multiple reads and writes on shared state — prime race territory.',
      ],
    },
  ],
}
