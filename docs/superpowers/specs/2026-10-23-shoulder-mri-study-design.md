# Shoulder MRI study and Neer calculator (region 3)

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

Third region, after the ankle pilot and the knee, done the same way. The author chose:

- **Exam:** shoulder MRI.
- **History:** "pain" and nothing else, as for the ankle and knee, so the study walks a fixed,
  complete search pattern.
- **Calculator:** **Neer** (proximal humerus fractures), set up like Schatzker: its own page in
  the Trauma category, with the rules in shared logic used by the study too.
- **Post-operative scope:** the repaired rotator cuff only (intact repair or re-tear). No labral
  repair, no arthroplasty.
- **Variants:** each anatomical variant (sublabral foramen, Buford complex, sublabral recess,
  os acromiale) gets its own impression line.

The paper databases were unreachable from the cloud environment, so the author chose to draft
now with every unchecked fact marked, and to check them on a computer before merging.

## Goals

1. `/studies/shoulder-mri` on the study framework: Report, Learn and Quiz tabs.
2. `/neer`, a calculator giving the Neer type from the four fracture lines, with
   displacement and angulation entered per line, plus fracture-dislocation and articular
   surface options, and copyable report text.
3. Neer rules once, in `src/logic/neer.ts`, used by the calculator and by the study's bones step.
4. `related`: the study lists `['/shoulder', '/neer']`; the calculator lists `['/shoulder']`.
5. Labelled as an unchecked draft (`sourceNote` "Unchecked draft: …") until the sources are
   checked, then as an unreviewed draft until the author signs it off.

## Non-goals

- No change to the 3D shoulder viewer or any other study or calculator.
- No other proximal humerus classification (AO/OTA, Hertel).
- No MR arthrography protocol, no labral repair or arthroplasty imaging.
- No acromion shape grading (Bigliani) for now.

## Search pattern (13 steps)

1. Technique and the global look: planes, sequences, effusion, marrow.
2. Bones and marrow: Hill-Sachs (and the normal groove), fracture with Neer from the shared logic.
3. Supraspinatus and infraspinatus: partial (Ellman side and depth), full-thickness (width,
   Patte retraction), Goutallier fat grade.
4. Subscapularis and teres minor.
5. Long head of biceps: tendon and position.
6. Labrum: anteroinferior (Bankart, bony Bankart, Perthes, ALPSA, GLAD), superior (Snyder SLAP
   I–IV), posterior.
7. Capsule and glenohumeral ligaments: HAGL.
8. Acromioclavicular joint and subacromial-subdeltoid bursa.
9. Cartilage.
10. Nerves, cysts and denervation: paralabral cyst site (Fritz), teres minor and quadrilateral
    space (Linker).
11. Repaired rotator cuff, shown only after a previous repair: Sugaya types; IV and V are
    re-tears.
12. Normal variants, each with its own impression line.
13. Other findings and the impression.

Warnings ("check before signing"): pertinent negatives that contradict entered findings; a
paralabral cyst with an intact labrum; a medially displaced biceps with no subscapularis tear;
a type II SLAP tear and a sublabral recess both entered.

## Registry lines to add

Studies category, Musculoskeletal group (keep next to ankle and knee MRI):

```ts
{ path: '/studies/shoulder-mri', name: 'Shoulder MRI', group: 'Musculoskeletal', related: ['/shoulder', '/neer'], description: 'Shoulder MRI step by step: bones, rotator cuff, biceps, labrum, ligaments, nerves, the repaired cuff, variants and the report.', keywords: ['shoulder', 'mri', 'rotator cuff', 'supraspinatus', 'infraspinatus', 'subscapularis', 'biceps', 'labrum', 'slap', 'bankart', 'hill-sachs', 'alpsa', 'glad', 'hagl', 'paralabral cyst', 'suprascapular', 'quadrilateral space', 'goutallier', 'patte', 'ellman', 'sugaya', 'cuff repair', 'buford', 'sublabral', 'os acromiale', 'musculoskeletal', 'msk', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/ShoulderMriStudy'), 'ShoulderMriStudyPage') },
```

Trauma category:

```ts
{ path: '/neer', name: 'Neer (proximal humerus)', related: ['/shoulder'], description: 'Neer parts for proximal humerus fractures from displacement and angulation, with fracture-dislocations and report text.', keywords: ['neer', 'proximal humerus', 'humerus', 'humeral head', 'surgical neck', 'anatomical neck', 'greater tuberosity', 'lesser tuberosity', 'fracture-dislocation', 'head-splitting', 'shoulder', 'fracture', 'musculoskeletal', 'msk'], component: lazyPage(() => import('../pages/NeerPage'), 'NeerPage') },
```

Also: `calculators.test.ts` asserts `relatedTo('/shoulder')` includes both; `CLAUDE.md` adds
Neer to "Current calculators", `neer.ts` to the shared-logic list, and Shoulder MRI to the
Studies list as an unchecked draft.

## Sources

`docs/superpowers/research/2026-10-23-shoulder-mri-sources.md`: 22 references and the claims
table, every row "to check", with the steps for checking them.

## Blocker

PubMed, PubMed Central, Crossref, doi.org and Europe PMC are blocked from the cloud
environment. The checks are listed under "To do when on a computer" in
`docs/REMAINING_TASKS.md`. Do not merge to `main` before they are done.
