---
id: geospatial-04
title: Interactive Maps with Folium
moduleId: geospatial-analysis
prerequisites:
  - geospatial-03
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Create an interactive "slippy" web map using Folium
  - Add markers
  - popups
  - and tooltips to represent archival data
  - Understand the difference between static (Matplotlib) and interactive (Leaflet/Folium) maps
  - Navigate the "Latitude/Longitude" vs "X/Y" coordinate order discrepancy
keywords:
  - folium
  - interactive
  - leaflet
  - markers
  - web mapping
  - public history
---

# Interactive Maps with Folium: The Digital Exhibit

  ## Analogy
  A Matplotlib map is a **photograph**: it is static and captured at a specific scale. To see more detail, you would need to take a new "photo."

  A Folium map is a **window**: it is an interactive portal into your data. Users can drag, zoom, and click on "pins" to reveal deeper layers of information. This is often the final product you want to embed on a Digital Humanities project website or an online archive.

  :::tip
  Folium does not work in our sandbox. Folium produces Leaflet.js-based maps that need to be saved as .html files and opened in a browser. But, if you are working on your own computer with python installed you can add folium to your environment (with the `pip install folium` command) and run this code to generate the necessary html.
  :::

  ---

  ## 1. Creating a "Slippy" Map
  Folium is a Python wrapper for a JavaScript library called **Leaflet.js**. It creates "slippy maps"—maps made of tiny square tiles that load as you move around.

  ```python
  import folium

  # Center the map on London
  # Note the order: [Latitude, Longitude]
  m = folium.Map(location=[51.5074, -0.1278], zoom_start=12, tiles="OpenStreetMap")

  # In a local environment, you would save this as an HTML file:
  # m.save("index.html")
  ```

  ---

  ## 2. Adding Interaction: Markers and Popups
  In DH, we use **Markers** to represent specific points of interest—the location of a historical event, the birthplace of an author, or the site of a demolished building.

  - **Popup**: Text that appears when you **click** a marker.
  - **Tooltip**: Text that appears when you **hover** over a marker.

  ```python
  folium.Marker(
      location=[51.5074, -0.1278],
      popup="<b>London</b><br>Historical center of the British Empire.",
      tooltip="Click for more info"
  ).add_to(m)
  ```

  ---

  ## 3. The Great Coordinate Flip ⚠️
  This is the most common error in Geospatial Python:
  - **Shapely/GeoPandas** (Mathematical): Uses **(Longitude, Latitude)** or (X, Y).
  - **Folium/Leaflet** (Navigational): Uses **[Latitude, Longitude]**.

  If your points are appearing in the wrong hemisphere, you likely have your coordinates in the wrong order for the library you are using.

  ---

  ## 4. Public History and Storytelling
  Interactive maps are the backbone of "Deep Mapping" projects. By allowing a user to zoom in from a national view to a street-level view, you enable them to move between **Distant Reading** (patterns) and **Close Reading** (specific stories in popups).

  :::tip
  **DH Use Case**: If you are sonifying a travel diary, you could create a loop that goes through every city visited and adds a Marker. In the popup, you could include the date of the visit and a link to the digitized page of the diary.
  :::

  :::challenge
  In the first challenge, initialize a map centered on New York. In the second, use a loop to programmatically add multiple markers to a single map object.
  :::

---challenges---
