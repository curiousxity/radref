# Knee MRI study and Schatzker calculator (region 2)

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

Second region after the ankle pilot (`2026-10-19-ankle-mri-study-design.md`), done the same
way end to end. The author chose:

- **Exam:** knee MRI.
- **History:** "pain" and nothing else, as for the ankle. The study therefore teaches and
  builds a report from a fixed, complete search pattern, so nothing is missed when the
  referral gives no direction.
- **Calculator:** yes, **Schatzker** (tibial plateau fractures), as its own calculator page,
  even though Schatzker is mostly applied on radiographs and CT.

## Goals

1. A new study, `/studies/knee-mri`, on the study framework (`src/study/`,
   `StudyDefinition`): Report, Learn and Quiz tabs, like rectal MRI and ankle MRI.
2. A new calculator, `/schatzker`, that gives the Schatzker type from a few plain questions
   about the fracture, with a description of the type and copyable report text.
3. Linked through `related`: the study lists `['/knee', '/schatzker']`; the calculator lists
   `['/knee']`. Declared on one side only (CLAUDE.md, Registry section).
4. The Schatzker rules live once, in `src/logic/schatzker.ts`, and are used by both the
   calculator and the study's tibial plateau field, like `pirads.ts` and `bosniak.ts`.
5. Every rule, threshold and grade comes from a cited paper that states it, checked against
   PubMed, and is pinned by a test quoting the source sentence.
6. Labelled as an unreviewed draft until the author signs it off, like the ankle study.

## Non-goals

- No change to the 3D knee viewer or to any other study or calculator.
- No other fracture classification (no AO/OTA, no Kfuri-Schatzker three-column CT revision,
  no Hohl, no Moore), unless the author asks for one later.
- No paediatric-specific content (physeal injuries, Osgood-Schlatter and so on) beyond what
  the cited papers mention in passing.
- No radiograph or CT teaching in the study beyond a passing mention; the Schatzker page is
  where fracture typing lives.

## Anti-goals

- A threshold, grade or management statement that its cited paper does not say.
- A citation whose claim does not match the paper. A claim that does not match goes to the
  author as a question, not a quiet rewording (CLAUDE.md, Studies section).
- A search pattern that skips a compartment.
- Schatzker types described in a wording that disagrees with Schatzker's own paper or the
  cited review. Sources disagree on type IV wording (split with or without depression), so
  the calculator must follow one cited source and say which.

## Content: knee MRI study

### Report tab: search pattern (the order is my call; the author may reorder)

1. **Technique and global look:** sequences and planes present, joint effusion,
   lipohaemarthrosis (fat-fluid level, a sign of an intra-articular fracture), overall marrow.
2. **Bones and marrow:** bone bruise pattern as a pointer to mechanism (for example the
   pivot-shift pattern of the lateral femoral condyle and posterolateral tibial plateau),
   occult fracture, tibial plateau fracture (with Schatzker type from the shared logic and a
   link to the calculator), Segond and other avulsion fractures, subchondral insufficiency
   fracture, osteochondral lesion / osteochondritis dissecans with stability signs if a cited
   source gives them.
3. **Medial meniscus:** intact or tear; tear type (horizontal, longitudinal, radial, root,
   complex, displaced fragment / bucket handle); location (anterior horn, body, posterior
   horn, root); extrusion. Tear criteria (for example abnormal signal touching the surface on
   more than one image) only if a cited paper states them.
4. **Lateral meniscus:** the same fields, plus discoid meniscus.
5. **Anterior cruciate ligament:** intact, partial tear, complete tear, reconstructed graft;
   secondary signs only if cited.
6. **Posterior cruciate ligament:** intact, partial, complete.
7. **Medial collateral ligament:** intact or grade of injury as the cited grading defines it.
8. **Lateral side and posterolateral corner:** lateral collateral ligament, biceps femoris
   tendon, popliteus tendon, iliotibial band; posterolateral corner injury.
9. **Extensor mechanism and patellofemoral joint:** quadriceps and patellar tendons, medial
   patellofemoral ligament, transient lateral patellar dislocation pattern, trochlear shape.
10. **Cartilage:** patellofemoral, medial and lateral compartments, with a grade if a cited
    MRI grading is used.
11. **Synovium, cysts and fat pads:** popliteal (Baker) cyst, parameniscal cyst, synovitis,
    plica, Hoffa fat pad.
12. **Other findings and impression.**

