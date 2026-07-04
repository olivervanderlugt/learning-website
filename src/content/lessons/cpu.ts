import type { Lesson } from '../../types'

export const cpuLesson: Lesson = {
  nodeId: 'cpu',
  screens: [
    {
      kind: 'explain',
      title: 'You have parts. Now you need a machine.',
      body: [
        'Take stock: you can store numbers (bits), decide (gates), and compute (adders). But a pile of circuits isn’t a computer — nothing tells them WHAT to do or WHEN.',
        'A CPU adds two ingredients: a few tiny storage slots called REGISTERS, and a metronome called the CLOCK.',
        'With those, circuits stop being sculptures and start running programs.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Billions of gates must act in coordinated lock-step, or signals arrive at the wrong moments and corrupt everything. What keeps them all in sync?',
      options: [
        'They naturally settle into rhythm, like fireflies',
        'A central clock signal ticking billions of times per second',
        'The operating system schedules each gate',
        'Each gate has a tiny timer inside',
      ],
      correctIndex: 1,
      reveal:
        'One shared CLOCK wire pulses through the whole chip — on each tick, every register captures its new value simultaneously. “3.5 GHz” on a laptop spec sheet means exactly this: 3.5 billion ticks per second. (Fireflies really do sync themselves — but chips can’t wait for that.)',
    },
    {
      kind: 'explain',
      title: 'Registers: the CPU’s hands',
      body: [
        'A register is a row of 64 memory bits sitting right inside the CPU — close enough to use within a single tick. A CPU has only a few dozen of them, with names like R1, R2, R3.',
        'Everything the CPU actively works on must first be lifted into registers — like holding two numbers in your hands before adding them.',
        'Fun fact you’ve earned: a register bit is just two NOT gates holding each other in a loop — remember the “feedback creates memory” quiz answer?',
      ],
    },
    {
      kind: 'predict',
      question: 'A program is a list of instructions in memory. What must the CPU do with EACH instruction, every single time?',
      options: [
        'Read it, figure out what it means, then do it',
        'Copy it to all registers at once',
        'Translate it to decimal first',
        'Check it with the operating system first',
      ],
      correctIndex: 0,
      reveal:
        'That’s the eternal three-step: FETCH (read the instruction the program counter points at), DECODE (control circuits work out what it asks), EXECUTE (do it, then move to the next). Every program ever run — games, AI, this website — is this loop repeated billions of times.',
    },
    { kind: 'game', gameId: 'cpu-sim' },
    {
      kind: 'explain',
      title: 'The loop that runs the world',
      body: [
        'What you just stepped through by hand is ALL a CPU does. There is no cleverness inside — just fetch-decode-execute at absurd speed.',
        'The “intelligence” lives in the instructions — and in the humans (or AIs) who arranged them. The machine is fast, obedient, and utterly literal.',
      ],
    },
    {
      kind: 'predict',
      question: 'A robot microcontroller runs at 16 MHz; your laptop at 3.5 GHz. Roughly how many times more ticks per second does the laptop get?',
      options: ['About 2×', 'About 20×', 'About 200×', 'About 2000×'],
      correctIndex: 2,
      reveal:
        '3.5 GHz ÷ 16 MHz ≈ 220×. Yet that “slow” €2 chip still runs 16 MILLION cycles per second — plenty to read sensors and steer motors hundreds of times per millisecond. Robotics is the art of doing a lot with cycles to spare.',
    },
    {
      kind: 'explain',
      title: 'Where you go next',
      body: [
        'You now hold the full chain: switches → gates → adders → a clocked machine executing instructions. That IS a computer, honestly summarized.',
        'On the map, a future node awaits: writing programs at the CPU’s own level — assembly, where you’ll type LOAD and ADD yourself and feel exactly what high-level code compiles down to.',
        'First: prove this node. Quiz time.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What are the three phases the CPU repeats for every instruction?',
      options: [
        'Fetch, decode, execute',
        'Read, write, delete',
        'Input, process, output',
        'Load, add, store',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: fetch the instruction, decode what it means, execute it — then repeat, billions of times per second.',
        'Read/write/delete describes file operations, not the instruction cycle. The CPU fetches, decodes, executes.',
        'Input-process-output describes a whole system’s dataflow; the instruction cycle is the CPU’s inner heartbeat: fetch, decode, execute.',
        'LOAD, ADD and STORE are example INSTRUCTIONS — each one individually goes through fetch, decode, execute.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is a register?',
      options: [
        'A tiny, named storage slot inside the CPU itself',
        'The main memory where programs live',
        'A special gate that counts upward',
        'The list of running programs',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a handful of 64-bit slots (R1, R2, …) built from gate-loops, close enough to the ALU to be used within a single clock tick.',
        'Main memory (RAM) is the big, slower warehouse outside the CPU — values must be loaded from it INTO registers before the CPU can compute with them.',
        'Counting circuits exist (the program counter is one!) but “register” means the general-purpose storage slots — most just hold whatever you put in them.',
        'That’s the operating system’s process list — software. Registers are physical hardware inside the chip.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does “3.5 GHz” mean for a CPU?',
      options: [
        'It can store 3.5 gigabytes',
        'Its clock ticks 3.5 billion times per second',
        'It transfers data at 3.5 gigabits per second',
        'It has 3.5 billion transistors',
      ],
      correctIndex: 1,
      explanations: [
        'Gigabytes measure storage capacity — that’s RAM or disk. Hertz measures how often something happens per second.',
        'Correct: hertz = events per second, and the event is a clock tick — each one advancing every register in lock-step.',
        'Data transfer rates are measured in bits per second on buses and networks — clock speed is about the compute heartbeat, not the pipes.',
        'Transistor count is a separate spec (billions, but fixed at manufacture). GHz says how fast they’re paced, not how many there are.',
      ],
    },
    {
      kind: 'quiz',
      question: 'During DECODE, what is the CPU doing?',
      options: [
        'Working out what the fetched instruction is asking for',
        'Decrypting the program for security',
        'Converting binary numbers to decimal',
        'Choosing which program to run next',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the instruction’s bit pattern flows through control circuits that activate the right hardware — “this is an ADD, route R1 and R2 into the adder”.',
        'No cryptography involved — the instruction is plain bits; decode just interprets which circuits they should trigger.',
        'The CPU never needs decimal — it computes natively in binary from start to finish. Decimal only appears when displaying results to humans.',
        'Choosing programs is the operating system’s scheduling job (a future node!). Decode is about ONE instruction’s meaning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a CPU without a clock compute nothing useful?',
      options: [
        'The clock provides the electrical power',
        'Without synchronized ticks, signals arrive at unpredictable times and registers capture garbage',
        'The clock stores the program',
        'It would compute fine, just without knowing the time of day',
      ],
      correctIndex: 1,
      explanations: [
        'Power comes from the supply rails — the clock carries timing, not energy.',
        'Correct: gate outputs need time to settle; the clock says “NOW everyone capture your inputs” only after everything is stable. No conductor, no orchestra.',
        'Programs live in memory; the clock is a bare pulse wire — it stores nothing, it only paces.',
        'The clock isn’t a calendar — it’s the synchronization heartbeat. Without it, the fetch-decode-execute machinery itself falls apart.',
      ],
    },
  ],
}
