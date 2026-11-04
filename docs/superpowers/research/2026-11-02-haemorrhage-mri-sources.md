# Haemorrhage on MRI: sources and cells

Date: 2026-11-02 · Branch: `claude/brain-territories`

The author asked (2026-11-02) for a reference page on how intracranial blood looks on MRI as it
ages. The page is specified in `docs/superpowers/specs/2026-11-02-haemorrhage-mri-design.md`: three
tables (intracerebral haematoma stages, subdural haematoma stages, subarachnoid haemorrhage and
microbleeds). This document lists every reference the page may cite and every table cell it may
show, with the sentence that supports it.

## Status: written with the paper databases reachable

Each reference was matched on PubMed and its DOI checked on Crossref (all 25 resolve, with matching
title, journal, volume and pages). Each cell went in only after its wording was read in the abstract
or an open full text:

- Full texts were read through the Europe PMC full-text API (JATS XML) or, where Europe PMC had no
  XML (Greenberg 2009, Charidimou 2022, Wardlaw 2013), through the NCBI PMC efetch XML. Greenberg
  2009 and Charidimou 2022 are author manuscripts in PMC (not CC licensed); they are cited, not
  reproduced.
- Closed papers were read in abstract only (Unpaywall `closed`): Bradley 1993, Parizel 2001,
  Kidwell 2008, Dolinskas 1977, Sieswerda-Hoogendoorn 2014, Deliganis 2001, Frigon 2004, Stuckey
  2007. Bradley and Parizel carry the stage tables most reviews copy, but those tables sit behind the
  paywall; the per-stage cells therefore rest on the open reviews (Weerink 2023, Penckofer 2024, Kang
  2001), which cite Bradley.
- Fobben 1989 (AJR) has a co-published AJNR version in PMC (PMC8332616), but PMC holds only page
  scans and the PDF host refused the request, so only the abstract was read. Mitchell 2001 (JNNP)
  is the same: PMC1737199 is page scans, and the bmj.com PDF returned 403. Both count via abstract.
- STRIVE-2 (Duering 2023) is closed; its accepted manuscript sits on a host this environment cannot
  read as text. Its abstract gives no microbleed or siderosis definitions, so no cell rests on it;
  microbleed definitions come from STRIVE-1 (Wardlaw 2013, open) and Greenberg 2009.
- Kidwell 2008 is closed and its abstract is general; no cell rests on it.
- Filippi 2001 (AJNR, propofol and FLAIR) was read in abstract but has no DOI (AJNR before 2005),
  and the page requires a DOI for every reference; it is not in the table and its claim is left out
  (see "Left out").

