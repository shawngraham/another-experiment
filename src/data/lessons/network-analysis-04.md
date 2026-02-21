---
id: network-analysis-04
title: Visualizing Networks
moduleId: network-analysis
prerequisites:
  - network-analysis-03
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Create visual plots of graphs using the NetworkX and Matplotlib
  - Understand the role of force-directed layout algorithms (Spring Layout)
  - Map node attributes (like centrality) to visual properties (like size)
  - Identify strategies to avoid the "Hairball" problem in large visualizations
keywords:
  - visualization
  - nx.draw
  - spring_layout
  - matplotlib
  - aesthetics
---

# Visualizing Networks: Mapping the Web

  ## Analogy: The Mapmaker's Choice
  A list of numbers (centrality scores) is useful, but a visual map is often more intuitive. Just as a mapmaker must decide whether to put North at the top or how to flatten the globe onto a 2D page, a network scientist must decide how to arrange nodes on the screen. 

  This arrangement is called the **Layout**. Because a graph has no inherent "shape" in the real world, the shape we give it is a choice we make to highlight specific patterns.

  ---

  ## 1. Basic Drawing
  NetworkX uses **Matplotlib** as its drawing engine. The simplest way to see your network is using `nx.draw()`.

  ```python
  import networkx as nx
  import matplotlib.pyplot as plt

  # Create a simple triangle
  G = nx.complete_graph(3)

  # Draw it with labels
  nx.draw(G, with_labels=True)
  plt.show()
  ```

  ---

  ## 2. Layout Algorithms
  Algorithms determine the X and Y coordinates of your nodes.

  - **Spring Layout**: The "gold standard" for DH. It treats edges like springs and nodes like magnets. Connected nodes pull together; disconnected nodes push apart. This naturally reveals **communities** and clusters.
  - **Circular Layout**: Arranges everyone in a perfect circle. This is great for showing the sheer density of connections without favoring any specific node's position.

  ```python
  # Calculate positions as a dictionary of coordinates
  pos = nx.spring_layout(G)

  # Pass those positions to the drawing function
  nx.draw(G, pos=pos, node_color='skyblue', edge_color='gray')
  ```

  ---

  ## 3. Mapping Data to Aesthetics
  The real power of visualization comes from **data-driven design**. You can make a node's size represent its **Centrality** or its color represent its **Category** (e.g., blue for poets, red for novelists).

  ```python
  # Example: Making nodes larger based on a list of sizes
  node_sizes = [100, 500, 1000] 
  nx.draw(G, node_size=node_sizes)
  ```

  ---

  ## 4. The "Hairball" Problem
  In Digital Humanities, we often deal with large archives. If you try to visualize 5,000 nodes at once, you will get a "Hairball"—a messy black blob where no patterns are visible. 

  **Strategies to fix the Hairball:**
  1.  **Filter**: Only show the top 10% most connected nodes.
  2.  **Color**: Use color to separate different groups.
  3.  **Alpha**: Make edges transparent so they don't overlap into a solid mass.

  :::tip
  **EDA (Exploratory Data Analysis)**: Use visualization as a starting point, not just a final result. A spring layout might group characters together that you didn't realize were connected, prompting you to go back and "close-read" those specific chapters.
  :::

  :::challenge
  In this challenge, you will generate the layout coordinates for a small graph. While we aren't "drawing" to the screen in the sandbox, you will verify that the algorithm successfully calculated the (x, y) positions for the nodes.
  :::

---challenges---

### Challenge: Calculate Layout Positions

- id: network-analysis-04-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("1", "2"), ("2", "3"), ("3", "1"), ("3", "4")])

  # Goal: Use the spring_layout algorithm to generate positions for G.
  # 1. Call nx.spring_layout(G)
  # 2. Store the resulting dictionary in a variable named 'positions'

  # Your code here

  # Verification
  print(type(positions))
  print("1" in positions)
  
```

#### Expected Output

```
<class 'dict'>
True
```

#### Hints

1. The function is positions = nx.spring_layout(G).
2. This returns a dictionary where each node name is a key and the value is a list of [x, y] coordinates.
3. You do not need matplotlib for this specific calculation step.

#### Solution

```python
import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("1", "2"), ("2", "3"), ("3", "1"), ("3", "4")])

  # Calculate coordinates
  positions = nx.spring_layout(G)

  print(type(positions))
  print("1" in positions)
```

### Challenge: Prepare Node Sizes

- id: network-analysis-04-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")])

  # We want node size to be based on Degree.
  # 1. Get the degrees of the nodes: G.degree()
  # 2. Create a list called 'sizes' that multiplies each degree by 100
  # Example: If degree is 2, size should be 200.

  # Your code here (use a loop or list comprehension)

  print(sizes)
  
```

#### Expected Output

```
[200, 200, 300, 100]
```

#### Hints

1. G.degree() returns a list of (node, degree) tuples.
2. Use a list comprehension: [d * 100 for n, d in G.degree()]
3. The order of nodes in G.degree() is A, B, C, D.

#### Solution

```python
import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")])

  # Calculate sizes based on degree
  # Degree of A=2, B=2, C=3, D=1
  sizes = [deg * 100 for node, deg in G.degree()]

  print(sizes)
```

