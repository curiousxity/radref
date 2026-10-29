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

## Second check, 2026-10-25: papers supplied by the author

Read in full: Jiménez-Almonte JH, King JD, Luo TD, Aneja A, Moghadamian E. Classifications in brief:
Sanders classification of intraarticular fractures of the calcaneus. Clin Orthop Relat Res.
2019;477(2):467-471. doi:10.1097/CORR.0000000000000539. Sanders 1993 itself is still unread.

| ID | Verdict | Evidence |
|----|---------|----------|
| SA-1 | yes | "based on coronal and axial CT cross-sections with the widest undersurface of the posterior facet of the talus". |
| SA-2 | yes | Lines A and B divide the facet, "A third fracture line (line C) represents the medial edge of the posterior facet. Together, the three lines (A, B, and C from lateral to medial) divide the posterior facet into four potential fracture fragments: lateral, central, medial, and sustentaculum fragments". |
| SA-3 | partly, changed | "Type I fractures include all minimally displaced (≤ 2 mm) articular fractures, regardless of the number of fracture lines and fragments present. The original publication by Sanders et al. did not specify the degree of articular incongruity but did recommend surgical management in patients with ≥ 3 mm". The site read 2 mm as displaced; now displaced means more than 2 mm, and type I is "minimally displaced (2 mm or less)" (the author chose the newer source). |
| SA-4 | yes, detail changed | Type II "one primary fracture line"; type III "two primary fracture lines commonly accompanied by a central area of depression"; type IV "three or more primary fracture lines, resulting in four or more articular fragments". The comminution question said "more than four articular parts"; now "four or more articular fragments". |
| SA-5 | yes | "IIA, IIB, and IIC, with the letter corresponding to the location of the primary fracture line"; "IIIAB, IIIAC, and IIIBC". |

## Third check, 2026-10-25: second batch from the author

Read in full: Alton T, Patton DJ, Gee AO. Classifications in brief: the Hawkins classification for
talus fractures. Clin Orthop Relat Res. 2015;473(9):3046-3049. doi:10.1007/s11999-015-4136-x; and
Scolaro J, Ahn J, Mehta S. In brief: Lisfranc fracture dislocations. Clin Orthop Relat Res.
2011;469(7):2078-2080. doi:10.1007/s11999-010-1586-z.

| ID | Verdict | Evidence |
|----|---------|----------|
| HK-1 | yes, reworded | "vertical fractures of the neck of the talus with a minimally displaced fracture line ... The talus retains its anatomic position in the ankle and the subtalar joint remains reduced". Was "undisplaced"; now "undisplaced or minimally displaced", both joints in place. |
| HK-2 | yes | "vertical, displaced, with the subtalar joint subluxated or dislocated, but the talus remains reduced in the ankle mortise". |
| HK-3 | yes | "similar ... to Type II, with the addition of a dislocation of the ankle (tibiotalar articulation)". |
| HK-4 | yes | Canale and Kelly's type IV: "dislocation of the body from the ankle or subtalar joint with additional dislocation or subluxation of the head of the talus from the talonavicular joint". |
| HK-6 | yes | Vallier et al. split type II into IIA (subtalar subluxated) and IIB (dislocated). Now named on the page. |
| HK-7 | yes | AVN 5.7% type I, 18.4% II, 44.7% III, 12.1% IV in a pooled series. |
| HK-8 | yes, detail added | "subchondral atrophy on the AP radiograph between 6 and 8 weeks after injury (known as the Hawkins sign)", "a positive prognostic indicator"; "the absence of subchondral atrophy was not a universally reliable indicator of the development of AVN" (Canale and Kelly). |
| MY-* | no | Scolaro does not describe the Myerson types: "Hardcastle et al. further categorized Lisfranc injuries into Type A, B, or C based on displacement and incongruity ... Myerson followed with modifications to this system based on direction of dislocation". Myerson stays unchecked. |

