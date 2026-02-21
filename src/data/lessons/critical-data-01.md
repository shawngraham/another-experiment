---
id: critical-data-01
title: 'Counting What Counts: How Categories Shape Data'
moduleId: critical-data
prerequisites:
  - python-basics
estimatedTimeMinutes: 45
difficulty: beginner
learningObjectives:
  - Explain how classification systems are human-made choices rather than neutral reflections of reality
  - Demonstrate how changing category boundaries in a Python dictionary changes the results of an analysis
  - Critically evaluate a categorization scheme used in a humanities dataset
keywords:
  - classification
  - categorization
  - data construction
  - census categories
  - controlled vocabularies
  - critical data studies
---

# Counting What Counts: How Categories Shape Data

## Analogy

Imagine you are a librarian deciding how to organize a new collection of books. You must choose headings: does a book about popular songs of the 1870s belong under "Music" or "Folklore"? Each choice makes certain questions easy to ask and others nearly invisible. A researcher browsing "Music" would find the book; one browsing "Labor History" would not. The shelf is not a neutral container -- it is an argument about what matters.

Data works the same way. Every dataset begins with a choice about categories, and those categories determine what the data can and cannot tell us.

## Key Concepts

### Categories Are Not Found -- They Are Made

When we encounter a spreadsheet column called "Genre" or "Occupation" or "Race," it is tempting to treat those labels as natural facts. But every category system was designed by specific people, in a specific time and place, for a specific purpose.

:::definition
**Classification system**: A structured set of categories used to organize information. Examples include the Dewey Decimal System, the U.S. Census racial categories, and the Library of Congress Subject Headings. Each reflects the worldview of its creators.
:::

Consider U.S. Census racial categories. In 1790, the categories were "Free White Males," "Free White Females," "All Other Free Persons," and "Slaves." By 1890, the Census distinguished between "Black," "Mulatto," "Quadroon," and "Octoroon." By 2020, those sub-categories had long vanished, replaced by a different structure entirely. The people did not change -- the categories did.

### Counting Depends on Grouping

In Python, a dictionary is a natural tool for counting things by category. But the results you get depend entirely on how you define the categories.

```python
from collections import Counter

# Raw occupation labels from an 1880 census sample
occupations = [
    "farmer", "servant", "laborer", "washerwoman",
    "blacksmith", "farmer", "servant", "seamstress",
    "laborer", "farmer", "clerk", "teacher"
]

counts = Counter(occupations)
for occupation, n in counts.most_common():
    print(f"{occupation}: {n}")
```

This gives us a fine-grained picture. But what happens when we group these into broader categories?

### How Grouping Changes the Story

```python
from collections import Counter

occupations = [
    "farmer", "servant", "laborer", "washerwoman",
    "blacksmith", "farmer", "servant", "seamstress",
    "laborer", "farmer", "clerk", "teacher"
]

# One possible grouping scheme
grouping_a = {
    "farmer": "Agricultural", "servant": "Domestic",
    "laborer": "Manual", "washerwoman": "Domestic",
    "blacksmith": "Manual", "seamstress": "Manual",
    "clerk": "Professional", "teacher": "Professional"
}

grouped = [grouping_a[o] for o in occupations]
counts = Counter(grouped)
for cat, n in counts.most_common():
    print(f"{cat}: {n}")
```

With this scheme, "Manual" and "Agricultural" dominate. But watch what happens with a different grouping.

:::definition
**Data construction**: The process by which raw observations are transformed into structured data through choices about what to record, how to categorize it, and what to leave out. Data is never simply "collected" -- it is always constructed.
:::

### A Different Grouping, A Different Story

```python
from collections import Counter

occupations = [
    "farmer", "servant", "laborer", "washerwoman",
    "blacksmith", "farmer", "servant", "seamstress",
    "laborer", "farmer", "clerk", "teacher"
]

# Alternative grouping: gendered labor distinction
grouping_b = {
    "farmer": "Traditionally Male", "servant": "Traditionally Female",
    "laborer": "Traditionally Male", "washerwoman": "Traditionally Female",
    "blacksmith": "Traditionally Male", "seamstress": "Traditionally Female",
    "clerk": "Traditionally Male", "teacher": "Traditionally Female"
}

grouped = [grouping_b[o] for o in occupations]
counts = Counter(grouped)
for cat, n in counts.most_common():
    print(f"{cat}: {n}")
```

Now the data tells a story about gendered labor rather than economic sectors. Neither grouping is "wrong," but each makes different patterns visible and others invisible.

### The Stakes for Humanities Research

This is not merely a technical issue. When historical archives categorize people, those categories carry power:

- **Library subject headings** that used "illegal aliens" instead of "undocumented immigrants" shaped how researchers found material about migration.
- **Museum catalogs** that listed Indigenous artifacts under "Primitive Art" reflected colonial hierarchies.
- **Genre labels** that separate "literature" from "genre fiction" encode value judgments about whose stories matter.

