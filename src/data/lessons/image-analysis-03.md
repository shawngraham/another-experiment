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
  - Interpret histograms as a fingerprint of an image's visual style
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

### Challenge: Basic Grayscale Histogram

- id: image-analysis-03-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
import cv2
  import numpy as np

  # Create a 50x50 grayscale gradient image
  image = np.zeros((50, 50), dtype=np.uint8)
  for i in range(50):
      image[i, :] = np.linspace(0, 255, 50)

  # Goal: Calculate the histogram for this image
  # 1. Use cv2.calcHist()
  # 2. Use [image] as the source
  # 3. Channel index is [0]
  # 4. No mask (None)
  # 5. Use [256] bins and the range [0, 256]

  hist = 

  # Your code here

  # Verify the shape of the histogram array
  print(hist.shape)
  
```

#### Expected Output

```
(256, 1)
```

#### Hints

1. The syntax is: cv2.calcHist([image], [0], None, [256], [0, 256])
2. Make sure all parameters except for the mask (None) are enclosed in square brackets.
3. The output will be a NumPy array of 256 rows and 1 column.

#### Solution

```python
import cv2
  import numpy as np

  image = np.zeros((50, 50), dtype=np.uint8)
  for i in range(50):
      image[i, :] = np.linspace(0, 255, 50)

  # Calculate the histogram
  hist = cv2.calcHist([image], [0], None, [256], [0, 256])

  print(hist.shape)
```

### Challenge: Extracting the Average Color

- id: image-analysis-03-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import numpy as np

  # Creating a 100x100 image with 4 equal blocks of color
  # Each block is 50x50 pixels
  img = np.zeros((100, 100, 3), dtype=np.uint8)

  img[0:50, 0:50] = [255, 0, 0]      # Top-left: Red
  img[0:50, 50:100] = [0, 255, 0]    # Top-right: Green
  img[50:100, 0:50] = [255, 255, 0]  # Bottom-left: Yellow
  img[50:100, 50:100] = [0, 0, 0]    # Bottom-right: Black

  # Goal: Find the average R, G, B values for the whole image
  # 1. Convert img to float64 for accurate math
  # 2. Use np.mean(..., axis=(0, 1)) to average across Height/Width
  # 3. Convert back to uint8 using .astype(np.uint8)

  # Your code here

  print(avg_color_uint8)
  
```

#### Expected Output

```
[127 127   0]
```

#### Hints

1. To average the image, use: np.mean(img_float, axis=(0, 1))
2. Math: Red is (255+0+255+0)/4 = 127.5. Green is (0+255+255+0)/4 = 127.5.
3. Casting 127.5 to uint8 will truncate it to 127.
4. The Blue channel will be 0 across the entire image.

#### Solution

```python
import numpy as np

  img = np.zeros((100, 100, 3), dtype=np.uint8)
  img[0:50, 0:50] = [255, 0, 0]
  img[0:50, 50:100] = [0, 255, 0]
  img[50:100, 0:50] = [255, 255, 0]
  img[50:100, 50:100] = [0, 0, 0]

  # Convert and calculate mean
  img_float = img.astype(np.float64)
  avg_color = np.mean(img_float, axis=(0, 1))

  # Final result in standard color format
  avg_color_uint8 = avg_color.astype(np.uint8)

  print(avg_color_uint8)
```

