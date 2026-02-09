---
id: geospatial-03
title: Plotting Maps
moduleId: geospatial-analysis
prerequisites:
  - geospatial-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Create static maps using the .plot() method
  - Color-code maps based on data (Choropleth maps)
  - Layer multiple spatial datasets on one plot
keywords:
  - matplotlib
  - plot
  - choropleth
  - mapping
  - visualization
---

# Plotting Maps

## Analogy

If `print(df)` gives you the raw numbers, `gdf.plot()` gives you the picture. It's like turning your spreadsheet of coordinates into a transparency sheet. If you have two transparency sheets (one for rivers, one for cities), you can stack them on top of each other to see the relationships.

## Key Concepts

### Basic Plotting
GeoPandas integrates with Matplotlib.

```python
# Plots the geometry
gdf.plot()
```

### Choropleth Maps
A choropleth map colors regions based on a value (like population).

```python
# Color countries by 'pop_est' (population estimate)
world.plot(column='pop_est', legend=True)
```

### Layering
To plot two things together (e.g., capitals on top of countries), we use Matplotlib's "axis" object.

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()

# 1. Plot the base layer (countries) on axis 'ax'
countries.plot(ax=ax, color='lightgrey')

# 2. Plot the top layer (cities) on the SAME axis
cities.plot(ax=ax, color='red', markersize=5)

plt.show()
```

## Practice

::: try-it
Imagine a map of ancient Rome. You could plot the city outline in grey, and the location of temples as red dots on top.
:::

## Transfer

*   **Political History**: Color a map of voting districts based on election results (a choropleth).
*   **Environmental Humanities**: Plot the path of a river over a map of industrial sites to visualize potential pollution sources.

::: challenge
Create a simple plot command.
:::

---challenges---

### Challenge: The First Map

- id: geospatial-03-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import geopandas as gpd
# (In a real script, we would import matplotlib.pyplot as plt too)

path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# 1. The 'world' dataframe has a column named 'pop_est'.
# We want to verify that we can access the plotting interface.
# We cannot actually render the image in this checker, 
# so we will check the object returned by the plot method.

# Call .plot() on 'world' with the argument column='pop_est'
# Assign the result to a variable named 'ax'

# Your code here

# Check if it returned an Axes object
print(type(ax).__name__)
```

#### Expected Output

```
AxesSubplot
```

#### Hints

1. `ax = world.plot(...)`
2. Pass `column='pop_est'` inside the parentheses.

#### Solution

```python
import geopandas as gpd
path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# Generate the plot object
ax = world.plot(column='pop_est')

print(type(ax).__name__)
```

### Challenge: Calculating Area

- id: geospatial-03-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import geopandas as gpd

# Load world data
path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# 1. GeoPandas geometric objects have an 'area' property.
# However, 'world' is in degrees (EPSG:4326), so area calculations are meaningless (degrees squared).
# We must convert to a projected CRS first.
# Let's use World Mercator (EPSG:3395) for a rough estimate in meters.

# Convert 'world' to crs="EPSG:3395" and save as 'world_mercator'
# world_mercator = ...

# Calculate the area of the first country in this new dataframe
# first_area = world_mercator.area.iloc[0]

# Your code here

# Print the area (scientific notation is fine)
print(f"{first_area:.2e}")
```

#### Expected Output

```
6.99e+09
```

#### Hints

1. Use `world.to_crs("EPSG:3395")`.
2. Access the area using `.area`.
3. Use `.iloc[0]` to get the first one.

#### Solution

```python
import geopandas as gpd

path = gpd.datasets.get_path('naturalearth_lowres')
world = gpd.read_file(path)

# Convert CRS
world_mercator = world.to_crs("EPSG:3395")

# Calculate area
first_area = world_mercator.area.iloc[0]

# Note: The exact number depends on the dataset version, 
# but based on the provided hint output, we print the variable.
print(f"{first_area:.2e}")
```