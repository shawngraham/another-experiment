---
id: rel-mod-02
title: Linking Facts with Knowledge Graph Embedding Models
moduleId: relational-models
prerequisites:
  - rel-mod-01
estimatedTimeMinutes: 45
difficulty: beginner
learningObjectives:
  - Define the structure of a "Triple" (Head-Relation-Tail)
  - Understand how Knowledge Graph Embeddings (KGE) model structured relationships
  - Identify potential gaps in historical linked data
keywords:
  - knowledge-graphs
  - pykeen
  - linked-data
  - triples
---

# Linking Facts with Knowledge Graph Embedding Models

## Analogy: From Clouds to Constellations

In the previous lesson, we saw that **Word Vectors** are like a cloud of stars: we know which stars are near each other, but we don't necessarily know *why*.

A **Knowledge Graph** (also know as a relational model) is a constellation. It doesn't just put stars in a space; it draws explicit lines between them and labels those lines. It tells us that Star A is "connected to" Star B by a specific relationship, like "is-the-parent-of" or "was-written-by."

## Key Concepts

### 1. The Triple
While word vectors learn from messy, unstructured sentences, **Knowledge Graph Embeddings (KGE)** learn from structured facts called **Triples**. A triple is the smallest unit of information in a graph.

:::definition
**Triple**: A statement consisting of three parts:
1.  **Head** (Subject): The starting entity.
2.  **Relation** (Predicate): The link or verb.
3.  **Tail** (Object): The ending entity.
:::

In Python, we can represent a single fact using a simple list.

```python
# Representing a triple: [Head, Relation, Tail]
triple = ["Jane_Austen", "author_of", "Persuasion"]

print(f"Entity 1: {triple[0]}")
print(f"Relationship: {triple[1]}")
print(f"Entity 2: {triple[2]}")
```

### 2. PyKEEN and Predictive History
**PyKEEN** is a Python library used to train models on these triples. Once a model understands the "geometry" of your graph, it can predict missing links.

If the graph knows that *Person A* was born in *City B*, and *City B* is in *Country C*, PyKEEN helps the computer mathematically "guess" that *Person A* is a citizen of *Country C*. 

```python
# A Knowledge Graph is just a collection of these triples
knowledge_graph = [
    ["London", "located_in", "United_Kingdom"],
    ["Charles_Dickens", "born_in", "Landport"],
    ["Landport", "located_in", "United_Kingdom"]
]

print(f"Our graph contains {len(knowledge_graph)} facts.")
```

## Practice: Navigating the List

When we store triples in a list, we use **indexes** to access the different parts:
*   `triple[0]` is the **Head**
*   `triple[1]` is the **Relation**
*   `triple[2]` is the **Tail**

:::try-it
In the sandbox, try to print just the **Relation** from this historical triple.

```python
fact = ["Rosalind_Franklin", "discovered", "DNA_Structure"]

# Access index 1 to get the relation
print(fact[1]) 
```
:::

## Transfer: The Silence of the Archive

Knowledge Graphs are powerful, but they are only as good as their data. If an archive primarily records the letters of "Great Men," a Knowledge Graph will visualize women and marginalized groups as **"Isolated Nodes"**—stars with no lines connecting them to the rest of the constellation. 

When you build a graph, ask: *Who is missing a connection, and why?*

:::challenge
Discover what relation types exist in a knowledge graph, then extract and format all facts of a chosen type.
:::

---challenges---

### Challenge: Building a Triple

- id: rel-mod-02-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# A Triple must have a Head, Relation, and Tail.
# Complete the triple: 'Mary_Shelley' is the 'author_of' 'Frankenstein'.

head = "Mary_Shelley"
relation = "" # What connects the author to the work?
tail = "" # What did they write?

# Combine them into a list called 'my_triple'
# Hint: use [head, relation, tail]
my_triple = []

print(my_triple)
```

#### Expected Output

```
['Mary_Shelley', 'author_of', 'Frankenstein']
```

#### Hints

1. The relation describes what connects the head to the tail: `"author_of"`.
2. The tail is the object — the literary work: `"Frankenstein"`.
3. Inside the square brackets for `my_triple`, list the variables separated by commas: `head, relation, tail`.

#### Solution

```python
head = "Mary_Shelley"
relation = "author_of"
tail = "Frankenstein"

my_triple = [head, relation, tail]

print(my_triple)
```

### Challenge: Relation Extraction

- id: rel-mod-02-c2
- language: python
- difficulty: beginner

#### Starter Code

```python
# A small knowledge graph with mixed relation types
archive = [
    ["Mary_Shelley",     "author_of",   "Frankenstein"],
    ["Jane_Austen",      "author_of",   "Emma"],
    ["Jane_Austen",      "born_in",     "Steventon"],
    ["Charles_Dickens",  "author_of",   "Oliver_Twist"],
    ["Steventon",        "located_in",  "England"],
    ["Landport",         "located_in",  "England"],
    ["Charles_Dickens",  "born_in",     "Landport"],
]

# Task 1: Collect every unique relation type that appears in the archive.
# Add a relation to the list only if it isn't already there.
relation_types = []

# Your code here

print("Relations found:", relation_types)

# Task 2: For every "author_of" triple, print a sentence:
# "<Head> wrote <Tail>"

# Your code here
```

#### Expected Output

```
Relations found: ['author_of', 'born_in', 'located_in']
Mary_Shelley wrote Frankenstein
Jane_Austen wrote Emma
Charles_Dickens wrote Oliver_Twist
```

#### Hints

1. Loop through `archive`. Inside the loop, `triple[1]` is the relation. Append it to `relation_types` only `if triple[1] not in relation_types`.
2. For Task 2, loop through `archive` again and check `if triple[1] == "author_of":`.
3. Use an f-string to format the sentence: `f"{triple[0]} wrote {triple[2]}"`.

#### Solution

```python
archive = [
    ["Mary_Shelley",     "author_of",   "Frankenstein"],
    ["Jane_Austen",      "author_of",   "Emma"],
    ["Jane_Austen",      "born_in",     "Steventon"],
    ["Charles_Dickens",  "author_of",   "Oliver_Twist"],
    ["Steventon",        "located_in",  "England"],
    ["Landport",         "located_in",  "England"],
    ["Charles_Dickens",  "born_in",     "Landport"],
]

relation_types = []
for triple in archive:
    if triple[1] not in relation_types:
        relation_types.append(triple[1])

print("Relations found:", relation_types)

for triple in archive:
    if triple[1] == "author_of":
        print(f"{triple[0]} wrote {triple[2]}")
```

