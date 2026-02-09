---
id: structured-data-06
title: Working with Metadata
moduleId: structured-data
prerequisites:
  - structured-data-02
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Explain what metadata is and why it matters for humanities research
  - Extract and transform metadata from structured records
  - Summarise a collection by its metadata facets
keywords:
  - metadata
  - cataloguing
  - dublin core
  - faceted search
  - collections
---

# Working with Metadata

## Analogy

Walk into any library and pull a book off the shelf. The book itself is the **data** — the words, the story, the argument. But the label on the spine, the catalogue card, the ISBN — that is all **metadata**: data *about* the data. Metadata tells you what something is, who created it, when, and where, without you having to read the entire object. In digital humanities, managing metadata well is the difference between a searchable archive and a pile of files.

## Key Concepts

### What Is Metadata?

Metadata is structured information that describes, explains, or locates a resource. In the humanities, common metadata standards include Dublin Core (used by libraries and digital repositories) and TEI headers (used for encoded texts).

::: definition
**Dublin Core**: A set of fifteen standard metadata elements (Title, Creator, Subject, Description, Date, etc.) widely used in digital libraries and archives to describe resources consistently.
:::

### Metadata as Dictionaries

In Python, a metadata record maps naturally to a dictionary — each field is a key, each value describes one facet of the resource:

```python
record = {
    "title": "Frankenstein; or, The Modern Prometheus",
    "creator": "Mary Shelley",
    "date": "1818",
    "subject": ["Gothic fiction", "Science fiction"],
    "language": "English",
    "format": "text",
}
print(f"{record['title']} by {record['creator']} ({record['date']})")
```

### Faceted Summaries

When you have a collection of records, metadata lets you answer questions like "How many items per decade?" or "Which subjects appear most often?" without examining every item individually:

```python
from collections import Counter

dates = ["1818", "1820", "1826", "1831", "1835", "1844"]
decades = [d[:3] + "0s" for d in dates]
print(Counter(decades))
```

### Extracting and Reshaping

Real-world metadata often needs reshaping. Dates arrive as strings, subjects as semicolon-separated lists, creators in "Last, First" format. Cleaning metadata is a prerequisite to any collection-level analysis.

## Practice

::: try-it
Take the `record` dictionary above and add more Dublin Core fields: `publisher`, `rights`, `type`. How would you represent a resource with multiple creators?
:::

## Transfer

If you work with a digital archive or repository, its metadata schema determines what questions you can ask. A collection with good date metadata supports temporal analysis; one with rich subject tags supports thematic browsing. Understanding metadata is understanding the *shape* of your research possibilities.

::: challenge
Given a collection of metadata records, produce a summary report showing the number of items per subject and per decade.
:::

---challenges---

### Challenge: Summarise a collection by subject

- id: structured-data-06-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# A small digital collection with metadata
from collections import Counter

collection = [
    {"title": "Frankenstein", "creator": "Mary Shelley", "date": "1818", "subjects": ["Gothic", "Science Fiction"]},
    {"title": "The Vampyre", "creator": "John Polidori", "date": "1819", "subjects": ["Gothic", "Horror"]},
    {"title": "The Last Man", "creator": "Mary Shelley", "date": "1826", "subjects": ["Science Fiction"]},
    {"title": "Northanger Abbey", "creator": "Jane Austen", "date": "1817", "subjects": ["Gothic", "Satire"]},
    {"title": "The Mysteries of Udolpho", "creator": "Ann Radcliffe", "date": "1794", "subjects": ["Gothic"]},
]

# 1. Count how many items appear under each subject
# 2. Print each subject and its count, sorted alphabetically by subject
# Format: "<Subject>: <count>"

# Your code here
```

#### Expected Output

```
Gothic: 4
Horror: 1
Satire: 1
Science Fiction: 2
```

#### Hints

1. Loop through each record and then through each item in its `subjects` list, collecting all subjects into a flat list.
2. Use `Counter` on the flat list to get counts per subject.
3. Sort the counter items with `sorted(counter.items())` and print each pair.

#### Solution

```python
from collections import Counter

collection = [
    {"title": "Frankenstein", "creator": "Mary Shelley", "date": "1818", "subjects": ["Gothic", "Science Fiction"]},
    {"title": "The Vampyre", "creator": "John Polidori", "date": "1819", "subjects": ["Gothic", "Horror"]},
    {"title": "The Last Man", "creator": "Mary Shelley", "date": "1826", "subjects": ["Science Fiction"]},
    {"title": "Northanger Abbey", "creator": "Jane Austen", "date": "1817", "subjects": ["Gothic", "Satire"]},
    {"title": "The Mysteries of Udolpho", "creator": "Ann Radcliffe", "date": "1794", "subjects": ["Gothic"]},
]

all_subjects = []
for record in collection:
    all_subjects.extend(record["subjects"])

counts = Counter(all_subjects)
for subject, count in sorted(counts.items()):
    print(f"{subject}: {count}")
```

### Challenge: Items per decade

- id: structured-data-06-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Using the same collection, group items by decade
from collections import Counter

collection = [
    {"title": "Frankenstein", "date": "1818"},
    {"title": "The Vampyre", "date": "1819"},
    {"title": "The Last Man", "date": "1826"},
    {"title": "Northanger Abbey", "date": "1817"},
    {"title": "The Mysteries of Udolpho", "date": "1794"},
    {"title": "The Monk", "date": "1796"},
    {"title": "Caleb Williams", "date": "1794"},
]

# 1. Convert each date to a decade label (e.g., "1818" -> "1810s")
# 2. Count items per decade
# 3. Print each decade and count, sorted chronologically
# Format: "<decade>: <count>"

# Your code here
```

#### Expected Output

```
1790s: 3
1810s: 3
1820s: 1
```

#### Hints

1. To get the decade from a year string, take the first three characters and append "0s": `date[:3] + "0s"`.
2. Build a list of decade labels and pass it to `Counter`.
3. Sort the counter items — since decade strings are in chronological order, alphabetical sorting works.

#### Solution

```python
from collections import Counter

collection = [
    {"title": "Frankenstein", "date": "1818"},
    {"title": "The Vampyre", "date": "1819"},
    {"title": "The Last Man", "date": "1826"},
    {"title": "Northanger Abbey", "date": "1817"},
    {"title": "The Mysteries of Udolpho", "date": "1794"},
    {"title": "The Monk", "date": "1796"},
    {"title": "Caleb Williams", "date": "1794"},
]

decades = [r["date"][:3] + "0s" for r in collection]
counts = Counter(decades)
for decade, count in sorted(counts.items()):
    print(f"{decade}: {count}")
```
