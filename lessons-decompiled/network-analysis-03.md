---
id: network-analysis-03
title: Centrality Measures
moduleId: network-analysis
prerequisites:
  - network-analysis-02
estimatedTimeMinutes: 40
difficulty: intermediate
learningObjectives:
  - Explain the difference between Degree and Betweenness centrality
  - Calculate centrality metrics using NetworkX functions
  - Sort and filter centrality dictionaries to identify top influencers
  - Interpret centrality scores within a historical or literary context
keywords:
  - degree centrality
  - betweenness centrality
  - hubs
  - brokers
  - metrics
---

# Centrality: Mapping Power and Influence

  ## Analogy: The High School Cafeteria
  In a social network, who is the most "important" person? The answer depends on how you define importance:

  1.  **The Hub (Degree Centrality)**: This is the person sitting at a table with 20 people talking to them. They are the most "popular" or connected.
  2.  **The Broker (Betweenness Centrality)**: This is the person who sits between the "Theater Kids" and the "Athletes." They might only have two friends, but they are the only ones who can pass information from one group to the other.

  Both are powerful, but for different reasons.

  ---

  ## 1. Degree Centrality (Popularity)
  Degree centrality measures the fraction of nodes a specific node is connected to. 
  - **High Score**: Indicates a "Hub."
  - **DH Use Case**: Identifying the protagonist of a play by seeing who interacts with the most other characters.

  ```python
  # Returns a dictionary: {'Name': 0.85, ...}
  # Scores are "normalized" between 0.0 and 1.0
  degree_dict = nx.degree_centrality(G)
  ```

  ---

  ## 2. Betweenness Centrality (Gatekeeping)
  This measures how often a node acts as a bridge along the shortest path between other nodes.
  - **High Score**: Indicates a "Broker" or "Gatekeeper."
  - **DH Use Case**: Finding a mid-level diplomat in an archive who, despite not being famous, was the only person connecting two different royal courts.

  ```python
  # Measures who controls the "flow" of information
  betweenness_dict = nx.betweenness_centrality(G)
  ```

  ---

  ## 3. Interpreting the Math
  NetworkX normalizes these scores so they stay between **0 and 1**. 
  - A Degree Centrality of **1.0** means that node is connected to **every other node** in the network.
  - A score of **0.0** means the node is totally isolated.

  ---

  ## 4. Sorting the Results
  Because centrality functions return a dictionary, we usually need to sort them to find our "top" figures.

  ```python
  # Sort dictionary by value (item[1]) in descending order
  ranked = sorted(degree_dict.items(), key=lambda x: x[1], reverse=True)

  # Print the top person
  print(f"The Hub is {ranked[0][0]} with a score of {ranked[0][1]}")
  ```

  :::tip
  **Humanities Insight**: A character might have a very low word count in a novel but a very high **Betweenness Centrality**. This suggests they are a "messenger" or a "witness" who links disparate parts of the plot together.
  :::

  :::challenge
  In Challenge 1, identify the hub in a "Star Graph." In Challenge 2, calculate the "broker" score for a node that serves as the only bridge to a sub-group.
  :::

---challenges---
