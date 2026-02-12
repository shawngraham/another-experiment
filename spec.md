# Digital Humanities Interactive Tutorial Environment
## Technical Specification Document

**Version:** 1.0  
**Date:** February 2026  
**Status:** Initial Specification

---

## Executive Summary

This document specifies an integrated web-based tutorial environment designed for introduction to digital humanities (DH). The platform combines personalized learning pathways, secure in-browser code execution, note-taking capabilities, and seamless export to Obsidian.md for knowledge management. The system targets humanities scholars, students, and researchers seeking to develop computational and digital literacy skills.

### Core Value Propositions

- **Personalized Learning:** Dynamic lesson plans based on user interests and background
- **Safe Experimentation:** Sandboxed code execution without server-side dependencies
- **Knowledge Retention:** Integrated note-taking with export to personal knowledge bases
- **Progressive Mastery:** Scaffolded learning from digital literacy to computational methods
- **Privacy-First:** Zero tracking, no cloud sync, all data stays on user's device
- **Open Source:** Transparent code, community-driven, no vendor lock-in

---

## 1. System Overview

### 1.1 Target Audience

**Primary Users:**
- Graduate students in humanities disciplines
- Early-career researchers exploring computational methods
- Librarians and information professionals
- Undergraduate students in digital humanities courses

**User Characteristics:**
- Limited to no programming experience
- Strong domain expertise in humanities fields
- Interest in text analysis, data visualization, or digital archiving
- Motivation to apply computational methods to research

### 1.2 Learning Objectives

**Digital Literacy Track:**
- Understanding of file systems, data formats, and digital preservation
- Critical evaluation of digital tools and platforms
- Awareness of computational thinking principles

**Coding Fundamentals Track:**
- Basic syntax and programming concepts (Python/R)
- Working with data structures (lists, dictionaries, dataframes)
- Reading, writing, and transforming text files

**DH Methods Track:**
- Text analysis and natural language processing basics
- Data visualization for humanities data
- Working with APIs and web scraping
- Metadata standards and structured data

### 1.3 Technical Architecture Overview

**Privacy-First Design Principles:**
- **Local-First:** All computation and storage happens in the user's browser
- **No Backend:** Static site hosting only, no application servers
- **Zero Tracking:** No analytics, telemetry, or usage monitoring
- **No Accounts:** No registration, login, or user identification
- **Data Portability:** Export data anytime in open formats
- **Offline Capable:** Works without internet (after initial load)
- **Open Source:** Transparent, auditable code

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  Lesson    │  │   Code       │  │   Note-Taking   │ │
│  │  Delivery  │  │   Sandbox    │  │   Interface     │ │
│  └────────────┘  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Browser-Based Execution Layer               │
│  ┌──────────────────┐        ┌──────────────────┐      │
│  │  Pyodide         │        │  WebR            │      │
│  │  (Python 3.11)   │        │  (R via Wasm)    │      │
│  └──────────────────┘        └──────────────────┘      │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               Local Storage / IndexedDB                  │
│  • User progress  • Notes  • Code history  • Exports    │
│            ALL DATA REMAINS ON USER'S DEVICE             │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Core Components

### 2.1 User Onboarding & Interest Assessment

#### 2.1.1 Initial Assessment Flow

**Purpose:** Generate personalized learning pathway based on user background and goals.

**Assessment Categories:**

1. **Academic Background**
   - Discipline (literature, history, art history, linguistics, etc.)
   - Current role (student, researcher, librarian, etc.)
   - Programming experience (none, beginner, intermediate)

2. **Research Interests**
   - Primary materials (texts, images, archival documents, etc.)
   - Research questions or projects
   - Scale of materials (individual texts, small corpus, large datasets)

3. **Learning Goals**
   - Skill acquisition (text analysis, visualization, web scraping, etc.)
   - Project-driven (specific research goal)
   - General exploration

4. **Time Commitment**
   - Hours per week available
   - Preferred lesson length (15-min, 30-min, 1-hour)
   - Deadline constraints (course, project deadline, none)

#### 2.1.2 Pathway Generation Algorithm

