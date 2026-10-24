# Foot calculators (Hawkins, Sanders, Myerson): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the three foot calculators (`/hawkins`, `/sanders`, `/myerson`) and their
shared logic in `src/logic/` (`hawkins.ts`, `sanders.ts`, `myerson.ts`), which the foot MRI
study also uses. The study's own claims are in `2026-10-23-foot-mri-sources.md`.

## Status: references matched, claims partly verified (2026-10-23)

The draft was written from memory in a cloud session that could not reach PubMed. It was
checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esearch`/`esummary`), its DOI resolved on Crossref
(by `query.bibliographic` search where PubMed lists none), and a claim marked verified only
when its wording was read in the PubMed abstract. All four papers were found and every
citation matches its PubMed record. None has a PMC copy; Unpaywall refused the placeholder
address used for the check, so no open copy was found. Everything here is abstract-only, and
these are classic papers whose classification tables are in the full text: Hawkins 1970 has
no abstract in PubMed, and Myerson 1986's abstract gives outcomes but not the types. So most
of the Hawkins and all of the Myerson wording cannot be verified yet.

The author decided (2026-10-23): add the DOIs and switch the citations to `<Cite doi>` links;
keep the claims that no abstract states, with the "Unchecked draft" source note, until they can
be checked; and reword what differs from the paper to the paper's own wording. Applied the same
day (see "Changes applied" at the end).

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| C1 | Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002. | 5479485 | 10.2106/00004623-197052050-00013 | No abstract |
| C2 | Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156. | 417084 | 10.2106/00004623-197860020-00001 | Abstract |
| C3 | Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95. | 8472475 | 10.1097/00003086-199305000-00012 | Abstract (truncated at 250 words) |
| C4 | Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242. | 3710321 | 10.1177/107110078600600504 | Abstract |

Notes on the set:

- Every citation as drafted matches PubMed (authors, title, journal, year, volume, issue,
  pages); no text needs correcting. PubMed abbreviates the ranges (143-56, 225-42); Crossref
  gives the full ones above.
- C1, C2, C3: PubMed has no DOI. The DOIs were found on Crossref by bibliographic search and
  their records match title, authors, volume, issue and pages.
- C4: the candidate DOI 10.1177/107110078600600504 is confirmed (PubMed and Crossref).
- HK-6 mentions, from memory, "Vallier et al., J Bone Joint Surg Am 2014". It exists: Vallier
  HA, Reichard SG, Boyd AJ, Moore TA. A new look at the Hawkins classification for talar neck
  fractures: which features of injury and treatment are predictive of osteonecrosis? J Bone
  Joint Surg Am. 2014;96(3):192-197. PMID 24500580, DOI 10.2106/JBJS.L.01680. It is not on
  the page; see HK-6 for how its split differs from the note.

## Claims

### Hawkins (C1, C2)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| HK-1 | Type I is an undisplaced (vertical) fracture of the talar neck. | not displaced → I | partly. C2 abstract classifies "non-displaced fractures" as the first group. "Vertical" is not in the abstract, and C1 has none. Rest unchecked. |
| HK-2 | Type II is displaced, with subluxation or dislocation of the subtalar joint; the ankle joint stays in place. | + subtalar → II | partly. C2 abstract: "fractures with subluxation or dislocation of the subtalar joint". That the ankle stays in place is not in the abstract. Rest unchecked. |
| HK-3 | Type III is displaced, with the talar body dislocated from both the subtalar and the ankle joint. | + ankle → III | partly. C2 abstract: "fractures with complete dislocation of the body of the talus". The two joints are not named in the abstract. Rest unchecked. |
| HK-4 | Type IV (Canale and Kelly, C2) is type III with subluxation or dislocation of the talar head at the talonavicular joint. | + talonavicular → IV | no: not in abstract. C2's abstract does not mention a fourth type. Kept, unchecked. |
| HK-5 | Each type includes the joint injuries of the types before it. The page and study give the highest type marked and list unmarked earlier types as a "check the images" note (the site's handling, as for Mayfield). | highest type; gaps listed | no: not in abstract (the cumulative reading is not stated in C2's abstract; the handling of gaps is the site's own). Kept, unchecked. |
| HK-6 | Hawkins named no type for a displaced fracture with every joint in place, so the page gives none (the site's handling, as the author decided for Neer, N6). A later modification splits type II by whether the subtalar joint is reduced (Vallier et al., J Bone Joint Surg Am 2014, from memory); it is not on the page. | displaced, no joint → no type | no: not in abstract for the Hawkins part (C1 has no abstract; the no-type handling is the site's own). **For the author, on the note only:** Vallier 2014 splits type II by subluxated versus dislocated, not by reduced: "We investigated the possibility of dividing the Hawkins type-II classification into subluxated (type-IIA) and dislocated (type-IIB) subtalar joint subtypes" and "Osteonecrosis never occurred in fractures without subtalar dislocation (Hawkins type I and IIA)". Nothing on the page uses it. |
| HK-7 | The risk of osteonecrosis of the talar body rises with the type (C1, C2). | — | yes, for types I to III in C2. Abstract: "Avascular necrosis of the talar body occurred in 52 per cent of the fractures (in two of thirteen non-displaced fractures, in half of the fractures with subluxation or dislocation of the subtalar joint, and in sixteen of nineteen fractures with complete dislocation of the body of the talus)." Type IV and C1 not read. |
| HK-8 | The Hawkins sign: subchondral lucency under the talar dome on radiographs at about 6–8 weeks shows that the body is revascularising, so osteonecrosis is unlikely (C1). | — | no: not in abstract (C1 has no abstract in PubMed). Kept, unchecked. |

### Sanders (C3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| SA-1 | Typed on the coronal CT image where the undersurface of the posterior facet is widest. | — | partly. C3 abstract: the classification was "based on standardized coronal and transverse computed tomography (CT) scans of both feet." The widest-facet image is not in the abstract. Rest unchecked. |
| SA-2 | Three fracture lines, A, B and C from lateral to medial, divide the facet into lateral, central and medial columns, with the sustentaculum medial to C. | — | no: not in abstract. Kept, unchecked. |
| SA-3 | Type I: all undisplaced articular fractures (under 2 mm), whatever the number of fracture lines. Is the 2 mm in the paper? | not displaced → I | partly. C3 abstract: "Type 1 fractures were nondisplaced (and received nonoperative treatment)". The 2 mm and "whatever the number of fracture lines" are not in the abstract; the 2 mm question stays open. Rest unchecked. |
| SA-4 | Type II two-part, type III three-part with a centrally depressed fragment, type IV four-part or more, highly comminuted. | 1 line → II, 2 → III, 3 or comminuted → IV | partly. C3 abstract: "Type II were two-part or split fractures; Type III were three-part or split depression fractures; and Type IV were four-part or highly comminuted articular fractures." The paper's term for type III is "split depression"; "centrally depressed fragment" is not in the abstract, and the count of lines behind each type is not stated there. Rest unchecked. |
| SA-5 | The subtype letters name the lines: IIA, IIB, IIC; IIIAB, IIIAC, IIIBC. | — | no: not in abstract. Kept, unchecked. |
| SA-6 | Outcome after surgery worsened as the type rose (the classification is prognostic). | — | yes. C3 abstract (title: "a prognostic computed tomography scan classification"): "Excellent or good clinical results occurred in 58 of 79 (73%) Type II fractures, 21 of 30 (70%) Type III fractures, and one of 11 (9%) Type IV fractures", and anatomic reduction in 86%, 60% and 0%. |

### Myerson (C4)

C4's abstract reports outcomes and treatment only ("The major determinant of unacceptable
results was identified as the quality of the initial reduction"); it does not give the types.

| ID | Claim | Rule | Verified |
|---|---|---|---|
| MY-1 | Type A, total incongruity: all five metatarsals displaced in one direction, laterally or dorsoplantar (homolateral). | first with lesser + all lesser → A | no: not in abstract. Kept, unchecked. |
| MY-2 | Type B, partial incongruity: B1 the first metatarsal displaced medially; B2 one or more of the lesser metatarsals displaced laterally. | first medial, no lesser → B1; first in place, any lesser → B2 | no: not in abstract. Kept, unchecked. |
| MY-3 | Type C, divergent: C1 partial (the first medially and some lesser laterally), C2 total (the first medially and all lesser laterally). | first medial + some → C1; + all → C2 | no: not in abstract. Kept, unchecked. |
| MY-4 | The groups: A total incongruity, B partial incongruity, C divergent. Myerson built on Quénu and Kuss (1909) and Hardcastle (1982). | — | no: not in abstract. Kept, unchecked. |
| MY-5 | The types describe fracture-dislocations; an undisplaced ligament injury has none. | nothing displaced → no type | no: not in abstract (the series was of "76 fracture-dislocations of the Lisfranc tarsometatarsal joint complex", which fits, but the abstract does not say undisplaced injuries are untyped). Kept, unchecked. |
| MY-6 | A pattern Myerson did not name (the first metatarsal displaced laterally with only some or none of the lesser ones) gets no type (the site's handling, as for Neer N6 and Hawkins HK-6). Check that the paper names no such pattern. | → no type | no: not in abstract; needs the full text. Kept, unchecked. |

## Changes applied (2026-10-23)

- The Hawkins, Sanders and Myerson pages carry each reference's DOI, link their sources with
  `<Cite doi>`, and their source notes and reference notes say the papers are matched and which
  claims are still unchecked. The logic files' header comments say the same.
- SA-4: the type descriptions in `src/logic/sanders.ts` and the Sanders page table now use the
  abstract's words: type II "two-part or split fracture of the posterior facet" (was "two-part
  fracture"), type III "three-part or split depression fracture of the posterior facet" (was
  "three-part fracture ..., with a centrally depressed fragment"), type IV "four-part or highly
  comminuted fracture of the posterior facet" (was "four-part or more comminuted"). The rule is
  unchanged. `src/logic/footClassifications.test.ts` pins the new strings.
- SA-6: the Sanders page now gives the abstract's figures: excellent or good results in 73% of
  type II, 70% of type III and 9% of type IV fractures.
- HK-6: nothing changed in code; Vallier's IIA/IIB split is not used on any page.
- Unchanged and still unchecked: HK-1 to HK-6 and HK-8 beyond what the Canale and Kelly abstract
  states, SA-1 to SA-3 and SA-5 (including the 2 mm), MY-1 to MY-6.
