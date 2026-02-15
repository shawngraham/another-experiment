---
id: network-analysis-01
title: Introduction to Network Concepts
moduleId: network-analysis
prerequisites:
  - structured-data-05
estimatedTimeMinutes: 20
difficulty: beginner
learningObjectives:
  - Define nodes and edges in the context of humanities data
  - Distinguish between directed and undirected graphs
  - Understand "Edge Weights" as a measure of relationship strength
  - Identify use cases for network analysis in history and literature
keywords:
  - graph theory
  - nodes
  - edges
  - directed graph
  - network analysis
  - republic of letters
---

# Introduction to Network Concepts

  ## Analogy: The Whiteboard of Relationships
  Imagine a pile of letters found in an archive. If you read them one by one, you learn about individual lives. However, if you draw a line on a whiteboard connecting the sender of every letter to its recipient, you create a "web" that reveals something invisible in the individual texts: **a community structure**. 

  You might find that a seemingly quiet figure is actually the central hub connecting two rival political groups. This "web" is a **network** (or graph), and the whiteboard drawing is the essence of **Network Analysis**.

  ---

  ## 1. Nodes and Edges
  Network analysis (or Graph Theory) requires us to simplify complex humanities data into two specific components:

  :::definition
  **Node (or Vertex)**: The "things" in the network. In the humanities, these are often people (authors, historical figures), but they can also be places, books, or even abstract concepts like "keywords."
  :::

  :::definition
  **Edge (or Link)**: The relationship connecting two nodes. This represents the "action" or "connection," such as "wrote a letter to," "is related to," or "appeared in the same scene as."
  :::

  ---

  ## 2. Types of Graph Logic
  When modeling your research data, you must decide how your edges behave:

  1.  **Undirected Graph**: Relationships are mutual.
      *   *Example*: Two characters appear in the same scene. If A is with B, B is necessarily with A.
  2.  **Directed Graph**: Relationships flow in a specific direction.
      *   *Example*: Citations. Book A cites Book B, but Book B does not necessarily cite Book A.
  3.  **Weighted Graph**: The connection has a "strength" or "frequency."
      *   *Example*: If Ada sends Charles one letter, the edge weight is 1. If she sends him 50 letters, the edge weight is 50.

  ---

  ## 3. Representing Networks in Python
  The simplest way to store a network in Python is an **Edge List**. This is a list of tuples, where each tuple represents a connection between two nodes.

  ```python
  # A list of co-occurrence (Undirected)
  # Romeo appears with Juliet, Juliet appears with Nurse
  interactions = [
      ("Romeo", "Juliet"),
      ("Juliet", "Nurse")
  ]

  # Accessing the participants of the first interaction
  print(f"{interactions[0][0]} connected to {interactions[0][1]}")
  ```

  ---

  ## 4. Why Use This in DH?
  We use network analysis to move from "Close Reading" (analyzing one text) to **"Distant Reading"** of systems.
  *   **History (The Republic of Letters)**: Mapping the vast exchange of letters between Enlightenment thinkers to see how ideas traveled across borders.
  *   **Literature**: Analyzing character networks in plays to identify the protagonist based on "centrality" rather than word count.

  :::tip
  **Modeling Tip**: Before you start coding, always ask: "What is a node in my project?" and "What constitutes an edge?" If you can't define these clearly, your network will be "hairball" of data that is impossible to interpret.
  :::

  :::challenge
  Model a small correspondence network using Python tuples. You will create a directed "Edge List" where the first name is the Sender and the second is the Recipient.
  :::

---challenges---
