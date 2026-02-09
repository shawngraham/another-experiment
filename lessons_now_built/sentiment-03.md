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
  - Segment a text into narrative chunks
  - Calculate sentiment for each chunk
  - Apply rolling averages to smooth noisy data
keywords:
  - narrative arc
  - rolling average
  - smoothing
  - visualization
  - plot
---

# Plotting Emotional Arcs

## Analogy

If you measure the temperature outside every second, the graph will look jagged and messy due to passing clouds or wind gusts. To see the trend (it's getting warmer), you average the temperature over the last hour.
Similarly, individual sentences in a novel fluctuate wildly. To see the "Shape of the Story" (Tragedy, Rags to Riches), we calculate a **Moving Average** of the sentiment scores.

## Key Concepts

### Segmentation
First, we break a text into chunks (sentences or chapters).
```python
sentences = full_text.split('.')
```

### Scoring
We generate a list of numbers representing the emotional path.
```python
# e.g., [0.5, 0.2, -0.1, -0.8, -0.5, 0.2, 0.9]
sentiment_timeline = [get_score(s) for s in sentences]
```

### Smoothing (Rolling Window)
We average the current score with its neighbors to reveal the arc.
```python
import pandas as pd
s_series = pd.Series(sentiment_timeline)
# Take the average of every 5 sentences
smoothed = s_series.rolling(window=5).mean()
```

## Practice

::: try-it
Consider "Harry Potter". The books often start happy (Summer), get dark (School danger), and end with triumph. What would that line look like?
:::

## Transfer

*   **Literature**: Testing Kurt Vonnegut's theory that all stories fall into a few basic emotional shapes.
*   **History**: Analyzing the emotional tone of diplomatic cables leading up to a war.

::: challenge
Smooth a jagged list of sentiment scores.
:::

---challenges---

### Challenge: Smoothing the Arc

- id: sentiment-03-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
import pandas as pd

# Raw sentiment scores from 10 consecutive sentences
# It's jagged: Up, Down, Up, Down...
raw_scores = [1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0]

# 1. Convert the list to a Pandas Series
series = pd.Series(raw_scores)

# 2. Calculate a rolling mean with a window of 2
# This averages index 0 and 1, then 1 and 2, etc.
# e.g., (1.0 + -1.0) / 2 = 0.0
smoothed = 

# Your code here

# Print the last value in the smoothed series
# Note: In a window of 2, the first value will be NaN (Not a Number) because it has no predecessor.
print(smoothed.iloc[-1])
```

#### Expected Output

```
0.0
```

#### Hints

1. Use `series.rolling(window=2).mean()`.
2. The average of `1.0` and `-1.0` is `0.0`.

#### Solution

```python
import pandas as pd

raw_scores = [1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0]

series = pd.Series(raw_scores)
smoothed = series.rolling(window=2).mean()

print(smoothed.iloc[-1])
```

### Challenge: Identifying the Climax

- id: sentiment-03-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Narrative Arc: Starts neutral, goes low (conflict), goes high (resolution)
scores = [0.1, 0.0, -0.2, -0.5, -0.8, -0.9, -0.4, 0.2, 0.6, 0.8]

# 1. Find the index of the lowest point (the darkest moment)
# You can use the standard python function min() or list methods

# Your code here
min_val = min(scores)
min_index = scores.index(min_val)

print(f"Darkest moment at sentence {min_index} with score {min_val}")
```

#### Expected Output

```
Darkest moment at sentence 5 with score -0.9
```

#### Hints

1. `min(list)` finds the lowest value.
2. `list.index(value)` finds the position of that value.

#### Solution

```python
scores = [0.1, 0.0, -0.2, -0.5, -0.8, -0.9, -0.4, 0.2, 0.6, 0.8]

min_val = min(scores)
min_index = scores.index(min_val)

print(f"Darkest moment at sentence {min_index} with score {min_val}")
```