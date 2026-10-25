# Skull base MRI and CT

Date: 2026-10-25 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The third head and neck study, after the suprahyoid neck and the larynx. The author chose
(2026-10-25):

- **Exams and histories:** MRI for a cranial nerve palsy, MRI for perineural spread, CT for a
  skull base mass.
- **Layout:** one study; step 1 asks which of the three, and the later fields follow.
- No calculator.

## Goals

1. `/studies/skull-base` on the study framework, with Report, Learn and Quiz tabs.
2. Linked to `/skull-base` through `related` (declared on the study).
3. Written with PubMed, Crossref, Europe PMC and Unpaywall reachable: every reference matched and
   every claim read before it went in, in `docs/superpowers/research/2026-10-25-skull-base-sources.md`.

## Non-goals

- Fractures, skull base infection, the sella and the temporal bone (its own study).
- Diagnosis by name from the findings: the chips say what each pattern was in the papers, and
  the impression describes the findings; the radiologist names the lesion.
- Management advice.
- No change to the 3D viewer.

## Search pattern

1. Which study, and the technique: SSFP and contrast T1 for a palsy, coronal T1 and contrast T1
   for perineural spread, bone-algorithm CT for a mass.
2. The nerve or the site: the palsied nerve and side; the primary and its histology; the site of
   the mass.
3. Along the nerve, or the bone: the cause and its segment, facial nerve enhancement,
   denervation; the signs of perineural spread and the most central point reached; the bone
   margins, matrix and extension of a mass.
4. Other findings and the impression.

## Calls made for the builder

- One required "Study" field stands in for the exam and the history, since each history has one
  exam.
- Every nerve is followed brainstem, cistern, skull base, outside the skull: Thompson's
  segmental approach for the hypoglossal nerve, generalised as this site's own order.
- Denervation is asked for a V or XII palsy and for spread along V3, the two nerves Russo studied.
- The jugular foramen margin options follow Caldemeyer 1997, Macdonald and Eldevik; the chip for
  infiltrative destruction names paraganglioma or metastasis, as Caldemeyer does.
- The salt-and-pepper chip uses Olsen's 2 cm, as the suprahyoid neck study does.
