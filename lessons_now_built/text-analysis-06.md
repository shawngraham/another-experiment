---
id: text-analysis-06
title: Sentiment Analysis
moduleId: text-analysis-fundamentals
prerequisites:
  - text-analysis-04
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Explain how lexicon-based sentiment analysis works
  - Build a sentiment scorer using positive and negative word lists
  - Analyse sentiment across multiple passages and compare results
keywords:
  - sentiment
  - opinion mining
  - lexicon
  - polarity
  - text analysis
---

# Sentiment Analysis

## Analogy

Imagine you are a theatre critic reading reviews of a new play. Without thinking about it, you mentally tally the glowing words ("brilliant," "captivating," "masterful") against the harsh ones ("dull," "tedious," "disappointing"). If the positives outweigh the negatives, you sense a favourable review. **Lexicon-based sentiment analysis** does exactly this, but with a computer counting the words for you across thousands of texts.

## Key Concepts

### What Is Sentiment Analysis?

Sentiment analysis (sometimes called *opinion mining*) is the computational task of determining whether a piece of text expresses a positive, negative, or neutral attitude. In the digital humanities, scholars use it to track shifts in public opinion across newspaper archives, measure the emotional arc of novels, or compare the tone of political speeches over decades.

::: definition
**Lexicon-based sentiment analysis**: A method that scores text by looking up each word in a pre-built dictionary (lexicon) of words labelled as positive or negative, then aggregating the counts.
:::

### Building a Simple Sentiment Scorer

The simplest approach uses two lists — positive words and negative words — and counts how many of each appear in a text. The **polarity score** is the difference:

```python
positive_words = {"good", "great", "excellent", "beautiful", "wonderful", "love", "brilliant", "joy"}
negative_words = {"bad", "terrible", "awful", "ugly", "hate", "dull", "pain", "boring"}

text = "The play was brilliant and beautiful but the ending was dull"
words = text.lower().split()

pos = sum(1 for w in words if w in positive_words)
neg = sum(1 for w in words if w in negative_words)
score = pos - neg
print(f"Positive: {pos}, Negative: {neg}, Score: {score}")
```

A positive score suggests favourable sentiment; a negative score suggests unfavourable sentiment; zero is neutral.

### Normalising the Score

Raw counts are hard to compare across texts of different lengths. A 10,000-word novel will naturally have more sentiment words than a 100-word review. We can normalise by dividing by the total word count:

```python
normalised = score / len(words) if words else 0
print(f"Normalised score: {normalised:.3f}")
```

## Practice

::: try-it
In the sandbox, try adding more words to the positive and negative lists. What happens when you add domain-specific terms from your own field — words like "revolutionary" (positive in science, potentially neutral in history)?
:::

## Transfer

Lexicon-based approaches are fast and transparent, but they have limitations. They miss sarcasm ("What a *wonderful* disaster"), negation ("not good"), and domain-specific meaning. More advanced techniques use machine learning, but the lexicon approach remains a valuable starting point — especially when you need to explain *why* a text was scored a certain way.

::: challenge
Score the sentiment of three short book reviews and identify which is the most positive.
:::

---challenges---

### Challenge: Score three reviews

- id: text-analysis-06-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Sentiment scoring: count positive and negative words in each review
# and print the polarity score for each

positive_words = {"good", "great", "excellent", "beautiful", "wonderful",
                  "love", "brilliant", "joy", "delightful", "masterful",
                  "captivating", "moving", "superb", "engaging"}

negative_words = {"bad", "terrible", "awful", "ugly", "hate", "dull",
                  "boring", "painful", "tedious", "disappointing",
                  "weak", "poor", "confusing", "flat"}

reviews = {
    "Review A": "A brilliant and captivating novel with beautiful prose and a moving ending",
    "Review B": "The plot was dull and the characters were flat and boring overall",
    "Review C": "A good book with some great moments but occasionally tedious pacing",
}

# For each review:
# 1. Split the text into lowercase words
# 2. Count positive and negative words
# 3. Calculate score = positive_count - negative_count
# 4. Print in the format: "Review X: score"