```python
# Pseudocode for pathway generation
def generate_pathway(user_profile):
    pathway = {
        'modules': [],
        'estimated_hours': 0,
        'recommended_language': None
    }
    
    # Determine primary language
    if user_profile.research_interests.text_heavy:
        pathway.recommended_language = 'python'
    elif user_profile.research_interests.statistical:
        pathway.recommended_language = 'r'
    else:
        pathway.recommended_language = 'python'  # default
    
    # Add foundational modules
    if user_profile.programming_experience == 'none':
        pathway.modules.append('digital_literacy_basics')
        pathway.modules.append('coding_concepts_intro')
    
    # Add discipline-specific modules
    pathway.modules.extend(
        match_discipline_modules(user_profile.discipline)
    )
    
    # Add method-specific modules
    for interest in user_profile.research_interests:
        pathway.modules.extend(
            get_method_modules(interest)
        )
    
    return pathway
```

#### 2.1.3 User Interface Specifications

**Onboarding Screen Sequence:**

1. **Welcome Screen**
   - Brief introduction to platform
   - Explanation of personalization process
   - Estimated time: 5-7 minutes

2. **Background Assessment** (Multi-select with free text)
   - "What is your primary discipline?"
   - "Have you written code before?"
   - "What types of materials do you work with?"

3. **Interest Mapping** (Card-sorting interface)
   - Present 12-15 DH method cards
   - User selects 3-5 of highest interest
   - Examples: "Analyzing word frequency," "Creating timelines," "Mapping historical events"

4. **Goal Setting** (Free text with suggestions)
   - "What would you like to accomplish?"
   - Auto-suggest based on previous selections

5. **Pathway Preview**
   - Visual representation of generated pathway
   - Estimated completion time
   - Option to modify or regenerate

### 2.2 Code Sandbox Environment

#### 2.2.1 Technical Implementation

**Python Sandbox (Pyodide)**

- **Runtime:** Pyodide 0.25+ (Python 3.11 in WebAssembly)
- **Execution:** Fully in-browser, no server roundtrips
- **File System:** Virtual file system via Emscripten
- **Package Management:** Micropip for pure Python packages

**Pre-loaded Python Packages:**
```python
base_packages = [
    'pandas',           # Data manipulation
    'matplotlib',       # Plotting
    'beautifulsoup4',   # HTML parsing
    'nltk',            # Natural language processing
    'requests',        # HTTP requests (with CORS limitations)
    'scikit-learn',    # Basic ML (optional, size considerations)
]
```

**R Sandbox (WebR)**

- **Runtime:** WebR 0.3+ (R 4.3 in WebAssembly)
- **Execution:** Browser-based
- **Graphics:** Canvas-based plotting
- **Package Management:** Binary package repository

**Pre-loaded R Packages:**
```r
base_packages <- c(
    'tidyverse',       # Data manipulation and viz
    'stringr',         # String processing
    'quanteda',        # Text analysis
    'ggplot2',         # Plotting (part of tidyverse)
    'readr'            # Data import
)
```

#### 2.2.2 Security Model

**Isolation Mechanisms:**

1. **WebAssembly Sandbox**
   - No direct system access
   - Cannot execute arbitrary binaries
   - Memory-safe execution

2. **Network Restrictions**
   - CORS-limited HTTP requests
   - No local network access
   - Whitelist for educational resources

3. **Resource Limits**
   - Maximum execution time: 30 seconds
   - Memory limit: 512MB per execution
   - Storage quota: 50MB per user (IndexedDB)

4. **Code Validation**
   - Static analysis for prohibited operations
   - Pattern matching for system calls
   - Warning system for potentially long-running code

**Prohibited Operations:**
- File system access outside virtual environment
- Network sockets (raw)
- Subprocess spawning
- Infinite loops (via timeout)

#### 2.2.3 User Interface Components

**Code Editor:**
- **Library:** Monaco Editor (VS Code foundation)
- **Features:**
  - Syntax highlighting
  - Auto-completion
  - Error underlining
  - Line numbers
  - Keyboard shortcuts (Cmd/Ctrl+Enter to run)

**Console Output:**
- Tabbed interface: stdout, stderr, graphics
- Syntax highlighting for output
- Collapsible sections for long output
- Download output as text file

