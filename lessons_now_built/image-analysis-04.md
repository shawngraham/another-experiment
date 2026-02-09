---
id: image-analysis-04
title: Detecting Visual Similarity
moduleId: image-analysis
prerequisites:
  - image-analysis-03
estimatedTimeMinutes: 40
difficulty: advanced
learningObjectives:
  - Understand how images can be represented numerically for comparison
  - Calculate the "distance" between image representations
  - Apply a simple similarity metric to a set of images
keywords:
  - image similarity
  - feature extraction
  - distance metric
  - cosine similarity
  - color histogram comparison
---

# Detecting Visual Similarity

## Analogy

If you want to find two paintings in a museum that look alike, you don't just stare at them for hours. You might look for similarities in their dominant colors, their overall composition, or the texture of the brushstrokes. Similarly, to find visually similar images programmatically, we need to extract "features" from the images and then measure the "distance" between these features.

## Key Concepts

### Image Representation
Before we can compare images, we need to convert them into a numerical format that captures their essence. Common methods include:
1.  **Color Histograms**: As we saw, this captures the distribution of colors.
2.  **Pixel Data**: The raw NumPy array itself can be treated as a high-dimensional vector.
3.  **Feature Descriptors**: More advanced techniques (like SIFT, SURF, or deep learning embeddings) extract more abstract features.

### Distance Metrics
Once images are represented numerically (e.g., as vectors), we can measure how "far apart" they are.
*   **Euclidean Distance**: Standard "as the crow flies" distance between two points in space.
*   **Cosine Similarity**: Measures the angle between two vectors. It's useful when the *magnitude* (e.g., overall brightness) doesn't matter as much as the *direction* (e.g., the color balance). A cosine similarity of 1 means vectors point in the exact same direction.

### Comparing Histograms
A straightforward way to compare images is by comparing their color histograms.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Assume img1_gray and img2_gray are grayscale images (NumPy arrays)

# Calculate histograms
hist1 = cv2.calcHist([img1_gray],, None,,)
hist2 = cv2.calcHist([img2_gray],, None,,)

# Normalize histograms so their sum is 1 (percentage of pixels)
cv2.normalize(hist1, hist1, alpha=1, beta=0, norm_type=cv2.NORM_MINMAX)
cv2.normalize(hist2, hist2, alpha=1, beta=0, norm_type=cv2.NORM_MINMAX)

# Compare histograms using a metric (e.g., Bhattacharyya distance)
# Lower values mean more similar
distance = cv2.compareHist(hist1, hist2, cv2.HISTCMP_BHATTACHARYYA)

print(f"Histogram similarity (Bhattacharyya distance): {distance}") 
```

## Practice

::: try-it
If two images have identical color histograms, what would their Bhattacharyya distance be? (Hint: It's the smallest possible distance).
:::

## Transfer

*   **Art Provenance**: Identify if two paintings *could* be by the same artist by comparing their color palettes and textures.
*   **Digital Archives**: Find duplicate or near-duplicate images in a large collection, saving storage space and organizing content.

::: challenge
Calculate the Euclidean distance between two simplified image representations.
:::

---challenges---

### Challenge: Euclidean Distance Between Color Vectors

- id: image-analysis-04-c1
- language: python
- difficulty: advanced

#### Starter Code

```python
import numpy as np

# Representing the *average* color of two images as vectors.
# Image 1: A slightly reddish-yellowish image
color_vector1 = np.array()

# Image 2: A similar, but slightly different image
color_vector2 = np.array()

# 1. Calculate the Euclidean distance between these two color vectors.
# Formula: sqrt( sum( (v1_i - v2_i)^2 ) )

# Use numpy for this!
# You can subtract arrays directly: diff = color_vector1 - color_vector2
# You can square elements: squared_diff = diff**2
# You can sum elements: sum_squared_diff = np.sum(squared_diff)
# You can take the square root: distance = np.sqrt(sum_squared_diff)

distance = 0.0

# Your code here

print(f"{distance:.4f}")
```

#### Expected Output

```
22.3607
```

#### Hints

1. NumPy's `np.linalg.norm()` function can calculate the Euclidean distance directly between two arrays.
2. `np.linalg.norm(array1 - array2)`
3. The result should be approximately 22.3607.

#### Solution

```python
import numpy as np

color_vector1 = np.array()
color_vector2 = np.array()

# Calculate Euclidean distance using numpy's linalg.norm
distance = np.linalg.norm(color_vector1 - color_vector2)

print(f"{distance:.4f}")
```