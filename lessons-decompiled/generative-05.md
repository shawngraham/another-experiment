---
id: generative-05
title: Visualizing Poetry
moduleId: generative-poetics
prerequisites:
  - data-visualization
estimatedTimeMinutes: 60
difficulty: intermediate
learningObjectives:
  - Map text strings to 2D coordinates (X
  - Y)
  - Use Matplotlib to render text-based art
  - Randomize visual properties (size
  - color
  - position)
keywords:
  - matplotlib
  - concrete poetry
  - visualization
  - spatial
---

# Visualizing Poetry

## Analogy
Think of a **Concrete Poem** (like George Herbert’s "Easter Wings"). The words are not just meant to be read; they are meant to be *seen*. The shape of the poem on the page is part of its meaning. In this lesson, we treat the screen as a canvas and the words as physical objects with coordinates.

## Key Concepts
Instead of printing text line-by-line, we can use a plotting library like `matplotlib` to place words anywhere on an X/Y axis.

```python
import matplotlib.pyplot as plt

# Create a blank plot
plt.figure(figsize=(5,5))
# Place a word at X=0.5, Y=0.5
plt.text(0.5, 0.5, "CENTER", fontsize=20, ha='center')
plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
```

By using a loop and `random.random()\

---challenges---
