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
  - Identify the "shape" of image data (Height
  - Width
  - Channels)
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
