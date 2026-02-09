---
id: network-03
title: Analysing and Interpreting Networks
moduleId: network-analysis
prerequisites:
  - network-02
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Build a network from an edge list and compute summary statistics
  - Identify clusters and isolated nodes in a network
  - Interpret network metrics in the context of humanities research questions
keywords:
  - network analysis
  - clusters
  - connected components
  - interpretation
  - edge list
---

# Analysing and Interpreting Networks

## Analogy

Imagine you have been given a box of index cards. Each card has two names on it — two people who exchanged at least one letter. Your task is to reconstruct the social world from these cards alone. You start grouping cards, noticing that some names keep appearing together (a tight circle of friends) while others are mentioned only once. Some groups never overlap — separate social worlds. This process of assembling, measuring, and interpreting is **network analysis**.

## Key Concepts

### From Edge Lists to Networks

In practice, network data often arrives as an **edge list**: a simple table of pairs. Converting this into an adjacency list is the first step:

```python
edges = [
    ("Wollstonecraft", "Godwin"),
    ("Wollstonecraft", "Fuseli"),
    ("Godwin", "Coleridge"),
    ("Coleridge", "Wordsworth"),
    ("Wordsworth", "Southey"),
]

def build_network(edges):
    network = {}
    for a, b in edges:
        network.setdefault(a, [])
        network.setdefault(b, [])
        if b not in network[a]:
            network[a].append(b)
        if a not in network[b]:
            network[b].append(a)
    return network

net = build_network(edges)
for person in sorted(net):
    print(f"  {person}: {sorted(net[person])}")
```

::: definition
**Edge list**: A list of pairs (A, B) representing connections. It is the most common format for sharing network data — simple, compact, and easy to generate from databases, spreadsheets, or APIs.
:::

### Connected Components

A **connected component** is a group of nodes where every node can reach every other node by following edges. If a network has multiple components, it contains separate, disconnected sub-communities:

```python
def find_components(network):
    visited = set()
    components = []

    for node in network:
        if node not in visited:
            # Explore this component using breadth-first search
            component = []
            queue = [node]
            while queue:
                current = queue.pop(0)
                if current not in visited:
                    visited.add(current)
                    component.append(current)
                    queue.extend(n for n in network[current] if n not in visited)
            components.append(sorted(component))

    return components
```

### Isolated Nodes

