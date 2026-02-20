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

If we calculate the vector for `Doctor - Man + Woman`, a perfectly unbiased model would result in `Doctor`. However, models trained on 20th-century texts often result in `Nurse`. The vector difference between the expected and actual result gives us a measurable coordinate for the social bias present in the archive.

:::challenge
Apply vector arithmetic to predict entity positions and identify relationship vectors.
:::

---challenges---

### Challenge: Predicting the Tail in 2D

- id: rel-mod-03-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Coordinates: [Military_Power, Political_Influence]
rome = [10, 8]
had_emperor = [-1, 2] # Relation: Less military, more political

# 1. Add the first elements (index 0) together
x = rome[0] + had_emperor[0]

# 2. Add the second elements (index 1) together
# Your code here
y = 

# 3. Combine them into the final coordinate list
augustus = [x, y]
print(augustus)
```

#### Expected Output

```
[9, 10]
```

#### Hints

1. To get the second number in a list, use `list_name[1]`.
2. The `y` coordinate should be `rome[1] + had_emperor[1]`.
3. If you just did `rome + had_emperor`, you would get a list with 4 items. We want a list with 2 items!

#### Solution

```python
rome = [10, 8]
had_emperor = [-1, 2]

x = rome[0] + had_emperor[0]
y = rome[1] + had_emperor[1]

augustus = [x, y]
print(augustus)
```

### Challenge: Finding the Relationship Vector

- id: rel-mod-03-c2
- language: python
- difficulty: beginner

#### Starter Code

```python
# Coordinates: [Critical_Acclaim, Popular_Reach]
jane_austen = [8, 7]
pride_and_prejudice = [9, 10]

# The triple is: (Austen, "authored", Pride_and_Prejudice)
# Head = jane_austen, Tail = pride_and_prejudice
# Calculate the relation vector: Tail - Head

# 1. Subtract index 0 of the Head from index 0 of the Tail
x = pride_and_prejudice[0] - jane_austen[0]

# 2. Subtract index 1 of the Head from index 1 of the Tail
y =

authored = [x, y]
print(authored)
```

#### Expected Output

```
[1, 3]
```

#### Hints

1. Remember the formula: `Relation = Tail - Head`.
2. To find the change in "Popular Reach" (y), calculate `pride_and_prejudice[1] - jane_austen[1]`.

#### Solution

```python
jane_austen = [8, 7]
pride_and_prejudice = [9, 10]

# Relation = Tail - Head
x = pride_and_prejudice[0] - jane_austen[0]
y = pride_and_prejudice[1] - jane_austen[1]

authored = [x, y]
print(authored)
```

