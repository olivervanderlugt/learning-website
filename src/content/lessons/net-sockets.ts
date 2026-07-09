import type { Lesson } from '../../types'

export const netSocketsLesson: Lesson = {
  nodeId: 'net-sockets',
  screens: [
    {
      kind: 'explain',
      title: 'A socket is a labelled doorway',
      body: [
        'The protocols were theory; a SOCKET is where your program actually plugs in. It’s an endpoint named by an IP address plus a PORT number (like an apartment building’s street address plus a flat number), and your code reads and writes it much like a file.',
        'The pattern is client–server: a server BINDs to a port and waits (listen/accept); a client CONNECTs to that IP:port. Once joined, both just send() and recv() bytes.',
        'Every ROS node, camera stream and web request your robot makes rides on exactly this.',
      ],
      links: [{ nodeId: 'net-protocols', label: 'Recap: the protocols above sockets' }],
    },
    {
      kind: 'predict',
      question:
        'A TCP connection is a reliable, ordered STREAM of bytes — like a pipe. Your program calls send("hello") then send("world"). On the other side you call recv() once. What might you get?',
      options: [
        'Possibly "helloworld" in one go — TCP preserves bytes and order, but NOT your message boundaries',
        'Exactly "hello", guaranteed — each send is its own recv',
        'Exactly "world" — recv returns the latest send',
        'An error — you must recv after every send',
      ],
      correctIndex: 0,
      reveal:
        'TCP guarantees every byte arrives, in order, exactly once — but it has no idea where one “message” ends and the next begins. Two sends can merge into one recv, or one send can split across two recvs. The stream is just bytes. So YOU must add message boundaries — the usual trick is to prefix each message with its length, then read that many bytes. (UDP is the opposite: it keeps each datagram whole, but may lose or reorder them.)',
    },
    {
      kind: 'explain',
      title: 'Framing the stream',
      body: [
        'Since TCP won’t mark boundaries, we FRAME: write one length byte, then that many payload bytes. To read, take the length, slice that many bytes, then jump PAST both to the next frame.',
        'Example stream “5hello3abc4beep”: length 5 → “hello”, then skip 1+5 = 6 to the “3”, length 3 → “abc”, skip 1+3, length 4 → “beep”.',
        'The one line that matters is the jump: advance the cursor by 1 (the length byte) plus the payload length. Miss it and you re-read garbage forever. Code it.',
      ],
      deeper: [
        'Real framing uses a fixed-width length header (e.g. 4 bytes, big-endian) so messages can be longer than 9 bytes — the single-digit version here is just to keep the arithmetic visible.',
        'This “bytes, not messages” reality is why libraries exist: ROS’s transport, HTTP’s Content-Length header, and Protobuf’s varint prefixes are all solving exactly this boundary problem so you don’t hand-roll it each time.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Parse the length-prefixed stream into messages. Fix the cursor advance so it steps PAST the length byte AND the payload (1 + len). Expected: hello, abc, beep on three lines.',
      starter: `const stream = '5hello3abc4beep'
let i = 0
while (i < stream.length) {
  const len = Number(stream[i])          // the length byte
  const msg = stream.slice(i + 1, i + 1 + len)
  print(msg)
  i = i + len                            // <-- fix: also skip the length byte
}`,
      expected: `hello
abc
beep`,
      hint: 'You consumed len payload bytes PLUS 1 length byte, so advance by 1 + len: i = i + 1 + len.',
      success:
        'Advancing by exactly 1 + len lands the cursor on the next length byte every time. Forget the “+ 1” and it re-reads a payload byte as a length and the parse derails — the classic framing bug. TCP gives you bytes; framing gives you messages.',
    },
    {
      kind: 'explain',
      title: 'TCP or UDP — pick your guarantee',
      body: [
        'Two socket types sit on the same wire. TCP is the reliable ordered stream: it retransmits losses and hides them from you — perfect for files, web pages, config. The price is latency: a lost packet stalls everything behind it until it’s resent.',
        'UDP is fire-and-forget datagrams: each message stays whole, but may be lost, duplicated or reordered, and nothing waits. That’s exactly what a control loop, live video or a robot’s pose stream wants — a fresh reading now beats a perfect reading late.',
        'The engineering question is never “which is better” but “which failure can I tolerate — loss, or delay?”',
      ],
      deeper: [
        'ROS 2 runs on DDS, which is built on UDP precisely so real-time data isn’t held hostage by TCP’s retransmit-and-wait. It layers its OWN reliability options on top, per-topic: “reliable” for commands, “best-effort” for high-rate sensor streams.',
        'A subtle TCP trap for robots: Nagle’s algorithm batches tiny sends to save bandwidth, adding milliseconds of delay. Latency-sensitive code disables it (TCP_NODELAY). When your teleop feels laggy, this is a usual suspect.',
      ],
      links: [{ nodeId: 'net-protocols', label: 'MQTT/HTTP: protocols built on these sockets' }],
    },
    {
      kind: 'quiz',
      question: 'What does a socket actually identify?',
      options: [
        'A communication endpoint = an IP address plus a port number',
        'A physical network cable',
        'A single fixed message',
        'The Wi-Fi password of the network',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: IP picks the machine, port picks the program/endpoint on it. Your code reads and writes that endpoint like a file.',
        'The cable is layers below — a socket is a software endpoint that works identically over Wi-Fi, Ethernet or loopback.',
        'A socket is the ongoing channel, not one message — many messages flow through it.',
        'Credentials are unrelated; a socket is just an addressable endpoint.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two send() calls on a TCP socket arrived as a single recv(). Is this a bug?',
      options: [
        'No — TCP is a byte stream with no message boundaries; merging (or splitting) sends is normal, so you must frame messages yourself',
        'Yes — each send must map to exactly one recv',
        'Yes — the network dropped a packet',
        'No — but only because the messages were short',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: TCP preserves bytes and order, not your call boundaries. Length-prefixing (or a delimiter) is how you recover messages.',
        'There is no 1-to-1 rule — send/recv boundaries are independent by design.',
        'Nothing was dropped — all bytes arrived; they were just delivered in one read.',
        'Length is irrelevant to the guarantee — even long messages can merge or split at any boundary.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot streams 200 Hz joint-state readings to a monitoring dashboard. TCP or UDP, and why?',
      options: [
        'UDP — a dropped reading is instantly replaced by the next; TCP’s retransmit-and-wait would add stale lag',
        'TCP — every single reading must be delivered even if late',
        'TCP — UDP cannot carry sensor data',
        'Neither — high-rate data must use a database',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: freshness beats completeness for a live stream. Losing one of 200 readings per second is invisible; a TCP stall to resend it is not.',
        'Guaranteed delivery is the wrong goal here — a re-sent reading arrives already obsolete, behind newer data.',
        'UDP carries any bytes fine — it just doesn’t guarantee delivery, which is acceptable for a stream.',
        'A database is for storage, not the live transport — the choice on the wire is still TCP vs UDP.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does length-prefix framing work when a raw byte stream doesn’t self-delimit?',
      options: [
        'The length tells the reader exactly how many bytes this message has, so it knows where the next one begins',
        'It compresses the data so messages fit in one packet',
        'It encrypts the boundaries so they can’t be lost',
        'It forces each message into its own TCP segment',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read the count, take that many bytes, and the very next byte starts the next frame — boundaries reconstructed from a stream that had none.',
        'Framing isn’t compression; it adds a few header bytes, it doesn’t shrink the payload.',
        'It’s about delimiting, not secrecy — no encryption is involved.',
        'TCP still segments however it likes; framing works at the application layer, independent of segment boundaries.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'In the client–server pattern, which side calls bind()/listen()/accept(), and which calls connect()?',
      options: [
        'The server binds to a known port and listens/accepts; the client connects to that IP:port',
        'The client binds and listens; the server connects to find it',
        'Both call accept(); whoever is faster wins',
        'Neither — TCP connects automatically with no code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the server publishes a fixed address (bind + listen) and waits (accept); the client initiates (connect). That asymmetry is the whole model.',
        'Reversed: a client can’t be found at a well-known port it never advertised — the server is the one that waits.',
        'accept() is the server’s wait-for-a-client call; a client never accepts.',
        'The three-way handshake happens under connect()/accept() — your code still has to make those calls.',
      ],
    },
    {
      question: 'UDP keeps each datagram whole but may lose or reorder them; TCP delivers every byte in order but can stall. A file transfer should use…',
      options: [
        'TCP — a file is useless with missing or reordered bytes, and it can tolerate the occasional wait',
        'UDP — files need the lowest possible latency',
        'Either — the choice never matters for files',
        'UDP — because files are large',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: correctness dominates for a file; a single missing byte corrupts it. Delay is acceptable, loss is not — that’s TCP’s exact trade.',
        'Latency is irrelevant for a file that must arrive intact; UDP’s losses would corrupt it.',
        'It matters a lot — UDP would deliver a scrambled, incomplete file.',
        'Size doesn’t change the need for every byte to arrive correctly.',
      ],
    },
    {
      question: 'Your teleop commands over TCP feel laggy in tiny bursts. Which mechanism is a likely culprit, and what’s the fix?',
      options: [
        'Nagle’s algorithm batches small sends to save bandwidth; disable it with TCP_NODELAY for latency-sensitive traffic',
        'The socket is using UDP; switch to TCP',
        'The port number is too high; use a lower one',
        'Framing is missing; add a checksum',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Nagle holds small packets briefly to coalesce them, trading milliseconds of delay for efficiency — the wrong trade for interactive control. TCP_NODELAY turns it off.',
        'TCP is already the reliable choice here; the lag is from batching, not the protocol pick.',
        'Port numbers don’t affect latency — any valid port behaves the same.',
        'A checksum doesn’t address delay; TCP already checksums. The issue is send batching.',
      ],
    },
    {
      question: 'ROS 2 uses DDS over UDP rather than TCP for its default transport. Why does that design make sense?',
      options: [
        'UDP avoids TCP’s retransmit-and-wait so real-time data isn’t delayed; DDS adds its own per-topic reliability where it’s actually needed',
        'UDP is always faster and more reliable than TCP',
        'DDS cannot run over TCP at all',
        'TCP is not supported on Linux',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: robots need bounded latency, so building on UDP and layering optional reliability per topic (reliable commands, best-effort sensor floods) fits the workload precisely.',
        'UDP isn’t “more reliable” — it drops packets; it’s chosen for latency, with reliability added selectively.',
        'DDS can use various transports; the DEFAULT is UDP for latency, not an inability to use TCP.',
        'TCP works everywhere — the choice is about real-time behavior, not OS support.',
      ],
    },
  ],
}
