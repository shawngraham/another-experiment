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
