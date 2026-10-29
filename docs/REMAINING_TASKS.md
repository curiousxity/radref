# Remaining tasks

Last updated 2026-10-28, when the site was organised by body region (PR #9) and the
pending items below were recorded. Before that, 2026-10-24: the sources check of every
October draft (references matched and DOIs added, claims that differed matched to their
papers, and claims that only the paywalled full text could confirm kept as unchecked, all
by the author's choice).

## Pending (recorded 2026-10-28)

- Done 2026-10-28: members sign-in is live (see CLAUDE.md, "Members pages"). Only the author's
  email is on the "Rad Ref members" policy so far; add each member's email there (Zero Trust →
  Access controls → Policies), or switch to "Emails ending in" for a whole domain.
- Done 2026-10-28: Cloudflare's own Git build is disabled (Worker radref → Settings → Builds →
  "Disable builds"; the repo stays connected), so only the GitHub Action deploys.
- **Regions, decisions to confirm.** The home page, menu and `/regions/<slug>` pages are by
  region since 2026-10-28. Choices made without the author:
  - a 13th region, "General", for pages with no body part (contrast pages, IR
    anticoagulation, vessel diameters, ellipsoid volume, Doppler indices);
  - Hip has only Letournel of its own, so the pelvis CT study and the pelvis 3D model are also
    listed under Hip (`alsoIn`);
  - the skull base pages and carotid stenosis are also under Neuro, the brachial plexus also
    under Shoulder; rectal, prostate and adnexal MRI are under Pelvis;
  - the home tabs and the Studies blurb ("How to read each study, step by step.") are gone.
- **Elbow OCD sentence (E2-6), the author to decide.** The elbow study says MRI judges
  capitellar OCD stability from the fragment-bone interface and the overlying cartilage.
  Kijowski and De Smet 2005, read in full, supports the interface (a high-T2 rim or cyst
  means unstable) but says cartilage "was not assessed"; the cartilage signs come from knee
  and talus studies. Trim to the interface, or keep it with another citation? Unchanged until
  then; details in `docs/superpowers/research/2026-10-23-elbow-mri-sources.md`, "Third check".
- **Two more for the author, from the 2026-10-28 re-search** (details in the sources docs):
  - Elbow E11-1: the page cites Rosenberg, AJR 1995 for the anconeus epitrochlearis compressing
    the ulnar nerve (four places), but the paper, read in full, never mentions it.
  - Knee K2-1: the pivot-shift femoral contusion is "near the terminal sulcus" on the page;
    Sanders 2000's legends say its position depends on knee flexion (posterior with moderate
    flexion, anterior near the sulcus with minimal), and the abstract says "midportion".
- **PDFs needed from the author** (`docs/PAPERS_NEEDED.md`): Herbert and Fisher 1984 (Bone &
  Joint asks for sign-in), Vaccaro 2016 (the Utrecht record has no file), the ten shoulder
  papers (Hill 1940, Richards 1994, Ellman 1990, Patte 1990, Goutallier 1994, Snyder 1990,
  Fritz 1992, Sugaya 2005, Tuite 1996, Smith 1996; none has a free copy), and section 1.
- **Example scans still to add**, in this order: the fracture classifications Mason,
  Mayfield, Herbert, Palmer and fifth metatarsal; then the MSK MRI studies (ankle, foot,
  diabetic foot, knee, shoulder, elbow, wrist). CC BY only, licence version stated; no
  CC BY-NC and nothing without a clear licence. PMC candidates found but not yet vetted:
  - Mason: PMC12565371 (J Clin Med 2025), PMC12766341 (Cureus review), PMC13337401,
    PMC12127406.
  - Mayfield (perilunate): PMC13426297 (Cureus, 16 cases), PMC12974986, PMC12717834,
    PMC13631426, PMC12272136.
  - Herbert (scaphoid): PMC13710594 (Eur Radiol consensus), PMC13653879, PMC13694059.
  - Palmer (TFCC): PMC13652943 (Skeletal Radiol), PMC13447642 (Insights Imaging),
    PMC10381215, PMC13294428.
  - Fifth metatarsal: PMC13502435 (KSSTA), PMC12551980 (Cureus review), PMC12875555,
    PMC11446485.
