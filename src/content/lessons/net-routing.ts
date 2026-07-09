import type { Lesson } from '../../types'

export const netRoutingLesson: Lesson = {
  nodeId: 'net-routing',
  screens: [
    {
      kind: 'explain',
      title: 'Is it local, or far away?',
      body: [
        'Before a machine sends a packet it asks one question: is the destination on MY subnet (deliver directly) or elsewhere (hand it to the gateway/router)? Everything about local networking hangs off that decision.',
        'A subnet is defined by a MASK. The mask splits an IP into a NETWORK part (shared by everyone local) and a HOST part (unique per machine). Two addresses are on the same subnet when their network parts match — computed with a bitwise AND.',
        'Get your robot’s IP/mask/gateway wrong and it can ping nothing — this is the single most common “why won’t it connect” bug.',
      ],
      links: [{ nodeId: 'net-tcp', label: 'Recap: the reliable stream above IP' }],
    },
    {
      kind: 'predict',
      question:
        'Two hosts share the first three octets: 10.0.0.70 and 10.0.0.120, but the mask is /26 (the last octet’s top two bits are the network part → mask value 192). Are they on the same subnet?',
      options: [
        'Yes — 70 AND 192 = 64 and 120 AND 192 = 64; same network block (64–127), so same subnet',
        'Yes — the first three octets match, so /26 doesn’t matter',
        'No — different host numbers always mean different subnets',
        'Can’t tell without the gateway address',
      ],
      correctIndex: 0,
      reveal:
        'The mask, not the dotted digits, decides. /26 makes 255.255.255.192, so only the top two bits of the last octet are “network”. 70 & 192 = 64 and 120 & 192 = 64 — identical network parts, so they’re local to each other and talk directly. But 10.0.0.200 & 192 = 192 (block 192–255): a DIFFERENT subnet, even though it shares the same first three octets. “Same first three octets” is only a /24 shortcut; the mask is the real rule.',
    },
    {
      kind: 'explain',
      title: 'The routing decision in code',
      body: [
        'A host owns its IP, a mask, and a gateway. For any destination it computes (dest AND mask) and compares it to (myIP AND mask). Equal → same subnet → deliver DIRECTLY. Different → send to the GATEWAY, which forwards onward.',
        'With my last octet 70 and mask 192: destination 120 gives 120 & 192 = 64 = my 64 → direct. Destination 200 gives 200 & 192 = 192 ≠ 64 → via gateway.',
        'Write the check. The load-bearing line is the same-subnet test: mask BOTH addresses and compare.',
      ],
      deeper: [
        'To reach a local machine, IP isn’t enough — the sender needs its hardware (MAC) address. ARP does this: “who has 10.0.0.120?” is broadcast on the LAN, and that host replies with its MAC. Only then can the frame be delivered.',
        'And where did your robot’s IP come from? Usually DHCP: on joining a network it broadcasts “I need an address”, and a DHCP server leases it an IP, mask, gateway and DNS. A fixed robot often gets a STATIC IP instead, so its address never changes between boots.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Finish the same-subnet test: mask BOTH the destination and my address, then compare. Expected: dest 120 delivers direct, dest 200 goes via gateway.',
      starter: `const myHost = 70
const mask = 192          // /26: top two bits of the last octet
const myNet = myHost & mask

for (const dest of [120, 200]) {
  const destNet = dest          // <-- fix: apply the mask (dest & mask)
  if (destNet === myNet) {
    print('dest ' + dest + ': same subnet -> deliver direct')
  } else {
    print('dest ' + dest + ': other subnet -> via gateway')
  }
}`,
      expected: `dest 120: same subnet -> deliver direct
dest 200: other subnet -> via gateway`,
      hint: 'Mask the destination the same way you masked your own address: const destNet = dest & mask.',
      success:
        'Masking both sides and comparing is the entire local-vs-remote decision. Skip the “& mask” (the starter) and 120 ≠ 70 makes even a local host look remote — every packet would detour through the gateway, or fail. The mask, not the raw number, defines the neighborhood.',
    },
    {
      kind: 'explain',
      title: 'Now choose your transport, on purpose',
      body: [
        'Put it together for a real robot on a LAN. Addressing (IP/mask/gateway, via DHCP or static) gets packets to the right machine; ARP resolves the local MAC; the router handles anything off-subnet.',
        'Then the transport question from the sockets lesson returns with teeth: reliable-but-can-stall TCP for commands and config you must not lose, versus fresh-but-lossy UDP for the 100–1000 Hz sensor and control streams where a late packet is worse than a lost one.',
        'A working robot uses BOTH at once — TCP where correctness rules, UDP where latency rules — over the same little network you just learned to reason about.',
      ],
      deeper: [
        'NAT is why your robot’s 10.x or 192.168.x address works on your LAN but isn’t reachable from the public internet: the router rewrites private addresses to one shared public IP and back. Great for security-by-default, a headache for remote access (hence port-forwarding and VPNs).',
        'A robotics gotcha: multicast (one sender, many listeners) is how DDS/ROS 2 discovers peers — and many Wi-Fi access points quietly drop or throttle multicast. A robot that finds its nodes over Ethernet but not over Wi-Fi is often hitting exactly this.',
      ],
      links: [{ nodeId: 'net-sockets', label: 'TCP vs UDP: the transport trade' }],
    },
    {
      kind: 'quiz',
      question: 'What does a subnet mask actually do to an IP address?',
      options: [
        'Splits it into a network part (shared by the local subnet) and a host part (unique per machine)',
        'Encrypts the address so outsiders can’t read it',
        'Assigns the address automatically at boot',
        'Converts the address to a MAC address',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the mask’s 1-bits mark the network portion; ANDing an IP with the mask yields its network, and matching networks means same subnet.',
        'Masks don’t encrypt anything — they’re a purely structural split of the address bits.',
        'That’s DHCP’s job; the mask defines subnet structure, it doesn’t hand out addresses.',
        'IP and MAC are different layers; ARP maps between them, not the mask.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Host 10.0.0.70 with mask /26 (255.255.255.192) wants to reach 10.0.0.200. Direct delivery or via the gateway?',
      options: [
        'Via the gateway — 70 & 192 = 64 but 200 & 192 = 192, so they’re on different subnets',
        'Direct — the first three octets match, so it’s local',
        'Direct — all addresses starting 10.x are the same subnet',
        'Via the gateway — because 200 is a larger number than 70',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: masking reveals different network blocks (64 vs 192), so the packet must go through the router even though the dotted prefixes look alike.',
        'The /26 mask overrides the /24 “same three octets” intuition — the last octet is split further.',
        '10.x spans a huge range carved into many subnets; “starts with 10” says nothing about locality.',
        'Magnitude is irrelevant — it’s the masked network bits that decide, not which number is bigger.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot has a valid IP but can’t reach anything beyond its own subnet. Which setting is the prime suspect?',
      options: [
        'A wrong or missing default gateway — off-subnet packets have nowhere to be forwarded',
        'The MAC address is too long',
        'The port number is already taken',
        'TCP’s window is too small',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: local traffic works via direct delivery, but anything off-subnet needs the gateway; a bad gateway breaks exactly the remote case while local pings still succeed.',
        'MAC addresses are fixed-length hardware IDs — not a configurable failure here.',
        'A port conflict affects one service, not all off-subnet reachability.',
        'Window size affects throughput, not whether off-subnet destinations are reachable at all.',
      ],
    },
    {
      kind: 'quiz',
      question: 'On a LAN, a host knows a peer’s IP but needs its hardware address to actually deliver the frame. Which protocol resolves IP → MAC?',
      options: [
        'ARP — it broadcasts “who has this IP?” and the owner replies with its MAC',
        'DHCP — it maps IPs to MACs on request',
        'DNS — it converts IPs to MACs',
        'TCP — the handshake carries the MAC',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ARP is the local IP-to-MAC lookup, broadcast on the subnet, answered by the address’s owner.',
        'DHCP LEASES addresses (IP, mask, gateway); it doesn’t resolve IP-to-MAC for delivery.',
        'DNS maps names to IPs, not IPs to MACs.',
        'TCP operates above IP and never deals in MAC addresses — that’s the link layer’s job.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A robot gets a fresh IP every time it reboots and its saved connection configs keep breaking. What addressing change fixes this?',
      options: [
        'Give it a STATIC IP (or a DHCP reservation) so its address is stable across reboots',
        'Switch from TCP to UDP',
        'Use a longer subnet mask',
        'Disable ARP so the address is cached forever',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: DHCP hands out changing leases; a static IP or a DHCP reservation pins the robot to one address so configs stay valid.',
        'Transport choice doesn’t affect which IP the robot receives at boot.',
        'A longer mask changes subnet size, not whether the address is stable across reboots.',
        'Disabling ARP breaks local delivery entirely — it doesn’t stabilize the IP.',
      ],
    },
    {
      question: 'Why is a robot’s 192.168.1.x address reachable on your home LAN but not directly from the public internet?',
      options: [
        'It’s a private address behind NAT — the router rewrites it to one shared public IP, so inbound connections need port-forwarding or a VPN',
        'Private addresses are encrypted end-to-end',
        'The internet bans all addresses starting with 192',
        'Only IPv6 addresses are private',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: NAT maps many private addresses to one public IP for outbound traffic; unsolicited inbound has no automatic mapping, so you add port-forwarding or a VPN.',
        'NAT isn’t encryption — it’s address translation.',
        '192.168.x is a reserved PRIVATE range by design, not a ban — it’s just not globally routable.',
        'Private ranges exist in IPv4 (10/8, 172.16/12, 192.168/16); IPv6 has its own local ranges too.',
      ],
    },
    {
      question: 'ROS 2 nodes discover each other fine over Ethernet but not over Wi-Fi. Which networking behavior best explains it?',
      options: [
        'DDS discovery relies on multicast, and many Wi-Fi access points drop or throttle multicast traffic',
        'Wi-Fi cannot carry UDP at all',
        'Ethernet uses TCP and Wi-Fi uses UDP',
        'ROS 2 requires a public IP that Wi-Fi hides',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: peer discovery uses multicast, which switches forward but many APs suppress — so wired works and wireless silently fails to discover.',
        'Wi-Fi carries UDP normally; the specific issue is multicast handling, not UDP.',
        'Both media carry TCP and UDP alike — the transport isn’t tied to the physical layer.',
        'Discovery is a LAN concern; no public IP is involved.',
      ],
    },
    {
      question: 'With mask /26 (value 192 on the last octet), how many host addresses does each subnet block span, and which block is address .130 in?',
      options: [
        'Blocks of 64 (e.g. 0–63, 64–127, 128–191, 192–255); .130 is in the 128–191 block',
        'Blocks of 26; .130 is in the 104–129 block',
        'Blocks of 128; .130 is in the 128–255 block',
        'Blocks of 4; .130 is in the 128–131 block',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: /26 leaves 6 host bits → 2^6 = 64 addresses per block; 130 & 192 = 128, so it sits in 128–191.',
        'The “/26” is a bit-count, not a block size; 6 host bits give 64 addresses, not 26.',
        '/26 masks TWO bits of the last octet (value 192), giving four 64-sized blocks, not two of 128.',
        'Blocks of 4 would be /30; /26 gives blocks of 64.',
      ],
    },
  ],
}
