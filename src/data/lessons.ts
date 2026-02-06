import type { LessonDefinition } from '../types/index.ts';

export const lessons: LessonDefinition[] = [
  {
    id: 'digital-literacy-01',
    title: 'Understanding Files and Directories',
    moduleId: 'digital-literacy-foundations',
    prerequisites: [],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand file system structure',
      'Navigate directories conceptually',
      'Identify common file types',
    ],
    keywords: ['files', 'directories', 'file types'],
    content: `# Understanding Files and Directories

## Analogy
Think of your computer's file system like a library. Just as a library has sections, shelves, and individual books, your computer organizes information into drives, folders (directories), and files.

## Key Concepts

### What is a File?
A file is a named collection of data stored on your computer. Files have:
- A **name** (e.g., \`my_essay\`)
- An **extension** indicating type (e.g., \`.txt\`, \`.pdf\`, \`.csv\`)
- A **location** (path) in the directory tree

### What is a Directory?
A directory (or folder) is a container that holds files and other directories. This creates a hierarchical tree structure.

::: definition
**File Path**: The address of a file in the directory tree. For example: \`/Documents/Research/data.csv\`
:::

## Try It
In the code sandbox, try running the following Python code to explore a virtual file system:

\`\`\`python
import os
# List files in the current directory
print(os.listdir('.'))
\`\`\`

::: challenge
Write code to create a new directory called 'my_project' and a file inside it.
:::
`,
    challenges: [
      {
        id: 'digital-literacy-01-c1',
        title: 'Create a directory and file',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import os\n\n# Create a directory called 'my_project'\n# Then create a file inside it called 'notes.txt'\n# Write "Hello DH!" to the file\n\n# Your code here\n`,
        expectedOutput: 'Hello DH!',
        hints: [
          'Use os.makedirs() to create a directory',
          'Use open() with "w" mode to create and write to a file',
        ],
        solution: `import os\nos.makedirs('my_project', exist_ok=True)\nwith open('my_project/notes.txt', 'w') as f:\n    f.write('Hello DH!')\nwith open('my_project/notes.txt', 'r') as f:\n    print(f.read())`,
      },
    ],
  },
  {
    id: 'digital-literacy-02',
    title: 'Data Formats: TXT, CSV, JSON, XML',
    moduleId: 'digital-literacy-foundations',
    prerequisites: ['digital-literacy-01'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Distinguish between common data formats',
      'Understand when to use each format',
      'Read and interpret structured data',
    ],
    keywords: ['txt', 'csv', 'json', 'xml', 'data formats'],
    content: `# Data Formats

## Why Formats Matter
Different data formats serve different purposes. Understanding formats helps you choose the right tool for your research.

## Common Formats

### Plain Text (.txt)
Simple, unformatted text. Universal and human-readable.

### CSV (Comma-Separated Values)
Tabular data where columns are separated by commas. Great for spreadsheet-like data.

### JSON (JavaScript Object Notation)
Structured data with nested key-value pairs. Common in web APIs.

### XML (eXtensible Markup Language)
Structured data with custom tags. Common in archival metadata.

::: try-it
Explore each format in the sandbox below.
:::
`,
    challenges: [
      {
        id: 'digital-literacy-02-c1',
        title: 'Parse a CSV string',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Parse this CSV data and print each row\ncsv_data = """name,year,genre\nFrankenstein,1818,Gothic\nPride and Prejudice,1813,Romance\nDracula,1897,Gothic"""\n\n# Your code here\n`,
        expectedOutput: "['name', 'year', 'genre']\n['Frankenstein', '1818', 'Gothic']\n['Pride and Prejudice', '1813', 'Romance']\n['Dracula', '1897', 'Gothic']",
        hints: [
          'Use the csv module from Python standard library',
          'Use csv.reader() with io.StringIO() to read from a string',
        ],
        solution: `import csv\nimport io\n\ncsv_data = """name,year,genre\nFrankenstein,1818,Gothic\nPride and Prejudice,1813,Romance\nDracula,1897,Gothic"""\n\nreader = csv.reader(io.StringIO(csv_data))\nfor row in reader:\n    print(row)`,
      },
    ],
  },
  {
    id: 'digital-literacy-03',
    title: 'Character Encoding and Plain Text',
    moduleId: 'digital-literacy-foundations',
    prerequisites: ['digital-literacy-02'],
    estimatedTimeMinutes: 25,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand ASCII and UTF-8 encoding',
      'Recognize encoding issues in text',
      'Handle text encoding in Python',
    ],
    keywords: ['encoding', 'utf-8', 'ascii', 'unicode'],
    content: `# Character Encoding

## Why Encoding Matters
When working with texts from different languages and time periods, encoding determines how characters are stored and displayed.

::: definition
**Character Encoding**: A system that maps characters to numbers that computers can store and process.
:::

## Common Encodings
- **ASCII**: 128 characters, English only
- **UTF-8**: Universal encoding supporting all languages
- **Latin-1**: Western European languages

::: try-it
Try encoding and decoding text in the sandbox.
:::
`,
    challenges: [
      {
        id: 'digital-literacy-03-c1',
        title: 'Explore text encoding',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Encode and decode a string\ntext = "café"\n\n# Encode to UTF-8 bytes\n# Then decode back to string\n# Print both results\n`,
        expectedOutput: "b'caf\\xc3\\xa9'\ncafé",
        hints: [
          'Use .encode("utf-8") to convert string to bytes',
          'Use .decode("utf-8") to convert bytes back to string',
        ],
        solution: `text = "café"\nencoded = text.encode("utf-8")\nprint(encoded)\ndecoded = encoded.decode("utf-8")\nprint(decoded)`,
      },
    ],
  },
  {
    id: 'python-basics-01',
    title: 'Variables and Data Types',
    moduleId: 'python-basics',
    prerequisites: ['digital-literacy-foundations'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Create and use variables',
      'Understand strings, integers, floats, and booleans',
      'Convert between data types',
    ],
    keywords: ['variables', 'types', 'strings', 'integers'],
    content: `# Variables and Data Types

## Analogy
Variables are like labeled boxes. You put a value in, and the label helps you find it later.

## Creating Variables
\`\`\`python
title = "Moby Dick"
year = 1851
rating = 4.5
is_fiction = True
\`\`\`

::: try-it
Create your own variables and print their types.
:::
`,
    challenges: [
      {
        id: 'python-basics-01-c1',
        title: 'Create variables',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Create a variable 'book_title' with a string value\n# Create a variable 'pub_year' with an integer value\n# Print both variables and their types\n`,
        expectedOutput: 'Frankenstein\n1818\n<class \'str\'>\n<class \'int\'>',
        hints: ['Use type() to get the type of a variable', 'Use print() to display values'],
        solution: `book_title = "Frankenstein"\npub_year = 1818\nprint(book_title)\nprint(pub_year)\nprint(type(book_title))\nprint(type(pub_year))`,
      },
    ],
  },
  {
    id: 'python-basics-02',
    title: 'Lists and Dictionaries',
    moduleId: 'python-basics',
    prerequisites: ['python-basics-01'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Create and manipulate lists',
      'Create and use dictionaries',
      'Iterate over collections',
    ],
    keywords: ['lists', 'dictionaries', 'collections', 'iteration'],
    content: `# Lists and Dictionaries

## Lists
Ordered collections of items.

\`\`\`python
authors = ["Austen", "Shelley", "Brontë"]
\`\`\`

## Dictionaries
Key-value pairs, like a real dictionary.

\`\`\`python
book = {"title": "Frankenstein", "author": "Shelley", "year": 1818}
\`\`\`

::: try-it
Create a list of books and a dictionary describing one.
:::
`,
    challenges: [
      {
        id: 'python-basics-02-c1',
        title: 'Work with collections',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Create a list of 3 book titles\n# Create a dictionary for one book with title, author, year\n# Print the list length and the book's author\n`,
        expectedOutput: '3\nShelley',
        hints: ['Use len() for list length', 'Access dict values with dict["key"]'],
        solution: `books = ["Frankenstein", "Dracula", "Jane Eyre"]\nbook = {"title": "Frankenstein", "author": "Shelley", "year": 1818}\nprint(len(books))\nprint(book["author"])`,
      },
    ],
  },
  {
    id: 'python-basics-03',
    title: 'Control Flow',
    moduleId: 'python-basics',
    prerequisites: ['python-basics-02'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Use if/elif/else statements',
      'Write for and while loops',
      'Combine conditions with and/or',
    ],
    keywords: ['if', 'else', 'for', 'while', 'loops', 'conditions'],
    content: `# Control Flow

## Making Decisions
\`\`\`python
word_count = 50000
if word_count > 40000:
    print("This is a novel!")
\`\`\`

## Looping
\`\`\`python
for author in ["Austen", "Shelley", "Brontë"]:
    print(f"Author: {author}")
\`\`\`
`,
    challenges: [
      {
        id: 'python-basics-03-c1',
        title: 'Loop and filter',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Given a list of word counts, print only those over 1000\nword_counts = [500, 1200, 800, 3000, 150, 2500]\n\n# Your code here\n`,
        expectedOutput: '1200\n3000\n2500',
        hints: ['Use a for loop to iterate', 'Use an if statement to filter'],
        solution: `word_counts = [500, 1200, 800, 3000, 150, 2500]\nfor count in word_counts:\n    if count > 1000:\n        print(count)`,
      },
    ],
  },
  {
    id: 'python-basics-04',
    title: 'Functions',
    moduleId: 'python-basics',
    prerequisites: ['python-basics-03'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Define and call functions',
      'Use parameters and return values',
      'Write reusable code',
    ],
    keywords: ['functions', 'def', 'return', 'parameters'],
    content: `# Functions

## Why Functions?
Functions let you write reusable blocks of code.

\`\`\`python
def count_words(text):
    return len(text.split())
\`\`\`

::: try-it
Write a function that calculates reading time.
:::
`,
    challenges: [
      {
        id: 'python-basics-04-c1',
        title: 'Write a function',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Write a function that takes a text and returns\n# the estimated reading time in minutes\n# Assume average reading speed of 200 words per minute\n\ndef reading_time(text):\n    # Your code here\n    pass\n\nprint(reading_time("word " * 400))`,
        expectedOutput: '2.0',
        hints: ['Count words with len(text.split())', 'Divide word count by 200'],
        solution: `def reading_time(text):\n    words = len(text.split())\n    return words / 200\n\nprint(reading_time("word " * 400))`,
      },
    ],
  },
  {
    id: 'python-basics-05',
    title: 'Reading and Writing Files',
    moduleId: 'python-basics',
    prerequisites: ['python-basics-04'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Open and read text files',
      'Write data to files',
      'Use context managers (with statement)',
    ],
    keywords: ['files', 'open', 'read', 'write', 'with'],
    content: `# Reading and Writing Files

## Reading Files
\`\`\`python
with open('data.txt', 'r') as f:
    content = f.read()
\`\`\`

## Writing Files
\`\`\`python
with open('output.txt', 'w') as f:
    f.write('Analysis results')
\`\`\`
`,
    challenges: [
      {
        id: 'python-basics-05-c1',
        title: 'File operations',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Write three lines to a file, then read and print them\n\n# Your code here\n`,
        expectedOutput: 'Line 1\nLine 2\nLine 3',
        hints: ['Use "w" mode to write', 'Use "r" mode to read back'],
        solution: `with open('test.txt', 'w') as f:\n    f.write('Line 1\\nLine 2\\nLine 3')\nwith open('test.txt', 'r') as f:\n    print(f.read())`,
      },
    ],
  },
  {
    id: 'text-analysis-01',
    title: 'Introduction to String Operations',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand string data type',
      'Use basic string methods',
      'Manipulate text data',
    ],
    keywords: ['string', 'text', 'manipulation', 'python'],
    content: `# String Operations

## Working with Text
Strings are the foundation of text analysis.

\`\`\`python
text = "The quick brown fox"
print(text.upper())
print(text.split())
print(text.replace("quick", "slow"))
\`\`\`

::: challenge
Write a function that counts words in a text.
:::
`,
    challenges: [
      {
        id: 'text-analysis-01-c1',
        title: 'Count words in a text',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `def count_words(text):\n    # Your code here\n    pass\n\nsample = "The quick brown fox"\nprint(count_words(sample))`,
        expectedOutput: '4',
        hints: ['Use the split() method to separate words', 'Use len() to count items in a list'],
        solution: `def count_words(text):\n    words = text.split()\n    return len(words)\n\nsample = "The quick brown fox"\nprint(count_words(sample))`,
      },
    ],
  },
  {
    id: 'text-analysis-02',
    title: 'Regular Expressions for Text Matching',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['text-analysis-01'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand regex syntax basics',
      'Use re module for pattern matching',
      'Extract information from text',
    ],
    keywords: ['regex', 'regular expressions', 'pattern matching', 're'],
    content: `# Regular Expressions

## Analogy
Regular expressions are like a "find" function on steroids. They let you search for patterns rather than exact text.

\`\`\`python
import re
text = "The treaty was signed on March 15, 1848"
dates = re.findall(r'\\b[A-Z][a-z]+ \\d{1,2}, \\d{4}\\b', text)
print(dates)
\`\`\`
`,
    challenges: [
      {
        id: 'text-analysis-02-c1',
        title: 'Extract years from text',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import re\n\ntext = "Published in 1818, revised in 1831, reprinted in 1869."\n\n# Extract all 4-digit years\n# Your code here\n`,
        expectedOutput: "['1818', '1831', '1869']",
        hints: ['Use re.findall() to find all matches', 'Use \\d{4} to match 4 digits'],
        solution: `import re\n\ntext = "Published in 1818, revised in 1831, reprinted in 1869."\nyears = re.findall(r'\\d{4}', text)\nprint(years)`,
      },
    ],
  },
  {
    id: 'text-analysis-03',
    title: 'Word Frequency Analysis',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['text-analysis-01'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Count word frequencies in text',
      'Use collections.Counter',
      'Identify common and rare words',
    ],
    keywords: ['frequency', 'counting', 'counter', 'statistics'],
    content: `# Word Frequency Analysis

## Counting Words
Frequency analysis reveals patterns in text.

\`\`\`python
from collections import Counter
words = text.lower().split()
freq = Counter(words)
print(freq.most_common(5))
\`\`\`
`,
    challenges: [
      {
        id: 'text-analysis-03-c1',
        title: 'Find most common words',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter\n\ntext = "to be or not to be that is the question"\n\n# Find the 3 most common words\n# Your code here\n`,
        expectedOutput: "[('to', 2), ('be', 2), ('or', 1)]",
        hints: ['Split text into words first', 'Use Counter and most_common()'],
        solution: `from collections import Counter\n\ntext = "to be or not to be that is the question"\nwords = text.split()\nfreq = Counter(words)\nprint(freq.most_common(3))`,
      },
    ],
  },
  {
    id: 'text-analysis-04',
    title: 'Text Cleaning and Normalization',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['text-analysis-02'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Remove punctuation and special characters',
      'Normalize case and whitespace',
      'Prepare text for analysis',
    ],
    keywords: ['cleaning', 'normalization', 'preprocessing', 'punctuation'],
    content: `# Text Cleaning

## Why Clean Text?
Raw text contains noise: punctuation, inconsistent spacing, mixed case.

\`\`\`python
import re
text = "  Hello,  World!  "
cleaned = re.sub(r'[^\\w\\s]', '', text.strip().lower())
\`\`\`
`,
    challenges: [
      {
        id: 'text-analysis-04-c1',
        title: 'Clean a text passage',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import re\n\ntext = "  It was the BEST of times, it was the WORST of times...  "\n\n# Clean: lowercase, strip whitespace, remove punctuation\n# Then count unique words\n# Your code here\n`,
        expectedOutput: '8',
        hints: [
          'Use .strip().lower() for whitespace and case',
          'Use re.sub() to remove punctuation',
          'Use set() for unique words',
        ],
        solution: `import re\n\ntext = "  It was the BEST of times, it was the WORST of times...  "\ncleaned = re.sub(r'[^\\w\\s]', '', text.strip().lower())\nunique_words = set(cleaned.split())\nprint(len(unique_words))`,
      },
    ],
  },
  // Structured Data module lessons
  {
    id: 'structured-data-01',
    title: 'Introduction to CSV and Tabular Data',
    moduleId: 'structured-data',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand tabular data structure',
      'Read and write CSV files',
      'Access rows and columns',
    ],
    keywords: ['csv', 'tabular', 'rows', 'columns'],
    content: `# CSV and Tabular Data\n\nCSV files store data in rows and columns, separated by commas.\n\n\`\`\`python\nimport csv\nwith open('data.csv') as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)\n\`\`\``,
    challenges: [
      {
        id: 'structured-data-01-c1',
        title: 'Parse CSV data',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `import csv\nimport io\n\ndata = "name,year\\nAusten,1813\\nShelley,1818"\n# Parse and print each row\n`,
        expectedOutput: "['name', 'year']\n['Austen', '1813']\n['Shelley', '1818']",
        hints: ['Use csv.reader with io.StringIO'],
        solution: `import csv\nimport io\ndata = "name,year\\nAusten,1813\\nShelley,1818"\nfor row in csv.reader(io.StringIO(data)):\n    print(row)`,
      },
    ],
  },
  {
    id: 'structured-data-02',
    title: 'Pandas Basics',
    moduleId: 'structured-data',
    prerequisites: ['structured-data-01'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Create DataFrames',
      'Select columns and rows',
      'Basic DataFrame operations',
    ],
    keywords: ['pandas', 'dataframe', 'series'],
    content: `# Pandas Basics\n\nPandas provides powerful data structures for data analysis.\n\n\`\`\`python\nimport pandas as pd\ndf = pd.DataFrame({'name': ['A', 'B'], 'year': [1800, 1900]})\n\`\`\``,
    challenges: [
      {
        id: 'structured-data-02-c1',
        title: 'Create a DataFrame',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Create a DataFrame with columns: title, author, year\n# Print the number of rows\n`,
        expectedOutput: '3',
        hints: ['Use pd.DataFrame with a dictionary'],
        solution: `import pandas as pd\ndf = pd.DataFrame({'title': ['A', 'B', 'C'], 'author': ['X', 'Y', 'Z'], 'year': [1800, 1850, 1900]})\nprint(len(df))`,
      },
    ],
  },
  {
    id: 'structured-data-03',
    title: 'Filtering and Sorting Data',
    moduleId: 'structured-data',
    prerequisites: ['structured-data-02'],
    estimatedTimeMinutes: 30,
    difficulty: 'intermediate',
    learningObjectives: [
      'Filter DataFrames with conditions',
      'Sort by columns',
      'Chain operations',
    ],
    keywords: ['filter', 'sort', 'query', 'conditions'],
    content: `# Filtering and Sorting\n\nFilter rows based on conditions and sort results.\n\n\`\`\`python\ndf[df['year'] > 1850].sort_values('year')\n\`\`\``,
    challenges: [
      {
        id: 'structured-data-03-c1',
        title: 'Filter data',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Given a list of dicts, filter items where year > 1850\ndata = [{'name': 'A', 'year': 1813}, {'name': 'B', 'year': 1818}, {'name': 'C', 'year': 1897}]\n# Print count of filtered items\n`,
        expectedOutput: '1',
        hints: ['Use list comprehension to filter'],
        solution: `data = [{'name': 'A', 'year': 1813}, {'name': 'B', 'year': 1818}, {'name': 'C', 'year': 1897}]\nfiltered = [d for d in data if d['year'] > 1850]\nprint(len(filtered))`,
      },
    ],
  },
  {
    id: 'structured-data-04',
    title: 'Grouping and Aggregation',
    moduleId: 'structured-data',
    prerequisites: ['structured-data-03'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Group data by categories',
      'Apply aggregate functions',
      'Summarize datasets',
    ],
    keywords: ['groupby', 'aggregate', 'summary', 'statistics'],
    content: `# Grouping and Aggregation\n\nGroup data to find patterns and summaries.\n\n\`\`\`python\ndf.groupby('genre')['year'].mean()\n\`\`\``,
    challenges: [
      {
        id: 'structured-data-04-c1',
        title: 'Group and count',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Count items per genre\nbooks = [('Gothic', 'A'), ('Gothic', 'B'), ('Romance', 'C')]\n# Print the count for Gothic\n`,
        expectedOutput: '2',
        hints: ['Use a dictionary to count by genre'],
        solution: `books = [('Gothic', 'A'), ('Gothic', 'B'), ('Romance', 'C')]\ncounts = {}\nfor genre, _ in books:\n    counts[genre] = counts.get(genre, 0) + 1\nprint(counts['Gothic'])`,
      },
    ],
  },
  // Data Visualization module lessons
  {
    id: 'data-viz-01',
    title: 'Principles of Effective Visualization',
    moduleId: 'data-visualization',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 25,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand visualization principles',
      'Choose appropriate chart types',
      'Identify effective vs misleading charts',
    ],
    keywords: ['visualization', 'charts', 'design', 'principles'],
    content: `# Visualization Principles\n\nGood visualizations communicate data clearly and honestly.\n\n## Key Principles\n- Choose the right chart type\n- Minimize chart junk\n- Use color purposefully\n- Label axes clearly`,
    challenges: [
      {
        id: 'data-viz-01-c1',
        title: 'Choose chart type',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Match data types to chart types\n# Print the best chart for comparing categories\nchart_types = {"comparison": "bar", "trend": "line", "distribution": "histogram"}\nprint(chart_types["comparison"])`,
        expectedOutput: 'bar',
        hints: ['Bar charts are best for comparing categories'],
        solution: `chart_types = {"comparison": "bar", "trend": "line", "distribution": "histogram"}\nprint(chart_types["comparison"])`,
      },
    ],
  },
  {
    id: 'data-viz-02',
    title: 'Basic Plots with Matplotlib',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-01'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Create bar, line, and scatter plots',
      'Customize plot appearance',
      'Add labels and titles',
    ],
    keywords: ['matplotlib', 'bar', 'line', 'scatter', 'plot'],
    content: `# Basic Plots\n\nMatplotlib is Python's foundational plotting library.\n\n\`\`\`python\nimport matplotlib.pyplot as plt\nplt.bar(['A', 'B', 'C'], [10, 20, 15])\nplt.title('Example')\n\`\`\``,
    challenges: [
      {
        id: 'data-viz-02-c1',
        title: 'Create data for a plot',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Create lists for a bar chart of word counts\n# 3 books with their word counts\n# Print the data\n`,
        expectedOutput: "['Book A', 'Book B', 'Book C']\n[50000, 75000, 30000]",
        hints: ['Create two parallel lists: labels and values'],
        solution: `labels = ['Book A', 'Book B', 'Book C']\ncounts = [50000, 75000, 30000]\nprint(labels)\nprint(counts)`,
      },
    ],
  },
  {
    id: 'data-viz-03',
    title: 'Customizing Visualizations',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-02'],
    estimatedTimeMinutes: 30,
    difficulty: 'intermediate',
    learningObjectives: [
      'Customize colors and styles',
      'Create multi-panel figures',
      'Export publication-quality images',
    ],
    keywords: ['customization', 'styles', 'colors', 'subplots'],
    content: `# Customizing Plots\n\nMake your visualizations publication-ready.\n\n\`\`\`python\nplt.style.use('seaborn-v0_8')\nfig, axes = plt.subplots(1, 2)\n\`\`\``,
    challenges: [
      {
        id: 'data-viz-03-c1',
        title: 'Style data output',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Create a formatted summary string for chart data\ndata = {"Gothic": 15, "Romance": 22, "Adventure": 8}\ntotal = sum(data.values())\nprint(f"Total: {total}")`,
        expectedOutput: 'Total: 45',
        hints: ['Use sum() on dict.values()'],
        solution: `data = {"Gothic": 15, "Romance": 22, "Adventure": 8}\ntotal = sum(data.values())\nprint(f"Total: {total}")`,
      },
    ],
  },
  {
    id: 'data-viz-04',
    title: 'Plotting Text Analysis Results',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-03'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Visualize word frequency data',
      'Create comparative charts',
      'Plot temporal data',
    ],
    keywords: ['frequency', 'temporal', 'comparison', 'text visualization'],
    content: `# Plotting Text Analysis\n\nCombine text analysis with visualization.\n\n\`\`\`python\nfrom collections import Counter\nwords = text.split()\nfreq = Counter(words).most_common(10)\n\`\`\``,
    challenges: [
      {
        id: 'data-viz-04-c1',
        title: 'Prepare frequency data for plotting',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `from collections import Counter\ntext = "the the the and and or"\nfreq = Counter(text.split())\nprint(freq.most_common(2))`,
        expectedOutput: "[('the', 3), ('and', 2)]",
        hints: ['Counter.most_common(n) returns top n'],
        solution: `from collections import Counter\ntext = "the the the and and or"\nfreq = Counter(text.split())\nprint(freq.most_common(2))`,
      },
    ],
  },
  // Web Data Collection module lessons
  {
    id: 'web-data-01',
    title: 'Understanding HTML Structure',
    moduleId: 'web-data-collection',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand HTML document structure',
      'Identify elements, attributes, and text',
      'Navigate the DOM conceptually',
    ],
    keywords: ['html', 'dom', 'elements', 'attributes'],
    content: `# HTML Structure\n\nHTML is the language of the web. Understanding it is key to web scraping.\n\n\`\`\`html\n<html>\n  <body>\n    <h1>Title</h1>\n    <p class="intro">Hello</p>\n  </body>\n</html>\n\`\`\``,
    challenges: [
      {
        id: 'web-data-01-c1',
        title: 'Parse HTML string',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Extract the text from a simple HTML structure\nhtml = "<h1>Digital Humanities</h1>"\n# Use string methods to get the text\n`,
        expectedOutput: 'Digital Humanities',
        hints: ['You can use string replace or split methods'],
        solution: `html = "<h1>Digital Humanities</h1>"\ntext = html.replace('<h1>', '').replace('</h1>', '')\nprint(text)`,
      },
    ],
  },
  {
    id: 'web-data-02',
    title: 'Web Scraping Ethics and Best Practices',
    moduleId: 'web-data-collection',
    prerequisites: ['web-data-01'],
    estimatedTimeMinutes: 25,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand ethical scraping principles',
      'Check robots.txt and terms of service',
      'Implement rate limiting',
    ],
    keywords: ['ethics', 'robots.txt', 'rate limiting', 'terms of service'],
    content: `# Web Scraping Ethics\n\n## Key Principles\n- Always check robots.txt\n- Respect rate limits\n- Don't overload servers\n- Check terms of service\n- Consider if an API is available`,
    challenges: [
      {
        id: 'web-data-02-c1',
        title: 'Check robots.txt rules',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Parse a robots.txt content\nrobots = "User-agent: *\\nDisallow: /private/\\nAllow: /public/"\nlines = robots.split("\\n")\nfor line in lines:\n    if line.startswith("Disallow"):\n        print(line.split(": ")[1])`,
        expectedOutput: '/private/',
        hints: ['Split by newline, then filter lines starting with Disallow'],
        solution: `robots = "User-agent: *\\nDisallow: /private/\\nAllow: /public/"\nlines = robots.split("\\n")\nfor line in lines:\n    if line.startswith("Disallow"):\n        print(line.split(": ")[1])`,
      },
    ],
  },
  {
    id: 'web-data-03',
    title: 'APIs and JSON Data',
    moduleId: 'web-data-collection',
    prerequisites: ['web-data-02'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand REST APIs',
      'Parse JSON responses',
      'Extract data from nested structures',
    ],
    keywords: ['api', 'json', 'rest', 'requests'],
    content: `# APIs and JSON\n\nAPIs provide structured access to data.\n\n\`\`\`python\nimport json\nresponse = '{"title": "Frankenstein", "year": 1818}'\ndata = json.loads(response)\nprint(data["title"])\n\`\`\``,
    challenges: [
      {
        id: 'web-data-03-c1',
        title: 'Parse JSON data',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `import json\n\napi_response = '[{"title": "Book A", "year": 1818}, {"title": "Book B", "year": 1847}]'\n\n# Parse and print titles\n`,
        expectedOutput: 'Book A\nBook B',
        hints: ['Use json.loads() to parse', 'Loop through the list of objects'],
        solution: `import json\n\napi_response = '[{"title": "Book A", "year": 1818}, {"title": "Book B", "year": 1847}]'\nbooks = json.loads(api_response)\nfor book in books:\n    print(book["title"])`,
      },
    ],
  },
];

export function getLessonById(id: string): LessonDefinition | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByModule(moduleId: string): LessonDefinition[] {
  return lessons.filter((l) => l.moduleId === moduleId);
}
