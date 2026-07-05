import type { Lesson } from '../../types'

export const secSystemsLesson: Lesson = {
  nodeId: 'sec-systems',
  screens: [
    {
      kind: 'explain',
      title: 'From ciphers to systems',
      body: [
        'You have threat models and cryptography. Securing a real machine is assembling them into habits: authenticate everything, update everything, and give every part the least power it needs.',
        'AUTHENTICATION answers “who is this, really?” — for humans (passwords, 2FA) and, just as critically, for machines and updates (signatures, certificates).',
        'The uncomfortable truth of fleet security: most compromises exploit a KNOWN bug, patched months earlier, on a machine that never updated.',
      ],
      links: [{ nodeId: 'sec-crypto', label: 'Refresher: signatures & keys' }],
    },
    {
      kind: 'predict',
      question: 'Your robot’s vision process gets hacked via a malicious image. The process runs as administrator (root). What can the attacker now do?',
      options: [
        'Everything — motors, cameras, stored maps, other processes: vision’s privileges are their privileges',
        'Only vision-related things, since they entered via vision',
        'Nothing; hacking a process gains nothing',
        'Watch, but never control',
      ],
      correctIndex: 0,
      reveal:
        'An attacker inherits EXACTLY the privileges of what they compromised — the entry point doesn’t limit them, the PERMISSIONS do. Vision-as-root means image-parsing bug = total robot takeover. Run vision as a low-privilege user that can read the camera and write detections — nothing else — and the same bug yields a peephole instead of the keys. That’s LEAST PRIVILEGE: assume breach, cap the blast radius.',
    },
    {
      kind: 'explain',
      title: 'Least privilege and defense in depth',
      body: [
        'Least privilege everywhere: the dashboard reads status but can’t flash firmware; the log uploader writes one directory; the motor controller accepts commands from one authenticated source. Every permission NOT granted is an attack that fails.',
        'DEFENSE IN DEPTH: layers, assuming each will someday fail. Encrypted link AND authenticated commands AND privilege separation AND a hardware e-stop — four fences, no single point of catastrophe.',
        'Notice the OS lesson paying off: process isolation and memory protection are the enforcement machinery that makes least privilege real.',
      ],
      deeper: [
        'Updates are a paradox: not updating is the #1 vulnerability, but the update MECHANISM is the juiciest target imaginable (one signing key = whole fleet). Handle with signed updates (your crypto lesson), staged rollouts (1 robot → 10 → all), and rollback capability. The 2020 SolarWinds attack poisoned a legitimate update pipeline — supply chains are attack surface too.',
        'Secure boot extends signatures downward: each boot stage verifies the next (hardware → bootloader → OS → apps), so even physical attackers can’t persist unsigned code across a reboot. Pairs with encrypted storage from the threats lesson for the stolen-robot scenario.',
        'Design for detection, not just prevention: logging, anomaly alerts (“robot7 uploaded 100× its normal data at 3 AM”), and a practiced revoke-and-reflash procedure. Mature security assumes SOME breach eventually succeeds — the differentiator is noticing in minutes rather than months.',
      ],
      links: [{ nodeId: 'os-memory', label: 'The enforcement layer: memory protection' }],
    },
    {
      kind: 'quiz',
      question: 'Least privilege means…',
      options: [
        'Every process, user and device gets only the permissions its job requires — nothing more',
        'Only administrators may use the system',
        'Removing all passwords for simplicity',
        'The newest employee gets no computer',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: privileges are blast radius — granting the minimum caps what any single compromise is worth.',
        'It’s about MINIMIZING admin-level access, not funneling everyone through it.',
        'Passwords are authentication; least privilege governs what authenticated things may DO.',
        'It applies to software components as much as people — the vision process was the example.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is “assume breach” the professional design stance?',
      options: [
        'Some fence will eventually fail — layers and containment turn a breach from catastrophe into incident',
        'Because defense is pointless',
        'It’s legally required everywhere',
        'It only applies to banks',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: defense in depth is engineering for fallibility — like your robot’s hardware e-stop existing although the software “should” never fail.',
        'The stance is the opposite of surrender: build defenses expecting each to be imperfect.',
        'Some sectors regulate it; the logic stands regardless.',
        'A robot fleet with motors in public spaces needs it at least as much as a bank.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The single highest-yield security habit for a fleet of networked robots is…',
      options: [
        'Applying updates promptly — most real compromises exploit already-patched, known bugs',
        'Changing WiFi names weekly',
        'Buying a more expensive firewall',
        'Keeping the source code secret',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the boring truth of the industry — the patch existed, the machine didn’t have it. Automated, signed, staged updates are the core competence.',
        'Cosmetic — scanning tools don’t care what the network is called.',
        'A firewall can’t save an unpatched service it forwards traffic to.',
        'Kerckhoffs again: obscurity isn’t a control; attackers reverse-engineer binaries fine.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why must firmware updates be SIGNED (not merely encrypted)?',
      options: [
        'The robot must verify the update’s ORIGIN and integrity — otherwise anyone reaching the update port ships it malware',
        'Signatures compress updates for slow links',
        'Encryption would corrupt the firmware',
        'Signing makes updates optional',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: authenticity is the requirement — signature verification with the manufacturer’s public key means even a fully-intercepted channel can’t inject code. Encryption alone hides content but authenticates nothing.',
        'No compression involved — trust is the payload.',
        'Encrypted data decrypts fine — it just doesn’t prove WHO sent it.',
        'Unrelated — signing is about verification, not scheduling.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your monitoring flags: robot7 uploaded 100× its usual data overnight. This mattering is an argument for…',
      options: [
        'Detection as a security layer — breaches you notice in minutes cost less than ones you find in months',
        'Robots working at night',
        'Unlimited data plans',
        'Turning off logging to save space',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: anomaly detection + practiced response (revoke keys, reflash) is the layer that limits damage AFTER prevention fails — mature security’s defining feature.',
        'The anomaly is the volume, not the hour.',
        'The bill isn’t the issue; the exfiltration is.',
        'Logs are how you ever find out — deleting the smoke detector saves no fires.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Secure boot means each stage (hardware → bootloader → OS → apps) verifies the next’s signature. What attack does this specifically kill?',
      options: [
        'Persistent unsigned code — malware that survives reboots by hiding in the boot chain',
        'Password guessing over the network',
        'Social engineering phone calls',
        'Physical theft of the robot',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with every stage checked against keys burned into hardware, tampered boot code fails verification and won’t run — compromise can’t take root across a restart.',
        'Network authentication is a different fence — boot integrity is about what code runs at startup.',
        'No technology answers the phone for you — that’s policy and training.',
        'Theft still happens — secure boot (plus encrypted storage) limits what the thief gets from it.',
      ],
    },
    {
      question: 'Why are staged rollouts (1 robot → 10 → the fleet) a SECURITY practice, not just caution?',
      options: [
        'The update pipeline itself is an attack vector — a poisoned or broken update caught at 1 robot never reaches 400',
        'They make updates unnecessary',
        'Small batches use less bandwidth',
        'They hide updates from attackers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: SolarWinds proved update channels get poisoned. Staging + rollback turns “fleet-wide catastrophe” into “one weird robot in the workshop”. Blast-radius thinking applied to your own pipeline.',
        'Updates stay essential — staging changes their failure mode.',
        'Marginal — risk containment is the real product.',
        'Attackers see updates regardless; the stage protects YOU from what’s in them.',
      ],
    },
  ],
}
