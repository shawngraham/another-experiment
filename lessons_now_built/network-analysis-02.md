---
id: network-analysis-02
title: Creating Networks with NetworkX
moduleId: network-analysis
prerequisites:
  - network-analysis-01
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Import and initialize the NetworkX library
  - Programmatically add nodes and edges to a Graph object
  - Inspect graph properties (size and order)
keywords:
  - networkx
  - add_node
  - add_edge
  - graph construction
---

# Creating Networks with NetworkX

## Analogy

In the previous lesson, we used simple lists to represent connections. That's like writing a list of phone numbers on a napkin. To do serious analysis, we need a contact database app that can search, sort, and analyze those connections. In Python, that "app" is the **NetworkX** library.

## Key Concepts

**NetworkX** is the standard Python library for studying graphs.

### Initializing a Graph

First, we import the library (conventionally as `nx`) and create a container.

```python
import networkx as nx

# Create an empty generic graph
G = nx.Graph()
```



### Adding Data

You can build the graph piece by piece or in bulk.

1.  **Adding Nodes**:
    ```python
    G.add_node("Alice")
    G.add_nodes_from(["Bob", "Charlie"])
    ```

2.  **Adding Edges**:
    When you add an edge, NetworkX automatically adds the nodes if they don't exist yet.
    ```python
    # Alice is connected to Bob
    G.add_edge("Alice", "Bob")
    
    # Bob is connected to Charlie
    G.add_edges_from([("Bob", "Charlie")])
    ```

### Inspecting the Graph

Once built, you can ask the graph about itself.

```python
print(G.nodes) # View all nodes
print(G.edges) # View all connections
print(G.number_of_nodes()) # How many nodes?
print(G.number_of_edges()) # How many edges?
```

## Practice

::: try-it
Create a graph `G`, add nodes "Sun" and "Moon", and add an edge connecting them. Print `G.edges`.
:::

## Transfer

If you were analyzing a novel, you wouldn't manually type every character. You would likely write a loop that iterates through your text analysis results and calls `G.add_edge()` whenever two proper nouns appear in the same paragraph.

::: challenge
Build a network of historical allies.
:::

---challenges---

### Challenge: Building the Alliance

- id: network-analysis-02-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import networkx as nx

# 1. Create an empty Graph object named 'alliances'
alliances = None

# 2. Add three nodes: "Rome", "Athens", "Sparta"
# (Use a list to add them all at once)

# 3. Add an edge between "Rome" and "Athens"
# 4. Add an edge between "Athens" and "Sparta"

# Your code here

# Check the output
if alliances:
    print(f"Nodes: {alliances.number_of_nodes()}")
    print(f"Edges: {alliances.number_of_edges()}")
```

#### Expected Output

```
Nodes: 3
Edges: 2
```

#### Hints

1. Use `nx.Graph()` to create the object.
2. Use `.add_nodes_from(["A", "B", ...])`.
3. Use `.add_edge("A", "B")`.

#### Solution

```python
import networkx as nx

# 1. Create an empty Graph object named 'alliances'
alliances = nx.Graph()

# 2. Add three nodes
alliances.add_nodes_from(["Rome", "Athens", "Sparta"])

# 3. Add edges
alliances.add_edge("Rome", "Athens")
alliances.add_edge("Athens", "Sparta")

# Check the output
print(f"Nodes: {alliances.number_of_nodes()}")
print(f"Edges: {alliances.number_of_edges()}")
```

### Challenge: From List to Graph

- id: network-analysis-02-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import networkx as nx

# A raw list of email exchanges (Sender, Receiver)
email_data = [
    ("Employee", "Manager"),
    ("Manager", "Director"),
    ("Employee", "HR"),
    ("HR", "Director")
]

G = nx.Graph()

# Use a loop or a specific NetworkX method to add all these edges to G
# Your code here

print(list(G.edges))
```

#### Expected Output

```
[('Employee', 'Manager'), ('Employee', 'HR'), ('Manager', 'Director'), ('Director', 'HR')]
```

#### Hints

1. You *could* loop through `email_data` and call `G.add_edge` for each item.
2. Or, you can use the bulk method `G.add_edges_from(the_list)`.
3. The order of edges in the output might vary slightly, that is okay.

#### Solution

```python
import networkx as nx

email_data = [
    ("Employee", "Manager"),
    ("Manager", "Director"),
    ("Employee", "HR"),
    ("HR", "Director")
]

G = nx.Graph()

# Bulk add
G.add_edges_from(email_data)

print(list(G.edges))
```