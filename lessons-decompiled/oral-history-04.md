---
id: oral-history-04
title: Concordance and Keywords in Oral Testimony
moduleId: oral-history
prerequisites:
  - oral-history-03
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Explain what a KWIC concordance is and why it is valuable for oral history analysis
  - Search transcript data for keyword occurrences with speaker attribution
  - Build a keyword-in-context concordance that shows surrounding words for each match
keywords:
  - concordance
  - KWIC
  - keyword in context
  - keyword search
  - speaker attribution
  - close reading
---

# Concordance and Keywords in Oral Testimony

## Analogy

Imagine a biblical concordance -- the kind scholars have compiled for centuries. You look up the word "covenant" and find every verse where it appears, each one displayed with a few words of surrounding context. At a glance, you can see how the same word is used differently across passages: a covenant of peace, a covenant broken, a covenant remembered. A **KWIC concordance** (Keyword in Context) does exactly the same thing for any text, including oral history transcripts. But here we gain something the biblical concordance cannot offer: we also know *who* said the word. When a narrator says "home" versus when an interviewer says "home," the meaning and emotional weight can be entirely different.

## Key Concepts

### Finding Keywords in Transcript Turns

The simplest form of keyword analysis checks whether a word appears in each turn and prints the matching turns with their speaker.

```python
transcript = [
    {"speaker": "Narrator", "text": "We left the homeland with nothing but hope", "start": 0.0, "end": 4.5},
    {"speaker": "Narrator", "text": "Finding hope again took many years of struggle", "start": 5.0, "end": 9.8},
]

keyword = "hope"
for turn in transcript:
    if keyword in turn["text"].lower():
        print(f"[{turn['start']}s] {turn['speaker']}: {turn['text']}")
```

```
[0.0s] Narrator: We left the homeland with nothing but hope
[5.0s] Narrator: Finding hope again took many years of struggle
```

This is useful but limited. We see the whole turn, but if turns are long (as they often are in oral history), the keyword gets buried. We need a way to zoom in on just the words surrounding each occurrence.

:::definition
**KWIC (Keyword in Context)**: A concordance format that displays each occurrence of a search term with a fixed window of words to its left and right, allowing researchers to see usage patterns at a glance.
:::

### Building a KWIC Concordance

To build a proper KWIC concordance, we split each turn's text into words, find every position where the keyword occurs, and extract a window of surrounding context.

```python
text = "The church was our home and the church was our strength"
keyword = "church"
words = text.split()
context = 2

for i, word in enumerate(words):
    if word.lower() == keyword:
        left = " ".join(words[max(0, i - context):i])
        right = " ".join(words[i + 1:i + 1 + context])
        print(f"...{left} [{word}] {right}...")
```

```
...The [church] was our...
...and the [church] was our...
```

The key technique here is **slicing with a window**. For each keyword position `i\

---challenges---
