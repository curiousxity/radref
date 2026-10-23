# Spine CT for pain or injury

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The spine region, done the same way as the other regions. The author chose:

- **Exam:** spine CT.
- **History:** "pain or injury": no injury, a low-energy injury, or a high-energy injury.
  With pain alone the study looks hardest at vertebral collapse (osteoporotic or malignant).
- **Calculator:** AO Spine (subaxial cervical and thoracolumbar) rather than SLIC and TLICS,
  with its sources in `docs/superpowers/research/2026-10-23-spine-calculators-sources.md`.

## Goals

1. `/studies/spine-trauma-ct` on the study framework, with Report, Learn and Quiz tabs.
2. The study uses `src/logic/aospine.ts`, so it and the calculator cannot disagree.
3. Linked through `related: ['/ao-spine', '/cervical-spine', '/lumbar-spine']`, declared on the
   study.
4. Labelled an unchecked draft, pinned by tests.

## Non-goals

- Upper cervical (C0–C2) AO Spine classification; C0–C2 is covered by measurements and the
  odontoid type instead.
- Neurology: it comes from the examination, so the study's AO code leaves it out.
- Spine MRI, and degenerative disease.
- No change to the 3D spine viewers.

## Search pattern

1. History, technique, coverage and an ankylosed spine.
2. Craniocervical junction and C1–C2: basion–dens and atlantodental intervals, condyles, C1
   and lateral mass overhang, odontoid type, other C2 fractures.
3. Subaxial cervical spine: AO Spine type, body type, facets right and left.
4. Thoracolumbar spine: AO Spine type and body type.
5. Vertebral arteries: expanded Denver criteria.
6. Vertebral collapse without major trauma: Genant grade, benign or malignant features.
7. Canal and soft tissues.
8. Other findings and the impression.

## Calls made for the builder

- Coverage decides which steps ask questions: a thoracolumbar CT never asks about C1.
- The AO type is picked from a list in the study, as in the other studies; the calculator
  works it out from questions.
- An ankylosed spine adds the region's modifier (M3 in the neck, M2 thoracolumbar) to the AO
  code automatically.
- The Denver chip uses what the form can see: C1, odontoid or other C2 fracture, a foramen
  fracture, subaxial type C or an F4 facet.
