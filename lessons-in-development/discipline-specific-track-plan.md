# Discipline-Specific Track: Implementation Plan

## Current State

### What exists
- **Type system**: `track: 'discipline-specific'` is defined in `ModuleDefinition` but unused
- **Onboarding collects discipline**: 11 options (Literature, History, Art History, Linguistics, Philosophy, Religious Studies, Classics, Music, Archaeology, Anthropology, Other)
- **Modules carry `disciplines[]` metadata**: e.g., `topic-modeling` lists `['literature', 'history', 'sociology', 'archaeology']`
- **Pathway generator** uses a hardcoded `DISCIPLINE_MODULE_MAP` that only covers 4 of 11 disciplines (literature, history, linguistics, art-history) — the other 7 fall through to defaults
- **Library page** displays all modules with track badges but has no filtering UI

### What's missing
- Zero modules on the `discipline-specific` track
- No UI to filter or browse by discipline
- No helper functions to query modules by discipline
- `DISCIPLINE_MODULE_MAP` is incomplete and doesn't leverage the `disciplines[]` field already on every module
- Users who select Philosophy, Religious Studies, Classics, Music, Archaeology, Anthropology, or Other get generic default pathways

---

## Design Philosophy

The `discipline-specific` track should **not** duplicate method content. The `dh-methods` modules teach *how* to do text analysis, network analysis, topic modeling, etc. Discipline-specific modules teach *what it means* to apply those methods within a particular scholarly tradition — the source types, the interpretive frameworks, the canonical debates, the ethical considerations, and the kinds of questions that drive research in that field.

Each discipline-specific module should:
1. **Assume the student has completed relevant `dh-methods` modules** as prerequisites
2. **Use primary sources and research questions native to the discipline**
3. **Teach disciplinary conventions** (citation practices, argument structures, peer review norms)
4. **Surface discipline-specific pitfalls** (e.g., OCR errors in 18th-century typography for Classics, sacred text handling ethics for Religious Studies)
5. **End with a mini-project** that produces something a student could present at a disciplinary conference

---

## Proposed Discipline-Specific Modules

### Tier 1 — High Priority (disciplines with the most existing module coverage)

#### 1. `ds-literature` — "Computational Literary Studies"
- **Prerequisites**: `text-analysis-fundamentals`, `topic-modeling`, `sentiment-analysis`
- **Disciplines**: `['literature', 'creative-writing']`
- **Lessons** (4):
  1. **Corpus Assembly for Literary Study** — How to build a literary corpus: period, genre, canon vs. non-canon, copyright considerations. Balancing representativeness with availability. Using plain Python to define inclusion criteria from a metadata list.
  2. **Stylometric Fingerprints** — Measuring authorial style via function word frequency, type-token ratio, and sentence length distribution. Building a simple "style vector" from a text using Counter and statistics. Connect to the Federalist Papers debate, Elena Ferrante attribution.
  3. **Plotting the Emotional Arc** — Applying the sentiment analysis skills from `sentiment-analysis` to track emotional valence across narrative structure (dividing a novel into segments). Connecting to Vonnegut's "shape of stories" and Jockers/Reagan's "Syuzhet" work.
  4. **From Numbers to Argument** — How to move from computational results to a literary-critical argument. What constitutes evidence in literary studies? How to frame DH findings for a literature journal audience. Writing an interpretive paragraph from a frequency table.

#### 2. `ds-history` — "Computational History"
- **Prerequisites**: `structured-data`, `data-visualization`, `web-data-collection`
- **Disciplines**: `['history']`
- **Lessons** (4):
  1. **The Historian's Source Critique, Digitized** — Adapting traditional source criticism (provenance, authenticity, bias) to digital surrogates. Metadata as a form of secondary source. Working with date parsing and period filtering in Python.
  2. **Counting the Past** — Serial history and quantitative methods: building time series from structured records (e.g., yearly counts from a census-like dataset). Calculating rates of change. Connect to the Annales school and cliometrics.
  3. **Prosopography with Python** — Collective biography from structured data: given a list of person-records with dates, roles, and locations, extract patterns about a social group. Who held office? Where were they educated? How did the group change over decades?
  4. **Silences and Gaps** — A methods-aware reflection: what the archive doesn't contain. How to document data absences in a historical DH project. Building a "missingness report" that characterizes what fraction of records lack key fields, and what populations those gaps likely correspond to.

