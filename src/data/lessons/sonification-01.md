---
id: sonification-01
title: The Basics of Data Mapping for Sound
moduleId: data-sonification
prerequisites:
  - python-basics-04
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Understand the concept of parameter mapping sonification in DH
  - Map a range of data values to a range of musical pitches (MIDI)
  - Explain the linear mapping formula (Normalization and Scaling)
  - Export MIDI data to a playable .mid file using binary writing
keywords:
  - sonification
  - mapping
  - midi
  - multimodal
  - binary-write
---

# The Basics of Data Mapping for Sound

  ## The Audio Archive
  In Digital Humanities, we spend a lot of time *looking* at data—charts, maps, and tables. But our ears are often better at detecting subtle changes in rhythm and pattern than our eyes. **Data Sonification** is the process of turning data into sound. 

  Think of it as a **musical translation**. Just as a translator maps a word in French to a word in English, a "sonifier" maps a data point (like the sentiment of a diary entry) to a musical property (like the height of a note).

  ---

  ## 1. What is Parameter Mapping?
  Sonification usually relies on **Parameter Mapping**: linking a variable in your data to a physical property of sound.

  | Data Variable (DH Example) | Sound Property | Musical Effect |
  | :--- | :--- | :--- |
  | **Word Frequency** | Pitch | Higher frequency = Higher note. |
  | **Sentiment Score** | Timbre | Positive = Bright/Clear; Negative = Distorted/Harsh. |
  | **Punctuation Density** | Rhythm | More commas = Faster beats. |
  | **Publication Year** | Stereo Pan | Older = Left speaker; Newer = Right speaker. |

  ---

  ## 2. The MIDI Standard
  To turn numbers into music using code, we use the **MIDI** (Musical Instrument Digital Interface) standard. 
  - MIDI notes are represented by numbers from **0 to 127**.
  - **60** is Middle C.
  - Every increase of 12 represents one octave (72 is high C, 48 is low C).

  ---

  ## 3. The Linear Mapping Formula
  To map your data (which might be between 0 and 5,000 words) to a musical range (e.g., MIDI notes 48 to 84), we use a three-step process:

  1.  **Normalization**: How far is the current value into the data range? (from 0.0 to 1.0).
  2.  **Scaling**: Multiply that percentage by the size of the musical range.
  3.  **Offset**: Add it to the lowest note in your musical range.

  ```python
  # The logic inside a mapping function
  percent = (value - min_data) / (max_data - min_data)
  note = min_note + (percent * (max_note - min_note))
  ```

  ---

  ## 4. Exporting your "Digital Score"
  To hear your results, you must save your list of numbers as a `.mid` file. We use the `midiutil` library to generate instructions for a computer's virtual instrument.

  ```python
  from midiutil import MIDIFile

  # Create a MIDI object with one track
  MyMIDI = MIDIFile(1) 
  MyMIDI.addTempo(track=0, time=0, tempo=120)

  # Add the notes we mapped (pitch) to the track
  for i, pitch in enumerate(notes):
      # track, channel, pitch, time, duration, volume
      MyMIDI.addNote(0, 0, pitch, i, 1, 100)

  # Save the file using 'wb' (Write Binary) mode
  with open("data_sonification.mid", "wb") as output_file:
      MyMIDI.writeFile(output_file)
  ```

  :::tip
  **Why Sonify?** 
  Sonification is a form of **Multimodal Analysis**. It allows researchers to "listen" to a corpus while doing other tasks, and provides an accessible way for visually impaired scholars to engage with quantitative data.
  :::

  :::challenge
  You have word counts from five chapters of a novel. Your goal is to map these counts to MIDI notes between **48 (Low C)** and **84 (High C)**. If a chapter is very long, it should play a very high note.
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

  # Define the data range
  min_data = min(chapter_counts)
  max_data = max(chapter_counts)

  # Define the musical range (MIDI notes)
  min_note = 48
  max_note = 84

  def sonify(val):
      # 1. Calculate how far 'val' is across the data range (0.0 to 1.0)
      # 2. Multiply that by the width of the note range (max_note - min_note)
      # 3. Add it to the min_note
      # 4. Return as an integer (int)
      pass

  # Map the chapter counts to notes
  notes = [sonify(c) for c in chapter_counts]
  print(notes)
  
```

#### Expected Output

```
[51, 79, 68, 48, 84]
```

#### Hints

1. Percentage = (val - min_data) / (max_data - min_data)
2. The width of your note range is (max_note - min_note).
3. Wrap your final calculation in int() to ensure it is a valid MIDI number.

#### Solution

```python
chapter_counts = [1200, 4500, 3200, 800, 5000]
  min_data = min(chapter_counts)
  max_data = max(chapter_counts)
  min_note = 48
  max_note = 84

  def sonify(val):
      # Calculate percentage in data range
      percent = (val - min_data) / (max_data - min_data)
      # Map to musical range
      note = min_note + (percent * (max_note - min_note))
      return int(note)

  notes = [sonify(c) for c in chapter_counts]
  print(notes)
```

