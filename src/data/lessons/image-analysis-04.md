---
id: image-analysis-04
title: Detecting Visual Similarity
moduleId: image-analysis
prerequisites:
  - image-analysis-03
estimatedTimeMinutes: 40
difficulty: advanced
learningObjectives:
  - Understand how images are represented as numerical "feature vectors"
  - Calculate the Euclidean distance between image representations
  - Explain the importance of normalization in similarity metrics
  - Distinguish between Euclidean distance and Cosine similarity
keywords:
  - image similarity
  - feature extraction
  - distance metric
  - cosine similarity
  - normalization
---

# Detecting Visual Similarity: The Visual Fingerprint

  ## Analogy
  If you want to find two paintings in a gallery that look alike, you don't just stare at them. You look for similarities in their color palettes, their composition, or the texture of the brushstrokes. 

  In Digital Humanities, we do this by turning an image into a **Vector**. Think of a vector as a "visual fingerprint." Just as no two fingerprints are exactly the same, but some are very similar, we can measure the mathematical "distance" between image fingerprints to find matches in an archive.

  ---

  ## 1. Feature Extraction: Vectorizing the Archive
  Before we can compare two images, we must turn them into a list of numbers (a vector). 
  *   **Average Color**: A simple 3-number vector (R, G, B).
  *   **Color Histogram**: A 256-number vector representing the distribution of light.
  *   **Embeddings**: A high-dimensional vector created by Deep Learning that captures abstract concepts like "style" or "content."

  ---

  ## 2. Distance Metrics: The Math of "Close"
  Once our images are vectors, we can calculate how "far apart" they are in mathematical space.

  ### Euclidean Distance
  This is the standard "as the crow flies" distance between two points. It is calculated by finding the difference between every number in the vector, squaring them, and taking the square root. 
  - **Use Case**: Best for comparing overall intensity or exact color matches.

  ### Cosine Similarity
  This measures the **angle** between two vectors. It ignores how "long" the vectors are (e.g., how bright the images are) and focuses only on their direction (e.g., the balance of colors).
  - **Use Case**: Best for finding images with similar style even if one is much darker than the other.

  ---

  ## 3. The Level Playing Field: Normalization
  If you are comparing a tiny thumbnail to a huge high-res scan, the high-res scan will have millions more pixels, making its histogram counts much larger. To compare them fairly, we must **Normalize** the data—scaling the values so they always sum up to 1 (treating them as percentages rather than raw counts).

  ```python
  import cv2

  # Normalize a histogram so it represents the % of pixels per bin
  cv2.normalize(hist, hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
  ```

  ---

  ## 4. DH Application: Duplicate Detection
  Large digital archives often contain near-duplicates (e.g., a scanned letter and a slightly cropped version of the same letter). By calculating the distance between their histograms, we can automatically flag these "visual twins" for the archivist.

  :::tip
  **DH Insight**: "Visual Similarity" is a subjective scholarly concept. By choosing different metrics (Euclidean vs. Cosine), you are making a research decision about what kind of "similarity" matters most to your project.
  :::

  :::challenge
  In this challenge, you will calculate the **Euclidean Distance** between the average colors of two different images. If the distance is small, the images are visually similar in color.
  :::

---challenges---

### Challenge: Calculate Euclidean Distance

- id: image-analysis-04-c1
- language: python
- difficulty: advanced

#### Starter Code

```python
import numpy as np

  # Average RGB colors of two historical photographs
  # Image 1 is a warm sepia tone
  img1_avg = np.array([120, 100, 50])

  # Image 2 is a slightly darker, cooler tone
  img2_avg = np.array([130, 90, 70])

  # Goal: Calculate the Euclidean Distance between these vectors
  # 1. Subtract img2 from img1
  # 2. Use np.linalg.norm() to find the distance
  # 3. Print the result formatted to 4 decimal places

  # Your code here

  print(f"{distance:.4f}")
  
```

#### Expected Output

```
24.4949
```

#### Hints

1. The formula is: distance = np.linalg.norm(vector1 - vector2)
2. NumPy handles the subtraction and the square-root-of-squares automatically.
3. The result should be the square root of ( (120-130)^2 + (100-90)^2 + (50-70)^2 ).

#### Solution

```python
import numpy as np

  img1_avg = np.array([120, 100, 50])
  img2_avg = np.array([130, 90, 70])

  # Calculate Euclidean distance
  # (Calculates the square root of the sum of squared differences)
  distance = np.linalg.norm(img1_avg - img2_avg)

  print(f"{distance:.4f}")
```

