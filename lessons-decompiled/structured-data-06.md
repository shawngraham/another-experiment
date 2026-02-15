---
id: structured-data-06
title: Working with Metadata
moduleId: structured-data
prerequisites:
  - structured-data-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Distinguish between descriptive
  - administrative
  - and structural metadata
  - Explain the importance of interoperability and standards like Dublin Core
  - Extract and transform metadata from complex nested dictionaries
  - Perform faceted analysis (summarizing a collection by metadata fields)
keywords:
  - metadata
  - cataloguing
  - dublin core
  - faceted search
  - collections
  - interoperability
---

# Working with Metadata

## The Analogy: The Library Spine

If you walk into a library, the book itself is the **data**—the words, characters, and plot. But the label on the spine, the barcode, and the entry in the digital catalog are the **metadata**: data *about* the data. 

In Digital Humanities, metadata is what allows us to organize a "pile of files" into a "searchable archive." Without it, we couldn't ask questions like "How did the sentiment of novels change between 1850 and 1900?" because the computer wouldn't know which file belongs to which year.

## Key Concepts

### 1. Types of Metadata
Humanities researchers typically deal with three types:
*   **Descriptive**: Information about the content (Title, Author, Abstract, Keywords).
*   **Administrative**: Technical details (File format, Rights/Copyright, Date of Digitization).
*   **Structural**: How the resource is put together (e.g., Page 1 comes before Page 2).

### 2. Standards and Interoperability
If every archive used their own names for fields (one uses "Author," another "Writer," another "Creator"), we couldn't combine them. We use **Standards** to ensure **Interoperability**.

:::definition
**Dublin Core (DC)**: A set of 15 "core" elements used globally by libraries and museums. Common fields include *Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, and Rights*.
:::

### 3. Metadata as Dictionaries
In Python, a single metadata record is almost always represented as a **Dictionary**. Often, these are "nested," meaning a value might be a list or another dictionary.

```python
# A typical DH metadata record
record = {
    "dc:title": "The Last Man",
    "dc:creator": ["Mary Shelley"],
    "dc:date": "1826-01-23",
    "dc:subject": ["Apocalyptic fiction", "Pandemic", "Gothic"],
    "admin": {
        "scanner_model": "Epson v600",
        "rights": "Public Domain"
    }
}

# Accessing a nested field
print(f"Format: {record['admin']['rights']}") 
# Accessing an item in a list
print(f"Primary Subject: {record['dc:subject'][0]}")
```

### 4. Faceted Analysis
Once we have a collection of records, we can "facet" them. This means grouping them by a specific field (like "Date" or "Subject") to see the bird's-eye view of a collection.

## The Reality: Metadata Cleaning
Real-world metadata is often "dirty." You will frequently need to:
1.  **Normalize Dates**: Changing "Jan 1826" and "1826-01-23" both to "1826".
2.  **Split Strings**: Changing "Shelley, Mary; Byron, Lord" into a clean list of names.
3.  **Handle Missing Data**: Deciding what to do if a record has no "Creator."

---

## Practice

:::try-it
**The Archivist's Choice**
Look at the record above. If you were building a website for this collection, which fields would you use for a "Search Bar" and which would you use for a "Filter" (facet)? Why?
:::

## Transfer: DH Use Cases

*   **Museum Studies**: Analyzing the "Provenance" (history of ownership) of artifacts using the source and description fields.
*   **Digital Archives**: Using tools like **Omeka** or **Tropy**, which are built entirely around the Dublin Core standard.
*   **Zotero**: When you save a paper to Zotero, you are actually just capturing its metadata for later citation.

:::challenge
Produce a summary report from a mock archive.
:::

---challenges---
