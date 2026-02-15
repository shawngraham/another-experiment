---
id: topic-modeling-02
title: Preprocessing for Topic Models
moduleId: topic-modeling
prerequisites:
  - topic-modeling-01
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Identify and remove "noise" words using custom stopword lists
  - Understand Lemmatization as a tool for grouping semantic variations
  - Apply frequency filtering to focus on statistically meaningful terms
  - Implement a multi-step cleaning pipeline in Python
keywords:
  - stopwords
  - lemmatization
  - filtering
  - tokens
  - noise
---

# Preprocessing for Topic Models: Straining the Soup

  ## The Signal vs. Noise Problem
  If you are trying to taste the subtle spices in a stew, you need to strain out the large bones and the excess water. In topic modeling, words like "the," "is," and "of" are the "water." They appear everywhere, and because they are in every document, they don't help the computer distinguish one topic from another. To find the "signal" (the topics), we must first remove the "noise."

  ---

  ## 1. Custom Stopwords
  Most programming libraries provide a default list of English stopwords. However, as a DH researcher, you often need **domain-specific stopwords**. 

  -   **Example**: If you are analyzing a collection of 18th-century legal documents, the word "court" or "witness" might appear in every single file. Because they are universal to your corpus, they provide no distinctive information. You should treat them as stopwords.

  ---

  ## 2. Lemmatization: Grouping Concepts
  LDA works best when "running," "ran," and "runs" are all treated as the single concept: **run**. 

  :::definition
  **Lemmatization**: Reducing a word to its "lemma" or dictionary root. Unlike "Stemming" (which just chops off the ends of words), lemmatization uses a dictionary to ensure the result is a real word.
  -   "Better" &rarr; "Good"
  -   "Civilians" &rarr; "Civilian"
  :::

  ---

  ## 3. Extreme Frequency Filtering
  Beyond stopwords, we often filter words based on how many documents they appear in:
  -   **Too Frequent**: If a word appears in 95% of your documents, it won't help define a specific topic.
  -   **Too Rare (Hapax Legomena)**: If a word appears only once in 10,000 pages, the computer doesn't have enough evidence to "group" it with anything else. These are usually removed to speed up the model.

  ---

  ## 4. The Cleaning Pipeline
  In a real DH project, your "cleaning recipe" looks like this:
  1.  **Lowercase** everything.
  2.  **Remove Punctuation** and numbers.
  3.  **Lemmatize** the words.
  4.  **Remove Stopwords** (Standard + Custom).
  5.  **Remove Short Words** (Words with 1 or 2 letters are rarely useful for topics).

  ```python
  # A cleaned "Bag of Words" result:
  raw = "The kings were running through the kingdom"
  # After lowercase, lemmatization, and stopword removal:
  clean = ["king", "run", "kingdom"]
  ```

  :::tip
  **Humanities Insight**: Be careful! Removing "he" and "she" is standard for topic models, but if your research question is about **gender and power**, those "stopwords" are actually your most important data points. Always match your cleaning to your research question.
  :::

  :::challenge
  In the challenge at right, you will act as the "strainer." You must take a list of tokens and filter them by two criteria: they must not be in the stopword list, and they must be longer than 3 characters.
  :::

---challenges---
