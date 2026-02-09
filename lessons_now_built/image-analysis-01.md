---
id: image-analysis-01
title: Pixels as Data
moduleId: image-analysis
prerequisites:
  - python-basics-05
estimatedTimeMinutes: 25
difficulty: beginner
learningObjectives:
  - Understand that images are grids of pixels
  - Explain RGB color representation
  - Access pixel data using NumPy arrays
keywords:
  - pixels
  - rgb
  - numpy
  - image data
---

# Pixels as Data

## Analogy

Think of a digital image like a giant, extremely detailed mosaic. Each tiny tile in the mosaic is a **pixel**. Just like a mosaic artist chooses tiles of different colors to create a picture, a computer uses pixels of different colors to represent an image.

## Key Concepts

### The Pixel Grid
Digital images are fundamentally a grid (or matrix) of pixels.
*   **Width**: The number of pixels horizontally.
*   **Height**: The number of pixels vertically.

An image with a width of 800 pixels and a height of 600 pixels contains 480,000 individual pixels!

### Color Representation (RGB)
Most digital images use the **RGB** color model.
*   **R**ed
*   **G**reen
*   **B**lue

Each pixel has three values, one for each color, typically ranging from 0 (no intensity) to 255 (full intensity).

*   **(255, 0, 0)** is pure red.
*   **(0, 255, 0)** is pure green.
*   **(0, 0, 255)** is pure blue.
*   **(0, 0, 0)** is black.
*   **(255, 255, 255)** is white.
*   **(128, 128, 128)** is a shade of gray.

### NumPy Arrays
The **NumPy** library is essential for handling numerical data in Python, and images are just numerical data. We often represent an image as a 3-dimensional NumPy array:
*   The first dimension is the **height** (rows of pixels).
*   The second dimension is the **width** (columns of pixels).
*   The third dimension is the **color channel** (R, G, or B).

```python
import numpy as np

# Create a small 2x2 pixel image (all black)
# Shape: (height, width, color_channels)
black_image = np.zeros((2, 2, 3), dtype=np.uint8) 

print(black_image)
```

## Practice

::: try-it
What RGB value would you use to create a bright yellow pixel? (Hint: Yellow is a mix of red and green light).
:::

## Transfer

When analyzing historical photographs, understanding pixel data helps us quantify things like the overall brightness, the prevalence of certain colors, or even the texture of a surface by examining the variations in pixel values.

::: challenge
Create a simple NumPy array representing a colored image.
:::

---challenges---

### Challenge: Red Pixel Array

- id: image-analysis-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import numpy as np

# 1. Create a 1x1 pixel image (width=1, height=1)
# 2. Make it pure red. Remember the RGB format: (255, 0, 0)
# 3. The data type should be uint8 (unsigned integer 8-bit)

red_pixel_image = None

# Your code here

# Print the array to verify
print(red_pixel_image)
```

#### Expected Output

```
[[[255   0   0]]]
```

#### Hints

1. Use `np.zeros()` or `np.array()`.
2. The shape should be `(1, 1, 3)`.
3. The data type is `dtype=np.uint8`.

#### Solution

```python
import numpy as np

# Create a 1x1 pixel image and set it to red
red_pixel_image = np.array([[]], dtype=np.uint8)

print(red_pixel_image)
```

### Challenge: Accessing Pixel Values

- id: image-analysis-01-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import numpy as np

# A 3x3 pixel image
# Row 0: Red, Green, Blue
# Row 1: Black, White, Gray
# Row 2: Yellow, Cyan, Magenta
image_array = np.array([
    [,,],  # Row 0
    [,,], # Row 1
    [,,]  # Row 2
], dtype=np.uint8)

# 1. Get the RGB value of the pixel at Row 1, Column 1 (which is White)
# Remember: array[row, column]
white_pixel = None

# 2. Get the RGB value of the pixel at Row 2, Column 0 (which is Yellow)
yellow_pixel = None

# Your code here

print(f"White pixel: {white_pixel}")
print(f"Yellow pixel: {yellow_pixel}")
```

#### Expected Output

```
White pixel: [255 255 255]
Yellow pixel: [255 255   0]
```

#### Hints

1. Access elements using `array_name[row_index, column_index]`.
2. Indices start from 0.
3. `white_pixel` should be `image_array[1, 1]`.
4. `yellow_pixel` should be `image_array[2, 0]`.

#### Solution

```python
import numpy as np

image_array = np.array([
    [,,],
    [,,],
    [,,]
], dtype=np.uint8)

# Get the pixel at Row 1, Column 1
white_pixel = image_array

# Get the pixel at Row 2, Column 0
yellow_pixel = image_array

print(f"White pixel: {white_pixel}")
print(f"Yellow pixel: {yellow_pixel}")
```