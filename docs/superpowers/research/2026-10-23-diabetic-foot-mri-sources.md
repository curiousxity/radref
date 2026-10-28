# Diabetic foot MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

The author chose (2026-10-23) to give the diabetic foot its own study rather than a step in
the foot MRI study, whose history is "pain or injury". History here: diabetes with an ulcer,
a hot swollen foot, or a known Charcot foot with a question of infection. No calculator.

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esearch`/`esummary`), its DOI resolved on
Crossref, and a claim marked verified only when its wording was read in the PubMed abstract
(`efetch`) or in open full text. None of the seven has open full text: PubMed lists no PMC
copy and Europe PMC lists no open copy (Unpaywall refused the placeholder address, so it gave
no answer). The RSNA and AJR publisher pages return 403. Every claim was read against the
abstract only.

The author's standing choice (2026-10-23): claims that cannot be verified (paywalled) stay as
they are, marked unchecked, with the page's "Unchecked draft" note. Nothing was found WRONG;
two points went to the author (D3-1 and D5-1, below).

The author decided (2026-10-23): add the DOIs and `<Cite doi>` links now, keep the unverified
claims with the "Unchecked draft" note, and rewrite every claim flagged for the author to the
paper's own wording, changing a rule where the paper's differs. Applied the same day:

- D3-1: the lesson, teach line, T1 option and quiz now say "hazy reticulated" (one pattern) and
  quote Johnson: a confluent pattern of decreased T1 signal in a medullary distribution
  "correlate[s] highly" with osteomyelitis, and no case with a hazy reticulated pattern had
  it. Dropped "even when the fluid-sensitive images are bright" and the unsourced sentence
  "Marrow edema on fluid-sensitive images alone does not establish osteomyelitis". The chips
  are unchanged.
- D5-1: now Donovan's wording, cited to D4: "Neuroarthropathy most commonly affects the
  tarsometatarsal and metatarsophalangeal joints, whereas osteomyelitis occurs distal to the
  tarsometatarsal joint, in the calcaneus and in the malleoli." D5 keeps only what its abstract
  says (the distinction "requires careful analysis of the location ..., distribution, and
  pattern"). Dropped "several joints", "midfoot" and "away from the pressure points", which
  no listed abstract states. Rule: the Distribution chip now fires on the tarsometatarsal or
  metatarsophalangeal joints ("Tarsometatarsal or metatarsophalangeal: the commonest Charcot
  sites"), no longer on Chopart; the "Forefoot (MTP and interphalangeal)" option is split into
  "Metatarsophalangeal" and "Interphalangeal" so the chip can tell them apart. The quiz
  question now asks which site neuroarthropathy most commonly affects (answer: the
  tarsometatarsal joints).
- D4 journal styled "RadioGraphics".

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| D1 | Morrison WB, Schweitzer ME, Batte WG, Radack DP, Russel KM. Osteomyelitis of the foot: relative importance of primary and secondary MR imaging signs. Radiology. 1998;207(3):625-632. | 9609883 | 10.1148/radiology.207.3.9609883 | Abstract |
| D2 | Ledermann HP, Morrison WB, Schweitzer ME. MR image analysis of pedal osteomyelitis: distribution, patterns of spread, and frequency of associated ulceration and septic arthritis. Radiology. 2002;223(3):747-755. | 12034944 | 10.1148/radiol.2233011279 | Abstract |
| D3 | Johnson PW, Collins MS, Wenger DE. Diagnostic utility of T1-weighted MRI characteristics in evaluation of osteomyelitis of the foot. AJR Am J Roentgenol. 2009;192(1):96-100. | 19098186 | 10.2214/AJR.08.1376 | Abstract |
| D4 | Donovan A, Schweitzer ME. Use of MR imaging in diagnosing diabetes-related pedal osteomyelitis. RadioGraphics. 2010;30(3):723-736. | 20462990 | 10.1148/rg.303095111 | Abstract |
| D5 | Ledermann HP, Morrison WB. Differential diagnosis of pedal osteomyelitis and diabetic neuroarthropathy: MR imaging. Semin Musculoskelet Radiol. 2005;9(3):272-283. | 16247726 | 10.1055/s-2005-921945 | Abstract |
| D6 | Ledermann HP, Schweitzer ME, Morrison WB. Nonenhancing tissue on MR imaging of pedal infection: characterization of necrotic tissue and associated limitations for diagnosis of osteomyelitis and abscess. AJR Am J Roentgenol. 2002;178(1):215-222. | 11756124 | 10.2214/ajr.178.1.1780215 | Abstract |
| D7 | Chantelau E. The perils of procrastination: effects of early vs. delayed detection and treatment of incipient Charcot fracture. Diabet Med. 2005;22(12):1707-1712. | 16401316 | 10.1111/j.1464-5491.2005.01677.x | Abstract |

Notes on the set:

- All seven citations written from memory matched PubMed: authors, titles, journals, years,
  volumes and pages. Crossref agrees on each. No correction is needed beyond the journal's
  own styling, "RadioGraphics" for D4 (PubMed abbreviates it "Radiographics").

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| D1-1 | An adjacent ulcer, a sinus tract, cortical interruption and a soft-tissue abscess are secondary signs that add to the marrow signal. | "Secondary signs" chip lists them | yes. D1 abstract: secondary signs were "ulcer, cellulitis, soft-tissue mass, abscess, sinus tract, cortical interruption"; "Identification of secondary signs may augment diagnostic confidence when abnormal marrow signal intensity is seen." |
| D2-1 | Osteomyelitis in the diabetic foot almost always spreads from an adjacent ulcer or sinus tract. | Osteomyelitis only when the bone touches the ulcer or sinus tract; otherwise "think again" chip; warning when contiguity is entered with no ulcer or sinus tract | yes. D2 abstract: "Osteomyelitis was directly adjacent to skin ulcers or surgical defects in all cases but one" and "Pedal osteomyelitis results almost exclusively from contiguous infections". (D2's other source is a surgical defect, not a sinus tract; the D4 abstract supplies the sinus tract: "follow the path of an ulcer or sinus tract to the bone".) |
| D2-2 | The usual sites are the pressure points: toes, metatarsal heads, calcaneus. | — | partly. D2 abstract: "In the forefoot, osteomyelitis occurred most frequently at the fifth metatarsal (n = 24), first metatarsal (n = 21), and first distal phalanx (n = 15). In the hindfoot, the calcaneus (n = 21) was involved most frequently" and it "occurs most frequently around the fifth and first metatarsophalangeal joints". The sites match; the abstract does not call them pressure points. |
| D2-3 | Septic arthritis often comes with osteomyelitis. | Effusion next to abnormal bone → "septic arthritis is possible" | partly. D2 abstract: "Evidence of septic arthritis on MR images was present in 53 (33%) feet" and "One-third of patients with advanced pedal infection show evidence of septic arthritis on MR images." It is given per foot with advanced infection, not as a companion of osteomyelitis, and the abstract does not mention effusion (its sign is "synovial enhancement and adjacent cellulitis"). |
| D3-1 | Confluent medullary low signal on T1 is the pattern of osteomyelitis; hazy or reticulated low signal is not, even with high fluid-sensitive signal. | T1 chip; impression wording | partly. D3 abstract: "None of the cases with a subcortical distribution or hazy reticulated pattern of abnormal signal intensity had positive results for osteomyelitis" and "Confluent decreased T1 marrow signal intensity in a medullary distribution was 95% sensitive in the prediction of osteomyelitis with a specificity of 91%". The study read T1 images only, so "even with high fluid-sensitive signal" is not in the abstract. For the author: the paper's term is one pattern, "hazy reticulated", which the page splits into "hazy or reticulated". |
| D4-1 | An abscess is a rim-enhancing collection after contrast; look for sinus tracts and soft-tissue gas. | — | partly. D4 abstract: "Secondary signs of osteomyelitis include periosteal reaction, a subtending skin ulcer, sinus tract, cellulitis, abscess, and a foreign body." Rim enhancement and soft-tissue gas are not in the abstract; unchecked. |
| D4-2 | Ghost sign: a bone outline that fades on T1 and reappears on fluid-sensitive or contrast images suggests infection within neuroarthropathy; a neuropathic bone keeps its outline. | Ghost sign chip and impression line | no: not in the D4 abstract (full text paywalled), which says only "In the midfoot, secondary signs of infection help differentiate between neuroarthropathy and a superimposed infection." Kept, unchecked. |
| D5-1 | Neuroarthropathy is periarticular, affects several joints, and is most often midfoot (tarsometatarsal, naviculocuneiform and Chopart), away from the pressure points. | Midfoot distribution chip | no: not in the D5 abstract (full text paywalled), which says only that the distinction "requires careful analysis of the location of bone signal alterations, their distribution, and pattern". Kept, unchecked. For the author: the D4 abstract gives a different list, "neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal joints, osteomyelitis occurs distal to the tarsometatarsal joint, in the calcaneus and malleoli". The metatarsophalangeal joints are in the forefoot, at the pressure points, which sits awkwardly with "midfoot, away from the pressure points" (page text, chip and quiz). |
| D6-1 | Non-enhancing tissue is devitalised; osteomyelitis and abscess within it may not enhance. | Impression wording | yes. D6 abstract: "Nonenhancing areas are seen in one fourth of pedal infections, occur almost exclusively in diabetic patients, and represent necrotic tissue" and "Lack of enhancement in these areas can mask the presence of abscess and osteomyelitis." |
| D7-1 | MRI shows active Charcot disease (marrow edema) while radiographs are still normal, when treatment can still prevent collapse. | Activity chip | partly. D7 abstract: "plain X-rays may not show fractures"; "Early detection of incipient Charcot foot is facilitated by imaging techniques other than plain X-rays. Immediate off-loading of incipient Charcot foot appears to minimize fractures and incapacitating deformities." The abstract groups "MRI, CT scan or bone scintigraphy" together and does not mention marrow edema. |

Not sourced, and labelled as the site's own on the page: the order of the steps, the protocol
checklist (T1 without fat suppression in two planes, fat-suppressed PD or T2).

## Second check, 2026-10-28: D3 read in full

D3 (Johnson, Collins and Wenger, AJR 2009) was read in full on the AJR site, in a browser.

| ID | Verdict | Evidence |
|----|---------|----------|
| D3-1 | yes, as reworded on 2026-10-23 | "None of the cases of osteomyelitis in our series had a limited subcortical distribution or hazy reticulated pattern"; confluent medullary low T1 signal: sensitivity 95%, specificity 91%, NPV 98%. "Only the T1-weighted sequences, however, were reviewed", so the dropped clause about bright fluid-sensitive images was rightly dropped; the authors only add, from experience, that "T2-weighted MRI may be overly sensitive". The hazy reticulated pattern "likely correlates with" noninfectious reactive marrow edema. |
