# Adult injury X-ray studies: knee, elbow, wrist, hand, ankle, foot

Date: 2026-11-01 · Branch: `claude/xray-studies`

## Intent

The author asked for study pages on common X-ray fractures of the knee, elbow, wrist, hand, ankle
and foot (2026-11-01): one study per joint, for adults, each with a history of injury. Children
stay on the existing paediatric elbow radiograph study, linked from the elbow study. The author
also asked for the Ottawa rules and the scaphoid views, and chose Weber in the ankle study (named
in the report, no separate calculator, as with the ankle MRI study's earlier choice of no Weber
calculator).

## Goals

1. Six studies on the study framework (Report, Learn and Quiz tabs), members pages
   (`membersPage`), each in its region beside the MRI study and linked through `related` to the
   region's calculators and pages:

   | Study | Path | Region | Linked |
   |---|---|---|---|
   | Knee X-ray for injury | `/studies/knee-xray` | Knee | `/schatzker`, `/studies/knee-mri`, `/knee` |
   | Elbow X-ray for injury | `/studies/elbow-xray` | Elbow | `/mason`, `/studies/elbow-mri`, `/studies/pediatric-elbow`, `/elbow` |
   | Wrist X-ray for injury | `/studies/wrist-xray` | Wrist and hand | `/herbert`, `/mayfield`, `/studies/wrist-mri` |
   | Hand X-ray for injury | `/studies/hand-xray` | Wrist and hand | `/studies/wrist-xray` |
   | Ankle X-ray for injury | `/studies/ankle-xray` | Ankle and foot | `/studies/ankle-mri`, `/fifth-metatarsal`, `/studies/foot-xray` |
   | Foot X-ray for injury | `/studies/foot-xray` | Ankle and foot | `/myerson`, `/sanders`, `/hawkins`, `/fifth-metatarsal`, `/studies/foot-mri` |

   (Paths of existing pages to be checked against `src/data/calculators.ts` before linking.)
2. Each written with every reference matched on PubMed and Crossref and every claim read in an
   abstract or open full text before it goes in, quotes in
   `docs/superpowers/research/2026-11-01-<joint>-xray-sources.md`. Classification wording reuses
   the site's calculators where they exist (same definitions, same citations), so a study never
   contradicts its calculator. No "Unchecked draft".

## Non-goals

- Example scans (a separate pass).
- Children's fractures (the paediatric elbow study covers the elbow).
- Treatment decisions beyond what a source states.

## Shared shape (each study)

1. Why the film: the injury and mechanism; the decision rule that applies (Ottawa knee rule for
   the knee; Ottawa ankle and foot rules for the ankle and foot), given as the reason imaging was
   indicated, cited to the original derivation or validation papers.
2. Views and technique: the standard series and the extra views (horizontal-beam lateral for a
   lipohaemarthrosis; the scaphoid series for the wrist; mortise view for the ankle; oblique for
   the foot), and adequacy.
3. Alignment and joint spaces: the joint's lines and measurements.
4. Bones, fracture by fracture, each with its signs and the calculator link where there is one.
5. Soft tissues: effusion, fat pads, lipohaemarthrosis, swelling.
6. Impression, with "consider MRI or CT" lines only where a source supports them (for example an
   occult scaphoid fracture).

## Per joint (the minimum content)

- **Knee:** Ottawa knee rule; lipohaemarthrosis on a horizontal-beam lateral; tibial plateau
  (Schatzker, as the calculator); Segond and arcuate (fibular head) avulsions; tibial spine
  avulsion; patella fracture against bipartite patella; distal femur.
- **Elbow:** anterior and posterior fat pads; radial head (Mason, Broberg-Morrey as the
  calculator); olecranon; coronoid; distal humerus; dislocation and the terrible triad; the
  radiocapitellar and anterior humeral lines; Monteggia and Galeazzi checks.
- **Wrist:** distal radius (extra-articular and intra-articular; Colles, Smith, Barton and
  radial styloid as descriptive names only if sourced; radial inclination, radial height and
  volar tilt with sourced normals); ulnar styloid; DRUJ; scaphoid with the scaphoid series and the
  occult fracture pathway (Herbert, as the calculator); Gilula's arcs and carpal dislocation
  (Mayfield, as the calculator); dorsal triquetral fracture.
- **Hand:** metacarpal neck (boxer's) and shaft fractures, angulation and rotation; Bennett and
  Rolando; phalangeal fractures; mallet finger (bony); volar plate avulsion; ulnar collateral
  ligament avulsion of the thumb (gamekeeper's or skier's); carpometacarpal dislocation.
- **Ankle:** Ottawa ankle rules; the mortise, medial clear space and tibiofibular clear space and
  overlap with sourced values; malleolar fractures with Weber A, B or C by the fibular level
  against the syndesmosis (named in the report, cited); posterior malleolus; Maisonneuve (look up
  the fibula); talar dome; lateral process of the talus; base of the fifth metatarsal (link).
- **Foot:** Ottawa foot rules; Lisfranc injury and its signs (Myerson, as the calculator); fifth
  metatarsal zones (link); calcaneus with Böhler's angle and the critical angle of Gissane
  (Sanders, as the calculator); talar neck (Hawkins, as the calculator); navicular; metatarsal
  stress fracture; toes.

## Calls made for the builder

- Where a calculator exists, the study links to it and uses its wording; it does not re-derive
  the classification.
- Measurements are given with the source's normal range and method; where sources differ, both
  are given, cited.
- Decision rules are presented as the reason the film was taken (criteria and their source), not
  as advice to skip imaging.
