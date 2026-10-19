# Ankle MRI Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/studies/ankle-mri`, a Report/Learn/Quiz study for ankle MRI with a "pain only" history, linked to the 3D ankle model.

**Architecture:** One content declaration, `src/studies/AnkleMriStudy.tsx`, which defines a `StudyDefinition` (`src/study/types.ts`) and renders `<StudyPage>`. It is pinned by `src/studies/AnkleMriStudy.test.ts` through `src/study/testing.ts`. A sourced claims file is written first and committed under `docs/superpowers/research/`, so every rule in the study traces back to a PubMed-checked paper.

**Tech Stack:** React 19, TypeScript, vitest (node environment).

**Spec:** `docs/superpowers/specs/2026-10-19-ankle-mri-study-design.md`

## Global Constraints

- Every threshold, grade, rule chip and management statement comes from a cited paper that states it. If a claim does not match its paper, omit the rule, keep a descriptive field, and list the omission in the handoff. Never quietly reword a claim.
- Every reference is checked against PubMed or Crossref. Use the DOI when one exists. Citation text must match the real paper.
- `sourceNote` reads: "Draft lesson compiled from the papers below; citations checked against PubMed in October 2026. Not yet reviewed by the site author."
- Registry entry: path `/studies/ankle-mri`, name `Ankle MRI`, group `Musculoskeletal`, `related: ['/ankle']`, no `tag`.
- There is no ankle calculator. Weber and Lauge-Hansen appear nowhere.
- Report steps follow the order in the spec: 12 steps, technique through impression.
- Quiz has 8–12 questions, each with an explanation that cites the lesson.
- Tests go through `studyOf` / `report` / `chips`, modelled on `src/studies/RectalMriStudy.test.ts`. Each case carries a comment quoting the source sentence it comes from.
- Use theme tokens only (`src/styles.test.ts`). Do not change any other study, calculator or viewer.
- Gate every task on `npm run lint && npm test && npm run build`. Do not start a dev server or browser. Work on `design-update` in `C:\Users\mezud\OneDrive\Desktop\radref-design`. Do not merge or push.

## Review Focus

- A report with only some steps entered: unentered findings write no line, and required items left blank appear in the "check before signing" warnings. Pinned in Task 3.
- Contradictory entries, such as a ligament marked "complete tear" while the impression step says "no ligament injury", or a tendon "intact" with "tear" findings, must produce a warning. Pinned in Task 3.
- Hidden follow-up fields, such as tear-grade fields shown only when a tear is selected, must not leak into the report once hidden. Pinned in Task 3 via `report()`, which drops hidden-field answers.
- A completely normal study must produce a clean normal report and impression with no warnings. Pinned in Task 3.
- A citation whose DOI resolves to a different paper. Pinned in Task 1 by the verification table.

---

### Task 1: Sources and claims

**Files:**
- Create: `docs/superpowers/research/2026-10-19-ankle-mri-sources.md`

**Interfaces:**
- Produces: a reference list (citation text plus DOI) and a claims table. Each row holds: step id, claim, rule (if any, with exact threshold or grade wording), source (DOI), the quoted sentence or paraphrase with its location in the paper, and verified yes/no. Tasks 2–4 may use only claims marked verified, and may cite only references in this file.

- [ ] **Step 1:** Choose 8–15 references covering all 12 steps. Use review articles on ankle MRI, plus original papers wherever a step states a grading (lateral ligament injury, syndesmosis, tibialis posterior tears, peroneal split tears, Achilles, osteochondral lesions of the talus, impingement, sinus tarsi, tarsal tunnel, plantar fascia).
- [ ] **Step 2:** For each reference, query Crossref (`https://api.crossref.org/works?query.bibliographic=...`) and PubMed, and record the matched title, authors, journal, year, volume, pages and DOI. Drop any reference that cannot be matched with confidence.
- [ ] **Step 3:** Fill the claims table. A rule may be marked verified only when its wording is supported by the abstract or by text you could read. Otherwise mark it unverified, with the reason.
- [ ] **Step 4: Commit** `Add the ankle MRI sources and claims table`.

### Task 2: Lesson (Learn tab) and references

