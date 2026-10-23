# Shoulder MRI study and Neer calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

This file is the evidence base for the shoulder MRI study (`/studies/shoulder-mri`) and the
Neer calculator (`/neer`), in the same shape as the ankle file
(`2026-10-19-ankle-mri-sources.md`).

## Status: nothing here is verified

The study and calculator were drafted while the cloud environment's network blocked PubMed,
PubMed Central, Crossref, doi.org and Europe PMC. **No reference has been matched and no claim
has been read in its paper.** The citations and claims below are from memory of the papers.
Every row is marked **to check**, and the site shows the pages as an unchecked draft
(`sourceNote` starting "Unchecked draft"). The author chose (2026-10-23) to deploy before the checks; the pages stay labelled "Unchecked draft" on the live site until they are done.

What that means in the code:

- References carry no `doi` and are cited in plain text, not with `<Cite>`.
- Every rule chip and warning carries a comment naming its claim ID below.
- `src/studies/ShoulderMriStudy.test.ts` and `src/logic/neer.test.ts` pin the unchecked state
  (no DOIs, the "Unchecked draft" note) and quote each claim as "to check".

## References

DOIs are candidates only, where one was remembered; none has been resolved.

| # | Citation | Candidate DOI |
|---|---|---|
| R1 | Neer CS 2nd. Displaced proximal humeral fractures. I. Classification and evaluation. J Bone Joint Surg Am. 1970;52(6):1077-1089. | — |
| R2 | Hill HA, Sachs MD. The grooved defect of the humeral head: a frequently unrecognized complication of dislocations of the shoulder joint. Radiology. 1940;35(6):690-700. | 10.1148/35.6.690 (unconfirmed) |
| R3 | Workman TL, Burkhard TK, Resnick D, et al. Hill-Sachs lesion: comparison of detection with MR imaging, radiography, and arthroscopy. Radiology. 1992;185(3):847-852. | 10.1148/radiology.185.3.1438774 (unconfirmed) |
| R4 | Richards RD, Sartoris DJ, Pathria MN, Resnick D. Hill-Sachs lesion and normal humeral groove: MR imaging features allowing their differentiation. Radiology. 1994;190(3):665-668. | 10.1148/radiology.190.3.8115607 (unconfirmed) |
| R5 | Ellman H. Diagnosis and treatment of incomplete rotator cuff tears. Clin Orthop Relat Res. 1990;(254):64-74. | — |
| R6 | Patte D. Classification of rotator cuff lesions. Clin Orthop Relat Res. 1990;(254):81-86. | — |
| R7 | Goutallier D, Postel JM, Bernageau J, Lavau L, Voisin MC. Fatty muscle degeneration in cuff ruptures. Pre- and postoperative evaluation by CT scan. Clin Orthop Relat Res. 1994;(304):78-83. | — |
| R8 | Fuchs B, Weishaupt D, Zanetti M, Hodler J, Gerber C. Fatty degeneration of the muscles of the rotator cuff: assessment by computed tomography versus magnetic resonance imaging. J Shoulder Elbow Surg. 1999;8(6):599-605. | 10.1016/s1058-2746(99)90097-6 (unconfirmed) |
| R9 | Walch G, Nové-Josserand L, Boileau P, Levigne C. Subluxations and dislocations of the tendon of the long head of the biceps. J Shoulder Elbow Surg. 1998;7(2):100-108. | 10.1016/s1058-2746(98)90218-x (unconfirmed) |
| R10 | Snyder SJ, Karzel RP, Del Pizzo W, Ferkel RD, Friedman MJ. SLAP lesions of the shoulder. Arthroscopy. 1990;6(4):274-279. | 10.1016/0749-8063(90)90056-j (unconfirmed) |
| R11 | Neviaser TJ. The anterior labroligamentous periosteal sleeve avulsion lesion: a cause of anterior instability of the shoulder. Arthroscopy. 1993;9(1):17-21. | 10.1016/s0749-8063(05)80338-x (unconfirmed) |
| R12 | Neviaser TJ. The GLAD lesion: another cause of anterior shoulder pain. Arthroscopy. 1993;9(1):22-23. | 10.1016/s0749-8063(05)80339-1 (unconfirmed) |
| R13 | Woertler K, Waldt S. MR imaging in sports-related glenohumeral instability. Eur Radiol. 2006;16(12):2622-2636. | 10.1007/s00330-006-0258-6 (unconfirmed) |
| R14 | Wolf EM, Cheng JC, Dickson K. Humeral avulsion of glenohumeral ligaments as a cause of anterior shoulder instability. Arthroscopy. 1995;11(5):600-607. | 10.1016/0749-8063(95)90139-6 (unconfirmed) |
| R15 | Tirman PF, Feller JF, Janzen DL, Peterfy CG, Bergman AG. Association of glenoid labral cysts with labral tears and glenohumeral instability: radiologic findings and clinical significance. Radiology. 1994;190(3):653-658. | 10.1148/radiology.190.3.8115605 (unconfirmed) |
| R16 | Fritz RC, Helms CA, Steinbach LS, Genant HK. Suprascapular nerve entrapment: evaluation with MR imaging. Radiology. 1992;182(2):437-444. | 10.1148/radiology.182.2.1732962 (unconfirmed) |
| R17 | Linker CS, Helms CA, Fritz RC. Quadrilateral space syndrome: findings at MR imaging. Radiology. 1993;188(3):675-676. | 10.1148/radiology.188.3.8351331 (unconfirmed) |
| R18 | Sugaya H, Maeda K, Matsuki K, Moriishi J. Functional and structural outcome after arthroscopic full-thickness rotator cuff repair: single-row versus dual-row fixation. Arthroscopy. 2005;21(11):1307-1316. | 10.1016/j.arthro.2005.08.011 (unconfirmed) |
| R19 | Tuite MJ, Orwin JF. Anterosuperior labral variants of the shoulder: appearance on gradient-recalled-echo and fast spin-echo MR images. Radiology. 1996;199(2):537-540. | 10.1148/radiology.199.2.8668808 (unconfirmed) |
| R20 | Williams MM, Snyder SJ, Buford D Jr. The Buford complex: the "cord-like" middle glenohumeral ligament and absent anterosuperior labrum complex. A normal anatomic capsulolabral variant. Arthroscopy. 1994;10(3):241-247. | 10.1016/s0749-8063(05)80105-7 (unconfirmed) |
| R21 | Smith DK, Chopp TM, Aufdemorte TB, Witkowski EG, Jones RC. Sublabral recess of the superior glenoid labrum: study of cadavers with conventional nonenhanced MR imaging, MR arthrography, anatomic dissection, and limited histologic examination. Radiology. 1996;201(1):251-256. | 10.1148/radiology.201.1.8816553 (unconfirmed) |
| R22 | Park JG, Lee JK, Phelps CT. Os acromiale associated with rotator cuff impingement: MR imaging of the shoulder. Radiology. 1994;193(1):255-257. | 10.1148/radiology.193.1.8090902 (unconfirmed) |

