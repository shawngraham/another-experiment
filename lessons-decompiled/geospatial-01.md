---
id: geospatial-01
title: Coordinates and Projections
moduleId: geospatial-analysis
prerequisites:
  - structured-data-05
estimatedTimeMinutes: 20
difficulty: beginner
learningObjectives:
  - Explain the difference between geographic (Lat/Lon) and projected coordinate systems
  - Create geometric objects (Points) using the Shapely library
  - Understand why the order of coordinates (x
  - y) matters in GIS software
  - Identify common EPSG codes used in Digital Humanities
keywords:
  - gis
  - coordinates
  - shapely
  - crs
  - projection
---

# Coordinates and Projections: Flattening the World

  ## The Orange Peel Problem
  Imagine trying to peel an orange and flatten the peel perfectly onto a rectangular table. It is impossible to do so without tearing or stretching the skin. 

  This is the fundamental problem of map-making: the Earth is a three-dimensional sphere, but our screens and printed pages are two-dimensional flats. To solve this, we use **Projections**.

  ---

  ## 1. Geographic vs. Projected Systems

  ### Geographic Coordinates (Lat/Lon)
  These treat the earth like a sphere. Points are measured in **degrees** based on their angle from the center of the earth.
  *   **Unit**: Degrees
  *   **Standard**: EPSG:4326 (The "GPS" standard)

  ### Projected Coordinates
  The "orange peel" has been flattened mathematically. Points are measured in linear units like **meters**. This is necessary if you want to calculate the area of a historical site or the length of a trade route accurately.
  *   **Unit**: Meters
  *   **Standard**: EPSG:3857 (The "Web Map" standard used by Google Maps)

  ---

  ## 2. Geometry as Data (Shapely)
  In Digital Humanities, we don't just treat locations as two separate columns in a spreadsheet. We treat them as **Geometric Objects**. The library **Shapely** is a common tool (nb, not the only tool!) for creating these objects in Python.

  ```python
  from shapely.geometry import Point

  # IMPORTANT: GIS software almost always expects (x, y)
  # x = Longitude (East/West)
  # y = Latitude (North/South)
  # This represents Paris:
  paris = Point(2.35, 48.85)

  print(paris) # Output: POINT (2.35 48.85)
  ```

  :::warning
  **The Lon/Lat Trap**: Most people say "Latitude and Longitude." But mathematically, Longitude is the horizontal axis (**X**) and Latitude is the vertical axis (**Y**). If you put Latitude first in a `Point()\

---challenges---
