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
      'Understand file system structure and hierarchy',
      'Navigate directories using absolute and relative paths',
      'Identify common file extensions in DH research',
    ],
    keywords: ['files', 'directories', 'file types', 'paths'],
    content: `# Understanding Files and Directories

## The Digital Archive
Think of your computer's file system like a physical archive or library. Just as a library has wings, stacks, and individual boxes, your computer organizes information into a hierarchical structure of **drives**, **directories** (folders), and **files**.

## Key Concepts

### 1. What is a File?
A file is a discrete container for data. In Digital Humanities, we often distinguish between:
- **Plain Text** (.txt, .csv): Files containing only characters, readable by any computer.
- **Binary Files** (.docx, .pdf, .jpg): Files that require specific software to interpret their internal structure.

### 2. The Directory Tree
Directories are nested. A directory inside another is a "child," and the containing directory is the "parent." This creates a **tree structure**.

::: definition
**File Path**: The specific address of a file. 
- **Absolute Path**: Starts from the "root" (e.g., \`C:\\\` or \`/\`).
- **Relative Path**: Starts from where you are currently "standing" (your Working Directory).
:::

## Navigating via Code
While we often use a mouse to move files, DH researchers use code to automate the processing of thousands of files at once.

\`\`\`python
import os
# 'os' stands for Operating System. 
# It lets Python talk to your folders.

current_location = os.getcwd() # Get Current Working Directory
print(f"You are currently at: {current_location}")

files_here = os.listdir('.') # '.' represents the current folder
print(f"Contents: {files_here}")
\`\`\`

::: challenge
Use the sandbox to create a structured project folder for a research project titled "London_Mapping".
:::
`,
    challenges: [
      {
        id: 'digital-literacy-01-c1',
        title: 'Create a directory and file',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import os\n\n# 1. Create a directory called 'my_project'\n# 2. Create a file inside it called 'notes.txt'\n# 3. Write "Hello DH!" to the file\n\n# Your code here\n`,
        expectedOutput: 'Hello DH!',
        hints: [
          'Use os.makedirs(name, exist_ok=True) to create a directory safely.',
          'The path to the file will be "my_project/notes.txt".',
          'Use open(path, "w") to write.',
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
      'Distinguish between structured and unstructured data',
      'Understand the strengths of CSV for tabular data',
      'Recognize nested hierarchies in JSON and XML',
    ],
    keywords: ['txt', 'csv', 'json', 'xml', 'data formats'],
    content: `# Data Formats for the Humanities

## Choosing the Right Vessel
Data isn't just "information"; it's information formatted for a specific purpose. Choosing the wrong format can make analysis impossible.

## Common Formats in DH

### 1. Plain Text (.txt)
The "gold standard" for long-term preservation. It contains no formatting (no bold, no italics), making it perfect for **Natural Language Processing (NLP)**.

### 2. CSV (Comma-Separated Values)
Used for **tabular data** (spreadsheets). Each line is a row, and each comma represents a new column.
\`\`\`text
title,author,year
Frankenstein,Shelley,1818
\`\`\`

### 3. JSON (JavaScript Object Notation)
The language of the web. It uses **key-value pairs** and can nest data inside other data.
\`\`\`json
{
  "book": "Dracula",
  "metadata": {"author": "Stoker", "year": 1897}
}
\`\`\`

### 4. XML (eXtensible Markup Language)
Used extensively in libraries and digital editions (like the TEI - Text Encoding Initiative). It uses "tags" to describe the meaning of text.
\`\`\`xml
<poem>
  <line>The woods are lovely, dark and deep</line>
</poem>
\`\`\`

::: try-it
Look at the CSV data in the challenge below. Notice how it mimics a table but is stored as simple text.
:::
`,
    challenges: [
      {
        id: 'digital-literacy-02-c1',
        title: 'Parse a CSV string',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import csv\nimport io\n\n# A researcher gives you this string of archival data:\ncsv_data = """name,year,genre\nFrankenstein,1818,Gothic\nPride and Prejudice,1813,Romance\nDracula,1897,Gothic"""\n\n# Goal: Print each row as a list\n# Your code here\n`,
        expectedOutput: "['name', 'year', 'genre']\n['Frankenstein', '1818', 'Gothic']\n['Pride and Prejudice', '1813', 'Romance']\n['Dracula', '1897', 'Gothic']",
        hints: [
          'The csv.reader() function needs a "file-like" object, so we use io.StringIO(csv_data).',
          'Loop through the reader using "for row in reader:".',
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
      'Explain how computers represent characters as numbers',
      'Identify UTF-8 as the universal standard for DH',
      'Troubleshoot "Mojibake" (broken characters)',
    ],
    keywords: ['encoding', 'utf-8', 'ascii', 'unicode', 'mojibake'],
    content: `# Character Encoding

## Why Do Characters Break?
Have you ever seen text like \`cafÃ©\` instead of \`café\`? This is called **Mojibake**. It happens because the computer is using the wrong "map" to translate binary numbers into human characters.

::: definition
**Character Encoding**: A lookup table that assigns a unique number to every character.
:::

## A Brief History
1. **ASCII**: The original map. Only had 128 characters. Fine for English, but useless for accented letters, emojis, or non-Latin scripts.
2. **Unicode (UTF-8)**: The "One Map to Rule Them All." It contains over 140,000 characters and covers almost every language on Earth. **Always use UTF-8 when saving your research data.**

## Dealing with Bytes
In Python, strings are for humans (\`"hello"\`), but **bytes** are what the computer actually saves (\`b'hello'\`). 

\`\`\`python
word = "café"
encoded = word.encode("utf-8") # Turns string into bytes
print(encoded) # Result: b'caf\\xc3\\xa9'
\`\`\`

::: try-it
Try encoding a string with a non-English character (like a Greek letter or an Emoji) in the sandbox to see the byte representation.
:::
`,
    challenges: [
      {
        id: 'digital-literacy-03-c1',
        title: 'Explore text encoding',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Let's fix some text encoding\ntext = "café"\n\n# 1. Encode 'text' into UTF-8 bytes and print it\n# 2. Decode those bytes back into a string and print it\n`,
        expectedOutput: "b'caf\\xc3\\xa9'\ncafé",
        hints: [
          'Use .encode("utf-8") on the string.',
          'Use .decode("utf-8") on the resulting bytes.',
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
      'Declare and update variables',
      'Identify the four core primitive types (str, int, float, bool)',
      'Perform basic type conversion',
    ],
    keywords: ['variables', 'types', 'strings', 'integers', 'booleans'],
    content: `# Variables and Data Types

## Labeled Storage
In Python, a **variable** is a name that refers to a value. Think of it like a label on a box.

\`\`\`python
book_title = "The Great Gatsby" # A String (str)
page_count = 180                 # An Integer (int)
price = 12.99                    # A Float (float)
is_public_domain = True          # A Boolean (bool)
\`\`\`

## Why Types Matter
Python needs to know what *kind* of data is in the box to know what it can do with it. You can't divide a string by an integer!

::: definition
**Type Casting**: Forcing a value from one type to another. 
Example: \`str(1818)\` turns the number into the text "1818".
:::

## Naming Conventions
- Use \`snake_case\` (all lowercase with underscores).
- Be descriptive! Use \`word_count\` instead of just \`x\`.

::: try-it
Experiment with the \`type()\` function. It will tell you exactly what Python thinks your data is.
:::
`,
    challenges: [
      {
        id: 'python-basics-01-c1',
        title: 'Create variables',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# 1. Create a variable 'book_title' with value "Frankenstein"\n# 2. Create a variable 'pub_year' with value 1818\n# 3. Print both variables\n# 4. Print the type of 'book_title' and 'pub_year'\n`,
        expectedOutput: 'Frankenstein\n1818\n<class \'str\'>\n<class \'int\'>',
        hints: ['Use type(variable_name) to see the class.', 'Variable names should not have quotes, but string values must.'],
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
      'Store collections of data in Lists',
      'Use Dictionaries for structured "record-like" data',
      'Access items using indices and keys',
    ],
    keywords: ['lists', 'dictionaries', 'collections', 'indexing'],
    content: `# Collections of Data

Rarely do we work with just one book title. We usually have a **corpus** (a collection of texts).

## Lists (Ordered Sequences)
Lists are used when order matters. They are zero-indexed, meaning the first item is at position \`0\`.
\`\`\`python
authors = ["Austen", "Shelley", "Brontë"]
print(authors[0]) # Output: Austen
\`\`\`

## Dictionaries (Key-Value Pairs)
Dictionaries are like a real-world dictionary: you look up a **key** to find a **value**. This is perfect for metadata.
\`\`\`python
book = {
    "title": "Frankenstein", 
    "author": "Shelley", 
    "year": 1818
}
print(book["author"]) # Output: Shelley
\`\`\`

::: definition
**Mutable**: Both lists and dictionaries can be changed after they are created (you can add, remove, or update items).
:::

::: try-it
Create a list of numbers and try using \`len()\` to see how many items it has.
:::
`,
    challenges: [
      {
        id: 'python-basics-02-c1',
        title: 'Work with collections',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# 1. Create a list 'books' with 3 titles\n# 2. Create a dictionary 'meta' with keys: title, author, year\n# 3. Print the length of the list\n# 4. Print the author from the dictionary\n`,
        expectedOutput: '3\nShelley',
        hints: ['len(list) gives the size.', 'Access dictionary values with meta["author"].'],
        solution: `books = ["Frankenstein", "Dracula", "Jane Eyre"]\nmeta = {"title": "Frankenstein", "author": "Shelley", "year": 1818}\nprint(len(books))\nprint(meta["author"])`,
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
      'Write conditional logic (if/else)',
      'Automate repetitive tasks with for-loops',
      'Understand indentation as logic in Python',
    ],
    keywords: ['if', 'else', 'for', 'loops', 'indentation'],
    content: `# Control Flow

## Logic and Loops
Programming is the art of telling the computer: "If this happens, do that. Otherwise, do this. And keep doing it until you're finished."

### 1. Conditionals (\`if\`, \`elif\`, \`else\`)
Used to make decisions.
\`\`\`python
year = 1850
if year < 1800:
    print("Pre-19th Century")
elif year < 1900:
    print("19th Century")
else:
    print("Modern")
\`\`\`

### 2. For Loops
Used to iterate over a collection.
\`\`\`python
corpus = ["Moby Dick", "Oliver Twist", "Beloved"]
for book in corpus:
    print(f"Analyzing {book}...")
\`\`\`

::: definition
**Whitespace Matters**: In Python, you must indent the code inside a loop or an \`if\` statement using 4 spaces or a tab. This tells Python which code belongs to that block.
:::
`,
    challenges: [
      {
        id: 'python-basics-03-c1',
        title: 'Loop and filter',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Given a list of word counts, print only those greater than 1000\nword_counts = [500, 1200, 800, 3000, 150, 2500]\n\n# Your code here\n`,
        expectedOutput: '1200\n3000\n2500',
        hints: ['Use "for count in word_counts:"', 'Inside the loop, use an "if" statement.'],
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
      'Encapsulate logic into reusable Functions',
      'Use parameters and return values',
      'Understand scope',
    ],
    keywords: ['functions', 'def', 'return', 'arguments'],
    content: `# Functions: Your Custom Tools

## Don't Repeat Yourself (DRY)
A function is a block of code that only runs when called. If you find yourself copying and pasting the same code 10 times, you should probably write a function instead.

## Anatomy of a Function
\`\`\`python
def calculate_ratio(pos_words, neg_words):
    # 'pos_words' and 'neg_words' are parameters
    ratio = pos_words / neg_words
    return ratio # 'return' sends the result back to you
\`\`\`

## Why Use Functions?
1. **Readability**: Your code looks like English.
2. **Maintenance**: Fix a bug in the function, and it's fixed everywhere.
3. **Collaboration**: You can write a function for "Cleaning Text" and share it with a colleague.

::: try-it
Try writing a function that greets a researcher by name.
:::
`,
    challenges: [
      {
        id: 'python-basics-04-c1',
        title: 'Write a function',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Write a function 'reading_time' that takes a text string\n# and returns the estimated reading time in minutes.\n# Assume 200 words per minute.\n\ndef reading_time(text):\n    # 1. Count words (text.split())\n    # 2. Return count / 200\n    pass\n\nsample = "word " * 400\nprint(reading_time(sample))`,
        expectedOutput: '2.0',
        hints: ['len(text.split()) gives you the number of words.', 'Make sure the function returns a value.'],
        solution: `def reading_time(text):\n    words = len(text.split())\n    return words / 200\n\nsample = "word " * 400\nprint(reading_time(sample))`,
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
      'Safely open files using Context Managers',
      'Read entire files or line-by-line',
      'Output results to a permanent .txt file',
    ],
    keywords: ['files', 'open', 'read', 'write', 'with'],
    content: `# Reading and Writing Files

## The "With" Statement
In Python, we use the \`with\` keyword to open files. This is a **Context Manager**; it ensures the file is closed properly even if your code crashes.

### Reading
\`\`\`python
with open('diary.txt', 'r', encoding='utf-8') as f:
    text = f.read()
    print(text)
\`\`\`

### Writing
\`\`\`python
with open('results.txt', 'w', encoding='utf-8') as f:
    f.write('The most common word was: "the"')
\`\`\`

## Modes
- \`'r'\`: Read (default).
- \`'w'\`: Write (overwrites everything!).
- \`'a'\`: Append (adds to the end).

::: definition
**Encoding**: Always specify \`encoding='utf-8'\` when opening files to avoid character errors across different computers.
:::
`,
    challenges: [
      {
        id: 'python-basics-05-c1',
        title: 'File operations',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# 1. Write "Line 1\\nLine 2\\nLine 3" to a file named 'test.txt'\n# 2. Read that file back and print the contents\n`,
        expectedOutput: 'Line 1\nLine 2\nLine 3',
        hints: ['\\n creates a new line in a string.', 'Open with "w" first, then "r" in a separate block.'],
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
      'Perform case normalization',
      'Tokenize text using basic string splitting',
      'Find and replace substrings',
    ],
    keywords: ['string', 'text', 'normalization', 'splitting'],
    content: `# String Operations for Text Analysis

## Text as Data
Before we can perform "Artificial Intelligence" or "Topic Modeling," we must first treat text as a simple series of characters.

### Case Normalization
To a computer, "The" and "the" are completely different things. Most analysis starts by lowercasing everything.
\`\`\`python
text = "The Raven"
print(text.lower()) # "the raven"
\`\`\`

### Basic Tokenization
Splitting a string into individual words is called **tokenization**.
\`\`\`python
sentence = "Deep into that darkness peering"
tokens = sentence.split() # Splits on spaces by default
# ['Deep', 'into', 'that', 'darkness', 'peering']
\`\`\`

### Cleaning with Replace
You can remove unwanted characters like underscores or HTML tags using \`.replace()\`.
\`\`\`python
clean = dirty_text.replace("<p>", "")
\`\`\`

::: try-it
Try chaining methods: \`text.strip().lower().split()\`
:::
`,
    challenges: [
      {
        id: 'text-analysis-01-c1',
        title: 'Count words in a text',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `def count_words(text):\n    # 1. Split text into words\n    # 2. Return length of list\n    pass\n\nsample = "The quick brown fox"\nprint(count_words(sample))`,
        expectedOutput: '4',
        hints: ['The split() method is your best friend here.', 'Use len() on the resulting list.'],
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
      'Build complex search patterns with Regex',
      'Use character classes (\\d, \\w, \\s)',
      'Extract patterns like dates or emails',
    ],
    keywords: ['regex', 'pattern matching', 're', 'wildcards'],
    content: `# Regular Expressions (Regex)

## Find on Steroids
Imagine you need to find every year mentioned in a 500-page book. Searching for "1800", then "1801", then "1802" would take days. **Regex** allows you to search for the *pattern* "any four numbers in a row."

## The \`re\` Module
Python uses the \`re\` library for regex.

### Common Symbols
- \`\\d\`: Any digit (0-9)
- \`\\w\`: Any word character (a-z, A-Z)
- \`+\`: One or more of the preceding
- \`*\`: Zero or more
- \`{4}\`: Exactly four of the preceding

\`\`\`python
import re
text = "Contact me at research@university.edu or 555-1234."
# Look for something like digits-digits
phone = re.findall(r'\\d+-\\d+', text) 
print(phone) # ['555-1234']
\`\`\`

::: definition
**The "r" prefix**: We use \`r'pattern'\` (raw string) so Python doesn't get confused by the backslashes.
:::
`,
    challenges: [
      {
        id: 'text-analysis-02-c1',
        title: 'Extract years from text',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import re\n\ntext = "Published in 1818, revised in 1831, reprinted in 1869."\n\n# Goal: Use re.findall to find all 4-digit years\n# Your code here\n`,
        expectedOutput: "['1818', '1831', '1869']",
        hints: ['The pattern for a digit is \\d.', 'To find exactly 4, use {4}.'],
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
      'Count frequencies efficiently with Counter',
      'Visualize Zipf\'s Law in text',
      'Filter for the most common terms',
    ],
    keywords: ['frequency', 'counting', 'counter', 'zipf'],
    content: `# Word Frequency Analysis

## What's in a Word?
Frequency analysis helps us understand the dominant themes of a text. While "the" and "and" are always common, the top *nouns* and *verbs* reveal the "aboutness" of a document.

## The \`Counter\` Object
Counting manually with a dictionary is slow. Python's \`collections.Counter\` is built for this.

\`\`\`python
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)

print(counts["apple"]) # 3
print(counts.most_common(2)) # [('apple', 3), ('banana', 2)]
\`\`\`

## Pre-processing for Count
Before counting, always:
1. Lowercase your text.
2. Remove punctuation.
3. (Optional) Remove "Stopwords" (common words like 'a', 'the', 'of').
`,
    challenges: [
      {
        id: 'text-analysis-03-c1',
        title: 'Find most common words',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter\n\ntext = "to be or not to be that is the question"\n\n# 1. Split the text into words\n# 2. Use Counter to find the 3 most common words\n# 3. Print the result\n`,
        expectedOutput: "[('to', 2), ('be', 2), ('or', 1)]",
        hints: ['Remember to split() first!', 'Use the .most_common(3) method on your Counter object.'],
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
      'Remove punctuation using Regex or string.punctuation',
      'Handle multiple whitespaces and newlines',
      'Calculate unique vocabulary size (Type/Token Ratio)',
    ],
    keywords: ['cleaning', 'normalization', 'preprocessing', 'punctuation'],
    content: `# Text Cleaning: The Unsung Work of DH

## Garbage In, Garbage Out
If your text contains "End?", "end,", and "end!", a computer sees three different words. To get accurate counts, you must strip away the "noise."

### A Typical Cleaning Pipeline:
1. **Lowercase**: \`text.lower()\`
2. **Strip Whitespace**: \`text.strip()\`
3. **Remove Punctuation**: Using Regex (\`re.sub\`) is the most robust way.
4. **Remove Numbers**: (If irrelevant to your study).

\`\`\`python
import re
raw_text = "  Hello!!! My name is Victor...  "
# Remove anything that isn't a word character or whitespace
clean = re.sub(r'[^\\w\\s]', '', raw_text)
print(clean.strip().lower()) # "hello my name is victor"
\`\`\`

::: try-it
Try calculating the "Vocabulary Diversity" of a sentence by putting its cleaned words into a \`set()\`.
:::
`,
    challenges: [
      {
        id: 'text-analysis-04-c1',
        title: 'Clean a text passage',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import re\n\ntext = "  It was the BEST of times, it was the WORST of times...  "\n\n# 1. Clean: lowercase, strip whitespace, remove punctuation\n# 2. Split into a list of words\n# 3. Use set() to find the number of unique words\n# 4. Print that number\n`,
        expectedOutput: '8',
        hints: [
          're.sub(r"[^\\w\\s]", "", text) removes punctuation.',
          'set(list) removes all duplicates.',
        ],
        solution: `import re\n\ntext = "  It was the BEST of times, it was the WORST of times...  "\ncleaned = re.sub(r'[^\\w\\s]', '', text.strip().lower())\nunique_words = set(cleaned.split())\nprint(len(unique_words))`,
      },
    ],
  },
  {
    id: 'text-analysis-05',
    title: 'Basic NLP with NLTK',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['text-analysis-04'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand the difference between simple strings and linguistic tokens',
      'Use NLTK to perform Part-of-Speech (POS) tagging',
      'Filter texts for specific grammatical categories (e.g., all adjectives)',
    ],
    keywords: ['nltk', 'tokenization', 'pos-tagging', 'nlp', 'linguistics'],
    content: `# Natural Language Processing (NLP)

## Moving Beyond Strings
While \`.split()\` and \`.lower()\` are useful, they don't "understand" language. **NLP** treats text as a linguistic structure.

### Tokenization
The NLTK (\`Natural Language Toolkit\`) tokenizer is smarter than \`.split()\`. It knows that "don't" is actually two words ("do" and "n't") and that a period at the end of a sentence shouldn't be attached to the last word.

\`\`\`python
import nltk
from nltk.tokenize import word_tokenize

text = "Mary Shelley wrote Frankenstein."
tokens = word_tokenize(text)
# Result: ['Mary', 'Shelley', 'wrote', 'Frankenstein', '.']
\`\`\`

### Part-of-Speech (POS) Tagging
POS tagging identifies if a word is a Noun, Verb, Adjective, etc. This is incredibly useful for analyzing *how* an author writes (e.g., "Does this poet use more adjectives than that poet?").

\`\`\`python
tagged = nltk.pos_tag(tokens)
# Result: [('Mary', 'NNP'), ('wrote', 'VBD')]
# NNP = Proper Noun, VBD = Verb Past Tense
\`\`\`
`,
    challenges: [
      {
        id: 'text-analysis-05-c1',
        title: 'Tokenize a sentence',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import nltk\nnltk.download('punkt_tab', quiet=True)\nfrom nltk.tokenize import word_tokenize\n\ntext = "Mary Shelley wrote Frankenstein in 1818."\n\n# Goal: Use word_tokenize and print the list of tokens\n`,
        expectedOutput: "['Mary', 'Shelley', 'wrote', 'Frankenstein', 'in', '1818', '.']",
        hints: [
          'Import word_tokenize from nltk.tokenize.',
          'Call word_tokenize(text) and print the result.',
        ],
        solution: `import nltk\nnltk.download('punkt_tab', quiet=True)\nfrom nltk.tokenize import word_tokenize\n\ntext = "Mary Shelley wrote Frankenstein in 1818."\nprint(word_tokenize(text))\n`,
      },
      {
        id: 'text-analysis-05-c2',
        title: 'Extract proper nouns',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import nltk\nnltk.download('punkt_tab', quiet=True)\nnltk.download('averaged_perceptron_tagger_eng', quiet=True)\nfrom nltk.tokenize import word_tokenize\n\ntext = "Jane Austen published Pride and Prejudice in 1813."\ntokens = word_tokenize(text)\n\n# 1. Use nltk.pos_tag(tokens) to get tags\n# 2. Filter for tags that are 'NNP'\n# 3. Print the list of words\n`,
        expectedOutput: "['Jane', 'Austen', 'Pride', 'Prejudice']",
        hints: [
          'pos_tag returns a list of tuples: (word, tag).',
          'Use a list comprehension: [word for word, tag in tagged if tag == "NNP"].',
        ],
        solution: `import nltk\nnltk.download('punkt_tab', quiet=True)\nnltk.download('averaged_perceptron_tagger_eng', quiet=True)\nfrom nltk.tokenize import word_tokenize\n\ntext = "Jane Austen published Pride and Prejudice in 1813."\ntokens = word_tokenize(text)\ntagged = nltk.pos_tag(tokens)\nproper_nouns = [word for word, tag in tagged if tag == 'NNP']\nprint(proper_nouns)\n`,
      },
    ],
  },
  {
    id: 'text-analysis-06',
    title: 'Sentiment Analysis',
    moduleId: 'text-analysis-fundamentals',
    prerequisites: ['text-analysis-05'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand rule-based sentiment scoring',
      'Use a lexicon to calculate "polarity"',
      'Analyze emotional shifts across a text sequence',
    ],
    keywords: ['sentiment', 'polarity', 'lexicon', 'emotion'],
    content: `# Sentiment Analysis

## Listening for Tone
Sentiment analysis is the computational study of opinions, sentiments, and emotions in text. In DH, we use it to track the emotional "arc" of a novel or the public mood in historical newspapers.

### Lexicon-Based Approach
The simplest way to do this is using a **lexicon** (a dictionary of words labeled with scores).
- "Excellent": +1.0
- "Terrible": -1.0
- "Okay": 0.0

### Sentiment Polarity
Polarity refers to how positive or negative a text is.

\`\`\`python
# A toy example of rule-based sentiment
lexicon = {"love": 1, "joy": 1, "hate": -1, "sad": -1}
text = "i love the joy but hate the sad"

score = 0
for word in text.split():
    score += lexicon.get(word, 0)

print(f"Total Sentiment: {score}") # Output: 0
\`\`\`

::: tip
Real-world tools like **VADER** or **TextBlob** handle complexities like "not happy" (negation) or "VERY HAPPY" (intensity).
:::
`,
    challenges: [
      {
        id: 'text-analysis-06-c1',
        title: 'Calculate sentiment score',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `lexicon = {"dark": -1, "stormy": -1, "bright": 1, "hope": 1}\ntext = "it was a dark and stormy night but i had hope"\n\n# 1. Split the text into words\n# 2. Sum the scores based on the lexicon\n# 3. Print the final score\n`,
        expectedOutput: '-1',
        hints: ['Use a loop or a list comprehension.', 'The .get() method on a dictionary is useful for avoiding errors with words not in the lexicon.'],
        solution: `lexicon = {"dark": -1, "stormy": -1, "bright": 1, "hope": 1}\ntext = "it was a dark and stormy night but i had hope"\nscore = sum(lexicon.get(word, 0) for word in text.split())\nprint(score)`,
      },
    ],
  },
  {
    id: 'structured-data-01',
    title: 'Introduction to CSV and Tabular Data',
    moduleId: 'structured-data',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand the tabular nature of humanities data (e.g., prosopography)',
      'Read CSVs into Python lists of dictionaries',
      'Filter data based on column values',
    ],
    keywords: ['csv', 'tabular', 'rows', 'columns', 'dictionaries'],
    content: `# Working with Tabular Data

## Data in Rows and Columns
Much of DH involves structured lists: a list of every student at a university in 1850, or every play performed at a specific theater.

While Excel is good for looking at data, Python is better for *querying* it.

\`\`\`python
import csv

# Reading a CSV as a list of Dictionaries
with open('catalog.csv', mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Each row is a dictionary like: {"title": "Hamlet", "year": "1603"}
        print(row["title"])
\`\`\`

::: try-it
Try using \`csv.DictWriter\` to create a CSV from a list of Python dictionaries.
:::
`,
    challenges: [
      {
        id: 'structured-data-01-c1',
        title: 'Parse CSV data',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `import csv\nimport io\n\ndata = "name,year\\nAusten,1813\\nShelley,1818"\n# 1. Use csv.reader on io.StringIO(data)\n# 2. Print each row\n`,
        expectedOutput: "['name', 'year']\n['Austen', '1813']\n['Shelley', '1818']",
        hints: ['The reader works just like a loop.'],
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
      'Load data into a Pandas DataFrame',
      'Select specific columns and rows',
      'View summary statistics of a dataset',
    ],
    keywords: ['pandas', 'dataframe', 'series', 'data science'],
    content: `# Introducing Pandas

## Why Pandas?
For small files, the \`csv\` module is fine. But for datasets with thousands of rows, we use **Pandas**. It is the industry standard for data science.

### The DataFrame
A **DataFrame** is essentially a programmable spreadsheet.

\`\`\`python
import pandas as pd

# Create a DataFrame from a dictionary
data = {
    'title': ['Frankenstein', 'Dracula'],
    'year': [1818, 1897]
}
df = pd.DataFrame(data)

print(df.head()) # See the first few rows
print(df['title']) # Get just the 'title' column
\`\`\`

## Key Methods
- \`df.describe()\`: Gives you the mean, min, max of numeric columns.
- \`df.shape\`: Tells you how many rows and columns you have.
`,
    challenges: [
      {
        id: 'structured-data-02-c1',
        title: 'Create a DataFrame',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `import pandas as pd\n# 1. Create a DataFrame with columns: title, author, year\n# 2. Use 3 fictional or real books\n# 3. Print len(df)\n`,
        expectedOutput: '3',
        hints: ['The dictionary keys become columns, and values (lists) become rows.'],
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
      'Perform boolean indexing (filtering)',
      'Sort data by one or more criteria',
      'Handle missing data (NaNs)',
    ],
    keywords: ['filter', 'sort', 'query', 'boolean indexing'],
    content: `# Filtering and Sorting in Pandas

## Asking Questions of Data
The power of Pandas lies in filtering. Instead of looking through a spreadsheet, you can write: "Show me all books published between 1850 and 1900 with 'London' in the title."

### Boolean Indexing
\`\`\`python
# "Show me rows where the year is greater than 1850"
later_books = df[df['year'] > 1850]
\`\`\`

### Sorting
\`\`\`python
# Sort by year, oldest first
sorted_df = df.sort_values(by='year', ascending=True)
\`\`\`

### Handling Missing Values
In historical data, we often have missing values (\`NaN\`).
\`\`\`python
df = df.dropna() # Remove any row with missing data
# OR
df = df.fillna(0) # Replace missing with 0
\`\`\`
`,
    challenges: [
      {
        id: 'structured-data-03-c1',
        title: 'Filter data',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Given a list of dicts, filter items where year > 1850\ndata = [{'name': 'A', 'year': 1813}, {'name': 'B', 'year': 1818}, {'name': 'C', 'year': 1897}]\n\n# Your code here: Create a list 'filtered' and print its length\n`,
        expectedOutput: '1',
        hints: ['A list comprehension [d for d in data if...] is very efficient here.'],
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
      'Use GroupBy to categorize data',
      'Apply aggregate functions (sum, mean, count)',
      'Pivot data for comparative analysis',
    ],
    keywords: ['groupby', 'aggregate', 'summary', 'statistics'],
    content: `# Grouping and Aggregation

## Categorical Analysis
Humanities data is often categorical. We might want to compare the average word count of "Gothic" novels vs "Romance" novels.

### The GroupBy Pattern
1. **Split**: Group data by a category (e.g., 'genre').
2. **Apply**: Calculate something for each group (e.g., 'mean').
3. **Combine**: Bring it back into a summary table.

\`\`\`python
# Calculate average year of publication per genre
summary = df.groupby('genre')['year'].mean()
print(summary)
\`\`\`

## Common Aggregations
- \`.count()\`: How many items?
- \`.sum()\`: Total?
- \`.unique()\`: What are the different categories?
`,
    challenges: [
      {
        id: 'structured-data-04-c1',
        title: 'Group and count',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Count how many books are in each genre\nbooks = [('Gothic', 'A'), ('Gothic', 'B'), ('Romance', 'C')]\n\n# Your code here: Create a dictionary of counts\n`,
        expectedOutput: '2',
        hints: ['Use a dictionary to keep track of counts as you loop through the list.'],
        solution: `books = [('Gothic', 'A'), ('Gothic', 'B'), ('Romance', 'C')]\ncounts = {}\nfor genre, _ in books:\n    counts[genre] = counts.get(genre, 0) + 1\nprint(counts['Gothic'])`,
      },
    ],
  },
  {
    id: 'structured-data-05',
    title: 'JSON and Nested Structures',
    moduleId: 'structured-data',
    prerequisites: ['python-basics-02'],
    estimatedTimeMinutes: 30,
    difficulty: 'intermediate',
    learningObjectives: [
      'Navigate nested dictionaries and lists',
      'Understand the key-value structure of JSON',
      'Safely access deep data points',
    ],
    keywords: ['json', 'nested', 'keys', 'parsing'],
    content: `# Navigating Nested Data

## The Onion Structure
If a CSV is a flat table, **JSON** is an onion. It is the format most used by web archives and digital libraries. To get to the "heart" of the data, you must peel back the layers.

\`\`\`python
archive_entry = {
    "id": "A100",
    "metadata": {
        "creator": "Shelley, Mary",
        "dates": [1818, 1823, 1831]
    }
}
\`\`\`

To get the first date:
\`\`\`python
print(archive_entry["metadata"]["dates"][0])
\`\`\`

::: tip
If you aren't sure if a key exists, use \`.get("key")\`. It will return \`None\` instead of crashing your program.
:::
`,
    challenges: [
      {
        id: 'structured-data-05-c1',
        title: 'Access nested data',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `data = {\n    "title": "Frankenstein",\n    "chapters": [\n        {"num": 1, "title": "Letters"},\n        {"num": 2, "title": "Birth"}\n    ]\n}\n\n# Goal: Print the title of the second chapter\n# Your code here\n`,
        expectedOutput: 'Birth',
        hints: ['chapters is a list, so you need an index first, then a key.'],
        solution: `data = {"title": "Frankenstein", "chapters": [{"num": 1, "title": "Letters"}, {"num": 2, "title": "Birth"}]}\nprint(data["chapters"][1]["title"])`,
      },
    ],
  },
  {
    id: 'data-viz-01',
    title: 'Principles of Effective Visualization',
    moduleId: 'data-visualization',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 25,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand the rhetorical power of visualization',
      'Select the right chart type for your data',
      'Avoid "Chart Junk" and misleading scales',
    ],
    keywords: ['visualization', 'charts', 'design', 'principles', 'ethics'],
    content: `# Principles of Visualization

## Why Visualize?
A visualization isn't just a picture; it's an **argument**. It allows you to see patterns in a corpus of 1,000 books that would be impossible to see by reading them individually.

## Choosing Your Chart
- **Bar Chart**: Best for comparing categories (e.g., number of books per author).
- **Line Chart**: Best for showing change over time (e.g., frequency of a word over 100 years).
- **Scatter Plot**: Best for showing the relationship between two numbers (e.g., book length vs. publication year).
- **Histogram**: Best for seeing the "distribution" of data.

## Best Practices
1. **Label Everything**: Every axis needs a title and a unit.
2. **Start at Zero**: Bar charts should usually start their Y-axis at 0 to avoid exaggerating differences.
3. **Color with Purpose**: Don't use 20 colors if 2 will do. Use color to highlight the most important data.
`,
    challenges: [
      {
        id: 'data-viz-01-c1',
        title: 'Choose chart type',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Identify the correct chart type\n# Options: "bar", "line", "scatter", "histogram"\n\nquestions = {\n    "comparing_categories": "???",\n    "trends_over_time": "???"\n}\n\n# Print the answer for comparing categories\nprint("bar")`,
        expectedOutput: 'bar',
        hints: ['Bars are for categories. Lines are for time.'],
        solution: `print("bar")`,
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
      'Create basic charts using Matplotlib',
      'Label axes and add titles',
      'Save plots as image files (PNG/PDF)',
    ],
    keywords: ['matplotlib', 'bar', 'line', 'pyplot'],
    content: `# Plotting with Matplotlib

## The "Grandfather" of Python Viz
\`matplotlib.pyplot\` is the most widely used plotting library. While it can be complex, its basic "interface" is very straightforward.

\`\`\`python
import matplotlib.pyplot as plt

# Data
x = ["1810s", "1820s", "1830s"]
y = [5, 12, 18]

# Create Plot
plt.bar(x, y, color='skyblue')

# Add Labels
plt.xlabel("Decade")
plt.ylabel("Number of Publications")
plt.title("Gothic Novels Over Time")

# Show or Save
plt.show()
plt.savefig("my_chart.png")
\`\`\`

::: try-it
Try changing \`plt.bar\` to \`plt.plot\` to see how the same data looks as a line chart.
:::
`,
    challenges: [
      {
        id: 'data-viz-02-c1',
        title: 'Prepare data for a plot',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# 1. Create a list 'labels' with 3 book titles\n# 2. Create a list 'counts' with 3 word counts (integers)\n# 3. Print both lists\n`,
        expectedOutput: "['Book A', 'Book B', 'Book C']\n[50000, 75000, 30000]",
        hints: ['Maintain the same order in both lists so they match up.'],
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
      'Modify plot styles and color palettes',
      'Create subplots for side-by-side comparison',
      'Adjust figure size and DPI for publication',
    ],
    keywords: ['customization', 'subplots', 'styling', 'dpi'],
    content: `# Making it Look Good

## Beyond the Defaults
Default charts are often ugly. To make them "publication-ready," we need to tweak the details.

### Using Styles
Matplotlib comes with built-in themes.
\`\`\`python
plt.style.use('ggplot') # Emulates R's ggplot2
# OR
plt.style.use('seaborn-v0_8')
\`\`\`

### Multiple Plots
You can put several charts in one figure using \`subplots\`.
\`\`\`python
# 1 row, 2 columns
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5))

ax1.bar(names, vals)
ax1.set_title("First Plot")

ax2.plot(years, freqs)
ax2.set_title("Second Plot")
\`\`\`

::: tip
Use \`figsize=(width, height)\` to prevent your labels from overlapping.
:::
`,
    challenges: [
      {
        id: 'data-viz-03-c1',
        title: 'Summarize data for viz',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `# Calculate the total count of items in a dictionary for a chart title\ndata = {"Gothic": 15, "Romance": 22, "Adventure": 8}\n\n# Your code here: print "Total: X"\n`,
        expectedOutput: 'Total: 45',
        hints: ['sum(data.values()) is your friend.'],
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
      'Visualize the most common words in a corpus',
      'Create "Dispersion Plots" to see where words appear',
      'Compare word usage across different authors',
    ],
    keywords: ['frequency', 'dispersion', 'corpus-viz', 'textual-data'],
    content: `# Visualizing Textual Patterns

## Turning Words into Shapes
The most common task in DH text analysis is visualizing word frequencies.

### Frequency Bar Charts
\`\`\`python
from collections import Counter
import matplotlib.pyplot as plt

text = "the whale the sea the whale ship"
counts = Counter(text.split())
top_words = counts.most_common(2) # [('the', 3), ('whale', 2)]

words = [item[0] for item in top_words]
freqs = [item[1] for item in top_words]

plt.bar(words, freqs)
plt.show()
\`\`\`

## Advanced Viz: Lexical Dispersion
A **Dispersion Plot** shows where a word occurs in the timeline of a book (e.g., does the word "death" appear mostly at the end?).

::: try-it
If you have a very long list of words, try plotting only the top 20 to keep the chart readable.
:::
`,
    challenges: [
      {
        id: 'data-viz-04-c1',
        title: 'Prepare frequency data',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `from collections import Counter\ntext = "the the the and and or"\n\n# 1. Use Counter to get the 2 most common words\n# 2. Print them\n`,
        expectedOutput: "[('the', 3), ('and', 2)]",
        hints: ['The Counter.most_common() method returns a list of tuples.'],
        solution: `from collections import Counter\ntext = "the the the and and or"\nfreq = Counter(text.split())\nprint(freq.most_common(2))`,
      },
    ],
  },
  {
    id: 'web-data-01',
    title: 'Understanding HTML Structure',
    moduleId: 'web-data-collection',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Identify HTML tags, attributes, and content',
      'Understand the "Nested" nature of the DOM',
      'Use browser Inspector tools to find data',
    ],
    keywords: ['html', 'dom', 'elements', 'scraping', 'tags'],
    content: `# The Anatomy of a Webpage

## HTML as a Tree
Webpages aren't just text; they are structured documents. To "scrape" data, you must understand how to find the specific "branch" where your information is hiding.

### Elements and Tags
- \`<h1>\`: A top-level heading.
- \`<p>\`: A paragraph.
- \`<a>\`: A link (uses the \`href\` attribute).
- \`<div class="article">\`: A generic container with a label.

### The DOM (Document Object Model)
Think of HTML as an onion. A \`<body>\` tag contains a \`<div>\`, which contains a \`<ul>\` (list), which contains an \`<li>\` (item). 

\`\`\`html
<div id="content">
  <p>The actual data we want.</p>
</div>
\`\`\`

::: tip
In your browser, right-click any element and select **"Inspect"** to see its HTML code. This is the first step of any scraping project!
:::
`,
    challenges: [
      {
        id: 'web-data-01-c1',
        title: 'Parse HTML string',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Manually extract text from this "tag"\nhtml = "<h1>Digital Humanities</h1>"\n\n# Your code here: print the text without tags\n`,
        expectedOutput: 'Digital Humanities',
        hints: ['You can use .replace("<h1>", "").replace("</h1>", "") for now.'],
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
      'Locate and read a robots.txt file',
      'Understand "Rate Limiting" and why it matters',
      'Differentiate between public data and private/copyrighted data',
    ],
    keywords: ['ethics', 'robots.txt', 'copyright', 'politeness'],
    content: `# The Ethical Scraper

## Just because you can, doesn't mean you should.
Web scraping is a powerful tool, but it can easily be abused. If you send 10,000 requests per second to a small library's website, you might crash their server.

### 1. Check \`robots.txt\`
Almost every site has a file at \`website.com/robots.txt\` that tells bots where they are allowed to go.

### 2. Be Polite (Rate Limiting)
Always add a "sleep" timer between requests so you don't overwhelm the host.
\`\`\`python
import time
time.sleep(2) # Wait 2 seconds before the next page
\`\`\`

### 3. Identify Yourself
It is best practice to include your email in the "User-Agent" header so the site admin can contact you if your bot is causing trouble.

### 4. Copyright
Scraping data for analysis is often "Fair Use" in research, but *re-publishing* that data might violate copyright.
`,
    challenges: [
      {
        id: 'web-data-02-c1',
        title: 'Check robots.txt rules',
        language: 'python' as const,
        difficulty: 'beginner' as const,
        starterCode: `# Extract the "Disallow" path from this robots string\nrobots = "User-agent: *\\nDisallow: /private/\\nAllow: /public/"\n\n# Your code here\n`,
        expectedOutput: '/private/',
        hints: ['Split the string by newlines, then check if the line starts with "Disallow".'],
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
      'Explain the difference between Scraping and using an API',
      'Use the \`requests\` library to get data',
      'Navigate nested JSON response objects',
    ],
    keywords: ['api', 'json', 'requests', 'rest'],
    content: `# APIs: The "Front Door" of Data

## What is an API?
An **Application Programming Interface (API)** is a way for two computers to talk to each other. Instead of scraping a messy webpage, many organizations (like the Library of Congress or Twitter) provide an API that sends back clean, structured data (usually in JSON format).

### Using the \`requests\` library
\`\`\`python
import requests

url = "https://api.example.com/books"
response = requests.get(url)

if response.status_code == 200:
    data = response.json() # Automatically turns JSON into a Python Dictionary
    print(data["title"])
\`\`\`

## Advantages of APIs
1. **Reliability**: Webpages change their design; APIs rarely do.
2. **Speed**: You get exactly the data you need without the "bloat" of HTML.
3. **Legality**: Using an API is an explicit invitation to access data.
`,
    challenges: [
      {
        id: 'web-data-03-c1',
        title: 'Parse JSON data',
        language: 'python' as const,
        difficulty: 'intermediate' as const,
        starterCode: `import json\n\n# Simulated API response\napi_response = '[{"title": "Book A", "year": 1818}, {"title": "Book B", "year": 1847}]'\n\n# 1. Use json.loads() to parse the string\n# 2. Loop through and print only the titles\n`,
        expectedOutput: 'Book A\nBook B',
        hints: ['json.loads() turns a string into a list or dictionary.'],
        solution: `import json\n\napi_response = '[{"title": "Book A", "year": 1818}, {"title": "Book B", "year": 1847}]'\nbooks = json.loads(api_response)\nfor book in books:\n    print(book["title"])`,
      },
    ],
  },
  {
    id: 'sonification-01',
    title: 'The Basics of Data Mapping for Sound',
    moduleId: 'data-sonification',
    prerequisites: ['python-basics-04'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand the concept of parameter mapping sonification',
      'Map a range of data values to a range of musical pitches',
      'Use Python to translate text metrics into MIDI-style notes',
    ],
    keywords: ['sonification', 'mapping', 'midi', 'frequency'],
    content: `# The Basics of Data Mapping for Sound

## Analogy

Think of data sonification like a **musical translation**. Just as a translator might map a word in French to a word in English, a "sonifier" maps a data point (like the number of times a word appears in a text) to a musical property (like the height of a note). If a bar chart uses **height** to show scale, sonification uses **pitch**.

## Key Concepts

### What is Sonification?
Sonification is the use of non-speech audio to convey information. In DH, this allows us to "hear" patterns in a corpus that might be missed by the eye, such as the rhythmic density of punctuation in a novel or the shift in sentiment over a century of diaries.

::: definition
**Parameter Mapping**: The process of linking a data variable (like a year) to a physical sound property (like volume or pitch).
:::

### Linear Mapping
To turn data into music, we must "scale" our values. Human hearing for pitch is usually measured in MIDI notes (where 60 is Middle C) or Frequency (Hz).

\`\`\`python
# Simple linear mapping function
def map_value(value, min_data, max_data, min_note, max_note):
    # Calculate how far the value is in the data range (0.0 to 1.0)
    percent = (value - min_data) / (max_data - min_data)
    # Apply that percentage to the musical range
    return int(min_note + (percent * (max_note - min_note)))

print(map_value(50, 0, 100, 60, 72)) # Maps 50 to the middle of 60-72
\`\`\`

## Practice

::: try-it
In the sandbox, try changing the \`min_note\` and \`max_note\` values. See how it affects the "resolution" of your musical translation. What happens if the \`max_note\` is lower than the \`min_note\`?
:::

## Transfer

How might the "mood" of your research change if high values were mapped to very low, rumbling notes instead of high, piercing ones? This is an aesthetic choice that impacts how your audience interprets your data.

::: challenge
You have a list of word counts from five chapters of a book. Map these counts to MIDI notes so they can be played by a virtual instrument.
:::`,
    challenges: [
      {
        id: 'sonification-01-c1',
        title: 'Mapping Pitch',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Data: word counts for 5 chapters
chapter_counts = [1200, 4500, 3200, 800, 5000]

# We want to map these to MIDI notes between 48 (Low C) and 84 (High C)
min_data = min(chapter_counts)
max_data = max(chapter_counts)
min_note = 48
max_note = 84

def sonify(val):
    # Your code here: 
    # 1. Find the percentage of the value in the data range
    # 2. Map it to the note range
    # 3. Return as an integer
    pass

notes = [sonify(c) for c in chapter_counts]
print(notes)
`,
        expectedOutput: '[51, 79, 68, 48, 84]',
        hints: [
          'The formula for percentage is `(value - min_data) / (max_data - min_data)`.',
          'Multiply that percentage by the size of the note range: `(max_note - min_note)`.',
          'Add the result back to the `min_note` and use `int()` to round it.',
        ],
        solution: `chapter_counts = [1200, 4500, 3200, 800, 5000]
min_data = min(chapter_counts)
max_data = max(chapter_counts)
min_note = 48
max_note = 84

def sonify(val):
    percent = (val - min_data) / (max_data - min_data)
    note = min_note + (percent * (max_note - min_note))
    return int(note)

notes = [sonify(c) for c in chapter_counts]
print(notes)
`,
      },
    ],
  },
  {
    id: 'sonification-02',
    title: 'Rhythms of the Archive',
    moduleId: 'data-sonification',
    prerequisites: ['sonification-01'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Map temporal data to musical duration',
      'Create a "sequence" of notes with varying lengths',
      'Understand the relationship between data density and tempo',
    ],
    keywords: ['rhythm', 'duration', 'tempo', 'sequence'],
    content: `# Rhythms of the Archive

## Analogy

If pitch is the **space** of a sound (high or low), rhythm is its **time**. Think of a historical timeline like a sheet of music. Events that happen close together in time feel like a rapid drumroll; events separated by decades feel like long, sustained notes held by a violin.

## Key Concepts

### Temporal Sonification
In DH, we often deal with time-series data: when books were published, when letters were sent, or when a specific word appears in a text. We can map the **distance between events** to the **duration of a note**.

::: definition
**Duration**: The length of time a sound lasts. In sonification, this is often mapped to the quantity of data or the time elapsed between points.
:::

### Creating a Sequence
To "hear" a timeline, we don't just need notes; we need to know when each note starts and how long it lasts.

\`\`\`python
# A list of years when a specific event occurred
event_years = [1800, 1805, 1806, 1820]

# Calculate the 'gaps' between years to create rhythm
durations = []
for i in range(len(event_years) - 1):
    gap = event_years[i+1] - event_years[i]
    durations.append(gap)

print(durations) # [5, 1, 14]
\`\`\`

## Practice

::: try-it
What happens if you have two events in the same year? The gap would be zero. How might you handle a "zero-duration" note in music? Try adding a small "offset" to every duration so that every event makes at least a short sound.
:::

## Transfer

Think about a collection of letters. If you mapped the number of days between letters to the length of a musical rest (silence), what would a "frantic" correspondence sound like compared to a "drifting" one?

::: challenge
Take a list of timestamps (represented as integers) and calculate the durations between them to create a rhythmic score.
:::`,
    challenges: [
      {
        id: 'sonification-02-c1',
        title: 'Calculating Duration',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Timestamps of when a keyword appears in a text (page numbers)
mentions = [12, 15, 16, 40, 42]

# Goal: Create a list of durations (the difference between each mention)
# If mentions are [12, 15], the duration is 3.

durations = []

# Your code here: loop through the list and calculate differences
# Hint: Use a range based on the length of the list minus one

print(durations)
`,
        expectedOutput: '[3, 1, 24, 2]',
        hints: [
          'Use `for i in range(len(mentions) - 1):`.',
          'Access the current item with `mentions[i]` and the next item with `mentions[i+1]`.',
          'Subtract the current from the next to get the duration.',
        ],
        solution: `mentions = [12, 15, 16, 40, 42]
durations = []

for i in range(len(mentions) - 1):
    diff = mentions[i+1] - mentions[i]
    durations.append(diff)

print(durations)
`,
      },
    ],
  },
  {
    id: 'sonification-03',
    title: 'Multimodal Mapping (Pitch and Volume)',
    moduleId: 'data-sonification',
    prerequisites: ['sonification-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Map multiple data variables to different sound parameters simultaneously',
      'Understand the trade-offs between complexity and clarity in audio',
      'Create a structured data object ready for MIDI synthesis',
    ],
    keywords: ['multimodal', 'volume', 'velocity', 'synthesis'],
    content: `# Multimodal Mapping

## Analogy

Imagine watching a ballet. You aren't just watching the dancer's **feet** (the pitch); you are also watching the **force** of their movements (the volume) and the **speed** of the dance (the rhythm). By combining these, the dance tells a much richer story. Multimodal sonification does the same for data.

## Key Concepts

### Mapping Multiple Dimensions
In DH, data is rarely just one number. A diary entry has a **date**, a **word count**, and a **sentiment score**. We can map:
- **Date** $\\rightarrow$ Timing (when the note plays)
- **Sentiment** $\\rightarrow$ Pitch (high for happy, low for sad)
- **Word Count** $\\rightarrow$ Volume (louder for longer entries)

::: definition
**Velocity**: In MIDI terminology, this refers to how "hard" a note is struck, which usually controls the volume.
:::

### Complexity vs. Clarity
The more variables you map, the harder it is for the human ear to distinguish them. Usually, mapping more than 3 variables results in "musical noise."

\`\`\`python
# Data record: [Year, Sentiment_Score, Word_Count]
entry = [1850, 0.8, 500]

# Mapping to a MIDI dictionary
note_data = {
    "time": entry[0],
    "pitch": int(60 + (entry[1] * 12)), # Map 0.0-1.0 to an octave
    "velocity": int((entry[2] / 1000) * 127) # Map count to 0-127 MIDI volume
}
\`\`\`

## Practice

::: try-it
Try creating a list of three "note dictionaries" manually. If you "play" them in your head, do they sound like the data they represent?
:::

## Transfer

If you were sonifying a database of historical paintings, how would you map "brightness" or "color saturation"? Would brightness be pitch or volume? Why?

::: challenge
Convert a list of "Book" objects into a list of "Note" dictionaries using pitch for year and velocity for page count.
:::`,
    challenges: [
      {
        id: 'sonification-03-c1',
        title: 'Multimodal Note Generation',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# Corpus: Each inner list is [publication_year, page_count]
corpus = [
    [1818, 280],
    [1847, 400],
    [1897, 320]
]

# We want to map:
# Pitch: 1818-1897 -> 60-72 (MIDI range)
# Velocity (Volume): 0-500 pages -> 0-127 (MIDI range)

def generate_note(item):
    year, pages = item
    
    # Map year to pitch (60 to 72)
    # Hint: (year - 1818) / (1897 - 1818) gives percentage
    pitch = 60 + int(((year - 1818) / (1897 - 1818)) * 12)
    
    # Map pages to velocity (0 to 127)
    # Hint: (pages / 500) * 127
    velocity = int((pages / 500) * 127)
    
    return {"pitch": pitch, "velocity": velocity}

notes = [generate_note(b) for b in corpus]
for n in notes:
    print(n)
`,
        expectedOutput: "{'pitch': 60, 'velocity': 71}\n{'pitch': 64, 'velocity': 101}\n{'pitch': 72, 'velocity': 81}",
        hints: [
          'For pitch, the range is 12 (72 - 60).',
          'For velocity, ensure you are using the page count divided by 500.',
          'Use `int()` to ensure MIDI values are whole numbers.',
        ],
        solution: `corpus = [
    [1818, 280],
    [1847, 400],
    [1897, 320]
]

def generate_note(item):
    year, pages = item
    pitch = 60 + int(((year - 1818) / (1897 - 1818)) * 12)
    velocity = int((pages / 500) * 127)
    return {"pitch": pitch, "velocity": velocity}

notes = [generate_note(b) for b in corpus]
for n in notes:
    print(n)
`,
      },
    ],
  },
  {
    id: 'topic-modeling-01',
    title: 'Topic Modeling: Conceptual Foundations',
    moduleId: 'topic-modeling',
    prerequisites: ['text-analysis-04'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Explain the logic of Latent Dirichlet Allocation (LDA)',
      'Understand the "Bag of Words" assumption',
      'Differentiate between a "Topic" and a "Category"',
    ],
    keywords: ['LDA', 'distant reading', 'latent', 'probability'],
    content: `# Topic Modeling: Conceptual Foundations

## Analogy

Imagine you have a giant pile of 1,000 unsorted newspaper clippings. You don't have time to read them, but you notice that some clippings use the words "stadium," "goal," and "referee" frequently, while others use "election," "vote," and "parliament." 

Even without reading the articles, you can guess that the first group is about **Sports** and the second is about **Politics**. Topic modeling is an assistant that sorts these clippings by looking at which words tend to hang out together in the same "buckets."

## Key Concepts

### Latent Dirichlet Allocation (LDA)
LDA is the most common algorithm for topic modeling. It assumes two things:
1. **Every document is a mixture of topics**: A single letter might be 60% "family gossip" and 40% "political news."
2. **Every topic is a mixture of words**: The "Family" topic has a high probability of containing "mother," "home," and "dear."

::: definition
**Latent**: Hidden. We call it "Latent" because the topics aren't explicitly labeled in the text; the computer has to discover the hidden patterns.
:::

### The Bag of Words
To a topic model, the order of words doesn't matter. "The cat sat on the mat" and "The mat sat on the cat" are identical. It only cares about the **frequency** of words within a document.

\`\`\`python
# A "Bag of Words" representation in Python
doc = "history is a set of lies agreed upon"
bag = doc.split()
counts = {word: bag.count(word) for word in set(bag)}
print(counts)
\`\`\`

## Practice

::: try-it
If you have two documents: 
1. "The king led the army."
2. "The queen led the navy."
What words would the computer likely group together into a "Monarchy/Military" topic? Try identifying the overlap in the sandbox.
:::

## Transfer

In your own research, think of a "topic" not as a fixed label, but as a **discourse**. If you are studying 19th-century novels, a topic might represent "Industrialization" or "Domesticity."

::: challenge
Identify shared words between two small "documents" to see how a model begins to cluster topics.
:::`,
    challenges: [
      {
        id: 'topic-modeling-01-c1',
        title: 'Finding Topic Overlap',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Two sentences representing two different documents
doc_a = "the storm clouds moved over the dark mountain"
doc_b = "the rain fell on the mountain and the dark forest"

# Goal: Create a set of words that appear in BOTH documents.
# These shared words are the "glue" LDA uses to build topics.

words_a = set(doc_a.split())
words_b = set(doc_b.split())

# Your code here: use a set intersection
shared_words = set() 

print(sorted(list(shared_words)))
`,
        expectedOutput: "['dark', 'mountain', 'the']",
        hints: [
          'You can find the intersection of two sets using `set_a & set_b`.',
          'Ensure you are using the sets `words_a` and `words_b`.',
        ],
        solution: `doc_a = "the storm clouds moved over the dark mountain"
doc_b = "the rain fell on the mountain and the dark forest"

words_a = set(doc_a.split())
words_b = set(doc_b.split())

shared_words = words_a & words_b

print(sorted(list(shared_words)))
`,
      },
    ],
  },
  {
    id: 'topic-modeling-02',
    title: 'Preprocessing for Topic Models',
    moduleId: 'topic-modeling',
    prerequisites: ['topic-modeling-01'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Remove "noise" words that drown out topics',
      'Apply lemmatization to group word variations',
      'Filter by frequency to focus on meaningful terms',
    ],
    keywords: ['stopwords', 'lemmatization', 'filtering', 'tokens'],
    content: `# Preprocessing for Topic Models

## Analogy

If you are trying to taste the subtle spices in a stew, you need to strain out the large bones and the excess water. In topic modeling, words like "the," "is," and "of" are the "water." They are everywhere, and they don't help you distinguish one topic from another. We need to "strain" our text to leave only the meaningful ingredients.

## Key Concepts

### 1. Removing Stopwords
In standard text analysis, we remove common words. In topic modeling, we often have to add **domain-specific stopwords**. If you are analyzing a collection of legal documents, the word "court" might be a stopword because it appears in every single document and provides no distinctive information.

### 2. Lemmatization
LDA works best when "running," "ran," and "runs" are all treated as the single concept "run." 

::: definition
**Lemmatization**: Reducing a word to its dictionary root (the lemma). 
Example: "better" $\\rightarrow$ "good".
:::

### 3. Extreme Frequency Filtering
- **Too Frequent**: Words that appear in 90% of documents (No help in distinguishing).
- **Too Rare**: Words that appear in only 1 document (Not enough evidence to form a pattern).

\`\`\`python
# Filtering a list of tokens
raw_tokens = ["the", "kings", "were", "running", "the", "kingdom"]
# Imagine we lemmatized and removed 'the' and 'were'
clean_tokens = ["king", "run", "kingdom"]
print(clean_tokens)
\`\`\`

## Practice

::: try-it
In the sandbox, try taking a sentence and removing all words shorter than 3 characters. Does the meaning of the "topic" stay intact?
:::

## Transfer

Think about your specific corpus. If you are analyzing 18th-century letters, you might need to treat "compliments" and "obedient" as stopwords, as they are part of a standard closing rather than a unique topic.

::: challenge
Create a function that filters a list of tokens by removing a provided list of stopwords.
:::`,
    challenges: [
      {
        id: 'topic-modeling-02-c1',
        title: 'Cleaning the Recipe',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# A list of words from a document
tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]
stopwords = ["it", "was", "a", "and", "in", "the"]

# Goal: Create a new list 'cleaned' containing only words not in stopwords
# and only words longer than 3 characters.

cleaned = []

# Your code here

print(cleaned)
`,
        expectedOutput: "['scary', 'dark', 'night', 'forest']",
        hints: [
          'Use a `for` loop to look at each word in `tokens`.',
          'Use `if word not in stopwords` and `if len(word) > 3`.',
        ],
        solution: `tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]
stopwords = ["it", "was", "a", "and", "in", "the"]

cleaned = [w for w in tokens if w not in stopwords and len(w) > 3]

print(cleaned)
`,
      },
    ],
  },
  {
    id: 'topic-modeling-03',
    title: 'Training an LDA Model',
    moduleId: 'topic-modeling',
    prerequisites: ['topic-modeling-02'],
    estimatedTimeMinutes: 45,
    difficulty: 'intermediate',
    learningObjectives: [
      'Convert text into a numerical Document-Term Matrix',
      'Understand the importance of the \'K\' parameter',
      'Train a basic model using the Gensim library',
    ],
    keywords: ['gensim', 'dictionary', 'corpus', 'hyperparameters'],
    content: `# Training an LDA Model

## Analogy

Training a model is like giving a student a stack of books and saying, "I want you to find 10 different themes in here." The student doesn't know what the themes are yet; they just start looking for groups of words that appear together. You, the teacher, have to decide the number of themes (the **K**) before the student starts.

## Key Concepts

### 1. The Dictionary and the Corpus
Computers can't read words; they read numbers. 
- **The Dictionary**: A map that assigns an ID to every unique word. ("whale" = 1, "ship" = 2).
- **The Corpus**: A numerical version of your text. Instead of "the whale," it stores "(1, 2)"—meaning Word ID 1 appears 2 times.

### 2. Choosing K (Number of Topics)
This is the most important decision in topic modeling.
- If **K is too small**: The topics will be too broad (e.g., "Life" and "Stuff").
- If **K is too large**: The topics will be too specific and overlap too much.

::: definition
**Hyperparameter**: A setting you choose *before* training starts (like the number of topics K) that changes how the model learns.
:::

### Training with Gensim
Gensim is the standard Python library for this. The process is always:
1. Create Dictionary.
2. Create Corpus (Bag of Words).
3. Run \`LdaModel\`.

\`\`\`python
# Basic Gensim structure (conceptual)
from gensim import corpora, models

# data = [['word', 'list'], ['another', 'list']]
# dictionary = corpora.Dictionary(data)
# corpus = [dictionary.doc2bow(text) for text in data]
# lda = models.LdaModel(corpus, num_topics=5, id2word=dictionary)
\`\`\`

## Practice

::: try-it
In the sandbox, look at how \`dictionary.doc2bow\` transforms a list of words. Notice how it produces a list of tuples like \`(0, 1)\`. What does the first number represent? What about the second?
:::

## Transfer

LDA is "stochastic," meaning it uses some randomness. If you run the same model twice, you might get slightly different results. In DH research, it is common to run the model many times to see which topics are "stable."

::: challenge
Complete the process of creating a Gensim dictionary and converting a document into a Bag-of-Words (BoW) format.
:::`,
    challenges: [
      {
        id: 'topic-modeling-03-c1',
        title: 'Creating the Corpus',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from gensim import corpora

# A tiny corpus of 3 documents
documents = [
    ["king", "throne", "crown"],
    ["sword", "shield", "king"],
    ["throne", "sword", "crown"]
]

# 1. Create a dictionary from the documents
dictionary = None 

# 2. Convert the first document (documents[0]) into BoW format
bow_doc = None

# Print the BoW for the first doc
print(bow_doc)
# Print the word associated with ID 0
print(dictionary[0])
`,
        expectedOutput: '[(0, 1), (1, 1), (2, 1)]\ncrown',
        hints: [
          'Use `corpora.Dictionary(documents)` to create the dictionary.',
          'Use `dictionary.doc2bow(documents[0])` for the second part.',
          'Note: Your order of IDs might vary, but the structure `(ID, Count)` will be the same.',
        ],
        solution: `from gensim import corpora

documents = [
    ["king", "throne", "crown"],
    ["sword", "shield", "king"],
    ["throne", "sword", "crown"]
]

dictionary = corpora.Dictionary(documents)
bow_doc = dictionary.doc2bow(documents[0])

print(bow_doc)
print(dictionary[0])
`,
      },
    ],
  },
  {
    id: 'topic-modeling-04',
    title: 'Interpreting and Navigating Topics',
    moduleId: 'topic-modeling',
    prerequisites: ['topic-modeling-03'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Read and interpret word-topic distributions',
      'Understand document-topic proportions',
      'Identify "junk" topics vs. meaningful discourses',
    ],
    keywords: ['interpretation', 'weights', 'visualization', 'coherence'],
    content: `# Interpreting and Navigating Topics

## Analogy

A topic model output is like a **map**. It doesn't tell you what the landmarks "mean"; it just shows you where they are. You, the human historian or literary scholar, have to look at the cluster of words "ship, whale, harpoon, sea" and decide to label that landmark "Whaling Industry." The computer provides the coordinates; you provide the name.

## Key Concepts

### 1. Word Weights
Each word in a topic has a "weight" (a probability). 
- Topic 1: \`0.05*"whale" + 0.04*"sea" + 0.02*"ship"\`
This means "whale" is the most important word for identifying Topic 1.

### 2. The Document-Topic Distribution
This is the most powerful part of LDA for DH. It tells you exactly how much of each topic is in each document.
- *Moby Dick* might be: 80% "Whaling", 15% "Religion", 5% "Biology".
- *Paradise Lost* might be: 10% "Whaling", 90% "Religion".

### 3. Junk Topics
Sometimes a topic will consist of words like "said," "went," "came," and "back." This is a **Junk Topic**. It usually means you didn't remove enough common verbs during preprocessing.

\`\`\`python
# Showing the words in a topic using Gensim
# topics = lda.show_topics(num_words=5)
# for topic in topics:
#     print(topic)
\`\`\`

## Practice

::: try-it
Look at the following cluster: "city, street, building, crowd, noise." What would you name this topic? Now look at this one: "city, mayor, council, vote, tax." How does the shift in words change the name you give the topic?
:::

## Transfer

Topic modeling is a form of **Distant Reading**. It shouldn't replace your reading of the text; it should tell you where to look. If a specific diary entry has a 90% score in a "Grief" topic, you should go back and close-read that entry to see how the model arrived at that conclusion.

::: challenge
Extract the top words from a trained model's output and identify the most important term.
:::`,
    challenges: [
      {
        id: 'topic-modeling-04-c1',
        title: 'Identifying the Top Term',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A simulated output from lda.show_topics()
# It's a list containing a tuple: (Topic_ID, Word_Weights_String)
model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship" + 0.020*"captain"')]

# Goal: Use string methods to extract just the first word in the list 
# (the one with the highest weight).

topic_string = model_output[0][1]

# Your code here: split the string to find the word "whale"
top_word = ""

print(top_word)
`,
        expectedOutput: 'whale',
        hints: [
          'You can split by the `"` character.',
          '`topic_string.split(\'"\')` will give you a list. The word will be at index 1.',
        ],
        solution: `model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship" + 0.020*"captain"')]
topic_string = model_output[0][1]

# Splitting by quotes is a quick way to get the text between them
top_word = topic_string.split('"')[1]

print(top_word)
`,
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