# Pediatric elbow radiographs study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: nothing here is verified yet

This file was written in a cloud session whose network blocks PubMed, PubMed Central,
Crossref, doi.org and Europe PMC. The author chose (2026-10-23) to draft the pages anyway
and check them later on a computer. So:

- Every reference below was chosen and written **from memory**. Titles, authors, years,
  volumes and pages may be wrong, and a paper may not say what is attributed to it.
- Every claim row is **Verified = to check**. None of them has been read in an abstract or
  full text.
- The site code marks this state: the references have no `doi`, inline citations are plain
  text (no `<Cite>` links), and the source note starts "Unchecked draft". Tests in
  `src/studies/PediatricElbowStudy.test.ts` pin that, so the unchecked state cannot be lost
  by accident.
- The author chose (2026-10-23) to deploy these pages before the check; they stay labelled "Unchecked draft" on the live site until it is done.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`, "How this was checked"):

1. For each reference, find it on PubMed (`esearch`/`esummary`) and resolve its DOI on
   Crossref. Correct the citation text in this file and in
   `src/studies/PediatricElbowStudy.tsx`. Drop a reference that cannot be matched, and every
   claim that rests on it.
2. For each claim, read the abstract (`efetch rettype=abstract`) or open full text (PMC).
   Mark it **yes** with the quote and its location, or **no** with what the paper says.
3. A claim marked **no**: remove the rule or chip and keep a descriptive field, and list it
   in an "Omitted claims for the author" section at the end of this file. Do not quietly
   reword it (CLAUDE.md, Studies section).
4. Once every claim is settled: add `doi` to each reference, switch the plain-text
   citations to `<Cite doi>`, change the source note to the ankle wording ("Draft lesson
   compiled from the papers below; citations checked against PubMed in <month year>. Not yet
   reviewed by the site author."), and update the tests that pin the unchecked state, saying
   in the commit why they changed.

## References

Candidate DOIs are from memory and **unconfirmed**; they are here to speed up the check, not
to be trusted.

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| E1 | Iyer RS, Thapa MM, Khanna PC, Chew FS. Pediatric bone imaging: imaging elbow trauma in children—a review of acute and chronic injuries. AJR Am J Roentgenol. 2012;198(5):1053-1068. | 10.2214/AJR.10.7314 (unconfirmed) | CRITOE ages and order, radiocapitellar line, fracture overview |
| E2 | Cheng JC, Wing-Man K, Shen WY, Yurianto H, Xia G, Lau JT, Cheung AY. A new look at the sequential development of elbow-ossification centers in children. J Pediatr Orthop. 1998;18(2):161-167. | — | Measured ages; girls earlier than boys |
| E3 | Skaggs DL, Mirzayan R. The posterior fat pad sign in association with occult fracture of the elbow in children. J Bone Joint Surg Am. 1999;81(10):1429-1433. | 10.2106/00004623-199910000-00007 (unconfirmed) | Posterior fat pad and occult fracture |
| E4 | Rogers LF, Malave S Jr, White H, Tachdjian MO. Plastic bowing, torus and greenstick supracondylar fractures of the humerus: radiographic clues to obscure fractures of the elbow in children. Radiology. 1978;128(1):145-150. | 10.1148/128.1.145 (unconfirmed) | Anterior humeral line |
| E5 | Herman MJ, Boardman MJ, Hoover JR, Chafetz RS. Relationship of the anterior humeral line to the capitellar ossific nucleus: variability with age. J Bone Joint Surg Am. 2009;91(9):2188-2193. | 10.2106/JBJS.H.01316 (unconfirmed) | Anterior humeral line under age 4 |
| E6 | Gartland JJ. Management of supracondylar fractures of the humerus in children. Surg Gynecol Obstet. 1959;109(2):145-154. | — (likely none) | Gartland types |
| E7 | Leitch KK, Kay RM, Femino JD, Tolo VT, Storer SK, Skaggs DL. Treatment of multidirectionally unstable supracondylar humeral fractures in children. A modified Gartland type-IV fracture. J Bone Joint Surg Am. 2006;88(5):980-985. | 10.2106/JBJS.D.02956 (unconfirmed) | Gartland type IV |
| E8 | Weiss JM, Graves S, Yang S, Mendelsohn E, Kay RM, Skaggs DL. A new classification system predictive of complications in surgically treated pediatric humeral lateral condyle fractures. J Pediatr Orthop. 2009;29(6):602-605. | 10.1097/BPO.0b013e3181b2891c (unconfirmed) | Lateral condyle types |
| E9 | Jakob R, Fowles JV, Rang M, Kassab MT. Observations concerning fractures of the lateral humeral condyle in children. J Bone Joint Surg Br. 1975;57(4):430-436. | — | Lateral condyle stages (mentioned only) |
| E10 | Edmonds EW. How displaced are "nondisplaced" fractures of the medial humeral epicondyle in children? Results of a three-dimensional computed tomography analysis. J Bone Joint Surg Am. 2010;92(17):2785-2791. | 10.2106/JBJS.I.01637 (unconfirmed) | Medial epicondyle displacement on radiographs |
| E11 | O'Brien PI. Injuries involving the proximal radial epiphysis. Clin Orthop Relat Res. 1965;41:51-58. | — | Radial neck angulation |
| E12 | Judet J, Judet R, Lefranc J. Fracture du col radial chez l'enfant. Ann Chir. 1962;16:1377-1385. | — | Radial neck (mentioned only) |

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Step 1: technique

The view checklist (AP and a true lateral with the elbow at 90°) is the site's own and is
presented as such, with no citation.

### Step 2: ossification centres (CRITOE)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE2-1 | The six centres appear in the order capitellum, radial head, internal (medial) epicondyle, trochlea, olecranon, external (lateral) epicondyle (CRITOE), at roughly 1, 3, 5, 7, 9 and 11 years. | centre expected once age ≥ 1, 3, 5, 7, 9, 11 | E1 | to check |
| PE2-2 | Measured ages vary, and the centres appear earlier in girls than in boys. | descriptive only, no chip | E2 | to check |
| PE2-3 | Because the medial epicondyle ossifies before the trochlea, an ossified trochlea with no medial epicondyle in its place should raise the suspicion of an avulsed medial epicondyle displaced (entrapped) into the joint. | trochlea seen + medial epicondyle not seen → warning and impression line | E1 | to check |

The "not seen although usually present by about age N" warning is this site's use of PE2-1;
the review gives approximate ages, not a lower limit for every child.

### Step 3: fat pads

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE3-1 | An elevated anterior fat pad (sail sign) and a visible posterior fat pad indicate a joint effusion. | descriptive | E1 | to check |
| PE3-2 | In children with a visible posterior fat pad after trauma and no fracture seen on the first radiographs, follow-up radiographs showed a fracture in most (76% in their series), so an occult fracture is likely. | posterior fat pad + no fracture → impression line "occult fracture likely" | E3 | to check |

### Step 4: alignment lines

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE4-1 | On a true lateral, the anterior humeral line normally passes through the middle third of the capitellum; a line passing anterior to that (capitellum displaced posteriorly) points to an extension supracondylar fracture. | not middle third → "look for a supracondylar fracture" | E4 | to check |
| PE4-2 | In young children the line often passes through the anterior third of the capitellum without a fracture; this was common under age 4. | anterior third under age 4 → "can be normal under 4" | E5 | to check |
| PE4-3 | The radiocapitellar line (along the radial neck) passes through the capitellum in every view; if it does not, the radial head is dislocated, and the ulna must be checked for a fracture (Monteggia injury). | disrupted → chip; disrupted + no dislocation entered → warning | E1 | to check |

### Step 5: supracondylar fracture

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE5-1 | Supracondylar fracture is the commonest elbow fracture in children. | descriptive | E1 | to check |
| PE5-2 | Gartland types: I undisplaced; II displaced with the posterior cortex intact (hinged); III completely displaced, without cortical contact. | option → Gartland I, II, III | E6 | to check |
| PE5-3 | A "type IV" fracture is multidirectionally unstable, with the periosteal hinge lost in front and behind, and is recognised under anaesthesia rather than on the first radiographs. | lesson only, no chip | E7 | to check |

### Step 6: lateral condyle fracture

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE6-1 | Weiss types: I, displacement under 2 mm; II, 2 mm or more with the articular surface intact; III, 2 mm or more with the articular surface disrupted. | < 2 mm → I; ≥ 2 mm + intact → II; ≥ 2 mm + disrupted → III | E8 | to check |
| PE6-2 | Whether the articular cartilage is intact often cannot be judged on radiographs alone (arthrography or MRI shows it). | ≥ 2 mm + not judged → "II or III" | E8 | to check |
| PE6-3 | Jakob's stages: I undisplaced with the articular surface intact; II complete fracture with moderate displacement; III complete displacement with rotation of the fragment. | lesson only, no chip | E9 | to check |

### Step 7: medial epicondyle avulsion

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE7-1 | The avulsed medial epicondyle can become entrapped in the joint, notably after an elbow dislocation; an entrapped fragment must be named. | entrapped → warn chip and impression line | E1 | to check |
| PE7-2 | Displacement measured on radiographs is unreliable and underestimates the true displacement seen on CT. | descriptive; no displacement threshold | E10 | to check |

### Step 8: radial head and neck

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| PE8-1 | O'Brien types by angulation of the radial head: I, under 30°; II, 30° to 60°; III, over 60°. | < 30 → I; 30–60 → II; > 60 → III | E11 | to check |
| PE8-2 | Judet's classification grades by displacement and angulation (types I to IV). | lesson only, no chip | E12 | to check |

### Step 9: dislocation, olecranon and variants

Elbow dislocation and olecranon fracture are descriptive fields with no cited rule; the
link between dislocation and an entrapped medial epicondyle is PE7-1. The supracondylar
process is recorded present or absent and gets its own impression line (the author's
decision for variants); no claim is made about it.

### Not included, by choice

- Pulled elbow (radial head subluxation): not included, because no reference above was
  recalled with confidence for its radiographic statement.
- Modified Wilkins IIA/IIB subdivision of Gartland II: not included, for the same reason.
- Sex-specific ossification ages: E2 reports them, but the exact numbers were not recalled
  with confidence, so the age rule uses E1's single approximate ages.
