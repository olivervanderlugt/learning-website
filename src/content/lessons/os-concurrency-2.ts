import type { Lesson } from '../../types'

export const osConcurrency2Lesson: Lesson = {
  nodeId: 'os-concurrency-2',
  screens: [
    {
      kind: 'explain',
      title: 'One key, one thread',
      body: [
        'A LOCK (or mutex, for “mutual exclusion”) is a promise: acquire it before the critical section, release it after, and the rules guarantee only one thread holds it at a time.',
        'A second thread that tries to acquire a held lock BLOCKS — it’s put to sleep by the scheduler until the holder releases. Now the load-add-store from last lesson runs as one indivisible unit.',
        'The lock doesn’t make the code faster — it makes it CORRECT, by turning an overlap into a queue.',
      ],
      links: [{ nodeId: 'os-concurrency', label: 'Refresher: Threads & race conditions' }],
    },
    {
      kind: 'predict',
      question:
        'A thread acquires a lock, enters its critical section, and then crashes (or forgets to release). What happens to every other thread that needs that lock?',
      options: [
        'They block forever — the lock is never released, so the whole system stalls',
        'The lock releases itself automatically after the crash',
        'Nothing — they just skip the critical section',
        'They forcibly take the lock away from the dead thread',
      ],
      correctIndex: 0,
      reveal:
        'A plain lock has no owner-recovery: a lock you take is a promise you MUST keep. Forget to release — on a crash, an early `return`, or a thrown exception — and every waiter sleeps forever. This is why real code releases in a `finally` block (or uses RAII / a `with` statement / a scope guard) so the release runs no matter how the critical section exits.',
    },
    {
      kind: 'code',
      prompt:
        'Locks give all-or-nothing access. A counting SEMAPHORE generalizes that to N permits — perfect for a pool of shared resources. Here two database connections are shared; complete `release` so a freed permit returns to the pool.',
      starter:
        "// permits = how many threads may hold a resource at once.\n// acquire: take a permit if any remain, else block. release: give one back.\nlet permits = 2\nconst log = []\nfunction acquire(who) {\n  if (permits > 0) { permits = permits - 1; log.push(who + ' granted') }\n  else log.push(who + ' blocked')\n}\nfunction release() {\n  // return one permit to the pool\n\n}\nacquire('A'); acquire('B'); acquire('C')  // pool of 2 -> C finds it empty\nrelease()                                  // a connection is freed\nacquire('C')                               // now C fits\nprint(log.join('\\n'))",
      expected: 'A granted\nB granted\nC blocked\nC granted',
      hint: 'permits = permits + 1',
      success:
        'A and B took the two permits; C was blocked until a release refilled the pool, then C got in. A mutex is just a semaphore with ONE permit. Semaphores are how you cap concurrency — “at most 2 connections”, “at most 4 in-flight requests” — without a race in the counting itself.',
    },
    {
      kind: 'explain',
      title: 'Sleep instead of spin — the condition variable',
      body: [
        'Sometimes a thread must wait for a CONDITION, not just a lock: a consumer waiting for the buffer to be non-empty. Checking it in a tight loop (busy-waiting / spinning) burns a whole CPU asking “ready yet?” a million times a second.',
        'A CONDITION VARIABLE lets the thread sleep: `wait` releases the lock and parks the thread; another thread’s `signal` wakes it when the condition may now hold. This is the producer–consumer pattern — the backbone of every sensor queue.',
        'Locks and semaphores prevent races; condition variables let threads wait efficiently for each other.',
      ],
      deeper: [
        'A lock’s cost is CONTENTION: while one thread holds it, all others queue, so the critical section becomes serial. Make the lock too COARSE (one giant lock over everything) and you’ve thrown away parallelism; too FINE (a lock per field) and you invite deadlock — the next lesson. Lock granularity is the central design tension in concurrent code.',
        'A SPINLOCK does busy-wait on purpose — when the critical section is a handful of instructions, spinning for a few nanoseconds is cheaper than the overhead of sleeping and waking. Kernels use spinlocks for tiny critical sections and blocking locks for long ones. The right choice depends on how long you expect to wait.',
        'Condition variables have a famous trap: always re-check the condition in a WHILE loop after waking, never an `if`. Spurious wakeups and multiple waiters mean “I was signaled” doesn’t guarantee “the condition still holds” — check again.',
      ],
      links: [{ nodeId: 'db-transactions', label: 'Locks in databases: ACID & the lost update' }],
    },
    {
      kind: 'quiz',
      question: 'What is the core guarantee a mutex provides?',
      options: [
        'At most one thread is inside the critical section at any instant',
        'The critical section runs faster than without the lock',
        'Threads never have to wait for each other',
        'Shared memory is copied so no thread sees another’s writes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: mutual exclusion — one holder at a time — is the whole job. That turns an interruptible load-add-store into an indivisible one.',
        'Locks add overhead and serialize; they buy correctness, not speed.',
        'The opposite — waiting is exactly how the guarantee is enforced; blocked threads sleep until release.',
        'A mutex doesn’t copy memory; threads still share it — the lock just controls WHEN each may touch it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why release a lock in a `finally` block (or via RAII / a scope guard) rather than at the end of the function?',
      options: [
        'So the release still runs if the critical section exits early via a return or exception',
        'Because `finally` blocks run faster than normal code',
        'To acquire the lock a second time for safety',
        'Because locks can only be released from finally blocks',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an unreleased lock strands every waiter forever, and early returns/exceptions are easy to forget — `finally` guarantees the release on every exit path.',
        'Speed is irrelevant; the point is a guaranteed release path.',
        'Re-acquiring would make it worse — you release exactly once, on every exit.',
        'You CAN release elsewhere, but then a missed path leaks the lock — `finally` just makes the guarantee automatic.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When is a busy-wait (spinning) loop the WRONG way to wait?',
      options: [
        'When the wait may be long — the thread burns a full CPU checking a condition that rarely changes',
        'Whenever more than one thread exists',
        'Only on single-core machines',
        'Never — spinning is always the most efficient choice',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a long spin wastes an entire core (and battery) on a question whose answer stays “no” — that’s exactly what a condition variable’s sleep-until-signaled avoids.',
        'Spinning is fine for many threads if each spin is nanoseconds long; duration, not thread count, decides.',
        'It’s wasteful on any machine when the wait is long; core count isn’t the deciding factor.',
        'For long waits it’s the worst choice — you’d rather sleep and be woken than poll a million times.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A counting semaphore initialized to 3 lets…',
      options: [
        'Up to 3 threads hold the resource at once; the 4th blocks until one releases',
        'Exactly 3 threads run in the whole program',
        'A thread acquire the lock 3 times before blocking itself',
        'The resource be used 3 times total, then never again',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the permit count IS the concurrency cap — great for “at most 3 connections”. A mutex is the special case of one permit.',
        'It caps concurrent HOLDERS of one resource, not the number of threads that exist.',
        'Permits are shared across threads, not stacked by one thread; a 4th acquirer blocks regardless of who holds them.',
        'Releases refill the pool, so it’s reusable forever — it caps simultaneity, not a lifetime total.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'In the producer–consumer pattern, the consumer calls `wait` on a condition variable when the buffer is empty. What does `wait` do that a busy-loop does not?',
      options: [
        'It releases the lock and sleeps the thread until a producer signals, freeing the CPU',
        'It keeps the lock held so no producer can ever add an item',
        'It permanently blocks the consumer',
        'It copies the buffer so the consumer always has data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `wait` atomically releases the lock and parks the thread — the producer can now take the lock, add an item, and signal. No CPU is burned waiting.',
        'If `wait` kept the lock, the producer could never add anything — releasing the lock is precisely why it works.',
        'It blocks only until signaled; a producer’s signal wakes it.',
        'No copy happens; the consumer waits for the real shared buffer to gain an item.',
      ],
    },
    {
      question:
        'You wrap your robot’s entire main loop in one giant lock “to be safe.” The robot becomes sluggish. Why?',
      options: [
        'Too-coarse locking serializes everything — threads that never touch shared data still queue behind the lock',
        'Locks physically slow down the CPU clock',
        'A single lock uses too much memory',
        'Locks always make programs slower regardless of scope',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one lock over everything means only one thread runs at a time — you’ve serialized code that had no conflict. Locks should guard the smallest shared region that’s correct.',
        'The clock is unchanged; the slowdown is lost parallelism, not slower instructions.',
        'A lock is a few bytes; the cost here is contention, not memory.',
        'Well-scoped fine-grained locks preserve most parallelism — scope is exactly what you tune.',
      ],
    },
    {
      question:
        'Why must you re-check a condition variable’s predicate in a `while` loop after `wait` returns, not an `if`?',
      options: [
        'A wakeup doesn’t prove the condition still holds — another thread may have consumed it, or the wakeup was spurious',
        'Because `while` loops are required syntax for condition variables',
        'To wait a second time and slow the program down deliberately',
        'Because `if` cannot appear after a `wait` call',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: between the signal and your thread actually running, another waiter may grab the item — re-checking in a loop is the only safe pattern.',
        'It’s a correctness convention, not a syntax rule.',
        'Re-checking guards correctness, not a deliberate slowdown.',
        '`if` is legal syntax — it’s just a bug here, because the condition can be stale on wakeup.',
      ],
    },
    {
      question:
        'A spinlock (busy-waiting on purpose) is the reasonable choice when…',
      options: [
        'The critical section is a few instructions, so the expected wait is shorter than the cost of sleeping and waking',
        'The critical section does slow disk or network I/O',
        'You expect threads to wait for many milliseconds',
        'You never want the thread to hold a lock',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for ultra-short critical sections, spinning a few nanoseconds beats the overhead of parking and reviving the thread — kernels do exactly this.',
        'For long I/O waits, spinning wastes the whole core — a blocking lock that sleeps is right there.',
        'Milliseconds of spinning wastes millions of cycles; sleep instead.',
        'A spinlock still holds a lock — it just waits by spinning rather than sleeping.',
      ],
    },
  ],
}
