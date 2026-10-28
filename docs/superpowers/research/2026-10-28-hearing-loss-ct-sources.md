# Hearing loss on temporal bone CT: sources and claims

Date: 2026-10-28 · Page: `/hearing-loss-ct` (`src/pages/HearingLossCtPage.tsx`)

The author asked (2026-10-28) for a quick-reference page on what to look for on temporal bone CT
in adult sensorineural hearing loss, with real scans and drawings, delivered as a pull request.

## Status: written without the paper databases

This cloud session could not reach PubMed E-utilities, PubMed Central, Europe PMC or Crossref
(the proxy refused them). Two papers were read through web tools instead: Purohit 2014 (full
text, on Springer) and Verbist 2012 (full text, on PMC). Mukherji 1997 was read as an abstract.
Every other reference is one the temporal bone CT study already cites and checked in September
2026, or is new and unverified. The page's source note starts "Unchecked draft" until the claims
marked below are checked and the author reviews it.

No scan could be downloaded. `src/data/hearingLossImages.ts` names the figure chosen for each
slot; the page shows a scan only once its file is added.

## References

| # | Citation | DOI | Read |
|---|---|---|---|
| H1 | Purohit B, Hermans R, Op de beeck K. Imaging in otosclerosis: a pictorial review. Insights Imaging. 2014;5(2):245-252. | 10.1007/s13244-014-0313-9 | full text (Springer; PMC3999364). Licence: the article says "Creative Commons Attribution License"; Crossref gives creativecommons.org/licenses/by/2.0, so **CC BY 2.0** |
| H2 | Verbist BM. Imaging of sensorineural hearing loss: a pattern-based approach. Insights Imaging. 2012;3(2):139-153. | 10.1007/s13244-011-0134-z | full text (PMC3314739). Licence CC BY-NC: its figures are not used, since the site uses CC BY figures |
| H3 | Lee TC et al. CT grading of otosclerosis. AJNR 2009;30:1435-1439. | 10.3174/ajnr.A1558 | already in the temporal bone CT study |
| H4 | Vijayasekaran S et al. When is the vestibular aqueduct enlarged? AJNR 2007;28:1133-1138. | 10.3174/ajnr.A0495 | already in the study |
| H5 | Little SC, Kesser BW. Arch Otolaryngol Head Neck Surg 2006;132:1300-1304. | 10.1001/archotol.132.12.1300 | already in the study |
| H6 | Juliano AF et al. Imaging review of the temporal bone, part I. Radiology 2013;269:17-33. | 10.1148/radiol.13120733 | already in the study |
| H7 | Juliano AF et al. Imaging review of the temporal bone, part II. Radiology 2015;276:655-672. | 10.1148/radiol.2015140800 | already in the study |
| H8 | Baráth K et al. Neuroradiology of cholesteatomas. AJNR 2011;32:221-229. | 10.3174/ajnr.A2052 | already in the study |
| H9 | Mukherji SK et al. Papillary endolymphatic sac tumors: CT, MR imaging, and angiographic findings in 20 patients. Radiology 1997;202(3):801-808. | 10.1148/radiology.202.3.9051037 | abstract (PubMed 9051037). Authors (17, first three as cited), volume and pages confirmed on Crossref |
| H10 | Belden CJ et al. CT evaluation of bone dehiscence of the superior semicircular canal. Radiology 2003;226:337-343. | 10.1148/radiol.2262010897 | already in the study |
| H11 | Young JY, Ryan ME, Young NM. Preoperative imaging of sensorineural hearing loss in pediatric candidates for cochlear implantation. RadioGraphics 2014;34(5):E133-E149. | 10.1148/rg.345130083 | abstract (PubMed 25208295). Authors, title, journal, volume, issue and pages confirmed on Crossref; full text paywalled, no free copy (Unpaywall) |
| H12 | Expert Panel on Neurologic Imaging: Sharma A, Kirsch CFE, Aulino JM, et al. ACR Appropriateness Criteria Hearing Loss and/or Vertigo. J Am Coll Radiol. 2018;15(11S):S321-S331. | 10.1016/j.jacr.2018.09.020 | abstract (PubMed 30392601) and the rating tables on acsearch.acr.org (topic 69488, still the current version: the 2023 and 2024 ACR updates are Dizziness and Ataxia) |

## Claims

