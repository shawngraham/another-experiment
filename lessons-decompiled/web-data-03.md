---
id: web-data-03
title: APIs and JSON Data
moduleId: web-data-collection
prerequisites:
  - web-data-02
estimatedTimeMinutes: 35
difficulty: intermediate
learningObjectives:
  - Explain the difference between Scraping and using an API
  - Use the requests library to retrieve data from a web endpoint
  - Understand HTTP status codes (e.g.
  - 200 vs 404)
  - Navigate nested JSON response objects to extract research data
keywords:
  - api
  - json
  - requests
  - rest
  - endpoint
---

# APIs: The "Front Door" of Data

  ## What is an API?
  An **API (Application Programming Interface)** is a way for two computers to talk to each other. If a website's HTML is like the front of a building (meant for humans to look at), an API is like a "service entrance" designed specifically for computers to exchange clean, structured data.

  ### The Restaurant Analogy
  - **You (The Researcher)**: The customer at the table.
  - **The API (The Waiter)**: Takes your specific request to the kitchen and brings back your "order" (data).
  - **The Server (The Kitchen)**: The database where all the books, records, or tweets are stored.

  ---

  ## 1. Why APIs are Better for DH
  Researchers prefer APIs over web scraping for three main reasons:
  1.  **Reliability**: Websites change their design constantly (breaking your scraper). APIs are "contracts" that rarely change.
  2.  **Speed**: You get exactly the data you need (JSON) without the "bloat" of images, CSS, and HTML.
  3.  **Legality**: Using an API is an explicit invitation from an institution to use their data.

  ---

  ## 2. Using the `requests` Library
  Python uses the `requests` library to communicate with APIs. The most important part of a request is the **Status Code**.

  - **200**: Success!
  - **404**: Not Found (The URL is wrong).
  - **403**: Forbidden (You don't have permission).

  ```python
  import requests

  # The 'Endpoint' (the URL for the data)
  url = "https://chroniclingamerica.loc.gov/search/pages/results/?format=json&proxtext=humanities"

  response = requests.get(url)

  if response.status_code == 200:
      # .json() converts the raw text into a Python Dictionary/List
      data = response.json() 
      print("Data retrieved successfully!")
  ```

  ---

  ## 3. Notable APIs for Humanities Research
  - **Library of Congress**: Access millions of digitized newspaper pages and photos.
  - **DPLA (Digital Public Library of America)**: Metadata for millions of items across US heritage institutions.
  - **Europeana**: The gateway to European cultural heritage.
  - **Open Library**: Access to millions of book records and full texts.

  :::tip
  **From String to Data**: When an API sends data, it arrives as a long string. In Python, we use `json.loads()` to turn that string into a list or dictionary we can actually work with. In the `requests` library, `response.json()` does this step for you automatically!
  :::

  :::challenge
  In the challenge at right, you will simulate receiving data from an API. You will need to parse the JSON string and use a loop to extract specific book titles.
  :::

---challenges---
