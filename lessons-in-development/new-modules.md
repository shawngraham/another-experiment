# New Module Definitions for modules.ts

Add the following entries to the `modules` array in `src/data/modules.ts`.

## 1. Algorithmic Bias and Critical Data Studies

```typescript
{
  id: 'critical-data',
  title: 'Algorithmic Bias and Critical Data Studies',
  description: 'Examine how classification systems, missing data, feedback loops, and language tools encode bias. Learn to audit datasets, measure representation, and write data biographies.',
  estimatedHours: 5,
  prerequisites: ['python-basics', 'text-analysis-fundamentals'],
  lessons: [
    'critical-data-01', // Counting What Counts: How Categories Shape Data
    'critical-data-02', // The Gaps in the Archive: Measuring Representation
    'critical-data-03', // Feedback Loops: When Output Becomes Input
    'critical-data-04', // Auditing a Word List: Bias in Language Tools
    'critical-data-05', // Writing a Data Biography
  ],
  track: 'dh-methods',
  disciplines: ['history', 'sociology', 'linguistics', 'literature', 'anthropology'],
  keywords: ['bias', 'classification', 'representation', 'data feminism', 'critical data studies', 'ethics'],
},
```

## 2. Oral History and Audio Text Analysis

```typescript
{
  id: 'oral-history',
  title: 'Oral History and Audio Text Analysis',
  description: 'Analyze oral history transcripts as structured data. Explore speaker turns, pauses, silences, conversational power dynamics, and keyword concordances in testimony.',
  estimatedHours: 4,
  prerequisites: ['python-basics', 'text-analysis-fundamentals'],
  lessons: [
    'oral-history-01', // The Shape of Speech: Understanding Transcripts as Data
    'oral-history-02', // Silence and Pause: What Gaps Tell Us
    'oral-history-03', // Turn-Taking and Power: Analyzing Conversation Structure
    'oral-history-04', // Concordance and Keywords in Oral Testimony
  ],
  track: 'dh-methods',
  disciplines: ['history', 'anthropology', 'sociology', 'linguistics', 'folklore'],
  keywords: ['oral history', 'transcripts', 'conversation analysis', 'kwic', 'concordance', 'silences'],
},
```

## 3. Interactive Fiction and Hypertext Narratives

```typescript
{
  id: 'interactive-fiction',
  title: 'Interactive Fiction and Hypertext Narratives',
  description: 'Build branching narratives using Python dictionaries and control flow. Explore hypertext theory, state tracking, narrative graph analysis, and procedural story generation.',
  estimatedHours: 4,
  prerequisites: ['python-basics'],
  lessons: [
    'if-01', // The Forking Path: Stories as Dictionaries
    'if-02', // State and Memory: Tracking the Reader's Journey
    'if-03', // Graph of Stories: Mapping Narrative Structure
    'if-04', // Generating Worlds: Procedural Story Fragments
  ],
  track: 'dh-methods',
  disciplines: ['literature', 'creative-writing', 'media-studies', 'game-studies'],
  keywords: ['interactive fiction', 'hypertext', 'branching narrative', 'procedural generation', 'ergodic literature'],
},
```

## 4. Reproducibility and Documentation

```typescript
{
  id: 'reproducibility',
  title: 'Reproducibility and Documentation',
  description: 'Learn to document your DH research workflow for transparency and reproducibility. Build processing logs, validate naming conventions, verify data integrity with checksums, and generate methods reports.',
  estimatedHours: 3,
  prerequisites: ['python-basics'],
  lessons: [
    'repro-01', // The Lab Notebook: Why Documentation Matters
    'repro-02', // Naming Things: Conventions that Save Your Future Self
    'repro-03', // Checksums and Integrity: Proving Nothing Changed
    'repro-04', // The Methods Section: Generating Human-Readable Reports
  ],
  track: 'dh-methods',
  disciplines: ['history', 'literature', 'archaeology', 'linguistics'],
  keywords: ['reproducibility', 'documentation', 'checksums', 'methods', 'naming conventions', 'data integrity'],
},
```

## 5. Putting It All Together: A DH Research Pipeline

```typescript
{
  id: 'dh-pipeline',
  title: 'Putting It All Together: A DH Research Pipeline',
  description: 'A capstone module that walks through a complete DH research workflow — from loading and cleaning a historical newspaper corpus, to extracting features, comparing subsets, and reporting results.',
  estimatedHours: 4,
  prerequisites: ['python-basics', 'text-analysis-fundamentals', 'structured-data', 'data-visualization'],
  lessons: [
    'pipeline-01', // Stage 1: Loading and Cleaning Your Corpus
    'pipeline-02', // Stage 2: Extracting Features and Counting Patterns
    'pipeline-03', // Stage 3: Comparing and Cross-Tabulating
    'pipeline-04', // Stage 4: Reporting Results
  ],
  track: 'dh-methods',
  disciplines: ['history', 'literature', 'sociology', 'media-studies'],
  keywords: ['pipeline', 'workflow', 'corpus analysis', 'distant reading', 'capstone', 'integration'],
},
```

## Notes

- These 5 modules add 21 lessons total (5 + 4 + 4 + 4 + 4).
- The total module count will go from 14 to 19.
- Update `data.test.ts` to expect 19 modules after adding these.
- The `discipline-specific` track remains unused; `game-studies` and `folklore` are new discipline tags.
- The `dh-pipeline` module is designed to be taken last, after students have completed the core methods modules.
