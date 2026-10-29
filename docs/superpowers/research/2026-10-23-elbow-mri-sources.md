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

## Fifth check, 2026-10-29: open sources

The publisher pages were tried again: Broberg and Morrey 1987 is "PDF Only" on the Ovid/LWW page
(abstract read: it names Mason types 2 and 3 but no thresholds), O'Driscoll 1992 and Kobayashi 2004
show only their abstracts there, and RSNA (E10, E15), SAGE (E9) and Springer (E8) refused the request
(403 or a browser challenge). Every quote below was read in the open full text in Europe PMC
(`fullTextXML`). Three reviews are now cited beside the originals: van der Windt AE, Langenberg LC,
Colaris JW, Eygendaal D. EFORT Open Rev. 2024;9(5):413-421. doi:10.1530/EOR-24-0035 (PMC11099579);
Lombardi A, Ashir A, Gorbachova T, Taljanovic MS, Chang EY. Pol J Radiol. 2020;85:440-460.
doi:10.5114/pjr.2020.98691 (PMC7509698); Sampath SC, Sampath SC, Bredella MA. Sports Health.
2013;5(1):34-49. doi:10.1177/1941738112467941 (PMC3548664).

| ID | Verdict | Evidence |
|----|---------|----------|
| MA-5, MA-6 | yes (cited beside Broberg and Morrey 1987); **for the author** on the gap | van der Windt 2024, body text: "In 1987, Broberg and Morrey modified the Mason classification with the suggestion that a partial radial head fracture must be of sufficient size (at least 30% of the articular surface) and displacement (at least 2 mm) to be considered a displaced fracture (Mason type II, as opposed to nondisplaced Mason type I) (15)"; ref 15 is Broberg and Morrey, Clin Orthop Relat Res 1987;216:109-119. Type I under 2 mm also: "Isolated nondisplaced or minimally displaced (<2 mm) fractures". For the author: by this wording a fragment displaced 2 mm or more but under 30% of the head is not "displaced", so type I; the site leaves it undecided (the Mason page: "falls outside those numbers"; `brobergMorrey` returns undefined; the study's chip "Not decided by the 2 mm and 30% thresholds"). Another review (Swensen et al., J Orthop Traumatol 2019, PMC6431334) words it "(> 2 mm)" and "(≥ 30% of the articular surface)", credited to Morrey; not used. |
| E2-1 | yes | MA-1 to MA-6 are now all checked (MA-1 to MA-4 in the second check). |
| E1-1 (stages) | LUCL first: yes, cited. Stage 2 capsule: partly; **for the author** | Lombardi 2020: "First, there is a lesion of the LUCL, with or without RCL injury, which leads to posterior subluxation of the elbow. An additional anterior joint capsule injury causes increased posterolateral subluxation. The final stages of PLRI include lesions of the UCL and flexor-pronator muscle bulk"; its Table 2 (O'Driscoll classification): "1 LUCL lesion; 2 LUCL + Anterior joint capsule lesion; 3a ... + MCL posterior bundle lesion; 3b Stage 3a + MCL anterior bundle lesion". The page's learn text says the LUCL fails first, "then the rest of the lateral side with the anterior and posterior capsule". The reviews differ on the posterior capsule: Lombardi and Englert et al. (Adv Orthop 2013, PMC3818812: "Stage 2 includes the disruption of the anterior capsule") name the anterior capsule only; Laumonerie and Mansat (JSES Int 2023;7(6):2565-2568, PMC10638559): "Stage 2 corresponded to the perched elbow related to the rupture of the LCL complex associated with the injury of the elbow capsule (anterior and/or posterior)". Lombardi is cited beside O'Driscoll on "After a dislocation, the LUCL is the first structure to fail" and in the quiz explanation; the learn sentence with the capsule is unchanged and uncited. Settling it needs O'Driscoll 1992 itself. |
| E2-4 | partly; **for the author** | "Focal": Sampath 2013: "OCD, by contrast, is an acquired focal lesion of bone and cartilage, most often affecting the capitellum"; it "typically affects older children (12-16 years)". "Fragmentation of the whole capitellum" is hedged in the open sources: Dwek (Sports Health 2012;4(5):442-452, PMC3435948): "Subchondral linear lucency and frank fragmentation is common. In contradistinction to Legg-Calve Perthes disease of the femoral head, at the smaller capitellum the entire ossific center is usually involved", in "individuals less than about 12 years old"; Sampath: Panner "usually affects boys from 7 to 12 years of age", with signal change "in a geographic region of the capitellum", and "progresses to sclerosis and fragmentation"; Lombardi: "boys from 4 to 10 years" and "Usually there is no bone fragment, and the cartilage remains intact, helping to further differentiate it from osteochondritis dissecans". The page ("fragmentation of the whole capitellum in children younger than about 10") is unchanged and no review is added. |
| E2-6 | partly (unchanged); **for the author**: capitellum-specific cartilage signs found | Kohyama et al., Orthop J Sports Med 2018;6(9):2325967118794620, doi:10.1177/2325967118794620 (PMC6136112), 81 surgically treated elbow OCD lesions: "stage 1, normal-shaped capitellum and articular cartilage without signal intensity change; stage 2, normal-shaped capitellum and articular cartilage with signal intensity change; stage 3, irregular-shaped capitellum and discontinuity of the articular cartilage; and stage 4, dislocated lesion with an articular cartilage defect"; "we consider stages 1 and 2 stable lesions and stages 3 and 4 unstable lesions". Kostyun et al., Orthop J Sports Med 2024;12(6):23259671241252813, doi:10.1177/23259671241252813 (PMC11155329), a Delphi consensus on capitellar OCD: "cartilage and subchondral bone disruption, displaced progeny bone, high signal beneath the cartilage, and intra-articular loose bodies were MRI characteristics that suggested a lesion is more likely to be unstable". Powell et al., Curr Rev Musculoskelet Med 2021;14(3):214-223, doi:10.1007/s12178-021-09702-x (PMC8137781), of elbow osteochondral lesions ("most commonly in the capitellum"): "an unstable fragment is indicated by fluid signal or cystic change interposed between the fragment and parent bone, sclerosis, fragmentation, and disruption of the overlying cartilage". |
| E3-1 | main valgus restraint: yes, cited. "Edema around intact fibres": partly; **for the author** | Lombardi 2020: "The anterior bundle serves as the main restraint to valgus overload to the elbow"; it shows "Partial-thickness tear" and "Full-thickness tear of the anterior bundle" and speaks of "complete disruption of the anterior bundle of the UCL or those with incomplete tears". The page's option "edema around intact fibres" is not stated as such; the nearest is Acosta Batlle et al. (Insights Imaging 2019;10:43, PMC6447645): "Grade I sprain: MR imaging shows increased signal intensity within the ligament on T1- and T2-w images", with "periligamentous edema" a secondary sign of a partial lesion. |
| E8-1 | yes, cited | Sampath 2013: "Evaluation of the elbow on MRI must include careful examination of the muscles and tendons of the 4 major muscle groups: medial, lateral, anterior, and posterior"; "The anterior muscle compartment includes the biceps brachii and brachialis ... the posterior group comprises the triceps tendon"; the triceps "usually tears at its insertion onto the olecranon process of the ulna". |
| E9-1 | yes, cited | Sampath 2013: "Abnormal nerves can have a variety of appearances at MRI, including focal or diffuse enlargement, high T2 signal, and swelling or indistinctness of the fascicles"; "Look for associated denervation changes in muscles to guide assessment of the related nerves". Lombardi 2020: ulnar neuropathy "may show secondary signs of muscle denervation in the territory of the ulnar nerve (e.g. oedema or atrophy in the flexor muscles of the forearm and hand)"; denervation is "characterised by muscle oedema in acute and subacute stages, and muscle atrophy in advanced stages". |
| E11-1 | no (unchanged); **for the author**: replacement found | Sampath 2013 (now in the references for E8-1 and E9-1): "In approximately 10% to 20% of individuals, the retinaculum is replaced by an accessory muscle, the anconeus epitrochlearis (see Figure 4f), which may cause static or dynamic compression of the ulnar nerve within the tunnel"; Fig. 4f: "anconeus epitrochlearis (white arrow), an accessory muscle of the posterior compartment. Note the proximity to the ulnar nerve (black arrow), which can be compressed by the muscle, leading to cubital tunnel syndrome." Lombardi 2020 (also now in the references): "The anconeus epitrochlearis, an accessory muscle at the posteromedial aspect of the elbow that runs from the medial epicondyle to the olecranon ..., has been implicated as a cause of external compression of the ulnar nerve [93,94]. This anatomical variant, however, was also found in 23% of asymptomatic patients". The four places that cite E17 are unchanged. |

E2-5, E3-2 and E6-1 were rewritten to their abstracts' wording on 2026-10-23, so nothing in them is
left unread. Still needing the paper itself: O'Driscoll 1992 (which capsule fails at stage 2) and
Kobayashi 2004 (the Panner wording); both are behind the LWW/Ovid page.

## The author's decisions, 2026-10-29

The author settled E1-1, E2-4, E2-6, E3-1, E11-1 and MA-5/MA-6. Every quote below was read on
2026-10-29: in open full text from Europe PMC (`fullTextXML`), except Kim et al. 2019, read in the
PubMed/PMC abstract (the publisher blocks the full-text XML). Each new reference was matched on
Crossref by its DOI. Camp, Smith and O'Driscoll (Arthrosc Tech 2017, PMC5443138), suggested for
E1-1, could not be read: Europe PMC returned an error, the NCBI copy is abstract-only (the abstract
does not give the stages) and the Wiley and journal pages answered with a browser challenge. It is
not cited; Acosta Batlle et al. state the same thing. With these decisions nothing on the page is
left unchecked, so the study's "Unchecked draft" note is gone.

New references (all cited in `src/studies/ElbowMriStudy.tsx`; Swensen on the Mason page only):

- Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. The elbow: review of anatomy and common collateral ligament complex pathology using MRI. Insights Imaging. 2019;10(1):43. doi:10.1186/s13244-019-0725-7 (PMC6447645)
- Kohyama S, Ogawa T, Mamizuka N, Hara Y, Yamazaki M. A magnetic resonance imaging-based staging system for osteochondritis dissecans of the elbow: a validation study against the International Cartilage Repair Society classification. Orthop J Sports Med. 2018;6(9):2325967118794620. doi:10.1177/2325967118794620 (PMC6136112)
- Kostyun RO, Nguyen JC, Chhabra B, Lawrence JTR, Polousky JD, Saper M, Uquillas C, Nissen CW; ROCKET Group. MRI features that contribute to decision-making for treatment of capitellar OCD lesions: an expert consensus using the Delphi method. Orthop J Sports Med. 2024;12(6):23259671241252813. doi:10.1177/23259671241252813 (PMC11155329). PubMed and Crossref index the fourth author as "Todd R Lawrence J"; he is J. Todd R. Lawrence.
- Powell GM, Murthy NS, Johnson AC. Radiographic and MRI assessment of the thrower's elbow. Curr Rev Musculoskelet Med. 2021;14(3):214-223. doi:10.1007/s12178-021-09702-x (PMC8137781)
- Dwek JR. A segmental approach to imaging of sports-related injuries of the pediatric elbow. Sports Health. 2012;4(5):442-452. doi:10.1177/1941738112448733 (PMC3435948)
- Claessen FM, Louwerens JK, Doornberg JN, van Dijk CN, Eygendaal D, van den Bekerom MP. Panner's disease: literature review and treatment recommendations. J Child Orthop. 2015;9(1):9-17. doi:10.1007/s11832-015-0635-2 (PMC4340849)
- Kim N, Stehr R, Matloub HS, Sanger JR. Anconeus epitrochlearis muscle associated with cubital tunnel syndrome: a case series. Hand (N Y). 2019;14(4):477-482. doi:10.1177/1558944718762566 (PMC6760074)
- Swensen SJ, Tyagi V, Uquillas C, Shakked RJ, Yoon RS, Liporace FA. Maximizing outcomes in the treatment of radial head fractures. J Orthop Traumatol. 2019;20(1):15. doi:10.1186/s10195-019-0523-5 (PMC6431334)

Removed: E17 (Rosenberg et al., AJR 1995), which was cited only for the anconeus epitrochlearis and
never mentions it. The study now has 27 references.

| ID | Decision | Change on the page |
|----|----------|--------------------|
| E2-6 | Keep the cartilage signs of instability; cite the capitellar sources beside Kijowski and De Smet, and say they are different kinds of evidence. | Learn text: unstable signs are fluid undermining the fragment, a rim of high T2 signal at the interface or a cyst beneath it (E16; Powell: "an unstable fragment is indicated by fluid signal or cystic change interposed between the fragment and parent bone, sclerosis, fragmentation, and disruption of the overlying cartilage"), disruption of the overlying cartilage or the subchondral bone plate, a displaced fragment and loose bodies (Kostyun, an expert Delphi consensus: "cartilage and subchondral bone disruption, displaced progeny bone, high signal beneath the cartilage, and intra-articular loose bodies were MRI characteristics that suggested a lesion is more likely to be unstable"; its table lists "Cartilage disruption", "Subchondral bone disruption", "Displaced progeny bone", "High signal fluid beneath the cartilage", "Loose bodies"). Kohyama, separately, as an MRI staging tested against the grade at surgery (81 lesions): "stage 3, irregular-shaped capitellum and discontinuity of the articular cartilage; and stage 4, dislocated lesion with an articular cartilage defect"; "we consider stages 1 and 2 stable lesions and stages 3 and 4 unstable lesions". Option added to "Signs around the fragment": "Subchondral bone plate disrupted". |
| E11-1 | Cite Sampath instead of Rosenberg 1995 in all four places; keep "may", since the muscle is often incidental. | Learn (step 9), variants learn text, variants teach line and quiz now cite Sampath: "In approximately 10% to 20% of individuals, the retinaculum is replaced by an accessory muscle, the anconeus epitrochlearis (see Figure 4f), which may cause static or dynamic compression of the ulnar nerve within the tunnel." Step 9, the teach line and the quiz add Kim et al. (abstract): "An anomalous anconeus epitrochlearis occasionally results in compression of the ulnar nerve but is usually an incidental finding." The quiz stem is now "takes the place of the cubital tunnel retinaculum" (was "lies over the cubital tunnel"). ROSENBERG_TUNNEL removed from the references. |
| E1-1 | Stage 2: the disruption extends into the capsule, anterior and posterior, with a perched (incomplete) dislocation. | Learn text: stage 1 LUCL with posterolateral subluxation (O'Driscoll 1992; Lombardi), stage 2 into the radial collateral ligament and both the anterior and the posterior capsule, the elbow incompletely dislocated with the coronoid perched under the trochlea (O'Driscoll 1992; Acosta Batlle: "In stage 2, the elbow dislocates incompletely, so that the coronoid process is perched under the trochlea. The RCL, and the anterior and posterior articular capsule are disrupted, in addition to the LUCL"). Also read and in agreement, not cited: Laumonerie and Mansat (PMC10638559), "the perched elbow related to the rupture of the LCL complex associated with the injury of the elbow capsule (anterior and/or posterior)"; Open Orthop J 2017 (PMC5721315), "additional disruption to the capsule both anteriorly and posteriorly resulting in an incomplete posterolateral dislocation with the coronoid perched on the trochlea". Rules unchanged. |
| E2-4 | Panner: the entire ossification centre is typically involved; fragmentation is variable, not obligatory. | Learn text, capitellum option ("Diffuse involvement of the whole capitellum (Panner)", was "Fragmentation of the whole capitellum"), chip ("Typically under 10 years; usually the whole ossification centre"), report line, impression ("Diffuse involvement of the whole capitellum, as in Panner's disease.") and quiz ("An 8-year-old has diffuse involvement of the whole capitellum"). Sources: Dwek: "at the smaller capitellum the entire ossific center is usually involved"; Claessen (23 case reports, 30 patients): irregularity of the capitellum's texture in 13 patients (43 %), contour irregularity 7 (23 %), "Flattening of the humeral capitellum was reported in three patients (10 %)", "fragmentation of the capitellum was seen in six case reports (27 %)", "Sclerosis of the humeral capitellum was presented in seven patients (23 %)". Claessen does not say "entire", so that part is cited to Dwek. OCD as "focal" now also cites Sampath: "OCD, by contrast, is an acquired focal lesion of bone and cartilage". |
| E3-1 | Keep the finding but call it a low-grade sprain, not a tear. | The UCL now has its own option set: "Low-grade sprain (edema around intact fibres)" (was "Edema around intact fibres"; the LUCL and radial collateral ligament keep the old set). Impression: "Low-grade sprain of the UCL: edema around otherwise intact fibres." A UCL sprain with the "No ligament injury" negative now raises the contradiction warning. Learn text cites Powell: "Periligamentous edema with otherwise intact ligament fibers is consistent with a low-grade sprain in the appropriate clinical setting"; and, for the partial tear, Acosta Batlle: "Partial-thickness tear or grade II sprain: MR imaging demonstrates focal partial discontinuity of ligament fibers with hyperintense fluid signal extending partially through the ligament", and Powell: "partial thickness tears can be identified with fluid signal interposed between disrupted ligament fibers". |
| MA-5, MA-6 | Name the modification: under Broberg-Morrey, type II needs at least 2 mm and at least 30%, so a smaller fragment displaced 2 mm or more is type I. Don't generalise to every version of Mason; keep displacement, surface and a mechanical block separate. | `brobergMorrey` returns I for ≥ 2 mm with < 30% (was undefined); undefined only while the share is missing. The study chip then reads "Enter the share of the articular surface" (was "Not decided by the 2 mm and 30% thresholds"); the field is "Share of the articular surface involved". The Mason page names the "Broberg-Morrey modification" in the result and the impression, records displacement, articular surface and a mechanical block to forearm rotation as separate findings (the block never changes the type), and says the Hotchkiss modification words type II differently. Sources: van der Windt: "a partial radial head fracture must be of sufficient size (at least 30% of the articular surface) and displacement (at least 2 mm) to be considered a displaced fracture (Mason type II, as opposed to nondisplaced Mason type I)"; "Displacement (>2 mm) of fragments in radial head fractures without a mechanical block to pronation/supination is not a clear indication for surgery"; "There is consensus in the literature and among surgeons that a mechanical block to rotation is a clear indication for surgery". Swensen: "According to the Hotchkiss modification, ... Type II fractures are displaced ≥ 2 mm or block forearm rotation". The suggested "smaller peripheral rim fragment" was not used: van der Windt speaks of a "partial radial head fracture", not a rim fragment. |
