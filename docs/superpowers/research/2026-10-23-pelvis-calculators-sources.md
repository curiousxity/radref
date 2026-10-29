# Pelvis calculators (Young-Burgess, Letournel): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the two pelvis calculators (`/young-burgess`, `/letournel`) and their shared
logic in `src/logic/` (`youngburgess.ts`, `letournel.ts`), which the pelvis CT study also uses.
The study's own claims are in `2026-10-23-pelvis-ct-sources.md`.

## Status: references matched, most claims not verifiable yet (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed, its DOI resolved on Crossref, and a claim marked verified only
when its wording was read in the PubMed abstract or open full text. None of these seven papers
has open full text (Unpaywall lists no open copy; the RSNA and AJR pages return 403), and
Judet 1964 has no abstract. The abstracts name the force patterns, the grades and the ten
Letournel types, but not the wording of each type, so most claims below stay unchecked.

The author chose (2026-10-23): add the DOIs now and keep the unverified claims, with the
pages' "Unchecked draft" notes, until they are checked.

## References

| # | Citation | PMID | DOI | Read |
|---|---|---|---|---|
| PC1 | Young JW, Burgess AR, Brumback RJ, Poka A. Pelvic fractures: value of plain radiography in early assessment and management. Radiology. 1986;160(2):445-451. | 3726125 | 10.1148/radiology.160.2.3726125 | Abstract |
| PC2 | Burgess AR, Eastridge BJ, Young JW, Ellison TS, Ellison PS Jr, Poka A, Bathon GH, Brumback RJ. Pelvic ring disruptions: effective classification system and treatment protocols. J Trauma. 1990;30(7):848-856. | 2381002 | 10.1097/00005373-199007000-00015 | Abstract |
| PC3 | Khurana B, Sheehan SE, Sodickson AD, Weaver MJ. Pelvic ring fractures: what the orthopedic surgeon wants to know. RadioGraphics. 2014;34(5):1317-1333. | 25208283 | 10.1148/rg.345135113 | Abstract |
| PC4 | Judet R, Judet J, Letournel E. Fractures of the acetabulum: classification and surgical approaches for open reduction. Preliminary report. J Bone Joint Surg Am. 1964;46:1615-1646. | 14239854 | 10.2106/00004623-196446080-00001 | No abstract |
| PC5 | Letournel E. Acetabulum fractures: classification and management. Clin Orthop Relat Res. 1980;(151):81-106. | 7418327 | 10.1097/00003086-198009000-00012 | Abstract |
| PC6 | Durkee NJ, Jacobson J, Jamadar D, Karunakar MA, Morag Y, Hayes C. Classification of common acetabular fractures: radiographic and CT appearances. AJR Am J Roentgenol. 2006;187(4):915-925. | 16985135 | 10.2214/AJR.05.1269 | Abstract |
| PC7 | Scheinfeld MH, Dym AA, Spektor M, Avery LL, Dym RJ, Amanatullah DF. Acetabular fractures: what radiologists should know and how 3D CT can aid classification. RadioGraphics. 2015;35(2):555-577. | 25763739 | 10.1148/rg.352140098 | Abstract |

PC4: PubMed gives pages 1615-46, Crossref 1615-1675; the pages keep PubMed's range.

What the abstracts do say:

- PC1: "four patterns of force were identified ... anteroposterior compression, lateral
  compression, vertical shear, and a complex pattern".
- PC2: "lateral compression, anteroposterior compression, vertical shear, and combined
  mechanical injury"; blood replacement averaged 3.6 units for lateral compression, 14.8 for
  AP compression, 9.2 for vertical shear and 8.5 for combined mechanical injury.
- PC3: "Opening and closing of the pelvis from rotational forces result in AP compression and
  lateral compression injuries, respectively, whereas vertical shear injuries result from
  cephalad displacement of the hemipelvis. AP and lateral compression fractures are divided into
  types 1, 2, and 3, with increasing degrees of severity."