Author lists, page ranges and titles may be wrong in places (especially R2, R11, R12, R18 and
R21); fix them to the PubMed record.

## Claims table

Columns: **ID** · **Claim** · **Rule** (if any) · **Source** · **Verified**. Where the code
uses a claim, its ID is in a comment next to the chip, warning or test.

### Neer calculator and step 2 (shared logic, `src/logic/neer.ts`)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| N1 | The proximal humerus has four segments: articular segment (anatomical neck), greater tuberosity, lesser tuberosity, shaft (surgical neck). | — | R1 | to check |
| N2 | A segment is displaced (a "part") when displaced more than 1 cm or angulated more than 45°. | > 1 cm or > 45°; exactly 1 cm or 45° is not displaced | R1 | to check |
| N3 | With no displaced segment the fracture is one-part, however many fracture lines. | — | R1 | to check |
| N4 | Two-part: one segment displaced (anatomical neck, surgical neck, greater or lesser tuberosity). Three-part: surgical neck plus one tuberosity. Four-part: both tuberosities and the articular segment. | Named patterns as listed | R1 | to check |
| N5 | Fracture-dislocations (anterior, posterior) and articular surface fractures (head-splitting, impression) are named separately. | — | R1 | to check |
| N6 | Combinations outside the named patterns (e.g. both tuberosities without the neck) are not Neer types. By the author's decision (2026-10-23) the calculator gives no part count for them, only "not a named Neer pattern" and the list of displaced segments. Check that Neer names no such pattern. | Site's own handling | R1 | author's decision; check R1 names no such pattern |

### Step 1: technique

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S1-1 | Protocol checklist: three planes, fluid-sensitive fat-suppressed, T1. | — | Site's own; no paper cited | n/a |

### Step 2: bones

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S2-1 | Hill-Sachs lesion is a grooved impaction defect of the posterolateral humeral head from anterior dislocation. | — | R2 | to check |
| S2-2 | Workman et al. compared MRI with radiographs and arthroscopy for Hill-Sachs detection. | — | R3 | to check (record the numbers if usable) |
| S2-3 | The Hill-Sachs defect lies on the most superior axial images, at or above the coracoid; the normal posterolateral groove lies lower. | Level-based distinction (help text, quiz) | R4 | to check |

