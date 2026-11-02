# Brain vascular territories: sources and claims

Date: 2026-11-02 · Branch: `claude/brain-territories`

The author asked (2026-11-02) for a teaching page on the vascular territories of the brain, arterial
and venous, with dural venous sinus thrombosis. The page and its map are specified in
`docs/superpowers/specs/2026-11-02-brain-territories-design.md`. This document lists every reference
the page may cite and every claim it may make, with the sentence that supports it.

## Status: written with the paper databases reachable

Each reference was matched on PubMed, its DOI checked on Crossref (all 34 resolve, with matching
title, journal, volume and pages), and each claim went in only after its wording was read in the
abstract or an open full text:

- Full texts were read through the Europe PMC full-text API (JATS XML) or, where Europe PMC refused
  the XML (Lazzaro 2010, the ESO guideline), as the article page on pmc.ncbi.nlm.nih.gov.
- Tatu 1996, Tatu 1998 and Tatu 2012 are closed (Unpaywall: `closed`); only their abstracts were
  read. The abstracts say what the sections show but not which structure lies in which territory,
  so every territory assignment on the map rests on the open reviews below, several of which draw
  on Tatu (Zedde 2022 cites Tatu 1998 for its brainstem tables; Rauch 2024 cites Tatu 1996 for its
  midbrain figure).
- The task brief's candidate "Canedo-Antelo, Insights Imaging 2019 (open, CC BY)" is in fact
  RadioGraphics 2019 and closed; it is kept for its abstract only. Mangla 2011, Leach 2006 and the
  AHA statement (2024) were also read in abstract only (the AHA full text sits on hosts this
  environment cannot reach).
- Rhoton 2000 (*The posterior fossa veins*) has no abstract on PubMed and no open copy, so it was
  not read. Its galenic, petrosal and tentorial grouping is read in three open reviews that cite it
  (de Miquel 2021, Morales-Roccuzzo 2024, Ota 2024), and those carry the claims.

