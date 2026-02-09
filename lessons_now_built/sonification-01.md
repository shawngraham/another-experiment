---
id: sonification-01
title: The Basics of Data Mapping for Sound
moduleId: data-sonification
prerequisites:
  - python-basics-04
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Understand the concept of parameter mapping sonification
  - Map a range of data values to a range of musical pitches
  - Use Python to translate text metrics into MIDI-style notes
keywords:
  - sonification
  - mapping
  - midi
  - frequency
---

# The Basics of Data Mapping for Sound

## Analogy

Think of data sonification like a **musical translation**. Just as a translator might map a word in French to a word in English, a "sonifier" maps a data point (like the number of times a word appears in a text) to a musical property (like the height of a note). If a bar chart uses **height** to show scale, sonification uses **pitch**.

## Key Concepts

### What is Sonification?
Sonification is the use of non-speech audio to convey information. In DH, this allows us to "hear" patterns in a corpus that might be missed by the eye, such as the rhythmic density of punctuation in a novel or the shift in sentiment over a century of diaries.

::: definition
**Parameter Mapping**: The process of linking a data variable (like a year) to a physical sound property (like volume or pitch).
:::

### Linear Mapping
To turn data into music, we must "scale" our values. Human hearing for pitch is usually measured in MIDI notes (where 60 is Middle C) or Frequency (Hz).

```python
# Simple linear mapping function
def map_value(value, min_data, max_data, min_note, max_note):
    # Calculate how far the value is in the data range (0.0 to 1.0)
    percent = (value - min_data) / (max_data - min_data)
    # Apply that percentage to the musical range
    return int(min_note + (percent * (max_note - min_note)))

print(map_value(50, 0, 100, 60, 72)) # Maps 50 to the middle of 60-72
```

## Practice

::: try-it
In the sandbox, try changing the `min_note` and `max_note` values. See how it affects the "resolution" of your musical translation. What happens if the `max_note` is lower than the `min_note`?
:::

## Transfer

How might the "mood" of your research change if high values were mapped to very low, rumbling notes instead of high, piercing ones? This is an aesthetic choice that impacts how your audience interprets your data.

::: challenge
You have a list of word counts from five chapters of a book. Map these counts to MIDI notes so they can be played by a virtual instrument.
:::

---challenges---

### Challenge: Mapping Pitch

- id: sonification-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
# Data: word counts for 5 chapters
chapter_counts = [1200, 4500, 3200, 800, 5000]

# We want to map these to MIDI notes between 48 (Low C) and 84 (High C)
min_data = min(chapter_counts)
max_data = max(chapter_counts)
min_note = 48
max_note = 84

def sonify(val):
    # Your code here: 
    # 1. Find the percentage of the value in the data range
    # 2. Map it to the note range
    # 3. Return as an integer
    pass

notes = [sonify(c) for c in chapter_counts]
print(notes)
```

#### Expected Output

```
[51, 79, 68, 48, 84]
```

#### Hints

1. The formula for percentage is `(value - min_data) / (max_data - min_data)`.
2. Multiply that percentage by the size of the note range: `(max_note - min_note)`.
3. Add the result back to the `min_note` and use `int()` to round it.

#### Solution

```python
chapter_counts = [1200, 4500, 3200, 800, 5000]
min_data = min(chapter_counts)
max_data = max(chapter_counts)
min_note = 48
max_note = 84

def sonify(val):
    percent = (val - min_data) / (max_data - min_data)
    note = min_note + (percent * (max_note - min_note))
    return int(note)

notes = [sonify(c) for c in chapter_counts]
print(notes)
```