## Fourth check, 2026-10-29: open sources for Myerson

Myerson 1986 is still unread (the SAGE page returns 403 to curl). Read in full from Europe PMC:

- Diebal AR, Westrick RB, Alitz C, Gerber JP. Lisfranc injury in a West Point cadet. Sports
  Health. 2013;5(3):281-285. doi:10.1177/1941738113477991 (PMC3658402). Table 1 sets out
  Quénu and Kuss 1909, Hardcastle 1982 and Myerson 1986 row by row.
- Tzatzairis T, Firth G, Parker L. Adolescent Lisfranc injury treated with TightRope™: a case
  report and review of literature. World J Orthop. 2019;10(2):115-122.
  doi:10.5312/wjo.v10.i2.115 (PMC6379736). Table 1, "Myerson classification system".
- Moracia-Ochagavía I, Rodríguez-Merchán EC. Lisfranc fracture-dislocations: current management.
  EFORT Open Rev. 2019 (PMC6667981); not cited on the page (its Myerson figure is an image).

Both cited papers are case reports with a review section and a table of the types; no open
radiology or orthopaedic review was found that sets out all five types in words. Both are now
cited on the Myerson page and, for the study's Myerson table, in the foot MRI study.

| ID | Verdict | Evidence |
|----|---------|----------|
| MY-1 | yes | Diebal, Myerson row: "Type A: Total incongruity of the tarsometatarsal joint—lateral or dorsoplantar". Tzatzairis: "Type A: Complete ... Dislocation of M1-M5 in the same direction (either lateral or dorsoplantar)". **For the author:** other open papers word type A differently: J Child Orthop 2022 (PMC9254024), "complete incongruity of the TMT joint complex in the medial or lateral direction"; Cureus 2025 (PMC12616291), "homolateral displacement of all five metatarsals in the same direction, either medially or laterally". The page follows Diebal and Tzatzairis ("laterally or dorsoplantar"). |
| MY-2 | yes | B1, Diebal: "Medial dislocations—first ray in isolation with or without medial cuneiform displacement"; Tzatzairis: "Medial dislocation involving only the M1 joint". B2, Diebal: "Lateral dislocations—involving any of the 4 lateral metatarsals" (Tzatzairis: "Lateral dislocation involving any of the M2-M4", which leaves out M5). |
| MY-3 | yes | Tzatzairis: C1 "Divergent, incomplete dislocation involving M1 and some of the lateral metatarsals"; C2 "Divergent, complete dislocation involving M1 and all of the lateral metatarsals". Diebal: C2 "Total displacement—involving all metatarsals with the medial column displaced medially and the middle and lateral columns displaced laterally"; C1 "Partial displacement—medial and middle columns" (narrower than the page's "some of the lesser metatarsals"). |
| MY-4 | yes | Groups: Diebal's Hardcastle row, which the Myerson row subdivides: "Type A: Total incongruity", "Type B: Partial incongruity—medial or lateral dislocation", "Type C: Divergent—total or partial displacement"; Transl Sports Med 2026 (PMC12782322): "A: total incongruity, B: partial incongruity, C: divergent". History, EFORT 2019: "originally described by Quenu and Kuss in 1909 ... modified by Hardcastle et al in 1982 ... Myerson proposed a modification of the classification". (The history is not on the page.) |
| MY-5 | yes, with a note | EFORT 2019: "Recently, the introduction of a fourth category to the Myerson-modified Hardcastle classification has been proposed, which corresponds to the so-called subtle injury of the Lisfranc joint or lesion type D", split into D1 (C1–M2 ≤ 2 mm) and D2 (> 2 mm). So the 1986 types name no undisplaced injury, as the page says. **For the author:** a later type D for subtle injuries exists; the page does not use it. |
| MY-6 | partly | None of the four tabulations read (Diebal, Tzatzairis, J Child Orthop 2022, Cureus 2025) lists a type with the first metatarsal displaced laterally with only some or none of the lesser ones; type A is all five in every one. Whether the 1986 paper names such a pattern still needs the paper. |
| HK-5 | partly (no new reading) | The cumulative reading holds for type III in Alton (third check): type III is "similar ... to Type II, with the addition of a dislocation of the ankle". **For the author:** for type IV Alton gives "dislocation of the body from the ankle or subtalar joint with additional dislocation or subluxation of the head of the talus from the talonavicular joint", that is the ankle or the subtalar joint, while the page's type IV is "as type III" (both joints). The handling of gaps stays the site's own. Alton's full text is not open (PMC4523513 has no body), so it was not reread. |

Already settled, though `docs/REMAINING_TASKS.md` still lists them: HK-4, HK-6 and HK-8 (third
check, Alton 2015) and SA-2, SA-5 and the 2 mm of SA-3 (second check, Jiménez-Almonte 2019).

Changes applied: the Myerson page lists Diebal and Tzatzairis (three references) and cites them
in its source note, which now names MY-6 as the one point still unchecked; the header comment
of `src/logic/myerson.ts` says the same. No type wording or rule changed.

Needs a browser: https://journals.sagepub.com/doi/10.1177/107110078600600504 (Myerson 1986:
MY-1 to MY-6 against the paper itself, MY-6 above all).

