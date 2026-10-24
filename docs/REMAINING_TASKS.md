# Remaining tasks

Last updated 2026-10-23, when the knee, shoulder, elbow, pediatric elbow and wrist drafts, and
later the foot, diabetic foot and spine drafts, were merged to `main` and deployed, before
their sources check, by the author's choice.

## Fix soon

- **Phone menu focus order (WCAG 2.4.3).** The redesign's final fix moved `CategoryNav`
  before `.header-actions` in `src/App.tsx`, so on phones the menu drawer comes before
  the menu button in tab order. Fix by reverting that DOM reorder and using a desktop-only
  CSS `order` instead, or by moving focus into the drawer when it opens.
- **Browser check of both themes**, which has not been done yet. Check light and dark on:
  home, TI-RADS, Doppler indices, one older study, ankle MRI, fifth metatarsal, one
  embedded viewer, one full-screen viewer, at 320px wide, and the header between 641 and
  900px.

## Author review

- **Ankle MRI study** (`/studies/ankle-mri`) is an unreviewed draft. Read the lesson,
  report and quiz, and the "Omitted claims for the author" section in
  `docs/superpowers/research/2026-10-19-ankle-mri-sources.md`. Sign it off by removing
  "Not yet reviewed by the site author" from its source note.
- Anatomical variants (os trigonum, peroneus quartus, low-lying peroneus brevis belly and
  so on) get their own impression line, not findings only: decided 2026-10-23 and applied to
  the ankle, knee and shoulder reports.

## Regions: model, lesson and calculator

The aim is for every 3D anatomy region to have a model, a full study page like rectal MRI,
and a classification calculator where one fits, all linked through `related`. Work one
region at a time, end to end, following the ankle pilot
(`docs/superpowers/specs/2026-10-19-ankle-mri-study-design.md` and its plan).

- [x] Ankle: ankle MRI study. No calculator, by the author's choice (no Weber or
  Lauge-Hansen).
- [ ] Knee: knee MRI study ("pain" only history, ACL reconstruction included) plus a
  Schatzker calculator. Drafted 2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-knee-mri-study-design.md`. Done once the sources check
  in "To do when on a computer" passes and the author signs it off.
- [ ] Shoulder: shoulder MRI study ("pain" only history, repaired rotator cuff included)
  plus a Neer calculator. Drafted 2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-shoulder-mri-study-design.md`. Done once the sources
  check in "To do when on a computer" passes and the author signs it off.
- [ ] Elbow: elbow MRI study ("pain or injury" history) plus a Mason calculator. Drafted
  2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-elbow-mri-study-design.md`.
- [ ] Pediatric elbow: radiograph study by age (CRITOE centres, fat pads, lines, Gartland,
  Weiss lateral condyle, medial epicondyle, O'Brien radial neck), no separate calculator.
  Drafted 2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-pediatric-elbow-study-design.md`.
