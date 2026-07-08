import type { Lesson } from '../../types'

export const osConcurrency3Lesson: Lesson = {
  nodeId: 'os-concurrency-3',
  screens: [
    {
      kind: 'explain',
      title: 'When locks turn against you',
      body: [
        'Locks fix races, but they introduce a new failure: DEADLOCK. Thread 1 holds lock A and waits for lock B; thread 2 holds lock B and waits for lock A. Neither can proceed, and neither will ever let go.',
        'It’s a cycle of waiting — a standoff where every thread is polite, blocked, and stuck forever. No crash, no error; the system just freezes.',
        'The classic trigger: two threads grab the same two locks in OPPOSITE order.',
      ],
      links: [{ nodeId: 'os-concurrency-2', label: 'Refresher: Locks, mutexes & semaphores' }],
    },
    {
      kind: 'predict',
      question:
        'Thread 1 does `lock(A); lock(B)`. Thread 2 does `lock(B); lock(A)`. Both start at the same moment. What can happen?',
      options: [
        'Deadlock — T1 holds A waiting for B while T2 holds B waiting for A, a wait cycle',
        'One thread always wins and both finish quickly',
        'The OS merges the two locks into one',
        'Nothing unusual — lock order never matters',
      ],
      correctIndex: 0,
      reveal:
        'If T1 grabs A and T2 grabs B before either takes its second lock, each now waits for a lock the other holds — a circular wait. Both sleep forever. The fix is beautifully simple: impose a GLOBAL LOCK ORDER (always acquire A before B, everywhere). With a consistent order, a cycle is impossible — whoever gets A first also gets B, and the other just waits its turn.',
    },
    {
      kind: 'code',
      prompt:
        'Lock ordering is the cheapest deadlock prevention there is. Two threads each need locks A and B. A cycle is only possible if they take the locks in different orders. Complete the second check.',
      starter:
        "// Deadlock over two locks needs a CYCLE: the threads must disagree on which\n// lock to take first. If both take the same lock first, one simply waits.\nfunction deadlockPossible(order1, order2) {\n  return order1[0] !== order2[0]\n}\nprint('T1=[A,B], T2=[B,A]:', deadlockPossible(['A','B'], ['B','A']))\n// Now check two threads that BOTH take A first, then B:\nprint('T1=[A,B], T2=[A,B]:', )",
      expected: 'T1=[A,B], T2=[B,A]: true\nT1=[A,B], T2=[A,B]: false',
      hint: "deadlockPossible(['A','B'], ['A','B'])",
      success:
        'Opposite orders → deadlock possible (true); the SAME order → impossible (false). That’s lock ordering: pick one global order for all locks and stick to it. It breaks the “circular wait” condition, one of the four ingredients every deadlock needs.',
    },
    {
      kind: 'explain',
      title: 'The four ingredients — and real-time priority',
      body: [
        'A deadlock needs all four Coffman conditions at once: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break ANY one and deadlock is impossible — lock ordering breaks the fourth.',
        'Even deadlock-free, fair scheduling isn’t enough for robots: a control loop must run every few milliseconds no matter what else is busy. That needs PRIORITIES, not round-robin fairness.',
        'And priorities have their own trap — the one that froze a Mars rover.',
      ],
      deeper: [
        'The four conditions in full: (1) MUTUAL EXCLUSION — resources can’t be shared; (2) HOLD-AND-WAIT — a thread holds one resource while requesting another; (3) NO PREEMPTION — you can’t force a lock away from its holder; (4) CIRCULAR WAIT — a closed chain of waiters. Prevention picks one to forbid: e.g. grab all locks at once (kills hold-and-wait) or order them (kills circular wait).',
        'RATE-MONOTONIC scheduling gives the highest priority to the task with the SHORTEST period — a 1 kHz motor loop outranks a 10 Hz planner. It’s provably optimal among fixed-priority schemes, which is why real-time robotics leans on it.',
        'PRIORITY INVERSION (from the scheduling lesson): a high-priority task waits on a lock held by a low-priority task, while a medium task hogs the CPU and starves the low one — so the important task waits on the unimportant. This literally hung Mars Pathfinder in 1997. The fix, PRIORITY INHERITANCE, temporarily boosts the lock-holder to the waiter’s priority so it can finish and release. Deadlock is a cycle; inversion is a priority ordering gone wrong — different bugs, both about who waits on whom.',
      ],
      links: [
        { nodeId: 'robo-control', label: 'Why deadlines are non-negotiable: PID' },
        { nodeId: 'os-processes', label: 'Priority inversion & the Mars rover' },
      ],
    },
    {
      kind: 'quiz',
      question: 'What exactly IS a deadlock?',
      options: [
        'A cycle of threads each waiting for a resource another holds, so none can ever proceed',
        'A thread stuck in an infinite loop of its own',
        'A thread that crashed and left corrupted memory',
        'The scheduler running out of time slices to hand out',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the defining feature is the circular wait — everyone is blocked on someone else in the cycle, forever. No progress, no error.',
        'That’s a busy infinite loop — one thread, no cycle. A deadlock needs mutual waiting between threads.',
        'A deadlock involves live-but-blocked threads, not crashed ones — nothing is corrupted, just frozen.',
        'Slices are never “used up”; deadlocked threads are blocked and simply not runnable.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does a global LOCK ORDERING prevent deadlock?',
      options: [
        'If every thread acquires locks in the same order, a circular wait can’t form',
        'It makes locks release themselves after a timeout',
        'It lets threads preempt each other’s locks',
        'It removes the need for locks entirely',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a cycle requires two threads to disagree on order; enforce one order and whoever gets the first lock also gets the second — no cycle possible.',
        'That’s a timeout strategy — different technique. Ordering prevents the cycle from ever forming.',
        'Ordering doesn’t preempt; it removes circular wait, one of the four Coffman conditions.',
        'You still need the locks — ordering just guarantees they can’t deadlock.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A high-priority motor task waits on a lock held by a low-priority logging task, while a medium-priority task hogs the CPU so the logger never runs. The motor task starves. This is…',
      options: [
        'Priority inversion — fixed by priority inheritance, boosting the lock-holder so it can release',
        'A deadlock — fixed by lock ordering',
        'A race condition — fixed by adding a lock',
        'Normal round-robin behavior — nothing is wrong',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the priority order effectively inverted. Inheritance temporarily raises the logger to the motor task’s priority so it finishes and frees the lock — the Mars Pathfinder fix.',
        'No cycle exists here — the logger isn’t waiting on the motor task. It’s an inversion, not a deadlock.',
        'The lock is already present and correctly excludes; the problem is scheduling priority, not a data race.',
        'The motor task missing its deadline is a real fault — fairness is exactly what a control loop can’t rely on.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Under rate-monotonic scheduling, which of two periodic tasks gets the higher priority?',
      options: [
        'The one with the shorter period — it runs most often and has the tightest deadline',
        'The one that uses the most CPU per run',
        'The one that was started first',
        'The one with the longer period, so slow tasks aren’t forgotten',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: shorter period = higher rate = tighter deadline, so it wins. A 1 kHz control loop outranks a 10 Hz planner — provably the optimal fixed-priority rule.',
        'CPU cost affects whether the set is schedulable, not the priority ordering — period does.',
        'Start order is irrelevant; rate-monotonic ranks purely by period.',
        'Backwards — the shorter period is more urgent and must preempt the slower task.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'Breaking which single Coffman condition does “acquire ALL the locks you need at once, or none” achieve?',
      options: [
        'Hold-and-wait — a thread no longer holds one lock while waiting for another',
        'Mutual exclusion — the locks become shareable',
        'Circular wait — by ordering the locks',
        'No preemption — locks can now be forced away',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: grabbing everything atomically means you never hold-and-wait — you either get the whole set or back off holding nothing.',
        'The locks are still exclusive; you just change HOW you acquire them.',
        'That’s what lock ORDERING breaks; all-or-nothing acquisition targets hold-and-wait instead.',
        'Nothing is preempted here — you voluntarily avoid holding while waiting.',
      ],
    },
    {
      question:
        'Two threads keep politely stepping aside for each other — each detects a conflict, backs off, retries, and conflicts again, making no progress. This is…',
      options: [
        'Livelock — threads are active and changing state but never advance',
        'Deadlock — threads are blocked and idle',
        'A race condition on shared data',
        'Priority inversion',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: livelock threads aren’t blocked — they’re busy reacting to each other forever. Randomized back-off delays are the usual cure.',
        'Deadlocked threads are frozen and idle; livelocked ones are busy but stuck — a key distinction.',
        'No shared data is being corrupted; the problem is endless mutual yielding.',
        'No priorities are involved; it’s a retry loop that never converges.',
      ],
    },
    {
      question:
        'Why is round-robin scheduling, fair as it is, unsafe for a robot’s inner control loop?',
      options: [
        'Fairness gives the control loop no timing guarantee — it can be delayed behind unimportant tasks and miss its deadline',
        'Round-robin uses too much memory for real-time work',
        'Round-robin can only schedule one task at a time',
        'Control loops don’t need to run on a schedule at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a control deadline is pass/fail every cycle, and equal turns can’t promise the loop runs in time — that’s why real-time systems use priorities, not fairness.',
        'Memory isn’t the issue; the missing guarantee on WHEN the task runs is.',
        'Every scheduler runs one task per core at a time — that’s not what makes RR unsafe here.',
        'A control loop must run at a fixed rate — missing its period is exactly the failure to avoid.',
      ],
    },
    {
      question:
        'You add a deadlock “detect and recover” scheme instead of preventing deadlock. What must recovery ultimately do to break the cycle?',
      options: [
        'Forcibly take a resource from (or kill/roll back) one thread in the cycle so the others can proceed',
        'Wait longer — deadlocks resolve themselves given time',
        'Lower every thread’s priority equally',
        'Add more locks so there are enough to go around',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a true cycle never self-resolves — recovery must preempt a resource or abort a victim (databases roll back one transaction) to break it.',
        'A deadlock is stable — waiting forever is exactly what the threads are already doing.',
        'Equal priorities don’t break a wait cycle; someone must give up a resource.',
        'More locks add more cycle opportunities, not fewer — the cure is breaking the existing cycle.',
      ],
    },
  ],
}
