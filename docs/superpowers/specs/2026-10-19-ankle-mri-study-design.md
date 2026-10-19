# Ankle MRI study (region pilot)

Date: 2026-10-19 · Branch: `design-update` (worktree `radref-design`)

## Intent

The author wants every anatomy region to have a model, a lesson and (where it fits) a
calculator, linked to each other. This is the pilot region, done end to end so the author can
react to the shape before it is repeated for the knee, shoulder, elbow, wrist, foot, spine and
pelvis. For the ankle the author chose: an MRI study page, linked to the existing 3D ankle
model, and **no calculator** (Weber and Lauge-Hansen are radiograph fracture classifications
and do not fit how ankle MRI is read here).

The real situation it serves: ankle MRI arrives with a history of "pain" and nothing else. The
study therefore teaches and builds a report from a fixed, complete search pattern, so nothing
is missed when the referral gives no direction.

## Goals

1. A new study, `/studies/ankle-mri`, built on the existing study framework
   (`src/study/`, `StudyDefinition`): Report, Learn and Quiz tabs, like rectal MRI.
2. Linked two ways to the 3D ankle model (`related: ['/ankle']`, declared on the study).
3. Rules, thresholds and grading in the Report tab come only from the lesson text and its
   cited papers; each pinned by a test quoting its source sentence.
4. Labelled as an unreviewed draft until the author signs it off, like the TI-RADS and LI-RADS
   studies.

## Non-goals

- No calculator for the ankle, and no Weber or Lauge-Hansen anywhere.
- No change to the 3D ankle viewer or to any other study or calculator.
- No radiograph or CT content beyond a passing mention where the literature compares
  modalities.

## Anti-goals

- A threshold, grade or management statement that its cited paper does not say.
- A citation whose claim does not match the paper. Every citation is checked against PubMed;
  a claim that does not match goes to the author as a question, not a quiet rewording
  (CLAUDE.md, Studies section).
- A search pattern that skips a compartment, since the whole point is completeness with no
  history.

## Content

### Report tab: search pattern (the order is my call; the author may reorder)

1. **Technique and global look:** sequences present, effusion, overall marrow.
2. **Bones and marrow:** occult or stress fracture, bone-bruise pattern (as a pointer to
   mechanism), osteochondral lesion of the talus (with staging if the literature gives an MRI
   staging the builder can cite), os trigonum and other accessory ossicles.
3. **Lateral ligaments:** ATFL, CFL, PTFL — intact, sprain/partial, complete tear, chronic
   (thickened or attenuated), as the cited grading defines them.
4. **Syndesmosis:** AITFL, PITFL, interosseous membrane.
5. **Medial ligaments:** deltoid (superficial and deep), spring ligament.
6. **Medial tendons:** tibialis posterior, FDL, FHL — tendinosis, tenosynovitis, partial and
   complete tear per the cited classification.
7. **Lateral tendons:** peroneus brevis and longus, split tears, retinaculum, subluxation,
   low-lying muscle belly / peroneus quartus.
8. **Posterior:** Achilles (tendinosis, partial and complete tear, retrocalcaneal bursitis,
   Haglund), posterior impingement.
9. **Anterior:** anterior tendons, anterior and anterolateral impingement.
10. **Spaces and nerves:** sinus tarsi, tarsal tunnel and its contents.
11. **Plantar:** plantar fascia.
12. **Other findings and impression.**

Each step has the framework's "Why and how" panel quoting the lesson and its papers, rule
chips (`derive`) only where a cited source states the rule, and report text built in a
structured template ending in an impression. The "check before signing" list flags required
items left blank and contradictions (e.g. a complete tear entered with "intact" elsewhere).

### Learn tab

The lesson section by section, matching the report steps, with inline `<Cite doi>` and the
shared reference list (`src/components/LessonPage.tsx`).

### Quiz tab

8–12 questions drawn from the lesson, each with an explanation citing the lesson.

## Registry and docs

- `src/data/calculators.ts`, Studies category: `{ path: '/studies/ankle-mri', name: 'Ankle MRI',
  group: 'Musculoskeletal', related: ['/ankle'], … }`. Musculoskeletal is a new group; keep
  its items together in the list (`groupItems` groups consecutive items). No `tag`.
- `CLAUDE.md` Studies section: add Ankle MRI to the drafted-from-the-literature list.

## Constraints

- Follow `CLAUDE.md`: study tests through `src/study/testing.ts` (`studyOf`, `report`,
  `chips`), modelled on `RectalMriStudy.test.ts`; every rule tested at its boundaries with a
  comment quoting the source sentence.
- The site's reading-room design and theme tokens (branch `design-update`); `src/styles.test.ts`
  forbids colour literals outside the token blocks.
- `npm run lint`, `npm test`, `npm run build` pass. No dev server or browser unless the author
  asks.
- Work on `design-update` in the `radref-design` worktree; do not merge or push.

## Calls made for the builder (my calls, open to the author's correction)

- **A claim that doesn't match its paper:** the builder omits that threshold or rule chip,
  keeps the descriptive field, and lists every omission (claim, paper, what the paper says) in
  the handoff. That list is how it "goes to the author"; nothing is quietly reworded.
- **Few rule chips is acceptable.** Ankle MRI has far fewer hard thresholds than rectal MRI.
  Where no cited source states a rule, the step has no chips; the tests then pin the report
  text, the required-field list and the cross-field contradiction warnings instead.

## Left to the builder

- The exact reference set (review articles and original papers on ankle MRI ligaments,
  tendons, osteochondral lesions, impingement), chosen for availability on PubMed with DOIs.
- Field choices within each step, report wording, and the number of quiz questions (8–12).
- Whether a given step has rule chips, depending on whether a cited source states a rule.
