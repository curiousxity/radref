# Spine CT for pain or injury: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

The author chose (2026-10-23): spine CT, a "pain or injury" history, and AO Spine as the
calculator (not SLIC or TLICS). The AO Spine wording is claimed in
`2026-10-23-spine-calculators-sources.md` (AO claims); this file holds the study's own.

## Status: nothing here is verified yet

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. Every reference is **from memory** and every claim is **to check**. The
site code marks this state: no `doi` on the references, plain-text citations, and a source
note starting "Unchecked draft", pinned by `src/studies/SpineTraumaCtStudy.test.ts`.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or open full text. A claim marked **no** loses its rule, keeps a descriptive field,
and goes to the author in an "Omitted claims for the author" section; it is not quietly
reworded. Then add the DOIs, switch to `<Cite doi>`, reword the source note and update the
tests that pin the unchecked state.

The 3D cervical spine viewer lists PMIDs for some of the same papers (Anderson 1974: PMID
4434035; Spence 1970: PMID 5425648; Dickman 1996: PMID 8747950, DOI
10.1097/00006123-199601000-00012). Use them as a starting point, not as proof.

## References

| # | Citation (from memory) | Used for |
|---|---|---|
| T-R1 | Vaccaro AR, Oner C, Kepler CK, et al. AOSpine thoracolumbar spine injury classification system. Spine (Phila Pa 1976). 2013;38(23):2028-2037. | AO Spine thoracolumbar (AO claims) |
| T-R2 | Vaccaro AR, Koerner JD, Radcliff KE, et al. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184. | AO Spine subaxial (AO claims) |
| T-R3 | Rojas CA, Bertozzi JC, Martinez CR, Whitlow J. Reassessment of the craniocervical junction: normal values on CT. AJNR Am J Neuroradiol. 2007;28(9):1819-1823. | BDI, ADI |
| T-R4 | Spence KF Jr, Decker S, Sell KW. Bursting atlantal fracture associated with rupture of the transverse ligament. J Bone Joint Surg Am. 1970;52(3):543-549. | Lateral mass overhang |
| T-R5 | Dickman CA, Greene KA, Sonntag VK. Injuries involving the transverse atlantal ligament: classification and treatment guidelines based upon experience with 39 injuries. Neurosurgery. 1996;38(1):44-50. | MRI shows ligament injury the rule misses |
| T-R6 | Anderson LD, D'Alonzo RT. Fractures of the odontoid process of the axis. J Bone Joint Surg Am. 1974;56(8):1663-1674. | Odontoid types |
| T-R7 | Burlew CC, Biffl WL, Moore EE, Barnett CC, Johnson JL, Bensard DD. Blunt cerebrovascular injuries: redefining screening criteria in the era of noninvasive diagnosis. J Trauma Acute Care Surg. 2012;72(2):330-335. | Expanded Denver criteria |
| T-R8 | Laredo JD, Lakhdar F, Bellaïche L, Hamze B, Champsaur P, Morvan G. Acute vertebral collapse: CT findings in benign and malignant nontraumatic cases. Radiology. 1995;194(1):41-48. | Benign against malignant collapse |
| T-R9 | Genant HK, Wu CY, van Kuijk C, Nevitt MC. Vertebral fracture assessment using a semiquantitative technique. J Bone Miner Res. 1993;8(9):1137-1148. | Genant grades |
| T-R10 | Westerveld LA, Verlaan JJ, Oner FC. Spinal fractures in patients with ankylosing spinal disorders: a systematic review of the literature on treatment, neurological status and complications. Eur Spine J. 2009;18(2):145-156. | Ankylosed spine |

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| T1-1 | Fractures in ankylosing spinal disorders often follow minor trauma, are most common in the cervical spine, and often come with a neurological deficit (T-R10). | Ankylosed spine chip, with the AO modifier (M3 neck, M2 thoracolumbar, AO-10) | to check |
| T2-1 | On CT in adults, the basion–dens interval was at most 8.5 mm and the atlantodental interval at most 2 mm (T-R3). Check: are these 95th percentiles or maxima, and is the ADI figure 2 mm? | > 8.5 and > 2 → warn chip and impression line; at the value → within | to check |
| T2-2 | A combined C1 lateral mass overhang over C2 of more than 6.9 mm suggested transverse ligament rupture, on open-mouth radiographs (T-R4). | > 6.9 → warn chip and impression clause | to check |
| T2-3 | The overhang rule can miss transverse ligament injuries that MRI shows directly (T-R5). | ≤ 6.9 → neutral chip saying so | to check |
| T2-4 | Odontoid fractures: type I through the tip, type II through the base of the dens, type III into the body of C2 (T-R6). | — | to check |
| T5-1 | The expanded Denver screening criteria for blunt cerebrovascular injury include cervical spine fractures with subluxation, fractures extending into a foramen transversarium, and fractures of C1 to C3 (T-R7). The form counts a C1 fracture, an odontoid or other C2 fracture, a foramen fracture, a subaxial type C or an F4 facet. It cannot see a C3 fracture from the subaxial level text, so a C3 injury does not trigger the chip: check whether that matters. | chip and impression line | to check |
| T6-1 | Genant grades: 1 about 20–25%, 2 about 25–40%, 3 more than 40% height loss (T-R9). The boundaries (25% → grade 1, 40% → grade 2, under 20% → no grade) are the site's reading of "about". | Genant chip and impression clause | to check |
| T6-2 | Benign collapse: fracture lines in cancellous bone without destruction, retropulsed posterior wall fragment. Malignant collapse: destruction of the anterolateral or posterior cortex, of cancellous bone, of a pedicle; an epidural or focal paraspinal mass (T-R8). | any malignant feature → malignant chip; else any benign → benign chip | to check |

Not sourced, and labelled as the site's own on the page: the order of the steps, the protocol
checklist, the pointers from the history (high-energy: every level; low-energy fall in an
older patient: craniocervical junction and C2; pain alone: bone quality and collapse), and the
note that CT does not show the cord, discs or ligaments well.
