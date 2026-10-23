# Foot calculators (Hawkins, Sanders, Myerson): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the three foot calculators (`/hawkins`, `/sanders`, `/myerson`) and their
shared logic in `src/logic/` (`hawkins.ts`, `sanders.ts`, `myerson.ts`), which the foot MRI
study also uses. The study's own claims are in `2026-10-23-foot-mri-sources.md`.

## Status: nothing here is verified

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. The citations and the wording of every type are **from memory**. Every row
is **to check**. The pages say "Unchecked draft" in their source note, their references have
no DOI, and `src/logic/footClassifications.test.ts` quotes each claim by ID.

## How to check (on a computer)

Same method as the ankle (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or full text. These are classic papers, so the classification tables may be in
figures or the full text only. If a paper's wording differs, correct the descriptions in the
logic file and the test in the same commit, saying why. Then add the DOIs to the pages'
references and reword their source notes.

## References

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| C1 | Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002. | — | Hawkins types I–III, Hawkins sign |
| C2 | Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156. | — | Hawkins type IV |
| C3 | Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95. | — | Sanders |
| C4 | Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242. | 10.1177/107110078600600504 (unconfirmed) | Myerson |

## Claims

### Hawkins (C1, C2)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| HK-1 | Type I is an undisplaced (vertical) fracture of the talar neck. | not displaced → I | to check |
| HK-2 | Type II is displaced, with subluxation or dislocation of the subtalar joint; the ankle joint stays in place. | + subtalar → II | to check |
| HK-3 | Type III is displaced, with the talar body dislocated from both the subtalar and the ankle joint. | + ankle → III | to check |
| HK-4 | Type IV (Canale and Kelly, C2) is type III with subluxation or dislocation of the talar head at the talonavicular joint. | + talonavicular → IV | to check |
| HK-5 | Each type includes the joint injuries of the types before it. The page and study give the highest type marked and list unmarked earlier types as a "check the images" note (the site's handling, as for Mayfield). | highest type; gaps listed | to check |
| HK-6 | Hawkins named no type for a displaced fracture with every joint in place, so the page gives none (the site's handling, as the author decided for Neer, N6). A later modification splits type II by whether the subtalar joint is reduced (Vallier et al., J Bone Joint Surg Am 2014, from memory); it is not on the page. | displaced, no joint → no type | to check |
| HK-7 | The risk of osteonecrosis of the talar body rises with the type (C1, C2). | — | to check |
| HK-8 | The Hawkins sign: subchondral lucency under the talar dome on radiographs at about 6–8 weeks shows that the body is revascularising, so osteonecrosis is unlikely (C1). | — | to check |

### Sanders (C3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| SA-1 | Typed on the coronal CT image where the undersurface of the posterior facet is widest. | — | to check |
| SA-2 | Three fracture lines, A, B and C from lateral to medial, divide the facet into lateral, central and medial columns, with the sustentaculum medial to C. | — | to check |
| SA-3 | Type I: all undisplaced articular fractures (under 2 mm), whatever the number of fracture lines. Is the 2 mm in the paper? | not displaced → I | to check |
| SA-4 | Type II two-part, type III three-part with a centrally depressed fragment, type IV four-part or more, highly comminuted. | 1 line → II, 2 → III, 3 or comminuted → IV | to check |
| SA-5 | The subtype letters name the lines: IIA, IIB, IIC; IIIAB, IIIAC, IIIBC. | — | to check |
| SA-6 | Outcome after surgery worsened as the type rose (the classification is prognostic). | — | to check |

### Myerson (C4)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| MY-1 | Type A, total incongruity: all five metatarsals displaced in one direction, laterally or dorsoplantar (homolateral). | first with lesser + all lesser → A | to check |
| MY-2 | Type B, partial incongruity: B1 the first metatarsal displaced medially; B2 one or more of the lesser metatarsals displaced laterally. | first medial, no lesser → B1; first in place, any lesser → B2 | to check |
| MY-3 | Type C, divergent: C1 partial (the first medially and some lesser laterally), C2 total (the first medially and all lesser laterally). | first medial + some → C1; + all → C2 | to check |
| MY-4 | The groups: A total incongruity, B partial incongruity, C divergent. Myerson built on Quénu and Kuss (1909) and Hardcastle (1982). | — | to check |
| MY-5 | The types describe fracture-dislocations; an undisplaced ligament injury has none. | nothing displaced → no type | to check |
| MY-6 | A pattern Myerson did not name (the first metatarsal displaced laterally with only some or none of the lesser ones) gets no type (the site's handling, as for Neer N6 and Hawkins HK-6). Check that the paper names no such pattern. | → no type | to check |
