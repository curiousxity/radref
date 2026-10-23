# Elbow MRI study and Mason calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: nothing here is verified yet

This file was written in a cloud session whose network blocks PubMed, PubMed Central,
Crossref, doi.org and Europe PMC. The author chose (2026-10-23) to draft the pages anyway and
check them later on a computer. So:

- Every reference below was chosen and written **from memory**. Titles, authors, years,
  volumes and pages may be wrong, and a paper may not say what is attributed to it.
- Every claim row is **Verified = to check**. None of them has been read in an abstract or
  full text.
- The site code marks this state: the references have no `doi`, inline citations are plain
  text (no `<Cite>` links), and the source note on both pages starts with "Unchecked draft".
  Tests in `src/studies/ElbowMriStudy.test.ts` pin that, so the unchecked state cannot be lost
  by accident.
- The author chose (2026-10-23) to deploy these pages before the check; they stay labelled "Unchecked draft" on the live site until it is done.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`, "How this was checked"):

1. For each reference, find it on PubMed (`esearch`/`esummary`) and resolve its DOI on
   Crossref. Correct the citation text in this file and in the code
   (`src/studies/ElbowMriStudy.tsx`, `src/pages/MasonPage.tsx`). Drop a reference that cannot
   be matched, and every claim that rests on it.
2. For each claim, read the abstract (`efetch rettype=abstract`) or open full text (PMC).
   Mark it **yes** with the quote and its location, or **no** with what the paper says.
3. A claim marked **no**: remove the rule or chip and keep a descriptive field, and list it in
   an "Omitted claims for the author" section at the end of this file. Do not quietly reword
   it (CLAUDE.md, Studies section).
4. Once every claim is settled: add `doi` to each reference, switch the plain-text citations
   to `<Cite doi>`, change the source note to the ankle wording, and update the tests that pin
   the unchecked state, saying in the commit why they changed.

## References

Candidate DOIs are from memory and **unconfirmed**; they are here to speed up the check, not
to be trusted. Several of these journals (Br J Surg 1954, Ulster Med J 1962, Clin Orthop
Relat Res 1992) may have no DOI at all.

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| E1 | Mason ML. Some observations on fractures of the head of the radius with a review of one hundred cases. Br J Surg. 1954;42(172):123-132. | 10.1002/bjs.18004217203 (unconfirmed) | Mason I–III |
| E2 | Johnston GW. A follow-up of one hundred cases of fracture of the head of the radius with a review of the literature. Ulster Med J. 1962;31(1):51-56. | — (PMC-hosted, likely no DOI) | Mason IV |
| E3 | Broberg MA, Morrey BF. Results of delayed excision of the radial head after fracture. J Bone Joint Surg Am. 1986;68(5):669-674. | — | 2 mm / 30% thresholds |
| E4 | Regan W, Morrey B. Fractures of the coronoid process of the ulna. J Bone Joint Surg Am. 1989;71(9):1348-1354. | — | Coronoid types |
| E5 | Ring D, Jupiter JB, Zilberfarb J. Posterior dislocation of the elbow with fractures of the radial head and coronoid. J Bone Joint Surg Am. 2002;84(4):547-551. | 10.2106/00004623-200204000-00006 (unconfirmed) | Terrible triad |
| E6 | O'Driscoll SW, Bell DF, Morrey BF. Posterolateral rotatory instability of the elbow. J Bone Joint Surg Am. 1991;73(3):440-446. | — | PLRI and the LUCL |
| E7 | O'Driscoll SW, Morrey BF, Korinek S, An KN. Elbow subluxation and dislocation. A spectrum of instability. Clin Orthop Relat Res. 1992;(280):186-197. | — | Horii circle |
| E8 | Kijowski R, Tuite M, Sanford M. Magnetic resonance imaging of the elbow. Part II: Abnormalities of the ligaments, tendons, and nerves. Skeletal Radiol. 2005;34(1):1-18. | 10.1007/s00256-004-0854-x (unconfirmed) | Ligaments, tendons, nerves |
| E9 | Timmerman LA, Schwartz ML, Andrews JR. Preoperative evaluation of the ulnar collateral ligament by magnetic resonance imaging and computed tomography arthrography. Evaluation in 25 baseball players with surgical confirmation. Am J Sports Med. 1994;22(1):26-31. | 10.1177/036354659402200105 (unconfirmed) | Undersurface UCL tear |
| E10 | Potter HG, Hannafin JA, Morwessel RM, DiCarlo EF, O'Brien SJ, Altchek DW. Lateral epicondylitis: correlation of MR imaging, surgical, and histopathologic findings. Radiology. 1995;196(1):43-46. | 10.1148/radiology.196.1.7784585 (unconfirmed) | Lateral epicondylitis |
| E11 | Bredella MA, Tirman PF, Fritz RC, Feller JF, Wischer TK, Genant HK. MR imaging findings of lateral ulnar collateral ligament abnormalities in patients with lateral epicondylitis. AJR Am J Roentgenol. 1999;173(5):1379-1382. | 10.2214/ajr.173.5.10541124 (unconfirmed) | LUCL with lateral epicondylitis |
| E12 | Kijowski R, De Smet AA. Magnetic resonance imaging findings in patients with medial epicondylitis. Skeletal Radiol. 2005;34(4):196-202. | — | Medial epicondylitis |
| E13 | Falchook FS, Zlatkin MB, Erbacher GE, Moulton JS, Bisset GS, Murphy BJ. Rupture of the distal biceps tendon: evaluation with MR imaging. Radiology. 1994;190(3):659-663. | 10.1148/radiology.190.3.8115606 (unconfirmed) | Distal biceps |
| E14 | Kobayashi K, Burton KJ, Rodner C, Smith B, Caputo AE. Lateral compression injuries in the pediatric elbow: Panner's disease and osteochondritis dissecans of the capitellum. J Am Acad Orthop Surg. 2004;12(4):246-254. | — | Panner against OCD |
| E15 | Rosenberg ZS, Beltran J, Cheung YY. Pseudodefect of the capitellum: potential MR imaging pitfall. Radiology. 1994;191(3):821-823. | 10.1148/radiology.191.3.8184072 (unconfirmed) | Pseudodefect |
| E16 | Kijowski R, De Smet AA. MRI findings of osteochondritis dissecans of the capitellum with surgical correlation. AJR Am J Roentgenol. 2005;185(6):1453-1459. | — | OCD stability |
| E17 | Rosenberg ZS, Beltran J, Cheung Y, Broker M. MR imaging of the elbow: normal variant and potential diagnostic pitfalls of the trochlear groove and cubital tunnel. AJR Am J Roentgenol. 1995;164(2):415-418. | — | Anconeus epitrochlearis |

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Mason calculator (also used by step 2)

Types I–III are Mason's own (1954). Type IV is Johnston's later addition (1962); the
four-type scheme in common use is that modified version, and the page and study say so. The
Broberg-Morrey numbers are a further, separate modification.

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| MA-1 | Mason type I is a fissure or marginal fracture without displacement. | undisplaced → I | E1 | to check |
| MA-2 | Mason type II is a marginal sector fracture with displacement. | displaced marginal → II | E1 | to check |
| MA-3 | Mason type III is a comminuted fracture involving the whole head. | comminuted → III | E1 | to check |
| MA-4 | Johnston added type IV: a radial head fracture with dislocation of the elbow. | dislocation → IV, whatever the pattern | E2 | to check |
| MA-5 | Broberg and Morrey: type I is displaced less than 2 mm. | < 2 mm → I | E3 | to check |
| MA-6 | Broberg and Morrey: type II is displaced 2 mm or more and involves 30% or more of the head. | ≥ 2 mm and ≥ 30% → II; ≥ 2 mm and < 30% left undecided | E3 | to check |

Note for the check: MA-5 and MA-6 are commonly quoted from Broberg and Morrey 1986, but the
paper is about delayed excision; confirm the thresholds are stated there (they may come from a
later Morrey text instead). The handling of a fragment displaced 2 mm or more but under 30% of
the head (no type) is this site's own choice, since the thresholds do not cover it.

### Step 1: history, technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E1-1 | Elbow subluxation and dislocation are a spectrum in which soft tissues fail in a ring from lateral to medial: stage 1 the LUCL (posterolateral subluxation); stage 2 the other lateral structures and the anterior and posterior capsule; stage 3 the medial side. | after dislocation: chip; UCL torn with LUCL intact → warning | E7 | to check |

The protocol checklist (three planes, fat-suppressed PD or T2, a T1) is the site's own and is
presented as such, with no citation.

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E2-1 | Mason types (see MA-1 to MA-6). | — | E1, E2, E3 | to check |
| E2-2 | Regan and Morrey coronoid types: I avulsion of the tip; II a fragment of 50% of the coronoid or less; III a fragment of more than 50%. | tip → I; ≤ 50% → II; > 50% → III | E4 | to check |
| E2-3 | Posterior dislocation of the elbow with fractures of the radial head and coronoid (the "terrible triad"). Confirm the paper uses that name or whether it should be attributed to Hotchkiss. | dislocation + radial head + coronoid → chip and impression line | E5 | to check |
| E2-4 | Panner's disease is fragmentation of the whole capitellum in children younger than about 10; osteochondritis dissecans is a focal capitellar lesion in adolescents, typically throwers and gymnasts. | descriptive chips | E14 | to check |
| E2-5 | The pseudodefect of the capitellum is a normal groove at the posterior capitellum, where it meets the lateral epicondyle, that can mimic an osteochondral lesion. | OCD at the posterior capitellum → warning | E15 | to check |
| E2-6 | MRI judges capitellar OCD stability from the fragment-bone interface and the overlying cartilage. | descriptive only, no chip | E16 | to check |

### Step 3: ulnar collateral ligament

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E3-1 | The anterior bundle of the UCL is the main restraint to valgus; describe it as intact, partially or completely torn. | descriptive | E8 | to check |
| E3-2 | An undersurface partial tear of the UCL at the sublime tubercle: deep fibres detached, superficial fibres intact, giving a "T" when contrast tracks along the bone. Timmerman described it on CT arthrography; check whether it also describes the MRI appearance. | undersurface type → chip | E9 | to check |

### Step 4: lateral collateral complex

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E4-1 | Insufficiency of the lateral ulnar collateral ligament is the lesion of posterolateral rotatory instability. | LUCL partial or complete tear → chip | E6 | to check |

### Steps 5 and 6: flexor and extensor origins

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E5-1 | Medial epicondylitis shows abnormal (increased) signal in the common flexor tendon. | descriptive | E12 | to check |
| E6-1 | In lateral epicondylitis, the common extensor tendon is thickened with increased signal, and MRI findings correlated with surgical and histopathological findings. | descriptive | E10 | to check |
| E6-2 | LUCL abnormalities (thickening, tears) are found in patients with lateral epicondylitis. | abnormal extensor origin → chip "recheck the LUCL" | E11 | to check |

### Steps 7 and 8: distal biceps, triceps and brachialis

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E7-1 | MRI distinguishes partial from complete rupture of the distal biceps tendon. The retraction measurement is descriptive; no threshold is cited. | descriptive | E13 | to check |
| E8-1 | The triceps and brachialis are part of the review of elbow tendons. | descriptive | E8 | to check |

### Step 9: nerves

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E9-1 | An abnormal nerve at the elbow is enlarged with increased T2 signal, and muscles it supplies may show denervation edema. | descriptive | E8 | to check |

### Step 11: variants (impression lines, by the author's decision)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| E11-1 | The anconeus epitrochlearis is an accessory muscle over the cubital tunnel that can compress the ulnar nerve. | descriptive | E17 | to check |

The supracondylar process and the os supratrochleare dorsale have no cited claim; they are
recorded as present or absent, each with its own impression line.

Bursae, loose bodies and synovium (step 10) are descriptive, with no cited rule.
