---
id: data-viz-08
title: Cutting Through Data: Laser Cutting and Plotting
moduleId: data-visualization
prerequisites:
  - data-viz-07
estimatedTimeMinutes: 50
difficulty: intermediate
learningObjectives:
  - Distinguish between Raster and Vector graphics for physical fabrication
  - Use the `svgwrite` library to map metadata to geometric shapes
  - Conceptualize "Data Monuments" and the ethics of permanent data physicalization
keywords:
  - svg
  - vector
  - laser-cutting
  - fabrication
  - metadata
---

# Cutting Through Data: Laser Cutting and Plotting

## Analogy

Think of a **Raster** image (like a JPEG) as a painting made of millions of tiny dots of wet ink. If you zoom in, it gets blurry. A **Vector** image (like an SVG) is more like a set of architectural blueprints or a recipe: "Start at point A, move to point B, and draw a circle with a 5-inch radius." 

Because a laser cutter or a pen plotter follows a physical path, it cannot "see" pixels; it needs these mathematical "recipes" to know exactly where to cut into the wood or move the pen across the paper.

## Key Concepts

To move from metadata to a physical object, we use Python to generate **SVG (Scalable Vector Graphics)** files.

:::definition
**Vector Graphics**: Images defined by mathematical paths (points, lines, curves) rather than pixels. They can be scaled to any size without losing quality and are the standard format for fabrication.
:::

### Mapping Metadata to Geometry

When we laser cut metadata, we are creating a "Data Monument." We must decide which metadata fields control which geometric properties:
*   **X/Y Coordinates**: Can represent time (a timeline) or relationships (a map).
*   **Radius/Size**: Can represent importance, frequency, or volume.
*   **Stroke Weight**: Can represent the "strength" of a connection (common in network physicalization).

### Generating SVGs with Python

The `svgwrite` library allows us to "draw" with code.

```python
import svgwrite

# Create a drawing object
dwg = svgwrite.Drawing('output.svg', profile='tiny')

# Draw a circle: center at (100, 100), radius 50
# In laser cutting, a red stroke often signals a 'cut'
dwg.add(dwg.circle(center=(100, 100), r=50, stroke='red', fill='none'))

dwg.save()
```

## Practice

:::try-it
Imagine a dataset of book lengths. If you mapped the number of pages to the *radius* of a circle, a short poem would look like a tiny pinprick in the wood, while a massive encyclopedia would be a large hole. How does the "negative space" (the wood that is removed) change how you perceive the "missing" parts of a library?
:::

## Transfer

Physicalizing data in wood or metal moves it from a "temporary" screen to a "permanent" object. This invites us to think about **Data Biographies**. If you laser cut a chart showing historical inequality, that data now occupies a physical room. It has weight, it can be touched, and it will eventually decay. 

How does the *durability* of wood change the "story" of a dataset compared to a digital chart that can be deleted in one click?

:::challenge
In the challenges in the code window, you will generate the code for a "Data Bookmark" that maps the frequency of a keyword across different chapters.
:::

---challenges---