Nodes with zero connections are **isolates**. In a correspondence network, these are people who appear in the data but exchanged no letters with anyone else in the set. Isolates can indicate boundary effects (the person's correspondents are outside the dataset) or genuinely marginal figures.

### Summary Statistics

A useful first step with any network is to compute summary statistics:

- **Nodes**: total number of entities
- **Edges**: total number of connections
- **Components**: number of separate sub-networks
- **Average degree**: mean number of connections per node

```python
def summarise(network):
    nodes = len(network)
    edges = sum(len(v) for v in network.values()) // 2
    avg_degree = sum(len(v) for v in network.values()) / nodes if nodes else 0
    return nodes, edges, round(avg_degree, 1)
```

## Practice

::: try-it
Add a disconnected pair — say, ("Blake", "Paine") — to the edge list above and rebuild the network. How many components are there now? What does this tell you about the social structure?
:::

## Transfer

Interpretation is where the humanities expertise matters most. A high centrality score for a minor poet might mean she was a crucial social connector — or it might mean the archive over-represents her correspondence. A disconnected component might reveal a separate intellectual circle — or simply reflect gaps in the data. Network analysis provides the measurements; humanistic interpretation provides the meaning.

::: challenge
Build a network from a set of correspondence records, find its connected components, and produce a summary report.
:::

---challenges---

### Challenge: Build and summarise a network

- id: network-03-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Build a network from these correspondence pairs and produce a summary

edges = [
    ("Wollstonecraft", "Godwin"),
    ("Wollstonecraft", "Fuseli"),
    ("Wollstonecraft", "Imlay"),
    ("Godwin", "Coleridge"),
    ("Coleridge", "Wordsworth"),
    ("Coleridge", "Southey"),
    ("Wordsworth", "Southey"),
    ("Blake", "Paine"),
    ("Blake", "Flaxman"),
]

# 1. Build an adjacency list from the edge list
# 2. Print summary statistics:
#    "Nodes: <n>"
#    "Edges: <n>"
#    "Average degree: <n>" (rounded to 1 decimal place)
# 3. Find connected components and print:
#    "Components: <n>"
#    Then for each component (sorted by size descending, then
#    alphabetically by first member):
#    "  Component <n>: <member1>, <member2>, ..." (members sorted alphabetically)

# Your code here
```

#### Expected Output

```
Nodes: 9
Edges: 9
Average degree: 2.0
Components: 2
  Component 1: Coleridge, Fuseli, Godwin, Imlay, Southey, Wollstonecraft, Wordsworth
  Component 2: Blake, Flaxman, Paine
```

#### Hints

1. Build the adjacency list by iterating through edges, using `setdefault` for each node, and appending in both directions.
2. For edges count, sum all neighbour list lengths and divide by 2 (since each edge is counted twice). For average degree, divide the total of all neighbour list lengths by the number of nodes.
3. To find components, use a breadth-first search: start from an unvisited node, explore all reachable nodes, mark them visited, and collect them as one component. Repeat until all nodes are visited.

#### Solution

```python
edges = [
    ("Wollstonecraft", "Godwin"),
    ("Wollstonecraft", "Fuseli"),
    ("Wollstonecraft", "Imlay"),
    ("Godwin", "Coleridge"),
    ("Coleridge", "Wordsworth"),
    ("Coleridge", "Southey"),
    ("Wordsworth", "Southey"),
    ("Blake", "Paine"),
    ("Blake", "Flaxman"),
]

network = {}
for a, b in edges:
    network.setdefault(a, [])
    network.setdefault(b, [])
    if b not in network[a]:
        network[a].append(b)
    if a not in network[b]:
        network[b].append(a)

nodes = len(network)
edge_count = sum(len(v) for v in network.values()) // 2
avg_degree = round(sum(len(v) for v in network.values()) / nodes, 1)

print(f"Nodes: {nodes}")
print(f"Edges: {edge_count}")
print(f"Average degree: {avg_degree}")

visited = set()
components = []
for node in network:
    if node not in visited:
        component = []
        queue = [node]
        while queue:
            current = queue.pop(0)
            if current not in visited:
                visited.add(current)
                component.append(current)
                queue.extend(n for n in network[current] if n not in visited)
        components.append(sorted(component))

components.sort(key=lambda c: (-len(c), c[0]))

print(f"Components: {len(components)}")
for i, comp in enumerate(components):
    print(f"  Component {i + 1}: {', '.join(comp)}")
```

### Challenge: Find the most central node per component

- id: network-03-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# For each connected component, find the node with the highest
# degree centrality (within that component)

edges = [
    ("Wollstonecraft", "Godwin"),
    ("Wollstonecraft", "Fuseli"),
    ("Wollstonecraft", "Imlay"),
    ("Godwin", "Coleridge"),
    ("Coleridge", "Wordsworth"),
    ("Coleridge", "Southey"),
    ("Wordsworth", "Southey"),
    ("Blake", "Paine"),
    ("Blake", "Flaxman"),
]

# 1. Build the network
# 2. Find connected components
# 3. For each component, compute degree centrality within that component:
#    centrality = degree / (component_size - 1)
# 4. Print each component's most central node:
#    "Component <n> (<size> nodes): <name> (centrality: <value>)"
#    Round centrality to 2 decimal places
#    Sort components by size descending, then alphabetically by first member

# Your code here
```

#### Expected Output

```
Component 1 (7 nodes): Coleridge (centrality: 0.50)
Component 2 (3 nodes): Blake (centrality: 1.00)
```

#### Hints

1. Reuse the network-building and component-finding code from the previous challenge.
2. For each component, compute degree centrality relative to that component's size: `len(network[node]) / (len(component) - 1)` — but only count neighbours that are within the component.
3. If there is a tie for highest centrality within a component, take the alphabetically first name.

#### Solution

```python
edges = [
    ("Wollstonecraft", "Godwin"),
    ("Wollstonecraft", "Fuseli"),
    ("Wollstonecraft", "Imlay"),
    ("Godwin", "Coleridge"),
    ("Coleridge", "Wordsworth"),
    ("Coleridge", "Southey"),
    ("Wordsworth", "Southey"),
    ("Blake", "Paine"),
    ("Blake", "Flaxman"),
]

network = {}
for a, b in edges:
    network.setdefault(a, [])
    network.setdefault(b, [])
    if b not in network[a]:
        network[a].append(b)
    if a not in network[b]:
        network[b].append(a)

visited = set()
components = []
for node in network:
    if node not in visited:
        component = []
        queue = [node]
        while queue:
            current = queue.pop(0)
            if current not in visited:
                visited.add(current)
                component.append(current)
                queue.extend(n for n in network[current] if n not in visited)
        components.append(sorted(component))

components.sort(key=lambda c: (-len(c), c[0]))

for i, comp in enumerate(components):
    comp_set = set(comp)
    best_name = ""
    best_cent = -1
    for node in comp:
        degree = sum(1 for n in network[node] if n in comp_set)
        cent = round(degree / (len(comp) - 1), 2) if len(comp) > 1 else 0
        if cent > best_cent or (cent == best_cent and node < best_name):
            best_cent = cent
            best_name = node
    print(f"Component {i + 1} ({len(comp)} nodes): {best_name} (centrality: {best_cent})")
```
