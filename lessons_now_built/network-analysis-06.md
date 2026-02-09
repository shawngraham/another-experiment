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
  - Understand why CSV is the standard interchange format for network data
  - Use Pandas to load tabular data into a DataFrame
  - Convert a DataFrame into a Graph using nx.from_pandas_edgelist
keywords:
  - csv
  - pandas
  - dataframe
  - import
  - reproducibility
---

# From Spreadsheets to Networks

## Analogy

Imagine trying to organize a wedding seating chart. You wouldn't write the name of every guest on a separate sticky note and then manually draw lines between them on a wall one by one. You would likely start with a spreadsheet: Column A is "Guest", Column B is "Must Sit Next To".

In the previous lessons, we manually typed `G.add_edge("Romeo", "Juliet")`. This is fine for 5 connections, but impossible for 5,000. In Digital Humanities, your data almost always lives in a spreadsheet (CSV) first. We need a bridge between the "Row & Column" world and the "Node & Edge" world.

## Key Concepts

### The Data Structure
To build a network from a spreadsheet, your data usually needs to be formatted as an **Edge List**. This means every row represents *one connection*.

| Source (Who) | Target (Whom) | Weight (Strength) |
| :--- | :--- | :--- |
| Romeo | Juliet | 10 |
| Tybalt | Mercutio | 5 |

### The Bridge: Pandas
We use the **Pandas** library (which you may have seen in the *Structured Data* module) to read the CSV, and then a specific NetworkX helper function to convert it.

```python
import pandas as pd
import networkx as nx

# 1. Load the data
# df = pd.read_csv("my_network_data.csv")

# For this example, we'll create the DataFrame manually
data = {
    'Source': ['Romeo', 'Tybalt'],
    'Target': ['Juliet', 'Mercutio'],
    'Weight': [10, 5]
}
df = pd.DataFrame(data)

# 2. Convert to NetworkX Graph
# We must tell it which column is the 'source' and which is the 'target'
G = nx.from_pandas_edgelist(df, source='Source', target='Target')

print(G.edges)
```

### Why do this?
1.  **Scale**: You can load millions of edges instantly.
2.  **Reproducibility**: You don't edit code to add data; you just update the CSV file.
3.  **Attributes**: You can easily bring in extra data (like "Weight" or "Date") as edge attributes.

## Practice

::: try-it
Visualize your email inbox. If you exported your "Sent" folder to a CSV with columns "From" and "To", could you load it into NetworkX? Who would be the central node? (Probably you!)
:::

## Transfer

*   **Historians**: Load a CSV of "Member Name" and "Organization Name" to see which organizations bridged different political groups.
*   **Linguists**: Load a CSV of "Word A" and "Word B" where the rows represent words appearing in the same sentence.

::: challenge
Convert a raw dataset into a graph object.
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

# Imagine this data came from 'letters.csv'
raw_data = {
    'Sender': ['Virginia Woolf', 'Vita Sackville-West', 'T.S. Eliot'],
    'Recipient': ['Vita Sackville-West', 'Virginia Woolf', 'Ezra Pound'],
    'Date': ['1925', '1926', '1922']
}

# 1. Create a Pandas DataFrame from the raw_data dictionary
# Name it 'df'

# 2. Create a Graph 'G' from this DataFrame
# Use the function nx.from_pandas_edgelist
# Map 'Sender' to source and 'Recipient' to target

# Your code here

# Check result
print(list(G.edges))
```

#### Expected Output

```
[('Virginia Woolf', 'Vita Sackville-West'), ('Vita Sackville-West', 'Virginia Woolf'), ('T.S. Eliot', 'Ezra Pound')]
```

#### Hints

1. `df = pd.DataFrame(raw_data)`
2. `nx.from_pandas_edgelist(df, source='...', target='...')`
3. Make sure column names match exactly ('Sender', 'Recipient').

#### Solution

```python
import pandas as pd
import networkx as nx

raw_data = {
    'Sender': ['Virginia Woolf', 'Vita Sackville-West', 'T.S. Eliot'],
    'Recipient': ['Vita Sackville-West', 'Virginia Woolf', 'Ezra Pound'],
    'Date': ['1925', '1926', '1922']
}

# 1. Create DataFrame
df = pd.DataFrame(raw_data)

# 2. Convert to Graph
G = nx.from_pandas_edgelist(df, source='Sender', target='Recipient')

print(list(G.edges))
```

### Challenge: Weighted Edges

- id: network-analysis-06-c2
- language: python
- difficulty: advanced

#### Starter Code

```python
import pandas as pd
import networkx as nx

# Data: Cities and the distance between them (in km)
travel_data = {
    'City_A': ['Paris', 'Berlin', 'Paris'],
    'City_B': ['Berlin', 'Warsaw', 'London'],
    'Distance': [878, 517, 344]
}

df = pd.DataFrame(travel_data)

# 1. Create a graph G from the DataFrame
# Ensure you include 'Distance' as an edge attribute.
# Look at the documentation (or hints) for the 'edge_attr' parameter.

# Your code here

# 2. Access the distance between Paris and Berlin
# (This part is done for you to check your work)
if G.has_edge('Paris', 'Berlin'):
    print(G['Paris']['Berlin']['Distance'])
```

#### Expected Output

```
878
```

#### Hints

1. `nx.from_pandas_edgelist(df, source='City_A', target='City_B', edge_attr='Distance')`
2. `edge_attr` takes the string name of the column you want to save as metadata.
3. If you don't include `edge_attr`, the graph won't know the distances!

#### Solution

```python
import pandas as pd
import networkx as nx

travel_data = {
    'City_A': ['Paris', 'Berlin', 'Paris'],
    'City_B': ['Berlin', 'Warsaw', 'London'],
    'Distance': [878, 517, 344]
}

df = pd.DataFrame(travel_data)

# Create graph with attributes
G = nx.from_pandas_edgelist(
    df, 
    source='City_A', 
    target='City_B', 
    edge_attr='Distance'
)

if G.has_edge('Paris', 'Berlin'):
    print(G['Paris']['Berlin']['Distance'])
```