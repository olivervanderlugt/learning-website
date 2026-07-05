import type { Lesson } from '../../types'

export const histIndustrialLesson: Lesson = {
  nodeId: 'hist-industrial',
  screens: [
    {
      kind: 'explain',
      title: 'The hockey stick',
      body: [
        'For most of history, average living standards barely moved — your great-grandchildren would live roughly like you. Around 1800, in Britain first, the line bends upward and never stops.',
        'The cause: machines started doing work that muscles (human and animal) had always done, powered by energy dug out of the ground.',
        'You’re building robots — machines that do work. This lesson is about what happened the last three times machines got a big upgrade.',
      ],
    },
    {
      kind: 'predict',
      question: 'The First Industrial Revolution (~1760–1840) ran on steam engines burning coal. What was its key economic trick?',
      options: [
        'Replacing limited muscle power with cheap, scalable energy from fuel',
        'Making workers work longer hours',
        'Discovering new gold mines',
        'Inventing money and banking',
      ],
      correctIndex: 0,
      reveal:
        'Muscle is the bottleneck: a person outputs ~75 watts sustained, a horse a few hundred. A steam engine outputs thousands — and you can build MORE engines as long as you have coal. Energy stopped being the limit on how much work gets done. Every revolution since is a variation: find work that’s bottlenecked, and mechanize it.',
    },
    {
      kind: 'explain',
      title: 'Three waves (and a fourth)',
      body: [
        'Wave 1 (~1760–1840): steam + iron + textile machines. Work moves from cottages to factories; cities explode.',
        'Wave 2 (~1870–1914): electricity, steel, chemicals — and Ford’s moving assembly line (1913), which cut a car’s assembly time from over 12 hours to about 90 minutes.',
        'Wave 3 (~1950s onward): electronics and computers automate CONTROL, not just muscle — machines that steer themselves. Wave 4 is being built now: machines that perceive and decide. That’s robotics and AI — that’s you.',
      ],
      deeper: [
        'The pattern within each wave: a general-purpose technology (steam, electricity, computing) appears, but productivity jumps only DECADES later, once factories reorganize around it. Electric motors existed in the 1880s; the assembly line they enabled came in 1913 — you must redesign the process, not just swap the power source.',
        'Wave 3’s icon is Unimate (1961), the first industrial robot arm, unloading hot die-castings at a GM plant — a job dangerous for humans. Note the entry point: dull, dirty, dangerous. New automation lands where humans least want to be.',
        'The same reorganization lag is the robotics opportunity today: cheap sensing, compute and actuators all exist; most physical work is still organized for human bodies. Whoever redesigns the workflow — not just the machine — captures the wave.',
      ],
      links: [{ nodeId: 'robo-control', label: 'Machines that steer themselves: Feedback & Control' }],
    },
    {
      kind: 'predict',
      question: 'In 1811–16, English textile workers (“Luddites”) smashed the new weaving machines. Two centuries later, are there more or fewer weaving-related jobs… and what happened to weavers’ WAGES during their lifetime?',
      options: [
        'Machines multiplied output and total employment eventually grew — but many skilled weavers’ wages collapsed for decades',
        'The Luddites won and machines were abandoned',
        'Wages rose immediately for everyone as machines helped',
        'All textile jobs disappeared within a generation',
      ],
      correctIndex: 0,
      reveal:
        'Both things are true, and that’s the honest lesson. Long run: mechanization made cloth so cheap that demand and total industry employment grew enormously. Short run: hand-loom weavers’ skills lost value, and real wages for workers stagnated for decades even as output soared (economists call it the Engels’ pause). Automation creates wealth AND painful transitions — a robotics founder should plan for both.',
    },
    {
      kind: 'quiz',
      question: 'What fundamentally changed around 1800 to bend the living-standards curve upward?',
      options: [
        'Machines powered by fuel replaced muscle as the main source of work',
        'Humans became significantly stronger',
        'Governments started printing more money',
        'The population suddenly shrank, leaving more per person',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: energy from coal via steam engines broke the muscle bottleneck — output per person could finally grow without limit.',
        'Human bodies didn’t change; what each person could DIRECT (horsepower per worker) exploded.',
        'Money measures wealth, it isn’t wealth — the change was in real physical output per person.',
        'Population GREW rapidly during industrialization; output simply grew faster.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What did Ford’s moving assembly line (1913) demonstrate about technology and productivity?',
      options: [
        'Reorganizing the PROCESS around a technology can matter more than the technology itself',
        'Cars could only be built by skilled craftsmen',
        'Electricity was unnecessary for manufacturing',
        'Faster machines always mean fewer total workers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the parts weren’t new — conveyor + electric power + divided labor cut assembly from 12+ hours to ~90 minutes. The redesign WAS the invention.',
        'The line proved the opposite: dividing work into simple repeated steps let ordinary workers outproduce craftsmen.',
        'Electric motors were essential — machines could finally be arranged in process order instead of clustering around one steam shaft.',
        'Ford hired massively AND doubled wages ($5/day, 1914) — cheap cars created demand that created jobs.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does Wave 3 automation (computers, robots) differ from Wave 1 (steam)?',
      options: [
        'Steam replaced muscle; computers began replacing CONTROL — sensing, deciding, steering',
        'Wave 3 machines need no energy',
        'Steam engines were digital, computers are analog',
        'There is no real difference',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a steam engine still needs a human to guide it; a controller (your PID!) closes the loop itself. Automating decisions is a different, bigger step than automating force.',
        'Computers and robots very much need energy — hence battery chemistry mattering for robotics.',
        'Backwards on both counts, and steam engines aren’t digital in any sense.',
        'The difference is the whole point: muscle vs judgment. Wave 4 (AI + robotics) pushes further into perception and planning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Luddite episode plus the “Engels’ pause” together teach a robotics founder that…',
      options: [
        'Automation grows total wealth long-term, but specific people bear real short-term losses — expect and address both',
        'Workers who resist automation are always simply wrong',
        'Automation permanently reduces total employment',
        'Wage effects of technology are instant and positive',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: both the long-run growth and the decades of displaced-worker pain are historical facts. Products (and policies) that ease the transition are both ethical and good business.',
        'The Luddites’ economic fear was locally rational — THEIR skills genuinely lost value even as society gained.',
        'Two centuries of data say otherwise: employment shifted (farm → factory → office) rather than shrank.',
        'The Engels’ pause is the counterexample: output soared for decades before ordinary wages followed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'History says a general-purpose technology boosts productivity only after…',
      options: [
        'Workflows and organizations are redesigned around it — often decades later',
        'It becomes expensive enough to be taken seriously',
        'Governments mandate its use',
        'The older technology is legally banned',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: electric motors (1880s) → assembly line (1913); computers (1960s) → measured productivity jump (1990s). The lag is reorganization, and it’s where founders find their opening.',
        'Cost usually FALLS as adoption spreads — cheapness is what makes redesign worthwhile.',
        'Steam, electricity and computing spread through competition, not mandate.',
        'Old tech fades because the new way outcompetes it, not by prohibition.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Unimate (1961), the first industrial robot, took over which kind of job first?',
      options: [
        'A hot, dangerous die-casting job humans hated',
        'Precision watchmaking',
        'Customer service',
        'Corporate management',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: unloading scalding metal parts at a GM plant — dull, dirty, dangerous work is automation’s beachhead, then capability climbs.',
        'Fine manipulation stayed human for decades — early robots were strong but crude.',
        'Perception and language came generations later (Wave 4’s territory).',
        'Decision-heavy roles are the furthest frontier, not the entry point.',
      ],
    },
    {
      question: 'Why did factories cluster workers into cities during Wave 1?',
      options: [
        'Machines and their power source were centralized, so work had to happen where the engine was',
        'People preferred urban air quality',
        'Farms had run out of food',
        'City land was cheaper than farmland',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one steam engine drove a whole mill through belts and shafts — you came to the machine. (Electricity later relaxed this; remote work relaxes it further.)',
        'Industrial cities were notoriously polluted — people came for wages despite conditions.',
        'Agricultural productivity was RISING, which freed workers to leave farms.',
        'Urban land was and is more expensive; proximity to power and transport justified it.',
      ],
    },
  ],
}
