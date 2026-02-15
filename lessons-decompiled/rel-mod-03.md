---
id: rel-mod-03
title: Vector Arithmetic in 2D Space
moduleId: relational-models
prerequisites:
  - rel-mod-02
estimatedTimeMinutes: 35
difficulty: beginner
learningObjectives:
  - Perform element-wise vector addition and subtraction in Python
  - Define the "TransE" model (Translation Embeddings) in a 2D space
  - Explain how relations act as directional "journeys" between entities
keywords:
  - vector-arithmetic
  - TransE
  - embedding-space
  - 2D-vectors
---

# Vector Arithmetic: Thinking with Directions

## Analogy: A Map of Meaning

Imagine a map where cities aren't placed by geography, but by **culture**. The North-South axis measures **Artistic Significance**, and the East-West axis measures **Economic Power**.

On this map, to get from "Florence" to "Leonardo da Vinci," you would travel a specific direction: **North-West** (High Art, Lower Economic Power). This "journey"—`[Change in Economy, Change in Art]`—is a **vector**. 

If you start at "Rome" and take that *exact same journey*, you should land near "Michelangelo." The relationship "was_home_to_artist" is a repeatable, directional step on the map.

## Key Concepts

### 1. Relationships as Translations (TransE)
The model that powers this is called **TransE**. It treats relationships as a literal translation (or "shift") across the map.

:::definition
**TransE (Translation Embedding)**: A model that represents entities as points and relationships as vectors. It assumes that if you start at the Head's coordinates and "walk" along the Relation's vector, you will arrive at the Tail's coordinates.
`Head + Relation ≈ Tail`
:::

### 2. The Arithmetic of Meaning
In Python, we represent these 2D coordinates as lists with two numbers. To add vectors, we add each element at the same index.

```python
# Coordinates: [Economic_Power, Artistic_Significance]
florence = [7, 9]
was_home_to_artist = [-2, 1] # Move left (less econ), move up (more art)

# Predict the artist's location
# Add the first elements: 7 + (-2) = 5
# Add the second elements: 9 + 1 = 10
da_vinci = [florence[0] + was_home_to_artist[0], florence[1] + was_home_to_artist[1]]

print(f"The artist is at: {da_vinci}")
```

## Practice

:::try-it
In the sandbox, create coordinates for "UK" `[8, 6]` and a "capital_of" relation `[-1, 2]`. Calculate the coordinates for "London" by adding the two vectors element-wise.

```python
uk = [8, 6]
capital_of = [-1, 2]

london_x = uk[0] + capital_of[0]
london_y = uk[1] + capital_of[1]

print([london_x, london_y])
```
:::

## Transfer: Detecting Bias through Subtraction

This vector arithmetic is a powerful tool for digital humanities research. By training a model on historical texts, we can uncover hidden biases.

If we calculate the vector for `Doctor - Man + Woman\

---challenges---
