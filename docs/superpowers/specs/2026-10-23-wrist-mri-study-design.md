# Wrist MRI study (region 5)

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

Fifth region after the ankle, knee, shoulder and elbow, done the same way. The author chose:

- **Exam:** wrist MRI.
- **History:** "pain or injury". The study walks a complete fixed search pattern but leans on
  injury patterns where they help: a fall on the outstretched hand, the occult scaphoid
  fracture, the perilunate sequence, ligament tears.
- **Calculators:** four, each its own page with shared logic the study uses: Mayfield
  (perilunate instability), Herbert (scaphoid fracture), Palmer (TFCC tears) and Lichtman
  (Kienböck disease). The calculators are specified with their own sources file,
  `docs/superpowers/research/2026-10-23-wrist-calculators-sources.md`.
- **Post-operative wrists:** out of scope.
- **Variants** get their own impression line (lunate type II, carpal boss / os styloideum,
  accessory muscle, bifid median nerve, persistent median artery).

## Goals

1. `/studies/wrist-mri` on the study framework, with Report, Learn and Quiz tabs.
2. The study uses `src/logic/mayfield.ts`, `herbert.ts`, `palmer.ts` and `lichtman.ts`
   rather than re-describing the classifications, so a fix there changes both.
3. Linked through `related: ['/wrist', '/mayfield', '/herbert', '/palmer', '/lichtman']`,
   declared on the study.
4. Labelled an unchecked draft: references with no DOI, plain-text citations, source note
   starting "Unchecked draft", pinned by tests.

## Non-goals

- No post-operative wrist content.
- No change to the 3D wrist viewer or to any other study or calculator.
- No distal radius fracture classification.

## Search pattern

1. History, technique and the global look (mechanism, effusion, marrow).
2. Bones and marrow: scaphoid fracture (Herbert), other carpal fractures (hook of hamate,
   dorsal triquetral avulsion), distal radius, the lunate (diffuse signal → Kienböck with
   Lichtman; focal ulnar-side signal → ulnar impaction).
3. Scapholunate ligament (dorsal, membranous, volar parts) and the scapholunate angle (DISI).
4. Lunotriquetral ligament (VISI).
5. Perilunate injury (Mayfield).
6. TFCC (Palmer) and ulnar variance.
7. Extrinsic ligaments.
8. Extensor compartments: first compartment (de Quervain), intersection syndrome, ECU.
9. Flexor tendons and carpal tunnel (median nerve).
10. Guyon canal (ulnar nerve).
11. Ganglia and synovium.
12. Variants.
13. Other findings and the impression.

## Calls made for the builder

- The Mayfield stage is computed only when a perilunate injury is entered, so an isolated
  scapholunate tear is not labelled "Mayfield stage I".
- A Mayfield stage III or IV with an intact scapholunate ligament and no scaphoid fracture is
  a warning (W5-2).
- The scapholunate angle bounds (W3-2) come from radiographs; the help text says so.

## Blocker

The cloud environment blocks PubMed and Crossref. Every claim is in
`docs/superpowers/research/2026-10-23-wrist-mri-sources.md`, marked "to check". The branch
must not be merged to `main` (which deploys) before that check.
