---
id: topic-modeling-03
title: Training an LDA Model
moduleId: topic-modeling
prerequisites:
  - topic-modeling-02
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Convert preprocessed text into a numerical Document-Term Matrix
  - Understand the importance of the "K" (number of topics) parameter
  - Train a basic model using the Gensim library
  - Interpret the mapping between Word IDs and actual tokens
keywords:
  - gensim
  - dictionary
  - corpus
  - hyperparameters
  - doc2bow
---

# Training an LDA Model: The Numerical Archive

  ## Analogy
  Training a model is like giving a student a stack of 1,000 books and saying, "I want you to find 10 different themes in here." 

  The student doesn't know what the themes are yet; they just start looking for groups of words that appear together frequently. You, the researcher, have to decide the number of themes (the **K**) *before* the student starts. You are the architect; the computer is the builder.

  ---

  ## 1. Dictionary vs. Corpus
  Computers can't read words; they read numbers. To bridge this gap, the **Gensim** library (the standard for topic modeling in Python) uses two specialized objects:

  - **The Dictionary**: A master map that assigns a unique ID number to every unique word in your entire collection. 
    - *Example: {"whale": 0, "ship": 1, "sea": 2}*
  - **The Corpus (Bag of Words)**: A numerical version of your documents. Instead of storing the text "the whale, the whale," it stores a list of tuples: `[(0, 2)]`. This means: "Word ID 0 (whale) appears 2 times."

  ---

  ## 2. Choosing the "Goldilocks K"
  The most important decision you make is choosing the number of topics (**K**). 

  - **If K is too small**: Your topics will be "mushy" and over-generalized (e.g., a single topic that contains both "Religion" and "Politics").
  - **If K is too large**: Your topics will be too "splintered," creating dozens of tiny, overlapping categories that are hard to interpret.

  :::definition
  **Hyperparameter**: A setting you choose *before* the training starts (like K) that determines how the model learns. In DH, we often run several models with different K values (e.g., 10, 20, 50) to see which one yields the most useful results.
  :::

  ---

  ## 3. The Gensim Workflow
  To train a model, you follow three standard steps:
  1. **Build the Dictionary**: `dictionary = corpora.Dictionary(texts)`
  2. **Create the Bag of Words**: `corpus = [dictionary.doc2bow(text) for text in texts]`
  3. **Train the Model**: `lda = models.LdaModel(corpus, num_topics=K, id2word=dictionary)`

  ---

  ## 4. The Stochastic Nature of LDA
  LDA is "stochastic," meaning it uses a degree of randomness. If you run the exact same model twice, you might get slightly different results. In scholarly research, we look for **stable topics**—clusters of words that consistently appear together across multiple runs.

  :::tip
  **doc2bow** stands for "Document to Bag of Words." It is the function that translates your human-readable word lists into the numerical tuples the computer needs for its math.
  :::

  :::challenge
  To build a model, you must first build the "map" (Dictionary) and the "numbers" (Corpus). Complete the code below to convert a small set of documents into a format Gensim can use.
  :::

---challenges---
