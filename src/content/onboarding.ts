// Copy for the first-run tour (OnboardingFlow). Content lives in src/content —
// the component renders this data and never hardcodes the prose. Four steps:
// what Atlas is → how the map reads → the "I already know this" honesty
// mechanic → pick a starting domain. Keep every body ≤3 short sentences.

/** One of the four tappable status cards on step 2. */
export interface StatusCard {
  id: string
  icon: string
  label: string
  /** Revealed when the learner taps the card — tapping IS the pedagogy. */
  meaning: string
}

export interface OnboardingStep {
  id: string
  title: string
  body: string[]
  /** Label for the button that advances (the last step has its own finish copy). */
  next: string
  /** Only step 2 carries these. */
  cards?: StatusCard[]
}

/** Preselected on the last step — the module the whole map is built around. */
export const RECOMMENDED_DOMAIN_ID = 'how-computers-work'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Atlas',
    body: [
      'One map across computer science, math, physics, engineering and robotics — every subject on the same canvas, linked where they actually connect.',
      'You learn by doing: predict what happens, build the thing, then prove it with a quiz. Reading is the smallest part.',
    ],
    next: 'Show me how the map works →',
  },
  {
    id: 'map',
    title: 'How the map reads',
    body: [
      'Every box on the map is one lesson, coloured by subject. Its look tells you where you stand.',
      'Tap each one to find out what it means.',
    ],
    next: 'Next →',
    cards: [
      {
        id: 'mastered',
        icon: '✅',
        label: 'Mastered',
        meaning: 'You passed the quiz with 80% or better. This is the only thing that earns XP.',
      },
      {
        id: 'available',
        icon: '🎯',
        label: 'Available',
        meaning: 'Bright and plain: everything it builds on is done. Start here.',
      },
      {
        id: 'later',
        icon: '🕒',
        label: 'Later',
        meaning:
          'Dimmed, with a "suggested first" list — but nothing is ever locked. Every node has a "Start anyway".',
      },
      {
        id: 'known',
        icon: '⏩',
        label: 'Known',
        meaning: 'You told Atlas you already know this one, so it stops being suggested.',
      },
    ],
  },
  {
    id: 'known',
    title: '“I already know this”',
    body: [
      'Any lesson can be marked ⏩ known from its panel on the map — it then counts as done for everything downstream.',
      'It earns no XP and it is reversible anywhere; passing the quiz for real always overrides it.',
      'It is how you skip past what you already have without pretending you learned it here.',
    ],
    next: 'Next →',
  },
  {
    id: 'start',
    title: 'Pick a starting point',
    body: [
      'Choose where the map should drop you. You can jump anywhere later — this only decides the view.',
      'How Computers Work is the recommended first stop: it is the spine everything else hangs off.',
    ],
    next: 'Start learning →',
  },
]
