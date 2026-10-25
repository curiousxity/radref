# Suprahyoid neck CT and MRI

Date: 2026-10-25 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The first head and neck region after the author's decision (2026-10-25) that the head and neck
viewers get a study each and no calculator. The author chose:

- **Order:** suprahyoid neck first, then the larynx and the skull base.
- **Exams and histories:** all three offered: CT for a neck mass, MRI for a neck mass, and CT
  for infection (sore throat, fever or swelling).
- **Layout:** one study per region. Its first step asks the exam (CT or MRI) and the history
  (mass or infection), and the later steps and the report follow that choice.

## Goals

1. `/studies/suprahyoid-neck` on the study framework, with Report, Learn and Quiz tabs.
2. Linked to `/suprahyoid-spaces` through `related` (declared on the study).
3. Labelled an unchecked draft, pinned by tests, with every claim in
   `docs/superpowers/research/2026-10-25-suprahyoid-neck-sources.md`.

## Non-goals

- The infrahyoid neck, the larynx and the skull base (their own studies).
- TNM staging of a primary tumour, and a nodal staging rule.
- Thyroid, salivary gland ultrasound and PET.
- Management advice (drainage, antibiotics, surgery). The study reports findings only.
- No change to the 3D viewer.

## Search pattern

1. Exam, history and technique.
2. The mass or the collection: for a mass, which space it starts in, read from the way the
   parapharyngeal fat is pushed and the signs around it; for infection, the collection, the
   spaces it fills and its source.
3. Spread: perineural spread and denervation (mass), bone erosion (both), the airway, the
   internal jugular vein and the mediastinum (infection).
4. Lymph nodes.
5. Other findings and the impression.

## Calls made for the builder

- Mass and infection share step 2, with the fields switching on the history, so a hidden step
  never leaves a gap in the step numbers.
- The fat-shift rule names a space; the space entered is the reader's call, with a warning when
  the two disagree.
- The "usual lesions" chip lists Harnsberger and Osborn's lesions for the seven classic spaces
  only; the buccal, sublingual and submandibular spaces get no list.
- Flow voids are asked only on MRI.
- The node size chip applies van den Brekel's minimal axial diameter: 11 mm in level II, 10 mm
  elsewhere, at or over the figure. Retropharyngeal nodes get no size chip.
- Impression order (the site's own): airway narrowing, mediastinal extension, the collection or
  mass, jugular vein thrombosis, spread, bone, nodes.
