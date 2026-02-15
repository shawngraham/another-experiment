---
id: data-viz-05
title: Creating Timelines from Historical Data
moduleId: data-visualization
prerequisites:
  - data-viz-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Represent historical events as structured dictionary objects
  - Use lambda functions to sort complex datasets chronologically
  - Compute time spans (intervals) between events to analyze density
  - Identify and extract the longest periods of silence or activity in an archive
keywords:
  - timeline
  - chronology
  - temporal data
  - dates
  - history
  - lambda
---

# Creating Timelines from Historical Data

  ## The Clothesline of History
  A timeline is a **clothesline for history**. Imagine stringing a line across a room and pegging cards to it—each card has a date and an event. 

  The line gives you spatial intuition about temporal relationships: which events cluster together (density), where the long gaps are (silence), and what happened in parallel. In the Digital Humanities, we use code to build "clotheslines" for thousands of events, helping us visualize patterns across centuries of archival data.

  ---

  ## 1. Structuring Events as Data
  Before you can build a timeline, each event needs a minimum of two attributes: **When** it happened and **What** it was. We use a list of dictionaries to keep this metadata organized.

  ```python
  events = [
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1813, "event": "Pride and Prejudice published"}
  ]
  ```

  ---

  ## 2. Sorting with Lambda Functions
  Archives rarely arrive in chronological order. To sort a list of dictionaries, we have to tell Python which "key" to look at. We use a **lambda function**—a tiny, one-line function that acts as a pointer.

  ```python
  # "Sort the events. For every element (e), use e['year'] as the basis for sorting."
  chronological = sorted(events, key=lambda e: e["year"])

  for e in chronological:
      print(f"{e['year']}: {e['event']}")
  ```

  ---

  ## 3. Computing Time Spans (Density)
  The gaps between events are often as informative as the events themselves. A "burst" of publications might signal a literary movement; a long "silence" might suggest a period of war, economic depression, or censorship.

  To calculate these gaps, we loop through our sorted years and subtract the **previous** year from the **current** year:

  ```python
  # Calculate the gap between consecutive items
  for i in range(1, len(years)):
      gap = years[i] - years[i-1]
      print(f"Gap: {gap} years")
  ```

  ---

  ## 4. Questioning Periodization
  In DH, timelines allow us to test "periodization"—the way historians group years into blocks like "The Romantic Era" or "The Victorian Age." By calculating the density of events, we can see if our data actually fits those traditional labels or if the "rhythm" of history suggests a different story.

  :::tip
  **The Running Maximum**: To find the "longest gap," you initialize a variable at 0. As you loop through the gaps, you check: *"Is this current gap bigger than my record?"* If yes, you update your record. This is a fundamental pattern in data analysis.
  :::

  :::challenge
  In the first challenge, you will sort a list of literary milestones. In the second, you will identify the "Great Silence"—the longest gap between any two publications in the list.
  :::

---challenges---
