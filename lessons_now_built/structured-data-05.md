---
id: structured-data-05
title: Data Cleaning and Preparation
moduleId: structured-data
prerequisites:
  - structured-data-03
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Identify common data quality problems in humanities datasets
  - Standardise inconsistent text entries using Python string methods
  - Handle missing values and detect duplicates in tabular data
keywords:
  - data cleaning
  - data preparation
  - missing values
  - deduplication
  - standardisation
---

# Data Cleaning and Preparation

## Analogy

Imagine you have inherited a card catalogue from three different libraries. Each library used slightly different conventions: one writes "Shelley, Mary" while another writes "Mary Shelley" and a third writes "SHELLEY, M." Before you can merge them into a single useful catalogue, you must **standardise** the entries, **fill in** the gaps, and **remove** the duplicates. Data cleaning is exactly this: preparing messy, real-world data so it can be reliably analysed.

## Key Concepts

### Why Cleaning Matters

Humanities datasets are rarely born clean. Historical records have inconsistent spelling, digitised catalogues contain OCR errors, and survey data has missing fields. If you skip cleaning, your analysis will silently produce wrong results — a name spelled two different ways will be counted as two different people.

::: definition
**Data cleaning**: The process of detecting and correcting (or removing) corrupt, inaccurate, or inconsistent records from a dataset to improve its quality for analysis.
:::

### Standardising Text

The most common cleaning task is making text consistent. Python string methods handle the basics:

```python
# Inconsistent author names
names = ["Mary Shelley", "SHELLEY, MARY", "mary shelley", "Shelley, Mary"]

def standardise_name(name):
    # Remove extra whitespace and convert to title case
    name = " ".join(name.split())
    # Handle "Last, First" format
    if "," in name:
        parts = name.split(",")
        name = parts[1].strip() + " " + parts[0].strip()
    return name.title()

cleaned = [standardise_name(n) for n in names]
print(cleaned)
```

### Handling Missing Values

Missing data is inevitable. The key is deciding what to do with it: skip the row, fill in a default, or flag it for review.

```python
records = [
    {"title": "Frankenstein", "year": 1818, "genre": "Gothic"},
    {"title": "Mathilda", "year": None, "genre": ""},
    {"title": "The Last Man", "year": 1826, "genre": "Science Fiction"},
]

# Count missing values per field
for field in ["title", "year", "genre"]:
    missing = sum(1 for r in records if not r[field])
    print(f"{field}: {missing} missing")
```

### Detecting Duplicates

Duplicates can inflate counts and skew results. After standardising text, you can group entries to find them:

```python
titles = ["Frankenstein", "frankenstein", "FRANKENSTEIN", "The Last Man"]
normalised = [t.lower().strip() for t in titles]
unique = set(normalised)
print(f"Original: {len(titles)}, Unique: {len(unique)}")
```

## Practice

::: try-it
Try adding more name variations to the list above — initials like "M. Shelley", accented characters, or extra spaces. How robust is the standardisation function? What edge cases break it?
:::

## Transfer

In your own research, what inconsistencies do you expect in your data? Dates in different formats (1818 vs "January 1818" vs "01/01/1818")? Place names that have changed over time? Identifying these patterns early saves hours of debugging later.

::: challenge
Clean a messy dataset of historical publication records by standardising names, handling missing years, and removing duplicates.
:::

---challenges---

### Challenge: Standardise and deduplicate

- id: structured-data-05-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Clean this list of publication records
# 1. Standardise author names to "Firstname Lastname" title case
# 2. Remove duplicate entries (same author + title after standardisation)
# 3. Print each unique record as "Author - Title"

records = [
    {"author": "SHELLEY, MARY", "title": "Frankenstein"},
    {"author": "Mary Shelley", "title": "Frankenstein"},
    {"author": "Austen, Jane", "title": "Pride and Prejudice"},
    {"author": "jane austen", "title": "Pride and Prejudice"},
    {"author": "Bronte, Charlotte", "title": "Jane Eyre"},
]

