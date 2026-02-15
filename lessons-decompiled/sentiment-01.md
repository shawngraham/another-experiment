---
id: sentiment-01
title: Dictionary vs ML Approaches
moduleId: sentiment-analysis
prerequisites:
  - text-analysis-fundamentals
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Distinguish between lexicon-based (dictionary) and machine learning sentiment analysis
  - Understand the "Bag of Words" model and its limitations
  - Explain the role of polarity and valence in sentiment scores
  - Identify common pitfalls in historical text analysis (e.g.
  - semantic shift)
  - Implement a functional Python sentiment scorer
keywords:
  - sentiment
  - lexicon
  - polarity
  - bag of words
  - dictionary approach
  - VADER
  - AFINN
---

# Dictionary vs ML Approaches

In Digital Humanities, we often want to track "vibes" or attitudes across thousands of pages of text—something a human cannot do alone. To do this, we use **Sentiment Analysis**.

## The Analogy: Two Ways to Grade a Paper

Imagine you are a teacher grading a student's essay for "enthusiasm."

*   **Approach A (The Dictionary):** You have a list of 100 "enthusiastic" words (great, amazing, best). You simply count how many of those words appear in the essay. You don't need to read the whole thing; you just look for the words.
*   **Approach B (Machine Learning):** You read 1,000 essays that were already graded for enthusiasm. You start to notice that enthusiasm isn't just about single words—it's about sentence structure and context (e.g., "I can't believe how good it was" vs. "I can't believe how bad it was").

## Key Concepts

### 1. Polarity and Valence
Most sentiment tools assign a **polarity** score.
*   **+1.0**: Extremely Positive
*   **0.0**: Neutral (or "Objective")
*   **-1.0**: Extremely Negative

Some dictionaries also measure **Valence** (the intensity of the word). "Happy" might be a +1, but "Ecstatic" might be a +3.

### 2. The "Bag of Words" Model
Both simple dictionary and early ML approaches often treat text as a **Bag of Words**. This means the computer ignores the order of words and just looks at their frequency. 
*   *Problem:* "The dog bit the man" and "The man bit the dog" look identical to a Bag of Words model, even though the sentiment for the man is very different!

### 3. The Dictionary (Lexicon) Approach
This is the "Gold Standard" for transparency in DH. You know exactly *why* a text got a score because you can see the word list.

**Popular Lexicons:**
*   **AFINN:** A list of English words rated from -5 to +5.
*   **VADER:** Specialized for social media; it understands emojis (😊), capitalization (GREAT!), and "boosters" (extremely good).

#### Simple Python Implementation
Notice how we lowercase the text so it matches our dictionary.

```python
# A simple sentiment dictionary (Lexicon)
lexicon = {"love": 2, "like": 1, "bad": -1, "hate": -2}

text = "I LOVE this place, it is not bad"
# Preprocessing: Lowercase and split
words = text.lower().replace(",", "").split()

score = 0
for word in words:
    score += lexicon.get(word, 0) 

print(f"Total Sentiment Score: {score}") # Output: 1 (2 from love, -1 from bad)
```

### 4. The Machine Learning (ML) Approach
ML doesn't use a fixed list. It uses a **Training Set** (a "Gold Standard" of thousands of hand-coded examples) to learn patterns.
*   **Pros:** It can handle "negation" (it learns that "not good" is negative) and sarcasm.
*   **Cons:** It is a "Black Box." It's hard to explain to a fellow historian exactly *why* the computer gave a 19th-century diary a negative score.

---

## Practice

:::try-it
**The Semantic Shift Challenge**
In the 1800s, the word "awful" often meant "full of awe" (positive/profound), whereas today it is purely negative. 
1. Think of a word that has changed meaning (e.g., "nice," "gay," or "terrific"). 
2. How would using a modern sentiment dictionary on a 1700s text lead to a "false" research finding?
:::

## Transfer: DH Use Cases

*   **Literary Studies:** Mapping the "Emotional Arc" of a novel by calculating the sentiment of every chapter.
*   **Historical Newspapers:** Analyzing how public sentiment toward "Automobiles" changed between 1900 and 1920.
*   **Sociology:** Comparing the sentiment of tweets from different geographic regions during an election.

:::challenge
Build a manual sentiment scorer that handles basic intensity.
:::

---challenges---
