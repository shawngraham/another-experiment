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
  - Navigate the BGR vs RGB color channel discrepancy
  - Resize and crop images programmatically to standardize a corpus
  - Convert images to grayscale to prepare for OCR or layout analysis
  - Understand the difference between (Width, Height) and (Rows, Columns) in code
keywords:
  - pillow
  - opencv
  - PIL
  - cv2
  - load image
  - grayscale
---

# Processing Images with Pillow and OpenCV

  ## The Librarian's Choice: Pillow or OpenCV?
  If NumPy arrays are the raw ingredients (pixels), then **Pillow** and **OpenCV** are the kitchen tools that let us prepare them. 

  *   **Pillow (PIL)**: The "human-friendly" library. It is great for basic tasks like resizing, cropping, and saving images in different formats. It is very common in web development and basic DH scripts.
  *   **OpenCV (cv2)**: The "computer-vision" powerhouse. It is designed for high-performance analysis, like detecting faces in historical photos or identifying specific symbols in a manuscript.

  ---

  ## 1. The BGR "Trap"
  This is the most important thing to remember: **OpenCV reads colors in the order Blue-Green-Red (BGR)**, while almost every other library (including Pillow and Matplotlib) uses **Red-Green-Blue (RGB)**.

  If you load an image in OpenCV and display it in another tool without converting it, everyone will look like they are under blue moonlight!

  ```python
  import cv2

  # Load image
  img = cv2.imread("manuscript.jpg")

  # Convert from BGR to RGB so it looks correct in other tools
  img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  ```

  ---

  ## 2. Transforming the Frame
  In Digital Humanities, we often process thousands of images. We use code to **standardize** them so they all have the same dimensions.

  ### Resizing
  Note that OpenCV asks for **(Width, Height)**.
  ```python
  # Resize to 200 pixels wide and 100 pixels high
  resized = cv2.resize(img, (200, 100))
  ```

  ### Cropping
  Since OpenCV treats images as NumPy arrays, we crop using **Slicing**. Here, we use **[Rows, Columns]**, which is the same as **[Y, X]**.
  ```python
  # Crop from Row 50 to 150, and Column 20 to 100
  # crop = img[y1:y2, x1:x2]
  cropped = img[50:150, 20:100]
  ```

  ---

  ## 3. Grayscale: Simplifying the Signal
  Converting an image to grayscale removes color "noise." This is a standard step before performing **OCR (Optical Character Recognition)** because it allows the computer to focus on the contrast between the dark ink and the light page.

  ```python
  # OpenCV Grayscale
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

  # Pillow Grayscale
  from PIL import Image
  img_pil = Image.open("page.jpg").convert("L") # 'L' for Luminance
  ```

  :::tip
  **DH Use Case**: If you are studying a collection of 5,000 digitized 19th-century postcards, you can use these tools to automatically crop out the "stamp" area from every card to analyze the postal marks separately.
  :::

  :::challenge
  Because we are in a sandbox, we will create "synthetic images" using NumPy and then transform them. In Challenge 1, use OpenCV to resize a blue square. In Challenge 2, use Pillow to crop a red square.
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

  # Create a dummy image: 100x100 pixels, all Blue
  # OpenCV expects BGR, so Blue is [255, 0, 0]
  dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
  dummy_image[:, :] = [255, 0, 0]

  # 1. Resize the image to be 50 pixels wide by 50 pixels high
  # Store in variable 'resized_img'
  resized_img = 

  # 2. Convert the ORIGINAL 'dummy_image' to grayscale
  # Store in variable 'gray_img'
  gray_img = 

  # Your code here

  print(f"Resized shape: {resized_img.shape}")
  print(f"Grayscale shape: {gray_img.shape}")
  
```

#### Expected Output

```
Resized shape: (50, 50, 3)
Grayscale shape: (100, 100)
```

#### Hints

1. Use cv2.resize(dummy_image, (50, 50))
2. Use cv2.cvtColor(dummy_image, cv2.COLOR_BGR2GRAY) for grayscale.

#### Solution

```python
import cv2
  import numpy as np

  dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
  dummy_image[:, :] = [255, 0, 0]

  # 1. Resize
  resized_img = cv2.resize(dummy_image, (50, 50))

  # 2. Grayscale
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

  # Create a dummy 100x100 Red image
  img_array = np.zeros((100, 100, 3), dtype=np.uint8)
  img_array[:, :] = [255, 0, 0]
  img_pil = Image.fromarray(img_array)

  # Goal: Crop the image to the top-left 20x20 quadrant.
  # 1. Define a box: (left, upper, right, lower)
  # 2. Use the .crop() method on img_pil
  # 3. Store in 'cropped_img' and print its size

  # Your code here

  print(cropped_img.size)
  
```

#### Expected Output

```
(20, 20)
```

#### Hints

1. The crop box for the top-left 20x20 is (0, 0, 20, 20).
2. Syntax: cropped_img = img_pil.crop( (0, 0, 20, 20) )

#### Solution

```python
from PIL import Image
  import numpy as np

  img_array = np.zeros((100, 100, 3), dtype=np.uint8)
  img_array[:, :] = [255, 0, 0]
  img_pil = Image.fromarray(img_array)

  # Define box (left, upper, right, lower)
  box = (0, 0, 20, 20)

  # Crop
  cropped_img = img_pil.crop(box)

  print(cropped_img.size)
```

