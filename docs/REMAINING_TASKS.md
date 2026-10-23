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
  so on) get their own impression line, not findings only: answered 2026-10-23 for the
  knee, as the same question. Not yet applied to the ankle MRI report.

## Regions: model, lesson and calculator

The aim is for every 3D anatomy region to have a model, a full study page like rectal MRI,
and a classification calculator where one fits, all linked through `related`. Work one
region at a time, end to end, following the ankle pilot
(`docs/superpowers/specs/2026-10-19-ankle-mri-study-design.md` and its plan).

- [x] Ankle: ankle MRI study. No calculator, by the author's choice (no Weber or
  Lauge-Hansen).
- [ ] Knee: knee MRI study ("pain" only history) plus a Schatzker calculator, chosen
  2026-10-23. Spec: `docs/superpowers/specs/2026-10-23-knee-mri-study-design.md`. Waiting
  on the sources check; see "To do when on a computer".
- [ ] Shoulder: candidate calculator Neer
- [ ] Elbow: candidate calculator Mason
- [ ] Wrist: candidate calculator Mayfield
- [ ] Foot: candidate calculator Sanders
- [ ] Spine: candidate calculators SLIC and TLICS
- [ ] Pelvis: candidate calculators Young-Burgess and Letournel
- [ ] Decide whether the head-and-neck and plexus viewers are included: otic capsule,
  ossicular chain, TMJ, skull base, suprahyoid neck, larynx, brachial plexus.

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

Write the results to `docs/superpowers/research/<date>-knee-mri-sources.md`.

- [ ] **Schatzker types I–VI.** Find the wording of each type in Schatzker J, McBroom R,
  Bruce D, "The tibial plateau fracture: the Toronto experience 1968-1975", Clin Orthop
  Relat Res 1979. Sources disagree on type IV (medial split, with or without depression):
  record which wording the original uses.
- [ ] **CT and MRI change the Schatzker type.** Check Markhardt BK, Gross JM, Monu JU,
  "Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves
  assessment", Radiographics 2009: its DOI, and that the abstract says CT and MRI are more
  accurate than radiographs and changed surgical plans.
- [ ] **Meniscal tear criteria.** Find the De Smet paper on the "two-slice touch" rule
  (abnormal signal touching the surface on two or more images) and record its exact
  wording.
- [ ] **Meniscal tear types and root tears.** A review that names the tear types
  (horizontal, longitudinal, radial, root, complex, bucket handle).
- [ ] **Meniscal extrusion.** A paper that states the extrusion threshold (often quoted as
  3 mm) and how it is measured.
- [ ] **Discoid lateral meniscus.** A paper that states the MRI criteria.
- [ ] **Bone bruise patterns.** A review linking bruise patterns to mechanism (pivot shift
  and ACL tear, transient lateral patellar dislocation, dashboard injury, hyperextension).
- [ ] **ACL tear.** Primary and secondary MRI signs of complete and partial tears.
- [ ] **ACL reconstruction.** Normal graft appearance with time, graft tear signs, tunnel
  position and widening, cyclops lesion (arthrofibrosis).
- [ ] **PCL tear.** MRI signs of partial and complete tears.
- [ ] **MCL injury grading** on MRI.
- [ ] **Posterolateral corner.** Structures to check and MRI signs of injury.
- [ ] **Segond fracture** and its link to ACL tear.
- [ ] **Transient lateral patellar dislocation.** The MRI pattern, MPFL tear, and trochlear
  dysplasia signs.
- [ ] **Cartilage grading on MRI** (for example a modified Outerbridge scale).
- [ ] **Subchondral insufficiency fracture** of the knee: MRI signs.
- [ ] **Osteochondritis dissecans.** MRI signs of an unstable fragment.
- [ ] **Cysts and fat pads.** Popliteal (Baker) cyst, parameniscal cyst and its link to a
  meniscal tear, Hoffa fat pad.
- [ ] **Lipohaemarthrosis** (fat-fluid level) as a sign of an intra-articular fracture.

## Housekeeping

- Delete the `design-update` branch and the `radref-design` worktree
  (`git worktree remove ../radref-design`, then `git branch -d design-update`) once
  nothing else is needed from them.
