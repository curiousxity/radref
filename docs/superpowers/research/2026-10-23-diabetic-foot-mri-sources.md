# Diabetic foot MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

The author chose (2026-10-23) to give the diabetic foot its own study rather than a step in
the foot MRI study, whose history is "pain or injury". History here: diabetes with an ulcer,
a hot swollen foot, or a known Charcot foot with a question of infection. No calculator.

## Status: nothing here is verified yet

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. Every reference is **from memory** and every claim is **to check**. The
site code marks this state: no `doi` on the references, plain-text citations, and a source
note starting "Unchecked draft", pinned by `src/studies/DiabeticFootMriStudy.test.ts`.

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
| D1 | Morrison WB, Schweitzer ME, Batte WG, Radack DP, Russel KM. Osteomyelitis of the foot: relative importance of primary and secondary MR imaging signs. Radiology. 1998;207(3):625-632. | Secondary signs |
| D2 | Ledermann HP, Morrison WB, Schweitzer ME. MR image analysis of pedal osteomyelitis: distribution, patterns of spread, and frequency of associated ulceration and septic arthritis. Radiology. 2002;223(3):747-755. | Spread from ulcer, pressure-point sites, septic arthritis |
| D3 | Johnson PW, Collins MS, Wenger DE. Diagnostic utility of T1-weighted MRI characteristics in evaluation of osteomyelitis of the foot. AJR Am J Roentgenol. 2009;192(1):96-100. | Confluent T1 pattern |
| D4 | Donovan A, Schweitzer ME. Use of MR imaging in diagnosing diabetes-related pedal osteomyelitis. Radiographics. 2010;30(3):723-736. | Ghost sign, abscess, sinus tract |
| D5 | Ledermann HP, Morrison WB. Differential diagnosis of pedal osteomyelitis and diabetic neuroarthropathy: MR imaging. Semin Musculoskelet Radiol. 2005;9(3):272-283. | Distribution of neuroarthropathy against osteomyelitis |
| D6 | Ledermann HP, Schweitzer ME, Morrison WB. Nonenhancing tissue on MR imaging of pedal infection: characterization of necrotic tissue and associated limitations for diagnosis of osteomyelitis and abscess. AJR Am J Roentgenol. 2002;178(1):215-222. | Non-enhancing (dead) tissue |
| D7 | Chantelau E. The perils of procrastination: effects of early vs. delayed detection and treatment of incipient Charcot fracture. Diabet Med. 2005;22(12):1707-1712. | Active Charcot on MRI before radiographs |

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| D1-1 | An adjacent ulcer, a sinus tract, cortical interruption and a soft-tissue abscess are secondary signs that add to the marrow signal. | "Secondary signs" chip lists them | to check |
| D2-1 | Osteomyelitis in the diabetic foot almost always spreads from an adjacent ulcer or sinus tract. | Osteomyelitis only when the bone touches the ulcer or sinus tract; otherwise "think again" chip; warning when contiguity is entered with no ulcer or sinus tract | to check |
| D2-2 | The usual sites are the pressure points: toes, metatarsal heads, calcaneus. | — | to check |
| D2-3 | Septic arthritis often comes with osteomyelitis. | Effusion next to abnormal bone → "septic arthritis is possible" | to check |
| D3-1 | Confluent medullary low signal on T1 is the pattern of osteomyelitis; hazy or reticulated low signal is not, even with high fluid-sensitive signal. | T1 chip; impression wording | to check |
| D4-1 | An abscess is a rim-enhancing collection after contrast; look for sinus tracts and soft-tissue gas. | — | to check |
| D4-2 | Ghost sign: a bone outline that fades on T1 and reappears on fluid-sensitive or contrast images suggests infection within neuroarthropathy; a neuropathic bone keeps its outline. | Ghost sign chip and impression line | to check |
| D5-1 | Neuroarthropathy is periarticular, affects several joints, and is most often midfoot (tarsometatarsal, naviculocuneiform and Chopart), away from the pressure points. | Midfoot distribution chip | to check |
| D6-1 | Non-enhancing tissue is devitalised; osteomyelitis and abscess within it may not enhance. | Impression wording | to check |
| D7-1 | MRI shows active Charcot disease (marrow edema) while radiographs are still normal, when treatment can still prevent collapse. | Activity chip | to check |

Not sourced, and labelled as the site's own on the page: the order of the steps, the protocol
checklist (T1 without fat suppression in two planes, fat-suppressed PD or T2).
