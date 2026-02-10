---
id: topic-modeling-02
title: Preprocessing for Topic Models
moduleId: topic-modeling
prerequisites:
  - topic-modeling-01
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Remove "noise" words that drown out topics
  - Apply lemmatization to group word variations
  - Filter by frequency to focus on meaningful terms
keywords:
  - stopwords
  - lemmatization
  - filtering
  - tokens
---

# Preprocessing for Topic Models

## Analogy

If you are trying to taste the subtle spices in a stew, you need to strain out the large bones and the excess water. In topic modeling, words like "the," "is," and "of" are the "water." They are everywhere, and they don't help you distinguish one topic from another. We need to "strain" our text to leave only the meaningful ingredients.

## Key Concepts

### 1. Removing Stopwords
In standard text analysis, we remove common words. In topic modeling, we often have to add **domain-specific stopwords**. If you are analyzing a collection of legal documents, the word "court" might be a stopword because it appears in every single document and provides no distinctive information.

### 2. Lemmatization
LDA works best when "running," "ran," and "runs" are all treated as the single concept "run." 

::: definition
**Lemmatization**: Reducing a word to its dictionary root (the lemma). 
Example: "better" $\rightarrow$ "good".
:::

### 3. Extreme Frequency Filtering
- **Too Frequent**: Words that appear in 90% of documents (No help in distinguishing).
- **Too Rare**: Words that appear in only 1 document (Not enough evidence to form a pattern).

```python
# Filtering a list of tokens
raw_tokens = ["the", "kings", "were", "running", "the", "kingdom"]
# Imagine we lemmatized and removed 'the' and 'were'
clean_tokens = ["king", "run", "kingdom"]
print(clean_tokens)
```

## Practice

::: try-it
In the sandbox, try taking a sentence and removing all words shorter than 3 characters. Does the meaning of the "topic" stay intact?
:::

## Transfer

Think about your specific corpus. If you are analyzing 18th-century letters, you might need to treat "compliments" and "obedient" as stopwords, as they are part of a standard closing rather than a unique topic.

::: challenge
Create a function that filters a list of tokens by removing a provided list of stopwords.
:::

---challenges---

### Challenge: Cleaning the Recipe

- id: topic-modeling-02-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# A list of words from a document
tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]
stopwords = ["it", "was", "a", "and", "in", "the"]

# Goal: Create a new list 'cleaned' containing only words not in stopwords
# and only words longer than 3 characters.

cleaned = []

# Your code here

print(cleaned)
```

#### Expected Output

```
['scary', 'dark', 'night', 'forest']
```

#### Hints

1. Use a `for` loop to look at each word in `tokens`.
2. Use `if word not in stopwords` and `if len(word) > 3`.

#### Solution

```python
tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]
stopwords = ["it", "was", "a", "and", "in", "the"]

cleaned = [w for w in tokens if w not in stopwords and len(w) > 3]

print(cleaned)
```
```