## The author's decisions, 2026-10-29

Read for this round: Alton 2015 on the PMC article page (`pmc.ncbi.nlm.nih.gov/articles/PMC4523513`;
Europe PMC returns no body for it, and the PMC PDF is behind a browser check), for the Fig. 1
legend; Diebal 2013 and Tzatzairis 2019 again (Europe PMC `fullTextXML`); and, in full from Europe
PMC, two reviews for the later type D, each checked against Crossref and now cited on the Myerson
page and in the foot MRI study:

- Moracia-Ochagavía I, Rodríguez-Merchán EC. Lisfranc fracture-dislocations: current management.
  EFORT Open Rev. 2019;4(7):430-444. doi:10.1302/2058-5241.4.180076 (PMC6667981). This is the
  "EFORT 2019" of the fourth check. It reports the proposal of Sivakumar BS, An VVG, Oitment C,
  Myerson M. Subtle Lisfranc injuries: a topical review and modification of the classification
  system. Orthopedics. 2018;41(2):e168-e175, which was not read.
- Hammad A, Ahmad Y, Abdelnour J, Tscholl P. Lisfranc injuries: latest updates on diagnostics and
  management. Transl Sports Med. 2026;2026:3933956. doi:10.1155/tsm2/3933956 (PMC12782322).
  Crossref lists only the first three authors; the article and PubMed list four.

Also read, for MY-2 (not cited on the page): Paek et al., J Child Orthop 2022 (PMC9254024) and the
Cureus 2025 review (PMC12616291).