- [ ] Wrist: wrist MRI study ("pain or injury" history, no post-op) plus four calculators:
  Mayfield, scaphoid fracture (Herbert), Palmer TFCC and Kienböck (Lichtman). Drafted
  2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-wrist-mri-study-design.md`.
- [ ] Foot: foot MRI study ("pain or injury" history) plus three calculators: Hawkins (talar
  neck), Sanders (calcaneus) and Myerson (Lisfranc). Drafted 2026-10-23 as an unchecked draft;
  spec `docs/superpowers/specs/2026-10-23-foot-mri-study-design.md`. Deployed before the check.
  Done once the sources check passes and the author signs it off.
  The diabetic foot is its own study (`/studies/diabetic-foot-mri`, the author's choice,
  2026-10-23).
- [ ] Spine: spine trauma CT study ("pain or injury" history) plus an AO Spine calculator
  (subaxial cervical and thoracolumbar), the author's choice over SLIC and TLICS (2026-10-23).
  Deployed before the check; done once it passes and the author signs it off.
- [ ] Pelvis: pelvis CT study ("pain or injury" history) plus two calculators, Young-Burgess
  (pelvic ring) and Letournel (acetabulum). Drafted 2026-10-23 as an unchecked draft; spec
  `docs/superpowers/specs/2026-10-23-pelvis-ct-study-design.md`. On the branch only until the
  author says to merge. Done once the sources check passes and the author signs it off.
- [ ] Decide whether the head-and-neck and plexus viewers are included: otic capsule,
  ossicular chain, TMJ, skull base, suprahyoid neck, larynx, brachial plexus.
  TMJ: skipped for now (2026-10-23); it already has a 3D model.

For each region, ask first which exam the study covers and what history usually comes
with it. The ankle was MRI with a history of "pain" only.

## To do when on a computer

The cloud environment blocks the paper databases (PubMed, PubMed Central, Crossref,
doi.org, Europe PMC), so these checks wait for a machine that can reach them. Do each
check the way the ankle was done (`docs/superpowers/research/2026-10-19-ankle-mri-sources.md`):
match the paper on PubMed, resolve its DOI on Crossref, and count a claim as verified only
when its wording is in the abstract or open full text.

The browser check of both themes (under "Fix soon") also needs a computer.

### Knee MRI study and Schatzker calculator

Drafted 2026-10-23 as an unchecked draft (`/studies/knee-mri`, `/schatzker`). Every paper
and every claim is in `docs/superpowers/research/2026-10-23-knee-mri-sources.md`. Deployed
before the check by the author's choice (2026-10-23); the pages say "Unchecked draft" until
it is done.

- [x] Match the 19 references (K1–K19) on PubMed and Crossref (2026-10-23). All found; K13's
  title punctuation corrected; DOIs and `<Cite>` links added (Schatzker 1979 has no DOI).
- [x] Schatzker types checked against Markhardt 2009's abstract (Schatzker 1979 has none);
  SZ-1, SZ-2, SZ-5 to SZ-7 verified, SZ-3 and SZ-4 in part.
- [x] Verified from abstracts or open full text (Crema, PMC6939857): K1-1, K2-5, K2-7, K3-1,
  K3-2, K4-1, K4-2, K5-1, K8-1; others in part.
- [x] Matched to the papers by the author's choice (2026-10-23): extrusion is "more than 3 mm"
  (Costa; exactly 3 mm is minor), MPFL injury uses Elias's figures, the 11° trochlear
  inclination is a test for patellar instability (Carrillon), and type III is split into
  IIIA (lateral) and IIIB (central) as Markhardt gives it.
- [ ] Still unchecked, because the papers are paywalled: the ligament each bruise pattern
  points to, Segond with ACL tear, juvenile OCD signs, cyclops and arthrofibrosis, the MCL
  bruise sites, SZ-4's wording, the four cartilage depth grades (K10-1) and the level of the
  11° measurement. Kept with the "Unchecked draft" note by the author's choice.

### Shoulder MRI study and Neer calculator

Drafted 2026-10-23 as an unchecked draft (`/studies/shoulder-mri`, `/neer`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-shoulder-mri-sources.md`. Deployed before
the check (2026-10-23); labelled "Unchecked draft" until it is done.

- [x] Match every reference on PubMed and Crossref (2026-10-23). All 22 found (Hill-Sachs 1940
  on Crossref only); R3's author list and R20's title corrected; DOIs and `<Cite>` links added.
- [x] Verified from abstracts or open full text (Woertler and Waldt, PMC1705542): S2-2,
  S3-4, S5-1, S6-2 to S6-4, S7-1, S10-1, S10-3, S12-2, S12-4; others in part.
- [x] Matched to the papers by the author's choice (2026-10-23): S3-4 now says Fuchs found MRI
  and CT grades correlated only fairly to moderately; S12-3 (recess mimicking SLAP II) now
  cites Woertler and Waldt, which states it, rather than Smith.
