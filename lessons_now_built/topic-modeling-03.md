---
id: topic-modeling-03
title: Training an LDA Model
moduleId: topic-modeling
prerequisites:
  - topic-modeling-02
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Convert text into a numerical Document-Term Matrix
  - Understand the importance of the 'K' parameter
  - Train a basic model using the Gensim library
keywords:
  - gensim
  - dictionary
  - corpus
  - hyperparameters
---

# Training an LDA Model

## Analogy

Training a model is like giving a student a stack of books and saying, "I want you to find 10 different themes in here." The student doesn't know what the themes are yet; they just start looking for groups of words that appear together. You, the teacher, have to decide the number of themes (the **K**) before the student starts.

## Key Concepts

### 1. The Dictionary and the Corpus
Computers can't read words; they read numbers. 
- **The Dictionary**: A map that assigns an ID to every unique word. ("whale" = 1, "ship" = 2).
- **The Corpus**: A numerical version of your text. Instead of "the whale," it stores "(1, 2)"—meaning Word ID 1 appears 2 times.

### 2. Choosing K (Number of Topics)
This is the most important decision in topic modeling.
- If **K is too small**: The topics will be too broad (e.g., "Life" and "Stuff").
- If **K is too large**: The topics will be too specific and overlap too much.

::: definition
**Hyperparameter**: A setting you choose *before* training starts (like the number of topics K) that changes how the model learns.
:::

### Training with Gensim
Gensim is the standard Python library for this. The process is always:
1. Create Dictionary.
2. Create Corpus (Bag of Words).
3. Run `LdaModel`.

```python
# Basic Gensim structure (conceptual)
from gensim import corpora, models

# data = [['word', 'list'], ['another', 'list']]
# dictionary = corpora.Dictionary(data)
# corpus = [dictionary.doc2bow(text) for text in data]
# lda = models.LdaModel(corpus, num_topics=5, id2word=dictionary)
```

## Practice

::: try-it
In the sandbox, look at how `dictionary.doc2bow` transforms a list of words. Notice how it produces a list of tuples like `(0, 1)`. What does the first number represent? What about the second?
:::

## Transfer

LDA is "stochastic," meaning it uses some randomness. If you run the same model twice, you might get slightly different results. In DH research, it is common to run the model many times to see which topics are "stable."

::: challenge
Complete the process of creating a Gensim dictionary and converting a document into a Bag-of-Words (BoW) format.
:::

---challenges---

### Challenge: Creating the Corpus

- id: topic-modeling-03-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
from gensim import corpora

# A tiny corpus of 3 documents
documents = [
    ["king", "throne", "crown"],
    ["sword", "shield", "king"],
    ["throne", "sword", "crown"]
]

# 1. Create a dictionary from the documents
dictionary = None 

# 2. Convert the first document (documents[0]) into BoW format
bow_doc = None

# Print the BoW for the first doc
print(bow_doc)
# Print the word associated with ID 0
print(dictionary[0])
```

#### Expected Output

```
[(0, 1), (1, 1), (2, 1)]
crown
```

#### Hints

1. Use `corpora.Dictionary(documents)` to create the dictionary.
2. Use `dictionary.doc2bow(documents[0])` for the second part.
3. Note: Your order of IDs might vary, but the structure `(ID, Count)` will be the same.

#### Solution

```python
from gensim import corpora

documents = [
    ["king", "throne", "crown"],
    ["sword", "shield", "king"],
    ["throne", "sword", "crown"]
]

dictionary = corpora.Dictionary(documents)
bow_doc = dictionary.doc2bow(documents[0])

print(bow_doc)
print(dictionary[0])
```

