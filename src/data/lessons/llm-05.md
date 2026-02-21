---
id: llm-05
title: 'Beyond the Model: LLMs as Complex Systems'
moduleId: llm-foundations
prerequisites:
  - llm-04
estimatedTimeMinutes: 45
difficulty: advanced
learningObjectives:
  - Describe an LLM as a probability distribution over token sequences
  - Identify the components surrounding the model in deployed systems
  - Articulate why LLMs are both a statistical phenomenon and a cultural object
keywords:
  - language model
  - systems
  - tokens
  - probability
  - emergent behavior
  - statistics of language
  - rag
  - culture
---

# Beyond the Model: LLMs as Complex Systems

## Analogy

A pipe organ is not its pipes. The pipes are the core mechanism, but the instrument also includes the keyboard, the bellows, the stops, the wind chest, the tuning, and the room in which it stands. Change any of these and you change the music. A large language model is like a pipe organ: the transformer weights are the pipes — remarkable and central — but what you experience when you interact with one is a *system*, not just a model.

## The Fundamental Object: A Distribution Over Token Sequences

At its core, a large language model is a mathematical function that assigns **probabilities to token sequences**. Given the tokens seen so far, it outputs a probability distribution over what the next token might be:

```
P( token_n  |  token_1, token_2, ..., token_{n-1} )
```

That is all it does. Every sentence, every creative leap, every apparent flash of insight is the result of repeatedly sampling from this distribution.

The model's billions of parameters — floating-point numbers stored as weights — encode the statistical regularities of the training corpus: which words co-occur, which syntactic patterns are common, which ideas appear together across millions of documents. The model has no beliefs, no desires, no understanding in any philosophically robust sense. It has **a vast, compressed representation of the statistics of language as written by human beings**.

```python
# A tiny bigram language model illustrates the same principle at miniature scale
from collections import defaultdict

corpus = [
    "the cat sat on the mat",
    "the cat ate the rat",
    "the rat sat on the hat",
]

# Build bigram counts: for each word, what word follows it?
bigrams = defaultdict(lambda: defaultdict(int))
for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        bigrams[words[i]][words[i + 1]] += 1

def next_token_probs(word):
    counts = bigrams[word]
    total = sum(counts.values())
    return {w: c / total for w, c in sorted(counts.items(), key=lambda x: -x[1])}

probs = next_token_probs("the")
for word, prob in probs.items():
    print(f"  P('{word}' | 'the') = {prob:.2f}")
```

:::try-it
Add a fourth sentence to the `corpus` list — perhaps *"the dog chased the cat"* — and re-run the probability computation. Notice how even one sentence shifts the distribution. This is the miniature version of what changes when a model is retrained on a new or expanded dataset.
:::

## The System Around the Model

When you send a message to an LLM-based application, the journey passes through many components:

```
User Input
    │
    ▼
[Safety Classifier]      ← Is this input permitted?
    │
    ▼
[System Prompt]          ← Hidden instructions shaping behaviour
    │
    ▼
[Retrieval / RAG]        ← Relevant documents fetched from a database
    │
    ▼
[Tokenizer]              ← Text split into sub-word tokens
    │
    ▼
[Transformer Model]      ← The core probability machine
    │
    ▼
[Sampling Strategy]      ← Temperature, top-k, top-p control randomness
    │
    ▼
[Output Filter]          ← Post-hoc safety / content checks
    │
    ▼
Response
```

Each stage introduces its own assumptions, biases, and failure modes. The "AI" you interact with is this entire pipeline, not just the model weights.

:::definition
**Retrieval-Augmented Generation (RAG)**: A technique in which relevant documents are retrieved from an external database and injected into the model's context window before generation. It allows the model to answer questions about recent events or private corpora without retraining — at the cost of introducing a retrieval step whose errors compound with the model's own.
:::

## Emergent Capabilities

As models scale — more parameters, more training data, more compute — they exhibit **emergent capabilities**: abilities that appear suddenly at a scale threshold and were absent in smaller models. Multi-step arithmetic, low-resource language translation, and complex analogical reasoning have all shown this pattern.

This emergence is not fully understood. It may reflect genuine qualitative changes in what a sufficiently rich statistical representation can do, or it may reflect limitations in how capability is measured at smaller scales. Either way, it means that the behaviour of very large models cannot be reliably predicted by studying smaller ones.

## The Cultural Dimension

LLMs are trained on human writing. Human writing is not a neutral sample of reality — it is a record of *who had access to literacy, publication, and archival preservation*. The statistics of language encoded in a training corpus reflect:

- The languages and dialects with the most digitised text (heavily skewed toward English)
- The time periods, geographies, and demographics with the largest published output
- The editorial and platform choices of the organisations that assembled and filtered the data

An LLM's "knowledge" is therefore not encyclopaedic — it is *situated*. It knows more about European history than Andean history, more about the 20th century than the 12th, more about published fiction than oral tradition. The silences in an LLM's knowledge are archives of who and what has been excluded from digitised text.

## LLMs as Humanistic Objects

The lesson of this module is not simply technical. It is this:

**A large language model is among the largest objects ever produced by the humanities.** It is a single mathematical structure that has ingested more text than any human could read in a thousand lifetimes. It has no intention, no consciousness, no interpretation. And yet — because it is built from human language, shaped by human preferences through RLHF, deployed through human-designed pipelines — it expresses, amplifies, and distorts human thought at unprecedented scale.

The models are no longer just models. They have become complex sociotechnical systems — retrieval pipelines, safety classifiers, system prompts, fine-tuned personas — built on top of a fundamental digital object: a vast, compressed, and inevitably partial representation of the statistics of human language.

To use these systems responsibly, and to critique them rigorously, we need both the technical literacy to understand how they work and the humanistic sensibility to ask *whose language*, *whose values*, and *whose silences* they encode. The questions your disciplines have always asked — about power, representation, interpretation, and meaning — are exactly the questions we need to bring to these systems.

---challenges---

### Challenge: Bigram Probabilities

- id: llm-05-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
from collections import defaultdict

corpus = [
    "to be or not to be",
    "to be is to exist",
    "not to be is to vanish",
]

bigrams = defaultdict(lambda: defaultdict(int))
for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        bigrams[words[i]][words[i + 1]] += 1

def most_likely_next(word):
    """Return the single most probable next word after `word`."""
    counts = bigrams[word]
    if not counts:
        return None
    # Your code here: return the word (key) with the highest count in `counts`

print(most_likely_next("to"))
```

#### Expected Output

```
be
```

#### Hints

1. `counts` is a dictionary mapping `{next_word: frequency}`.
2. `max(counts, key=counts.get)` returns the key associated with the largest value.
3. Across all three sentences, "be" follows "to" most often (four times vs. once each for "exist" and "vanish").

#### Solution

```python
from collections import defaultdict

corpus = [
    "to be or not to be",
    "to be is to exist",
    "not to be is to vanish",
]

bigrams = defaultdict(lambda: defaultdict(int))
for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        bigrams[words[i]][words[i + 1]] += 1

def most_likely_next(word):
    counts = bigrams[word]
    if not counts:
        return None
    return max(counts, key=counts.get)

print(most_likely_next("to"))
```
