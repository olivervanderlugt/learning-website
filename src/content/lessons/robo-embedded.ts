import type { Lesson } from '../../types'

export const roboEmbeddedLesson: Lesson = {
  nodeId: 'robo-embedded',
  screens: [
    {
      kind: 'explain',
      title: 'The tiny computer strapped to the motor',
      body: [
        'The CPU you studied, shrunk to a €2 chip with no screen, no operating system, and kilobytes of memory — that’s a microcontroller, the brain glued directly onto a robot.',
        'It runs one program forever, in a tight loop, talking straight to sensors and motors through its pins.',
        'Watch that fetch-decode-execute heart beat again — this time picture it inside a motor controller.',
      ],
      links: [{ nodeId: 'cpu', label: 'Refresher: The Heartbeat of the CPU' }],
    },
    { kind: 'game', gameId: 'cpu-sim' },
    {
      kind: 'predict',
      question:
        'A microcontroller reading a wheel encoder must respond within, say, 1 millisecond or it miscounts. What guarantees it reacts in time, instead of maybe getting to it eventually?',
      options: [
        'A hardware interrupt — the event taps the CPU on the shoulder immediately',
        'A faster internet connection',
        'A bigger hard drive',
        'Adding more RAM',
      ],
      correctIndex: 0,
      reveal:
        'An interrupt: the hardware signals the CPU the instant an event happens, pausing normal work to run a tiny handler right away. This is “real-time” — correctness depends on reacting by a deadline, not just eventually. Embedded systems live and die by meeting deadlines, which is why they usually skip a heavy operating system entirely.',
    },
    {
      kind: 'explain',
      title: 'Programming close to the metal',
      body: [
        'With no OS to help, embedded code talks directly to hardware: set a pin high to switch a motor on, read a pin to sense a bumper. These pins are called GPIO — general-purpose input/output.',
        'Resources are tiny — kilobytes of RAM, no memory to waste — so embedded programmers count every byte and every microsecond.',
        'This is where your whole skill tree converges: bits, gates, a CPU, and code, all in a chip you can hold. Quiz to seal it.',
      ],
      deeper: [
        'A classic embedded program is a “super-loop”: initialise the hardware once, then forever { read sensors; decide; drive outputs }. It never returns — the robot’s behavior IS that loop running millions of times.',
        'Because there’s no OS scheduler, timing is the programmer’s job. Interrupts handle the urgent, deadline-critical events (an encoder tick, an emergency stop) while the main loop handles the rest — a hand-built version of the multitasking a full OS would provide.',
        'The Arduino you might buy is exactly this: an AVR microcontroller, a handful of GPIO pins, and a super-loop with setup() and loop() — the friendly face of everything in this lesson.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is a microcontroller?',
      options: [
        'A small, cheap, self-contained computer (CPU + memory + I/O) for embedding in devices',
        'A large server computer',
        'A type of electric motor',
        'A programming language',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s a whole tiny computer on one chip — CPU, a little memory, and I/O pins — made to run one program inside a device.',
        'Servers are big, general-purpose, and run operating systems; a microcontroller is the opposite: tiny, dedicated, often OS-less.',
        'It controls motors (among other things) but is itself a computer, not a motor.',
        'It’s hardware you program, not a language.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does “real-time” mean for an embedded system?',
      options: [
        'Correctness depends on responding within a strict deadline',
        'It shows the current clock time',
        'It runs faster than any other computer',
        'It connects to the internet live',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a real-time system must react by a deadline (e.g. within 1 ms) — being late is being wrong, not just slow.',
        'It’s about meeting deadlines, not displaying a clock.',
        'Real-time isn’t about raw speed; a slow chip can be real-time if it reliably meets its deadlines.',
        'Real-time refers to timing guarantees, not internet connectivity.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do microcontrollers rely on interrupts?',
      options: [
        'To react to urgent events immediately instead of only when the main loop gets around to it',
        'To connect to Wi-Fi',
        'To increase storage space',
        'To slow the CPU down',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an interrupt pauses normal work the instant an event fires, guaranteeing a fast response to deadline-critical inputs.',
        'Interrupts are about timing/responsiveness, not networking.',
        'They handle timing of events, not storage.',
        'They let the CPU respond promptly — that’s about speed of response, not slowing it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What are GPIO pins used for?',
      options: [
        'Directly reading inputs (sensors) and driving outputs (LEDs, motors) as high/low signals',
        'Storing the program permanently',
        'Cooling the chip',
        'Displaying graphics',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: general-purpose input/output pins let the chip sense and control the physical world by reading or setting each pin high or low.',
        'Program storage is flash memory, not the I/O pins.',
        'Pins carry signals, not heat management.',
        'GPIO handles simple digital signals; graphics need dedicated hardware, well beyond a bare pin.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A typical embedded program is structured as…',
      options: [
        'Initialise once, then loop forever reading sensors and driving outputs',
        'Run once and immediately exit',
        'Wait for a user to click buttons in a window',
        'Print a report and shut down',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the “super-loop” — set up hardware, then forever sense/decide/act. It never exits; that loop IS the robot’s behavior.',
        'A robot program must keep running; exiting would stop all control.',
        'There’s usually no window or user — the microcontroller runs autonomously in the device.',
        'It doesn’t finish and shut down; it runs its control loop continuously.',
      ],
    },
  ],
}
