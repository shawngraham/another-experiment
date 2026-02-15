---
id: data-viz-04
title: Visualizing Textual Patterns
moduleId: data-visualization
prerequisites:
  - data-viz-03
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Map text analysis output (Counter objects) to Matplotlib charts
  - Visualize the most common words in a corpus while handling stopwords
  - Understand Lexical Dispersion as a way to visualize narrative time
  - Compare word usage patterns across different texts
keywords:
  - frequency
  - dispersion
  - corpus-viz
  - textual-data
  - nltk
---

# Visualizing Textual Patterns

  ## Turning Words into Shapes
  In Digital Humanities, we often move from "Close Reading" (analyzing a single page) to "Distant Reading" (analyzing a whole library). To do this effectively, we must turn our linguistic counts into visual evidence.

  ---

  ## 1. The "Tuple Problem"
  In the Text Analysis module, we learned that `Counter.most_common()` gives us a list of tuples:
  `[('the', 10), ('whale', 5)]`

  However, Matplotlib needs two separate lists: one for **labels** (the words) and one for **values** (the counts). We can use a **List Comprehension** to "unzip" these tuples:

  ```python
  from collections import Counter
  import matplotlib.pyplot as plt

  text = "the whale the sea the whale ship"
  counts = Counter(text.split())
  top_words = counts.most_common(2) 

  # Unzipping the tuples
  words = [item[0] for item in top_words]  # ['the', 'whale']
  freqs = [item[1] for item in top_words]  # [3, 2]

  plt.bar(words, freqs)
  plt.title("Word Frequency in Moby Dick Snippet")
  plt.show()
  ```

  ---

  ## 2. Lexical Dispersion: Narrative Time
  A **Lexical Dispersion Plot** is a uniquely DH way of looking at a book. Imagine the X-axis is the timeline of a novel (from the first word to the last). A dispersion plot draws a vertical line every time a specific word appears.

  - **Use Case**: Does the word "Ghost" appear only at the end of the story? Does the word "Marriage" appear in the first chapter and then disappear until the last?
  - **Visualization**: This helps scholars see the "thematic rhythm" of a text without reading the whole thing.

  ---

  ## 3. Comparative Visualization
  To compare two authors, we often use side-by-side bar charts (subplots). This reveals **Stylometry**—the study of linguistic style. For example, you might find that while two authors write about "Death," one uses the word as a noun while the other uses it as an adjective.

  :::tip
  **Filter the Noise**: If you plot your frequencies without removing "Stopwords" (the, and, of, is), your chart will always look the same regardless of the book. Always clean your text *before* plotting to see the words that actually matter to your research.
  :::

  :::challenge
  Before you can create a chart, you must be able to extract the frequency data correctly. In the challenge at right, use the `Counter` object to find the most frequent words in a short string.
  :::

---challenges---
