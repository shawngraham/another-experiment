nb: this has been accomplished.

# Plan: Make pathwayGenerator.ts Data-Driven

## Problem

`src/utils/pathwayGenerator.ts` has two hardcoded maps that duplicate (and
contradict) the discipline tags already living on each module in `modules.ts`:

```
DISCIPLINE_MODULE_MAP   – covers only 4 of 11 onboarding disciplines
INTEREST_MODULE_MAP     – keys don't match the IDs sent by InterestMapping.tsx
```

Students who pick Philosophy, Religious Studies, Classics, Music, Archaeology,
Anthropology, or Other get zero discipline-specific modules and fall through to
a two-module default. Meanwhile the `disciplines[]` array on every module — which
we just enriched — is never read.

There is also a **silent bug**: `InterestMapping.tsx` sends IDs like
`'text-analysis'`, `'web-scraping'`, `'visualization'` but `INTEREST_MODULE_MAP`
expects keys like `'text analysis'`, `'web scraping'`, `'data visualization'`.
The interest step effectively does nothing for most selections.

---

## Goals

1. Delete `DISCIPLINE_MODULE_MAP`. Replace it with a query against
   `modules[].disciplines`.
2. Fix the interest-ID mismatch so interest selections actually influence the
   pathway.
3. Add a cap / priority so the pathway doesn't balloon to 11 modules for
   well-tagged disciplines like History.
