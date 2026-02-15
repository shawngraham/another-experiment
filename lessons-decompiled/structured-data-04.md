---
id: structured-data-04
title: Grouping and Aggregation
moduleId: structured-data
prerequisites:
  - structured-data-03
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Understand the "Split-Apply-Combine" pattern of data analysis
  - Use GroupBy to categorize humanities data by metadata (genre
  - year
  - author)
  - Apply aggregate functions like sum
  - mean
  - and count to grouped data
  - Perform manual grouping using Python dictionaries
keywords:
  - groupby
  - aggregate
  - summary
  - statistics
  - counts
---

# Grouping and Aggregation: Comparing Categories

  In Digital Humanities, we often want to compare groups. We don't just want the average word count of a whole library; we want to compare the average word count of **Gothic novels** vs. **Romance novels**, or **18th-century letters** vs. **19th-century letters**.

  ---

  ## 1. The "Split-Apply-Combine" Pattern
  To analyze categories, we follow a three-step process:
  1.  **Split**: Divide the dataset into groups based on a label (e.g., "Genre").
  2.  **Apply**: Calculate a statistic for each group (e.g., "Count the rows" or "Find the Mean").
  3.  **Combine**: Merge those results back into a new summary table.

  ### The Pandas Way
  Pandas makes this process incredibly efficient with the `.groupby()` method.

  ```python
  import pandas as pd

  # Example: Finding the average publication year per genre
  summary = df.groupby('genre')['year'].mean()
  print(summary)
  ```

  ---

  ## 2. Common Aggregation Methods
  Once you have grouped your data, you can "Apply" different mathematical operations:
  - **`.count()`**: How many items are in this category?
  - **`.mean()`**: What is the average value?
  - **`.sum()`**: What is the total?
  - **`.max() / .min()`**: What are the extreme values in this group?

  ---

  ## 3. Under the Hood: Grouping with Dictionaries
  Before using Pandas, it's helpful to understand the logic of grouping. In Python, we use a dictionary to "collect" counts for different categories. 

  As we loop through our data, we check: *"Have I seen this genre before? If so, add 1 to its count. If not, start the count at 1."*

  ```python
  books = [('Gothic', 'Frankenstein'), ('Romance', 'Emma'), ('Gothic', 'Dracula')]
  counts = {}

  for genre, title in books:
      # Use .get() to avoid errors if the genre isn't in the dictionary yet
      counts[genre] = counts.get(genre, 0) + 1

  print(counts) # Output: {'Gothic': 2, 'Romance': 1}
  ```

  :::definition
  **Aggregation**: The process of turning many data points (individual books) into a single significant number (total count or average) that describes a group.
  :::

  :::challenge
  In the challenge at right, you are given a list of tuples. Each tuple contains a **genre** and a **title**. Your goal is to manually count how many books belong to the 'Gothic' genre using the dictionary method.
  :::

---challenges---
