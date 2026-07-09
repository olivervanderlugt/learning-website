import type { Lesson } from '../../types'

export const aiLearning2Lesson: Lesson = {
  nodeId: 'ai-learning-2',
  screens: [
    {
      kind: 'explain',
      title: 'The simplest learner: a line',
      body: [
        'Strip machine learning down to its atom: fit a straight line ŷ = w·x + b to data. Two knobs — slope w and intercept b — and one job: pick them so the line runs through the cloud of points.',
        'To “run through” we need a number for wrongness. The standard one is MEAN SQUARED ERROR: average the squared gap between each prediction ŷ and the true y. Squaring punishes big misses hard and keeps the loss smooth to differentiate.',
        'Everything bigger — a neural net with a million weights — is this same loop with more knobs.',
      ],
      links: [
        { nodeId: 'math-linalg-4', label: 'The closed-form shortcut: least squares' },
        { nodeId: 'ai-learning', label: 'Recap: loss & gradient descent' },
      ],
    },
    {
      kind: 'predict',
      question:
        'Loss L = (1/n)·Σ(ŷ − y)². To nudge w downhill we need ∂L/∂w — how L changes as w moves. Since ŷ = w·x + b, moving w by a little changes each ŷ by an amount proportional to…',
      options: [
        'x — a point far out on the x-axis swings its prediction the most when you tilt the slope',
        'y — the true label controls the sensitivity',
        'b — only the intercept matters',
        'nothing — w and ŷ are unrelated',
      ],
      correctIndex: 0,
      reveal:
        'Because ŷ = w·x + b, ∂ŷ/∂w = x. Tilt the slope and a point at x = 10 moves ten times as much as a point at x = 1. Chain that through the squared loss and the per-point gradient is 2·(ŷ − y)·x: the ERROR times the INPUT. Sum over the data, scale by 2/n, and you have ∂L/∂w. The intercept is simpler — ∂ŷ/∂b = 1 — so ∂L/∂b is just 2/n·Σ(ŷ − y), the error alone.',
    },
    {
      kind: 'explain',
      title: 'One step, worked by hand',
      body: [
        'Two points: (x=1, y=3) and (x=3, y=7) — the true line is y = 2x + 1. Start deliberately wrong: w = 1, b = 1, learning rate 0.1.',
        'Predictions: ŷ = 1·1+1 = 2 and 1·3+1 = 4. Errors (ŷ − y): −1 and −3. Gradient for w = (2/2)·(−1·1 + −3·3) = −10; for b = (2/2)·(−1 + −3) = −4.',
        'Update = knob − rate·gradient: w = 1 − 0.1·(−10) = 2.0, b = 1 − 0.1·(−4) = 1.4. One step and w already landed on the true slope. Now make the code do it.',
      ],
      deeper: [
        'Why minus the gradient? The gradient points UPHILL (toward bigger loss). We want smaller loss, so we walk the opposite way — the same “−∇” you saw with the gradient in math-mv.',
        'Linear regression is special: its loss surface is a single bowl (convex), so gradient descent can never get stuck in a bad valley — there is only one. Neural nets give up that guarantee, which is why their training is fussier.',
      ],
      links: [{ nodeId: 'math-mv', label: 'Gradients: the multi-knob slope' }],
    },
    {
      kind: 'code',
      prompt:
        'Finish the prediction line so the model uses BOTH knobs (ŷ = w·x + b), then run one gradient-descent step. Expected: MSE 5.00, then the updated w = 2.00 and b = 1.40 from the worked example.',
      starter: `const xs = [1, 3], ys = [3, 7]
let w = 1, b = 1
const lr = 0.1

// predict with BOTH knobs: slope AND intercept
const preds = xs.map(x => w * x)   // <-- fix this line

let se = 0
for (let i = 0; i < xs.length; i++) se += (preds[i] - ys[i]) ** 2
print('MSE', (se / xs.length).toFixed(2))

let gw = 0, gb = 0
for (let i = 0; i < xs.length; i++) {
  const e = preds[i] - ys[i]
  gw += e * xs[i]
  gb += e
}
gw = gw * 2 / xs.length
gb = gb * 2 / xs.length

w = w - lr * gw
b = b - lr * gb
print('w', w.toFixed(2), 'b', b.toFixed(2))`,
      expected: `MSE 5.00
w 2.00 b 1.40`,
      hint: 'A line has a slope AND an intercept: preds should be xs.map(x => w * x + b).',
      success:
        'The error-times-input gradient dragged w straight onto the true slope in a single 0.1 step. Drop the “+ b” and the predictions ignore the intercept — the MSE jumps to 10.00 and every gradient is wrong. Both knobs, every step.',
    },
    {
      kind: 'explain',
      title: 'When fitting too well is the bug',
      body: [
        'Give the line more knobs — a high-degree polynomial — and it can wiggle through every training point, noise and all. Training loss hits zero; the model has MEMORIZED, and new points fall off the curve. That’s overfitting, now with a lever to fight it.',
        'REGULARIZATION adds a penalty for big weights to the loss: L = MSE + λ·Σw². Its gradient adds 2λ·w, so every step also nudges each weight toward zero unless the data really needs it — this is “weight decay”.',
        'λ is the dial: λ = 0 is pure fitting (overfits); huge λ crushes all weights to zero (underfits, a flat line). The sweet spot is found on held-out validation data.',
      ],
      deeper: [
        'Two flavors: L2 (Σw², “ridge”) shrinks weights smoothly toward zero; L1 (Σ|w|, “lasso”) drives many weights EXACTLY to zero, effectively deleting useless inputs — automatic feature selection.',
        'This is the bias–variance tradeoff in one knob. Low λ = low bias, high variance (memorizes noise). High λ = high bias, low variance (too simple). You are trading how flexible the model is against how much it chases randomness.',
        'Weight decay is why a network with millions of parameters can still generalize: the penalty keeps almost all of them small, so the model stays simpler than its parameter count suggests.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The gradient of mean-squared-error loss with respect to a weight w works out to the average of…',
      options: [
        'error × input — 2/n·Σ(ŷ − y)·x, so points with big inputs or big errors pull hardest',
        'just the error, ignoring the input',
        'just the input, ignoring the error',
        'the true labels y alone',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: chain rule through ŷ = w·x + b gives ∂ŷ/∂w = x, so each point contributes (ŷ − y)·x. A correct point (error 0) contributes nothing.',
        'The input matters: tilting the slope moves far-out points more, so x scales each point’s vote.',
        'A perfectly-fit point has zero error and must contribute zero pull — so the error has to be in there.',
        'The gradient depends on the GAP between ŷ and y, not y by itself.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A model scores near-zero training loss but poor validation loss. You raise the regularization strength λ. What should happen?',
      options: [
        'Training loss rises a little, validation loss improves — the weight penalty stops it memorizing noise',
        'Both losses drop to zero — λ makes everything better',
        'Validation loss gets worse — λ always hurts',
        'Nothing changes — λ only affects prediction speed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: penalizing big weights makes the model simpler, so it fits the training set slightly worse but generalizes better. The gap shrinking is the goal.',
        'λ deliberately WORSENS training loss — you accept that to win on unseen data.',
        'Too much λ hurts, but from an overfit start, adding some helps — it’s a dial, not a poison.',
        'λ changes the loss being optimized, which changes the learned weights — not just speed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Linear-regression loss (MSE) is a single convex bowl. Why does that matter for gradient descent?',
      options: [
        'There is exactly one minimum, so descent can’t get trapped in a bad local valley — it always finds the best fit',
        'It means the model can’t overfit',
        'It makes the learning rate irrelevant',
        'It guarantees the data is linear',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one bowl, one bottom. Any downhill path reaches the global best. Neural nets lose this — their surfaces have many valleys, so initialization and tricks matter.',
        'A convex loss still overfits happily if the model has too many features — convexity is about the surface, not the flexibility.',
        'Too-large a rate still overshoots and diverges even in a bowl — the rate always matters.',
        'Convexity of the loss says nothing about whether a line is the right model for the data.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Cranking λ extremely high drives every weight toward zero. What does the model become, and what is this failure called?',
      options: [
        'A nearly flat line that ignores the inputs — underfitting (too much bias)',
        'A perfect fit — more regularization is always better',
        'An overfit wiggly curve — high λ causes overfitting',
        'Unchanged — λ has no upper effect',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with weights ≈ 0 the model can’t respond to x, so it underfits. λ trades variance for bias, and too much λ overshoots into pure bias.',
        'Past the sweet spot, more λ hurts — the penalty starts erasing signal, not just noise.',
        'It’s the opposite: high λ SIMPLIFIES the model. Overfitting comes from too LITTLE regularization.',
        'Large λ dominates the loss, so the weights it produces are very much affected.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'You have 5 features and closed-form least squares (the normal equations) gives an exact answer. Why would anyone use iterative gradient descent instead?',
      options: [
        'It scales to millions of features and to nonlinear models where no closed form exists — the same loop, more knobs',
        'Gradient descent is always more accurate than the closed form',
        'The closed form is mathematically wrong',
        'Gradient descent avoids needing any data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: for small linear problems the closed form wins, but it needs to invert a big matrix and only exists for linear models. GD is the general engine that also trains neural nets.',
        'On a convex linear problem the closed form is the exact optimum; GD only approaches it.',
        'The normal equations are exactly right for linear least squares — that’s their whole point.',
        'GD is entirely data-driven — it computes the gradient FROM the data every step.',
      ],
    },
    {
      question: 'L1 regularization (penalty λ·Σ|w|) is often preferred over L2 when you suspect most input features are useless. Why?',
      options: [
        'L1 drives many weights exactly to zero, effectively deleting those features — automatic feature selection',
        'L1 makes training faster by using less memory',
        'L1 never overfits under any circumstances',
        'L1 increases all weights to emphasize every feature',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: L1’s gradient pushes small weights all the way to zero, producing a sparse model that keeps only the features that matter.',
        'Speed/memory isn’t the point — it’s the SHAPE of the solution (sparse) that differs.',
        'Any model can overfit with too little penalty; L1 just fights it differently than L2.',
        'A penalty SHRINKS weights toward zero — it never inflates them.',
      ],
    },
    {
      question: 'A single point at x = 100 has a large error while all points near x = 1 are well fit. Which weight’s gradient does that far point dominate, and why?',
      options: [
        'The slope w — its gradient term is error × x, and x = 100 multiplies that point’s error by 100',
        'The intercept b — far points always dominate the intercept',
        'Neither — distance from the origin has no effect',
        'Both equally — x cancels out of the gradient',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ∂L/∂w sums (ŷ − y)·x, so an x of 100 gives that point a 100× vote on the slope. This is why outliers and unscaled features wreck training — normalize your inputs.',
        'The intercept gradient is error alone (∂ŷ/∂b = 1), so the far point has no extra leverage there.',
        'The factor of x is exactly how distance enters the slope gradient — it matters a lot.',
        'x does not cancel — it multiplies the error in the slope gradient.',
      ],
    },
    {
      question: 'Why square the errors in MSE instead of just averaging the raw gaps (ŷ − y)?',
      options: [
        'Raw gaps cancel (positives and negatives) and aren’t smooth at zero; squaring keeps every miss positive, punishes big ones more, and is easy to differentiate',
        'Squaring makes the loss smaller and faster to compute',
        'Only squared numbers can be used in a computer',
        'It’s an arbitrary choice with no effect on training',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: without squaring, a +5 and a −5 error would cancel to zero “loss”. Squaring removes the sign, weights large errors heavily, and gives the clean gradient 2·(ŷ − y).',
        'Squaring adds work, not speed — it’s chosen for its math properties, not efficiency.',
        'Computers handle absolute values and other losses fine (e.g. L1 uses |·|).',
        'The choice of loss shapes the gradients and what the model optimizes — far from arbitrary.',
      ],
    },
  ],
}
