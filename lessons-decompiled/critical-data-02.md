---
id: critical-data-02
title: The Gaps in the Archive: Measuring Representation
moduleId: critical-data
prerequisites:
  - critical-data-01
estimatedTimeMinutes: 40
difficulty: beginner
learningObjectives:
  - Identify missing or underrepresented groups in a structured dataset
  - Calculate proportional representation using Python dictionaries and basic arithmetic
  - Articulate why gaps in archival data are not random but reflect historical power structures
keywords:
  - representation
  - missing data
  - archival silence
  - proportional analysis
  - survivorship bias
---

# The Gaps in the Archive: Measuring Representation

## Analogy

Think of a group photograph taken at a university in 1910. The photograph shows who was present -- but it cannot show who was excluded from enrolling, who could not afford to attend, or who stood just outside the frame. A historian who studies only the photograph might conclude that the university was entirely white and male. The photograph is not lying, but it is profoundly incomplete. The absences are as meaningful as the presences.

Digital archives work the same way. When we count what is in the archive, we must also ask: who is missing, and why?

## Key Concepts

### Archival Silence Is Not Accidental

Every archive has gaps. Some materials were never created (because certain people lacked access to literacy or publishing). Some were created but not preserved (because institutions did not value them). Some were preserved but not digitized (because funding priorities favored other collections). These are not random omissions -- they are patterns shaped by power.

:::definition
**Archival silence**: The systematic absence of certain voices, perspectives, or groups from a historical record. Silences are produced by the same power structures that the archive documents.
:::

### Measuring What Is Present

The first step in detecting bias is simply counting. Given a dataset, we can calculate the proportion of entries belonging to each group.

```python
# A small archive of literary manuscripts
archive = {"entry_1": "male", "entry_2": "male",
           "entry_3": "female", "entry_4": "male",
           "entry_5": "male", "entry_6": "female"}

total = len(archive)
gender_counts = {}
for gender in archive.values():
    gender_counts[gender] = gender_counts.get(gender, 0) + 1

for gender, count in sorted(gender_counts.items()):
    pct = round(count / total * 100, 1)
    print(f"{gender}: {count}/{total} ({pct}%)")
```

This tells us that 66.7% of the archive is male-authored and 33.3% is female-authored. But is that ratio "correct"? That depends on what population the archive claims to represent.

### Identifying the Gap

:::definition
**Representation gap**: The difference between a group's proportion in a dataset and its proportion in the population the dataset claims to describe. A dataset where 80% of entries are from one region, when that region held only 30% of the population, has a 50-point representation gap.
:::

To find gaps, we compare what we have against what we would expect. If women wrote roughly 30% of published novels in the 1920s, an archive showing 20% female authorship has an underrepresentation gap. If a particular region dominated the archive far beyond its population share, that region is overrepresented.

```python
# Counting by multiple attributes
entries = [
    {"region": "Northeast"}, {"region": "Northeast"},
    {"region": "South"}, {"region": "Northeast"},
    {"region": "West"}, {"region": "Northeast"},
]

region_counts = {}
for entry in entries:
    r = entry["region"]
    region_counts[r] = region_counts.get(r, 0) + 1

most = max(region_counts, key=region_counts.get)
least = min(region_counts, key=region_counts.get)
print(f"Most represented: {most} ({region_counts[most]})")
print(f"Least represented: {least} ({region_counts[least]})")
```

### Why This Matters for Digital Humanities

When we build tools on top of biased archives -- training text models, generating visualizations, drawing conclusions -- the gaps silently shape every result. A topic model trained on an archive that underrepresents women's writing will generate topics that reflect men's concerns. A network graph built from correspondence archives that preserved elite letters will show elite networks. The tool does not announce these biases. The researcher must look for them.

## Practice

:::try-it
Take the archive dictionary from the challenge below and calculate the representation by decade. Which decade is most represented? Least represented? What historical factors might explain the gap?
:::

## Transfer

Think about a dataset or archive you work with:

- What demographic or categorical attributes does it track?
- Can you calculate the proportional representation for each group?
- How does the archive's composition compare to the historical population it claims to represent?
- What groups might be entirely absent -- not underrepresented, but invisible?

The literary scholar Saidiya Hartman writes about "critical fabulation" -- the challenge of writing about people who left no records. Measuring representation is the quantitative counterpart to this work: it tells us the shape of the silence.

:::challenge
Given a dictionary of archive entries with demographic attributes, calculate the percentage representation for each group across two dimensions and identify the most significant gap.
:::

---challenges---
