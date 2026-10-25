# Shoulder MRI study and Neer calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

This file is the evidence base for the shoulder MRI study (`/studies/shoulder-mri`) and the
Neer calculator (`/neer`), in the same shape as the ankle file
(`2026-10-19-ankle-mri-sources.md`).

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esummary`), its DOI resolved on Crossref, and a
claim marked verified only when its wording was read in the PubMed abstract or in open full
text. Only Woertler and Waldt (R13, PMC1705542) has open full text. OpenAlex lists every other
paper as closed access (Unpaywall refused the placeholder address, so OpenAlex was used for the
open-access check), and the RSNA, Arthroscopy and JBJS publisher pages are not readable here.
The rest are read from the abstract only. Neer 1970 (R1) has no abstract in PubMed, and Hill
and Sachs 1940 (R2) is not in PubMed at all, so no claim resting on them can be verified yet.

All 22 references were found and match the draft's citations; only R3 (full author list) and
R20 (title punctuation) change. The drafts were deployed (2026-10-23) before this check. By the
author's decision, claims that could not be verified stay as they are, marked unchecked, and the
pages keep their "Unchecked draft" note until they are checked.

The author then chose (2026-10-23): add the DOIs now and switch to `<Cite>` links; keep the
unverifiable claims, with the "Unchecked draft" note, until they can be checked; rewrite every
claim marked "for the author" to its paper's own wording, moving the citation to the paper
that states it; and apply every citation correction. Applied the same day:

- Every reference in `src/studies/ShoulderMriStudy.tsx` has its DOI and every in-text citation
  is a `<Cite>` link; the Neer page's source note links Neer 1970 and drops "Part" from the title
  ("I. Classification and evaluation", as in PubMed). R3 now has its full author list and R20
  its PubMed title.
- S3-4 and S12-3 reworded (see their rows below).
- The sourceNote and the Neer source note still start "Unchecked draft" and name what is
  still unchecked. Every rule chip and warning still carries a comment naming its claim ID.
- `src/studies/ShoulderMriStudy.test.ts` now pins a DOI on every one of the 22 references,
  instead of none (R2 has a Crossref DOI but no PMID). Comments on verified cases quote the
  paper; unverified ones stay "(to check)" or "(partly checked)".

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| R1 | Neer CS 2nd. Displaced proximal humeral fractures. I. Classification and evaluation. J Bone Joint Surg Am. 1970;52(6):1077-1089. | 5455339 | 10.2106/00004623-197052060-00001 | No abstract |
| R2 | Hill HA, Sachs MD. The grooved defect of the humeral head: a frequently unrecognized complication of dislocations of the shoulder joint. Radiology. 1940;35(6):690-700. | not in PubMed | 10.1148/35.6.690 | Crossref record only |
| R3 | Workman TL, Burkhard TK, Resnick D, Goff WB 2nd, Balsara ZN, Davis DJ, Lapoint JM. Hill-Sachs lesion: comparison of detection with MR imaging, radiography, and arthroscopy. Radiology. 1992;185(3):847-852. | 1438774 | 10.1148/radiology.185.3.1438774 | Abstract |
| R4 | Richards RD, Sartoris DJ, Pathria MN, Resnick D. Hill-Sachs lesion and normal humeral groove: MR imaging features allowing their differentiation. Radiology. 1994;190(3):665-668. | 8115607 | 10.1148/radiology.190.3.8115607 | Abstract |
| R5 | Ellman H. Diagnosis and treatment of incomplete rotator cuff tears. Clin Orthop Relat Res. 1990;(254):64-74. | 2182260 | 10.1097/00003086-199005000-00010 | Abstract |
| R6 | Patte D. Classification of rotator cuff lesions. Clin Orthop Relat Res. 1990;(254):81-86. | 2323151 | 10.1097/00003086-199005000-00012 | Abstract |
| R7 | Goutallier D, Postel JM, Bernageau J, Lavau L, Voisin MC. Fatty muscle degeneration in cuff ruptures. Pre- and postoperative evaluation by CT scan. Clin Orthop Relat Res. 1994;(304):78-83. | 8020238 | 10.1097/00003086-199407000-00014 | Abstract |
| R8 | Fuchs B, Weishaupt D, Zanetti M, Hodler J, Gerber C. Fatty degeneration of the muscles of the rotator cuff: assessment by computed tomography versus magnetic resonance imaging. J Shoulder Elbow Surg. 1999;8(6):599-605. | 10633896 | 10.1016/s1058-2746(99)90097-6 | Abstract |
| R9 | Walch G, Nové-Josserand L, Boileau P, Levigne C. Subluxations and dislocations of the tendon of the long head of the biceps. J Shoulder Elbow Surg. 1998;7(2):100-108. | 9593086 | 10.1016/s1058-2746(98)90218-x | Abstract |
| R10 | Snyder SJ, Karzel RP, Del Pizzo W, Ferkel RD, Friedman MJ. SLAP lesions of the shoulder. Arthroscopy. 1990;6(4):274-279. | 2264894 | 10.1016/0749-8063(90)90056-j | Abstract |
| R11 | Neviaser TJ. The anterior labroligamentous periosteal sleeve avulsion lesion: a cause of anterior instability of the shoulder. Arthroscopy. 1993;9(1):17-21. | 8442824 | 10.1016/s0749-8063(05)80338-x | Abstract |
| R12 | Neviaser TJ. The GLAD lesion: another cause of anterior shoulder pain. Arthroscopy. 1993;9(1):22-23. | 8442825 | 10.1016/s0749-8063(05)80339-1 | Abstract |
| R13 | Woertler K, Waldt S. MR imaging in sports-related glenohumeral instability. Eur Radiol. 2006;16(12):2622-2636. | 16633790 | 10.1007/s00330-006-0258-6 | Full text (PMC1705542) |
| R14 | Wolf EM, Cheng JC, Dickson K. Humeral avulsion of glenohumeral ligaments as a cause of anterior shoulder instability. Arthroscopy. 1995;11(5):600-607. | 8534304 | 10.1016/0749-8063(95)90139-6 | Abstract |
| R15 | Tirman PF, Feller JF, Janzen DL, Peterfy CG, Bergman AG. Association of glenoid labral cysts with labral tears and glenohumeral instability: radiologic findings and clinical significance. Radiology. 1994;190(3):653-658. | 8115605 | 10.1148/radiology.190.3.8115605 | Abstract |
| R16 | Fritz RC, Helms CA, Steinbach LS, Genant HK. Suprascapular nerve entrapment: evaluation with MR imaging. Radiology. 1992;182(2):437-444. | 1732962 | 10.1148/radiology.182.2.1732962 | Abstract |
| R17 | Linker CS, Helms CA, Fritz RC. Quadrilateral space syndrome: findings at MR imaging. Radiology. 1993;188(3):675-676. | 8351331 | 10.1148/radiology.188.3.8351331 | Abstract |
| R18 | Sugaya H, Maeda K, Matsuki K, Moriishi J. Functional and structural outcome after arthroscopic full-thickness rotator cuff repair: single-row versus dual-row fixation. Arthroscopy. 2005;21(11):1307-1316. | 16325080 | 10.1016/j.arthro.2005.08.011 | Abstract |
| R19 | Tuite MJ, Orwin JF. Anterosuperior labral variants of the shoulder: appearance on gradient-recalled-echo and fast spin-echo MR images. Radiology. 1996;199(2):537-540. | 8668808 | 10.1148/radiology.199.2.8668808 | Abstract |
| R20 | Williams MM, Snyder SJ, Buford D Jr. The Buford complex--the "cord-like" middle glenohumeral ligament and absent anterosuperior labrum complex: a normal anatomic capsulolabral variant. Arthroscopy. 1994;10(3):241-247. | 8086014 | 10.1016/s0749-8063(05)80105-7 | Abstract |
| R21 | Smith DK, Chopp TM, Aufdemorte TB, Witkowski EG, Jones RC. Sublabral recess of the superior glenoid labrum: study of cadavers with conventional nonenhanced MR imaging, MR arthrography, anatomic dissection, and limited histologic examination. Radiology. 1996;201(1):251-256. | 8816553 | 10.1148/radiology.201.1.8816553 | Abstract |
| R22 | Park JG, Lee JK, Phelps CT. Os acromiale associated with rotator cuff impingement: MR imaging of the shoulder. Radiology. 1994;193(1):255-257. | 8090902 | 10.1148/radiology.193.1.8090902 | Abstract |

Notes on the set:

- Every candidate DOI in the draft resolved on Crossref to the right paper. R1, R5, R6 and R7
  had none; theirs were found by Crossref bibliographic search, and title, author, volume and
  pages agree with PubMed.
- R2 is not indexed in PubMed (1940). Crossref 10.1148/35.6.690 gives Hill HA, Sachs MD, "The
  Grooved Defect of the Humeral Head", subtitle "A Frequently Unrecognized Complication of
  Dislocations of the Shoulder Joint", Radiology 35(6):690-700, December 1940, so the draft's
  citation is right. There is no abstract, so S2-1 cannot be read here.
- R3: the draft's "Workman TL, Burkhard TK, Resnick D, et al." was right; PubMed lists seven
  authors, written out above.
- R20: PubMed's title is "The Buford complex--the "cord-like" middle glenohumeral ligament and
  absent anterosuperior labrum complex: a normal anatomic capsulolabral variant." The draft had
  a colon after "Buford complex" and a full stop before "A normal".
- R11, R12, R18 and R21, flagged in the draft as least certain, match PubMed exactly (authors,
  titles, volume, pages). R2 matches Crossref.

## Claims table

Columns: **ID** · **Claim** · **Rule** (if any) · **Source** · **Verified**. Where the code
uses a claim, its ID is in a comment next to the chip, warning or test.

### Neer calculator and step 2 (shared logic, `src/logic/neer.ts`)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| N1 | The proximal humerus has four segments: articular segment (anatomical neck), greater tuberosity, lesser tuberosity, shaft (surgical neck). | — | R1 | no: not in abstract/open text. PubMed has no abstract for R1 and the JBJS full text is closed. Kept, unchecked. |
| N2 | A segment is displaced (a "part") when displaced more than 1 cm or angulated more than 45°. | > 1 cm or > 45°; exactly 1 cm or 45° is not displaced | R1 | no: not in abstract/open text. PubMed has no abstract for R1 and the JBJS full text is closed. Kept, unchecked. |
| N3 | With no displaced segment the fracture is one-part, however many fracture lines. | — | R1 | no: not in abstract/open text. PubMed has no abstract for R1 and the JBJS full text is closed. Kept, unchecked. |
| N4 | Two-part: one segment displaced (anatomical neck, surgical neck, greater or lesser tuberosity). Three-part: surgical neck plus one tuberosity. Four-part: both tuberosities and the articular segment. | Named patterns as listed | R1 | no: not in abstract/open text. PubMed has no abstract for R1 and the JBJS full text is closed. Kept, unchecked. |
| N5 | Fracture-dislocations (anterior, posterior) and articular surface fractures (head-splitting, impression) are named separately. | — | R1 | no: not in abstract/open text. PubMed has no abstract for R1 and the JBJS full text is closed. Kept, unchecked. |
| N6 | Combinations outside the named patterns (e.g. both tuberosities without the neck) are not Neer types. By the author's decision (2026-10-23) the calculator gives no part count for them, only "not a named Neer pattern" and the list of displaced segments. Check that Neer names no such pattern. | Site's own handling | R1 | author's decision; whether R1 names such a pattern is still unchecked (no abstract, full text closed). |

### Step 1: technique

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S1-1 | Protocol checklist: three planes, fluid-sensitive fat-suppressed, T1. | — | Site's own; no paper cited | n/a |

### Step 2: bones

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S2-1 | Hill-Sachs lesion is a grooved impaction defect of the posterolateral humeral head from anterior dislocation. | — | R2 | no: not in abstract/open text. R2 has no abstract and is not in PubMed; Crossref confirms only the title ("The Grooved Defect of the Humeral Head"). Kept, unchecked. |
| S2-2 | Workman et al. compared MRI with radiographs and arthroscopy for Hill-Sachs detection. | — | R3 | yes. R3 abstract: "The authors retrospectively analyzed the diagnostic interpretations at plain film radiography, arthroscopy, and MR imaging in 76 patients" and "When the agreement of findings in two or three methods was used to assign a final diagnosis, MR imaging resulted in sensitivity of 97%, specificity of 91%, and accuracy of 94% in the detection of Hill-Sachs lesions." The abstract also says neither radiography nor arthroscopy was accurate enough to serve as a true reference standard. |
| S2-3 | The Hill-Sachs defect lies on the most superior axial images, at or above the coracoid; the normal posterolateral groove lies lower. | Level-based distinction (help text, quiz) | R4 | partly. R4 abstract: "A Hill-Sachs lesion is best differentiated from the anatomic groove by means of its more cephalic position along the longitudinal humeral axis" and "Along the longitudinal humeral axis, there was no overlap between the respective ranges of location (P < .001)." The level ("most superior axial images, at or above the coracoid") is not in the abstract; unchecked. Used in the step 2 help text, the Learn text and a quiz question. |

### Step 3: supraspinatus and infraspinatus

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S3-1 | Partial tears by side: articular (A), bursal (B), interstitial (C); depth grade 1 < 3 mm, grade 2 3–6 mm, grade 3 > 6 mm. Arthroscopic. | Chip: grade by depth, boundaries 3 and 6 mm inclusive in grade 2 | R5 | partly. R5 abstract: "Incomplete tears can be observed in the articular or bursal surface" and "A system of grading partial-thickness tears based on location, depth, and area is presented". The interstitial type, the depth thresholds (< 3 mm, 3-6 mm, > 6 mm) and their boundaries are not in the abstract; unchecked. The abstract mentions "more than one-half the cuff thickness" only as a treatment threshold, not as a grade. |
| S3-2 | Retraction stage 1 near the bony insertion, 2 at the humeral head, 3 at the glenoid (frontal plane). | Chip: Patte stage | R6 | no: not in abstract/open text. R6 abstract says only that the classification "takes into account the extent of the tear, its topography in the sagittal and frontal planes, the trophic quality of the muscle, and the integrity of the long head of the biceps"; the three stages are not given. Kept, unchecked. |
| S3-3 | Goutallier grades 0 normal, 1 some fatty streaks, 2 more muscle than fat, 3 as much fat as muscle, 4 more fat than muscle (CT). | Chip: grade | R7 | partly. R7 abstract: "A preoperative computed tomography (CT) scan grading muscular fatty degeneration in five stages". The wording of each grade is not in the abstract; unchecked. |
| S3-4 | Fuchs et al. applied the Goutallier grades to MRI and compared them with CT. | — | R8 | yes, with a note for the author. R8 abstract: "Interobserver reproducibility for grading fatty degeneration was good to excellent for CT and for MRI. The correlation between MRI and CT was fair to moderate and remained unsatisfactory, even if the classification system was simplified with only a 3- rather than a 5-grade scale as originally proposed." The page's sentence (applied the grades to MRI and compared them with CT) is right, but it does not say the MRI and CT grades agreed only fairly to moderately; Applied (author, 2026-10-23): the page now reads "each method was reproducible between observers, but the correlation between MRI and CT grades was only fair to moderate, even on a simplified 3-grade scale" (step 3 help) and "applied to MRI by Fuchs and colleagues, who found the MRI and CT grades correlated only fairly to moderately" (Learn). |

### Steps 4 and 5: subscapularis, teres minor, biceps

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S5-1 | Dislocation of the long head of biceps out of the groove goes with subscapularis tears. | Warning: displaced biceps with no subscapularis tear entered | R9 | yes. R9 abstract: "Dislocation was associated with complete rupture of the subscapularis tendon in 23 cases, with partial tearing in 21 cases, and with an intact subscapularis tendon in 2 cases" (of 46 dislocations). |

### Step 6: labrum

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S6-1 | SLAP types: I fraying, anchor attached; II labrum and biceps anchor detached; III bucket-handle, anchor attached; IV bucket-handle extending into the biceps. | Chip: Snyder type | R10 | partly. R10 abstract: "We divided the superior labrum pathology into four distinct types", the lesion "including the 'anchor' of the biceps tendon to the labrum". The description of each type is not in the abstract; unchecked. |
| S6-2 | ALPSA: labroligamentous complex avulsed with an intact periosteal sleeve, displaced medially and inferiorly down the scapular neck. | — | R11 | yes. R11 abstract: "This lesion differs from the Bankart lesion because the anterior scapular periosteum does not rupture, thereby allowing the labroligamentous structures to displace medially and rotate inferiorly on the scapular neck." |
| S6-3 | GLAD: superficial anteroinferior labral tear with adjacent glenoid cartilage injury, pain without instability. | — | R12 | yes. R12 abstract: "patients with GLAD lesions present with anterior shoulder pain as their chief complaint. No signs of anterior instability are found on physical examination or at surgery" and "a superficial anterior inferior labral tear has been identified in all cases associated with an anterior inferior glenoid articular cartilage injury." |
| S6-4 | Bankart, bony Bankart and Perthes (periosteum stripped but intact, labrum may stay in place) as reviewed. | — | R13 | yes. R13 full text: Bankart, "a complete detachment of the anteroinferior labro-ligamentous complex from the glenoid associated with a rupture of the scapular periosteum"; bony Bankart, "an osseous fragment of variable size is avulsed from the anteroinferior glenoid together with the labro-ligamentous complex"; Perthes, "the periosteum remains intact and is stripped anteromedially ... Therefore, unless only loosely attached, the labrum may remain in its normal anatomic position." |

### Step 7: capsule

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S7-1 | Humeral avulsion of the glenohumeral ligaments (HAGL) is a cause of anterior instability. | — | R14 | yes. R14 abstract: "the humeral avulsion of glenohumeral ligaments (HAGL), was studied to determine its incidence and its role in anterior glenohumeral instability"; found in 6 of 64 unstable shoulders (9.3%), and "In patients with documented anterior instability without a demonstratable 'primary' Bankart lesion, a HAGL lesion should be ruled out." |

### Step 10: nerves

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S10-1 | Paralabral (glenoid labral) cysts are associated with labral tears. | Warning: cyst with an intact labrum | R15 | yes. R15 abstract: "Glenoid labral cysts are associated with glenoid labral tears and shoulder instability"; "MR imaging showed labral tear intimately associated with cystic-appearing mass in these 20 patients." |
| S10-2 | A mass at the suprascapular notch can denervate supraspinatus and infraspinatus; at the spinoglenoid notch, infraspinatus alone. Denervation is high T2 signal, later fatty atrophy. | Chip: muscles expected by cyst site | R16 | partly. R16 abstract: "Atrophy of both the supraspinatus and infraspinatus muscles was seen in association with anteriorly located masses and proximal entrapment of the nerve in 11 cases (40%); isolated atrophy of the infraspinatus muscle was seen in association with posteriorly located masses and distal entrapment of the nerve in nine cases (33%)." The abstract says "anteriorly/posteriorly located" and proximal/distal, not suprascapular and spinoglenoid notch by name, and it does not describe high T2 signal before fatty atrophy; those parts unchecked. |
| S10-3 | Quadrilateral space syndrome shows teres minor atrophy on MRI. | Chip: teres minor denervation → consider QSS | R17 | yes. R17 abstract: "Selective atrophy of the teres minor muscle, which is innervated by the axillary nerve, was demonstrated at magnetic resonance imaging in three patients with clinical findings of the syndrome. This finding, in the appropriate clinical setting, is highly suggestive of the quadrilateral space syndrome". |

### Step 11: repaired cuff

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S11-1 | Sugaya types: I sufficient thickness, homogeneous low signal; II sufficient thickness, partial high signal; III insufficient thickness, no discontinuity; IV minor discontinuity; V major discontinuity. IV and V are re-tears. | Chip: type and re-tear | R18 | partly. R18 abstract: "Postoperative cuff integrity was determined through magnetic resonance imaging and was classified into 5 categories: type I, sufficient thickness with homogenously low intensity; type II, sufficient thickness with partial high intensity; type III, insufficient thickness without discontinuity; type IV, presence of a minor discontinuity; type V, presence of a major discontinuity." The five types match. "IV and V are re-tears" is not in the abstract, and whether the classification first appears here cannot be told from it; unchecked. |

### Step 12: variants

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| S12-1 | Sublabral foramen: anterosuperior labrum unattached, about 1 to 3 o'clock; not a tear. | — | R19 | partly. R19 abstract: the sublabral foramen is one of "two anterosuperior labral variants"; with an SLF "the anterosuperior labrum was graded as detached in all patients who underwent fast SE imaging"; "Isolated MR abnormalities of the anterosuperior labrum may represent either of the two asymptomatic labral variants." The 1 to 3 o'clock position is not in the abstract; unchecked. |
| S12-2 | Buford complex: absent anterosuperior labrum with a cord-like middle glenohumeral ligament; a normal variant. | — | R20 | yes. R20 abstract: the Buford complex "was distinguished by a 'cord-like' middle glenohumeral ligament that originated directly from the superior labrum at the base of the biceps tendon"; "There was no anterior-superior labral tissue present between this attachment and the midglenoid notch"; title: "a normal anatomic capsulolabral variant". |
| S12-3 | A sublabral recess at the biceps anchor can mimic a type II SLAP tear. | Warning: SLAP II and sublabral recess both entered | R21 | partly. R21 abstract: "the sublabral recess of the superior glenoid labrum, which mimics a superior labral tear oriented in the anterior to posterior direction (SLAP) lesion" and "A sublabral recess is common in cadaveric shoulders and has an appearance similar to that of published examples of SLAP lesions." R21 does not say type II. R13 full text does: "false positive and false negative diagnoses of a SLAP type 2 lesion can be caused by misinterpretation of a sublabral recess as a tear and vice versa"; Applied (author, 2026-10-23): the "type II" point now cites R13 and Smith only the SLAP likeness. Step 6 help: "a sublabral recess looks like published examples of SLAP lesions (Smith), and misreading a sublabral recess as a tear, or a tear as a recess, gives false positive and false negative diagnoses of a type II SLAP lesion (Woertler)"; step 12 variant list: "with an appearance similar to SLAP lesions (Smith); it can be mistaken for a type II SLAP lesion and vice versa (Woertler)"; quiz explanation cites Woertler. The warning rule (SLAP II and sublabral recess both entered) is unchanged, since R13 states it. |
| S12-4 | Os acromiale is associated with rotator cuff impingement. | — | R22 | yes. R22 abstract: "Os acromiale can be an important cause of rotator cuff impingement and can be detected with routine MR imaging of the shoulder"; every one of the 10 patients had a supraspinatus lesion (tendinitis in four, tear in six). |

## Author's rulings applied

- Post-operative scope: the repaired rotator cuff only (step 11), not labral repair or
  arthroplasty.
- Each anatomical variant gets its own impression line (step 12), and the normal impression
  stays normal when only variants or an intact repair are entered.

## Still to do

1. Keep the "Unchecked draft" notes while any claim the pages use is unverified (N1-N6,
   S2-1, S3-2, and the unread parts of S2-3, S3-1, S3-3, S6-1, S10-2, S11-1 and S12-1).

## Second check, 2026-10-25: papers supplied by the author

Read in full: Kilcoyne RF, Shuman WP, Matsen FA 3rd, Morris M, Rockwood CA. The Neer classification
of displaced proximal humeral fractures: spectrum of findings on plain radiographs and CT scans. AJR.
1990;154(5):1029-1033. doi:10.2214/ajr.154.5.2108538. Neer 1970 itself is still unread.

| ID | Verdict | Evidence |
|----|---------|----------|
| N1 | partly | "one fragment or part is the humeral shaft, so the simplest displaced fracture is called a 'two-part' fracture"; the figures name the anatomic neck, surgical neck and both tuberosities. The four segments are not listed as such. |
| N2 | yes | "According to Neer, displacement of a fracture fragment by more than a centimeter or angulation of more than 45° is considered significant." |
| N3 | partly | "Neer estimated that over 85% of proximal fractures are not displaced"; "one-part" is not named. |
| N4 | yes | Two-part surgical neck, anatomic neck, greater and lesser tuberosity (Figs. 1-4); three-part surgical neck with greater or lesser tuberosity (Figs. 5, 6); four-part surgical neck and both tuberosities (Fig. 7). |
| N5 | yes | "fracture-dislocations, including head-splitting fractures (Fig. 8)"; impression fractures named among the cases where plain films underestimate displacement. |
| N6 | unchanged | The review names no other pattern; still the author's decision. |
