---
id: sonification-02
title: Rhythms of the Archive
moduleId: data-sonification
prerequisites:
  - sonification-01
estimatedTimeMinutes: 35
difficulty: beginner
learningObjectives:
  - Map temporal data (timestamps) to musical duration and onset time
  - Calculate the distance between data points to create a "rhythmic sequence"
  - Understand how data density translates to musical tempo
  - Handle "edge cases" like zero-duration notes in a dataset
keywords:
  - rhythm
  - duration
  - tempo
  - sequence
  - inter-onset
---

# Rhythms of the Archive

  ## Analogy
  If pitch is the **space** of a sound (high or low), rhythm is its **time**. 

  Think of a historical timeline like a sheet of music. Events that happen close together in time—like a flurry of letters sent during a crisis—feel like a rapid drumroll. Events separated by decades of silence feel like long, sustained notes held by a violin. 

  ---

  ## 1. Temporal Sonification
  In the humanities, we often deal with "Time-Series" data: when books were published, when a specific word appears in a text, or the timestamps of a correspondence. 

  To turn these "points in time" into rhythm, we map the **distance between events** to the **duration of a note** (how long it lasts) or the **Inter-onset Interval** (how much silence exists between the start of two notes).

  ---

  ## 2. The Logic of "The Next Item"
  To find the rhythm of an archive, we have to look at two items at once: the current event and the one that follows it. In Python, we do this by looping through a list but stopping one item before the end so we don't "fall off the edge" of the list.

  ```python
  # Years of major events
  years = [1800, 1805, 1806, 1820]

  # We use range(len(years) - 1) to avoid an "IndexError"
  for i in range(len(years) - 1):
      current_year = years[i]
      next_year = years[i+1]
      
      gap = next_year - current_year
      print(f"The gap between {current_year} and {next_year} is {gap} years.")
  ```

  ---

  ## 3. Programming Rhythm in MIDI
  When using the `midiutil` library, rhythm is controlled by two parameters: **time** (when the note starts) and **duration** (how long it stays down).

  - **High Density**: Small gaps between events result in a high "tempo" or "staccato" feel.
  - **Low Density**: Large gaps create long, "legato" tones or long pauses of silence.

  ```python
  # time: where the note starts
  # duration: how long it lasts
  MyMIDI.addNote(track, channel, pitch, time, duration, volume)
  ```

  ---

  ## 4. The Problem of "Zero Time"
  In historical data, two events often happen at the same time (e.g., two books published in the same year). If the gap is `0\

---challenges---
