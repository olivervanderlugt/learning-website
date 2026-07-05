import type { Lesson } from '../../types'

export const secExamLesson: Lesson = {
  nodeId: 'sec-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — think like the attacker',
      body: [
        'Ten fresh questions across the whole security domain — threat models, ciphers and keys, hardened systems. Nothing repeats from the lessons: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Fall short? It costs nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your startup is about to ship a hospital delivery drone. Before picking ANY defense, a security engineer answers which question first?',
      options: [
        'Who would attack it, what would they gain, and which paths would they take?',
        'Which encryption algorithm has the longest key?',
        'Which firewall vendor has the best reviews?',
        'How can we keep the drone’s internal design secret?',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: that’s the threat model — adversaries, assets, avenues. Every technology choice afterwards is aimed by this answer.',
        'Crypto strength is a tool you select LATER — a huge key on the wrong door defends nothing. First map the doors.',
        'A firewall is one control for one kind of path — you can’t judge it before knowing which paths matter (network? physical? the nurse who gets a scam call?).',
        'Obscurity isn’t a plan — designs leak and stolen hardware gets dissected. The model assumes attackers learn everything except your keys.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your drone’s command link uses AES-256, but the operations laptop auto-logs-in with no password and sits in a shared office. The fleet’s real security level is set by…',
      options: [
        'The open laptop — attackers buy the cheapest way in, and security equals the weakest link',
        'The AES-256 link, since that’s the strongest component',
        'The average of the strong link and the weak laptop',
        'Neither — security depends only on the drone itself',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: nobody fights 2²⁵⁶ keys when a stroll past an unlocked laptop hands them the whole command console. Defense is a MINIMUM over all doors.',
        'Exactly backwards — the strongest wall is the one attackers walk around. A fortress is judged at its softest gate.',
        'There’s no averaging in security — one open door voids ten armored ones, because the attacker only needs one path.',
        'That laptop commands the drone — anything that can talk to the robot is part of the robot’s attack surface.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You disable the unused Bluetooth module on every robot in your harvest fleet. Security-wise, this is…',
      options: [
        'A real win — it shrinks the attack surface, deleting a door you’d otherwise guard forever',
        'Pointless, because Bluetooth only works at short range anyway',
        'Harmful — more interfaces mean more backup ways to control the robot',
        'Neutral — a feature nobody uses can’t be attacked',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every interface is a door, and a deleted door needs no lock, no patches and no vigilance. Simplicity is a security feature.',
        'Short range shrinks the attacker pool but doesn’t empty it — standing in a field or parking lot is cheap. Gone beats nearby-only.',
        'Each “backup way in” for you is a way in for attackers too — extra control channels trade convenience against surface, and unused ones are pure cost.',
        '“Unused” means unmonitored and unpatched — forgotten interfaces are classic breach entry points, not neutral bystanders.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You intercept the Caesar-encrypted robot command RTAJ and learn the key is 5. What was the original command?',
      options: ['MOVE', 'WYFO', 'STOP', 'TURN'],
      correctIndex: 0,
      explanations: [
        'Correct: shift each letter BACK by 5 — R→M, T→O, A→V (wrapping back past A), J→E. Encryption walked forward; decryption is the same walk in reverse.',
        'WYFO comes from shifting FORWARD by 5 — that encrypts a second time. To decrypt, walk the alphabet backwards.',
        'A tempting context guess, but STOP encrypted with key 5 gives XYTU — the letters simply don’t line up with RTAJ.',
        'TURN with key 5 encrypts to YZWS, not RTAJ. Don’t guess from vibes — Caesar with a known key decodes mechanically, letter by letter.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A teammate proposes a cipher with a 20-bit key for the drone link — “over a million possible keys!” Why is that hopeless?',
      options: [
        'A laptop brute-forces 2²⁰ ≈ a million keys in under a second — safety needs astronomical key spaces like 2¹²⁸',
        'Million-key ciphers are strong, but a 20-bit key can’t encrypt modern message sizes',
        'It’s fine as long as the algorithm itself stays secret',
        'Key size doesn’t matter — only the cleverness of the scramble does',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a million sounds big to a human and is lunch to a CPU testing millions of guesses per second. Security lives in key spaces so vast that enumerating them outlasts the universe.',
        'Key size and message size are independent — a 20-bit key can encrypt gigabytes. The flaw is how few keys there are to TRY.',
        'That’s security through obscurity — Kerckhoffs’s principle demands a cipher survive with the algorithm fully known, key excepted.',
        'Backwards: clever scrambles fall to analysis, and the algorithm is assumed public anyway. The measurable, dependable defense is the size of the haystack.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A factory-fresh robot must open a secure channel to your cloud over the public internet — no secret has ever been shared between them. What makes the first step possible?',
      options: [
        'Public-key crypto — the robot encrypts to the cloud’s public key, so a session secret is agreed without ever traveling exposed',
        'AES alone — just have both sides pick the same strong key',
        'Sending the AES key in plaintext once, quickly, before attackers notice',
        'Skipping encryption for the first session only',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the public key may cross the internet freely because it can only LOCK — only the cloud’s private key unlocks. That asymmetry is the whole solution to sharing a secret with a stranger.',
        '“Both pick the same key” IS the unsolved problem — symmetric crypto is superb once a key exists, but it can’t bootstrap one across an eavesdropped wire.',
        'Assume every byte on the path is recorded — a key sent in the clear is compromised forever, no matter how fast. Speed doesn’t beat a wiretap.',
        'The first session is exactly when keys and credentials get set up — an attacker who owns minute one owns the robot.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A vendor pitches their motor controller’s security as “a proprietary encryption algorithm nobody has ever seen.” Why is that a red flag?',
      options: [
        'Good ciphers stay secure with the algorithm fully public — only the key is secret, and unvetted secret designs usually hide flaws, not strength',
        'Secret algorithms are illegal in commercial products',
        'Proprietary algorithms are always slower than public ones',
        'It’s only a red flag if the controller is expensive',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Kerckhoffs’s principle — algorithms leak, get reverse-engineered and get standardized, so all security must rest on the key. AES is trusted BECAUSE thousands of experts tried and failed to break it in public.',
        'Perfectly legal — just unwise. The law isn’t what breaks home-brew ciphers; cryptanalysis is.',
        'Speed isn’t the issue (some are fast). “Nobody has seen it” really means nobody has TESTED it.',
        'A free flawed cipher still loses your fleet — the design philosophy, not the invoice, is the warning sign.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You’re assigning permissions on a barista robot. Following least privilege, the music-playback process should get…',
      options: [
        'Audio output and its playlist folder — nothing else, so hijacking it can’t reach the arm or the payment data',
        'Full administrator rights, so it never hits a permission error',
        'The same access as every other process, to keep the design simple and fair',
        'No permissions at all — the only safe process is a powerless one',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: permissions are blast radius. A compromised jukebox that can only play sound is an annoyance; one running as admin swings a metal arm near customers.',
        '“Never hits an error” also means an attacker who owns it never hits a wall — convenience-as-root is how one malicious audio file becomes a robot takeover.',
        'Uniform access makes every process as dangerous as the most critical one — least privilege is deliberately unequal: each part gets exactly its job’s needs.',
        'Zero permissions means it can’t do its job — the principle is MINIMUM NECESSARY, not none. Playing music needs the speaker; grant that and stop.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot fetches its firmware over café WiFi, and an attacker on that network swaps bytes mid-download. With signed updates, what happens?',
      options: [
        'The tampered file fails signature verification and never installs — only code signed with the manufacturer’s private key runs',
        'The robot installs it, but the WiFi’s encryption undoes the changes',
        'Nothing to worry about — files can’t be modified while downloading',
        'The robot installs it but runs it more slowly as a precaution',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the robot checks the update against the manufacturer’s PUBLIC key, and one flipped byte breaks the signature. Even an attacker who fully owns the network can’t forge code — that needs the private key, which never left the factory.',
        'Link encryption protects one hop at best and certainly can’t repair altered data — integrity comes from the signature check, not the radio.',
        'On-path attackers modify traffic routinely — that’s precisely the threat. Assume the network is hostile; verify the payload.',
        'There is no “run it carefully” mode — executed malicious firmware wins completely. The only safe response is refusing to install, which the signature enables.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Thieves reflash stolen rental e-scooters with custom firmware that unlocks them. Which defense directly kills this trick?',
      options: [
        'Secure boot — hardware verifies each boot stage’s signature, so unsigned firmware simply refuses to run',
        'A stronger password on the rental app',
        'Encrypting the GPS traffic to the server',
        'A louder alarm when the scooter is lifted',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with verification keys burned into hardware, stage after stage must carry a valid signature — the thieves’ custom image fails the very first check and the scooter stays a brick.',
        'The thieves aren’t logging in — they’re replacing the software UNDER the login. App-level defenses can’t survive a firmware swap.',
        'Encryption hides the traffic; it says nothing about what code the scooter will boot. Wrong layer for this attack.',
        'Alarms deter the grab, not the reflash — once the scooter is in a workshop, only boot-time verification decides what code it accepts.',
      ],
    },
  ],
}
