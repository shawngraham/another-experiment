---
id: data-viz-06
title: Mapping Historical Data
moduleId: data-visualization
prerequisites:
  - data-viz-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Represent geographic locations as coordinate data (latitude/longitude) in Python
  - Understand the Haversine formula for calculating distance on a sphere
  - Execute nested loops to compare spatial relationships between multiple points
  - Summarize geographic distributions using Counter objects
keywords:
  - mapping
  - geographic
  - coordinates
  - spatial
  - geolocation
  - haversine
---

# Mapping Historical Data

  ## The Detective's Pin Board
  Think of a **pin board** in a detective's office. Each pin marks a location—a crime scene, a witness's home, or a suspect's workplace. Strings connect the pins to show relationships and movement. 

  In the Digital Humanities, we do this with thousands of historical events: the birthplaces of authors in a movement, the locations of every printing press in 18th-century Europe, or the stops along a trade route. **Geographic analysis** lets you find spatial patterns—like clusters of activity or vast "silences"—that are invisible in a simple table of names.

  ---

  ## 1. Coordinates as Data
  Every location on Earth is described by two numbers: **Latitude** (North-South) and **Longitude** (East-West). In DH, we store these as "Decimal Degrees."

  ```python
  locations = [
      {"place": "London", "lat": 51.5074, "lon": -0.1278},
      {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
  ]

  # Accessing longitude:
  print(locations[0]["lon"]) # Output: -0.1278
  ```

  :::definition
  **Geocoding**: The process of converting place names (like "Bath, England") into coordinates (51.38, -2.36). Most historical datasets require this cleaning step before you can map them.
  :::

  ---

  ## 2. Measuring Distance (The Haversine Formula)
  Because the Earth is a sphere, we can't use a simple ruler to measure the distance between two points. We use the **Haversine formula**, which accounts for the curvature of the planet.

  In Python, we use the `math` library to convert our degrees into **radians** before doing the calculation.

  ```python
  import math

  def haversine(lat1, lon1, lat2, lon2):
      R = 6371  # Earth's radius in kilometers
      # ... (Math happens here) ...
      return distance_in_km
  ```

  ---

  ## 3. Comparing Every Pair (Nested Loops)
  To find the "Closest Pair" in a list of cities, we have to compare every city to every other city. We use a **Nested Loop**:
  - The **Outer Loop** picks the first city.
  - The **Inner Loop** iterates through all the *remaining* cities.

  ```python
  for i in range(len(locations)):
      for j in range(i + 1, len(locations)):
          # Compare locations[i] and locations[j]
  ```

  ---

  ## 4. Grouping by Region
  Just as we group temporal data by decade, we group spatial data by country or city to see where "power centers" of culture lie. 

  :::tip
  **Spatial Ethics**: Remember that coordinates suggest a precision that historical records often lack. If a 17th-century letter is labeled "South of the River," placing a pin at a specific coordinate is a scholarly *interpretation*, not a neutral fact.
  :::

  :::challenge
  In the first challenge, use nested loops to calculate the distances between four literary cities and find which two are closest. In the second, summarize the geography of a publishing dataset.
  :::

---challenges---
