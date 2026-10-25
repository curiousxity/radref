# Larynx CT and MRI

Date: 2026-10-25 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The second head and neck study, after the suprahyoid neck. The author chose (2026-10-25):

- **Exams and histories:** CT for a known cancer, MRI for a known cancer, CT for hoarseness.
- **Layout:** one study; step 1 asks the exam and the history, and the later fields follow.
- No calculator.

## Goals

1. `/studies/larynx` on the study framework, with Report, Learn and Quiz tabs.
2. Linked to `/larynx` through `related` (declared on the study).
3. Written with PubMed, Crossref and Europe PMC reachable: every reference matched and every claim
   read in an abstract or open full text before it went in, in
   `docs/superpowers/research/2026-10-25-larynx-sources.md`.

## Non-goals

- Hypopharyngeal cancer staging, PET, and the treated larynx.
- A full T stage: T1, T2 and T3 from cord fixation rest on endoscopy, so the study gives only
  the category imaging findings set ("at least T3", T4a, T4b).
- Management advice (which operation, radiotherapy).
- No change to the 3D viewer.

## Search pattern

1. Exam, history and technique (CT to the aortopulmonary window for hoarseness).
2. The cords (hoarseness: paralysis signs, level, cause) and the tumour (subsite, side, size,
   transglottic, the spaces under the mucosa).
3. Cartilage (CT signs or the MRI signal rule), thyroid cartilage depth, tissues beyond the
   larynx, and the T category imaging sets.
4. Lymph nodes.
5. Other findings and the impression.

## Calls made for the builder

- The tumour fields show for a known cancer that is seen, or a laryngeal mass found on a
  hoarseness CT.
- The imaging T category follows Connor's AJCC tables subsite by subsite. A subglottic tumour
  gets T3 from nothing imaging shows (its T3 is cord fixation), so its paraglottic fat and inner
  cortex do not set T3.
- Through the thyroid cartilage is T4a, as the T4a row's "laryngeal cartilage" in Connor's table
  is read; the eighth edition's exact cartilage wording is still to check.
- Cartilage signs are entered for the one cartilage most involved.
- Node size reuses van den Brekel's rule from the suprahyoid neck study (11 mm subdigastric,
  10 mm elsewhere).
