---
id: sentiment-01
title: Dictionary vs ML Approaches
moduleId: sentiment-analysis
prerequisites:
  - text-analysis-fundamentals
estimatedTimeMinutes: 20
difficulty: beginner
learningObjectives:
  - Distinguish between lexicon-based (dictionary) and machine learning sentiment analysis
  - Implement a simple "Bag of Words" sentiment scorer
  - Understand the concept of polarity
keywords:
  - sentiment
  - lexicon
  - polarity
  - bag of words
  - dictionary approach
---

# Dictionary vs ML Approaches

## Analogy

Imagine you want to know if a restaurant review is positive or negative.
Method A: You have a list of "good words" (delicious, tasty, friendly) and "bad words" (gross, cold, rude). You circle them and count which list has more circles. This is the **Dictionary (Lexicon)** approach.
Method B: You feed thousands of reviews into a computer, telling it "this pile is 5 stars, this pile is 1 star." The computer eventually learns patterns you might miss (like "not bad" being good). This is the **Machine Learning** approach.

## Key Concepts

### Polarity
Sentiment analysis usually boils text down to a single number called **polarity**:
*   **+1.0**: Extremely Positive
*   **0.0**: Neutral
*   **-1.0**: Extremely Negative

### The Dictionary Approach
This relies on a pre-defined list of words with associated scores. It is transparent (you know *why* a score was given) but struggles with context (sarcasm, slang).

```python
# A simple sentiment dictionary
lexicon = {
    "love": 1,
    "hate": -1,
    "happy": 1,
    "sad": -1
}

text = "I love this happy place"
words = text.split()

score = 0
for word in words:
    # get(word, 0) returns 0 if the word isn't in the dictionary
    score += lexicon.get(word, 0) 

print(score) # Output: 2
```

## Practice

::: try-it
Write a list of words that are positive in a modern context but might have been negative in the 18th century (e.g., "terrific" used to mean terror-inducing). This highlights the risk of using modern dictionaries on historical text.
:::

## Transfer

*   **Political Science**: Tracking the positivity of campaign speeches over time using a fixed dictionary.
*   **Marketing**: flagging tweets containing "broken", "worst", or "fail" for immediate customer support.

::: challenge
Build a manual sentiment scorer.
:::

---challenges---

### Challenge: The Mood Calculator

- id: sentiment-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# 1. The Sentiment Dictionary
# Keys are words, Values are their sentiment score
mood_dict = {
    "joy": 2,
    "good": 1,
    "meh": 0,
    "bad": -1,
    "terrible": -2
}

# 2. The Sentence to Analyze
sentence = "the joy was good but the food was terrible"

# 3. Calculate the total score
# Split the sentence into a list of words
# Loop through the words
# Add the score from mood_dict to 'total_score'
# (If a word isn't in the dict, add 0)

total_score = 0

# Your code here

print(total_score)
```

#### Expected Output

```
1
```

#### Hints

1. Use `sentence.split()` to get the words.
2. Use `mood_dict.get(word, 0)` to handle words not in the dictionary safeley.
3. "joy"(2) + "good"(1) + "terrible"(-2) = 1.

#### Solution

```python
mood_dict = {
    "joy": 2,
    "good": 1,
    "meh": 0,
    "bad": -1,
    "terrible": -2
}

sentence = "the joy was good but the food was terrible"
words = sentence.split()

total_score = 0

for word in words:
    total_score += mood_dict.get(word, 0)

print(total_score)
```