#### 3. `ds-archaeology` — "Computational Archaeology"
- **Prerequisites**: `structured-data`, `data-visualization`, `geospatial-analysis`
- **Disciplines**: `['archaeology']`
- **Lessons** (4):
  1. **Assemblages as Data** — Translating archaeological finds into structured records. Each artifact as a dictionary: type, material, context, date range, coordinates. Practice filtering and grouping an assemblage by material type.
  2. **Seriation and Relative Chronology** — Ordering artifact types by frequency to establish relative dates. Implement a simplified frequency seriation in plain Python: sort types by their peak frequency across layers/periods.
  3. **Site Distribution and Spatial Patterns** — Working with coordinates to analyze site distribution. Calculate distances between sites, find nearest neighbors, identify clusters — all with basic math (no GIS library needed in Pyodide, just coordinate arithmetic).
  4. **Context Is Everything** — Why removing an artifact from its context destroys information. A data-ethics lesson about provenance, repatriation, and digital surrogates. Building a structured "provenance record" for a digital object.

### Tier 2 — Medium Priority (disciplines with moderate existing coverage)

#### 4. `ds-linguistics` — "Corpus Linguistics with Python"
- **Prerequisites**: `text-analysis-fundamentals`, `structured-data`
- **Disciplines**: `['linguistics']`
- **Lessons** (3):
  1. **Building and Querying a Corpus** — Corpus design principles: balanced vs. specialized corpora. Representing annotated text as lists of tuples (word, POS tag). Filtering by grammatical category.
  2. **Collocations and N-grams** — Finding words that co-occur more than chance would predict. Building bigram frequency tables, calculating simple association scores (raw co-occurrence count / expected).
  3. **Type-Token Ratio and Lexical Richness** — Measuring vocabulary diversity across speakers, genres, or time periods. Computing TTR, hapax legomena count, and Yule's K — all with basic Python math.

#### 5. `ds-art-history` — "Digital Art History"
- **Prerequisites**: `data-visualization`, `structured-data`, `image-analysis`
- **Disciplines**: `['art-history', 'media-studies']`
- **Lessons** (3):
  1. **The Catalogue Raisonné as Data** — Translating an art catalogue into structured records. Working with dimensions, dates, media, and provenance chains as dictionary fields. Filtering and summarizing a collection.
  2. **Provenance and Network** — Ownership chains as network data: each transfer of an artwork is an edge between collector nodes. Building an ownership graph from structured records.
  3. **Color at Scale** — Analyzing color palettes across a collection (building on `image-analysis`). Representing color as RGB values in Python lists, computing dominant colors across a simulated collection, tracking palette shifts over decades.

#### 6. `ds-music` — "Computational Musicology"
- **Prerequisites**: `python-basics`, `structured-data`, `data-sonification`
- **Disciplines**: `['music']`
- **Lessons** (3):
  1. **Scores as Structured Data** — Representing musical notation as lists of dictionaries with pitch, duration, and dynamic fields. Filtering and summarizing: range, most common intervals, rhythmic patterns.
  2. **Interval Patterns and Melodic Contour** — Computing intervals between successive notes. Classifying melodic motion (ascending, descending, repeated). Comparing two melodies by their interval profiles.
  3. **Corpus Analysis of Musical Features** — Aggregating features across a collection of pieces: average tempo, pitch distribution, key frequency. Connect to the "million song dataset" tradition in computational musicology.

### Tier 3 — Lower Priority (less existing module coverage, more niche)

#### 7. `ds-classics` — "Digital Classics"
- **Prerequisites**: `text-analysis-fundamentals`, `structured-data`
- **Disciplines**: `['classics']`
- **Lessons** (3):
  1. **Fragmentary Texts as Data** — Working with texts that have lacunae (gaps). Representing uncertain readings with markup conventions. Counting and characterizing what is missing vs. what survives.
  2. **Intertextuality and Allusion Detection** — Finding shared phrases across texts using n-gram overlap. Given two texts as strings, extract shared bigrams/trigrams and report potential allusions.
  3. **Epigraphy and Structured Inscriptions** — Treating inscriptions as structured records: location, date range, language, material, text. Querying and summarizing an epigraphic database.

