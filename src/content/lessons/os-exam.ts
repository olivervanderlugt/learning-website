import type { Lesson } from '../../types'

export const osExamLesson: Lesson = {
  nodeId: 'os-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — command the machine',
      body: [
        'Ten questions across scheduling, virtual memory and I/O — all NEW, no repeats from the lesson quizzes. No notes, no lookups: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Round-robin scheduler, one slice per turn. Queue starts [vision, motor, logger]; vision needs 3 slices, motor 1, logger 2. Which task runs in the FIFTH slice?',
      options: ['logger', 'vision', 'motor', 'Impossible to say — round-robin picks randomly'],
      correctIndex: 0,
      explanations: [
        'Correct: trace it — vision, motor(done), logger, vision, LOGGER(done), vision. Finished tasks leave the queue, so after slice 2 only vision and logger alternate.',
        'Vision runs slices 1, 4 and 6 — if you got vision, you probably forgot that motor LEAVES the queue after finishing, changing the rotation.',
        'Motor needed only one slice — it ran in slice 2 and was gone long before slice 5.',
        'Round-robin is the opposite of random: strict FIFO, take from the front, requeue at the back. The whole trace is deterministic.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot’s OS performs 10,000 context switches per second, each costing 5 microseconds. What fraction of CPU time is pure switching overhead?',
      options: ['5%', '0.5%', '50%', '0.005%'],
      correctIndex: 0,
      explanations: [
        'Correct: 10,000 × 5 µs = 50,000 µs = 50 ms of every second — 5%. Real and worth minimizing, but affordable; pile on 10× more tasks and it stops being affordable.',
        '0.5% would be 5,000 µs total — you likely dropped a zero. 10,000 switches × 5 µs each is 50,000 µs.',
        '50% would mean half a second of switching — that’s 500 ms, ten times the real total of 50 ms.',
        '0.005% treats the cost as 5 µs TOTAL — but the 5 µs price is paid on every one of the 10,000 switches.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot uses a COOPERATIVE scheduler (tasks yield voluntarily). The camera task enters an infinite loop. What happens to the motor-control task?',
      options: [
        'It never runs again — the scheduler only gets control when a task yields, and this one never will',
        'The timer interrupt forces a switch back to it after a few milliseconds',
        'It keeps running because it has higher priority',
        'The OS detects the loop and kills the camera task',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: cooperative scheduling trusts every task to hand back the CPU — one infinite loop and that trust is fatal. This is exactly why modern systems preempt.',
        'That timer-forced switch is PREEMPTIVE scheduling — the fix, not the scenario. A cooperative scheduler has no such hammer.',
        'Priority only matters when the scheduler RUNS — and it can’t run until the looping task yields, which is never.',
        'Detecting an infinite loop in general is impossible (that’s the halting problem!) — real systems don’t diagnose the loop, they preempt around it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A desktop OS responds in 0.1 ms on average but occasionally takes 50 ms; an RTOS guarantees at most 2 ms, always. For a drone’s stability loop, which do you pick?',
      options: [
        'The RTOS — one 50 ms spike drops the drone; a guaranteed 2 ms worst case beats a great average',
        'The desktop OS — 0.1 ms average is 20× faster',
        'Either — they average out to similar performance',
        'The desktop OS, but with more CPU cores to absorb the spikes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: physics doesn’t grade on averages. The drone falls during the ONE late response, so the worst case is the only number that matters — determinism is the product.',
        'That 20× faster average includes the rare 50 ms outlier — and a stability loop dies on the outlier, not the mean.',
        'Averages hide exactly what kills you here — a control deadline is pass/fail per cycle, not amortized.',
        'More cores raise throughput but don’t bound the worst case — the spike can still land on the core running your loop.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Page size 100 bytes. Page table: {0→8, 1→3, 2→6} (virtual page → physical frame). A process reads virtual address 215. Which physical address is accessed?',
      options: ['615', '215', '815', '15'],
      correctIndex: 0,
      explanations: [
        'Correct: 215 = page 2, offset 15. Page 2 lives in frame 6, so physical = 6 × 100 + 15 = 615.',
        '215 is the VIRTUAL address passed through untranslated — but every access goes through the page table; the program never touches its own numbers directly.',
        '815 uses frame 8 — that’s where page 0 lives. Divide first: 215 ÷ 100 gives page 2, and page 2 maps to frame 6.',
        '15 is only the offset — you found the right position WITHIN the page but dropped the frame base. Physical = frame × 100 + offset.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot’s map-building process needs 6 GB of memory, but the Raspberry Pi has 4 GB of RAM. The process still runs (slowly). How?',
      options: [
        'The OS keeps rarely-touched pages on disk and pulls them back into RAM on demand',
        'Virtual addresses are smaller than physical ones, so the data compresses to fit',
        'The extra 2 GB is held in the CPU’s registers',
        'It can’t — a process is hard-limited to physical RAM',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: virtual memory decouples “memory the process addresses” from “RAM that exists” — cold pages park in swap and fault back in when touched. The slowness is the disk round-trips.',
        'Translation renames addresses, it doesn’t shrink data — a 6 GB map is 6 GB wherever its pages sit.',
        'Registers hold a few dozen VALUES, not gigabytes — they’re the CPU’s hands, not a warehouse.',
        'That limit is exactly what virtual memory removes — the page table can point at disk as well as RAM.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your vision process hits a bad pointer and dies — but the motor-control process on the same machine keeps driving flawlessly. What made that containment possible?',
      options: [
        'Separate page tables per process — the vision bug couldn’t even ADDRESS motor-control’s memory',
        'The two processes run on separate RAM chips',
        'The OS restored vision’s memory from an automatic backup',
        'Motor-control’s memory is marked read-only',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every process lives in its own virtual address space, so a wild pointer in vision translates only within vision’s pages — or traps. Isolation is a language in which the violation can’t be written.',
        'They share the same physical RAM — the separation is in the TRANSLATION layer, not the silicon.',
        'Nothing was restored — vision died. The win is that its corruption never left its own address space.',
        'Read-only pages protect against some writes, but the real wall is that vision’s page table simply contains no route to motor-control’s frames.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'The lessons called polling a treadmill — yet real firmware sometimes polls on purpose. When is polling the RIGHT choice?',
      options: [
        'When the device produces data nearly every check, or timing must be perfectly regular — the checks stop being wasted',
        'Whenever battery life matters',
        'When the device is very slow and quiet',
        'Never — interrupts are strictly better',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a chatty device makes almost every poll a hit, and a fixed-rate poll loop gives jitter-free timing that interrupt arrival never quite matches. Polling’s sin is wasted checks — remove the waste and it’s a fine tool.',
        'Backwards — an idle polling loop burns CPU (and battery) asking a silent device the same question; interrupts let the CPU sleep.',
        'Slow-and-quiet is polling’s WORST case: nearly every check finds nothing. That’s the keyboard scenario — the doorbell wins.',
        '“Strictly better” ignores interrupt overhead and jitter — at very high event rates or for exact-period sampling, engineers deliberately poll.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your lidar’s interrupt handler parses the full 360-point scan and updates the map before returning. Soon the robot starts losing wheel-encoder ticks. Why?',
      options: [
        'The long handler blocks other interrupts — encoder ticks arriving during the parse get missed',
        'The lidar data overwrites the encoder’s memory',
        'A CPU can only service one device per program',
        'The scheduler lowered the encoder task’s priority',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: handler time is borrowed from every other interrupt. The fix is the classic pattern — copy the scan, set a flag, return in microseconds, and parse later at task level.',
        'That would be a memory bug — this is a TIMING bug. The data is fine; the ticks that fired mid-parse were simply never serviced.',
        'One CPU services dozens of devices happily — but only if each handler gets in and out fast.',
        'Encoder ticks are handled by an interrupt, not a scheduled task — the scheduler never got a say; the busy handler did the blocking.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A camera streams 30 frames per second, 1 MB each, into your robot’s vision pipeline. Which design leaves the CPU most free for actual vision work?',
      options: [
        'DMA copies each frame into RAM by itself; the CPU takes one interrupt per completed frame',
        'An interrupt per byte, so no data is ever missed',
        'The CPU polls the camera in a tight loop and copies bytes as they arrive',
        'The interrupt handler copies the whole 1 MB frame itself',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: delegate the bulk haul to the DMA engine and pay 30 interrupts a second — the CPU spends its cycles UNDERSTANDING frames, not carrying them.',
        'One interrupt per byte is 30 MILLION interrupts a second — the save/restore overhead alone would bury the CPU.',
        'A tight poll loop dedicates the whole CPU to being a copy machine — nothing left for the vision pipeline it’s feeding.',
        'Copying 1 MB inside a handler blocks every other interrupt for the whole copy — encoder ticks and e-stops wait behind a million bytes.',
      ],
    },
  ],
}