| ID | Decision | Change on the page |
|----|----------|--------------------|
| HK-4 (item 20) | Keep type IV as subtalar plus tibiotalar dislocation with talonavicular dislocation (three joints). Alton is internally inconsistent: its text gives Canale and Kelly's type IV as "dislocation of the body from the ankle or subtalar joint with additional dislocation or subluxation of the head of the talus from the talonavicular joint", but its classification figure gives all three joints: "(D) Type IV is a talar neck fracture with subtalar, tibiotalar, and talonavicular dislocations." The page follows the figure. | `hawkinsDescriptions.IV` (Hawkins page table and result, foot MRI study table, field and impression) is now "displaced fracture with subtalar and tibiotalar (ankle) dislocation, plus subluxation or dislocation of the talar head at the talonavicular joint" (was "as type III, with subluxation or dislocation of the talar head at the talonavicular joint"). "Subluxation or" is kept from Alton's text. The rule is unchanged. Test pins the string. |
| HK-5 (item 20) | Settled: the cumulative reading is in Alton's Fig. 1 legend: "(B) Type II is a talar neck fracture with subtalar dislocation", "(C) Type III is a talar neck fracture with subtalar and tibiotalar dislocations", "(D) Type IV is a talar neck fracture with subtalar, tibiotalar, and talonavicular dislocations". Listing unmarked earlier types as a "check the images" note stays the site's own handling. | No rule change. With HK-1 to HK-8 all read, the Hawkins page source note no longer starts "Unchecked draft" (now: "The papers are paywalled, so the four types, the joints of each type (from the review's classification figure) and the Hawkins sign are checked against a review of both"). Header comment of `src/logic/hawkins.ts` and the HK-4/HK-5 test comments updated; the test block is no longer named "unchecked". |
| MY-1 (item 21) | Type A: all five metatarsals displace together in the same direction. Tzatzairis: "Dislocation of M1-M5 in the same direction (either lateral or dorsoplantar)"; Diebal: "Total incongruity of the tarsometatarsal joint—lateral or dorsoplantar". The direction is left out, as open sources differ on it (fourth check, MY-1). | A: "all five metatarsals displaced together in the same direction" (was "all five metatarsals displaced in one direction, laterally or dorsoplantar (homolateral)"). The calculator's lesser-metatarsal question now reads "Second to fifth metatarsals displaced (laterally, or with the first metatarsal)" (was "(laterally or dorsoplantar)"). |
| MY-2 (item 21) | B2: lateral displacement of one or more of metatarsals 2–5, first TMT joint preserved; not all four required. Diebal: "Lateral dislocations—involving any of the 4 lateral metatarsals"; Tzatzairis: "Lateral dislocation involving any of the M2-M4"; Cureus 2025: "B2, indicating lateral displacement affecting one or more of the lateral four metatarsals (lateral column injury)". No source says in words that the first joint is preserved: the tables list only metatarsals 2 to 5 for B2, and give the first alone to B1 ("Medial dislocation involving only the M1 joint", Tzatzairis), so the page reads it that way. | B2: "one or more of metatarsals 2 to 5 displaced laterally (partial lateral incongruity), with the first tarsometatarsal joint in place" (was "one or more of the lesser metatarsals displaced laterally"). The rule already gave B2 for some or all four with the first in place; unchanged. |
| MY-3 (item 21) | C1 is partial divergence. Tzatzairis: "Divergent, incomplete dislocation involving M1 and some of the lateral metatarsals"; Diebal: "Partial displacement—medial and middle columns". The author's "involving some but not all tarsometatarsal joints" is narrowed to Tzatzairis's anatomy (the first metatarsal medially, some of the lateral metatarsals laterally). | C1: "the first metatarsal displaced medially and some, but not all, of metatarsals 2 to 5 laterally (partial divergence)" (was "... and some of the lesser metatarsals laterally"). C2 now says "metatarsals 2 to 5" for consistency. The calculator option "Some of them" is now "Some, not all four". Rule unchanged; tests pin A, B2 and C1. |
| MY-5 (item 22) | Add type D as a separately labelled later proposal. EFORT 2019: "Recently, the introduction of a fourth category to the Myerson-modified Hardcastle classification has been proposed, which corresponds to the so-called subtle injury of the Lisfranc joint or lesion type D. It is subdivided into D1, distance from the first cuneiform bone (c1) to the second metatarsal (m2) [(c1-m2)] ⩽ 2 mm, does not require surgical fixation; and D2, distance between c1 and m2 > 2 mm, which requires surgical fixation. Type D2 can be purely ligamentous (D2L) or with bone avulsion (D2B)." Weight-bearing, Hammad 2026: "The updated system adds Type D injuries which are nondisplaced and particularly rely on assessment of weight‐bearing stability, as subtle displacement may only become evident under physiologic load". | A note on the Myerson page, after the types table: "A later proposed extension, not part of the original types A to C, adds type D for subtle Lisfranc injuries: D1, a distance of 2 mm or less between the medial (first) cuneiform and the base of the second metatarsal; D2, more than 2 mm, either purely ligamentous (D2L) or with a bony avulsion (D2B). The distance is the medial cuneiform–second metatarsal interval, not the gap between the first and second metatarsals. It does not replace weight-bearing assessment of stability ... This calculator gives types A to C2 only." The calculator does not output D. Both reviews added to the page's references (five in all). The same note is in the foot MRI study, step 3. The treatment clauses (fixation or not) are left out. |

