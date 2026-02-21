---
id: structured-data-01
title: Introduction to CSV and Tabular Data
moduleId: structured-data
prerequisites:
  - python-basics-05
estimatedTimeMinutes: 30
difficulty: beginner
learningObjectives:
  - Understand the tabular nature of humanities data (e.g., prosopography)
  - Identify the difference between csv.reader (lists) and csv.DictReader (dictionaries)
  - Process CSV data stored in strings using io.StringIO
  - Filter tabular data based on specific column values
keywords:
  - csv
  - tabular
  - rows
  - columns
  - dictionaries
  - prosopography
---

# Working with Tabular Data

  ## Data in Rows and Columns
  Much of Digital Humanities involves **structured lists**: a spreadsheet of every student at a university in 1850, or a catalog of every play performed at a specific theater. 

  In DH, we often use tables for **Prosopography**—the investigation of a common group of people (like "all women printers in 18th-century London") by looking at their shared biographical data.

  ---

  ## 1. What is a CSV?
  A **CSV (Comma-Separated Values)** file is a plain-text version of an Excel spreadsheet. 
  - Each line represents a **Row**.
  - Each comma represents a move to a new **Column**.

  ```text
  name,year,city
  Mary,1818,London
  Percy,1810,Oxford
  ```

  ---

  ## 2. Two Ways to Read CSVs in Python
  The `csv` module provides two main tools for reading data:

  ### A. `csv.reader` (The List Method)
  Each row becomes a **List**. You access columns by their number (index).
  - `row[0]` is the name, `row[1]` is the year.

  ### B. `csv.DictReader` (The Dictionary Method)
  Each row becomes a **Dictionary**. You access columns by their header name.
  - `row["name"]` is the name, `row["year"]` is the year. This is usually easier to read!

  ```python
  import csv

  # Using DictReader to access data by column names
  with open('authors.csv', mode='r', encoding='utf-8') as f:
      reader = csv.DictReader(f)
      for row in reader:
          print(row["name"]) # Accesses the "name" column directly
  ```

  ---

  ## 3. The `io.StringIO` Trick
  In the sandbox challenge in the sandbox, we don't have a physical file on a hard drive. Instead, we have a "string" of data. To use the `csv` module on a string, we use `io.StringIO`. 

  Think of `io.StringIO` as a "virtual file" that lets Python treat a block of text as if it were a `.csv` file you just opened.

  ---

  ## 4. Filtering Tabular Data
  The real power of Python is filtering thousands of rows instantly. 

  ```python
  # Example: Only print people born after 1800
  for row in reader:
      if int(row["year"]) > 1800:
          print(row["name"])
  ```

  :::try-it
  When reading a CSV, remember that everything starts as a **string**. If you want to do math on a year or a price, you must convert it using `int()` or `float()`!
  :::
  

---challenges---

### Challenge: Parse CSV data

- id: structured-data-01-c1
- language: python
- difficulty: beginner

#### Starter Code

```python
import csv
  import io

  # A researcher gives you this string of data
  csv_data = "name,year\nAusten,1813\nShelley,1818\nStoker,1897"

  # Goal: Use csv.reader to print each row as a list
  # 1. Create a "virtual file" using io.StringIO(csv_data)
  # 2. Pass that virtual file to csv.reader()
  # 3. Loop through the reader and print each row

  # Your code here
  
```

#### Expected Output

```
['name', 'year']
['Austen', '1813']
['Shelley', '1818']
['Stoker', '1897']
```

#### Hints

1. The syntax is: reader = csv.reader(io.StringIO(csv_data))
2. Use "for row in reader:" to iterate through the rows.
3. Each "row" will be a list of strings.

#### Solution

```python
import csv
  import io

  csv_data = "name,year\nAusten,1813\nShelley,1818\nStoker,1897"

  # Create virtual file
  virtual_file = io.StringIO(csv_data)

  # Create the reader
  reader = csv.reader(virtual_file)

  # Loop and print
  for row in reader:
      print(row)
```