**File Manager:**
- Virtual file system browser
- Upload sample datasets
- Download generated files
- File size indicators

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Lesson Content (Left Pane - 40%)                       │
│  ┌───────────────────────────────────────────────┐     │
│  │  Markdown-rendered lesson text                │     │
│  │  • Instructions                                │     │
│  │  • Explanations                                │     │
│  │  • Sample code                                 │     │
│  └───────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Code Sandbox (Right Pane - 60%)                        │
│  ┌───────────────────────────────────────────────┐     │
│  │  // Editor (Top 60%)                          │     │
│  │  def analyze_text(text):                      │     │
│  │      words = text.split()                     │     │
│  │      return len(words)                        │     │
│  │                                                │     │
│  ├───────────────────────────────────────────────┤     │
│  │  [Run Code] [Reset] [Copy] [Save Snippet]    │     │
│  ├───────────────────────────────────────────────┤     │
│  │  Console Output (Bottom 40%)                  │     │
│  │  >>> analyze_text("Hello world")              │     │
│  │  2                                             │     │
│  └───────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

#### 2.2.4 Lesson Integration

**Code Challenges:**
- Starting code templates
- Expected output shown
- Automatic validation for simple exercises
- Hints available after attempt

**Example Challenge Structure:**
```yaml
challenge:
  id: "text-analysis-01"
  title: "Count words in a text"
  language: "python"
  difficulty: "beginner"
  starter_code: |
    def count_words(text):
        # Your code here
        pass
    
    # Test your function
    sample = "The quick brown fox"
    print(count_words(sample))
  
  expected_output: "4"
  
  hints:
    - "Use the split() method to separate words"
    - "Use len() to count items in a list"
  
  solution: |
    def count_words(text):
        words = text.split()
        return len(words)
```

### 2.3 Lesson Content System

#### 2.3.1 Content Structure

**Module Hierarchy:**
```
Pathway
├── Module (e.g., "Text Analysis Fundamentals")
│   ├── Lesson 1 (e.g., "Working with Strings")
│   │   ├── Section 1: Concept Introduction
│   │   ├── Section 2: Code Example
│   │   ├── Section 3: Guided Practice
│   │   └── Section 4: Challenge Exercise
│   ├── Lesson 2
│   └── Lesson 3
└── Module 2
```

**Content Metadata:**
```json
{
  "lesson_id": "text-analysis-01",
  "title": "Introduction to String Operations",
  "module": "text-analysis-fundamentals",
  "prerequisites": ["coding-basics-01"],
  "estimated_time_minutes": 30,
  "difficulty": "beginner",
  "learning_objectives": [
    "Understand string data type",
    "Use basic string methods",
    "Manipulate text data"
  ],
  "keywords": ["string", "text", "manipulation", "python"]
}
```

#### 2.3.2 Content Format

**Markdown-Based Lessons:**
- Standard Markdown with extensions
- Code blocks with language specification
- Callout boxes for tips, warnings, definitions
- Embedded interactive elements

**Special Syntax:**

```markdown
## Lesson Title

::: definition
**Corpus**: A collection of texts used for analysis
:::

Here's how to load a text file in Python:

```python
with open('document.txt', 'r') as file:
    text = file.read()
```

::: try-it
Modify the code above to open 'sample.txt'
:::

::: challenge
Write a function that counts sentences in a text
:::
```

#### 2.3.3 Adaptive Difficulty

**Progression Logic:**
- Calculate success rate on challenges
- Offer additional practice if < 70% success
- Skip advanced explanations if user demonstrates proficiency
- Suggest alternative pathways if struggling

### 2.4 Note-Taking Interface

#### 2.4.1 Features

**Core Capabilities:**
- Markdown editor for notes
- Inline code snippets with syntax highlighting
- Tagging system
- Linked notes (wiki-style)
- Attachment of code samples from sandbox

**Note Types:**
1. **Lesson Notes:** Attached to specific lessons
2. **Personal Notes:** Free-form notes
3. **Code Snippets:** Saved sandbox code with context
4. **Reflections:** Prompted journal entries

#### 2.4.2 User Interface

**Note Editor:**
- Split view: Markdown source | Rendered preview
- Toolbar for formatting
- Auto-save every 30 seconds
- Local storage backup

