---
id: network-analysis-01
title: Introduction to Network Concepts
moduleId: network-analysis
prerequisites:
  - structured-data-05
estimatedTimeMinutes: 20
difficulty: beginner
learningObjectives:
  - Define nodes and edges in the context of humanities data
  - Distinguish between directed and undirected graphs
  - Identify use cases for network analysis in history and literature
keywords:
  - graph theory
  - nodes
  - edges
  - directed graph
  - network analysis
---

# Introduction to Network Concepts

## Analogy

Imagine a pile of letters found in an archive. If you read them one by one, you learn about individual lives. However, if you draw a line on a whiteboard connecting the sender of every letter to its recipient, you create a "web" that reveals something invisible in the individual texts: a community structure. You might find that a quiet figure is actually the central hub connecting two rival political groups. This "web" is a **network** (or graph), and the whiteboard drawing is the essence of **network analysis**.

## Key Concepts

Network analysis (or Graph Theory) allows us to study relationships. It requires us to abstract our complex humanities data into two specific components:

::: definition
**Node (or Vertex)**: The "things" in the network. In the humanities, these are often people (authors, historical figures), but they can also be places, books, or words.
:::

::: definition
**Edge (or Link)**: The relationship connecting two nodes. This could represent "wrote a letter to," "is related to," "appears in the same scene as," or "cited the work of."
:::

### Types of Networks

When modeling your data, you must decide how edges behave:

1.  **Undirected Graph**: Relationships are mutual.
    *   *Example:* Two characters appear in the same scene together. If A is with B, B is with A.
2.  **Directed Graph**: Relationships flow one way.
    *   *Example:* Citations. Book A cites Book B, but Book B does not necessarily cite Book A.

### Representing Networks in Python

Before we use specialized tools, it helps to understand how to represent a network using basic Python structures. A common way is an **Edge List**—a list of tuples, where each tuple represents a connection.

```python
# A list of co-occurrence (Undirected)
# Romeo appears with Juliet, Juliet appears with Nurse
interactions = [
    ("Romeo", "Juliet"),
    ("Juliet", "Nurse")
]

# We can print the participants of the first interaction
print(f"Interaction between: {interactions[0][0]} and {interactions[0][1]}")
```

## Practice

::: try-it
On a piece of paper, write down 3 of your friends. Draw lines connecting them if they know each other. Is this directed or undirected? (Usually, friendship is treated as undirected!)
:::

## Transfer

In Digital Humanities, we use this to move from "close reading" (reading one text) to "distant reading" of systems.
*   **History**: Mapping trade routes (Nodes=Cities, Edges=Roads).
*   **Literature**: Character networks (Nodes=Characters, Edges=Dialogue).

::: challenge
Model a small correspondence network using Python lists.
:::

---challenges---

### Challenge: Define an Edge List

- id: network-analysis-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# We want to model a Directed relationship: Letter Writing.
# Ada writes to Charles.
# Charles writes to Mary.
# Mary writes to Ada.

# Create a list of tuples named 'letter_network' representing these 3 edges.
# Format: (Sender, Recipient)

letter_network = []

# Your code here
```

#### Expected Output

```
('Ada', 'Charles')
('Charles', 'Mary')
('Mary', 'Ada')
```

#### Hints

1. A tuple is defined with parentheses: `("Item A", "Item B")`.
2. The list should contain three distinct tuples.
3. Order matters in directed graphs (Sender first, Recipient second).

#### Solution

```python
# Create a list of tuples named 'letter_network' representing these 3 edges.
letter_network = [
    ("Ada", "Charles"),
    ("Charles", "Mary"),
    ("Mary", "Ada")
]

# Simple loop to print them out (for verification)
for edge in letter_network:
    print(edge)
```