# Lesson Challenge Review

Generated: 2026-02-20
Branch: `claude/review-lesson-challenges-N7UUr`

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total lessons | ~120 |
| Lessons with challenges | ~110 (≈90%) |
| Lessons without challenges | ~10 |
| Total challenge objects | ~110 |

Overall challenge quality is **strong**. The vast majority have appropriate content, working solutions, clear expected outputs, and good hints. Issues are isolated and mostly fall into a few categories: inconsistent placeholder markers, sandbox library constraints, and a handful of weak expected-output formats for visualisation challenges.

---

## 1. Starter Code Placeholder Patterns Found

Five distinct patterns were found across `starterCode` fields:

| Pattern | Occurrences | Action |
|---------|-------------|--------|
| `# Your code here` | ~95 | **Keep — this is the standard** |
| `# Your code here:` (bare trailing colon) | 6 | **Fix → remove colon** |
| `# Your code here: ` (colon + trailing whitespace only) | 3 | **Fix → remove colon + whitespace** |
| `# YOUR CODE HERE` (all-caps, no instruction) | 2 | **Fix → lowercase** |
| `# YOUR CODE HERE: <instruction>` (all-caps + inline instruction) | 1 | **Fix → lowercase, keep instruction** |
| `# Your code here: <instruction>` (with meaningful inline text) | 2 | **Keep — instruction adds value** |
| `# TODO: <instruction>` | ~12 | **Keep — deliberate step-by-step style** |

### Decision

The canonical placeholder is **`# Your code here`** (sentence-case, no trailing colon).

The `# TODO: step description` pattern used in several later-module challenges (e.g., `critical-data-*`, `structured-data-*`) is an intentionally different, step-by-step style and should **not** be changed — it provides per-step guidance rather than a single insertion point.

The two cases of `# Your code here: append a list [x, z] to ridge_points` and similar inline-instruction variants are also kept because the trailing text is meaningful.

---

## 2. Challenges Flagged for Review

### 2a. Expected-Output Format Issues (visualisation challenges)

These challenges use `matplotlib` but their `expectedOutput` field contains non-Python output strings, which cannot be verified by the code runner.

| Lesson ID | Issue | Recommendation |
|-----------|-------|----------------|
| `data-viz-02-c1` | `expectedOutput` shows printed list values but the challenge also calls `plt.show()`, which produces no testable output | Consider removing the `plt.show()` call and making the test purely on the printed data |
| `data-viz-03-c2` | `expectedOutput` is `"plt.show() called"` — this is not actual Python output | Change to test a side-effect that can be captured (e.g., verify the plot title via `plt.gca().get_title()` printed before `plt.show()`) |
| `data-viz-05-c1` ("The Comparative Capstone") | Difficulty labelled `advanced` but exercise involves a basic bar chart | Consider raising the bar — add subplot or annotation requirement |

### 2b. Sandbox / Library Constraints

| Lesson ID | Issue | Recommendation |
|-----------|-------|----------------|
| `geospatial-04-c1` | Uses `await micropip.install('folium')` inside `starterCode`; folium's Pyodide compatibility is uncertain and the expected output (`Lat: 40.71, Lon: -74.0\nZoom: 12`) relies on a specific internal API | Test folium in the sandbox and update or remove if it cannot run reliably |
| `geospatial-04-c2` | Same folium dependency | Same as above |

### 2c. Mock Implementation

| Lesson ID | Issue | Recommendation |
|-----------|-------|----------------|
| `sentiment-02-c1` ("Finding the Happiest Tweet") | Uses a `MockVader` class instead of the real `vaderSentiment` library because Pyodide cannot install it; `expectedOutput` is `'I LOVE CODING!!!'` | Add a comment in the lesson prose explaining the mock is a simplified stand-in; alternatively explore if `vaderSentiment` is now available on Pyodide |

### 2d. Possibly Too Simple

| Lesson ID | Issue | Recommendation |
|-----------|-------|----------------|
| `rel-mod-02-c2` ("Relation Extraction") | Task reduces to checking whether a variable equals the string `"written_by"` | Consider replacing with a real extraction step (e.g., pattern matching on a sentence) to match the module's stated complexity |
| `data-viz-01-c1` | Variable assignment to a dict; very little code required | Acceptable as a first-lesson warm-up but could be merged with `c2` if the module length allows |

---

## 3. Placeholder Standardisation Applied

The following changes were made to `src/data/lessons.ts`:

- **12 lines** had their placeholder marker normalised to `# Your code here`.
- `# YOUR CODE HERE` (all-caps) → `# Your code here` — 2 lines
- `# YOUR CODE HERE: <text>` → `# Your code here: <text>` — 1 line
- `# Your code here:` (bare colon, no instruction) → `# Your code here` — 6 lines
- `# Your code here: ` (colon + trailing whitespace) → `# Your code here` — 3 lines

No `# TODO:` markers were changed. No `# Your code here: <meaningful instruction>` markers were changed.

---

## 4. Modules with No Issues

The following modules had no challenge-content fit problems, no placeholder inconsistencies, and well-formed expected outputs:

- Digital Literacy
- Python Basics
- Text Analysis
- Sonification
- Topic Modeling
- Network Analysis
- Generative Poetics
- Critical Data Studies
- Interactive Fiction

---

## 5. Recommended Follow-up Actions

1. **Fix `data-viz-03-c2` expected output** — replace `"plt.show() called"` with a testable string.
2. **Test folium in the Pyodide sandbox** — confirm `geospatial-04-c1` and `c2` actually run; update or replace if they do not.
3. **Revisit `rel-mod-02-c2`** — add a genuine extraction step to match module difficulty.
4. **Add a prose note in `sentiment-02-c1`** — tell learners the lesson uses a simplified mock to explain why VADER scores might differ from the real library.
