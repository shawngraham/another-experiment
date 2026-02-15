---
id: image-analysis-03
title: Color Histograms and Extraction
moduleId: image-analysis
prerequisites:
  - image-analysis-02
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Calculate color histograms to analyze the distribution of light and color
  - Interpret histograms as a fingerprint of an image\'s visual style
  - Extract average and dominant colors to compare artistic palettes
  - Use NumPy and OpenCV to quantify visual information
keywords:
  - histogram
  - color analysis
  - dominant color
  - matplotlib
  - distant viewing
---

# Color Histograms and Extraction

  ## The Visual Fingerprint
  In the humanities, we often talk about an artist's "palette" or the "mood" of a film. A **color histogram** is a way to turn those qualitative descriptions into quantitative data. 

  Think of a histogram as a **bar chart of intensity**. Instead of counting words in a book, we are counting how many pixels in an image belong to a specific shade of red, green, or blue.

  ---

  ## 1. What is a Histogram?
  A histogram for an image shows the frequency of each color intensity. 
  - **X-axis**: Represents the color intensity from **0** (darkest) to **255** (brightest).
  - **Y-axis**: Represents the **count** of pixels that have that specific intensity.

  By looking at the "shape" of the histogram, you can instantly tell if an image is overexposed (peaks on the right), underexposed (peaks on the left), or high-contrast (peaks at both ends).

  ---

  ## 2. Calculating Histograms with OpenCV
  The function `cv2.calcHist()` is the standard tool for this. It requires several specific arguments passed as **lists**:

  ```python
  import cv2
  import matplotlib.pyplot as plt

  # 1. [image]: The image list
  # 2. [0]: The channel index (0 for Grayscale, or B=0, G=1, R=2 for Color)
  # 3. None: No mask (we want the whole image)
  # 4. [256]: The number of "bins" (0-255)
  # 5. [0, 256]: The range of values
  hist = cv2.calcHist([img], [0], None, [256], [0, 256])

  # Plotting with Matplotlib
  plt.plot(hist)
  plt.show()
  ```

  ---

  ## 3. Extracting Dominant Colors
  While a histogram shows the *range* of colors, sometimes we just want the "average" feel of an image. This is a common technique in **Distant Viewing**—an approach where researchers analyze the color palettes of every frame in a movie or every painting in a gallery to see how visual styles change over time.

  A simple way to find the "average color" is to calculate the **mean** of all pixel values across the Height and Width of the image.

  ```python
  # Calculate the average Red, Green, and Blue across the whole image
  avg_color = np.mean(img_array, axis=(0, 1))
  ```

  :::tip
  **DH Use Case**: Scholars use these tools to identify "visual trends" in historical archives. For example, did the invention of synthetic dyes in the 19th century lead to a measurable spike in "saturated" color frequencies in fashion photography?
  :::

  :::challenge
  In Challenge 1, calculate a histogram for a grayscale gradient. In Challenge 2, calculate the average color of a four-color "quilt" image.
  :::

---challenges---
