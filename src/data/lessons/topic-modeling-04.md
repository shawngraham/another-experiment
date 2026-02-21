---
id: topic-modeling-04
title: Interpreting and Navigating Topics
moduleId: topic-modeling
prerequisites:
  - topic-modeling-03
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Read and interpret word-topic distributions (Weights)
  - Analyze document-topic proportions to track themes across a corpus
  - Identify and troubleshoot "Junk Topics" resulting from poor preprocessing
  - Apply the "Human-in-the-loop" philosophy to labeling machine output
keywords:
  - interpretation
  - weights
  - visualization
  - coherence
  - junk topics
---

# Interpreting and Navigating Topics

  ## The Scholar as Interpreter
  A topic model output is like a **map of a new territory**. The computer provides the coordinates and the landmarks, but it doesn't tell you what they "mean." 

  You, the human historian or literary scholar, have to look at a cluster of words like *"ship, whale, harpoon, sea"* and decide to label that landmark "Whaling Industry." Topic modeling is not an answer; it is a way of organizing an archive so you can ask better questions.

  ---

  ## 1. Word Weights (Probabilities)
  Each word in a topic is assigned a "weight." This number tells you how important that word is to that specific topic. 

  - **Topic 1**: `0.045*"whale" + 0.030*"sea" + 0.025*"ship"`
  - **Translation**: If you see "whale" in a document, there is a 4.5% chance the computer thinks that specific word belongs to Topic 1. 

  The words with the highest weights are your **Top Terms**. These are the words you use to decide what a topic is "about."

  ---

  ## 2. Document-Topic Proportions
  This is the "Gold Mine" for Digital Humanities. Once a model is trained, we can see exactly how much of each topic exists in every document. 

  Imagine analyzing *Moby Dick* vs. *Paradise Lost*:
  - **Moby Dick**: 85% "Whaling", 10% "Religion", 5% "Biology".
  - **Paradise Lost**: 2% "Whaling", 95% "Religion", 3% "Biology".

  By looking at these percentages, you can find "hidden" religious documents in a maritime archive, or track how the "Religion" topic fluctuates from the beginning of a novel to the end.

  ---

  ## 3. Identifying "Junk Topics"
  Sometimes a model will produce a topic that looks like this: *"said, went, came, back, told."* 
  This is a **Junk Topic**. 

  Junk topics occur when common verbs or "noise" words haven't been filtered out properly. They don't represent a meaningful discourse; they represent the structural skeleton of the language. If you see too many junk topics, you need to go back to the **Preprocessing** stage and add those words to your **Stopword List**.

  ---

  ## 4. Distant Reading vs. Close Reading
  Topic modeling is a "Distant Reading" tool, but it works best when paired with "Close Reading." If a specific diary entry has a 90% score in a "Grief" topic, you should use that as a signpost to go back and read that specific page. Use the machine to find the needle, then use your human brain to analyze the needle.

  :::tip
  **Human-in-the-loop**: This is the DH philosophy that the machine's output is only the *start* of the research. Your labels and interpretations are what turn "data" into "scholarship."
  :::

  :::challenge
  Gensim outputs topics as a single string of math. In the challenge in the sandbox, you will use Python's string tools to "snip out" the most important word (the first one) from a topic string.
  :::

---challenges---

### Challenge: Identifying the Top Term

- id: topic-modeling-04-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# A simulated output from lda.show_topics()
  # It is a list containing a tuple: (Topic_ID, Word_Weights_String)
  model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship"')]

  # The weights string is at index 1 of the first tuple
  topic_string = model_output[0][1]

  # Goal: Extract the word "whale" from the string.
  # 1. Use .split() to break the string at the double-quote characters (")
  # 2. Select the correct index from the resulting list
  # 3. Assign it to 'top_word' and print it

  # Your code here
  
```

#### Expected Output

```
whale
```

#### Hints

1. If you split "Hello "World"!" by the quote, you get ["Hello ", "World", "!"]
2. Use: parts = topic_string.split('"')
3. The word "whale" will be the second item in that list (index 1).

#### Solution

```python
model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship"')]
  topic_string = model_output[0][1]

  # Split the string by the double-quote marks
  parts = topic_string.split('"')

  # The word sits between the first and second quote marks
  top_word = parts[1]

  print(top_word)
```

