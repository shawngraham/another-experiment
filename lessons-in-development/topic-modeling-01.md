---
id: topic-modeling-01
title: Topic Modeling: Conceptual Foundations
moduleId: topic-modeling
prerequisites:
  - text-analysis-04
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Explain the logic of Latent Dirichlet Allocation (LDA)
  - Understand the "Bag of Words" assumption
  - Differentiate between a "Topic" and a "Category"
keywords:
  - LDA
  - distant reading
  - latent
  - probability
---

# Topic Modeling: Conceptual Foundations

## Analogy

Imagine you have a giant pile of 1,000 unsorted newspaper clippings. You don't have time to read them, but you notice that some clippings use the words "stadium," "goal," and "referee" frequently, while others use "election," "vote," and "parliament." 

Even without reading the articles, you can guess that the first group is about **Sports** and the second is about **Politics**. Topic modeling is a "blind" assistant that sorts these clippings by looking at which words tend to hang out together in the same "buckets."

## Key Concepts

### Latent Dirichlet Allocation (LDA)
LDA is the most common algorithm for topic modeling. It assumes two things:
1. **Every document is a mixture of topics**: A single letter might be 60% "family gossip" and 40% "political news."
2. **Every topic is a mixture of words**: The "Family" topic has a high probability of containing "mother," "home," and "dear."

::: definition
**Latent**: Hidden. We call it "Latent" because the topics aren't explicitly labeled in the text; the computer has to discover the hidden patterns.
:::

### The Bag of Words
To a topic model, the order of words doesn't matter. "The cat sat on the mat" and "The mat sat on the cat" are identical. It only cares about the **frequency** of words within a document.

```python
# A "Bag of Words" representation in Python
doc = "history is a set of lies agreed upon"
bag = doc.split()
counts = {word: bag.count(word) for word in set(bag)}
print(counts)
```

## Practice

::: try-it
If you have two documents: 
1. "The king led the army."
2. "The queen led the navy."
What words would the computer likely group together into a "Monarchy/Military" topic? Try identifying the overlap in the sandbox.
:::

## Transfer

In your own research, think of a "topic" not as a fixed label, but as a **discourse**. If you are studying 19th-century novels, a topic might represent "Industrialization" or "Domesticity."

::: challenge
Identify shared words between two small "documents" to see how a model begins to cluster topics.
:::

---challenges---

### Challenge: Finding Topic Overlap

- id: topic-modeling-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Two sentences representing two different documents
doc_a = "the storm clouds moved over the dark mountain"
doc_b = "the rain fell on the mountain and the dark forest"

# Goal: Create a set of words that appear in BOTH documents.
# These shared words are the "glue" LDA uses to build topics.

words_a = set(doc_a.split())
words_b = set(doc_b.split())

# Your code here: use a set intersection
shared_words = set() 

print(sorted(list(shared_words)))
```

#### Expected Output

```
['dark', 'mountain', 'the']
```

#### Hints

1. You can find the intersection of two sets using `set_a & set_b`.
2. Ensure you are using the sets `words_a` and `words_b`.

#### Solution

```python
doc_a = "the storm clouds moved over the dark mountain"
doc_b = "the rain fell on the mountain and the dark forest"

words_a = set(doc_a.split())
words_b = set(doc_b.split())

shared_words = words_a & words_b

print(sorted(list(shared_words)))
```
