# Elbow MRI study and Mason calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: references matched, claims partly verified (2026-10-23)

The pages were drafted from memory in a cloud session that could not reach PubMed. They were
checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esearch`/`esummary`), its DOI resolved on Crossref
(by DOI, or by bibliographic search where PubMed has none), and a claim marked verified only
when its wording was read in the PubMed abstract or in open full text.

- All 17 references were found. Two citations needed correcting (see the notes): E8's DOI and
  E9, which is the wrong one of two companion Timmerman papers for the claim it backs.
- Mason 1954 (E1) and Johnston 1962 (E2) have no abstract in PubMed. Johnston is in PMC
  (PMC2384652), but only as page scans, and both PMC (a browser challenge) and Europe PMC
  (403) refused the PDF, so it was not read. Unpaywall refused the placeholder address, so
  open copies were looked for in Europe PMC instead: none of the other papers is in PMC, and
  the AJR PDF links it lists (E16, E17) return 403, as do the RSNA pages. Everything else here
  was read in the PubMed abstract only.
- Nothing was found WRONG outright, but four claims go further than, or differ from, what
  their paper says (E1-1, E2-5, E3-2, E6-1): marked "for the author" below.
- By the author's decision (2026-10-23), claims that could not be verified stay on the page,
  marked unchecked, with the page's "Unchecked draft" note, until they are checked.

The author chose (2026-10-23): add the DOIs now and switch the citations to `<Cite doi>` links,
keep the claims no abstract states, with the "Unchecked draft" note, until they are checked;
rewrite every claim marked "for the author" to its paper's wording (changing a rule where the
paper's boundary differs); and apply every citation correction. Done in the code the same day:
every reference but Johnston (no DOI anywhere) has its `doi`, the source notes say the
references are matched and name what is still unchecked, `ElbowMriStudy.test.ts` pins a DOI on
every reference but Johnston, and the Timmerman and Andrews paper is added as E9a. The
rewritten claims are under "Changes made" at the end.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| E1 | Mason ML. Some observations on fractures of the head of the radius with a review of one hundred cases. Br J Surg. 1954;42(172):123-132. | 13209035 | 10.1002/bjs.18004217203 | No abstract |
| E2 | Johnston GW. A follow-up of one hundred cases of fracture of the head of the radius with a review of the literature. Ulster Med J. 1962;31(1):51-56. | 14452145 | none (PMC2384652) | No abstract; PMC scan not read |
| E3 | Broberg MA, Morrey BF. Results of delayed excision of the radial head after fracture. J Bone Joint Surg Am. 1986;68(5):669-674. | 3722222 | 10.2106/00004623-198668050-00005 | Abstract |
| E4 | Regan W, Morrey B. Fractures of the coronoid process of the ulna. J Bone Joint Surg Am. 1989;71(9):1348-1354. | 2793888 | 10.2106/00004623-198971090-00011 | Abstract |
| E5 | Ring D, Jupiter JB, Zilberfarb J. Posterior dislocation of the elbow with fractures of the radial head and coronoid. J Bone Joint Surg Am. 2002;84(4):547-551. | 11940613 | 10.2106/00004623-200204000-00006 | Abstract |
| E6 | O'Driscoll SW, Bell DF, Morrey BF. Posterolateral rotatory instability of the elbow. J Bone Joint Surg Am. 1991;73(3):440-446. | 2002081 | 10.2106/00004623-199173030-00015 | Abstract |
| E7 | O'Driscoll SW, Morrey BF, Korinek S, An KN. Elbow subluxation and dislocation. A spectrum of instability. Clin Orthop Relat Res. 1992;(280):186-197. | 1611741 | 10.1097/00003086-199207000-00024 | Abstract |
| E8 | Kijowski R, Tuite M, Sanford M. Magnetic resonance imaging of the elbow. Part II: Abnormalities of the ligaments, tendons, and nerves. Skeletal Radiol. 2005;34(1):1-18. | 15480640 | 10.1007/s00256-004-0854-y | Abstract |
| E9 | Timmerman LA, Schwartz ML, Andrews JR. Preoperative evaluation of the ulnar collateral ligament by magnetic resonance imaging and computed tomography arthrography. Evaluation in 25 baseball players with surgical confirmation. Am J Sports Med. 1994;22(1):26-31. | 8129106 | 10.1177/036354659402200105 | Abstract |
| E9a | Timmerman LA, Andrews JR. Undersurface tear of the ulnar collateral ligament in baseball players. A newly recognized lesion. Am J Sports Med. 1994;22(1):33-36. (Added 2026-10-23 for E3-2.) | 8129107 | 10.1177/036354659402200106 | Abstract |
| E10 | Potter HG, Hannafin JA, Morwessel RM, DiCarlo EF, O'Brien SJ, Altchek DW. Lateral epicondylitis: correlation of MR imaging, surgical, and histopathologic findings. Radiology. 1995;196(1):43-46. | 7784585 | 10.1148/radiology.196.1.7784585 | Abstract |
| E11 | Bredella MA, Tirman PF, Fritz RC, Feller JF, Wischer TK, Genant HK. MR imaging findings of lateral ulnar collateral ligament abnormalities in patients with lateral epicondylitis. AJR Am J Roentgenol. 1999;173(5):1379-1382. | 10541124 | 10.2214/ajr.173.5.10541124 | Abstract |
| E12 | Kijowski R, De Smet AA. Magnetic resonance imaging findings in patients with medial epicondylitis. Skeletal Radiol. 2005;34(4):196-202. | 15711999 | 10.1007/s00256-005-0896-9 | Abstract |
| E13 | Falchook FS, Zlatkin MB, Erbacher GE, Moulton JS, Bisset GS, Murphy BJ. Rupture of the distal biceps tendon: evaluation with MR imaging. Radiology. 1994;190(3):659-663. | 8115606 | 10.1148/radiology.190.3.8115606 | Abstract |
| E14 | Kobayashi K, Burton KJ, Rodner C, Smith B, Caputo AE. Lateral compression injuries in the pediatric elbow: Panner's disease and osteochondritis dissecans of the capitellum. J Am Acad Orthop Surg. 2004;12(4):246-254. | 15473676 | 10.5435/00124635-200407000-00005 | Abstract |
| E15 | Rosenberg ZS, Beltran J, Cheung YY. Pseudodefect of the capitellum: potential MR imaging pitfall. Radiology. 1994;191(3):821-823. | 8184072 | 10.1148/radiology.191.3.8184072 | Abstract |
| E16 | Kijowski R, De Smet AA. MRI findings of osteochondritis dissecans of the capitellum with surgical correlation. AJR Am J Roentgenol. 2005;185(6):1453-1459. | 16303997 | 10.2214/AJR.04.1570 | Abstract |
| E17 | Rosenberg ZS, Beltran J, Cheung Y, Broker M. MR imaging of the elbow: normal variant and potential diagnostic pitfalls of the trochlear groove and cubital tunnel. AJR Am J Roentgenol. 1995;164(2):415-418. | 7839980 | 10.2214/ajr.164.2.7839980 | Abstract |

Notes on the set:

- E8: the draft's candidate DOI ended `-x`; PubMed and Crossref give
  `10.1007/s00256-004-0854-y`. Crossref dates it 2004 (online 5 Oct 2004); the print issue is
  2005;34(1), which the page keeps.
- E9: the citation is right, but it is the companion paper. The undersurface tear as a lesion
  is described in Timmerman LA, Andrews JR. Undersurface tear of the ulnar collateral
  ligament in baseball players. A newly recognized lesion. Am J Sports Med. 1994;22(1):33-36
  (PMID 8129107, DOI 10.1177/036354659402200106). E9 itself describes the CT arthrography
  "T-sign". See E3-2; whether to add or swap the reference is for the author.
- E9: PubMed gives pages 26-31 with the discussion on 32; Crossref gives 26-32. The page keeps
  26-31.
- E1, E3-E7: the draft expected no DOIs; Crossref has them (Br J Surg via Wiley, JBJS and CORR
  back issues). E2 (Ulster Med J 1962) has none on Crossref; it is in PMC only.
- E3: the abstract mentions only "Mason type-II and seventeen Mason type-III fractures"; the
  2 mm and 30% thresholds are not in it (see MA-5, MA-6). The draft's own note already doubted
  that this paper states them. The other Broberg-Morrey paper in PubMed is "Results of
  treatment of fracture-dislocations of the elbow", Clin Orthop Relat Res. 1987;(216):109-119
  (PMID 3102139); its abstract was not checked for the thresholds.
- E2 (Johnston): the PubMed record has no abstract and the PMC copy is a page scan that could
  not be downloaded (PMC answers with a browser challenge, Europe PMC with 403). MA-4 stays
  unchecked.

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Mason calculator (also used by step 2)

Types I–III are Mason's own (1954). Type IV is Johnston's later addition (1962); the
four-type scheme in common use is that modified version, and the page and study say so. The
Broberg-Morrey numbers are a further, separate modification.

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| MA-1 | Mason type I is a fissure or marginal fracture without displacement. | undisplaced → I | E1 | no: E1 has no abstract in PubMed and no open copy. Kept, unchecked. |
| MA-2 | Mason type II is a marginal sector fracture with displacement. | displaced marginal → II | E1 | no: as MA-1. Kept, unchecked. |
| MA-3 | Mason type III is a comminuted fracture involving the whole head. | comminuted → III | E1 | no: as MA-1. Kept, unchecked. |
| MA-4 | Johnston added type IV: a radial head fracture with dislocation of the elbow. | dislocation → IV, whatever the pattern | E2 | no: E2 has no abstract; its PMC copy (PMC2384652) is a page scan that could not be read. Kept, unchecked. |
| MA-5 | Broberg and Morrey: type I is displaced less than 2 mm. | < 2 mm → I | E3 | no: not in the E3 abstract, which names only "four Mason type-II and seventeen Mason type-III fractures" (full text paywalled). Kept, unchecked. |
| MA-6 | Broberg and Morrey: type II is displaced 2 mm or more and involves 30% or more of the head. | ≥ 2 mm and ≥ 30% → II; ≥ 2 mm and < 30% left undecided | E3 | no: as MA-5. Kept, unchecked. |

Note for the check: MA-5 and MA-6 are commonly quoted from Broberg and Morrey 1986, but the
paper is about delayed excision; confirm the thresholds are stated there (they may come from a
later Morrey text instead). The handling of a fragment displaced 2 mm or more but under 30% of
the head (no type) is this site's own choice, since the thresholds do not cover it.

### Step 1: history, technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E1-1 | Elbow subluxation and dislocation are a spectrum in which soft tissues fail in a ring from lateral to medial: stage 1 the LUCL (posterolateral subluxation); stage 2 the other lateral structures and the anterior and posterior capsule; stage 3 the medial side. | after dislocation: chip; UCL torn with LUCL intact → warning | E7 | partly. E7 abstract: "Dislocation is the final of three sequential stages of elbow instability resulting from posterolateral rotation, with soft-tissue disruption progressing from lateral to medial." The structures in each stage are not in the abstract. For the author: the abstract also says dislocation occurred "in 12 of the 13 with the anterior medical [sic] collateral ligament (AMCL) intact", so "stage 3 the medial side" should not be read as the anterior bundle being torn in every dislocation. |

The protocol checklist (three planes, fat-suppressed PD or T2, a T1) is the site's own and is
presented as such, with no citation.

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E2-1 | Mason types (see MA-1 to MA-6). | — | E1, E2, E3 | no: see MA-1 to MA-6. Kept, unchecked. |
| E2-2 | Regan and Morrey coronoid types: I avulsion of the tip; II a fragment of 50% of the coronoid or less; III a fragment of more than 50%. | tip → I; ≤ 50% → II; > 50% → III | E4 | yes. E4 abstract: "Type I--avulsion of the tip of the process; Type II--a fragment involving 50 per cent of the process, or less; and Type III--a fragment involving more than 50 per cent of the process." |
| E2-3 | Posterior dislocation of the elbow with fractures of the radial head and coronoid (the "terrible triad"). Confirm the paper uses that name or whether it should be attributed to Hotchkiss. | dislocation + radial head + coronoid → chip and impression line | E5 | yes. E5 abstract: "Posterior dislocation of the elbow with associated fractures of the radial head and the coronoid process of the ulna has been referred to as the "terrible triad of the elbow" because of the difficulties encountered in its management." The paper uses the name as an existing one; who coined it is not in the abstract. |
| E2-4 | Panner's disease is fragmentation of the whole capitellum in children younger than about 10; osteochondritis dissecans is a focal capitellar lesion in adolescents, typically throwers and gymnasts. | descriptive chips | E14 | partly. E14 abstract: "Lateral compression injuries of the elbow typically occur in throwing athletes and gymnasts"; "Panner's disease, an osteochondrosis of the capitellum, is a rare disorder that usually affects the dominant extremity in individuals younger than age 10 years"; "Osteochondritis dissecans of the capitellum typically occurs in adolescents". "Fragmentation of the whole capitellum" and "focal" are not in the abstract. |
| E2-5 | The pseudodefect of the capitellum is a normal groove at the posterior capitellum, where it meets the lateral epicondyle, that can mimic an osteochondral lesion. | OCD at the posterior capitellum → warning | E15 | partly. E15 abstract: "the pseudodefect of the distal humerus at the junction of the capitellum and lateral epicondyle, which may simulate an osteochondral lesion on axial and coronal magnetic resonance (MR) images" and "A groove at the junction and the overhanging lateral edges of the capitellum account for the appearance". For the author: "posterior" is not in the abstract, and the warning's trigger (OCD at the posterior capitellum) rests on that word. |
| E2-6 | MRI judges capitellar OCD stability from the fragment-bone interface and the overlying cartilage. | descriptive only, no chip | E16 | partly. E16 abstract: "Unstable osteochondritis dissecans lesions are surrounded by a rim of high signal intensity or a fluid-filled cyst on T2-weighted images. Stable osteochondritis dissecans lesions show no surrounding signal abnormality on T2-weighted images." The interface is stated; the overlying cartilage is not in the abstract. |

### Step 3: ulnar collateral ligament

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E3-1 | The anterior bundle of the UCL is the main restraint to valgus; describe it as intact, partially or completely torn. | descriptive | E8 | partly. E8 abstract: "Magnetic resonance imaging can detect tears of the ulnar collateral ligament and lateral collateral ligament of the elbow with high sensitivity and specificity." The anterior bundle as the main valgus restraint is not in the abstract (full text paywalled). |
| E3-2 | An undersurface partial tear of the UCL at the sublime tubercle: deep fibres detached, superficial fibres intact, giving a "T" when contrast tracks along the bone. Timmerman described it on CT arthrography; check whether it also describes the MRI appearance. | undersurface type → chip | E9 | partly, for the author. E9 abstract: "A newly described "T-sign" was seen on the computed tomography arthrogram in the patients with an undersurface tear of the ulnar collateral ligament. This represented the dye leaking around the detachment of the ulnar collateral ligament from its bony insertion but remaining contained within the intact superficial layer of the ulnar collateral ligament and capsule." and "The main advantage of the computed tomography arthrogram was in evaluating the partial undersurface tear." The sign is a CT arthrography sign, not an MRI one, and the sublime tubercle is not named. The companion paper (PMID 8129107, see the notes) says "Six of the seven patients had a normal magnetic resonance imaging scan" and that the detachment was "at the ulna or the humerus". |

### Step 4: lateral collateral complex

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E4-1 | Insufficiency of the lateral ulnar collateral ligament is the lesion of posterolateral rotatory instability. | LUCL partial or complete tear → chip | E6 | yes. E6 abstract: "The cause for this condition, we think, is laxity of the ulnar part of the lateral collateral ligament, which allows a transient rotatory subluxation of the ulnohumeral joint" and "Operative repair of the lax ulnar part of the lateral collateral ligament eliminated the posterolateral rotatory instability". |

### Steps 5 and 6: flexor and extensor origins

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E5-1 | Medial epicondylitis shows abnormal (increased) signal in the common flexor tendon. | descriptive | E12 | yes. E12 abstract: "MR imaging findings of patients with clinically diagnosed medial epicondylitis included thickening and increased T1 and T2 signal intensity of the common flexor tendon and soft tissue edema around the common flexor tendon." |
| E6-1 | In lateral epicondylitis, the common extensor tendon is thickened with increased signal, and MRI findings correlated with surgical and histopathological findings. | descriptive | E10 | partly, for the author. E10 abstract: "Findings at MR imaging correlated with the surgical findings of primary degeneration of the extensor carpi radialis brevis" and "The definition of tendon degeneration and degree of tear, as depicted on MR images, correlate well with surgical and histologic findings." The correlation is stated; "thickened with increased signal" is not in the abstract, and the paper speaks of the extensor carpi radialis brevis rather than the common extensor tendon. |
| E6-2 | LUCL abnormalities (thickening, tears) are found in patients with lateral epicondylitis. | abnormal extensor origin → chip "recheck the LUCL" | E11 | yes. E11 abstract: "MR imaging features of lateral epicondylitis were often associated with thickening and tears of the lateral ulnar collateral ligament." (All nine with severe lateral epicondylitis had LUCL abnormalities.) |

### Steps 7 and 8: distal biceps, triceps and brachialis

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E7-1 | MRI distinguishes partial from complete rupture of the distal biceps tendon. The retraction measurement is descriptive; no threshold is cited. | descriptive | E13 | yes. E13 abstract: "MR imaging helped confirm distal biceps tendon ruptures because it distinguished complete from partial ruptures and other entities that may mimic ruptures." |
| E8-1 | The triceps and brachialis are part of the review of elbow tendons. | descriptive | E8 | partly. E8 abstract: "Magnetic resonance imaging can detect tears of the biceps tendon and triceps tendon and can distinguishing between partial and complete tendon rupture." The brachialis is not in the abstract. |

### Step 9: nerves

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E9-1 | An abnormal nerve at the elbow is enlarged with increased T2 signal, and muscles it supplies may show denervation edema. | descriptive | E8 | partly. E8 abstract: "Magnetic resonance imaging is also helpful in evaluating patients with nerve disorders at the elbow." Enlargement, T2 signal and denervation edema are not in the abstract (full text paywalled). |

### Step 11: variants (impression lines, by the author's decision)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E11-1 | The anconeus epitrochlearis is an accessory muscle over the cubital tunnel that can compress the ulnar nerve. | descriptive | E17 | no: not in the E17 abstract, which covers only the trochlear groove ("Both the constriction of the groove and the nonarticular ridge may simulate disease on MR imaging of the elbow"); the cubital tunnel is in the title only. Full text paywalled. Kept, unchecked. |

The supracondylar process and the os supratrochleare dorsale have no cited claim; they are
recorded as present or absent, each with its own impression line.

Bursae, loose bodies and synovium (step 10) are descriptive, with no cited rule.

## Summary of the check

- Verified (yes): E2-2, E2-3, E4-1, E5-1, E6-2, E7-1.
- Partly verified: E1-1, E2-4, E2-5, E2-6, E3-1, E3-2, E6-1, E8-1, E9-1.
- Not verifiable (no abstract or not in it; kept, unchecked): MA-1 to MA-6, E2-1, E11-1.
- WRONG: none.
- For the author: E1-1 (dislocation with the anterior MCL intact), E2-5 ("posterior" not in
  the paper), E3-2 (a CT arthrography sign; MRI normal in the companion paper), E6-1 (ECRB, not
  "thickened"), and whether to cite PMID 8129107 for the undersurface tear.

## Changes made (2026-10-23, by the author's decision)

- E8: DOI corrected to `10.1007/s00256-004-0854-y`. E9a added (Timmerman and Andrews, PMID
  8129107) as the citation for the lesion itself; E9 stays for the CT arthrography T-sign.
- E1-1: was "the soft tissues fail in a ring from lateral to medial: the LUCL first, then the
  rest of the lateral side and the capsule, the medial side last". Now: dislocation is "the
  final of three sequential stages" of instability from posterolateral rotation, "with
  soft-tissue disruption progressing from lateral to medial", and in O'Driscoll's specimens the
  elbows dislocated with the anterior band of the medial collateral ligament intact, so a
  dislocation does not mean the anterior bundle is torn. The stage-by-stage structures (LUCL
  first) stay in the learn text as the usual teaching, unchecked. The chip and the
  "UCL torn with LUCL intact" warning are unchanged: both follow from lateral-to-medial.
- E2-5: was "at the posterior capitellum, where it meets the lateral epicondyle"; now "at the
  junction of the capitellum and the lateral epicondyle", a groove and the overhanging lateral
  edges of the capitellum that can simulate an osteochondral lesion on axial and coronal
  images. Rule: the lesion-site option "Posterior, at the lateral epicondyle" (`posterior`) is
  now "At the junction with the lateral epicondyle" (`junction`), and the warning fires on it.
  "True osteochondritis dissecans sits more anteriorly" was dropped (no paper states it).
- E3-2: was "an undersurface partial tear at the sublime tubercle ... seen as a 'T' when
  contrast tracks along the bone" (Timmerman et al.). Now: an undersurface tear of the deep
  capsular layer of the anterior bundle, intact externally, detached at the ulna or the
  humerus (E9a); hard to see on MRI, normal in six of seven (E9a); the T-sign is the CT
  arthrography sign, contrast contained within the intact superficial layer and capsule (E9).
  The sublime tubercle is no longer named. Rule: the option is now "Undersurface tear, deep
  layer detached from bone, superficial layer intact", the chip reads "Deep layer detached
  from bone, superficial layer intact" (was "Deep fibres off the sublime tubercle (T-sign)"),
  and the impression says "undersurface (deep layer)". The quiz question now describes the CT
  arthrogram.
- E6-1: was "MRI shows thickening and increased signal in the common extensor tendon". Now:
  MRI correlated with the surgical finding of primary degeneration of the extensor carpi
  radialis brevis, and the tendon degeneration and degree of tear on MRI correlated well with
  surgery and histology (E10); the MRI definition of lateral epicondylitis, increased signal in
  the extensor tendons near the lateral epicondyle, is cited to Bredella (E11), which states it.
  No rule changed.

## Second check, 2026-10-25: papers supplied by the author

Read in full: Johnston 1962 (E2, the author's PDF of the PMC scan), Broberg and Morrey 1986 (E3),
and Iannuzzi NP, Leopold SS. In brief: the Mason classification of radial head fractures. Clin
Orthop Relat Res. 2012;470(6):1799-1802. doi:10.1007/s11999-012-2319-2 (reproduces Mason's Table 1).
Mason 1954 itself is still unread.

| ID | Verdict | Evidence |
|----|---------|----------|
| MA-1 | yes, against Mason's table as reproduced | "Type 1 Fissure or marginal fractures without displacement". Johnston: "Fissure fracture or marginal sector fracture without displacement." |
| MA-2 | yes | "Type 2 Marginal sector fractures with displacement (Segment of the lateral border of the radial head is separated from the other quadrants, is impacted and depressed, or is tilted out of line)". |
| MA-3 | yes | "Type 3 Comminuted fractures involving the whole head of the radius". |
| MA-4 | yes, against Johnston | "Type IV. Fracture of the radial head associated with dislocation of the elbow." Iannuzzi: under the modified scheme "any dislocation of the elbow with a concomitant fracture of the radial head, regardless of ... the original Mason classification ... is considered a Type IV injury". |
| MA-5, MA-6 | no: wrong paper cited | The 1986 paper (read in full) does not state 2 mm or 30%; it only uses Mason types and calls a fracture with dislocation "a type-IV fracture by Johnston". Iannuzzi credits the modification to Broberg MA, Morrey BF. Results of treatment of fracture-dislocations of the elbow. Clin Orthop Relat Res. 1987;(216):109-119. doi:10.1097/00003086-198703000-00017. By the author's choice the thresholds are kept, now cited to the 1987 paper, still unchecked; that paper is on the next list. |

## Third check, 2026-10-28: E16 read in full

E16 (Kijowski and De Smet, AJR 2005) was read in full on the AJR site.

| ID | Verdict | Evidence |
|----|---------|----------|
| E2-6 | partly; **for the author** | The interface half is stated: unstable lesions had "a peripheral ring of high signal intensity" (3 of 4) or "an underlying cyst" (1 of 4) on T2-weighted images; the six stable lesions "had low signal intensity peripherally". The cartilage half is not this paper's finding: "the integrity of the articular cartilage overlying the capitellar osteochondritis dissecans lesions was not assessed", as the thin capitellar cartilage "was poorly visualized". The two cartilage signs (a high-signal line through the cartilage and subchondral plate, a focal articular defect) are quoted from knee and talar dome studies (its refs 14-16), not seen at the capitellum here. The page sentence is unchanged until the author decides. |

Also in E16, not yet on the page: all ten lesions were anterolateral in the capitellum (useful
against the posterior pseudodefect, E2-5), and all six stable lesions had loose bodies at surgery,
so "the elbow joint should be carefully inspected for the presence of an associated
intraarticular loose body".

## Fourth check, 2026-10-28: E17 read in full

E17 (Rosenberg, Beltran, Cheung and Broker, AJR 1995) was read in full in the AJR PDF viewer.

| ID | Verdict | Evidence |
|----|---------|----------|
| E11-1 | no; **for the author** | E17 never mentions the anconeus epitrochlearis. Its cubital tunnel section covers the arcuate ligament ("a low-signal-intensity structure that bridges the cubital tunnel"), ulnar nerve subluxation or dislocation (4 of 27 patients, all incidental; the arcuate ligament absent in 2 of them) and engorged posterior recurrent ulnar veins mimicking a swollen nerve. The page cites E17 for the anconeus epitrochlearis in four places (`src/studies/ElbowMriStudy.tsx`: the lesson, the variants step, the variant teach line and the quiz). Unchanged until the author decides: find another source, or drop the citation. |

Also in E17, not on the page: a transverse trochlear ridge (sagittal MRI, 73% of patients, 81% of
volunteers) and a trochlear-groove pseudodefect (3–7 mm) that can mimic an osteophyte or an
osteochondral fracture; "The absence of a signal change in the adjacent marrow should aid in
recognizing their benign nature." And "improper positioning of the ulnar nerve often is
asymptomatic".