def standardise_name(name):
    name = " ".join(name.split())
    if "," in name:
        parts = name.split(",")
        name = parts[1].strip() + " " + parts[0].strip()
    return name.title()

# Your code here
# Deduplicate based on standardised author + title
# Print each unique record sorted alphabetically by author
```

#### Expected Output

```
Charlotte Bronte - Jane Eyre
Jane Austen - Pride and Prejudice
Mary Shelley - Frankenstein
```

#### Hints

1. Create a standardised version of each record using the `standardise_name` function and apply `.title()` to the book title too.
2. Use a set to track which `(author, title)` pairs you have already seen — add each pair as a tuple to the set.
3. Collect unique records in a list, sort by author name, then print each as `f"{author} - {title}"`.

#### Solution

```python
records = [
    {"author": "SHELLEY, MARY", "title": "Frankenstein"},
    {"author": "Mary Shelley", "title": "Frankenstein"},
    {"author": "Austen, Jane", "title": "Pride and Prejudice"},
    {"author": "jane austen", "title": "Pride and Prejudice"},
    {"author": "Bronte, Charlotte", "title": "Jane Eyre"},
]

def standardise_name(name):
    name = " ".join(name.split())
    if "," in name:
        parts = name.split(",")
        name = parts[1].strip() + " " + parts[0].strip()
    return name.title()

seen = set()
unique = []
for r in records:
    author = standardise_name(r["author"])
    title = r["title"].title()
    key = (author, title)
    if key not in seen:
        seen.add(key)
        unique.append((author, title))

unique.sort()
for author, title in unique:
    print(f"{author} - {title}")
```

### Challenge: Report missing data

- id: structured-data-05-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Analyse this dataset for data quality issues
# Count and report missing values for each field
# A value is "missing" if it is None, an empty string, or 0 for year

catalogue = [
    {"title": "Frankenstein", "author": "Mary Shelley", "year": 1818, "genre": "Gothic"},
    {"title": "Mathilda", "author": "Mary Shelley", "year": 0, "genre": ""},
    {"title": "", "author": "Percy Shelley", "year": 1820, "genre": "Poetry"},
    {"title": "The Last Man", "author": "Mary Shelley", "year": 1826, "genre": "Science Fiction"},
    {"title": "Valperga", "author": "", "year": 1823, "genre": "Historical"},
    {"title": "Lodore", "author": "Mary Shelley", "year": None, "genre": ""},
]

fields = ["title", "author", "year", "genre"]

# For each field, count how many records have missing values
# Print: "<field>: <count> missing"
# Then print: "Total records: <n>"
# Then print: "Complete records: <n>" (records with NO missing fields)

# Your code here
```

#### Expected Output

```
title: 1 missing
author: 1 missing
year: 2 missing
genre: 2 missing
Total records: 6
Complete records: 2
```

#### Hints

1. A value is "missing" if `not r[field]` evaluates to `True` — this catches `None`, empty strings, and `0`.
2. Loop through `fields` and for each one, count how many records have a missing value using `sum(1 for r in catalogue if not r[field])`.
3. A record is "complete" if all its fields have non-missing values: `all(r[field] for field in fields)`.

#### Solution

```python
catalogue = [
    {"title": "Frankenstein", "author": "Mary Shelley", "year": 1818, "genre": "Gothic"},
    {"title": "Mathilda", "author": "Mary Shelley", "year": 0, "genre": ""},
    {"title": "", "author": "Percy Shelley", "year": 1820, "genre": "Poetry"},
    {"title": "The Last Man", "author": "Mary Shelley", "year": 1826, "genre": "Science Fiction"},
    {"title": "Valperga", "author": "", "year": 1823, "genre": "Historical"},
    {"title": "Lodore", "author": "Mary Shelley", "year": None, "genre": ""},
]

fields = ["title", "author", "year", "genre"]

for field in fields:
    missing = sum(1 for r in catalogue if not r[field])
    print(f"{field}: {missing} missing")

total = len(catalogue)
complete = sum(1 for r in catalogue if all(r[field] for field in fields))
print(f"Total records: {total}")
print(f"Complete records: {complete}")
```
