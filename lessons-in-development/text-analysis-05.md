---
id: text-analysis-05
title: Basic NLP with NLTK
moduleId: text-analysis-fundamentals
prerequisites:
  - text-analysis-04
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Tokenize text using NLTK
  - Perform part-of-speech tagging
  - Extract named entities from a passage
keywords:
  - nltk
  - tokenization
  - pos tagging
  - named entities
  - nlp
---

# Basic NLP with NLTK

## Analogy

If string methods are like reading with a magnifying glass — letting you see
individual characters and words — then NLP libraries like NLTK are like having
a research assistant who understands grammar, can label parts of speech, and
can identify the people, places, and dates mentioned in a text.

## Key Concepts

### What is NLP?

Natural Language Processing (NLP) bridges the gap between human language and
computational analysis. Instead of treating text as a flat sequence of
characters, NLP tools understand linguistic structure.

::: definition
**Tokenization**: Splitting text into individual words or sentences. This is
the foundational first step in almost every NLP pipeline.
:::

### Tokenization in Practice

```python
from nltk.tokenize import word_tokenize

text = "Mary Shelley wrote Frankenstein in 1818."
tokens = word_tokenize(text)
# ['Mary', 'Shelley', 'wrote', 'Frankenstein', 'in', '1818', '.']
```

Notice how the tokenizer handles punctuation as a separate token — the period
becomes its own item rather than being glued to "1818".

### Part-of-Speech Tagging

Once you have tokens, NLTK can label each word with its grammatical role:

```python
import nltk
tagged = nltk.pos_tag(tokens)
# [('Mary', 'NNP'), ('Shelley', 'NNP'), ('wrote', 'VBD'), ...]
```

Common POS tags: `NNP` = proper noun, `VBD` = past-tense verb,
`IN` = preposition.

## Practice

::: try-it
Run the tokenizer on a sentence of your own choosing. Try sentences with
contractions ("don't", "it's") and see how the tokenizer splits them.
:::

## Transfer

Think about your own research corpus. How might tokenization help you count
meaningful units rather than just splitting on spaces? What edge cases might
your texts contain (e.g., historical spellings, non-English characters)?

::: challenge
Tokenize a sentence and extract all proper nouns using POS tagging.
:::

---challenges---

### Challenge: Tokenize a sentence

- id: text-analysis-05-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
import nltk
nltk.download('punkt_tab', quiet=True)

text = "Mary Shelley wrote Frankenstein in 1818."

# Tokenize into words using word_tokenize
# Your code here
```

#### Expected Output

```
['Mary', 'Shelley', 'wrote', 'Frankenstein', 'in', '1818', '.']
```

#### Hints

1. Import word_tokenize from nltk.tokenize
2. Call word_tokenize(text) and print the result

#### Solution

```python
import nltk
nltk.download('punkt_tab', quiet=True)
from nltk.tokenize import word_tokenize

text = "Mary Shelley wrote Frankenstein in 1818."
print(word_tokenize(text))
```

### Challenge: Extract proper nouns

- id: text-analysis-05-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import nltk
nltk.download('punkt_tab', quiet=True)
nltk.download('averaged_perceptron_tagger_eng', quiet=True)
from nltk.tokenize import word_tokenize

text = "Jane Austen published Pride and Prejudice in 1813."
tokens = word_tokenize(text)

# Use nltk.pos_tag() and filter for proper nouns (NNP)
# Your code here
```

#### Expected Output

```
['Jane', 'Austen', 'Pride', 'Prejudice']
```

#### Hints

1. Use nltk.pos_tag(tokens) to get a list of (word, tag) tuples
2. Filter for tags that equal 'NNP' (proper noun, singular)
3. Use a list comprehension: [word for word, tag in tagged if tag == 'NNP']

#### Solution

```python
import nltk
nltk.download('punkt_tab', quiet=True)
nltk.download('averaged_perceptron_tagger_eng', quiet=True)
from nltk.tokenize import word_tokenize

text = "Jane Austen published Pride and Prejudice in 1813."
tokens = word_tokenize(text)
tagged = nltk.pos_tag(tokens)
proper_nouns = [word for word, tag in tagged if tag == 'NNP']
print(proper_nouns)
```
