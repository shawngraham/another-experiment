---
id: rel-mod-04
title: Predicting the Unknown
moduleId: relational-models
prerequisites:
  - rel-mod-03
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Explain how models perform "Link Prediction"
  - Calculate the "Error Score" of a predicted triple
  - Understand why models provide a ranked list of candidates rather than one "correct" answer
keywords:
  - link-prediction
  - scoring-function
  - rank
  - candidates
---

# Predicting the Unknown

## Analogy: The Search Party

Imagine you are looking for a lost traveler. You know their starting point (**The Head**) and the direction they were walking (**The Relation**). 

You follow their tracks and arrive at a clearing in the forest. The traveler isn't standing exactly there, but you see three cabins nearby. 
*   **Cabin A** is 10 meters away.
*   **Cabin B** is 50 meters away.
*   **Cabin C** is 200 meters away.

You would conclude that **Cabin A** is the most likely place to find them. In Knowledge Graphs, this is called **Link Prediction**. We calculate where we *should* land, and then look at which real-world entities are closest to that spot.

## Key Concepts

### 1. The Scoring Function
In the previous lesson, we used the formula `Head + Relation = Tail`. In the real world, the math is rarely perfect. The landing spot usually falls in the empty space *near* the actual target. The distance between your "predicted spot" and the "actual entity" is called the **Score**. 

:::definition
**Scoring Function**: A calculation of how "plausible" a triple is. In many models, the lower the distance (score), the more likely the triple is to be true.
:::

```python
# Predicted landing spot [x, y]
prediction = [10, 10]
# Actual entity location
entity_loc = [12, 10]

# Distance (Score) calculation
score = abs(prediction[0] - entity_loc[0]) + abs(prediction[1] - entity_loc[1])
print(f"Plausibility Score: {score}") # Lower is better!
```

### 2. Candidate Ranking
Because models are probabilistic, they don't give one answer. They look at every entity in the archive and **rank** them from the smallest distance to the largest.

```python
predicted_spot = [5, 10]

# Candidate entities and their coordinates
candidates = {
    "Shakespeare": [5, 11],  # Distance: 1
    "Newton": [10, 15],      # Distance: 10
    "Dickens": [4, 8]        # Distance: 3
}

# The model ranks Shakespeare as the #1 prediction.
```

## Practice

:::try-it
In the sandbox, we have a predicted coordinate of `[10, 10]`. There are two entities: `Archive_A` at `[12, 10]` and `Archive_B` at `[20, 10]`. Calculate the distance for both.

```python
pred = [10, 10]
a = [12, 10]
b = [20, 10]

score_a = abs(pred[0] - a[0]) + abs(pred[1] - a[1])
score_b = abs(pred[0] - b[0]) + abs(pred[1] - b[1])

print(f"A Score: {score_a}, B Score: {score_b}")
```
:::

## Transfer: Beyond the Known

Link prediction is used by historians to fill "gaps" in archives. If a 19th-century letter mentions a "Doctor" but the name is smudged, a Knowledge Graph can look at the context—the location, the date, and the social circle—to predict the missing name.

However, we must be careful: a model will only predict things similar to what it has already seen. If your model only knows about male doctors, it will never predict a woman's name for that smudged text, even if she was there. **Ranking is not just math; it is a reflection of the data's history.**

:::challenge
Calculate prediction errors and identify the most likely candidate from a list.
:::

---challenges---
