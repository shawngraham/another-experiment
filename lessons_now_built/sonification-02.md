---
id: sonification-02
title: Rhythms of the Archive
moduleId: data-sonification
prerequisites:
  - sonification-01
estimatedTimeMinutes: 35
difficulty: beginner
learningObjectives:
  - Map temporal data to musical duration
  - Create a "sequence" of notes with varying lengths
  - Understand the relationship between data density and tempo
keywords:
  - rhythm
  - duration
  - tempo
  - sequence
---

# Rhythms of the Archive

## Analogy

If pitch is the **space** of a sound (high or low), rhythm is its **time**. Think of a historical timeline like a sheet of music. Events that happen close together in time feel like a rapid drumroll; events separated by decades feel like long, sustained notes held by a violin.

## Key Concepts

### Temporal Sonification
In DH, we often deal with time-series data: when books were published, when letters were sent, or when a specific word appears in a text. We can map the **distance between events** to the **duration of a note**.

::: definition
**Duration**: The length of time a sound lasts. In sonification, this is often mapped to the quantity of data or the time elapsed between points.
:::

### Creating a Sequence
To "hear" a timeline, we don't just need notes; we need to know when each note starts and how long it lasts.

```python
# A list of years when a specific event occurred
event_years = [1800, 1805, 1806, 1820]

# Calculate the 'gaps' between years to create rhythm
durations = []
for i in range(len(event_years) - 1):
    gap = event_years[i+1] - event_years[i]
    durations.append(gap)

print(durations) # [5, 1, 14]
```

## Practice

::: try-it
What happens if you have two events in the same year? The gap would be zero. How might you handle a "zero-duration" note in music? Try adding a small "offset" to every duration so that every event makes at least a short sound.
:::

## Transfer

Think about a collection of letters. If you mapped the number of days between letters to the length of a musical rest (silence), what would a "frantic" correspondence sound like compared to a "drifting" one?

::: challenge
Take a list of timestamps (represented as integers) and calculate the durations between them to create a rhythmic score.
:::

---challenges---

### Challenge: Calculating Duration

- id: sonification-02-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Timestamps of when a keyword appears in a text (page numbers)
mentions = [12, 15, 16, 40, 42]

# Goal: Create a list of durations (the difference between each mention)
# If mentions are [12, 15], the duration is 3.

durations = []

# Your code here: loop through the list and calculate differences
# Hint: Use a range based on the length of the list minus one

print(durations)
```

#### Expected Output

```
[3, 1, 24, 2]
```

#### Hints

1. Use `for i in range(len(mentions) - 1):`.
2. Access the current item with `mentions[i]` and the next item with `mentions[i+1]`.
3. Subtract the current from the next to get the duration.

#### Solution

```python
mentions = [12, 15, 16, 40, 42]
durations = []

for i in range(len(mentions) - 1):
    diff = mentions[i+1] - mentions[i]
    durations.append(diff)

print(durations)
```
