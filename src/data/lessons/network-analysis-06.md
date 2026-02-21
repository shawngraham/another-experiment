---
id: network-analysis-06
title: From Spreadsheets to Networks
moduleId: network-analysis
prerequisites:
  - network-analysis-05
  - structured-data-01
estimatedTimeMinutes: 25
difficulty: intermediate
learningObjectives:
  - Understand the Edge List format as the standard for network data exchange
  - Use Pandas to load and clean tabular data for network construction
  - Convert a DataFrame into a Graph using nx.from_pandas_edgelist
  - Attach metadata to connections using edge attributes
keywords:
  - csv
  - pandas
  - dataframe
  - import
  - reproducibility
  - edge list
---

# From Spreadsheets to Networks: The Data Pipeline

  ## Analogy: The Seating Chart
  Imagine trying to organize a wedding seating chart. You wouldn't write the name of every guest on a separate sticky note and then manually draw 500 lines between them. You would likely start with a spreadsheet: Column A is "Guest," Column B is "Knows."

  In previous lessons, we manually typed `G.add_edge("Romeo", "Juliet")`. This is fine for five connections, but impossible for 5,000. In Digital Humanities, your research data almost always lives in a spreadsheet (CSV) first. We need a bridge between the **"Row & Column"** world of spreadsheets and the **"Node & Edge"** world of networks.

  ---

  ## 1. The Edge List Format
  To build a network from a spreadsheet, your data must be formatted as an **Edge List**. This means every row represents exactly **one connection**.

  | Source (From) | Target (To) | Weight (Strength/Years) |
  | :--- | :--- | :--- |
  | Virginia Woolf | T.S. Eliot | 15 |
  | T.S. Eliot | Ezra Pound | 22 |

  ---

  ## 2. The Bridge: `from_pandas_edgelist`
  We use the **Pandas** library to read the CSV, and then use a NetworkX helper function to convert that table into a "living" graph.

  ```python
  import pandas as pd
  import networkx as nx

  # 1. Load the data (Simulating a CSV load)
  data = {
      'Sender': ['Alice', 'Bob'],
      'Receiver': ['Bob', 'Charlie'],
      'Letters': [5, 12]
  }
  df = pd.DataFrame(data)

  # 2. Convert to Graph
  # We must specify which columns represent the 'source' and the 'target'
  G = nx.from_pandas_edgelist(df, source='Sender', target='Receiver', edge_attr='Letters')

  # Now 'Letters' is stored as an attribute on the edge
  print(G['Alice']['Bob']['Letters']) # Output: 5
  ```

  ---

  ## 3. Why This Matters for DH
  1.  **Scale**: You can load an archive of 50,000 historical letters in milliseconds.
  2.  **Reproducibility**: If you find a new box of letters, you don't edit your code; you just add rows to your CSV and re-run the script.
  3.  **Rich Metadata**: By using the `edge_attr` parameter, you can attach dates, locations, or sentiment scores to every connection in your web.

  :::tip
  **DH Pro-Tip**: When creating your CSV, ensure your "Source" and "Target" columns use consistent names. If you have "V. Woolf" in one row and "Virginia Woolf" in another, the computer will create two different nodes for the same person!
  :::

  :::challenge
  In Challenge 1, you will build a correspondence network from a raw dataset. In Challenge 2, you will learn to attach "Distance" as an attribute to your edges.
  :::

---challenges---

### Challenge: The Import Pipeline

- id: network-analysis-06-c1
- language: python
- difficulty: intermediate

#### Starter Code

```python
import pandas as pd
  import networkx as nx

  # Imagine this data was loaded from 'bloomsbury_group.csv'
  raw_data = {
      'Sender': ['Virginia Woolf', 'Vita Sackville-West', 'T.S. Eliot'],
      'Recipient': ['Vita Sackville-West', 'Virginia Woolf', 'Ezra Pound']
  }

  # Goal: Create a Graph 'G' from this data
  # 1. Convert 'raw_data' into a Pandas DataFrame named 'df'
  # 2. Use nx.from_pandas_edgelist() to create the graph
  # 3. Specify 'Sender' as the source and 'Recipient' as the target

  # Your code here

  # Verify the edges
  print(list(G.edges))
  
```

#### Expected Output

```
[('Virginia Woolf', 'Vita Sackville-West'), ('Vita Sackville-West', 'Virginia Woolf'), ('T.S. Eliot', 'Ezra Pound')]
```

#### Hints

1. Use df = pd.DataFrame(raw_data) to start.
2. The function is G = nx.from_pandas_edgelist(df, source="...", target="...")
3. Ensure your strings match the dictionary keys exactly.

#### Solution

```python
import pandas as pd
  import networkx as nx

  raw_data = {
      'Sender': ['Virginia Woolf', 'Vita Sackville-West', 'T.S. Eliot'],
      'Recipient': ['Vita Sackville-West', 'Virginia Woolf', 'Ezra Pound']
  }

  # 1. Create DataFrame
  df = pd.DataFrame(raw_data)

  # 2. Create Graph
  G = nx.from_pandas_edgelist(df, source='Sender', target='Recipient')

  print(list(G.edges))
```

### Challenge: Attaching Edge Attributes

- id: network-analysis-06-c2
- language: python
- difficulty: advanced

#### Starter Code

```python
import pandas as pd
  import networkx as nx

  # Data: Historical travel routes and their distances
  travel_data = {
      'City_A': ['Paris', 'Berlin', 'London'],
      'City_B': ['Berlin', 'Warsaw', 'Paris'],
      'Distance': [878, 517, 344]
  }

  df = pd.DataFrame(travel_data)

  # Goal: Create a graph G that includes 'Distance' as an edge attribute
  # 1. Use nx.from_pandas_edgelist
  # 2. Set edge_attr='Distance'
  # 3. Print the Distance value for the edge between 'Paris' and 'Berlin'

  # Your code here

  # Verification check
  if G.has_edge('Paris', 'Berlin'):
      print(G['Paris']['Berlin']['Distance'])
  
```

#### Expected Output

```
878
```

#### Hints

1. The edge_attr parameter allows you to pass a column name or a list of names.
2. To access edge data, use G[node1][node2][attribute_name].
3. Make sure you created the graph with the Distance column attached!

#### Solution

```python
import pandas as pd
  import networkx as nx

  travel_data = {
      'City_A': ['Paris', 'Berlin', 'London'],
      'City_B': ['Berlin', 'Warsaw', 'Paris'],
      'Distance': [878, 517, 344]
  }

  df = pd.DataFrame(travel_data)

  # Create the graph with 'Distance' as metadata on the edges
  G = nx.from_pandas_edgelist(
      df, 
      source='City_A', 
      target='City_B', 
      edge_attr='Distance'
  )

  # Print attribute
  if G.has_edge('Paris', 'Berlin'):
      print(G['Paris']['Berlin']['Distance'])
```

