---
id: generative-01
title: The Oulipo and Constraint-based Writing
moduleId: generative-poetics
prerequisites:
  - python-basics
estimatedTimeMinutes: 45
difficulty: beginner
learningObjectives:
  - Explain the Oulipian concept of "constrained writing"
  - Implement a basic "N+7" algorithm in Python
  - Understand how formal constraints can bypass "writer\'s block"
keywords:
  - oulipo
  - constraints
  - n+7
  - algorithms
---

# The Oulipo and Constraint-based Writing

## Analogy
Imagine you are a chef, but you are told you cannot use the letter "E" in any of your ingredients. No *eggs*, no *cheese*, no *beef*. This constraint seems like a limitation, but it actually forces you to discover new flavors (like *calamari* or *mushrooms*) that you might have ignored otherwise. In the 1960s, a group of writers called the **Oulipo** (Ouvroir de littérature potentielle) used similar "rules" to spark creativity.

## Key Concepts
The Oulipo believed that "inspiration" was a myth. Instead, they used mathematical structures and algorithms to produce "potential" literature.

:::definition
**Constraint**: A formal rule (mathematical, grammatical, or alphabetical) imposed on a writer to force specific creative choices.
:::

One of their most famous methods is the **N+7** method. To perform it:
1. Take a text.
2. For every noun in that text, find its entry in a dictionary.
3. Replace that noun with the 7th noun following it in the dictionary.

In Python, we can simulate this by using a list of words as our "dictionary."

```python
dictionary = ["apple", "bird", "cloud", "dance", "eagle", "forest", "ghost", "house", "ice"]
word = "bird"

# Find index and add 7
old_index = dictionary.index(word)
new_index = (old_index + 2) % len(dictionary) # We use +2 for this short list
print(dictionary[new_index]) # Output: "dance"
```

## Practice
:::try-it
Change the `index + 2` to `index + 5` in the example above. What happens if the index goes past the end of the list? (Hint: The `%` operator helps "wrap" it back to the start).
:::

## Transfer
Constraints are not just for games; they are used in DH to reveal the "underlying skeleton" of a text. By forcing a text into a new shape, we see patterns we missed.

:::challenge
Write a function that takes a short sentence and replaces every word with the word located **3 positions later** in a provided word list.
:::

---challenges---
