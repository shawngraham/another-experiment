---
id: llm-02
title: 'The Art of Paying Attention: Transformers and Self-Attention'
moduleId: llm-foundations
prerequisites:
  - llm-01
estimatedTimeMinutes: 50
difficulty: advanced
learningObjectives:
  - Describe the Query, Key, Value framework for attention
  - Explain why attention replaced recurrence in sequence models
  - Compute a basic attention weight distribution by hand
keywords:
  - attention
  - transformer
  - query key value
  - self-attention
  - sequence modeling
  - softmax
---

# The Art of Paying Attention: Transformers and Self-Attention

## Analogy

Imagine writing a summary of a dense archival document. You do not read every word with equal care: when you write "the king signed the decree," your eye is drawn back to the king's name, the nature of the decree, the date. You *attend* selectively to what is most relevant. The **attention mechanism** formalises this selective focus mathematically, letting a model weigh every part of its input dynamically rather than treating all positions equally.

## Why Attention? The Problem with Earlier Approaches

Before the 2017 paper *"Attention Is All You Need"* (Vaswani et al.), sequence models processed text word by word, left to right, carrying a **hidden state** that compressed everything seen so far. The problem: that hidden state is a single fixed-size vector. By word 400 of a 500-word document, information from word 1 has been overwritten. Long-range dependencies — the pronoun that refers to a noun fifty words back — were difficult to capture.

**Attention solves this** by letting every position look directly at every other position, regardless of distance.

## Query, Key, Value: A Library Analogy

Think of a library retrieval system:

- **Query (Q)**: Your search request — *"books about 17th-century astronomy"*
- **Keys (K)**: The catalogue labels on every book — *"astronomy-1632"*, *"theology-1680"*, ...
- **Values (V)**: The actual content inside each book

The system scores your query against every key. Books whose labels match your query get high scores; those scores determine how much of each book's *content* flows into your result.

In a Transformer:
1. Each token's embedding is projected into three vectors: Q, K, and V.
2. Each token's Q is compared (via dot product) with every other token's K.
3. The scores are scaled and passed through **softmax** to produce **attention weights** — probabilities that sum to 1.
4. The output is a weighted sum of all V vectors.

:::definition
**Self-Attention**: When a sequence attends to itself — every position queries every other position in the same input. This is the core operation of the Transformer architecture.
:::

## The Mathematics

For a sequence of n tokens, each represented as a vector of dimension d:

```
Attention(Q, K, V) = softmax( Q · Kᵀ / √d ) · V
```

The `√d` scaling prevents dot products from growing too large in high-dimensional spaces, which would push the softmax into near-zero gradients and stall learning.

```python
import math

def softmax(scores):
    """Convert a list of raw scores to a probability distribution."""
    max_score = max(scores)  # numerical stability trick
    exp_scores = [math.exp(s - max_score) for s in scores]
    total = sum(exp_scores)
    return [e / total for e in exp_scores]

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

# Toy example: 3 tokens, 2-dimensional Q/K/V vectors
# Tokens: ["The", "ancient", "manuscript"]
queries = [[1.0, 0.0], [0.5, 0.5], [0.0, 1.0]]
keys    = [[1.0, 0.0], [0.6, 0.4], [0.0, 1.0]]
values  = [[1.0, 0.0], [0.5, 0.5], [0.0, 1.0]]

d = len(queries[0])

# Attention from position 0 ("The") to all positions
q = queries[0]
raw_scores = [dot(q, k) / math.sqrt(d) for k in keys]
weights = softmax(raw_scores)

print("Attention weights from 'The':", [f"{w:.3f}" for w in weights])

# Weighted sum of values produces the output for "The"
output = [sum(weights[i] * values[i][j] for i in range(3)) for j in range(d)]
print("Output vector:", [f"{v:.3f}" for v in output])
```

:::try-it
Change `queries[0]` from `[1.0, 0.0]` to `[0.0, 1.0]` and observe how the attention weights shift. Which token does "The" now attend to most? This is how changing a word's query vector changes what it "looks for" in the rest of the sequence.
:::

## Multi-Head Attention

A single attention operation captures one kind of relationship (perhaps subject-verb agreement). **Multi-head attention** runs several attention operations in parallel, each with different learned Q/K/V projections, then concatenates the results. Each "head" can specialise in a different linguistic relationship — one might track coreference, another might track syntactic dependencies.

## Transfer

For literary scholars and historians, attention weights are interpretable artifacts. Researchers have visualised attention heads in BERT and found that some heads track pronouns back to their antecedents, others track syntactic governors. This makes attention a potential analytical tool for computational stylistics — though always with the caveat that correlation with linguistic structure does not equal causal explanation.

---challenges---

### Challenge: Compute Attention Weights

- id: llm-02-c1
- language: python
- difficulty: advanced

#### Starter Code

```python
import math

def softmax(scores):
    max_score = max(scores)
    exp_scores = [math.exp(s - max_score) for s in scores]
    total = sum(exp_scores)
    return [e / total for e in exp_scores]

keys = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [1.0, 1.0, 0.0],
]

query = [1.0, 0.0, 0.0]
d = len(query)

# Your code here: compute raw_scores as a list.
# For each key k in keys, the raw score = dot(query, k) / sqrt(d)
# where dot product = sum of element-wise products.
raw_scores = []  # replace this line with your computation

weights = softmax(raw_scores)
best = weights.index(max(weights))
print(best)
```

#### Expected Output

```
0
```

#### Hints

1. Loop over each key in `keys` and compute `sum(query[i] * k[i] for i in range(d)) / math.sqrt(d)`.
2. Collect those values into a list called `raw_scores`.
3. The first key `[1.0, 0.0, 0.0]` perfectly aligns with the query, so it receives the highest weight and `best` will be index 0.

#### Solution

```python
import math

def softmax(scores):
    max_score = max(scores)
    exp_scores = [math.exp(s - max_score) for s in scores]
    total = sum(exp_scores)
    return [e / total for e in exp_scores]

keys = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [1.0, 1.0, 0.0],
]

query = [1.0, 0.0, 0.0]
d = len(query)

raw_scores = [
    sum(query[i] * k[i] for i in range(d)) / math.sqrt(d)
    for k in keys
]

weights = softmax(raw_scores)
best = weights.index(max(weights))
print(best)
```
