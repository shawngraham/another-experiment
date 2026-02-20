---
id: network-analysis-05
title: 'Case Study: Character Networks'
moduleId: network-analysis
prerequisites:
  - network-analysis-03
estimatedTimeMinutes: 45
difficulty: intermediate
learningObjectives:
  - Process raw interaction lists into a NetworkX Graph object
  - Use Degree Centrality to mathematically identify a protagonist
  - Use Betweenness Centrality to identify "bridge" characters or gatekeepers
  - Apply the max() function with a key argument to extract top results from dictionaries
keywords:
  - case study
  - data cleaning
  - applied analysis
  - character networks
  - protagonist
---

# Case Study: Character Networks

  ## The Digital Detective
  We are now ready to play the role of digital detectives. Imagine you have found the playbill for a lost play in an archive. Whoever had this playbill took the time to mark every time two characters spoke to each other, and the nature of the scene. 

  By modeling this as a network, we can determine the "social structure" of the play. Who is the true protagonist? Who is the "broker" who connects the palace scenes to the street scenes? Network analysis allows us to answer these questions using math rather than intuition.

  ---

  ## 1. The DH Workflow
  A typical Network Analysis project follows these four steps:
  1.  **Ingestion**: Loading raw data (like a list of dialogue interactions).
  2.  **Modeling**: Deciding if the graph is Directed (who spoke first?) or Undirected (they both spoke).
  3.  **Analysis**: Running metrics like Centrality.
  4.  **Interpretation**: Turning those numbers back into a humanistic argument.

  ---

  ## 2. Extracting the "Winner"
  Centrality functions in NetworkX return a dictionary: `{"Hamlet": 0.8, "Ophelia": 0.4}`. To find the "most important" character, we need to find the **Key** with the **Maximum Value**.

  Python has a very efficient way to do this using the `max()` function:

  ```python
  centrality = {"Hero": 10, "Villain": 8, "Sidekick": 5}

  # Find the key (name) that has the highest value (score)
  winner = max(centrality, key=centrality.get)
  print(winner) # Output: Hero
  ```

  ---

  ## 3. Handling Redundant Data
  In raw humanities data, you often see the same interaction recorded twice (e.g., "Hamlet speaks to Horatio" and later "Horatio speaks to Hamlet"). 

  If you use an **Undirected Graph** (`nx.Graph()`), NetworkX automatically handles this. It treats an edge between A and B as the same thing as an edge between B and A. It won't create two separate lines, which keeps your centrality scores accurate.

  :::tip
  **Beyond Literature**: This same workflow applies to **Citation Networks** (which scholar is the hub of a field?) and **Metadata Analysis** (which subjects are most frequently grouped together in a library catalog?).
  :::

  :::challenge
  In Challenge 1, you will find the "Protagonist" (the Hub) of a small play. In Challenge 2, you will identify the "Broker"—the character who connects two otherwise isolated communities.
  :::

---challenges---

### Challenge: The Protagonist Finder

- id: network-analysis-05-c1
- language: python
- difficulty: advanced

#### Starter Code

```python
import networkx as nx

  # A list of character interactions in a play
  dialogue_data = [
      ("Hero", "Sidekick"), ("Hero", "Villain"), ("Hero", "Mentor"),
      ("Hero", "Townsperson1"), ("Hero", "Townsperson2"),
      ("Villain", "Henchman1"), ("Villain", "Henchman2"),
      ("Sidekick", "Villain")
  ]

  # 1. Initialize an undirected Graph 'G'
  # 2. Add the edges from 'dialogue_data'
  # 3. Calculate degree_centrality
  # 4. Use max() to find the character with the highest score
  # 5. Store the name in 'protagonist' and print it

  # Your code here

  print(protagonist)
  
```

#### Expected Output

```
Hero
```

#### Hints

1. Initialize with G = nx.Graph().
2. Load edges with G.add_edges_from(dialogue_data).
3. Use max(centrality_dict, key=centrality_dict.get) to find the name of the top node.

#### Solution

```python
import networkx as nx

  dialogue_data = [
      ("Hero", "Sidekick"), ("Hero", "Villain"), ("Hero", "Mentor"),
      ("Hero", "Townsperson1"), ("Hero", "Townsperson2"),
      ("Villain", "Henchman1"), ("Villain", "Henchman2"),
      ("Sidekick", "Villain")
  ]

  G = nx.Graph()
  G.add_edges_from(dialogue_data)

  # Calculate Degree Centrality (Hubs)
  scores = nx.degree_centrality(G)

  # Find the name of the character with the highest score
  protagonist = max(scores, key=scores.get)

  print(protagonist)
```

### Challenge: Identify the Broker

- id: network-analysis-05-c2
- language: python
- difficulty: advanced

#### Starter Code

```python
import networkx as nx

  # Two communities (A and B) connected only by the "Broker"
  network_data = [
      ("A1", "A2"), ("A2", "A3"), ("A1", "A3"), # Clique A
      ("B1", "B2"), ("B2", "B3"), ("B1", "B3"), # Clique B
      ("A1", "Broker"), # Connection to Bridge
      ("Broker", "B1")  # Connection to Bridge
  ]

  G = nx.Graph()
  G.add_edges_from(network_data)

  # 1. Calculate Betweenness Centrality
  # 2. Find the character with the highest score
  # 3. Print the name of that character

  # Your code here
  
```

#### Expected Output

```
Broker
```

#### Hints

1. Betweenness identifies the node that acts as the only path between groups.
2. Use nx.betweenness_centrality(G).
3. The "Broker" node should have the highest score because it links the A and B clusters.

#### Solution

```python
import networkx as nx

  network_data = [
      ("A1", "A2"), ("A2", "A3"), ("A1", "A3"),
      ("B1", "B2"), ("B2", "B3"), ("B1", "B3"),
      ("A1", "Broker"),
      ("Broker", "B1")
  ]

  G = nx.Graph()
  G.add_edges_from(network_data)

  # Calculate Betweenness
  bc = nx.betweenness_centrality(G)

  # Find the highest score
  top_broker = max(bc, key=bc.get)

  print(top_broker)
```

