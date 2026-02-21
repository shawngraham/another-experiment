---
id: topic-modeling-01
title: 'Topic Modeling: Conceptual Foundations'
moduleId: topic-modeling
prerequisites:
  - text-analysis-04
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Explain the logic of Latent Dirichlet Allocation (LDA)
  - Understand the "Bag of Words" assumption and its trade-offs
  - Differentiate between a "Topic" (word clusters) and a "Category" (fixed labels)
  - Identify the importance of Stopword removal in modeling
keywords:
  - LDA
  - distant reading
  - latent
  - probability
  - bag-of-words
---

# Topic Modeling: Conceptual Foundations

  ## Analogy
  Imagine you have a giant pile of 1,000 unsorted newspaper clippings from the 1920s. You don't have time to read them, but you notice that some clippings use the words "stadium," "goal," and "referee" frequently, while others use "election," "vote," and "parliament." 

  Even without reading the articles, you can guess that the first group represents a discourse on **Sports** and the second on **Politics**. Topic modeling is a digital assistant that sorts these clippings by looking at which words tend to "hang out" together in the same documents.

  ---

  ## 1. Latent Dirichlet Allocation (LDA)
  LDA is the most common algorithm for topic modeling in the humanities. It works on a "probabilistic" basis, assuming two things:
  1.  **Documents are mixtures of topics**: A single letter from a soldier might be 60% "military life" and 40% "family affection."
  2.  **Topics are mixtures of words**: The "Military" topic has a high probability of containing words like "march," "camp," and "officer."

  :::definition
  **Latent**: This means "hidden." We call it *Latent* Dirichlet Allocation because the topics aren't explicitly labeled in the text; the computer has to discover the hidden patterns.
  :::

  ---

  ## 2. The Bag of Words (BoW)
  To a topic model, **grammar and word order do not matter**. "The cat sat on the mat" and "The mat sat on the cat" are identical to the model. It treats a document like a "bag" of individual words, only caring about how many of each word are present.

  ```python
  # A "Bag of Words" representation
  doc = "history is a set of lies"
  bag = doc.split()
  counts = {word: bag.count(word) for word in set(bag)}
  # Result: {'set': 1, 'is': 1, 'lies': 1, 'a': 1, 'history': 1, 'of': 1}
  ```

  ---

  ## 3. The Problem of "The": Stopwords
  In the challenge in the sandbox, you will find shared words between two sentences. You will notice that common words like "the" appear in both. In real topic modeling, these are called **Stopwords**. Because they appear in *every* document, they don't help the computer distinguish between topics. Most researchers remove them before running a model.

  ---

  ## 4. Why Use This in DH?
  Topic modeling is a form of **Distant Reading**. It allows a scholar to:
  -   Survey thousands of documents at once.
  -   Discover themes they didn't know existed.
  -   Track how a "Topic" (like *democracy* or *nature*) changes in its word usage over 200 years.

  :::tip
  **Topics vs. Categories**: A category is a label *you* give a book (like "Fiction"). A topic is a cluster of words the *computer* finds (like "ship, sea, whale, captain"). It is up to the researcher to interpret what those clusters mean.
  :::

  :::challenge
  To build topics, the computer looks for "overlap." Identify the shared words between these two documents. These shared words represent the "latent" connection the computer uses to group texts together.
  :::

---challenges---

### Challenge: Finding Topic Overlap

- id: topic-modeling-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Two sentences representing two different documents
  doc_a = "the storm clouds moved over the dark mountain"
  doc_b = "the rain fell on the mountain and the dark forest"

  # Goal: Create a set of words that appear in BOTH documents.
  # These shared words are the "glue" LDA uses to build topics.

  # 1. Turn each document into a set of words
  words_a = set(doc_a.split())
  words_b = set(doc_b.split())

  # 2. Use the set intersection operator (&) to find words in both
  shared_words = set() # Replace this with your intersection code

  # 3. Print the sorted list of shared words
  print(sorted(list(shared_words)))
  
```

#### Expected Output

```
['dark', 'mountain', 'the']
```

#### Hints

1. The intersection operator is the ampersand: words_a & words_b.
2. Notice that "the" is included; in a real project, we would remove this as a "stopword".
3. Make sure to assign the result of the intersection to the variable shared_words.

#### Solution

```python
doc_a = "the storm clouds moved over the dark mountain"
  doc_b = "the rain fell on the mountain and the dark forest"

  words_a = set(doc_a.split())
  words_b = set(doc_b.split())

  # Use & to find common items in both sets
  shared_words = words_a & words_b

  print(sorted(list(shared_words)))
```

