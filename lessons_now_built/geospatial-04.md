---
id: geospatial-04
title: Interactive Maps with Folium
moduleId: geospatial-analysis
prerequisites:
  - geospatial-03
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Create an interactive web map using Folium
  - Add markers and popups to a map
  - Understand the difference between static (Matplotlib) and slippy (Folium) maps
keywords:
  - folium
  - interactive
  - leaflet
  - markers
  - web mapping
---

# Interactive Maps with Folium

## Analogy

A Matplotlib plot is a **photograph**: it's static, you can't zoom in to see more detail.
A Folium map is a **window**: it's like embedding Google Maps into your Python code. You can drag, zoom, and click. This is often the final product you want to show on a DH project website.

## Key Concepts

### Creating a Map
Folium uses JavaScript (Leaflet.js) behind the scenes, but you write Python.

```python
import folium

# Center the map on a specific lat/lon (e.g., London)
m = folium.Map(location=[51.5074, -0.1278], zoom_start=12)

# Save it as an HTML file you can open in a browser
# m.save("london.html")
```

### Adding Markers
You can add pins to the map.

```python
folium.Marker(
    location=[51.5074, -0.1278],
    popup="London",
    tooltip="Click me!"
).add_to(m)
```

## Practice

::: try-it
If you are mapping a travel diary, you could create a loop that goes through every city visited and adds a Marker with the date of the visit in the popup.
:::

## Transfer

*   **Public History**: Create a walking tour map where users can click on buildings to read historical descriptions.
*   **Digital Editions**: A map embedded next to a text, showing the location of the places mentioned in the current chapter.

::: challenge
Initialize a map object centered on a specific location.
:::

---challenges---

### Challenge: Center the Map

- id: geospatial-04-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import folium

# 1. Create a folium Map centered on Coordinates [40.71, -74.00] (New York City)
# Set zoom_start to 10
# Assign it to variable 'nyc_map'

# Your code here

# Check attributes
print(nyc_map.location)
print(nyc_map.options['zoom'])
```

#### Expected Output

```
[40.71, -74.0]
10
```

#### Hints

1. `folium.Map(location=[lat, lon], zoom_start=num)`
2. Ensure the coordinates are a list `[...]`.

#### Solution

```python
import folium

# Create map
nyc_map = folium.Map(location=[40.71, -74.00], zoom_start=10)

print(nyc_map.location)
print(nyc_map.options['zoom'])
```

### Challenge: Adding a Marker

- id: geospatial-04-c2
- language: python
- difficulty: intermediate

#### Starter Code

```python
import folium

m = folium.Map(location=[0, 0], zoom_start=2)

# 1. Define a list of locations
# Each item is [lat, lon, name]
locations = [
    [48.85, 2.35, "Paris"],
    [41.90, 12.49, "Rome"]
]

# 2. Loop through 'locations'
# For each city, create a folium.Marker
# Use the lat/lon for 'location'
# Use the name for 'popup'
# Add it to map 'm'

# Your code here

# Check if markers were added (internal structure check)
print(len(m._children))
```

#### Expected Output

```
3
```

#### Hints

1. `for loc in locations:`
2. `folium.Marker(location=[loc[0], loc[1]], popup=loc[2]).add_to(m)`
3. The expected output is 3 because the Map itself has a "tile_layer" as one child, plus 2 markers = 3 children.

#### Solution

```python
import folium

m = folium.Map(location=[0, 0], zoom_start=2)

locations = [
    [48.85, 2.35, "Paris"],
    [41.90, 12.49, "Rome"]
]

for city in locations:
    folium.Marker(
        location=[city[0], city[1]], 
        popup=city[2]
    ).add_to(m)

# The map 'm' contains the base tiles + 2 markers
print(len(m._children))
```