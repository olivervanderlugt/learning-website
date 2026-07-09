import type { Lesson } from '../../types'

export const netTcpLesson: Lesson = {
  nodeId: 'net-tcp',
  screens: [
    {
      kind: 'explain',
      title: 'Reliability, built from unreliable parts',
      body: [
        'The internet underneath is best-effort: packets get lost, duplicated and reordered. TCP builds a perfectly reliable, ordered stream ON TOP of that mess — a genuinely clever trick.',
        'Three ideas do it. A HANDSHAKE (SYN → SYN-ACK → ACK) agrees starting sequence numbers before any data. SEQUENCE NUMBERS + ACKs let the receiver say “got everything up to byte N”, so a missing byte triggers a RETRANSMIT. A WINDOW lets many bytes be in flight at once instead of one-at-a-time.',
        'This is why a file always arrives intact — and why one lost packet can briefly freeze a video.',
      ],
      links: [{ nodeId: 'net-sockets', label: 'Recap: TCP vs UDP sockets' }],
    },
    {
      kind: 'predict',
      question:
        'The network is shared. If every sender blasts data as fast as it can, routers’ queues overflow and DROP packets — which trigger retransmits — which add MORE traffic. What must a good sender do when it detects loss?',
      options: [
        'Treat loss as a congestion signal and SLOW DOWN sharply, then probe back up gently',
        'Speed up to push its data through before others',
        'Ignore it — the network will sort itself out',
        'Resend everything from the very first byte',
      ],
      correctIndex: 0,
      reveal:
        'Loss is TCP’s congestion signal. The rule is AIMD — Additive Increase, Multiplicative Decrease: while things go well, grow the sending window by a little each round-trip (additive, +1); the moment a loss appears, CUT it hard (multiplicative, halve it). Gentle up, sharp down. When every sender follows this, a shared link settles into a fair, stable share instead of collapsing — the reason the internet doesn’t melt under load.',
    },
    {
      kind: 'explain',
      title: 'AIMD, one round at a time',
      body: [
        'The congestion window (cwnd) is how many units a sender may have in flight. Start at 1. Each successful round: cwnd + 1. Each loss: cwnd halved (integer floor).',
        'Walk the events ok, ok, ok, loss, ok from cwnd = 1: 2, 3, 4, then loss halves 4 → 2, then ok → 3. That sawtooth — climb, halve, climb — is the shape of every TCP connection sharing a link.',
        'Code the update. The load-bearing line is the loss case: MULTIPLICATIVE decrease, not −1.',
      ],
      deeper: [
        'Real TCP starts with “slow start” — cwnd DOUBLES each round (exponential) until it hits a threshold or loss, then switches to the +1 additive “congestion avoidance” shown here. Fast, then cautious.',
        'Modern variants change the control law: CUBIC (Linux default) uses a cubic curve to recover faster on fat links; BBR (Google) ignores loss and instead models the link’s bandwidth and round-trip time directly. The AIMD sawtooth is the classic to understand first.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Implement the AIMD congestion window. On “ok” add 1; on “loss” HALVE it (Math.floor(cwnd / 2)). Expected: cwnd 2 3 4 2 3.',
      starter: `const events = ['ok', 'ok', 'ok', 'loss', 'ok']
let cwnd = 1
const trace = []
for (const e of events) {
  if (e === 'ok') {
    cwnd = cwnd + 1              // additive increase
  } else {
    cwnd = cwnd - 1             // <-- fix: loss is MULTIPLICATIVE decrease
  }
  trace.push(cwnd)
}
print('cwnd', trace.join(' '))`,
      expected: `cwnd 2 3 4 2 3`,
      hint: 'Multiplicative decrease means halving: cwnd = Math.floor(cwnd / 2).',
      success:
        'Additive up, multiplicative down — the +1/÷2 sawtooth. Subtracting 1 on loss (the starter) can’t back off fast enough when a link is congested, so senders would pile on and the queue would stay overflowed. The asymmetry is what keeps the shared internet stable.',
    },
    {
      kind: 'explain',
      title: 'When reliability bites: head-of-line blocking',
      body: [
        'TCP’s in-order guarantee has a cost. If packet 3 of 3, 4, 5, 6 is lost, the receiver already HAS 4, 5, 6 — but must withhold them from your app until 3 is retransmitted and arrives. Everything queues behind the missing byte.',
        'That’s head-of-line blocking, and it’s exactly why a glitchy video stream freezes on one frame then suddenly jumps ahead: the later frames were waiting on one lost packet.',
        'For a robot’s live telemetry you often don’t want that wait — which is the whole reason UDP-based transports exist.',
      ],
      deeper: [
        'HTTP/2 multiplexed many streams over one TCP connection and hit this hard: one lost packet stalls ALL streams. HTTP/3 fixes it by moving to QUIC — a reliable protocol built on UDP where each stream is independent, so a loss in one doesn’t block the others.',
        'The general lesson: reliability and ordering are features you should be able to choose per data flow, not a single global setting. TCP bundles them; modern transports unbundle them.',
      ],
      links: [{ nodeId: 'net-packets', label: 'Where head-of-line blocking starts' }],
    },
    {
      kind: 'quiz',
      question: 'What is the purpose of TCP’s three-way handshake (SYN, SYN-ACK, ACK)?',
      options: [
        'Both sides agree they can reach each other and sync starting sequence numbers before any data flows',
        'It encrypts the connection',
        'It transfers the first chunk of file data',
        'It measures the Wi-Fi signal strength',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the handshake establishes a two-way channel and initial sequence numbers, so both ends can track and acknowledge bytes from the start.',
        'TCP itself doesn’t encrypt — TLS runs on top of an established TCP connection.',
        'No application data rides the handshake (in classic TCP) — it sets up the connection first.',
        'Signal strength is a physical-layer concern, unrelated to the handshake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Under AIMD, a sender’s window climbs 2, 3, 4, then a loss occurs. What is the window right after the loss, and why that rule?',
      options: [
        '2 — multiplicative decrease halves it, backing off fast so the congested link can drain',
        '3 — subtract one, a gentle step down',
        '5 — keep increasing; loss is ignored',
        '1 — always reset to the very start',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 4 halved (floor) is 2. Cutting hard on loss but growing slowly is what makes many senders converge to a fair, stable share.',
        'Additive decrease (−1) backs off too slowly — the queue would stay overflowed and losses continue.',
        'Ignoring loss makes congestion worse; loss is precisely the back-off signal.',
        'A full reset to 1 is what slow-start does after a timeout; a single loss triggers a halving, not a reset.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A live video freezes on one frame, then jumps ahead several frames at once. Which TCP behavior explains this?',
      options: [
        'Head-of-line blocking — later frames arrived but were held until the one lost packet was retransmitted',
        'The congestion window grew too large',
        'The handshake failed midway',
        'UDP reordered the frames',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: TCP delivers in order, so the received-but-later frames wait behind the missing one; when it finally arrives, they all release at once — the freeze-then-jump.',
        'Window size affects throughput, not the in-order stall on a specific loss.',
        'The connection was already up and streaming — the handshake had succeeded.',
        'This is a TCP stream, not UDP; the symptom is ordering-induced waiting, not reordering.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does TCP recover a packet that the network dropped?',
      options: [
        'The receiver’s ACKs reveal the gap, and the sender retransmits the un-acknowledged bytes',
        'The router stores every packet and replays it',
        'It cannot — dropped packets are lost forever',
        'It asks the application to send the whole file again',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ACKs tell the sender the highest in-order byte received; missing ACKs (or duplicates) signal the gap, and the sender resends just those bytes.',
        'Routers don’t buffer for replay — recovery is end-to-end, driven by the sender and receiver.',
        'Loss is exactly what TCP hides — retransmission makes the stream reliable despite drops.',
        'Only the missing bytes are resent, not the entire file — that’s the point of sequence numbers.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'TCP “slow start” actually grows the window exponentially (doubling each round) at first. Why call the aggressive phase “slow”?',
      options: [
        'It starts from a small window (1) — slow at the BEGINNING — even though it ramps up fast; it’s slow relative to blasting at full rate immediately',
        'It is the slowest possible algorithm',
        'It never increases the window',
        'It halves the window every round',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the name refers to the humble starting point, not the growth rate. It doubles per round until a threshold or loss, then switches to additive increase.',
        'It’s among the faster ramps — doubling is exponential; the name is historical.',
        'It increases aggressively (×2/round) until it must slow down — the opposite of never increasing.',
        'Halving is the loss response, not slow start’s growth.',
      ],
    },
    {
      question: 'Why does AIMD produce FAIR sharing when many connections use one link?',
      options: [
        'All senders back off multiplicatively on shared loss but grow additively, which mathematically converges their rates toward an equal share',
        'The router assigns each connection a fixed rate',
        'The fastest sender is throttled to zero',
        'Fairness is luck; AIMD has no such property',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: additive increase closes the gap between a slow and fast flow while multiplicative decrease shrinks them proportionally — the classic result is convergence to fairness.',
        'Routers generally don’t hand out fixed rates; fairness emerges from the senders’ AIMD behavior.',
        'No sender is zeroed — they oscillate around an equal share.',
        'It’s a proven property of the additive-up/multiplicative-down control law, not luck.',
      ],
    },
    {
      question: 'HTTP/3 abandoned TCP for QUIC (built on UDP). What TCP limitation was it escaping?',
      options: [
        'Head-of-line blocking across multiplexed streams — in QUIC a loss in one stream doesn’t stall the others',
        'UDP is simply always faster, so they switched for speed',
        'TCP cannot be encrypted',
        'TCP has no congestion control',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: HTTP/2 over one TCP connection let a single lost packet block every stream; QUIC gives each stream independent delivery, removing that cross-stream stall.',
        'It wasn’t a blanket speed claim — it was specifically the HOL-blocking problem for multiplexed streams.',
        'TCP carries TLS fine; QUIC bakes encryption in, but that wasn’t the HOL motivation.',
        'QUIC reimplements congestion control — TCP has it too; the issue was in-order blocking.',
      ],
    },
    {
      question: 'A sensor sends a burst; the receiver ACKs “up to byte 500” twice more even as new data arrives (duplicate ACKs). What does the sender infer?',
      options: [
        'Byte 501 onward is likely missing — the duplicate ACKs flag a gap, prompting a fast retransmit without waiting for a timeout',
        'The connection is idle',
        'The receiver wants to close the connection',
        'The window should double immediately',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: duplicate ACKs mean later segments arrived but the expected one didn’t; several of them trigger fast retransmit of the missing bytes.',
        'Duplicate ACKs happen precisely because data IS flowing and a gap appeared — not idleness.',
        'They signal a gap to fill, not a request to close (that’s FIN).',
        'A detected loss shrinks the window; it doesn’t double it.',
      ],
    },
  ],
}
