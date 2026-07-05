import type { Lesson } from '../../types'

export const secThreatsLesson: Lesson = {
  nodeId: 'sec-threats',
  screens: [
    {
      kind: 'explain',
      title: 'Security is a question, not a product',
      body: [
        'Amateurs ask “is it secure?”. Professionals ask: secure against WHOM, trying to get WHAT, with how much effort? That’s a threat model, and it comes before any technology.',
        'A robot’s threat model is spicier than a website’s: it has a body. A hacked database leaks data; a hacked robot pushes things, blocks doorways, drives into traffic.',
        'The attacker’s golden rule you must internalize: they don’t fight your strengths — they route around them to the weakest link.',
      ],
      links: [{ nodeId: 'net-protocols', label: 'Refresher: how your robot talks' }],
    },
    {
      kind: 'predict',
      question: 'Your fleet’s cloud dashboard has bank-grade encryption and 2FA. The robots accept firmware updates over the local WiFi with a default password printed in the manual. Where does the attacker go?',
      options: [
        'The WiFi + default password — why fight bank-grade crypto when the side door is open?',
        'They spend months attacking the encryption',
        'They give up, impressed by the dashboard',
        'They bribe the cloud provider',
      ],
      correctIndex: 0,
      reveal:
        'Attackers are economists: they buy the cheapest path to the goal. Your security equals your WEAKEST link, not your strongest — one default password nullifies a million euros of dashboard hardening. This is why threat modeling enumerates ALL the doors (network, physical, human, supply chain) before polishing any single one. Real example: the 2016 Mirai botnet enslaved hundreds of thousands of cameras and routers — almost entirely via factory-default passwords.',
    },
    {
      kind: 'explain',
      title: 'Thinking in attack surfaces',
      body: [
        'The ATTACK SURFACE is every point where an attacker can interact with your system: open network ports, the update mechanism, USB sockets, the web dashboard, even the human who answers “IT support” phone calls.',
        'Smaller surface = fewer doors to defend. Every feature you add (remote SSH! debug port! voice control!) is also a door you now guard forever.',
        'For each door, ask three questions: who might come through it (script kiddie? competitor? bored teen?), what do they gain, and what does an attempt cost them?',
      ],
      deeper: [
        'Attacker tiers matter because defenses cost: opportunists scanning the internet for default passwords (defend: basics), targeted criminals after ransom (defend: real engineering), and state-level actors (defend: mostly you don’t — you limit blast radius). Most systems only ever face tier 1, which is why BASICS beat exotic defenses.',
        'The human is part of the surface: “Hi, this is Tom from IT, what’s the workshop WiFi password?” defeats firewalls for free. Social engineering is consistently the highest-yield attack class — policy and training are security controls, not HR fluff.',
        'Physical access is a tier of its own — a robot roams public spaces. USB ports, debug headers, even lifting the robot and walking away with its SSD. Rule of thumb: physical access ≈ eventual full compromise, so encrypt storage and assume stolen hardware WILL be dissected.',
      ],
    },
    {
      kind: 'predict',
      question: 'You have €10,000 of security budget for a delivery-robot pilot. Which spend blocks the MOST likely real-world attack?',
      options: [
        'The boring basics: unique passwords, updates applied, encrypted links, locked debug ports',
        'Military-grade custom encryption chips',
        'A bug bounty for elite hackers',
        'Insurance against nation-state attacks',
      ],
      correctIndex: 0,
      reveal:
        'The attacks that actually happen are overwhelmingly opportunistic: default creds, unpatched known bugs, open ports found by automated scanning. Mirai needed no genius — just 60-ish factory passwords. Exotic defenses against tier-3 attackers while the tier-1 door stands open is security theater. Basics first, then escalate WITH the threat model.',
    },
    {
      kind: 'quiz',
      question: 'A threat model asks…',
      options: [
        'Who would attack, what they want, which paths they’d take, and what defense is worth its cost',
        'Which encryption algorithm is mathematically strongest',
        'Whether the firewall brand is popular',
        'How to make attacks illegal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: adversaries, assets, avenues, economics — the question that aims all subsequent technology choices.',
        'Algorithm choice comes AFTER knowing what you’re defending against — crypto is a tool the model may or may not call for.',
        'Brands don’t matter; coverage of actual attack paths does.',
        'Laws deter some attackers; they are not a technical control.',
      ],
    },
    {
      kind: 'quiz',
      question: '“Security equals the weakest link” means…',
      options: [
        'Attackers route to the cheapest way in — one weak door voids strong walls elsewhere',
        'Systems should have equal budgets on all components',
        'Chains are a bad way to secure robots',
        'The newest component is always weakest',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: your defense is the MINIMUM over all doors, not the average and never the maximum.',
        'Budgets should follow RISK — the principle says find the minimum, then raise it.',
        'It’s a metaphor about minimums, not hardware.',
        'Age doesn’t decide weakness — unmaintained OLD components are often the softest.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Every added feature (remote SSH, voice control, debug port) affects security how?',
      options: [
        'It grows the attack surface — one more door to guard for the product’s lifetime',
        'It has no security relevance if convenient',
        'It shrinks the surface by adding complexity',
        'Features are only risky in the first month',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each interaction point is attacker-reachable by definition — the door you forget about (old debug port) is the classic breach story.',
        'Convenience for you is convenience for attackers — the trade must be conscious.',
        'Complexity GROWS the surface — simplicity is a security feature.',
        'Doors age badly: unpatched and forgotten is the dangerous end of the lifetime.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Mirai botnet (2016) took over hundreds of thousands of IoT devices primarily via…',
      options: [
        'Factory-default usernames and passwords, tried automatically at internet scale',
        'A flaw in AES encryption',
        'Physically visiting each device',
        'Bribing device manufacturers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a short list of default credentials + automated scanning = an army of cameras and routers, later used to knock major websites offline. The least sophisticated attack, the biggest botnet.',
        'No cryptography was harmed — the front door was simply unlocked.',
        'It spread over the network, no vans required — that’s what made scale free.',
        'No conspiracy needed; shipped defaults did all the work.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a robot’s threat model differ fundamentally from a website’s?',
      options: [
        'Compromise has physical consequences — a robot can push, block, crash and hurt',
        'Robots have no data worth stealing',
        'Websites cannot be attacked',
        'Robots are offline by definition',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: cyber-physical risk — safety enters the model, which raises the stakes on links like the command channel (next lesson encrypts it).',
        'Robots carry maps, camera feeds, customer data — the data risk comes ON TOP of the physical one.',
        'They’re attacked constantly — they just can’t drive into a crowd afterwards.',
        'Your fleet is networked by design — that’s WHY this domain sits after networks.',
      ],
    },
  ],
  extraPractice: [
    {
      question: '“Hi, this is Tom from IT — I need the workshop WiFi password to fix the robots.” The right response, and the lesson:',
      options: [
        'Verify through a known channel first — humans are part of the attack surface, and policy is a security control',
        'Give it — being helpful matters most',
        'Only give the GUEST network password',
        'Security has nothing to do with phone calls',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: call back via the official number, check with the manager — social engineering wins by exploiting politeness and urgency. Verification procedures ARE defenses.',
        'Helpfulness is exactly the exploited instinct — verify, then help.',
        'Half-compliance still leaks — and trains the habit of yielding to confident voices.',
        'The phone is historically one of the highest-yield attack tools.',
      ],
    },
    {
      question: 'Your delivery robot operates in public. “Physical access ≈ eventual compromise” implies you should…',
      options: [
        'Encrypt onboard storage and design assuming a stolen robot WILL be fully dissected',
        'Make the robot too heavy to lift',
        'Only operate at night',
        'Nothing; passersby aren’t hackers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with hardware in hand, attackers dump disks and probe debug headers at leisure — encrypted storage, secured boot and no lasting secrets on the robot limit the damage.',
        'Weight inconveniences, but a van solves it — design for AFTER the theft.',
        'Timing changes little; assume capture regardless.',
        'One curious buyer of a stolen unit is your adversary — plan for them.',
      ],
    },
  ],
}
