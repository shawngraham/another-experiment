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
- **Plain Text** (.txt, .csv): Files containing only characters, readable by any computer. These are the "gold standard" for long-term preservation.
- **Structured Data** (.json, .xml): Files that use tags or keys to organize data (common in TEI encoding).
- **Binary Files** (.docx, .pdf, .jpg): Files that require specific software to interpret their internal structure.

### 2. Common DH File Extensions
| Extension | Type | DH Use Case |
| :--- | :--- | :--- |
| **.txt** | Plain Text | Cleaned corpora for text analysis. |
| **.csv** | Comma Separated Values | Datasets for mapping or network analysis. |
| **.xml / .tei** | Extensible Markup Language | Scholarly digital editions. |
| **.json** | JavaScript Object Notation | Data harvested from web APIs or social media. |

### 3. The Directory Tree and Paths
Directories are nested. A directory inside another is a "child," and the containing directory is the "parent." 

:::definition
**File Path**: The specific address of a file. 
- **Absolute Path**: The full address from the "root" (e.g., \`C:\\Users\\Humanist\\Project\\data.txt\` or \`/\`).
- **Relative Path**: The address relative to where you are currently "standing."
  - \`.\` (dot) represents the **current folder**.
  - \`..\` (double dot) represents the **parent folder** (moving up one level).
:::

## Navigating via Code
While we often use a mouse to move files, DH researchers use code to automate the processing of thousands of files at once. If you have 5,000 letters to analyze, you cannot click each one individually; you must tell the computer where the "stack" is located.

\`\`\`python
import os
# 'os' stands for Operating System. 
# It lets Python talk to your folders.

# Get the Current Working Directory (CWD)
current_location = os.getcwd() 
print(f"You are currently at: {current_location}")

# List everything inside the current folder
files_here = os.listdir('.') 
print(f"Contents: {files_here}")
\`\`\`

## Working with Files
In Python, we use the \`with\` statement to handle files. This ensures that the file is "closed" properly after we are done, preventing data loss.

\`\`\`python
# Creating a file and writing text to it
with open("my_research_notes.txt", "w") as file:
    file.write("This is my first DH data file.")
\`\`\`

:::challenge
Use the sandbox to create a structured project folder, then write a file to that folder. This mimics setting up a workspace for a new research project.
:::
`,
  challenges: [
    {
      id: 'digital-literacy-01-c1',
      title: 'Create a directory and file',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `import os

# 1. Create a directory called 'dh_project'
# 2. Create a file inside it called 'manifesto.txt'
# 3. Write "Digital Humanities is collaborative!" to the file
# 4. Print the contents to verify

# Your code here
`,
      expectedOutput: 'Digital Humanities is collaborative!',
      hints: [
        'Use os.makedirs("folder_name", exist_ok=True) to create a folder.',
        'To write inside a folder, use the path "folder_name/filename.txt".',
        'Use the "w" mode in open() to write, and "r" mode to read.',
      ],
      solution: `import os
# Create the directory
os.makedirs('dh_project', exist_ok=True)

# Write to the file
path = 'dh_project/manifesto.txt'
with open(path, 'w') as f:
    f.write('Digital Humanities is collaborative!')

# Read and print to verify
with open(path, 'r') as f:
    print(f.read())`,
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
    'Choose the appropriate format for different DH research tasks',
  ],
  keywords: ['txt', 'csv', 'json', 'xml', 'data formats'],
  content: `# Data Formats for the Humanities

## Choosing the Right Vessel
In the digital humanities, data isn't just "information"; it's information formatted for a specific purpose. Choosing the wrong format can make analysis impossible. We generally categorize data into two types:

1. **Unstructured Data**: Plain text with no pre-defined model (e.g., a raw TXT file of a novel). Great for reading, hard for machines to "parse" into categories.
2. **Structured Data**: Data organized into a searchable, predictable format (e.g., a CSV or JSON file). Great for machines to count, sort, and map.

---

## The DH "Big Four"

### 1. Plain Text (.txt)
The "gold standard" for long-term preservation. It contains no formatting (no bold, no italics), making it perfect for **Natural Language Processing (NLP)**.
- **Use Case**: Running a word frequency count on the complete works of Shakespeare.

### 2. CSV (Comma-Separated Values)
Used for **tabular data** (spreadsheets). Each line is a row, and each comma represents a new column. 
- **Use Case**: A list of archival objects with columns for "Date," "Creator," and "Location."
\`\`\`text
title,author,year
Frankenstein,Shelley,1818
\`\`\`

### 3. JSON (JavaScript Object Notation)
The language of the web. It uses **key-value pairs** and can "nest" data inside other data, allowing for complex relationships.
- **Use Case**: Downloading metadata from the Digital Public Library of America (DPLA) via an API.
\`\`\`json
{
  "book": "Dracula",
  "metadata": {
    "author": "Stoker", 
    "year": 1897,
    "themes": ["Gothic", "Epistolary"]
  }
}
\`\`\`

### 4. XML (eXtensible Markup Language)
The backbone of scholarly digital editions. Using the **TEI (Text Encoding Initiative)** standard, XML uses "tags" to describe the *meaning* of text, not just its appearance.
- **Use Case**: Marking up a manuscript to show which words were crossed out by the author.
\`\`\`xml
<poem>
  <line>The woods are <del>dark</del> <add>lovely</add>, dark and deep</line>
</poem>
\`\`\`

---

## Format Comparison Guide

| Format | Structure | Best For... | DH Example |
| :--- | :--- | :--- | :--- |
| **TXT** | None | Text Analysis | Distant Reading |
| **CSV** | Tabular | Statistics / Mapping | Prosopography (Social Networks) |
| **JSON** | Nested | Web Data / Metadata | Storing API results |
| **XML** | Hierarchical | Complex Encoding | Scholarly Digital Editions |

:::try-it
In the challenge at right, we use the \`csv\` module. Because we are working with a "string" of text rather than an actual file on your hard drive, we use \`io.StringIO\` to trick Python into treating that text like an open file.
:::
`,
  challenges: [
    {
      id: 'digital-literacy-02-c1',
      title: 'Parse a CSV string',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `import csv
import io

# A researcher gives you this string of archival data:
csv_data = """name,year,genre
Frankenstein,1818,Gothic
Pride and Prejudice,1813,Romance
Dracula,1897,Gothic"""

# Goal: Use csv.reader to print each row as a list
# 1. Wrap csv_data in io.StringIO()
# 2. Pass that to csv.reader()
# 3. Loop through and print each row

# Your code here
`,
      expectedOutput: "['name', 'year', 'genre']\n['Frankenstein', '1818', 'Gothic']\n['Pride and Prejudice', '1813', 'Romance']\n['Dracula', '1897', 'Gothic']",
      hints: [
        'The syntax is: reader = csv.reader(io.StringIO(csv_data))',
        'Use "for row in reader:" to see the individual lists.',
      ],
      solution: `import csv
import io

csv_data = """name,year,genre
Frankenstein,1818,Gothic
Pride and Prejudice,1813,Romance
Dracula,1897,Gothic"""

# Convert the string to a file-like object
virtual_file = io.StringIO(csv_data)

# Create the reader object
reader = csv.reader(virtual_file)

# Print each row
for row in reader:
    print(row)`,
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
    'Troubleshoot "Mojibake" (broken characters) in historical datasets',
    'Correctly specify encoding when opening files in Python',
  ],
  keywords: ['encoding', 'utf-8', 'ascii', 'unicode', 'mojibake'],
  content: `# Character Encoding

## Why Do Characters Break?
Have you ever seen text like \`cafÃ©\` instead of \`café\` or \`ï»¿\` at the start of a document? This is called **Mojibake** (Japanese for "character transformation"). It happens because the computer is using the wrong "map" to translate binary numbers (0s and 1s) into human characters.

:::definition
**Character Encoding**: A lookup table (a "map") that assigns a unique number to every character.
:::

## The Map Gallery

### 1. ASCII (The Old Map)
The original American standard. It only had 128 characters—enough for English letters and basic punctuation, but useless for accented letters, emojis, or non-Latin scripts (like Cyrillic, Arabic, or Kanji).

### 2. Unicode / UTF-8 (The Global Map)
Unicode is a standard that aims to give every character in every language a unique number. **UTF-8** is the most common way to implement Unicode.
- It covers over 140,000 characters.
- It is the "One Map to Rule Them All."
- **DH Rule of Thumb**: Always save and open your research data as **UTF-8**.

---

## Strings vs. Bytes
In Python, we deal with two ways of looking at text:
1. **Strings** (\`str\`): Human-readable text (e.g., \`"History"\`).
2. **Bytes** (\`bytes\`): The machine's version, prefixed with a \`b\` (e.g., \`b'History'\`).

\`\`\`python
word = "café"
# Encoding: String -> Bytes
encoded_word = word.encode("utf-8") 
print(encoded_word) # Output: b'caf\\xc3\\xa9'

# Decoding: Bytes -> String
decoded_word = encoded_word.decode("utf-8")
print(decoded_word) # Output: café
\`\`\`

---

## The DH Workflow: Opening Files
The most common place you will encounter encoding is when opening a file. If your archive was digitized in the 1990s, it might be in an old format like \`latin-1\`. If you don't tell Python to use \`utf-8\`, it might guess wrong.

**The Golden Rule for DH Scripting:**
Always include \`encoding="utf-8"\` when opening files:

\`\`\`python
# Correct way to open a file in DH
with open("manuscript.txt", "r", encoding="utf-8") as f:
    text = f.read()
\`\`\`

:::try-it
If you ever see \`Ã©\`, your computer is reading **UTF-8** data as if it were **Latin-1**. To fix it, you need to ensure the "map" you use to read matches the "map" used to save.
:::
`,
  challenges: [
    {
      id: 'digital-literacy-03-c1',
      title: 'Explore Text Encoding',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# A piece of text with an accent and an emoji
text = "Renée 📜"

# 1. Encode 'text' into UTF-8 bytes and print it
# 2. Decode those bytes back into a string and print it
# 3. Observe how the emoji and accent are handled in the bytes version

# Your code here
`,
      expectedOutput: "b'Ren\\xc3\\xa9e \\xf0\\x9f\\x93\\x9c'\nRenée 📜",
      hints: [
        'Use the .encode("utf-8") method on your string first.',
        'Store that in a variable, then use the .decode("utf-8") method on it.',
        'Notice how the emoji takes up more bytes than a standard letter!',
      ],
      solution: `text = "Renée 📜"

# Encode to bytes
encoded = text.encode("utf-8")
print(encoded)

# Decode back to string
decoded = encoded.decode("utf-8")
print(decoded)`,
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
    'Perform basic type conversion (casting)',
    'Use the type() function to inspect data'
  ],
  keywords: ['variables', 'types', 'strings', 'integers', 'booleans'],
  content: `# Variables and Data Types

## Labeled Storage
In Python, a **variable** is a name that refers to a value stored in the computer's memory. In Digital Humanities, we use variables to store everything from the text of a novel to the coordinates of a historical site.

To create a variable, we use the assignment operator (\`=\`):

\`\`\`python
# Variable assignment
project_name = "Mapping the Republic of Letters"
\`\`\`

---

## The Four Core Types
To process humanities data correctly, Python needs to know what *kind* of data it is dealing with.

1. **String (\`str\`)**: Text data, always wrapped in quotes.
   - Example: \`author = "Toni Morrison"\`
2. **Integer (\`int\`)**: Whole numbers (no decimals).
   - Example: \`publication_year = 1987\`
3. **Float (\`float\`)**: Decimal numbers. Useful for statistics or coordinates.
   - Example: \`average_sentence_length = 15.4\`
4. **Boolean (\`bool\`)**: Logical values. Either \`True\` or \`False\` (note the capital letters).
   - Example: \`is_digitized = True\`

---

## Inspecting and Updating
### Finding the Type
If you are unsure what a variable is, you can ask Python using the \`type()\` function:

\`\`\`python
year = 1818
print(type(year)) # Output: <class 'int'>
\`\`\`

### Updating Values
Variables are called "variables" because their values can vary. You can overwrite a variable by assigning it a new value.

\`\`\`python
current_page = 10
current_page = 11 # The value 10 is now replaced with 11
\`\`\`

---

## Type Conversion (Casting)
Sometimes you need to treat a number like a string (for example, to print it as part of a sentence).

- \`str(1818)\` -> converts to \`"1818"\`
- \`int("50")\` -> converts to \`50\`
- \`float(5)\`   -> converts to \`5.0\`

:::definition
**Naming Rules**: Variable names should be descriptive and use **snake_case** (lowercase letters with underscores). 
- ✅ \`word_count = 500\`
- ❌ \`WordCount = 500\` (Not standard Python style)
- ❌ \`2_word_count = 500\` (Cannot start with a number)
:::

:::try-it
In the challenge at right, remember that when you use \`print(type(variable_name))\`, Python will output the "class" of that variable (e.g., \`<class 'str'>\`).
:::
`,
  challenges: [
    {
      id: 'python-basics-01-c1',
      title: 'Create and Inspect Variables',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# 1. Create a variable 'book_title' with the value "Frankenstein"
# 2. Create a variable 'pub_year' with the value 1818
# 3. Use the print() function to display 'book_title'
# 4. Use the print() function to display 'pub_year'
# 5. Use print(type(...)) to show the data type of both variables

# Your code here
`,
      expectedOutput: "Frankenstein\n1818\n<class 'str'>\n<class 'int'>",
      hints: [
        'To print a type, use: print(type(your_variable_name))',
        'Make sure "Frankenstein" is in quotes because it is a string.',
        'The variable pub_year should be a number (1818) without quotes.',
      ],
      solution: `book_title = "Frankenstein"
pub_year = 1818
print(book_title)
print(pub_year)
print(type(book_title))
print(type(pub_year))`,
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
    'Calculate the size of a collection using len()',
  ],
  keywords: ['lists', 'dictionaries', 'collections', 'indexing'],
  content: `# Collections of Data

In Digital Humanities, we rarely work with a single piece of data. We work with **corpora** (collections of texts) and **metadata** (structured information about those texts). To handle these, Python uses **Lists** and **Dictionaries**.

---

## 1. Lists (Ordered Sequences)
A list is an ordered collection of items. In DH, you might use a list to store a series of stop-words or the titles of all poems in a collection.

- **Syntax**: Uses square brackets \`[]\`.
- **Ordering**: Items stay in the order you put them in.
- **Indexing**: Python starts counting at **0**.

\`\`\`python
# A list of authors
authors = ["Austen", "Shelley", "Brontë"]

print(authors[0]) # Output: Austen
print(authors[1]) # Output: Shelley
\`\`\`

:::tip
To find out how many items are in a list, use the \`len()\` function (short for length):
\`\`\`python
print(len(authors)) # Output: 3
\`\`\`
:::

---

## 2. Dictionaries (Key-Value Pairs)
A dictionary is an unordered collection of "labels" (keys) and "data" (values). This is the perfect format for **metadata**.

- **Syntax**: Uses curly braces \`{}\`.
- **Structure**: \`"Key": Value\`
- **Access**: You don't use a number to get data; you use the **Key**.

\`\`\`python
book_data = {
    "title": "Frankenstein", 
    "author": "Shelley", 
    "year": 1818
}

# Looking up the value associated with the "author" key
print(book_data["author"]) # Output: Shelley
\`\`\`

---

## Which one should I use?
- Use a **List** if you have a simple sequence of items where the order matters (like chapters in a book).
- Use a **Dictionary** if you need to label your data (like a library catalog record).

:::definition
**Mutable**: Both lists and dictionaries are "mutable," meaning you can change them after they are created. You can add a new author to your list or update the publication year in your dictionary.
:::

:::try-it
Try creating a list of four years. Use \`print(years[0])\` to see the first year and \`print(years[3])\` to see the last one. What happens if you try to print \`years[4]\`?
:::
`,
  challenges: [
    {
      id: 'python-basics-02-c1',
      title: 'Work with collections',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# 1. Create a list called 'books' containing 3 book titles (strings)
# 2. Create a dictionary called 'meta' with these keys: "title", "author", "year"
#    (Use "Frankenstein", "Shelley", and 1818 as the values)
# 3. Print the length of the 'books' list using len()
# 4. Print the author's name from the 'meta' dictionary

# Your code here
`,
      expectedOutput: '3\nShelley',
      hints: [
        'For the list, use square brackets: books = ["A", "B", "C"]',
        'For the length, use print(len(books))',
        'To get the author from the dictionary, use meta["author"]',
      ],
      solution: `books = ["Frankenstein", "Dracula", "Jane Eyre"]
meta = {
    "title": "Frankenstein", 
    "author": "Shelley", 
    "year": 1818
}
print(len(books))
print(meta["author"])`,
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
    'Write conditional logic (if/else) using comparison operators',
    'Automate repetitive tasks with for-loops',
    'Understand indentation as a requirement for Python logic',
    'Combine loops and conditionals to filter data'
  ],
  keywords: ['if', 'else', 'for', 'loops', 'indentation', 'logic'],
  content: `# Control Flow: Logic and Loops

Programming is the art of telling the computer: *"If this condition is met, do that. Otherwise, do this. And keep doing it until you reach the end of the list."* This is known as **Control Flow**.

---

## 1. Conditionals (\`if\`, \`elif\`, \`else\`)
Conditionals allow your script to make decisions. In DH, you might use this to categorize texts by century or to find specific keywords.

To make decisions, we use **Comparison Operators**:
- \`==\` (Equal to)
- \`!=\` (Not equal to)
- \`>\` (Greater than)
- \`<\` (Less than)

\`\`\`python
year = 1850

if year < 1800:
    print("This is an early modern text.")
elif year < 1900:
    print("This is a 19th-century text.")
else:
    print("This is a modern text.")
\`\`\`

---

## 2. For Loops
A \`for\` loop tells Python to take a collection (like a list) and perform the same action for **every item** in that collection.

\`\`\`python
corpus = ["Moby Dick", "Oliver Twist", "Beloved"]

# 'book' is a temporary name we give to the current item
for book in corpus:
    print("Analyzing " + book)
\`\`\`

---

## 3. The Golden Rule: Indentation
In many languages, curly brackets \`{}\` are used to group code. In Python, we use **indentation** (usually 4 spaces or one Tab). 

Anything indented under an \`if\` or a \`for\` statement is considered "inside" 그 block. When you stop indenting, the block ends.

\`\`\`python
for book in corpus:
    print(book) # This is INSIDE the loop and runs 3 times.
print("Done!")  # This is OUTSIDE and runs only once at the end.
\`\`\`

---

## 4. Combining the Two (Filtering)
A very common DH task is to loop through a list and only print items that meet a certain requirement. This is called **filtering**.

\`\`\`python
# Example: Find years in the 20th Century
years = [1750, 1920, 1810, 1950]

for y in years:
    if y >= 1900:
        print(y) # This only runs if the 'if' condition is True
\`\`\`

:::try-it
Look at the challenge below. You will need to "nest" an \`if\` statement inside a \`for\` loop. Make sure your \`if\` is indented once, and your \`print\` is indented twice!
:::
`,
  challenges: [
    {
      id: 'python-basics-03-c1',
      title: 'Loop and Filter Word Counts',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# A list of word counts from different chapters
word_counts = [500, 1200, 800, 3000, 150, 2500]

# Goal: Loop through the list and print ONLY the counts greater than 1000

# Your code here
`,
      expectedOutput: '1200\n3000\n2500',
      hints: [
        'Start with: for count in word_counts:',
        'Inside the loop, add an if statement: if count > 1000:',
        'Remember to indent the print() function so it is inside the if statement.',
      ],
      solution: `word_counts = [500, 1200, 800, 3000, 150, 2500]

for count in word_counts:
    if count > 1000:
        print(count)`,
    },
  ],
},
  {
  id: 'python-basics-04',
  title: 'Functions: Building Your DH Toolkit',
  moduleId: 'python-basics',
  prerequisites: ['python-basics-03'],
  estimatedTimeMinutes: 30,
  difficulty: 'beginner',
  learningObjectives: [
    'Encapsulate logic into reusable Functions',
    'Use parameters to pass data into functions',
    'Use the return keyword to output data',
    'Understand the difference between printing and returning',
  ],
  keywords: ['functions', 'def', 'return', 'arguments', 'split'],
  content: `# Functions: Your Custom Tools

## Don't Repeat Yourself (DRY)
In Digital Humanities, you often perform the same task hundreds of times—cleaning a text, calculating word frequencies, or formatting dates. A **function** is a reusable "recipe" that you write once and call whenever you need it.

---

## 1. Anatomy of a Function
To create a function, we use the \`def\` keyword (short for define).

\`\`\`python
def greet_researcher(name):
    # 'name' is a parameter (a placeholder for data)
    message = "Hello, " + name + "! Welcome to the lab."
    return message

# To use it, we "call" the function with an argument
print(greet_researcher("Alex")) 
# Output: Hello, Alex! Welcome to the lab.
\`\`\`

---

## 2. Inputs and Outputs: Parameters vs. Return
Think of a function like a specialized machine in a library:
- **Parameters (Inputs)**: The raw materials you put into the machine.
- **Return (Output)**: The finished product the machine hands back to you.

:::warning
**Print vs. Return**: 
- \`print()\` just shows a value on your screen. It’s like looking at a book.
- \`return\` hands the value back to the program so you can use it later. **If a function doesn't have a \`return\`, it won't give you any data back to store in a variable!**
:::

---

## 3. A Handy DH Tool: \`.split()\`
In the challenge at right, you need to count words. In Python, you can turn a long string of text into a **List of words** using the \`.split()\` method.

\`\`\`python
sentence = "Digital Humanities is great"
words = sentence.split() 
print(words) 
# Output: ['Digital', 'Humanities', 'is', 'great']

# Now you can use len() to count them!
print(len(words)) # Output: 4
\`\`\`

---

## Why Use Functions in Research?
1. **Readability**: Your code looks like a series of logical steps (\`clean_text()\`, then \`count_words()\`).
2. **Maintenance**: If you decide to change how you count words, you only have to fix it in one place (the function definition).
3. **Collaboration**: You can write a complex function for "Parsing 18th Century Dates" and share it with other historians.

:::try-it
Functions must be defined *before* they are called. In your code, always put your \`def\` blocks at the top of the file.
:::
`,
  challenges: [
    {
      id: 'python-basics-04-c1',
      title: 'Write a Reading Time Function',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# Write a function 'reading_time' that takes a text string
# and returns the estimated reading time in minutes.

def reading_time(text):
    # 1. Split the text into a list of words
    # 2. Count how many words are in that list using len()
    # 3. Calculate minutes (assume 200 words per minute)
    # 4. Return the result
    pass

# Test your function
sample_text = "word " * 400  # This creates a string of 400 words
result = reading_time(sample_text)
print(result)
`,
      expectedOutput: '2.0',
      hints: [
        'Use words = text.split() to get a list of words.',
        'The number of words is len(words).',
        'Your last line inside the function should be something like: return word_count / 200',
      ],
      solution: `def reading_time(text):
    words = text.split()
    word_count = len(words)
    minutes = word_count / 200
    return minutes

sample_text = "word " * 400
print(reading_time(sample_text))`,
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
    'Safely open files using Context Managers (the "with" statement)',
    'Identify the difference between Read (r) and Write (w) modes',
    'Use newline characters (\\n) to format output',
    'Output research results to a permanent .txt file',
  ],
  keywords: ['files', 'open', 'read', 'write', 'with', 'newline'],
  content: `# Reading and Writing Files

The power of Digital Humanities comes from moving beyond the screen. We need to be able to pull in a collection of texts (Reading) and save our analysis results (Writing).

---

## 1. The "With" Statement (Context Managers)
In Python, the safest way to handle a file is with the \`with\` keyword. It creates a temporary "bridge" to the file. Once the code inside the block is finished, Python automatically "closes" the bridge.

\`\`\`python
# Open for reading ('r')
with open('diary.txt', 'r', encoding='utf-8') as f:
    text = f.read()
    # After this line, the file is automatically closed!
\`\`\`

---

## 2. Modes: Read vs. Write
When you open a file, you must tell Python what you intend to do with it.

| Mode | Name | Action |
| :--- | :--- | :--- |
| **'r'** | Read | Opens a file for reading. (Throws an error if the file doesn't exist). |
| **'w'** | Write | Creates a new file or **overwrites** an existing one completely! |
| **'a'** | Append | Adds new text to the end of an existing file without deleting it. |

---

## 3. Formatting with Newlines
Computers don't see the "Enter" key like we do. To tell Python to move to a new line in a file, we use the **newline character**: \`\\n\`.

\`\`\`python
# Writing two lines to a file
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("First Line of Analysis\\nSecond Line of Analysis")
\`\`\`

---

## 4. Why Encoding Matters (Again!)
As a DH researcher, you will often work with historical texts or data from international archives. Always include \`encoding='utf-8'\`. If you leave it out, your script might work on your computer but break on a colleague's machine, or it might turn accented characters into "mojibake."

:::warning
**The 'w' Mode Danger**: Be careful! Opening a file with \`'w'\` wipes it clean immediately. Never use \`'w'\` on your only copy of a primary source!
:::

:::try-it
In the challenge at right, you will perform two steps. First, you will "Save" some data to a file. Then, in a second block, you will "Open" it back up to prove it was saved correctly.
:::
`,
  challenges: [
    {
      id: 'python-basics-05-c1',
      title: 'Create and Read an Archive File',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# 1. Use a 'with' statement to open a file named 'test.txt' in WRITE mode ('w')
# 2. Write three lines to it: "Line 1", "Line 2", and "Line 3" 
#    (Hint: Use \\n to separate them)

# 3. Use a second 'with' statement to open 'test.txt' in READ mode ('r')
# 4. Read the contents into a variable and print it

# Your code here
`,
      expectedOutput: 'Line 1\nLine 2\nLine 3',
      hints: [
        'The string you write should look like "Line 1\\nLine 2\\nLine 3".',
        'Make sure you stop indenting after the first block before starting the second "with" block.',
        'Always use encoding="utf-8" as a best practice.',
      ],
      solution: `# Step 1 & 2: Writing
with open('test.txt', 'w', encoding='utf-8') as f:
    f.write('Line 1\\nLine 2\\nLine 3')

# Step 3 & 4: Reading
with open('test.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)`,
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
    'Perform case normalization to ensure data consistency',
    'Clean text using strip() and replace()',
    'Tokenize text using basic string splitting',
    'Understand method chaining in Python'
  ],
  keywords: ['string', 'text', 'normalization', 'splitting', 'tokenization'],
  content: `# String Operations for Text Analysis

In Digital Humanities, we often engage in **Distant Reading**—using algorithms to look at thousands of texts at once. But before a computer can "read," we must treat text as a simple series of characters and "normalize" it.

---

## 1. Case Normalization
To a computer, "The", "THE", and "the" are three completely different words. If you are counting word frequencies, your results will be inaccurate unless you normalize the case.

\`\`\`python
original_text = "The Raven"
normalized_text = original_text.lower()
print(normalized_text) # Output: "the raven"
\`\`\`

---

## 2. Cleaning with Strip and Replace
Raw text—especially text from OCR (Optical Character Recognition) or web scraping—is often "dirty."

### Removing Whitespace (\`.strip()\`)
The \`.strip()\` method removes extra spaces or "newline" characters (\`\\n\`) from the very beginning and very end of a string.
\`\`\`python
messy_input = "  chapter one  \\n"
clean_input = messy_input.strip()
print(clean_input) # Output: "chapter one"
\`\`\`

### Finding and Replacing (\`.replace()\`)
Use this to remove punctuation or unwanted characters that might interfere with your analysis.
\`\`\`python
raw_text = "Title: Frankenstein; or, The Modern Prometheus"
# Remove the semicolon
cleaned_text = raw_text.replace(";", "")
\`\`\`

---

## 3. Basic Tokenization (\`.split()\`)
**Tokenization** is the process of breaking a long string into individual pieces (usually words). By default, \`.split()\` cuts a string wherever it finds a space.

\`\`\`python
sentence = "Deep into that darkness peering"
tokens = sentence.split() 
# Result: ['Deep', 'into', 'that', 'darkness', 'peering']
\`\`\`

---

## 4. Method Chaining
In Python, you can perform multiple operations in a single line. They are processed from **left to right**. This is a very common pattern in DH scripts:

\`\`\`python
text = "  The Raven!  "
# 1. Strip spaces, 2. Lowercase, 3. Replace punctuation, 4. Split into words
words = text.strip().lower().replace("!", "").split()
print(words) # Output: ['the', 'raven']
\`\`\`

:::tip
Think of method chaining like a factory assembly line. Each method takes the output of the previous one and modifies it further.
:::

:::challenge
Text analysis usually begins with a "word count." In the challenge at right, use what you've learned about splitting strings to create a basic word counter.
:::
`,
  challenges: [
    {
      id: 'text-analysis-01-c1',
      title: 'Count words in a text',
      language: 'python',
      difficulty: 'beginner',
      starterCode: `# Goal: Write a function that returns the number of words in a string.

def count_words(text):
    # 1. Use .split() to turn the string into a list of words
    # 2. Use len() to count how many items are in that list
    # 3. Return that count
    pass

sample = "The quick brown fox"
print(count_words(sample))
`,
      expectedOutput: '4',
      hints: [
        'The .split() method returns a list.',
        'Apply len() to the list you created inside the function.',
        'Don\'t forget to "return" the result!',
      ],
      solution: `def count_words(text):
    words = text.split()
    word_count = len(words)
    return word_count

sample = "The quick brown fox"
print(count_words(sample))`,
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
    'Use character classes to identify types of data (digits, words, whitespace)',
    'Use quantifiers to specify the length of a pattern',
    'Extract patterns like dates or metadata from archival text',
  ],
  keywords: ['regex', 'pattern matching', 're', 'wildcards'],
  content: `# Regular Expressions (Regex)

## Find on Steroids
Imagine you are looking at a 500-page OCR transcript of a 19th-century ledger. You need to find every year mentioned. Searching for "1800", then "1801", then "1802" would take days. 

**Regular Expressions (Regex)** allow you to search for the *structure* of the data rather than the literal characters. Instead of searching for "1818", you search for "any four digits in a row."

---

## 1. The \`re\` Module
Python uses the \`re\` library for regex. To use it, you must \`import re\` at the top of your script. The most common function for text analysis is \`re.findall()\`, which returns a list of every match found in your text.

## 2. The Regex Cheat Sheet

| Symbol | Meaning | Example |
| :--- | :--- | :--- |
| **\`\\d\`** | Any Digit (0-9) | \`\\d\\d\` matches "18" |
| **\`\\w\`** | Any "Word" character (letters, numbers) | \`\\w\\w\\w\` matches "cat" |
| **\`\\s\`** | Any Whitespace (spaces, tabs, newlines) | \`\\d\\s\\d\` matches "1 2" |
| **\`.\`** | The Wildcard (matches almost anything) | \`t.t\` matches "tat", "tet", "t!t" |

## 3. Quantifiers (How many?)
Instead of typing \`\\d\\d\\d\\d\` to find a year, we use curly brackets to say "how many" of the preceding symbol we want.

- **\`{n}\`**: Exactly *n* times. (e.g., \`\\d{4}\` finds exactly 4 digits).
- **\`+\`**: One or more times. (e.g., \`\\d+\` finds "1", "12", or "12345").
- **\`*\`**: Zero or more times.

\`\`\`python
import re
text = "The price is $50 and the date is 1818."

# Find all groups of 1 or more digits
numbers = re.findall(r'\\d+', text) 
print(numbers) # Output: ['50', '1818']

# Find exactly 4 digits
years = re.findall(r'\\d{4}', text)
print(years) # Output: ['1818']
\`\`\`

---

## 4. The "r" Prefix (Raw Strings)
When writing regex in Python, always put an \`r\` before your quotes: \`r'\\d+'\`. This tells Python: "Treat the backslashes literally; don't try to interpret them as special Python commands."

## DH Use Case: Cleaning OCR
Historical documents often have "scannos" (OCR errors). Regex can find them!
- **Pattern**: \`r'l8\\d{2}'\`
- **Matches**: "l818" or "l831" (where the scanner mistook the "1" for an "l").
- **Action**: You can then use \`re.sub()\` to replace all those "l"s with "1"s across thousands of files.

:::try-it
Regex is a language of its own. In the challenge at right, combine the digit symbol (\`\\d\`) with the quantifier for "exactly four" (\`{4}\`) to extract dates from a string.
:::
`,
  challenges: [
    {
      id: 'text-analysis-02-c1',
      title: 'Extract Years from Text',
      language: 'python',
      difficulty: 'intermediate',
      starterCode: `import re

text = "Published in 1818, revised in 1831, reprinted in 1869."

# Goal: Use re.findall to find all 4-digit years.
# 1. Create a pattern using \\d and the {4} quantifier.
# 2. Use re.findall(pattern, text)
# 3. Assign the result to a variable 'years' and print it.

# Your code here
`,
      expectedOutput: "['1818', '1831', '1869']",
      hints: [
        'The pattern should be a raw string: r\'...\'',
        'The digit symbol is \\\\d and the quantifier is {4}.',
        'Syntax: years = re.findall(r\'\\\\d{4}\', text)',
      ],
      solution: `import re

text = "Published in 1818, revised in 1831, reprinted in 1869."

# Pattern for exactly four digits
pattern = r'\\d{4}'

# Find all matches
years = re.findall(pattern, text)

# Print result
print(years)`,
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
      'Count frequencies efficiently using the collections.Counter object',
      'Understand Zipf\'s Law and its impact on text analysis',
      'Identify and filter for the most common terms in a corpus',
      'Apply pre-processing steps to ensure accurate counting',
    ],
    keywords: ['frequency', 'counting', 'counter', 'zipf', 'tokenization'],
    content: `# Word Frequency Analysis

  ## What's in a Word?
  Frequency analysis is often the first step in "Distant Reading." By counting words, we can see the dominant themes of a text. While common words like "the" and "and" are usually at the top, the top-ranking *nouns* and *verbs* often reveal the "aboutness" of a historical document.

  ---

  ## 1. Zipf's Law
  If you count every word in a novel, you will notice a strange pattern: the most frequent word (usually "the") appears twice as often as the second most frequent word, and three times as often as the third. This is called **Zipf's Law**.

  In DH, this means:
  - The top 10-20 words are usually "noise" (stopwords like *the, a, of, is*).
  - The most "interesting" words for analysis usually live in the middle of the frequency list.

  ---

  ## 2. The \`Counter\` Object
  While you could use a standard dictionary to count words, Python provides a specialized tool called \`Counter\` that is much faster and more reliable.

  \`\`\`python
  from collections import Counter

  # Imagine these are words from a poem
  words = ["heart", "rose", "heart", "thorns", "rose", "heart"]
  counts = Counter(words)

  # How many times does 'heart' appear?
  print(counts["heart"]) # Output: 3

  # What are the 2 most common words?
  print(counts.most_common(2)) 
  # Output: [('heart', 3), ('rose', 2)]
  \`\`\`

  ---

  ## 3. The Pre-processing Pipeline
  To get a meaningful word count, you must clean your data first. If you don't lowercase your text, Python will count "The" and "the" as two different words.

  **Standard DH Pipeline:**
  1. **Lowercase**: \`text.lower()\`
  2. **Strip Punctuation**: \`.replace(",", "").replace(".", "")\`
  3. **Tokenize**: \`.split()\`
  4. **Count**: \`Counter(tokens)\`

  :::tip
  The \`.most_common()\` method returns a **List of Tuples**. Each tuple contains the word and its count: \`('word', 5)\`.
  :::

  :::challenge
  In the challenge at right, you will analyze a famous line of Shakespeare. You need to turn the string into a list of words, then use \`Counter\` to rank them.
  :::
  `,
    challenges: [
      {
        id: 'text-analysis-03-c1',
        title: 'Find Most Common Words',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter

  text = "to be or not to be that is the question"

  # 1. Split the text into a list of words
  # 2. Initialize a Counter object with that list
  # 3. Use the .most_common(3) method to find the top 3 words
  # 4. Assign the result to 'top_words' and print it

  # Your code here
  `,
        expectedOutput: "[('to', 2), ('be', 2), ('or', 1)]",
        hints: [
          'Use words = text.split() first.',
          'Create the counter with: counts = Counter(words)',
          'Remember that most_common(3) will return a list of tuples.',
        ],
        solution: `from collections import Counter

  text = "to be or not to be that is the question"

  # Split into tokens
  words = text.split()

  # Count frequencies
  counts = Counter(words)

  # Get the 3 most common
  top_words = counts.most_common(3)

  print(top_words)`,
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
      'Remove punctuation using robust Regex patterns',
      'Understand the difference between Tokens (total words) and Types (unique words)',
      'Calculate the Type/Token Ratio (lexical diversity)',
      'Handle "messy" whitespace and newlines for cleaner data',
    ],
    keywords: ['cleaning', 'normalization', 'preprocessing', 'punctuation', 'set'],
    content: `# Text Cleaning: The Unsung Work of DH

  ## Garbage In, Garbage Out
  Computational analysis is only as good as the data you feed it. If your text contains "End?", "end,", and "end!", a computer treats them as three different words. To perform accurate "Distant Reading," we must strip away the noise.

  ---

  ## 1. The Normalization Pipeline
  In Digital Humanities, "Normalization" is the process of converting text into a standard, consistent format. A typical pipeline includes:

  1.  **Lowercasing**: \`text.lower()\` ensures "The" and "the" match.
  2.  **Stripping**: \`text.strip()\` removes leading/trailing whitespace.
  3.  **Punctuation Removal**: Using \`re.sub()\` to find and delete symbols.

  ### Mastering the Regex "Clean-up"
  The most robust way to remove punctuation while keeping words intact is using a "negated character class" in Regex:

  \`\`\`python
  import re
  raw_text = "  History: it's complicated!!!  "

  # r'[^\w\s]' means: "Find anything that is NOT a word or a space"
  clean_text = re.sub(r'[^\w\s]', '', raw_text)

  print(clean_text.strip().lower()) 
  # Output: "history its complicated"
  \`\`\`

  ---

  ## 2. Types vs. Tokens (Lexical Diversity)
  How "rich" is an author's vocabulary? DH researchers measure this using the **Type/Token Ratio (TTR)**.

  *   **Tokens**: The total number of words in a text.
  *   **Types**: The number of *unique* words in a text.

  ### Finding Uniqueness with \`set()\`
  In Python, a \`set\` is a collection that **disallows duplicates**. If you turn a list of words into a set, Python automatically deletes every repeated word, leaving you with the "Types."

  \`\`\`python
  words = ["to", "be", "or", "not", "to", "be"]
  unique_words = set(words)

  print(len(words))        # Tokens: 6
  print(len(unique_words)) # Types: 4
  \`\`\`

  :::definition
  **Type/Token Ratio (TTR)**: Calculated as \`(Types / Tokens)\`. A high TTR indicates a diverse vocabulary (like Shakespeare), while a low TTR indicates a more repetitive text (like a children's book).
  :::

  :::challenge
  In the challenge at right, you will process a famous quote. You must normalize the text (lower case and no punctuation) before using \`set()\` to find the unique word count.
  :::
  `,
    challenges: [
      {
        id: 'text-analysis-04-c1',
        title: 'Clean a text passage',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import re

  text = "  It was the BEST of times, it was the WORST of times...  "

  # 1. Normalize the text: 
  #    - Use .strip() and .lower()
  #    - Use re.sub(r'[^\\w\\s]', '', text) to remove punctuation
  # 2. Split the cleaned text into a list of words
  # 3. Use set() to get the unique words
  # 4. Print the count (length) of the unique words

  # Your code here
  `,
        expectedOutput: '7',
        hints: [
          'First, apply .strip().lower() to the string.',
          'Then use re.sub() to remove the comma and the dots.',
          'Finally, convert the list of words into a set() and find its len().',
        ],
        solution: `import re

  text = "  It was the BEST of times, it was the WORST of times...  "

  # Clean and normalize
  text_cleaned = re.sub(r'[^\\w\\s]', '', text.strip().lower())

  # Tokenize
  words = text_cleaned.split()

  # Find unique count
  unique_count = len(set(words))

  print(unique_count)`,
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
      'Understand the difference between simple string splitting and linguistic tokenization',
      'Use NLTK to perform Part-of-Speech (POS) tagging',
      'Filter texts for specific grammatical categories (e.g., all proper nouns)',
      'Handle the (word, tag) tuple structure in Python',
    ],
    keywords: ['nltk', 'tokenization', 'pos-tagging', 'nlp', 'linguistics'],
    content: `# Natural Language Processing (NLP)

  ## Moving Beyond Strings
  Up to this point, we have treated text as a simple sequence of characters. **Natural Language Processing (NLP)** allows us to treat text as a linguistic structure. 

  While \`.split()\` and \`.lower()\` are useful, they don't "understand" the rules of language. To a computer using \`.split()\`, the string "don't" is one word. To an NLP tool, it is two linguistic units: "do" and "n't" (the negation).

  ---

  ## 1. Smarter Tokenization
  The NLTK (\`Natural Language Toolkit\`) tokenizer is designed for research. It knows that a period at the end of a sentence is a separate piece of punctuation and should not be attached to the last word.

  \`\`\`python
  import nltk
  from nltk.tokenize import word_tokenize

  # We must download the 'instructions' for tokenization first
  nltk.download('punkt_tab', quiet=True)

  text = "Mary Shelley wrote Frankenstein."
  tokens = word_tokenize(text)
  print(tokens) 
  # Result: ['Mary', 'Shelley', 'wrote', 'Frankenstein', '.']
  \`\`\`

  ---

  ## 2. Part-of-Speech (POS) Tagging
  POS tagging identifies the grammatical role of every word. In DH, this is often used to extract all the people/places (Proper Nouns) or to analyze the "tone" of a text (e.g., counting adjectives vs. adverbs).

  | Tag | Meaning | DH Use Case |
  | :--- | :--- | :--- |
  | **NNP** | Proper Noun, Singular | Extracting names of characters or cities. |
  | **JJ** | Adjective | Analyzing descriptive language in a novel. |
  | **VBD** | Verb, Past Tense | Identifying actions in a historical narrative. |

  ---

  ## 3. Handling the Output: Tuples
  When you run \`nltk.pos_tag()\`, it returns a **List of Tuples**. A tuple is like a list, but it uses parentheses \`()\`.

  \`\`\`python
  tagged = [('Mary', 'NNP'), ('wrote', 'VBD')]
  \`\`\`

  To filter this data, you can "unpack" the tuple in a loop:

  \`\`\`python
  for word, tag in tagged:
      if tag == "NNP":
          print(f"Found a proper noun: {word}")
  \`\`\`

  :::tip
  **Why use POS tagging?** 
  If you want to map a novel, you can't just search for every word that starts with a capital letter (that would include the start of every sentence). By filtering for **NNP**, you get a much cleaner list of actual names and places.
  :::

  :::challenge
  In the first challenge, you will practice smarter tokenization. In the second, you will use a loop to extract only the proper nouns from a sentence about Jane Austen.
  :::
  `,
    challenges: [
      {
        id: 'text-analysis-05-c1',
        title: 'Tokenize a Sentence',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import nltk
  nltk.download('punkt_tab', quiet=True)
  from nltk.tokenize import word_tokenize

  text = "Mary Shelley wrote Frankenstein in 1818."

  # Goal: Use word_tokenize(text) and print the list of tokens

  # Your code here
  `,
        expectedOutput: "['Mary', 'Shelley', 'wrote', 'Frankenstein', 'in', '1818', '.']",
        hints: [
          'Assign the result of word_tokenize(text) to a variable.',
          'Print that variable to see how NLTK handles the period at the end.',
        ],
        solution: `import nltk
  nltk.download('punkt_tab', quiet=True)
  from nltk.tokenize import word_tokenize

  text = "Mary Shelley wrote Frankenstein in 1818."
  tokens = word_tokenize(text)
  print(tokens)`,
      },
      {
        id: 'text-analysis-05-c2',
        title: 'Extract Proper Nouns',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import nltk
  # Downloading the necessary tools
  nltk.download('punkt_tab', quiet=True)
  nltk.download('averaged_perceptron_tagger_eng', quiet=True)
  from nltk.tokenize import word_tokenize

  text = "Jane Austen published Pride and Prejudice in 1813."
  tokens = word_tokenize(text)

  # 1. Use nltk.pos_tag(tokens) to get a list of (word, tag) tuples
  # 2. Create an empty list called 'proper_nouns'
  # 3. Loop through the tagged items and check if the tag is 'NNP'
  # 4. If it is, append the word to your 'proper_nouns' list
  # 5. Print the list

  # Your code here
  `,
        expectedOutput: "['Jane', 'Austen', 'Pride', 'Prejudice']",
        hints: [
          'Use: tagged_text = nltk.pos_tag(tokens)',
          'Your loop should look like: for word, tag in tagged_text:',
          'Remember that NNP must be in quotes: if tag == "NNP":',
        ],
        solution: `import nltk
  nltk.download('punkt_tab', quiet=True)
  nltk.download('averaged_perceptron_tagger_eng', quiet=True)
  from nltk.tokenize import word_tokenize

  text = "Jane Austen published Pride and Prejudice in 1813."
  tokens = word_tokenize(text)

  # Get the tags
  tagged = nltk.pos_tag(tokens)

  # Filter for NNP (Proper Nouns)
  proper_nouns = []
  for word, tag in tagged:
      if tag == 'NNP':
          proper_nouns.append(word)

  print(proper_nouns)`,
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
      'Understand rule-based sentiment scoring using lexicons',
      'Calculate "polarity" scores for text passages',
      'Use the dictionary .get() method to handle missing data safely',
      'Conceptualize emotional "arcs" in narrative structures',
    ],
    keywords: ['sentiment', 'polarity', 'lexicon', 'emotion', 'vader'],
    content: `# Sentiment Analysis: Listening for Tone

  Sentiment analysis is the computational study of opinions, sentiments, and emotions in text. In Digital Humanities, we use it to track the emotional "arc" of a novel, analyze the public mood in historical newspapers, or compare the "positivity" of different political speeches.

  ---

  ## 1. The Lexicon-Based Approach
  The most common way to measure sentiment is using a **lexicon**—a dictionary where words are pre-labeled with emotional scores.

  - **"Excellent"**: +1.0 (Positive)
  - **"Terrible"**: -1.0 (Negative)
  - **"Table"**: 0.0 (Neutral)

  By adding up the scores of every word in a sentence, we calculate its **Polarity** (how positive or negative it is overall).

  ---

  ## 2. Coding Safely with \`.get()\`
  When we loop through a text to calculate sentiment, we will encounter many words (like "the" or "and") that aren't in our sentiment lexicon. 

  Normally, looking up a missing key in a dictionary causes an error. To avoid this, we use the \`.get()\` method, which allows us to provide a **default value** (0) if the word is not found.

  \`\`\`python
  lexicon = {"happy": 2, "sad": -2}

  # If "today" isn't in the lexicon, it returns 0 instead of crashing
  score = lexicon.get("today", 0) 
  \`\`\`

  ---

  ## 3. The "Shape" of a Story
  A famous DH application of this technique is mapping the "emotional arc" of a text. By calculating the sentiment of every paragraph in a novel and plotting it on a graph, researchers can visualize the narrative structure.

  - **The "Rags to Riches" Arc**: A steady rise in sentiment.
  - **The "Person in a Hole" Arc**: A fall into negative sentiment followed by a recovery.

  :::tip
  While our "toy" example here is simple, professional DH tools like **VADER** or **TextBlob** are smarter: they understand that "not happy" is negative and "VERY HAPPY" is more positive than just "happy."
  :::

  :::challenge
  In the challenge at right, you will build a basic sentiment engine. You'll need to split a sentence into words, check each word against a provided lexicon, and keep a running total of the score.
  :::
  `,
    challenges: [
      {
        id: 'text-analysis-06-c1',
        title: 'Calculate Sentiment Score',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `lexicon = {"dark": -1, "stormy": -1, "bright": 1, "hope": 1}
  text = "it was a dark and stormy night but i had hope"

  # 1. Initialize a variable called 'total_score' at 0
  # 2. Split the text into a list of words
  # 3. Loop through each word
  # 4. Use lexicon.get(word, 0) to get the score and add it to total_score
  # 5. Print the total_score

  # Your code here
  `,
        expectedOutput: '-1',
        hints: [
          'Initialize your score with: total_score = 0',
          'Use the += operator to add the word score to your total: total_score += lexicon.get(word, 0)',
          'The words "dark" (-1), "stormy" (-1), and "hope" (+1) are the only ones that should change the score.',
        ],
        solution: `lexicon = {"dark": -1, "stormy": -1, "bright": 1, "hope": 1}
  text = "it was a dark and stormy night but i had hope"

  total_score = 0
  words = text.split()

  for word in words:
      # Look up word score, defaulting to 0 if not found
      score = lexicon.get(word, 0)
      total_score += score

  print(total_score)`,
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
      'Identify the difference between csv.reader (lists) and csv.DictReader (dictionaries)',
      'Process CSV data stored in strings using io.StringIO',
      'Filter tabular data based on specific column values',
    ],
    keywords: ['csv', 'tabular', 'rows', 'columns', 'dictionaries', 'prosopography'],
    content: `# Working with Tabular Data

  ## Data in Rows and Columns
  Much of Digital Humanities involves **structured lists**: a spreadsheet of every student at a university in 1850, or a catalog of every play performed at a specific theater. 

  In DH, we often use tables for **Prosopography**—the investigation of a common group of people (like "all women printers in 18th-century London") by looking at their shared biographical data.

  ---

  ## 1. What is a CSV?
  A **CSV (Comma-Separated Values)** file is a plain-text version of an Excel spreadsheet. 
  - Each line represents a **Row**.
  - Each comma represents a move to a new **Column**.

  \`\`\`text
  name,year,city
  Mary,1818,London
  Percy,1810,Oxford
  \`\`\`

  ---

  ## 2. Two Ways to Read CSVs in Python
  The \`csv\` module provides two main tools for reading data:

  ### A. \`csv.reader\` (The List Method)
  Each row becomes a **List**. You access columns by their number (index).
  - \`row[0]\` is the name, \`row[1]\` is the year.

  ### B. \`csv.DictReader\` (The Dictionary Method)
  Each row becomes a **Dictionary**. You access columns by their header name.
  - \`row["name"]\` is the name, \`row["year"]\` is the year. This is usually easier to read!

  \`\`\`python
  import csv

  # Using DictReader to access data by column names
  with open('authors.csv', mode='r', encoding='utf-8') as f:
      reader = csv.DictReader(f)
      for row in reader:
          print(row["name"]) # Accesses the "name" column directly
  \`\`\`

  ---

  ## 3. The \`io.StringIO\` Trick
  In the sandbox challenge below, we don't have a physical file on a hard drive. Instead, we have a "string" of data. To use the \`csv\` module on a string, we use \`io.StringIO\`. 

  Think of \`io.StringIO\` as a "virtual file" that lets Python treat a block of text as if it were a \`.csv\` file you just opened.

  ---

  ## 4. Filtering Tabular Data
  The real power of Python is filtering thousands of rows instantly. 

  \`\`\`python
  # Example: Only print people born after 1800
  for row in reader:
      if int(row["year"]) > 1800:
          print(row["name"])
  \`\`\`

  :::try-it
  When reading a CSV, remember that everything starts as a **string**. If you want to do math on a year or a price, you must convert it using \`int()\` or \`float()\`!
  :::
  `,
    challenges: [
      {
        id: 'structured-data-01-c1',
        title: 'Parse CSV data',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import csv
  import io

  # A researcher gives you this string of data
  csv_data = "name,year\\nAusten,1813\\nShelley,1818\\nStoker,1897"

  # Goal: Use csv.reader to print each row as a list
  # 1. Create a "virtual file" using io.StringIO(csv_data)
  # 2. Pass that virtual file to csv.reader()
  # 3. Loop through the reader and print each row

  # Your code here
  `,
        expectedOutput: "['name', 'year']\n['Austen', '1813']\n['Shelley', '1818']\n['Stoker', '1897']",
        hints: [
          'The syntax is: reader = csv.reader(io.StringIO(csv_data))',
          'Use "for row in reader:" to iterate through the rows.',
          'Each "row" will be a list of strings.',
        ],
        solution: `import csv
  import io

  csv_data = "name,year\\nAusten,1813\\nShelley,1818\\nStoker,1897"

  # Create virtual file
  virtual_file = io.StringIO(csv_data)

  # Create the reader
  reader = csv.reader(virtual_file)

  # Loop and print
  for row in reader:
      print(row)`,
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
      'Load data into a Pandas DataFrame using dictionaries',
      'Select specific columns and inspect data structure',
      'Calculate the size and summary statistics of a dataset',
      'Understand the advantage of DataFrames over manual CSV parsing',
    ],
    keywords: ['pandas', 'dataframe', 'series', 'data science', 'metadata'],
    content: `# Introducing Pandas: The Powerhouse of DH Data

  ## Beyond the Spreadsheet
  While Excel is a common tool in the humanities, it has limits. It is difficult to track exactly how you changed your data in Excel, and it can crash with very large datasets. 

  **Pandas** is a Python library that treats data like a programmable spreadsheet called a **DataFrame**. Using Pandas makes your research **reproducible**: anyone can run your script and see exactly how you filtered or analyzed your data.

  ---

  ## 1. The DataFrame Structure
  A DataFrame is a two-dimensional table. You can think of it as a collection of **Series** (columns) that share the same index (row numbers).

  To use it, we always import it with the alias \`pd\`:
  \`\`\`python
  import pandas as pd

  # We can build a DataFrame from a dictionary of lists
  data = {
      'title': ['Frankenstein', 'Dracula', 'Jane Eyre'],
      'author': ['Shelley', 'Stoker', 'Brontë'],
      'year': [1818, 1897, 1847]
  }

  df = pd.DataFrame(data)
  \`\`\`

  ---

  ## 2. Inspecting Your Data
  Once your data is in a DataFrame, you can use these built-in methods to see what you have:

  - **\`df.head(n)\`**: Shows the first *n* rows.
  - **\`df.shape\`**: Shows the number of (rows, columns).
  - **\`len(df)\`**: Shows the total number of rows.
  - **\`df['column_name']\`**: Selects just one column.

  \`\`\`python
  print(df.shape) # Output: (3, 3)
  print(df['author']) # Shows just the authors list
  \`\`\`

  ---

  ## 3. Basic Statistics
  If your data has numbers (like publication years or word counts), Pandas can instantly calculate the "health" of your dataset.

  \`\`\`python
  # Gives count, mean, min, max, and percentiles for all numeric columns
  print(df.describe())
  \`\`\`

  :::tip
  **DH Use Case**: If you have a CSV of 10,000 library records, you can use \`df['language'].value_counts()\` to instantly see how many books are in English vs. French. This is much faster than manual counting!
  :::

  :::challenge
  In the challenge at right, you will practice creating a DataFrame from scratch. Remember that the **Keys** of your dictionary become the **Column Headers**, and the **Lists** become the **Rows**.
  :::
  `,
    challenges: [
      {
        id: 'structured-data-02-c1',
        title: 'Create a Research DataFrame',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import pandas as pd

  # 1. Create a dictionary called 'research_data'
  #    It should have 3 columns: 'title', 'author', 'year'
  #    Add 3 books of your choice to each list.
  # 2. Convert the dictionary into a DataFrame named 'df'
  # 3. Print the length of the DataFrame using len(df)

  # Your code here
  `,
        expectedOutput: '3',
        hints: [
          'Your dictionary should look like: {"title": ["A", "B", "C"], ...}',
          'To create the DataFrame, use: df = pd.DataFrame(research_data)',
          'The output should be the number 3, as you added 3 books.',
        ],
        solution: `import pandas as pd

  research_data = {
      'title': ['The Hobbit', 'Beloved', 'Oryx and Crake'],
      'author': ['Tolkien', 'Morrison', 'Atwood'],
      'year': [1937, 1987, 2003]
  }

  df = pd.DataFrame(research_data)

  print(len(df))`,
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
      'Perform boolean indexing to filter datasets',
      'Sort data by one or more criteria (e.g., chronological order)',
      'Identify and handle missing data (NaNs) in historical records',
      'Filter structured lists using list comprehensions'
    ],
    keywords: ['filter', 'sort', 'query', 'boolean indexing', 'nan'],
    content: `# Filtering and Sorting: Interrogating the Archive

  The true power of structured data is the ability to "interrogate" it. Instead of scrolling through 5,000 rows in a spreadsheet, you can ask specific questions: *"Show me all books published in London between 1850 and 1860 that mention 'Science'."*

  ---

  ## 1. Boolean Indexing (Filtering)
  In Pandas, filtering is done using "Boolean Indexing." You create a rule, and Pandas applies it to every row, keeping only the ones that are \`True\`.

  The syntax looks a bit strange at first because you see the name of the DataFrame twice:
  \`\`\`python
  # "Inside the DataFrame (df), find rows where df['year'] is greater than 1850"
  later_books = df[df['year'] > 1850]
  \`\`\`

  ---

  ## 2. Sorting Data
  Sorting is essential for seeing chronological trends or finding outliers (like the longest or shortest books in a corpus).

  \`\`\`python
  # Sort by year, oldest first
  chronological_df = df.sort_values(by='year', ascending=True)

  # Sort by author alphabetically
  alphabetical_df = df.sort_values(by='author')
  \`\`\`

  ---

  ## 3. The "Gap" in the Archive (NaN)
  Historical data is rarely perfect. You will often encounter **NaN** (Not a Number), which represents missing data—perhaps a page was torn, or the publication year wasn't recorded.

  - **\`df.dropna()\`**: Removes any row that has missing data.
  - **\`df.fillna("Unknown")\`**: Replaces missing values with a placeholder string.

  ---

  ## 4. Filtering Lists of Dictionaries
  Sometimes, before you even get into Pandas, you have a simple Python list of dictionaries. To filter these, we use a **List Comprehension**. This is a condensed loop that "filters" as it goes:

  \`\`\`python
  data = [
      {"name": "Frankenstein", "year": 1818},
      {"name": "Dracula", "year": 1897}
  ]

  # Keep only items where year is greater than 1850
  filtered_list = [d for d in data if d['year'] > 1850]
  \`\`\`

  :::tip
  Think of a List Comprehension as: *[Item for Item in List if Condition]*. It is the "Intermediate" way to write a four-line loop in just one line.
  :::

  :::challenge
  In the challenge at right, you are given a list of dictionaries representing archival records. Use a list comprehension to filter for records where the year is greater than 1850.
  :::
  `,
    challenges: [
      {
        id: 'structured-data-03-c1',
        title: 'Filter Archival Records',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A list of archival records
  data = [
      {'name': 'Pride and Prejudice', 'year': 1813},
      {'name': 'Frankenstein', 'year': 1818},
      {'name': 'Dracula', 'year': 1897}
  ]

  # Goal: Create a new list called 'filtered' that contains 
  # only the dictionaries where the 'year' is greater than 1850.

  # Your code here:
  # 1. Use a list comprehension to filter the data
  # 2. Print the length of the filtered list

  `,
        expectedOutput: '1',
        hints: [
          'A list comprehension looks like: [d for d in data if d["year"] > 1850]',
          'To get the length, use len(filtered).',
          'Only "Dracula" (1897) matches the criteria, so your length should be 1.'
        ],
        solution: `data = [
      {'name': 'Pride and Prejudice', 'year': 1813},
      {'name': 'Frankenstein', 'year': 1818},
      {'name': 'Dracula', 'year': 1897}
  ]

  # List comprehension filtering
  filtered = [d for d in data if d['year'] > 1850]

  print(len(filtered))`
      }
    ]
  },
  {
    id: 'structured-data-04',
    title: 'Grouping and Aggregation',
    moduleId: 'structured-data',
    prerequisites: ['structured-data-03'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand the "Split-Apply-Combine" pattern of data analysis',
      'Use GroupBy to categorize humanities data by metadata (genre, year, author)',
      'Apply aggregate functions like sum, mean, and count to grouped data',
      'Perform manual grouping using Python dictionaries'
    ],
    keywords: ['groupby', 'aggregate', 'summary', 'statistics', 'counts'],
    content: `# Grouping and Aggregation: Comparing Categories

  In Digital Humanities, we often want to compare groups. We don't just want the average word count of a whole library; we want to compare the average word count of **Gothic novels** vs. **Romance novels**, or **18th-century letters** vs. **19th-century letters**.

  ---

  ## 1. The "Split-Apply-Combine" Pattern
  To analyze categories, we follow a three-step process:
  1.  **Split**: Divide the dataset into groups based on a label (e.g., "Genre").
  2.  **Apply**: Calculate a statistic for each group (e.g., "Count the rows" or "Find the Mean").
  3.  **Combine**: Merge those results back into a new summary table.

  ### The Pandas Way
  Pandas makes this process incredibly efficient with the \`.groupby()\` method.

  \`\`\`python
  import pandas as pd

  # Example: Finding the average publication year per genre
  summary = df.groupby('genre')['year'].mean()
  print(summary)
  \`\`\`

  ---

  ## 2. Common Aggregation Methods
  Once you have grouped your data, you can "Apply" different mathematical operations:
  - **\`.count()\`**: How many items are in this category?
  - **\`.mean()\`**: What is the average value?
  - **\`.sum()\`**: What is the total?
  - **\`.max() / .min()\`**: What are the extreme values in this group?

  ---

  ## 3. Under the Hood: Grouping with Dictionaries
  Before using Pandas, it's helpful to understand the logic of grouping. In Python, we use a dictionary to "collect" counts for different categories. 

  As we loop through our data, we check: *"Have I seen this genre before? If so, add 1 to its count. If not, start the count at 1."*

  \`\`\`python
  books = [('Gothic', 'Frankenstein'), ('Romance', 'Emma'), ('Gothic', 'Dracula')]
  counts = {}

  for genre, title in books:
      # Use .get() to avoid errors if the genre isn't in the dictionary yet
      counts[genre] = counts.get(genre, 0) + 1

  print(counts) # Output: {'Gothic': 2, 'Romance': 1}
  \`\`\`

  :::definition
  **Aggregation**: The process of turning many data points (individual books) into a single significant number (total count or average) that describes a group.
  :::

  :::challenge
  In the challenge at right, you are given a list of tuples. Each tuple contains a **genre** and a **title**. Your goal is to manually count how many books belong to the 'Gothic' genre using the dictionary method.
  :::
  `,
    challenges: [
      {
        id: 'structured-data-04-c1',
        title: 'Group and Count by Genre',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A list of book tuples: (Genre, Title)
  books = [('Gothic', 'Frankenstein'), ('Gothic', 'Dracula'), ('Romance', 'Emma')]

  # 1. Create an empty dictionary called 'counts'
  # 2. Loop through the 'books' list
  # 3. For each book, update the count for that genre in the dictionary
  #    (Hint: Use counts[genre] = counts.get(genre, 0) + 1)
  # 4. Print the count specifically for 'Gothic'

  # Your code here
  `,
        expectedOutput: '2',
        hints: [
          'When looping through tuples, use: for genre, title in books:',
          'The .get(genre, 0) method ensures that if a genre is new, it starts at 0 before adding 1.',
          'To see the final result, make sure you print counts["Gothic"]'
        ],
        solution: `books = [('Gothic', 'Frankenstein'), ('Gothic', 'Dracula'), ('Romance', 'Emma')]
  counts = {}

  for genre, title in books:
      counts[genre] = counts.get(genre, 0) + 1

  print(counts['Gothic'])`,
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
      'Understand the hierarchical nature of JSON data',
      'Navigate complex data by chaining dictionary keys and list indices',
      'Identify why JSON is used for complex metadata (e.g., TEI or Web APIs)',
      'Safely access deep data points using .get()'
    ],
    keywords: ['json', 'nested', 'keys', 'parsing', 'hierarchy'],
    content: `# Navigating Nested Data: The JSON Onion

  ## Why JSON?
  If a CSV is a flat spreadsheet, **JSON (JavaScript Object Notation)** is an onion. While tables are great for simple lists, they struggle with complexity. 

  Imagine a library book: it might have multiple authors, five different publication dates, and hundreds of chapters. In a CSV, this becomes a mess of redundant columns. In JSON, we can "nest" information inside other information to maintain its natural structure.

  ---

  ## 1. Peeling the Layers
  To get to the "heart" of nested data, you must chain your access commands. In Python, this means using multiple sets of brackets \`[]\` or the \`.get()\` method.

  Look at this record from a digital archive:

  \`\`\`python
  archive_entry = {
      "id": "A100",
      "metadata": {
          "creator": "Shelley, Mary",
          "dates": [1818, 1823, 1831]
      }
  }
  \`\`\`

  To reach the first date (1818), you follow the path:
  1.  **\`archive_entry["metadata"]\`**: This gets you the inner dictionary.
  2.  **\`["dates"]\`**: This gets you the list of years inside that dictionary.
  3.  **\`[0]\`**: This gets you the first item in that list.

  **Combined:** \`archive_entry["metadata"]["dates"][0]\`

  ---

  ## 2. Navigating Lists of Dictionaries
  In DH, the most common structure you will encounter is a **List of Dictionaries**. This is how a book is often represented: the book is a dictionary, and one of its keys is "chapters," which contains a list of smaller dictionaries.

  \`\`\`python
  book = {
      "title": "Frankenstein",
      "chapters": [
          {"num": 1, "title": "Letter 1"},
          {"num": 2, "title": "Letter 2"}
      ]
  }

  # Accessing the title of the first chapter:
  print(book["chapters"][0]["title"]) 
  \`\`\`

  ---

  ## 3. Data Safety: The \`.get()\` Method
  Archival data is often "spotty." Some records might have a "creator" field, while others don't. If you try to access a key that isn't there using brackets, your script will crash.

  \`\`\`python
  # If "location" is missing, this returns None instead of an error:
  loc = archive_entry.get("location") 
  \`\`\`

  :::tip
  **DH Use Case**: When you harvest data from the **Digital Public Library of America (DPLA)** or the **Library of Congress API**, the data will arrive as a massive, nested JSON object. Learning to "drill down" through these layers is how you extract specific information for your research.
  :::

  :::challenge
  In the challenge at right, look closely at the "chapters" key. It contains a list. To get to the second chapter, you must first index the list, then access the dictionary key inside it.
  :::
  `,
    challenges: [
      {
        id: 'structured-data-05-c1',
        title: 'Access Nested Chapter Data',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `data = {
      "title": "Frankenstein",
      "chapters": [
          {"num": 1, "title": "Letters"},
          {"num": 2, "title": "Birth"}
      ]
  }

  # Goal: Access the "title" of the SECOND chapter in the list.
  # 1. Access the "chapters" key.
  # 2. Select the second item in that list (Index 1).
  # 3. Access the "title" key of that item.

  # Your code here
  `,
        expectedOutput: 'Birth',
        hints: [
          'Remember that lists start at 0. The second item is [1].',
          'Your code should look like: data["key"][index]["key"]',
          'Make sure the final result is exactly what you print.'
        ],
        solution: `data = {
      "title": "Frankenstein",
      "chapters": [
          {"num": 1, "title": "Letters"},
          {"num": 2, "title": "Birth"}
      ]
  }

  # Navigate: data -> chapters -> second item -> title
  result = data["chapters"][1]["title"]

  print(result)`,
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
      'Understand the rhetorical power of visualization in "Distant Reading"',
      'Select the appropriate chart type for specific humanities research questions',
      'Apply the "Data-Ink Ratio" to reduce chart junk',
      'Identify ethical issues like misleading scales and data silences',
    ],
    keywords: ['visualization', 'charts', 'design', 'principles', 'ethics', 'distant reading'],
    content: `# Principles of Visualization: Argumentation through Design

  ## Why Visualize?
  In the humanities, a visualization is more than a pretty picture; it is an **argument**. Drawing on the general concept of **Distant Reading**, we use charts to see patterns across a corpus of 1,000 books that would be impossible to see through traditional close reading.

  ---

  ## 1. Choosing Your Chart
  The most important step is matching your research question to the correct visual structure.

  | Chart Type | Research Question | DH Example |
  | :--- | :--- | :--- |
  | **Bar Chart** | Comparison | Comparing the number of female vs. male authors in a collection. |
  | **Line Chart** | Change Over Time | Tracking the frequency of the word "science" from 1700 to 1900. |
  | **Scatter Plot** | Correlation | Plotting sentence length against vocabulary diversity in a novel. |
  | **Histogram** | Distribution | Seeing if most poems in a corpus are short (10 lines) or long (100 lines). |

  ---

  ## 2. The Data-Ink Ratio
  Coined by Edward Tufte, the **Data-Ink Ratio** argues that most of the "ink" on a page should be dedicated to the data itself.
  - **Avoid "Chart Junk"**: Remove unnecessary 3D effects, shadows, or distracting background grids.
  - **Simplify**: If a decorative element doesn't help the reader understand the data, delete it.

  ---

  ## 3. Visualization Ethics
  Visuals carry an air of "objectivity," but they can be highly misleading. 
  1. **The Y-Axis Trap**: Starting a bar chart at a number other than zero can make small differences look massive.
  2. **Data Silences**: What is *not* in your chart? If you are visualizing a colonial archive, whose voices are missing? A chart of "total publications" may hide the fact that certain populations were barred from publishing.
  3. **Labels**: Every axis must have a title. A chart without a label is a riddle, not an argument.

  :::definition
  **Capta vs. Data**: Many humanists prefer the term "capta" (taken) over "data" (given) to remind us that our information is always selected and interpreted by researchers, not just found in the world.
  :::

  :::try-it
  When you start building charts in the next lesson, always ask yourself: *"If I deleted the title and labels, would a reader still know what this represents?"* If the answer is no, your design needs work.
  :::
  `,
    challenges: [
      {
        id: 'data-viz-01-c1',
        title: 'Match the Research Question',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Match the research question to the best chart type.
  # Options: "bar", "line", "scatter"

  # Question 1: I want to see how the use of the word "democracy" 
  # changes year-by-year across the 19th century.
  answer_1 = "???"

  # Question 2: I want to compare the total number of letters 
  # written by 5 different historical figures.
  answer_2 = "???"

  # Goal: Set the variables correctly and print answer_2
  `,
        expectedOutput: 'bar',
        hints: [
          'Line charts are best for diachronic analysis (change over time).',
          'Bar charts are best for comparing categorical totals (like a list of people).',
        ],
        solution: `answer_1 = "line"
  answer_2 = "bar"
  print(answer_2)`,
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
      'Create bar and line charts using Matplotlib',
      'Map data lists to X and Y axes',
      'Label axes and add titles for scholarly clarity',
      'Save plots as high-quality image files for research papers',
    ],
    keywords: ['matplotlib', 'bar', 'line', 'pyplot', 'axes'],
    content: `# Plotting with Matplotlib

  ## The "Grandfather" of Python Viz
  \`matplotlib\` is the most established plotting library in Python. While there are many newer tools, \`matplotlib\` remains the "engine" that powers most of them. In DH, we use it to turn the numbers we’ve counted (like word frequencies or publication years) into visual evidence.

  ---

  ## 1. The Pyplot Pipeline
  To create a visualization, we follow a specific order of operations. We usually import the library under the alias \`plt\`.

  \`\`\`python
  import matplotlib.pyplot as plt

  # 1. Prepare Data (List A must match List B in length)
  decades = ["1810s", "1820s", "1830s"]
  counts = [5, 12, 18]

  # 2. Choose the Chart Type
  plt.bar(decades, counts, color='skyblue')

  # 3. Add Scholarly Metadata (Labels)
  plt.xlabel("Decade of Publication")
  plt.ylabel("Number of Novels")
  plt.title("Growth of the Gothic Novel")

  # 4. Display or Save
  plt.show() 
  # plt.savefig("gothic_trends.png", dpi=300) # dpi=300 ensures it's clear for print
  \`\`\`

  ---

  ## 2. Anatomy of a Plot
  - **The Figure**: The overall window or page where everything is drawn.
  - **The Axes**: The area where the data is actually plotted (the X and Y lines).
  - **Markers/Bars**: The visual representation of your data points.

  ---

  ## 3. Common DH Visualizations

  ### The Line Chart (\`plt.plot\`)
  Best for "Diachronic Analysis" (looking at changes over time).
  \`\`\`python
  # Imagine tracking the word 'electricity' across 3 chapters
  plt.plot([1, 2, 3], [10, 45, 30])
  \`\`\`

  ### The Bar Chart (\`plt.bar\`)
  Best for comparing distinct categories, such as different authors or different archives.

  :::tip
  **Handling Long Labels**: In DH, our labels are often long (like book titles). If your X-axis labels are overlapping and unreadable, add this line before \`plt.show()\`:
  \`plt.xticks(rotation=45)\`
  :::

  :::challenge
  Every plot starts with two matching lists: the **Labels** (X) and the **Values** (Y). In the challenge at right, prepare the data needed to compare the lengths of three famous DH texts.
  :::
  `,
    challenges: [
      {
        id: 'data-viz-02-c1',
        title: 'Prepare Data for a Plot',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# 1. Create a list called 'labels' with these 3 titles: 
  #    'Frankenstein', 'Dracula', 'Jane Eyre'
  # 2. Create a list called 'word_counts' with these 3 integers: 
  #    75000, 160000, 180000
  # 3. Print both lists to verify they match in order

  # Your code here
  `,
        expectedOutput: "['Frankenstein', 'Dracula', 'Jane Eyre']\n[75000, 160000, 180000]",
        hints: [
          'Ensure the order of counts matches the order of the titles.',
          'Strings need quotes; integers do not.',
          'Use two separate print statements.',
        ],
        solution: `labels = ['Frankenstein', 'Dracula', 'Jane Eyre']
  word_counts = [75000, 160000, 180000]
  print(labels)
  print(word_counts)`,
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
      'Modify plot styles and color palettes for readability',
      'Create subplots for side-by-side comparative analysis',
      'Adjust figure size and DPI to prevent label overlapping',
      'Generate dynamic titles using summary statistics',
    ],
    keywords: ['customization', 'subplots', 'styling', 'dpi', 'accessibility'],
    content: `# Customizing Visualizations: From Draft to Publication

  ## Beyond the Defaults
  Default charts are often sufficient for your own eyes, but for a conference presentation or a journal article, we need to tweak the details. This ensures our "visual argument" is both readable and accessible.

  ---

  ## 1. Using Styles
  Matplotlib comes with built-in themes that instantly change the background, gridlines, and fonts. In DH, \`fivethirtyeight\` and \`ggplot\` are popular for their high readability.

  \`\`\`python
  import matplotlib.pyplot as plt

  # List all available styles: print(plt.style.available)
  plt.style.use('fivethirtyeight') 
  \`\`\`

  ---

  ## 2. The Figure/Axes Hierarchy
  To create complex layouts (like side-by-side comparisons), we move away from simple commands and use the **Subplots** method. 

  Think of it this way:
  - **Figure (\`fig\`)**: The entire canvas or poster.
  - **Axes (\`ax\`)**: The individual frames or charts on that canvas.

  \`\`\`python
  # Create a layout with 1 row and 2 columns
  fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

  # Plotting on the first 'frame'
  ax1.bar(["A", "B"], [10, 20])
  ax1.set_title("Genre Distribution")

  # Plotting on the second 'frame'
  ax2.plot([1, 2, 3], [5, 15, 10])
  ax2.set_title("Publication Timeline")

  plt.tight_layout() # Prevents labels from overlapping!
  \`\`\`

  ---

  ## 3. Dynamic Titles and Summary Stats
  A professional DH visualization often includes the total count of the corpus in the title so the reader knows the scale of the data. 

  To do this, we calculate the total from our dictionary values:
  \`\`\`python
  data = {"Gothic": 15, "Romance": 22}
  total_books = sum(data.values())

  plt.title(f"Corpus Overview (Total: {total_books})")
  \`\`\`

  ---

  ## 4. Accessibility and Ethics
  - **Color Palettes**: Use color-blind friendly palettes (like those provided by the \`Seaborn\` library) to ensure your research is inclusive.
  - **Resolution**: Use \`plt.savefig("plot.png", dpi=300)\`. Lower DPI will make your text blurry and difficult to read for those with visual impairments.

  :::tip
  The \`.values()\` method on a dictionary returns only the numbers. Wrapping that in \`sum()\` gives you an instant total of your dataset.
  :::

  :::challenge
  In the challenge at right, you will practice generating a dynamic title. This is a vital skill for automated reporting, where your script might analyze a new folder of books every day.
  :::
  `,
    challenges: [
      {
        id: 'data-viz-03-c1',
        title: 'Generate a Summary for a Title',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# Data representing book counts per genre
  data = {"Gothic": 15, "Romance": 22, "Adventure": 8}

  # Goal: Calculate the total number of items and print it 
  # exactly in this format: "Total: X"

  # 1. Use sum() and data.values() to find the total
  # 2. Print the result using an f-string or string concatenation

  # Your code here
  `,
        expectedOutput: 'Total: 45',
        hints: [
          'data.values() will give you [15, 22, 8].',
          'sum(data.values()) will add those numbers together.',
          'To print exactly "Total: 45", use: print(f"Total: {total_variable}")',
        ],
        solution: `data = {"Gothic": 15, "Romance": 22, "Adventure": 8}
  total = sum(data.values())
  print(f"Total: {total}")`,
      },
    ],
  },
  {
    id: 'data-viz-04',
    title: 'Visualizing Textual Patterns',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-03'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Map text analysis output (Counter objects) to Matplotlib charts',
      'Visualize the most common words in a corpus while handling stopwords',
      'Understand Lexical Dispersion as a way to visualize narrative time',
      'Compare word usage patterns across different texts'
    ],
    keywords: ['frequency', 'dispersion', 'corpus-viz', 'textual-data', 'nltk'],
    content: `# Visualizing Textual Patterns

  ## Turning Words into Shapes
  In Digital Humanities, we often move from "Close Reading" (analyzing a single page) to "Distant Reading" (analyzing a whole library). To do this effectively, we must turn our linguistic counts into visual evidence.

  ---

  ## 1. The "Tuple Problem"
  In the Text Analysis module, we learned that \`Counter.most_common()\` gives us a list of tuples:
  \`[('the', 10), ('whale', 5)]\`

  However, Matplotlib needs two separate lists: one for **labels** (the words) and one for **values** (the counts). We can use a **List Comprehension** to "unzip" these tuples:

  \`\`\`python
  from collections import Counter
  import matplotlib.pyplot as plt

  text = "the whale the sea the whale ship"
  counts = Counter(text.split())
  top_words = counts.most_common(2) 

  # Unzipping the tuples
  words = [item[0] for item in top_words]  # ['the', 'whale']
  freqs = [item[1] for item in top_words]  # [3, 2]

  plt.bar(words, freqs)
  plt.title("Word Frequency in Moby Dick Snippet")
  plt.show()
  \`\`\`

  ---

  ## 2. Lexical Dispersion: Narrative Time
  A **Lexical Dispersion Plot** is a uniquely DH way of looking at a book. Imagine the X-axis is the timeline of a novel (from the first word to the last). A dispersion plot draws a vertical line every time a specific word appears.

  - **Use Case**: Does the word "Ghost" appear only at the end of the story? Does the word "Marriage" appear in the first chapter and then disappear until the last?
  - **Visualization**: This helps scholars see the "thematic rhythm" of a text without reading the whole thing.

  ---

  ## 3. Comparative Visualization
  To compare two authors, we often use side-by-side bar charts (subplots). This reveals **Stylometry**—the study of linguistic style. For example, you might find that while two authors write about "Death," one uses the word as a noun while the other uses it as an adjective.

  :::tip
  **Filter the Noise**: If you plot your frequencies without removing "Stopwords" (the, and, of, is), your chart will always look the same regardless of the book. Always clean your text *before* plotting to see the words that actually matter to your research.
  :::

  :::challenge
  Before you can create a chart, you must be able to extract the frequency data correctly. In the challenge at right, use the \`Counter\` object to find the most frequent words in a short string.
  :::
  `,
    challenges: [
      {
        id: 'data-viz-04-c1',
        title: 'Prepare Frequency Data',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter

  text = "the the the and and or"

  # Goal: 
  # 1. Split the text into individual words
  # 2. Use Counter to find the 2 most common words
  # 3. Print the resulting list of tuples

  # Your code here
  `,
        expectedOutput: "[('the', 3), ('and', 2)]",
        hints: [
          'Use words = text.split() first.',
          'Initialize your Counter with that list of words.',
          'Call the .most_common(2) method on your counter object.',
        ],
        solution: `from collections import Counter

  text = "the the the and and or"

  # Split and Count
  words = text.split()
  counts = Counter(words)

  # Get top 2
  top_words = counts.most_common(2)

  print(top_words)`,
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
      'Identify HTML tags, attributes, and text content',
      'Understand the hierarchical "Parent-Child" nature of the DOM',
      'Use browser Inspector tools to locate research data',
      'Distinguish between structural tags and metadata attributes'
    ],
    keywords: ['html', 'dom', 'elements', 'scraping', 'tags', 'attributes'],
    content: `# The Anatomy of a Webpage

  ## HTML as a Hierarchical Map
  Most Digital Humanities data is "trapped" inside webpages—think of online archives, newspaper sites, or digital libraries. To "scrape" this data, we have to stop seeing the webpage as a visual design and start seeing it as a **structured document** called the **DOM (Document Object Model)**.

  ---

  ## 1. Elements, Tags, and Attributes
  An HTML **element** usually consists of a start tag, some content, and an end tag.

  - **Tags**: The "labels" that tell the browser what the data is (e.g., \`<h1>\`, \`<p>\`, \`<a>\`).
  - **Attributes**: Extra information tucked inside the start tag. These are vital for DH because they often contain the data we want (like links) or help us identify specific sections.

  \`\`\`html
  <a href="https://archive.org" class="source-link">Visit the Archive</a>
  <!-- ^Tag   ^Attribute          ^Class Name      ^Content          ^End Tag -->
  \`\`\`

  ---

  ## 2. The Tree Structure (Nesting)
  HTML is built like a set of nesting dolls. One tag "wraps" around others, creating a **Parent-Child** relationship.

  - **Parent**: An element that contains other elements (e.g., a \`<div>\` containing several paragraphs).
  - **Child**: An element contained within another.

  \`\`\`html
  <div id="project-description">
      <h1>The Mary Shelley Project</h1>
      <p>This is a <em>digital</em> edition.</p>
  </div>
  \`\`\`
  In the example above, \`<div>\` is the parent. \`<h1>\` and \`<p>\` are siblings. The word "digital" is a child of the \`<em>\` (emphasis) tag.

  ---

  ## 3. Common Tags in DH Projects
  | Tag | Name | DH Use Case |
  | :--- | :--- | :--- |
  | **\`<a>\`** | Anchor | Finding links to PDF documents or other archive pages. |
  | **\`<table>\`** | Table | Storing structured census data or casualty lists. |
  | **\`<ul> / <li>\`** | List / Item | Navigating menus or catalogs of works. |
  | **\`<span> / <div>\`** | Container | Generic boxes often labeled with "class" names for styling. |

  ---

  ## 4. The Researcher's Secret Tool: The Inspector
  You don't need to read the entire source code of a website. In your browser (Chrome, Firefox, or Safari), you can **right-click** on any piece of text or any image and select **"Inspect"**. 

  This opens a side window that shows you exactly where that item lives in the HTML tree. Finding the "class" or "id" of an element using the Inspector is the very first step of every web scraping project.

  :::tip
  **Why does this matter?** 
  If you want to download 1,000 poems from a website, you don't want to copy-paste each one. You want to tell Python: "Find the \`<div>\` with the class \`poem-body\` and give me the text inside it."
  :::

  :::challenge
  While we usually use libraries to "strip" HTML, it is important to remember that HTML is ultimately just a string of text. In the challenge at right, use your string manipulation skills to extract the human-readable text from a raw HTML tag.
  :::
  `,
    challenges: [
      {
        id: 'web-data-01-c1',
        title: 'Manual HTML Tag Removal',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# A researcher has scraped a heading, but it still has HTML tags attached.
  html_string = "<h1>Digital Humanities</h1>"

  # Goal: Extract only the text "Digital Humanities" 
  # by removing the opening <h1> and closing </h1> tags.

  # Your code here:
  # 1. Use .replace() to remove the opening tag
  # 2. Use .replace() to remove the closing tag (nb outside of this environment, you'd use an appropriate _parser_ to do this step.)
  # 3. Assign to a variable 'clean_text' and print it
  `,
        expectedOutput: 'Digital Humanities',
        hints: [
          'You can chain the .replace() methods together.',
          'Remember that the closing tag has a forward slash: </h1>',
          'Make sure your strings in .replace() exactly match the tags in the variable.'
        ],
        solution: `html_string = "<h1>Digital Humanities</h1>"
  clean_text = html_string.replace("<h1>", "").replace("</h1>", "")
  print(clean_text)`,
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
      'Locate and interpret a robots.txt file',
      'Understand "Rate Limiting" and the impact of scraping on small archives',
      'Differentiate between public data and copyrighted or sensitive data',
      'Implement "polite" scraping practices using Python'
    ],
    keywords: ['ethics', 'robots.txt', 'copyright', 'politeness', 'rate limiting'],
    content: `# The Ethical Scraper: Citizenship in the Digital Archive

  ## Just because you can, doesn't mean you should.
  Web scraping is a powerful tool, but in Digital Humanities, we often work with the websites of libraries, small museums, and university archives. Unlike Google or Amazon, these sites may run on limited budgets and small servers. If you send 10,000 requests per second, you could accidentally perform a "Denial of Service" (DoS) attack, crashing the very archive you are trying to study.

  ---

  ## 1. The \`robots.txt\` Protocol
  Before scraping, always check \`website.com/robots.txt\`. This is a plain text file where site owners define their rules for automated bots.

  **Common Terms:**
  - **User-agent**: Who the rule applies to (\`*\` means everyone).
  - **Disallow**: Paths that bots are **not** allowed to visit.
  - **Allow**: Specific paths bots **are** allowed to visit within a disallowed folder.

  ---

  ## 2. Being a "Polite" Guest
  A polite scraper "acts like a human." Humans take a few seconds to read a page before clicking the next one. You can mimic this using the \`time\` library.

  \`\`\`python
  import time

  pages = ["/page1", "/page2", "/page3"]

  for page in pages:
      # [Your scraping code here]
      print(f"Scraped {page}")
      
      # Wait for 2 seconds before the next request
      time.sleep(2) 
  \`\`\`

  ---

  ## 3. Identify Yourself (The User-Agent)
  When your script visits a site, it sends a "User-Agent" string. By default, this says "Python-requests." It is best practice to change this to include your email address. This way, if your script causes trouble, the web admin can email you instead of simply blocking your IP address.

  ---

  ## 4. Copyright and "Data Sovereignty"
  - **Public vs. Private**: Just because data is visible doesn't mean it's "Public Domain." 
  - **Fair Use**: In many regions, scraping for non-commercial scholarly research is "Fair Use," but re-publishing that data (e.g., putting the full text of a copyrighted novel on your own site) is a violation.
  - **Indigenous Data**: Be extra cautious with archives of indigenous materials. These may have "Traditional Knowledge" labels that restrict how the data should be handled, even if it is technically accessible.

  :::tip
  **The Golden Rule of Scraping**: Always look for a "Download Data" button or an API (Application Programming Interface) first. Scraping should be your last resort!
  :::

  :::challenge
  In the challenge at right, you are given a string that represents a \`robots.txt\` file. Your goal is to find the line that starts with "Disallow" and extract the path.
  :::
  `,
    challenges: [
      {
        id: 'web-data-02-c1',
        title: 'Parse a robots.txt Rule',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# A snippet from a robots.txt file
  robots_txt = "User-agent: *\\nDisallow: /private/\\nAllow: /public/"

  # Goal: Extract and print ONLY the path that is disallowed.
  # 1. Split the string into a list of lines using .split("\\n")
  # 2. Loop through the lines
  # 3. If a line starts with "Disallow", extract the part after the ": "
  # 4. Print that path

  # Your code here
  `,
        expectedOutput: '/private/',
        hints: [
          'Use lines = robots_txt.split("\\n") to get each rule.',
          'Inside your loop, use line.startswith("Disallow") to find the right row.',
          'To get the path, you can split the line by ": " and take the second item [1].'
        ],
        solution: `robots_txt = "User-agent: *\\nDisallow: /private/\\nAllow: /public/"

  # Split the rules
  lines = robots_txt.split("\\n")

  for line in lines:
      if line.startswith("Disallow"):
          # Split "Disallow: /private/" into ["Disallow", "/private/"]
          parts = line.split(": ")
          path = parts[1]
          print(path)`,
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
      'Use the requests library to retrieve data from a web endpoint',
      'Understand HTTP status codes (e.g., 200 vs 404)',
      'Navigate nested JSON response objects to extract research data',
    ],
    keywords: ['api', 'json', 'requests', 'rest', 'endpoint'],
    content: `# APIs: The "Front Door" of Data

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

  ## 2. Using the \`requests\` Library
  Python uses the \`requests\` library to communicate with APIs. The most important part of a request is the **Status Code**.

  - **200**: Success!
  - **404**: Not Found (The URL is wrong).
  - **403**: Forbidden (You don't have permission).

  \`\`\`python
  import requests

  # The 'Endpoint' (the URL for the data)
  url = "https://chroniclingamerica.loc.gov/search/pages/results/?format=json&proxtext=humanities"

  response = requests.get(url)

  if response.status_code == 200:
      # .json() converts the raw text into a Python Dictionary/List
      data = response.json() 
      print("Data retrieved successfully!")
  \`\`\`

  ---

  ## 3. Notable APIs for Humanities Research
  - **Library of Congress**: Access millions of digitized newspaper pages and photos.
  - **DPLA (Digital Public Library of America)**: Metadata for millions of items across US heritage institutions.
  - **Europeana**: The gateway to European cultural heritage.
  - **Open Library**: Access to millions of book records and full texts.

  :::tip
  **From String to Data**: When an API sends data, it arrives as a long string. In Python, we use \`json.loads()\` to turn that string into a list or dictionary we can actually work with. In the \`requests\` library, \`response.json()\` does this step for you automatically!
  :::

  :::challenge
  In the challenge at right, you will simulate receiving data from an API. You will need to parse the JSON string and use a loop to extract specific book titles.
  :::
  `,
    challenges: [
      {
        id: 'web-data-03-c1',
        title: 'Parse API Response Data',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import json

  # A simulated string received from a library API
  api_response = '[{"title": "Frankenstein", "year": 1818}, {"title": "Jane Eyre", "year": 1847}]'

  # Goal: 
  # 1. Use json.loads() to convert 'api_response' into a Python list
  # 2. Loop through the list
  # 3. Print only the "title" of each book

  # Your code here
  `,
        expectedOutput: 'Frankenstein\nJane Eyre',
        hints: [
          'books = json.loads(api_response) will create a list of dictionaries.',
          'In your loop, each item is a dictionary. Access the title using item["title"].',
          'Make sure to import the json module (already in starter code).',
        ],
        solution: `import json

  api_response = '[{"title": "Frankenstein", "year": 1818}, {"title": "Jane Eyre", "year": 1847}]'

  # Parse the string into a list of dictionaries
  books = json.loads(api_response)

  # Loop and extract
  for book in books:
      print(book["title"])`,
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
      'Understand the concept of parameter mapping sonification in DH',
      'Map a range of data values to a range of musical pitches (MIDI)',
      'Explain the linear mapping formula (Normalization and Scaling)',
      'Export MIDI data to a playable .mid file using binary writing',
    ],
    keywords: ['sonification', 'mapping', 'midi', 'multimodal', 'binary-write'],
    content: `# The Basics of Data Mapping for Sound

  ## The Audio Archive
  In Digital Humanities, we spend a lot of time *looking* at data—charts, maps, and tables. But our ears are often better at detecting subtle changes in rhythm and pattern than our eyes. **Data Sonification** is the process of turning data into sound. 

  Think of it as a **musical translation**. Just as a translator maps a word in French to a word in English, a "sonifier" maps a data point (like the sentiment of a diary entry) to a musical property (like the height of a note).

  ---

  ## 1. What is Parameter Mapping?
  Sonification usually relies on **Parameter Mapping**: linking a variable in your data to a physical property of sound.

  | Data Variable (DH Example) | Sound Property | Musical Effect |
  | :--- | :--- | :--- |
  | **Word Frequency** | Pitch | Higher frequency = Higher note. |
  | **Sentiment Score** | Timbre | Positive = Bright/Clear; Negative = Distorted/Harsh. |
  | **Punctuation Density** | Rhythm | More commas = Faster beats. |
  | **Publication Year** | Stereo Pan | Older = Left speaker; Newer = Right speaker. |

  ---

  ## 2. The MIDI Standard
  To turn numbers into music using code, we use the **MIDI** (Musical Instrument Digital Interface) standard. 
  - MIDI notes are represented by numbers from **0 to 127**.
  - **60** is Middle C.
  - Every increase of 12 represents one octave (72 is high C, 48 is low C).

  ---

  ## 3. The Linear Mapping Formula
  To map your data (which might be between 0 and 5,000 words) to a musical range (e.g., MIDI notes 48 to 84), we use a three-step process:

  1.  **Normalization**: How far is the current value into the data range? (from 0.0 to 1.0).
  2.  **Scaling**: Multiply that percentage by the size of the musical range.
  3.  **Offset**: Add it to the lowest note in your musical range.

  \`\`\`python
  # The logic inside a mapping function
  percent = (value - min_data) / (max_data - min_data)
  note = min_note + (percent * (max_note - min_note))
  \`\`\`

  ---

  ## 4. Exporting your "Digital Score"
  To hear your results, you must save your list of numbers as a \`.mid\` file. We use the \`midiutil\` library to generate instructions for a computer's virtual instrument.

  \`\`\`python
  from midiutil import MIDIFile

  # Create a MIDI object with one track
  MyMIDI = MIDIFile(1) 
  MyMIDI.addTempo(track=0, time=0, tempo=120)

  # Add the notes we mapped (pitch) to the track
  for i, pitch in enumerate(notes):
      # track, channel, pitch, time, duration, volume
      MyMIDI.addNote(0, 0, pitch, i, 1, 100)

  # Save the file using 'wb' (Write Binary) mode
  with open("data_sonification.mid", "wb") as output_file:
      MyMIDI.writeFile(output_file)
  \`\`\`

  :::tip
  **Why Sonify?** 
  Sonification is a form of **Multimodal Analysis**. It allows researchers to "listen" to a corpus while doing other tasks, and provides an accessible way for visually impaired scholars to engage with quantitative data.
  :::

  :::challenge
  You have word counts from five chapters of a novel. Your goal is to map these counts to MIDI notes between **48 (Low C)** and **84 (High C)**. If a chapter is very long, it should play a very high note.
  :::
  `,
    challenges: [
      {
        id: 'sonification-01-c1',
        title: 'Mapping Pitch',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Data: word counts for 5 chapters
  chapter_counts = [1200, 4500, 3200, 800, 5000]

  # Define the data range
  min_data = min(chapter_counts)
  max_data = max(chapter_counts)

  # Define the musical range (MIDI notes)
  min_note = 48
  max_note = 84

  def sonify(val):
      # 1. Calculate how far 'val' is across the data range (0.0 to 1.0)
      # 2. Multiply that by the width of the note range (max_note - min_note)
      # 3. Add it to the min_note
      # 4. Return as an integer (int)
      pass

  # Map the chapter counts to notes
  notes = [sonify(c) for c in chapter_counts]
  print(notes)
  `,
        expectedOutput: '[51, 79, 68, 48, 84]',
        hints: [
          'Percentage = (val - min_data) / (max_data - min_data)',
          'The width of your note range is (max_note - min_note).',
          'Wrap your final calculation in int() to ensure it is a valid MIDI number.',
        ],
        solution: `chapter_counts = [1200, 4500, 3200, 800, 5000]
  min_data = min(chapter_counts)
  max_data = max(chapter_counts)
  min_note = 48
  max_note = 84

  def sonify(val):
      # Calculate percentage in data range
      percent = (val - min_data) / (max_data - min_data)
      # Map to musical range
      note = min_note + (percent * (max_note - min_note))
      return int(note)

  notes = [sonify(c) for c in chapter_counts]
  print(notes)`,
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
      'Map temporal data (timestamps) to musical duration and onset time',
      'Calculate the distance between data points to create a "rhythmic sequence"',
      'Understand how data density translates to musical tempo',
      'Handle "edge cases" like zero-duration notes in a dataset'
    ],
    keywords: ['rhythm', 'duration', 'tempo', 'sequence', 'inter-onset'],
    content: `# Rhythms of the Archive

  ## Analogy
  If pitch is the **space** of a sound (high or low), rhythm is its **time**. 

  Think of a historical timeline like a sheet of music. Events that happen close together in time—like a flurry of letters sent during a crisis—feel like a rapid drumroll. Events separated by decades of silence feel like long, sustained notes held by a violin. 

  ---

  ## 1. Temporal Sonification
  In the humanities, we often deal with "Time-Series" data: when books were published, when a specific word appears in a text, or the timestamps of a correspondence. 

  To turn these "points in time" into rhythm, we map the **distance between events** to the **duration of a note** (how long it lasts) or the **Inter-onset Interval** (how much silence exists between the start of two notes).

  ---

  ## 2. The Logic of "The Next Item"
  To find the rhythm of an archive, we have to look at two items at once: the current event and the one that follows it. In Python, we do this by looping through a list but stopping one item before the end so we don't "fall off the edge" of the list.

  \`\`\`python
  # Years of major events
  years = [1800, 1805, 1806, 1820]

  # We use range(len(years) - 1) to avoid an "IndexError"
  for i in range(len(years) - 1):
      current_year = years[i]
      next_year = years[i+1]
      
      gap = next_year - current_year
      print(f"The gap between {current_year} and {next_year} is {gap} years.")
  \`\`\`

  ---

  ## 3. Programming Rhythm in MIDI
  When using the \`midiutil\` library, rhythm is controlled by two parameters: **time** (when the note starts) and **duration** (how long it stays down).

  - **High Density**: Small gaps between events result in a high "tempo" or "staccato" feel.
  - **Low Density**: Large gaps create long, "legato" tones or long pauses of silence.

  \`\`\`python
  # time: where the note starts
  # duration: how long it lasts
  MyMIDI.addNote(track, channel, pitch, time, duration, volume)
  \`\`\`

  ---

  ## 4. The Problem of "Zero Time"
  In historical data, two events often happen at the same time (e.g., two books published in the same year). If the gap is \`0\`, the note won't have any length and you won't hear it! 

  **DH Best Practice**: Always add a "Minimum Duration" (an offset). If your gap is \`0\`, force it to be at least \`0.1\` so the data remains audible.

  :::tip
  **Humanities Application**: By sonifying the "rhythm" of punctuation in a novel (mapping the number of words between every comma), you can *hear* the difference between a frantic, breathless author and a slow, methodical one.
  :::

  :::challenge
  You have a list of "mentions" (the page numbers where a keyword appears). Calculate the distances between these mentions to create a list of durations. This list will serve as the rhythmic foundation for a sonification.
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
  # Example: the difference between 12 and 15 is 3.

  durations = []

  # Your code here: 
  # 1. Loop through the list using range and len()
  # 2. Subtract the current mention from the next mention
  # 3. Append the result to the 'durations' list

  print(durations)
  `,
        expectedOutput: '[3, 1, 24, 2]',
        hints: [
          'Use for i in range(len(mentions) - 1): to stay within the list bounds.',
          'The current item is mentions[i] and the next item is mentions[i+1].',
          'Subtracting mentions[i] from mentions[i+1] gives you the distance.'
        ],
        solution: `mentions = [12, 15, 16, 40, 42]
  durations = []

  for i in range(len(mentions) - 1):
      # Calculate the distance to the next point
      gap = mentions[i+1] - mentions[i]
      durations.append(gap)

  print(durations)`,
      },
    ],
  },
  {
    id: 'sonification-01',
    title: 'Multimodal Mapping (Pitch and Volume)',
    moduleId: 'data-sonification',
    prerequisites: ['sonification-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Map multiple data variables to different sound parameters simultaneously',
      'Understand the trade-offs between cognitive load and data density in audio',
      'Translate raw data lists into structured "Note" dictionaries',
      'Apply MIDI Velocity to represent quantitative scale'
    ],
    keywords: ['multimodal', 'volume', 'velocity', 'synthesis', 'mapping'],
    content: `# Multimodal Mapping: Hearing Complexity

  ## Analogy
  Imagine watching a ballet. You aren't just watching the dancer's **feet** (the pitch); you are also watching the **force** of their movements (the volume/velocity) and the **speed** of the dance (the rhythm). By combining these, the dance tells a much richer story than any one movement could alone. Multimodal sonification does the same for your research data.

  ---

  ## 1. Independent Mapping
  In Digital Humanities, a single record usually has multiple facets. A diary entry has a **date**, a **word count**, and a **sentiment score**. In multimodal sonification, we assign each facet to a different "dimension" of sound:

  - **Date** $\rightarrow$ **Time** (When the note starts)
  - **Sentiment** $\rightarrow$ **Pitch** (High notes for joy, low notes for sorrow)
  - **Word Count** $\rightarrow$ **Velocity** (Loudness/Intensity)

  :::definition
  **Velocity**: In MIDI terminology, this refers to how "hard" a note is struck. It ranges from **0 (silent) to 127 (maximum force)**. It is the standard way to map the "weight" or "volume" of a data point.
  :::

  ---

  ## 2. Complexity vs. Clarity
  The more variables you map, the harder it is for the human ear to distinguish them. 
  - **Redundant Mapping**: Mapping one variable to two sounds (e.g., Year $\rightarrow$ Pitch AND Volume). This makes the data very easy to "hear" but uses up your available sounds.
  - **Independent Mapping**: Mapping different variables to different sounds (e.g., Year $\rightarrow$ Pitch, Count $\rightarrow$ Volume). This shows **correlation**. Can you hear the notes getting higher and louder at the same time?

  ---

  ## 3. Data Structures for Sound
  When we move from raw data to music, we often transform our lists into **Dictionaries**. This makes the code much more readable when we finally send it to the \`midiutil\` library.

  \`\`\`python
  # Raw Record: [Year, Sentiment, WordCount]
  raw_entry = [1850, 0.8, 500]

  # Mapping into a structured "Note" object
  note_data = {
      "pitch": int(60 + (raw_entry[1] * 12)), # Maps sentiment to one octave
      "velocity": int((raw_entry[2] / 1000) * 127), # Maps count to volume
      "time": raw_entry[0] - 1800 # Maps year to a relative start time
  }
  \`\`\`

  ---

  ## 4. The Math of Multi-Mapping
  Remember the formula from Lesson 1: \`percent * range + offset\`. When doing multimodal mapping, you simply perform this calculation for each sound parameter.

  :::tip
  **DH Insight**: Multimodal sonification is perfect for detecting **outliers**. If you hear a note that is suddenly very high (pitch) but very quiet (velocity), you have found a record that is highly positive but very short—a "blip" in your archive that might be worth a closer look.
  :::

  :::challenge
  You have a small "corpus" of books. Each book is a list: \`[year, page_count]\`. Convert these into a list of Note dictionaries. Map the **Year** to a pitch (60-72) and the **Page Count** to a velocity (0-127).
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

  # Mapping Rules:
  # Pitch: 1818-1897 -> 60-72 (Range of 12)
  # Velocity (Volume): 0-500 pages -> 0-127 (Range of 127)

  def generate_note(item):
      year, pages = item
      
      # 1. Map year to pitch (60 to 72)
      # Formula: 60 + (year_percent * 12)
      pitch = 60 + int(((year - 1818) / (1897 - 1818)) * 12)
      
      # 2. Map pages to velocity (0 to 127)
      # Formula: (pages / 500) * 127
      velocity = int((pages / 500) * 127)
      
      return {"pitch": pitch, "velocity": velocity}

  # Use a list comprehension to process the corpus
  notes = [generate_note(b) for b in corpus]

  for n in notes:
      print(n)
  `,
        expectedOutput: "{'pitch': 60, 'velocity': 71}\n{'pitch': 64, 'velocity': 101}\n{'pitch': 72, 'velocity': 81}",
        hints: [
          'The "Year Percent" is (year - 1818) / (1897 - 1818).',
          'Multiply the year percentage by 12 and add it to the base pitch of 60.',
          'To get velocity, divide pages by 500 and multiply by 127.',
          'Use int() to round your results to whole MIDI numbers.'
        ],
        solution: `corpus = [
      [1818, 280],
      [1847, 400],
      [1897, 320]
  ]

  def generate_note(item):
      year, pages = item
      
      # Map Year to Pitch
      year_range = 1897 - 1818
      pitch_range = 12
      pitch = 60 + int(((year - 1818) / year_range) * pitch_range)
      
      # Map Pages to Velocity
      velocity = int((pages / 500) * 127)
      
      return {"pitch": pitch, "velocity": velocity}

  notes = [generate_note(b) for b in corpus]
  for n in notes:
      print(n)`,
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
      'Understand the "Bag of Words" assumption and its trade-offs',
      'Differentiate between a "Topic" (word clusters) and a "Category" (fixed labels)',
      'Identify the importance of Stopword removal in modeling'
    ],
    keywords: ['LDA', 'distant reading', 'latent', 'probability', 'bag-of-words'],
    content: `# Topic Modeling: Conceptual Foundations

  ## Analogy
  Imagine you have a giant pile of 1,000 unsorted newspaper clippings from the 1920s. You don't have time to read them, but you notice that some clippings use the words "stadium," "goal," and "referee" frequently, while others use "election," "vote," and "parliament." 

  Even without reading the articles, you can guess that the first group represents a discourse on **Sports** and the second on **Politics**. Topic modeling is a digital assistant that sorts these clippings by looking at which words tend to "hang out" together in the same documents.

  ---

  ## 1. Latent Dirichlet Allocation (LDA)
  LDA is the most common algorithm for topic modeling in the humanities. It works on a "probabilistic" basis, assuming two things:
  1.  **Documents are mixtures of topics**: A single letter from a soldier might be 60% "military life" and 40% "family affection."
  2.  **Topics are mixtures of words**: The "Military" topic has a high probability of containing words like "march," "camp," and "officer."

  :::definition
  **Latent**: This means "hidden." We call it *Latent* Dirichlet Allocation because the topics aren't explicitly labeled in the text; the computer has to discover the hidden patterns.
  :::

  ---

  ## 2. The Bag of Words (BoW)
  To a topic model, **grammar and word order do not matter**. "The cat sat on the mat" and "The mat sat on the cat" are identical to the model. It treats a document like a "bag" of individual words, only caring about how many of each word are present.

  \`\`\`python
  # A "Bag of Words" representation
  doc = "history is a set of lies"
  bag = doc.split()
  counts = {word: bag.count(word) for word in set(bag)}
  # Result: {'set': 1, 'is': 1, 'lies': 1, 'a': 1, 'history': 1, 'of': 1}
  \`\`\`

  ---

  ## 3. The Problem of "The": Stopwords
  In the challenge at right, you will find shared words between two sentences. You will notice that common words like "the" appear in both. In real topic modeling, these are called **Stopwords**. Because they appear in *every* document, they don't help the computer distinguish between topics. Most researchers remove them before running a model.

  ---

  ## 4. Why Use This in DH?
  Topic modeling is a form of **Distant Reading**. It allows a scholar to:
  -   Survey thousands of documents at once.
  -   Discover themes they didn't know existed.
  -   Track how a "Topic" (like *democracy* or *nature*) changes in its word usage over 200 years.

  :::tip
  **Topics vs. Categories**: A category is a label *you* give a book (like "Fiction"). A topic is a cluster of words the *computer* finds (like "ship, sea, whale, captain"). It is up to the researcher to interpret what those clusters mean.
  :::

  :::challenge
  To build topics, the computer looks for "overlap." Identify the shared words between these two documents. These shared words represent the "latent" connection the computer uses to group texts together.
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

  # 1. Turn each document into a set of words
  words_a = set(doc_a.split())
  words_b = set(doc_b.split())

  # 2. Use the set intersection operator (&) to find words in both
  shared_words = set() # Replace this with your intersection code

  # 3. Print the sorted list of shared words
  print(sorted(list(shared_words)))
  `,
        expectedOutput: "['dark', 'mountain', 'the']",
        hints: [
          'The intersection operator is the ampersand: words_a & words_b.',
          'Notice that "the" is included; in a real project, we would remove this as a "stopword".',
          'Make sure to assign the result of the intersection to the variable shared_words.'
        ],
        solution: `doc_a = "the storm clouds moved over the dark mountain"
  doc_b = "the rain fell on the mountain and the dark forest"

  words_a = set(doc_a.split())
  words_b = set(doc_b.split())

  # Use & to find common items in both sets
  shared_words = words_a & words_b

  print(sorted(list(shared_words)))`,
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
      'Identify and remove "noise" words using custom stopword lists',
      'Understand Lemmatization as a tool for grouping semantic variations',
      'Apply frequency filtering to focus on statistically meaningful terms',
      'Implement a multi-step cleaning pipeline in Python'
    ],
    keywords: ['stopwords', 'lemmatization', 'filtering', 'tokens', 'noise'],
    content: `# Preprocessing for Topic Models: Straining the Soup

  ## The Signal vs. Noise Problem
  If you are trying to taste the subtle spices in a stew, you need to strain out the large bones and the excess water. In topic modeling, words like "the," "is," and "of" are the "water." They appear everywhere, and because they are in every document, they don't help the computer distinguish one topic from another. To find the "signal" (the topics), we must first remove the "noise."

  ---

  ## 1. Custom Stopwords
  Most programming libraries provide a default list of English stopwords. However, as a DH researcher, you often need **domain-specific stopwords**. 

  -   **Example**: If you are analyzing a collection of 18th-century legal documents, the word "court" or "witness" might appear in every single file. Because they are universal to your corpus, they provide no distinctive information. You should treat them as stopwords.

  ---

  ## 2. Lemmatization: Grouping Concepts
  LDA works best when "running," "ran," and "runs" are all treated as the single concept: **run**. 

  :::definition
  **Lemmatization**: Reducing a word to its "lemma" or dictionary root. Unlike "Stemming" (which just chops off the ends of words), lemmatization uses a dictionary to ensure the result is a real word.
  -   "Better" $\rightarrow$ "Good"
  -   "Civilians" $\rightarrow$ "Civilian"
  :::

  ---

  ## 3. Extreme Frequency Filtering
  Beyond stopwords, we often filter words based on how many documents they appear in:
  -   **Too Frequent**: If a word appears in 95% of your documents, it won't help define a specific topic.
  -   **Too Rare (Hapax Legomena)**: If a word appears only once in 10,000 pages, the computer doesn't have enough evidence to "group" it with anything else. These are usually removed to speed up the model.

  ---

  ## 4. The Cleaning Pipeline
  In a real DH project, your "cleaning recipe" looks like this:
  1.  **Lowercase** everything.
  2.  **Remove Punctuation** and numbers.
  3.  **Lemmatize** the words.
  4.  **Remove Stopwords** (Standard + Custom).
  5.  **Remove Short Words** (Words with 1 or 2 letters are rarely useful for topics).

  \`\`\`python
  # A cleaned "Bag of Words" result:
  raw = "The kings were running through the kingdom"
  # After lowercase, lemmatization, and stopword removal:
  clean = ["king", "run", "kingdom"]
  \`\`\`

  :::tip
  **Humanities Insight**: Be careful! Removing "he" and "she" is standard for topic models, but if your research question is about **gender and power**, those "stopwords" are actually your most important data points. Always match your cleaning to your research question.
  :::

  :::challenge
  In the challenge at right, you will act as the "strainer." You must take a list of tokens and filter them by two criteria: they must not be in the stopword list, and they must be longer than 3 characters.
  :::`,
    challenges: [
      {
        id: 'topic-modeling-02-c1',
        title: 'Cleaning the Recipe',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A list of words from a document
  tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]

  # Our stopword list
  stopwords = ["it", "was", "a", "and", "in", "the"]

  # Goal: Create a new list called 'cleaned' containing only words that:
  # 1. Are NOT in the stopwords list
  # 2. Are longer than 3 characters (len > 3)

  cleaned = []

  # Your code here: 
  # Loop through 'tokens', check both conditions, and append to 'cleaned'

  print(cleaned)
  `,
        expectedOutput: "['scary', 'dark', 'night', 'forest']",
        hints: [
          'Use: for word in tokens:',
          'You can check membership using: if word not in stopwords:',
          'Combine conditions with "and": if (condition1) and (condition2):',
          'Use cleaned.append(word) to save the good words.'
        ],
        solution: `tokens = ["it", "was", "a", "scary", "and", "dark", "night", "in", "the", "forest"]
  stopwords = ["it", "was", "a", "and", "in", "the"]

  cleaned = []

  for word in tokens:
      # Filter by stopword list AND length
      if word not in stopwords and len(word) > 3:
          cleaned.append(word)

  print(cleaned)`,
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
      'Convert preprocessed text into a numerical Document-Term Matrix',
      'Understand the importance of the "K" (number of topics) parameter',
      'Train a basic model using the Gensim library',
      'Interpret the mapping between Word IDs and actual tokens',
    ],
    keywords: ['gensim', 'dictionary', 'corpus', 'hyperparameters', 'doc2bow'],
    content: `# Training an LDA Model: The Numerical Archive

  ## Analogy
  Training a model is like giving a student a stack of 1,000 books and saying, "I want you to find 10 different themes in here." 

  The student doesn't know what the themes are yet; they just start looking for groups of words that appear together frequently. You, the researcher, have to decide the number of themes (the **K**) *before* the student starts. You are the architect; the computer is the builder.

  ---

  ## 1. Dictionary vs. Corpus
  Computers can't read words; they read numbers. To bridge this gap, the **Gensim** library (the standard for topic modeling in Python) uses two specialized objects:

  - **The Dictionary**: A master map that assigns a unique ID number to every unique word in your entire collection. 
    - *Example: {"whale": 0, "ship": 1, "sea": 2}*
  - **The Corpus (Bag of Words)**: A numerical version of your documents. Instead of storing the text "the whale, the whale," it stores a list of tuples: \`[(0, 2)]\`. This means: "Word ID 0 (whale) appears 2 times."

  ---

  ## 2. Choosing the "Goldilocks K"
  The most important decision you make is choosing the number of topics (**K**). 

  - **If K is too small**: Your topics will be "mushy" and over-generalized (e.g., a single topic that contains both "Religion" and "Politics").
  - **If K is too large**: Your topics will be too "splintered," creating dozens of tiny, overlapping categories that are hard to interpret.

  :::definition
  **Hyperparameter**: A setting you choose *before* the training starts (like K) that determines how the model learns. In DH, we often run several models with different K values (e.g., 10, 20, 50) to see which one yields the most useful results.
  :::

  ---

  ## 3. The Gensim Workflow
  To train a model, you follow three standard steps:
  1. **Build the Dictionary**: \`dictionary = corpora.Dictionary(texts)\`
  2. **Create the Bag of Words**: \`corpus = [dictionary.doc2bow(text) for text in texts]\`
  3. **Train the Model**: \`lda = models.LdaModel(corpus, num_topics=K, id2word=dictionary)\`

  ---

  ## 4. The Stochastic Nature of LDA
  LDA is "stochastic," meaning it uses a degree of randomness. If you run the exact same model twice, you might get slightly different results. In scholarly research, we look for **stable topics**—clusters of words that consistently appear together across multiple runs.

  :::tip
  **doc2bow** stands for "Document to Bag of Words." It is the function that translates your human-readable word lists into the numerical tuples the computer needs for its math.
  :::

  :::challenge
  To build a model, you must first build the "map" (Dictionary) and the "numbers" (Corpus). Complete the code below to convert a small set of documents into a format Gensim can use.
  :::`,
    challenges: [
      {
        id: 'topic-modeling-03-c1',
        title: 'Creating the Corpus',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from gensim import corpora

  # A tiny corpus of 3 preprocessed documents
  documents = [
      ["king", "throne", "crown"],
      ["sword", "shield", "king"],
      ["throne", "sword", "crown"]
  ]

  # 1. Create a dictionary from the documents
  # This assigns an ID to every unique word
  dictionary = 

  # 2. Convert the first document (documents[0]) into BoW format
  # Use the doc2bow() method on your dictionary
  bow_doc = 

  # Verify the numerical translation
  print(bow_doc)

  # Verify the ID-to-Word mapping
  # Print the word associated with ID 0
  print(dictionary[0])
  `,
        expectedOutput: "[(0, 1), (1, 1), (2, 1)]\ncrown",
        hints: [
          'Use corpora.Dictionary(documents) to create the map.',
          'The method is dictionary.doc2bow(documents[0]).',
          'In Gensim, dictionary[0] will look up the string associated with the first ID created.',
          'The expected output assumes "crown" was the first word processed by the dictionary.'
        ],
        solution: `from gensim import corpora

  documents = [
      ["king", "throne", "crown"],
      ["sword", "shield", "king"],
      ["throne", "sword", "crown"]
  ]

  # Create the Dictionary
  dictionary = corpora.Dictionary(documents)

  # Convert the first document to Bag of Words
  bow_doc = dictionary.doc2bow(documents[0])

  print(bow_doc)
  print(dictionary[0])`,
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
      'Read and interpret word-topic distributions (Weights)',
      'Analyze document-topic proportions to track themes across a corpus',
      'Identify and troubleshoot "Junk Topics" resulting from poor preprocessing',
      'Apply the "Human-in-the-loop" philosophy to labeling machine output',
    ],
    keywords: ['interpretation', 'weights', 'visualization', 'coherence', 'junk topics'],
    content: `# Interpreting and Navigating Topics

  ## The Scholar as Interpreter
  A topic model output is like a **map of a new territory**. The computer provides the coordinates and the landmarks, but it doesn't tell you what they "mean." 

  You, the human historian or literary scholar, have to look at a cluster of words like *"ship, whale, harpoon, sea"* and decide to label that landmark "Whaling Industry." Topic modeling is not an answer; it is a way of organizing an archive so you can ask better questions.

  ---

  ## 1. Word Weights (Probabilities)
  Each word in a topic is assigned a "weight." This number tells you how important that word is to that specific topic. 

  - **Topic 1**: \`0.045*"whale" + 0.030*"sea" + 0.025*"ship"\`
  - **Translation**: If you see "whale" in a document, there is a 4.5% chance the computer thinks that specific word belongs to Topic 1. 

  The words with the highest weights are your **Top Terms**. These are the words you use to decide what a topic is "about."

  ---

  ## 2. Document-Topic Proportions
  This is the "Gold Mine" for Digital Humanities. Once a model is trained, we can see exactly how much of each topic exists in every document. 

  Imagine analyzing *Moby Dick* vs. *Paradise Lost*:
  - **Moby Dick**: 85% "Whaling", 10% "Religion", 5% "Biology".
  - **Paradise Lost**: 2% "Whaling", 95% "Religion", 3% "Biology".

  By looking at these percentages, you can find "hidden" religious documents in a maritime archive, or track how the "Religion" topic fluctuates from the beginning of a novel to the end.

  ---

  ## 3. Identifying "Junk Topics"
  Sometimes a model will produce a topic that looks like this: *"said, went, came, back, told."* 
  This is a **Junk Topic**. 

  Junk topics occur when common verbs or "noise" words haven't been filtered out properly. They don't represent a meaningful discourse; they represent the structural skeleton of the language. If you see too many junk topics, you need to go back to the **Preprocessing** stage and add those words to your **Stopword List**.

  ---

  ## 4. Distant Reading vs. Close Reading
  Topic modeling is a "Distant Reading" tool, but it works best when paired with "Close Reading." If a specific diary entry has a 90% score in a "Grief" topic, you should use that as a signpost to go back and read that specific page. Use the machine to find the needle, then use your human brain to analyze the needle.

  :::tip
  **Human-in-the-loop**: This is the DH philosophy that the machine's output is only the *start* of the research. Your labels and interpretations are what turn "data" into "scholarship."
  :::

  :::challenge
  Gensim outputs topics as a single string of math. In the challenge at right, you will use Python's string tools to "snip out" the most important word (the first one) from a topic string.
  :::`,
    challenges: [
      {
        id: 'topic-modeling-04-c1',
        title: 'Identifying the Top Term',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A simulated output from lda.show_topics()
  # It is a list containing a tuple: (Topic_ID, Word_Weights_String)
  model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship"')]

  # The weights string is at index 1 of the first tuple
  topic_string = model_output[0][1]

  # Goal: Extract the word "whale" from the string.
  # 1. Use .split() to break the string at the double-quote characters (")
  # 2. Select the correct index from the resulting list
  # 3. Assign it to 'top_word' and print it

  # Your code here
  `,
        expectedOutput: 'whale',
        hints: [
          'If you split "Hello "World"!" by the quote, you get ["Hello ", "World", "!"]',
          'Use: parts = topic_string.split(\'"\')',
          'The word "whale" will be the second item in that list (index 1).'
        ],
        solution: `model_output = [(0, '0.045*"whale" + 0.030*"sea" + 0.025*"ship"')]
  topic_string = model_output[0][1]

  # Split the string by the double-quote marks
  parts = topic_string.split('"')

  # The word sits between the first and second quote marks
  top_word = parts[1]

  print(top_word)`,
      },
    ],
  },
  {
    id: 'data-viz-05',
    title: 'Creating Timelines from Historical Data',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Represent historical events as structured dictionary objects',
      'Use lambda functions to sort complex datasets chronologically',
      'Compute time spans (intervals) between events to analyze density',
      'Identify and extract the longest periods of silence or activity in an archive',
    ],
    keywords: ['timeline', 'chronology', 'temporal data', 'dates', 'history', 'lambda'],
    content: `# Creating Timelines from Historical Data

  ## The Clothesline of History
  A timeline is a **clothesline for history**. Imagine stringing a line across a room and pegging cards to it—each card has a date and an event. 

  The line gives you spatial intuition about temporal relationships: which events cluster together (density), where the long gaps are (silence), and what happened in parallel. In the Digital Humanities, we use code to build "clotheslines" for thousands of events, helping us visualize patterns across centuries of archival data.

  ---

  ## 1. Structuring Events as Data
  Before you can build a timeline, each event needs a minimum of two attributes: **When** it happened and **What** it was. We use a list of dictionaries to keep this metadata organized.

  \`\`\`python
  events = [
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1813, "event": "Pride and Prejudice published"}
  ]
  \`\`\`

  ---

  ## 2. Sorting with Lambda Functions
  Archives rarely arrive in chronological order. To sort a list of dictionaries, we have to tell Python which "key" to look at. We use a **lambda function**—a tiny, one-line function that acts as a pointer.

  \`\`\`python
  # "Sort the events. For every element (e), use e['year'] as the basis for sorting."
  chronological = sorted(events, key=lambda e: e["year"])

  for e in chronological:
      print(f"{e['year']}: {e['event']}")
  \`\`\`

  ---

  ## 3. Computing Time Spans (Density)
  The gaps between events are often as informative as the events themselves. A "burst" of publications might signal a literary movement; a long "silence" might suggest a period of war, economic depression, or censorship.

  To calculate these gaps, we loop through our sorted years and subtract the **previous** year from the **current** year:

  \`\`\`python
  # Calculate the gap between consecutive items
  for i in range(1, len(years)):
      gap = years[i] - years[i-1]
      print(f"Gap: {gap} years")
  \`\`\`

  ---

  ## 4. Questioning Periodization
  In DH, timelines allow us to test "periodization"—the way historians group years into blocks like "The Romantic Era" or "The Victorian Age." By calculating the density of events, we can see if our data actually fits those traditional labels or if the "rhythm" of history suggests a different story.

  :::tip
  **The Running Maximum**: To find the "longest gap," you initialize a variable at 0. As you loop through the gaps, you check: *"Is this current gap bigger than my record?"* If yes, you update your record. This is a fundamental pattern in data analysis.
  :::

  :::challenge
  In the first challenge, you will sort a list of literary milestones. In the second, you will identify the "Great Silence"—the longest gap between any two publications in the list.
  :::`,
    challenges: [
      {
        id: 'data-viz-05-c1',
        title: 'Build a Sorted Timeline',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# Sort these literary events chronologically
  events = [
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1891, "event": "Tess of the d'Urbervilles published"},
      {"year": 1813, "event": "Pride and Prejudice published"},
      {"year": 1859, "event": "A Tale of Two Cities published"},
      {"year": 1851, "event": "Moby-Dick published"},
  ]

  # 1. Sort the events by the "year" key
  # 2. Loop through the sorted list
  # 3. Print each event in the format: "year - event"

  # Your code here
  `,
        expectedOutput: "1813 - Pride and Prejudice published\n1818 - Frankenstein published\n1847 - Jane Eyre published\n1851 - Moby-Dick published\n1859 - A Tale of Two Cities published\n1891 - Tess of the d'Urbervilles published",
        hints: [
          'Use sorted_list = sorted(events, key=lambda e: e["year"])',
          'Use an f-string for the print: f"{e[\'year\']} - {e[\'event\']}"',
        ],
        solution: `events = [
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1891, "event": "Tess of the d'Urbervilles published"},
      {"year": 1813, "event": "Pride and Prejudice published"},
      {"year": 1859, "event": "A Tale of Two Cities published"},
      {"year": 1851, "event": "Moby-Dick published"},
  ]

  # Sort chronologically
  chronological = sorted(events, key=lambda e: e["year"])

  # Print formatted timeline
  for e in chronological:
      print(f"{e['year']} - {e['event']}")`,
      },
      {
        id: 'data-viz-05-c2',
        title: 'Compute the Longest Gap',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# Identify the longest temporal gap between publications
  events = [
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1891, "event": "Tess of the d'Urbervilles published"},
      {"year": 1813, "event": "Pride and Prejudice published"},
      {"year": 1859, "event": "A Tale of Two Cities published"},
      {"year": 1851, "event": "Moby-Dick published"},
  ]

  # 1. Sort the events by year
  # 2. Extract just the years into a new list
  # 3. Loop through the years and find the gap (Year[i] - Year[i-1])
  # 4. Keep track of which gap is the largest
  # 5. Print the gaps and the final longest gap

  # Your code here
  `,
        expectedOutput: "1813 -> 1818: 5 years\n1818 -> 1847: 29 years\n1847 -> 1851: 4 years\n1851 -> 1859: 8 years\n1859 -> 1891: 32 years\nLongest gap: 32 years (1859 to 1891)",
        hints: [
          'Start your loop at range(1, len(years)) to avoid comparing the first year to nothing.',
          'Use variables like max_gap, gap_start, and gap_end to store the record-breaking gap.',
          'If gap > max_gap: update your variables.',
        ],
        solution: `events = [
      {"year": 1847, "event": "Jane Eyre published"},
      {"year": 1818, "event": "Frankenstein published"},
      {"year": 1891, "event": "Tess of the d'Urbervilles published"},
      {"year": 1813, "event": "Pride and Prejudice published"},
      {"year": 1859, "event": "A Tale of Two Cities published"},
      {"year": 1851, "event": "Moby-Dick published"},
  ]

  # Step 1: Sort
  sorted_events = sorted(events, key=lambda e: e["year"])
  years = [e["year"] for e in sorted_events]

  # Step 2: Trackers
  max_gap = 0
  start_year = 0
  end_year = 0

  # Step 3: Loop through gaps
  for i in range(1, len(years)):
      gap = years[i] - years[i-1]
      print(f"{years[i-1]} -> {years[i]}: {gap} years")
      
      # Step 4: Update record if this gap is the largest
      if gap > max_gap:
          max_gap = gap
          start_year = years[i-1]
          end_year = years[i]

  # Step 5: Final report
  print(f"Longest gap: {max_gap} years ({start_year} to {end_year})")`,
      },
    ],
  },
  {
    id: 'data-viz-06',
    title: 'Mapping Historical Data',
    moduleId: 'data-visualization',
    prerequisites: ['data-viz-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Represent geographic locations as coordinate data (latitude/longitude) in Python',
      'Understand the Haversine formula for calculating distance on a sphere',
      'Execute nested loops to compare spatial relationships between multiple points',
      'Summarize geographic distributions using Counter objects'
    ],
    keywords: ['mapping', 'geographic', 'coordinates', 'spatial', 'geolocation', 'haversine'],
    content: `# Mapping Historical Data

  ## The Detective's Pin Board
  Think of a **pin board** in a detective's office. Each pin marks a location—a crime scene, a witness's home, or a suspect's workplace. Strings connect the pins to show relationships and movement. 

  In the Digital Humanities, we do this with thousands of historical events: the birthplaces of authors in a movement, the locations of every printing press in 18th-century Europe, or the stops along a trade route. **Geographic analysis** lets you find spatial patterns—like clusters of activity or vast "silences"—that are invisible in a simple table of names.

  ---

  ## 1. Coordinates as Data
  Every location on Earth is described by two numbers: **Latitude** (North-South) and **Longitude** (East-West). In DH, we store these as "Decimal Degrees."

  \`\`\`python
  locations = [
      {"place": "London", "lat": 51.5074, "lon": -0.1278},
      {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
  ]

  # Accessing longitude:
  print(locations[0]["lon"]) # Output: -0.1278
  \`\`\`

  :::definition
  **Geocoding**: The process of converting place names (like "Bath, England") into coordinates (51.38, -2.36). Most historical datasets require this cleaning step before you can map them.
  :::

  ---

  ## 2. Measuring Distance (The Haversine Formula)
  Because the Earth is a sphere, we can't use a simple ruler to measure the distance between two points. We use the **Haversine formula**, which accounts for the curvature of the planet.

  In Python, we use the \`math\` library to convert our degrees into **radians** before doing the calculation.

  \`\`\`python
  import math

  def haversine(lat1, lon1, lat2, lon2):
      R = 6371  # Earth's radius in kilometers
      # ... (Math happens here) ...
      return distance_in_km
  \`\`\`

  ---

  ## 3. Comparing Every Pair (Nested Loops)
  To find the "Closest Pair" in a list of cities, we have to compare every city to every other city. We use a **Nested Loop**:
  - The **Outer Loop** picks the first city.
  - The **Inner Loop** iterates through all the *remaining* cities.

  \`\`\`python
  for i in range(len(locations)):
      for j in range(i + 1, len(locations)):
          # Compare locations[i] and locations[j]
  \`\`\`

  ---

  ## 4. Grouping by Region
  Just as we group temporal data by decade, we group spatial data by country or city to see where "power centers" of culture lie. 

  :::tip
  **Spatial Ethics**: Remember that coordinates suggest a precision that historical records often lack. If a 17th-century letter is labeled "South of the River," placing a pin at a specific coordinate is a scholarly *interpretation*, not a neutral fact.
  :::

  :::challenge
  In the first challenge, use nested loops to calculate the distances between four literary cities and find which two are closest. In the second, summarize the geography of a publishing dataset.
  :::`,
    challenges: [
      {
        id: 'data-viz-06-c1',
        title: 'Compute Distances Between Literary Locations',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import math

  def haversine(lat1, lon1, lat2, lon2):
      R = 6371
      dlat = math.radians(lat2 - lat1)
      dlon = math.radians(lon2 - lon1)
      a = (math.sin(dlat / 2) ** 2 +
           math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
           math.sin(dlon / 2) ** 2)
      return round(R * 2 * math.asin(math.sqrt(a)))

  locations = [
      {"place": "London", "lat": 51.5074, "lon": -0.1278},
      {"place": "Bath", "lat": 51.3758, "lon": -2.3599},
      {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
      {"place": "Geneva", "lat": 46.2044, "lon": 6.1432},
  ]

  # Goal: Compare every location to every location AFTER it in the list.
  # 1. Print: "<Place A> to <Place B>: <dist> km"
  # 2. Track the minimum distance found
  # 3. Print: "Closest: <A> and <B> (<dist> km)"

  # Your code here
  `,
        expectedOutput: 'London to Bath: 150 km\nLondon to Edinburgh: 534 km\nLondon to Geneva: 747 km\nBath to Edinburgh: 562 km\nBath to Geneva: 814 km\nEdinburgh to Geneva: 1082 km\nClosest: London and Bath (150 km)',
        hints: [
          'Use nested loops: for i in range(len(locations)) and for j in range(i + 1, len(locations)).',
          'Set min_dist = float("inf") at the start so any first distance will be smaller than it.',
          'Access the data using locations[i]["lat"], etc.'
        ],
        solution: `import math

  def haversine(lat1, lon1, lat2, lon2):
      R = 6371
      dlat = math.radians(lat2 - lat1)
      dlon = math.radians(lon2 - lon1)
      a = (math.sin(dlat / 2) ** 2 +
           math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
           math.sin(dlon / 2) ** 2)
      return round(R * 2 * math.asin(math.sqrt(a)))

  locations = [
      {"place": "London", "lat": 51.5074, "lon": -0.1278},
      {"place": "Bath", "lat": 51.3758, "lon": -2.3599},
      {"place": "Edinburgh", "lat": 55.9533, "lon": -3.1883},
      {"place": "Geneva", "lat": 46.2044, "lon": 6.1432},
  ]

  min_dist = float("inf")
  closest_pair = ""

  for i in range(len(locations)):
      for j in range(i + 1, len(locations)):
          loc1 = locations[i]
          loc2 = locations[j]
          d = haversine(loc1["lat"], loc1["lon"], loc2["lat"], loc2["lon"])
          print(f"{loc1['place']} to {loc2['place']}: {d} km")
          
          if d < min_dist:
              min_dist = d
              closest_pair = f"{loc1['place']} and {loc2['place']}"

  print(f"Closest: {closest_pair} ({min_dist} km)")`,
      },
      {
        id: 'data-viz-06-c2',
        title: 'Count Locations by Region',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `from collections import Counter

  publishers = [
      {"city": "London", "country": "England"},
      {"city": "Edinburgh", "country": "Scotland"},
      {"city": "London", "country": "England"},
      {"city": "Paris", "country": "France"},
      {"city": "London", "country": "England"},
      {"city": "Dublin", "country": "Ireland"},
      {"city": "Paris", "country": "France"},
      {"city": "Edinburgh", "country": "Scotland"},
  ]

  # 1. Use a Counter to count publications per country
  # 2. Print alphabetical results: "<country>: <count>"
  # 3. Print the most common country

  # Your code here
  `,
        expectedOutput: 'England: 3\nFrance: 2\nIreland: 1\nScotland: 2\nMost publications: England',
        hints: [
          'To get the country names for the Counter, use (p["country"] for p in publishers).',
          'Use sorted(counts.items()) to handle the alphabetical requirement.',
          'The most common country is counts.most_common(1)[0][0].'
        ],
        solution: `from collections import Counter

  publishers = [
      {"city": "London", "country": "England"},
      {"city": "Edinburgh", "country": "Scotland"},
      {"city": "London", "country": "England"},
      {"city": "Paris", "country": "France"},
      {"city": "London", "country": "England"},
      {"city": "Dublin", "country": "Ireland"},
      {"city": "Paris", "country": "France"},
      {"city": "Edinburgh", "country": "Scotland"},
  ]

  # Count
  counts = Counter(p["country"] for p in publishers)

  # Sort and print
  for country, count in sorted(counts.items()):
      print(f"{country}: {count}")

  # Print winner
  print(f"Most publications: {counts.most_common(1)[0][0]}")`,
      },
    ],
  },
  {
    id: 'geospatial-01',
    title: 'Coordinates and Projections',
    moduleId: 'geospatial-analysis',
    prerequisites: ['structured-data-05'],
    estimatedTimeMinutes: 20,
    difficulty: 'beginner',
    learningObjectives: [
      'Explain the difference between geographic (Lat/Lon) and projected coordinate systems',
      'Create geometric objects (Points) using the Shapely library',
      'Understand why the order of coordinates (x, y) matters in GIS software',
      'Identify common EPSG codes used in Digital Humanities'
    ],
    keywords: ['gis', 'coordinates', 'shapely', 'crs', 'projection'],
    content: `# Coordinates and Projections: Flattening the World

  ## The Orange Peel Problem
  Imagine trying to peel an orange and flatten the peel perfectly onto a rectangular table. It is impossible to do so without tearing or stretching the skin. 

  This is the fundamental problem of map-making: the Earth is a three-dimensional sphere, but our screens and printed pages are two-dimensional flats. To solve this, we use **Projections**.

  ---

  ## 1. Geographic vs. Projected Systems

  ### Geographic Coordinates (Lat/Lon)
  These treat the earth like a sphere. Points are measured in **degrees** based on their angle from the center of the earth.
  *   **Unit**: Degrees
  *   **Standard**: EPSG:4326 (The "GPS" standard)

  ### Projected Coordinates
  The "orange peel" has been flattened mathematically. Points are measured in linear units like **meters**. This is necessary if you want to calculate the area of a historical site or the length of a trade route accurately.
  *   **Unit**: Meters
  *   **Standard**: EPSG:3857 (The "Web Map" standard used by Google Maps)

  ---

  ## 2. Geometry as Data (Shapely)
  In Digital Humanities, we don't just treat locations as two separate columns in a spreadsheet. We treat them as **Geometric Objects**. The library **Shapely** is a common tool (nb, not the only tool!) for creating these objects in Python.

  \`\`\`python
  from shapely.geometry import Point

  # IMPORTANT: GIS software almost always expects (x, y)
  # x = Longitude (East/West)
  # y = Latitude (North/South)
  # This represents Paris:
  paris = Point(2.35, 48.85)

  print(paris) # Output: POINT (2.35 48.85)
  \`\`\`

  :::warning
  **The Lon/Lat Trap**: Most people say "Latitude and Longitude." But mathematically, Longitude is the horizontal axis (**X**) and Latitude is the vertical axis (**Y**). If you put Latitude first in a \`Point()\`, your map of Paris will end up in Somalia!
  :::

  ---

  ## 3. WKT: Well-Known Text
  When you print a Shapely object, you see a format like \`POINT (31.13 29.97)\`. This is called **WKT**. It is a standardized way to describe shapes as text, making it easy to move data between Python, QGIS, and web maps.

  :::tip
  **DH Use Case**: 
  - **Archaeology**: Recording the exact meter-grid location of an artifact within a trench requires a projected system.
  - **History**: Mapping the spread of a manuscript across Europe requires understanding that medieval "projections" were based on travel time, not modern GPS coordinates.
  :::

  :::challenge
  In the first challenge, create a Point representing the Great Pyramid. In the second, use Shapely's built-in math to calculate the "straight-line" distance between two points on a flat plane.
  :::`,
    challenges: [
      {
        id: 'geospatial-01-c1',
        title: 'Point Creation',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `from shapely.geometry import Point

  # 1. Create a Point object for the Pyramids of Giza.
  # Longitude (x): 31.13
  # Latitude (y): 29.97

  giza = 

  # Your code here

  # This prints the Well-Known Text representation
  print(giza.wkt)
  `,
        expectedOutput: 'POINT (31.13 29.97)',
        hints: [
          'Use the syntax: giza = Point(31.13, 29.97)',
          'Remember: (Longitude, Latitude) is the (X, Y) order GIS expects.'
        ],
        solution: `from shapely.geometry import Point

  # Create the point using X (Lon) and Y (Lat)
  giza = Point(31.13, 29.97)

  print(giza.wkt)`,
      },
      {
        id: 'geospatial-01-c2',
        title: 'Distance in Degrees',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from shapely.geometry import Point

  # Point 1 is at the origin
  p1 = Point(0, 0)

  # Point 2 is 3 units East and 4 units North
  p2 = Point(3, 4)

  # 1. Calculate the distance between p1 and p2 using the .distance() method
  # 2. Store it in a variable called 'dist' and print it

  # Your code here
  `,
        expectedOutput: '5.0',
        hints: [
          'Use the syntax: dist = p1.distance(p2)',
          'This is a "Euclidean" distance (Pythagorean theorem), not "Haversine" distance.'
        ],
        solution: `from shapely.geometry import Point

  p1 = Point(0, 0)
  p2 = Point(3, 4)

  # Calculate the straight-line distance
  dist = p1.distance(p2)

  print(dist)`,
      },
    ],
  },
  {
    id: 'geospatial-02',
    title: 'Intro to GeoPandas',
    moduleId: 'geospatial-analysis',
    prerequisites: ['geospatial-01', 'structured-data-02'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand the structure of a GeoDataFrame',
      'Identify the special "geometry" column that enables mapping',
      'Filter spatial data based on attributes (e.g., selecting a specific country)',
      'Convert a standard list of coordinates into a spatial dataset'
    ],
    keywords: ['geopandas', 'geodataframe', 'spatial data', 'metadata', 'filtering'],
    content: `# Intro to GeoPandas: Spreadsheets with a Sense of Place

  ## Analogy
  You already know **Pandas**, which gives you a super-powered spreadsheet (a DataFrame). **GeoPandas** is that exact same tool, but it adds a "magic column" at the end: **the geometry column**.

  While normal columns hold text (Authors) or numbers (Year), the \`geometry\` column holds shapes—**Points** for cities, **Lines** for trade routes, or **Polygons** for empires.

  ---

  ## 1. The GeoDataFrame
  A GeoDataFrame looks like a standard spreadsheet, but it is "geographically aware." It knows its own **CRS** (Coordinate Reference System) and can calculate spatial properties like area or distance automatically.

  \`\`\`python
  import geopandas as gpd

  # In a standard environment, we read files like this:
  # gdf = gpd.read_file("monasteries.geojson")

  # In our sandbox, we can check the metadata just like Pandas:
  print(gdf.columns) 
  print(gdf.head())
  \`\`\`

  ---

  ## 2. The Geometry Column
  This column is the heart of GeoPandas. It stores the **Shapely** objects (Points, Polygons) we learned about in the last lesson. Even if you have 100 columns of historical metadata, GeoPandas only needs this one \`geometry\` column to draw a map.

  \`\`\`python
  # You can isolate the shapes themselves
  all_shapes = gdf.geometry
  \`\`\`

  ---

  ## 3. Filtering: The DH Power Move
  Because GeoPandas is built on top of Pandas, you can filter your map using the same logic you use for a spreadsheet. 

  If you have a map of the whole world, but you only want to study the **Ottoman Empire**, you simply filter the rows:

  \`\`\`python
  # Select only rows where the 'empire' column is 'Ottoman'
  ottoman_map = gdf[gdf['empire'] == 'Ottoman']
  \`\`\`

  ---

  ## 4. Converting CSV to Map
  Most DH researchers don't start with a "Shapefile"; they start with an Excel sheet containing "Latitude" and "Longitude" columns. To make this a map, you must "zip" those coordinates into the geometry column.

  \`\`\`python
  # Logic for converting a DataFrame (df) to a GeoDataFrame (gdf)
  gdf = gpd.GeoDataFrame(
      df, 
      geometry=gpd.points_from_xy(df.Longitude, df.Latitude),
      crs="EPSG:4326"
  )
  \`\`\`

  :::tip
  **DH Use Case**: Load a dataset of 19th-century cholera outbreaks. Filter the data to show only the first week of the outbreak. By calculating the "Centroid" (the geometric center) of those points, you can identify the epicenter of the epidemic.
  :::

  :::challenge
  In the first challenge, you will load a built-in dataset of the world. In the second, you will use your Pandas skills to "extract" a single country from that map.
  :::`,
    challenges: [
      {
        id: 'geospatial-02-c1',
        title: 'Loading a GeoDataFrame',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import geopandas as gpd
  import pandas as pd
  from shapely.geometry import Point

  # Since we are in a sandbox, we will build a tiny 'world' from a dictionary
  data = {
      'name': ['Egypt', 'France', 'China'],
      'pop': [100, 67, 1400],
      'lat': [26.8, 46.2, 35.8],
      'lon': [30.8, 2.2, 104.1]
  }
  df = pd.DataFrame(data)

  # Goal: Convert this DataFrame into a GeoDataFrame named 'world'
  # 1. Use gpd.GeoDataFrame()
  # 2. Use gpd.points_from_xy(df.lon, df.lat) for the geometry
  # 3. Set the crs to "EPSG:4326"

  world = 

  # Verify
  print(type(world).__name__)
  print(world.geometry.iloc[0])
  `,
        expectedOutput: 'GeoDataFrame\nPOINT (30.8 26.8)',
        hints: [
          'The syntax is: gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs="EPSG:4326")',
          'Make sure Lon (x) comes before Lat (y) in the points_from_xy function.'
        ],
        solution: `import geopandas as gpd
  import pandas as pd

  data = {
      'name': ['Egypt', 'France', 'China'],
      'pop': [100, 67, 1400],
      'lat': [26.8, 46.2, 35.8],
      'lon': [30.8, 2.2, 104.1]
  }
  df = pd.DataFrame(data)

  # Convert to GeoDataFrame
  world = gpd.GeoDataFrame(
      df, 
      geometry=gpd.points_from_xy(df.lon, df.lat), 
      crs="EPSG:4326"
  )

  print(type(world).__name__)
  print(world.geometry.iloc[0])`,
      },
      {
        id: 'geospatial-02-c2',
        title: 'Filtering by Attribute',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import geopandas as gpd
  import pandas as pd

  # Creating our world GeoDataFrame
  data = {'name': ['Egypt', 'France', 'China'], 'lat': [26.8, 46.2, 35.8], 'lon': [30.8, 2.2, 104.1]}
  df = pd.DataFrame(data)
  world = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs="EPSG:4326")

  # Goal: Filter the 'world' GeoDataFrame to select only the row where 'name' is "Egypt"
  # Store this in a new variable called 'egypt'

  # Your code here

  # Verify
  print(egypt['name'].values[0])
  `,
        expectedOutput: 'Egypt',
        hints: [
          'Use the square bracket notation: world[world["column"] == "Value"]',
          'This is the exact same syntax you used in the Pandas module!'
        ],
        solution: `import geopandas as gpd
  import pandas as pd

  data = {'name': ['Egypt', 'France', 'China'], 'lat': [26.8, 46.2, 35.8], 'lon': [30.8, 2.2, 104.1]}
  df = pd.DataFrame(data)
  world = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs="EPSG:4326")

  # Filter for Egypt
  egypt = world[world['name'] == 'Egypt']

  print(egypt['name'].values[0])`,
      },
    ],
  },
  {
    id: 'geospatial-03',
    title: 'Plotting Maps',
    moduleId: 'geospatial-analysis',
    prerequisites: ['geospatial-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Create static maps using the GeoDataFrame .plot() method',
      'Generate Choropleth maps to visualize variables across regions',
      'Layer multiple spatial datasets using Matplotlib Axes',
      'Perform CRS transformations to calculate accurate geometric area',
    ],
    keywords: ['matplotlib', 'plot', 'choropleth', 'mapping', 'visualization', 'to_crs'],
    content: `# Plotting Maps: Visualizing Spatial Arguments

  ## Analogy
  If \`print(gdf)\` gives you the raw numbers, \`gdf.plot()\` gives you the evidence. 

  Think of mapping as using **transparency sheets**. If you have one sheet for "Country Boundaries" and another for "Locations of 18th Century Printing Presses," you can stack them on top of each other. This allows you to see the relationship between political borders and technological spread.

  ---

  ## 1. Basic Plotting
  GeoPandas uses **Matplotlib** as its engine. The simplest way to see your data is the \`.plot()\` method.

  \`\`\`python
  # This draws the shapes in the geometry column
  gdf.plot()
  \`\`\`

  ---

  ## 2. Choropleth Maps: Color-Coding History
  A **Choropleth** map colors regions based on a value in your data (like population, literacy rates, or the number of manuscripts found in a region).

  \`\`\`python
  # Color countries by 'population' and add a legend (color bar)
  world.plot(column='pop_est', legend=True, cmap='OrRd')
  \`\`\`

  ---

  ## 3. Layering Data
  To show points (cities) on top of polygons (countries), you have to tell both plot commands to use the same "drawing board" or **axis (ax)**.

  \`\`\`python
  import matplotlib.pyplot as plt

  fig, ax = plt.subplots(figsize=(10, 6))

  # 1. Plot the base layer (the map) on ax
  countries.plot(ax=ax, color='lightgrey')

  # 2. Plot the second layer (the points) on the SAME ax
  cities.plot(ax=ax, color='red', markersize=10)

  plt.show()
  \`\`\`

  ---

  ## 4. The "Projection" Trap: Calculating Area
  In Digital Humanities, we often want to measure things: *"How big was this empire?"* or *"What is the density of monasteries in this valley?"*

  If your data is in **EPSG:4326** (Latitude/Longitude), calculations will be wrong because degrees are not a consistent unit of distance (a degree is wider at the equator than the poles). To calculate area, you must **project** your data into a system that uses **meters**.

  \`\`\`python
  # Convert to a Mercator projection (meters)
  gdf_meters = gdf.to_crs("EPSG:3395")

  # Now calculate area (in square meters)
  gdf_meters['area_sqm'] = gdf_meters.area
  \`\`\`

  :::tip
  **DH Use Case**: By layering a map of "Cholera Deaths" over a map of "Water Pumps," John Snow famously discovered the source of an 1854 outbreak. Layering is how we find **spatial correlation**.
  :::

  :::challenge
  In the first challenge, generate a plot object. In the second, perform a CRS transformation to calculate the area of a region in meters.
  :::`,
    challenges: [
      {
        id: 'geospatial-03-c1',
        title: 'The First Map',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import geopandas as gpd
  import pandas as pd

  # Creating a tiny dataset
  data = {'name': ['A', 'B'], 'pop': [10, 20], 'lat': [10, 20], 'lon': [10, 20]}
  df = pd.DataFrame(data)
  world = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs="EPSG:4326")

  # Goal: Generate a plot object
  # 1. Call .plot() on the 'world' GeoDataFrame
  # 2. Use the 'pop' column to color the points
  # 3. Assign the result to a variable named 'ax'

  # Your code here

  # Verify that an Axes object was created
  print(type(ax).__module__)
  `,
        expectedOutput: 'matplotlib.axes._axes',
        hints: [
          'Use ax = world.plot(column="pop")',
          'The variable ax will capture the Matplotlib Axes object created by GeoPandas.'
        ],
        solution: `import geopandas as gpd
  import pandas as pd

  data = {'name': ['A', 'B'], 'pop': [10, 20], 'lat': [10, 20], 'lon': [10, 20]}
  df = pd.DataFrame(data)
  world = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat), crs="EPSG:4326")

  # Create the plot
  ax = world.plot(column='pop')

  print(type(ax).__module__)`,
      },
      {
        id: 'geospatial-03-c2',
        title: 'Calculating Area in Meters',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import geopandas as gpd
  import pandas as pd
  from shapely.geometry import Polygon

  # A square polygon in degrees (EPSG:4326)
  # Covering approx 1 degree of lat/lon
  poly = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
  gdf = gpd.GeoDataFrame({'id': [1]}, geometry=[poly], crs="EPSG:4326")

  # Goal: Calculate the area in square meters
  # 1. Convert gdf to EPSG:3395 (World Mercator) using .to_crs()
  # 2. Assign this to a new variable 'gdf_projected'
  # 3. Calculate the area of the first row and store in 'area_val'

  # Your code here

  # Scientific notation output
  print(f"{area_val:.2e}")
  `,
        expectedOutput: '1.24e+10',
        hints: [
          'Use gdf_projected = gdf.to_crs("EPSG:3395")',
          'Access area with gdf_projected.area.iloc[0]',
          'Note: EPSG:4326 uses degrees, so .area is not useful until you project it!'
        ],
        solution: `import geopandas as gpd
  from shapely.geometry import Polygon

  poly = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
  gdf = gpd.GeoDataFrame({'id': [1]}, geometry=[poly], crs="EPSG:4326")

  # Convert to a system that uses meters
  gdf_projected = gdf.to_crs("EPSG:3395")

  # Calculate area
  area_val = gdf_projected.area.iloc[0]

  print(f"{area_val:.2e}")`,
      },
    ],
  },
  {
    id: 'geospatial-04',
    title: 'Interactive Maps with Folium',
    moduleId: 'geospatial-analysis',
    prerequisites: ['geospatial-03'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Create an interactive "slippy" web map using Folium',
      'Add markers, popups, and tooltips to represent archival data',
      'Understand the difference between static (Matplotlib) and interactive (Leaflet/Folium) maps',
      'Navigate the "Latitude/Longitude" vs "X/Y" coordinate order discrepancy'
    ],
    keywords: ['folium', 'interactive', 'leaflet', 'markers', 'web mapping', 'public history'],
    content: `# Interactive Maps with Folium: The Digital Exhibit

  ## Analogy
  A Matplotlib map is a **photograph**: it is static and captured at a specific scale. To see more detail, you would need to take a new "photo."

  A Folium map is a **window**: it is an interactive portal into your data. Users can drag, zoom, and click on "pins" to reveal deeper layers of information. This is often the final product you want to embed on a Digital Humanities project website or an online archive.

  ---

  ## 1. Creating a "Slippy" Map
  Folium is a Python wrapper for a JavaScript library called **Leaflet.js**. It creates "slippy maps"—maps made of tiny square tiles that load as you move around.

  \`\`\`python
  import folium

  # Center the map on London
  # Note the order: [Latitude, Longitude]
  m = folium.Map(location=[51.5074, -0.1278], zoom_start=12, tiles="OpenStreetMap")

  # In a local environment, you would save this as an HTML file:
  # m.save("index.html")
  \`\`\`

  ---

  ## 2. Adding Interaction: Markers and Popups
  In DH, we use **Markers** to represent specific points of interest—the location of a historical event, the birthplace of an author, or the site of a demolished building.

  - **Popup**: Text that appears when you **click** a marker.
  - **Tooltip**: Text that appears when you **hover** over a marker.

  \`\`\`python
  folium.Marker(
      location=[51.5074, -0.1278],
      popup="<b>London</b><br>Historical center of the British Empire.",
      tooltip="Click for more info"
  ).add_to(m)
  \`\`\`

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
  :::`,
    challenges: [
      {
        id: 'geospatial-04-c1',
        title: 'Center the Map',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import folium

  # 1. Create a folium Map centered on [40.71, -74.00] (New York City)
  # 2. Set the 'zoom_start' to 10
  # 3. Assign the result to a variable named 'nyc_map'

  # Your code here

  # These lines verify the map state
  print(nyc_map.location)
  print(nyc_map.options['zoom'])
  `,
        expectedOutput: '[40.71, -74.0]\n10',
        hints: [
          'The syntax is: nyc_map = folium.Map(location=[lat, lon], zoom_start=10)',
          'Coordinates must be passed as a list: [40.71, -74.00].'
        ],
        solution: `import folium

  # Create map object
  nyc_map = folium.Map(location=[40.71, -74.00], zoom_start=10)

  print(nyc_map.location)
  print(nyc_map.options['zoom'])`,
      },
      {
        id: 'geospatial-04-c2',
        title: 'Adding Multiple Markers',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import folium

  m = folium.Map(location=[45.0, 10.0], zoom_start=4)

  # A list of locations: [Latitude, Longitude, City Name]
  locations = [
      [48.85, 2.35, "Paris"],
      [41.90, 12.49, "Rome"]
  ]

  # Goal: Loop through the 'locations' list and add a Marker for each city.
  # 1. Access the latitude and longitude from the list
  # 2. Use the city name for the 'popup'
  # 3. Use .add_to(m) to attach it to the map

  # Your code here

  # Verification: The map starts with 1 layer (tiles). 
  # After adding 2 markers, it should have 3 children.
  print(len(m._children))
  `,
        expectedOutput: '3',
        hints: [
          'Use: for loc in locations:',
          'Inside the loop, access index [0] for lat, [1] for lon, and [2] for name.',
          'Syntax: folium.Marker(location=[lat, lon], popup=name).add_to(m)'
        ],
        solution: `import folium

  m = folium.Map(location=[45.0, 10.0], zoom_start=4)

  locations = [
      [48.85, 2.35, "Paris"],
      [41.90, 12.49, "Rome"]
  ]

  # Loop and add markers
  for loc in locations:
      folium.Marker(
          location=[loc[0], loc[1]], 
          popup=loc[2]
      ).add_to(m)

  # 1 Base Layer + 2 Markers = 3
  print(len(m._children))`,
      },
    ],
  },
  {
    id: 'image-analysis-01',
    title: 'Pixels as Data',
    moduleId: 'image-analysis',
    prerequisites: ['python-basics-05'],
    estimatedTimeMinutes: 25,
    difficulty: 'beginner',
    learningObjectives: [
      'Understand that digital images are structured grids of pixels',
      'Explain the RGB color model and the 0-255 intensity range',
      'Access and modify pixel data using NumPy array indexing',
      'Identify the "shape" of image data (Height, Width, Channels)'
    ],
    keywords: ['pixels', 'rgb', 'numpy', 'image data', 'distant viewing'],
    content: `# Pixels as Data

  ## The Digital Mosaic
  Think of a digital image like a giant, extremely detailed mosaic. Each tiny tile in the mosaic is a **pixel** (short for "picture element"). In Digital Humanities, we use **Computer Vision** to analyze thousands of these "mosaics" at once—detecting patterns in historical photography, analyzing color trends in cinema, or identifying features in digitized manuscripts.

  ---

  ## 1. The Pixel Grid
  Every image is a matrix (a grid) with a specific height and width.
  *   **Resolution**: An image that is 800 pixels wide and 600 pixels high contains 480,000 individual tiles.
  *   **Coordinate System**: In Python, we count from the top-left corner. The pixel at \`[0, 0]\` is the very first pixel in the top-left.

  ---

  ## 2. Color Representation (RGB)
  Most digital images use the **RGB** color model. Every single pixel is actually composed of three values representing the intensity of **Red, Green, and Blue** light.

  Values typically range from **0 (black/no intensity)** to **255 (full intensity)**. This is because 256 levels fit perfectly into one "byte" of computer memory (\`uint8\`).

  | Color | RGB Value |
  | :--- | :--- |
  | **Pure Red** | \`(255, 0, 0)\` |
  | **Pure White** | \`(255, 255, 255)\` |
  | **Pure Black** | \`(0, 0, 0)\` |
  | **Yellow** | \`(255, 255, 0)\` (Red + Green) |

  ---

  ## 3. NumPy: The Image Engine
  In Python, we use the **NumPy** library to handle images. An image is stored as a 3D array with the shape: **(Height, Width, Channels)**.

  \`\`\`python
  import numpy as np

  # Create a tiny 2x2 black image
  # dtype=np.uint8 ensures values stay between 0-255
  image = np.zeros((2, 2, 3), dtype=np.uint8)

  # Change the top-left pixel to Red
  image[0, 0] = [255, 0, 0]
  \`\`\`

  :::tip
  **Distant Viewing**: This is a DH method where we analyze "visual style" computationally. By looking at the average pixel values of every frame in a film, we can visualize the "color palette" of a director across their entire career.
  :::

  :::challenge
  In the first challenge, create a 1x1 red pixel. In the second, practice "drilling down" into a 3x3 grid to find specific colors.
  :::`,
    challenges: [
      {
        id: 'image-analysis-01-c1',
        title: 'Create a Red Pixel Array',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import numpy as np

  # Goal: Create a 1x1 pixel image that is pure Red.
  # 1. Use np.array()
  # 2. The structure must be a 3D list: [[[R, G, B]]]
  # 3. Set dtype=np.uint8

  red_pixel_image = 

  # Your code here

  print(red_pixel_image)
  `,
        expectedOutput: '[[[255   0   0]]]',
        hints: [
          'Pure red is [255, 0, 0].',
          'NumPy expects nested lists for dimensions: [[[ ... ]]].',
          'The shape should be (1, 1, 3).'
        ],
        solution: `import numpy as np

  # A 1x1 image with 3 color channels
  red_pixel_image = np.array([[[255, 0, 0]]], dtype=np.uint8)

  print(red_pixel_image)`,
      },
      {
        id: 'image-analysis-01-c2',
        title: 'Accessing Pixel Values',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import numpy as np

  # A 3x3 pixel "mini-archive"
  image_array = np.array([
      [[255, 0, 0], [0, 255, 0], [0, 0, 255]],      # Row 0: R, G, B
      [[0, 0, 0], [255, 255, 255], [128, 128, 128]], # Row 1: Black, White, Gray
      [[255, 255, 0], [0, 255, 255], [255, 0, 255]]  # Row 2: Yellow, Cyan, Magenta
  ], dtype=np.uint8)

  # Goal: Extract the RGB values for White and Yellow
  # 1. White is in Row 1, Column 1
  # 2. Yellow is in Row 2, Column 0

  white_pixel = 
  yellow_pixel = 

  # Your code here

  print(f"White: {white_pixel}")
  print(f"Yellow: {yellow_pixel}")
  `,
        expectedOutput: 'White: [255 255 255]\nYellow: [255 255   0]',
        hints: [
          'Access the array using image_array[row, col].',
          'Remember that indexing starts at 0.',
          'White is at index [1, 1].'
        ],
        solution: `import numpy as np

  image_array = np.array([
      [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
      [[0, 0, 0], [255, 255, 255], [128, 128, 128]],
      [[255, 255, 0], [0, 255, 255], [255, 0, 255]]
  ], dtype=np.uint8)

  # Select pixels by [row, column]
  white_pixel = image_array[1, 1]
  yellow_pixel = image_array[2, 0]

  print(f"White: {white_pixel}")
  print(f"Yellow: {yellow_pixel}")`,
      },
    ],
  },
  {
    id: 'image-analysis-02',
    title: 'Processing Images with Pillow/OpenCV',
    moduleId: 'image-analysis',
    prerequisites: ['image-analysis-01', 'python-basics-04'],
    estimatedTimeMinutes: 35,
    difficulty: 'intermediate',
    learningObjectives: [
      'Navigate the BGR vs RGB color channel discrepancy',
      'Resize and crop images programmatically to standardize a corpus',
      'Convert images to grayscale to prepare for OCR or layout analysis',
      'Understand the difference between (Width, Height) and (Rows, Columns) in code'
    ],
    keywords: ['pillow', 'opencv', 'PIL', 'cv2', 'load image', 'grayscale'],
    content: `# Processing Images with Pillow and OpenCV

  ## The Librarian's Choice: Pillow or OpenCV?
  If NumPy arrays are the raw ingredients (pixels), then **Pillow** and **OpenCV** are the kitchen tools that let us prepare them. 

  *   **Pillow (PIL)**: The "human-friendly" library. It is great for basic tasks like resizing, cropping, and saving images in different formats. It is very common in web development and basic DH scripts.
  *   **OpenCV (cv2)**: The "computer-vision" powerhouse. It is designed for high-performance analysis, like detecting faces in historical photos or identifying specific symbols in a manuscript.

  ---

  ## 1. The BGR "Trap"
  This is the most important thing to remember: **OpenCV reads colors in the order Blue-Green-Red (BGR)**, while almost every other library (including Pillow and Matplotlib) uses **Red-Green-Blue (RGB)**.

  If you load an image in OpenCV and display it in another tool without converting it, everyone will look like they are under blue moonlight!

  \`\`\`python
  import cv2

  # Load image
  img = cv2.imread("manuscript.jpg")

  # Convert from BGR to RGB so it looks correct in other tools
  img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  \`\`\`

  ---

  ## 2. Transforming the Frame
  In Digital Humanities, we often process thousands of images. We use code to **standardize** them so they all have the same dimensions.

  ### Resizing
  Note that OpenCV asks for **(Width, Height)**.
  \`\`\`python
  # Resize to 200 pixels wide and 100 pixels high
  resized = cv2.resize(img, (200, 100))
  \`\`\`

  ### Cropping
  Since OpenCV treats images as NumPy arrays, we crop using **Slicing**. Here, we use **[Rows, Columns]**, which is the same as **[Y, X]**.
  \`\`\`python
  # Crop from Row 50 to 150, and Column 20 to 100
  # crop = img[y1:y2, x1:x2]
  cropped = img[50:150, 20:100]
  \`\`\`

  ---

  ## 3. Grayscale: Simplifying the Signal
  Converting an image to grayscale removes color "noise." This is a standard step before performing **OCR (Optical Character Recognition)** because it allows the computer to focus on the contrast between the dark ink and the light page.

  \`\`\`python
  # OpenCV Grayscale
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

  # Pillow Grayscale
  from PIL import Image
  img_pil = Image.open("page.jpg").convert("L") # 'L' for Luminance
  \`\`\`

  :::tip
  **DH Use Case**: If you are studying a collection of 5,000 digitized 19th-century postcards, you can use these tools to automatically crop out the "stamp" area from every card to analyze the postal marks separately.
  :::

  :::challenge
  Because we are in a sandbox, we will create "synthetic images" using NumPy and then transform them. In Challenge 1, use OpenCV to resize a blue square. In Challenge 2, use Pillow to crop a red square.
  :::`,
    challenges: [
      {
        id: 'image-analysis-02-c1',
        title: 'Image Resizing and Grayscale',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import cv2
  import numpy as np

  # Create a dummy image: 100x100 pixels, all Blue
  # OpenCV expects BGR, so Blue is [255, 0, 0]
  dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
  dummy_image[:, :] = [255, 0, 0]

  # 1. Resize the image to be 50 pixels wide by 50 pixels high
  # Store in variable 'resized_img'
  resized_img = 

  # 2. Convert the ORIGINAL 'dummy_image' to grayscale
  # Store in variable 'gray_img'
  gray_img = 

  # Your code here

  print(f"Resized shape: {resized_img.shape}")
  print(f"Grayscale shape: {gray_img.shape}")
  `,
        expectedOutput: 'Resized shape: (50, 50, 3)\nGrayscale shape: (100, 100)',
        hints: [
          'Use cv2.resize(dummy_image, (50, 50))',
          'Use cv2.cvtColor(dummy_image, cv2.COLOR_BGR2GRAY) for grayscale.'
        ],
        solution: `import cv2
  import numpy as np

  dummy_image = np.zeros((100, 100, 3), dtype=np.uint8)
  dummy_image[:, :] = [255, 0, 0]

  # 1. Resize
  resized_img = cv2.resize(dummy_image, (50, 50))

  # 2. Grayscale
  gray_img = cv2.cvtColor(dummy_image, cv2.COLOR_BGR2GRAY)

  print(f"Resized shape: {resized_img.shape}")
  print(f"Grayscale shape: {gray_img.shape}")`,
      },
      {
        id: 'image-analysis-02-c2',
        title: 'Pillow Cropping',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from PIL import Image
  import numpy as np

  # Create a dummy 100x100 Red image
  img_array = np.zeros((100, 100, 3), dtype=np.uint8)
  img_array[:, :] = [255, 0, 0]
  img_pil = Image.fromarray(img_array)

  # Goal: Crop the image to the top-left 20x20 quadrant.
  # 1. Define a box: (left, upper, right, lower)
  # 2. Use the .crop() method on img_pil
  # 3. Store in 'cropped_img' and print its size

  # Your code here

  print(cropped_img.size)
  `,
        expectedOutput: '(20, 20)',
        hints: [
          'The crop box for the top-left 20x20 is (0, 0, 20, 20).',
          'Syntax: cropped_img = img_pil.crop( (0, 0, 20, 20) )'
        ],
        solution: `from PIL import Image
  import numpy as np

  img_array = np.zeros((100, 100, 3), dtype=np.uint8)
  img_array[:, :] = [255, 0, 0]
  img_pil = Image.fromarray(img_array)

  # Define box (left, upper, right, lower)
  box = (0, 0, 20, 20)

  # Crop
  cropped_img = img_pil.crop(box)

  print(cropped_img.size)`,
      },
    ],
  },
  {
    id: 'image-analysis-03',
    title: 'Color Histograms and Extraction',
    moduleId: 'image-analysis',
    prerequisites: ['image-analysis-02'],
    estimatedTimeMinutes: 45,
    difficulty: 'intermediate',
    learningObjectives: [
      'Calculate color histograms to analyze the distribution of light and color',
      'Interpret histograms as a fingerprint of an image\'s visual style',
      'Extract average and dominant colors to compare artistic palettes',
      'Use NumPy and OpenCV to quantify visual information'
    ],
    keywords: ['histogram', 'color analysis', 'dominant color', 'matplotlib', 'distant viewing'],
    content: `# Color Histograms and Extraction

  ## The Visual Fingerprint
  In the humanities, we often talk about an artist's "palette" or the "mood" of a film. A **color histogram** is a way to turn those qualitative descriptions into quantitative data. 

  Think of a histogram as a **bar chart of intensity**. Instead of counting words in a book, we are counting how many pixels in an image belong to a specific shade of red, green, or blue.

  ---

  ## 1. What is a Histogram?
  A histogram for an image shows the frequency of each color intensity. 
  - **X-axis**: Represents the color intensity from **0** (darkest) to **255** (brightest).
  - **Y-axis**: Represents the **count** of pixels that have that specific intensity.

  By looking at the "shape" of the histogram, you can instantly tell if an image is overexposed (peaks on the right), underexposed (peaks on the left), or high-contrast (peaks at both ends).

  ---

  ## 2. Calculating Histograms with OpenCV
  The function \`cv2.calcHist()\` is the standard tool for this. It requires several specific arguments passed as **lists**:

  \`\`\`python
  import cv2
  import matplotlib.pyplot as plt

  # 1. [image]: The image list
  # 2. [0]: The channel index (0 for Grayscale, or B=0, G=1, R=2 for Color)
  # 3. None: No mask (we want the whole image)
  # 4. [256]: The number of "bins" (0-255)
  # 5. [0, 256]: The range of values
  hist = cv2.calcHist([img], [0], None, [256], [0, 256])

  # Plotting with Matplotlib
  plt.plot(hist)
  plt.show()
  \`\`\`

  ---

  ## 3. Extracting Dominant Colors
  While a histogram shows the *range* of colors, sometimes we just want the "average" feel of an image. This is a common technique in **Distant Viewing**—an approach where researchers analyze the color palettes of every frame in a movie or every painting in a gallery to see how visual styles change over time.

  A simple way to find the "average color" is to calculate the **mean** of all pixel values across the Height and Width of the image.

  \`\`\`python
  # Calculate the average Red, Green, and Blue across the whole image
  avg_color = np.mean(img_array, axis=(0, 1))
  \`\`\`

  :::tip
  **DH Use Case**: Scholars use these tools to identify "visual trends" in historical archives. For example, did the invention of synthetic dyes in the 19th century lead to a measurable spike in "saturated" color frequencies in fashion photography?
  :::

  :::challenge
  In Challenge 1, calculate a histogram for a grayscale gradient. In Challenge 2, calculate the average color of a four-color "quilt" image.
  :::`,
    challenges: [
      {
        id: 'image-analysis-03-c1',
        title: 'Basic Grayscale Histogram',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import cv2
  import numpy as np

  # Create a 50x50 grayscale gradient image
  image = np.zeros((50, 50), dtype=np.uint8)
  for i in range(50):
      image[i, :] = np.linspace(0, 255, 50)

  # Goal: Calculate the histogram for this image
  # 1. Use cv2.calcHist()
  # 2. Use [image] as the source
  # 3. Channel index is [0]
  # 4. No mask (None)
  # 5. Use [256] bins and the range [0, 256]

  hist = 

  # Your code here

  # Verify the shape of the histogram array
  print(hist.shape)
  `,
        expectedOutput: '(256, 1)',
        hints: [
          'The syntax is: cv2.calcHist([image], [0], None, [256], [0, 256])',
          'Make sure all parameters except for the mask (None) are enclosed in square brackets.',
          'The output will be a NumPy array of 256 rows and 1 column.'
        ],
        solution: `import cv2
  import numpy as np

  image = np.zeros((50, 50), dtype=np.uint8)
  for i in range(50):
      image[i, :] = np.linspace(0, 255, 50)

  # Calculate the histogram
  hist = cv2.calcHist([image], [0], None, [256], [0, 256])

  print(hist.shape)`,
      },
      {
        id: 'image-analysis-03-c2',
        title: 'Extracting the Average Color',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import numpy as np

  # Creating a 100x100 image with 4 equal blocks of color
  # Each block is 50x50 pixels
  img = np.zeros((100, 100, 3), dtype=np.uint8)

  img[0:50, 0:50] = [255, 0, 0]      # Top-left: Red
  img[0:50, 50:100] = [0, 255, 0]    # Top-right: Green
  img[50:100, 0:50] = [255, 255, 0]  # Bottom-left: Yellow
  img[50:100, 50:100] = [0, 0, 0]    # Bottom-right: Black

  # Goal: Find the average R, G, B values for the whole image
  # 1. Convert img to float64 for accurate math
  # 2. Use np.mean(..., axis=(0, 1)) to average across Height/Width
  # 3. Convert back to uint8 using .astype(np.uint8)

  # Your code here

  print(avg_color_uint8)
  `,
        expectedOutput: '[127 127   0]',
        hints: [
          'To average the image, use: np.mean(img_float, axis=(0, 1))',
          'Math: Red is (255+0+255+0)/4 = 127.5. Green is (0+255+255+0)/4 = 127.5.',
          'Casting 127.5 to uint8 will truncate it to 127.',
          'The Blue channel will be 0 across the entire image.'
        ],
        solution: `import numpy as np

  img = np.zeros((100, 100, 3), dtype=np.uint8)
  img[0:50, 0:50] = [255, 0, 0]
  img[0:50, 50:100] = [0, 255, 0]
  img[50:100, 0:50] = [255, 255, 0]
  img[50:100, 50:100] = [0, 0, 0]

  # Convert and calculate mean
  img_float = img.astype(np.float64)
  avg_color = np.mean(img_float, axis=(0, 1))

  # Final result in standard color format
  avg_color_uint8 = avg_color.astype(np.uint8)

  print(avg_color_uint8)`,
      },
    ],
  },
  {
    id: 'image-analysis-04',
    title: 'Detecting Visual Similarity',
    moduleId: 'image-analysis',
    prerequisites: ['image-analysis-03'],
    estimatedTimeMinutes: 40,
    difficulty: 'advanced',
    learningObjectives: [
      'Understand how images are represented as numerical "feature vectors"',
      'Calculate the Euclidean distance between image representations',
      'Explain the importance of normalization in similarity metrics',
      'Distinguish between Euclidean distance and Cosine similarity'
    ],
    keywords: ['image similarity', 'feature extraction', 'distance metric', 'cosine similarity', 'normalization'],
    content: `# Detecting Visual Similarity: The Visual Fingerprint

  ## Analogy
  If you want to find two paintings in a gallery that look alike, you don't just stare at them. You look for similarities in their color palettes, their composition, or the texture of the brushstrokes. 

  In Digital Humanities, we do this by turning an image into a **Vector**. Think of a vector as a "visual fingerprint." Just as no two fingerprints are exactly the same, but some are very similar, we can measure the mathematical "distance" between image fingerprints to find matches in an archive.

  ---

  ## 1. Feature Extraction: Vectorizing the Archive
  Before we can compare two images, we must turn them into a list of numbers (a vector). 
  *   **Average Color**: A simple 3-number vector (R, G, B).
  *   **Color Histogram**: A 256-number vector representing the distribution of light.
  *   **Embeddings**: A high-dimensional vector created by Deep Learning that captures abstract concepts like "style" or "content."

  ---

  ## 2. Distance Metrics: The Math of "Close"
  Once our images are vectors, we can calculate how "far apart" they are in mathematical space.

  ### Euclidean Distance
  This is the standard "as the crow flies" distance between two points. It is calculated by finding the difference between every number in the vector, squaring them, and taking the square root. 
  - **Use Case**: Best for comparing overall intensity or exact color matches.

  ### Cosine Similarity
  This measures the **angle** between two vectors. It ignores how "long" the vectors are (e.g., how bright the images are) and focuses only on their direction (e.g., the balance of colors).
  - **Use Case**: Best for finding images with similar style even if one is much darker than the other.

  ---

  ## 3. The Level Playing Field: Normalization
  If you are comparing a tiny thumbnail to a huge high-res scan, the high-res scan will have millions more pixels, making its histogram counts much larger. To compare them fairly, we must **Normalize** the data—scaling the values so they always sum up to 1 (treating them as percentages rather than raw counts).

  \`\`\`python
  import cv2

  # Normalize a histogram so it represents the % of pixels per bin
  cv2.normalize(hist, hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
  \`\`\`

  ---

  ## 4. DH Application: Duplicate Detection
  Large digital archives often contain near-duplicates (e.g., a scanned letter and a slightly cropped version of the same letter). By calculating the distance between their histograms, we can automatically flag these "visual twins" for the archivist.

  :::tip
  **DH Insight**: "Visual Similarity" is a subjective scholarly concept. By choosing different metrics (Euclidean vs. Cosine), you are making a research decision about what kind of "similarity" matters most to your project.
  :::

  :::challenge
  In this challenge, you will calculate the **Euclidean Distance** between the average colors of two different images. If the distance is small, the images are visually similar in color.
  :::`,
    challenges: [
      {
        id: 'image-analysis-04-c1',
        title: 'Calculate Euclidean Distance',
        language: 'python',
        difficulty: 'advanced',
        starterCode: `import numpy as np

  # Average RGB colors of two historical photographs
  # Image 1 is a warm sepia tone
  img1_avg = np.array([120, 100, 50])

  # Image 2 is a slightly darker, cooler tone
  img2_avg = np.array([130, 90, 70])

  # Goal: Calculate the Euclidean Distance between these vectors
  # 1. Subtract img2 from img1
  # 2. Use np.linalg.norm() to find the distance
  # 3. Print the result formatted to 4 decimal places

  # Your code here

  print(f"{distance:.4f}")
  `,
        expectedOutput: '24.4949',
        hints: [
          'The formula is: distance = np.linalg.norm(vector1 - vector2)',
          'NumPy handles the subtraction and the square-root-of-squares automatically.',
          'The result should be the square root of ( (120-130)^2 + (100-90)^2 + (50-70)^2 ).'
        ],
        solution: `import numpy as np

  img1_avg = np.array([120, 100, 50])
  img2_avg = np.array([130, 90, 70])

  # Calculate Euclidean distance
  # (Calculates the square root of the sum of squared differences)
  distance = np.linalg.norm(img1_avg - img2_avg)

  print(f"{distance:.4f}")`,
      },
    ],
  },
  {
    id: 'network-analysis-01',
    title: 'Introduction to Network Concepts',
    moduleId: 'network-analysis',
    prerequisites: ['structured-data-05'],
    estimatedTimeMinutes: 20,
    difficulty: 'beginner',
    learningObjectives: [
      'Define nodes and edges in the context of humanities data',
      'Distinguish between directed and undirected graphs',
      'Understand "Edge Weights" as a measure of relationship strength',
      'Identify use cases for network analysis in history and literature'
    ],
    keywords: ['graph theory', 'nodes', 'edges', 'directed graph', 'network analysis', 'republic of letters'],
    content: `# Introduction to Network Concepts

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

  \`\`\`python
  # A list of co-occurrence (Undirected)
  # Romeo appears with Juliet, Juliet appears with Nurse
  interactions = [
      ("Romeo", "Juliet"),
      ("Juliet", "Nurse")
  ]

  # Accessing the participants of the first interaction
  print(f"{interactions[0][0]} connected to {interactions[0][1]}")
  \`\`\`

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
  :::`,
    challenges: [
      {
        id: 'network-analysis-01-c1',
        title: 'Define an Edge List',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# We want to model a Directed relationship: Letter Writing.
  # 1. Ada writes to Charles.
  # 2. Charles writes to Mary.
  # 3. Mary writes to Ada.

  # Goal: Create a list of tuples named 'letter_network' 
  # Format: (Sender, Recipient)

  letter_network = []

  # Your code here: add the three tuples to the list

  # Verification loop
  for edge in letter_network:
      print(edge)
  `,
        expectedOutput: "('Ada', 'Charles')\n('Charles', 'Mary')\n('Mary', 'Ada')",
        hints: [
          'A tuple uses parentheses: ("Name1", "Name2").',
          'Add three tuples to your list: letter_network = [(...), (...), (...)]',
          'In directed graphs, the order inside the tuple matters (Source -> Target).'
        ],
        solution: `letter_network = [
      ("Ada", "Charles"),
      ("Charles", "Mary"),
      ("Mary", "Ada")
  ]

  for edge in letter_network:
      print(edge)`,
      },
    ],
  },
  {
    id: 'network-analysis-02',
    title: 'Creating Networks with NetworkX',
    moduleId: 'network-analysis',
    prerequisites: ['network-analysis-01'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Import and initialize the NetworkX library',
      'Differentiate between Graph (undirected) and DiGraph (directed) objects',
      'Programmatically add nodes and edges to a network',
      'Bulk-load network data from Python lists'
    ],
    keywords: ['networkx', 'add_node', 'add_edge', 'graph construction', 'digraph'],
    content: `# Creating Networks with NetworkX

  ## Analogy: Napkin vs. Database
  In the previous lesson, we represented connections as simple lists of tuples. That’s like scribbling phone numbers on a napkin. To perform serious research, you need a tool that can search, sort, and calculate complex statistics across those connections. 

  In Python, that tool is **NetworkX**. It transforms your list of names into a "Graph Object"—a mathematical structure that knows how every piece of the web is connected to every other piece.

  ---

  ## 1. Initializing the Graph
  NetworkX offers different "containers" depending on the logic of your data.

  - **\`nx.Graph()\`**: For **Undirected** relationships (e.g., "A and B were in the same room").
  - **\`nx.DiGraph()\`**: For **Directed** relationships (e.g., "A sent a letter to B").

  \`\`\`python
  import networkx as nx

  # Create a container for a social network
  G = nx.Graph()
  \`\`\`

  ---

  ## 2. Constructing the Web
  You can build a network node-by-node, but in Digital Humanities, we usually load data in "bulk" from lists or spreadsheets.

  ### Adding Nodes (The Participants)
  \`\`\`python
  G.add_node("Mary Shelley")
  G.add_nodes_from(["Percy Shelley", "Lord Byron"])
  \`\`\`

  ### Adding Edges (The Connections)
  If you add an edge between two names that don't exist yet, NetworkX is smart enough to create the nodes for you automatically.
  \`\`\`python
  # This creates the nodes AND the connection
  G.add_edge("Mary Shelley", "Percy Shelley")

  # Adding multiple connections at once
  connections = [("Mary Shelley", "Lord Byron"), ("Percy Shelley", "Lord Byron")]
  G.add_edges_from(connections)
  \`\`\`

  ---

  ## 3. Inspecting the Graph
  Once the graph is built, you can "query" it to see the scale of your network.

  \`\`\`python
  print(f"Number of people: {G.number_of_nodes()}")
  print(f"Number of connections: {G.number_of_edges()}")

  # View all nodes as a list
  print(list(G.nodes))
  \`\`\`

  ---

  ## 4. Why Use This? (The DH Use Case)
  If you are analyzing a 19th-century novel, you wouldn't manually type every character's name. You would write a loop that reads your text and calls \`G.add_edge()\` whenever two characters appear in the same paragraph. NetworkX will then handle the complex math of determining who the "most important" character is based on their position in the web.

  :::tip
  **Bulk Loading**: The \`add_edges_from()\` method is your best friend. It allows you to take a list of thousands of tuples (like the ones we made in the last lesson) and turn them into a network in a single line of code.
  :::

  :::challenge
  In the first challenge, build a small city-state alliance network manually. In the second, practice bulk-loading an "edge list" into a graph object.
  :::`,
    challenges: [
      {
        id: 'network-analysis-02-c1',
        title: 'Building the Alliance',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import networkx as nx

  # 1. Create an empty Graph object named 'alliances'
  alliances = 

  # 2. Add three nodes: "Rome", "Athens", "Sparta" (use a list)

  # 3. Add an edge between "Rome" and "Athens"
  # 4. Add an edge between "Athens" and "Sparta"

  # Your code here

  # Verify the network size
  print(f"Nodes: {alliances.number_of_nodes()}")
  print(f"Edges: {alliances.number_of_edges()}")
  `,
        expectedOutput: 'Nodes: 3\nEdges: 2',
        hints: [
          'Use nx.Graph() to initialize.',
          'Use .add_nodes_from(["Rome", "Athens", "Sparta"]) to add multiple nodes at once.',
          'Adding an edge is done with .add_edge("City1", "City2").'
        ],
        solution: `import networkx as nx

  alliances = nx.Graph()

  # Add nodes
  alliances.add_nodes_from(["Rome", "Athens", "Sparta"])

  # Add edges
  alliances.add_edge("Rome", "Athens")
  alliances.add_edge("Athens", "Sparta")

  print(f"Nodes: {alliances.number_of_nodes()}")
  print(f"Edges: {alliances.number_of_edges()}")`,
      },
      {
        id: 'network-analysis-02-c2',
        title: 'Bulk-Loading an Edge List',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import networkx as nx

  # A raw list of archival data: (Sender, Receiver)
  correspondence = [
      ("Ada", "Charles"),
      ("Charles", "Mary"),
      ("Ada", "Mary"),
      ("Mary", "Charles")
  ]

  # Goal: Create a Directed Graph (DiGraph) and load all edges at once.
  # 1. Initialize nx.DiGraph() as 'G'
  # 2. Use the bulk method to add 'correspondence'
  # 3. Print the number of edges

  # Your code here

  print(f"Total Edges: {G.number_of_edges()}")
  `,
        expectedOutput: 'Total Edges: 4',
        hints: [
          'Since the order of sender/receiver matters, use nx.DiGraph().',
          'The bulk method is G.add_edges_from(correspondence).',
          'Check G.number_of_edges() for the final count.'
        ],
        solution: `import networkx as nx

  correspondence = [
      ("Ada", "Charles"),
      ("Charles", "Mary"),
      ("Ada", "Mary"),
      ("Mary", "Charles")
  ]

  # Initialize directed graph
  G = nx.DiGraph()

  # Bulk load
  G.add_edges_from(correspondence)

  print(f"Total Edges: {G.number_of_edges()}")`,
      },
    ],
  },
  {
    id: 'network-analysis-03',
    title: 'Centrality Measures',
    moduleId: 'network-analysis',
    prerequisites: ['network-analysis-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Explain the difference between Degree and Betweenness centrality',
      'Calculate centrality metrics using NetworkX functions',
      'Sort and filter centrality dictionaries to identify top influencers',
      'Interpret centrality scores within a historical or literary context'
    ],
    keywords: ['degree centrality', 'betweenness centrality', 'hubs', 'brokers', 'metrics'],
    content: `# Centrality: Mapping Power and Influence

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

  \`\`\`python
  # Returns a dictionary: {'Name': 0.85, ...}
  # Scores are "normalized" between 0.0 and 1.0
  degree_dict = nx.degree_centrality(G)
  \`\`\`

  ---

  ## 2. Betweenness Centrality (Gatekeeping)
  This measures how often a node acts as a bridge along the shortest path between other nodes.
  - **High Score**: Indicates a "Broker" or "Gatekeeper."
  - **DH Use Case**: Finding a mid-level diplomat in an archive who, despite not being famous, was the only person connecting two different royal courts.

  \`\`\`python
  # Measures who controls the "flow" of information
  betweenness_dict = nx.betweenness_centrality(G)
  \`\`\`

  ---

  ## 3. Interpreting the Math
  NetworkX normalizes these scores so they stay between **0 and 1**. 
  - A Degree Centrality of **1.0** means that node is connected to **every other node** in the network.
  - A score of **0.0** means the node is totally isolated.

  ---

  ## 4. Sorting the Results
  Because centrality functions return a dictionary, we usually need to sort them to find our "top" figures.

  \`\`\`python
  # Sort dictionary by value (item[1]) in descending order
  ranked = sorted(degree_dict.items(), key=lambda x: x[1], reverse=True)

  # Print the top person
  print(f"The Hub is {ranked[0][0]} with a score of {ranked[0][1]}")
  \`\`\`

  :::tip
  **Humanities Insight**: A character might have a very low word count in a novel but a very high **Betweenness Centrality**. This suggests they are a "messenger" or a "witness" who links disparate parts of the plot together.
  :::

  :::challenge
  In Challenge 1, identify the hub in a "Star Graph." In Challenge 2, calculate the "broker" score for a node that serves as the only bridge to a sub-group.
  :::`,
    challenges: [
      {
        id: 'network-analysis-03-c1',
        title: 'Who is the Hub?',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import networkx as nx

  # Creating a "Star Graph"
  # 'A' is the center, connected to B, C, D, and E
  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("A", "D"), ("A", "E")])

  # 1. Calculate the degree centrality for the graph
  # 2. Extract and print the score for node "A"

  # Your code here
  `,
        expectedOutput: '1.0',
        hints: [
          'Use scores = nx.degree_centrality(G).',
          'In a network of 5 nodes, if A has 4 connections, its normalized score is 4/(5-1) = 1.0.',
          'Access the dictionary value with scores["A"].'
        ],
        solution: `import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("A", "D"), ("A", "E")])

  # Calculate
  degree_scores = nx.degree_centrality(G)

  # Print score for center node
  print(degree_scores['A'])`,
      },
      {
        id: 'network-analysis-03-c2',
        title: 'Finding the Bridge',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import networkx as nx

  # A "Kite" graph
  # A, B, and C form a triangle (a clique)
  # D connects to B
  # E connects only to D
  G = nx.Graph()
  edges = [("A", "B"), ("B", "C"), ("A", "C"), ("B", "D"), ("D", "E")]
  G.add_edges_from(edges)

  # Goal: Find the Betweenness Centrality of node 'D'
  # D is the 'broker' because any info going to E must pass through D.

  # 1. Calculate betweenness_centrality
  # 2. Print the score for node 'D'

  # Your code here
  `,
        expectedOutput: '0.5',
        hints: [
          'Use nx.betweenness_centrality(G).',
          'Node D acts as a bridge for all paths leading to E.',
          'The output should be a float (0.5).'
        ],
        solution: `import networkx as nx

  G = nx.Graph()
  edges = [("A", "B"), ("B", "C"), ("A", "C"), ("B", "D"), ("D", "E")]
  G.add_edges_from(edges)

  # Calculate betweenness
  b_scores = nx.betweenness_centrality(G)

  # D connects the A-B-C cluster to E
  print(b_scores['D'])`,
      },
    ],
  },
  {
    id: 'network-analysis-04',
    title: 'Visualizing Networks',
    moduleId: 'network-analysis',
    prerequisites: ['network-analysis-03'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Create visual plots of graphs using the NetworkX and Matplotlib',
      'Understand the role of force-directed layout algorithms (Spring Layout)',
      'Map node attributes (like centrality) to visual properties (like size)',
      'Identify strategies to avoid the "Hairball" problem in large visualizations'
    ],
    keywords: ['visualization', 'nx.draw', 'spring_layout', 'matplotlib', 'aesthetics'],
    content: `# Visualizing Networks: Mapping the Web

  ## Analogy: The Mapmaker's Choice
  A list of numbers (centrality scores) is useful, but a visual map is often more intuitive. Just as a mapmaker must decide whether to put North at the top or how to flatten the globe onto a 2D page, a network scientist must decide how to arrange nodes on the screen. 

  This arrangement is called the **Layout**. Because a graph has no inherent "shape" in the real world, the shape we give it is a choice we make to highlight specific patterns.

  ---

  ## 1. Basic Drawing
  NetworkX uses **Matplotlib** as its drawing engine. The simplest way to see your network is using \`nx.draw()\`.

  \`\`\`python
  import networkx as nx
  import matplotlib.pyplot as plt

  # Create a simple triangle
  G = nx.complete_graph(3)

  # Draw it with labels
  nx.draw(G, with_labels=True)
  plt.show()
  \`\`\`

  ---

  ## 2. Layout Algorithms
  Algorithms determine the X and Y coordinates of your nodes.

  - **Spring Layout**: The "gold standard" for DH. It treats edges like springs and nodes like magnets. Connected nodes pull together; disconnected nodes push apart. This naturally reveals **communities** and clusters.
  - **Circular Layout**: Arranges everyone in a perfect circle. This is great for showing the sheer density of connections without favoring any specific node's position.

  \`\`\`python
  # Calculate positions as a dictionary of coordinates
  pos = nx.spring_layout(G)

  # Pass those positions to the drawing function
  nx.draw(G, pos=pos, node_color='skyblue', edge_color='gray')
  \`\`\`

  ---

  ## 3. Mapping Data to Aesthetics
  The real power of visualization comes from **data-driven design**. You can make a node's size represent its **Centrality** or its color represent its **Category** (e.g., blue for poets, red for novelists).

  \`\`\`python
  # Example: Making nodes larger based on a list of sizes
  node_sizes = [100, 500, 1000] 
  nx.draw(G, node_size=node_sizes)
  \`\`\`

  ---

  ## 4. The "Hairball" Problem
  In Digital Humanities, we often deal with large archives. If you try to visualize 5,000 nodes at once, you will get a "Hairball"—a messy black blob where no patterns are visible. 

  **Strategies to fix the Hairball:**
  1.  **Filter**: Only show the top 10% most connected nodes.
  2.  **Color**: Use color to separate different groups.
  3.  **Alpha**: Make edges transparent so they don't overlap into a solid mass.

  :::tip
  **EDA (Exploratory Data Analysis)**: Use visualization as a starting point, not just a final result. A spring layout might group characters together that you didn't realize were connected, prompting you to go back and "close-read" those specific chapters.
  :::

  :::challenge
  In this challenge, you will generate the layout coordinates for a small graph. While we aren't "drawing" to the screen in the sandbox, you will verify that the algorithm successfully calculated the (x, y) positions for the nodes.
  :::`,
    challenges: [
      {
        id: 'network-analysis-04-c1',
        title: 'Calculate Layout Positions',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("1", "2"), ("2", "3"), ("3", "1"), ("3", "4")])

  # Goal: Use the spring_layout algorithm to generate positions for G.
  # 1. Call nx.spring_layout(G)
  # 2. Store the resulting dictionary in a variable named 'positions'

  # Your code here

  # Verification
  print(type(positions))
  print("1" in positions)
  `,
        expectedOutput: "<class 'dict'>\nTrue",
        hints: [
          'The function is positions = nx.spring_layout(G).',
          'This returns a dictionary where each node name is a key and the value is a list of [x, y] coordinates.',
          'You do not need matplotlib for this specific calculation step.'
        ],
        solution: `import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("1", "2"), ("2", "3"), ("3", "1"), ("3", "4")])

  # Calculate coordinates
  positions = nx.spring_layout(G)

  print(type(positions))
  print("1" in positions)`,
      },
      {
        id: 'network-analysis-04-c2',
        title: 'Prepare Node Sizes',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")])

  # We want node size to be based on Degree.
  # 1. Get the degrees of the nodes: G.degree()
  # 2. Create a list called 'sizes' that multiplies each degree by 100
  # Example: If degree is 2, size should be 200.

  # Your code here (use a loop or list comprehension)

  print(sizes)
  `,
        expectedOutput: '[200, 200, 300, 100]',
        hints: [
          'G.degree() returns a list of (node, degree) tuples.',
          'Use a list comprehension: [d * 100 for n, d in G.degree()]',
          'The order of nodes in G.degree() is A, B, C, D.'
        ],
        solution: `import networkx as nx

  G = nx.Graph()
  G.add_edges_from([("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")])

  # Calculate sizes based on degree
  # Degree of A=2, B=2, C=3, D=1
  sizes = [deg * 100 for node, deg in G.degree()]

  print(sizes)`,
      },
    ],
  },
  {
    id: 'network-analysis-05',
    title: 'Case Study: Character Networks',
    moduleId: 'network-analysis',
    prerequisites: ['network-analysis-03'],
    estimatedTimeMinutes: 45,
    difficulty: 'intermediate',
    learningObjectives: [
      'Process raw interaction lists into a NetworkX Graph object',
      'Use Degree Centrality to mathematically identify a protagonist',
      'Use Betweenness Centrality to identify "bridge" characters or gatekeepers',
      'Apply the max() function with a key argument to extract top results from dictionaries',
    ],
    keywords: ['case study', 'data cleaning', 'applied analysis', 'character networks', 'protagonist'],
    content: `# Case Study: Character Networks

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
  Centrality functions in NetworkX return a dictionary: \`{"Hamlet": 0.8, "Ophelia": 0.4}\`. To find the "most important" character, we need to find the **Key** with the **Maximum Value**.

  Python has a very efficient way to do this using the \`max()\` function:

  \`\`\`python
  centrality = {"Hero": 10, "Villain": 8, "Sidekick": 5}

  # Find the key (name) that has the highest value (score)
  winner = max(centrality, key=centrality.get)
  print(winner) # Output: Hero
  \`\`\`

  ---

  ## 3. Handling Redundant Data
  In raw humanities data, you often see the same interaction recorded twice (e.g., "Hamlet speaks to Horatio" and later "Horatio speaks to Hamlet"). 

  If you use an **Undirected Graph** (\`nx.Graph()\`), NetworkX automatically handles this. It treats an edge between A and B as the same thing as an edge between B and A. It won't create two separate lines, which keeps your centrality scores accurate.

  :::tip
  **Beyond Literature**: This same workflow applies to **Citation Networks** (which scholar is the hub of a field?) and **Metadata Analysis** (which subjects are most frequently grouped together in a library catalog?).
  :::

  :::challenge
  In Challenge 1, you will find the "Protagonist" (the Hub) of a small play. In Challenge 2, you will identify the "Broker"—the character who connects two otherwise isolated communities.
  :::`,
    challenges: [
      {
        id: 'network-analysis-05-c1',
        title: 'The Protagonist Finder',
        language: 'python',
        difficulty: 'advanced',
        starterCode: `import networkx as nx

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
  `,
        expectedOutput: 'Hero',
        hints: [
          'Initialize with G = nx.Graph().',
          'Load edges with G.add_edges_from(dialogue_data).',
          'Use max(centrality_dict, key=centrality_dict.get) to find the name of the top node.'
        ],
        solution: `import networkx as nx

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

  print(protagonist)`,
      },
      {
        id: 'network-analysis-05-c2',
        title: 'Identify the Broker',
        language: 'python',
        difficulty: 'advanced',
        starterCode: `import networkx as nx

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
  `,
        expectedOutput: 'Broker',
        hints: [
          'Betweenness identifies the node that acts as the only path between groups.',
          'Use nx.betweenness_centrality(G).',
          'The "Broker" node should have the highest score because it links the A and B clusters.'
        ],
        solution: `import networkx as nx

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

  print(top_broker)`,
      },
    ],
  },
  {
    id: 'network-analysis-06',
    title: 'From Spreadsheets to Networks',
    moduleId: 'network-analysis',
    prerequisites: ['network-analysis-05', 'structured-data-01'],
    estimatedTimeMinutes: 25,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand the Edge List format as the standard for network data exchange',
      'Use Pandas to load and clean tabular data for network construction',
      'Convert a DataFrame into a Graph using nx.from_pandas_edgelist',
      'Attach metadata to connections using edge attributes'
    ],
    keywords: ['csv', 'pandas', 'dataframe', 'import', 'reproducibility', 'edge list'],
    content: `# From Spreadsheets to Networks: The Data Pipeline

  ## Analogy: The Seating Chart
  Imagine trying to organize a wedding seating chart. You wouldn't write the name of every guest on a separate sticky note and then manually draw 500 lines between them. You would likely start with a spreadsheet: Column A is "Guest," Column B is "Knows."

  In previous lessons, we manually typed \`G.add_edge("Romeo", "Juliet")\`. This is fine for five connections, but impossible for 5,000. In Digital Humanities, your research data almost always lives in a spreadsheet (CSV) first. We need a bridge between the **"Row & Column"** world of spreadsheets and the **"Node & Edge"** world of networks.

  ---

  ## 1. The Edge List Format
  To build a network from a spreadsheet, your data must be formatted as an **Edge List**. This means every row represents exactly **one connection**.

  | Source (From) | Target (To) | Weight (Strength/Years) |
  | :--- | :--- | :--- |
  | Virginia Woolf | T.S. Eliot | 15 |
  | T.S. Eliot | Ezra Pound | 22 |

  ---

  ## 2. The Bridge: \`from_pandas_edgelist\`
  We use the **Pandas** library to read the CSV, and then use a NetworkX helper function to convert that table into a "living" graph.

  \`\`\`python
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
  \`\`\`

  ---

  ## 3. Why This Matters for DH
  1.  **Scale**: You can load an archive of 50,000 historical letters in milliseconds.
  2.  **Reproducibility**: If you find a new box of letters, you don't edit your code; you just add rows to your CSV and re-run the script.
  3.  **Rich Metadata**: By using the \`edge_attr\` parameter, you can attach dates, locations, or sentiment scores to every connection in your web.

  :::tip
  **DH Pro-Tip**: When creating your CSV, ensure your "Source" and "Target" columns use consistent names. If you have "V. Woolf" in one row and "Virginia Woolf" in another, the computer will create two different nodes for the same person!
  :::

  :::challenge
  In Challenge 1, you will build a correspondence network from a raw dataset. In Challenge 2, you will learn to attach "Distance" as an attribute to your edges.
  :::`,
    challenges: [
      {
        id: 'network-analysis-06-c1',
        title: 'The Import Pipeline',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import pandas as pd
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
  `,
        expectedOutput: "[('Virginia Woolf', 'Vita Sackville-West'), ('Vita Sackville-West', 'Virginia Woolf'), ('T.S. Eliot', 'Ezra Pound')]",
        hints: [
          'Use df = pd.DataFrame(raw_data) to start.',
          'The function is G = nx.from_pandas_edgelist(df, source="...", target="...")',
          'Ensure your strings match the dictionary keys exactly.'
        ],
        solution: `import pandas as pd
  import networkx as nx

  raw_data = {
      'Sender': ['Virginia Woolf', 'Vita Sackville-West', 'T.S. Eliot'],
      'Recipient': ['Vita Sackville-West', 'Virginia Woolf', 'Ezra Pound']
  }

  # 1. Create DataFrame
  df = pd.DataFrame(raw_data)

  # 2. Create Graph
  G = nx.from_pandas_edgelist(df, source='Sender', target='Recipient')

  print(list(G.edges))`,
      },
      {
        id: 'network-analysis-06-c2',
        title: 'Attaching Edge Attributes',
        language: 'python',
        difficulty: 'advanced',
        starterCode: `import pandas as pd
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
  `,
        expectedOutput: '878',
        hints: [
          'The edge_attr parameter allows you to pass a column name or a list of names.',
          'To access edge data, use G[node1][node2][attribute_name].',
          'Make sure you created the graph with the Distance column attached!'
        ],
        solution: `import pandas as pd
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
      print(G['Paris']['Berlin']['Distance'])`,
      },
    ],
  },
  {
    id: 'sentiment-01',
    title: 'Dictionary vs ML Approaches',
    moduleId: 'sentiment-analysis',
    prerequisites: ['text-analysis-fundamentals'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Distinguish between lexicon-based (dictionary) and machine learning sentiment analysis',
      'Understand the "Bag of Words" model and its limitations',
      'Explain the role of polarity and valence in sentiment scores',
      'Identify common pitfalls in historical text analysis (e.g., semantic shift)',
      'Implement a functional Python sentiment scorer'
    ],
    keywords: ['sentiment', 'lexicon', 'polarity', 'bag of words', 'dictionary approach', 'VADER', 'AFINN'],
    content: `# Dictionary vs ML Approaches

In Digital Humanities, we often want to track "vibes" or attitudes across thousands of pages of text—something a human cannot do alone. To do this, we use **Sentiment Analysis**.

## The Analogy: Two Ways to Grade a Paper

Imagine you are a teacher grading a student's essay for "enthusiasm."

*   **Approach A (The Dictionary):** You have a list of 100 "enthusiastic" words (great, amazing, best). You simply count how many of those words appear in the essay. You don't need to read the whole thing; you just look for the words.
*   **Approach B (Machine Learning):** You read 1,000 essays that were already graded for enthusiasm. You start to notice that enthusiasm isn't just about single words—it's about sentence structure and context (e.g., "I can't believe how good it was" vs. "I can't believe how bad it was").

## Key Concepts

### 1. Polarity and Valence
Most sentiment tools assign a **polarity** score.
*   **+1.0**: Extremely Positive
*   **0.0**: Neutral (or "Objective")
*   **-1.0**: Extremely Negative

Some dictionaries also measure **Valence** (the intensity of the word). "Happy" might be a +1, but "Ecstatic" might be a +3.

### 2. The "Bag of Words" Model
Both simple dictionary and early ML approaches often treat text as a **Bag of Words**. This means the computer ignores the order of words and just looks at their frequency. 
*   *Problem:* "The dog bit the man" and "The man bit the dog" look identical to a Bag of Words model, even though the sentiment for the man is very different!

### 3. The Dictionary (Lexicon) Approach
This is the "Gold Standard" for transparency in DH. You know exactly *why* a text got a score because you can see the word list.

**Popular Lexicons:**
*   **AFINN:** A list of English words rated from -5 to +5.
*   **VADER:** Specialized for social media; it understands emojis (😊), capitalization (GREAT!), and "boosters" (extremely good).

#### Simple Python Implementation
Notice how we lowercase the text so it matches our dictionary.

\`\`\`python
# A simple sentiment dictionary (Lexicon)
lexicon = {"love": 2, "like": 1, "bad": -1, "hate": -2}

text = "I LOVE this place, it is not bad"
# Preprocessing: Lowercase and split
words = text.lower().replace(",", "").split()

score = 0
for word in words:
    score += lexicon.get(word, 0) 

print(f"Total Sentiment Score: {score}") # Output: 1 (2 from love, -1 from bad)
\`\`\`

### 4. The Machine Learning (ML) Approach
ML doesn't use a fixed list. It uses a **Training Set** (a "Gold Standard" of thousands of hand-coded examples) to learn patterns.
*   **Pros:** It can handle "negation" (it learns that "not good" is negative) and sarcasm.
*   **Cons:** It is a "Black Box." It's hard to explain to a fellow historian exactly *why* the computer gave a 19th-century diary a negative score.

---

## Practice

:::try-it
**The Semantic Shift Challenge**
In the 1800s, the word "awful" often meant "full of awe" (positive/profound), whereas today it is purely negative. 
1. Think of a word that has changed meaning (e.g., "nice," "gay," or "terrific"). 
2. How would using a modern sentiment dictionary on a 1700s text lead to a "false" research finding?
:::

## Transfer: DH Use Cases

*   **Literary Studies:** Mapping the "Emotional Arc" of a novel by calculating the sentiment of every chapter.
*   **Historical Newspapers:** Analyzing how public sentiment toward "Automobiles" changed between 1900 and 1920.
*   **Sociology:** Comparing the sentiment of tweets from different geographic regions during an election.

:::challenge
Build a manual sentiment scorer that handles basic intensity.
:::`,
    challenges: [
      {
        id: 'sentiment-01-c1',
        title: 'The Mood Calculator',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# 1. The Sentiment Dictionary
# Words are weighted by intensity
mood_dict = {
    "joy": 3,
    "good": 1,
    "ok": 0,
    "bad": -1,
    "terrible": -3
}

# 2. The Sentence to Analyze
sentence = "The food was good but the service was terrible"

# 3. Calculate the total score
# Task: 
# - Ensure the sentence is lowercased
# - Split the sentence into words
# - Loop through and sum the scores
total_score = 0

# Your code here

print(total_score)
`,
        expectedOutput: '-2',
        hints: [
          'Use `sentence.lower()` to ensure "The" matches "the".',
          'Use `sentence.split()` to create a list of words.',
          'Remember: 1 (good) + -3 (terrible) should equal -2.',
          'Use `mood_dict.get(word, 0)` inside your for-loop.'
        ],
        solution: `mood_dict = {
    "joy": 3,
    "good": 1,
    "ok": 0,
    "bad": -1,
    "terrible": -3
}

sentence = "The food was good but the service was terrible"
words = sentence.lower().split()

total_score = 0

for word in words:
    total_score += mood_dict.get(word, 0)

print(total_score)
`,
      },
    ],
  },
  {
    id: 'sentiment-02',
    title: 'Using VADER for Social Data',
    moduleId: 'sentiment-analysis',
    prerequisites: ['sentiment-01'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Explain the four heuristics VADER uses to modify sentiment scores',
      'Interpret the "compound" score vs. the "pos/neu/neg" distribution',
      'Initialize and run the VADER analyzer using the NLTK library',
      'Apply sentiment analysis to a collection of short-form texts'
    ],
    keywords: ['vader', 'nltk', 'compound score', 'social media', 'heuristics'],
    content: `# Using VADER for Social Data

## Why VADER?

If a basic dictionary is a simple ruler, **VADER** (Valence Aware Dictionary and sEntiment Reasoner) is a precision caliper. 

Standard dictionaries fail on social media because humans don't write perfectly. VADER was specifically built to handle the "messy" language of the internet. It is **rule-based**, meaning it uses a dictionary but applies five smart "heuristics" (rules) to adjust the score.

### The 5 Rules of VADER
1.  **Punctuation**: "Enjoyed!" is positive, but "Enjoyed!!!" is *more* positive.
2.  **Capitalization**: "THE WORST" is more negative than "the worst."
3.  **Degree Modifiers**: "Extremely happy" vs. "Slightly happy."
4.  **Negation**: It knows that "not good" is negative.
5.  **Contrastive Conjunctions**: It understands that "but" shifts the meaning (e.g., "The food was great, but the service was terrible" will lean negative).

## Implementation in Python

We use the **NLTK** (Natural Language Toolkit) library to access VADER.

\`\`\`python
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Essential: Download the VADER lexicon data
nltk.download('vader_lexicon')

# Initialize the analyzer
sia = SentimentIntensityAnalyzer()

text = "The book was sort of good, but the ending was HORRIBLE!!!"
scores = sia.polarity_scores(text)

print(scores)
\`\`\`

## Interpreting the Output

VADER returns a dictionary of four scores:
*   **neg**: Negative (0.0 to 1.0)
*   **neu**: Neutral (0.0 to 1.0)
*   **pos**: Positive (0.0 to 1.0)
*   **compound**: The "Gold Standard" score. It is a single number representing the sum of all words, normalized between **-1 (extremely negative)** and **+1 (extremely positive)**.

**Standard Thresholds:**
*   **Positive**: Compound score >= 0.05
*   **Neutral**: Between -0.05 and 0.05
*   **Negative**: Compound score <= -0.05

---

## Practice

:::try-it
**Testing the Rules**
Compare the scores of these two sentences using the logic above:
1. "The lecture was good."
2. "The lecture was GOOD!!!" 
Notice how the compound score jumps significantly just by adding caps and exclamation points.
:::

## Transfer: DH in Practice

*   **Public History:** Analyzing thousands of YouTube comments on a historical documentary to see how the public reacts to controversial topics.
*   **Digital Ethnography:** Measuring the "toxicity" of different online gaming communities or forums over time.
*   **Crisis Response:** Using real-time Twitter data to track the "mood" of a city during a natural disaster or protest.

:::challenge
Analyze a list of "tweets" to find the most positive one.
:::`,
    challenges: [
      {
        id: 'sentiment-02-c1',
        title: 'Finding the Happiest Tweet',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# To avoid dependency issues in the browser, we will mock the VADER functionality.
# In a local environment, you would use: sia = SentimentIntensityAnalyzer()

class MockVader:
    def polarity_scores(self, text):
        # This mock simulates VADER's logic for punctuation and intensity
        score = 0.0
        text_lower = text.lower()
        if "love" in text_lower: score += 0.5
        if "hate" in text_lower: score -= 0.5
        if "coding" in text_lower: score += 0.2
        
        # Rule 1: Punctuation booster
        if "!!!" in text: score *= 1.5 
        # Rule 2: Capitalization booster
        if text.isupper(): score *= 1.2
        
        return {"compound": round(score, 2)}

sia = MockVader()

tweets = [
    "I hate traffic",
    "I love coding",
    "I LOVE CODING!!!",
    "It was okay"
]

# Task: Find the tweet with the highest compound score.
best_tweet = ""
highest_score = -1.0

# Your code here:
# 1. Loop through the tweets
# 2. Get the compound score for each
# 3. If it's higher than the current highest_score, update best_tweet and highest_score

for tweet in tweets:
    # Get the score dictionary
    # Extract the 'compound' value
    pass

print(best_tweet)
`,
        expectedOutput: 'I LOVE CODING!!!',
        hints: [
          'Inside your loop, use `score_dict = sia.polarity_scores(tweet)`',
          'Access the compound value with `score_dict["compound"]`',
          'To find the maximum, use an if-statement: `if current_score > highest_score:`',
        ],
        solution: `class MockVader:
    def polarity_scores(self, text):
        score = 0.0
        text_lower = text.lower()
        if "love" in text_lower: score += 0.5
        if "hate" in text_lower: score -= 0.5
        if "coding" in text_lower: score += 0.2
        if "!!!" in text: score *= 1.5 
        if text.isupper(): score *= 1.2
        return {"compound": round(score, 2)}

sia = MockVader()

tweets = [
    "I hate traffic",
    "I love coding",
    "I LOVE CODING!!!",
    "It was okay"
]

best_tweet = ""
highest_score = -1.0

for tweet in tweets:
    current_score = sia.polarity_scores(tweet)['compound']
    if current_score > highest_score:
        highest_score = current_score
        best_tweet = tweet

print(best_tweet)
`,
      },
    ],
  },
  {
    id: 'sentiment-03',
    title: 'Plotting Emotional Arcs',
    moduleId: 'sentiment-analysis',
    prerequisites: ['sentiment-02', 'data-visualization-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Segment long-form text into narrative chunks for longitudinal analysis',
      'Explain the relationship between "noise" and "signal" in sentiment data',
      'Apply rolling averages (moving windows) using the Pandas library',
      'Interpret narrative "shapes" such as the Tragedy or the Man in a Hole'
    ],
    keywords: ['narrative arc', 'rolling average', 'smoothing', 'syuzhet', 'pandas', 'time-series'],
    content: `# Plotting Emotional Arcs

In Digital Humanities, we often treat a book not as a single object, but as a **timeline**. By measuring sentiment from the first page to the last, we can visualize the "Emotional Arc" or "Shape" of a story.

## The Problem of Noise

If you plot the sentiment of every single sentence in a novel, the resulting graph looks like "static" or "noise." This is because a happy chapter might still contain a sentence like *"He died of laughter,"* which a computer sees as negative.

To see the **signal** (the overall trend) through the **noise** (individual word fluctuations), we use a **Rolling Average**.

## The Workflow

### 1. Segmentation (Chunking)
We break the text into equal parts. In DH, we often use "windows" of 100 or 500 words rather than chapters, because chapters vary in length.

\`\`\`python
# Simple split by sentence
sentences = full_text.split('.')
\`\`\`

### 2. The Sentiment Timeline
We calculate the score for every chunk and store it in a list. This creates a **Time Series**.

\`\`\`python
# A list of compound scores
timeline = [0.1, 0.2, -0.5, -0.6, 0.1, 0.8] 
\`\`\`

### 3. Smoothing with Pandas
We use the **Pandas** library to calculate a "Moving Average." This replaces each score with the average of itself and its neighbors. This "smooths" the jagged peaks into a readable curve.

\`\`\`python
import pandas as pd

# Convert list to a Pandas Series
series = pd.Series(timeline)

# Calculate average using a window of 10 sentences
smoothed_arc = series.rolling(window=10).mean()
\`\`\`

## Narrative Shapes

There is an idea that most stories follow specific shapes:
*   **"Rags to Riches"**: A steady rise in sentiment.
*   **"Tragedy/Oedipus"**: A steady fall.
*   **"Person in a Hole"**: Fall, then a rise.
*   **"Cinderella"**: Rise, fall, then a massive rise.

---

## Practice

:::try-it
**Conceptualizing Windows**
If you have a window size of 1 (no smoothing), your graph is a zigzag. If your window size is 10,000 (the whole book), your graph is a flat line. Success in DH often involves finding the "Goldilocks" window size that shows the arc without losing too much detail.
:::

## Transfer

*   **Literary Studies**: Comparing the emotional arcs of 19th-century British novels vs. American novels.
*   **Film Studies**: Analyzing screenplays to see if "Action" movies have more frequent sentiment fluctuations than "Dramas."
*   **History**: Mapping the "rhetorical heat" of a long-running parliamentary debate to find the moment of peak tension.

:::challenge
Smooth a jagged list of sentiment scores and identify the turning points.
:::`,
    challenges: [
      {
        id: 'sentiment-03-c1',
        title: 'Smoothing the Arc',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import pandas as pd

# Raw sentiment scores from a short story
# Notice the "noise": 0.8 followed immediately by -0.8
raw_scores = [0.5, 0.6, 0.8, -0.8, -0.2, -0.5, 0.1, 0.4, 0.9, 1.0]

# 1. Convert the list to a Pandas Series
series = pd.Series(raw_scores)

# 2. Calculate a rolling mean with a window of 3
# Your code here
smoothed = 

# 3. Print the last value of the smoothed arc
print(round(smoothed.iloc[-1], 2))
`,
        expectedOutput: '0.77',
        hints: [
          'Use `series.rolling(window=3).mean()`.',
          'The last value is the average of 0.1, 0.4, and 0.9.',
          'Note: The first two values will be `NaN` because a window of 3 needs at least 3 numbers.'
        ],
        solution: `import pandas as pd

raw_scores = [0.5, 0.6, 0.8, -0.8, -0.2, -0.5, 0.1, 0.4, 0.9, 1.0]

series = pd.Series(raw_scores)
smoothed = series.rolling(window=3).mean()

print(round(smoothed.iloc[-1], 2))
`,
      },
      {
        id: 'sentiment-03-c2',
        title: 'Identifying the Climax',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A smoothed emotional arc of a story
# 0-2: Introduction, 3-5: Conflict, 6-9: Resolution
scores = [0.1, 0.2, 0.1, -0.4, -0.8, -0.3, 0.2, 0.5, 0.8, 0.9]

# Task: Find the "Darkest Moment" (lowest score) and its position
# 1. Find the minimum value in the list
# 2. Find the index (position) of that value

min_val = 0
min_index = 0

# Your code here

print(f"Darkest moment at index {min_index} with score {min_val}")
`,
        expectedOutput: 'Darkest moment at index 4 with score -0.8',
        hints: [
          'Use `min(scores)` to find the lowest number.',
          'Use `scores.index(some_value)` to find where it is in the list.'
        ],
        solution: `scores = [0.1, 0.2, 0.1, -0.4, -0.8, -0.3, 0.2, 0.5, 0.8, 0.9]

min_val = min(scores)
min_index = scores.index(min_val)

print(f"Darkest moment at index {min_index} with score {min_val}")
`,
      },
    ],
  },
  {
    id: 'sentiment-04',
    title: 'Limitations and Bias',
    moduleId: 'sentiment-analysis',
    prerequisites: ['sentiment-02'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Identify linguistic failure points such as negation, sarcasm, and irony',
      'Explain how "historical semantic shift" can invalidate modern sentiment lexicons',
      'Recognize algorithmic bias in sentiment tools when applied to non-standard dialects',
      'Implement a "look-back" window to handle simple negation in Python'
    ],
    keywords: ['negation', 'bias', 'sarcasm', 'semantic shift', 'AAVE', 'critique'],
    content: `# Limitations and Bias

Sentiment analysis is a powerful tool, but in Digital Humanities, it is often a "leaky" abstraction. If we don't understand where it fails, we risk making false claims about the past or present.

## 1. The Time Traveler Problem (Semantic Shift)

Imagine a sentiment tool trained on 2024 movie reviews. If you use it to analyze a diary from 1750, it will fail.
*   **"Wicked"**: Today might mean "cool" (positive); in 1750, it meant "evil" (negative).
*   **"Nice"**: In the 14th century, it meant "foolish" or "ignorant."
*   **"Terrific"**: Originally meant "causing terror."

**DH Rule:** Always match your dictionary to your era. Using VADER (designed for social media) on a Victorian novel is a methodological risk.

## 2. The Sarcasm Gap

Computers struggle with irony.
*   *Text:* "Oh great, another 5-hour meeting. Just what I wanted."
*   *VADER:* Likely sees "great" and "wanted" and gives a **positive** score.
*   *Human:* Clearly understands the frustration.

## 3. Negation: The "Not" Problem

Simple "Bag of Words" models treat sentences as a soup of words. 
*   "The service was **good**." (+1)
*   "The service was **not good**." (+1 if the computer only looks for "good")

To fix this, we need **Heuristics** (rules) that look for "valence shifters" like *not, never, no, or hardly*.

## 4. Algorithmic Bias

Sentiment analyzers are trained on specific datasets (often Wikipedia or news). 
*   **Dialect Bias:** Research has shown that sentiment tools often flag **AAVE (African American Vernacular English)** as more "negative" or "toxic" than Standard American English, even when the sentiment is positive.
*   **Domain Bias:** In a medical context, the word "Positive" (as in a test result) is often very "Negative" for the patient.

---

## Practice

:::try-it
**Contextual Flip**
Think of the word "Unpredictable." 
1. Write a sentence where "unpredictable" is a **compliment** (e.g., a thriller movie).
2. Write a sentence where "unpredictable" is a **complaint** (e.g., a car's brakes).
How would a single dictionary score both fairly?
:::

## Transfer: DH Critique

*   **Social Justice:** Investigating if automated content moderation (which uses sentiment analysis) unfairly silences marginalized voices.
*   **History of Emotions:** Using sentiment analysis to track the changing meaning of "Melancholy" from a medical condition to a poetic state.

:::challenge
Improve a manual scorer by implementing a "Look-Back" negation rule.
:::`,
    challenges: [
      {
        id: 'sentiment-04-c1',
        title: 'The Negation Fix',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `positive_words = ["good", "happy", "excellent", "great"]

def get_sentiment(sentence):
    words = sentence.lower().split()
    score = 0
    
    for i in range(len(words)):
        word = words[i]
        
        if word in positive_words:
            # TASK: Check if the word BEFORE (i-1) is "not"
            # 1. Ensure i > 0 (so we don't look for words before the start)
            # 2. If words[i-1] is "not", subtract 1 from the score
            # 3. Otherwise, add 1 to the score
            
            # Your code here
            pass
                
    return score

# Test cases
print(f"Score 1: {get_sentiment('this is good')}")
print(f"Score 2: {get_sentiment('this is not good')}")
`,
        expectedOutput: 'Score 1: 1\nScore 2: -1',
        hints: [
          'Use an `if` statement to check `if i > 0 and words[i-1] == "not":`.',
          'If the condition is true, use `score -= 1`.',
          'Use an `else:` block to handle the cases where "not" isn\'t there.',
        ],
        solution: `positive_words = ["good", "happy", "excellent", "great"]

def get_sentiment(sentence):
    words = sentence.lower().split()
    score = 0
    
    for i in range(len(words)):
        word = words[i]
        
        if word in positive_words:
            if i > 0 and words[i-1] == "not":
                score -= 1
            else:
                score += 1
                
    return score

print(f"Score 1: {get_sentiment('this is good')}")
print(f"Score 2: {get_sentiment('this is not good')}")
`,
      },
    ],
  },
  {
    id: 'structured-data-06',
    title: 'Working with Metadata',
    moduleId: 'structured-data',
    prerequisites: ['structured-data-02'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Distinguish between descriptive, administrative, and structural metadata',
      'Explain the importance of interoperability and standards like Dublin Core',
      'Extract and transform metadata from complex nested dictionaries',
      'Perform faceted analysis (summarizing a collection by metadata fields)',
    ],
    keywords: ['metadata', 'cataloguing', 'dublin core', 'faceted search', 'collections', 'interoperability'],
    content: `# Working with Metadata

## The Analogy: The Library Spine

If you walk into a library, the book itself is the **data**—the words, characters, and plot. But the label on the spine, the barcode, and the entry in the digital catalog are the **metadata**: data *about* the data. 

In Digital Humanities, metadata is what allows us to organize a "pile of files" into a "searchable archive." Without it, we couldn't ask questions like "How did the sentiment of novels change between 1850 and 1900?" because the computer wouldn't know which file belongs to which year.

## Key Concepts

### 1. Types of Metadata
Humanities researchers typically deal with three types:
*   **Descriptive**: Information about the content (Title, Author, Abstract, Keywords).
*   **Administrative**: Technical details (File format, Rights/Copyright, Date of Digitization).
*   **Structural**: How the resource is put together (e.g., Page 1 comes before Page 2).

### 2. Standards and Interoperability
If every archive used their own names for fields (one uses "Author," another "Writer," another "Creator"), we couldn't combine them. We use **Standards** to ensure **Interoperability**.

:::definition
**Dublin Core (DC)**: A set of 15 "core" elements used globally by libraries and museums. Common fields include *Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, and Rights*.
:::

### 3. Metadata as Dictionaries
In Python, a single metadata record is almost always represented as a **Dictionary**. Often, these are "nested," meaning a value might be a list or another dictionary.

\`\`\`python
# A typical DH metadata record
record = {
    "dc:title": "The Last Man",
    "dc:creator": ["Mary Shelley"],
    "dc:date": "1826-01-23",
    "dc:subject": ["Apocalyptic fiction", "Pandemic", "Gothic"],
    "admin": {
        "scanner_model": "Epson v600",
        "rights": "Public Domain"
    }
}

# Accessing a nested field
print(f"Format: {record['admin']['rights']}") 
# Accessing an item in a list
print(f"Primary Subject: {record['dc:subject'][0]}")
\`\`\`

### 4. Faceted Analysis
Once we have a collection of records, we can "facet" them. This means grouping them by a specific field (like "Date" or "Subject") to see the bird's-eye view of a collection.

## The Reality: Metadata Cleaning
Real-world metadata is often "dirty." You will frequently need to:
1.  **Normalize Dates**: Changing "Jan 1826" and "1826-01-23" both to "1826".
2.  **Split Strings**: Changing "Shelley, Mary; Byron, Lord" into a clean list of names.
3.  **Handle Missing Data**: Deciding what to do if a record has no "Creator."

---

## Practice

:::try-it
**The Archivist's Choice**
Look at the record above. If you were building a website for this collection, which fields would you use for a "Search Bar" and which would you use for a "Filter" (facet)? Why?
:::

## Transfer: DH Use Cases

*   **Museum Studies**: Analyzing the "Provenance" (history of ownership) of artifacts using the source and description fields.
*   **Digital Archives**: Using tools like **Omeka** or **Tropy**, which are built entirely around the Dublin Core standard.
*   **Zotero**: When you save a paper to Zotero, you are actually just capturing its metadata for later citation.

:::challenge
Produce a summary report from a mock archive.
:::`,
    challenges: [
      {
        id: 'structured-data-06-c1',
        title: 'Summarize by Subject',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter

# A small digital collection from a Gothic Archive
collection = [
    {"title": "Frankenstein", "subjects": ["Gothic", "Science Fiction"]},
    {"title": "The Vampyre", "subjects": ["Gothic", "Horror"]},
    {"title": "The Last Man", "subjects": ["Science Fiction", "Post-Apocalyptic"]},
    {"title": "Northanger Abbey", "subjects": ["Gothic", "Satire"]},
    {"title": "The Monk", "subjects": ["Gothic", "Horror"]},
]

# Task:
# 1. Create a list called 'all_subjects' containing every subject from every book
# 2. Use Counter to find the frequencies
# 3. Print the results sorted alphabetically: "Subject: Count"

all_subjects = []

# Your code here

`,
        expectedOutput: 'Gothic: 4\nHorror: 2\nPost-Apocalyptic: 1\nSatire: 1\nScience Fiction: 2',
        hints: [
          'Use a nested loop: `for item in collection:` then `for sub in item["subjects"]:`',
          'Use `all_subjects.append(sub)` or `all_subjects.extend(item["subjects"])`',
          'Use `sorted(counts.items())` to get the alphabetical order.'
        ],
        solution: `from collections import Counter

collection = [
    {"title": "Frankenstein", "subjects": ["Gothic", "Science Fiction"]},
    {"title": "The Vampyre", "subjects": ["Gothic", "Horror"]},
    {"title": "The Last Man", "subjects": ["Science Fiction", "Post-Apocalyptic"]},
    {"title": "Northanger Abbey", "subjects": ["Gothic", "Satire"]},
    {"title": "The Monk", "subjects": ["Gothic", "Horror"]},
]

all_subjects = []
for item in collection:
    all_subjects.extend(item["subjects"])

counts = Counter(all_subjects)
for subject, count in sorted(counts.items()):
    print(f"{subject}: {count}")
`,
      },
      {
        id: 'structured-data-06-c2',
        title: 'Cleaning Dates for Decades',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `from collections import Counter

# Metadata often has inconsistent date formats
collection = [
    {"title": "Work A", "date": "1794-05-12"},
    {"title": "Work B", "date": "1818"},
    {"title": "Work C", "date": "1819-12-01"},
    {"title": "Work D", "date": "1796"},
    {"title": "Work E", "date": "1826-01-01"},
]

# Task: 
# 1. Extract the year (first 4 characters) from each date string
# 2. Convert that year into a decade (e.g., "1818" -> "1810s")
# 3. Print the count of items per decade, sorted chronologically

# Your code here
`,
        expectedOutput: '1790s: 2\n1810s: 2\n1820s: 1',
        hints: [
          'To get the decade, use string slicing: `date_str[:3] + "0s"`',
          'Example: "1794"[:3] is "179". Adding "0s" makes it "1790s".'
        ],
        solution: `from collections import Counter

collection = [
    {"title": "Work A", "date": "1794-05-12"},
    {"title": "Work B", "date": "1818"},
    {"title": "Work C", "date": "1819-12-01"},
    {"title": "Work D", "date": "1796"},
    {"title": "Work E", "date": "1826-01-01"},
]

decades = []
for item in collection:
    year_prefix = item["date"][:3]
    decades.append(year_prefix + "0s")

counts = Counter(decades)
for decade, count in sorted(counts.items()):
    print(f"{decade}: {count}")
`,
      },
    ],
  },
  {
    id: 'web-data-04',
    title: 'Working with Digital Archives',
    moduleId: 'web-data-collection',
    prerequisites: ['web-data-03'],
    estimatedTimeMinutes: 45,
    difficulty: 'intermediate',
    learningObjectives: [
      'Navigate and parse structured data from cultural heritage APIs (JSON)',
      'Extract metadata from deeply nested records using safe navigation patterns',
      'Handle "dirty data" (missing fields or empty lists) in archival records',
      'Flatten complex archive responses into a research-ready catalogue',
    ],
    keywords: ['archives', 'digital collections', 'cultural heritage', 'api', 'json', 'nested data'],
    content: `# Working with Digital Archives

## Analogy: The Digital Finding Aid

In a physical archive, you use a **finding aid**—a guide that tells you which box contains which letter. In a digital archive, the **API (Application Programming Interface)** serves a similar purpose. 

Instead of flipping through a paper folder, you send a digital request and receive a **JSON record**. This record is the digital equivalent of a catalogue card, containing everything the archive knows about an item: its author, the type of paper it's on, its dimensions, and a link to the scanned image.

## Key Concepts

### 1. The Complexity of Archival JSON
Archival data is rarely a simple list. Because history is complex (a letter can have multiple authors, various dates, and several subject tags), the data is **nested**. 

One record is usually a dictionary containing lists, which contain more dictionaries:

\`\`\`python
# A typical nested archive record
record = {
    "id": "item-992",
    "title": "Journal entry by Mary Shelley",
    "metadata": {
        "dates": [{"year": 1814, "type": "composition"}],
        "creators": [{"name": "Shelley, Mary", "role": "author"}]
    },
    "subjects": ["Travel", "France", "Gothic"]
}
\`\`\`

### 2. Defending Against "KeyErrors"
In a perfect world, every record has a date and a creator. In a digital archive, many records are incomplete. If you try to access \`record["date"]\` and it doesn't exist, your Python script will crash.

We use **Defensive Extraction**:
1.  **The \`.get()\` method**: Returns \`None\` (or a default) instead of crashing.
2.  **Conditional checks**: "If this list exists, give me the first item."

\`\`\`python
# Safe extraction
title = record.get("title", "Unknown Title")

# Nested safe extraction
# We use .get("metadata", {}) to ensure we have a dict to call .get() on again
year = record.get("metadata", {}).get("dates", [{}])[0].get("year", "n.d.")
\`\`\`

### 3. Building a "Flat" Catalogue
For analysis (like counting items per year), we want to turn those nested "clouds" of data into a clean, flat table. This process is called **Normalization**.

---

## Practice

:::try-it
**Exploring Hierarchy**
Look at the \`record\` example above. How would you access the string "France"? 
*Answer: \`record["subjects"][1]\`.*
Now imagine a collection of 10,000 records. If only 5,000 of them have a "subjects" list, how would your code need to change to avoid breaking?
:::

## Transfer: DH in the Real World

*   **DPLA (Digital Public Library of America)**: Aggregates millions of records from US libraries into a single API.
*   **The Smithsonian**: Provides an API to search millions of museum objects, from fossils to space suits.
*   **Trove (National Library of Australia)**: A massive API for historical newspapers and gazettes.

Understanding how to "dig" through JSON layers is a superpower for DH researchers. It allows you to build your own datasets instead of relying on what a website's "Search" button chooses to show you.

:::challenge
Build a clean catalogue from a messy API response.
:::`,
    challenges: [
      {
        id: 'web-data-04-c1',
        title: 'Archive Record Flattener',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# Mock API response: A list of nested archive records
raw_api_data = [
    {
        "title": "Letter to Lord Byron",
        "info": {"date": 1816, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Frankenstein MS",
        "info": {"date": 1818, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Geneva Map",
        "info": {"date": 1810}, # Missing format!
        "people": [] # Missing person!
    }
]

# Task:
# 1. Loop through raw_api_data
# 2. Extract: Title, Date, Format, and the first Person's Name
# 3. If format is missing, use "unknown"
# 4. If person is missing, use "Anonymous"
# 5. Print as: "<Date> | <Title> | <Name> (<Format>)"

for item in raw_api_data:
    # Your code here
    pass
`,
        expectedOutput: '1816 | Letter to Lord Byron | Mary Shelley (manuscript)\n1818 | Frankenstein MS | Mary Shelley (manuscript)\n1810 | Geneva Map | Anonymous (unknown)',
        hints: [
          'Use `item.get("info", {}).get("format", "unknown")` for the format.',
          'For the person, check if the list is empty: `if item["people"]:`',
          'Access the first person with `item["people"][0]["name"]` if the list is not empty.'
        ],
        solution: `raw_api_data = [
    {
        "title": "Letter to Lord Byron",
        "info": {"date": 1816, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Frankenstein MS",
        "info": {"date": 1818, "format": "manuscript"},
        "people": [{"name": "Mary Shelley"}]
    },
    {
        "title": "Geneva Map",
        "info": {"date": 1810},
        "people": []
    }
]

for item in raw_api_data:
    title = item.get("title", "Unknown")
    date = item.get("info", {}).get("date", "Unknown")
    fmt = item.get("info", {}).get("format", "unknown")
    
    if item.get("people"):
        name = item["people"][0]["name"]
    else:
        name = "Anonymous"
        
    print(f"{date} | {title} | {name} ({fmt})")
`,
      },
      {
        id: 'web-data-04-c2',
        title: 'Sorting the Archive',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `# A flattened list of archival items
items = [
    {"year": 1823, "title": "Valperga"},
    {"year": 1818, "title": "Frankenstein"},
    {"year": 1826, "title": "The Last Man"},
    {"year": 1817, "title": "History of a Six Weeks' Tour"}
]

# Task: Sort the list so the oldest items appear first.
# Print the title of each item in chronological order.

# Your code here
`,
        expectedOutput: "History of a Six Weeks' Tour\nFrankenstein\nValperga\nThe Last Man",
        hints: [
          'Use the `sorted()` function.',
          'Pass a key to the sort: `sorted(items, key=lambda x: x["year"])`.'
        ],
        solution: `items = [
    {"year": 1823, "title": "Valperga"},
    {"year": 1818, "title": "Frankenstein"},
    {"year": 1826, "title": "The Last Man"},
    {"year": 1817, "title": "History of a Six Weeks' Tour"}
]

sorted_items = sorted(items, key=lambda x: x["year"])

for item in sorted_items:
    print(item["title"])
`,
      },
    ],
  },
  // --- Compiled from lessons-in-development (2026-02-10) ---
  {
    id: 'rel-mod-01',
    title: 'The Geometry of Language',
    moduleId: 'relational-models',
    prerequisites: ['python-basics'],
    estimatedTimeMinutes: 30,
    difficulty: 'beginner',
    learningObjectives: [
      'Explain the distributional hypothesis ("words are known by the company they keep")',
      'Visualize words as coordinates in a multi-dimensional space',
      'Calculate basic similarity between two word concepts using Python',
    ],
    keywords: ['word-vectors', 'embeddings', 'similarity', 'abs'],
    content: `# The Geometry of Language

## The Library of Proximity

Imagine a library where books aren't organized by alphabet or author, but by **meaning**. 

In this library, the distance between two books tells you how much they have in common. To find a book about "Sailing," you don't look for the letter 'S'; you walk toward the "Ocean" section. 

If you walk 5 steps from "King" to "Man," and then walk 5 steps from "Queen" in the same direction, you should arrive at "Woman." This "Map of Meaning" is what computer scientists call a **Vector Space**.

## Key Concepts

### 1. The Distributional Hypothesis
Computers don't have childhood memories or sensory experiences. They learn what "Coffee" is by noticing it often appears near words like "mug," "drink," "caffeine," and "morning."

:::definition
**Distributional Hypothesis**: The idea that words appearing in similar contexts share similar meanings.
:::

### 2. Words as Coordinates
To place a word on a map, we give it coordinates. In a 2D map, a point is \`[x, y]\`. In language models, we might use hundreds of dimensions.

Imagine we score words based on two features: **[Nature, Technology]**.
*   **Tree**: \`[0.9, 0.1]\` (High nature, Low tech)
*   **Circuit**: \`[0.1, 0.9]\` (Low nature, High tech)
*   **Park**: \`[0.7, 0.2]\` (Mostly nature, some tech like benches/lights)

These lists of numbers are called **Word Vectors** or **Embeddings**.

### 3. Measuring the Gap
To find out how similar two words are, we calculate the **distance** between their coordinates. 

A simple way to do this in Python is using the \`abs()\` (absolute value) function. This tells us the positive distance between two numbers, regardless of which one is larger.

\`\`\`python
# If "Forest" is at 10 and "Bush" is at 8
distance = abs(10 - 8) # Result is 2
\`\`\`

## Practice: The Feature Map

In the sandbox, we are using a 1D coordinate system (just one number) representing **"Wetness."** 

:::try-it
Assign a value from 1 to 10 for these three words based on how "wet" they are. Then, calculate the distance between \`rain\` and \`umbrella\`.

\`\`\`python
rain = 10
umbrella = 2
desert = 0

# Calculate the distance
gap = abs(rain - umbrella)
print(f"The distance is: {gap}")
\`\`\`
:::

## Transfer: Changing Contexts

How might "Word Vectors" change based on the archive you use? 

If you trained a model on **18th-century medical journals**, the word "Treatment" would be geographically very close to "Leeches" and "Bloodletting." In a **21st-century** model, "Treatment" would move far away from "Leeches" and closer to "Antibiotics" or "Therapy."`,
    challenges: [
      {
        id: 'rel-mod-01-c1',
        title: 'Calculating Similarity',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Coordinates: [Nature Score, Urban Score]
forest = [10, 1]
tree = [9, 2]
skyscraper = [1, 10]

# 1. Calculate the distance between forest and tree 
# Hint: Use index [0] for the Nature Score
dist_tree = abs(forest[0] - tree[0])

# 2. Calculate the distance between forest and skyscraper
# Hint: Subtract the Nature score of skyscraper from forest
dist_city = 

# 3. Use an if statement to print the smaller distance
if dist_tree < dist_city:
    print(dist_tree)
else:
    print(dist_city)
`,
        expectedOutput: '1',
        hints: [
          'To get the first number in a list, use `list_name[0]`.',
          'Use `abs(forest[0] - skyscraper[0])` to find the distance for the city.',
          'The "smaller distance" represents the word that is more "similar" in meaning.',
        ],
        solution: `forest = [10, 1]
tree = [9, 2]
skyscraper = [1, 10]

# Calculate distances using the first dimension (Nature)
dist_tree = abs(forest[0] - tree[0])
dist_city = abs(forest[0] - skyscraper[0])

# Compare and print the smaller value
if dist_tree < dist_city:
    print(dist_tree)
else:
    print(dist_city)
`,
      },
    ],
  },
  {
    id: 'rel-mod-02',
    title: 'Linking Facts with Knowledge Graph Embedding Models',
    moduleId: 'relational-models',
    prerequisites: ['rel-mod-01'],
    estimatedTimeMinutes: 45,
    difficulty: 'beginner',
    learningObjectives: [
      'Define the structure of a "Triple" (Head-Relation-Tail)',
      'Understand how Knowledge Graph Embeddings (KGE) model structured relationships',
      'Identify potential gaps in historical linked data',
    ],
    keywords: ['knowledge-graphs', 'pykeen', 'linked-data', 'triples'],
    content: `# Linking Facts with Knowledge Graph Embedding Models

## Analogy: From Clouds to Constellations

In the previous lesson, we saw that **Word Vectors** are like a cloud of stars: we know which stars are near each other, but we don't necessarily know *why*.

A **Knowledge Graph** (also know as a relational model) is a constellation. It doesn't just put stars in a space; it draws explicit lines between them and labels those lines. It tells us that Star A is "connected to" Star B by a specific relationship, like "is-the-parent-of" or "was-written-by."

## Key Concepts

### 1. The Triple
While word vectors learn from messy, unstructured sentences, **Knowledge Graph Embeddings (KGE)** learn from structured facts called **Triples**. A triple is the smallest unit of information in a graph.

:::definition
**Triple**: A statement consisting of three parts:
1.  **Head** (Subject): The starting entity.
2.  **Relation** (Predicate): The link or verb.
3.  **Tail** (Object): The ending entity.
:::

In Python, we can represent a single fact using a simple list.

\`\`\`python
# Representing a triple: [Head, Relation, Tail]
triple = ["Jane_Austen", "author_of", "Persuasion"]

print(f"Entity 1: {triple[0]}")
print(f"Relationship: {triple[1]}")
print(f"Entity 2: {triple[2]}")
\`\`\`

### 2. PyKEEN and Predictive History
**PyKEEN** is a Python library used to train models on these triples. Once a model understands the "geometry" of your graph, it can predict missing links.

If the graph knows that *Person A* was born in *City B*, and *City B* is in *Country C*, PyKEEN helps the computer mathematically "guess" that *Person A* is a citizen of *Country C*. 

\`\`\`python
# A Knowledge Graph is just a collection of these triples
knowledge_graph = [
    ["London", "located_in", "United_Kingdom"],
    ["Charles_Dickens", "born_in", "Landport"],
    ["Landport", "located_in", "United_Kingdom"]
]

print(f"Our graph contains {len(knowledge_graph)} facts.")
\`\`\`

## Practice: Navigating the List

When we store triples in a list, we use **indexes** to access the different parts:
*   \`triple[0]\` is the **Head**
*   \`triple[1]\` is the **Relation**
*   \`triple[2]\` is the **Tail**

:::try-it
In the sandbox, try to print just the **Relation** from this historical triple.

\`\`\`python
fact = ["Rosalind_Franklin", "discovered", "DNA_Structure"]

# Access index 1 to get the relation
print(fact[1]) 
\`\`\`
:::

## Transfer: The Silence of the Archive

Knowledge Graphs are powerful, but they are only as good as their data. If an archive primarily records the letters of "Great Men," a Knowledge Graph will visualize women and marginalized groups as **"Isolated Nodes"**—stars with no lines connecting them to the rest of the constellation. 

When you build a graph, ask: *Who is missing a connection, and why?*

:::challenge
Represent a knowledge statement as a triplet and extract specific labels from a collection of facts.
:::`,
    challenges: [
      {
        id: 'rel-mod-02-c1',
        title: 'Building a Triple',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# A Triple must have a Head, Relation, and Tail.
# Complete the triple to show that 'London' is the 'capital_of' 'UK'.

head = "London"
relation = "" # What's the nature of the relationship?
tail = "" # What goes here?

# Combine them into a list called 'my_triple'
# Hint: use [head, relation, tail]
my_triple = []

print(my_triple)
`,
        expectedOutput: '[\'London\', \'capital_of\', \'UK\']',
        hints: [
          'Assign the string `"capital_of"` to the `relation` variable.',
          'Assign the string `"UK"` to the `tail` variable.',
          'Inside the square brackets for `my_triple`, list the variables separated by commas: `head, relation, tail`.',
        ],
        solution: `head = "London"
relation = "capital_of"
tail = "UK"

my_triple = [head, relation, tail]

print(my_triple)
`,
      },
      {
        id: 'rel-mod-02-c2',
        title: 'Relation Extraction',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# The archive is a list of lists (triples)
archive = [
    ["The_Hobbit", "written_by", "Tolkien"],
    ["London", "located_in", "UK"],
    ["Emma", "written_by", "Austen"]
]

for triple in archive:
    # 1. Check if the relation (index 1) is equal to "written_by"
    if triple[1] == "written_by":
        # 2. Print the name of the book (index 0)
        print()
`,
        expectedOutput: 'The_Hobbit\nEmma',
        hints: [
          '`triple[1]` accesses the middle part of each list (the relationship).',
          '`triple[0]` accesses the first part of each list (the book name).',
          'Make sure your `print()` statement is indented inside the `if` block!',
        ],
        solution: `archive = [
    ["The_Hobbit", "written_by", "Tolkien"],
    ["London", "located_in", "UK"],
    ["Emma", "written_by", "Austen"]
]

for triple in archive:
    if triple[1] == "written_by":
        # triple[0] refers to the head/subject
        print(triple[0])
`,
      },
    ],
  },
  {
    id: 'rel-mod-03',
    title: 'Vector Arithmetic in 2D Space',
    moduleId: 'relational-models',
    prerequisites: ['rel-mod-02'],
    estimatedTimeMinutes: 35,
    difficulty: 'beginner',
    learningObjectives: [
      'Perform element-wise vector addition and subtraction in Python',
      'Define the "TransE" model (Translation Embeddings) in a 2D space',
      'Explain how relations act as directional "journeys" between entities',
    ],
    keywords: ['vector-arithmetic', 'TransE', 'embedding-space', '2D-vectors'],
    content: `# Vector Arithmetic: Thinking with Directions

## Analogy: A Map of Meaning

Imagine a map where cities aren't placed by geography, but by **culture**. The North-South axis measures **Artistic Significance**, and the East-West axis measures **Economic Power**.

On this map, to get from "Florence" to "Leonardo da Vinci," you would travel a specific direction: **North-West** (High Art, Lower Economic Power). This "journey"—\`[Change in Economy, Change in Art]\`—is a **vector**. 

If you start at "Rome" and take that *exact same journey*, you should land near "Michelangelo." The relationship "was_home_to_artist" is a repeatable, directional step on the map.

## Key Concepts

### 1. Relationships as Translations (TransE)
The model that powers this is called **TransE**. It treats relationships as a literal translation (or "shift") across the map.

:::definition
**TransE (Translation Embedding)**: A model that represents entities as points and relationships as vectors. It assumes that if you start at the Head's coordinates and "walk" along the Relation's vector, you will arrive at the Tail's coordinates.
\`Head + Relation ≈ Tail\`
:::

### 2. The Arithmetic of Meaning
In Python, we represent these 2D coordinates as lists with two numbers. To add vectors, we add each element at the same index.

\`\`\`python
# Coordinates: [Economic_Power, Artistic_Significance]
florence = [7, 9]
was_home_to_artist = [-2, 1] # Move left (less econ), move up (more art)

# Predict the artist's location
# Add the first elements: 7 + (-2) = 5
# Add the second elements: 9 + 1 = 10
da_vinci = [florence[0] + was_home_to_artist[0], florence[1] + was_home_to_artist[1]]

print(f"The artist is at: {da_vinci}")
\`\`\`

## Practice

:::try-it
In the sandbox, create coordinates for "UK" \`[8, 6]\` and a "capital_of" relation \`[-1, 2]\`. Calculate the coordinates for "London" by adding the two vectors element-wise.

\`\`\`python
uk = [8, 6]
capital_of = [-1, 2]

london_x = uk[0] + capital_of[0]
london_y = uk[1] + capital_of[1]

print([london_x, london_y])
\`\`\`
:::

## Transfer: Detecting Bias through Subtraction

This vector arithmetic is a powerful tool for digital humanities research. By training a model on historical texts, we can uncover hidden biases.

If we calculate the vector for \`Doctor - Man + Woman\`, a perfectly unbiased model would result in \`Doctor\`. However, models trained on 20th-century texts often result in \`Nurse\`. The vector difference between the expected and actual result gives us a measurable coordinate for the social bias present in the archive.

:::challenge
Apply vector arithmetic to predict entity positions and identify relationship vectors.
:::`,
    challenges: [
      {
        id: 'rel-mod-03-c1',
        title: 'Predicting the Tail in 2D',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Coordinates: [Military_Power, Political_Influence]
rome = [10, 8]
had_emperor = [-1, 2] # Relation: Less military, more political

# 1. Add the first elements (index 0) together
x = rome[0] + had_emperor[0]

# 2. Add the second elements (index 1) together
# Your code here
y = 

# 3. Combine them into the final coordinate list
augustus = [x, y]
print(augustus)
`,
        expectedOutput: '[9, 10]',
        hints: [
          'To get the second number in a list, use `list_name[1]`.',
          'The `y` coordinate should be `rome[1] + had_emperor[1]`.',
          'If you just did `rome + had_emperor`, you would get a list with 4 items. We want a list with 2 items!',
        ],
        solution: `rome = [10, 8]
had_emperor = [-1, 2]

x = rome[0] + had_emperor[0]
y = rome[1] + had_emperor[1]

augustus = [x, y]
print(augustus)
`,
      },
      {
        id: 'rel-mod-03-c2',
        title: 'Finding the Relationship Vector',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Coordinates: [Political_Power, Cultural_Significance]
france = [10, 7]
eiffel_tower = [4, 10]

# Calculate the relation vector by subtracting
# Hint: tail - head
# 1. Subtract index 0 of France from index 0 of Eiffel Tower
x = eiffel_tower[0] - france[0]

# 2. Subtract index 1 of France from index 1 of Eiffel Tower
y = 

is_location_of = [x, y]
print(is_location_of)
`,
        expectedOutput: '[-6, 3]',
        hints: [
          'Remember the formula: `Relation = Tail - Head`.',
          'To find the change in "Cultural Significance" (y), calculate `eiffel_tower[1] - france[1]`.',
        ],
        solution: `# Coordinates: [Political_Power, Cultural_Significance]
france = [10, 7]
eiffel_tower = [4, 10]

# Calculate the relation vector by subtracting
x = eiffel_tower[0] - france[0]
y = eiffel_tower[1] - france[1]

is_location_of = [x, y]
print(is_location_of)
`,
      },
    ],
  },
  {
    id: 'rel-mod-04',
    title: 'Predicting the Unknown',
    moduleId: 'relational-models',
    prerequisites: ['rel-mod-03'],
    estimatedTimeMinutes: 40,
    difficulty: 'intermediate',
    learningObjectives: [
      'Explain how models perform "Link Prediction"',
      'Calculate the "Error Score" of a predicted triple',
      'Understand why models provide a ranked list of candidates rather than one "correct" answer',
    ],
    keywords: ['link-prediction', 'scoring-function', 'rank', 'candidates'],
    content: `# Predicting the Unknown

## Analogy: The Search Party

Imagine you are looking for a lost traveler. You know their starting point (**The Head**) and the direction they were walking (**The Relation**). 

You follow their tracks and arrive at a clearing in the forest. The traveler isn't standing exactly there, but you see three cabins nearby. 
*   **Cabin A** is 10 meters away.
*   **Cabin B** is 50 meters away.
*   **Cabin C** is 200 meters away.

You would conclude that **Cabin A** is the most likely place to find them. In Knowledge Graphs, this is called **Link Prediction**. We calculate where we *should* land, and then look at which real-world entities are closest to that spot.

## Key Concepts

### 1. The Scoring Function
In the previous lesson, we used the formula \`Head + Relation = Tail\`. In the real world, the math is rarely perfect. The landing spot usually falls in the empty space *near* the actual target. The distance between your "predicted spot" and the "actual entity" is called the **Score**. 

:::definition
**Scoring Function**: A calculation of how "plausible" a triple is. In many models, the lower the distance (score), the more likely the triple is to be true.
:::

\`\`\`python
# Predicted landing spot [x, y]
prediction = [10, 10]
# Actual entity location
entity_loc = [12, 10]

# Distance (Score) calculation
score = abs(prediction[0] - entity_loc[0]) + abs(prediction[1] - entity_loc[1])
print(f"Plausibility Score: {score}") # Lower is better!
\`\`\`

### 2. Candidate Ranking
Because models are probabilistic, they don't give one answer. They look at every entity in the archive and **rank** them from the smallest distance to the largest.

\`\`\`python
predicted_spot = [5, 10]

# Candidate entities and their coordinates
candidates = {
    "Shakespeare": [5, 11],  # Distance: 1
    "Newton": [10, 15],      # Distance: 10
    "Dickens": [4, 8]        # Distance: 3
}

# The model ranks Shakespeare as the #1 prediction.
\`\`\`

## Practice

:::try-it
In the sandbox, we have a predicted coordinate of \`[10, 10]\`. There are two entities: \`Archive_A\` at \`[12, 10]\` and \`Archive_B\` at \`[20, 10]\`. Calculate the distance for both.

\`\`\`python
pred = [10, 10]
a = [12, 10]
b = [20, 10]

score_a = abs(pred[0] - a[0]) + abs(pred[1] - a[1])
score_b = abs(pred[0] - b[0]) + abs(pred[1] - b[1])

print(f"A Score: {score_a}, B Score: {score_b}")
\`\`\`
:::

## Transfer: Beyond the Known

Link prediction is used by historians to fill "gaps" in archives. If a 19th-century letter mentions a "Doctor" but the name is smudged, a Knowledge Graph can look at the context—the location, the date, and the social circle—to predict the missing name.

However, we must be careful: a model will only predict things similar to what it has already seen. If your model only knows about male doctors, it will never predict a woman's name for that smudged text, even if she was there. **Ranking is not just math; it is a reflection of the data's history.**

:::challenge
Calculate prediction errors and identify the most likely candidate from a list.
:::`,
    challenges: [
      {
        id: 'rel-mod-04-c1',
        title: 'Calculating the Prediction Error',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Where the math says we should land
predicted_point = [10, 20]

# Where the actual entity "Jane_Austen" is
actual_point = [12, 19]

# 1. Find the distance for the X coordinate
dist_x = abs(predicted_point[0] - actual_point[0])

# 2. Find the distance for the Y coordinate
# Hint: use abs() and subtract the index 1 values
dist_y = 

# 3. Add them together to get the total "Error Score"
total_error = 

print(total_error)
`,
        expectedOutput: '3',
        hints: [
          '`dist_y` is the absolute difference between `predicted_point[1]` and `actual_point[1]`.',
          '`abs(a - b)` ensures the distance is always a positive number.',
          'Add `dist_x` and `dist_y` together to get the final result.',
        ],
        solution: `predicted_point = [10, 20]
actual_point = [12, 19]

dist_x = abs(predicted_point[0] - actual_point[0])
dist_y = abs(predicted_point[1] - actual_point[1])

total_error = dist_x + dist_y
print(total_error)
`,
      },
      {
        id: 'rel-mod-04-c2',
        title: 'Identifying the Top Result',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Candidates and their distance from the predicted point
# Format: [Name, Score]
results = [
    ["Entity_A", 15],
    ["Entity_B", 2],
    ["Entity_C", 8]
]

# We want to find the entity with the minimum score
best_entity = ""
lowest_score = 100 # A high starting number

for candidate in results:
    name = candidate[0]
    score = candidate[1]
    
    # Check if the current score is lower than our 'lowest_score'
    if score < lowest_score:
        # Update lowest_score and best_entity
        # Your code here
        pass

print(best_entity)
`,
        expectedOutput: 'Entity_B',
        hints: [
          'Inside the `if` block, you need to set `lowest_score = score`.',
          'You also need to set `best_entity = name` so the program remembers which one was the best.',
        ],
        solution: `results = [
    ["Entity_A", 15],
    ["Entity_B", 2],
    ["Entity_C", 8]
]

best_entity = ""
lowest_score = 100 

for candidate in results:
    name = candidate[0]
    score = candidate[1]
    
    if score < lowest_score:
        lowest_score = score
        best_entity = name

print(best_entity)
`,
      },
    ],
  },
  {
    id: 'rel-mod-05',
    title: 'Measuring Truth: Evaluation Metrics',
    moduleId: 'relational-models',
    prerequisites: ['rel-mod-04'],
    estimatedTimeMinutes: 30,
    difficulty: 'intermediate',
    learningObjectives: [
      'Define "Negative Sampling" and why it is necessary for training',
      'Calculate a simple "Hits@K" metric',
      'Interpret model performance in the context of historical archives',
    ],
    keywords: ['evaluation', 'hits-at-k', 'negative-sampling', 'accuracy'],
    content: `# Measuring Truth: Evaluation Metrics

## Analogy: The Multiple Choice Test

Imagine you are an English teacher. You give a student a question: *"Who wrote Frankenstein?"*

If the student just says "A person," they aren't exactly wrong, but they aren't right either. To really test them, you give them a list of choices:
1. Mary Shelley
2. Percy Shelley
3. Lord Byron
4. Bram Stoker

If the correct answer is in their **Top 1** guess, they are an expert. If the correct answer is at least in their **Top 3** list, they are doing okay. In Knowledge Graphs, we call this **Hits@K**.

## Key Concepts

### 1. Negative Sampling
To learn what is "true," a model like PyKEEN must also see what is "false." If a model only ever sees correct triples, it might start to believe that *everyone* wrote *Frankenstein*. 

:::definition
**Negative Sampling**: The process of creating "fake" triples by taking a real triple and swapping the Head or Tail with a random entity. 
*Real: (Shelley, wrote, Frankenstein)*
*Fake: (Napoleon, wrote, Frankenstein)*
:::

### 2. Hits@K
When we evaluate a model, we ask: "When you ranked all possible answers, where did the correct one land?"

*   **Hits@1**: Was the correct answer the #1 choice?
*   **Hits@3**: Was the correct answer in the top 3?
*   **Hits@10**: Was the correct answer in the top 10?

\`\`\`python
# A model's ranked guesses for "Capital of France"
predictions = ["Lyon", "Marseille", "Paris", "Nice", "Bordeaux"]

# In Python, index 2 is the 3rd item
# Hits@3 = True (It's in the first 3)
# Hits@1 = False (It's not in the first 1)
\`\`\`

## Practice

:::try-it
Imagine a model is trying to predict which philosopher influenced **Mary Wollstonecraft**. It has ranked its top 5 guesses in a list. 

In the sandbox, use **list slicing** to extract the "Top 3" and check if "Rousseau" made the cut.

\`\`\`python
# The model's ranked guesses (Index 0 is the #1 guess)
guesses = ["Godwin", "Locke", "Rousseau", "Burke", "Paine"]

# 1. Get the first three items
top_3 = guesses[0:3]

# 2. Print the top_3 list to see who is in it
print(f"Top 3 Candidates: {top_3}")

# 3. Check if 'Rousseau' is in that specific slice
if "Rousseau" in top_3:
    print("Result: Hit@3")
\`\`\`
:::

## Transfer: What is a "Good" Score?

In the hard sciences, a low Hits@1 score might be considered a failure. But in the **Digital Humanities**, a model that can't get the #1 answer might still be incredibly useful. 

If a model's Hits@10 is high, it means the model has learned the "neighborhood" of truth. It might not know exactly which monk wrote a specific manuscript, but it knows the correct *monastery* or *time period*. In an archive of thousands of people, narrowing a mystery down to the "Top 10" candidates is often a massive breakthrough.

:::challenge
Determine if the correct answers fall within the model's top-ranked results.
:::`,
    challenges: [
      {
        id: 'rel-mod-05-c1',
        title: 'The Hits@3 Test',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `predictions = ["Vinci", "Michelangelo", "Raphael", "Donatello", "Titian"]
correct_answer = "Raphael"

# 1. Get the Top 3 candidates using a list slice
# Hint: list_name[0:3]
top_three = 

# 2. Check if the correct_answer is in the top_three list
if correct_answer in top_three:
    print("Hit@3")
else:
    print("Miss")
`,
        expectedOutput: 'Hit@3',
        hints: [
          'Use `predictions[0:3]` to get the first three elements.',
          'The `in` keyword in Python is used to check if a value exists inside a list.',
        ],
        solution: `predictions = ["Vinci", "Michelangelo", "Raphael", "Donatello", "Titian"]
correct_answer = "Raphael"

# Slicing from index 0 up to (but not including) 3
top_three = predictions[0:3]

if correct_answer in top_three:
    print("Hit@3")
else:
    print("Miss")
`,
      },
      {
        id: 'rel-mod-05-c2',
        title: 'Calculating Accuracy (Mean Hits)',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# Did the model get the answer right for these three queries?
# 1 = Hit, 0 = Miss
results = [1, 0, 1]

# Calculate the sum of the hits
total_hits = sum(results)

# Calculate the accuracy: total_hits divided by the number of results
# Hint: use len(results) to get the count
accuracy = 

print(accuracy)
`,
        expectedOutput: '0.6666666666666666',
        hints: [
          'Divide `total_hits` by `len(results)`.',
          'The forward slash `/` is the operator for division in Python.',
        ],
        solution: `results = [1, 0, 1]

total_hits = sum(results)
# Accuracy is the average of the hits
accuracy = total_hits / len(results)

print(accuracy)
`,
      },
    ],
  },
  // --- Compiled from lessons-in-development (2026-02-10) ---
  {
    id: 'generative-01',
    title: 'The Oulipo and Constraint-based Writing',
    moduleId: 'generative-poetics',
    prerequisites: ['python-basics'],
    estimatedTimeMinutes: 45,
    difficulty: 'beginner',
    learningObjectives: [
      'Explain the Oulipian concept of "constrained writing"',
      'Implement a basic "N+7" algorithm in Python',
      'Understand how formal constraints can bypass "writer\'s block"',
    ],
    keywords: ['oulipo', 'constraints', 'n+7', 'algorithms'],
    content: `# The Oulipo and Constraint-based Writing

## Analogy
Imagine you are a chef, but you are told you cannot use the letter "E" in any of your ingredients. No *eggs*, no *cheese*, no *beef*. This constraint seems like a limitation, but it actually forces you to discover new flavors (like *calamari* or *mushrooms*) that you might have ignored otherwise. In the 1960s, a group of writers called the **Oulipo** (Ouvroir de littérature potentielle) used similar "rules" to spark creativity.

## Key Concepts
The Oulipo believed that "inspiration" was a myth. Instead, they used mathematical structures and algorithms to produce "potential" literature.

:::definition
**Constraint**: A formal rule (mathematical, grammatical, or alphabetical) imposed on a writer to force specific creative choices.
:::

One of their most famous methods is the **N+7** method. To perform it:
1. Take a text.
2. For every noun in that text, find its entry in a dictionary.
3. Replace that noun with the 7th noun following it in the dictionary.

In Python, we can simulate this by using a list of words as our "dictionary."

\`\`\`python
dictionary = ["apple", "bird", "cloud", "dance", "eagle", "forest", "ghost", "house", "ice"]
word = "bird"

# Find index and add 7
old_index = dictionary.index(word)
new_index = (old_index + 2) % len(dictionary) # We use +2 for this short list
print(dictionary[new_index]) # Output: "dance"
\`\`\`

## Practice
:::try-it
Change the \`index + 2\` to \`index + 5\` in the example above. What happens if the index goes past the end of the list? (Hint: The \`%\` operator helps "wrap" it back to the start).
:::

## Transfer
Constraints are not just for games; they are used in DH to reveal the "underlying skeleton" of a text. By forcing a text into a new shape, we see patterns we missed.

:::challenge
Write a function that takes a short sentence and replaces every word with the word located **3 positions later** in a provided word list.
:::`,
    challenges: [
      {
        id: 'generative-01-c1',
        title: 'Implement N+3 Replacement',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `# A small dictionary of nouns
vocabulary = ["apple", "bread", "candle", "dolphin", "elephant", "forest", "guitar", "hill", "island", "jungle"]

sentence = ["apple", "forest"]

# 1. Create an empty list called 'result'
# 2. Loop through each word in 'sentence'
# 3. Find the index of that word in 'vocabulary'
# 4. Find the word at (index + 3)
# 5. Append it to 'result'

result = []

# Your code here

print(result)
`,
        expectedOutput: '[\'dolphin\', \'island\']',
        hints: [
          'Use `vocabulary.index(word)` to find the number position of a word.',
          'Remember that `list[new_index]` retrieves the item at that position.',
          'If you want to be safe, use `(index + 3) % len(vocabulary)` to avoid errors if the word is at the end of the list.',
        ],
        solution: `vocabulary = ["apple", "bread", "candle", "dolphin", "elephant", "forest", "guitar", "hill", "island", "jungle"]
sentence = ["apple", "forest"]

result = []
for word in sentence:
    idx = vocabulary.index(word)
    new_word = vocabulary[idx + 3]
    result.append(new_word)

print(result)
`,
      },
    ],
  },
  {
    id: 'generative-02',
    title: 'Stochastic Text: Building Markov Chain Generators',
    moduleId: 'generative-poetics',
    prerequisites: ['generative-01'],
    estimatedTimeMinutes: 60,
    difficulty: 'intermediate',
    learningObjectives: [
      'Define "stochastic" and "state" in text generation',
      'Build a Markov chain dictionary (transition table)',
      'Generate a sentence based on word probabilities',
    ],
    keywords: ['markov chains', 'probability', 'stochastic', 'text generation'],
    content: `# Stochastic Text: Building Markov Chain Generators

## Analogy
Think of a Markov Chain like your smartphone’s "Auto-complete" or "Predictive Text." It doesn't know *what* you are trying to say; it only knows that when you type "How," the most likely next word is "are." It looks at the **current state** to guess the **next state**.

## Key Concepts

:::definition
**Stochastic**: A process that is randomly determined but follows a specific pattern of probability.
:::

In a **Markov Chain**, we look at a "source text" and count which words follow which other words. 

If our source is: *"The cat sat. The cat slept."*
*   After **"The"**, the next word is always **"cat"**.
*   After **"cat"**, the next word is **"sat"** (50% chance) or **"slept"** (50% chance).

We store this in a dictionary where the **Key** is the word, and the **Value** is a list of all words that have followed it.

\`\`\`python
# A simple transition dictionary
markov_model = {
    "The": ["cat", "dog"],
    "cat": ["sat", "slept"],
    "dog": ["barked"]
}

import random
current_word = "The"
next_word = random.choice(markov_model[current_word])
print(next_word)
\`\`\`

## Practice
:::try-it
Add more words to the \`markov_model\` above. Try adding "sat": ["down"] and see if you can generate a three-word chain.
:::

## Transfer
This is the basis of early "AI" poetry. By feeding a Markov model the works of Shakespeare, the computer "learns" the *style* of Shakespeare (the word transitions) without understanding the *meaning*.

:::challenge
Build a transition dictionary from a provided list of words. For every word, store the word that comes immediately after it.
:::`,
    challenges: [
      {
        id: 'generative-02-c1',
        title: 'Build the Markov Model',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `text = "the-sun-shined-the-sun-rose-the-moon-rose".split("-")
# Result: ['the', 'sun', 'shined', 'the', 'sun', 'rose', 'the', 'moon', 'rose']

model = {}

# Loop through the list (stop before the last word)
for i in range(len(text) - 1):
    current_word = text[i]
    next_word = text[i+1]
    
    # If current_word is not in model, add it as an empty list
    if current_word not in model:
        model[current_word] = []
    
    # Append the next_word to the list for that current_word
    # Your code here

print(model["the"])
`,
        expectedOutput: '[\'sun\', \'sun\', \'moon\']',
        hints: [
          'Inside the loop, you need to `append` the `next_word` to `model[current_word]`.',
          '`model[current_word]` is a list, so use the `.append()` method.',
        ],
        solution: `text = "the-sun-shined-the-sun-rose-the-moon-rose".split("-")
model = {}

for i in range(len(text) - 1):
    current_word = text[i]
    next_word = text[i+1]
    if current_word not in model:
        model[current_word] = []
    model[current_word].append(next_word)

print(model["the"])
`,
      },
    ],
  },
  {
    id: 'generative-03',
    title: 'Recursive Structures: Context-Free Grammars',
    moduleId: 'generative-poetics',
    prerequisites: ['python-basics'],
    estimatedTimeMinutes: 30,
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand the "Symbol: Replacement" logic of grammars',
      'Use recursion or iteration to expand a grammar',
      'Create a "Mad Libs" style generator',
    ],
    keywords: ['grammars', 'tracery', 'recursion', 'symbols'],
    content: `# Recursive Structures: Context-Free Grammars

## Analogy
Think of a formal grammar like a **Russian Nesting Doll** or a **Tree**. You start with a big idea ("Sentence"), and you open it up to find smaller parts ("Noun" and "Verb"). You open the "Noun" doll and find "The Octopus." You keep replacing symbols with actual words until there are no more dolls to open.

## Key Concepts

:::definition
**Grammar**: A set of rules where a "Symbol" (like \`#color#\`) is replaced by a random selection from a list of options (like \`["red", "blue"]\`).
:::

This is the logic behind **Tracery**, a popular tool for making Twitter bots and generative stories. We use a dictionary to hold our rules.

\`\`\`python
rules = {
    "animal": ["cat", "walrus", "owl"],
    "action": ["sleeps", "dances", "computes"]
}

import random
# A template using placeholders
template = "The #animal# #action#."

# Replacing one placeholder
animal_choice = random.choice(rules["animal"])
output = template.replace("#animal#", animal_choice)
print(output)
\`\`\`

## Practice
:::try-it
Create a rule called \`"mood"\` with three adjectives. Add \`#mood#\` to the template string and use \`.replace()\` to insert it.
:::

## Transfer
Grammars allow for **infinite** variety with very little data. By nesting rules (e.g., a \`#noun#\` could be a \`#descriptor# #object#\`), you can create complex, poetic sentences that never repeat.

:::challenge
Complete the "story" by replacing the symbols \`#hero#\` and \`#weapon#\` with random choices from the grammar dictionary.
:::`,
    challenges: [
      {
        id: 'generative-03-c1',
        title: 'The Story Expander',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import random

grammar = {
    "hero": ["Knight", "Coder", "Librarian"],
    "weapon": ["Sword", "Python Script", "Index Card"]
}

story = "The #hero# fought with a #weapon#."

# 1. Pick a random hero from grammar["hero"]
# 2. Pick a random weapon from grammar["weapon"]
# 3. Use .replace() to update the 'story' string
# 4. Print the result

# Your code here
`,
        expectedOutput: 'The [Random Hero] fought with a [Random Weapon].',
        hints: [
          '`random.choice(list)` is the best way to get one item.',
          'You need to call `.replace("#hero#", choice)` and then call `.replace()` again on the *result* of the first one.',
        ],
        solution: `import random

grammar = {
    "hero": ["Knight", "Coder", "Librarian"],
    "weapon": ["Sword", "Python Script", "Index Card"]
}

story = "The #hero# fought with a #weapon#."

h = random.choice(grammar["hero"])
w = random.choice(grammar["weapon"])

story = story.replace("#hero#", h).replace("#weapon#", w)
print(story)
`,
      },
    ],
  },
  {
    id: 'generative-04',
    title: 'Erasure and Deformance',
    moduleId: 'generative-poetics',
    prerequisites: ['text-analysis-fundamentals'],
    estimatedTimeMinutes: 40,
    difficulty: 'beginner',
    learningObjectives: [
      'Define "Deformance" as a critical DH method',
      'Create an "Erasure Poetry" script',
      'Programmatically filter text based on conditions',
    ],
    keywords: ['deformance', 'erasure', 'blackout poetry', 'filtering'],
    content: `# Erasure and Deformance

## Analogy
Imagine taking a newspaper and a thick black marker. You cross out almost every word until only a few remain. The remaining words create a new, hidden poem. This is **Blackout Poetry**. In Digital Humanities, we call this "Deformance"—intentionally "breaking" a text to see it in a new light.

## Key Concepts

:::definition
**Deformance**: A portmanteau of "performance" and "deformity." It is the act of programmatically altering a text to interpret it.
:::

One way to "deform" a text is to remove everything except specific types of words. For example, what happens if you remove everything from a novel except the verbs? You are left with a "pure action" version of the story.

In Python, we can do this using a simple loop and an \`if\` statement.

\`\`\`python
original = "The heavy rain fell on the quiet roof"
words = original.split()
# Keep only words shorter than 4 letters
erased = [w if len(w) < 4 else "___" for w in words]
print(" ".join(erased))
# Output: "The ___ ___ ___ on the ___ ___"
\`\`\`

## Practice
:::try-it
Modify the code above to replace words with dots \`...\` instead of underscores.
:::

## Transfer
Erasure is a powerful tool for political DH. By erasing parts of a legal document or a historical archive, artists highlight the voices that are suppressed or the hidden biases within the text.

:::challenge
Create a "Vowel Erasure" function. Loop through a string and if a character is a vowel (a, e, i, o, u), replace it with an asterisk \`*\`.
:::`,
    challenges: [
      {
        id: 'generative-04-c1',
        title: 'Vowel Blackout',
        language: 'python',
        difficulty: 'beginner',
        starterCode: `text = "DIGITAL HUMANITIES"
vowels = "AEIOU"
output = ""

# Loop through each character in 'text'
# If the character is in 'vowels', add "*" to output
# Otherwise, add the character itself to output

# Your code here

print(output)
`,
        expectedOutput: 'D*G*T*L H*M*N*T**S',
        hints: [
          'Use `for char in text:` to look at every letter.',
          'Use `if char in vowels:` to check for a vowel.',
        ],
        solution: `text = "DIGITAL HUMANITIES"
vowels = "AEIOU"
output = ""

for char in text:
    if char in vowels:
        output += "*"
    else:
        output += char

print(output)
`,
      },
    ],
  },
  {
    id: 'generative-05',
    title: 'Visualizing Poetry',
    moduleId: 'generative-poetics',
    prerequisites: ['data-visualization'],
    estimatedTimeMinutes: 60,
    difficulty: 'intermediate',
    learningObjectives: [
      'Map text strings to 2D coordinates (X, Y)',
      'Use Matplotlib to render text-based art',
      'Randomize visual properties (size, color, position)',
    ],
    keywords: ['matplotlib', 'concrete poetry', 'visualization', 'spatial'],
    content: `# Visualizing Poetry

## Analogy
Think of a **Concrete Poem** (like George Herbert’s "Easter Wings"). The words are not just meant to be read; they are meant to be *seen*. The shape of the poem on the page is part of its meaning. In this lesson, we treat the screen as a canvas and the words as physical objects with coordinates.

## Key Concepts
Instead of printing text line-by-line, we can use a plotting library like \`matplotlib\` to place words anywhere on an X/Y axis.

\`\`\`python
import matplotlib.pyplot as plt

# Create a blank plot
plt.figure(figsize=(5,5))
# Place a word at X=0.5, Y=0.5
plt.text(0.5, 0.5, "CENTER", fontsize=20, ha='center')
plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
\`\`\`

By using a loop and \`random.random()\`, we can scatter words across the screen to create "Atmospheric" or "Chaotic" poetry.

## Practice
:::try-it
Run the code above and try changing the \`fontsize\` or the \`0.5\` coordinates. Note how the coordinate system works (0,0 is bottom-left).
:::

## Transfer
Visualizing text allows us to represent "uncertainty" or "distance." For example, you could plot words from a novel where the "heavier" words (high frequency) are larger, or "sad" words are placed lower on the Y-axis.

:::challenge
Create a "Word Rain" visualization. Loop through a list of words and plot each one at a random X position, but with a Y position that decreases slightly each time, like they are falling.
:::`,
    challenges: [
      {
        id: 'generative-05-c1',
        title: 'Generate Word Rain',
        language: 'python',
        difficulty: 'intermediate',
        starterCode: `import matplotlib.pyplot as plt
import random

words = ["pitter", "patter", "drip", "drop", "rain", "fall"]

plt.figure(figsize=(5,5))

y_pos = 0.9  # Starting height

for w in words:
    x_pos = random.random() # Random float between 0 and 1
    
    # 1. Plot the word 'w' at x_pos and y_pos
    # Use plt.text(x, y, word)
    
    # 2. Subtract 0.1 from y_pos so the next word is lower
    
    # Your code here

plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
`,
        expectedOutput: '(A plot showing the words scattered horizontally but stepping downwards)',
        hints: [
          'The function is `plt.text(x_pos, y_pos, w)`.',
          'Don\'t forget to update `y_pos = y_pos - 0.1` inside the loop.',
        ],
        solution: `import matplotlib.pyplot as plt
import random

words = ["pitter", "patter", "drip", "drop", "rain", "fall"]
plt.figure(figsize=(5,5))
y_pos = 0.9

for w in words:
    x_pos = random.random()
    plt.text(x_pos, y_pos, w, fontsize=12)
    y_pos -= 0.1

plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
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
