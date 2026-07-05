import type { Lesson } from '../../types'

export const netPacketsLesson: Lesson = {
  nodeId: 'net-packets',
  screens: [
    {
      kind: 'explain',
      title: 'Chop it up',
      body: [
        'The internet doesn’t send your file — it sends thousands of PACKETS: chunks of ~1,500 bytes, each carrying source address, destination address, and a piece of your data.',
        'Each packet travels INDEPENDENTLY: routers along the way read the destination and forward it one hop closer, like a bucket brigade reading postcards.',
        'Two packets from the same file may take different roads and arrive out of order. That’s allowed — reassembly is the endpoint’s job.',
      ],
      links: [{ nodeId: 'net-stack', label: 'Refresher: The Network Stack' }],
    },
    {
      kind: 'predict',
      question: 'Why packets instead of one continuous connection per conversation (like old telephone lines)?',
      options: [
        'Packets share every wire among thousands of conversations and route around failures — circuits waste capacity and die with their path',
        'Packets travel faster than electricity in a circuit',
        'Continuous connections are physically impossible',
        'It was cheaper to invent',
      ],
      correctIndex: 0,
      reveal:
        'A phone circuit reserved a full path even during silence — and one cut cable killed the call. Packets fill every gap with other people’s traffic (statistical multiplexing) and reroute around dead links mid-conversation. This resilience was a founding goal of the ARPANET design. The cost: no reserved path means variable delay and possible loss — which TCP then repairs.',
    },
    {
      kind: 'explain',
      title: 'Routing: hop by hop, no map of the world',
      body: [
        'No router knows the whole internet. Each keeps a ROUTING TABLE: “addresses like 172.16.x.x → send out port 3”. It matches the destination, forwards, done — microseconds per packet.',
        'Tables are built by routers gossiping with neighbors (routing protocols): “I can reach these networks in N hops”. Paths emerge from local knowledge — nobody is in charge.',
        'Sound familiar? It’s your graph lesson at planetary scale: routers = nodes, links = edges, routing ≈ distributed shortest-path.',
      ],
      deeper: [
        'Every IP packet carries a TTL (time-to-live) counter, decremented at each hop; at zero it’s discarded. Why: a routing loop would otherwise circulate packets forever, melting the network. TTL is a self-destruct against infinite loops — the distributed-systems version of a watchdog timer.',
        'The `traceroute` tool abuses TTL beautifully: send packets with TTL=1, 2, 3… and each router that discards one sends back “expired here” — mapping the actual path your data takes, hop by hop. Try it on any machine.',
        'IP addresses are hierarchical like postal addresses (network part, then host part) — that’s what keeps routing tables small: routers match PREFIXES (“anything starting 172.16 goes left”), not individual machines. A flat address space would need billions of entries in every router.',
      ],
      links: [{ nodeId: 'algo-graphs', label: 'The math underneath: Graphs & Pathfinding' }],
    },
    {
      kind: 'predict',
      question: 'Packet #7 of your robot’s command stream is dropped by a congested router. With TCP in charge, what does the robot actually experience?',
      options: [
        'A brief stall: packets 8-10 wait in a buffer until #7 is retransmitted and slots into place',
        'Commands 8-10 execute and #7 is skipped forever',
        'The whole connection resets from zero',
        'The robot receives #7 twice as an apology',
      ],
      correctIndex: 0,
      reveal:
        'TCP promises an ORDERED stream, so it holds later packets hostage until the missing one is resent (~one round-trip later). That stall is called head-of-line blocking — the hidden price of orderliness, and exactly why the previous lesson said real-time control often prefers UDP: for a joystick, a 200 ms-old command is worse than a lost one.',
    },
    {
      kind: 'quiz',
      question: 'What does every IP packet carry, at minimum?',
      options: [
        'Source address, destination address, and a chunk of data',
        'The full route it will take, precomputed',
        'The name of every router on the path',
        'A copy of the entire file',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the postcard model — who from, who to, and a payload piece (plus bookkeeping like TTL).',
        'No route inside: each router decides the next hop on the spot. That’s what makes rerouting possible.',
        'Packets don’t know their path — routers don’t even know it beyond the next hop.',
        'A packet holds ~1,500 bytes — one shard, reassembled at the end.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A router forwards a packet by…',
      options: [
        'Matching the destination against its routing table and sending it out the corresponding port — one hop’s worth of decision',
        'Reading the message content to understand it',
        'Consulting a live map of the entire internet',
        'Broadcasting it everywhere at once',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: prefix match → out the port → next packet. Dumb, local, microseconds — that simplicity is why the core scales.',
        'Routers never look at your data — only the addressing header (dumb middle, by design).',
        'No such map exists — global paths EMERGE from local tables built by neighbor gossip.',
        'Flooding every packet would melt the network — broadcast is reserved for rare special cases.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The TTL counter on every packet exists to…',
      options: [
        'Kill packets stuck in routing loops before they circulate forever',
        'Encrypt the payload gradually',
        'Tell the receiver how fresh the data is',
        'Limit the file size being sent',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: decrement per hop, discard at zero — a self-destruct that turns a potential network meltdown into a few lost packets (which TCP resends).',
        'TTL is a plain counter, no cryptography involved.',
        'It counts HOPS, not time — freshness tracking happens at the application layer.',
        'Size limits come from the link layer (MTU) — TTL only bounds path length.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two packets of one video call arrive out of order. Whose job is reassembly?',
      options: [
        'The endpoints’ (transport/application layer) — the network only forwards',
        'The routers must sort packets before forwarding',
        'Out-of-order arrival means the call has failed',
        'The cables reorder them physically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: sequence numbers let the receiver reorder — end-to-end principle again: smart edges, dumb middle.',
        'Routers forwarding independently (and NOT buffering to sort) is why they’re fast.',
        'Reordering is routine — different roads, different delays; the endpoint quietly fixes it.',
        'Physics doesn’t care about your sequence numbers.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your teleoperated robot feels “laggy in bursts” on a lossy WiFi link, though bandwidth is plenty. The likely culprit?',
      options: [
        'TCP head-of-line blocking — each lost packet stalls everything behind it for a retransmission round-trip',
        'The robot’s CPU is too slow',
        'IP addresses are being recalculated',
        'The commands are too small to route',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: loss + ordered delivery = periodic freezes exactly one round-trip long. Fixes: UDP-based control, or accepting the newest-state-wins design.',
        'Plenty-bandwidth bursty lag is a transport-behavior signature, not a compute one.',
        'Addresses don’t churn per packet — routing is stable at this timescale.',
        'Small packets route fine — size isn’t the issue; ORDER is.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'traceroute reveals the path your packets take by…',
      options: [
        'Sending packets with TTL 1, 2, 3… and collecting the “expired here” replies from each router in turn',
        'Asking the destination for a route map',
        'Reading the route stored inside one packet',
        'Guessing based on geography',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each deliberate expiry makes one router identify itself — the path emerges hop by hop. A diagnostic built from a safety mechanism.',
        'The destination doesn’t know the path either — only that packets arrived.',
        'Packets store no route — that’s the whole hop-by-hop design.',
        'Real paths routinely defy geography (traffic via another continent when that’s the cheap route).',
      ],
    },
    {
      question: 'Hierarchical addresses (network prefix + host) keep the internet routable because…',
      options: [
        'Routers match prefixes — one table entry covers a whole network of machines',
        'They encode each machine’s exact GPS location',
        'They prevent all address collisions automatically',
        'They make packets smaller',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “172.16.anything → left” is one entry for 65,000 hosts — like sorting mail by country then city, not by memorizing every person.',
        'No geography in the bits — hierarchy is organizational (whose network), not spatial.',
        'Collision-avoidance comes from allocation authorities, a separate mechanism.',
        'Address size is fixed — the win is table size, not packet size.',
      ],
    },
  ],
}
