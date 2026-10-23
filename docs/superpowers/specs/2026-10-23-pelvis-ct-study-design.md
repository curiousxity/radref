# Pelvis CT for pain or injury

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The pelvis region, done the same way as the other regions. The author chose:

- **Exam:** pelvis CT.
- **History:** "pain or injury": no injury, a low-energy injury, or a high-energy injury.
  With pain alone the study looks hardest at insufficiency fractures; after a low-energy fall,
  at the hips.
- **Calculators:** both Young-Burgess (pelvic ring) and Letournel (acetabulum), each a page of
  its own, with their sources in `docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md`.

## Goals

1. `/studies/pelvis-ct` on the study framework, with Report, Learn and Quiz tabs.
2. `/young-burgess` and `/letournel`, with their rules in `src/logic/youngburgess.ts` and
   `src/logic/letournel.ts`, shared with the study so they cannot disagree.
3. Linked through `related`: the study lists `/young-burgess`, `/letournel` and `/pelvis-si`;
   each calculator lists `/pelvis-si`.
4. Labelled an unchecked draft, pinned by tests.

## Non-goals

- Tile and AO/OTA pelvic classifications, and the fragility fracture (Rommens) classification.
- AO Spine sacral classification; the study uses Denis zones.
- Pelvic radiographs and hip MRI.
- Management advice (embolization, fixation). The study reports findings only.
- No change to the 3D pelvis viewer.

## Search pattern

1. History and technique.
2. Pelvic ring: Young-Burgess type, symphyseal diastasis, L5 transverse process.
3. Sacrum: traumatic or insufficiency fracture, Denis zone, U or H shape.
4. Acetabulum: Letournel type, extra posterior wall fragment, femoral head, fragments,
   impaction, articular gap.
5. Proximal femora.
6. Active arterial extravasation, hematoma, bladder.
7. Other findings and the impression.

## Calls made for the builder

- In the study the Young-Burgess and Letournel types are picked from a list, as in the other
  studies; the calculators work them out from questions.
- Young-Burgess calculator: vertical displacement names the type first (with lateral
  compression it is CMI, otherwise VS); then lateral compression (LC III when the other side is
  opened); then AP compression graded by the sacroiliac joint. The symphysis diastasis is only a
  prompt: over 2.5 cm with the sacroiliac joints read as normal asks for a second look.
- Letournel calculator: column lines, posterior wall, obturator ring, joint surface on the
  intact ilium, then stem against hemitransverse. A combination Letournel did not name (anterior
  column or wall with a posterior wall fragment) gets no type. A posterior wall fragment beside
  a T-shaped, hemitransverse or both-column fracture is written as an addition.
- Active bleeding goes first in the impression (the site's own order).
- The "MRI is more sensitive" chip shows after pain or a low-energy fall when no hip fracture
  is entered, not after a high-energy injury.
