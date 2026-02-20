---
id: web-data-04
title: Working with Digital Archives
moduleId: web-data-collection
prerequisites:
  - web-data-03
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Navigate and parse structured data from cultural heritage APIs (JSON)
  - Extract metadata from deeply nested records using safe navigation patterns
  - Handle "dirty data" (missing fields or empty lists) in archival records
  - Flatten complex archive responses into a research-ready catalogue
keywords:
  - archives
  - digital collections
  - cultural heritage
  - api
  - json
  - nested data
---

# Working with Digital Archives

## Analogy: The Digital Finding Aid

In a physical archive, you use a **finding aid**—a guide that tells you which box contains which letter. In a digital archive, the **API (Application Programming Interface)** serves a similar purpose. 

Instead of flipping through a paper folder, you send a digital request and receive a **JSON record**. This record is the digital equivalent of a catalogue card, containing everything the archive knows about an item: its author, the type of paper it's on, its dimensions, and a link to the scanned image.

## Key Concepts

### 1. The Complexity of Archival JSON
Archival data is rarely a simple list. Because history is complex (a letter can have multiple authors, various dates, and several subject tags), the data is **nested**. 

One record is usually a dictionary containing lists, which contain more dictionaries:

```python
# A typical nested archive record
record = {
    "id": "item-992",
    "title": "Journal entry by Mary Shelley",
    "metadata": {
        "dates": [{"year": 1814, "type": "composition"}],
        "creators": [{"name": "Shelley, Mary", "role": "author"}]
    },
    "subjects": ["Travel", "France", "Gothic"]
}
```

### 2. Defending Against "KeyErrors"
In a perfect world, every record has a date and a creator. In a digital archive, many records are incomplete. If you try to access `record["date"]` and it doesn't exist, your Python script will crash.

We use **Defensive Extraction**:
1.  **The `.get()` method**: Returns `None` (or a default) instead of crashing.
2.  **Conditional checks**: "If this list exists, give me the first item."

```python
# Safe extraction
title = record.get("title", "Unknown Title")

# Nested safe extraction
# We use .get("metadata", {}) to ensure we have a dict to call .get() on again
year = record.get("metadata", {}).get("dates", [{}])[0].get("year", "n.d.")
```

### 3. Building a "Flat" Catalogue
For analysis (like counting items per year), we want to turn those nested "clouds" of data into a clean, flat table. This process is called **Normalization**.

---

## Practice

:::try-it
**Exploring Hierarchy**
Look at the `record` example above. How would you access the string "France"? 
*Answer: `record["subjects"][1]`.*
Now imagine a collection of 10,000 records. If only 5,000 of them have a "subjects" list, how would your code need to change to avoid breaking?
:::

## Transfer: DH in the Real World

*   **DPLA (Digital Public Library of America)**: Aggregates millions of records from US libraries into a single API.
*   **The Smithsonian**: Provides an API to search millions of museum objects, from fossils to space suits.
*   **Trove (National Library of Australia)**: A massive API for historical newspapers and gazettes.

Understanding how to "dig" through JSON layers is a superpower for DH researchers. It allows you to build your own datasets instead of relying on what a website's "Search" button chooses to show you.

:::challenge
Build a clean catalogue from a messy API response.
:::

---challenges---

### Challenge: Archive Record Flattener

- id: web-data-04-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Mock API response: A list of nested archive records
raw_api_data = [
    {
        "title": "Letter to Lord Byron",
        "info": {"date": 1816, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Frankenstein MS",
        "info": {"date": 1818, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Geneva Map",
        "info": {"date": 1810}, # Missing format!
        "people": [] # Missing person!
    }
]

# Task:
# 1. Loop through raw_api_data
# 2. Extract: Title, Date, Format, and the first Person's Name
# 3. If format is missing, use "unknown"
# 4. If person is missing, use "Anonymous"
# 5. Print as: "<Date> | <Title> | <Name> (<Format>)"

for item in raw_api_data:
    # Your code here
    pass
```

#### Expected Output

```
1816 | Letter to Lord Byron | Mary Shelley (manuscript)
1818 | Frankenstein MS | Mary Shelley (manuscript)
1810 | Geneva Map | Anonymous (unknown)
```

#### Hints

1. Use `item.get("info", {}).get("format", "unknown")` for the format.
2. For the person, check if the list is empty: `if item["people"]:`
3. Access the first person with `item["people"][0]["name"]` if the list is not empty.

#### Solution

```python
raw_api_data = [
    {
        "title": "Letter to Lord Byron",
        "info": {"date": 1816, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Frankenstein MS",
        "info": {"date": 1818, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Geneva Map",
        "info": {"date": 1810},
        "people": []
    }
]

for item in raw_api_data:
    title = item.get("title", "Unknown")
    date = item.get("info", {}).get("date", "Unknown")
    fmt = item.get("info", {}).get("format", "unknown")
    
    if item.get("people"):
        name = item["people"][0]["name"]
    else:
        name = "Anonymous"
        
    print(f"{date} | {title} | {name} ({fmt})")
```

### Challenge: Sorting the Archive

- id: web-data-04-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
# A flattened list of archival items
items = [
    {"year": 1823, "title": "Valperga"},
    {"year": 1818, "title": "Frankenstein"},
    {"year": 1826, "title": "The Last Man"},
    {"year": 1817, "title": "History of a Six Weeks' Tour"}
]

# Task: Sort the list so the oldest items appear first.
# Print the title of each item in chronological order.

# Your code here
```

#### Expected Output

```
History of a Six Weeks' Tour
Frankenstein
Valperga
The Last Man
```

#### Hints

1. Use the `sorted()` function.
2. Pass a key to the sort: `sorted(items, key=lambda x: x["year"])`.

#### Solution

```python
items = [
    {"year": 1823, "title": "Valperga"},
    {"year": 1818, "title": "Frankenstein"},
    {"year": 1826, "title": "The Last Man"},
    {"year": 1817, "title": "History of a Six Weeks' Tour"}
]

sorted_items = sorted(items, key=lambda x: x["year"])

for item in sorted_items:
    print(item["title"])
```

