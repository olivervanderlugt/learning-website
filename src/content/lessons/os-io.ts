import type { Lesson } from '../../types'

export const osIoLesson: Lesson = {
  nodeId: 'os-io',
  screens: [
    {
      kind: 'explain',
      title: 'The CPU’s waiting problem',
      body: [
        'A CPU executes an instruction every nanosecond. A keypress arrives maybe once per second — a BILLION instruction-times apart. Disk, network, sensors: everything outside the CPU is glacially slow by comparison.',
        'So the central I/O question: how does the CPU find out something happened WITHOUT wasting its life checking?',
        'Two answers exist — polling and interrupts — and choosing between them shapes every device driver and every robot firmware.',
      ],
      links: [{ nodeId: 'cpu', label: 'Refresher: the fetch-execute loop' }],
    },
    {
      kind: 'predict',
      question: 'POLLING means asking “anything yet? anything yet?” in a loop. Your keyboard driver polls a million times per second; you type 300 keys a minute. What fraction of checks find a key?',
      options: [
        'About 1 in 200,000 — essentially all checks are wasted work',
        'About half',
        'Nearly all — keyboards are busy devices',
        'Exactly 1 in 300',
      ],
      correctIndex: 0,
      reveal:
        '300 keys/min = 5 per second, against 1,000,000 checks per second — one hit per 200,000 asks. The CPU burns cycles (and battery) asking a silent device the same question. Polling is simple and fine when events are frequent or timing is ultra-critical, but as a default it’s a treadmill.',
    },
    {
      kind: 'explain',
      title: 'Interrupts: don’t call us, we’ll call you',
      body: [
        'The alternative inverts control: the DEVICE gets a wire to the CPU. When a key arrives, the hardware raises an INTERRUPT — the CPU drops what it’s doing, runs a short handler (grab the key, queue it), and resumes as if nothing happened.',
        'Sound familiar? It’s a forced context switch — the same save-and-restore trick from the processes lesson, triggered by hardware.',
        'Interrupts are how one CPU serves dozens of devices while spending ~100% of its time on real work.',
      ],
      deeper: [
        'The preemptive scheduler IS an interrupt user: a hardware timer fires every few milliseconds, and its handler is the scheduler deciding who runs next. Timer interrupt = the heartbeat of multitasking.',
        'Interrupt handlers must be SHORT — while handling, other interrupts may wait. Real drivers do the minimum (copy the byte, set a flag) and defer the rest to a normal task. A slow handler is how you drop sensor readings.',
        'For high-volume devices there’s a third player: DMA (direct memory access) — a helper chip copies whole buffers (network packets, camera frames) into RAM by itself and raises ONE interrupt when done. The CPU delegates even the copying.',
      ],
      links: [{ nodeId: 'robo-embedded', label: 'Where you’ll wire this: Embedded Systems' }],
    },
    {
      kind: 'predict',
      question: 'Your robot must react to a bump sensor within 1 ms, but its main loop takes 10 ms per cycle. Polling the sensor once per loop is too slow. The right fix?',
      options: [
        'Wire the bump sensor to an interrupt — the handler fires the instant it triggers, mid-loop',
        'Make the main loop 10× faster',
        'Poll the sensor 10 times within each loop',
        'Accept the 10 ms delay',
      ],
      correctIndex: 0,
      reveal:
        'An interrupt handler preempts the main loop within microseconds of the bump — deadline met regardless of loop timing. Speeding the loop or polling more helps but COUPLES the safety deadline to everything else’s timing; the interrupt decouples them. This is why safety-critical inputs (e-stops, limit switches, encoder ticks) are interrupt-driven in real robots.',
    },
    {
      kind: 'quiz',
      question: 'The core difference between polling and interrupts:',
      options: [
        'Polling: CPU repeatedly asks. Interrupts: the device signals, and the CPU responds only then',
        'Polling is hardware, interrupts are software',
        'Interrupts lose data; polling never does',
        'Polling is always better',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ask-constantly versus be-notified — a treadmill versus a doorbell.',
        'Both involve hardware AND software — the difference is who initiates.',
        'Either can lose data if mishandled; interrupts done right are the more reliable default.',
        'Polling wins in niches (ultra-predictable timing, very chatty devices) — as a default it wastes the CPU.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When an interrupt fires mid-program, the CPU…',
      options: [
        'Saves its place, runs the short handler, and resumes the program exactly where it was',
        'Restarts the interrupted program from the beginning',
        'Shuts down until rebooted',
        'Ignores it if busy',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: save state → handler → restore state — a hardware-triggered context switch, invisible to the interrupted code.',
        'No restart needed — the saved program counter marks the exact instruction to resume.',
        'Interrupts are routine — thousands per second on a normal machine.',
        '“Busy” doesn’t exempt the CPU — that forcibility is exactly what makes deadlines and preemption possible.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why must interrupt handlers be as short as possible?',
      options: [
        'While one handler runs, other interrupts and tasks wait — a slow handler causes missed events',
        'Long handlers use too much disk',
        'Short code has fewer bugs by law',
        'Handlers are billed per instruction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: handler time is borrowed from EVERYTHING else. Grab the data, set a flag, get out — process later at normal priority.',
        'Handlers rarely touch disk — the cost is latency for everyone else, not storage.',
        'Shorter helps reviewability, but the driving reason is timing.',
        'No meter — the currency is microseconds of system responsiveness.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is DMA (direct memory access) for?',
      options: [
        'A helper chip moves bulk data (camera frames, packets) into RAM itself, interrupting the CPU once when done',
        'It lets programs skip virtual memory translation',
        'It makes the CPU access RAM faster',
        'It encrypts memory automatically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: instead of the CPU copying a million bytes one-by-one (or taking a million interrupts), the DMA engine does the haul and reports completion once.',
        'Translation still applies — DMA is about WHO copies, not address rules.',
        'It doesn’t speed the CPU’s own accesses; it takes copying OFF the CPU entirely.',
        'Unrelated — DMA is a mover, not a cipher.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your drone’s emergency-stop must work even if the main program hangs in an infinite loop. Which design survives?',
      options: [
        'E-stop on a hardware interrupt (or dedicated circuit) — it preempts whatever the CPU is doing',
        'Checking the e-stop flag each loop iteration',
        'A very high software priority for the e-stop task',
        'Printing a warning when the loop starts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: interrupts don’t wait for the loop to come around — and the truly paranoid put e-stop in hardware, needing no software at all. Safety must not depend on the code being healthy.',
        'A hung loop never reaches its next iteration — the check never happens.',
        'A task still needs the scheduler to run, and the scheduler needs its timer interrupt — closer, but the direct interrupt (or pure hardware) is the honest answer.',
        'Warnings don’t stop motors.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The timer interrupt is called the heartbeat of multitasking because…',
      options: [
        'It periodically forces the CPU into the scheduler, enabling preemptive task switching',
        'It keeps the CPU’s clock crystal oscillating',
        'It beats once per program',
        'It measures CPU temperature',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every few ms it fires, the handler is the scheduler, and no program can refuse — that’s preemption implemented.',
        'The clock crystal runs on physics; the timer INTERRUPT is a consumer of it.',
        'It beats on a fixed period regardless of what’s running.',
        'Thermal sensors are separate hardware.',
      ],
    },
    {
      question: 'A wheel encoder emits 10,000 ticks/second that must each be counted. Interrupt-per-tick works but eats CPU. The refined design is…',
      options: [
        'Let a hardware counter (or DMA) accumulate ticks; read the total at your control rate',
        'Poll the encoder pin in a tight loop',
        'Count only every tenth tick',
        'Lower the robot’s speed so ticks slow down',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 10k interrupts/s of handler overhead vanishes into a free-running counter peripheral; the control loop reads one number at 100 Hz. Delegate volume to hardware, keep decisions in software.',
        'A tight poll loop consumes a whole core forever — worse than the interrupts.',
        'Skipping ticks corrupts odometry — your position estimate drifts.',
        'Design for the workload, don’t nerf the robot.',
      ],
    },
  ],
}