#### 8. `ds-philosophy` — "Computational Philosophy"
- **Prerequisites**: `text-analysis-fundamentals`, `network-analysis`
- **Disciplines**: `['philosophy']`
- **Lessons** (3):
  1. **Mapping Conceptual Networks** — Treating philosophical texts as networks of concepts. Extracting key terms and measuring co-occurrence to build a concept graph. Who cites whom? Which ideas cluster together?
  2. **Argument Structure as Data** — Representing logical arguments as structured trees (nested dictionaries: claim, premises, sub-arguments). Traversing and summarizing argument structures.
  3. **Tracing Influence Across Centuries** — Using keyword co-occurrence and citation data to measure intellectual influence. Building a timeline of concept frequency across a simulated multi-century corpus.

#### 9. `ds-anthropology` — "Digital Anthropology"
- **Prerequisites**: `python-basics`, `text-analysis-fundamentals`, `oral-history`
- **Disciplines**: `['anthropology', 'sociology']`
- **Lessons** (3):
  1. **Fieldwork Notes as Data** — Structuring ethnographic fieldnotes: date, location, participants, themes, raw observations. Querying and filtering a fieldwork corpus by theme or date range.
  2. **Kinship and Social Structure** — Representing kinship relations as structured data (person, relation_type, related_to). Querying for descent lines, marriage patterns, and household composition.
  3. **Ethical Dimensions of Digital Ethnography** — Data sovereignty, informed consent for digital collections, de-identification. Building an "ethics checklist" as a structured Python dictionary. (Connects to `critical-data` module.)

#### 10. `ds-religious-studies` — "Digital Religious Studies"
- **Prerequisites**: `text-analysis-fundamentals`, `structured-data`
- **Disciplines**: `['religious-studies', 'philosophy']`
- **Lessons** (3):
  1. **Sacred Texts as Corpora** — The particular challenges of working with sacred texts computationally: translation layers, textual traditions, sensitivity and community protocols. Building a parallel text structure (original + translation as paired lists).
  2. **Ritual and Calendar Data** — Representing liturgical calendars and ritual cycles as structured data. Date calculations, cyclical patterns, and comparative calendar analysis across traditions.
  3. **Material Religion and Object Catalogues** — Working with material culture records: inscriptions, objects, architectural features. Structured querying across a multi-tradition catalogue.

---

## Infrastructure Changes Required

### 1. Data Layer (`src/data/modules.ts`)

Add helper functions that leverage the existing `disciplines[]` field:

```typescript
// Find all modules whose disciplines[] includes the given discipline
export function getModulesByDiscipline(discipline: string): ModuleDefinition[] {
  return modules.filter((m) => m.disciplines.includes(discipline));
}

// Find modules matching ANY of the given disciplines
export function getModulesByDisciplines(disciplines: string[]): ModuleDefinition[] {
  return modules.filter((m) =>
    m.disciplines.some((d) => disciplines.includes(d))
  );
}
```

### 2. Pathway Generator (`src/utils/pathwayGenerator.ts`)

**Replace** the hardcoded `DISCIPLINE_MODULE_MAP` with a dynamic lookup:

```typescript
import { getModulesByDiscipline } from '../data/modules.ts';

// Instead of:
// const disciplineModules = DISCIPLINE_MODULE_MAP[discipline] || [];

// Use:
// const disciplineModules = getModulesByDiscipline(discipline).map(m => m.id);
```

This automatically picks up new modules as they are added — no more manual map maintenance. The discipline-specific modules will naturally surface in pathways because their `disciplines[]` field will match the user's onboarding selection.

### 3. Onboarding (`BackgroundAssessment.tsx`)

