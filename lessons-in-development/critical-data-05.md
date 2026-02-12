---
id: critical-data-05
title: "Writing a Data Biography"
moduleId: critical-data
prerequisites:
  - critical-data-04
estimatedTimeMinutes: 50
difficulty: intermediate
learningObjectives:
  - Explain the purpose and components of a data biography (inspired by "Datasheets for Datasets")
  - Construct a structured data biography as a Python dictionary from raw metadata
  - Critically assess what a dataset's documentation reveals and conceals about its origins
keywords:
  - data biography
  - datasheets for datasets
  - dataset documentation
  - provenance
  - data ethics
  - metadata
---

# Writing a Data Biography

## Analogy

When a historian picks up a primary source -- a letter, a photograph, a census record -- the first questions are not about the content but about the context. Who wrote this? When? For what purpose? What was happening in the world at that time? Who was the intended audience? What might the author have omitted or distorted? Historians call this "source criticism," and no serious scholar would cite a document without it.

Datasets deserve the same scrutiny. A dataset is not a neutral window onto the world -- it is an artifact produced by specific people, institutions, and processes. A data biography is source criticism for the digital age: a structured account of where a dataset came from, what choices shaped it, and what it cannot tell us.

## Key Concepts

### Why Datasets Need Biographies

In 2018, the computer scientist Timnit Gebru and colleagues proposed "Datasheets for Datasets" -- standardized documentation that should accompany every dataset, much like the datasheets that accompany electronic components. Their argument was simple: you would not use a resistor without checking its specifications, so why would you use a dataset without understanding its properties?

:::definition
**Data biography**: A structured document describing a dataset's origins, composition, collection methods, intended uses, known limitations, and ethical considerations. Inspired by Gebru et al.'s "Datasheets for Datasets" (2018), it serves as provenance documentation for responsible data use.
:::

A data biography answers questions like:

- **Who** created the dataset, and for what purpose?
- **What** population does it claim to represent?
- **When** and **where** was it collected?
- **How** were items selected, and what was excluded?
- **Whose voices** are present, and whose are absent?
- **What are the known limitations** and potential harms?

### Building a Data Biography in Python

A Python dictionary is a natural structure for a data biography. Each key represents a question, and each value provides the answer.

```python
biography = {
    "title": "Victorian Novel Corpus",
    "who_created_it": "Oxford Digital Humanities Lab",
    "time_period": "1837-1901",
    "known_limitations": [
        "Only novels published in London included",
        "Working-class authors underrepresented",
    ],
}

for key, value in biography.items():
    if isinstance(value, list):
        print(f"{key}:")
        for item in value:
            print(f"  - {item}")
    else:
        print(f"{key}: {value}")
```

### From Raw Metadata to Critical Documentation

Often you will receive a dataset with minimal metadata -- perhaps a name, a date range, and a record count. The work of writing a data biography is the work of filling in what the metadata leaves unsaid: whose voices are included, whose are missing, and what ethical concerns arise from the dataset's construction.

```python
# Raw metadata (what the dataset provides)
raw = {"name": "Parish Records Corpus", "records": 12000}

# Data biography (what a critical scholar adds)
bio = {
    "title": raw["name"],
    "size": f"{raw['records']} records",
    "whose_voices_are_missing": "Non-Christian residents, travelers, unnamed infants",
}

print(f"{bio['title']} ({bio['size']})")
print(f"Missing: {bio['whose_voices_are_missing']}")
```

:::definition
**Provenance**: The documented history of a dataset's origin and the chain of custody through which it has passed. Provenance includes who collected the data, how it was processed, and what transformations it has undergone.
:::

### The Critical Questions

A thorough data biography goes beyond technical metadata to ask questions that require domain expertise:

1. **Whose voices are included?** If the dataset contains newspaper text, which newspapers were selected? Who owned them? What editorial perspectives did they represent?

2. **Whose voices are missing?** If the dataset covers a colonial period, does it include texts by colonized peoples, or only by colonial administrators? Are women's writings represented?

3. **What are the known limitations?** Every dataset has them. Acknowledging limitations is not a weakness -- it is a sign of scholarly rigor.

4. **What are the ethical considerations?** Does the dataset contain information about living people? Does it reproduce harmful categorizations? Could it be used in ways that harm the communities it describes?

### Why Dictionaries Are the Right Tool

Python dictionaries map naturally onto the key-value structure of documentation. Lists within dictionaries capture multiple limitations or multiple voices. And because dictionaries are programmatic, they can be validated, compared, and shared -- unlike a paragraph buried in a footnote.

## Practice