**Note Organization:**
```
My Notes
├── By Module
│   ├── Text Analysis
│   └── Data Visualization
├── By Date
│   ├── Week 1
│   └── Week 2
├── Tags
│   ├── #regex
│   ├── #corpus
│   └── #troubleshooting
└── Code Snippets
    ├── Text cleaning
    └── Word frequency
```

#### 2.4.3 Integration with Lessons

**Automatic Note Scaffolding:**
- Each lesson can generate template note
- Pre-filled with lesson title, objectives, key concepts
- User adds personal observations

**Quick Capture:**
- Hotkey to open note-taking sidebar (Cmd/Ctrl+N)
- Button to "Add to notes" from lesson content
- Copy code from sandbox with metadata

### 2.5 Obsidian Export System

#### 2.5.1 Export Specifications

**Vault Structure:**
```
DH-Tutorial-Export/
├── 00-Index.md
├── 01-Modules/
│   ├── Text-Analysis-Fundamentals.md
│   ├── Data-Visualization-Basics.md
│   └── ...
├── 02-Lessons/
│   ├── 01-Text-Analysis/
│   │   ├── Lesson-01-String-Operations.md
│   │   ├── Lesson-02-Regular-Expressions.md
│   │   └── ...
│   └── 02-Data-Viz/
├── 03-Notes/
│   ├── My-Notes-Lesson-01.md
│   ├── Reflection-Week-1.md
│   └── ...
├── 04-Code-Snippets/
│   ├── text-cleaning.py
│   ├── word-frequency.py
│   └── ...
├── 05-Resources/
│   ├── datasets/
│   └── references.md
└── 06-Templates/
    ├── lesson-note-template.md
    └── code-snippet-template.md
```

#### 2.5.2 Markdown Formatting for Obsidian

**Frontmatter Example:**
```markdown
---
title: "Introduction to String Operations"
date: 2026-02-06
module: Text Analysis Fundamentals
lesson_number: 1
tags:
  - python
  - strings
  - text-processing
status: completed
---

# Introduction to String Operations

## Learning Objectives
- [[String Data Type|Understand string data type]]
- Use basic string methods
- Manipulate text data

## Key Concepts

### String Methods
Python provides many built-in methods for [[String Manipulation]]...

## My Notes
[[2026-02-06]] - This was my first introduction to...

## Code Examples

```python
# Word counting example
text = "The quick brown fox"
word_count = len(text.split())
```

## Related Lessons
- [[Lesson-02-Regular-Expressions]]
- [[Lesson-05-Text-Parsing]]

## References
- [[Python String Documentation]]
```

#### 2.5.3 Linking Strategy

**Automatic Link Creation:**
- Convert tags to internal links
- Link lesson prerequisites
- Create MOC (Map of Content) pages
- Generate glossary with backlinks

**Link Types:**
- `[[Lesson Name]]` - Lesson references
- `[[Concept]]` - Concept definitions
- `#tag` - Maintained as tags
- `![[Image]]` - Embedded images/diagrams

#### 2.5.4 Export Process

**Export Options:**

1. **Full Export** (ZIP file)
   - All lessons, notes, and code
   - Preserves directory structure
   - Includes media files
   - Size: Typically 5-20MB

2. **Selective Export**
   - Choose specific modules
   - Include/exclude lesson content
   - Notes only
   - Code snippets only

3. **Incremental Export**
   - Only new/modified content since last export
   - Maintains file structure
   - Merge instructions provided

**Export Configuration:**
```json
{
  "export_settings": {
    "include_lesson_content": true,
    "include_user_notes": true,
    "include_code_snippets": true,
    "include_progress_data": false,
    "link_format": "wikilink",  // wikilink or markdown
    "flatten_structure": false,
    "include_media": true,
    "code_file_extension": ".py"  // or .R
  }
}
```

**Post-Export Instructions:**
Generated README.md with:
- How to open in Obsidian
- Recommended plugins (Dataview, Templater)
- Graph view suggestions
- Daily note integration tips

#### 2.5.5 Data Backup Strategy

**User Responsibility:**
Since all data is stored locally, users are responsible for backups. The platform facilitates this through:

**Regular Export Reminders:**
- Optional reminder after completing each module
- Suggestion to export weekly during active learning
- Banner notification if no export in 30+ days (dismissible)

