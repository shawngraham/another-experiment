---
id: critical-data-03
title: Feedback Loops: When Output Becomes Input
moduleId: critical-data
prerequisites:
  - critical-data-02
estimatedTimeMinutes: 50
difficulty: intermediate
learningObjectives:
  - Explain how algorithmic feedback loops amplify small initial biases into large disparities
  - Simulate a multi-round feedback loop in Python using weighted random selection
  - Identify real-world examples of feedback loops in digital humanities and cultural data
keywords:
  - feedback loop
  - bias amplification
  - algorithmic bias
  - runaway effect
  - weighted selection
  - compounding bias
---

# Feedback Loops: When Output Becomes Input

## Analogy

Imagine a bookstore that tracks which books sell best and then gives those books more prominent shelf space. The prominently displayed books sell even better -- because customers see them first. Next month, the algorithm gives them still more space. Within a few cycles, a handful of bestsellers dominate the entire storefront, while equally worthy books gather dust in the back. The algorithm did not set out to silence those books. It simply treated its own output as trustworthy input, and a small initial advantage compounded into dominance.

This is a feedback loop: when a system's outputs are fed back as its inputs, small biases do not stay small. They grow.

## Key Concepts

### What Is a Feedback Loop?

:::definition
**Feedback loop**: A process in which the output of a system becomes part of its future input, causing effects to compound over time. In algorithmic systems, feedback loops can amplify small initial biases into large systematic distortions.
:::

In digital humanities, feedback loops appear whenever algorithmic results influence future data:

- A search engine that ranks frequently-clicked results higher causes those results to be clicked even more.
- A recommendation system that suggests popular texts makes those texts more popular, crowding out lesser-known works.
- A digitization priority list based on "research demand" favors already-digitized collections, because researchers can only request what they know exists.

### Simulating a Feedback Loop

We can model this with a simple simulation. Suppose we have two groups, A and B, where A starts with a slight majority (55% vs 45%). An algorithm selects items from this pool -- but it gives a small extra weight to whichever group is currently in the majority. Each round's output becomes the next round's input.

```python
import random

random.seed(27)

pool = ["A"] * 550 + ["B"] * 450
total = len(pool)

a_count = pool.count("A")
b_count = pool.count("B")
print(f"Start: A={a_count/total*100:.0f}%, B={b_count/total*100:.0f}%")

# One round of biased selection
weight_a = a_count * 1.15  # 15% bonus to majority
weight_b = b_count
pool = random.choices(["A", "B"], weights=[weight_a, weight_b], k=total)
a_count = pool.count("A")
b_count = pool.count("B")
print(f"After: A={a_count/total*100:.0f}%, B={b_count/total*100:.0f}%")
```

After just one round, Group A's advantage has grown. The 15% bonus does not look dramatic in a single iteration -- but watch what happens when we repeat the process.

### Why Small Biases Compound

The key insight is multiplicative amplification. Each round, the majority group's advantage is not just preserved -- it is multiplied. If Group A has 55% and receives a 15% weight bonus, it will likely end up with more than 55% after selection. In the next round, that higher percentage gets the bonus again. The gap widens not by a fixed amount but by an accelerating amount.

This is analogous to compound interest: a small rate applied repeatedly produces exponential growth. In bias terms, a 10-point gap can become a 40-point gap within a few cycles.

:::definition
**Bias amplification**: The process by which an initially small disparity grows larger through repeated application of a biased process. Even a "slight" algorithmic preference can produce dramatic disparities over multiple iterations.
:::

### The Real-World Stakes

Feedback loops are not hypothetical:

- **Predictive policing**: Algorithms that direct police to neighborhoods where past arrests were highest lead to more arrests in those neighborhoods, which "confirms" the algorithm's prediction, which sends even more police.
- **Search autocomplete**: Suggestions based on past searches reinforce stereotypical associations. If many users have searched biased phrases, the autocomplete presents those phrases to new users, who click on them, reinforcing the pattern.
- **Canon formation**: Digital archives that prioritize frequently-studied authors make those authors easier to study, which produces more scholarship on them, which makes them seem even more "canonical."

### Breaking the Loop

Recognizing a feedback loop is the first step to breaking it. Strategies include:

- **Diversification quotas**: Ensuring that selection algorithms reserve space for underrepresented items.
- **Decay weighting**: Reducing the influence of historical data over time so that past biases do not permanently determine future outcomes.
- **Audit rounds**: Periodically measuring representation (as we learned in the previous lesson) to detect amplification before it becomes extreme.

## Practice

:::try-it
Modify the simulation below to experiment with different bias levels. What happens if the weight bonus is 5% instead of 15%? What about 25%? How many rounds does it take for Group B to drop below 20% in each case? Try changing `random.seed()` to different values -- does the overall trend hold even when individual rounds vary?
:::

## Transfer

Consider a digital humanities project that involves ranking, recommendation, or selection:

- Does the system's output influence its future input in any way?
- Could a small initial imbalance in the training data compound over time?
- What would an "audit round" look like for your project -- how would you measure whether bias is amplifying?

The media scholar Safiya Umoja Noble documents how search engine feedback loops perpetuate racist and sexist representations. Her work reminds us that algorithms do not need malicious intent to produce harmful outcomes -- they only need to run in loops.

:::challenge
Simulate 5 rounds of biased selection where a majority group receives a 15% weight bonus each round. Print the percentages after each round, showing how the initial 55/45 split widens progressively.
:::

---challenges---
