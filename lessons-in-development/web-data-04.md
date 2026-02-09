---
id: web-data-04
title: Working with Digital Archives
moduleId: web-data-collection
prerequisites:
  - web-data-03
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Navigate and parse structured data from digital archive APIs
  - Extract and organise metadata from nested JSON archive records
  - Build a simple catalogue from API responses
keywords:
  - archives
  - digital collections
  - cultural heritage
  - api
  - cataloguing
---

# Working with Digital Archives

## Analogy

Imagine walking into a vast physical archive — rows of filing cabinets, each drawer labelled by year or subject. You cannot read every document, so you start with the **finding aid**: a structured guide that tells you what is in each drawer, who created it, and when. Digital archives work the same way, but instead of a printed finding aid, they offer **APIs** that return structured data about their holdings. Learning to navigate these APIs is like learning to read the finding aid — it is the key to the collection.

## Key Concepts

### What Are Digital Archives?

Digital archives are online collections of cultural heritage materials — manuscripts, photographs, maps, newspapers, artworks — along with structured metadata describing each item. Major examples include the Internet Archive, Europeana, the Digital Public Library of America (DPLA), and university special collections.

::: definition
**Finding aid**: A structured description of an archival collection, listing its contents, organisation, and context. In digital archives, this role is fulfilled by metadata records accessible through APIs or search interfaces.
:::

### Archive Records as Nested Data

Archive API responses are typically JSON with deeply nested structures. A single record might contain the item title, multiple creators, a hierarchy of subjects, physical dimensions, and links to digital scans:

```python
# A simplified archive record (typical of DPLA or Europeana responses)
record = {
    "id": "ark:/12345/abc",
    "title": "Letter from Mary Shelley to Leigh Hunt",
    "date": {"displayDate": "14 June 1823", "year": 1823},
    "creator": [
        {"name": "Shelley, Mary Wollstonecraft", "role": "author"}
    ],
    "subject": [
        {"name": "English literature"},
        {"name": "Correspondence"}
    ],
    "format": "manuscript",
    "repository": "Bodleian Library, Oxford",
}

# Extracting nested values safely
title = record.get("title", "Untitled")
year = record.get("date", {}).get("year", "Unknown")
creator = record["creator"][0]["name"] if record.get("creator") else "Unknown"
print(f"{title} ({year}) by {creator}")
```

### Navigating Nested JSON Safely

Archive data is often inconsistent — some records have a date, others do not; some have multiple creators, others have none. The `.get()` method with default values prevents your code from crashing:

```python
# Safely extract all subject names from a record
subjects = [s["name"] for s in record.get("subject", [])]
print(f"Subjects: {', '.join(subjects)}")
```

### Building a Catalogue

When you retrieve multiple records from an archive API, you often want to reshape the data into a simpler, flat structure for analysis — a catalogue:

```python
def extract_record(raw):
    return {
        "title": raw.get("title", "Untitled"),
        "year": raw.get("date", {}).get("year", "Unknown"),
        "creator": raw["creator"][0]["name"] if raw.get("creator") else "Unknown",
        "format": raw.get("format", "Unknown"),
    }
```

## Practice

::: try-it
Modify the `extract_record` function to also extract the repository name and all subject terms. What happens when a record has no `repository` field?
:::

## Transfer

Whether you are studying 19th-century correspondence, medieval manuscripts, or early photographs, digital archives expose their holdings through similar patterns. The skill of navigating nested JSON and extracting structured metadata from messy records transfers directly to any collection you work with — from the British Library to a small local historical society that has just digitised its holdings.

::: challenge
Parse a set of archive records, extract key metadata fields, and produce a sorted catalogue.
:::

---challenges---

### Challenge: Build a catalogue from archive records

- id: web-data-04-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Parse these archive records and build a sorted catalogue
# Extract: title, year, creator, and format from each record

records = [
    {
        "title": "Letter from Mary Shelley to Leigh Hunt",
        "date": {"displayDate": "14 June 1823", "year": 1823},
        "creator": [{"name": "Mary Shelley", "role": "author"}],
        "format": "manuscript",
    },
    {
        "title": "Portrait of Percy Bysshe Shelley",
        "date": {"year": 1819},
        "creator": [{"name": "Amelia Curran", "role": "artist"}],
        "format": "painting",
    },
    {
        "title": "Frankenstein, first edition",
        "date": {"displayDate": "1 January 1818", "year": 1818},
        "creator": [{"name": "Mary Shelley", "role": "author"}],
        "format": "printed book",
    },
    {
        "title": "Map of Geneva and surroundings",
        "date": {"year": 1815},
        "creator": [],
        "format": "map",
    },
]

