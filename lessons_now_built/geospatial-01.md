---
id: geospatial-01
title: Coordinates and Projections
moduleId: geospatial-analysis
prerequisites:
  - structured-data-05
estimatedTimeMinutes: 20
difficulty: beginner
learningObjectives:
  - Understand the difference between geographic (lat/lon) and projected coordinate systems
  - Create geometric objects using the Shapely library
  - Explain why the same coordinates might appear in different places depending on the CRS
keywords:
  - gis
  - coordinates
  - shapely
  - crs
  - projection
---

# Coordinates and Projections

## Analogy

Imagine trying to peel an orange and flatten the peel perfectly onto a rectangular table. It's impossible without tearing or stretching it. This is the fundamental problem of map-making: the Earth is round (3D), but our screens are flat (2D).

To solve this, we use **Projections**.
1.  **Geographic Coordinates (Lat/Lon)**: Like angles from the center of the earth. Measured in degrees.
2.  **Projected Coordinates**: The orange peel flattened out. Measured in meters (or feet).

## Key Concepts

### Geometry as Data
In Python, we don't just treat locations as two separate numbers (columns for "lat" and "lon"). We treat them as a single geometric object. The library **Shapely** is the standard tool for this.

```python
from shapely.geometry import Point

# Longitude first (x), Latitude second (y)
# This represents Paris (approx 2.35 E, 48.85 N)
paris = Point(2.35, 48.85)

print(paris)
```

### Coordinate Reference Systems (CRS)
A coordinate is meaningless without context. If I say "Location 100, 100", that could be 100 degrees or 100 meters.
*   **EPSG:4326**: The standard for GPS (Latitude/Longitude). Unit: Degrees.
*   **EPSG:3857**: The standard for Web Maps (Google Maps, OpenStreetMap). Unit: Meters.

::: definition
**EPSG Code**: A unique ID number (like 4326) that tells software exactly which mathematical formula to use to flatten the earth.
:::

## Practice

::: try-it
Go to Google Maps, right-click anywhere, and copy the numbers. Those are EPSG:4326 coordinates.
:::

## Transfer

*   **History**: Mapping the spread of the plague requires knowing that medieval maps didn't use modern GPS coordinates.
*   **Archaeology**: recording the exact meter-grid location of a find within a trench requires a projected system, not just lat/lon.

::: challenge
Create a geometric Point representing a specific location.
:::

---challenges---

### Challenge: Point Creation

- id: geospatial-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
from shapely.geometry import Point

# 1. Create a Point object for the Pyramids of Giza.
# Longitude: 31.13
# Latitude: 29.97
# Remember: Point(x, y) usually means Point(Longitude, Latitude)

giza = None

# Your code here

# Check the type
print(giza.wkt)
```

#### Expected Output

```
POINT (31.13 29.97)
```

#### Hints

1. Import is already done.
2. `giza = Point(longitude_value, latitude_value)`
3. Ensure the order is (31.13, 29.97).

#### Solution

```python
from shapely.geometry import Point

# Create the point
giza = Point(31.13, 29.97)

print(giza.wkt)
```

### Challenge: Distance in Degrees

- id: geospatial-01-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
from shapely.geometry import Point

p1 = Point(0, 0)
p2 = Point(3, 4)

# 1. Calculate the Euclidean distance between p1 and p2 using the .distance() method
# This is simple geometry (Pythagorean theorem), not "true" earth distance yet.

dist = 0.0

# Your code here

print(dist)
```

#### Expected Output

```
5.0
```

#### Hints

1. `variable = object.distance(other_object)`
2. It's a 3-4-5 triangle.

#### Solution

```python
from shapely.geometry import Point

p1 = Point(0, 0)
p2 = Point(3, 4)

dist = p1.distance(p2)

print(dist)
```