**Export Automation (Future):**
- Browser extension for scheduled auto-export
- Save to local folder automatically
- Integration with personal cloud storage (user-controlled: Dropbox, iCloud, etc.)

**Data Recovery:**
- Export files serve as complete backups
- Can be re-imported (future feature)
- Version history maintained through file timestamps
- Users encouraged to use version control (Git) for exports

**Multi-Device Workflow:**
- Export from Device A
- Import to Device B (future feature)
- Obsidian as sync medium (via their sync service or iCloud, etc.)

---

## 3. Content Development Framework

### 3.1 Module Templates

#### 3.1.1 Standard Module Structure

**Module Components:**
1. **Overview** (5-10 minutes)
   - Learning objectives
   - Why this matters for DH
   - Prerequisites check

2. **Core Lessons** (3-5 lessons per module)
   - Conceptual introduction
   - Practical demonstration
   - Guided practice
   - Independent challenges

3. **Capstone Project** (30-60 minutes)
   - Apply all module concepts
   - Work with real-ish data
   - Multiple possible solutions

4. **Reflection & Next Steps** (5 minutes)
   - Self-assessment
   - Connection to research
   - Suggested further learning

### 3.2 Lesson Templates

#### 3.2.1 ADEPT Framework

**A - Analogy**
- Connect to familiar concept
- Humanities-relevant metaphor

**D - Diagram**
- Visual representation
- Flowchart or concept map

**E - Example**
- Concrete case from DH research
- Real code that works

**P - Practice**
- Guided coding exercise
- Scaffolded challenge

**T - Transfer**
- Apply to new situation
- Connect to user's interests

#### 3.2.2 Sample Lesson Outline

```markdown
# Lesson: Regular Expressions for Text Matching

## Analogy (2 min)
Regular expressions are like a "find" function on steroids...
Think of them as creating a template for text patterns...

## Diagram (2 min)
[Visual showing regex pattern matching process]

## Example (5 min)
Let's find all dates in a historical document:

```python
import re
text = "The treaty was signed on March 15, 1848..."
dates = re.findall(r'\b[A-Z][a-z]+ \d{1,2}, \d{4}\b', text)
```

## Practice (10 min)
Try It: Modify the pattern to also match dates like "15 March 1848"

Challenge: Extract all mentions of years between 1800-1900

## Transfer (5 min)
How could you use this to extract names, places, or other entities?
```

### 3.3 Content Library

#### 3.3.1 Core Modules (V1)

**Module 1: Digital Literacy Foundations** (3-4 hours)
- Understanding files and directories
- Data formats (TXT, CSV, JSON, XML)
- Plain text vs. binary files
- Character encoding (UTF-8, ASCII)
- Version control concepts

**Module 2: Python Basics for Humanists** (6-8 hours)
- Variables and data types
- Lists and dictionaries
- Control flow (if/else, loops)
- Functions
- Reading and writing files
- Working with libraries

**Module 3: Text Analysis Fundamentals** (8-10 hours)
- String operations
- Regular expressions
- Word frequency analysis
- Text cleaning and normalization
- Basic NLP with NLTK
- Stopwords and stemming

**Module 4: Working with Structured Data** (6-8 hours)
- CSV files and tabular data
- Pandas basics
- Filtering and sorting
- Grouping and aggregation
- Merging datasets
- Metadata management

**Module 5: Data Visualization for DH** (6-8 hours)
- Principles of effective visualization
- Basic plots (bar, line, scatter)
- Customizing visualizations
- Plotting text analysis results
- Creating timelines
- Geographic visualization basics

**Module 6: Web Data Collection** (4-6 hours)
- HTML structure
- Web scraping ethics
- Using BeautifulSoup
- APIs and JSON
- Rate limiting and respectful scraping

#### 3.3.2 Discipline-Specific Modules

**Literary Studies Track:**
- Stylometry and authorship attribution
- Topic modeling
- Sentiment analysis of literature
- Character network analysis

**Historical Studies Track:**
- Temporal data analysis
- Network analysis for historical figures
- OCR and historical documents
- Geographic data and mapping

**Linguistic Studies Track:**
- Corpus linguistics methods
- Phonetic analysis
- Morphological analysis
- Concordances and collocations

---

## 4. User Experience & Interface Design

### 4.1 Navigation Structure