- PC6: "assessment of the obturator ring, followed by the iliopectineal and ilioischial lines
  and iliac wing, for fracture allows accurate classification."
- PC7: "The elementary fractures are anterior wall, posterior wall, anterior column, posterior
  column, and transverse. The associated fractures ... include transverse with posterior wall,
  T-shaped, associated both column, anterior column or wall with posterior hemitransverse, and
  posterior column with posterior wall. The most unique fracture is the associated both column
  fracture, which completely dissociates the acetabular articular surface from the sciatic
  buttress."

## Claims

### Young-Burgess (PC1 to PC3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| YB-1 | LC I: sacral compression on the side of impact with transverse (horizontal) pubic rami fractures. LC II: with an iliac wing (crescent) fracture on the side of impact. LC III: lateral compression on the side of impact with an open book (AP compression) of the other side, the windswept pelvis. Does LC II also cover a posterior sacroiliac disruption without an iliac fracture? | lateral → LC I; with crescent → LC II; other side opened → LC III | no: the subtype wording is not in PC1-PC3 abstracts (PC3 confirms only that LC has types 1-3 and comes from closing the pelvis). Kept, unchecked. |
| YB-2 | APC I: slight widening of the symphysis or the anterior sacroiliac joint, ligaments stretched but intact. APC II: widened anterior sacroiliac joint, anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact. APC III: complete sacroiliac disruption, posterior ligaments torn too. | SI anterior → II; SI complete → III; symphysis only → I | no: as YB-1 (PC3 confirms only that APC has types 1-3 and comes from opening the pelvis). Kept, unchecked. |
| YB-3 | Vertical shear: vertical displacement of a hemipelvis, anteriorly and posteriorly. | vertical, no LC → VS | partly. PC3 abstract: "vertical shear injuries result from cephalad displacement of the hemipelvis". "Anteriorly and posteriorly" is not stated. Kept. |
| YB-4 | Combined mechanical injury: a combination of patterns, most often lateral compression with vertical shear. | vertical with LC → CMI. Other combinations are not detected (the site's reading). | partly. PC2 abstract names "combined mechanical injury" as a type; "most often lateral compression with vertical shear" is not stated. Kept, unchecked. |
| YB-5 | Vertical displacement names the type before lateral or AP compression (the site's ordering). | hierarchy | the site's ordering; no paper to check. Kept. |
| YB-6 | A symphyseal diastasis over 2.5 cm usually means APC II or worse. Is 2.5 cm in Young or Burgess, or only in later reviews (PC3)? Exactly 2.5 cm is read as not over. | > 25 mm → prompt | no: 2.5 cm is in none of the abstracts. Kept, unchecked. |
| YB-7 | The calculator grades AP compression by the worse sacroiliac joint (the site's reading). | — | the site's reading; no paper to check. Kept. |
| YB-8 | Stability as usually taught: LC I and APC I stable; LC II, LC III and APC II rotationally unstable, vertically stable; APC III and VS rotationally and vertically unstable; CMI unstable. Where is this stated (PC2, PC3)? | "Usually" column and chip | no: PC3 says the system is used for "assessing stability" but gives no stability by type. Kept, unchecked. |
| YB-9 | The pelvic ring rarely breaks in one place only: an anterior injury should send the reader to the posterior ring (PC3). Text only. | — | no: not in the PC3 abstract. Kept, unchecked. |

### Letournel (PC4 to PC7)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| LT-1 | Five elementary types (posterior wall, posterior column, anterior wall, anterior column, transverse) and five associated types (posterior column and wall, transverse and posterior wall, T-shaped, anterior column or wall with posterior hemitransverse, both-column). | — | yes. PC7 abstract (quoted above) lists the five elementary and five associated types. |
| LT-2 | Elementary type wording, as in `ltDescriptions`. In particular: does a posterior column fracture break the obturator ring, and is a transverse fracture's obturator ring intact? | — | no: the obturator ring per type is not in the abstracts. Kept, unchecked. |
| LT-3 | Associated type wording, as in `ltDescriptions`. | — | partly: the both-column wording matches PC7 ("completely dissociates the acetabular articular surface from the sciatic buttress"); the rest is not in the abstracts. Kept. |
| LT-4 | The iliopectineal line belongs to the anterior column and the ilioischial line to the posterior column (PC6). | lines → column | no: PC6 names both lines but not which column each belongs to. Kept, unchecked. |
| LT-5 | A both-column fracture leaves no joint surface attached to the intact ilium; the spur sign is the ilium left behind, on the obturator oblique view. | no surface on ilium → BC | partly: the first half matches PC7 (see LT-3); the spur sign is not in the abstracts. Kept. |
| LT-6 | With both lines broken, an intact obturator ring means a transverse fracture (with or without a posterior wall fragment). | obturator intact → T or TPW | no: PC6 supports only the order (obturator ring, then the lines, then the iliac wing). Kept, unchecked. |
| LT-7 | With both lines and the obturator ring broken and joint surface on the ilium: a vertical stem through the ischiopubic part is T-shaped; an anterior fracture with a posterior hemitransverse is ACPHT (PC6, PC7). | — | no: as LT-6. Kept, unchecked. |
| LT-8 | A posterior wall fragment beside a T-shaped, hemitransverse or both-column fracture is written as an addition, not a new type (the site's notation). | — | the site's notation; no paper to check. Kept. |
| LT-9 | An anterior column or wall fracture with a posterior wall fragment is not one of the ten types. | no type | not checkable from the abstracts; PC7 lists the ten types and this is not one of them. Kept. |

## Second check, 2026-10-25: papers supplied by the author

Read in full: Alton TB, Gee AO. Classifications in brief: Young and Burgess classification of pelvic
ring injuries. Clin Orthop Relat Res. 2014;472(8):2338-2342. doi:10.1007/s11999-014-3693-8 (describes
Young 1986), and Durkee 2006 (PC6). Young 1986, Burgess 1990, Khurana 2014 and Scheinfeld 2015 are
still unread.

| ID | Verdict | Evidence |
|----|---------|----------|
| YB-1 | partly, changed | LC I: "a lateral force delivered over the posterior aspect of the pelvis ... Sacral injury severity ranges from an incomplete anterior buckle fracture to complete sacral fracture"; rami "more horizontal or coronal". LC II: "may be a sacral fracture, sacroiliac ligament and joint disruption, or crescent fracture-dislocation of the ilium". LC III: "injury to the contralateral hemipelvis in the form of anterior sacroiliac ligament disruption and sacrospinous and sacrotuberous ligament injury". Answer to the open question: LC II does cover a sacroiliac disruption; the calculator now has that option. |
| YB-2 | yes, APC I reworded | "APC I injuries show less than 2.5 cm of symphyseal widening and have no posterior instability"; APC II "instability of the posterior pelvis resulting from disruption of the anterior sacroiliac complex"; APC III "complete posterior ligamentous disruption". |
| YB-3 | partly | "The sacrum is driven down, relative to the iliac wing, resulting in complete ligamentous injury ... Fracture of the pelvic ring may be present instead of ligamentous injury." |
| YB-4 | no, changed | "The majority of the complex injury patterns originally described by Young et al. resulted from LC injuries being combined with AP or VS patterns." Was "most often lateral compression with vertical shear". |
| YB-6 | yes | "In the original description by Young et al., a 2.5-cm diastasis at the symphysis pubis was the criterion to differentiate APC I from APC II injuries". |
| YB-8 | no: not part of the system | "The concept of stability, central to the AO/OTA classification system, is not a part of the Young and Burgess classification." By the author's choice the column stays, labelled "Usually taught as", with that sentence on the page. |
| LT-2 (PW) | no, changed | Durkee: "the iliopectineal line is not disrupted ... However, disruption of the ilioischial line may or may not be present as an extension of the comminuted posterior wall component." The calculator gave a broken ilioischial line with a wall fragment as PCPW; it now asks whether the posterior column itself is separated. |
| LT-2 (T) | yes | "limited to the acetabulum, without involvement of the obturator ring ... the iliopectineal and ilioischial lines are disrupted". |
| LT-4 | yes | "the iliopectineal (or iliopubic) line represents the border of the anterior column, and the ilioischial line represents the posterior column". |
| LT-5 | yes, wording changed | Spur sign: "posterior displacement of the sciatic buttress ... a shard of bone extending posteriorly at the level of the superior acetabulum" on radiographs and CT. The page no longer ties it to the obturator oblique view. |
| LT-6 | yes | "Sparing of the obturator ring commonly indicates transverse, transverse with posterior wall, or isolated posterior wall fracture." |
| LT-7 | partly, added | T-shaped: "a transverse acetabular fracture with extension inferiorly into the obturator ring"; "the superior extension of the fracture does not involve the iliac wing, which allows differentiation from the both-column fracture". The iliac wing hint is added to the page and study. ACPHT is not in Durkee (five types only). |

## Third check, 2026-10-25: second batch from the author

Read in full: Alton TB, Gee AO. Classifications in brief: Letournel classification for acetabular
fractures. Clin Orthop Relat Res. 2014;472(1):35-38. doi:10.1007/s11999-013-3375-y. It names the ten
types (LT-1, yes) and says the 2009 algorithm of Prevezas et al. reads the ilioischial and
iliopectineal lines first, then the obturator foramen and the spur sign, as the calculator does. It
does not describe each type, so LT-2, LT-3 and LT-7 beyond Durkee stay unchecked.

## Fourth check, 2026-10-28: Halawi 2015 from the author

Read in full, in place of Khurana 2014 (PC3), which is still unread: Halawi MJ. Pelvic ring injuries:
emergency assessment and management. J Clin Orthop Trauma. 2015;6(4):252-258.
doi:10.1016/j.jcot.2015.08.002. Its Table 2 gives the Young-Burgess types from Burgess 1990.

| ID | Verdict | Evidence |
|----|---------|----------|
| YB-1 (LC II without an iliac fracture) | yes, agrees with Alton | "In LCII pattern, there is a characteristic avulsion fracture of the iliac wing (crescent fracture) ... Alternatively, there may be disruption of the posterior SI ligaments without a crescent fracture, especially in young patients." |
| YB-3 (vertical shear) | partly | Table 2: "Vertical displacement of one or both hemipelvices." Text: "APCIII can be differentiated from VS injury by the absence of vertical displacement of the hemipelvis." "Anteriorly and posteriorly" is still not stated. |
| YB-9 | yes | See the pelvis CT sources, fourth check. |

For the author (nothing changed):

1. **APC I threshold.** Halawi's Table 2: "Symphysis diastasis < 2 cm; SI joints intact." The
   calculator and study use 2.5 cm, from Alton and Gee's account of Young's original description
   (YB-6, matched by the author's choice on 2026-10-25). Keep 2.5 cm, or mention that later tables
   give 2 cm?
2. **Vertical shear can be both sides.** Halawi: "one or both hemipelvices". The calculator's
   wording is "a hemipelvis". Add "or both"?
3. **APC III stability.** The "Usually taught as" column (YB-8) has APC III rotationally and
   vertically unstable. Halawi's simplified Tile table puts open-book fractures in type B
   ("Rotationally unstable; vertically stable") and only VS injuries in type C, and says APC III
   differs from VS by "the absence of vertical displacement". Osterhoff's grouping in the same paper
   counts LC II/III, APC II/III, VS and combined as "unstable" without splitting rotation from
   vertical. Keep the column, or change APC III?