- [ ] Still unchecked, because the papers are paywalled or have no abstract: Neer N1–N6,
  S2-1, S3-2, and the unread parts of S2-3 (the coracoid level), S3-1 (Ellman depths), S3-3
  (Goutallier wording), S6-1 (Snyder types), S10-2, S11-1 (Sugaya re-tears) and S12-1.
  Kept with the "Unchecked draft" note by the author's choice (2026-10-23).

### Elbow MRI study and Mason calculator

Drafted 2026-10-23 as an unchecked draft (`/studies/elbow-mri`, `/mason`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-elbow-mri-sources.md`.

- [x] Match references E1–E17 on PubMed and Crossref (2026-10-23). All found; Kijowski's (E8)
  DOI corrected; DOIs and `<Cite>` links added (Johnston 1962 has no DOI). Timmerman and
  Andrews 1994, the undersurface tear paper, added beside its CT arthrography companion.
- [x] Verified from abstracts: E2-2, E2-3, E4-1, E5-1, E6-2, E7-1; others in part.
- [x] Matched to the papers by the author's choice (2026-10-23): instability stages follow
  O'Driscoll's wording (specimens dislocated with the anterior band intact); the capitellar
  pseudodefect is "at the junction of the capitellum and lateral epicondyle", not posterior;
  the undersurface UCL tear is a deep-layer detachment, the T-sign a CT arthrography sign, and
  the sublime tubercle is no longer named; lateral epicondylitis cites Potter for ECRB
  degeneration and Bredella for the MRI signal.
- [ ] Still unchecked: Mason MA-1 to MA-6 and Johnston (no abstracts), Broberg-Morrey 2 mm and
  30%, E2-1, E11-1, and the unread parts of the partly verified rows.

### Wrist MRI study

Every paper and claim is in `docs/superpowers/research/2026-10-23-wrist-mri-sources.md`.

- [x] Match references R1–R18 on PubMed and Crossref (2026-10-23). All found as written;
  DOIs and `<Cite>` links added.
- [x] Verified from abstracts: W2-1, W6-3, W7-1, W9-1, W10-1, W11-1, W12-1 to W12-3; others
  in part.
- [x] Matched to the papers by the author's choice (2026-10-23): ulnar impaction signal is in
  the ulnar lunate and the radial aspects of the triquetrum and ulnar head (Imaeda, no
  "proximal"); de Quervain thickening is the reliable sign and intratendinous signal less
  reliable (Glajchen); "MRI shows stage I" Kienböck is dropped, since Lichtman 1977 predates
  clinical MRI (stage I is "normal radiographs").
- [ ] Still unchecked, because the papers are paywalled or have no abstract: W2-5, W3-2,
  W4-1 (both on Linscheid 1972), W5-2, and the unread parts of the partly verified rows.

### Wrist calculators (Mayfield, Herbert, Palmer, Lichtman)

Every paper and claim is in `docs/superpowers/research/2026-10-23-wrist-calculators-sources.md`.

- [x] Match references W1–W4 on PubMed and Crossref (2026-10-23). All found; DOIs added.
- [x] MF-1 and MF-4 verified from Mayfield's abstract; MF-5, HB-5, PA-3 and LI-1 in part.
- [x] Lichtman stage I is "normal radiographs"; the MRI wording is dropped (the 1977 paper
  predates clinical MRI), by the author's choice (2026-10-23).
- [ ] Still unchecked, because the papers are paywalled: MF-2, MF-3, the greater-arc
  sentence, HB-1 to HB-4 (and whether B5 is in Herbert 1984), PA-1, PA-2, LI-2 to LI-4. Who
  split Lichtman III into IIIA and IIIB (LI-3) still has no source, nor does IIIC.

### Foot MRI study

Every paper and claim is in `docs/superpowers/research/2026-10-23-foot-mri-sources.md`.

- [x] Match references R1–R14 on PubMed and Crossref (2026-10-23). All found as written;
  DOIs and `<Cite>` links added.
- [x] Verified from abstracts: F3-3, F6-1, F7-2, F7-3, F9-1; others in part.
- [x] Matched to the papers by the author's choice (2026-10-23): Morton's neuroma 5 mm is
  Zanetti's "may be relevant only when … 5 mm or more and can be correlated to clinical
  findings" (Bencardino found size overlapped and "does not imply symptomatology"); the
  plantar Lisfranc ligament is cited to Raikin, and a grade-2 sprain counts with a rupture;
  intermetatarsal bursa fluid of 3 mm or less "can be considered physiologic"; tarsal
  coalition and accessory navicular wording follow Newman and Miller.
- [ ] Still unchecked, because the papers are paywalled: F3-1, F3-4, F4-1, F4-2, F5-1 to
  F5-3, and the unread parts of the partly verified rows (including the F6-2 warning).

### Diabetic foot MRI study

Every paper and claim is in `docs/superpowers/research/2026-10-23-diabetic-foot-mri-sources.md`.

- [x] Match references D1–D7 on PubMed and Crossref (2026-10-23). All found; DOIs and
  `<Cite>` links added.
- [x] Verified from abstracts: D1-1, D2-1, D6-1; D2-2, D2-3, D3-1, D4-1 and D7-1 in part.
- [x] Matched to the papers by the author's choice (2026-10-23): the T1 pattern is Johnson's
  single "hazy reticulated" pattern, with no unstated "even with high fluid-sensitive signal";
  the Charcot distribution chip now follows Donovan ("most commonly affects the
  tarsometatarsal and metatarsophalangeal joints"), not "midfoot, away from the pressure
  points", which no listed abstract states.
- [ ] Still unchecked: the ghost sign (D4-2), and the parts of the partly verified rows the
  abstracts do not state.

### Spine CT for pain or injury

Drafted 2026-10-23 as an unchecked draft (`/studies/spine-trauma-ct`). Every paper and claim
is in `docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md`; the AO Spine wording
is under the calculator below.

- [x] Match references T-R1 to T-R10 on PubMed and Crossref (2026-10-23). All found; Laredo
  1995's author list corrected; DOIs and `<Cite>` links added.
- [x] Verified: T1-1 (Westerveld, open full text) and T6-2 (Laredo).
- [x] Matched to the papers by the author's choice (2026-10-23): Rojas gives 8.5 mm (BDI) and
  2 mm (ADI) as 95% limits ("less than"), so those values are now outside normal; Laredo's
  features are "significantly more frequent" in benign or malignant collapse, not proof.
- [ ] Still unchecked: Spence 6.9 mm and odontoid types (T2-2, T2-4, no abstracts), MRI for
  what the rule misses (T2-3), the expanded Denver criteria and the C3 question (T5-1), the
  Genant grades (T6-1).

### AO Spine calculator

Drafted 2026-10-23 as an unchecked draft (`/ao-spine`). Every claim is in
`docs/superpowers/research/2026-10-23-spine-calculators-sources.md`.

- [x] Match references S1 and S2 on PubMed and Crossref (2026-10-23). Both found; DOIs added.
- [x] AO-3 verified; AO-1, AO-2, AO-6, AO-8 and AO-10 in part (the abstracts give the type
  names and say facet, neurology and modifier grades exist).
- [ ] Still unchecked: AO-4, AO-5, AO-7 (the 1 cm / 40% boundary), AO-9, AO-11, AO-12.

### Pelvis CT for pain or injury

Drafted 2026-10-23 as an unchecked draft (`/studies/pelvis-ct`). Every paper and claim is in
`docs/superpowers/research/2026-10-23-pelvis-ct-sources.md`; the classification wording is
under the calculators below.

- [x] Match references P-R1 to P-R12 on PubMed and Crossref (2026-10-23). All matched; DOIs
  added and citations are `<Cite>` links. Rehman 2016 concluded the opposite of P5-1 and was
  replaced by Kellock 2019 (the author's choice).
- [x] Verified from abstracts or open full text: P1-1, P2-1 (with a caveat), the Denis zones in
  P3-1, P3-3 (with two differences) and P5-1. The caveat and differences are in the sources
  file, for the author.
- [ ] Still unchecked, because the papers are paywalled: L5 transverse process (P2-2), the
  Denis deficit rates (P3-1), the U- or H-shaped fracture (P3-2). Kept on the page with the
  "Unchecked draft" note, by the author's choice (2026-10-23). They need the full text.

### Pelvis calculators (Young-Burgess, Letournel)

Drafted 2026-10-23 as an unchecked draft (`/young-burgess`, `/letournel`). Every paper and claim
is in `docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md`.

- [x] Match references PC1 to PC7 on PubMed and Crossref (2026-10-23). All matched; DOIs added.
- [x] LT-1 (the ten types) verified against Scheinfeld 2015's abstract; parts of YB-3, YB-4,
  LT-3 and LT-5 too.
- [ ] Still unchecked, because the papers are paywalled and their abstracts do not give the
  subtype wording: YB-1, YB-2, YB-6 (2.5 cm), YB-8 (stability), YB-9, LT-2, LT-4, LT-6, LT-7.
  Kept with the "Unchecked draft" notes by the author's choice (2026-10-23). They need the
  full text.

### Foot calculators (Hawkins, Sanders, Myerson)

Drafted 2026-10-23 as an unchecked draft (`/hawkins`, `/sanders`, `/myerson`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-foot-calculators-sources.md`.

- [x] Match references C1–C4 on PubMed and Crossref (2026-10-23). All found; DOIs added.
- [x] HK-7 (types I–III, from Canale and Kelly) and SA-6 verified; HK-1 to HK-3, SA-1, SA-3
  and SA-4 in part. Sanders types now use the abstract's names ("split depression" for type
  III) and the page gives its outcome figures by type, by the author's choice to match the
  papers (2026-10-23).
