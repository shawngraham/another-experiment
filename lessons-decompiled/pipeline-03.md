---
id: pipeline-03
title: Stage 3: Comparing and Cross-Tabulating
moduleId: dh-pipeline
prerequisites:
  - pipeline-02
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Split a corpus into subsets based on metadata fields
  - Compute aggregate statistics for each subset independently
  - Build and interpret a cross-tabulation as a dictionary of dictionaries
keywords:
  - cross-tabulation
  - metadata
  - comparative analysis
  - grouping
  - subsetting
---

# Stage 3: Comparing and Cross-Tabulating

## Analogy

A historian studying newspapers would never simply count all words in the entire archive and stop there. They would ask comparative questions: *Did the "Commerce" section use different language than the "Politics" section? Did article length change over time?* These are questions about **sub-groups** — slices of the corpus defined by metadata like section, date, or author. Comparing sub-groups is where patterns become arguments. This lesson teaches you to split, measure, and compare.

## Key Concepts

### Splitting a Corpus by Metadata

Our newspaper articles each carry a "section" label. To compare sections, we first need to split the corpus into groups:

```python
corpus = [
    {"title": "Article A", "section": "Commerce", "text": "trade and industry grew"},
    {"title": "Article B", "section": "Politics", "text": "the vote was cast today"},
    {"title": "Article C", "section": "Commerce", "text": "merchants along the river"},
]

groups = {}
for article in corpus:
    section = article["section"]
    if section not in groups:
        groups[section] = []
    groups[section].append(article)

for section, articles in groups.items():
    print(f"{section}: {len(articles)} articles")
# Output:
# Commerce: 2 articles
# Politics: 1 articles
```

:::definition
**Cross-tabulation**: A table that shows the relationship between two categorical variables by counting or summarizing values at each intersection. In DH, this often means summarizing a feature (like word count) across a metadata category (like section or decade).
:::

### Computing Per-Group Statistics

Once we have groups, we can compute statistics for each one:

```python
groups = {
    "Commerce": [
        {"text": "trade and industry grew steadily"},
        {"text": "merchants prospered along the busy river docks"}
    ],
    "Politics": [
        {"text": "the senator spoke at length about reform and justice"}
    ]
}

for section, articles in groups.items():
    lengths = [len(a["text"].split()) for a in articles]
    avg = sum(lengths) / len(lengths)
    print(f"{section}: avg {avg:.1f} words")
# Output:
# Commerce: avg 5.5 words
# Politics: avg 9.0 words
```

The list comprehension `[len(a["text"].split()) for a in articles]` creates a list of word counts, one per article. We then compute the average with `sum() / len()`. The `:.1f` format specifier rounds to one decimal place.

### Building a Cross-Tabulation

A cross-tabulation is simply a dictionary of dictionaries. Here we cross-tabulate section against a keyword presence:

```python
corpus = [
    {"section": "Commerce", "text": "workers demanded fair wages"},
    {"section": "Commerce", "text": "new railway connects cities"},
    {"section": "Politics", "text": "workers rally for the vote"},
]

keyword = "workers"
table = {}
for article in corpus:
    section = article["section"]
    has_keyword = keyword in article["text"].split()
    if section not in table:
        table[section] = {"with_keyword": 0, "without_keyword": 0}
    if has_keyword:
        table[section]["with_keyword"] += 1
    else:
        table[section]["without_keyword"] += 1

for section, counts in table.items():
    print(f"{section}: {counts}")
```

This tells us how a keyword distributes across sections — a simple but powerful lens for comparative analysis.

## Practice

:::try-it
Split the following mini-corpus by section and compute the average word count for each:

```python
articles = [
    {"section": "Local", "text": "the fire spread across three blocks"},
    {"section": "Local", "text": "residents fled their homes before dawn"},
    {"section": "Culture", "text": "the new exhibit features works from across europe and asia"},
]

groups = {}
for a in articles:
    s = a["section"]
    if s not in groups:
        groups[s] = []
    groups[s].append(a)

for section, arts in groups.items():
    lengths = [len(a["text"].split()) for a in arts]
    avg = sum(lengths) / len(lengths)
    print(f"{section}: {avg:.1f} words")
```

Which section has longer articles? What might that tell you about editorial conventions?
:::

## Transfer

Comparative analysis is where DH research develops its argumentative edge. Counting words in one section tells you what that section contains; comparing two sections tells you what makes them *different*. If "Commerce" articles average 25 words and "Politics" articles average 40, that difference is a finding — perhaps reflecting editorial norms about how much space each topic deserved.

In your own research, think about what metadata you have: dates, authors, genres, locations. Each one is a potential axis for comparison. The method is always the same: split, measure, compare, interpret.

:::challenge
Given a cleaned newspaper corpus with section metadata, compute the average word count per section and print a formatted comparison identifying which section has the longest articles.
:::

---challenges---
