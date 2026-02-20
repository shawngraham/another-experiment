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
  - Differentiate between Graph (undirected) and DiGraph (directed) objects
  - Programmatically add nodes and edges to a network
  - Bulk-load network data from Python lists
keywords:
  - networkx
  - add_node
  - add_edge
  - graph construction
  - digraph
---

# Creating Networks with NetworkX

  ## Analogy: Napkin vs. Database
  In the previous lesson, we represented connections as simple lists of tuples. That’s like scribbling phone numbers on a napkin. To perform serious research, you need a tool that can search, sort, and calculate complex statistics across those connections. 

  In Python, that tool is **NetworkX**. It transforms your list of names into a "Graph Object"—a mathematical structure that knows how every piece of the web is connected to every other piece.

  ---

  ## 1. Initializing the Graph
  NetworkX offers different "containers" depending on the logic of your data.

  - **`nx.Graph()`**: For **Undirected** relationships (e.g., "A and B were in the same room").
  - **`nx.DiGraph()`**: For **Directed** relationships (e.g., "A sent a letter to B").

  ```python
  import networkx as nx

  # Create a container for a social network
  G = nx.Graph()
  ```

  ---

  ## 2. Constructing the Web
  You can build a network node-by-node, but in Digital Humanities, we usually load data in "bulk" from lists or spreadsheets.

  ### Adding Nodes (The Participants)
  ```python
  G.add_node("Mary Shelley")
  G.add_nodes_from(["Percy Shelley", "Lord Byron"])
  ```

  ### Adding Edges (The Connections)
  If you add an edge between two names that don't exist yet, NetworkX is smart enough to create the nodes for you automatically.
  ```python
  # This creates the nodes AND the connection
  G.add_edge("Mary Shelley", "Percy Shelley")

  # Adding multiple connections at once
  connections = [("Mary Shelley", "Lord Byron"), ("Percy Shelley", "Lord Byron")]
  G.add_edges_from(connections)
  ```

  ---

  ## 3. Inspecting the Graph
  Once the graph is built, you can "query" it to see the scale of your network.

  ```python
  print(f"Number of people: {G.number_of_nodes()}")
  print(f"Number of connections: {G.number_of_edges()}")

  # View all nodes as a list
  print(list(G.nodes))
  ```

  ---

  ## 4. Why Use This? (The DH Use Case)
  If you are analyzing a 19th-century novel, you wouldn't manually type every character's name. You would write a loop that reads your text and calls `G.add_edge()` whenever two characters appear in the same paragraph. NetworkX will then handle the complex math of determining who the "most important" character is based on their position in the web.

  :::tip
  **Bulk Loading**: The `add_edges_from()` method is your best friend. It allows you to take a list of thousands of tuples (like the ones we made in the last lesson) and turn them into a network in a single line of code.
  :::

  :::challenge
  In the first challenge, build a small city-state alliance network manually. In the second, practice bulk-loading an "edge list" into a graph object.
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
  alliances = 

  # 2. Add three nodes: "Rome", "Athens", "Sparta" (use a list)

  # 3. Add an edge between "Rome" and "Athens"
  # 4. Add an edge between "Athens" and "Sparta"

  # Your code here

  # Verify the network size
  print(f"Nodes: {alliances.number_of_nodes()}")
  print(f"Edges: {alliances.number_of_edges()}")
  
```

#### Expected Output

```
Nodes: 3
Edges: 2
```

#### Hints

1. Use nx.Graph() to initialize.
2. Use .add_nodes_from(["Rome", "Athens", "Sparta"]) to add multiple nodes at once.
3. Adding an edge is done with .add_edge("City1", "City2").

#### Solution

```python
import networkx as nx

  alliances = nx.Graph()

  # Add nodes
  alliances.add_nodes_from(["Rome", "Athens", "Sparta"])

  # Add edges
  alliances.add_edge("Rome", "Athens")
  alliances.add_edge("Athens", "Sparta")

  print(f"Nodes: {alliances.number_of_nodes()}")
  print(f"Edges: {alliances.number_of_edges()}")
```

### Challenge: Bulk-Loading an Edge List

- id: network-analysis-02-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import networkx as nx

  # A raw list of archival data: (Sender, Receiver)
  correspondence = [
      ("Ada", "Charles"),
      ("Charles", "Mary"),
      ("Ada", "Mary"),
      ("Mary", "Charles")
  ]

  # Goal: Create a Directed Graph (DiGraph) and load all edges at once.
  # 1. Initialize nx.DiGraph() as 'G'
  # 2. Use the bulk method to add 'correspondence'
  # 3. Print the number of edges

  # Your code here

  print(f"Total Edges: {G.number_of_edges()}")
  
```

#### Expected Output

```
Total Edges: 4
```

#### Hints

1. Since the order of sender/receiver matters, use nx.DiGraph().
2. The bulk method is G.add_edges_from(correspondence).
3. Check G.number_of_edges() for the final count.

#### Solution

```python
import networkx as nx

  correspondence = [
      ("Ada", "Charles"),
      ("Charles", "Mary"),
      ("Ada", "Mary"),
      ("Mary", "Charles")
  ]

  # Initialize directed graph
  G = nx.DiGraph()

  # Bulk load
  G.add_edges_from(correspondence)

  print(f"Total Edges: {G.number_of_edges()}")
```

