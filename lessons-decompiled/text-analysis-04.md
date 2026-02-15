---
id: text-analysis-04
title: Text Cleaning and Normalization
moduleId: text-analysis-fundamentals
prerequisites:
  - text-analysis-02
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Remove punctuation using robust Regex patterns
  - Understand the difference between Tokens (total words) and Types (unique words)
  - Calculate the Type/Token Ratio (lexical diversity)
  - Handle "messy" whitespace and newlines for cleaner data
keywords:
  - cleaning
  - normalization
  - preprocessing
  - punctuation
  - set
---

# Text Cleaning: The Unsung Work of DH

  ## Garbage In, Garbage Out
  Computational analysis is only as good as the data you feed it. If your text contains "End?", "end,", and "end!", a computer treats them as three different words. To perform accurate "Distant Reading," we must strip away the noise.

  ---

  ## 1. The Normalization Pipeline
  In Digital Humanities, "Normalization" is the process of converting text into a standard, consistent format. A typical pipeline includes:

  1.  **Lowercasing**: `text.lower()` ensures "The" and "the" match.
  2.  **Stripping**: `text.strip()` removes leading/trailing whitespace.
  3.  **Punctuation Removal**: Using `re.sub()` to find and delete symbols.

  ### Mastering the Regex "Clean-up"
  The most robust way to remove punctuation while keeping words intact is using a "negated character class" in Regex:

  ```python
  import re
  raw_text = "  History: it's complicated!!!  "

  # r'[^\w\s]' means: "Find anything that is NOT a word or a space"
  clean_text = re.sub(r'[^\w\s]', '', raw_text)

  print(clean_text.strip().lower()) 
  # Output: "history its complicated"
  ```

  ---

  ## 2. Types vs. Tokens (Lexical Diversity)
  How "rich" is an author's vocabulary? DH researchers measure this using the **Type/Token Ratio (TTR)**.

  *   **Tokens**: The total number of words in a text.
  *   **Types**: The number of *unique* words in a text.

  ### Finding Uniqueness with `set()`
  In Python, a `set` is a collection that **disallows duplicates**. If you turn a list of words into a set, Python automatically deletes every repeated word, leaving you with the "Types."

  ```python
  words = ["to", "be", "or", "not", "to", "be"]
  unique_words = set(words)

  print(len(words))        # Tokens: 6
  print(len(unique_words)) # Types: 4
  ```

  :::definition
  **Type/Token Ratio (TTR)**: Calculated as `(Types / Tokens)`. A high TTR indicates a diverse vocabulary (like Shakespeare), while a low TTR indicates a more repetitive text (like a children's book).
  :::

  :::challenge
  In the challenge at right, you will process a famous quote. You must normalize the text (lower case and no punctuation) before using `set()` to find the unique word count.
  :::

---challenges---