**Files:**
- Create: `src/studies/AnkleMriStudy.tsx` (the `learn`, `references`, `sourceNote`, `slug`, `name` and `lede` fields; `report.steps` empty and `quiz: []` for now, if the types allow; otherwise a minimal single placeholder step that Task 3 replaces)
- Modify: `src/data/calculators.ts` (registry entry, per Global Constraints, placed in the Studies list as the first item of a new `Musculoskeletal` group run)

**Interfaces:**
- Consumes: the verified claims and references from Task 1.
- Produces: `export function AnkleMriStudyPage()`, and learn-section ids, one per report step, so Task 3 can set `learn` on each step. Use these ids exactly: `technique`, `bones`, `lateral-ligaments`, `syndesmosis`, `medial-ligaments`, `medial-tendons`, `lateral-tendons`, `posterior`, `anterior`, `spaces`, `plantar`, `impression`.

- [ ] **Step 1:** Write the 12 learn sections from verified claims only, with an inline `<Cite doi>` for each claim. Follow the style of `src/studies/ThyroidUsStudy.tsx`.
- [ ] **Step 2:** Add the registry entry. Check that `relatedTo('/ankle')` now includes the study, by adding an assertion to `src/data/calculators.test.ts`.
- [ ] **Step 3: Verify** with lint, test and build. **Commit** `Add the ankle MRI lesson`.

### Task 3: Report tab

**Files:**
- Modify: `src/studies/AnkleMriStudy.tsx` (`report.steps`, `report.initial`, `build`)
- Create: `src/studies/AnkleMriStudy.test.ts`

**Interfaces:**
- Consumes: the learn ids from Task 2 and the verified rules from Task 1.
- Produces: step ids equal to the learn ids. Field ids are unique across the study and use kebab-case with a step prefix, e.g. `atfl`, `atfl-grade`, `ptt`, `ptt-tear-type`.

- [ ] **Step 1: Write failing tests** in `AnkleMriStudy.test.ts`:
  - `normal`: a complete normal values object (`const normal: Values`). `report(study, normal).warnings` equals `[]`, and the impression states no acute abnormality, in the wording you choose for the build.
  - `partial entry`: only `atfl: 'complete'` is entered. The report has an ATFL line, and the warnings list the unanswered required items.
  - `contradiction`: an ATFL complete tear plus the impression "no ligament injury". The warnings include the contradiction.
  - `hidden fields`: setting a tear-type field while its parent is `intact` writes no tear-type text.
  - For every verified rule in Task 1's table: a boundary case through `chips(study, stepId, values)`, with a comment quoting its source sentence.
- [ ] **Step 2: Run** `npx vitest run src/studies/AnkleMriStudy.test.ts` and expect it to FAIL.
- [ ] **Step 3: Implement** the 12 steps. Each step's `teach` panel quotes the lesson. `derive` covers only verified rules. `build` writes a structured report with one line per entered finding, omitting unentered ones, and an impression. Its warnings cover required blanks and contradictions.
- [ ] **Step 4: Run** the test and expect it to PASS. **Verify** with lint, test and build. **Commit** `Add the ankle MRI report builder`.

### Task 4: Quiz, docs and handoff list

**Files:**
- Modify: `src/studies/AnkleMriStudy.tsx` (`quiz`), `CLAUDE.md` (Studies section: add Ankle MRI to the list of studies drafted from the literature)
- Modify: `docs/superpowers/research/2026-10-19-ankle-mri-sources.md` (append an "Omitted claims for the author" section)

**Interfaces:**
- Consumes: the learn sections from Task 2.

- [ ] **Step 1:** Write 8–12 quiz questions from the lesson. Each `explanation` cites the lesson with a `<Cite>` where there is one.
- [ ] **Step 2:** Add to `AnkleMriStudy.test.ts`: `quiz has 8–12 questions, every answer index in range`.
- [ ] **Step 3:** List every claim or rule left out because it was unverified or did not match its paper, in the new "Omitted claims for the author" section.
- [ ] **Step 4: Verify** with lint, test and build. **Commit** `Add the ankle MRI quiz and document the study`.
