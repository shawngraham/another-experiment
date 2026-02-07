---
id: sonification-03
title: Multimodal Mapping (Pitch and Volume)
moduleId: data-sonification
prerequisites:
  - sonification-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Map multiple data variables to different sound parameters simultaneously
  - Understand the trade-offs between complexity and clarity in audio
  - Create a structured data object ready for MIDI synthesis
keywords:
  - multimodal
  - volume
  - velocity
  - synthesis
---

# Multimodal Mapping

## Analogy

Imagine watching a ballet. You aren't just watching the dancer's **feet** (the pitch); you are also watching the **force** of their movements (the volume) and the **speed** of the dance (the rhythm). By combining these, the dance tells a much richer story. Multimodal sonification does the same for data.

## Key Concepts

### Mapping Multiple Dimensions
In DH, data is rarely just one number. A diary entry has a **date**, a **word count**, and a **sentiment score**. We can map:
- **Date** $\rightarrow$ Timing (when the note plays)
- **Sentiment** $\rightarrow$ Pitch (high for happy, low for sad)
- **Word Count** $\rightarrow$ Volume (louder for longer entries)

::: definition
**Velocity**: In MIDI terminology, this refers to how "hard" a note is struck, which usually controls the volume.
:::

### Complexity vs. Clarity
The more variables you map, the harder it is for the human ear to distinguish them. Usually, mapping more than 3 variables results in "musical noise."

```python
# Data record: [Year, Sentiment_Score, Word_Count]
entry = [1850, 0.8, 500]

# Mapping to a MIDI dictionary
note_data = {
    "time": entry[0],
    "pitch": int(60 + (entry[1] * 12)), # Map 0.0-1.0 to an octave
    "velocity": int((entry[2] / 1000) * 127) # Map count to 0-127 MIDI volume
}
```

## Practice

::: try-it
Try creating a list of three "note dictionaries" manually. If you "play" them in your head, do they sound like the data they represent?
:::

## Transfer

If you were sonifying a database of historical paintings, how would you map "brightness" or "color saturation"? Would brightness be pitch or volume? Why?

::: challenge
Convert a list of "Book" objects into a list of "Note" dictionaries using pitch for year and velocity for page count.
:::

---challenges---

### Challenge: Multimodal Note Generation

- id: sonification-03-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Corpus: Each inner list is [publication_year, page_count]
corpus = [
    [1818, 280],
    [1847, 400],
    [1897, 320]
]

# We want to map:
# Pitch: 1818-1897 -> 60-72 (MIDI range)
# Velocity (Volume): 0-500 pages -> 0-127 (MIDI range)

def generate_note(item):
    year, pages = item
    
    # Map year to pitch (60 to 72)
    # Hint: (year - 1818) / (1897 - 1818) gives percentage
    pitch = 60 + int(((year - 1818) / (1897 - 1818)) * 12)
    
    # Map pages to velocity (0 to 127)
    # Hint: (pages / 500) * 127
    velocity = int((pages / 500) * 127)
    
    return {"pitch": pitch, "velocity": velocity}

notes = [generate_note(b) for b in corpus]
for n in notes:
    print(n)
```

#### Expected Output

```
{'pitch': 60, 'velocity': 71}
{'pitch': 64, 'velocity': 101}
{'pitch': 72, 'velocity': 81}
```

#### Hints

1. For pitch, the range is 12 (72 - 60).
2. For velocity, ensure you are using the page count divided by 500.
3. Use `int()` to ensure MIDI values are whole numbers.

#### Solution

```python
corpus = [
    [1818, 280],
    [1847, 400],
    [1897, 320]
]

def generate_note(item):
    year, pages = item
    pitch = 60 + int(((year - 1818) / (1897 - 1818)) * 12)
    velocity = int((pages / 500) * 127)
    return {"pitch": pitch, "velocity": velocity}

notes = [generate_note(b) for b in corpus]
for n in notes:
    print(n)
```