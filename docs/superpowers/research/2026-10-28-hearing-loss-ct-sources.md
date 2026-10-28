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
| H1 | Purohit B, Hermans R, Op de beeck K. Imaging in otosclerosis: a pictorial review. Insights Imaging. 2014;5(2):245-252. | 10.1007/s13244-014-0313-9 | full text (Springer). Licence: "Creative Commons Attribution License"; version not stated, confirm before using figures |
| H2 | Verbist BM. Imaging of sensorineural hearing loss: a pattern-based approach. Insights Imaging. 2012;3(2):139-153. | 10.1007/s13244-011-0134-z | full text (PMC3314739). Licence CC BY-NC: its figures are not used, since the site uses CC BY figures |
| H3 | Lee TC et al. CT grading of otosclerosis. AJNR 2009;30:1435-1439. | 10.3174/ajnr.A1558 | already in the temporal bone CT study |
| H4 | Vijayasekaran S et al. When is the vestibular aqueduct enlarged? AJNR 2007;28:1133-1138. | 10.3174/ajnr.A0495 | already in the study |
| H5 | Little SC, Kesser BW. Arch Otolaryngol Head Neck Surg 2006;132:1300-1304. | 10.1001/archotol.132.12.1300 | already in the study |
| H6 | Juliano AF et al. Imaging review of the temporal bone, part I. Radiology 2013;269:17-33. | 10.1148/radiol.13120733 | already in the study |
| H7 | Juliano AF et al. Imaging review of the temporal bone, part II. Radiology 2015;276:655-672. | 10.1148/radiol.2015140800 | already in the study |
| H8 | Baráth K et al. Neuroradiology of cholesteatomas. AJNR 2011;32:221-229. | 10.3174/ajnr.A2052 | already in the study |
| H9 | Mukherji SK et al. Papillary endolymphatic sac tumors: CT, MR imaging, and angiographic findings in 20 patients. Radiology 1997;202(3):801-808. | 10.1148/radiology.202.3.9051037 | abstract (RSNA page). Authors and pages to confirm on PubMed |
| H10 | Belden CJ et al. CT evaluation of bone dehiscence of the superior semicircular canal. Radiology 2003;226:337-343. | 10.1148/radiol.2262010897 | already in the study |
| H11 | Young JY, Ryan ME, Young NM. Preoperative imaging of sensorineural hearing loss in pediatric candidates for cochlear implantation. RadioGraphics 2014;34(5):E133-E149. | 10.1148/rg.345130083 | **not read**; citation from a search result and memory. Confirm authors and title |

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