**Primary Navigation:**
```
[Logo] DHPrimer: Tutorial Lab

[Dashboard] [My Pathway] [Library] [Notes] [Progress]
                                                  [Export]
```

**Dashboard View:**
- Continue where you left off
- Upcoming lessons
- Progress overview
- Recent notes
- Achievements/badges

**My Pathway View:**
- Visual progress through modules
- Estimated time remaining
- Optional side quests
- Prerequisites highlighted

### 4.2 Responsive Design

**Breakpoints:**
- Desktop: 1280px+ (optimal experience)
- Tablet: 768px-1279px (stacked layout)
- Mobile: <768px (sequential navigation)

**Mobile Considerations:**
- Code editing challenging on mobile
- Focus on reading content
- Note-taking optimized for mobile
- Export/import for data portability between devices

### 4.3 Accessibility

**WCAG 2.1 Level AA Compliance:**
- Keyboard navigation throughout
- Screen reader support
- Color contrast ratios met
- Alt text for all images
- Captions for video content

**Code Sandbox Accessibility:**
- High contrast themes
- Adjustable font size
- Screen reader compatible output
- Keyboard shortcuts documented

### 4.4 Progress Tracking

**Local Progress Display:**
- Lessons completed
- Time spent per lesson (local calculation only)
- Challenge success rate
- Code execution count
- Notes created
- Modules completed

**All metrics stored locally for user's benefit only. No data transmitted anywhere.**

**Visualization (Optional):**
- Badges for milestones
- Skill trees visualization
- Streaks for daily practice
- Personal progress charts
- All display-only, no sharing or comparison features

---

## 5. Technical Implementation Details

### 5.1 Technology Stack

**Frontend Framework:**
- React 18+ with TypeScript
- State management: Zustand or Redux Toolkit
- Routing: React Router v6
- UI Components: Radix UI or Shadcn/ui
- Styling: Tailwind CSS

**Code Execution:**
- Pyodide 0.25+ for Python
- WebR 0.3+ for R
- Monaco Editor for code editing
- Web Workers for non-blocking execution

**Data Storage:**
- IndexedDB for user data (via Dexie.js)
- LocalStorage for preferences
- All data remains on user's device
- No remote servers or cloud sync

**Build Tools:**
- Vite for build system
- TypeScript for type safety
- ESLint + Prettier for code quality

### 5.2 Data Models

#### 5.2.1 User Profile

```typescript
interface UserProfile {
  id: string;  // Locally generated UUID, never transmitted
  createdAt: Date;
  // No username, email, or identifying information
  
  // Onboarding data
  background: {
    discipline: string;
    role: string;
    programmingExperience: 'none' | 'beginner' | 'intermediate';
    researchInterests: string[];
  };
  
  // Learning preferences
  preferences: {
    preferredLanguage: 'python' | 'r';
    lessonDuration: 15 | 30 | 60;
    dailyGoalMinutes: number;
  };
  
  // Pathway
  currentPathway: {
    pathwayId: string;
    modules: ModuleProgress[];
    customizations: string[];
  };
}
```

#### 5.2.2 Lesson Progress

```typescript
interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  timeSpentMinutes: number;
  
  // Challenge results
  challenges: {
    challengeId: string;
    attempts: number;
    solved: boolean;
    hintsUsed: number;
  }[];
  
  // Code history
  codeSnapshots: {
    timestamp: Date;
    code: string;
    language: string;
  }[];
}
```

#### 5.2.3 Note Structure

```typescript
interface Note {
  id: string;
  type: 'lesson_note' | 'personal_note' | 'code_snippet' | 'reflection';
  title: string;
  content: string;  // Markdown
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  linkedLessons: string[];
  
  // Context
  lessonId?: string;
  moduleId?: string;
  
  // Code attachment
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
}
```

### 5.3 Performance Considerations

**Loading Strategy:**
- Lazy load lesson content
- Code execution in Web Workers
- Virtual scrolling for long lists
- Debounced auto-save

**Bundle Size:**
- Code-split by route
- Lazy load Pyodide/WebR (large files)
- Compress static assets
- Target: <500KB initial bundle

**Caching & Offline Support:**
- Service Worker for offline access
- Cache all lesson content for offline use
- Cache Pyodide/WebR runtimes
- Cache code execution results (session)
- IndexedDB for user data (persistent)
- Clear cache strategy for updates
- Works fully offline after first visit