Each step has the "Why and how" panel quoting the lesson and its papers, rule chips
(`derive`) only where a cited source states the rule, and report text in a structured
template ending in an impression. The "check before signing" list flags required items left
blank and contradictions (for example an ACL "complete tear" with an impression of "no
ligament injury", or a bucket-handle fragment with the meniscus marked "intact").

### Learn tab

The lesson section by section, matching the report steps, with inline `<Cite doi>` and the
shared reference list (`src/components/LessonPage.tsx`).

### Quiz tab

8–12 questions drawn from the lesson, each with an explanation citing the lesson.

## Content: Schatzker calculator

- **Inputs** (plain questions, large touch targets): which plateau is involved (lateral,
  medial, both); split, depression or both; whether the fracture separates the metaphysis
  from the diaphysis. Exact wording follows the cited source.
- **Output:** the type (I–VI), the cited description of that type, and copyable report
  text. A short note that CT or MRI can change the type assigned on radiographs, if the cited
  paper states it.
- **Logic** in `src/logic/schatzker.ts`, pinned by `src/logic/schatzker.test.ts` with one
  case per type and the boundary cases (for example a lateral split with and without
  depression), each quoting its source sentence.
- **Registry:** Trauma category, next to AAST grading and fifth metatarsal fractures.
  `{ path: '/schatzker', name: 'Schatzker (tibial plateau)', related: ['/knee'], … }`.

## Registry and docs

- `src/data/calculators.ts`, Studies category: `{ path: '/studies/knee-mri', name: 'Knee
  MRI', group: 'Musculoskeletal', related: ['/knee', '/schatzker'], … }`, kept next to ankle
  MRI so the Musculoskeletal group stays together. No `tag`.
- `src/data/calculators.test.ts`: assert `relatedTo('/knee')` includes both new pages.
- `CLAUDE.md`: add Knee MRI to the drafted-from-the-literature list in the Studies section,
  add Schatzker to "Current calculators", and add `schatzker.ts` to the list of shared logic
  files.
- `docs/REMAINING_TASKS.md`: tick the knee once it ships.

## Sources

Same process as the ankle (`docs/superpowers/research/2026-10-19-ankle-mri-sources.md`):
a sources-and-claims file, `docs/superpowers/research/<date>-knee-mri-sources.md`, written
and committed first. Each reference is matched on PubMed and its DOI resolved on Crossref;
a claim is "verified" only when its wording is read in the abstract or in open full text.
The lesson, report, quiz and calculator may use only verified claims.

Candidate papers to check (none verified yet; each must pass the check before use):

- Schatzker J, McBroom R, Bruce D. The tibial plateau fracture: the Toronto experience
  1968-1975. Clin Orthop Relat Res. 1979 (the original classification).
- Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use
  of CT and MR imaging improves assessment. Radiographics. 2009.
- De Smet AA and colleagues on MRI criteria for meniscal tears (the "two-slice touch" rule).
- Review articles on knee MRI bone bruise patterns, meniscal tear types and root tears,
  meniscal extrusion, ACL and PCL tears, MCL grading, the posterolateral corner, transient
  lateral patellar dislocation, cartilage grading, and subchondral insufficiency fracture.

## Blocker found on 2026-10-23

This cloud environment's network policy blocks the paper databases:
`eutils.ncbi.nlm.nih.gov`, `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`,
`www.ncbi.nlm.nih.gov`, `api.crossref.org`, `doi.org` and `www.ebi.ac.uk` (Europe PMC) all
fail. Web search works but cannot read abstracts. The sources file, and everything after it,
waits until those hosts are allowed (or the work moves to a machine that can reach them).

## Constraints

- Follow `CLAUDE.md`: study tests through `src/study/testing.ts` (`studyOf`, `report`,
  `chips`), modelled on `RectalMriStudy.test.ts` and `AnkleMriStudy.test.ts`; every rule
  tested at its boundaries with a comment quoting the source sentence.
- Theme tokens only (`src/styles.test.ts`).
- `npm run lint`, `npm test`, `npm run build` pass. No dev server or browser unless the
  author asks.

## Calls made for the builder (my calls, open to the author's correction)

- **Schatzker gets its own page and shared logic,** and the study's bones step reuses it
  rather than re-describing the types.
- **A claim that doesn't match its paper:** omit the rule or chip, keep a descriptive field,
  and list the omission in an "Omitted claims for the author" section of the sources file.
- **Few rule chips is acceptable,** as for the ankle. Where no cited source states a rule,
  the step has no chips; the tests then pin the report text, required fields and
  contradiction warnings.

## Questions for the author

- Should the study also cover a reconstructed ACL (graft appearance, tunnel position), or
  leave post-operative knees out?
- Same open question as the ankle: do anatomical variants (discoid meniscus, bipartite
  patella, fabella) get an impression line, or stay in findings only?
