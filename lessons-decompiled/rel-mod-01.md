---
id: rel-mod-01
title: The Geometry of Language
moduleId: relational-models
prerequisites:
  - python-basics
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Explain the distributional hypothesis ("words are known by the company they keep")
  - Visualize words as coordinates in a multi-dimensional space
  - Calculate basic similarity between two word concepts using Python
keywords:
  - word-vectors
  - embeddings
  - similarity
  - abs
---

# The Geometry of Language

## The Library of Proximity

Imagine a library where books aren't organized by alphabet or author, but by **meaning**. 

In this library, the distance between two books tells you how much they have in common. To find a book about "Sailing," you don't look for the letter 'S'; you walk toward the "Ocean" section. 

If you walk 5 steps from "King" to "Man," and then walk 5 steps from "Queen" in the same direction, you should arrive at "Woman." This "Map of Meaning" is what computer scientists call a **Vector Space**.

## Key Concepts

### 1. The Distributional Hypothesis
Computers don't have childhood memories or sensory experiences. They learn what "Coffee" is by noticing it often appears near words like "mug," "drink," "caffeine," and "morning."

:::definition
**Distributional Hypothesis**: The idea that words appearing in similar contexts share similar meanings.
:::

### 2. Words as Coordinates
To place a word on a map, we give it coordinates. In a 2D map, a point is `[x, y]`. In language models, we might use hundreds of dimensions.

Imagine we score words based on two features: **[Nature, Technology]**.
*   **Tree**: `[0.9, 0.1]` (High nature, Low tech)
*   **Circuit**: `[0.1, 0.9]` (Low nature, High tech)
*   **Park**: `[0.7, 0.2]` (Mostly nature, some tech like benches/lights)

These lists of numbers are called **Word Vectors** or **Embeddings**.

### 3. Measuring the Gap
To find out how similar two words are, we calculate the **distance** between their coordinates. 

A simple way to start is with the `abs()` (absolute value) function. This tells us the positive distance between two numbers, regardless of which one is larger.

```python
# If "Epic_Poetry" has a Formality score of 9
# and "Diary_Entry" has a Formality score of 3
distance = abs(9 - 3) # Result: 6 — they are quite different
```

When we have **two features**, we find the total distance by adding the absolute differences for each dimension. This is called the **Manhattan Distance** (imagine walking along a city grid rather than flying in a straight line).

## Practice: Comparing Texts on a Feature Map

In the sandbox, we place two types of historical text on a 2D map of **[Formality, Sentiment]** and calculate the total gap across both dimensions.

:::try-it
Calculate the distance between a royal proclamation and a love letter using both features.

```python
# Coordinates: [Formality, Sentiment]
royal_proclamation = [9, 3]
love_letter = [2, 9]

# Total distance = abs difference in Formality + abs difference in Sentiment
dist = abs(royal_proclamation[0] - love_letter[0]) + abs(royal_proclamation[1] - love_letter[1])
print(f"The distance is: {dist}")
```
:::

## Transfer: Changing Contexts

How might "Word Vectors" change based on the archive you use? 

If you trained a model on **18th-century medical journals**, the word "Treatment" would be geographically very close to "Leeches" and "Bloodletting." In a **21st-century** model, "Treatment" would move far away from "Leeches" and closer to "Antibiotics" or "Therapy."

---challenges---
