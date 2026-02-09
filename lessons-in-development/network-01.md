---
id: network-01
title: "Introduction to Network Thinking"
moduleId: network-analysis
prerequisites:
  - python-basics-02
estimatedTimeMinutes: 35
difficulty: beginner
learningObjectives:
  - Explain what a network (graph) is and identify nodes and edges in humanities data
  - Represent a simple network as a Python dictionary (adjacency list)
  - List the neighbours of a node and count connections
keywords:
  - network
  - graph
  - nodes
  - edges
  - adjacency list
---

# Introduction to Network Thinking

## Analogy

Think of a **social gathering** at a literary salon in 19th-century London. Each person in the room is a **node**. When two people have a conversation, an invisible thread — an **edge** — connects them. By the end of the evening, the room is criss-crossed with threads. Some people are highly connected (the host, the famous poet); others stand at the edges with just one or two threads. A network is simply a record of who is connected to whom — and it can reveal the hidden structure of any system of relationships.

## Key Concepts

### What Is a Network?

A network (also called a **graph**) consists of two things:

- **Nodes** (or vertices): the entities — people, places, texts, concepts
- **Edges** (or links): the connections between them — correspondence, co-authorship, citation, kinship

::: definition
**Network (graph)**: A mathematical structure consisting of nodes (entities) and edges (relationships between entities). In the humanities, networks model connections such as who wrote to whom, which texts cite each other, or which characters appear together in scenes.
:::

### Networks in the Humanities

Networks appear everywhere in humanities research:

- **Correspondence networks**: who wrote letters to whom (e.g., the Republic of Letters)
- **Character co-occurrence**: which characters appear together in a novel's chapters
- **Citation networks**: which scholarly works reference each other
- **Trade networks**: which cities exchanged goods along historical routes

### Representing Networks in Python

The simplest representation is an **adjacency list** — a dictionary where each key is a node, and its value is a list of nodes it connects to:

```python
# A small correspondence network
network = {
    "Mary Shelley": ["Leigh Hunt", "Lord Byron", "Percy Shelley"],
    "Leigh Hunt": ["Mary Shelley", "Lord Byron", "John Keats"],
    "Lord Byron": ["Mary Shelley", "Leigh Hunt", "Percy Shelley"],
    "Percy Shelley": ["Mary Shelley", "Lord Byron"],
    "John Keats": ["Leigh Hunt"],
}

# List Mary Shelley's correspondents
print(f"Mary Shelley wrote to: {network['Mary Shelley']}")
print(f"Number of connections: {len(network['Mary Shelley'])}")
```

### Counting Connections (Degree)

The **degree** of a node is the number of edges it has — how many connections. In a correspondence network, the person with the highest degree wrote to the most people:

```python
for person, connections in network.items():
    print(f"  {person}: {len(connections)} connections")
```

## Practice

::: try-it
Add a new person to the network — perhaps "Claire Clairmont" — and connect her to Mary Shelley and Lord Byron. How does this change the degree counts?
:::

## Transfer

Think about your own research. What entities could be nodes? What relationships could be edges? A historian might model correspondence; a literary scholar might model character interactions; a musicologist might connect composers who influenced each other. Identifying the network in your data is the first step toward analysing it.

::: challenge
Build a network of literary figures and find who has the most connections.
:::

---challenges---

### Challenge: Build a network and find the most connected node

- id: network-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Build an adjacency list from these correspondence pairs
# Each pair means the two people exchanged letters

pairs = [
    ("Mary Shelley", "Leigh Hunt"),
    ("Mary Shelley", "Lord Byron"),
    ("Mary Shelley", "Percy Shelley"),
    ("Mary Shelley", "John Murray"),
    ("Leigh Hunt", "Lord Byron"),
    ("Leigh Hunt", "John Keats"),
    ("Lord Byron", "Percy Shelley"),
    ("Lord Byron", "John Murray"),
    ("Percy Shelley", "Leigh Hunt"),
]

# 1. Build an adjacency list (dict of lists) from the pairs
#    Remember: if A connects to B, then B also connects to A
# 2. Print each person and their degree (number of connections),
#    sorted alphabetically by name
#    Format: "<name>: <degree>"
# 3. Print: "Most connected: <name>"