Claims are written in the words the page will use. A `differs` verdict means the plan's wording
(Task 2's `LEVELS` data, or the spec) does not match the source; the sourced wording is given so
Task 2 can change the data. `not stated` means no read source states it; those are listed again
under "Left out".

## References

| # | Citation | PMID | DOI | Read |
|---|---|---|---|---|
| T-R1 | Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of human brain: brainstem and cerebellum. Neurology. 1996;47(5):1125-1135. | 8909417 | 10.1212/wnl.47.5.1125 | abstract |
| T-R2 | Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of the human brain: cerebral hemispheres. Neurology. 1998;50(6):1699-1708. | 9633714 | 10.1212/wnl.50.6.1699 | abstract |
| T-R3 | Tatu L, Moulin T, Vuillier F, Bogousslavsky J. Arterial territories of the human brain. Front Neurol Neurosci. 2012;30:99-110. | 22377874 | 10.1159/000333602 | abstract |
| T-R4 | Liu CF, Hsu J, Xu X, et al. Digital 3D brain MRI arterial territories atlas. Sci Data. 2023;10(1):74. | 36739282 | 10.1038/s41597-022-01923-0 | open full text (PMC9899211, CC BY 4.0) |
| T-R5 | Chandra A, Li WA, Stone CR, Geng X, Ding Y. The cerebral circulation and cerebrovascular disease I: anatomy. Brain Circ. 2017;3(2):45-56. | 30276305 | 10.4103/bc.bc_10_17 | open full text (PMC6126264, CC BY-NC-SA 3.0) |
| T-R6 | Morales-Roccuzzo D, Sabahi M, Obrzut M, et al. A primer to vascular anatomy of the brain: an overview on anterior compartment. Surg Radiol Anat. 2024;46(6):829-842. | 38630270 | 10.1007/s00276-024-03359-0 | open full text (PMC11161539, CC BY 4.0) |
| T-R7 | Morales-Roccuzzo D, Sabahi M, Obrzut M, et al. Posterior vascular anatomy of the encephalon: a comprehensive review. Surg Radiol Anat. 2024;46(6):843-857. | 38652250 | 10.1007/s00276-024-03358-1 | open full text (PMC11161439, CC BY 4.0) |
| T-R8 | Yu J, Xu N, Zhao Y, Yu J. Clinical importance of the anterior choroidal artery: a review of the literature. Int J Med Sci. 2018;15(4):368-375. | 29511372 | 10.7150/ijms.22631 | open full text (PMC5835707, CC BY-NC 4.0) |
| T-R9 | Osiowski A, Stolarz K, Osiowski M, Klepinowski T, Taterra D. The prevalence and anatomy of recurrent artery of Heubner: a meta analysis with neurosurgical considerations. Acta Neurochir (Wien). 2024;166(1):431. | 39472321 | 10.1007/s00701-024-06327-0 | open full text (PMC11522058, CC BY 4.0) |
| T-R10 | Lazzaro NA, Wright B, Castillo M, et al. Artery of Percheron infarction: imaging patterns and clinical spectrum. AJNR Am J Neuroradiol. 2010;31(7):1283-1289. | 20299438 | 10.3174/ajnr.A2044 | open full text (PMC7965474, publisher copyright, not CC) |
| T-R11 | Rauch M, Berkefeld J, Klonowski M, Hattingen E, Weidauer S. Thalamo-mesencephalic branches of the posterior cerebral artery: a 3D rotational angiography study. Clin Neuroradiol. 2024;34(3):693-701. | 38668868 | 10.1007/s00062-024-01418-y | open full text (PMC11339114, CC BY 4.0) |
| T-R12 | Zedde M, Grisendi I, Pezzella FR, et al. Acute onset quadriplegia and stroke: look at the brainstem, look at the midline. J Clin Med. 2022;11(23):7205. | 36498778 | 10.3390/jcm11237205 | open full text (PMC9740674, CC BY 4.0) |
| T-R13 | Nouh A, Remke J, Ruland S. Ischemic posterior circulation stroke: a review of anatomy, clinical presentations, diagnosis, and current management. Front Neurol. 2014;5:30. | 24778625 | 10.3389/fneur.2014.00030 | open full text (PMC3985033, CC BY) |
| T-R14 | Błaszczyk M, Ochwat K, Necka S, et al. The arterial anatomy of the cerebellum: a comprehensive review. Brain Sci. 2024;14(8):763. | 39199457 | 10.3390/brainsci14080763 | open full text (PMC11352334, CC BY 4.0) |
| T-R15 | Bogousslavsky J, Maeder P, Regli F, Meuli R. Pure midbrain infarction: clinical syndromes, MRI, and etiologic patterns. Neurology. 1994;44(11):2032-2040. | 7969955 | 10.1212/wnl.44.11.2032 | abstract |
| T-R16 | Arboix A, García-Eroles L, Sellarés N, et al. Infarction in the territory of the anterior cerebral artery: clinical study of 51 patients. BMC Neurol. 2009;9:30. | 19589132 | 10.1186/1471-2377-9-30 | open full text (PMC2714497, CC BY 2.0) |
| T-R17 | Lambert SL, Williams FJ, Oganisyan ZZ, Branch LA, Mader EC Jr. Fetal-type variants of the posterior cerebral artery and concurrent infarction in the major arterial territories of the cerebral hemisphere. J Investig Med High Impact Case Rep. 2016;4(3):2324709616665409. | 27660767 | 10.1177/2324709616665409 | open full text (PMC5024744, CC BY 3.0) |
| T-R18 | de Sousa CS, de Miranda CL, Avelino MC, et al. Thrombosis of the azygos anterior cerebral artery. Case Rep Radiol. 2017;2017:5409430. | 28299225 | 10.1155/2017/5409430 | open full text (PMC5337377, CC BY 4.0) |
| T-R19 | Mangla R, Kolar B, Almast J, Ekholm SE. Border zone infarcts: pathophysiologic and imaging characteristics. RadioGraphics. 2011;31(5):1201-1214. | 21918038 | 10.1148/rg.315105014 | abstract |
| T-R20 | Dogariu OA, Dogariu I, Vasile CM, et al. Diagnosis and treatment of watershed strokes: a narrative review. J Med Life. 2023;16(6):842-850. | 37675172 | 10.25122/jml-2023-0127 | open full text (PMC10478671, CC BY 3.0) |
| T-R21 | Wardlaw JM, Smith EE, Biessels GJ, et al. Neuroimaging standards for research into small vessel disease and its contribution to ageing and neurodegeneration. Lancet Neurol. 2013;12(8):822-838. | 23867200 | 10.1016/S1474-4422(13)70124-8 | open full text (PMC3714437) |
| T-R22 | Ota T. Functional cerebral venous anatomy from the viewpoint of venous collaterals part I, supratentorial superficial and deep venous system. Stroke Vasc Interv Neurol. 2024;4(2):e001050. | 41583581 | 10.1161/SVIN.123.001050 | open full text (PMC12778471, CC BY-NC 4.0) |
| T-R23 | Ota T. Functional cerebral venous anatomy: a perspective on venous collaterals part II, infratentorial venous system. Stroke Vasc Interv Neurol. 2024;4(2):e001060. | 41583593 | 10.1161/SVIN.123.001060 | open full text (PMC12778472, CC BY-NC 4.0) |
| T-R24 | de Miquel MA. Posterior fossa venous drainage. Front Neurol. 2021;12:680515. | 34819905 | 10.3389/fneur.2021.680515 | open full text (PMC8606530, CC BY) |
| T-R25 | Rhoton AL Jr. The posterior fossa veins. Neurosurgery. 2000;47(3 Suppl):S69-S92. | 10983305 | 10.1097/00006123-200009001-00012 | not read (no abstract on PubMed, no open copy); no claim rests on it |
| T-R26 | Li AY, Tong E, Yedavalli VS. A case-based review of cerebral venous infarcts with perfusion imaging and comparison to arterial ischemic stroke. Front Radiol. 2021;1:687045. | 37492169 | 10.3389/fradi.2021.687045 | open full text (PMC10365275, CC BY) |
| T-R27 | Sadik JC, Jianu DC, Sadik R, et al. Imaging of cerebral venous thrombosis. Life (Basel). 2022;12(8):1215. | 36013394 | 10.3390/life12081215 | open full text (PMC9410175, CC BY 4.0) |
| T-R28 | Oliveira IM, Duarte JÁ, Dalaqua M, et al. Cerebral venous thrombosis: imaging patterns. Radiol Bras. 2022;55(1):54-61. | 35210665 | 10.1590/0100-3984.2021.0019 | open full text (PMC8864687, CC BY 4.0) |
| T-R29 | Pai V, Khan I, Sitoh YY, Purohit B. Pearls and pitfalls in the magnetic resonance diagnosis of dural sinus thrombosis: a comprehensive guide for the trainee radiologist. J Clin Imaging Sci. 2020;10:77. | 33365199 | 10.25259/JCIS_187_2020 | open full text (PMC7749941, CC BY-NC-SA 4.0) |
| T-R30 | Zedde M, Pascarella R. Non-thrombotic filling defects in cerebral veins and sinuses: when normal structures mimic a disease. Neurol Int. 2025;17(1):9. | 39852773 | 10.3390/neurolint17010009 | open full text (PMC11767902, CC BY 4.0) |
| T-R31 | Canedo-Antelo M, Baleato-González S, Mosqueira AJ, et al. Radiologic clues to cerebral venous thrombosis. RadioGraphics. 2019;39(6):1611-1628. | 31589585 | 10.1148/rg.2019190015 | abstract |
| T-R32 | Leach JL, Fortuna RB, Jones BV, Gaskill-Shipley MF. Imaging of cerebral venous thrombosis: current techniques, spectrum of findings, and diagnostic pitfalls. RadioGraphics. 2006;26 Suppl 1:S19-S41. | 17050515 | 10.1148/rg.26si055174 | abstract |
| T-R33 | Saposnik G, Bushnell C, Coutinho JM, et al. Diagnosis and management of cerebral venous thrombosis: a scientific statement from the American Heart Association. Stroke. 2024;55(3):e77-e90. | 38284265 | 10.1161/STR.0000000000000456 | abstract |
| T-R34 | Ferro JM, Bousser MG, Canhão P, et al. European Stroke Organization guideline for the diagnosis and treatment of cerebral venous thrombosis, endorsed by the European Academy of Neurology. Eur Stroke J. 2017;2(3):195-221. | 31008314 | 10.1177/2396987317719364 | open full text (PMC6454824) |

## Claims

Verdicts: `read: abstract`, `read: full text`, `differs` (the planned wording does not match; the
sourced wording follows "Sourced:"), `not stated`.

### 1. Map: territory rows (Task 2 `LEVELS`)

One claim per row of Task 2's data, in the order the data lists them. "Row" gives the data as
planned (family · name · supply). Where the verdict is `differs` or `not stated`, the "Sourced"
text is what Task 2 should use instead.

#### Centrum semiovale

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C1 | aca · ACA: medial frontal and parietal convexity · Cortical branches of the ACA | T-R5, T-R6 | read: full text | Chandra: "The ACA primarily supplies blood to the most medial aspect of the cerebral cortical surface ... This area includes portions of the frontal lobes, as well as the superomedial parietal lobes". Morales-Roccuzzo (anterior): "The ACA mainly provides blood flow to the anterior and medial (parafalcine) aspect of the brain hemispheres: superior frontal gyrus, the superior parts of the precentral, central and postcentral gyri". |
| T-C2 | pca · PCA: medial parieto-occipital · Cortical branches of the PCA | T-R5 | differs | Sourced: "PCA: occipital lobe (behind the parieto-occipital sulcus)"; the medial parietal lobe (precuneus) is ACA. Chandra: the ACA "ends rostral to the parieto-occipital sulcus, this artery does not supply the medial occipital lobe"; Table 1, A3: "Corpus callosum, superior frontal gyrus, precuneus, and medial aspect of hemisphere above corpus callosum"; PCA: "a major source of blood to the occipital lobe, the inferior and medial parts of the temporal lobe, and a posterior portion of the inferior parietal lobe". |
| T-C3 | mca · MCA: lateral convexity · Cortical branches of the MCA | T-R5 | read: full text | Chandra: the MCA's branches extend "over most of the lateral surface of the cerebral hemisphere"; Table 2, M4: "Hemispheric surface of frontal and parietal lobes". |
| T-C4 | superior · Convexity and its white matter · Superficial cortical veins to the superior sagittal sinus | T-R26, T-R22 | read: full text | Li, Fig 3 (centrum semiovale level): "The superficial/cortical veins drain the cortex, subcortical white matter, and SSS (green)." Ota I: "there are superficial medullary veins that drain into the superficial venous system and deep medullary veins that drain into the subependymal veins of the lateral ventricles." |
| T-C5 | deep · Deep white matter · Deep medullary veins to the subependymal veins | T-R22 | read: full text | Ota I: "deep medullary veins that drain into the subependymal veins of the lateral ventricles"; "Most deep veins drain into the internal cerebral vein (ICV)". |
| T-C6 | borderZone · Cortical border zone, ACA and MCA · Between the ACA and MCA cortical branches | T-R20 | read: full text | Dogariu: "There are two types of WI: cortical WI, occurring at the junction of cortical territories supplied by the anterior, middle, and posterior cerebral arteries"; external border zone infarcts "are localized between the ACA/MCA and MCA/PCA distribution territories". |
| T-C7 | borderZone · Cortical border zone, MCA and PCA · Between the MCA and PCA cortical branches | T-R20 | read: full text | As T-C6. |
| T-C8 | borderZone · Internal border zone · Between the deep and superficial medullary arteries | T-R20 | differs | Sourced supply: "Between the deep perforating and the cortical penetrating arteries" ("medullary arteries" is not the source's term). Dogariu: "internal WI, occurring in the white matter between the deep and superficial territories of the middle cerebral artery"; the "string of pearls" sign is "a type of border zone stroke between cortical penetrating arteries and ascending perforating arteries", "located at the level of the semioval center or corona radiata". |

#### Corona radiata

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C9 | aca · ACA: medial frontal and parietal · Cortical branches of the ACA | T-R5, T-R20 | read: full text | As T-C1. Dogariu: "The anterior cerebral artery supplies the medial portion of the frontal and parietal lobe". |
| T-C10 | pca · PCA: occipital · Cortical branches of the PCA | T-R5 | read: full text | Chandra: PCA is "a major source of blood to the occipital lobe". |
| T-C11 | mca · MCA: lateral hemisphere · Cortical branches of the MCA | T-R20 | read: full text | Dogariu: "The middle cerebral artery, through its cortical branches, irrigates the lateral surface of the cerebral hemispheres except for the portion supplied by the anterior cerebral artery and the lower portion of the temporal lobe". |
| T-C12 | lenticulostriate · Corona radiata · Lenticulostriate arteries from the MCA | T-R5, T-R20 | not stated | No read source gives the corona radiata to the lenticulostriate arteries. Their stated territory is the basal ganglia and internal capsule (Chandra, Table 2, M1; Dogariu). The deep white matter at this level is where Dogariu puts the internal border zone ("at the level of the semioval center or corona radiata"). Task 2 should drop this inner ring or relabel it as white matter without a sourced artery. |
| T-C13 | superior · Convexity · Superficial cortical veins to the superior sagittal sinus | T-R22 | read: full text | Ota I: "the veins from the lateral and medial surfaces of the frontal, parietal, and occipital lobes and those from the orbital surface of the frontal lobe drain into the SSS." |
| T-C14 | sylvian · Lateral convexity near the Sylvian fissure · Superficial middle cerebral vein | T-R22, T-R26 | read: full text | Ota I: "The superficial middle cerebral vein (SMCV) drains into the CS and collects veins from the frontal, parietal, and temporal lobes around the Sylvian fissure along its course." Li, Fig 3: "The sphenoparietal and cavernous sinuses drain the peri-Sylvian region (purple)." |
| T-C15 | deep · Deep white matter · Deep medullary veins to the subependymal veins | T-R22 | read: full text | As T-C5. |
| T-C16 | borderZone · Cortical border zone, ACA and MCA | T-R20 | read: full text | As T-C6; Dogariu: ACA/MCA border-zone infarcts "are located in the frontal cortex, extending from the frontal horn of the lateral ventricle to the cortex." |
| T-C17 | borderZone · Cortical border zone, MCA and PCA | T-R20 | read: full text | Dogariu: "The infarcts between the MCA and the PCA border territories are distributed in the parieto-occipital region, extending from the occipital horn of the lateral ventricle to the cortex." |
| T-C18 | borderZone · Internal border zone · Between the lenticulostriate and medullary arteries | T-R20 | differs | Sourced supply: "Between the cortical branches of the ACA, MCA or PCA and the deep perforators (lenticulostriate, Heubner, anterior choroidal)". Dogariu: "Internal border zone strokes (IBZ) primarily occur due to hypoperfusion and are located between the distribution areas of the three main arteries: ACA, MCA or PCA, and the perforating, lenticulostriate arteries, Heubner's recurrent artery, and the branches of the anterior choroidal artery." |

#### Basal ganglia and thalamus

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C19 | aca · ACA: medial frontal · Cortical branches of the ACA | T-R5, T-R20 | read: full text | As T-C1, T-C9. |
| T-C20 | pca · PCA: occipital lobe · Cortical branches of the PCA | T-R5 | read: full text | As T-C10. |
| T-C21 | mca · MCA: lateral frontal, insula, lateral temporal and parietal · Cortical branches of the MCA | T-R5 | read: full text | Chandra: the MCA supplies "all of the insular cortex and opercular surface, the superior and middle temporal gyri, a parietal territory that comprehends the inferior parietal lobule and much of the postcentral gyrus, and a frontal territory that comprehends inferior and middle frontal gyri, much of the precentral gyrus, and the lateral part of the orbital surface." |
| T-C22 | superior · Medial frontal and parietal · Superficial cortical veins to the superior sagittal sinus | T-R22 | read: full text | As T-C13. |
| T-C23 | labbe · Posterior temporal and lateral occipital · Vein of Labbé to the transverse sinus | T-R22, T-R26 | read: full text | Ota I: "The veins from the lateral surface and the basal parts of the temporal and occipital lobes drain into the TS." Li gives a different region (posterior temporal and inferior parietal); see "Where the sources disagree". The drawing follows Ota (2024, the most recent). |
| T-C24 | sylvian · Insula and perisylvian cortex · Superficial middle cerebral vein to the sphenoparietal or cavernous sinus | T-R22, T-R26, T-R6 | differs | Sourced: "Perisylvian cortex · Superficial middle cerebral vein to the sphenoparietal or cavernous sinus". The insula is not given to this vein: Ota I describes the insular veins forming the deep middle cerebral vein, a tributary of the basal vein of Rosenthal: "the veins from the insula converge to form the deep (medial) telencephalic vein"; "The deep telencephalic vein (deep middle cerebral vein [DMCV]) ... flows into the first segment of the BVR" (an embryology passage). Perisylvian: Ota I (T-C14); Li, Fig 3: "The sphenoparietal and cavernous sinuses drain the peri-Sylvian region"; Morales-Roccuzzo: "a sphenoidal group that drains into the sphenoparietal or cavernous sinus". |
| T-C25 | heubner · Caudate head and anterior limb of the internal capsule · Recurrent artery of Heubner (ACA) | T-R9 | read: full text | Osiowski: Heubner's artery "constantly supplies the anterior part of the caudate nucleus, the anterior third of the putamen, the anterior part of the outer segment of the globus pallidus, the anteroinferior portion of the anterior limb of the internal capsule". |
| T-C26 | lenticulostriate · Lentiform nucleus and upper internal capsule · Lenticulostriate arteries (MCA) | T-R5, T-R20 | read: full text | Chandra, Table 2, M1: "Medial and lateral lenticulostriate arteries (15-17 in number) ... Head and body of the caudate nucleus, the upper part of the anterior limb, the genu and anterior portion of the posterior limb of internal capsule, the putamen and the lateral pallidum". Dogariu: "the upper part of the head and body of the caudate nucleus, most of the globus pallidus, and putamen through its deep branches, known as lenticulostriate arteries." (The two differ on how much of the pallidum; see "Where the sources disagree".) |
| T-C27 | acha · Posterior limb of the internal capsule · Anterior choroidal artery (ICA) | T-R8, T-R5, T-R6 | read: full text | Yu: "The AChA supplies an extremely important region of the brain that includes the posterior limb of the internal capsule, optical tract, lateral geniculate body, medial temporal lobe, and medial area of the pallidum". Chandra and Morales-Roccuzzo give different extents (posterior two-thirds of the capsule; inferior half of the posterior limb); see "Where the sources disagree". |
| T-C28 | thalamic · Thalamus · Thalamic branches of the PCA and posterior communicating artery | T-R10 | read: full text | Lazzaro: "The thalamus is predominantly supplied by multiple small vessels originating from the PcomA and P1 and P2 segments of the PCAs." |
| T-C29 | deep · Caudate head · Thalamostriate vein to the internal cerebral vein | T-R22 | read: full text | Ota I: "The striate vein drains the striatum (caudate nucleus and putamen), globus pallidus, and internal capsule and runs cranially as the superior striate vein, flowing into the anterior caudate vein and thalamostriate vein ... and finally heading to the ICV." |
| T-C30 | deep · Lentiform nucleus · Deep veins to the basal vein of Rosenthal and internal cerebral vein | T-R22 | read: full text | Ota I: "The inferior striate veins drain downward to join the first segment of the basal vein, whereas the superior striate veins drain upward and medially to join the thalamostriate vein. They drain the putamen, globus pallidus, and neighboring structures". |
| T-C31 | deep · Thalamus · Internal cerebral vein to the vein of Galen and straight sinus | T-R22, T-R27 | read: full text | Ota I: the ICV receives "veins from the ventricular wall, deep white matter, choroid plexus, striatum, thalamus, and corpus callosum"; "the normal drainage route of the ICV is only the VOG". Sadik: "The straight sinus, which is single, is the confluence of the vein of Galen and the inferior longitudinal sinus". |
| T-C32 | borderZone · Cortical border zone, ACA and MCA | T-R20 | read: full text | As T-C16. |
| T-C33 | borderZone · Cortical border zone, MCA and PCA | T-R20 | read: full text | As T-C17. |

#### Midbrain

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C34 | aca · Gyrus rectus and medial orbital frontal · ACA | T-R6, T-R5 | read: full text | Morales-Roccuzzo: "Orbitofrontal medial artery: is the ACA cortical branch that supplies the gyrus rectus, olfactory bulb-tract, and orbital gyri." Chandra, Table 1, A2: "inferior and inferomedial surfaces of the frontal lobe including gyri recti". |
| T-C35 | acha · Uncus and anterior hippocampus · Anterior choroidal artery | T-R5 | read: full text | Chandra: "the territory of the superficial branches includes piriform cortex and uncus, hippocampal head, amygdala, and most lateral portion of the thalamic lateral geniculate nucleus." |
| T-C36 | pca · Medial temporal and occipital lobes · Cortical branches of the PCA | T-R5 | read: full text | Chandra: "the occipital lobe, the inferior and medial parts of the temporal lobe". |
| T-C37 | mca · Lateral frontal and temporal lobes · Cortical branches of the MCA | T-R5 | read: full text | Chandra: "the superior and middle temporal gyri ... and the lateral part of the orbital surface". |
| T-C38 | mca · Medial frontal behind the gyrus rectus · MCA and ACA | none | not stated | No read source assigns this strip. The plan made it a filler; Task 2 should widen its neighbours and drop it. |
| T-C39 | superior · Frontal lobe · Frontal cortical veins to the superior sagittal sinus | T-R22, T-R26 | read: full text | Ota I: "those from the orbital surface of the frontal lobe drain into the SSS." Li disagrees ("The CS drains venous blood from the orbits and the inferior frontal and parietal lobes"); the drawing follows Ota (2024). |
| T-C40 | deep · Medial temporal lobe · Basal vein of Rosenthal | T-R22 | differs | Sourced: "Uncus · Uncal vein to the basal vein of Rosenthal". Ota I: "The BVR communicates with the CS through the uncal vein"; "the uncal vein drains into the first segment". No read source gives the medial temporal lobe as a whole to the basal vein. |
| T-C41 | labbe · Lateral and inferior temporal and occipital · Vein of Labbé to the transverse sinus | T-R22 | read: full text | As T-C23 (Ota I: "the lateral surface and the basal parts of the temporal and occipital lobes drain into the TS"). |
| T-C42 | sylvian · Temporal pole and lateral frontal · Superficial middle cerebral vein | T-R22 | differs | Sourced: "Perisylvian frontal and temporal cortex · Superficial middle cerebral vein". Ota I: the SMCV "collects veins from the frontal, parietal, and temporal lobes around the Sylvian fissure along its course"; "temporal pole" is not stated. |
| T-C43 | pca · Anteromedial midbrain · Paramedian branches of the PCA and basilar tip | T-R12, T-R15 | differs | Sourced: "Paramedian perforators of the basilar tip, the P1 segment of the PCA and the superior cerebellar artery". Zedde: "the anteromedial (paramedian) vascular territory, which is supplied by the penetrating perforators from the BA, SCA and P1 PCA." Bogousslavsky (abstract): "Middle midbrain involvement was the most common, mainly in the paramedian territory supplied by the basilar artery." |
| T-C44 | acha · Anterolateral midbrain · Anterior choroidal and collicular arteries | T-R11 | differs | Sourced: "Collicular, anterior choroidal and posterior medial choroidal arteries". Rauch, Fig 7 (upper midbrain): "green: anterolateral group (CA, ACHA, posterior medial choroidal artery [PMCA])". |
| T-C45 | pca · Lateral midbrain · Collicular and posterior medial choroidal arteries | T-R11 | differs | Sourced: "Collicular and posterior medial choroidal arteries and branches of the PCA". Rauch, Fig 7: "blue: lateral group (CA, PMCA, PCA)". |
| T-C46 | sca · Dorsal midbrain · Superior cerebellar and collicular arteries | T-R11, T-R12 | differs | Sourced (upper midbrain): "Collicular and posterior medial choroidal arteries", family `pca` rather than `sca`. Rauch, Fig 7: "purple: posterior group (CA, PMCA)". The SCA's share is stated only in general: Zedde, "Five arterial trunks supply the midbrain: the SCA (mainly the medial branch), the collicular artery, the posteromedial choroidal artery, the middle rami of the interpeduncular arteries arising from the PCA and the AChA". |
| T-C47 | deep · Midbrain · Peduncular veins to the basal vein of Rosenthal | T-R23 | read: full text | Ota II, Fig 2: "The peduncular and lateral pontomesencephalic veins drain into the basal vein of Rosenthal." Peduncular vein: "receives venous drainage from the veins of the hypothalamus, inferior thalamic vein, and veins from the midbrain. It communicates ... laterally with the second segment of the BVR." |

#### Pons

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C48 | mca · Lateral temporal lobe · Cortical branches of the MCA | T-R5 | read: full text | As T-C37. |
| T-C49 | pca · Inferior and medial temporal lobe · Cortical branches of the PCA | T-R5, T-R20 | read: full text | Chandra: "the inferior and medial parts of the temporal lobe". Dogariu: "the lower portion of the temporal lobe, which receives blood from the posterior cerebral artery". |
| T-C50 | labbe · Temporal lobe · Vein of Labbé to the transverse sinus | T-R22 | differs | Sourced: "Lateral and inferior temporal lobe · Vein of Labbé to the transverse sinus" (the uncus drains to the basal vein, T-C40). Ota I: "The veins from the lateral surface and the basal parts of the temporal and occipital lobes drain into the TS." |
| T-C51 | aica · Middle cerebellar peduncle and anterior cerebellum · Anterior inferior cerebellar artery | T-R14 | read: full text | Błaszczyk: "The AICA is clinically significant as a major artery of the cerebellum, supplying the pons, middle cerebellar peduncle, and the anterior inferior cerebellum, flocculus, and inner ear". |
| T-C52 | sca · Superior cerebellar hemisphere · Superior cerebellar artery | T-R14 | read: full text | Błaszczyk: "The SCA supplies blood to the superior area of the cerebellar hemisphere, the cerebellar vermis, the superior cerebellar peduncle, the middle cerebellar peduncle, and the interpeduncular region." |
| T-C53 | pica · Posteromedial cerebellum · Posterior inferior cerebellar artery | T-R14, T-R13 | differs | Sourced: "Inferior vermis and suboccipital (posterior inferior) surface of the cerebellum". Błaszczyk: PICA's cortical segment "course[s] on the cerebellum's suboccipital and inferior vermian surface". Nouh, Table 1: "PICA | Inferior posterior cerebellar hemisphere, inferior vermis, lateral medulla". "Posteromedial" at the level of the pons is not stated. |
| T-C54 | petrosal · Anterior cerebellum · Petrosal group to the superior petrosal sinus | T-R23 | read: full text | Ota II: the petrosal vein "receives numerous tributaries from the anterior aspect of the cerebellum and brainstem before draining into the superior petrosal sinus." |
| T-C55 | tentorial · Lateral and posterior cerebellum · Tentorial group to the transverse sinus | T-R23 | read: full text | Ota II, Fig 5: "The superior and inferior hemispheric veins drain into the torcular Herophili or transverse sinus." Inferior hemispheric veins "enter the transverse sinus either directly or via the tentorial sinus." |
| T-C56 | galenic · Superior vermis and medial cerebellum · Galenic group to the vein of Galen | T-R23 | read: full text | Ota II: "Superior vermian vein (Galenic draining group) is a single large trunk formed by several small tributaries that drain the superior aspect of the superior vermis and the adjacent part of the cerebellar hemisphere." |
| T-C57 | basilar · Anteromedial pons · Paramedian branches of the basilar artery | T-R12, T-R13 | read: full text | Zedde, Table 2: "Anteromedial territory | It is supplied by the pontine perforating arteries arising from the BA and entering from the basilar sulcus." Nouh, Table 1: "Pontine paramedian penetrators | Anteromedial pons". |
| T-C58 | basilar · Anterolateral pons · Short circumferential branches of the basilar artery | T-R13, T-R5, T-R12 | read: full text | Nouh, Table 1: "Short pontine circumferential arteries | Anterolateral pons". Chandra: the basilar's pontine branches fall into a paramedian class and "The second class is called circumflex, due to its more lateral distribution". Zedde gives the AICA instead ("It is supplied by the perforating branches arising from the AICA and entering at the pontomedullary sulcus"); see "Where the sources disagree". The drawing keeps the basilar colour (two sources); the page text gives both. |
| T-C59 | aica · Lateral pons · Anterior inferior cerebellar artery | T-R12, T-R13 | read: full text | Zedde: "the AICA mainly gives off twigs to the lateral part of the lower pons"; Table 2, lateral territory: "supplied by lateral pontine perforators that arise directly from the BA, AICA or SCA." Nouh: "AICA | Ipsilateral labyrinth, lateral pontine tegmentum, and brachium pontis, ICP". The caption should say the basilar and SCA contribute too. |
| T-C60 | sca · Dorsal pons · Superior cerebellar artery | T-R12 | read: full text | Zedde: "The posterior territory only exists in the upper part of the pons"; "the SCA to the most posterior (dorsal) part of the rostral tegmentum." The caption should say "upper pons". |
| T-C61 | petrosal · Pons · Anterior pontomesencephalic and transverse pontine veins to the petrosal group | T-R23 | read: full text | Ota II: "The APMV eventually drains laterally into the petrosal vein and superior petrosal sinus"; "Transverse pontine veins collect blood from a network of small veins ventral to the pons. They then drain laterally into the petrosal veins". |

#### Medulla

| ID | Row (as planned) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C62 | aica · Anterior inferior cerebellum and flocculus · Anterior inferior cerebellar artery | T-R14 | read: full text | As T-C51 ("the anterior inferior cerebellum, flocculus, and inner ear"). |
| T-C63 | pica · Inferior cerebellar hemisphere and inferior vermis · Posterior inferior cerebellar artery | T-R13 | read: full text | Nouh, Table 1: "PICA | Inferior posterior cerebellar hemisphere, inferior vermis, lateral medulla". |
| T-C64 | petrosal · Anterior cerebellum · Petrosal group to the superior petrosal sinus | T-R23 | read: full text | As T-C54. |
| T-C65 | tentorial · Inferior and posterior cerebellum · Tentorial group to the transverse sinus and torcular | T-R23 | read: full text | As T-C55; Ota II, Fig 4: "The inferior vermian vein drains into the torcular Herophili (posterior drainage)." |
| T-C66 | vertebral · Anteromedial medulla · Anterior spinal artery | T-R12 | differs | Sourced: "Anterior spinal artery (lower medulla) and paramedian branches of the vertebral artery (upper medulla)". Zedde, Table 1: "Anteromedial territory | It is supplied by the ASA and VA cranially, and the ASA, inferiorly." Text: "The caudal regions of the medial medulla oblongata are supplied by paramedian branches of the ASA ... whereas more rostrally located regions of the medial medulla oblongata are supplied by the paramedian branches of the VAs". |
| T-C67 | vertebral · Anterolateral medulla · Anterior spinal and vertebral arteries | T-R12 | differs | Sourced: "Anterior spinal and vertebral arteries; the anterior spinal and posterior inferior cerebellar arteries lower down". Zedde, Table 1: "Anterolateral territory | It is supplied by the ASA and PICA inferiorly, and by the ASA and VA, superiorly." |
| T-C68 | pica · Lateral medulla · Posterior inferior cerebellar and vertebral arteries | T-R12 | read: full text | Zedde: "The lateral medulla oblongata is mostly supplied by the circumferentially penetrating branches from the VA, while the PICA supplies the remaining lateral and posterior portion of the medulla oblongata." Table 1 adds, from caudal to cranial, the BA and AICA: "It is supplied by the PICA, BA, VA and AICA from the caudal to cranial regions." |
| T-C69 | pica · Dorsal medulla · Posterior inferior cerebellar and posterior spinal arteries | T-R12 | read: full text | Zedde, Table 1: "Posterior territory | It is supplied by the PSAs inferiorly and the PICA, superiorly." |
| T-C70 | petrosal · Medulla · Anterior medullary veins to the petrosal group | T-R23 | read: full text | Ota II: the APMV "is often continuous with the AMV, inferiorly. The APMV eventually drains laterally into the petrosal vein and superior petrosal sinus"; the lateral medullary vein "flows cranially into the lateral pontine vein", which "belongs to the petrosal draining group". Ota also notes bridging veins from the medullary veins "to the sigmoid sinus and marginal sinus". |

#### Map caption and variability

| ID | Section | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|---|
| T-C71 | Map | Tatu and colleagues drew the dominant arterial territories of the brainstem and cerebellum on 12 axial sections. | T-R1 | read: abstract | "We present a system of 12 brainstem and cerebellum axial sections, depicting the dominant arterial territories and the most important anatomic structures." |
| T-C72 | Map | They did the same for the hemispheres, and drew how far the cortical territories of the ACA, MCA and PCA vary. | T-R2 | read: abstract | "we present a system of 12 axial sections of the hemispheres depicting the dominant arterial territories ... The area of variation of the cortical territory of the anterior, middle, and posterior cerebral arteries is also represented." |
| T-C73 | Map | The cortical territories have a smallest and a largest extent, so a boundary on the map is typical, not fixed. | T-R3 | read: abstract | "we present the variability of the cortical territories of the three main cerebral arteries and define the minimal and maximal cortical supply areas." |
| T-C74 | Map | Territories vary a great deal between people; an atlas built from 1,298 strokes found MCA infarcts commonest, then PCA, vertebrobasilar and ACA. | T-R4 | read: full text | Liu: earlier atlases "did not account for the high inter-individual variability in vascular distributions"; "The distribution of strokes according to arterial territories (MCA > PCA > VB > ACA)". |

### 2. Hemispheres

| ID | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C75 | ACA: the medial surface of the frontal lobe and the superomedial parietal lobe, up to the parieto-occipital sulcus; it does not reach the medial occipital lobe. | T-R5 | read: full text | "The ACA primarily supplies blood to the most medial aspect of the cerebral cortical surface ... portions of the frontal lobes, as well as the superomedial parietal lobes; because it ends rostral to the parieto-occipital sulcus, this artery does not supply the medial occipital lobe." |
| T-C76 | The ACA's leg area: it covers the superior frontal gyrus and the top of the precentral and postcentral gyri, the strip that faces the falx. | T-R6 | read: full text | "superior frontal gyrus, the superior parts of the precentral, central and postcentral gyri"; "it correlates directly to Penfield's Homunculus sensory-motor functional areas facing the interhemispheric fissure, such as the lower extremities and the genitals." |
| T-C77 | ACA infarcts are uncommon: 1.8% of cerebral infarcts in one registry. | T-R16 | read: abstract | "Infarctions of the ACA accounted for 1.3% of all cases of stroke (n = 3808) and 1.8% of cerebral infarctions (n = 2704)." |
| T-C78 | MCA: the insula and opercula, the superior and middle temporal gyri, the inferior parietal lobule, the inferior and middle frontal gyri and most of the precentral and postcentral gyri. | T-R5 | read: full text | Quoted at T-C21. |
| T-C79 | The MCA's superior division runs from the orbitofrontal area to the posterior parietal lobe; the inferior division from the temporal pole to the angular area. | T-R5 | read: full text | Table 2, M2: "Superior division: Orbitofrontal area to the posterior parietal love Inferior division: Temporal pole to the angular area of parietal lobe". |
| T-C80 | The M1 perforators are the lenticulostriate arteries: caudate head and body, the upper anterior limb, genu and front of the posterior limb of the internal capsule, the putamen and the lateral pallidum. | T-R5 | read: full text | Quoted at T-C26. |
| T-C81 | The MCA is the commonest site of stroke. | T-R5, T-R4 | read: full text | Chandra: "the MCA is the most common site of stroke"; Liu: "(MCA > PCA > VB > ACA)". |
| T-C82 | PCA: the occipital lobe, the inferior and medial temporal lobe and the back of the inferior parietal lobe; deep branches to the thalamus and midbrain. Deep structures were involved in almost 30% of pure PCA infarcts, and most PCA infarcts cause a field defect. | T-R5 | read: full text | "a major source of blood to the occipital lobe, the inferior and medial parts of the temporal lobe, and a posterior portion of the inferior parietal lobe"; "most commonly (84%–100%), such infarcts produce visual field deficits"; "PCA also has a substantial subcortical territory that covers the thalamus, midbrain, and choroid plexus; deep areas have been found to be involved in almost 30% of pure PCA infarcts." |
| T-C83 | AChA: deep branches to the posterior two-thirds of the internal capsule, the optic and auditory radiations, the medial globus pallidus and the tail of the caudate; superficial branches to the uncus, hippocampal head, amygdala and lateral geniculate body. | T-R5 | read: full text | "The vascular territory of the deep branches includes the posterior two-thirds of the internal capsule, adjacent optic and auditory radiations, medial portion of the globus pallidus, and tail of the caudate nucleus; the territory of the superficial branches includes piriform cortex and uncus, hippocampal head, amygdala, and most lateral portion of the thalamic lateral geniculate nucleus." |
| T-C84 | An AChA infarct takes the posterior limb of the internal capsule, which has no collateral supply; the classic triad is hemiparesis, hemianaesthesia and hemianopia. | T-R8 | read: full text | "the perforating arteries toward the posterior limb of the internal capsule do not receive a collateral supply; thus, when the AChA is occluded, this territory will infarct"; "the triad of hemiparesis, hemianesthesia, and hemianopia, mainly manifest in AChA syndrome". |
| T-C85 | Recurrent artery of Heubner: the largest medial lenticulostriate branch of the ACA, present in 97.5% of hemispheres; it supplies the front of the caudate, the anterior third of the putamen and the anteroinferior anterior limb of the internal capsule. Its infarct (mediobasal striatum) gives brachiofacial weakness, with aphasia on the dominant side. | T-R9 | read: full text | "typically the largest medial lenticulostriate branch of the anterior cerebral artery (ACA)"; "present in 97.5% (95%CI: 95.5–98.6) of the hemispheres"; supply quoted at T-C25; "Iatrogenic damage to RAH may cause mediobasal striatum infarction [70], which leads to brachiofacial hemiparesis and aphasia"; "hemiparesis with facial and brachial predominance or aphasia if the artery is on the dominant side." |
| T-C86 | Thalamus, four territories: anterior (polar or tuberothalamic artery, from the posterior communicating artery), paramedian (paramedian arteries, from P1), inferolateral (thalamogeniculate arteries, from P2) and posterior (posterior choroidal arteries, from P2). | T-R10 | read: full text | "thalamic vascular supply is classically categorized into 4 territories: anterior, paramedian, inferolateral, and posterior ... The anterior territory is supplied by the polar (or thalamotuberal) arteries, which arise from the PcomA. The paramedian territory is supplied by the paramedian (or thalamoperforating) arteries, which arise from the P1 segment of the PCA. The inferolateral territory is supplied by the thalamogeniculate arteries, which arise from the P2 segment of the PCA. The posterior territory is supplied by the posterior choroidal arteries, which arise from the P2 segment of the PCA." |
| T-C87 | The polar artery is absent in 30% to 60% of people, and the paramedian arteries then supply the anterior thalamus too. | T-R10 | read: full text | "the paramedian arteries can supply both the paramedian and the anterior thalamic territories, especially when the polar artery is absent"; "The variable presence of the polar artery (absent in 30%–60% of the population)". |
| T-C88 | An inferolateral (thalamogeniculate) infarct gives the Dejerine–Roussy syndrome, with contralateral pain. | T-R11 | read: full text | "Ischemic strokes within the TGA territory elicit the syndrome of Déjerine and Roussy featuring chronic neuropathic pain contralateral to the stroke side." |
| T-C89 | An arterial infarct is a wedge of lost grey–white differentiation in one arterial territory. | T-R26 | read: full text | Table 3, AIS: "Wedge-shaped loss of gray-white differentiation secondary to cytotoxic edema"; NECT: "loss of gray-white differentiation in an arterial distribution"; MRI: "Edema in arterial distribution". |

### 3. Brainstem and cerebellum

| ID | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C90 | Brainstem branches fall into four groups by where they enter: anteromedial, anterolateral, lateral and posterior, each supplying its own territory; the territories change in size from level to level. | T-R12 | read: full text | "The collaterals of these arteries are divided into four arterial groups (anteromedial, anterolateral, lateral and posterior) according to their point of penetration into the parenchyma. Each one of these groups supplies the corresponding arterial territories in the brainstem. The arterial territories have a variable extension at different levels of the brainstem." |
| T-C91 | Medulla: a large anteromedial, a small anterolateral, a large lateral and a small dorsal territory. | T-R12 | read: full text | "the vascular zone of the medulla is divided into four territories: the large anteromedial, small anterolateral, large lateral and small dorsal ones." |
| T-C92 | Pons: anteromedial, anterolateral and lateral territories; a dorsal territory only in the upper pons. | T-R12 | read: full text | "At the pontine level, three intrinsic arterial territories can be identified: the anteromedial, anterolateral and lateral territories ... The posterior territory only exists in the upper part of the pons." |
| T-C93 | Midbrain: four fairly constant territories; the PCA's share grows from below upwards. | T-R12 | read: full text | "The midbrain's vascular supply is quite elaborate, and it depends on the midbrain level, where the contribution of the PCA increases caudo-rostrally. Four vascular territories are relatively constant". |
| T-C94 | Paramedian brainstem infarcts are sharply marginated, long in the sagittal plane, and stop at the midline. | T-R12 | read: full text | "Most medullary and pontine strokes are sharply marginated and paramedian, with the long axis being oriented in the sagittal plane. This pattern is related to the distribution of the paramedian-penetrating branches ... which perforate the paramedian brainstem and never cross the midline." |
| T-C95 | Ventral paramedian pontine infarcts are the commonest, two of every three isolated pontine infarcts. | T-R12 | read: full text | "Ventral (paramedian) infarcts are the most common location (two out of three isolated pontine infarctions)". |
| T-C96 | Lateral medullary (Wallenberg) syndrome is the commonest medullary syndrome, about 2% of ischaemic strokes; the medial medullary (Dejerine) syndrome is up to four times rarer. | T-R12 | read: full text | "the lateral medullary syndrome (Wallenberg's syndrome), which is the most common one (about 2% of ischemic strokes), and the medial medullary syndrome (Dejerine's syndrome), which has an incidence up to four times lower". |
| T-C97 | Medial medullary infarct: contralateral hemiparesis, contralateral loss of position and vibration sense, ipsilateral tongue weakness. | T-R12 | read: full text | "the classical triad of contralateral hemiparesis/hemiplegia, contralateral loss of position and vibration sense and ipsilateral tongue weakness". |
| T-C98 | Bilateral medial medullary infarcts can give a heart-shaped lesion (the "heart appearance sign"). | T-R12 | read: full text | "A characteristic, although uncommon, is the neuroimaging sign in brain MRI which has been described as having a 'heart appearance sign'". |
| T-C99 | PICA: the inferior posterior cerebellar hemisphere, inferior vermis and lateral medulla; its typical infarct is the lateral medullary syndrome, the dorsolateral medulla being hit most often. | T-R13, T-R14 | read: full text | Nouh, Table 1 (quoted at T-C63) with "Lateral medullary or Wallenberg syndrome". Błaszczyk: "The most typical clinical manifestation of PICA stroke is lateral medullary syndrome, also called Wallenberg syndrome. The dorsal lateral medulla is the most frequently affected ischemic region in PICA stroke". |
| T-C100 | AICA: the lateral pons, middle cerebellar peduncle, anterior inferior cerebellum, flocculus and inner ear; AICA infarcts are rare and give the lateral pontine (AICA) syndrome. | T-R14 | read: full text | Quoted at T-C51; "AICA territory infarcts are rare and commonly result in lateral pontine syndrome, or the AICA syndrome". |
| T-C101 | SCA: the superior cerebellar hemisphere and vermis and the superior cerebellar peduncle; the SCA syndrome is ipsilateral limb ataxia with vertigo, nystagmus and dysarthria. | T-R14, T-R13 | read: full text | Błaszczyk quoted at T-C52. Nouh, Table 1: "SCA | Dorsolateral upper brainstem and cerebellum and superior cerebellar peduncle | Superior cerebellar artery syndrome | Ipsilateral limb ataxia, vertigo, nystagmus, dysarthria, and gait ataxia". |
| T-C102 | Top of the basilar: midbrain, thalami and the medial temporal and occipital lobes. Proximal basilar occlusion in the lower pons: locked-in syndrome. | T-R13 | read: full text | Table 1: "Top of the BA | Midbrain, thalamus, and mesial temporal lobes and occipital lobes | Top of the basilar syndrome"; "Proximal BA | Lower pons | Locked-in syndrome". |
| T-C103 | Pure midbrain infarcts are mostly in the middle midbrain, paramedian, from the basilar; SCA-territory midbrain infarcts are very rare. | T-R15 | read: abstract | "Middle midbrain involvement was the most common, mainly in the paramedian territory supplied by the basilar artery. Infarct in the mesencephalic territory of the posterior cerebral artery was less common, while superior cerebellar artery territory infarct was extremely rare". |

### 4. Border zones, variants and lacunes

| ID | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C104 | Border zone infarcts lie at the junction of two arterial territories and make up about 10% of brain infarcts. There are two kinds: external (cortical) and internal (subcortical). | T-R19 | read: abstract | "ischemic lesions that occur in characteristic locations at the junction between two main arterial territories. These lesions constitute approximately 10% of all brain infarcts ... Two types of border zone infarcts are recognized: external (cortical) and internal (subcortical)." |
| T-C105 | Internal border zone infarcts come mainly from low flow; external ones are thought to be embolic. | T-R19 | read: abstract | "Internal border zone infarcts are caused mainly by hemodynamic compromise, whereas external border zone infarcts are believed to result from embolism but not always with associated hypoperfusion." |
| T-C106 | External border zone infarcts are triangular, cortical or cortico-subcortical: ACA–MCA in the frontal lobe from the frontal horn to the cortex, MCA–PCA in the parieto-occipital region from the occipital horn to the cortex. | T-R20 | read: full text | "These infarcts have a triangular, cortical or cortico-subcortical, periventricular shape"; locations quoted at T-C16 and T-C17. |
| T-C107 | Internal border zone infarcts: usually more than three lesions of at least 3 mm in a line parallel to the lateral ventricle in the centrum semiovale or corona radiata; confluent ones form a band ("string of pearls"), partial ones a rosary. | T-R20 | read: full text | "Generally, more than three lesions should be present, each with a diameter of at least 3 mm. These lesions are distributed linearly, parallel to the lateral ventricle, located at the level of the semioval center or corona radiata"; "Confluent infarcts form a linear band along the lateral ventricles ('string of pearls' appearance), while partial infarcts are more discrete ('rosary lesions')." |
| T-C108 | Bilateral ACA–MCA border zone infarcts can give proximal arm weakness ("man in the barrel"); bilateral parieto-occipital (MCA–PCA) border zone infarcts, Balint's syndrome. | T-R20, T-R13 | read: full text | Dogariu: "Bilateral border zone infarctions between the ACA/MCA territories can produce proximal muscle weakness in the upper limb (the characteristic 'man in the barrel' syndrome)". Nouh, Table 1: "PCA–MCA border zone regions ... Bilateral occipital–parietal border zones | Balint's syndrome". |
| T-C109 | Fetal PCA: the PCA arises from the internal carotid; most are unilateral; reported in 10% to 29% of people. | T-R13, T-R5 | read: full text | Nouh: "A PCA arising directly from the intracranial internal carotid artery (ICA) is defined as fPCA and most are unilateral ... occurs in 10–29% of the population". Chandra: "found to originate unilaterally at the ICA in between 11% and 29% of cases examined." (Other figures under "Where the sources disagree".) |
| T-C110 | With a fetal PCA, a carotid embolus can infarct the PCA territory, alone or with the MCA and ACA territories of the same hemisphere. | T-R17 | read: full text | "In the presence of FPCA, thromboembolism in the anterior circulation may result in paradoxical PCA territory infarction with or without concomitant infarction in the territories of the middle (MCA) or the anterior (ACA) cerebral artery." |
| T-C111 | Artery of Percheron: a single thalamic perforator from one P1 that supplies both paramedian thalami and the rostral midbrain. | T-R13, T-R10 | read: full text | Nouh: "The artery of Percheron is where a single thalamic perforating artery arises from the proximal PCA (P1 segment) between the BA and PCOM and supplies the rostral mesencephalon and both paramedian thalami". |
| T-C112 | Its occlusion gives four patterns: bilateral paramedian thalami with midbrain (43%), without midbrain (38%), with the anterior thalamus and midbrain (14%), with the anterior thalamus without midbrain (5%). | T-R10 | read: abstract and full text | "1) bilateral paramedian thalamic with midbrain (43%), 2) bilateral paramedian thalamic without midbrain (38%), 3) bilateral paramedian thalamic with anterior thalamus and midbrain (14%), and 4) bilateral paramedian thalamic with anterior thalamus without midbrain (5%)." |
| T-C113 | A V-shaped FLAIR or DWI signal along the interpeduncular surface of the midbrain (the V sign) was seen in 67% of those with midbrain involvement. | T-R10 | read: abstract and full text | "A previously unreported finding (the 'V' sign) on FLAIR and DWI sequences was identified in 67% of cases of AOP infarction with midbrain involvement"; "V-shaped hyperintensity on axial FLAIR and/or DWI ... along the pial surface of the midbrain adjacent to the interpeduncular fossa". |
| T-C114 | The thalamic involvement is asymmetric in two-thirds; the clinical triad is altered consciousness, vertical gaze palsy and memory loss. | T-R13, T-R10 | read: full text | Nouh: "Asymmetric thalamic involvement is seen in two-thirds of cases and midbrain infarction is present in over half"; "Patients with bilateral paramedian thalamic lesions may develop altered sensorium, vertical gaze palsy, and memory impairment". Lazzaro: "typically characterized by a triad of altered mental status, vertical gaze palsy, and memory impairment". |
| T-C115 | Azygos ACA: one trunk supplies both medial frontal lobes (0.3% to 2% of people); its occlusion gives bifrontal infarcts. | T-R18 | read: full text | "The incidence in the population varies from 0.3 to 2%. The presence of occlusion for this vessel causes bifrontal infarcts"; "a single vessel which provides the blood supply to both anterior cerebral hemispheres." |
| T-C116 | A recent small subcortical infarct is an infarct in the territory of one perforating arteriole, under 20 mm across in the axial plane. | T-R21 | read: full text | "neuroimaging evidence of recent infarction in the territory of one perforating arteriole"; "a lesion that should be less than 20 mm in its maximum diameter in the axial plane". |
| T-C117 | A lacune is a round or ovoid, subcortical, fluid-filled cavity of 3 mm to about 15 mm, from an old small infarct or haemorrhage in the territory of one perforating arteriole. | T-R21 | read: full text | "A round or ovoid, subcortical, fluid-filled cavity (signal similar to CSF) of between 3 mm and about 15 mm in diameter, consistent with a previous acute small subcortical infarct or haemorrhage in the territory of one perforating arteriole." |
| T-C118 | Lacunar infarcts lie in the perforator territories (lenticulostriate, thalamoperforating, pontine): the basal ganglia, thalamus and pons. | T-R20 | read: full text | "Lacunar ischemic strokes are small infarcts (<15 mm) in the distal distribution territories of deep penetrating arteries (lenticulostriates, thalamoperforates, pontine perforators). They are usually randomly distributed in the basal ganglia, thalamus, and pons". |

### 5. Venous drainage

| ID | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C119 | Three networks drain the brain: superficial (cortical) veins, deep veins and posterior fossa veins, all into the dural sinuses and then the jugular veins. | T-R27 | read: full text | "The venous blood of the brain is drained by three networks of cerebral veins: the superficial veins (cortical), the deep veins, and the veins of the posterior fossa. These veins terminate in the dural venous sinuses, which are themselves collected by the jugular veins". |
| T-C120 | Superficial: the lateral and medial surfaces of the frontal, parietal and occipital lobes drain to the superior sagittal sinus; the perisylvian cortex to the superficial middle cerebral vein and cavernous sinus; the lateral and basal temporal and occipital lobes to the transverse sinus. | T-R22 | read: full text | Quoted at T-C13, T-C14, T-C23. |
| T-C121 | Three named anastomotic veins link them: the superficial middle cerebral vein, the vein of Trolard (to the superior sagittal sinus) and the vein of Labbé (over the inferolateral temporal lobe to the transverse sinus). Their sizes are reciprocal: when one is large another is often small. | T-R26 | read: full text | "The three main anastomotic superficial cortical veins include the superficial middle cerebral vein, the VT, and the VL. The VT receives drainage from the superficial middle cerebral vein and drains into the SSS, whereas the VL courses over the inferolateral temporal lobe and drains into the TS"; "vary greatly in size and have a reciprocal relationship such that the non-dominant third anastomotic vein is often aplastic or hypoplastic". |
| T-C122 | Deep: the basal ganglia, thalami, internal capsules and deep white matter drain through the internal cerebral veins and basal veins of Rosenthal to the vein of Galen, which joins the inferior sagittal sinus to form the straight sinus. | T-R26, T-R22, T-R27 | read: full text | Li, Fig 3: "The deep cerebral veins drain the basal ganglia, thalami, internal capsules, and third and lateral ventricles". Ota I: "Most deep veins drain into the internal cerebral vein (ICV), and some drain into the basal vein of Rosenthal (BVR), which head toward the great cerebral vein of Galen (VOG)." Sadik quoted at T-C31. |
| T-C123 | The superior sagittal sinus collects the superficial veins and the straight sinus the deep veins; both reach the torcular. | T-R27 | read: full text | "the torcular Herophili receives blood from the superficial veins through the superior sagittal sinus and blood from the deep veins through the straight sinus". |
| T-C124 | Posterior fossa: the veins end as bridging veins in three groups, galenic (to the vein of Galen), petrosal (to the petrosal sinuses) and tentorial (to the sinuses at the torcular). This is Rhoton's grouping. | T-R7, T-R24 | read: full text | Morales-Roccuzzo (posterior): "Posterior fossa veins terminate as bridging veins, which collect into three groups: a galenic group draining into the vein of Galen, a petrosal group into the petrosal sinuses, and a tentorial group into the tentorial sinuses, ultimately emptying into the transverse, straight, or superior petrosal sinus". de Miquel: "From a neurosurgical approach, Rothon (11) divides the posterior fossa veins into four groups ... In general, veins of the posterior fossa tend to terminate as bridging veins connecting the Galenic, petrosal, and tentorial confluents." (Ref 11 is T-R25.) |
| T-C125 | The galenic group drains the upper brainstem and the superior cerebellum; the petrosal group the anterior cerebellum and brainstem; the tentorial group the posterior cerebellum. | T-R24, T-R23 | read: full text | de Miquel: "Veins of the brainstem (mainly midbrain–pontine region) and superior aspects of the cerebellum drain to the Vein of Galen and straight sinus representing the superior group"; "Each petrosal vein drains not only the brainstem and the anterior aspect of the cerebellum"; posterior drainage "is represented by the cerebellar veins draining toward the torcular region". Ota II quoted at T-C54 to T-C56. |
| T-C126 | Venous infarcts cross arterial boundaries, are often bilateral and asymmetrical, and bleed in nearly two-thirds. | T-R27 | read: full text | "Parenchymal lesions ... differ significantly from those in arterial stroke because they cross arterial boundaries, have a hemorrhagic component in nearly two-thirds of cases"; "Ischemia and hemorrhage areas [4] cross arterial boundaries, readily bilateral and asymmetrical." |
| T-C127 | Venous oedema is mainly subcortical and periventricular white matter, with the cortex spared and grey–white differentiation kept. | T-R26 | read: full text | "CVI may cross arterial distributions on imaging and manifest as subcortical and periventricular white matter edema with cortical sparing"; "As opposed to AIS, gray-white differentiation is relatively preserved in CVI". |
| T-C128 | Superior sagittal sinus: frontal and parietal (parasagittal, often bilateral) lesions and haematomas. | T-R27, T-R28 | read: full text | Sadik: "Thrombosis of the superior sagittal sinus is often accompanied by frontal or parietal lobar hematomas"; "bilateral parasagittal hemispheric lesions of superior sagittal sinus thrombosis." Oliveira: "Hemorrhages in the frontal and parietal lobes are often associated with superior sagittal sinus CVT". |
| T-C129 | Small juxtacortical haemorrhages, with little oedema, are seen almost only with superior sagittal sinus thrombosis and are specific for it. | T-R26 | read: full text | "Juxtacortical hemorrhages are small hemorrhages with none to minimal surrounding edema seen almost exclusively in SSS occlusion and are specific for CVT". |
| T-C130 | Transverse sinus: temporal and occipital (temporo-occipital) lesions; in one series inferior temporal and cerebellar lesions. | T-R27, T-R28, T-R26 | read: full text | Sadik: "thrombosis of the lateral sinus is accompanied by temporal or occipital lesions"; "temporo-occipital lesions suggest transverse sinus thrombosis". Oliveira: "those in the temporal and occipital lobes are more characteristic of transverse sinus CVT". Li: "TS occlusion with inferior temporal and cerebellar parenchymal lesions". |
| T-C131 | Vein of Labbé: a temporal lesion on the same side, sometimes a dense or T1-bright vein beside it. | T-R27, T-R26 | read: full text | Sadik: "CT and MR reveal parenchymal temporal lesions ipsilateral to the thrombosis and a spontaneously hyperdense (CT) and hypersignal T1 (MRI) extra-axial band corresponding to the thrombosed vein of Labbé". Li: "posterior temporal and anterior parietal hemorrhage is associated with thrombosis in the VL". |
| T-C132 | Deep system (internal cerebral veins, vein of Galen, straight sinus): the thalami, often both, and sometimes the caudate and deep white matter. | T-R27, T-R28 | read: full text | Sadik: "Deep parenchymal abnormalities involving the thalami suggest thrombosis of the vein of Galen or the straight sinus"; "deep abnormalities involving the internal capsule or thalami favor a deep venous thrombosis". Oliveira: "Thalamic involvement is the imaging hallmark of this condition, and it may involve the caudate nucleus and deep white matter". |
| T-C133 | Both thalami: think of the artery of Percheron and of straight sinus thrombosis. A venous infarct does not keep to one thalamic arterial zone. | T-R27, T-R10 | read: full text | Sadik: "One of the differential diagnoses of straight sinus thrombosis is thrombosis of the artery of Percheron". Lazzaro: "Venous infarction and infiltrative neoplasm do not respect the specific arterial territory of the paramedian or anterior thalamic arterial zones but rather involve multiple arterial regions." |
| T-C134 | Veins vary far more than arteries: cerebral veins have no valves, flow can reverse, and the function of a vein differs from person to person. | T-R22, T-R26 | read: full text | Ota I: "there are basically no valves in cerebral veins, and the direction of blood flow in the skull is not constant. Therefore, the function of each intracranial vein varies among individuals"; "Compared to arteries, veins have large morphological variations among individuals". Li: drainage patterns "more variable than those of the cerebral arterial system". |
| T-C135 | The cortical veins are the most variable; the deep veins and sinuses are constant enough to identify. | T-R27 | read: full text | "Anatomical description is difficult due to the great variability of the cortical veins. However, the large deep veins and the dural sinuses can be easily identified." |

### 6. Dural venous sinus thrombosis

| ID | Claim (as on the page) | Ref | Verdict | Evidence |
|---|---|---|---|---|
| T-C136 | Imaging gives direct signs (the clot itself, bright or as a filling defect) and indirect signs (oedema, venous infarct, subarachnoid or parenchymal haemorrhage). | T-R27 | read: full text | "Direct signs include 'positive' visualization of the thrombus on nonenhanced CT and MRI and 'negative' visualization of the thrombotic material as a filling defect on CT venography and MR venography. Indirect signs refer to brain changes ... and include venous edema, venous infarction, subarachnoid hemorrhage, and parenchymal hemorrhage." |
| T-C137 | Diagnosis rests on MRI with MR venography or CT with CT venography. | T-R33 | read: abstract | "Its diagnosis is based primarily on magnetic resonance imaging/magnetic resonance venography or computed tomography/computed tomographic venography." |
| T-C138 | MR venography and CT venography are each a reliable alternative to catheter angiography (ESO, weak recommendations). | T-R34 | read: full text | "we suggest that MRV can be used as a reliable alternative to DSA for the confirmation of the diagnosis of CVT"; "we suggest that CT venography can be used as a reliable alternative to DSA for the diagnosis of CVT"; "Strength of recommendation: weak". |
| T-C139 | MRI is the most sensitive and specific test, and contrast-enhanced MR venography the most accurate MR technique. | T-R31 | read: abstract | "MRI is the most sensitive and specific technique for diagnosis of CVT ... Contrast material-enhanced MR venography has the highest accuracy compared with sequences without contrast enhancement." |
| T-C140 | Dense sinus and cord sign: fresh clot is hyperdense on plain CT; best in the first week (sensitivity 64%, specificity 97%), fading after it. | T-R27 | read: full text | "a fresh thrombus spontaneously hyperdense in a dural sinus or a cortical vein usually called the 'cord sign' ... or dense clot sign"; "The cord sign is best found in the first week of the disease, with estimated sensitivity of 64% and specificity of 97%. The spontaneous density of fresh blood gradually decreases after the first week." |
| T-C141 | Plain CT shows the clot directly in only about a third, and is normal in up to 30%; a normal CT does not exclude thrombosis. | T-R28, T-R27 | read: full text | Oliveira: "Direct signs of CVT are seen in only one third of cases and are rarely visible on unenhanced CT scans." Sadik: "results remain normal in 30% of cases"; "normal CT results do not rule out cerebral venous thrombosis". |
| T-C142 | Empty delta: after contrast, the sinus wall enhances round a non-enhancing clot; it must be seen on several sections, and is usually seen from about 5 days to 2 months. | T-R27, T-R28 | read: full text | Sadik: "the empty delta sign ..., which results in a filling defect (corresponding to the thrombus) of contrast enhancement within a dural sinus enhanced in the periphery"; "To be positive, the sign of the empty delta must be visualized on several sections. The empty delta sign is most often visible between 5 days and 2 months after the event." Oliveira: "a triangular area of contrast enhancement in the dural sinus surrounding the hypodense thrombus." |
| T-C143 | CT or MR venography shows the clot as a filling defect. | T-R27, T-R28 | read: full text | Sadik: "'negative' visualization of the thrombotic material as a filling defect on CT venography and MR venography". Oliveira: "direct visualization of the thrombus as a filling defect can be achieved with CT venography." |
| T-C144 | Loss of the normal flow void on T2 or FLAIR, though slow flow can do the same. | T-R28 | read: full text | "patent dural sinuses often appear as a flow void ... whereas CVT may manifest as the absence of a flow void, which is often best seen on T2/fluid-attenuated inversion recovery (FLAIR) images. However ... this finding is not specific for thrombosis and may be associated with transient hemodynamic conditions of slow flow". |
| T-C145 | Clot signal changes with age: under 5 days, T1 iso and T2 dark; 5 days to a month, bright on T1 and T2; older, iso to bright. | T-R27 | read: full text | Table 4: "Thrombus Less than 5 Days Old: T1 Isosignal, T2 Hypo/Isosignal; Thrombus from D5 to D30: T1 Hypersignal, T2 Iso/Hypersignal; Thrombus Older than 1 Month: T1 Iso/Hypersignal, T2 Iso/Hypersignal". (Li gives slightly different windows; see "Where the sources disagree".) |
| T-C146 | Acute clot blooms (dark) on SWI and T2* gradient echo, which also show thrombosed cortical veins well. | T-R26, T-R27 | read: full text | Li: "Susceptibility within thrombosed veins manifests as hypointense signal in a 'blooming' appearance on T2* gradient echo (GRE) sequences and susceptibility weighted imaging (SWI) in acute CVT with gradual resolution over time". Sadik, Table 1: "Axial T2* or SWI | Frank hyposignal. High sensitivity for cortical veins." |
| T-C147 | The clot can be bright on DWI even without a parenchymal lesion. | T-R28 | read: full text | "On diffusion-weighted imaging, an increased signal corresponding to the presence of intravascular clots may be depicted, even in the absence of parenchymal lesions." |
| T-C148 | Indirect signs are seen in 60% to 80%: bilateral infarcts or haematomas, bilateral thalamic oedema, temporo-occipital lesions, subarachnoid haemorrhage. | T-R27 | read: full text | "Indirect signs: These occur in 60% to 80% of cases. The most common indirect signs evocative of cerebral venous thrombosis are multiple bilateral ischemic lesions or hematomas ..., bilateral thalamic edema, and temporo-occipital lesions .... Subarachnoid hemorrhage ... or a herniation syndrome are also possibly seen." |
| T-C149 | Mimic: arachnoid granulations, round CSF-signal defects stuck to the sinus wall, commonest in the transverse (lateral part) and superior sagittal sinuses; they do not fill the whole sinus. | T-R27, T-R29, T-R28 | read: full text | Sadik: "They are most often seen in the transverse and superior sagittal sinuses"; "Arachnoid granulations typically have a signal like that of cerebrospinal fluid and appear as focal filling defects ... They are often rounded and adherent to the wall of the dural sinus." Pai: "especially along the lateral portion of the transverse sinuses (left predominance) followed by the superior sagittal sinus (SSS) ... always hyperintense on T2W images." Oliveira: "usually round and not occupying the entire sinus like CVT does." |
| T-C150 | Mimic: a hypoplastic or absent transverse sinus, usually the left, in about 20% to 39% of people; the groove, jugular foramen and jugular vein are small on the same side. | T-R27, T-R30, T-R28 | read: full text | Sadik: "With a hypoplastic lateral sinus, the groove of the lateral sinus, the jugular foramen, and the internal jugular vein are also hypoplastic on the same side, frequently with contralateral hypertrophy"; "the frequent hypoplasia of the left lateral sinus". Zedde 2025: "Unilateral hypoplasia or aplasia has been observed in approximately 20–39% of individuals". Oliveira: "If the corresponding jugular foramen is also small, a narrow sinus may be considered a normal anatomical variation". |
| T-C151 | Mimic: flow gaps on time-of-flight MR venography, seen in 31% of normal people, all in non-dominant or codominant transverse sinuses; contrast-enhanced venography settles it. | T-R29, T-R30 | read: full text | Pai: "Spins flowing slower than this limit ... get saturated, resulting in signal loss, also known as 'flow gap' ... common in hypoplastic dural sinuses. In a study by Ayanzen et al., it was noted that flow gaps were present in 31% of non-dominant transverse sinuses. In fact, they did not observe flow gaps in dominant transverse sinuses or in the rest of the dural venous system". Zedde 2025: "the use of CE-MRV (which is independent of flow dynamics), is crucial for confirming sinus patency." |
| T-C152 | Mimic: in-plane saturation, signal loss where a patent sinus runs in the plane of a time-of-flight acquisition. | T-R29 | read: full text | "If dural sinuses lie parallel ('in-plane') to the acquired sections, the spins get saturated and do not contribute signals. This phenomenon of signal loss, in an otherwise patent dural sinus, is known as 'in-plane saturation' and must be distinguished from DST." |
| T-C153 | Pitfall the other way: a subacute (T1-bright) clot can shine through on time-of-flight venography and look patent. | T-R29 | read: full text | "methemoglobin in subacute DST being T1 hyperintense contributes to an artifactual bright signal on TOF-MRV. Although this is usually not as bright as flow signals, it may still be misinterpreted as patency". |
| T-C154 | Mimic: dense sinuses from high haematocrit, polycythaemia or dehydration (and in newborns); the arteries look dense too. Diffuse brain oedema can make veins look relatively dense. | T-R27, T-R28 | read: full text | Sadik: "Differential diagnoses are excessive visibility of circulating blood in venous structures in dehydrated patients, polycythemias, and increased hematocrit." Oliveira: "In newborns ... and in situations such as dehydration and polycythemia, the sinuses and veins may appear relatively hyperdense on unenhanced CT, due to increased hematocrit levels. However, in such cases, the arteries will have a similar appearance"; "Parenchymal hypodensity caused by diffuse brain edema may also make the venous structures appear relatively hyperdense on CT." |
| T-C155 | Mimic: a false empty delta from an early split of the superior sagittal sinus, a high or asymmetric torcular, or a septum. | T-R27, T-R26 | read: full text | Sadik: "A false positive delta sign occurs when the superior sagittal sinus divides early. A split sinus or a septum within a sinus can also lead to a false positive diagnosis"; "A high or asymmetric bifurcation may resemble an intra-sinus thrombus and induce a false empty delta sign". Li: "An asymmetric or high bifurcation of the torcula herophili may mimic the empty delta sign". |
| T-C156 | Septa and fibrous bands in the sinus make thin, straight, sharp-edged defects. | T-R29 | read: full text | "septations produce thin linear filling defects with sharp, well-defined margins." |
| T-C157 | A chronic clot can enhance and look like a patent sinus. | T-R27 | read: full text | "In chronic thrombosis, these sequences can be misinterpreted because of the possible enhancement of the clot, which can then mimic a permeable sinus." |
| T-C158 | Mimic: a high-riding jugular bulb. | none | not stated | No read source names a high-riding jugular bulb as a mimic of sinus thrombosis. Zedde 2025 notes only that "some individuals exhibit dilation of the distal TS, sigmoid sinus, or superior jugular bulb", without calling it a mimic. See "Left out". |
| T-C159 | Knowing the normal venous anatomy and its variants is needed to avoid the pitfalls. | T-R32 | read: abstract | "it is important to have a detailed knowledge of the normal venous anatomy and variants, the spectrum of findings ..., and potential pitfalls in image interpretation." |

## Counts

159 claims: 132 read in full text (T-C112 and T-C113 were read in both abstract and full text and
are counted here), 10 read in abstract only (T-C71 to T-C73, T-C77, T-C103 to T-C105, T-C137,
T-C139, T-C159), 14 differs (T-C2, T-C8, T-C18, T-C24, T-C40, T-C42 to T-C46, T-C50, T-C53, T-C66,
T-C67) and 3 not stated (T-C12, T-C38, T-C158). Of the 70 map rows (T-C1 to T-C70), 54 are read,
14 differ and 2 are not stated.

## Where the sources disagree

- **Anterolateral pons** (T-C58). Nouh 2014 and Chandra 2017: short circumferential (circumflex)
  branches of the basilar. Zedde 2022: perforators from the AICA entering at the pontomedullary
  sulcus. The drawing keeps the basilar colour (two sources); the page text gives both.
- **Lateral pons** (T-C59). Nouh: AICA. Zedde: lateral pontine perforators from the basilar, AICA or
  SCA, the AICA mainly in the lower pons. The drawing uses the AICA; the caption names all three.
- **How much of the internal capsule the AChA supplies** (T-C27, T-C83). Chandra: "the posterior
  two-thirds of the internal capsule". Morales-Roccuzzo: "genu of the internal capsule, the
  inferior half of posterior limb of IC". Yu: "the posterior limb of the internal capsule". The
  drawing places it in the posterior limb (all three agree on that).
- **How much of the pallidum the lenticulostriates supply** (T-C26). Chandra: "the lateral
  pallidum" (the medial pallidum is AChA). Dogariu: "most of the globus pallidus". The page names
  the putamen and pallidum without a share.
- **Fetal PCA prevalence** (T-C109). Nouh 10–29%; Chandra 11–29%; Lambert 11–46%; Morales-Roccuzzo
  "An anatomic variant in 1/3 of hemispheres" and, for a fetal posterior communicating artery,
  "nearly 18% of cases". The page gives Nouh's range and says reports vary.
- **How common the artery of Percheron is** (T-C111). Lazzaro: the infarct pattern in 0.1% to 0.3%
  of ischaemic strokes in two large series and 4% to 18% of thalamic strokes. Rauch: a type IIb
  (Percheron) origin in 26% of 3D angiograms. The page does not give a prevalence.
- **Lacunar size** (T-C116 to T-C118). STRIVE: a lacune is 3 mm to about 15 mm; a recent small
  subcortical infarct is under 20 mm. Dogariu: lacunar infarcts "<15 mm". The page uses the STRIVE
  terms and sizes.
- **Vein of Labbé and transverse sinus territory** (T-C23, T-C41, T-C50, T-C131). Ota I (2024):
  "the lateral surface and the basal parts of the temporal and occipital lobes". Li (2021), Fig 3:
  "The TS and VL, if dominant, drain the posterior temporal and inferior parietal lobes". Li also
  ties Labbé thrombosis to "posterior temporal and anterior parietal hemorrhage"; Sadik to
  "temporal lesions". The drawing follows Ota, the most recent open review (spec: "if they
  disagree, the drawing follows the most recent open review"); the text says the territory varies.
- **The orbital frontal lobe** (T-C39). Ota I: the orbital surface drains to the superior sagittal
  sinus. Li: "The CS drains venous blood from the orbits and the inferior frontal and parietal
  lobes." The drawing follows Ota.
- **The insula** (T-C24). Ota I gives the insular veins to the deep middle cerebral vein and basal
  vein (in its embryology section); Li's map gives the perisylvian region to the sphenoparietal and
  cavernous sinuses. The drawing labels the lateral sector "perisylvian cortex" (both agree) and
  does not name the insula.
- **Where the posterior (tentorial) group ends** (T-C55, T-C124). Morales-Roccuzzo: sinuses
  "converging on the torcula". Ota II: "The veins of the posterior group drain into the straight
  sinus either directly or indirectly through the tentorial venous plexuses"; its Fig 5 gives the
  hemispheric veins to the torcular or transverse sinus. de Miquel: the torcula, the straight
  sinus and the lateral sinuses. The page says "the transverse sinus, torcular or straight sinus".
- **Clot signal by age** (T-C145). Sadik: under 5 days T1 iso, T2 hypo/iso; 5 to 30 days T1 and T2
  bright; over a month iso/bright. Li: acute (days 1–5) T1 iso, T2 strongly dark; subacute
  (days 6–15) bright on T1, T2 and FLAIR; chronic (from 2–3 weeks) T1 iso, T2 iso to bright. The
  page uses Sadik's table and says the windows are approximate.
- **Cord sign and normal CT** (T-C140, T-C141). Sadik: sensitivity 64%; CT normal in 30%. Li:
  "sensitivity ranging 25–64%"; "normal in up to 25–30%". The page gives Sadik's figures with the
  range.
- **How often the parenchyma is abnormal**. Sadik says both "Parenchymal lesions occur in 60% of
  patients" and "Parenchymal abnormalities are found in only 40%", and separately "Indirect signs
  ... occur in 60% to 80%". The page gives only the 60–80% indirect-sign figure (T-C148), with its
  sentence.

## Left out for want of a source that states it

- **High-riding jugular bulb as a mimic of sinus thrombosis** (T-C158). The spec lists it; no read
  source states it (Canedo-Antelo and Leach may, but only their abstracts are reachable). **For the
  author**: drop it from the mimic list, or supply a paper that states it.
- **Lenticulostriate supply of the corona radiata** (T-C12): not stated. Task 2 should drop the inner
  lenticulostriate ring at the corona radiata level.
- **The midbrain filler sector "Medial frontal behind the gyrus rectus: MCA and ACA"** (T-C38): not
  stated. Task 2 should widen its neighbours and drop it.
- **The medial temporal lobe as a whole draining to the basal vein** (T-C40): only the uncus (uncal
  vein) is stated.
- **Tatu's level-by-level assignments.** Tatu 1996 and 1998 were read in abstract only. The map's
  assignments are taken from Zedde 2022, Nouh 2014, Rauch 2024, Chandra 2017 and the other open
  reviews (several of which cite Tatu). The caption can name Tatu as the origin of the
  section-by-section method (T-C71, T-C72) but should credit the reviews for what is drawn, e.g.
  "Territories after Tatu et al. 1996 and 1998, as described in the open reviews cited below."
  **For the author**: the spec says the caption "names Tatu as the source of the arterial maps";
  that wording cannot be checked against Tatu's full text.
- **Rhoton 2000** (T-R25): not read. The galenic, petrosal and tentorial grouping is credited to
  Rhoton through de Miquel and Morales-Roccuzzo (T-C124).
- **The SCA's share of the dorsal midbrain** (T-C46): stated only in general (Zedde, Błaszczyk), not
  per territory; the drawing follows Rauch's upper-midbrain figure.
- **Infarct appearance on imaging for each named territory one by one** (e.g. an MCA superior
  division infarct on CT): the read sources give the general arterial pattern (T-C89) and the
  clinical picture per territory, not a radiological description per territory. The scans (Task 5)
  will show them.
- **Clinical management** (anticoagulation, thrombolysis, endovascular treatment): out of scope by
  the spec; AHA and ESO text on it was not used.

## Appendix: Figure leads for the scans

CC BY figures seen in the open reviews, for Task 5. Licence is the article licence stated in the
PMC XML; none of these figures carries its own permission statement. No image was downloaded.
Lazzaro 2010 (publisher copyright) and Pai 2020 (CC BY-NC-SA) are excluded by the scan rules, as are
Chandra 2017 (CC BY-NC-SA), Yu 2018 (CC BY-NC) and Ota 2024 (CC BY-NC).

| Target | PMCID | Figure | What it shows | Licence |
|---|---|---|---|---|
| PCA territory infarct | PMC3985033 (Nouh 2014) | Fig 3C | Non-contrast CT, left PCA territory infarction | CC BY |
| Lateral medullary (PICA) infarct | PMC3985033 | Fig 3A | FLAIR, right lateral medullary infarction | CC BY |
| Ventral (paramedian) pontine infarct | PMC3985033 | Fig 4A | DWI, right ventral pontine infarction | CC BY |
| Dorsal medullary infarct | PMC3985033 | Fig 4B | DWI, small dorsal left medullary infarction | CC BY |
| PICA cerebellar infarct | PMC3985033 | Fig 4D,E,F | DWI, right cerebellar hemispheric and vermian infarction; T2 with oedema and mass effect | CC BY |
| Bilateral medial medullary infarct (heart sign) | PMC9740674 (Zedde 2022) | Fig 4 | FLAIR, DWI, ADC rows | CC BY 4.0 |
| Bilateral paramedian pontine infarct (heart sign) | PMC9740674 | Fig 7 | FLAIR, DWI, ADC rows | CC BY 4.0 |
| Brainstem territory drawing (reference only) | PMC9740674 | Fig 1 | Territories on axial T1 at medulla, pons, midbrain | CC BY 4.0 |
| Midbrain lateral territories (reference only) | PMC11339114 (Rauch 2024) | Fig 7 | Drawing, upper midbrain groups | CC BY 4.0 |
| External (cortical) border zone infarcts | PMC10478671 (Dogariu 2023) | Fig 2 | DWI and FLAIR, MCA/ACA and MCA/PCA border zones | CC BY 3.0 |
| Internal border zone, confluent | PMC10478671 | Fig 3 | Axial DWI, confluent deep watershed infarct | CC BY 3.0 |
| Internal border zone, string of pearls | PMC10478671 | Fig 5 | FLAIR, band parallel to the lateral ventricle | CC BY 3.0 |
| Deep and superficial border zones | PMC10478671 | Fig 4 | DWI, both border zones of the right ICA | CC BY 3.0 |
| Bilateral ACA infarct (azygos ACA) | PMC5337377 (de Sousa 2017) | Fig 1 | Axial CT, bilateral ACA territory infarct | CC BY 4.0 |
| Fetal PCA, MCA + PCA infarct | PMC5024744 (Lambert 2016) | Fig 1 | DWI/ADC, right MCA and PCA infarcts; MRA | CC BY 3.0 |
| Fetal PCA, ACA + MCA + PCA infarct | PMC5024744 | Fig 2 | DWI/ADC, left ACA, MCA and PCA infarcts | CC BY 3.0 |
| Artery of Percheron infarct | PMC6689919 (Kichloo 2019) | Figs 2, 3 | DWI and T2/FLAIR, bilateral paramedian thalami | CC BY 4.0 |
| Artery of Percheron infarct | PMC10776326 (Li J 2023) | Figs 1, 3 | DWI, paramedian thalamus with and without midbrain | CC BY 4.0 |
| Artery of Percheron infarct with midbrain | PMC10632557 (Achhami 2023) | Fig 2 | T2/FLAIR, bilateral thalami and midbrain | CC BY 4.0 |
| Dense sinus (cord sign), CT | PMC9410175 (Sadik 2022) | Fig 15 | Plain CT, hyperdense clot at the right transverse–sigmoid junction | CC BY 4.0 |
| Dense SSS and empty delta, CT | PMC9410175 | Fig 17 | Plain CT dense SSS; contrast CT empty delta | CC BY 4.0 |
| Cord sign (cortical vein), CT | PMC8864687 (Oliveira 2022) | Fig 2 | Coronal plain CT, hyperdense cortical vein | CC BY 4.0 |
| Clot on T1 / T2* | PMC9410175 | Fig 9 | T1-bright SSS; T2*-dark cortical veins | CC BY 4.0 |
| Clot signals in one sinus | PMC9410175 | Fig 10 | Right lateral sinus on T1, T2*, FLAIR, DWI | CC BY 4.0 |
| Empty delta, MRI | PMC9410175 | Fig 11 | Contrast 3D T1 GRE, empty delta in lateral sinus and SSS | CC BY 4.0 |
| Empty delta, MRI, with frontal and parietal haemorrhage | PMC8864687 | Fig 5 | Contrast MPRAGE empty delta in SSS; SWI haemorrhages | CC BY 4.0 |
| Filling defect, CE-MRV | PMC9410175 | Fig 12 | MIP and source images, defect in right lateral sinus | CC BY 4.0 |
| Filling defect, CT venography | PMC8864687 | Fig 9 | Coronal CTA, defect in the transverse sinus (with mastoiditis) | CC BY 4.0 |
| Cortical vein thrombus, T1 | PMC8864687 | Fig 12 | Coronal T1, hyperintense cortical vein | CC BY 4.0 |
| Clot on DWI | PMC8864687 | Fig 3 | DWI, bright cortical veins | CC BY 4.0 |
| Venous infarct, transverse sinus (temporal) | PMC8864687 | Fig 4 | MRA lack of flow in right TS; FLAIR posterior temporal oedema | CC BY 4.0 |
| Venous infarct, transverse sinus and Labbé | PMC10365275 (Li 2021) | Fig 7 | CT dense TS; left temporal lesion on CT and MRI | CC BY |
| Venous haemorrhage, Labbé | PMC10365275 | Fig 10 | CT left temporal haemorrhage; Labbé filling defect | CC BY |
| Parasagittal haemorrhage, SSS | PMC10365275 | Fig 6 | CT bilateral frontal parasagittal haemorrhage; CTV defect | CC BY |
| Venous haemorrhage, CT | PMC9410175 | Fig 16 | CT, left frontopolar venous haemorrhagic infarct | CC BY 4.0 |
| Deep venous thrombosis, thalami | PMC10365275 | Fig 8 | CT dense ICVs, bilateral basal ganglia and thalamic oedema | CC BY |
| Deep venous thrombosis, caudate and thalamus | PMC8864687 | Fig 7 | MRV no flow in ICVs; SWI haemorrhagic caudate and thalamus | CC BY 4.0 |
| Straight sinus thrombosis, thalamus | PMC9410175 | Figs 19, 20, 21 | Dense straight sinus; SWI deep veins; right thalamic lesion | CC BY 4.0 |
| Venous territory drawing (reference only) | PMC10365275 | Fig 3 | Drainage territories on T1 at four levels | CC BY |
| Mimic: arachnoid granulations | PMC9410175 | Fig 23 | Contrast T1 and CE-MRV, round granulation in left lateral sinus | CC BY 4.0 |
| Mimic: arachnoid granulation with septum (SSS) | PMC11767902 (Zedde 2025) | Figs 3, 4 | 3D FLAIR and contrast T1, double channel and granulation | CC BY 4.0 |
| Mimic: hypoplastic transverse sinus | PMC9410175 | Fig 22 | Phase contrast, no filling of a hypoplastic left lateral sinus | CC BY 4.0 |
| Mimic: flow gap on TOF | PMC11767902 | Fig 9 | TOF-MRV signal loss vs CE-MRV patent transverse sinus | CC BY 4.0 |
| Mimic: septations | PMC11767902 | Figs 1, 2 | Transverse sinus septa on MRI and PC-MRV | CC BY 4.0 |
| Mimic: phase-contrast signal drop | PMC11767902 | Figs 7, 8 | PC-MRV signal drop in the SSS not confirmed on CE-MRV | CC BY 4.0 |

Gaps (no CC BY scan seen in the open reviews): an isolated ACA, MCA superior or inferior division,
AChA, Heubner or thalamogeniculate infarct; a high-haematocrit dense sinus; a high-riding jugular
bulb.
