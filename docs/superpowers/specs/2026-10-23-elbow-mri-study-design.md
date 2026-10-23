# Elbow MRI study and Mason calculator (region 4)

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Intent

The next region after the ankle, knee and shoulder, done the same way end to end. The
author chose:

- **Exam:** elbow MRI.
- **History:** "pain or injury". Unlike the knee and shoulder, the study uses the injury, when
  there is one, to decide where to look hardest (after a dislocation, the Horii circle; in a
  thrower, the UCL), but still walks a complete, fixed search pattern.
- **Calculator:** **Mason** (radial head fractures), as its own page, with the rules shared
  with the study, like Schatzker and Neer.
- **Variants** (supracondylar process, anconeus epitrochlearis, os supratrochleare dorsale)
  each get their own impression line.

## Goals

1. A new study, `/studies/elbow-mri`, on the study framework: Report, Learn and Quiz tabs.
2. A new calculator, `/mason`, that types a radial head fracture from two questions
   (dislocation, pattern), with optional Broberg-Morrey measurements and report text.
3. Linked through `related`: the study lists `['/elbow', '/mason']`; the calculator lists
   `['/elbow']`.
4. The Mason rules live once, in `src/logic/mason.ts`.
5. Every rule comes from a cited paper and is pinned by a test quoting its claim ID.
6. Labelled as an unchecked draft (see Blocker) until the citations are checked and the author
   signs it off.

## Non-goals

- No change to the 3D elbow viewer or to any other study or calculator.
- No paediatric content beyond telling Panner's disease from osteochondritis dissecans; the
  paediatric elbow has its own study.
- No post-operative elbow.
- No other fracture classifications beyond Mason (with Johnston and Broberg-Morrey) and
  Regan-Morrey for the coronoid.

## Mason: which version

Mason's own paper has three types. Type IV (fracture with dislocation) is Johnston's addition;
the four-type scheme in common use is that modified version. The calculator, the study's
chip ("Type IV (Johnston)") and the report text ("Mason type IV (Johnston modification)") all
say so. Broberg and Morrey's numbers (under 2 mm is type I; 2 mm or more with 30% or more of
the head is type II) are shown separately and flagged as a claim to check; a fragment
displaced 2 mm or more but under 30% gets no type, since the numbers do not cover it.

## Report tab: search pattern

1. **History, technique and global look:** history (pain, dislocation, throwing, other
   injury), protocol, effusion, marrow. After a dislocation, a chip says to read the
   ligaments lateral to medial (Horii circle).
2. **Bones and marrow:** radial head (Mason via shared logic, optional Broberg-Morrey),
   coronoid (Regan-Morrey), olecranon, other fracture, capitellum (OCD, Panner,
   pseudodefect warning), terrible triad.
3. **UCL:** anterior bundle; the undersurface tear at the sublime tubercle.
4. **Lateral collateral complex:** LUCL (PLRI chip), radial collateral, annular ligament.
5. **Common flexor-pronator origin.**
6. **Common extensor origin** (chip: recheck the LUCL).
7. **Distal biceps:** tear, retraction, bicipitoradial bursa.
8. **Triceps and brachialis.**
9. **Nerves:** ulnar, radial and PIN, median, denervation edema.
10. **Bursae, loose bodies and synovium.**
11. **Variants.**
12. **Other findings and impression.**

Warnings: pertinent negatives that contradict findings; a torn UCL with an intact LUCL after
a dislocation; a dislocation history with a radial head fracture entered as not dislocated
(Mason IV); an osteochondral lesion at the posterior capitellum (pseudodefect).

## Registry and docs (for the integrator)

- Studies, Musculoskeletal group: `/studies/elbow-mri`, related `['/elbow', '/mason']`.
- Trauma: `/mason`, related `['/elbow']`.
- `calculators.test.ts`: `relatedTo('/elbow')` includes both.
- `CLAUDE.md`: Mason in Current calculators, `mason.ts` in the shared-logic list, Elbow MRI in
  the unchecked drafts paragraph.

## Blocker

As for the knee and shoulder, PubMed, Crossref and doi.org are blocked in this environment.
The author chose to draft anyway. So the pages are an **unchecked draft**: references from
memory with no DOI, plain-text citations, and a source note starting "Unchecked draft", all
pinned by tests. Every claim is in `docs/superpowers/research/2026-10-23-elbow-mri-sources.md`
marked "to check". Do not merge to `main` before that check.
