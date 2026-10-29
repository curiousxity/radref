# Wrist MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esummary`), its DOI resolved on Crossref, and a
claim marked verified only when its wording was read in the PubMed abstract (`efetch`).
None of the 18 papers has a PMC copy, so nothing here was read in full text. Unpaywall could
not be used (it refuses the placeholder address), and the RSNA, AJR and journal pages are
paywalled. Linscheid 1972 (R1) has no abstract in PubMed, so W3-2 and W4-1 cannot be checked
yet. All 18 citations, as written from memory, matched their PubMed records.

What is still true from the draft:

- The site code marks the unchecked state: the references have no `doi`, inline citations are
  plain text (no `<Cite>` links), and the study's source note starts with "Unchecked draft".
  `src/studies/WristMriStudy.test.ts` pins that.
- The four wrist classifications (Mayfield, Herbert, Palmer, Lichtman) live in shared logic
  (`src/logic/mayfield.ts`, `herbert.ts`, `palmer.ts`, `lichtman.ts`). Their wording is claimed
  in `2026-10-23-wrist-calculators-sources.md` (claims MF-, HB-, PA-, LI-); this file refers to
  those IDs rather than repeating them.
- The author chose (2026-10-23) to deploy these pages before the check, and that claims which
  cannot be verified (paywalled) stay as they are, marked unchecked.