## Practice

:::try-it
Take the list of occupations above and create a third grouping scheme -- perhaps one based on whether the work is "Indoor" vs. "Outdoor," or "Skilled" vs. "Unskilled." Use a Python dictionary to map each occupation to your new category, then count the results with `Counter`. Notice how the story changes again.
:::

## Transfer

Think about a dataset you use or plan to use in your own research:

- What are the main categories or labels in it?
- Who decided on those categories, and when?
- What might be invisible because of how the categories were drawn?
- Could you re-categorize the same raw data to reveal a different pattern?

These questions are the foundation of critical data studies. They do not require you to abandon quantitative methods -- they require you to be honest about the choices embedded in every count.

:::challenge
Given a list of historical occupation labels, write code that groups them into two different categorization schemes and prints the counts for each, showing how the grouping changes what we "see."
:::

---challenges---

### Challenge: Re-Categorizing Historical Occupations

- id: critical-data-01-challenge
- language: python
- difficulty: beginner

#### Starter Code

```python
from collections import Counter

# Occupation records from an 1870 census sample
records = [
    "carpenter", "domestic servant", "field laborer",
    "laundress", "carpenter", "midwife", "field laborer",
    "domestic servant", "preacher", "field laborer",
    "carpenter", "laundress", "domestic servant", "teacher"
]

# SCHEME A: Group into "Skilled" or "Unskilled"
scheme_a = {
    "carpenter": "Skilled",
    "domestic servant": ___,
    "field laborer": ___,
    "laundress": ___,
    "midwife": ___,
    "preacher": ___,
    "teacher": ___
}

# SCHEME B: Group into "Indoor" or "Outdoor"
scheme_b = {
    "carpenter": ___,
    "domestic servant": "Indoor",
    "field laborer": ___,
    "laundress": ___,
    "midwife": ___,
    "preacher": ___,
    "teacher": ___
}

# Apply scheme_a and count
grouped_a = [scheme_a[r] for r in records]
counts_a = Counter(grouped_a)
print("=== Scheme A: Skilled vs. Unskilled ===")
for cat in sorted(counts_a):
    print(f"  {cat}: {counts_a[cat]}")

# Apply scheme_b and count
grouped_b = [scheme_b[r] for r in records]
counts_b = Counter(grouped_b)
print("=== Scheme B: Indoor vs. Outdoor ===")
for cat in sorted(counts_b):
    print(f"  {cat}: {counts_b[cat]}")
```

#### Expected Output

```
=== Scheme A: Skilled vs. Unskilled ===
  Skilled: 6
  Unskilled: 8
=== Scheme B: Indoor vs. Outdoor ===
  Indoor: 8
  Outdoor: 6
```

#### Hints

1. For Scheme A, think about which occupations require specialized training or expertise (Skilled) versus general labor (Unskilled). Carpenter, midwife, preacher, and teacher are skilled (3+1+1+1 = 6); domestic servant, field laborer, and laundress are unskilled (3+3+2 = 8).
2. For Scheme B, think about where the work primarily takes place. Domestic servant, laundress, midwife, preacher, and teacher work indoors; carpenter and field laborer work outdoors.
3. Count the raw records to check your math: carpenter appears 3 times, domestic servant 3 times, field laborer 3 times, laundress 2 times, midwife 1 time, preacher 1 time, teacher 1 time (14 total).

#### Solution

```python
from collections import Counter

# Occupation records from an 1870 census sample
records = [
    "carpenter", "domestic servant", "field laborer",
    "laundress", "carpenter", "midwife", "field laborer",
    "domestic servant", "preacher", "field laborer",
    "carpenter", "laundress", "domestic servant", "teacher"
]

# SCHEME A: Group into "Skilled" or "Unskilled"
scheme_a = {
    "carpenter": "Skilled",
    "domestic servant": "Unskilled",
    "field laborer": "Unskilled",
    "laundress": "Unskilled",
    "midwife": "Skilled",
    "preacher": "Skilled",
    "teacher": "Skilled"
}

# SCHEME B: Group into "Indoor" or "Outdoor"
scheme_b = {
    "carpenter": "Outdoor",
    "domestic servant": "Indoor",
    "field laborer": "Outdoor",
    "laundress": "Indoor",
    "midwife": "Indoor",
    "preacher": "Indoor",
    "teacher": "Indoor"
}

# Apply scheme_a and count
grouped_a = [scheme_a[r] for r in records]
counts_a = Counter(grouped_a)
print("=== Scheme A: Skilled vs. Unskilled ===")
for cat in sorted(counts_a):
    print(f"  {cat}: {counts_a[cat]}")

# Apply scheme_b and count
grouped_b = [scheme_b[r] for r in records]
counts_b = Counter(grouped_b)
print("=== Scheme B: Indoor vs. Outdoor ===")
for cat in sorted(counts_b):
    print(f"  {cat}: {counts_b[cat]}")
```

