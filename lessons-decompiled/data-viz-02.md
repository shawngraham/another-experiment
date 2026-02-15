---
id: data-viz-02
title: Basic Plots with Matplotlib
moduleId: data-visualization
prerequisites:
  - data-viz-01
estimatedTimeMinutes: 35
difficulty: beginner
learningObjectives:
  - Create bar and line charts using Matplotlib
  - Map data lists to X and Y axes
  - Label axes and add titles for scholarly clarity
  - Save plots as high-quality image files for research papers
keywords:
  - matplotlib
  - bar
  - line
  - pyplot
  - axes
---

# Plotting with Matplotlib

  ## The "Grandfather" of Python Viz
  `matplotlib` is the most established plotting library in Python. While there are many newer tools, `matplotlib` remains the "engine" that powers most of them. In DH, we use it to turn the numbers we’ve counted (like word frequencies or publication years) into visual evidence.

  ---

  ## 1. The Pyplot Pipeline
  To create a visualization, we follow a specific order of operations. We usually import the library under the alias `plt`.

  ```python
  import matplotlib.pyplot as plt

  # 1. Prepare Data (List A must match List B in length)
  decades = ["1810s", "1820s", "1830s"]
  counts = [5, 12, 18]

  # 2. Choose the Chart Type
  plt.bar(decades, counts, color='skyblue')

  # 3. Add Scholarly Metadata (Labels)
  plt.xlabel("Decade of Publication")
  plt.ylabel("Number of Novels")
  plt.title("Growth of the Gothic Novel")

  # 4. Display or Save
  plt.show() 
  # plt.savefig("gothic_trends.png", dpi=300) # dpi=300 ensures it's clear for print
  ```

  ---

  ## 2. Anatomy of a Plot
  - **The Figure**: The overall window or page where everything is drawn.
  - **The Axes**: The area where the data is actually plotted (the X and Y lines).
  - **Markers/Bars**: The visual representation of your data points.

  ---

  ## 3. Common DH Visualizations

  ### The Line Chart (`plt.plot`)
  Best for "Diachronic Analysis" (looking at changes over time).
  ```python
  # Imagine tracking the word 'electricity' across 3 chapters
  plt.plot([1, 2, 3], [10, 45, 30])
  ```

  ### The Bar Chart (`plt.bar`)
  Best for comparing distinct categories, such as different authors or different archives.

  :::tip
  **Handling Long Labels**: In DH, our labels are often long (like book titles). If your X-axis labels are overlapping and unreadable, add this line before `plt.show()`:
  `plt.xticks(rotation=45)`
  :::

  :::challenge
  Every plot starts with two matching lists: the **Labels** (X) and the **Values** (Y). In the challenge at right, prepare the data needed to compare the lengths of three famous DH texts.
  :::

---challenges---
