---
id: image-analysis-01
title: Pixels as Data
moduleId: image-analysis
prerequisites:
  - python-basics-05
estimatedTimeMinutes: 25
difficulty: beginner
learningObjectives:
  - Understand that digital images are structured grids of pixels
  - Explain the RGB color model and the 0-255 intensity range
  - Access and modify pixel data using NumPy array indexing
  - Identify the "shape" of image data (Height, Width, Channels)
keywords:
  - pixels
  - rgb
  - numpy
  - image data
  - distant viewing
---

# Pixels as Data

  ## The Digital Mosaic
  Think of a digital image like a giant, extremely detailed mosaic. Each tiny tile in the mosaic is a **pixel** (short for "picture element"). In Digital Humanities, we use **Computer Vision** to analyze thousands of these "mosaics" at once—detecting patterns in historical photography, analyzing color trends in cinema, or identifying features in digitized manuscripts.

  ---

  ## 1. The Pixel Grid
  Every image is a matrix (a grid) with a specific height and width.
  *   **Resolution**: An image that is 800 pixels wide and 600 pixels high contains 480,000 individual tiles.
  *   **Coordinate System**: In Python, we count from the top-left corner. The pixel at `[0, 0]` is the very first pixel in the top-left.

  ---

  ## 2. Color Representation (RGB)
  Most digital images use the **RGB** color model. Every single pixel is actually composed of three values representing the intensity of **Red, Green, and Blue** light.

  Values typically range from **0 (black/no intensity)** to **255 (full intensity)**. This is because 256 levels fit perfectly into one "byte" of computer memory (`uint8`).

  | Color | RGB Value |
  | :--- | :--- |
  | **Pure Red** | `(255, 0, 0)` |
  | **Pure White** | `(255, 255, 255)` |
  | **Pure Black** | `(0, 0, 0)` |
  | **Yellow** | `(255, 255, 0)` (Red + Green) |

  ---

  ## 3. NumPy: The Image Engine
  In Python, we use the **NumPy** library to handle images. An image is stored as a 3D array with the shape: **(Height, Width, Channels)**.

  ```python
  import numpy as np

  # Create a tiny 2x2 black image
  # dtype=np.uint8 ensures values stay between 0-255
  image = np.zeros((2, 2, 3), dtype=np.uint8)

  # Change the top-left pixel to Red
  image[0, 0] = [255, 0, 0]
  ```

  :::tip
  **Distant Viewing**: This is a DH method where we analyze "visual style" computationally. By looking at the average pixel values of every frame in a film, we can visualize the "color palette" of a director across their entire career.
  :::

  :::challenge
  In the first challenge, create a 1x1 red pixel. In the second, practice "drilling down" into a 3x3 grid to find specific colors.
  :::

---challenges---

### Challenge: Create a Red Pixel Array

- id: image-analysis-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import numpy as np

  # Goal: Create a 1x1 pixel image that is pure Red.
  # 1. Use np.array()
  # 2. The structure must be a 3D list: [[[R, G, B]]]
  # 3. Set dtype=np.uint8

  red_pixel_image = 

  # Your code here

  print(red_pixel_image)
  
```

#### Expected Output

```
[[[255   0   0]]]
```

#### Hints

1. Pure red is [255, 0, 0].
2. NumPy expects nested lists for dimensions: [[[ ... ]]].
3. The shape should be (1, 1, 3).

#### Solution

```python
import numpy as np

  # A 1x1 image with 3 color channels
  red_pixel_image = np.array([[[255, 0, 0]]], dtype=np.uint8)

  print(red_pixel_image)
```

### Challenge: Accessing Pixel Values

- id: image-analysis-01-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import numpy as np

  # A 3x3 pixel "mini-archive"
  image_array = np.array([
      [[255, 0, 0], [0, 255, 0], [0, 0, 255]],      # Row 0: R, G, B
      [[0, 0, 0], [255, 255, 255], [128, 128, 128]], # Row 1: Black, White, Gray
      [[255, 255, 0], [0, 255, 255], [255, 0, 255]]  # Row 2: Yellow, Cyan, Magenta
  ], dtype=np.uint8)

  # Goal: Extract the RGB values for White and Yellow
  # 1. White is in Row 1, Column 1
  # 2. Yellow is in Row 2, Column 0

  white_pixel = 
  yellow_pixel = 

  # Your code here

  print(f"White: {white_pixel}")
  print(f"Yellow: {yellow_pixel}")
  
```

#### Expected Output

```
White: [255 255 255]
Yellow: [255 255   0]
```

#### Hints

1. Access the array using image_array[row, col].
2. Remember that indexing starts at 0.
3. White is at index [1, 1].

#### Solution

```python
import numpy as np

  image_array = np.array([
      [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
      [[0, 0, 0], [255, 255, 255], [128, 128, 128]],
      [[255, 255, 0], [0, 255, 255], [255, 0, 255]]
  ], dtype=np.uint8)

  # Select pixels by [row, column]
  white_pixel = image_array[1, 1]
  yellow_pixel = image_array[2, 0]

  print(f"White: {white_pixel}")
  print(f"Yellow: {yellow_pixel}")
```