### Step 3: supraspinatus and infraspinatus

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S3-1 | Partial tears by side: articular (A), bursal (B), interstitial (C); depth grade 1 < 3 mm, grade 2 3–6 mm, grade 3 > 6 mm. Arthroscopic. | Chip: grade by depth, boundaries 3 and 6 mm inclusive in grade 2 | R5 | to check (boundary wording and whether grade 3 is "> 6 mm" or "> half thickness") |
| S3-2 | Retraction stage 1 near the bony insertion, 2 at the humeral head, 3 at the glenoid (frontal plane). | Chip: Patte stage | R6 | to check |
| S3-3 | Goutallier grades 0 normal, 1 some fatty streaks, 2 more muscle than fat, 3 as much fat as muscle, 4 more fat than muscle (CT). | Chip: grade | R7 | to check (exact grade 2 wording) |
| S3-4 | Fuchs et al. applied the Goutallier grades to MRI and compared them with CT. | — | R8 | to check (what agreement they found) |

### Steps 4 and 5: subscapularis, teres minor, biceps

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S5-1 | Dislocation of the long head of biceps out of the groove goes with subscapularis tears. | Warning: displaced biceps with no subscapularis tear entered | R9 | to check |

### Step 6: labrum

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S6-1 | SLAP types: I fraying, anchor attached; II labrum and biceps anchor detached; III bucket-handle, anchor attached; IV bucket-handle extending into the biceps. | Chip: Snyder type | R10 | to check |
| S6-2 | ALPSA: labroligamentous complex avulsed with an intact periosteal sleeve, displaced medially and inferiorly down the scapular neck. | — | R11 | to check |
| S6-3 | GLAD: superficial anteroinferior labral tear with adjacent glenoid cartilage injury, pain without instability. | — | R12 | to check |
| S6-4 | Bankart, bony Bankart and Perthes (periosteum stripped but intact, labrum may stay in place) as reviewed. | — | R13 | to check |

### Step 7: capsule

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S7-1 | Humeral avulsion of the glenohumeral ligaments (HAGL) is a cause of anterior instability. | — | R14 | to check |

### Step 10: nerves

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S10-1 | Paralabral (glenoid labral) cysts are associated with labral tears. | Warning: cyst with an intact labrum | R15 | to check |
| S10-2 | A mass at the suprascapular notch can denervate supraspinatus and infraspinatus; at the spinoglenoid notch, infraspinatus alone. Denervation is high T2 signal, later fatty atrophy. | Chip: muscles expected by cyst site | R16 | to check |
| S10-3 | Quadrilateral space syndrome shows teres minor atrophy on MRI. | Chip: teres minor denervation → consider QSS | R17 | to check |

### Step 11: repaired cuff

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S11-1 | Sugaya types: I sufficient thickness, homogeneous low signal; II sufficient thickness, partial high signal; III insufficient thickness, no discontinuity; IV minor discontinuity; V major discontinuity. IV and V are re-tears. | Chip: type and re-tear | R18 | to check (whether the classification first appears in R18 or a later Sugaya paper; exact type III wording) |

### Step 12: variants

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S12-1 | Sublabral foramen: anterosuperior labrum unattached, about 1 to 3 o'clock; not a tear. | — | R19 | to check |
| S12-2 | Buford complex: absent anterosuperior labrum with a cord-like middle glenohumeral ligament; a normal variant. | — | R20 | to check |
| S12-3 | A sublabral recess at the biceps anchor can mimic a type II SLAP tear. | Warning: SLAP II and sublabral recess both entered | R21 | to check |
| S12-4 | Os acromiale is associated with rotator cuff impingement. | — | R22 | to check |

## Author's rulings applied

- Post-operative scope: the repaired rotator cuff only (step 11), not labral repair or
  arthroplasty.
- Each anatomical variant gets its own impression line (step 12), and the normal impression
  stays normal when only variants or an intact repair are entered.

## How to check

1. For each reference, find it on PubMed and resolve its DOI on Crossref
   (`api.crossref.org/works/<doi>`). Fix the citation text to the record. Drop any reference
   that cannot be matched with confidence, and remove the claims that rest on it.
2. For each claim, read the abstract or open full text and copy the sentence into this table
   with its location. Mark it **yes**, or **no** with the reason.
3. In `src/studies/ShoulderMriStudy.tsx`: add `doi` to each checked reference, change the
   plain-text citations to `<Cite doi={...}>`, and remove or reword anything marked **no**
   (as a question to the author, not a quiet rewording). Same for the Neer page's
   `source-note`.
4. Update the tests: replace each "(to check)" comment with the paper's sentence, and change
   the "unchecked state" tests (no DOIs, "Unchecked draft") to the checked state, e.g. "cites
   N references, each with a DOI" as the ankle does.
5. Change the `sourceNote` to "Draft lesson compiled from the papers below; citations checked
   against PubMed in <month year>. Not yet reviewed by the site author."
