---
id: data-viz-09
title: Topographies of Information: 3D Data Sculptures
moduleId: data-visualization
prerequisites:
  - data-viz-08
estimatedTimeMinutes: 60
difficulty: intermediate
learningObjectives:
  - Understand the STL file format and the Z-axis as a data variable
  - Transform a 1D time-series into a 3D "mountain range" geometry
  - Critique the "legibility" of data when converted into tactile
  - 3D forms
keywords:
  - 3D-printing
  - STL
  - topography
  - haptics
  - extrusion
---

# Topographies of Information: 3D Data Sculptures

## Analogy

A standard line graph is like a silhouette—it shows you the outline of a trend against a flat wall. A **3D Data Sculpture** is the object itself. 

Imagine taking a 2D line graph of topic proportions over time (see the topic modeling lessons) and pulling the line out toward you, turning it into a solid wall or a mountain range. In 2D, we only have **X** (Time) and **Y** (Value). In 3D, we add **Z** (Depth). By turning data into a landscape, we can literally "feel" the steepness of a historical shift or the jaggedness of a volatile dataset.

## Key Concepts

To 3D print data, we usually need to generate an **STL** file. 

:::definition
**STL (Standard Tessellation Language)**: A file format that describes the surface geometry of a 3D object as a raw, unstructured grid of triangles. It is the "PDF" of the 3D printing world.
:::

### The Z-Axis as Data
In Digital Humanities, we often use the **Z-axis** (height) to represent intensity. 
*   **Historical Trends**: X is years, Y is a constant width, and Z is the frequency of a word. The result is a "ridge" of history.
*   **Geospatial Data**: X and Y are coordinates, and Z is population density. The result is a "Topographical Map" of human activity.

### Building a Mesh with Code
Using the `numpy-stl` library, we define "vertices" (points in 3D space) and "faces" (the triangles that connect them).

```python
from stl import mesh
import numpy as np

# Define a single triangle in 3D space
# Each point is [X, Y, Z]
vertices = np.array([
    [0, 0, 0], # Point 0
    [1, 0, 0], # Point 1
    [0, 1, 5]  # Point 2 (The 'peak' at Z=5)
])

# Define the face (which vertices make the triangle)
faces = np.array([[0, 1, 2]])

# Create the mesh object
data_sculpture = mesh.Mesh(np.zeros(faces.shape[0], dtype=mesh.Mesh.dtype))
for i, f in enumerate(faces):
    for j in range(3):
        data_sculpture.vectors[i][j] = vertices[f[j],:]
```

## Practice

:::try-it
Look at a simple line graph. If you were to close your eyes and run your hand over it, which "peaks" would feel the sharpest? If you 3D printed a PCA plot (which groups similar texts together), the "clusters" would feel like huddles of towers. How does the *distance* between those towers feel different than a dot on a screen?
:::

## Transfer

When we turn data into a "landscape," we are engaging in **Haptic Data Visualization**. This is particularly important for accessibility (making data legible for the visually impaired) and for "Data Publics." A 3D sculpture in a museum invites people to walk around it, viewing the data from angles the original researcher might have missed.

:::challenge
In the challenges in the code window, you will calculate the 3D coordinates (X, Y, Z) for a data-driven "mountain range."
:::

---challenges---