- **Hearing loss CT:** the five "For the author" questions (see its section below).
- **Calvarium and hearing loss** moved into Studies on 2026-10-28 but are single pages;
  Report, Learn and Quiz tabs like the other studies are optional.

## Fix soon

Nothing at the moment. The browser check of both themes was done on 2026-10-25 (home,
TI-RADS, Doppler indices, rectal MRI, ankle MRI, fifth metatarsal, the otic capsule embed and
the knee full screen, at 320px, 700px and 860px). Both themes looked right and no page
scrolled sideways. It found one bug, now fixed: above phone width the categories wrap and
the header grows to 91–138px, while sticky panels and study tabs assumed 57px and slid under
it. `App.tsx` now measures the header into `--header-h`.

Between 641 and 700px the header takes three rows (138px). A phone-style menu button up
to ~900px would keep it to one row; the author chose to leave it as it is (2026-10-25).

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
  `docs/superpowers/specs/2026-10-23-pelvis-ct-study-design.md`. Deployed before the check.
  Done once the sources check passes and the author signs it off.
- [x] Head and neck: decided 2026-10-25. Each viewer gets a study and no calculator, one study
  per region covering several exams and histories, picked in step 1. The otic capsule and
  ossicular chain already have the temporal bone CT study; TMJ is skipped for now (2026-10-23).
- [ ] Suprahyoid neck: CT or MRI for a mass, CT for infection. Drafted 2026-10-25 as an
  unchecked draft (`/studies/suprahyoid-neck`); spec
  `docs/superpowers/specs/2026-10-25-suprahyoid-neck-study-design.md`. On the branch only until
  the author says to merge. Done once the sources check passes and the author signs it off.
- [ ] Larynx: CT for a known cancer, MRI for a known cancer, CT for hoarseness (the author's
  choice, 2026-10-25). Written 2026-10-25 with the paper databases reachable, every claim read in
  an abstract or open full text (`/studies/larynx`); spec
  `docs/superpowers/specs/2026-10-25-larynx-study-design.md`. On the branch only until the author
  says to merge. Every claim is now checked (the T4a wording on 2026-10-25, from Joshi's AJCC
  table); done once the author signs it off.
