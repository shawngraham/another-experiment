---
id: image-analysis-02
title: Processing Images with Pillow/OpenCV
moduleId: image-analysis
prerequisites:
  - image-analysis-01
  - python-basics-04
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Load images into Python using Pillow and OpenCV
  - Resize and crop images programmatically
  - Convert images to grayscale
keywords:
  - pillow
  - opencv
  - PIL
  - cv2
  - load image
  - grayscale
---

# Processing Images with Pillow/OpenCV

## Analogy

If NumPy arrays are the raw ingredients (pixels), **Pillow** and **OpenCV** are the kitchen tools that let us chop, dice, and prepare those ingredients.
*   **Pillow (PIL Fork)**: Great for general image manipulation, web-friendly formats, and basic operations.
*   **OpenCV (cv2)**: A powerhouse for computer vision tasks, offering advanced image processing and analysis functions.

## Key Concepts

### Loading Images

#### Pillow
```python
from PIL import Image

# Load an image file
img_pil = Image.open("my_photo.jpg") 
print(img_pil.format, img_pil.size, img_pil.mode) # e.g., JPEG (100, 150) RGB```

#### OpenCV
```python
import cv2

# Load an image file
# Note: OpenCV loads images in BGR format by default!
img_cv = cv2.imread("my_photo.jpg") 

# OpenCV uses NumPy arrays directly
print(img_cv.shape) # e.g., (150, 100, 3) - Height, Width, Channels
```

### Basic Transformations

#### Resizing
```python
# Pillow
new_size = (200, 200) # (width, height)
resized_img_pil = img_pil.resize(new_size)

# OpenCV
resized_img_cv = cv2.resize(img_cv, (200, 200)) # (width, height)
```

#### Cropping
```python
# Pillow (left, upper, right, lower)
box = (100, 100, 400, 400) 
cropped_img_pil = img_pil.crop(box)

# OpenCV (rows first, then columns)
# crop = img[y1:y2, x1:x2]
cropped_img_cv = img_cv[100:400, 100:400] ```

### Grayscale Conversion
This simplifies images by reducing color information to luminance.

```python
# Pillow
grayscale_img_pil = img_pil.convert('L') # 'L' stands for Luminance

# OpenCV
grayscale_img_cv = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
```

## Practice

::: try-it
Try loading an image with Pillow and printing its size. Then, try loading it with OpenCV and printing its shape. Notice the order of height and width!
:::

## Transfer

*   **Art History**: Standardize a collection of scanned artwork to the same dimensions for comparison.
*   **Manuscript Studies**: Convert a collection of digitized pages to grayscale to reduce file size and focus on text layout.

::: challenge
Resize and convert an image to grayscale.
:::

---challenges---

### Challenge: Image Resizing and Grayscale

- id: image-analysis-02-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
import cv2
import numpy as np

# Create a dummy image: 100x100 pixels, all blue
# Shape: (height, width, channels)
# OpenCV expects BGR, so Blue is (255, 0, 0)
dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
dummy_image[:, :] = 

# We'll pretend this came from cv2.imread()

# 1. Resize the image to be 50x50 pixels
# Remember OpenCV resize expects (width, height)
resized_img = None

# 2. Convert the *original* image (dummy_image) to grayscale
gray_img = None

# Your code here

# Check dimensions:
# Resized should be (50, 50, 3)
# Grayscale should be (100, 100)
print(f"Resized shape: {resized_img.shape}")
print(f"Grayscale shape: {gray_img.shape}")
```

#### Expected Output

```
Resized shape: (50, 50, 3)
Grayscale shape: (100, 100)
```

#### Hints

1. For resizing: `cv2.resize(image, (new_width, new_height))`
2. For grayscale: `cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)`

#### Solution

```python
import cv2
import numpy as np

dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
dummy_image[:, :] = 

# 1. Resize the image
resized_img = cv2.resize(dummy_image, (50, 50))

# 2. Convert the original image to grayscale
gray_img = cv2.cvtColor(dummy_image, cv2.COLOR_BGR2GRAY)

print(f"Resized shape: {resized_img.shape}")
print(f"Grayscale shape: {gray_img.shape}")
```

### Challenge: Pillow Cropping

- id: image-analysis-02-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
from PIL import Image
import numpy as np

# Create a dummy 100x100 RGBA image (Red)
# RGBA means Red, Green, Blue, Alpha (transparency)
# Red is (255, 0, 0, 255)
img_array = np.zeros((100, 100, 4), dtype=np.uint8)
img_array[:, :] =
img_pil = Image.fromarray(img_array)

# 1. Crop the image to the top-left 20x20 pixel quadrant.
# Pillow's crop() takes a box: (left, upper, right, lower)

# Define the box coordinates
# left = 0, upper = 0
# right = 20, lower = 20
crop_box = (0, 0, 20, 20)

# Perform the crop
cropped_img = img_pil.crop(crop_box)

# Your code here

# Check the size of the cropped image
print(cropped_img.size)
```

#### Expected Output

```
(20, 20)
```

#### Hints

1. The `crop_box` is already defined correctly for a 20x20 crop from the top-left.
2. Call `img_pil.crop(crop_box)`.
3. Pillow's `size` attribute returns `(width, height)`.

#### Solution

```python
from PIL import Image
import numpy as np

img_array = np.zeros((100, 100, 4), dtype=np.uint8)
img_array[:, :] =
img_pil = Image.fromarray(img_array)

crop_box = (0, 0, 20, 20)

# Perform the crop
cropped_img = img_pil.crop(crop_box)

print(cropped_img.size)
```