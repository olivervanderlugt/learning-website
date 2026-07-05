import type { Lesson } from '../../types'

export const aiLearningLesson: Lesson = {
  nodeId: 'ai-learning',
  screens: [
    {
      kind: 'explain',
      title: 'When you can’t write the rules',
      body: [
        'You can code “stop if distance < 30 cm”. You cannot code “stop if that’s a pedestrian” — nobody can write down what a pedestrian looks like in pixels.',
        'Machine learning flips the recipe: instead of rules, you give EXAMPLES, and the machine adjusts a model until its outputs match them.',
        '“Adjusts until it matches” hides two questions: match HOW WELL (a loss function), and adjust WHICH WAY (gradient descent). That’s this lesson.',
      ],
      links: [{ nodeId: 'math-calculus', label: 'Refresher: slopes & derivatives' }],
    },
    {
      kind: 'predict',
      question: 'A model’s “loss” measures how wrong it currently is (0 = perfect). Training = changing the model’s knobs to reduce loss. What everyday activity is this most like?',
      options: [
        'Walking downhill in fog — feel the slope under your feet, step that way, repeat',
        'Looking up the answer in a dictionary',
        'Rolling dice until you get lucky',
        'Following a recipe exactly once',
      ],
      correctIndex: 0,
      reveal:
        'Training is literally descending a landscape: the loss is the altitude, the model’s knobs (weights) are your position, and the GRADIENT — the slope, straight from calculus — tells you which direction is downhill. You can’t see the whole landscape (fog), but the slope under your feet is always available. Step, re-measure, step again: gradient descent.',
    },
    {
      kind: 'explain',
      title: 'The knob that breaks everything',
      body: [
        'One number controls each step’s size: the LEARNING RATE. Too small and training crawls for weeks; too large and each step overshoots the valley — the loss EXPLODES.',
        'This isn’t a detail: learning-rate choice is the #1 practical cause of failed training runs.',
        'Feel all three regimes yourself — converge, explode, then converge fast.',
      ],
      deeper: [
        'Why does overshooting explode rather than just wobble? On a curve like x², the slope grows with distance from the bottom — so a too-big step lands FARTHER out, where the slope is even bigger, causing a bigger step next time. Positive feedback, like your battery thermal-runaway loop.',
        'Real losses aren’t neat parabolas: millions of dimensions, ripples and valleys everywhere. Yet the same one-step logic works — the gradient is computed over all weights at once (that’s where your matrix math earns its keep), and tricks like momentum and Adam adapt the step size per knob.',
        'On real data you also don’t compute the exact slope — you estimate it from a random mini-batch of examples. Noisier steps, vastly cheaper; the noise even helps escape bad valleys. This is SGD: the workhorse of all deep learning.',
      ],
      links: [{ nodeId: 'math-linalg', label: 'Why matrices: many knobs at once' }],
    },
    {
      kind: 'game',
      gameId: 'gradient-descent',
    },
    {
      kind: 'explain',
      title: 'The honest limits',
      body: [
        'A model that nails every training example can still fail in the field: it may have MEMORIZED the examples instead of learning the pattern. That’s overfitting.',
        'The only honest test: data the model has never seen. That’s why datasets are split into train and test — and why “100% on training data” impresses nobody.',
        'Second limit: a model is only as good as its examples. Feed it sunny-day driving only, and it fails in its first rainstorm.',
      ],
      deeper: [
        'Overfitting intuition: with enough knobs you can fit a curve through ANY set of points — including their noise. A model with millions of weights can “explain” anything; the question is whether it explains the NEXT point. Generalization, not fit, is the product.',
        'The classic warning: a tank-detector that actually learned to detect the weather, because all tank photos were taken on cloudy days. Your robot’s vision will learn YOUR lab’s lighting the same way unless the data says otherwise.',
        'Defenses: more diverse data, held-out validation while training, and stopping early when validation loss turns upward (the moment memorization starts beating learning).',
      ],
    },
    {
      kind: 'quiz',
      question: 'The gradient of the loss tells the training process…',
      options: [
        'Which direction (and how steeply) the loss changes as each knob moves — so step the other way',
        'The final answer to the task',
        'How many examples are needed',
        'Whether the data is labeled correctly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it’s the multi-knob slope — the derivative from calculus, computed per weight. Downhill = minus the gradient.',
        'No oracle involved: it’s purely local slope information, used step by step.',
        'Data quantity is a separate (empirical) question — the gradient is about direction.',
        'The gradient trusts the data completely — garbage labels give confident garbage slopes.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the sim, a learning rate above 1.0 made the ball climb OUT of the valley. Why?',
      options: [
        'Each step overshot by more than it came in, landing where the slope is steeper — a runaway feedback loop',
        'The computer ran out of precision',
        'The valley moved',
        'High rates only fail on x²; real training is safe',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: overshoot → bigger slope → bigger next step → bigger overshoot. Same positive-feedback shape as thermal runaway.',
        'Precision wasn’t the issue — the MATH diverges: |x| multiplies by |1−2·lr| > 1 every step.',
        'The landscape is fixed; the STEPS are what went wrong.',
        'Real training explodes exactly this way — “loss went to NaN” is the most famous error in deep learning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A model scores 100% on its training data and 55% on new data. Diagnosis?',
      options: [
        'Overfitting — it memorized the examples instead of learning the pattern',
        'Perfect — ship it',
        'The learning rate was too high',
        'The test data must be wrong',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the 45-point gap between seen and unseen data is the signature of memorization. Generalization is the product; training accuracy is just a progress bar.',
        'The field IS new data — 55% is what ships, and 55% is what fails.',
        'A too-high rate prevents fitting ANYTHING (exploding loss) — this model fit training data perfectly.',
        'Possible but not the default suspect — the train/test gap pattern points squarely at overfitting.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why must the test set stay hidden from training?',
      options: [
        'It’s the only honest measure of behavior on unseen data — training on it silently turns “generalization” into memorization',
        'To keep the training set small',
        'Because test data has different physics',
        'It’s just tradition',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the test set simulates the future. Let it leak into training and your metric measures recall, not understanding — and the field will disagree with your dashboard.',
        'Nothing to do with size — it’s about keeping one clean, untouched yardstick.',
        'Same world, same physics — the difference is purely that the model hasn’t SEEN it.',
        'It’s the load-bearing methodological rule of the whole field.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your warehouse robot’s object detector was trained only on brightly-lit product photos. Its first night shift, detection collapses. The lesson?',
      options: [
        'A model learns the world its DATA shows — train on the conditions you’ll deploy in',
        'Neural networks can’t work in the dark',
        'The learning rate should have been lower',
        'More training on the same photos would fix it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the tank/weather story in real life — the model faithfully learned “bright product pixels”, and night isn’t in that world. Data diversity IS model robustness.',
        'They work fine on dark images — that were in the training data.',
        'The rate governs optimization, not what distribution was learned.',
        'More of the SAME data deepens the same blind spot — you need different data, not more.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Stochastic gradient descent (SGD) estimates the gradient from a random mini-batch because…',
      options: [
        'An approximate slope from 32 examples is thousands of times cheaper than the exact slope from millions — and good enough to step on',
        'Exact gradients are mathematically impossible',
        'Random noise is the goal itself',
        'It guarantees a perfect model',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: many cheap noisy steps beat one slow exact step — and the noise even helps hop out of poor local valleys.',
        'Exact is possible, just brutally expensive per step at dataset scale.',
        'Noise is a side effect (with a silver lining), not the objective.',
        'No optimizer guarantees that — SGD is about efficient descent, not certainty.',
      ],
    },
    {
      question: 'Validation loss starts RISING while training loss keeps falling. What is happening, and what do you do?',
      options: [
        'Memorization has overtaken learning — stop training (early stopping)',
        'Training is finally working — keep going longer',
        'The learning rate is too small',
        'Delete the validation set to fix the metric',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the model now improves on seen data by getting WORSE on unseen data — the definition of overfitting in motion. The best checkpoint is at the turn.',
        'The gap widening is the failure signal, not progress.',
        'A small rate slows both curves; it doesn’t split them apart.',
        'Removing the thermometer doesn’t cure the fever.',
      ],
    },
  ],
}