Add new disciplines to the `DISCIPLINES` array as modules are created:
- Currently missing from onboarding: "Sociology", "Media Studies" (both appear in module `disciplines[]` data but aren't onboarding options)
- Consider adding "Game Studies" if the interactive-fiction module proceeds

### 4. Interest Mapping (`InterestMapping.tsx`)

Add interest cards for the new modules:
- "Exploring bias in data" → maps to `critical-data`
- "Working with oral histories" → maps to `oral-history`
- "Interactive storytelling" → maps to `interactive-fiction`
- "Documenting your workflow" → maps to `reproducibility`

Update `INTEREST_MODULE_MAP` in `pathwayGenerator.ts` to match.

### 5. Library Page (`LibraryPage.tsx`)

Add filtering UI:
- **Track filter**: tabs or buttons for "All", "Foundations", "Methods", "Discipline-Specific"
- **Discipline filter**: dropdown or tag cloud showing "Modules for: Literature, History, ..." based on the user's selected discipline (or browsable for all)
- **"Recommended for you" section**: uses `getModulesByDiscipline(profile.background.discipline)` to highlight relevant modules

### 6. Type System (`src/types/index.ts`)

The `disciplines` field on `ModuleDefinition` is currently `string[]` — consider making it a union type for consistency:

```typescript
type Discipline =
  | 'literature' | 'history' | 'art-history' | 'linguistics'
  | 'philosophy' | 'religious-studies' | 'classics' | 'music'
  | 'archaeology' | 'anthropology' | 'sociology' | 'media-studies'
  | 'creative-writing' | 'folklore' | 'game-studies';

disciplines: Discipline[];
```

This prevents typos and enables autocomplete.

---

## Rollout Strategy

### Phase 1: Infrastructure (no new content needed)
1. Add `getModulesByDiscipline()` and `getModulesByDisciplines()` helper functions
2. Replace hardcoded `DISCIPLINE_MODULE_MAP` with dynamic lookup
3. Add discipline filter to Library page
4. Update tests

### Phase 2: Tier 1 Modules (high impact, most students)
1. Write `ds-literature` (4 lessons) — serves the largest likely user group
2. Write `ds-history` (4 lessons) — second-largest group, strong structured-data connection
3. Write `ds-archaeology` (4 lessons) — strong geospatial/visualization connection
4. Update onboarding interest cards and pathway maps

### Phase 3: Tier 2 Modules (medium impact)
5. Write `ds-linguistics` (3 lessons)
6. Write `ds-art-history` (3 lessons)
7. Write `ds-music` (3 lessons)

### Phase 4: Tier 3 Modules (niche but important for coverage)
8. Write `ds-classics` (3 lessons)
9. Write `ds-philosophy` (3 lessons)
10. Write `ds-anthropology` (3 lessons)
11. Write `ds-religious-studies` (3 lessons)

### Phase 5: Feedback and Iteration
- Collect usage data: which discipline modules are most/least used
- Survey users: are the disciplinary examples resonant?
- Fill gaps identified by users who select "Other" — what disciplines are they?

---

## Content Constraints

All discipline-specific lessons must follow the same constraints as existing lessons:
- **Pyodide-compatible**: standard library only, no pip install, no filesystem, no network
- **Self-contained data**: all datasets must be defined inline as Python literals
- **Template format**: follows `_template.md` structure
- **DH-grounded**: every code example should feel like real research practice, not a generic programming exercise
- **Culturally sensitive**: discipline-specific modules must acknowledge the power dynamics of computational approaches to cultural material, especially for Religious Studies, Anthropology, Classics (colonial collection histories), and Indigenous material

---

## Estimated Scope

| Phase | Modules | Lessons | Est. Development Time |
|-------|---------|---------|----------------------|
| 1: Infrastructure | 0 | 0 | Small (utility functions + UI filter) |
| 2: Tier 1 | 3 | 12 | Medium |
| 3: Tier 2 | 3 | 9 | Medium |
| 4: Tier 3 | 4 | 12 | Medium-Large |
| **Total** | **10** | **33** | — |

This would bring the platform from 14 modules to 24 (or 19 to 29, counting the 5 new dh-methods modules also in development), with full coverage of all 11 onboarding disciplines plus Sociology and Media Studies.
