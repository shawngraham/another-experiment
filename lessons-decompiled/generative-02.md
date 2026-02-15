---
id: generative-02
title: Stochastic Text: Building Markov Chain Generators
moduleId: generative-poetics
prerequisites:
  - generative-01
estimatedTimeMinutes: 60
difficulty: intermediate
learningObjectives:
  - Define "stochastic" and "state" in text generation
  - Build a Markov chain dictionary (transition table)
  - Generate a sentence based on word probabilities
keywords:
  - markov chains
  - probability
  - stochastic
  - text generation
---

# Stochastic Text: Building Markov Chain Generators

## Analogy
Think of a Markov Chain like your smartphone’s "Auto-complete" or "Predictive Text." It doesn't know *what* you are trying to say; it only knows that when you type "How," the most likely next word is "are." It looks at the **current state** to guess the **next state**.

## Key Concepts

:::definition
**Stochastic**: A process that is randomly determined but follows a specific pattern of probability.
:::

In a **Markov Chain**, we look at a "source text" and count which words follow which other words. 

If our source is: *"The cat sat. The cat slept."*
*   After **"The"**, the next word is always **"cat"**.
*   After **"cat"**, the next word is **"sat"** (50% chance) or **"slept"** (50% chance).

We store this in a dictionary where the **Key** is the word, and the **Value** is a list of all words that have followed it.

```python
# A simple transition dictionary
markov_model = {
    "The": ["cat", "dog"],
    "cat": ["sat", "slept"],
    "dog": ["barked"]
}

import random
current_word = "The"
next_word = random.choice(markov_model[current_word])
print(next_word)
```

## Practice
:::try-it
Add more words to the `markov_model` above. Try adding "sat": ["down"] and see if you can generate a three-word chain.
:::

## Transfer
This is the basis of early "AI" poetry. By feeding a Markov model the works of Shakespeare, the computer "learns" the *style* of Shakespeare (the word transitions) without understanding the *meaning*.

:::challenge
Build a transition dictionary from a provided list of words. For every word, store the word that comes immediately after it.
:::

---challenges---