# Your code here
```

#### Expected Output

```
Review A: 4
Review B: -3
Review C: 1
```

#### Hints

1. Loop through `reviews.items()` to get both the label and text for each review.
2. Use `text.lower().split()` to get a list of words, then check membership with `if word in positive_words`.
3. Use `sum(1 for w in words if w in positive_words)` to count matches, then subtract the negative count.

#### Solution

```python
positive_words = {"good", "great", "excellent", "beautiful", "wonderful",
                  "love", "brilliant", "joy", "delightful", "masterful",
                  "captivating", "moving", "superb", "engaging"}

negative_words = {"bad", "terrible", "awful", "ugly", "hate", "dull",
                  "boring", "painful", "tedious", "disappointing",
                  "weak", "poor", "confusing", "flat"}

reviews = {
    "Review A": "A brilliant and captivating novel with beautiful prose and a moving ending",
    "Review B": "The plot was dull and the characters were flat and boring overall",
    "Review C": "A good book with some great moments but occasionally tedious pacing",
}

for label, text in reviews.items():
    words = text.lower().split()
    pos = sum(1 for w in words if w in positive_words)
    neg = sum(1 for w in words if w in negative_words)
    score = pos - neg
    print(f"{label}: {score}")
```

### Challenge: Normalised sentiment comparison

- id: text-analysis-06-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Compare normalised sentiment across two passages of different lengths
# Normalised score = (positive - negative) / total_words

positive_words = {"good", "great", "excellent", "beautiful", "wonderful",
                  "love", "brilliant", "joy", "delightful", "masterful",
                  "captivating", "moving", "superb", "engaging", "noble",
                  "elegant", "graceful", "triumphant", "glorious", "magnificent"}

negative_words = {"bad", "terrible", "awful", "ugly", "hate", "dull",
                  "boring", "painful", "tedious", "disappointing",
                  "weak", "poor", "confusing", "flat", "grim", "bleak",
                  "miserable", "wretched", "dreary", "gloomy"}

# A short positive review
passage_a = "A brilliant and moving novel"

# A longer mixed passage
passage_b = "The first act was brilliant and captivating but the second act became tedious and dull and the ending was disappointing and flat"

# 1. For each passage, compute the normalised score (round to 2 decimal places)
# 2. Print which passage is more positive
# Format:
#   Passage A: <score>
#   Passage B: <score>
#   More positive: Passage <X>

# Your code here
```

#### Expected Output

```
Passage A: 0.4
Passage B: -0.05
More positive: Passage A
```

#### Hints

1. Split each passage with `.lower().split()` and count words in each sentiment set.
2. Compute `round((pos - neg) / len(words), 2)` for each passage.
3. Compare the two scores and print the label of the higher one.

#### Solution

```python
positive_words = {"good", "great", "excellent", "beautiful", "wonderful",
                  "love", "brilliant", "joy", "delightful", "masterful",
                  "captivating", "moving", "superb", "engaging", "noble",
                  "elegant", "graceful", "triumphant", "glorious", "magnificent"}

negative_words = {"bad", "terrible", "awful", "ugly", "hate", "dull",
                  "boring", "painful", "tedious", "disappointing",
                  "weak", "poor", "confusing", "flat", "grim", "bleak",
                  "miserable", "wretched", "dreary", "gloomy"}

passage_a = "A brilliant and moving novel"
passage_b = "The first act was brilliant and captivating but the second act became tedious and dull and the ending was disappointing and flat"

def normalised_score(text):
    words = text.lower().split()
    pos = sum(1 for w in words if w in positive_words)
    neg = sum(1 for w in words if w in negative_words)
    return round((pos - neg) / len(words), 2)

score_a = normalised_score(passage_a)
score_b = normalised_score(passage_b)

print(f"Passage A: {score_a}")
print(f"Passage B: {score_b}")
print(f"More positive: Passage {'A' if score_a >= score_b else 'B'}")
```
