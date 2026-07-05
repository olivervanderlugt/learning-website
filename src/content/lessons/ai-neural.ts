import type { Lesson } from '../../types'

export const aiNeuralLesson: Lesson = {
  nodeId: 'ai-neural',
  screens: [
    {
      kind: 'explain',
      title: 'A neuron is a weighted vote',
      body: [
        'Strip the mystique: an artificial neuron multiplies each input by a weight, adds a bias, and fires if the total crosses zero. That’s it — w₁·x₁ + w₂·x₂ + b > 0.',
        'You’ve seen this math twice already: it’s a dot product (your vectors lesson), and thresholding it is a logic decision (your gates lesson).',
        'The weights ARE the knowledge: training (gradient descent, last lesson) is just finding weights that vote correctly.',
      ],
      links: [
        { nodeId: 'math-linalg', label: 'Refresher: dot products (Vectors & Matrices)' },
        { nodeId: 'ai-learning', label: 'Refresher: how weights get trained' },
      ],
    },
    {
      kind: 'predict',
      question: 'One neuron with two inputs draws a decision boundary between “fire” and “don’t”. What SHAPE is that boundary?',
      options: [
        'A straight line — always, no matter the weights',
        'Any curve, if the weights are clever',
        'A circle around the origin',
        'It has no geometric shape',
      ],
      correctIndex: 0,
      reveal:
        'w₁·x + w₂·y + b = 0 is the equation of a straight LINE — the weights tilt it, the bias shifts it, and that is the entire repertoire. One neuron, one line (in higher dimensions: one flat plane). Everything a single neuron can ever learn must be separable by one straight cut. Hold that thought — you’re about to hit its wall.',
    },
    {
      kind: 'game',
      gameId: 'neural-playground',
    },
    {
      kind: 'explain',
      title: 'Layers: lines that build shapes',
      body: [
        'You just proved a famous theorem by hand: XOR cannot be cut by one line (this stalled AI research for years around 1970).',
        'The escape: feed the inputs to TWO neurons (two lines), then feed THEIR outputs to a third neuron that combines them — “inside the band” = below one line AND above the other. A hidden layer.',
        'Stack more layers and lines compose into arbitrary shapes. Deep networks are geometry factories: each layer bends the space the next one cuts.',
      ],
      deeper: [
        'Why did XOR stall a field? Minsky & Papert proved (1969) single-layer perceptrons can’t do it, and funding froze — the first “AI winter”. The fix (hidden layers) was known in principle; what was missing until the 1980s was an efficient way to TRAIN them: backpropagation.',
        'Backpropagation is the chain rule from calculus applied layer by layer: how much did each weight, deep in the stack, contribute to the final error? Compute that (one backward sweep), then gradient-descent every weight at once.',
        'Modern scale: your XOR needed 3 neurons; a vision model has millions, organized in layers that learn edges → textures → parts → objects. Same neuron, same descent — just repeated astronomically and fed enough data.',
      ],
    },
    {
      kind: 'explain',
      title: 'What this buys a robot',
      body: [
        'Classical code handles what you can specify: PID loops, kinematics, A*. Networks handle what you can only exemplify: recognizing a mug from any angle, in any light.',
        'A modern robot stack is a sandwich: learned perception (camera pixels → “mug at 30 cm”) feeding classical control (grasp planning, PID) — each doing what it’s best at.',
        'Know both and you know where the boundary belongs. That judgment is rarer than either skill alone.',
      ],
      deeper: [
        'Why not learn EVERYTHING end-to-end? Sometimes people do (pixels → motor torques), but learned controllers are hard to certify: you can prove a PID loop stable; you can’t (yet) prove a neural policy never does something bizarre. Safety-critical layers stay classical for a reason.',
        'The perception/control boundary is also a DATA boundary: perception failures are cheap to collect and label (photos), control failures break robots. Learn where data is abundant; engineer where mistakes are expensive.',
        'This sandwich is exactly why your curriculum looks like it does: control theory AND machine learning, physics AND data. The robotics engineers who thrive are bilingual.',
      ],
      links: [{ nodeId: 'robo-control', label: 'The classical half: Control Loops & PID' }],
    },
    {
      kind: 'quiz',
      question: 'A single artificial neuron computes…',
      options: [
        'A weighted sum of inputs plus a bias, then fires if it crosses a threshold',
        'A random guess refined by luck',
        'An exact copy of a brain cell’s chemistry',
        'A lookup in a table of memorized answers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: w·x + b, thresholded — a dot product wearing a decision hat.',
        'Nothing random at inference: same inputs and weights, same output, every time.',
        'It’s a cartoon inspired by neurons, not a simulation of one — the resemblance is loose.',
        'No table: the “memory” is compressed into a handful of weights.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why couldn’t any weight setting solve XOR in the playground?',
      options: [
        'XOR’s classes can’t be separated by one straight line, and one neuron IS one line',
        'The sliders didn’t have enough range',
        'XOR needs at least a million neurons',
        'The learning rate was wrong',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the diagonal pairs sit crosswise — any line that gets both ● has an ✗ on the wrong side. Provably impossible, not just hard (Minsky & Papert, 1969).',
        'No range helps: the impossibility is geometric, true for ANY w₁, w₂, b.',
        'THREE neurons suffice: two lines plus one combiner — that’s the whole hidden-layer story.',
        'There was no training loop — you WERE the optimizer, and no setting exists to find.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does a hidden layer fundamentally add?',
      options: [
        'Multiple lines whose combination cuts shapes no single line can',
        'More memory for storing training examples',
        'A faster CPU path',
        'Protection against overfitting',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each hidden neuron draws its own line; the next layer logically combines their verdicts (AND/OR of half-planes) — the green band that caught XOR.',
        'Networks don’t store examples — weights encode boundaries, not data.',
        'Extra layers are more computation, not less — the gain is expressiveness.',
        'The opposite pressure: more capacity makes overfitting EASIER — which is why your last lesson’s test-set discipline matters more, not less.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Backpropagation is…',
      options: [
        'The chain rule sweeping backwards to assign each weight its share of the error, so all can be descended at once',
        'Running the network backwards to generate inputs',
        'A way to avoid needing gradients',
        'Randomly perturbing weights until loss drops',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one backward pass computes ∂loss/∂weight for EVERY weight — the bookkeeping that finally made deep training practical in the 1980s.',
        'That’s a different (real) trick — backprop is strictly about credit assignment for training.',
        'It’s the opposite: the efficient way to GET the gradients that descent needs.',
        'Random perturbation exists but is hopeless at scale — millions of knobs need directed credit, not luck.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do safety-critical robot layers (balance, emergency stop) stay classical while perception goes neural?',
      options: [
        'Classical controllers can be mathematically proven stable; neural policies (so far) can’t — so learn where data is cheap, engineer where mistakes are expensive',
        'Neural networks are too slow for any control',
        'Perception is less important than control',
        'Regulations ban all learning on robots',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: certifiability draws the boundary — you can prove a PID loop’s behavior; a million-weight policy resists proof. The sandwich architecture is a risk decision.',
        'Modern networks run in milliseconds — speed isn’t the blocker; provability is.',
        'Perception is critical — which is exactly why it gets the tool (learning) that handles unstructured input best.',
        'No such blanket ban — teams choose the split themselves, on certifiability grounds.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A vision network’s early layers typically learn edges; later layers learn object parts. Why that order?',
      options: [
        'Each layer builds on the previous one’s output — complex shapes are compositions of simpler ones',
        'Engineers hand-code the edge detectors first',
        'Later layers train earlier in time',
        'It’s alphabetical coincidence',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: layer n can only combine what layer n−1 provides — so features compose upward: edges → textures → parts → objects. Lines building shapes, at scale.',
        'Nothing is hand-coded — the hierarchy EMERGES from training, which is the remarkable part.',
        'All layers train together via backprop — the hierarchy is structural, not chronological.',
        'The composition logic is geometric necessity, not naming.',
      ],
    },
    {
      question: 'Your 2-line XOR solution used neurons computing “below line 1” and “above line 2”, combined with AND. Which earlier lesson is that combiner from?',
      options: [
        'Logic — the AND of two true/false verdicts (same as an AND gate)',
        'Probability — averaging two guesses',
        'Calculus — integrating two curves',
        'Chemistry — bonding two atoms',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the output neuron is literally an AND gate over the hidden neurons’ votes — Boolean algebra wearing learned weights. One graph, every subject.',
        'No averaging — the combination is a hard logical conjunction (both must hold).',
        'No integration involved — just thresholded votes.',
        'Tempting metaphor, wrong mechanism.',
      ],
    },
  ],
}
