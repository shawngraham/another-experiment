---
id: data-viz-06
title: Mapping Historical Data
moduleId: data-visualization
prerequisites:
  - data-viz-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Represent geographic locations as coordinate data in Python
  - Calculate distances between historical locations
  - Group and summarise spatial data to reveal geographic patterns
keywords:
  - mapping
  - geographic
  - coordinates
  - spatial
  - geolocation
---

# Mapping Historical Data

## Analogy

Think of a **pin board** in a detective's office. Each pin marks a location — a crime scene, a witness's home, a suspect's workplace. Strings connect the pins to show relationships. Now imagine doing this with thousands of historical events: the birthplaces of every author in a literary movement, the locations of every printing press in 18th-century Europe, or the routes of the Underground Railroad. **Geographic data analysis** lets you find spatial patterns that are invisible in a table of names and dates.

## Key Concepts

### Coordinates as Data

Every location on Earth can be described with two numbers: **latitude** (north-south position) and **longitude** (east-west position). In Python, we store these alongside the place name:

```python
locations = [
    {"place": "London", "lat": 51.5074, "lon": -0.1278},
    {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
    {"place": "Dublin", "lat": 53.3498, "lon": -6.2603},
]

for loc in locations:
    print(f"{loc['place']}: {loc['lat']:.2f}N, {abs(loc['lon']):.2f}W")
```

::: definition
**Geocoding**: The process of converting place names (like "Bath, England") into geographic coordinates (51.38, -2.36). Many historical datasets require geocoding before spatial analysis.
:::

### Measuring Distance

To find how far apart two locations are on the Earth's surface, we use the **Haversine formula**. This accounts for the Earth's curvature:

```python
import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in kilometres
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    return R * 2 * math.asin(math.sqrt(a))

dist = haversine(51.5074, -0.1278, 55.9533, -3.1883)
print(f"London to Edinburgh: {dist:.0f} km")
```

### Grouping by Region

Just as we group temporal data by decade, we can group spatial data by region, country, or custom bounding boxes to reveal geographic concentrations:

```python
locations_with_country = [
    {"place": "London", "country": "England"},
    {"place": "Bath", "country": "England"},
    {"place": "Edinburgh", "country": "Scotland"},
    {"place": "Dublin", "country": "Ireland"},
    {"place": "York", "country": "England"},
]

from collections import Counter
countries = Counter(loc["country"] for loc in locations_with_country)
for country, count in sorted(countries.items()):
    print(f"  {country}: {count}")
```

## Practice

::: try-it
Look up the coordinates of places important to your research. Add them to the locations list and compute distances between them. Do the distances surprise you?
:::

## Transfer

Spatial analysis in the humanities can reveal patterns like the geographic spread of a publishing network, migration routes of displaced communities, or the clustering of archaeological sites along ancient trade routes. Even without a full GIS tool, coordinate data and distance calculations let you ask and answer spatial questions computationally.

::: challenge
Given a set of locations relevant to Romantic-era authors, compute the distances between them and find the closest pair.
:::

---challenges---

### Challenge: Compute distances between literary locations

- id: data-viz-06-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
# Compute the distance between each pair of locations
# and identify the closest pair
import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    return round(R * 2 * math.asin(math.sqrt(a)))

locations = [
    {"place": "London", "lat": 51.5074, "lon": -0.1278},
    {"place": "Bath", "lat": 51.3758, "lon": -2.3599},
    {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
    {"place": "Geneva", "lat": 46.2044, "lon": 6.1432},
]

# 1. For each unique pair of locations, compute the distance
# 2. Print: "<Place A> to <Place B>: <distance> km"
#    (pairs in the order they appear when comparing each location
#     to every location after it in the list)
# 3. Print: "Closest: <Place A> and <Place B> (<distance> km)"

# Your code here
```

#### Expected Output

```
London to Bath: 150 km
London to Edinburgh: 534 km
London to Geneva: 747 km
Bath to Edinburgh: 562 km
Bath to Geneva: 814 km
Edinburgh to Geneva: 1082 km
Closest: London and Bath (150 km)
```

#### Hints

1. Use two nested loops: `for i in range(len(locations))` and `for j in range(i + 1, len(locations))` to get each unique pair without repeats.
2. Call `haversine(loc1["lat"], loc1["lon"], loc2["lat"], loc2["lon"])` for each pair.
3. Track the minimum distance and corresponding place names as you go through the pairs.

#### Solution

```python
import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    return round(R * 2 * math.asin(math.sqrt(a)))

locations = [
    {"place": "London", "lat": 51.5074, "lon": -0.1278},
    {"place": "Bath", "lat": 51.3758, "lon": -2.3599},
    {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
    {"place": "Geneva", "lat": 46.2044, "lon": 6.1432},
]

min_dist = float("inf")
min_pair = ("", "")

for i in range(len(locations)):
    for j in range(i + 1, len(locations)):
        a = locations[i]
        b = locations[j]
        d = haversine(a["lat"], a["lon"], b["lat"], b["lon"])
        print(f"{a['place']} to {b['place']}: {d} km")
        if d < min_dist:
            min_dist = d
            min_pair = (a["place"], b["place"])

print(f"Closest: {min_pair[0]} and {min_pair[1]} ({min_dist} km)")
```

### Challenge: Count locations by region

- id: data-viz-06-c2
- language: python
- difficulty: beginner

#### Starter Code

```python
# Group these historical publishing locations by country
# and print a summary
from collections import Counter

publishers = [
    {"city": "London", "country": "England", "year": 1818},
    {"city": "Edinburgh", "country": "Scotland", "year": 1820},
    {"city": "London", "country": "England", "year": 1826},
    {"city": "Paris", "country": "France", "year": 1831},
    {"city": "London", "country": "England", "year": 1835},
    {"city": "Dublin", "country": "Ireland", "year": 1840},
    {"city": "Paris", "country": "France", "year": 1842},
    {"city": "Edinburgh", "country": "Scotland", "year": 1845},
]

# 1. Count publications per country
# 2. Print each country and count sorted alphabetically
# Format: "<country>: <count>"
# 3. Print: "Most publications: <country>"

# Your code here
```

#### Expected Output

```
England: 3
France: 2
Ireland: 1
Scotland: 2
Most publications: England
```

#### Hints

1. Use `Counter(p["country"] for p in publishers)` to count publications per country.
2. Use `sorted(counts.items())` to iterate alphabetically and print each entry.
3. Use `counts.most_common(1)[0][0]` to get the country with the most publications.

#### Solution

```python
from collections import Counter

publishers = [
    {"city": "London", "country": "England", "year": 1818},
    {"city": "Edinburgh", "country": "Scotland", "year": 1820},
    {"city": "London", "country": "England", "year": 1826},
    {"city": "Paris", "country": "France", "year": 1831},
    {"city": "London", "country": "England", "year": 1835},
    {"city": "Dublin", "country": "Ireland", "year": 1840},
    {"city": "Paris", "country": "France", "year": 1842},
    {"city": "Edinburgh", "country": "Scotland", "year": 1845},
]

counts = Counter(p["country"] for p in publishers)
for country, count in sorted(counts.items()):
    print(f"{country}: {count}")
print(f"Most publications: {counts.most_common(1)[0][0]}")
```