Still open: MY-6 (whether Myerson 1986 names any further pattern) until the paper is read, so the
Myerson page keeps "Unchecked draft".

## The author's decisions, 2026-10-29 (second round)

MY-2 (decision A): B2 should say "alignment", not "in place" or "preserved", and should not say the
first tarsometatarsal joint, capsule or ligaments are intact; a radiograph or CT shows alignment,
not that the joint is uninjured.

New source: Gupta RT, Wadhwa RP, Learch TJ, Herwick SM. Lisfranc injury: imaging findings for this
important but often-missed diagnosis. Curr Probl Diagn Radiol. 2008;37(3):115-126.
doi:10.1067/j.cpradiol.2007.08.012 (PMID 18436111; matched on PubMed and Crossref). The author
found it as a PDF on a university course page
(`smithengineering.queensu.ca/.../11.21.2008_Simon.pdf`); that copy is the journal article as
printed (pages 115 to 126, footed "Curr Probl Diagn Radiol, May/June 2008"), and it was read in full there. The
page cites the journal article, not the URL.

| ID | Decision | Evidence | Change on the page |
|----|----------|----------|--------------------|
| MY-2 (B2) | "B2: lateral displacement of one or more of metatarsals 2–5, with maintained alignment of the first metatarsal with the medial cuneiform." | Gupta, text: "Type B characterizes a partially incongruent injury with further subclassifications of B1 and B2, describing medial dislocation of the first metatarsal and lateral dislocation of the second to fifth metatarsals, respectively." Fig. 7 legend: "The second metatarsal is also displaced laterally relative to the second cuneiform. The alignment of the first metatarsal and first cuneiform appears to be within normal limits ... Selected images from an axial CT scan show lateral displacement of the first metatarsal relative to the first cuneiform (arrow) in addition to fractures described on conventional radiographs. Based on initial radiographs, this would have been classified as a Type B, lateral dislocation. In combination with CT, classification was changed to Type A, or homolateral." Radiographic relationship: "the lateral margin of the first metatarsal should also be aligned with the lateral margin of the medial cuneiform." "One or more" stays from Diebal ("Lateral dislocations—involving any of the 4 lateral metatarsals"); Gupta's own text says "the second to fifth metatarsals". | `myersonDescriptions.B2` is now "lateral displacement of one or more of metatarsals 2 to 5, with maintained alignment of the first metatarsal with the medial cuneiform" (was "one or more of metatarsals 2 to 5 displaced laterally (partial lateral incongruity), with the first tarsometatarsal joint in place"; "2 to 5" kept for consistency with C1 and C2). It feeds the Myerson page's result, table and impression and the foot MRI study's table, field and impression. The calculator's first-metatarsal option "In place" is now "Aligned with the medial cuneiform". Gupta is added to the Myerson page's references (six in all) and its source note, and to the foot MRI study. The rule is unchanged. Test pins the B2 sentence and that it says neither "intact", "in place" nor "preserved". |

Not added to the page: Gupta's Fig. 7 case (a type B on radiographs reclassified as type A once CT
showed the first metatarsal displaced laterally) would support a caveat that radiographs can miss
first-metatarsal displacement; the author may want it on the Myerson page.

MY-6 is still open (Myerson 1986 unread), so the Myerson page keeps "Unchecked draft".