# Your code here
```

#### Expected Output

```
John Keats: 1
John Murray: 2
Leigh Hunt: 4
Lord Byron: 4
Mary Shelley: 4
Percy Shelley: 3
Most connected: Leigh Hunt
```

#### Hints

1. Start with an empty dictionary. For each pair `(a, b)`, use `network.setdefault(a, [])` to ensure the key exists, then append `b` — and do the same in reverse for `b` to `a`.
2. Before appending, check that the connection is not already in the list to avoid duplicates (since some pairs may imply the same link).
3. To find the most connected, use `max(network.items(), key=lambda x: len(x[1]))` — but if there is a tie, take the alphabetically first name by sorting before finding the max.

#### Solution

```python
pairs = [
    ("Mary Shelley", "Leigh Hunt"),
    ("Mary Shelley", "Lord Byron"),
    ("Mary Shelley", "Percy Shelley"),
    ("Mary Shelley", "John Murray"),
    ("Leigh Hunt", "Lord Byron"),
    ("Leigh Hunt", "John Keats"),
    ("Lord Byron", "Percy Shelley"),
    ("Lord Byron", "John Murray"),
    ("Percy Shelley", "Leigh Hunt"),
]

network = {}
for a, b in pairs:
    network.setdefault(a, [])
    network.setdefault(b, [])
    if b not in network[a]:
        network[a].append(b)
    if a not in network[b]:
        network[b].append(a)

for name in sorted(network):
    print(f"{name}: {len(network[name])}")

max_degree = max(len(v) for v in network.values())
most_connected = sorted(n for n, v in network.items() if len(v) == max_degree)
print(f"Most connected: {most_connected[0]}")
```

### Challenge: Find mutual connections

- id: network-01-c2
- language: python
- difficulty: beginner

#### Starter Code

```python
# Given this network, find the mutual connections between two people
# Mutual connections are people that BOTH individuals are connected to

network = {
    "Mary Shelley": ["Leigh Hunt", "Lord Byron", "Percy Shelley", "John Murray"],
    "Leigh Hunt": ["Mary Shelley", "Lord Byron", "John Keats", "Percy Shelley"],
    "Lord Byron": ["Mary Shelley", "Leigh Hunt", "Percy Shelley", "John Murray"],
    "Percy Shelley": ["Mary Shelley", "Lord Byron", "Leigh Hunt"],
    "John Keats": ["Leigh Hunt"],
    "John Murray": ["Mary Shelley", "Lord Byron"],
}

person_a = "Mary Shelley"
person_b = "Leigh Hunt"

# 1. Find people connected to BOTH person_a AND person_b
# 2. Print: "Mutual connections of <A> and <B>:"
# 3. Print each mutual connection sorted alphabetically, one per line
# 4. Print: "Count: <n>"

# Your code here
```

#### Expected Output

```
Mutual connections of Mary Shelley and Leigh Hunt:
Lord Byron
Percy Shelley
Count: 2
```

#### Hints

1. Convert each person's connections list to a `set`, then use the `&` operator (set intersection) to find names that appear in both.
2. Remember to exclude person_a and person_b themselves from the result — they are connected to each other but are not a "mutual connection."
3. Sort the result with `sorted()` and print each name on its own line.

#### Solution

```python
network = {
    "Mary Shelley": ["Leigh Hunt", "Lord Byron", "Percy Shelley", "John Murray"],
    "Leigh Hunt": ["Mary Shelley", "Lord Byron", "John Keats", "Percy Shelley"],
    "Lord Byron": ["Mary Shelley", "Leigh Hunt", "Percy Shelley", "John Murray"],
    "Percy Shelley": ["Mary Shelley", "Lord Byron", "Leigh Hunt"],
    "John Keats": ["Leigh Hunt"],
    "John Murray": ["Mary Shelley", "Lord Byron"],
}

person_a = "Mary Shelley"
person_b = "Leigh Hunt"

mutual = sorted(set(network[person_a]) & set(network[person_b]))
print(f"Mutual connections of {person_a} and {person_b}:")
for name in mutual:
    print(name)
print(f"Count: {len(mutual)}")
```
