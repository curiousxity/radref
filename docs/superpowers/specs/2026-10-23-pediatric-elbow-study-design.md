# Pediatric elbow radiographs study

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

Part of the elbow region (with the adult elbow MRI study and the Mason calculator). The
author asked for a pediatric elbow "based on ages and common pediatric fractures", and chose:

- **Format:** a study page for pediatric elbow **radiographs** (Report, Learn, Quiz).
- **Age first:** the report starts with the child's age and says which ossification centres
  should be visible by then (CRITOE).
- **Gradings:** Gartland (supracondylar), lateral condyle displacement, medial epicondyle
  avulsion (displacement and entrapment), radial neck angulation.
- **No separate calculator.** The age and grading rules live in the study file.

## Goals

1. A new study, `/studies/pediatric-elbow`, on the study framework (`src/study/`,
   `StudyDefinition`), like the knee and shoulder studies.
2. Linked to the 3D elbow model: `related: ['/elbow']`, declared on the study.
3. Every rule, age and grade comes from a cited paper that states it, pinned by a test
   quoting the claim.
4. Labelled as an unchecked draft (see Blocker).

## Non-goals

- No change to the 3D elbow viewer or to any other study or calculator.
- No CT, MRI or ultrasound teaching.
- No treatment advice: the gradings are described, not turned into management.

## Anti-goals

- An age, threshold or grade that its cited paper does not say.
- Treating the CRITOE ages as hard limits. They are approximate; the missing-centre warning
  says "usually present by about age N" and that ages vary.

## Content

### Report tab: search pattern

1. **Technique:** views (AP and a true lateral at 90°), and the child's age.
2. **Ossification centres:** each of the six seen or not seen. Chips list which are expected
   by this age (CRITOE, one source's ages). Warnings: an expected centre not seen; an ossified
   trochlea with no medial epicondyle (possible entrapped medial epicondyle).
3. **Fat pads:** anterior normal or elevated; posterior not seen or visible. A visible
   posterior fat pad with no fracture entered gives an "occult fracture likely" impression
   line (Skaggs and Mirzayan).
4. **Alignment lines:** anterior humeral line (middle third, anterior third, anterior to the
   capitellum, posterior third or behind it), with the under-4 caveat; radiocapitellar line.
5. **Supracondylar fracture:** Gartland I–III.
6. **Lateral condyle fracture:** displacement in mm and articular surface; Weiss I–III.
7. **Medial epicondyle avulsion:** displacement (descriptive), entrapment in the joint.
8. **Radial head and neck:** angulation; O'Brien I–III.
9. **Dislocation, olecranon and variants:** elbow dislocation and direction, olecranon
   fracture, supracondylar process (its own impression line).
10. **Other findings and impression.**

### Learn tab and Quiz

The lesson section by section, matching the steps; 8–12 quiz questions.

## Registry

`src/data/calculators.ts`, Studies category, Musculoskeletal group (kept with the other
musculoskeletal studies):

```ts
{ path: '/studies/pediatric-elbow', name: 'Pediatric elbow radiographs', group: 'Musculoskeletal', related: ['/elbow'], … }
```

## Blocker and unchecked state

PubMed, Crossref, doi.org and Europe PMC are blocked in this environment. As for the knee and
shoulder, the author chose to draft now and check later: references from memory with no DOI,
plain-text citations, and a source note starting "Unchecked draft", all pinned by tests. Every
claim is in `docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md` marked "to
check". The branch must not be merged to `main` before that check.

## Calls made for the builder (open to the author's correction)

- **One source for ages:** the approximate 1-3-5-7-9-11 ages from Iyer et al., with Cheng et
  al.'s point that measured ages vary and girls are earlier, as text only.
- **Weiss rather than Jakob** for the lateral condyle chip, since Weiss gives a measurable
  2 mm threshold; Jakob is described in the lesson.
- **O'Brien rather than Judet** for the radial neck chip, since O'Brien grades by angulation
  alone, which a radiograph gives; Judet is mentioned.
- **No medial epicondyle displacement threshold,** since radiographic measurement is
  unreliable (Edmonds) and the surgical thresholds are debated.
- **Left out:** pulled elbow, Wilkins IIA/IIB, sex-specific ages (see the sources file).
