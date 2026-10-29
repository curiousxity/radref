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

## The author's decisions, 2026-10-29

The author settled all five questions above (items 42 to 46 of the to-do list; item 46, the
implant checklist, came later the same day). Two points of the implant checklist are stated by
neither of the sources the author chose for it (Widmann, Vogl): the sigmoid sinus item and
otosclerosis as the example of a round window closed by bone. They stay as they were, so the page
keeps "Unchecked draft", and its source note names them.

Every quote below was read on 2026-10-29: in open full text from Europe PMC (`fullTextXML`) or
PubMed Central (E-utilities `efetch`, `db=pmc`), or in the PubMed abstract where marked. The ACR
narrative was read on acsearch.acr.org (topic 69488, "New 2018"; the narrative text sits in the
page's `data-origtext` attributes). Each new reference was matched on Crossref by its DOI.

Read and cited:

- Brown EW, Megerian CA, McKenna MJ, Weber A. Fibrous dysplasia of the temporal bone: imaging findings. AJR Am J Roentgenol. 1995;164(3):679-682. doi:10.2214/ajr.164.3.7863893 (PubMed 7863893, abstract)
- Pontes-Madruga TC, Filgueiras HVC, da Silva DMS, da Silva LS, Testa JRG. Fibrous dysplasia: rare manifestation in the temporal bone. Braz J Otorhinolaryngol. 2022;88(2):235-242. doi:10.1016/j.bjorl.2020.05.027 (PMC9422534, full text; already the source of the fibrous dysplasia scan)
- Buch K, Baylosis B, Fujita A, Qureshi MM, Takumi K, Weber PC, Sakai O. Etiology-specific mineralization patterns in patients with labyrinthitis ossificans. AJNR Am J Neuroradiol. 2019;40(3):551-557. doi:10.3174/ajnr.A5985 (PMC7028650, abstract; PMC holds only the abstract)
- Widmann G, Dejaco D, Luger A, Schmutzhard J. Pre- and post-operative imaging of cochlear implants: a pictorial review. Insights Imaging. 2020;11(1):93. doi:10.1186/s13244-020-00902-6 (PMC7429612, full text)
- Tokat T, Catli T, Basaran Bozkurt E, Olgun L. Surgical methods and auditory outcomes of cochlear implantation in cochlear ossification. J Int Adv Otol. 2022;18(1):51-56. doi:10.5152/iao.2022.20146 (PMC9449912, full text)
- Botti C, Castellucci A, Crocetta FM, Fornaciari M, Giordano D, Bassi C, Ghidini A. Pneumolabyrinth: a systematic review. Eur Arch Otorhinolaryngol. 2021;278(12):4619-4632. doi:10.1007/s00405-021-06827-0 (PubMed 33881577, abstract)
- Gross M, Ben-Yaakov A, Goldfarb A, Eliashar R. Pneumolabyrinth: an unusual finding in a temporal bone fracture. Int J Pediatr Otorhinolaryngol. 2003;67(5):553-555. doi:10.1016/s0165-5876(03)00013-2 (PubMed 12697360, abstract). This is the journal article behind the cris.huji.ac.il record.
- Manski TJ, Heffner DK, Glenn GM, et al. Endolymphatic sac tumors: a source of morbid hearing loss in von Hippel-Lindau disease. JAMA. 1997;277(18):1461-1466. doi:10.1001/jama.1997.03540420057030 (PubMed 9145719, abstract). PubMed gives doi:10.1001/jama.277.18.1461, which redirects to the Crossref DOI used here.
- Kim HJ, Hagan M, Butman JA, Baggenstos M, Brewer C, Zalewski C, Linehan WM, Lonser RR. Surgical resection of endolymphatic sac tumors in von Hippel-Lindau disease: findings, results, and indications. Laryngoscope. 2013;123(2):477-483. doi:10.1002/lary.23646 (PMC7560989, full text through PMC `efetch`; Europe PMC's full-text service returned an error)
- Jung NY, Park JB. Von Hippel-Lindau disease: a comprehensive review of diagnosis, genetics, clinical challenges, and surveillance. J Korean Neurosurg Soc. 2025;68(3):338-349. doi:10.3340/jkns.2025.0018 (PMC12062539, full text)
- Bausch B, Wellner U, Peyre M, et al. Characterization of endolymphatic sac tumors and von Hippel-Lindau disease in the International Endolymphatic Sac Tumor Registry. Head Neck. 2016;38(Suppl 1):E673-E679. doi:10.1002/hed.24067 (PubMed 25867206, abstract)
- Minor LB, Carey JP, Cremer PD, Lustig LR, Streubel SO, Ruckenstein MJ. Dehiscence of bone overlying the superior canal as a cause of apparent conductive hearing loss. Otol Neurotol. 2003;24(2):270-278. doi:10.1097/00129492-200303000-00023 (PubMed 12621343, abstract). The title in the table above was wrong; this is the paper's title.
- Vogl TJ, Tawfik A, Emam A, Naguib NN, Nour-Eldin A, Burck I, Stöver T. Pre-, intra- and post-operative imaging of cochlear implants. Rofo. 2015;187(11):980-989. doi:10.1055/s-0035-1553413 (PubMed 26327670). Read in full in the published PDF deposited with the German National Library (d-nb.info/1171901585/34); the journal citation and DOI are from PubMed and Crossref, and the PDF's own footer reads "Fortschr Röntgenstr 2015; 187: 980–989".
- Eberhard KE, Chari DA, Nakajima HH, Klokker M, Cayé-Thomasen P, Lee DJ. Current trends, controversies, and future directions in the evaluation and management of superior canal dehiscence syndrome. Front Neurol. 2021;12:638574. doi:10.3389/fneur.2021.638574 (PMC8055857, full text)

Removed: Juliano part II (H7) is no longer cited on the page (it was cited only for fibrous
dysplasia and pneumolabyrinth, and its abstract states neither), so it is out of the reference list.

Not used:

- Lo WW. Imaging of cochlear and auditory brain stem implantation. AJNR Am J Neuroradiol. 1998;19(6):1147-1154 (PubMed 9672030, PMC8338650). PMC has it as a scanned PDF only, and the PDF links (PMC, Europe PMC, ajnr.org) answered with a browser challenge, so it was not read and is not cited. The implant wording is cited to Widmann and Tokat, which state it.
- Venkatasamy 2020 (suggested in question 3): not used, as the author asked; Gross 2003 states the pneumolabyrinth claim.
- Ostrander et al. 2026 (the labyrinthitis ossificans scan) agrees ("Cochlear fibrosis or labyrinthitis ossificans can make electrode insertion difficult or impossible"; "may preclude round window electrode insertion") but is not cited, since Widmann says the same. It also states the two checklist points that Widmann and Vogl do not: "identifying surgical challenges such as cochlear malformation, anteriorly placed sigmoid sinuses, poorly pneumatized mastoid bones, aberrant facial nerve course, or narrow facial recess"; "Common venous variations include an anterior and/or lateral sigmoid sinus and a high-riding jugular bulb, both of which constrict the operative field during mastoidectomy"; "Coronal CT in this patient with otosclerosis shows bony overgrowth causing severe stenosis of the round window (RW)." It is not cited for them, because the author named Widmann and Vogl as the checklist's sources; citing it would settle both points.

| Item | Decision | Change on the page |
|------|----------|--------------------|
| 42. Labyrinthitis ossificans cause | Replace "usually after meningitis or other inner ear infection" with an insult list from Verbist. | Look text: "Labyrinthitis ossificans is ossification of the labyrinth following an infectious, inflammatory or other inner-ear insult, including meningitis, chronic otomastoiditis, trauma and temporal bone surgery (Verbist; Buch et al.)". Verbist: "Labyrinthitis may be of infectious (bacterial, viral), inflammatory or auto-immune origin, and the spread of disease may occur either contiguously through the middle ear, cerebrospinal fluid and meninges or haematogenously. It may also be seen as an inflammatory reaction after a translabyrinthine fracture." Verbist does not list surgery or haemorrhage, so Buch was added: "The most common risk factors were chronic otomastoiditis (n = 18), temporal bone surgery (n = 9), temporal bone trauma (n = 6), sickle cell disease (n = 5), and meningitis (n = 4)." **Haemorrhage was left out**: no source read states it as a cause. The shorter alternative ("particularly after bacterial meningitis") was not used: Buch's adult series has meningitis as the least common of its five risk factors. |
| 43. MRI first | Word it as the ACR rates it, for acquired SNHL, with both MRI exams. | Header: "For acquired sensorineural hearing loss, MRI of the head and internal auditory canals is usually appropriate, either without IV contrast or without and with IV contrast (ACR)" (was "MRI with contrast is the usual first test for one-sided loss"). Widened IAC card: "Recommend MRI of the head and internal auditory canals, without IV contrast or without and with IV contrast (ACR)" (was "Recommend MRI with contrast, which is the test for this (Verbist)"); Verbist stays cited for the schwannoma. The normal-study recommendation in Report wording had the same "with contrast" and was changed to match. ACR narrative, summary: "Variant 3: MRI head and internal auditory canal without IV contrast, or without and with IV contrast, is recommended for evaluating patients with acquired sensorineural hearing loss." and "there is insufficient evidence to prove incremental benefit of contrast administration beyond an MRI IAC protocol performed without IV contrast [27,28]". |
| 44. Fibrous dysplasia | Cite Brown 1995; don't imply ground glass is the only appearance. | Look: "classically "ground glass" on CT (Pontes-Madruga et al.), but the pattern may also be pagetoid, sclerotic or cystic (Brown et al.). Otic-capsule involvement is uncommon (Brown et al.; Pontes-Madruga et al.)." Report: "Temporal-bone fibrous dysplasia may narrow the external auditory canal or involve middle-ear structures (Brown et al.; Pontes-Madruga et al.)." Drawing title: "drawn here as ground glass (one of its patterns)". Brown: "The three major radiographic classifications of fibrous dysplasia are pagetoid, sclerotic, and cystic. Any of these types may involve the temporal bone and related structures, including the external canal, middle ear, jugular foramen, or, rarely, the otic capsule." Brown says "involve", not "narrow", so Pontes-Madruga is cited for the narrowing: "External auditory meatus stenosis and conductive dysacusis are the most common manifestations … whereas the involvement of the otic capsule is an unusual one"; "Patients with an uncertain diagnosis, without the classic ground-glass aspect on temporal bone tomography were excluded." **The internal auditory canal was dropped** from "say whether it narrows the external or internal auditory canal": no source read says fibrous dysplasia narrows the IAC. |
| 44. Pneumolabyrinth | Use the supported statement; replace Juliano only where the new source states the claim. | Report: "Pneumolabyrinth is air within the inner-ear labyrinth, indicating an abnormal communication with an air-containing space (the middle ear or mastoid); thin-section temporal bone CT demonstrates it (Gross et al.)" (was "It means the inner ear has been opened (a perilymph leak) … (Juliano et al.)"). Gross: "The presence of air in the inner ear is evidence of a pathological connection between the inner ear and the air-filled mastoid or middle ear cavities." and "Diagnosis was made by means of a high resolution, thin sections computed tomography (CT) scan of the temporal bones". The look line, previously unsourced ("Usually after trauma or ear surgery"), now cites Botti: "The most common causes were: stapes surgery (24/132, 18.2%), temporal bone fracture (42/132, 31.8%), head trauma without temporal bone fracture (19/132, 14.4%), penetrating trauma (21/132, 15.9%), and barotrauma (15/132, 11.4%). The site most commonly involved was the vestibule (102/107, 95.3%)". "Perilymph leak" was dropped: Gross does not say it. Juliano part II is no longer cited. |
| 45. ELST and VHL | Keep, sharpen, cite; unilateral disease does not exclude VHL. | Report: "Endolymphatic sac tumours may be associated with von Hippel–Lindau disease (Manski et al.; Kim et al.); bilateral tumours strongly suggest VHL (Jung and Park). A one-sided tumour does not exclude it: 39% of apparently sporadic tumours carried a VHL germline mutation (Bausch et al.)." Manski: "15 ELSTs in 13 (11%) of 121 patients with VHL, but in none of the 253 patients without evidence of VHL (P<.001)". Kim: "ELSTs can occur sporadically but are frequently found in von Hippel-Lindau (VHL) disease patients who can develop bilateral tumors."; "Once a diagnosis of ELST is suspected in a case of unknown VHL status, a comprehensive evaluation for VHL disease should be initiated." Jung and Park: "bilateral ELSTs are considered pathognomonic for the disease". Bausch: "The prevalence of VHL germline mutations in apparently sporadic ELSTs was 39%." Neither Kim nor Manski says bilateral tumours point to VHL, hence the review. |
| 45. Normal CT and schwannoma | Keep, cite the ACR narrative. | Widened IAC card: "A normal temporal bone CT does not exclude a schwannoma: CT is insensitive to the soft-tissue causes of sensorineural loss and shows a schwannoma only indirectly, by remodelling of the canal. Dedicated IAC MRI is the preferred examination for suspected retrocochlear disease (ACR)." ACR: "CT of the temporal bone is insensitive in detection of soft-tissue abnormalities that commonly cause sensorineural hearing loss. … It may demonstrate labyrinthine ossification [16] resulting from prior infection or give an indirect clue to presence of a vestibular schwannoma in the form of bony remodeling of the IAC."; "MRI is the imaging modality of choice for evaluating these soft-tissue structures"; "MRI should be done using dedicated IAC protocol using thin sections across the IAC and the inner ear."; "MRI obtained using IAC protocol can be helpful in looking for any retrocochlear pathology". **"Small" was dropped**: the ACR does not speak of tumour size, only that CT shows the tumour indirectly; no peer-reviewed source read says a small tumour is missed on CT. |
| 45. Implants | Keep, sharpen, cite; don't imply only the basal turn matters. | Labyrinthitis ossificans report: "Say which turns and canals are filled. For a cochlear implant, assess cochlear patency, particularly the basal-turn scala tympani and round-window region, because these form the usual electrode-entry route; fibrosis or ossification may complicate insertion (Widmann et al.), and the further the ossification extends, the more drilling is needed (Tokat et al.)" (was "whether the basal turn is open. This decides whether a cochlear implant can go in normally"). Impression template: "The basal turn and round window region are [patent / …]". Widmann: "the electrode array is inserted into the cochlea via three routes: (a) round window (preferred), (b) extended round window … and (c) cochleostomy"; "The electrode array is intended to be placed in the scala tympani with close contact to the organ of Corti"; "Postmeningitic basal turn ossification and fibrosis may block successful antegrade cochlear implantation despite the availability of sophisticated implants and advanced drill-out procedures." Tokat: "Neo-ossification is mostly confined to the round window (RW) and proximal scala tympani."; "For stage II, if basal turn ossification (BTO) contained the entire inferior part of the basal turn until 180°, a patent lumen was obtained by limited drilling (2-7 mm) along the obliterated basal turn. For stage III, if the ossification spread beyond 180° of the cochlear basal turn and BTO involved more than 2 turns, a circumodiolar drill-out procedure was needed". AJNR 1998;19(6):1147 (Lo) could not be read; see above. |
| 45. Superior canal dehiscence | Keep, sharpen, cite; separate radiological dehiscence from the syndrome. | Report: "It may produce a low-frequency air–bone gap, a conductive-type or "pseudo-conductive" hearing-loss pattern, through a third-window mechanism, despite no primary middle-ear lesion (Minor et al.; Eberhard et al.), and sound- or pressure-induced vertigo (Belden et al.). Mention it if you see it, but a dehiscence on CT is not the syndrome: it can be incidental, and superior canal dehiscence syndrome needs compatible symptoms and physiological evidence, such as audiometry and VEMPs, not CT alone (Eberhard et al.)." Minor: "air-bone gaps in the affected ears that were greatest at lower frequencies"; "Each patient had an intact vestibular-evoked myogenic potential (VEMP) response from the affected ear, a finding that would not have been expected based on a middle ear cause of conductive hearing loss."; "The third mobile window created by the dehiscent superior canal results in dissipation of acoustic energy and is a cause of inner ear conductive hearing loss." Eberhard: "Air conducted sound stimulation results in volume velocity from the stapes to be shunted toward the SCD (third window) and away from the cochlea, resulting in increased air-conduction thresholds at low frequencies"; "further supporting the theory that SCD generates a pseudo-conductive hearing loss"; "a radiologic dehiscence may be an incidental finding without clinically relevant symptoms. Sole evidence of dehiscence on imaging is insufficient to make a diagnosis of SCDS or surgical intervention."; "Established clinical testing that reveals supranormal bone conduction thresholds, low frequency air-bone gap (ABG) with present acoustic reflexes, low threshold cervical vestibular evoked myogenic potentials (cVEMP) and increased ocular VEMP (oVEMP) amplitudes are useful in guiding management options in symptomatic patients with radiologic superior canal dehiscence (SCD)." |
| 46. Implant checklist | Replace Young as the sole citation: primary Widmann 2020, surgical anatomy from Vogl 2015, Young kept as a supplementary paediatric reference; say "adapted from"; check each item. | Lead: "If the scan is for an implant, say each of these, normal or not. The preoperative cochlear-implant imaging checklist is adapted from Widmann et al. (2020), with additional surgical-anatomy considerations from Vogl et al. (2015). For children, see also Young et al. (2014)." Vogl, the checklist it is adapted from: "Pre-operative CT provides invaluable information about relevant structures. The cochlea should be evaluated for malformations and patency; the width of the internal auditory canal should be noted; the round window evaluated for patency; the cochlear and vestibular aqueducts for width; the carotid canal and jugular bulb for course variation or dehiscence; the facial nerve evaluated for its course and bony covering; the mastoid for degree of pneumatization and presence of mastoiditis; and the middle ear for the presence of otitis or cholestaeatoma [30]." Item by item: **Cochlea** (now "any malformation? Is it patent, particularly the basal turn, or is there ossification? Early fibrosis may show only on MRI"): Vogl above; Widmann: "Postmeningitic basal turn ossification and fibrosis may block successful antegrade cochlear implantation"; "Sclerosis of the cochlea can be seen in HRCT; however, early fibrotic stages may only be depicted by MRI". **Round window** (unchanged): patency is Vogl's ("the round window evaluated for patency"; Widmann adds the hypoplastic round window); **"for example otosclerosis" is in neither**, left as is. **Facial nerve** (unchanged): Vogl, "its course and bony covering"; Widmann: "Malformations of the inner ear are frequently accompanied by abnormal positions of the facial nerve, which increases the risk of facial nerve palsy during surgery". **Mastoid** (now "Mastoid and middle ear: how well the mastoid is aerated; any mastoiditis, otitis or cholesteatoma"): Vogl above; Widmann: "Acute infections such as otitis media and mastoiditis as well as chronic inflammation and cholesteatoma must be adequately controlled before CI surgery". **Jugular bulb** (was "high-riding or dehiscent?", now "course variation or dehiscence?") and **carotid canal** (was "normal course?", now "course variation or dehiscence?"): Vogl's wording; "high-riding" is not in Vogl or Widmann. **Sigmoid sinus** ("placed far forward?"): **in neither**, left as is. **Internal auditory canal** (now "Internal auditory canal and cochlear aperture: normal width? A narrow canal or aperture may indicate a hypoplastic or absent cochlear nerve; recommend MRI, the examination of choice for the nerve"; was "A very narrow canal raises concern for a missing cochlear nerve"): Vogl: "the width of the cochlear aperture and of the internal auditory canal can serve as an indirect indicator of possible hypoplasia of the cochlear nerve through assessment via CT"; "MRI, on the other hand, provides better soft tissue contrast and is the modality of choice for imaging of the cochlear nerve"; Widmann: "In about one third of cases of stenotic bony cochlear nerve canal, there is also a stenotic internal auditory canal with a diameter at the midpoint of the canal smaller than 2.5 mm. These patients frequently show a hypoplastic or aplastic cochlear nerve". CT for bone, MRI for nerve and fluid (Widmann): "The strength of the MRI is the visualization of the fluid content of the membraneous labyrinth"; "Visualization of the vestibulocochlear nerve in the fluid-filled internal auditory canal and cerebellopontine angle is only possible by the MRI". Vogl also lists the cochlear and vestibular aqueducts; no item was added for them (the EVA card covers the vestibular aqueduct). |

`src/pages/hearingLoss.test.ts` pins the new source note and the wording for items 42, 43, 45 and 46.
