# Foot MRI study

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

Next region after the wrist, done the same way. The author chose:

- **Exam:** foot MRI.
- **History:** "pain or injury". The study walks a complete fixed search pattern from the
  hindfoot to the toes, and uses the injury, when there is one, to say where to look hardest:
  a twisting injury (Lisfranc, fifth metatarsal base), a fall or crush (talus, calcaneus),
  pain alone (stress injury, forefoot).
- **Calculators:** three, each its own page with shared logic the study uses: Hawkins (talar
  neck fracture), Sanders (intra-articular calcaneal fracture, typed on CT) and Myerson
  (Lisfranc fracture-dislocation). Their sources file is
  `docs/superpowers/research/2026-10-23-foot-calculators-sources.md`.
- **Variants** get their own impression line (accessory navicular, os peroneum, os trigonum,
  os intermetatarseum, os vesalianum, bipartite sesamoid).

## Goals

1. `/studies/foot-mri` on the study framework, with Report, Learn and Quiz tabs.
2. The study uses `src/logic/hawkins.ts`, `sanders.ts` and `myerson.ts` rather than
   re-describing the classifications, so a fix there changes both.
3. Linked through `related: ['/foot', '/hawkins', '/sanders', '/myerson', '/fifth-metatarsal']`,
   declared on the study. Hawkins and Sanders link to `/ankle` (the hindfoot model), Myerson to
   `/foot`.
4. Labelled an unchecked draft: references with no DOI, plain-text citations, source note
   starting "Unchecked draft", pinned by tests.

## Non-goals

- **The diabetic foot** (osteomyelitis against Charcot neuroarthropathy). It needs its own
  history and papers; ask the author whether to add it as a step or a separate study.
- No post-operative foot content.
- What the ankle MRI study already covers (ankle ligaments, the tendons at the malleoli, the
  sinus tarsi, the tarsal tunnel) is not repeated. The plantar fascia step points to the ankle
  study's step 11 rather than restating it.
- No change to the 3D foot or ankle viewers, the fifth metatarsal page, or any other study.

## Search pattern

1. History, technique and the global look (effusion, marrow).
2. Hindfoot and midfoot bones: talus (Hawkins), calcaneus (Sanders), navicular, coalition.
3. Lisfranc complex: dorsal, interosseous and plantar ligaments; alignment; Myerson.
4. Metatarsals: stress injury, fifth metatarsal base zone, Freiberg.
5. First MTP joint and sesamoids: turf toe, sesamoiditis, fracture.
6. Lesser MTP joints and plantar plates.
7. Intermetatarsal spaces: Morton neuroma, bursal fluid.
8. Plantar fascia.
9. Tendons and their ossicles: tibialis posterior and accessory navicular, peroneus longus and
   os peroneum, tibialis anterior, long flexors and extensors.
10. Variants.
11. Other findings and the impression.

## Calls made for the builder

- Hawkins, Sanders and Myerson are picked from a list in the study, as Herbert is in the wrist
  study; the calculators work them out from questions.
- A pattern the original paper did not name gets no type (Hawkins: displaced with every joint
  in place; Myerson: the first metatarsal going laterally with only some of the others), as the
  author decided for Neer.
- The plantar Lisfranc ligament chip fires for a tear, not a sprain, until F3-3 is checked.
- Bursal fluid of 3 mm or less in the first three spaces gets a findings line but no impression
  line (F7-3).
- A plantar plate tear at MTP joint n next to a neuroma in space n − 1 or n raises a "check
  before signing" warning (F6-2).
- The accessory navicular and os peroneum are entered with their tendons (step 9) and give
  both a variant line and, when abnormal, a finding line.

## Blocker

The cloud environment blocks PubMed and Crossref. Every claim is in
`docs/superpowers/research/2026-10-23-foot-mri-sources.md`, marked "to check".
