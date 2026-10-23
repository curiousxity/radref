# Remaining tasks

Last updated 2026-10-22, after the reading-room redesign and the ankle MRI study were merged
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
- Open question: should anatomical variants (os trigonum, peroneus quartus, low-lying
  peroneus brevis belly and so on) get their own impression line, or stay in findings only?

## Regions: model, lesson and calculator

The aim is for every 3D anatomy region to have a model, a full study page like rectal MRI,
and a classification calculator where one fits, all linked through `related`. Work one
region at a time, end to end, following the ankle pilot
(`docs/superpowers/specs/2026-10-19-ankle-mri-study-design.md` and its plan).

- [x] Ankle: ankle MRI study. No calculator, by the author's choice (no Weber or
  Lauge-Hansen).
- [ ] Knee: knee MRI study ("pain" only history) plus a Schatzker calculator, chosen
  2026-10-23. Spec: `docs/superpowers/specs/2026-10-23-knee-mri-study-design.md`. Waiting
  on the sources check, which the cloud environment's network blocks (PubMed, Crossref).
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

## Housekeeping

- Delete the `design-update` branch and the `radref-design` worktree
  (`git worktree remove ../radref-design`, then `git branch -d design-update`) once
  nothing else is needed from them.
