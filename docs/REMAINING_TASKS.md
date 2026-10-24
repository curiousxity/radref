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
claim is in `docs/superpowers/research/2026-10-23-elbow-mri-sources.md`, marked "to check".
Deployed before the check (2026-10-23); labelled "Unchecked draft" until it is done.

- [ ] Match references E1–E17 on PubMed and Crossref; fix citation text. E1, E2 and E7 may
  have no DOI. The author lists and pages of E9, E11, E13 and E17 are the least certain.
- [ ] Mason types I–III (MA-1 to MA-3) against Mason 1954; Johnston's type IV, fracture
  with dislocation (MA-4), against Johnston 1962.
- [ ] Broberg-Morrey: under 2 mm is type I, 2 mm or more with 30% or more of the head is
  type II (MA-5, MA-6). Are these numbers really in the 1986 paper? A fragment displaced
  2 mm or more but under 30% of the head gets no type on the page (the site's choice).
- [ ] Horii circle: soft tissues fail lateral to medial, LUCL first (E1-1, O'Driscoll 1992).
- [ ] Regan-Morrey coronoid types (E2-2); terrible triad (E2-3, Ring 2002, or should it be
  Hotchkiss?).
- [ ] Panner versus osteochondritis dissecans (E2-4); the capitellar pseudodefect (E2-5);
  OCD stability signs (E2-6).
- [ ] UCL anterior bundle (E3-1); the undersurface tear or T-sign (E3-2): was it described
  on MRI or only on CT arthrography (Timmerman)?
- [ ] LUCL insufficiency and posterolateral rotatory instability (E4-1, O'Driscoll 1991).
- [ ] Medial epicondylitis (E5-1); lateral epicondylitis (E6-1) and LUCL abnormalities with
  it (E6-2).
- [ ] Distal biceps, partial versus complete (E7-1); triceps and brachialis (E8-1); nerves
  and denervation edema (E9-1).
- [ ] Anconeus epitrochlearis and the ulnar nerve (E11-1, Rosenberg 1995).
- [ ] Then: add DOIs, switch plain-text citations to `<Cite>` links, reword the source
  notes, and update the tests that pin the unchecked state.

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

Drafted 2026-10-23 as an unchecked draft (`/studies/diabetic-foot-mri`). Every paper and claim
is in `docs/superpowers/research/2026-10-23-diabetic-foot-mri-sources.md`, marked "to check".

- [ ] Match references D1–D7 on PubMed and Crossref.
- [ ] The T1 rule (D3-1, Johnson 2009) and spread from the ulcer (D2-1, Ledermann 2002): these
  two decide the "osteomyelitis" line, so check them first.
- [ ] Secondary signs (D1-1), pressure-point sites and septic arthritis (D2-2, D2-3).
- [ ] Ghost sign and abscess (D4-1, D4-2, Donovan 2010); Charcot distribution (D5-1);
  non-enhancing tissue (D6-1); active Charcot before radiographs (D7-1, Chantelau 2005).
- [ ] Then: add DOIs, switch plain-text citations to `<Cite>` links, reword the source note,
  and update the tests that pin the unchecked state.

### Spine CT for pain or injury

Drafted 2026-10-23 as an unchecked draft (`/studies/spine-trauma-ct`). Every paper and claim
is in `docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md`, marked "to check";
the AO Spine wording is under the calculator below.

- [ ] Match references T-R1 to T-R10 on PubMed and Crossref.
- [ ] Basion–dens 8.5 mm and atlantodental 2 mm on adult CT (T2-1, Rojas 2007).
- [ ] Spence 6.9 mm and that MRI shows what the rule misses (T2-2, T2-3); odontoid types (T2-4).
- [ ] Expanded Denver criteria (T5-1, Burlew 2012); a C3 injury entered as a subaxial level does
  not trigger the chip.
- [ ] Genant grades and their boundaries (T6-1); benign and malignant collapse (T6-2, Laredo
  1995); ankylosed spine (T1-1, Westerveld 2009).
- [ ] Then: add DOIs, switch plain-text citations to `<Cite>` links, reword the source note,
  and update the tests that pin the unchecked state.

### AO Spine calculator

Drafted 2026-10-23 as an unchecked draft (`/ao-spine`). Every claim is in
`docs/superpowers/research/2026-10-23-spine-calculators-sources.md`, marked "to check".

- [ ] Match references S1 and S2 on PubMed and Crossref.
- [ ] Types A0–A4, B1–B3, C (AO-1 to AO-3); the B3 > B2 > B1 order (AO-4) and how a B or C
  injury writes its body type (AO-5).
- [ ] Facets F1–F4 and the 1 cm / 40% boundary (AO-6, AO-7); neurology, "+" and the
  modifiers (AO-8 to AO-10).
- [ ] Then: add DOIs and reword the source note.

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
claim is in `docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md`, marked "to
check". Deployed before the check (2026-10-23); labelled "Unchecked draft" until it is done.

- [ ] Match references E1–E12 on PubMed and Crossref; fix wrong citation text, drop any
  paper that cannot be found. Cheng, Rogers and Judet are the least certain.
- [ ] CRITOE order and ages 1, 3, 5, 7, 9, 11 (PE2-1, Iyer 2012: are these ages really in
  that paper?); measured ages vary and girls ossify earlier (PE2-2, Cheng 1998).
- [ ] Trochlea seen without the medial epicondyle suggests an entrapped medial epicondyle
  (PE2-3).
- [ ] Fat pads mean an effusion (PE3-1); a posterior fat pad with no visible fracture means
  an occult fracture is likely, 76% (PE3-2, Skaggs 1999). The "occult fracture likely"
  impression line rests on PE3-2 alone.
- [ ] Anterior humeral line through the middle third of the capitellum (PE4-1, Rogers 1978);
  the anterior third is common under age 4 (PE4-2, Herman 2009).
- [ ] Radiocapitellar line and Monteggia (PE4-3).
- [ ] Supracondylar fracture is the commonest (PE5-1); Gartland I–III wording (PE5-2);
  type IV (PE5-3, Leitch 2006).
- [ ] Weiss lateral condyle types I–III at 2 mm and the articular surface (PE6-1, PE6-2);
  Jakob stages (PE6-3).
- [ ] Medial epicondyle entrapment (PE7-1); radiographs underestimate displacement
  (PE7-2, Edmonds 2010).
- [ ] O'Brien radial neck types I–III at 30° and 60° (PE8-1): do exactly 30° and 60° fall
  in type II, as the page assumes? Judet (PE8-2).
- [ ] Then: add DOIs, switch plain-text citations to `<Cite>` links, reword the source note,
  and update the tests that pin the unchecked state.

## Housekeeping

- Delete the `design-update` branch and the `radref-design` worktree
  (`git worktree remove ../radref-design`, then `git branch -d design-update`) once
  nothing else is needed from them.
