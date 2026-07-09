import type { Lesson } from '../../types'

export const aiLearning3Lesson: Lesson = {
  nodeId: 'ai-learning-3',
  screens: [
    {
      kind: 'explain',
      title: 'How a network actually learns',
      body: [
        'A neural net is just functions stacked in a chain: an input flows through weight after weight to a prediction, then a loss measures how wrong that prediction is. To train it we need ∂loss/∂w for EVERY weight — including ones buried deep in the middle.',
        'Backpropagation is how you get all of them in one backward sweep. It is nothing more than the CHAIN RULE applied to the chain of operations — the exact rule from math-mv, now doing real work.',
        'Forward pass computes the answer; backward pass hands each weight its share of the blame.',
      ],
      links: [
        { nodeId: 'math-mv-2', label: 'The chain rule = “sum over paths”' },
        { nodeId: 'math-calculus-2', label: 'Refresher: the chain rule' },
      ],
    },
    {
      kind: 'predict',
      question:
        'A tiny net: h = w₁·x, then ŷ = w₂·h, then loss L = (ŷ − t)². To get ∂L/∂w₁ (the deepest weight), the chain rule multiplies the local slopes along the path from L back to w₁. How many factors get multiplied?',
      options: [
        'Three — ∂L/∂ŷ · ∂ŷ/∂h · ∂h/∂w₁, one link per operation on the path',
        'One — you only need the loss’s slope',
        'Two — the input layer doesn’t count',
        'Zero — deep weights can’t be reached',
      ],
      correctIndex: 0,
      reveal:
        'The chain rule walks the whole path: L depends on ŷ (factor ∂L/∂ŷ = 2(ŷ−t)), ŷ depends on h (factor ∂ŷ/∂h = w₂), and h depends on w₁ (factor ∂h/∂w₁ = x). Multiply all three: ∂L/∂w₁ = 2(ŷ−t)·w₂·x. That “multiply the slopes back along the path” is the entire idea. Backprop just reuses shared factors so a million-weight net costs about the same as one forward pass — not a million.',
    },
    {
      kind: 'explain',
      title: 'Forward, then backward — worked',
      body: [
        'Take x = 2, w₁ = 1, w₂ = 3, target t = 10. Forward: h = 1·2 = 2, ŷ = 3·2 = 6, loss = (6 − 10)² = 16.',
        'Backward, storing each running slope: ∂L/∂ŷ = 2·(6 − 10) = −8. Then ∂L/∂w₂ = ∂L/∂ŷ · h = −8·2 = −16. Push further back: ∂L/∂h = ∂L/∂ŷ · w₂ = −8·3 = −24.',
        'Last link: ∂L/∂w₁ = ∂L/∂h · x = −24·2 = −48. Notice −8 was computed once and reused for both weights — that reuse IS backprop’s speed. Now code the backward pass.',
      ],
      deeper: [
        'The reused quantity (here −8, and −24) is called the “upstream gradient” — each node receives the gradient of the loss w.r.t. its own output, then multiplies by its LOCAL derivative to pass gradient to its inputs. Every operation only needs to know its local rule.',
        'Real networks put a nonlinear “activation” (like ReLU or sigmoid) between layers; that just adds one more local factor (the activation’s slope) to the product. Karpathy’s micrograd builds exactly this, one operation at a time.',
        'This is why the chain-rule lesson was the prerequisite: a deep net is a very long product of local slopes, and training is nothing but evaluating that product for every weight, efficiently.',
      ],
      links: [{ nodeId: 'ai-neural', label: 'The networks this trains' }],
    },
    {
      kind: 'code',
      prompt:
        'Complete the last backward step so ∂L/∂w₁ chains all the way to the input (multiply by x). Expected: the forward values y = 6.00, loss = 16.00, then the gradients ∂L/∂w1 = −48.00 and ∂L/∂w2 = −16.00.',
      starter: `const x = 2, w1 = 1, w2 = 3, t = 10

// forward pass
const h = w1 * x
const y = w2 * h
const L = (y - t) ** 2
print('y', y.toFixed(2), 'loss', L.toFixed(2))

// backward pass — multiply local slopes back along the path
const dy = 2 * (y - t)      // dL/dy
const dw2 = dy * h          // dL/dw2 = upstream * local(h)
const dh = dy * w2          // dL/dh  = upstream * local(w2)
const dw1 = dh              // <-- finish: dL/dw1 = dL/dh * local(x)
print('dL/dw1', dw1.toFixed(2), 'dL/dw2', dw2.toFixed(2))`,
      expected: `y 6.00 loss 16.00
dL/dw1 -48.00 dL/dw2 -16.00`,
      hint: 'h = w1 * x, so ∂h/∂w1 = x. The last link is dw1 = dh * x.',
      success:
        'You chained the loss’s slope all the way back to the deepest weight by multiplying one local factor (x) at a time. Leave off the “* x” and ∂L/∂w1 reads −24.00 — the gradient stops one link short and w₁ never learns its true share of the blame. That missing factor is the difference between a network that trains and one that doesn’t.',
    },
    {
      kind: 'quiz',
      question: 'Backpropagation is, at its core, an efficient application of which single idea from calculus?',
      options: [
        'The chain rule — multiply the local derivatives along the path from loss back to each weight',
        'Integration — accumulating area under the loss',
        'The quadratic formula',
        'Matrix determinants',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a net is a chain of operations, so ∂loss/∂weight is a product of local slopes — exactly the chain rule, evaluated backward.',
        'Training is about slopes (derivatives), not accumulating area.',
        'No roots of a quadratic here — it’s repeated multiplication of derivatives.',
        'Determinants measure volume scaling; backprop is the chain rule, not a determinant.',
      ],
    },
    {
      question: 'In the worked net, ∂L/∂ŷ = −8 was computed once and used to get BOTH ∂L/∂w₂ and (via ∂L/∂h) ∂L/∂w₁. Why does that reuse matter?',
      kind: 'quiz',
      options: [
        'Sharing upstream gradients lets a whole network be differentiated in about one backward pass instead of recomputing paths per weight',
        'It makes the answer more accurate',
        'It’s a coincidence that doesn’t generalize',
        'It only saves time for exactly two weights',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each node computes its output-gradient once and reuses it for every input beneath it. That’s why training a million-weight net is affordable.',
        'Reuse changes the COST, not the value — the gradients are identical either way.',
        'It generalizes to any computation graph — every shared node’s gradient is reused downstream.',
        'The saving compounds with depth and width — the deeper the net, the more reuse pays off.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why must the forward pass run and store its intermediate values (like h) BEFORE the backward pass?',
      options: [
        'The local derivatives depend on those values — e.g. ∂L/∂w₂ = ∂L/∂ŷ · h needs h’s actual number',
        'It doesn’t matter — you can run them in any order',
        'Storing h saves disk space',
        'The backward pass computes h, so forward is optional',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: gradients are local slopes evaluated AT the current activations, so you need those numbers cached from the forward pass.',
        'Order is fixed: you can’t know a slope at a point before you know the point.',
        'It’s about correctness, not storage — the cached values are inputs to the gradient formulas.',
        'The forward pass is what PRODUCES h and ŷ; backward only reads them.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Adding a nonlinear activation g between the layers (h = g(w₁·x)) changes backprop how?',
      options: [
        'It inserts one more local factor — g’s own slope g′ — into the product for that path',
        'It breaks the chain rule, so gradients can’t be computed',
        'It removes the need for the chain rule entirely',
        'It doubles every weight’s gradient',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an activation is just another operation on the path, so its derivative g′ becomes one more multiplied factor. Nothing else changes.',
        'The chain rule handles any differentiable operation — activations included.',
        'You need the chain rule MORE, not less: the activation is an extra link to chain through.',
        'It multiplies that path by g′, which is not generally 2 — no automatic doubling.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A very deep network multiplies many local slopes together on each path. If most of those slopes are around 0.1, what happens to ∂L/∂w for the earliest layers?',
      options: [
        'It shrinks toward zero — the vanishing-gradient problem, so early layers barely learn',
        'It grows huge — deep always means bigger gradients',
        'It stays exactly the same at every depth',
        'It becomes negative regardless of the data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 0.1 multiplied many times → nearly 0. Early layers get almost no signal. This is why ReLU (slope 1 for positive inputs) and skip connections were invented.',
        'Slopes below 1 SHRINK the product; slopes above 1 would explode it — the opposite failure.',
        'The product changes with depth — that’s the whole issue with very deep nets.',
        'The sign depends on the data and weights, not on depth alone.',
      ],
    },
    {
      question: 'You compute a weight’s gradient by hand and get 0. Assuming the loss isn’t already minimized, what does a zero gradient on a path most likely mean?',
      options: [
        'Some local factor on that path is zero (e.g. the input x = 0, or a dead ReLU), so no blame flows back through it',
        'The weight is already perfect',
        'The learning rate is too high',
        'Backprop has failed and must be restarted',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the gradient is a product of local slopes — a single zero factor (x = 0, or an activation whose slope is 0) zeros the whole path. “Dead” ReLU units do exactly this.',
        'A zero gradient can mean an optimum, but with nonzero loss it usually means a blocked path, not perfection.',
        'The learning rate scales the step; it doesn’t make the computed gradient zero.',
        'A zero from a zero factor is correct arithmetic, not a bug.',
      ],
    },
    {
      question: 'In micrograd-style autograd, each operation stores its inputs and a local “backward” rule. How does this give you gradients for an arbitrary network for free?',
      options: [
        'Walk the graph backward, and at each node multiply the incoming (upstream) gradient by that node’s local rule — the chain rule, automated',
        'It guesses the gradients by trying random values',
        'It solves the normal equations for the whole network',
        'It only works for networks with one weight',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: because every op knows its local derivative, traversing the graph in reverse and multiplying accumulates ∂loss/∂x for every node — exactly what backprop does.',
        'No guessing: each local rule is an exact derivative, chained deterministically.',
        'The normal equations are the closed form for LINEAR least squares; autograd handles arbitrary nonlinear graphs.',
        'It scales to millions of weights — the graph traversal is general.',
      ],
    },
    {
      question: 'Why is backprop dramatically cheaper than computing each weight’s gradient separately by nudging it and re-running the network (numerical differentiation)?',
      options: [
        'Backprop gets ALL gradients in one backward pass by reusing shared upstream values; nudging each of N weights needs ~N full forward passes',
        'Numerical differentiation is actually faster and more accurate',
        'They cost the same; backprop is just more popular',
        'Backprop avoids ever running the forward pass',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one forward + one backward pass yields every gradient, versus roughly one forward pass per weight for finite differences — the difference between hours and years on a big net.',
        'Finite differences is both slower (N passes) and less accurate (rounding error) than analytic backprop.',
        'The cost gap is enormous and is exactly why backprop made deep learning practical.',
        'Backprop requires the forward pass first — it reuses those stored values.',
      ],
    },
  ],
}
