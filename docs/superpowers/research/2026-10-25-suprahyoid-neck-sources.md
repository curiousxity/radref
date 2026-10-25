# Suprahyoid neck CT and MRI: sources and claims

Date: 2026-10-25 · Branch: `claude/sleepy-dijkstra-4w0dpd`

The author chose (2026-10-25): one study for the suprahyoid neck covering CT or MRI for a mass
and CT for infection, with no calculator.

## Status: nothing here is verified yet

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. Every reference is **from memory** and every claim is **to check**. The
site code marks this state: no `doi` on the references, plain-text citations, and a source
note starting "Unchecked draft", pinned by `src/studies/SuprahyoidNeckStudy.test.ts`.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or open full text. A claim marked **no** loses its rule, keeps a descriptive field,
and goes to the author in an "Omitted claims for the author" section; it is not quietly
reworded. Then add the DOIs, switch to `<Cite doi>`, reword the source note and update the
tests that pin the unchecked state.

## References

| # | Citation (from memory) | Used for |
|---|---|---|
| N-R1 | Harnsberger HR, Osborn AG. Differential diagnosis of head and neck lesions based on their space of origin. 1. The suprahyoid part of the neck. AJR Am J Roentgenol. 1991;157(1):147-154. | Spaces, fat shift, usual lesions |
| N-R2 | Shin JH, Lee HK, Kim SY, et al. Imaging of parapharyngeal space lesions: focus on the prestyloid compartment. AJR Am J Roentgenol. 2001;177(6):1465-1470. | Deep-lobe parotid against true parapharyngeal mass |
| N-R3 | Rao AB, Koeller KK, Adair CF. From the archives of the AFIP. Paragangliomas of the head and neck: radiologic-pathologic correlation. RadioGraphics. 1999;19(6):1605-1632. | Carotid body tumour splaying the bifurcation |
| N-R4 | Olsen WL, Dillon WP, Kelly WM, Norman D, Brant-Zawadzki M, Newton TH. MR imaging of paragangliomas. AJR Am J Roentgenol. 1987;148(1):201-204. | Salt-and-pepper flow voids |
| N-R5 | Hoang JK, Branstetter BF 4th, Eastwood JD, Glastonbury CM. Multiplanar CT and MRI of collections in the retropharyngeal space: is it an abscess? AJR Am J Roentgenol. 2011;196(4):W426-W432. | Retropharyngeal edema against abscess |
| N-R6 | Freling N, Roele E, Schaefer-Prokop C, Fokkens W. Prediction of deep neck abscesses by contrast-enhanced computerized tomography in 76 clinically suspect consecutive patients. Laryngoscope. 2009;119(9):1745-1752. | A rim does not prove pus |
| N-R7 | Schuknecht B, Stergiou G, Graetz K. Masticator space abscess derived from odontogenic infection: imaging manifestation and pathways of extension depicted by CT and MR in 30 patients. Eur Radiol. 2008;18(9):1972-1979. | Odontogenic masticator abscess spreading upwards |
| N-R8 | Mardini S, Gohel A. Imaging of odontogenic infections. Radiol Clin North Am. 2018;56(1):31-44. The least certain reference here: check authors, title and pages. | The mylohyoid line |
| N-R9 | Lemierre A. On certain septicaemias due to anaerobic organisms. Lancet. 1936;227(5874):701-703. | Jugular vein thrombophlebitis after oropharyngeal infection |
| N-R10 | Estrera AS, Landay MJ, Grisham JM, Sinn DP, Platt MR. Descending necrotizing mediastinitis. Surg Gynecol Obstet. 1983;157(6):545-552. | Spread to the mediastinum |
| N-R11 | Ginsberg LE. Imaging of perineural tumor spread in head and neck cancer. Semin Ultrasound CT MR. 1999;20(3):175-186. Check the title and pages. | Perineural spread |
| N-R12 | Russo CP, Smoker WR, Weissman JL. MR appearance of trigeminal and hypoglossal motor denervation. AJNR Am J Neuroradiol. 1997;18(7):1375-1383. | Denervation of the masticator muscles |
| N-R13 | van den Brekel MW, Stel HV, Castelijns JA, et al. Cervical lymph node metastasis: assessment of radiologic criteria. Radiology. 1990;177(2):379-384. | Node size |
| N-R14 | Som PM. Detection of metastasis in cervical lymph nodes: CT and MR criteria and differential diagnosis. AJR Am J Roentgenol. 1992;158(5):961-969. | Nodal necrosis |

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| N2-1 | The suprahyoid neck is divided into spaces by the layers of the deep cervical fascia, and the space a mass starts in narrows its differential (N-R1). | text only | to check |
| N2-2 | The parapharyngeal fat is pushed by a mass from each neighbour in a set direction: pharyngeal mucosal space laterally, masticator space posteriorly (posteromedially), deep lobe of the parotid medially (anteromedially), carotid space anteriorly, retropharyngeal space anterolaterally. A mass with fat all round it starts in the parapharyngeal space itself (N-R1). | chip naming the space; warning when the space entered differs | to check |
| N2-3 | A perivertebral mass lifts the prevertebral muscles forward, while a retropharyngeal mass lies in front of them (N-R1). | chip | to check |
| N2-4 | The usual lesions of each space: pharyngeal mucosal (squamous cell carcinoma, lymphoma, minor salivary gland tumour, retention cyst), parapharyngeal (pleomorphic adenoma from a minor salivary rest, lipoma, atypical second branchial cleft cyst), masticator (odontogenic infection, sarcoma, perineural spread along V3, benign masticator muscle hypertrophy), parotid (pleomorphic adenoma, Warthin tumour, mucoepidermoid carcinoma, intraparotid nodes), carotid (paraganglioma, schwannoma, nodal metastasis, jugular vein thrombosis), retropharyngeal (nodal metastasis, lymphoma, suppurative node and abscess, edema), perivertebral (vertebral infection or tumour) (N-R1). | chip for the space entered | to check |
| N2-5 | A deep-lobe parotid tumour widens the stylomandibular tunnel and has no fat plane between it and the parotid; a true prestyloid parapharyngeal mass has fat around it (N-R2). | chips | to check |
| N2-6 | A carotid space mass pushes the internal carotid artery forward (N-R1). | chip | to check |
| N2-7 | A carotid body paraganglioma splays the internal and external carotid arteries (N-R3). | chip | to check |
| N2-8 | Flow voids in a paraganglioma give a salt-and-pepper look on MRI (N-R4). Does Olsen tie it to tumours over 2 cm? | chip on MRI | to check |
| N2-9 | Retropharyngeal edema fills the space from side to side with no enhancing wall and no mass effect; an abscess has an enhancing wall and mass effect (N-R5). | chip; warning with a rim-enhancing collection | to check |
| N2-10 | On contrast CT, a rim-enhancing collection did not always hold pus at surgery (N-R6). Check the figures. | chip | to check |
| N2-11 | Odontogenic masticator space abscesses spread upwards, above the zygomatic arch into the temporal fossa (N-R7). | chip | to check |
| N2-12 | The roots of the second and third molars lie below the mylohyoid line, so their infections reach the submandibular space; those of the premolars and first molar lie above it and reach the sublingual space (N-R8). | chip | to check |
| N3-1 | Thrombophlebitis of the internal jugular vein after an oropharyngeal infection is Lemierre syndrome (N-R9). | chip with a tonsil or pharynx source | to check |
| N3-2 | Deep neck infection can descend into the mediastinum: descending necrotizing mediastinitis (N-R10). | chip | to check |
| N3-3 | Perineural tumour spread follows a nerve towards its foramen and the skull base; masticator space tumours spread along V3 through the foramen ovale (N-R11). | chip | to check |
| N3-4 | Acute and subacute denervation makes muscle bright on T2 and enhancing, which can mimic tumour; chronic denervation gives fatty atrophy. Masticator muscle denervation points to V3 (N-R12). | chip | to check |
| N4-1 | The best size criterion was a minimal axial diameter of 11 mm in level II and 10 mm elsewhere (N-R13). Is it "11 mm or more"? Is level II "subdigastric" only? | chip at the figure | to check |
| N4-2 | Central necrosis is the most reliable CT and MR sign of a metastatic node, whatever its size (N-R14). | chip with a mass history | to check |

Not sourced, and labelled as the site's own on the page: the order of the steps, the protocol
checklists for CT and MRI, the notes on what CT and MRI each show best, the source, gas and
airway fields, and the order of the impression (airway first).