**Progressive Web App (PWA):**
- Installable on desktop/mobile
- Offline-first architecture
- Background sync for exports (user-initiated)
- No network requests except initial load and updates

---

## 6. Security & Privacy

### 6.1 Data Privacy

**Privacy-First Architecture:**
- **All data stored locally** in the user's browser
- **No servers:** No data ever leaves the user's device
- **No tracking:** No analytics, telemetry, or usage data collected
- **No accounts:** No registration, login, or user identification
- **No cookies:** Beyond essential functionality (session management)
- **Complete transparency:** Open source code allows verification

**User Data:**
- Progress, notes, and code stored in IndexedDB
- Preferences in LocalStorage
- User has complete control
- Data export available anytime
- Clear instructions for data deletion (clear browser storage)

**No Third-Party Services:**
- No analytics platforms (Google Analytics, etc.)
- No error tracking services
- No CDN user tracking
- No social media integration
- No advertising networks

**GDPR Compliance:**
- No personal data collected = minimal compliance burden
- No consent banners needed (beyond essential cookies)
- Data portability via export function
- Right to deletion via browser storage clearing
- Privacy by design and by default

### 6.2 Code Execution Security

**Sandbox Restrictions:**
- No access to local file system
- No network requests to private IPs
- Execution timeout (30 seconds)
- Memory limits enforced
- No access to browser APIs beyond sandbox

**Content Security Policy:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  worker-src 'self' blob:;
  connect-src 'self' https://cdn.jsdelivr.net;
  img-src 'self' data: https:;
```

### 6.3 Third-Party Dependencies

**Vetted Libraries:**
- Regular security audits
- Dependabot for updates
- Minimal dependencies
- Subresource Integrity (SRI) for CDN resources

---

## 7. Testing Strategy

### 7.1 Unit Testing

**Components to Test:**
- Code execution wrapper
- Note-taking editor
- Export functionality
- Pathway generation algorithm

**Tools:**
- Jest for unit tests
- React Testing Library
- Coverage target: >80%

### 7.2 Integration Testing

**Test Scenarios:**
- Complete lesson flow
- Code challenge submission
- Note creation and linking
- Full export process

**Tools:**
- Playwright or Cypress
- Visual regression testing

### 7.3 User Acceptance Testing

**Beta Testing Program:**
- Recruit 20-30 diverse users
- Mix of experience levels
- Voluntary feedback with explicit consent
- Collect qualitative feedback through interviews

**Observational Metrics (With Consent Only):**
- Time to complete modules (self-reported)
- Challenge success rates (observed during testing sessions)
- Drop-off points (noted during usability studies)
- Feature usage (screen recording with permission)

**Post-Beta: All metrics removed for production release.**

---

## 8. Deployment & Distribution

### 8.1 Hosting Options

**Static Site Hosting (No Backend Required):**
- Netlify or Vercel
- GitHub Pages
- Cloudflare Pages
- Self-hosting on any web server
- Custom domain support

**Requirements:**
- HTTPS mandatory
- CDN for static assets (optional)
- Automatic deployments
- Preview deployments for testing
- **No server-side processing**
- **No analytics or tracking scripts**
- **No cookies beyond essential functionality**

**Privacy-Preserving Configuration:**
- No third-party analytics
- No tracking pixels
- No social media widgets with tracking
- Content Security Policy to prevent unauthorized scripts
- Subresource Integrity for CDN resources


---

## 11. Accessibility & Inclusivity

### 11.1 Universal Design Principles

**Inclusive Design:**
- Multiple ways to engage with content
- Flexible time constraints
- Alternative formats available
- Cultural sensitivity in examples

**Language Support:**
- Initial release: English
- Future: Spanish, French, Mandarin
- Interface localization
- Code comments in multiple languages

### 11.2 Learning Differences

**Support for Different Learning Styles:**
- Visual: Diagrams and visualizations
- Auditory: Optional narration
- Kinesthetic: Interactive coding exercises
- Reading/Writing: Rich text content

**Accessibility Features:**
- Adjustable text size
- High contrast mode
- Reduced motion option
- Screen reader optimization

---

