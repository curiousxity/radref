# Remaining tasks

Last updated 2026-10-23 (knee started). Before that, 2026-10-22, after the reading-room redesign and the ankle MRI study were merged
to `main`.

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
- [ ] Foot: candidate calculator Sanders
- [ ] Spine: candidate calculators SLIC and TLICS
- [ ] Pelvis: candidate calculators Young-Burgess and Letournel
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
and every claim is listed in `docs/superpowers/research/2026-10-23-knee-mri-sources.md`,
each marked "to check", with the method at the top of that file. **Do not merge this work
to `main` until the check is done**, because `main` deploys.

- [ ] Match the 19 references (K1–K19) on PubMed and Crossref; fix any citation text that
  is wrong, and drop any paper that cannot be found.
- [ ] Schatzker types I–VI (SZ-1 to SZ-6) against Schatzker 1979. Sources disagree on
  type IV (medial split, depression, or either): record the original wording.
- [ ] CT and MRI change the Schatzker type (SZ-7), Markhardt 2009.
- [ ] Fat-fluid level means an intra-articular fracture (K1-1).
- [ ] Bone bruise patterns and what each points to (K2-1 to K2-5).
- [ ] Segond fracture and ACL tear (K2-6).
- [ ] Subchondral lesion: over 4 mm thick or over 14 mm long predicts an irreversible
  lesion (K2-7).
- [ ] Osteochondritis dissecans instability signs, juvenile versus adult (K2-8).
- [ ] Two-slice-touch rule (K3-1), meniscal tear types (K3-2), extrusion of 3 mm or more
  (K3-3).
- [ ] Discoid lateral meniscus: bow-tie on 3 or more consecutive 5-mm images (K4-1);
  parameniscal cysts and meniscal tears (K4-2).
- [ ] ACL indirect signs (K5-1) and ACL graft complications (K5-2).
- [ ] MCL (K7-1) and the lateral stabilising structures (K8-1).
- [ ] MPFL injury after patellar dislocation (K9-1); lateral trochlear inclination below
  11° (K9-2).
- [ ] Cartilage depth categories (K10-1).
- [ ] Then: add the DOIs, switch the plain-text citations to `<Cite>` links, reword the
  source notes, and update the tests that pin the unchecked state.

### Shoulder MRI study and Neer calculator