# 1. Extract title, year, creator name (use "Unknown" if no creator), and format
# 2. Sort by year
# 3. Print each as: "<year> | <title> | <creator> | <format>"

# Your code here
```

#### Expected Output

```
1815 | Map of Geneva and surroundings | Unknown | map
1818 | Frankenstein, first edition | Mary Shelley | printed book
1819 | Portrait of Percy Bysshe Shelley | Amelia Curran | painting
1823 | Letter from Mary Shelley to Leigh Hunt | Mary Shelley | manuscript
```

#### Hints

1. For each record, use `.get("date", {}).get("year", 0)` to safely extract the year, and check if the `creator` list is non-empty before accessing `[0]["name"]`.
2. Build a list of simplified dictionaries, then sort with `sorted(catalogue, key=lambda r: r["year"])`.
3. Use an f-string with `|` separators for the output format.

#### Solution

```python
records = [
    {
        "title": "Letter from Mary Shelley to Leigh Hunt",
        "date": {"displayDate": "14 June 1823", "year": 1823},
        "creator": [{"name": "Mary Shelley", "role": "author"}],
        "format": "manuscript",
    },
    {
        "title": "Portrait of Percy Bysshe Shelley",
        "date": {"year": 1819},
        "creator": [{"name": "Amelia Curran", "role": "artist"}],
        "format": "painting",
    },
    {
        "title": "Frankenstein, first edition",
        "date": {"displayDate": "1 January 1818", "year": 1818},
        "creator": [{"name": "Mary Shelley", "role": "author"}],
        "format": "printed book",
    },
    {
        "title": "Map of Geneva and surroundings",
        "date": {"year": 1815},
        "creator": [],
        "format": "map",
    },
]

catalogue = []
for r in records:
    entry = {
        "title": r.get("title", "Untitled"),
        "year": r.get("date", {}).get("year", 0),
        "creator": r["creator"][0]["name"] if r.get("creator") else "Unknown",
        "format": r.get("format", "Unknown"),
    }
    catalogue.append(entry)

for entry in sorted(catalogue, key=lambda e: e["year"]):
    print(f"{entry['year']} | {entry['title']} | {entry['creator']} | {entry['format']}")
```

### Challenge: Count items by format and creator

- id: web-data-04-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Analyse this collection: count items by format and by creator
from collections import Counter

records = [
    {"title": "Letter to Leigh Hunt", "creator": "Mary Shelley", "format": "manuscript"},
    {"title": "Letter to Maria Gisborne", "creator": "Mary Shelley", "format": "manuscript"},
    {"title": "Frankenstein, first edition", "creator": "Mary Shelley", "format": "printed book"},
    {"title": "Portrait of Shelley", "creator": "Amelia Curran", "format": "painting"},
    {"title": "Sketch of Lake Geneva", "creator": "Amelia Curran", "format": "drawing"},
    {"title": "Map of Geneva", "creator": "Unknown", "format": "map"},
    {"title": "The Last Man", "creator": "Mary Shelley", "format": "printed book"},
]

# 1. Count items by format, print sorted alphabetically:
#    "By format:"
#    "  <format>: <count>"
# 2. Count items by creator, print sorted alphabetically:
#    "By creator:"
#    "  <creator>: <count>"

# Your code here
```

#### Expected Output

```
By format:
  drawing: 1
  manuscript: 2
  map: 1
  painting: 1
  printed book: 2
By creator:
  Amelia Curran: 2
  Mary Shelley: 4
  Unknown: 1
```

#### Hints

1. Use `Counter(r["format"] for r in records)` to count by format, and similarly for creator.
2. Print the heading first, then loop through `sorted(counter.items())` for each category.
3. Use two spaces of indentation before each entry to match the expected output.

#### Solution

```python
from collections import Counter

records = [
    {"title": "Letter to Leigh Hunt", "creator": "Mary Shelley", "format": "manuscript"},
    {"title": "Letter to Maria Gisborne", "creator": "Mary Shelley", "format": "manuscript"},
    {"title": "Frankenstein, first edition", "creator": "Mary Shelley", "format": "printed book"},
    {"title": "Portrait of Shelley", "creator": "Amelia Curran", "format": "painting"},
    {"title": "Sketch of Lake Geneva", "creator": "Amelia Curran", "format": "drawing"},
    {"title": "Map of Geneva", "creator": "Unknown", "format": "map"},
    {"title": "The Last Man", "creator": "Mary Shelley", "format": "printed book"},
]

format_counts = Counter(r["format"] for r in records)
creator_counts = Counter(r["creator"] for r in records)

print("By format:")
for fmt, count in sorted(format_counts.items()):
    print(f"  {fmt}: {count}")

print("By creator:")
for creator, count in sorted(creator_counts.items()):
    print(f"  {creator}: {count}")
```
