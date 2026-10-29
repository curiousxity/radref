# Brachial plexus MRI

Date: 2026-10-29 · Branch: `claude/brachial-plexus-study`

## Intent

The brachial plexus viewer gets a study (the author's choice, 2026-10-28). The author asked for
"the typical indications" (2026-10-29), chosen in step 1 like the skull base study's exam and
history picker. No calculator.

## Which indications, and why

The ACR Appropriateness Criteria for plexopathy (2021 update, Boulter et al.) are the guideline
that sets out when the plexus is imaged. They name three clinical scenarios for the brachial
plexus, each with its own ratings table:

1. Nontraumatic plexopathy, no known malignancy (variant 1).
2. Traumatic plexopathy, not perinatal (variant 3).
3. Known malignancy or post-treatment syndrome (variant 5).

The study follows them, with one split: a mass found in or beside the plexus with no known cancer
is taken out of variant 1 and given its own history, because its search pattern (nerve of origin,
nerve sheath tumour signs, features of malignancy) is unlike the search for a plexopathy with no
mass. Step 1 therefore offers four:

- **Traction injury: preganglionic or postganglionic?** Root avulsion, pseudomeningocele,
  paraspinal muscles, postganglionic injury and its grade. Szaro (part 2) names traumatic injury
  as the commonest indication for brachial plexus MRI.
- **Known cancer: tumour spread, or plexopathy after treatment.** Tumour against radiation
  plexopathy (Kori, Harper, Thyagarajan, Qayyum, Wittenberg), FDG-PET/CT, and the Pancoast tumour's
  T3 or T4 by its reach into the plexus (Kifjak, ninth edition TNM). Radiation fibrosis, lung and
  breast cancer were almost three-quarters of nontraumatic plexopathies in Wittenberg's series.
- **Mass in or beside the plexus.** Nerve sheath tumours (Binder, Jee, Bhargava, Li, Wasa) and
  other masses (lipoma).
- **Plexopathy with no injury and no known cancer.** Neuralgic amyotrophy (Gaskin, Sneag) and
  thoracic outlet syndrome. Thoracic outlet syndrome is in because it has its own ACR criteria
  (2020, neurogenic variant: chest MRI and radiograph usually appropriate) and MRI studies with
  surgical correlation (Demondion, Hardy, Baumer); the 3D model also plays it.

Left out: perinatal (obstetric) palsy, which the ACR excludes from the trauma scenario and which
needs its own planes; infection and CIDP, which are rare and thinly sourced here; DTI, still
experimental (Szaro part 1).

## Goals

1. `/studies/brachial-plexus` on the study framework, with Report, Learn and Quiz tabs.
2. Listed under Spine and Shoulder, as the 3D brachial plexus is, and linked to `/brachial-plexus`
   through `related` (declared on the study), so each page shows the other.
3. Written with PubMed, Crossref and Europe PMC reachable: every reference matched and every claim
   read in an abstract, an open full text (Szaro parts 1 and 2, Kifjak) or the ACR's published
   ratings tables before it went in, in
   `docs/superpowers/research/2026-10-29-brachial-plexus-sources.md`.

## Non-goals

- Example scans (a separate step); no `ScanFigures` block.
- Diagnosis by name from the findings: the chips say what each pattern went with in the papers,
  and the impression describes; the radiologist names the lesion. The one category the impression
  gives is the Pancoast tumour's T3 or T4, a staging rule.
- Management advice beyond what a paper states (Wasa's biopsy for two or more features is in its
  chip, not the impression).
- No change to the 3D viewer.

## Search pattern

1. Which study, and the technique: three planes, coronal fat-suppressed T2 or STIR with both
   sides, T1 without fat suppression; contrast except after trauma; the cervical spine with heavily
   T2-weighted images after trauma. ACR ratings as a chip.
2. The history and the side: the clinical pattern, Horner syndrome and hand pain, weeks since the
   injury; the primary cancer, the question, dose and timing of radiotherapy, pain, Horner syndrome
   and lymphoedema; neurofibromatosis; the clinical question for a plexopathy, and whether the arm
   was raised.
3. Roots, plexus and muscles: avulsion, its roots and signs, and the injury beyond the foramen
   with its level, retraction, gap and associated injuries; mass or diffuse change after cancer,
   the parts involved, the signal, a lung apex tumour's reach; the mass's origin, part, size,
   nerve sheath signs and features of malignancy, or fat; the plexus and branches, constrictions,
   denervated nerves and the thoracic outlet; denervated muscle for all.
4. Other findings and the impression.

## Calls made for the builder

- One required "Study" field stands in for the exam and the history, since all four are MRI.
- "Root avulsion" and "Beyond the foramen" are both required after trauma, because Szaro says the
  report should always say whether an avulsion is present or suspected.
- Kori's dose rule is applied in Gy (over 60 Gy, within 12 months), Szaro's 60 Gy threshold
  matching Kori's 6000 R.
- The site chips after treatment give Kori's figures with Harper's contrary finding beside them,
  since the series disagree.
- Wasa's abstract names the largest dimension as one of four features but gives no cut-off, so
  "Large" is a box the reader ticks; Li's means (3.4 cm benign, 8.2 cm malignant) are in the text.
- The apex field shows only for a mass in a patient with lung cancer.
- The grade chips (neuropraxia, grades 2 to 4, neuroma in continuity, grade 5) use Szaro part 2's
  MRI correlation.