Drafted 2026-10-23 as an unchecked draft (`/studies/shoulder-mri`, `/neer`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-shoulder-mri-sources.md`, marked "to
check". **Do not merge to `main` until the check is done.**

- [ ] Match every reference on PubMed and Crossref; fix wrong citation text, drop any paper
  that cannot be found. The author lists and pages of R2, R11, R12, R18 and R21 are the
  least certain.
- [ ] Neer (N1–N5): the four segments, displaced meaning more than 1 cm or more than 45°,
  one-part when nothing is displaced, the two-, three- and four-part patterns,
  fracture-dislocation and head-splitting / impression wording. N6: the author decided
  (2026-10-23) that a combination Neer did not name gets no part count; check that the
  paper really names no such pattern.
- [ ] Hill-Sachs: definition (Hill and Sachs 1940), Workman 1992, and the Richards 1994
  rule that tells it from the normal groove by level ("at or above the coracoid").
- [ ] Ellman partial-thickness tears: sides and depth grades (under 3, 3–6, over 6 mm). Is
  grade 3 "over 6 mm" or "over half the thickness"?
- [ ] Patte retraction stages 1–3.
- [ ] Goutallier grades 0–4 (exact grade 2 wording), and Fuchs 1999 on MRI against CT.
- [ ] Walch 1998: biceps dislocation goes with subscapularis tears.
- [ ] Snyder SLAP types I–IV.
- [ ] ALPSA and GLAD (Neviaser 1993), Bankart, bony Bankart and Perthes (Woertler and Waldt
  2006), HAGL (Wolf 1995).
- [ ] Paralabral cysts and labral tears (Tirman 1994), suprascapular versus spinoglenoid
  notch (Fritz 1992), teres minor atrophy in quadrilateral space syndrome (Linker 1993).
- [ ] Sugaya types I–V (IV and V are re-tears); the exact type III wording; is the 2005
  Arthroscopy paper the right first source?
- [ ] Variants: sublabral foramen (Tuite and Orwin 1996), Buford complex (Williams 1994),
  sublabral recess mimicking SLAP II (Smith 1996), os acromiale and impingement (Park 1994).
- [ ] Then: add the DOIs, switch plain-text citations to `<Cite>` links, reword the source
  notes, and update the tests that pin the unchecked state.

### Elbow MRI study and Mason calculator

Drafted 2026-10-23 as an unchecked draft (`/studies/elbow-mri`, `/mason`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-elbow-mri-sources.md`, marked "to check".
**Do not merge to `main` until the check is done.**

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

Drafted 2026-10-23 as an unchecked draft (`/studies/wrist-mri`). Every paper and claim is
in `docs/superpowers/research/2026-10-23-wrist-mri-sources.md`, marked "to check"; the
classification wording is under the calculators below. **Do not merge to `main` until the
check is done.**

- [ ] Match references R1–R18 on PubMed and Crossref; fix citation text. The author lists
  and pages of Theumann 2003, Vo 1995 and Conway 1985 are the least certain.
- [ ] Fall on the outstretched hand as the usual mechanism (W1-1).
- [ ] MRI finds occult scaphoid fractures when radiographs are normal (W2-1, Gaebler 1996:
  is it the right paper?).
- [ ] Ulnar impaction: focal signal at the ulnar proximal lunate, triquetrum and ulnar head
  with positive ulnar variance (W2-4, Imaeda 1996, Cerezal 2002); diffuse versus focal
  signal tells Kienböck from impaction (W2-5).
- [ ] Scapholunate ligament parts, dorsal strongest (W3-1, Berger 1996).
- [ ] Scapholunate angle 30–60° normal, over 60° DISI, under 30° VISI (W3-2, Linscheid
  1972): are these the paper's bounds, and do they apply on sagittal MRI?
- [ ] Lunotriquetral disruption and VISI (W4-1).
- [ ] Mayfield progression starts at the scapholunate unless the injury runs through the
  scaphoid (W5-2). The study counts the capitolunate joint as disrupted when the lunate is
  dislocated (the site's reading of the sequence).
- [ ] Palmer 2D and 2E include lunotriquetral perforation (W6-2); TFCC defects in wrists
  without symptoms (W6-3, Zanetti 2000).
- [ ] Extrinsic ligaments on MR arthrography (W7-1, Theumann 2003).
- [ ] de Quervain (W8-1, Glajchen 1996); intersection syndrome (W8-2, Costa 2003).
- [ ] Median nerve signs in carpal tunnel syndrome (W9-1, Mesgarzadeh 1989).
- [ ] Guyon canal and accessory muscles (W10-1, W12-3, Zeiss 1992); occult dorsal ganglia
  (W11-1, Vo 1995).
- [ ] Type II lunate (W12-1, Viegas 1990); carpal boss (W12-2, Conway 1985).
- [ ] Then: add DOIs, switch plain-text citations to `<Cite>` links, reword the source note,
  and update the tests that pin the unchecked state.

### Wrist calculators (Mayfield, Herbert, Palmer, Lichtman)

Drafted 2026-10-23 as an unchecked draft. Every paper and claim is in
`docs/superpowers/research/2026-10-23-wrist-calculators-sources.md`, marked "to check".

- [ ] Match references W1–W4 on PubMed and Crossref.
- [ ] Mayfield stages I–IV (MF-1 to MF-4) and that they are progressive (MF-5). Does the
  paper say a scaphoid fracture can take the place of the scapholunate tear?
- [ ] Herbert types A1–D2 (HB-1 to HB-5). Is the comminuted B5 in the original?
- [ ] Palmer classes 1A–1D and 2A–2E (PA-1 to PA-3).
- [ ] Lichtman stages (LI-1, LI-2, LI-4), and who split stage III into IIIA and IIIB (LI-3):
  find that paper and add it.

### Pediatric elbow radiographs

Drafted 2026-10-23 as an unchecked draft (`/studies/pediatric-elbow`). Every paper and
claim is in `docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md`, marked "to
check". **Do not merge to `main` until the check is done.**

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
