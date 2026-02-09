---
id: data-viz-05
title: Creating Timelines from Historical Data
moduleId: data-visualization
prerequisites:
  - data-viz-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Represent historical events as structured data with dates and labels
  - Sort and filter temporal data to produce chronological sequences
  - Compute time spans between events and identify patterns in temporal distributions
keywords:
  - timeline
  - chronology
  - temporal data
  - dates
  - history
---

# Creating Timelines from Historical Data

## Analogy

A timeline is a **clothesline for history**. Imagine stringing a line across a room and pegging cards to it — each card has a date and an event. The line gives you spatial intuition about temporal relationships: which events cluster together, where the long gaps are, and what happened in parallel. Computational timelines do the same thing, but with hundreds or thousands of events that no wall could hold.

## Key Concepts

### Structuring Events as Data

Before you can build a timeline, each event needs at least two pieces of information: **when** it happened and **what** it was. In Python, we represent this as a list of dictionaries:

```python
events = [
    {"year": 1818, "event": "Frankenstein published"},
    {"year": 1847, "event": "Jane Eyre published"},
    {"year": 1813, "event": "Pride and Prejudice published"},
    {"year": 1851, "event": "Moby-Dick published"},
]
```

::: definition
**Temporal data**: Any dataset where time is a key variable — dates of publication, years of birth, timestamps of letters sent. Timelines are a natural way to visualise temporal data.
:::

### Sorting Chronologically

Events rarely arrive in order. Python's `sorted()` function with a `key` parameter handles this:

```python
chronological = sorted(events, key=lambda e: e["year"])
for e in chronological:
    print(f"  {e['year']}  {e['event']}")
```

### Computing Time Spans

The gaps between events can be as informative as the events themselves. A burst of publications might signal a literary movement; a long silence might suggest censorship or war:

```python
sorted_years = [e["year"] for e in chronological]
for i in range(1, len(sorted_years)):
    gap = sorted_years[i] - sorted_years[i - 1]
    print(f"  {sorted_years[i-1]} -> {sorted_years[i]}: {gap} years")
```

### Filtering by Period

Often you want to focus on a specific era. List comprehensions make this concise:

```python
romantic_era = [e for e in events if 1790 <= e["year"] <= 1850]
print(f"Events in the Romantic era: {len(romantic_era)}")
```

## Practice

::: try-it
Add more events to the list — births, deaths, historical milestones — and try filtering to a single decade. What clusters do you notice?
:::

## Transfer

Timelines are not just for display. By computing spans and densities, you can quantify concepts like "literary periods" or test hypotheses about the pace of change. A timeline of publications by women writers in the 19th century, for example, might reveal patterns that complicate traditional periodisation.

::: challenge
Build a chronological timeline of literary events and compute the gaps between them.
:::

---challenges---

### Challenge: Build a sorted timeline

- id: data-viz-05-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Sort these literary events chronologically and print a timeline
# Format each line as: "<year> - <event>"

events = [
    {"year": 1847, "event": "Jane Eyre published"},
    {"year": 1818, "event": "Frankenstein published"},
    {"year": 1891, "event": "Tess of the d'Urbervilles published"},
    {"year": 1813, "event": "Pride and Prejudice published"},
    {"year": 1859, "event": "A Tale of Two Cities published"},
    {"year": 1851, "event": "Moby-Dick published"},
]

# 1. Sort the events by year
# 2. Print each event in the format: "<year> - <event>"

# Your code here
```

#### Expected Output

```
1813 - Pride and Prejudice published
1818 - Frankenstein published
1847 - Jane Eyre published
1851 - Moby-Dick published
1859 - A Tale of Two Cities published
1891 - Tess of the d'Urbervilles published
```

#### Hints

1. Use `sorted(events, key=lambda e: e["year"])` to sort the list of dictionaries by the `year` key.
2. Loop through the sorted list and print each entry using an f-string.
3. The format is `f"{e['year']} - {e['event']}"`.

#### Solution

```python
events = [
    {"year": 1847, "event": "Jane Eyre published"},
    {"year": 1818, "event": "Frankenstein published"},
    {"year": 1891, "event": "Tess of the d'Urbervilles published"},
    {"year": 1813, "event": "Pride and Prejudice published"},
    {"year": 1859, "event": "A Tale of Two Cities published"},
    {"year": 1851, "event": "Moby-Dick published"},
]

chronological = sorted(events, key=lambda e: e["year"])
for e in chronological:
    print(f"{e['year']} - {e['event']}")
```

### Challenge: Compute gaps and find the longest

- id: data-viz-05-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Using the same events, compute the time gap between each consecutive pair
# Then identify the longest gap

events = [
    {"year": 1847, "event": "Jane Eyre published"},
    {"year": 1818, "event": "Frankenstein published"},
    {"year": 1891, "event": "Tess of the d'Urbervilles published"},
    {"year": 1813, "event": "Pride and Prejudice published"},
    {"year": 1859, "event": "A Tale of Two Cities published"},
    {"year": 1851, "event": "Moby-Dick published"},
]

# 1. Sort events by year
# 2. For each consecutive pair, compute the gap
# 3. Print each gap as: "<year1> -> <year2>: <gap> years"
# 4. Print: "Longest gap: <gap> years (<year1> to <year2>)"

# Your code here
```

#### Expected Output

```
1813 -> 1818: 5 years
1818 -> 1847: 29 years
1847 -> 1851: 4 years
1851 -> 1859: 8 years
1859 -> 1891: 32 years
Longest gap: 32 years (1859 to 1891)
```

#### Hints

1. First sort the events, then extract the years into a list with `[e["year"] for e in sorted_events]`.
2. Use `range(1, len(years))` to loop through consecutive pairs: `years[i-1]` and `years[i]`.
3. Track the longest gap by comparing each gap to a running maximum — store the max gap and the corresponding years.

#### Solution

```python
events = [
    {"year": 1847, "event": "Jane Eyre published"},
    {"year": 1818, "event": "Frankenstein published"},
    {"year": 1891, "event": "Tess of the d'Urbervilles published"},
    {"year": 1813, "event": "Pride and Prejudice published"},
    {"year": 1859, "event": "A Tale of Two Cities published"},
    {"year": 1851, "event": "Moby-Dick published"},
]

sorted_events = sorted(events, key=lambda e: e["year"])
years = [e["year"] for e in sorted_events]

max_gap = 0
max_start = 0
max_end = 0

for i in range(1, len(years)):
    gap = years[i] - years[i - 1]
    print(f"{years[i-1]} -> {years[i]}: {gap} years")
    if gap > max_gap:
        max_gap = gap
        max_start = years[i - 1]
        max_end = years[i]

print(f"Longest gap: {max_gap} years ({max_start} to {max_end})")
```