4. Keep the `matchDisciplineModules()` and `getMethodModules()` exports working
   (they're used in tests).

---

## Steps

### 1. Replace `DISCIPLINE_MODULE_MAP` with a dynamic lookup

**File:** `src/utils/pathwayGenerator.ts`

Delete the hardcoded map. Replace it with:

```ts
function modulesForDiscipline(discipline: string): string[] {
  return modules
    .filter((m) => m.disciplines.includes(discipline.toLowerCase()))
    .map((m) => m.id);
}
```

Update `matchDisciplineModules()` to call `modulesForDiscipline()` so the
exported API stays the same.

This means adding a new discipline in the future requires only tagging the
relevant modules in `modules.ts` — zero changes to the generator.

### 2. Fix the interest-ID → module mapping

**Option A (recommended):** Align `INTEREST_MODULE_MAP` keys to the IDs that
`InterestMapping.tsx` actually sends. These are the mismatches:

| UI sends (id)       | Map currently expects      | Fix key to     |
|----------------------|----------------------------|----------------|
| `text-analysis`      | `text analysis`            | `text-analysis` |
| `visualization`      | `data visualization`       | `visualization` |
| `web-scraping`       | `web scraping`             | `web-scraping`  |
| `timelines`          | `creating timelines`       | `timelines`     |
| `mapping`            | `mapping historical events`| `mapping`       |
| `archives`           | `working with archives`    | `archives`      |
| `sentiment`          | *(missing)*                | add `sentiment` |
| `networks`           | *(missing)*                | add `networks`  |
| `topic-modeling`     | *(missing)*                | add `topic-modeling` |
| `data-cleaning`      | *(missing)*                | add `data-cleaning` |
| `metadata`           | *(missing)*                | add `metadata`  |
| `network-analysis`   | `exploring relationships…` | `network-analysis` |
| `regex`              | *(missing)*                | add `regex`     |

After the rename the map becomes:

```ts
const INTEREST_MODULE_MAP: Record<string, string[]> = {
  'text-analysis':    ['text-analysis-fundamentals'],
  'visualization':    ['data-visualization'],
  'web-scraping':     ['web-data-collection'],
  'timelines':        ['data-visualization'],
  'mapping':          ['geospatial-analysis', 'data-visualization'],
  'archives':         ['web-data-collection', 'structured-data'],
  'sentiment':        ['sentiment-analysis'],
  'networks':         ['network-analysis'],
  'topic-modeling':   ['topic-modeling'],
  'data-cleaning':    ['structured-data'],
  'metadata':         ['structured-data'],
  'network-analysis': ['network-analysis', 'relational-models'],
  'regex':            ['text-analysis-fundamentals'],
};
```

**Option B (future):** derive interest → module mapping from `keywords[]` too,
but that's a bigger change and not needed now.

### 3. Cap discipline modules to avoid bloat

History now matches 11 modules. The pathway shouldn't include all of them.

Add a `MAX_DISCIPLINE_MODULES` constant (suggest **4**). After collecting
discipline matches, sort them by some priority signal and take the top N.

Priority order (best available signal):
1. Modules whose `keywords` overlap with the user's `researchInterests`
   (interest-discipline intersection = highest relevance).
2. Modules with fewer prerequisites (more accessible first).
3. Stable fallback: original array order in `modules.ts` (curated by us).

```ts
const MAX_DISCIPLINE_MODULES = 4;

function topModulesForDiscipline(
  discipline: string,
  interests: string[],
): string[] {
  const matches = modulesForDiscipline(discipline);
  // score by keyword overlap with interests
  const scored = matches.map((id) => {
    const mod = modules.find((m) => m.id === id)!;
    const keywordHits = mod.keywords.filter((k) =>
      interests.some((i) => i.includes(k) || k.includes(i))
    ).length;
    const prereqCount = mod.prerequisites.length;
    return { id, score: keywordHits * 10 - prereqCount };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, MAX_DISCIPLINE_MODULES).map((s) => s.id);
}
```

### 4. Update `generatePathway()` to use the new functions

The main function body changes only slightly:

```ts
// Replace:
const disciplineModules = DISCIPLINE_MODULE_MAP[discipline] || [];

// With:
const disciplineModules = topModulesForDiscipline(discipline, interests);
```

Everything else (foundation modules, interest modules, fallback, hour
calculation) stays the same.

### 5. Update the fallback for `"other"` discipline

`"other"` will match zero modules (no module is tagged `other`). Keep the
existing fallback: if total modules <= 2, add `text-analysis-fundamentals` +
`data-visualization`. This is already correct behaviour.

### 6. Update tests

**File:** `src/__tests__/pathwayGenerator.test.ts`

- Remove any tests that assert against the hardcoded map contents.
- Add tests that verify:
  - `modulesForDiscipline('religious-studies')` returns a non-empty array.
  - `modulesForDiscipline('classics')` returns modules that actually have
    `'classics'` in their `disciplines`.
  - `generatePathway()` with discipline `'music'` produces a pathway with
    music-relevant modules (not just the two-module default).
  - The cap works: `generatePathway()` with discipline `'history'` doesn't
    include all 11 matched modules.
  - Interest IDs from the UI (e.g. `'text-analysis'`, `'web-scraping'`) now
    actually resolve to modules.

### 7. Delete dead code

- Delete the `DISCIPLINE_MODULE_MAP` constant entirely.
- Delete `matchDisciplineModules()` if it has no callers outside tests; or
  repoint it to `modulesForDiscipline()`.

---

## Files touched

| File | Change |
|------|--------|
| `src/utils/pathwayGenerator.ts` | Delete hardcoded map, add dynamic lookup + cap, fix interest keys |
| `src/__tests__/pathwayGenerator.test.ts` | Update/add tests for dynamic behaviour |

No changes to `modules.ts`, types, or UI components.

---

## Risks & edge cases

- **Performance:** `modulesForDiscipline()` is O(modules × disciplines) but
  with 15 modules this is trivial. No caching needed.
- **"Other" discipline:** matches nothing, falls through to default — this is
  acceptable.
- **New modules added later:** automatically picked up if they have
  `disciplines` tags. No generator changes needed.
- **Interest-ID drift:** if someone edits `InterestMapping.tsx` IDs they must
  update `INTEREST_MODULE_MAP` too. A future improvement could derive the map
  from module keywords, but that's out of scope here.
