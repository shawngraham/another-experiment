---
id: network-02
title: Measuring Network Structure
moduleId: network-analysis
prerequisites:
  - network-01
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Calculate degree centrality for nodes in a network
  - Identify bridge nodes that connect different clusters
  - Compute network density and interpret what it means
keywords:
  - centrality
  - degree
  - density
  - bridge
  - network metrics
---

# Measuring Network Structure

## Analogy

Imagine a map of airline routes. Some airports — major hubs like Heathrow or O'Hare — have hundreds of connections. Others are tiny regional airstrips with just one or two flights. **Centrality** is how we measure which airports (or people, or texts) are the most important connectors in the network. And **density** tells us whether the overall network is more like a web of highways (many connections) or a chain of country roads (sparse connections).

## Key Concepts

### Degree Centrality

The simplest centrality measure is **degree centrality**: the fraction of all possible connections that a node actually has. If a network has *n* nodes, each node can connect to at most *n - 1* others. Degree centrality normalises the raw degree:

```python
def degree_centrality(network):
    n = len(network)
    centrality = {}
    for node, neighbours in network.items():
        centrality[node] = len(neighbours) / (n - 1) if n > 1 else 0
    return centrality
```

::: definition
**Degree centrality**: A node's number of connections divided by the maximum possible connections. A value of 1.0 means the node is connected to every other node; 0.0 means it is isolated.
:::

A node with high degree centrality is a hub — a well-connected actor. In a correspondence network, this might be a prolific letter writer; in a citation network, a foundational text that everyone references.

### Network Density

**Density** measures how interconnected the entire network is. It is the ratio of actual edges to the maximum possible edges:

```python
def network_density(network):
    n = len(network)
    if n < 2:
        return 0.0
    # Count total edges (each edge counted once)
    total_edges = sum(len(neighbours) for neighbours in network.values()) / 2
    max_edges = n * (n - 1) / 2
    return total_edges / max_edges
```

A density of 1.0 means everyone is connected to everyone (a **complete graph**). Most real-world humanities networks are sparse — densities of 0.1 to 0.3 are common.

### Bridge Nodes

Some nodes sit between clusters — remove them and the network splits apart. These **bridges** are disproportionately important for the flow of information, even if they do not have the highest degree. You can spot potential bridges by looking for nodes that connect to people in different groups who do not otherwise know each other.

```python
# A simple bridge detection: nodes whose removal would
# disconnect neighbours from each other
network = {
    "A": ["B", "C"],
    "B": ["A", "C"],
    "C": ["A", "B", "D"],  # C bridges the two clusters
    "D": ["C", "E", "F"],
    "E": ["D", "F"],
    "F": ["D", "E"],
}
```

In this example, node C is the only connection between the {A, B, C} cluster and the {D, E, F} cluster.

## Practice

::: try-it
Compute the degree centrality for each node in the example network above. Which node has the highest centrality? Is it the same node as the bridge?
:::

## Transfer

In DH research, centrality reveals hidden influencers. The most prolific author is not always the most central — sometimes a lesser-known figure who corresponded across literary circles (a bridge) had more structural influence on the flow of ideas. Density can tell you whether a community was tightly knit or loosely connected, which changes how ideas and texts circulate.

::: challenge
Compute degree centrality and density for a Romantic-era correspondence network.
:::

---challenges---

### Challenge: Compute degree centrality

- id: network-02-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Compute degree centrality for each person in this correspondence network
# Degree centrality = number_of_connections / (total_nodes - 1)

network = {
    "Mary Shelley": ["Leigh Hunt", "Lord Byron", "Percy Shelley", "John Murray"],
    "Leigh Hunt": ["Mary Shelley", "Lord Byron", "John Keats", "Percy Shelley"],
    "Lord Byron": ["Mary Shelley", "Leigh Hunt", "Percy Shelley", "John Murray"],
    "Percy Shelley": ["Mary Shelley", "Lord Byron", "Leigh Hunt"],
    "John Keats": ["Leigh Hunt"],
    "John Murray": ["Mary Shelley", "Lord Byron"],
}

