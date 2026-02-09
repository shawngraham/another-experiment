---
id: network-analysis-04
title: Visualizing Networks
moduleId: network-analysis
prerequisites:
  - network-analysis-03
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Create basic visual plots of graphs using NetworkX
  - Understand the role of layout algorithms in visualization
  - Customize node and edge appearance
keywords:
  - visualization
  - nx.draw
  - spring_layout
  - matplotlib
---

# Visualizing Networks

## Analogy

A list of numbers (centrality scores) is useful, but a map is often more intuitive. Just as a mapmaker must decide whether to put North at the top or how to flatten the globe onto paper, a network scientist must decide how to arrange nodes on the screen. This arrangement is called the **Layout**.

## Key Concepts

NetworkX relies on a separate library called **Matplotlib** to draw.

### Basic Drawing

```python
import networkx as nx
import matplotlib.pyplot as plt

# Assume G exists
nx.draw(G, with_labels=True)
```

### Layouts

A graph has no inherent "shape." We apply algorithms to determine node positions.
*   **Spring Layout**: Models edges as springs. Connected nodes pull together; disconnected nodes push apart. Good for revealing clusters.
*   **Circular Layout**: Arranges nodes in a circle. Good for visualizing density.

```python
# Calculate positions explicitly
pos = nx.spring_layout(G)

# Pass positions to the draw function
nx.draw(G, pos=pos, with_labels=True, node_color='lightblue')
```

### Customization
You can change aesthetics to represent data (e.g., node size based on centrality).

```python
nx.draw(G, node_color='red', node_size=500, font_weight='bold')
```

## Practice

::: try-it
Experimenting with layouts is visual. In a real environment, you would run this and see a popup window.
:::

## Transfer

Visualizations are powerful for "exploratory data analysis" (EDA). You might spot a cluster of characters in a novel you didn't realize were so tightly knit until you saw them grouped together by the spring layout.

::: challenge
Generate the layout positions for a graph.
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

# 1. Use the spring_layout algorithm to generate positions for G.
# Store the result in a variable named 'positions'
# Note: We are not drawing it to the screen (which is hard to grade), 
# we are just calculating the coordinates.

# Your code here

# Check result
print(type(positions))
print("1" in positions)
```

#### Expected Output

```
<class 'dict'>
True
```

#### Hints

1. The function is `nx.spring_layout(G)`.
2. It returns a dictionary where keys are nodes and values are (x,y) coordinates.
3. You do not need `plt.show()` for this challenge.

#### Solution

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from([("1", "2"), ("2", "3"), ("3", "1"), ("3", "4")])

# Generate positions
positions = nx.spring_layout(G)

# Verify
print(type(positions))
print("1" in positions)
```