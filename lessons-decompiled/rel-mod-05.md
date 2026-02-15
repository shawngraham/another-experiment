---
id: rel-mod-05
title: Measuring Truth: Evaluation Metrics
moduleId: relational-models
prerequisites:
  - rel-mod-04
estimatedTimeMinutes: 30
difficulty: intermediate
learningObjectives:
  - Define "Negative Sampling" and why it is necessary for training
  - Calculate a simple "Hits@K" metric
  - Interpret model performance in the context of historical archives
keywords:
  - evaluation
  - hits-at-k
  - negative-sampling
  - accuracy
---

# Measuring Truth: Evaluation Metrics

## Analogy: The Multiple Choice Test

Imagine you are an English teacher. You give a student a question: *"Who wrote Frankenstein?"*

If the student just says "A person," they aren't exactly wrong, but they aren't right either. To really test them, you give them a list of choices:
1. Mary Shelley
2. Percy Shelley
3. Lord Byron
4. Bram Stoker

If the correct answer is in their **Top 1** guess, they are an expert. If the correct answer is at least in their **Top 3** list, they are doing okay. In Knowledge Graphs, we call this **Hits@K**.

## Key Concepts

### 1. Negative Sampling
To learn what is "true," a model like PyKEEN must also see what is "false." If a model only ever sees correct triples, it might start to believe that *everyone* wrote *Frankenstein*. 

:::definition
**Negative Sampling**: The process of creating "fake" triples by taking a real triple and swapping the Head or Tail with a random entity. 
*Real: (Shelley, wrote, Frankenstein)*
*Fake: (Napoleon, wrote, Frankenstein)*
:::

### 2. Hits@K
When we evaluate a model, we ask: "When you ranked all possible answers, where did the correct one land?"

*   **Hits@1**: Was the correct answer the #1 choice?
*   **Hits@3**: Was the correct answer in the top 3?
*   **Hits@10**: Was the correct answer in the top 10?

```python
# A model's ranked guesses for "Capital of France"
predictions = ["Lyon", "Marseille", "Paris", "Nice", "Bordeaux"]

# In Python, index 2 is the 3rd item
# Hits@3 = True (It's in the first 3)
# Hits@1 = False (It's not in the first 1)
```

## Practice

:::try-it
Imagine a model is trying to predict which philosopher influenced **Mary Wollstonecraft**. It has ranked its top 5 guesses in a list. 

In the sandbox, use **list slicing** to extract the "Top 3" and check if "Rousseau" made the cut.

```python
# The model's ranked guesses (Index 0 is the #1 guess)
guesses = ["Godwin", "Locke", "Rousseau", "Burke", "Paine"]

# 1. Get the first three items
top_3 = guesses[0:3]

# 2. Print the top_3 list to see who is in it
print(f"Top 3 Candidates: {top_3}")

# 3. Check if 'Rousseau' is in that specific slice
if "Rousseau" in top_3:
    print("Result: Hit@3")
```
:::

## Transfer: What is a "Good" Score?

In the hard sciences, a low Hits@1 score might be considered a failure. But in the **Digital Humanities**, a model that can't get the #1 answer might still be incredibly useful. 

If a model's Hits@10 is high, it means the model has learned the "neighborhood" of truth. It might not know exactly which monk wrote a specific manuscript, but it knows the correct *monastery* or *time period*. In an archive of thousands of people, narrowing a mystery down to the "Top 10" candidates is often a massive breakthrough.

:::challenge
Determine if the correct answers fall within the model's top-ranked results.
:::

---challenges---
