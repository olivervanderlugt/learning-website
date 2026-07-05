import type { Lesson } from '../../types'

export const osProcessesLesson: Lesson = {
  nodeId: 'os-processes',
  screens: [
    {
      kind: 'explain',
      title: 'The illusion of “at the same time”',
      body: [
        'Your laptop “runs” a browser, music and forty background tasks. But you know from the CPU lesson: one core executes ONE instruction at a time.',
        'The trick is speed: the operating system lets a program run for a few milliseconds, freezes it mid-thought, runs another, and rotates. Thousands of switches per second look like simultaneity.',
        'The OS is the traffic controller doing this — plus handing out memory and guarding the hardware. Every computer you own runs one.',
      ],
      links: [{ nodeId: 'cpu', label: 'Refresher: The Heartbeat of the CPU' }],
    },
    {
      kind: 'predict',
      question: 'The OS freezes a program mid-calculation and later resumes it EXACTLY where it left off. What must it save to pull that off?',
      options: [
        'The CPU’s working state — program counter, registers — so it can be restored bit-for-bit',
        'Nothing; programs restart from the top each turn',
        'Only the program’s files on disk',
        'A video recording of the screen',
      ],
      correctIndex: 0,
      reveal:
        'This is the CONTEXT SWITCH: the OS photographs the CPU’s registers — including the program counter, literally “which instruction is next” from your CPU lesson — stores the snapshot, and loads another program’s snapshot. Restore the photo later and the program can’t even tell it was frozen. That snapshot-of-a-running-program is what a PROCESS is.',
    },
    {
      kind: 'code',
      prompt: 'Round-robin scheduling is a queue (from your data structures lesson!). Each task runs 1 time-slice; unfinished tasks go to the BACK. Complete the requeue line.',
      starter:
        "let tasks = [['sense', 2], ['plan', 1], ['drive', 2]]\nwhile (tasks.length > 0) {\n  let t = tasks.shift()   // take the front task\n  print(t[0])             // run it for one slice\n  t[1] = t[1] - 1\n  if (t[1] > 0) {\n    // unfinished: send it to the back of the queue\n\n  }\n}",
      expected: 'sense\nplan\ndrive\nsense\ndrive',
      hint: 'tasks.push(t)',
      success:
        'sense, plan, drive each got a fair slice; the unfinished ones (sense, drive) cycled back for a second turn. That FIFO fairness is round-robin — and it’s why your robot’s sense/plan/drive loops all feel simultaneous on one small CPU.',
    },
    {
      kind: 'explain',
      title: 'Priorities and the price of switching',
      body: [
        'Round-robin is fair, but fairness isn’t always right: the motor-control task missing its turn crashes the robot; the log uploader can wait all day. Real schedulers add PRIORITIES.',
        'Context switches also aren’t free — saving/restoring state costs microseconds, thousands of times per second. Too many tasks and the CPU spends its life switching instead of working.',
        'Robotics pushes this to the extreme: a REAL-TIME OS guarantees the control task runs every N ms, no excuses.',
      ],
      deeper: [
        'The famous failure mode is PRIORITY INVERSION: a low-priority task holds a resource the high-priority task needs, while a medium task hogs the CPU — the important task starves behind the unimportant one. This literally froze the Mars Pathfinder rover in 1997; the fix (priority inheritance) was patched from Earth.',
        'Preemptive vs cooperative: modern OSes PREEMPT (forcibly pause) tasks via a hardware timer — a misbehaving program can’t hold the CPU hostage. Old systems (Windows 3.1, classic Mac OS) waited for programs to yield voluntarily; one infinite loop froze everything.',
        'A “real-time” OS isn’t fast — it’s PREDICTABLE. It would rather answer in exactly 2 ms every time than usually-0.1-ms-occasionally-50. For a PID loop (your control lesson), jitter is poison; determinism is the product.',
      ],
      links: [{ nodeId: 'robo-control', label: 'Why deadlines matter: Control Loops & PID' }],
    },
    {
      kind: 'quiz',
      question: 'How does one CPU core appear to run many programs at once?',
      options: [
        'The OS rapidly alternates between programs, saving and restoring each one’s CPU state',
        'The core secretly contains one mini-core per program',
        'Programs take turns on a daily schedule',
        'It genuinely executes them all in the same instant',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: milliseconds-long turns plus context switches — thousands per second — create the illusion of parallelism.',
        'Multi-core CPUs do exist, but the illusion works on ONE core — and you run far more processes than cores either way.',
        'The turns are milliseconds, not hours — speed is what makes it invisible.',
        'One core, one instruction at a time — that constraint from the CPU lesson is exactly why scheduling must exist.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A context switch requires saving the program counter and registers because…',
      options: [
        'They ARE the program’s running state — without them it cannot resume where it stopped',
        'They contain the program’s source code',
        'The law requires backups',
        'It makes programs run faster',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “which instruction is next” + working values = the complete snapshot of a computation in flight.',
        'Source code sits in files/memory unchanged — the REGISTERS hold the moment-to-moment progress.',
        'It’s an engineering necessity, not a regulation.',
        'Switching is pure overhead — necessary, but a cost to minimize, never a speedup.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot’s motor-control task and its log-upload task compete for CPU. What does a good scheduler do?',
      options: [
        'Give motor control higher priority — it has a hard deadline; the log can wait',
        'Strict fairness: perfectly equal turns for both',
        'Run whichever task was started first until it finishes',
        'Alphabetical order',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: missing a control deadline means physical failure; a late log means nothing. Priority = consequence of lateness.',
        'Round-robin fairness is the BASELINE — safety-critical deadlines are exactly when you must break it.',
        'Run-to-completion would let a long upload block motor control for seconds — the robot crashes politely in FIFO order.',
        'If only. Schedulers rank by deadline and importance, not names.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A real-time OS promises…',
      options: [
        'Predictable timing — the critical task WILL run within its deadline, every time',
        'The fastest possible average speed',
        'That programs never crash',
        'Extra CPU cores on demand',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: determinism over throughput. Worst-case guarantees are the product — the same worst-case thinking as your Big-O lesson.',
        'An RTOS often has LOWER average speed — it sacrifices throughput for bounded worst cases.',
        'Crashes are still possible — the guarantee is about WHEN code runs, not whether it’s correct.',
        'Hardware is fixed; the RTOS just never lets the important task wait too long for it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is preemptive scheduling (forcible pausing via a hardware timer) the modern standard?',
      options: [
        'One buggy program in an infinite loop can no longer freeze the whole machine',
        'It eliminates the cost of context switches',
        'It lets programs run without any memory',
        'It was easier to build than the alternative',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the timer interrupt yanks the CPU back no matter what the program does — the OS stays in charge. Cooperative systems died of exactly this bug.',
        'Switch costs remain — preemption changes WHO decides when, not the price.',
        'Memory management is a separate OS job (next lesson).',
        'It’s harder — programs can now be interrupted anywhere, which the OS must handle safely. Worth it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Mars Pathfinder (1997) kept rebooting because a LOW-priority task held a resource the HIGH-priority task needed, while a medium task hogged the CPU. This failure is called…',
      options: ['Priority inversion', 'A context switch', 'Round-robin overflow', 'Stack overflow'],
      correctIndex: 0,
      explanations: [
        'Correct: the priority order effectively inverted — the fix, priority inheritance (temporarily boosting the low task so it releases the resource), was uploaded to Mars.',
        'Context switches are the normal mechanism, not the failure.',
        'Not a real term — round-robin wasn’t the culprit.',
        'A different (memory) failure from your data-structures lesson.',
      ],
    },
    {
      question: 'Adding MORE tasks to a CPU can make TOTAL useful work go down because…',
      options: [
        'Switching overhead grows until the CPU spends its time swapping snapshots instead of computing',
        'The CPU gets physically tired',
        'Tasks refuse to share alphabetically',
        'Memory becomes read-only',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: thrashing — each switch costs microseconds and cache warmth; enough tasks and overhead eats the budget. More parallelism ≠ more throughput.',
        'Silicon doesn’t fatigue — the loss is pure bookkeeping overhead.',
        'Order isn’t the issue; the COUNT of switches is.',
        'Unrelated — memory permissions don’t change with load.',
      ],
    },
  ],
}
