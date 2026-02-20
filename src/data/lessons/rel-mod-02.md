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
Represent a knowledge statement as a triplet and extract specific labels from a collection of facts.
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
# The archive is a list of lists (triples)
archive = [
    ["The_Hobbit", "written_by", "Tolkien"],
    ["London", "located_in", "UK"],
    ["Emma", "written_by", "Austen"]
]

for triple in archive:
    # 1. Check if the relation (index 1) is equal to "written_by"
    if triple[1] == "written_by":
        # 2. Print the name of the book (index 0)
        print()
```

#### Expected Output

```
The_Hobbit
Emma
```

#### Hints

1. `triple[1]` accesses the middle part of each list (the relationship).
2. `triple[0]` accesses the first part of each list (the book name).
3. Make sure your `print()` statement is indented inside the `if` block!

#### Solution

```python
archive = [
    ["The_Hobbit", "written_by", "Tolkien"],
    ["London", "located_in", "UK"],
    ["Emma", "written_by", "Austen"]
]

for triple in archive:
    if triple[1] == "written_by":
        # triple[0] refers to the head/subject
        print(triple[0])
```

