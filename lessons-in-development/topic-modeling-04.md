---
id: topic-modeling-04
title: Interpreting and Navigating Topics
moduleId: topic-modeling
prerequisites:
  - topic-modeling-03
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Read and interpret word-topic distributions
  - Understand document-topic proportions
  - Identify "junk" topics vs. meaningful discourses
keywords:
  - interpretation
  - weights
  - visualization
  - coherence
---

# Interpreting and Navigating Topics

## Analogy

A topic model output is like a **map**. It doesn't tell you what the landmarks "mean"; it just shows you where they are. You, the human historian or literary scholar, have to look at the cluster of words "ship, whale, harpoon, sea" and decide to label that landmark "Whaling Industry." The computer provides the coordinates; you provide the name.

## Key Concepts

### 1. Word Weights
Each word in a topic has a "weight" (a probability). 
- Topic 1: `0.05*"whale" + 0.04*"sea" + 0.02*"ship"`
This means "whale" is the most important word for identifying Topic 1.

### 2. The Document-Topic Distribution
This is the most powerful part of LDA for DH. It tells you exactly how much of each topic is in each document.
- *Moby Dick* might be: 80% "Whaling", 15% "Religion", 5% "Biology".
- *Paradise Lost* might be: 10% "Whaling", 90% "Religion".

### 3. Junk Topics
Sometimes a topic will consist of words like "said," "went," "came," and "back." This is a **Junk Topic**. It usually means you didn't remove enough common verbs during preprocessing.

```python
# Showing the words in a topic using Gensim
# topics = lda.show_topics(num_words=5)
# for topic in topics:
#     print(topic)
```

## Practice

::: try-it
Look at the following cluster: "city, street, building, crowd, noise." What would you name this topic? Now look at this one: "city, mayor, council, vote, tax." How does the shift in words change the name you give the topic?
:::

## Transfer

Topic modeling is a form of **Distant Reading**. It shouldn't replace your reading of the text; it should tell you where to look. If a specific diary entry has a 90% score in a "Grief" topic, you should go back and close-read that entry to see how the model arrived at that conclusion.

::: challenge
Extract the top words from a trained model's output and identify the most important term.
:::

---challenges---

### Challenge: Identifying the Top Term

- id: topic-modeling-04-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# A simulated output from lda.show_topics()
# It's a list containing a tuple: (Topic_ID, Word_Weights_String)
model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship" + 0.020*"captain"')]

# Goal: Use string methods to extract just the first word in the list 
# (the one with the highest weight).

topic_string = model_output[0][1]

# Your code here: split the string to find the word "whale"
top_word = ""

print(top_word)
```

#### Expected Output

```
whale
```

#### Hints

1. You can split by the `"` character.
2. `topic_string.split('"')` will give you a list. The word will be at index 1.

#### Solution

```python
model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship" + 0.020*"captain"')]
topic_string = model_output[0][1]

# Splitting by quotes is a quick way to get the text between them
top_word = topic_string.split('"')[1]

print(top_word)
```