:::try-it
Think of a dataset you have used or encountered in your studies. Without looking at any documentation, try to write a data biography for it as a Python dictionary. Which fields are easy to fill in? Which require research? Which questions had you never considered before?
:::

## Transfer

The practice of writing data biographies connects to broader movements in data ethics and responsible research:

- **Indigenous Data Sovereignty**: The CARE Principles for Indigenous Data Governance emphasize that data about Indigenous peoples should be governed by those peoples. A data biography should document whether this principle was respected.
- **FAIR Principles**: Data should be Findable, Accessible, Interoperable, and Reusable. A biography makes data more reusable by explaining its context.
- **Feminist Data Science**: Catherine D'Ignazio and Lauren Klein argue in *Data Feminism* that all data work should "make labor visible." A data biography documents the human labor behind every dataset.

:::challenge
Given raw metadata about a colonial newspaper corpus, construct a complete data biography as a Python dictionary. Fill in both the factual fields (drawn from the metadata) and the critical fields (requiring scholarly judgment about inclusion, exclusion, and ethics). Print a formatted report.
:::

---challenges---

### Challenge: Construct a Data Biography

- id: critical-data-05-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Raw metadata provided with the dataset
metadata = {
    "name": "Colonial Newspaper Corpus",
    "collected_by": "University of London Digital Lab",
    "date_range": "1800-1870",
    "source": "British Library Archives",
    "language": "English",
    "num_documents": 4500,
    "regions": ["India", "West Africa", "Caribbean"],
}

# Build a data biography dictionary with these keys:
#   title, who_created_it, time_period, original_source, language, size,
#   geographic_scope, whose_voices_are_included,
#   whose_voices_are_missing, known_limitations (list of 3),
#   ethical_considerations

# Then print it as a formatted report (see expected output)

# Your code here
```

#### Expected Output

```
=== DATA BIOGRAPHY ===
Title: Colonial Newspaper Corpus
Created by: University of London Digital Lab
Time period: 1800-1870
Source: British Library Archives
Language: English
Size: 4500 documents
Geographic scope: India, West Africa, Caribbean

Voices included: Colonial administrators, British merchants, missionaries
Voices missing: Colonized peoples, indigenous language speakers, women

Known limitations:
  - Only English-language publications included
  - Newspapers reflect colonial editorial perspectives
  - Survival bias: many publications were lost or destroyed

Ethical note: Data reflects and reproduces colonial power structures
```

#### Hints

1. Pull factual fields directly from the metadata dict: `biography["title"] = metadata["name"]`. For size, format it as `f"{metadata['num_documents']} documents"`. For geographic scope, use `", ".join(metadata["regions"])`.
2. The critical fields require your own scholarly judgment. For `whose_voices_are_included`, think about who wrote and published English-language newspapers in colonial territories. For `whose_voices_are_missing`, think about who was excluded from colonial print culture.
3. `known_limitations` should be a list of three strings. Print them with a loop: `for item in biography["known_limitations"]: print(f"  - {item}")`.

#### Solution

```python
metadata = {
    "name": "Colonial Newspaper Corpus",
    "collected_by": "University of London Digital Lab",
    "date_range": "1800-1870",
    "source": "British Library Archives",
    "language": "English",
    "num_documents": 4500,
    "regions": ["India", "West Africa", "Caribbean"],
}

biography = {
    "title": metadata["name"],
    "who_created_it": metadata["collected_by"],
    "time_period": metadata["date_range"],
    "original_source": metadata["source"],
    "language": metadata["language"],
    "size": f"{metadata['num_documents']} documents",
    "geographic_scope": ", ".join(metadata["regions"]),
    "whose_voices_are_included": "Colonial administrators, British merchants, missionaries",
    "whose_voices_are_missing": "Colonized peoples, indigenous language speakers, women",
    "known_limitations": [
        "Only English-language publications included",
        "Newspapers reflect colonial editorial perspectives",
        "Survival bias: many publications were lost or destroyed",
    ],
    "ethical_considerations": "Data reflects and reproduces colonial power structures",
}

print("=== DATA BIOGRAPHY ===")
print(f"Title: {biography['title']}")
print(f"Created by: {biography['who_created_it']}")
print(f"Time period: {biography['time_period']}")
print(f"Source: {biography['original_source']}")
print(f"Language: {biography['language']}")
print(f"Size: {biography['size']}")
print(f"Geographic scope: {biography['geographic_scope']}")
print(f"\nVoices included: {biography['whose_voices_are_included']}")
print(f"Voices missing: {biography['whose_voices_are_missing']}")
print(f"\nKnown limitations:")
for limitation in biography["known_limitations"]:
    print(f"  - {limitation}")
print(f"\nEthical note: {biography['ethical_considerations']}")
```