The author decided (2026-10-23), after this check: add the DOIs now and switch the citations to
`<Cite doi>` links, keeping the "Unchecked draft" note and the claims no abstract states; rewrite
every claim marked "for the author" to its paper's wording (W2-3, W2-4, W8-1 here, LI-1 and LI-4
in the calculators file), moving a citation to the paper that states it, or dropping a rule no
listed paper states. Applied in `src/studies/WristMriStudy.tsx`; each change is under "Changed"
in its row.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| R1 | Linscheid RL, Dobyns JH, Beabout JW, Bryan RS. Traumatic instability of the wrist. Diagnosis, classification, and pathomechanics. J Bone Joint Surg Am. 1972;54(8):1612-1632. | 4653642 | 10.2106/00004623-197254080-00003 | No abstract |
| R2 | Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241. | 7400560 | 10.1016/s0363-5023(80)80007-4 | Abstract |
| R3 | Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123. | 6693468 | 10.1302/0301-620X.66B1.6693468 | Abstract |
| R4 | Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606. | 2666492 | 10.1016/0363-5023(89)90174-3 | Abstract |
| R5 | Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck's disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908. | 908720 | 10.2106/00004623-197759070-00011 | Abstract |
| R6 | Gaebler C, Kukla C, Breitenseher M, Trattnig S, Mittlboeck M, Vécsei V. Magnetic resonance imaging of occult scaphoid fractures. J Trauma. 1996;41(1):73-76. | 8676426 | 10.1097/00005373-199607000-00011 | Abstract |
| R7 | Imaeda T, Nakamura R, Shionoya K, Makino N. Ulnar impaction syndrome: MR imaging findings. Radiology. 1996;201(2):495-500. | 8888248 | 10.1148/radiology.201.2.8888248 | Abstract |
| R8 | Cerezal L, del Piñal F, Abascal F, García-Valtuille R, Pereda T, Canga A. Imaging findings in ulnar-sided wrist impaction syndromes. Radiographics. 2002;22(1):105-121. | 11796902 | 10.1148/radiographics.22.1.g02ja01105 | Abstract |
| R9 | Viegas SF, Wagner K, Patterson R, Peterson P. Medial (hamate) facet of the lunate. J Hand Surg Am. 1990;15(4):564-571. | 2380518 | 10.1016/s0363-5023(09)90016-8 | Abstract |
| R10 | Zanetti M, Linkous MD, Gilula LA, Hodler J. Characteristics of triangular fibrocartilage defects in symptomatic and contralateral asymptomatic wrists. Radiology. 2000;216(3):840-845. | 10966720 | 10.1148/radiology.216.3.r00se06840 | Abstract |
| R11 | Theumann NH, Pfirrmann CW, Antonio GE, Chung CB, Gilula LA, Trudell DJ, Resnick D. Extrinsic carpal ligaments: normal MR arthrographic appearance in cadavers. Radiology. 2003;226(1):171-179. | 12511687 | 10.1148/radiol.2261011715 | Abstract |
| R12 | Glajchen N, Schweitzer M. MRI features in de Quervain's tenosynovitis of the wrist. Skeletal Radiol. 1996;25(1):63-65. | 8717121 | 10.1007/s002560050033 | Abstract |
| R13 | Costa CR, Morrison WB, Carrino JA. MRI features of intersection syndrome of the forearm. AJR Am J Roentgenol. 2003;181(5):1245-1249. | 14573413 | 10.2214/ajr.181.5.1811245 | Abstract |
| R14 | Mesgarzadeh M, Schneck CD, Bonakdarpour A, Mitra A, Conaway D. Carpal tunnel: MR imaging. Part II. Carpal tunnel syndrome. Radiology. 1989;171(3):749-754. | 2541464 | 10.1148/radiology.171.3.2541464 | Abstract |
| R15 | Zeiss J, Jakab E, Khimji T, Imbriglia J. The ulnar tunnel at the wrist (Guyon's canal): normal MR anatomy and variants. AJR Am J Roentgenol. 1992;158(5):1081-1085. | 1566671 | 10.2214/ajr.158.5.1566671 | Abstract |
| R16 | Berger RA. The gross and histologic anatomy of the scapholunate interosseous ligament. J Hand Surg Am. 1996;21(2):170-178. | 8683042 | 10.1016/S0363-5023(96)80096-7 | Abstract |
| R17 | Vo P, Wright T, Hayden F, Dell P, Chidgey L. Evaluating dorsal wrist pain: MRI diagnosis of occult dorsal wrist ganglion. J Hand Surg Am. 1995;20(4):667-670. | 7594299 | 10.1016/S0363-5023(05)80288-6 | Abstract |
| R18 | Conway WF, Destouet JM, Gilula LA, Bellinghausen HW, Weeks PM. The carpal boss: an overview of radiographic evaluation. Radiology. 1985;156(1):29-31. | 3923555 | 10.1148/radiology.156.1.3923555 | Abstract |

Notes on the set:

- Every citation matched PubMed as drafted; no title, author, year, volume or page needed
  correcting. Page ranges are given in full (PubMed abbreviates them, e.g. 1612-32).
- R1 and R5: PubMed has no DOI. Both were found by a Crossref bibliographic search, and the
  Crossref records match authors, volume, issue and pages. Crossref titles R5 only
  "Kienböck's disease"; the page keeps PubMed's full title.
- The four candidate DOIs in the draft (R2, R4, R7, R8) were all right.
- R5 (1977) predates clinical MRI, so it cannot be the source for anything said about MRI in
  Kienböck disease (W2-3, and LI-4 in the calculators file). For the author.
- R8 is the 2002 RadioGraphics review; the same authors have a 2004 MRI Clinics review
  (PMID 15172387) with a similar title. The draft means the 2002 paper, which is the one cited.

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Step 1: history, technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| — | The protocol checklist (three planes, fat-suppressed fluid-sensitive imaging, a T1-weighted sequence) is the site's own, presented with no citation. | — | — | site's own |
| W1-1 | A fall on the outstretched hand is the usual mechanism of scaphoid fracture and of perilunate injury. | descriptive | R2, R6 | partly. R2 abstract (cadaver loading, not a clinical series): "The mechanism of injury was extension, ulnar deviation, and intercarpal supination." A fall on the outstretched hand is not named in R2 or R6, and R6 gives no mechanism. Kept, unchecked. |

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W2-1 | MRI shows occult scaphoid fractures in patients whose initial radiographs are normal. | descriptive | R6 | yes. R6 abstract: 32 patients in whom a scaphoid fracture "was clinically suspected, but could not be confirmed on the original set of two routine and four scaphoid view radiographs"; "MRI is able to diagnose occult scaphoid fractures without delay". |
| W2-2 | Herbert types A1–D2 and their groups. | via shared logic | R3 (claims HB-) | partly. R3 abstract: "A classification of scaphoid fractures is proposed", covering "acute unstable fractures, but also fractures with delayed healing and those with established non-union". The types themselves are not in the abstract (see HB-). |
| W2-3 | Lichtman stages I–IV; stage I has normal radiographs, and MRI is the test that shows it. | via shared logic | R5 (claims LI-) | partly. R5 abstract: "Four clinical and roentgenographic stages were identified". The stage contents are not in the abstract. For the author: R5 is from 1977, before clinical MRI, so "MRI is the test that shows it" cannot rest on R5 (see LI-4). Kept, unchecked. Changed: the page now says "Stage Kienböck disease by Lichtman, whose four stages are clinical and radiographic. Stage I has normal radiographs." The MRI sentence is dropped (no listed paper states it), and the quiz asks which stage has normal radiographs instead of which is "found only on MRI". |
| W2-4 | Ulnar impaction gives focal abnormal signal in the ulnar (medial) part of the proximal lunate, sometimes also in the triquetrum and ulnar head, and goes with positive ulnar variance. | focal ulnar-side lunate signal + positive variance → fits ulnar impaction; + negative variance → warning | R7, R8 | partly. R7 abstract: "focal abnormal signal intensity of the ulnar aspect of the lunate in 87% of wrists, of the radial aspects of the triquetrum in 43%, and of the radial aspects of the ulnar head in 10%"; R8 abstract: "positive ulnar variance in ulnar impaction syndrome". Not stated: "proximal" lunate. The paper puts the triquetral and ulnar head signal on their radial aspects. The negative-variance warning is the site's inference. Changed to Imaeda's wording: "focal abnormal signal in the ulnar aspect of the lunate, sometimes also in the radial aspects of the triquetrum and the ulnar head" (Imaeda), "and goes with positive ulnar variance" (Cerezal). "Proximal" is gone from the field, the report line and the impression ("Focal abnormal signal on the ulnar side of the lunate ..."), and the also-abnormal choices read "Radial aspect of the triquetrum" and "Radial aspect of the ulnar head". |
| W2-5 | Kienböck disease is distinguished from ulnar impaction by diffuse rather than focal lunate signal. | diffuse → Kienböck pattern (Lichtman field shown) | R8 | no: not in the R8 abstract (paywalled). Kept, unchecked. |

### Step 3: scapholunate ligament and DISI

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W3-1 | The scapholunate ligament has dorsal, proximal (membranous) and volar parts; the dorsal part is the strongest. | descriptive | R16 | partly. R16 abstract: "consistently divisible into three anatomic regions: dorsal, proximal, and palmar. The dorsal region is thick ..."; "The proximal region is principally composed of fibrocartilage". "Membranous" and "strongest" are not stated (the abstract says only "thick"). Kept. |
| W3-2 | The normal scapholunate angle is 30° to 60°; above 60° suggests dorsal intercalated segment instability (DISI), below 30° volar intercalated segment instability (VISI). | 30–60° normal; > 60° DISI; < 30° VISI | R1 | no: R1 has no abstract in PubMed and no PMC copy (paywalled). The bounds, and their use on sagittal MRI rather than lateral radiographs, are unchecked. Kept, unchecked. |

### Step 4: lunotriquetral ligament and VISI

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W4-1 | Lunotriquetral ligament disruption goes with VISI. | descriptive | R1 | no: R1 has no abstract (as W3-2). Kept, unchecked. |

### Step 5: perilunate injury

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W5-1 | Mayfield's progressive perilunar instability: stages I–IV, radial to ulnar. | via shared logic | R2 (claims MF-) | partly. R2 abstract: "These dislocations occurred in a sequential fashion due to progressive and specific ligamentous disruptions and were classified according to the degree of perilunar instability (PLI). Stage I perilunar instability (scapholunate diastasis) ... Lunate dislocations (stage IV PLI)". Stages II and III and "radial to ulnar" are not stated. |
| W5-2 | In the sequence the scapholunate is disrupted first, unless the injury passes through the scaphoid (a greater-arc injury), so a stage III or IV injury with an intact scapholunate ligament and no scaphoid fracture is inconsistent. | warning | R2 | no: neither the order "scapholunate first" nor the greater-arc exception is in the R2 abstract. Kept, unchecked. |

### Step 6: TFCC and ulnar variance

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W6-1 | Palmer classes 1A–1D (traumatic) and 2A–2E (degenerative). | via shared logic | R4 (claims PA-) | partly. R4 abstract: "The classification recognizes both traumatic and degenerative lesions. Traumatic lesions are classified according to their location." The subclasses are not in the abstract (see PA-). |
| W6-2 | Palmer 2D and 2E include perforation of the lunotriquetral ligament, so either with an intact lunotriquetral ligament is inconsistent. | warning | R4 (claims PA-) | partly. R4 abstract: degenerative lesions "are classified by the location and severity of degenerative changes of the triangular fibrocartilage complex, ulnar head, ulnocarpal bones and lunotriquetral ligament". That 2D and 2E are the ones with lunotriquetral perforation is not stated. Kept, unchecked. |
| W6-3 | TFC defects are also found in the asymptomatic contralateral wrist, so a defect is not by itself the cause of pain. | descriptive | R10 | yes. R10 abstract: "Communicating defects were noted in 36 (64%) of 56 symptomatic and in 26 (46%) of 56 asymptomatic wrists"; "Radial-sided communicating defects ... (Palmer type 1A and 1D) ... commonly are seen bilaterally and in asymptomatic wrists." The paper adds that noncommunicating proximal ulnar-side defects "have a more reliable association with symptomatic wrists"; the page does not say so. |

### Step 7: extrinsic ligaments

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W7-1 | The dorsal and volar extrinsic ligaments can be identified on MR arthrography. | descriptive | R11 | yes. R11 abstract: "MR arthrography allows visualization of the carpal ligaments"; the radioscaphocapitate, radiolunotriquetral, radioscapholunate, dorsal radiotriquetral, palmar and dorsal scaphotriquetral, ulnotriquetral and ulnolunate ligaments were each "well seen as a hypointense linear structure". |

### Step 8: extensor compartments

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W8-1 | de Quervain tenosynovitis: thickening of the abductor pollicis longus and extensor pollicis brevis tendons with increased signal within and around them. | descriptive | R12 | partly. R12 abstract: "Increased thickness of the extensor pollicus brevis and abductor pollicis longus tendons was the most reliable finding ... Peritendinous edema was also a reliable finding. Surrounding subcutaneous edema and increased intratendinous signal were less reliable findings". For the author: the claim gives signal "within" the tendons equal weight; R12 calls it less reliable (5 cases). Changed to Glajchen's wording: "thickening of the abductor pollicis longus and extensor pollicis brevis tendons ... is the most reliable sign, with edema around them; edema in the subcutaneous fat and increased signal within the tendons are less reliable" (learn, teach panel and quiz explanation). |
| W8-2 | Intersection syndrome: peritendinous edema where the first compartment crosses the second, proximal to Lister's tubercle. | descriptive | R13 | partly. R13 abstract: "Peritendinous edema (peritendinitis) around the first and second extensor compartment tendons, extending proximally from the crossover point, is the most characteristic finding". "Proximal to Lister's tubercle" is not stated. Kept. |

### Step 9: flexor tendons and carpal tunnel

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W9-1 | MRI signs of carpal tunnel syndrome: swelling of the median nerve (at the pisiform), flattening (at the hamate), palmar bowing of the flexor retinaculum, and increased T2 signal in the nerve. | descriptive | R14 | yes. R14 abstract: "swelling of the median nerve, best evaluated at the level of the pisiform bone; flattening of the median nerve, most reliably judged at the hamate level; palmar bowing of the flexor retinaculum, best visualized at the level of the hamate bone; and increased signal intensity of the median nerve on T2-weighted images." |

### Step 10: Guyon canal

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W10-1 | The Guyon canal contents, and variants including accessory muscles, are shown on MRI. | descriptive | R15 | yes. R15 abstract: "Anomalous muscles were present in the canal in nine (25%) of 36 wrists"; "MR images depict the ulnar tunnel in excellent detail." |

### Step 11: ganglia and synovium

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W11-1 | MRI finds occult dorsal ganglia in patients with dorsal wrist pain. | descriptive | R17 | yes. R17 abstract: of 14 patients with chronic dorsal wrist pain of unknown cause, "Ten had MRI evidence that was diagnostic for an occult dorsal wrist ganglion." |

### Step 12: variants (each gets its own impression line, by the author's decision)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W12-1 | A type II lunate has a medial facet that articulates with the hamate. | descriptive | R9 | yes. R9 abstract: "Type I, in which there was no medial facet ... type II, in which there was a medial facet"; the title names it the "Medial (hamate) facet of the lunate". |
| W12-2 | The carpal boss is a bony prominence at the base of the second and third metacarpals, sometimes an os styloideum. | descriptive | R18 | yes. R18 abstract: "located on the dorsum of the wrist at the base of the second and third metacarpals adjacent to the capitate and trapezoid bones. This bony prominence may represent degenerative osteophyte formation and/or the presence of an os styloideum". |
| W12-3 | Accessory muscles occur in and around the Guyon canal. | descriptive | R15 | yes. R15 abstract: "Anomalous muscles were present in the canal in nine (25%) of 36 wrists; six (67%) of the nine were bilateral." |

Ulnar variance is reported as a descriptor (positive, neutral, negative), not as a variant
line. A bifid median nerve and a persistent median artery are offered as variants without a
cited rule. (R14's abstract lists "a persistent median artery" among the findings related to
the cause of carpal tunnel syndrome, but the page does not cite it there.)

## Second check, 2026-10-28: R13 read in full

R13 (Costa, Morrison and Carrino, AJR 2003) was read in full on the AJR site, in a browser. The
open-access indexes (Unpaywall, OpenAlex, Semantic Scholar) list it as closed.

| ID | Verdict | Evidence |
|----|---------|----------|
| W8-2 | yes | "The most important finding is the presence of peritendinous edema concentrically surrounding the second and the first extensor compartments, beginning at the point of crossover, 4–8 cm proximal to the Lister tubercle and extending proximally." In the three cases the edema "began at the crossover point and extended proximally for an average of 3.5 cm". |

## Third check, 2026-10-29: open sources

The cited papers are still paywalled. RSNA (Cerezal 2002, Imaeda 1996) answered 403 behind a
Cloudflare challenge; Springer (Glajchen 1996) and Elsevier (Berger 1996) gave a client challenge
or a sign-in. The publisher page for Linscheid 1972 (doi.org resolves to ovid.com, JBJS) shows an
abstract that PubMed lacks; it was read (quoted under W3-2 and W4-1). Open full texts were read in
Europe PMC (`fullTextXML`). Four were added beside the original citation, each matched on Crossref:

- Andersson JK. Treatment of scapholunate ligament injury: current concepts. EFORT Open Rev. 2017;2(9):382-393. doi:10.1302/2058-5241.2.170016 (PMC5644424).
- Ng AWH, Chan JYS, Griffith JF, Ng ISH, Tse WL, Ng SSH. Imaging of dorsal wrist pain. Quant Imaging Med Surg. 2024;14(9):6945-6962. doi:10.21037/qims-24-420 (PMC11400706).
- Chen NC, Jupiter JB, Jebson PJL. Sports-related wrist injuries in adults. Sports Health. 2009;1(6):469-477. doi:10.1177/1941738109347981 (PMC3445150).
- von Borstel D, Wang M, Small K, Nozaki T, Yoshioka H. High-resolution 3T MR imaging of the triangular fibrocartilage complex. Magn Reson Med Sci. 2017;16(1):3-15. doi:10.2463/mrms.rev.2016-0011 (PMC5600038).

| ID | Verdict | Evidence |
|----|---------|----------|
| W1-1 | partly | Scaphoid: "It is commonly seen in young adults and sportspersons who fall on an outstretched hand" (Sharma et al., Indian J Radiol Imaging 2025, PMC12169939); "The mechanism of injury is commonly a FOOSH" for carpal fractures (Shahabpour et al., J Belg Soc Radiol 2021, PMC8719475). Perilunate: **for the author**: the open reviews do not call a fall on the outstretched hand the usual mechanism. Dvorsky et al. (A review of perilunate wrist dislocations, J Hand Surg Glob Online 2025, PMC12355994): "high-energy trauma, such as motor vehicle accidents, falls, and athletic injuries that result in forced hyperextension, ulnar deviation, and intercarpal supination", and "most commonly motor vehicle accidents, falls from a height, and athletic-related traumas". Page: "A fall on the outstretched hand is the usual mechanism of a scaphoid fracture and of a perilunate injury". Kept, no source added. |
| W2-5 | yes | Ng 2024: "Typical MRI features are homogeneous low T1-weighted (T1W) signals within the lunate bone"; early disease "MRI shows diffuse lunate marrow oedema"; "The main differential diagnosis of early Kienbock's disease on MR imaging is ulnocarpal impaction. Ulnocarpal impaction tends to ... (II) be associated with positive ulnar variance; (III) show bone marrow oedema most intense at the ulnar-proximal aspect of the lunate". Added beside Cerezal in the learn text and quiz explanation. Cerezal 2002 itself still unread (RSNA blocked). |
| W3-1 | yes | Andersson 2017: "The SLL is C-shaped and has three structurally distinct parts: volar; membranous; and dorsal ... The dorsal part of the SLL is the strongest and the primary stabiliser of the SL joint"; "The avascular proximal membranous portion". Added beside Berger (learn, teach, quiz). |
| W3-2 | partly | Linscheid 1972 abstract (ovid.com): "When dissociation occurs the scaphoid assumes a vertical position, that is, the angle formed by the longitudinal axes of the scaphoid and the lunate approaches a right angle"; no numeric bounds. Normal 30–60°: Konopka and Chim (Orthop Res Rev 2018, PMC6209348): "their longitudinal axes form an angle between 30° and 60°"; the same in Okoro et al. (Life 2023, PMC10381215) and Zhou et al. (J Hand Surg Glob Online 2024, PMC11133945). Above 60° DISI: Konopka and Chim, "resulting in a scapholunate (SL) angle >60° ... This is called dorsal intercalated segment instability (DISI)"; Andersson 2017, "SL angle > 60° and capitolunate angle > 30°". Below 30° VISI: Vassa et al. (Pol J Radiol 2020, PMC7509702), "The SLL angle < 30° and capitolunate angle > 30° are suggestive of VISI". **For the author**: the reviews give different DISI thresholds. Page: "above 60° suggests dorsal intercalated segment instability (DISI)". Vassa 2020: "An SLL angle > 80° is diagnostic for DISI"; Kompoliti et al. (Tomography 2021, PMC8544666): "a scapholunate angle of >80°"; Zhou et al. (J Hand Surg Glob Online 2024, PMC11133945): "greater than 70º is consistent with a DISI deformity". No single open source states all three bounds, so none was added. Kept. |
| W4-1 | yes | Andersson 2017: "dorsal intercalated segment instability (DISI), following an SLL injury ..., and volar intercalated segment instability (VISI) following a LTL injury"; also Vassa 2020: "Disruption of the LTL results in volar intercalated segmental instability (VISI)". Added Andersson beside Linscheid (learn and teach). **For the author**: (1) Linscheid's abstract ties palmar flexion instability to something else: "Palmar flexion instability ... appears to be associated with ulnar displacement of the carpus as is seen in rheumatoid arthritis or after loss of the distal end of the ulna". It does not mention the lunotriquetral ligament, so Linscheid may not be the source for this claim. (2) Two reviews add that an isolated LT tear is not enough: "An isolated LT tear is not sufficient to cause a VISI deformity. The adjacent extrinsic ligaments ... must also be injured" (Shahabpour et al. 2021); "In most cases, isolated LTL injury alone is insufficient to cause ... (VISI)" (Margulies et al., J Hand Microsurg 2021, PMC8041499). |
| W5-1 | yes (substance) | Chen 2009: "A perilunate dislocation results from the disruption of the scapholunate ligament, then extension of the injury through the capito-lunate articulation and the lunotriquetral ligament" (scapholunate, then capitolunate, then lunotriquetral, which runs radial to ulnar). Dvorsky 2025: "the forces continue to travel ulnarly around the lunate". The stages themselves were settled against Kennedy and Allan (calculators file, second check). |
| W5-2 | yes (substance) | Chen 2009 (as W5-1, then): "One variation of a perilunate dislocation is a fracture dislocation through the scaphoid, rather than an injury through the scapholunate ligament." The name "greater arc" is in Dvorsky 2025 ("Greater arc injuries ... may produce fractures of the scaphoid, capitate, or radial styloid") and Okoro 2023. Neither is cited, because both number the Mayfield stages differently (stage II as the perilunate dislocation). Added Chen beside Mayfield (learn and quiz). The "deserves a second look" warning is the site's inference. |
| W6-1 | yes | von Borstel 2017, Table 3 (Palmer's table): "Type 1: Traumatic injury | Type 2: Degenerative injury", 1A–1D and 2A–2E. Added beside Palmer (learn and quiz). |
| W6-2 | yes | von Borstel 2017, Table 3: "2D: TFCC perforation with lunate and/or ulnar chondromalacia and lunotriquetral ligament perforation"; "2E: ..., lunotriquetral ligament perforation, and ulnocarpal arthritis". Added beside Palmer. |
| W2-4 (negative-variance warning) | note | Vassa 2020 on ulnolunate abutment: "These findings most commonly occur with ulnar positive variance but can occasionally occur with neutral or negative variance". The warning only asks for a check, so it does not contradict this. Kept. |

Still needs a browser: Cerezal 2002 figure legends (https://pubs.rsna.org/doi/full/10.1148/radiographics.22.1.g02ja01105) and Imaeda 1996 (https://pubs.rsna.org/doi/10.1148/radiology.201.2.8888248), both blocked by a Cloudflare challenge (403).
