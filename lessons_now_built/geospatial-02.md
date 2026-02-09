---
id: geospatial-02
title: Intro to GeoPandas
moduleId: geospatial-analysis
prerequisites:
  - geospatial-01
  - structured-data-02
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Load spatial data (Shapefiles or GeoJSON) into a GeoDataFrame
  - Inspect the special 'geometry' column
  - Filter spatial data based on attributes
keywords:
  - geopandas
  - geodataframe
  - shapefile
  - geojson
  - reading data
---

# Intro to GeoPandas

## Analogy

You already know **Pandas**, which gives you a super-powered spreadsheet (DataFrame).
**GeoPandas** is the exact same tool, but it adds a magic column at the end: `geometry`.
While normal columns hold text or numbers, the `geometry` column holds shapes (Polygons for countries, Lines for rivers, Points for cities).

## Key Concepts

### The GeoDataFrame
It looks like a DataFrame, acts like a DataFrame, but creates maps.

```python
import geopandas as gpd

# Reading a file (GeoJSON, Shapefile, Geopackage)
gdf = gpd.read_file("countries.geojson")

# It has a head() just like pandas
print(gdf.head())
```

### The Geometry Column
This column is special. It contains the Shapely objects we learned about in the last lesson.

```python
# Access just the geometry
print(gdf.geometry.head())
```

### Active CRS
A GeoDataFrame knows its coordinate system. You can check it with `.crs`. If your map looks distorted, you might need to convert it using `.to_crs()`.

```python
print(gdf.crs) 
# Output: "EPSG:4326"
```

## Practice

::: try-it
If you have a CSV with "Lat" and "Lon" columns, GeoPandas won't automatically know it's spatial. You have to tell it to zip those two columns into a Point!
:::

## Transfer

*   **Urban Studies**: Load a Shapefile of city zoning districts to calculate the area of residential vs commercial zones.

::: challenge
Load and inspect a built-in dataset.
:::

---challenges---

### Challenge: Loading the World

- id: geospatial-02-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import geopandas as gpd

# GeoPandas comes with a tiny dataset called 'naturalearth_lowres'
dataset_path = gpd.datasets.get_path('naturalearth_lowres')

# 1. Read this file into a variable named 'world'
world = None

# Your code here

# 2. Print the type of the object to verify it's a GeoDataFrame
print(type(world).__name__)
```

#### Expected Output

```
GeoDataFrame
```

#### Hints

1. Use `gpd.read_file(dataset_path)`.
2. Ensure you assign it to the variable `world`.

#### Solution

```python
import geopandas as gpd

dataset_path = gpd.datasets.get_path('naturalearth_lowres')

# Read file
world = gpd.read_file(dataset_path)

print(type(world).__name__)
```

### Challenge: Filtering by Attribute

- id: geospatial-02-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import geopandas as gpd

# We load the world dataset again
path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# 1. Filter the 'world' GeoDataFrame to select only the row where 'name' is "Egypt"
# Store this in a new variable called 'egypt'

# Your code here

# Verify
print(egypt['name'].values[0])
```

#### Expected Output

```
Egypt
```

#### Hints

1. This is standard Pandas filtering: `df[df['column'] == 'Value']`.
2. The column name is `'name'`.

#### Solution

```python
import geopandas as gpd

path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# Filter
egypt = world[world['name'] == 'Egypt']

print(egypt['name'].values[0])
```