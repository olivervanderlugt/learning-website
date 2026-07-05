import type { Lesson } from '../../types'

export const netExamLesson: Lesson = {
  nodeId: 'net-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — the whole network in ten questions',
      body: [
        'Ten questions spanning the whole domain — layers, packets, protocols — all NEW, no repeats from the lesson quizzes. No notes: retrieval from memory is the point.',
        'Score 80% and Networks is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your drone streams video to base over WiFi. A packet sniffer captures one packet mid-air. Reading it from the outside in, what does it see?',
      options: [
        'WiFi frame, then the IP header, then the transport header, then the video bytes',
        'The video bytes first — data goes in front so it arrives sooner',
        'The IP header outermost — routers must find the address first',
        'All the headers merged into one combined header',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the onion, outermost skin first — the link frame wraps IP, which wraps transport, which wraps your data. Each receiver peels exactly one layer.',
        'Wire order is wrapping order, not urgency — the data sits innermost because it was wrapped FIRST, and the whole packet arrives together anyway.',
        'Routers do read IP, but each hop’s link frame is outermost — the router strips it, reads IP, then wraps a fresh frame for the next hop.',
        'Headers never merge — each stays separate and intact, which is exactly what lets each layer be handled (and swapped) independently.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your warehouse robot downloads a 200 MB firmware image over flaky WiFi. Dozens of packets are lost en route, yet the file arrives byte-perfect. Who fixed it?',
      options: [
        'TCP at the two endpoints — sequence numbers, acknowledgments and retransmissions patched every hole',
        'IP — it guarantees delivery of every packet',
        'The routers along the path kept copies and resent the lost ones',
        'The WiFi hardware physically prevents packet loss',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: reliability is bookkeeping at the edges — the receiver spots gaps in the sequence numbers, the sender resends until acknowledged. Unreliable core, trustworthy result.',
        'IP promises best effort only — drop, duplicate and reorder are all allowed. Everything trustworthy is built ON TOP of it.',
        'Routers forward and forget — no copies, no memory (that dumbness is why they’re fast). Resending is the sender’s job.',
        'The packets DID get lost — the fix wasn’t prevention but detection-and-resend, done in software above the radio.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You invent RoboTalk, a brand-new fleet-coordination protocol to replace HTTP. What must change in the internet’s routers before it works?',
      options: [
        'Nothing — routers only read IP headers, so a new application protocol deploys entirely at the endpoints',
        'Every router on the path needs a RoboTalk upgrade',
        'At least the routers in your own building must learn RoboTalk',
        'Routers must be told RoboTalk’s port number so they can route it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the end-to-end principle’s payoff — the dumb middle forwards packets without knowing what conversation they carry, so new applications launch without asking the network’s permission. The web itself deployed this way.',
        'That would freeze innovation forever — routers never inspect the application layer, precisely so this is never needed.',
        'Even your local routers just forward by IP — RoboTalk lives only in the two endpoint programs.',
        'Ports are transport-layer addressing, read by the endpoints’ operating systems — routers choose paths by IP address alone.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A core router in Amsterdam handles one of your teleoperation packets. What does it actually read and change?',
      options: [
        'It reads the destination IP, decrements the TTL, and forwards — it never looks at your joystick data',
        'It reads the joystick command to judge how urgent the packet is',
        'It rewrites the destination address to point at the next router',
        'It reads nothing — it copies every packet out of all its ports',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: match the destination against the table, TTL minus one, out the right port — microseconds, zero curiosity about the payload. Dumb middle, by design.',
        'Routers never open the payload — content-blind forwarding is what keeps them fast and the network general-purpose.',
        'The destination stays fixed (the final target) for the whole trip — the router picks the next HOP from its table; it doesn’t re-address the packet.',
        'Flooding everything everywhere would melt the network — forwarding is a targeted table lookup, one packet at a time.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A packet leaves your laptop with TTL 64 and reaches the robot with TTL 58. What do you now know about the path?',
      options: [
        'It crossed 6 routers — each hop decremented the TTL by one',
        'The trip took 58 milliseconds',
        '6 packets were lost along the way',
        'The path is 58 hops long',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 64 − 58 = 6 decrements = 6 forwarding hops. Traceroute builds its entire map out of exactly this arithmetic.',
        'TTL counts hops, not time — a misnomer that stuck. Latency gets measured separately.',
        'This packet ARRIVED — its TTL says nothing about lost siblings, only how many routers this one passed.',
        '58 is what’s LEFT in the budget, not what was spent — hops taken are the difference from the starting value.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your gateway’s routing table reads: “10.4.x.x → port 1” and “everything else → port 3”. A packet for 10.4.7.200 arrives. What happens?',
      options: [
        'Out port 1 immediately — 10.4.7.200 matches the 10.4.x.x prefix; no exact entry is needed',
        'Out port 3 — the table has no entry for 10.4.7.200 specifically',
        'The router first queries the destination machine for directions',
        'The router holds the packet until an exact-match entry gets added',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: prefix matching — one entry covers every machine in the 10.4 network, like sorting mail by city instead of memorizing every resident. That’s what keeps tables small and lookups fast.',
        'The catch-all is only for addresses NO prefix covers — 10.4.7.200 starts with 10.4, so the specific entry claims it.',
        'Forwarding is a local table lookup in microseconds — no per-packet conversations, or the internet would crawl.',
        'Tables would need billions of exact entries — prefixes exist precisely so a router never needs one per machine.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Mid-mission, a digger cuts a fiber link on the path between you and your delivery robot. The video feed freezes for two seconds, then carries on. How?',
      options: [
        'Routers detected the dead link and updated their tables — later packets were simply forwarded along a different road',
        'A backup circuit reserved at connection time took over',
        'TCP retransmissions repaired the physical link',
        'Impossible — a cut on the path always kills the connection',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: packets travel independently and paths emerge from local tables, so the network routes AROUND damage — resilience was a founding goal of the design. The freeze was routing converging plus TCP resending what fell in the gap.',
        'No path is ever reserved — that’s the telephone-circuit model packet switching replaced. The detour was found on the fly.',
        'TCP resends DATA over whatever path IP currently offers — it can’t touch hardware. Its retransmissions succeeded because routing had already found the detour.',
        'That was true of phone circuits — and exactly the fragility packet switching was invented to eliminate.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your inspection drone sends two streams: live 30 fps video for the pilot, and the final 4K photo set for the report. Best transport pairing?',
      options: [
        'UDP for the live video, TCP for the photo set — freshness for one, completeness for the other',
        'TCP for both — reliability is always worth having',
        'UDP for both — drones need maximum speed everywhere',
        'TCP for the video, UDP for the photos — video matters more',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a late video frame is garbage once the next one exists (never stall to resend it), while a photo set with holes is useless (every byte must arrive). Pick the transport per the data’s nature.',
        'For live video, TCP’s stall-on-loss means bursty freezes — the pilot flies blind for a full round-trip every time a packet drops.',
        'Lose packets from the photo files with nobody resending and they arrive corrupted — the report needs TCP’s bookkeeping.',
        'Backwards on both — importance isn’t the axis. Ask whether STALE data still has value: for video no, for files yes.',
      ],
    },
    {
      kind: 'quiz',
      question: '200 delivery robots must report each “package delivered” event to billing, the customer app, and analytics — and marketing wants a feed next month. Best architecture?',
      options: [
        'Each robot publishes the event once to a broker topic; every service subscribes — new consumers need zero robot changes',
        'Each robot sends three separate HTTP requests, one per service — a fourth gets added for marketing later',
        'Each service polls all 200 robots on a schedule',
        'The broker polls each robot and forwards whatever it finds to the services',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: publishers name TOPICS, not recipients — marketing subscribes next month and not one robot gets reflashed. Decoupling is pub/sub’s superpower for fleets.',
        'Works today, but every new consumer means reconfiguring and redeploying 200 robots — exactly the coupling pub/sub deletes.',
        '600 requests per polling round, mostly answering “nothing yet”, and news still arrives late — polling’s double tax at fleet scale.',
        'Brokers don’t poll — devices PUSH to the broker the moment an event happens; the broker only fans messages out to subscribers.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You’re wiring the fleet’s emergency-stop broadcast over MQTT. Which delivery design is right?',
      options: [
        'QoS 1 (at-least-once) with an idempotent “set state: stopped” command — losing it is unacceptable, a duplicate is harmless',
        'QoS 0 (fire-and-forget) — an e-stop must have zero overhead',
        'Any QoS — TCP underneath already guarantees delivery',
        'Publish it 50 times at QoS 0 and trust that one lands',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: messages that must not vanish get acknowledgment-and-retry, and phrasing the command as “set stopped” (not “toggle”) turns a duplicate from a bug into a shrug.',
        'QoS 0 messages can vanish silently — the e-stop is the one message the fleet can’t afford to lose. Milliseconds of ack overhead beat a robot that never stops.',
        'TCP protects a live connection’s byte stream, but if a robot’s link drops mid-delivery, a QoS 0 message dies with it — QoS adds acknowledgment ABOVE the transport, surviving reconnects.',
        'Blind repetition still confirms nothing — QoS 1 retries until acknowledged, which is both cheaper and an actual guarantee.',
      ],
    },
  ],
}
