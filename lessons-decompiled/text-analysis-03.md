---
id: text-analysis-03
title: Word Frequency Analysis
moduleId: text-analysis-fundamentals
prerequisites:
  - text-analysis-01
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Count frequencies efficiently using the collections.Counter object
  - Understand Zipf\'s Law and its impact on text analysis
  - Identify and filter for the most common terms in a corpus
  - Apply pre-processing steps to ensure accurate counting
keywords:
  - frequency
  - counting
  - counter
  - zipf
  - tokenization
---

# Word Frequency Analysis

  ## What's in a Word?
  Frequency analysis is often the first step in "Distant Reading." By counting words, we can see the dominant themes of a text. While common words like "the" and "and" are usually at the top, the top-ranking *nouns* and *verbs* often reveal the "aboutness" of a historical document.

  ---

  ## 1. Zipf's Law
  If you count every word in a novel, you will notice a strange pattern: the most frequent word (usually "the") appears twice as often as the second most frequent word, and three times as often as the third. This is called **Zipf's Law**.

  In DH, this means:
  - The top 10-20 words are usually "noise" (stopwords like *the, a, of, is*).
  - The most "interesting" words for analysis usually live in the middle of the frequency list.

  ---

  ## 2. The `Counter` Object
  While you could use a standard dictionary to count words, Python provides a specialized tool called `Counter` that is much faster and more reliable.

  ```python
  from collections import Counter

  # Imagine these are words from a poem
  words = ["heart", "rose", "heart", "thorns", "rose", "heart"]
  counts = Counter(words)

  # How many times does 'heart' appear?
  print(counts["heart"]) # Output: 3

  # What are the 2 most common words?
  print(counts.most_common(2)) 
  # Output: [('heart', 3), ('rose', 2)]
  ```

  ---

  ## 3. The Pre-processing Pipeline
  To get a meaningful word count, you must clean your data first. If you don't lowercase your text, Python will count "The" and "the" as two different words.

  **Standard DH Pipeline:**
  1. **Lowercase**: `text.lower()`
  2. **Strip Punctuation**: `.replace(",", "").replace(".", "")`
  3. **Tokenize**: `.split()`
  4. **Count**: `Counter(tokens)`

  :::tip
  The `.most_common()` method returns a **List of Tuples**. Each tuple contains the word and its count: `('word', 5)`.
  :::

  :::challenge
  In the challenge at right, you will analyze a famous line of Shakespeare. You need to turn the string into a list of words, then use `Counter` to rank them.
  :::

---challenges---
