---
id: sentiment-03
title: Plotting Emotional Arcs
moduleId: sentiment-analysis
prerequisites:
  - sentiment-02
  - data-visualization-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Segment long-form text into narrative chunks for longitudinal analysis
  - Explain the relationship between "noise" and "signal" in sentiment data
  - Apply rolling averages (moving windows) using the Pandas library
  - Interpret narrative "shapes" such as the Tragedy or the Man in a Hole
keywords:
  - narrative arc
  - rolling average
  - smoothing
  - syuzhet
  - pandas
  - time-series
---

# Plotting Emotional Arcs

In Digital Humanities, we often treat a book not as a single object, but as a **timeline**. By measuring sentiment from the first page to the last, we can visualize the "Emotional Arc" or "Shape" of a story.

## The Problem of Noise

If you plot the sentiment of every single sentence in a novel, the resulting graph looks like "static" or "noise." This is because a happy chapter might still contain a sentence like *"He died of laughter,"* which a computer sees as negative.

To see the **signal** (the overall trend) through the **noise** (individual word fluctuations), we use a **Rolling Average**.

## The Workflow

### 1. Segmentation (Chunking)
We break the text into equal parts. In DH, we often use "windows" of 100 or 500 words rather than chapters, because chapters vary in length.

```python
# Simple split by sentence
sentences = full_text.split('.')
```

### 2. The Sentiment Timeline
We calculate the score for every chunk and store it in a list. This creates a **Time Series**.

```python
# A list of compound scores
timeline = [0.1, 0.2, -0.5, -0.6, 0.1, 0.8] 
```

### 3. Smoothing with Pandas
We use the **Pandas** library to calculate a "Moving Average." This replaces each score with the average of itself and its neighbors. This "smooths" the jagged peaks into a readable curve.

```python
import pandas as pd

# Convert list to a Pandas Series
series = pd.Series(timeline)

# Calculate average using a window of 10 sentences
smoothed_arc = series.rolling(window=10).mean()
```

## Narrative Shapes

There is an idea that most stories follow specific shapes:
*   **"Rags to Riches"**: A steady rise in sentiment.
*   **"Tragedy/Oedipus"**: A steady fall.
*   **"Person in a Hole"**: Fall, then a rise.
*   **"Cinderella"**: Rise, fall, then a massive rise.

---

## Practice

:::try-it
**Conceptualizing Windows**
If you have a window size of 1 (no smoothing), your graph is a zigzag. If your window size is 10,000 (the whole book), your graph is a flat line. Success in DH often involves finding the "Goldilocks" window size that shows the arc without losing too much detail.
:::

## Transfer

*   **Literary Studies**: Comparing the emotional arcs of 19th-century British novels vs. American novels.
*   **Film Studies**: Analyzing screenplays to see if "Action" movies have more frequent sentiment fluctuations than "Dramas."
*   **History**: Mapping the "rhetorical heat" of a long-running parliamentary debate to find the moment of peak tension.

:::challenge
Smooth a jagged list of sentiment scores and identify the turning points.
:::

---challenges---
