---
id: geospatial-03
title: Plotting Maps
moduleId: geospatial-analysis
prerequisites:
  - geospatial-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Create static maps using the GeoDataFrame .plot() method
  - Generate Choropleth maps to visualize variables across regions
  - Layer multiple spatial datasets using Matplotlib Axes
  - Perform CRS transformations to calculate accurate geometric area
keywords:
  - matplotlib
  - plot
  - choropleth
  - mapping
  - visualization
  - to_crs
---

# Plotting Maps: Visualizing Spatial Arguments

  ## Analogy
  If `print(gdf)` gives you the raw numbers, `gdf.plot()` gives you the evidence. 

  Think of mapping as using **transparency sheets**. If you have one sheet for "Country Boundaries" and another for "Locations of 18th Century Printing Presses," you can stack them on top of each other. This allows you to see the relationship between political borders and technological spread.

  ---

  ## 1. Basic Plotting
  GeoPandas uses **Matplotlib** as its engine. The simplest way to see your data is the `.plot()` method.

  ```python
  # This draws the shapes in the geometry column
  gdf.plot()
  ```

  ---

  ## 2. Choropleth Maps: Color-Coding History
  A **Choropleth** map colors regions based on a value in your data (like population, literacy rates, or the number of manuscripts found in a region).

  ```python
  # Color countries by 'population' and add a legend (color bar)
  world.plot(column='pop_est', legend=True, cmap='OrRd')
  ```

  ---

  ## 3. Layering Data
  To show points (cities) on top of polygons (countries), you have to tell both plot commands to use the same "drawing board" or **axis (ax)**.

  ```python
  import matplotlib.pyplot as plt

  fig, ax = plt.subplots(figsize=(10, 6))

  # 1. Plot the base layer (the map) on ax
  countries.plot(ax=ax, color='lightgrey')

  # 2. Plot the second layer (the points) on the SAME ax
  cities.plot(ax=ax, color='red', markersize=10)

  plt.show()
  ```

  ---

  ## 4. The "Projection" Trap: Calculating Area
  In Digital Humanities, we often want to measure things: *"How big was this empire?"* or *"What is the density of monasteries in this valley?"*

  If your data is in **EPSG:4326** (Latitude/Longitude), calculations will be wrong because degrees are not a consistent unit of distance (a degree is wider at the equator than the poles). To calculate area, you must **project** your data into a system that uses **meters**.

  ```python
  # Convert to a Mercator projection (meters)
  gdf_meters = gdf.to_crs("EPSG:3395")

  # Now calculate area (in square meters)
  gdf_meters['area_sqm'] = gdf_meters.area
  ```

  :::tip
  **DH Use Case**: By layering a map of "Cholera Deaths" over a map of "Water Pumps," John Snow famously discovered the source of an 1854 outbreak. Layering is how we find **spatial correlation**.
  :::

  :::challenge
  In the first challenge, generate a plot object. In the second, perform a CRS transformation to calculate the area of a region in meters.
  :::

---challenges---
