---
id: sentiment-04
title: Limitations and Bias
moduleId: sentiment-analysis
prerequisites:
  - sentiment-02
estimatedTimeMinutes: 25
difficulty: beginner
learningObjectives:
  - Identify common failure points in sentiment analysis (negation, sarcasm)
  - Understand how historical context shifts word meanings
  - Implement basic negation handling
keywords:
  - negation
  - bias
  - sarcasm
  - context
  - critique
---

# Limitations and Bias

## Analogy

Imagine a time traveler from 1920 arriving today and hearing someone say, "That movie was wicked!" The time traveler would think the movie was evil. A sentiment analysis tool is often like that time traveler—it lacks the cultural context, slang knowledge, and ability to detect sarcasm ("Oh, great. Another flat tire.") that humans possess.

## Key Concepts

### Negation
The most common error in simple "Bag of Words" models is ignoring negation.
*   "Good" = +1
*   "Not Good" = +1 (if we just count the word "Good")

To fix this, we need logic that looks at the word *before* the target word.

### Bias in Training Data
If a Machine Learning model is trained on movie reviews, it might learn that the word "unpredictable" is positive (an exciting plot). If you use that same model on financial news, "unpredictable" is highly negative (market instability). **Context matters.**

## Practice

::: try-it
Find a sentence where the sentiment changes entirely based on the speaker's tone. "Yeah, right."
:::

## Transfer

*   **History**: The word "terror" in the French Revolution ("The Terror") vs. modern usage.
*   **Sociology**: Algorithms often flag AAVE (African American Vernacular English) as more "negative" or "offensive" simply because the training data (Standard American English) didn't include it.

::: challenge
Fix a broken scorer by handling "not".
:::

---challenges---

### Challenge: Handling Negation

- id: sentiment-04-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# A simple positive word list
positive_words = ["good", "happy", "excellent"]

def get_sentiment(sentence):
    words = sentence.split()
    score = 0
    
    # Iterate through words using index so we can look back
    for i in range(len(words)):
        word = words[i]
        
        if word in positive_words:
            # Check if the PREVIOUS word was "not"
            # Be careful not to look at index -1 if i is 0!
            if i > 0 and words[i-1] == "not":
                # It's a negation! Flip the score or make it negative
                score -= 1
            else:
                # Normal positive word
                score += 1
                
    return score

# Test cases
print(f"Score 1: {get_sentiment('this is good')}")
print(f"Score 2: {get_sentiment('this is not good')}")
```

#### Expected Output

```
Score 1: 1
Score 2: -1
```

#### Hints

1. The logic is mostly written, you just need to trace it.
2. In 'this is not good':
   - i=0 ('this'): nothing
   - i=1 ('is'): nothing
   - i=2 ('not'): nothing (it's not in positive_words)
   - i=3 ('good'): It IS in positive_words. Check i-1 ('not').
3. The logic seems correct in the starter code? Wait, the challenge usually requires writing code. The starter code has the logic fully implemented.
4. **Task**: The starter code implements the logic but contains a bug or needs completion? 
   Let's make the user write the `if i > 0` check.

#### Revised Starter Code

```python
positive_words = ["good", "happy", "excellent"]

def get_sentiment(sentence):
    words = sentence.split()
    score = 0
    
    for i in range(len(words)):
        word = words[i]
        
        if word in positive_words:
            # TODO: Check if the word before (i-1) is "not"
            # Ensure i > 0 to avoid index errors
            
            # Your code here to determine 'is_negated'
            is_negated = False
            
            if is_negated:
                score -= 1
            else:
                score += 1
                
    return score

print(f"Score 1: {get_sentiment('this is good')}")
print(f"Score 2: {get_sentiment('this is not good')}")
```

#### Solution

```python
positive_words = ["good", "happy", "excellent"]

def get_sentiment(sentence):
    words = sentence.split()
    score = 0
    
    for i in range(len(words)):
        word = words[i]
        
        if word in positive_words:
            is_negated = False
            if i > 0 and words[i-1] == "not":
                is_negated = True
            
            if is_negated:
                score -= 1
            else:
                score += 1
                
    return score

print(f"Score 1: {get_sentiment('this is good')}")
print(f"Score 2: {get_sentiment('this is not good')}")
```