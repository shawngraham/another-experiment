---
id: sentiment-02
title: Using VADER for Social Data
moduleId: sentiment-analysis
prerequisites:
  - sentiment-01
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Explain the four heuristics VADER uses to modify sentiment scores
  - Interpret the "compound" score vs. the "pos/neu/neg" distribution
  - Initialize and run the VADER analyzer using the NLTK library
  - Apply sentiment analysis to a collection of short-form texts
keywords:
  - vader
  - nltk
  - compound score
  - social media
  - heuristics
---

# Using VADER for Social Data

## Why VADER?

If a basic dictionary is a simple ruler, **VADER** (Valence Aware Dictionary and sEntiment Reasoner) is a precision caliper. 

Standard dictionaries fail on social media because humans don't write perfectly. VADER was specifically built to handle the "messy" language of the internet. It is **rule-based**, meaning it uses a dictionary but applies five smart "heuristics" (rules) to adjust the score.

### The 5 Rules of VADER
1.  **Punctuation**: "Enjoyed!" is positive, but "Enjoyed!!!" is *more* positive.
2.  **Capitalization**: "THE WORST" is more negative than "the worst."
3.  **Degree Modifiers**: "Extremely happy" vs. "Slightly happy."
4.  **Negation**: It knows that "not good" is negative.
5.  **Contrastive Conjunctions**: It understands that "but" shifts the meaning (e.g., "The food was great, but the service was terrible" will lean negative).

## Implementation in Python

We use the **NLTK** (Natural Language Toolkit) library to access VADER.

```python
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Essential: Download the VADER lexicon data
nltk.download('vader_lexicon')

# Initialize the analyzer
sia = SentimentIntensityAnalyzer()

text = "The book was sort of good, but the ending was HORRIBLE!!!"
scores = sia.polarity_scores(text)

print(scores)
```

## Interpreting the Output

VADER returns a dictionary of four scores:
*   **neg**: Negative (0.0 to 1.0)
*   **neu**: Neutral (0.0 to 1.0)
*   **pos**: Positive (0.0 to 1.0)
*   **compound**: The "Gold Standard" score. It is a single number representing the sum of all words, normalized between **-1 (extremely negative)** and **+1 (extremely positive)**.

**Standard Thresholds:**
*   **Positive**: Compound score >= 0.05
*   **Neutral**: Between -0.05 and 0.05
*   **Negative**: Compound score <= -0.05

---

## Practice

:::try-it
**Testing the Rules**
Compare the scores of these two sentences using the logic above:
1. "The lecture was good."
2. "The lecture was GOOD!!!" 
Notice how the compound score jumps significantly just by adding caps and exclamation points.
:::

## Transfer: DH in Practice

*   **Public History:** Analyzing thousands of YouTube comments on a historical documentary to see how the public reacts to controversial topics.
*   **Digital Ethnography:** Measuring the "toxicity" of different online gaming communities or forums over time.
*   **Crisis Response:** Using real-time Twitter data to track the "mood" of a city during a natural disaster or protest.

:::challenge
Analyze a list of "tweets" to find the most positive one.
:::

---challenges---