Cells are written in the words the page will use: short, signal in words ("bright", "dark", "like
brain") or the source's own words. A `read` verdict means the quoted sentence says what the cell
says. `not stated` means no citable read source states it; those cells are listed again under "Left
out". No cell here has a `differs` verdict: where sources disagree, the cell follows the source
named under "Where the sources disagree", and the decision is recorded there.

Signal reference tissue: the sources do not all compare with grey matter. Weerink 2023 compares with
"the brain parenchyma", Kang 2001 with "normal contralateral white matter", Fobben 1989 (subdural)
with grey matter; Penckofer 2024 and Popescu 2024 do not say. The page's "like brain" means
isointense to brain as these sources use it.

## References

| # | Citation | PMID | DOI | Read |
|---|---|---|---|---|
| H-R1 | Bradley WG Jr. MR appearance of hemorrhage in the brain. Radiology. 1993;189(1):15-26. | 8372185 | 10.1148/radiology.189.1.8372185 | abstract |
| H-R2 | Parizel PM, Makkat S, Van Miert E, et al. Intracranial hemorrhage: principles of CT and MRI interpretation. Eur Radiol. 2001;11(9):1770-1783. | 11511901 | 10.1007/s003300000800 | abstract |
| H-R3 | Weerink LBM, Appelman APA, Kloet RW, et al. Susceptibility-weighted imaging in intracranial hemorrhage: not all bleeds are black. Br J Radiol. 2023;96(1148):20220304. | 35766940 | 10.1259/bjr.20220304 | open full text (PMC10392652, CC BY-NC 4.0) |
| H-R4 | Penckofer M, Kazmi KS, Thon J, et al. Neuro-imaging in intracerebral hemorrhage: updates and knowledge gaps. Front Neurosci. 2024;18:1408288. | 38784090 | 10.3389/fnins.2024.1408288 | open full text (PMC11111865, CC BY 4.0) |
| H-R5 | Kang BK, Na DG, Ryoo JW, et al. Diffusion-weighted MR imaging of intracerebral hemorrhage. Korean J Radiol. 2001;2(4):183-191. | 11754324 | 10.3348/kjr.2001.2.4.183 | open full text (PMC2718119, CC BY-NC 3.0) |
| H-R6 | Popescu CM, Marina V, Munteanu A, et al. Acute computer tomography findings in pediatric accidental head trauma: review. Pediatric Health Med Ther. 2024;15:231-241. | 38882239 | 10.2147/PHMT.S461121 | open full text (PMC11179670, CC BY-NC 3.0) |
| H-R7 | Dolinskas CA, Bilaniuk LT, Zimmerman RA, Kuhl DE. Computed tomography of intracerebral hematomas. I. Transmission CT observations on hematoma resolution. AJR Am J Roentgenol. 1977;129(4):681-688. | 409243 | 10.2214/ajr.129.4.681 | abstract |
| H-R8 | Popescu CM, Marina V, Avram G, et al. Spectrum of magnetic resonance imaging findings in acute pediatric traumatic brain injury: a pictorial essay. J Multidiscip Healthc. 2024;17:2921-2934. | 38911614 | 10.2147/JMDH.S466044 | open full text (PMC11193985, CC BY-NC 3.0) |
| H-R9 | Tripathy SR, Swarnakar PK, Mishra S, et al. A review of sub acute subdural hematoma (SASDH) with our institutional experience and its management by double barrel technique (DbT): a novel technique. Surg Neurol Int. 2016;7(Suppl 28):S767-S774. | 27904759 | 10.4103/2152-7806.193730 | open full text (PMC5114857, CC BY-NC-SA 3.0) |
| H-R10 | Fobben ES, Grossman RI, Atlas SW, et al. MR characteristics of subdural hematomas and hygromas at 1.5 T. AJR Am J Roentgenol. 1989;153(3):589-595. | 2763959 | 10.2214/ajr.153.3.589 | abstract (AJNR co-publication PMC8332616 is page scans only) |
| H-R11 | Hasan D, Nikoubashman O, Pjontek R, et al. MRI appearance of chronic subdural hematoma. Front Neurol. 2022;13:872664. | 36003292 | 10.3389/fneur.2022.872664 | open full text (PMC9393587, CC BY 4.0) |
| H-R12 | Chen H, Colasurdo M, Malhotra A, et al. Advances in chronic subdural hematoma and membrane imaging. Front Neurol. 2024;15:1366238. | 38725642 | 10.3389/fneur.2024.1366238 | open full text (PMC11079242, CC BY 4.0) |
| H-R13 | Sieswerda-Hoogendoorn T, Postema FAM, Verbaan D, et al. Age determination of subdural hematomas with CT and MRI: a systematic review. Eur J Radiol. 2014;83(7):1257-1268. | 24816086 | 10.1016/j.ejrad.2014.03.015 | abstract |
| H-R14 | Mitchell P, Wilkinson ID, Hoggard N, et al. Detection of subarachnoid haemorrhage with magnetic resonance imaging. J Neurol Neurosurg Psychiatry. 2001;70(2):205-211. | 11160469 | 10.1136/jnnp.70.2.205 | abstract (PMC1737199 is page scans only) |
| H-R15 | Perry JJ, Stiell IG, Sivilotti ML, et al. Sensitivity of computed tomography performed within six hours of onset of headache for diagnosis of subarachnoid haemorrhage: prospective cohort study. BMJ. 2011;343:d4277. | 21768192 | 10.1136/bmj.d4277 | abstract (open full text at PMC3138338; the abstract carries the cell) |
| H-R16 | Ferrante E, Tassorelli C, Rossi P, et al. Focus on the management of thunderclap headache: from nosography to treatment. J Headache Pain. 2011;12(2):251-258. | 21331755 | 10.1007/s10194-011-0302-z | open full text (PMC3072477, CC BY) |
| H-R17 | Weidauer S, Neuhaus E, Hattingen E. Cerebral superficial siderosis: etiology, neuroradiological features and clinical findings. Clin Neuroradiol. 2023;33(2):293-306. | 36443509 | 10.1007/s00062-022-01231-5 | open full text (PMC10220152, CC BY 4.0) |
| H-R18 | Charidimou A, Boulouis G, Frosch MP, et al. The Boston criteria version 2.0 for cerebral amyloid angiopathy: a multicentre, retrospective, MRI-neuropathology diagnostic accuracy study. Lancet Neurol. 2022;21(8):714-725. | 35841910 | 10.1016/S1474-4422(22)00208-3 | abstract and full text (author manuscript PMC9389452) |
| H-R19 | Greenberg SM, Vernooij MW, Cordonnier C, et al. Cerebral microbleeds: a guide to detection and interpretation. Lancet Neurol. 2009;8(2):165-174. | 19161908 | 10.1016/S1474-4422(09)70013-4 | full text (author manuscript PMC3414436) |
| H-R20 | Wardlaw JM, Smith EE, Biessels GJ, et al. Neuroimaging standards for research into small vessel disease and its contribution to ageing and neurodegeneration. Lancet Neurol. 2013;12(8):822-838. | 23867200 | 10.1016/S1474-4422(13)70124-8 | open full text (PMC3714437) |
| H-R21 | Deliganis AV, Fisher DJ, Lam AM, Maravilla KR. Cerebrospinal fluid signal intensity increase on FLAIR MR images in patients under general anesthesia: the role of supplemental O2. Radiology. 2001;218(1):152-156. | 11152794 | 10.1148/radiology.218.1.r01ja43152 | abstract |
| H-R22 | Frigon C, Shaw DW, Heckbert SR, Weinberger E, Jardine DS. Supplemental oxygen causes increased signal intensity in subarachnoid cerebrospinal fluid on brain FLAIR MR images obtained in children during general anesthesia. Radiology. 2004;233(1):51-55. | 15454616 | 10.1148/radiol.2331031375 | abstract |
| H-R23 | Stuckey SL, Goh TD, Heffernan T, Rowan D. Hyperintensity in the subarachnoid space on FLAIR MRI. AJR Am J Roentgenol. 2007;189(4):913-921. | 17885065 | 10.2214/AJR.07.2424 | abstract |
| H-R24 | Kidwell CS, Wintermark M. Imaging of intracranial haemorrhage. Lancet Neurol. 2008;7(3):256-267. | 18275927 | 10.1016/S1474-4422(08)70041-3 | abstract; no cell rests on it (not to be cited on the page) |
| H-R25 | Duering M, Biessels GJ, Brodtmann A, et al. Neuroimaging standards for research into small vessel disease: advances since 2013. Lancet Neurol. 2023;22(7):602-618. | 37236211 | 10.1016/S1474-4422(23)00131-X | abstract; no cell rests on it (not to be cited on the page) |

Filippi 2001 was read (abstract) but is not listed: it has no DOI. See "Left out".

## Which source sets the time ranges

- **Intracerebral haematoma: Weerink 2023 (H-R3).** Its Table 2 gives all five stages with a time,
  the blood product, T1, T2 and SWI in one row each, and its text defines each stage's window in a
  sentence ("The acute stage is defined as 1–3 days after onset of the ICH", and so on), so one
  source carries the Time, Blood product, T1, T2 and SWI/GRE columns. Penckofer 2024 (H-R4, CC BY)
  gives the same five windows, which confirms them. Other ranges are under "Where the sources
  disagree".
- **Subdural haematoma: Tripathy 2016 (H-R9).** It is the only read source that gives all three
  windows in one sentence; Hasan 2022 (H-R11) uses the same chronic cut-off (more than 3 weeks).

## Cells

Verdicts: `read: abstract`, `read: full text`, `not stated`. "Cell" is the text as it will read on
the page.

### 1. Intracerebral haematoma (rows Hyperacute to Chronic; columns Time, Blood product, T1, T2, SWI/GRE, CT)

| ID | Row · Column | Cell | Ref | Verdict | Evidence |
|---|---|---|---|---|---|
| H-C1 | Hyperacute · Time | Under 24 hours | H-R3, H-R4 | read: full text | Weerink, Table 2: "Hyper acute (<24 h)". Penckofer: "hyperacute (< 24 h of the hemorrhage, intracellular oxyhemoglobin". |
| H-C2 | Hyperacute · Blood product | Oxyhaemoglobin, in red cells | H-R3, H-R1 | read: full text | Weerink, Table 2: "Hyper acute (<24 h) \| Oxyhemoglobin". Bradley (abstract): "hyperacute (intracellular oxyhemoglobin, long T1 and T2)". |
| H-C3 | Hyperacute · T1 | Like brain or slightly dark | H-R4, H-R3 | read: full text | Penckofer, Table 1: "Hyperacute (<24 h) \| Hypointense/isointense". Weerink: "Clot formation leads to decreased “free” water content, which reduces T1 and T2 relaxation times, resulting in an isointense T1 signal." |
| H-C4 | Hyperacute · T2 | Bright | H-R3 | read: full text | Weerink: "The T2 signal is slightly lowered compared to the “free water” signal of the CSF, but remains hyperintense compared to the brain parenchyma." Table 2: T2WI "High". |
| H-C5 | Hyperacute · SWI/GRE | Centre intermediate to bright, dark rim | H-R3, H-R5 | read: full text | Weerink: "The diamagnetic properties of oxyhemoglobin and subsequently the lack of paramagnetic effects lead to an intermediate to high signal on SWI"; deoxyhaemoglobin at the periphery gives "the low signal rim on SWI". Kang (conventional GRE): "mixed iso- or hyperintensity at the center of the hemorrhage and a more noticeable hypointense rim at its periphery". Penckofer disagrees (see below). |
| H-C6 | Hyperacute · CT | Bright once clotted; under 60 HU before the clot forms | H-R6 | read: full text | Popescu (CT): "In the hyperacute phase, before blood has had time to form a clot, the density of the hematoma will be under 60 Hounsfield units (HU); it is also a reflection of the patient’s hematocrit. In the acute phase of the blood, the clot is already established, and the density will have increased, measuring between 60–90 HU." On intracerebral haemorrhage: "On NECT they appear as hyperdense collections." Popescu's CT phases are defined by clot state, not by Weerink's clock windows (see "Where the sources disagree"); the cell therefore does not say a haematoma under 24 hours is under 60 HU. |
| H-C7 | Acute · Time | 1–3 days | H-R3, H-R4 | read: full text | Weerink: "The acute stage is defined as 1–3 days after onset of the ICH." Penckofer: "acute (1–3 days, intracellular deoxyhemoglobin". |
| H-C8 | Acute · Blood product | Deoxyhaemoglobin, in red cells | H-R3, H-R1 | read: full text | Weerink, Table 2: "Acute(1–3 days) \| Deoxyhemoglobin". Bradley (abstract): "acute (intracellular deoxyhemoglobin, long T1, short T2)". |
| H-C9 | Acute · T1 | Like brain or slightly dark | H-R4, H-R3 | read: full text | Penckofer, Table 1: "Acute (1–3 days) \| Isointense/slightly hypointense". Weerink: "The T1 signal remains isointense due to the decrease in “free” water content in the ICH similar to the hyperacute stage." |
| H-C10 | Acute · T2 | Dark | H-R3, H-R4 | read: full text | Weerink: "The T2 signal is strongly lowered due to the strong paramagnetic effects of deoxyhemoglobin." Penckofer, Table 1: "Hypointense with hyperintense rim". |
| H-C11 | Acute · SWI/GRE | Dark | H-R3, H-R4 | read: full text | Weerink: the change to deoxyhaemoglobin "eventually reaches the center of the hematoma, which results in a low signal on SWI images in the entire hematoma". Penckofer, Table 1, GRE: "Marked hypointensity". |
| H-C12 | Acute · CT | Bright (60–90 HU) | H-R6 | read: full text | Popescu (CT): "In the acute phase of the blood, the clot is already established, and the density will have increased, measuring between 60–90 HU. This is the time when we get most of our patients to the CT scan. The blood at this time is hyperdense enough to be “seen”." (Popescu's acute phase is defined by an established clot, not by 1–3 days; see "Where the sources disagree".) |
| H-C13 | Early subacute · Time | 3–7 days | H-R3, H-R4 | read: full text | Weerink: "In the early subacute stage, 3–7 days after onset of the ICH, methemoglobin forms". Penckofer: "early subacute (3–7 days, intracellular methemoglobin". |
| H-C14 | Early subacute · Blood product | Methaemoglobin, in red cells | H-R3, H-R1 | read: full text | Weerink, Table 2: "Early subacute(3–7 days) \| Intracellular methemoglobin". Bradley (abstract): "early subacute (intracellular methemoglobin, short T1, short T2)". |
| H-C15 | Early subacute · T1 | Bright | H-R3, H-R4 | read: full text | Weerink: "This causes shortening of the T1 relaxation time resulting in a high T1 signal." Penckofer, Table 1: "Hyperintense". |
| H-C16 | Early subacute · T2 | Dark | H-R3, H-R4 | read: full text | Weerink: "The T2 signal remains low due the paramagnetic effects of methemoglobin." Penckofer, Table 1: "Hypointense". |
| H-C17 | Early subacute · SWI/GRE | Dark | H-R3, H-R4 | read: full text | Weerink: "The confinement of the methemoglobin to the intracellular compartment of the red blood cell leads to a magnetic gradient which disturbs the local magnetic field causing a low signal on SWI and T2 images". Penckofer, GRE: "Hypointense". |
| H-C18 | Early subacute · CT | Bright, fading slowly as the dense part shrinks | H-R7, H-R6 | read: abstract | Dolinskas (abstract, intracerebral haematoma): "Intracerebral hematomas decrease in density by an average of 0.7 EMI units per day. The dense portion of the hematoma decreases in size by an average of 0.65 mm per day." Popescu (CT) gives the starting point, an established clot "measuring between 60–90 HU" that is "hyperdense enough to be “seen”". Together: still bright at 3–7 days, losing density slowly. |
| H-C19 | Late subacute · Time | 7–28 days | H-R3, H-R4 | read: full text | Weerink: "The late subacute stage is defined as 7–28 days after the initial bleeding." Penckofer: "late subacute (7–28 days, extracellular methemoglobin". |
| H-C20 | Late subacute · Blood product | Methaemoglobin, outside red cells | H-R3, H-R1 | read: full text | Weerink, Table 2: "Late subacute(7–28 days) \| Extracellular methemoglobin"; "Lysis of the clot and red blood cells occurs in the late subacute stage. This causes the spread of methemoglobin to the extracellular space." Bradley (abstract): "late subacute (extracellular methemoglobin, short T1, long T2)". |
| H-C21 | Late subacute · T1 | Bright | H-R3, H-R4 | read: full text | Weerink: "The T1 signal remains high due to the persistent presence of inner sphere relaxation." Penckofer, Table 1: "Hyperintense". |
| H-C22 | Late subacute · T2 | Bright | H-R3, H-R4 | read: full text | Weerink: "The T2 signal increases due to the loss of compartmentalization of the methemoglobin and the increased water contents of the lysed red blood cells." Table 2: "High". Penckofer, Table 1: "Hyperintense". |
| H-C23 | Late subacute · SWI/GRE | Bright centre, dark rim | H-R3, H-R5 | read: full text | Weerink: "This is known as the T1 shine-through effect, which leads to a high signal on SWI centrally in the ICH"; haemosiderin and ferritin at the periphery: "This leads to a low signal rim." Kang (GRE): "gradient-echo images demonstrated heterogeneous hyperintensity". Penckofer disagrees (see below). |
| H-C24 | Late subacute · CT | Fading to like brain | H-R6, H-R7 | read: full text | Popescu (CT): "In the subacute phase, days after the trauma, the clot starts to become less dense, and the density is almost the same as that of the cortex. This is the moment when the hematoma becomes isodense to the brain parenchyma and can be easily overlooked." Dolinskas (abstract): density falls "by an average of 0.7 EMI units per day". Popescu gives no day count for its subacute phase; the cell is placed in the 7–28 day row because the fall is slow (H-C18). |
| H-C25 | Chronic · Time | Over 1 month | H-R3, H-R4 | read: full text | Weerink: "The chronic stage begins approximately one month after the ICH occurred." Penckofer: "chronic (>1-month, extracellular ferritin and hemosiderin". |
| H-C26 | Chronic · Blood product | Haemosiderin and ferritin | H-R1, H-R4, H-R3 | read: full text | Bradley (abstract): "chronic (ferritin and hemosiderin, short T2)". Penckofer: "extracellular ferritin and hemosiderin". Weerink, Table 2: "Hemosiderin". |
| H-C27 | Chronic · T1 | Dark (can be like brain or bright from residual methaemoglobin) | H-R3, H-R4, H-R5 | read: full text | Weerink: "the presence of water leads to a high signal on T2WI and a low signal on T1WI, although in the latter the signal can be iso- or hyperintense due to residual methemoglobin or iron molecules in the solution." Penckofer, Table 1: "Hypointense". Kang, Fig 6B: "T1-weighted image reveals a hypointense hematoma". |
| H-C28 | Chronic · T2 | Bright centre, dark rim | H-R3, H-R5 | read: full text | Weerink, Table 2: T2WI "High center, low rim". Kang: "On T2-weighted and gradient-echo images, a complete hypointense rim surrounded the hematoma’s hyperintense center". Penckofer disagrees (see below). |
| H-C29 | Chronic · SWI/GRE | Dark rim; centre varies | H-R3, H-R4 | read: full text | Weerink: "This results in a low signal rim on SWI, T2WI and b1000 images"; "The transformation of the hematoma into a cystic cavity leads to a variable appearance on SWI". Penckofer, GRE: "Hyperintense/Isointense core with hypointense rim". |
| H-C30 | Chronic · CT | Dark, like CSF; focal atrophy | H-R6, H-R7 | read: full text | Popescu (CT): "In the chronic stage, the collection becomes isodense to the cerebrospinal fluid." Dolinskas (abstract): "Intracerebral hematomas decrease in density by an average of 0.7 EMI units per day"; "Posthematoma residua include decreased parenchymal density, focal atrophy, and ventricular enlargement." |
| H-C31 | Note under the table | Time ranges differ between sources; this table uses Weerink 2023. The CT source defines its phases by clot state, not by days. | H-R3, H-R5, H-R6 | read: full text | Popescu (CT): "In the hyperacute phase, before blood has had time to form a clot"; "In the acute phase of the blood, the clot is already established"; "In the subacute phase, days after the trauma". Weerink: "The hyperacute phase is often arbitrarily defined as the first 12–24 h after the onset of hemorrhage." Kang: "There were five stages: hyperacute (0-12 hrs; n=6), acute (13 hrs-3 days; n=7), early subacute (4-7 days; n=7), late subacute (8-30 days; n=10), and chronic (31 days or more; n=8)." |
| H-C32 | Note under the table | Signal depends on field strength and sequence: the dark effect of blood products is stronger at higher field and on gradient echo, weaker on fast spin echo. | H-R1, H-R2 | read: abstract | Bradley: "The T2 shortening due to magnetic susceptibility effects is enhanced on higher-field-strength systems and on gradient-echo images and is reduced with “fast spin-echo” MR techniques." Parizel: signal "is influenced by multiple variables including: (a) age, location, and size of the lesion; (b) technical factors (e.g., sequence type and parameters, field strength); and (c) biological factors". |

### 2. Subdural haematoma (rows Acute, Subacute, Chronic; columns Time, CT, T1, T2, FLAIR)

| ID | Row · Column | Cell | Ref | Verdict | Evidence |
|---|---|---|---|---|---|
| H-C33 | Acute · Time | Up to 3 days | H-R9 | read: full text | Tripathy: "Duration of onset of <3 days constitute ASDH, 4–21 days SASDH, and >21 days CSDH." |
| H-C34 | Acute · CT | Bright crescent | H-R6 | read: full text | Popescu (CT): "The acute SDHs appear as hyperdense crescent-shape extra-axial collections, mainly distributed along the convexity of the brain parenchyma". |
| H-C35 | Acute · T1 | Like brain | H-R8 | read: full text | Popescu (MRI): "In the acute stage of the hematoma, an MRI will show a crescent-shaped collection with an isointense T1 signal and a decreasing signal on T2 (from hyperintense in the hyperacute phase to isointense in a few days)". |
| H-C36 | Acute · T2 | Like brain or dark; it ages as a brain haematoma does | H-R10, H-R11, H-R8, H-R3 | read: full text | Fobben (abstract): "Subdural hematomas evolved in a pattern similar to intracerebral hemorrhage with the exception of chronic subdural hematomas". Hasan: "A hematoma in the subdural space is expected to go through the same stages as parenchymal blood, only more slowly". Intracerebral blood at 1–3 days, Weerink: "The T2 signal is strongly lowered due to the strong paramagnetic effects of deoxyhemoglobin." Popescu (MRI): the acute subdural "will show a crescent-shaped collection with an isointense T1 signal and a decreasing signal on T2 (from hyperintense in the hyperacute phase to isointense in a few days)" (as H-C35). |
| H-C37 | Acute · FLAIR | Bright | H-R8 | read: full text | Popescu (MRI), Fig 6, the figure for the acute stage: "Left-sided parietal subdural hematoma (yellow arrow)- A crescent-shaped collection with high-intensity FLAIR signal". (One paediatric case; the essay is on paediatric traumatic brain injury.) |
| H-C38 | Subacute · Time | 4–21 days | H-R9 | read: full text | As H-C33. |
| H-C39 | Subacute · CT | Like brain or slightly bright | H-R9, H-R6 | read: full text | Tripathy: "SASDH are typically crescentic fluid collections that are iso to slightly hyperdense, compared to the underlying cortex on any CT." Popescu (CT): "subacute ones are isodense to the brain, and the chronic ones are hypodense." |
| H-C40 | Subacute · T1 | Like brain early, then bright | H-R9 | read: full text | Tripathy: "In general, early SASDH are isointense with cortex on T1 and hypointense on T2, however, gradually become more hyperintense as extracellular methhemoglobin increases. Most late stage SASDH is “T1/T2 bright-bright.”" |
| H-C41 | Subacute · T2 | Dark early, then bright | H-R9 | read: full text | As H-C40. |
| H-C42 | Subacute · FLAIR | Bright (may be dark early) | H-R9 | read: full text | Tripathy: FLAIR "is the most sensitive sequence for detecting SASDH as the collection is typically hyperintense. Because FLAIR signal varies depending on relative contribution of T1 and T2 effects, early SASDH may initially appear hypointense due to intrinsic T2 shortening." |
| H-C43 | Chronic · Time | Over 21 days | H-R9, H-R11 | read: full text | Tripathy, as H-C33. Hasan: "Subdural hematomas were defined as chronic if the documented traumatic event occurred more than 3 weeks before admission." |
| H-C44 | Chronic · CT | Like brain to dark | H-R6, H-R12 | read: full text | Popescu (CT): "the chronic ones are hypodense." Chen: "The radiographic appearances of cSDHs can also be complex, ranging from iso- to hypodense, homogeneous to mixed densities, and single compartment to loculated." |
| H-C45 | Chronic · T1 | Mixed; often like or darker than brain | H-R11, H-R10 | read: full text | Hasan: "The most frequent pattern was mixed signal in both T1- and T2-weighted images (14 hematomas, 52%), followed by hematomas with hyperintense signal on T2w and hypointense signal on T1w (4 hematomas, 15%)." Fobben (abstract): in chronic subdural haematomas "isointensity or [sic: the abstract reads "of"] hypointensity relative to gray matter was observed on short TR/TE images compared with the persistent very high signal intensity noted in chronic parenchymal hematomas." |
| H-C46 | Chronic · T2 | Mixed | H-R11 | read: full text | As H-C45 (Hasan). |
| H-C47 | Chronic · FLAIR | Follows T2 | H-R11 | read: full text | Hasan: "On FLAIR images, the hematoma signal was similar to T2w images in 26 of 27 hematomas (96%)." |
| H-C48 | Note under the table | Rebleeding gives layers of different ages; bright T1 blood in an old collection suggests a rebleed; mixed density on CT means fresh blood in a chronic collection. | H-R10, H-R9 | read: abstract | Fobben: "Subdural hematomas with repeat hemorrhage demonstrated multiple phases of bleeding with layering phenomenon and more frequent hemosiderin deposition"; "The persistence of high signal from methemoglobin in a hematoma that is expected to be in the chronic phase also suggests repeated hemorrhage." Tripathy (full text): "Mixed density denotes an acute bleed into a chronic hematoma." |
| H-C49 | Note under the table | Chronic collections have membranes and septa; the outer membrane enhances. | H-R11 | read: full text | Hasan: "The majority of hematomas (74%) had internal septations"; "contrast enhancement along the outer membrane adjacent to the cranium was noticed in all hematomas. There was also contrast enhancement along the inner membrane adjacent to the brain in more than one-third of the hematomas (37%)." |
| H-C50 | Note under the table | Subdural blood ages like brain haematoma but more slowly, and CT or MRI cannot date it accurately. | H-R11, H-R13 | read: full text | Hasan: "A hematoma in the subdural space is expected to go through the same stages as parenchymal blood, only more slowly, due to greater oxygen tension in the subdural compartment". Sieswerda-Hoogendoorn (abstract): "Most time intervals of the different appearances of SDHs on CT and MRI are broad and overlapping. Therefore CT or MRI findings cannot be used to accurately date SDHs." |

### 3. Subarachnoid haemorrhage and microbleeds (columns Finding, Appearance, What it points to)

Rows: Acute subarachnoid haemorrhage, Superficial siderosis, Cerebral microbleeds, FLAIR mimics of
subarachnoid blood (stated by read sources, so the row stays). Several cells per row; Task 2 joins
each row's cells.

| ID | Row · Column | Cell | Ref | Verdict | Evidence |
|---|---|---|---|---|---|
| H-C51 | Acute SAH · Appearance | Bright sulci and cisterns on FLAIR | H-R8, H-R17 | read: full text | Popescu (MRI): "The best imaging tool for this lesion is the FLAIR sequence, where the tSAH appears as fine lines with intense hypersignal". Weidauer (convexity SAH): "focal hyperdense sulcus on CT and hyperintense sulcal signal changes on fluid attenuated inversion recovery (FLAIR) images". |
| H-C52 | Acute SAH · Appearance | Often dark on SWI and T2* GRE; in one series T2* GRE was more sensitive than FLAIR (94% against 81% in the acute phase) | H-R17, H-R14 | read: full text | Weidauer: "Whereas in the acute or subacute stage T2* WI and SWI show often homogeneous signal loss, in the chronic stage bilinear track-like appearance is typical". Mitchell (abstract; it compared T1, T2, single shot fast spin echo, FLAIR and gradient echo T2*, not SWI): "The gradient echo T2* was the most sensitive sequence, with sensitivities of 94% in the acute phase and 100% in the subacute phase. Next most sensitive was FLAIR with values of 81% and 87% for the acute and subacute phases respectively." |
| H-C53 | Acute SAH · Appearance | Bright on CT; near 100% sensitive within 6 hours of headache onset on modern CT, in neurologically intact adults, read by a qualified radiologist; sensitivity falls over days (58% by day 5 in a 1982 series) | H-R6, H-R15, H-R16 | read: abstract | Popescu (CT, full text): traumatic SAH "on NECT scans it appears as hyperdense curvilinear shape that follow the anatomy of the convexity sulci". Perry (abstract; neurologically intact adults with headache peaking within one hour, third generation CT): "For the 953 patients scanned within six hours of headache onset, all 121 patients with subarachnoid haemorrhage were identified by computed tomography, yielding a sensitivity of 100% (97.0% to 100.0%)"; "Modern third generation computed tomography is extremely sensitive in identifying subarachnoid haemorrhage when it is carried out within six hours of headache onset and interpreted by a qualified radiologist." Ferrante (full text): "The sensitivity of CT for the detection of SAH declines with increasing time from haemorrhage onset, falling to 86% on day one, 76% after 2 days, and 58% after 5 days", citing van Gijn and van Dongen, Neuroradiology 1982. |
| H-C54 | Acute SAH · What it points to | Blood in the subarachnoid space; MRI still shows it after CT sensitivity falls | H-R14 | read: abstract | Mitchell: "MRI can be used to detect subacute and acute subarachnoid haemorrhage and has significant advantages over CT in the detection of subacute subarachnoid haemorrhage." |
| H-C55 | Acute SAH · What it points to | Over the convexity in an older patient: a marker of CAA (the acute form of cortical siderosis) | H-R18 | read: full text | Charidimou: "cSS and acute cSAH are rated as equivalent MRI markers of CAA, with the understanding that cSAH is the acute form and cSS the chronic form of the same underlying process of superficial cortical haemorrhage." |
| H-C56 | Superficial siderosis · Appearance | Dark line along the brain surface on SWI or T2* GRE (SWI more sensitive) | H-R17 | read: full text | Weidauer: "SS exhibits characteristic imaging features with signal loss, i.e. dark rims on the surface of the affected structures"; Fig 2: "In T2*-GRE (f) and susceptibility-weighted imaging (SWI) (b,g), SS is revealed by dark rims on the surface of affected structures ... with SWI being more sensitive." |
| H-C57 | Superficial siderosis · Appearance | Old cortical siderosis: a double, track-like dark line | H-R17 | read: full text | Weidauer: "in the chronic stage bilinear track-like appearance is typical". |
| H-C58 | Superficial siderosis · What it points to | Posterior fossa and cord: repeated slight bleeding into the subarachnoid space, often from a spinal dural defect | H-R17 | read: full text | Weidauer (abstract): "Infratentorial (i) SS is likely due to recurrent or continuous slight bleeding into the subarachnoid space. It is assumed that spinal dural pathologies often resulting in cerebrospinal fluid (CSF) leakage is the most important etiological group which causes iSS". |
| H-C59 | Superficial siderosis · What it points to | Over the convexity: CAA in older people; also aneurysm, AVM, RCVS, vasculitis, venous thrombosis, trauma | H-R17 | read: full text | Weidauer: "Especially in older patients cSS is often due to cerebral amyloid angiopathy (CAA) ... Further etiologies of cSS are aneurysm related SAH, AVM, reversible cerebral vasoconstriction syndrome (RCVS), vasculitis, arterial proximal high-grade stenosis, cerebral vein and/or sinus thrombosis, cranial trauma and also amyloid beta targeting antibody treatment". |
| H-C60 | Superficial siderosis · What it points to | Multifocal cortical siderosis counts as two or more lobar bleeds towards probable CAA (Boston v2.0) | H-R18 | read: full text | Charidimou: "The incorporation of cSS multifocality as well as presence is one of the core updates of the Boston criteria v2.0, counting multifocal cSAH-cSS as ≥2 haemorrhagic lesions that can alone meet the definition of probable CAA." The other criteria (age, presentation, no deep bleeds, no other cause) are in H-C65. |
| H-C61 | Microbleeds · Appearance | Small round or oval dark dots that bloom on SWI or T2* GRE | H-R20 | read: full text | STRIVE-1: "Cerebral microbleeds are visualised as small (generally 2–5 mm in diameter, but up to 10 mm) areas of signal void with associated blooming seen on T2*-weighted MRI or other sequences that are sensitive to susceptibility effects"; "cerebral microbleeds are well defined, of homogeneous low signal, and are either round or oval in shape". |
| H-C62 | Microbleeds · Appearance | Generally 2–5 mm, up to 10 mm; no fixed size cut-off, as blooming varies with field strength and sequence | H-R20, H-R19 | read: full text | STRIVE-1: "Because the blooming artifact, and therefore the visualised size, depends on MR field strength and sequence, we do not recommend an absolute criterion for size." Greenberg: "Various size cut-points have been used for discriminating microbleeds from macrobleeds, typically ranging up to a maximum diameter of 5 to 10 mm and in some studies a minimum of 2 mm". |
| H-C63 | Microbleeds · Appearance | Not seen on CT, FLAIR, T1 or T2 | H-R20 | read: full text | STRIVE-1: microbleeds "are generally not seen on CT, or on FLAIR, T1-weighted, or T2-weighted sequences." |
| H-C64 | Microbleeds · What it points to | Strictly lobar: CAA. Deep or infratentorial: hypertensive vasculopathy | H-R19 | read: full text | Greenberg: "CMB location may correlate with specific vascular pathologies (i.e. deep hemispheric or infratentorial CMB suggesting hypertensive vasculopathy, a strictly lobar distribution suggesting CAA)". |
| H-C65 | Microbleeds · What it points to | Probable CAA (Boston v2.0): age 50 or over; presenting with spontaneous ICH, transient focal neurological episodes or cognitive impairment; two or more strictly lobar bleeds (microbleeds, haematomas or siderosis foci); no deep bleeds; no other cause | H-R18 | read: full text | Charidimou, Table 2, "3. Probable CAA": "Age ≥50 years"; "Presentation with spontaneous ICH, TFNEs, or CI/Dementia"; "≥2 of the following strictly lobar haemorrhagic lesions on T2*-weighted MRI, in any combination: ICH, CMB, cSS/cSAH foci"; "Absence of any deep haemorrhagic lesions (ICH, CMB) on T2*weighted -MRI" [sic]; "Absence of other cause of haemorrhagic lesions*". (The table's alternative, one lobar lesion plus one white matter feature, is not on the page.) |
| H-C66 | Microbleeds · What it points to | Mimics: calcification and iron (CT shows calcium), flow voids and veins (linear or tubular), cavernous malformations, melanoma metastases | H-R19 | read: full text | Greenberg: "Both calcium and iron deposits may appear as small foci of low signal intensity on T2*-weighted MRI ... CT can help identify suspected calcification"; flow voids are distinguished "by their sulcal location, their equal visibility on T2-weighted SE and GRE sequences ..., and their linear structure"; venules require "the reader to rely on their tubular structure"; "Cavernous malformations can be considered as a secondary cause of CMB"; "Metastatic melanoma in the brain can appear hypointense on T2*-weighted MRI". |
| H-C67 | Microbleeds · What it points to | SWI phase images tell calcium from blood | H-R3 | read: full text | Weerink: "The phase information is processed into a filtered phase image and can be used to differentiate hemorrhage from calcification." |
| H-C68 | FLAIR mimics · Appearance | Bright CSF in the basal cisterns and convexity sulci on FLAIR | H-R21 | read: abstract | Deliganis: "eight had resultant images that showed increased CSF signal intensity within the basal cisterns and sulci over the cerebral convexities." |
| H-C69 | FLAIR mimics · What it points to | High inspired oxygen (for example under general anaesthesia), not blood | H-R21, H-R22 | read: abstract | Deliganis: "The paramagnetic effects of supplemental O2 administration result in shortened CSF T1. Radiologists should be aware of this phenomenon to avoid attributing increased CSF signal intensity on FLAIR images to abnormal CSF properties such as hemorrhage or elevated protein content." Frigon: "The hyperintensity partially or completely disappeared in the basilar cisterns (P <.001) and cerebral sulcal subarachnoid space (P <.001) after Fio(2) was reduced from 100% to 30%." |
| H-C70 | FLAIR mimics · What it points to | Artefacts and other diseases can also brighten the CSF on FLAIR | H-R23 | read: abstract | Stuckey: "FLAIR subarachnoid space hyperintensity may be encountered with both pathological conditions and artifacts." |
| H-C71 | FLAIR mimics · What it points to | Propofol anaesthesia | none | not stated | No citable read source. Filippi 2001 (AJNR, PMID 11156789, abstract read) states "The fast-FLAIR images of children anesthetized with propofol have artifactual hyperintense signal in the basal cisterns and subarachnoid spaces", but has no DOI. Decision: left off the page. See "Left out". |

## Counts

71 cells: 62 read in full text, 8 read in abstract only (H-C18, H-C32, H-C48, H-C53, H-C54,
H-C68, H-C69, H-C70; H-C18, H-C48 and H-C53 also quote a full text, but their main claim rests on
an abstract), 0 differs and 1 not stated (H-C71). By table:

- Intracerebral haematoma: 30 cells (5 rows × 6 columns) plus 2 notes; all 32 read (30 full text,
  2 abstract).
- Subdural haematoma: 15 cells (3 rows × 5 columns) plus 3 notes; all 18 read (17 full text, 1
  abstract).
- Subarachnoid haemorrhage and microbleeds: 21 cells over 4 rows; 20 read (15 full text, 5
  abstract), 1 not stated.

## Where the sources disagree

- **Intracerebral haematoma time ranges** (H-C1, H-C7, H-C13, H-C19, H-C25). Weerink 2023 and
  Penckofer 2024: under 24 h, 1–3 days, 3–7 days, 7–28 days, over 1 month. Weerink also says the
  hyperacute phase "is often arbitrarily defined as the first 12–24 h". Kang 2001: 0–12 h, 13 h to 3
  days, 4–7 days, 8–30 days, 31 days or more. Popescu 2024 (MRI): acute "the first 24–48 hours",
  early subacute "from day 2 to 7", late subacute begins "A week after the bleed" and "lasts for two
  weeks", chronic "over 28 days". Decision: the table uses Weerink's ranges; the note (H-C31) says
  others differ.
- **Hyperacute SWI/GRE** (H-C5). Weerink (SWI): centre "intermediate to high", dark rim. Kang
  (conventional GRE): centre "mixed iso- or hyperintensity", dark rim. Penckofer, Table 1 (GRE):
  "Marked hypointensity". Decision: follow Weerink, an SWI review, which Kang supports.
- **Late subacute SWI/GRE** (H-C23). Weerink: bright centre (T1 shine-through) and dark rim. Kang
  (GRE): "heterogeneous hyperintensity". Penckofer (GRE): "Hypointense". Decision: follow Weerink.
- **Chronic T2** (H-C28). Weerink "High center, low rim"; Kang hyperintense centre with a complete
  dark rim; Popescu (MRI) "hypointense rim" and a centre "hyperintense on T2". Penckofer, Table 1:
  "Hypointense". Decision: follow Weerink (three sources agree).
- **Hyperacute and acute T1** (H-C3, H-C9). Weerink: "Iso". Penckofer: "Hypointense/isointense"
  (hyperacute), "Isointense/slightly hypointense" (acute). Popescu (MRI) Table 2:
  "Isointense/slightly ↓" for both. Decision: "Like brain or slightly dark".
- **Hyperacute T2** (H-C4). Weerink: "High", "hyperintense compared to the brain parenchyma".
  Penckofer: "Isointense/hyperintense center with peripheral hypointensity and hyperintense rim of
  vasogenic edema". Popescu (MRI): "Isointense/slightly ↑". Decision: "Bright", following Weerink.
- **Late subacute T2 in Popescu (MRI)**. Its text says the late subacute haematoma "becomes
  hyperintense in T1-weighted sequences and hypointense in T2", while its own Table 2 gives T2 "↑".
  Not used; Weerink, Penckofer and Kang all give bright.
- **CT density by stage** (H-C6, H-C12, H-C18, H-C24, H-C30). No open source found gives CT density
  per stage for intracerebral haematoma specifically (Parizel's tables are behind the paywall).
  Popescu (CT) gives four phases for haematomas in head trauma in general, and defines them by
  clot state, not by time: hyperacute is "before blood has had time to form a clot" (under 60 HU),
  acute is when "the clot is already established" (60–90 HU, "the time when we get most of our
  patients to the CT scan"), subacute is "days after the trauma", and there is no early/late split.
  The table's rows use Weerink's clock windows (under 24 h, 1–3 days, 3–7 days). Read literally,
  Popescu's hyperacute figure would put every haematoma under 24 hours below 60 HU, which its own
  sentence on intracerebral haemorrhage ("On NECT they appear as hyperdense collections")
  contradicts. Dolinskas (abstract, intracerebral haematoma) gives the rate: density falls "by an
  average of 0.7 EMI units per day" and the dense part shrinks "by an average of 0.65 mm per day",
  so a 3–7 day haematoma is still mostly bright. Decision: hyperacute CT says "bright once clotted"
  and keeps the under-60 HU figure only for blood that has not yet clotted (H-C6); early subacute
  says bright and fading slowly (H-C18, Dolinskas); Popescu's isodense subacute phase goes in the
  late subacute row (H-C24). The note under the table (H-C31) should say that the CT phases in the
  source are defined by clot state.
- **Subdural time ranges** (H-C33, H-C38, H-C43). Tripathy: under 3 days, 4–21 days, over 21 days.
  Hasan: chronic when trauma was "more than 3 weeks before admission". Fobben grouped collections
  as acute, early subacute, late subacute and chronic but its abstract gives no times. Tripathy
  also says subacute subdural haematoma "is the result of subdural effusion in the 1-3 week period".
  Sieswerda-Hoogendoorn: the intervals are "broad and overlapping". Decision: Tripathy's ranges,
  with the note H-C50.
- **Acute subdural T2** (H-C36). Only Popescu (MRI), a paediatric pictorial essay, describes
  T2-bright subdural blood, and only in the hyperacute phase ("from hyperintense in the hyperacute
  phase to isointense in a few days"). Its Fig 6 "(c) isointense T2 signal" is the epicranial (scalp)
  haematoma panel, not the subdural, so it is not used. Fobben says subdural
  haematomas "evolved in a pattern similar to intracerebral hemorrhage with the exception of
  chronic subdural hematomas", Hasan that they go "through the same stages as parenchymal blood",
  and intracerebral blood at 1–3 days is dark on T2 (Weerink, H-C10). Tripathy says early subacute
  collections are "hypointense on T2". Decision: "Like brain or dark; it ages as a brain
  haematoma does", following Fobben and Hasan, with Popescu's text; the page does not say
  "bright" for the acute row.
- **Chronic subdural T1** (H-C45). Fobben: iso- or hypointense to grey matter. Hasan: mixed in 52%,
  T1-dark with T2-bright in 15%, and one case "homogenously hyperintense on T1w images" (Fig 2).
  Decision: "Mixed; often like or darker than brain".
- **Haemosiderin in chronic subdural haematoma**. Fobben: "Hemosiderin was rarely seen in chronic
  hematomas." Hasan (T2*-GRE and SWI): "Hypointensity was noticed on T2*-GRE and SWI in 24 hematomas
  (89%)", in 10 of them only as lines along the membranes or septa. The table has no SWI column for
  subdurals, so neither is on the page; if Task 2 adds one, follow Hasan (more recent, with SWI).
- **CT sensitivity for SAH** (H-C53). The two figures come from different cohorts and scanners.
  Perry 2011: third generation CT in neurologically intact adults with headache peaking within one
  hour, read by a qualified radiologist; 100% (95% CI 97.0% to 100.0%) within 6 hours of headache
  onset, 92.9% overall, concluding CT is "extremely sensitive" in that window. Ferrante 2011 quotes
  van Gijn and van Dongen 1982 (older scanners): 86% on day one, 76% after 2 days, 58% after 5 days.
  Decision: the cell says "near 100% within 6 hours on modern CT" and gives the day-5 figure as
  coming from a 1982 series.
- **Propofol or oxygen** (H-C69, H-C71). Filippi 2001 attributes the FLAIR CSF signal to propofol
  and lists oxygen among other possible causes. Deliganis 2001: "Anesthetic phantom measurements
  showed T1 shortening only when the agent was administered with high concentrations of oxygen".
  Frigon 2004 (children under propofol): the signal fell when inspired oxygen was cut to 30%.
  Decision: the page names oxygen only.
- **Microbleed size** (H-C62). STRIVE-1: "generally 2–5 mm in diameter, but up to 10 mm". Greenberg:
  cut-points up to "5 to 10 mm" and "in some studies a minimum of 2 mm". Both advise against a strict
  cut-off. Decision: give STRIVE-1's figures and its reason for no cut-off.

## Left out for want of a source that states it

- **Propofol as a FLAIR mimic** (H-C71). Read only in Filippi 2001 (abstract), which has no DOI;
  Frigon 2004 and Deliganis 2001 attribute the effect to oxygen. Left off the page.
- **A day count for each CT phase**. The read CT source defines its phases by clot state, not by
  days; no read source gives CT density at a stated day except through Dolinskas's daily rate. The
  CT cells are placed by that rate (see "Where the sources disagree"), not by a stated window.
- **Signal against grey matter for every haematoma stage**. No read source states all stages
  against grey matter; see the note on reference tissue above. The page should say "like brain",
  not "like grey matter", for the intracerebral table.
- **SWI/T2* appearance of each subdural stage**. Not a column on the page; only the chronic stage
  is described in a read source (Hasan), and Fobben disagrees.
- **Field-strength note for subdurals**. No read source states it for subdural blood; the note
  stays under the intracerebral table only.
- **"Aneurysm rupture is the commonest cause of SAH"** and other aetiology of acute subarachnoid
  blood: no read source states it, and aetiology work-up is out of scope by the spec. The only cause
  given is the convexity/CAA link (H-C55).
- **FLAIR sulcal signal from masses, meningitis or slow flow** (Taoka 2001, AJR, abstract seen):
  beyond the spec's mimic list; the general sentence H-C70 covers it without listing causes.
- **STRIVE-2 updates on microbleeds and siderosis**. Closed; the abstract states no definitions.
- **Mnemonics** for the stage sequence (the "It Be, Iddy Biddy, Baby Doo Doo" and "George Washington
  Bridge" type): none of the read sources gives one, so none goes on the page (spec non-goal).
- **Kidwell 2008 per-stage descriptions**: closed; the abstract only says blood "has characteristic
  appearances on both imaging modalities at each stage (acute, subacute, and chronic)".

## Appendix: Figure leads for the scans

CC BY figures seen in the open sources, for Task 3. Licence is the article licence stated in the
PMC XML; no figure carries its own permission statement. No image was downloaded. Weerink 2023,
Kang 2001 and both Popescu papers (CC BY-NC) and Tripathy 2016 (CC BY-NC-SA) are excluded by the
scan rules, as are the author manuscripts (Greenberg 2009, Charidimou 2022).

| Target | PMCID | Figure | What it shows | Licence |
|---|---|---|---|---|
| Haematoma stages on T1, FLAIR/T2, GRE | PMC11111865 (Penckofer 2024) | Fig 1A | A1–E2: hyperacute, acute, early subacute (T1, T2 FLAIR), late subacute (T1, T2), chronic (T1, GRE) | CC BY 4.0 |
| Cavernoma, AVM, haemorrhagic metastasis | PMC11111865 | Fig 1B | Aetiology panels (reference only) | CC BY 4.0 |
| Chronic subdural, haemosiderin along dura and septa | PMC9393587 (Hasan 2022) | Fig 1 | T1 pre/post contrast, T2*-GRE | CC BY 4.0 |
| Chronic subdural, T1-bright with patchy restriction | PMC9393587 | Fig 2 | DWI, ADC, T1, T2*-GRE | CC BY 4.0 |
| Bilateral chronic subdurals, mixed signal, membranes | PMC9393587 | Fig 3 | FLAIR, T1 pre/post, sagittal T2 | CC BY 4.0 |
| Chronic subdural on FLAIR | PMC9393587 | Fig 4 | FLAIR before and after contrast | CC BY 4.0 |
| Chronic subdural CT subtypes (homogeneous, separated, laminar, trabeculated) | PMC11079242 (Chen 2024) | Fig 5 | Non-contrast CT, Nakaguchi types (mixed-age collections) | CC BY 4.0 |
| Chronic subdural membranes | PMC11079242 | Figs 2, 3 | NCCT, contrast MR, dual-energy CT, external and internal membranes | CC BY 4.0 |
| Bilateral chronic subdurals on FLAIR | PMC13258658 (Kuczyński 2026, J Clin Med) | Fig 6 | 3T FLAIR, hyperintense bilateral chronic subdurals; both show dark pockets with flat lower edges at the front, which the source does not explain (the caption says so) | CC BY |
| Subdural on CT | PMC13258658 | Figs 5A, 7A | Non-contrast CT, right subdural with mass effect (age not stated) | CC BY |
| Superficial siderosis on T2*/SWI, phase | PMC10220152 (Weidauer 2023) | Fig 2 | T2*-GRE, SWI, mIP, filtered phase | CC BY 4.0 |
| Classical infratentorial siderosis | PMC10220152 | Figs 3, 5 | T2*-GRE and SWI, posterior fossa and cord | CC BY 4.0 |
| Convexity SAH and cortical siderosis | PMC10220152 | Fig 6 | CT, FLAIR sulcal hyperintensity, T2* signal loss, bilinear cSS | CC BY 4.0 |
| Acute convexity SAH with microbleeds (CAA) | PMC10220152 | Fig 7 | FLAIR, SWI with multiple microbleeds and cSS, DWI | CC BY 4.0 |

Gaps (no CC BY scan seen in the open sources): an acute or subacute subdural on MRI; aneurysmal
subarachnoid blood on FLAIR; a microbleed mimic (calcification) on SWI with CT; an oxygen FLAIR
mimic.