| Claim on the page | Source | Verdict |
|---|---|---|
| Fenestral focus at the fissula ante fenestram, in front of the oval window | H1 | verified |
| Foci as small as 1 mm seen on thin-section CT | H1 | verified |
| Otosclerosis bilateral in about 85% | H1 | verified |
| Cochlear form: pericochlear "double ring"; rarely without fenestral disease; often symmetric | H1 | verified |
| CT can miss it in the sclerotic phase when the bone contour is normal | H1 | verified |
| Grades 1, 2A, 2B, 2C, 3 | H3 | as in the study |
| Cochlear form causes the sensorineural part of the loss | H1 (mechanism: cochlear injury) | verified in substance |
| Cochlear cleft: normal variant, mainly children, less common with age, mimics a focus | H1 | verified |
| Paget and osteogenesis imperfecta can mimic cochlear otosclerosis; other bones tell them apart | H1 | verified |
| Fibrous dysplasia usually spares the otic capsule; say if it narrows the EAC or IAC | H7 | **unchecked** |
| Labyrinthitis ossificans: bone fills the cochlea or canals, usually after meningitis or infection | H2 (Fig. 5 covers bone formation; meningitis wording unconfirmed) | **part** |
| Report whether the basal turn is open, for implant planning | none | **unchecked**; check against H11 or an implant imaging paper |
| Early fibrous stage shows on MRI as loss of fluid signal | H2 | **part**: Fig. 5 is MRI and CT of labyrinthitis; wording unconfirmed |
| Pneumolabyrinth means the inner ear has been opened (perilymph leak) | H7 | **unchecked** |
| EVA: midpoint ≥1.0 mm or operculum ≥2.0 mm | H4 | as in the study |
| Otic capsule-violating fractures: 25× SNHL, 5× facial nerve injury, 8× CSF leak | H5 | as in the study |
| Fistula from cholesteatoma: lateral canal the usual site | H8 | **unchecked** |
| ELST: retrolabyrinthine, destructive, calcification on CT | H9 | verified (abstract) |
| ELST: think of von Hippel–Lindau, especially if bilateral | none | **unchecked**; not in the H9 abstract |
| Widened IAC: schwannoma; MRI with contrast; normal CT does not exclude a small one | H2 | **part**: H2 covers schwannoma on MRI; the CT wording is not in it |
| MRI is the usual first test for one-sided SNHL (header) | none | **unchecked**; cite the ACR Appropriateness Criteria, Hearing Loss and/or Vertigo |
| SCD: coronal or Pöschl reformats; vertigo; conductive-type loss rather than pure SNHL | H10 | **part**: title supports vertigo; the hearing wording is unconfirmed |
| Implant checklist (round window, facial nerve, mastoid, jugular bulb, sigmoid, carotid, IAC) | H11 | **unchecked** |

## Figures used for the scans

Checked and added on 2026-10-28 on a computer. Each file is one panel, cropped, converted to
single-channel greyscale and kept under 40 KB, from the Europe PMC supplementary-files API. The
licence was read in the article's own licence statement (Europe PMC full-text XML) and in Crossref.

