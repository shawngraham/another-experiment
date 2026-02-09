---
id: sentiment-02
title: Using VADER for Social Data
moduleId: sentiment-analysis
prerequisites:
  - sentiment-01
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Understand why VADER is optimized for social media text
  - Interpret the 'compound' score
  - Use the NLTK library to score text
keywords:
  - vader
  - nltk
  - compound score
  - social media
---

# Using VADER for Social Data

## Analogy

If the Dictionary approach is a simple ruler, **VADER** (Valence Aware Dictionary and sEntiment Reasoner) is a precision caliper. It doesn't just know that "good" is positive; it knows that "GOOD!!!" is more positive than "good", and that "not good" is actually negative. It is specifically designed for the messy, emoji-filled, capitalized world of social media.

## Key Concepts

### NLTK and VADER
We use the Python library **NLTK** (Natural Language Toolkit).

```python
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Initialize the tool
sia = SentimentIntensityAnalyzer()

# Score text
text = "I LOVE this movie!!! :)"
scores = sia.polarity_scores(text)

print(scores)
```

### Interpreting Output
VADER returns a dictionary with four numbers:
1.  **neg**: Negative (0.0 to 1.0)
2.  **neu**: Neutral (0.0 to 1.0)
3.  **pos**: Positive (0.0 to 1.0)
4.  **compound**: A normalized summary score from -1 (most negative) to +1 (most positive).

For most DH analysis, we focus on the **compound** score.

## Practice

::: try-it
How would VADER score "The movie was not bad"? A simple dictionary sees "bad" (-1). VADER sees "not" flipping the polarity.
:::

## Transfer

Using VADER allows researchers to analyze vast amounts of Twitter or Reddit data to gauge public reaction to events in real-time.

::: challenge
Analyze a list of "tweets" to find the most positive one.
:::

---challenges---

### Challenge: Finding the Happiest Tweet

- id: sentiment-02-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# To avoid dependency issues in the browser, we will mock the VADER functionality.
# In real life, you would import SentimentIntensityAnalyzer from nltk.sentiment

class MockVader:
    def polarity_scores(self, text):
        # A simplified mock logic for this challenge
        score = 0.0
        if "love" in text: score += 0.8
        if "hate" in text: score -= 0.8
        if "!" in text: score *= 1.5 
        return {"compound": score}

sia = MockVader()

tweets = [
    "I hate traffic",
    "I love coding",
    "I love coding!!!"
]

# 1. Loop through the tweets
# 2. Use sia.polarity_scores(tweet)['compound'] to get the score
# 3. Find and print the text of the tweet with the highest score

best_tweet = ""
highest_score = -100

# Your code here

print(best_tweet)
```

#### Expected Output

```
I love coding!!!
```

#### Hints

1. Create a loop: `for t in tweets:`.
2. Get the score: `current_score = sia.polarity_scores(t)['compound']`.
3. Compare: `if current_score > highest_score:` update the variables.

#### Solution

```python
class MockVader:
    def polarity_scores(self, text):
        score = 0.0
        if "love" in text: score += 0.8
        if "hate" in text: score -= 0.8
        if "!" in text: score *= 1.5 
        return {"compound": score}

sia = MockVader()

tweets = [
    "I hate traffic",
    "I love coding",
    "I love coding!!!"
]

best_tweet = ""
highest_score = -100

for t in tweets:
    score = sia.polarity_scores(t)['compound']
    if score > highest_score:
        highest_score = score
        best_tweet = t

print(best_tweet)
```