# 1. Compute degree centrality for each node (round to 2 decimal places)
# 2. Print each person and their centrality, sorted by centrality
#    descending, then alphabetically for ties
#    Format: "<name>: <centrality>"
# 3. Print: "Network density: <density>" (rounded to 2 decimal places)

# Your code here
```

#### Expected Output

```
Leigh Hunt: 0.80
Lord Byron: 0.80
Mary Shelley: 0.80
Percy Shelley: 0.60
John Murray: 0.40
John Keats: 0.20
Network density: 0.60
```

#### Hints

1. The total number of nodes is `len(network)`. Degree centrality for a node is `len(neighbours) / (n - 1)`.
2. To sort by centrality descending then name ascending, use `sorted(items, key=lambda x: (-x[1], x[0]))` where `x[1]` is the centrality value.
3. For density: count total edges as `sum(len(v) for v in network.values()) / 2` (since each edge is counted twice), then divide by `n * (n - 1) / 2`.

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

n = len(network)
centrality = {}
for name, neighbours in network.items():
    centrality[name] = round(len(neighbours) / (n - 1), 2)

sorted_items = sorted(centrality.items(), key=lambda x: (-x[1], x[0]))
for name, cent in sorted_items:
    print(f"{name}: {cent}")

total_edges = sum(len(v) for v in network.values()) / 2
max_edges = n * (n - 1) / 2
density = round(total_edges / max_edges, 2)
print(f"Network density: {density}")
```

### Challenge: Find the bridge node

- id: network-02-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# In this network, one person bridges two distinct groups.
# Find the bridge: the node whose connections span both groups.
#
# A bridge node is one where removing it would leave some of its
# neighbours unable to reach each other.

network = {
    "Austen": ["Edgeworth", "Burney"],
    "Edgeworth": ["Austen", "Burney", "Shelley"],
    "Burney": ["Austen", "Edgeworth"],
    "Shelley": ["Edgeworth", "Byron", "Hunt"],
    "Byron": ["Shelley", "Hunt"],
    "Hunt": ["Shelley", "Byron"],
}

# Strategy: for each node, check if all its neighbours are also
# connected to each other. A bridge node will have neighbours
# that are NOT directly connected to each other.
#
# 1. For each node, count how many pairs of its neighbours
#    are NOT directly connected
# 2. Print each node and the count of unconnected neighbour pairs,
#    sorted alphabetically
#    Format: "<name>: <count> unconnected pairs"
# 3. Print: "Bridge node: <name>" (the one with the most unconnected pairs)

# Your code here
```

#### Expected Output

```
Austen: 0 unconnected pairs
Burney: 0 unconnected pairs
Byron: 0 unconnected pairs
Edgeworth: 2 unconnected pairs
Hunt: 0 unconnected pairs
Shelley: 2 unconnected pairs
Bridge node: Edgeworth
```

#### Hints

1. For each node, get its list of neighbours. Then check every pair of neighbours: `for i in range(len(nb))` and `for j in range(i+1, len(nb))`.
2. Two neighbours are "unconnected" if neither appears in the other's adjacency list: `nb[j] not in network[nb[i]]`.
3. The bridge node is the one with the highest count of unconnected pairs. If there is a tie, pick the alphabetically first.

#### Solution

```python
network = {
    "Austen": ["Edgeworth", "Burney"],
    "Edgeworth": ["Austen", "Burney", "Shelley"],
    "Burney": ["Austen", "Edgeworth"],
    "Shelley": ["Edgeworth", "Byron", "Hunt"],
    "Byron": ["Shelley", "Hunt"],
    "Hunt": ["Shelley", "Byron"],
}

unconnected_counts = {}
for node, neighbours in network.items():
    count = 0
    for i in range(len(neighbours)):
        for j in range(i + 1, len(neighbours)):
            if neighbours[j] not in network[neighbours[i]]:
                count += 1
    unconnected_counts[node] = count

for name in sorted(unconnected_counts):
    print(f"{name}: {unconnected_counts[name]} unconnected pairs")

max_count = max(unconnected_counts.values())
bridge = sorted(n for n, c in unconnected_counts.items() if c == max_count)[0]
print(f"Bridge node: {bridge}")
```