| Slot | File | Source | Figure | Licence (article / Crossref) |
|---|---|---|---|---|
| `fenestral` | fenestral.jpg | Purohit 2014 (PMC3999364) | Fig. 2b | "Creative Commons Attribution License" / by/2.0 |
| `cochlear` | cochlear.jpg | Purohit 2014 | Fig. 12b | as above |
| `cochlearCleft` | cochlear-cleft.jpg | Purohit 2014 | Fig. 7a (axial) | as above |
| `paget` | paget.jpg | Purohit 2014 | Fig. 16 (one panel) | as above |
| `fibrousDysplasia` | fibrous-dysplasia.jpg | Pontes-Madruga et al. Braz J Otorhinolaryngol 2022;88:235-242 (PMC9422534) | Fig. 2 | "CC BY license (…/by/4.0/)" / by/4.0 |
| `labyrinthitisOssificans` | labyrinthitis-ossificans.jpg | Ostrander et al. Front Radiol 2026;6:1784554 (PMC13230221) | Fig. 6 (one panel) | CC BY, ext-link …/by/4.0/ / by/4.0 |
| `pneumolabyrinth` | pneumolabyrinth.jpg | Maillot et al. Insights Imaging 2016;7:341-350 (PMC4877355) | Fig. 10b | "Creative Commons Attribution 4.0 International License" / by/4.0 |
| `eva` | eva.jpg | Salata et al. Radiol Bras 2019;52:54-59 (PMC6383528) | Fig. 7 (patient's left side) | "Creative Commons Attribution License", no version / by/4.0 |
| `fracture` | fracture.jpg | Kohler et al. Tomography 2024;10:727-737 (PMC11125930) | Fig. 1a | "CC BY license (…/by/4.0)" / by/4.0 |
| `elst` | elst.jpg | Ge et al. Chin Neurosurg J 2020;6:16 (PMC7398243) | Fig. 1a | "Creative Commons Attribution 4.0 International License" / by/4.0 |
| `iac` | iac.jpg | Dörner et al. Neurosurg Rev 2024;47:262 (PMC11162400) | Fig. 1D | "Creative Commons Attribution 4.0 International License" / by/4.0 |
| `scd` | scd.jpg | Vlachodimitropoulos et al. S Afr J Radiol 2026;30:a3278 (PMC12969493) | Fig. 1a (Pöschl) | "CC BY 4.0" / by/4.0 |

Notes:

- `scd.jpg` was made grey from the red channel rather than by luminance, so the authors' red arrow
  stays visible (it turned the same grey as the background otherwise); grey pixels are unchanged.
- `fibrous-dysplasia.jpg` is trimmed at the edges to leave out the scanner's burned-in date text.
- Dörner Fig. 1's caption does not name the modality; panel D is plainly a bone-window CT.
- **No figure for the labyrinthine fistula.** Zica et al. Medicina 2025 (CC BY 4.0) was rejected:
  low resolution, the arrow does not clearly mark the lateral canal, and Fig. 2 has burned-in
  scanner text. Kishan Siddapur et al. Cureus 2023 (PMC10448227) has a good axial image but its
  licence gives no version and Crossref lists none; left out.
- Verbist 2012 (CC BY-NC) is still not used.

## Figures chosen for the scan slots

All from H1 (Purohit 2014), once its CC BY version is confirmed. Panel letters were not visible
in the text read; pick the panel the arrows mark and add its letter to `figure`.

| Slot (`hearingLossImages`) | Figure | Shows |
|---|---|---|
| `fenestral` | Fig. 2 | bilateral fenestral involvement |
| `cochlear` | Fig. 12 | pericochlear double ring |
| `cochlearCleft` | Fig. 7 | cochlear cleft |
| `paget` | Fig. 16 | Paget disease mimicking cochlear otosclerosis |

Still to find (CC BY, open access): labyrinthitis ossificans, pneumolabyrinth, otic capsule-violating
fracture, lateral canal fistula, endolymphatic sac tumour, enlarged vestibular aqueduct, widened
IAC, superior canal dehiscence, fibrous dysplasia of the temporal bone.

## Check with the databases (2026-10-28)

Done on a computer with PubMed, Crossref, Europe PMC, PMC and Unpaywall reachable. Verdicts for
every claim marked unchecked or part above. Juliano part II (H7), Young (H11) and Belden (H10) are
paywalled with no free copy, so only their abstracts were read. Claims that do not match a paper
are listed for the author at the end; none was reworded.

| Claim | Verdict | Evidence |
|---|---|---|
| Fibrous dysplasia usually spares the otic capsule; say if it narrows the EAC or IAC (H7) | **unchecked in H7** (no free text); supported elsewhere | H7 abstract does not mention it. Brown et al. AJR 1995;164:679-682 (doi:10.2214/ajr.164.3.7863893), abstract: "may involve the temporal bone and related structures, including the external canal, middle ear, jugular foramen, or, rarely, the otic capsule." Pontes-Madruga 2022 abstract: "External auditory meatus stenosis and conductive dysacusis are the most common manifestations … whereas the involvement of the otic capsule is an unusual one." |
| Labyrinthitis ossificans: bone fills the cochlea or canals, partly or completely (H2) | verified | Verbist: "Eventually fibroblastic proliferation may occur, followed by bone formation, leading to permanent partial or complete obliteration of the inner ear." |
| … "usually after meningitis or other inner ear infection" (H2) | **does not match H2** | Verbist gives the causes as "infectious (bacterial, viral), inflammatory or auto-immune … spread … contiguously through the middle ear, cerebrospinal fluid and meninges or haematogenously. It may also be seen as an inflammatory reaction after a translabyrinthine fracture." No "usually", and meningitis is not singled out. Young abstract: "labyrinthitis ossificans in some children with deafness resulting from bacterial meningitis". |
| Report whether the basal turn is open; this decides whether an implant can go in normally (none) | **part** | Young abstract: labyrinthitis ossificans "may cause obstruction that limits electrode insertion". Verbist: obliteration "might preclude the patient from cochlear implantation". Neither names the basal turn. |
| Early fibrous stage shows on MRI as loss of fluid signal (H2) | verified | Verbist: "Once fibroblasts or osseous tissue fills the labyrinth, signal loss will be seen on thin-sliced three-dimensional (3D) T2-weighted images … On CT, only osseous changes will be seen and the extent of obliteration may be underestimated." |
| Pneumolabyrinth means the inner ear has been opened (perilymph leak) (H7) | **unchecked in H7**; supported elsewhere | Venkatasamy et al. Eur Arch Otorhinolaryngol 2020;277:1045-1051 (doi:10.1007/s00405-020-05820-3), abstract: "A disorientation of the footplate or the presence of a pneumolabyrinth are clearly in favor of an oval window perilymphatic fistula." Maillot 2016 Fig. 10 caption: "a perilymphatic fistula, highlighted by a pneumolabyrinth". |
| Fistula from cholesteatoma: lateral canal the usual site (H8) | verified in substance | Baráth (PMC7965719, full text): "Labyrinthine fistula is the most frequent complication associated with middle ear cholesteatoma, with a prevalence of 5%–10%. … the CT finding of a dehiscent lateral semicircular canal (Fig 7B) support the diagnosis. A dehiscence on the cochlear promontory represents an uncommon location for labyrinthine fistula." |
| ELST: think of von Hippel–Lindau, especially if bilateral (none) | **part**; no source cited on the page | Not in Mukherji's abstract. Manski et al. JAMA 1997;277:1461-1466 (doi:10.1001/jama.277.18.1461), abstract: "15 ELSTs in 13 (11%) of 121 patients with VHL, but in none of the 253 patients without evidence of VHL (P<.001)". The association is supported; "especially if bilateral" is not stated (the 15-in-13 implies two bilateral cases). |
| Widened IAC suggests a mass, most often schwannoma; recommend MRI with contrast, "which is the test for this" (H2) | **part** | Verbist: "By far the most common soft tissue tumour in this area is the schwannoma (85%)" and "The imaging modality of choice to assess the internal auditory canal (IAC) … is MRI. There is some controversy whether the imaging protocol should include contrast enhanced images". So MRI yes; "with contrast" is not Verbist's position. |
| A normal CT does not exclude a small schwannoma (none) | **unchecked** | Not in Verbist. Dörner Fig. 1 caption ("tumor size does not always correspond with widening of the internal acoustic canal") is consistent but does not say it. |
| MRI with contrast is the usual first test for one-sided SNHL (header; now cited to H12) | **part** | ACR Variant 3, "Acquired sensorineural hearing loss. Initial imaging": "MRI head and internal auditory canal without and with IV contrast: Usually Appropriate"; "MRI head and internal auditory canal without IV contrast: Usually Appropriate"; "CT temporal bone without IV contrast: May Be Appropriate". The variant is not limited to one-sided loss, and non-contrast MRI is rated the same. The H12 abstract states neither. |
| SCD: coronal or Pöschl reformats (H10) | verified | Belden abstract: PPV "93% with 0.5-mm-collimated CT with reformation in the plane of the SSC". |
| SCD: vertigo; conductive-type loss rather than pure SNHL (H10) | **part** | Belden's title and abstract support "sound- and/or pressure-induced vertigo" only. Minor et al. Otol Neurotol 2003;24:270-278 (doi:10.1097/00129492-200303000-00023): "Superior canal dehiscence can result in apparent conductive hearing loss." |
| Implant checklist: round window, facial nerve, mastoid, jugular bulb, sigmoid, carotid, IAC (H11) | **part** | Young abstract: CT and MRI assess "inner-ear abnormalities, cochlear nerve deficiency, and variant anatomy"; "Anatomic variations of the facial nerve or middle-ear cavity … may also affect the surgical approach". The round window, jugular bulb, sigmoid, carotid and mastoid items are not in the abstract; full text paywalled. Young is about children; the page is for adults. |
| Young 2014 reference itself | verified | Crossref: Young JY, Ryan ME, Young NM, RadioGraphics 34(5):E133-E149, 2014. |

### For the author

1. **Labyrinthitis ossificans cause.** The page says "usually after meningitis or other inner ear
   infection"; Verbist lists infection, inflammation, autoimmune disease and translabyrinthine
   fracture without "usually". Keep, reword to Verbist, or find a source for "usually meningitis".
2. **MRI first test (header).** ACR rates MRI with *or without* contrast as usually appropriate for
   acquired SNHL, not specifically one-sided loss. The page says "MRI with contrast … for one-sided
   loss". The same point applies to "Recommend MRI with contrast" on the widened IAC card (Verbist
   calls contrast controversial).
3. **Claims cited to Juliano part II that its abstract does not state** (fibrous dysplasia,
   pneumolabyrinth). Open papers support both; cite Brown 1995 and Venkatasamy 2020 instead, or
   keep Juliano and leave them unchecked until its full text is read.
4. **No source on the page:** ELST and VHL (Manski 1997 supports the association, not "especially if
   bilateral"); "a normal CT does not exclude a small schwannoma"; the basal turn for implants;
   SCD "conductive-type loss" (Minor 2003 supports it; the page cites only Belden).
5. **Implant checklist** cited to Young: the abstract supports facial nerve and middle-ear anatomy
   and labyrinthitis ossificans only, and it is a paediatric paper.
