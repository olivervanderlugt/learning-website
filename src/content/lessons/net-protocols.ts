import type { Lesson } from '../../types'

export const netProtocolsLesson: Lesson = {
  nodeId: 'net-protocols',
  screens: [
    {
      kind: 'explain',
      title: 'The top of the stack: conversations',
      body: [
        'TCP gives you a reliable byte pipe. But bytes of WHAT? Application protocols define the conversation: who speaks first, in what format, meaning what.',
        'HTTP — the web’s protocol — is a simple script: client sends a REQUEST (“GET /map.pdf”), server sends a RESPONSE (status code + the data). Stateless: each request stands alone.',
        'That request/response shape fits fetching documents beautifully. It fits “tell me the INSTANT the sensor fires” terribly — and that mismatch is why other protocols exist.',
      ],
      links: [{ nodeId: 'net-stack', label: 'Refresher: what TCP provides' }],
    },
    {
      kind: 'predict',
      question: 'Your dashboard must show a robot’s battery level “live” using pure HTTP request/response. What’s the least-bad way, and its flaw?',
      options: [
        'Ask over and over (“battery? battery?”) — polling again, wasting requests and still lagging half an interval',
        'One request that the server answers a thousand times',
        'HTTP pushes changes to you automatically',
        'Impossible — HTTP can’t carry numbers',
      ],
      correctIndex: 0,
      reveal:
        'In plain HTTP the server CANNOT speak first — it only answers. So the client polls every N seconds: mostly redundant answers, and news still arrives on average N/2 late. Recognize this? It’s the CPU’s polling-vs-interrupts problem from the OS domain, reborn at network scale. The cure has the same shape: subscribe once, get notified — which is exactly MQTT.',
    },
    {
      kind: 'explain',
      title: 'Publish/subscribe: the network’s interrupt',
      body: [
        'MQTT flips the model: devices PUBLISH messages to named topics (“robot7/battery”) on a central BROKER; anyone SUBSCRIBED gets each message pushed instantly. Nobody polls; nobody even knows who’s listening.',
        'It was designed (1999, for oil pipelines) to be tiny: a few bytes of overhead, fine on weak radios and microcontrollers. That’s why it became the standard language of IoT and robot fleets.',
        'Decoupling is the superpower: add a new dashboard, logger or alarm by subscribing — zero changes to the robots publishing.',
      ],
      deeper: [
        'MQTT offers delivery levels (QoS): 0 = fire-and-forget (telemetry — fresh beats complete, the UDP philosophy), 1 = at-least-once (commands — but duplicates possible, receivers must tolerate replays), 2 = exactly-once (billing-grade, slowest). Choosing per topic is a real design task.',
        'A broker is a single point of failure — production fleets run redundant brokers or accept the risk consciously. There’s also a “last will”: the broker announces a device’s death (connection lost) to a topic — heartbeat monitoring built into the protocol.',
        'ROS 2 (your robotics lesson) uses the same pub/sub PATTERN via DDS: topics, publishers, subscribers — discovery is peer-to-peer instead of brokered, but the mental model transfers one-to-one. Learn pub/sub once, use it everywhere.',
      ],
      links: [{ nodeId: 'robo-ros', label: 'Pub/sub inside the robot: ROS' }],
    },
    {
      kind: 'predict',
      question: 'Your fleet’s 40 robots each publish battery status every second. Tomorrow you add an “alert if any battery < 10%” service. With MQTT, what changes on the robots?',
      options: [
        'Nothing — the alert service just subscribes to the existing topics',
        'Each robot needs the alert service’s address added',
        'Each robot must open a second connection to the alerter',
        'The broker must be replaced with a bigger one',
      ],
      correctIndex: 0,
      reveal:
        'Publishers name TOPICS, not recipients — so consumers can appear, multiply or vanish without the publishers ever knowing. Compare the HTTP version: every robot would need the alerter’s URL configured, retry logic, the works. This decoupling is why pub/sub dominates machine-to-machine systems — and it’s the same “abstraction boundary” lesson the network stack already taught you.',
    },
    {
      kind: 'quiz',
      question: 'HTTP’s fundamental interaction pattern is…',
      options: [
        'Client requests, server responds — the server never speaks unprompted',
        'Both sides publish to shared topics',
        'The server continuously streams to all clients',
        'Peer-to-peer with no roles',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: request → response, stateless, client-initiated. Perfect for documents, awkward for live events.',
        'That’s pub/sub (MQTT’s model) — a different protocol family.',
        'Streaming extensions exist (SSE, WebSockets) precisely BECAUSE base HTTP can’t push.',
        'HTTP has hard roles: one asks, one answers.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In MQTT, a robot publishing “robot7/battery: 43%” knows about its subscribers…',
      options: [
        'Nothing at all — it names a topic; the broker handles who’s listening',
        'Their full list of IP addresses',
        'Only how many there are',
        'Their authentication passwords',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: total decoupling — that’s what lets dashboards and alert services come and go without touching robot code.',
        'Address bookkeeping is exactly what pub/sub deletes from the publisher’s life.',
        'Not even the count — zero or a thousand subscribers, same publish.',
        'Authentication is between each client and the BROKER, never peer-to-peer.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Polling every 5 seconds vs subscribing, for a “door opened” sensor event. The subscription wins because…',
      options: [
        'News arrives instantly instead of up to 5 s late, with no wasted “nothing yet” traffic',
        'Subscriptions make the sensor more accurate',
        'Polling can’t carry sensor data',
        'Subscribing uses more bandwidth, which is better',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same trade as CPU interrupts vs polling — latency AND efficiency. One idea, two domains; that’s the sign of a deep pattern.',
        'The sensor reads the same — delivery timing is what changes.',
        'Polling carries data fine; it’s just late and wasteful.',
        'Less bandwidth, and that’s a benefit, not a cost.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which MQTT QoS level fits 100 Hz position telemetry, and why?',
      options: [
        'QoS 0 (fire-and-forget) — a lost reading is instantly superseded; retransmission would only add delay',
        'QoS 2 (exactly-once) — position is important, so maximum guarantees',
        'QoS 1 — duplicates make positions more precise',
        'Telemetry shouldn’t use MQTT at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the fresh-beats-complete principle again (UDP’s logic, now at the application layer). Reserve heavier QoS for commands and events that must not vanish.',
        'Exactly-once handshaking on every 10 ms sample adds latency for data that expires in 10 ms — importance ≠ needs-retransmission.',
        'A duplicate position is noise to be ignored, not extra precision.',
        'Telemetry is MQTT’s home turf — the design question is just the QoS.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The broker’s “last will” feature lets your fleet detect that robot7 crashed because…',
      options: [
        'The broker itself publishes robot7’s pre-registered death notice when the connection drops',
        'robot7 sends a goodbye message after crashing',
        'Subscribers ping robot7 every second',
        'The broker reboots robot7 automatically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the will is registered at connect time; the BROKER announces it on connection loss — a dead device can’t speak, so someone else must. Health monitoring from the protocol itself.',
        'Crashed devices don’t send anything — that’s the whole problem the will solves.',
        'That would be polling with extra steps — the broker already knows the connection state.',
        'Brokers route messages; recovery actions are up to your subscribers.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'HTTP status codes: your dashboard requests /api/battery and gets 404. Meaning?',
      options: [
        'The server is alive but that resource doesn’t exist — likely a wrong path',
        'The network cable is unplugged',
        'The battery is at 40.4%',
        'The request succeeded',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 404 = “not found” — an APPLICATION-level answer, which proves the network and server work; your URL doesn’t. (200 = success, 500 = server crashed while answering.)',
        'A dead cable gives no response at all — an error code IS a response.',
        'Status codes are protocol vocabulary, never data values.',
        'That’s 200. The 4xx family means “your request has a problem”.',
      ],
    },
    {
      question: 'Why do pub/sub COMMANDS (QoS 1, at-least-once) require receivers to tolerate duplicates?',
      options: [
        'A lost acknowledgment makes the sender retransmit a command that DID arrive — “open gripper” may show up twice',
        'The broker duplicates everything for backup',
        'Duplicates only happen with broken hardware',
        'They don’t — QoS 1 is exactly-once',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at-least-once means retry-until-acknowledged, and acks can be lost too. Design commands to be idempotent (“set gripper to open”) rather than incremental (“toggle gripper”) — same robustness rule as retried database writes.',
        'No deliberate duplication — it’s a retry artifact of the guarantee.',
        'Healthy networks lose acks routinely; duplicates are normal operation.',
        'Exactly-once is QoS 2 — costlier handshaking is precisely what you’re avoiding at QoS 1.',
      ],
    },
  ],
}
