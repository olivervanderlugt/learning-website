import type { Lesson } from '../../types'

export const netStackLesson: Lesson = {
  nodeId: 'net-stack',
  screens: [
    {
      kind: 'explain',
      title: 'A message is an onion',
      body: [
        'When you send “hello” across the internet, it doesn’t travel naked. Your app hands it to a stack of software layers, and each one wraps it in an envelope with its own header.',
        'Application data → wrapped with transport info (TCP) → wrapped with addressing (IP) → wrapped with local-link framing (Ethernet/WiFi). On arrival, the layers unwrap in reverse.',
        'Why layers? Each solves ONE problem and can be swapped without touching the others — WiFi to fiber, and your app never notices.',
      ],
      links: [{ nodeId: 'prog-data', label: 'Refresher: structured data' }],
    },
    {
      kind: 'code',
      prompt: 'Model the wrapping with a stack of envelopes. Add the missing IP layer, in the right position.',
      starter:
        "let packet = ['\"hello\"']         // application data\npacket.unshift('TCP: port 443')    // transport header on front\n// wrap with the network layer: 'IP: to 172.16.0.9'\n\npacket.unshift('WiFi: frame')      // link layer, outermost\n\nfor (let i = 0; i < packet.length; i = i + 1) {\n  print(packet[i])\n}",
      expected: 'WiFi: frame\nIP: to 172.16.0.9\nTCP: port 443\n"hello"',
      hint: "packet.unshift('IP: to 172.16.0.9') — between TCP and WiFi",
      success:
        'Outside-in: link frame, then IP address, then TCP port, then your data — exactly the order of a real packet on the wire. Receivers peel one layer each: the WiFi chip strips the frame, the OS routes by IP, TCP delivers to port 443, the app gets "hello".',
    },
    {
      kind: 'predict',
      question: 'Your robot switches from WiFi to a 4G modem mid-mission. How much of the software above the link layer must change?',
      options: [
        'Nothing — IP, TCP and the app ride on top, oblivious to what carries them',
        'Everything must be rewritten for cellular',
        'Only the application layer changes',
        'TCP must be replaced, the rest stays',
      ],
      correctIndex: 0,
      reveal:
        'That’s the entire payoff of layering: the link layer is swappable because the layers above only depend on its INTERFACE (“deliver these bytes one hop”), never its implementation. Same reason your lesson code runs on any CPU: abstraction boundaries. The internet is history’s largest demonstration of modular design.',
    },
    {
      kind: 'explain',
      title: 'Who does what',
      body: [
        'LINK layer: move bytes one hop (your laptop ↔ the router). IP layer: get a packet ACROSS the world, hop by hop — best effort, no promises.',
        'TRANSPORT layer (TCP): turn IP’s unreliable delivery into a reliable stream — numbering, acknowledgments, retransmission. APPLICATION layer: your actual protocol (HTTP, MQTT…).',
        'Weakness honestly stated: IP may drop, duplicate or reorder packets. Everything trustworthy about the internet is built ON TOP of an unreliable core.',
      ],
      deeper: [
        'That unreliable core is a DESIGN CHOICE (end-to-end principle): keep routers dumb and fast — just forward packets — and put intelligence at the endpoints. Dumb middles scale to billions of devices and let new applications deploy without asking the network’s permission.',
        'TCP’s reliability recipe: number every byte, acknowledge receipt, retransmit what times out, and slow down when the network looks congested. You’ll predict-and-test this in the packets lesson.',
        'There’s a sibling transport, UDP: no reliability, no ordering — just “fling it”. Sounds worse, but for a robot’s 100 Hz telemetry a LATE reading is worthless while the next one is already coming — resending old data hurts. Video calls and game state feel the same way. Reliability is a choice, not a virtue.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is networking built as independent layers?',
      options: [
        'Each layer solves one problem behind an interface, so any layer can be swapped without rewriting the rest',
        'Layers make packets physically smaller',
        'It was an accident of history',
        'Each layer encrypts the one below',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: separation of concerns at planetary scale — WiFi→4G, IPv4→IPv6, HTTP/1→HTTP/3 each happened without rebuilding the rest.',
        'Headers make packets slightly BIGGER — the price of modularity.',
        'It was deliberate architecture (1970s ARPANET lessons, formalized in TCP/IP).',
        'Encryption exists at specific layers (TLS, WPA) but isn’t what layering IS.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which layer is responsible for getting a packet across the world, and what does it promise?',
      options: [
        'IP — and it promises only best effort: packets may drop, duplicate or arrive out of order',
        'TCP — it guarantees global delivery physically',
        'WiFi — it spans the planet directly',
        'HTTP — it moves the actual bytes across cables',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: IP routes hop-by-hop toward the destination address with NO delivery guarantee — the honest, scalable core.',
        'TCP creates reliability END-TO-END, but it rides on IP; it moves nothing by itself.',
        'WiFi is one-hop (you ↔ access point) — the link layer.',
        'HTTP is an application protocol — the topmost passenger, not the vehicle.',
      ],
    },
    {
      kind: 'quiz',
      question: 'TCP turns unreliable IP into a reliable stream by…',
      options: [
        'Numbering data, acknowledging receipt, and retransmitting whatever isn’t confirmed in time',
        'Using special guaranteed-delivery cables',
        'Sending every packet three times up front',
        'Asking routers to promise delivery',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: sequence numbers + ACKs + timeouts + retransmission — reliability as a protocol, not a property of the wires.',
        'Same cables as everything else — the guarantee is bookkeeping, not hardware.',
        'Blind triplication wastes bandwidth and still can’t guarantee — TCP resends only what’s actually missing.',
        'Routers stay dumb on purpose (end-to-end principle) — the endpoints do the work.',
      ],
    },
    {
      kind: 'quiz',
      question: 'For your robot’s 100 Hz telemetry stream, UDP (no retransmission) is often BETTER than TCP because…',
      options: [
        'A late reading is worthless once the next one exists — retransmitting stale data adds delay for nothing',
        'UDP packets are immune to loss',
        'TCP cannot carry sensor data',
        'UDP is encrypted by default',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for fresh-beats-complete data (telemetry, video, game state), TCP’s dutiful resending of old readings just delays the new ones. Choose the transport per data’s nature.',
        'UDP loses packets just as much — it simply doesn’t stall to fix it.',
        'TCP carries anything; it’s the STALLING on loss that hurts real-time streams.',
        'Neither is encrypted by default — that’s TLS/DTLS on top.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Teleoperating your robot from a browser, the joystick command crosses roughly:',
      options: [
        'App → TCP → IP → link, across each hop, then link → IP → TCP → app on the robot — wrapped, shipped, unwrapped',
        'One direct wire from browser to robot',
        'Only the application layer, since both ends run apps',
        'The layers only matter for downloads, not commands',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: down the stack on your side, hop-by-hop through the middle, up the stack on the robot — the onion wrapped and peeled, twice per round trip.',
        'No direct wires on the internet — every path is a chain of forwarding hops.',
        'Apps at both ends still need transport, addressing and links between them.',
        'EVERY byte crossing the network takes this trip, joystick twitches included.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'The end-to-end principle keeps routers “dumb” because…',
      options: [
        'Simple forwarding scales to billions of devices, and new applications need no network upgrades',
        'Router vendors couldn’t build smart ones',
        'Smart routers would be illegal',
        'Dumb routers are more secure by definition',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: intelligence at the endpoints means the middle stays fast, cheap and generic — the web, video calls and robot fleets all deployed without touching routers.',
        'Vendors build plenty of smarts (firewalls, QoS) — the CORE design principle still favors dumb-and-fast forwarding.',
        'A design philosophy, not regulation.',
        'Security is genuinely an endpoint job here, but that’s a consequence, not the definition.',
      ],
    },
    {
      question: 'IPv4 → IPv6 changed the addressing layer while apps kept working, because…',
      options: [
        'Layers above IP depend on its interface (send to address), not its address format internals',
        'IPv6 is secretly the same as IPv4',
        'All apps were rewritten overnight',
        'Addresses aren’t used in real networks',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: modularity in action again — the OS swaps the IP implementation; sockets look the same to the app.',
        'IPv6 addresses are 4× larger and differently structured — a real replacement of the layer.',
        'The transition took decades precisely so that nothing had to change overnight.',
        'Every packet carries source and destination addresses — routing depends on them completely.',
      ],
    },
  ],
}