- [ ] Still unchecked: HK-4, HK-5, HK-6 and HK-8 (Hawkins 1970 has no abstract), SA-2, SA-5,
  the 2 mm in SA-3, and Myerson MY-1 to MY-6 (the abstract gives no types).

### Pediatric elbow radiographs

Drafted 2026-10-23 as an unchecked draft (`/studies/pediatric-elbow`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md`. Deployed before
the check (2026-10-23); labelled "Unchecked draft" until it is done.

- [x] Match references E1–E12 on PubMed and Crossref (2026-10-23). All found; Weiss's DOI and
  Judet's title corrected; DOIs and `<Cite>` links added (Gartland and Judet have no DOI).
- [x] Verified from abstracts: PE2-2, PE3-2 (76%), PE4-2, PE6-1; others in part.
- [x] Matched to the papers by the author's choice (2026-10-23): ossification follows Cheng's
  order and ages (girls 1, 5, 5, 9, 9, 10; boys about 2 years later except the capitellum),
  not CRITOE at 1-3-5-7-9-11, which Iyer's abstract does not state; an optional Sex field
  picks the ages, and with no sex entered the later (boys') ages are used, the site's choice.
  The anterior humeral line cites Herman for the middle third and Rogers for under 2½ years;
  radiographs underestimate anterior but overestimate medial displacement (Edmonds).
- [ ] Still unchecked: everything cited to Iyer (its abstract states none of it), the Gartland,
  O'Brien and Judet types (no abstracts), Jakob's stages, PE2-3, PE3-1, PE4-3, PE5-1, PE5-2.

## Housekeeping

- Delete the `design-update` branch and the `radref-design` worktree
  (`git worktree remove ../radref-design`, then `git branch -d design-update`) once
  nothing else is needed from them.