- [ ] Skull base: MRI for a cranial nerve palsy, MRI for perineural spread, CT for a skull base
  mass (the author's choice, 2026-10-25). Written 2026-10-25 with the paper databases reachable,
  every claim read in an abstract or open full text (`/studies/skull-base`); spec
  `docs/superpowers/specs/2026-10-25-skull-base-study-design.md`, claims
  `docs/superpowers/research/2026-10-25-skull-base-sources.md`. On the branch only until the
  author says to merge. Done once the author signs it off.
- [ ] Decide whether the brachial plexus viewer gets a study.

For each region, ask first which exam the study covers and what history usually comes
with it. The ankle was MRI with a history of "pain" only.

## To do when on a computer

The cloud environment blocks the paper databases (PubMed, PubMed Central, Crossref,
doi.org, Europe PMC), so these checks wait for a machine that can reach them. Do each
check the way the ankle was done (`docs/superpowers/research/2026-10-19-ankle-mri-sources.md`):
match the paper on PubMed, resolve its DOI on Crossref, and count a claim as verified only
when its wording is in the abstract or open full text.

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

Drafted 2026-10-23 as an unchecked draft (`/studies/wrist-mri`). Every paper and claim is in `docs/superpowers/research/2026-10-23-wrist-mri-sources.md`.

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

Drafted 2026-10-23 as an unchecked draft (`/studies/foot-mri`). Every paper and claim is in `docs/superpowers/research/2026-10-23-foot-mri-sources.md`.

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

Drafted 2026-10-23 as an unchecked draft (`/studies/diabetic-foot-mri`).
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

### Suprahyoid neck CT and MRI

Drafted 2026-10-25 as an unchecked draft (`/studies/suprahyoid-neck`). Every paper and claim is
in `docs/superpowers/research/2026-10-25-suprahyoid-neck-sources.md`.

- [x] Match references N-R1 to N-R14 on PubMed and Crossref (2026-10-25). All found; Shin's
  author list corrected; DOIs and `<Cite>` links added (Estrera 1983 and Russo 1997 have no
  DOI; Lemierre 1936 is on Crossref only).
- [x] Verified from abstracts: N2-8, N2-10, N2-11, N3-2, N3-4, N4-1, N4-2; N2-7 and N3-3 in part.
- [x] Matched to the papers by the author's choice (2026-10-25): flow voids "in every
  paraganglioma over 2 cm" (Olsen); a rim-enhancing collection was an abscess in 82%, fluid
  without a rim in 67%, and gas meant an abscess every time (Freling, replacing "a rim does not
  prove pus"); masticator abscesses spread by where they sit (Schuknecht, replacing "above the
  zygomatic arch"); 11 mm for the subdigastric node only, 10 mm for the rest of level II, and
  necrosis of 3 mm or more only in nodes with tumour (van den Brekel, replacing Som's "most
  reliable sign").
- [ ] Still unchecked, because the papers have no abstract or the abstract does not touch the
  claim: the fat-shift directions and usual lesions (N2-1 to N2-4, N2-6, Harnsberger and Osborn),
  the deep parotid signs (N2-5, Shin), carotid splaying (N2-7), retropharyngeal edema against
  abscess (N2-9, Hoang), the mylohyoid line (N2-12, Mardini), Lemierre (N3-1) and V3 through the
  foramen ovale (N3-3). Kept with the "Unchecked draft" note. They need the full text.

### Larynx CT and MRI

Written 2026-10-25 (`/studies/larynx`). Every reference was matched on PubMed and Crossref and
every claim read before it went in; the table is
`docs/superpowers/research/2026-10-25-larynx-sources.md`.

- [x] The T4a cartilage criterion (L2-1), checked 2026-10-25 against Joshi's AJCC seventh edition
  table (Table 2, read once the environment allowed `cdn.ncbi.nlm.nih.gov`; Lydiatt: the eighth
  edition did not change the larynx T categories). Supraglottic and glottic T4a is "through the
  thyroid cartilage", as the study had it. Subglottic T4a is "invading cricoids and/or thyroid
  cartilage", which the study did not have; the author chose to match the paper, so a subglottic
  tumour invading the cricoid or the thyroid cartilage (inner cortex included) is now T4a.
- [ ] The author's review. The source note still starts "Unchecked draft" until then.

## Calculator follow-up intervals

The author asked (2026-10-25) for every calculator's copy boxes to be the standard report sections
(done: see CLAUDE.md, "Copy boxes") and for every guideline follow-up interval to be in the
calculators, checked against the guideline. Checked on 2026-10-25 against the full texts: the ACR
PDFs (once `edge.sitecorecloud.io` was allowed) and the author's PDFs of MacMahon 2017, Silverman
2019, Levine 2019, Doubilet 2013, Mayo-Smith 2017, Herts 2018 and Megibow 2017 (pubs.rsna.org,
jacr.org and escholarship.org refuse automated requests even when allowed).

- [x] TI-RADS: matches the ACR TI-RADS reporting template (TR3 1.5-2.4 cm at 1, 3 and 5 years; TR4
  1-1.4 cm at 1, 2, 3 and 5 years; TR5 0.5-0.9 cm every year for 5 years).
- [x] Lung-RADS v2022: matches the ACR table.
- [x] Fleischner 2017: matches MacMahon 2017, Table 1.
- [x] Bosniak 2019: IIF changed to Table 4's "then annually for a total of 5 years" (it said
  "annually for 5 years").
- [x] LI-RADS v2018: matches the v2018 core management chart.
- [x] SRU simple adnexal cysts: matches Levine 2019, Tables 1 and 2.
- [x] Early pregnancy loss: changed to Doubilet's 7 to 10 days (Table 3 footnote); the page said 7
  to 14. The logic moved to `src/logic/earlyPregnancyLoss.ts` so it could be tested.
- [x] O-RADS US: every category now carries the v2022 chart's management, including the Classic
  Benign Lesions table (new lesion-type choice); extraovarian classic lesions stay O-RADS 2 at any
  size.
- [x] Incidental adrenal and renal masses: rebuilt from the white papers' flowcharts in
  `src/logic/incidentalAdrenal.ts` and `src/logic/incidentalRenal.ts`, with their intervals.
- [x] ACR 2017 pancreatic cysts: Charts 1, 2A, 2B and 4 (2.5 cm or less) match Megibow's figures.

Questions found in the check, decided by the author on 2026-10-25 (all "match the paper"):

- [x] Pancreatic cysts over 2.5 cm: Megibow's Chart 3 low-risk schedule (every 6 months for 2
  years; if stable, yearly for 2, then every 2 years for 3; stop if stable over 10 years) and
  Chart 4's (every 2 years twice) added to the shared intervals, so the calculator, the study's
  report and the study's Learn text all give them. Chart 1 at 65-79 now says "stop if stable over
  10 years", as the chart does.
- [x] TI-RADS: the follow-up advice at the FNA size ("If observed instead ...") removed; the ACR
  template gives follow-up only below the FNA threshold.
- [x] Bosniak III and IV: the calculator uses Silverman's Table 4 phrases.
- [x] O-RADS US: a smooth bilocular cyst under 10 cm is category 2 (followed like a non-simple
  cyst), and a new "irregular inner wall" input makes a unilocular cyst 3 and a bilocular or
  multilocular one 4.

## Calvarial lesions page

Written on 2026-10-25 (`/calvarium`) from three open-access CC BY 4.0 sources read in full: Gomez
et al., Insights Imaging 2018 (doi:10.1007/s13244-018-0643-0); Pons Escoda et al., Insights Imaging
2020 (doi:10.1186/s13244-019-0820-9); Sideris et al., Brain Sci 2023 (doi:10.3390/brainsci13040587).
Every statement on the cards is from those texts, cited inline; the scans are single panels cropped
from Gomez's and Pons Escoda's figures (fetched with the Europe PMC supplementary-files API, since
the PMC pages show a reCAPTCHA and Springer's image host is blocked), each credited with its figure.
Where the two reviews differ (LCH peak age 1-3 versus 6-10 years), the page gives both.

- [ ] The author's review. The source note says "not yet reviewed by the site author" until then.
- [x] Burr hole and osteomyelitis now have CT panels from CC BY 4.0 case reports (2026-10-28):
  Sanjabi 2026 Fig. 1 and Li 2026 Fig. 2D (burr hole), Manzoor 2026 Fig. 2 (frontal osteomyelitis).
- [ ] The "Read the vault in layers" drawing has no real scan beside it yet.

## Hearing loss CT page

Drafted on 2026-10-28 (`/hearing-loss-ct`) in a cloud session that could not reach PubMed, PMC,
Europe PMC or Crossref. Claims, verdicts and the figures chosen are in
`docs/superpowers/research/2026-10-28-hearing-loss-ct-sources.md`.

- [x] The four Purohit 2014 panels (CC BY 2.0, per Crossref) and eight more CC BY 4.0 panels are in
      `public/scans/hearing-loss/` (2026-10-28); figures and licences are listed in the sources doc.
- [ ] No open CC BY figure with a stated licence version for the labyrinthine fistula yet.
- [x] Claims checked on PubMed, Crossref and the open full texts (2026-10-28); the ACR Hearing Loss
      and/or Vertigo criteria now cite the header, and Young 2014 is confirmed.
- [ ] Five questions for the author at the end of the sources doc ("For the author"): where claims
      differ from their papers or have no source. Nothing was reworded.
- [ ] The author's review; then change the source note away from "Unchecked draft".

## Calculator papers from the author (first batch)

On 2026-10-25 the author sent the first batch from `docs/PAPERS_NEEDED.md`: Johnston 1962, Broberg
and Morrey 1986, Durkee 2006, AO Spine's thoracolumbar poster and five review papers (Kilcoyne 1990
for Neer; the Clin Orthop Relat Res "In Brief" reviews of Mason, Mayfield, Schatzker, Young-Burgess
and Sanders). The verdicts and quotes are in a "Second check" section at the end of each sources
document. Where the site differed, the author chose the newer source, and these changed:

- Mayfield: "perilunate dislocation" is stage III, not II; stage II is capitolunate disruption with
  the capitate subluxed or dislocated; stage IV says the lunate dislocates volarly.
- Sanders: displaced now means more than 2 mm (type I is 2 mm or less); comminution is four or more
  fragments. The 1993 paper itself gave no figure.
- Young-Burgess: LC II also covers a sacroiliac disruption (new option); combined mechanism is most
  often LC with APC or VS; APC I is under 2.5 cm with no posterior instability. Stability stays, as
  "usually taught as", with the review's sentence that it is not part of the system.
- Letournel: a broken ilioischial line with a wall fragment is no longer always PCPW; the calculator
  asks whether the column itself is separated. The iliac wing tells both-column from T-shaped.
- AO Spine (thoracolumbar): A0 needs a process fracture; B1, B2, B3, C, N2, N3, "+", M1 and M2
  reworded to the poster; the thoracolumbar code is written the poster's way, "C (A3; N3; M2)". The
  poster is hosted unchanged in `public/references/` (CC BY-NC-ND 4.0) and linked from the page.
- Mason: the 2 mm and 30% are not in the 1986 paper; they are now cited to Broberg and Morrey 1987,
  still unchecked.

- [ ] Schatzker type IV: the review calls it a split of the medial plateau; the calculator still
  counts any medial plateau fracture as IV. For the author.
- [ ] The subaxial AO Spine facets, neurology and modifiers are still unchecked (poster asked for).
- [ ] Still pending: Broberg and Morrey 1987, Khurana 2014, Rao 1999, Spence 1970 (`docs/PAPERS_NEEDED.md`).
- [x] Knee cartilage depth grades (under half / half or more): neither Outerbridge nor Recht gives them.
  The author chose (2026-10-25) to keep the four grades as they are, with no source named.

Fourth batch, the same day: Neer review, AO Surgery Reference's Herbert page, Recht, Shin, Hoang,
Anderson and D'Alonzo ("Fifth check" sections). Changed: Herbert gains B5 (comminuted); Neer's
valgus-impacted four-part fracture is described; the carotid "forward and inward" sign is back, from
Shin; retropharyngeal edema has "only mild" mass effect and an abscess "usually" a thick wall, with a
suppurative node option (Hoang); odontoid types in Anderson's words; the 6.9 mm rule no longer
reassures below the threshold.

Third batch, the same day: AO Spine's subaxial poster, Markhardt, Harnsberger and Osborn, Iyer, and the
Outerbridge and scaphoid reviews ("Fourth check" sections). Changed:

- Schatzker: the author confirmed type IV is any isolated medial plateau fracture, split or depressed
  (Markhardt's wording); the 4 mm depression threshold is now in the text.
- AO Spine (subaxial): neurology and "+" as the thoracolumbar poster; M3 adds OLF; the code follows
  the subaxial poster ("B2 (A1, F4 BL, N2, M3)"), with facet-only injuries coded; poster hosted.
- Suprahyoid neck: "internal carotid pushed forward" is not in Harnsberger and Osborn; the sign is now
  theirs, "pushed back and out" for a lateral retropharyngeal node.
- Knee cartilage depth grades: still no source; Outerbridge is arthroscopic. Recht 2005 is asked for.
- Herbert: the scaphoid review does not give the types; AO Surgery Reference is blocked here.

Second batch, the same day: reviews of Lichtman, Hawkins, Lisfranc, Letournel, AO thoracolumbar,
Gartland, Goutallier, Ellman and Denis ("Third check" sections in the sources documents). Changed:

- Lichtman: stage wording from the review; stage IIIC (coronal fracture of the lunate) added; stage I
  has its MRI finding back (decreased T1 signal, from the 1993 modification); IIIA and IIIB by
  radioscaphoid angle 60°; IV is pancarpal arthritis. The split was 1993, not 1982.
- Hawkins: type I is "undisplaced or minimally displaced"; the Hawkins sign is on the AP view, and its
  absence does not reliably predict osteonecrosis; IIA and IIB named.
- Paediatric elbow: the cortical-contact types are Wilkins's modification of Gartland, credited so.
- Pelvis CT: Denis rates confirmed; the U- or H-shaped fracture is "lumbopelvic dissociation".
- Shoulder: Goutallier and Ellman wording confirmed; the reviews are cited.
- AO thoracolumbar review agrees with the poster except M1 ("imaging or a physical examination") and
  the notation; the poster's versions are kept (see the spine sources document).

## Housekeeping

- Delete the `design-update` branch and the `radref-design` worktree
  (`git worktree remove ../radref-design`, then `git branch -d design-update`) once
  nothing else is needed from them.
