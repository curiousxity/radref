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

## Fifth check, 2026-10-28: Leone 2022 from the author

Read in full (open access): Leone E, et al. Diagnostics (Basel). 2022;12(2):384.
doi:10.3390/diagnostics12020384. It bears on the three questions above; nothing changed.

- **APC I threshold:** Leone gives grade 1 as "pubic symphysis diastasis <2.5 cm" and grades 2
  and 3 as ">2.5 cm", which matches the site's 2.5 cm, against Halawi's 2 cm.
- **Vertical shear:** "a cranial shift of the hemipelvis", one side; Leone does not say "or both".
- **APC III stability:** "Anterior–posterior compression grade 3 injuries have a multidirectional
  instability", and APC II "a rotational instability". That is closer to the site's column
  (APC III vertically unstable) than Halawi's Tile table. Leone's Tile paragraph still puts
  vertical instability only in type C.

## Sixth check, 2026-10-29: open sources

Read in full, both open access:

- Leone E, et al. Imaging review of pelvic ring fractures and its complications in high-energy
  trauma. Diagnostics (Basel). 2022;12(2):384. doi:10.3390/diagnostics12020384 (already read for
  P2-2; here its section 4.3 and Table 1, "Young and Burgess classification"). Now cited on the
  Young-Burgess page and beside Young and Burgess in the pelvis CT study.
- Gänsslen A, Tonetti J, Pohlemann T. Algorithms in acetabular fracture classifications. Arch
  Orthop Trauma Surg. 2024;144(10):4655-4665. doi:10.1007/s00402-024-05599-6 (PMC11576829,
  CC BY 4.0; Europe PMC full text; matched on Crossref). Now cited on the Letournel page and in the
  pelvis CT study.

Tried and blocked (need a browser): Brandser and Marsh, AJR 1998 (ajronline.org, Cloudflare
challenge); Scheinfeld 2015, Khurana 2014 and Young 1986 on pubs.rsna.org (403); Saterbak 1995,
Iowa Orthop J 15:184-196 (PMC2329054, a free scanned PDF behind PMC's proof-of-work download page).
A Cureus 2025 review (PMC12640466) describes each elementary type but cites Radiopaedia for it, so
it is not used.

| ID | Verdict | Evidence |
|----|---------|----------|
| YB-1 | yes | Leone: LC "Grade 1: compression fracture of the sacrum on the side of the impact, and transverse fracture of unilateral or bilateral pubic branches"; "Grade 2: grade 1 fractures, iliac wing fracture, posterior sacroiliac joint diastasis"; "Grade 3: the lateral compression force is associated with a contralateral anteroposterior compression force, with an external rotation of the contralateral hemipelvis (“windswept pelvis”)". With Alton and Halawi (second and fourth checks) every part of YB-1 is now stated. |
| YB-2 | yes | Leone: APC "Grade 1: pubic symphysis diastasis <2.5 cm"; "Grade 2: ... anterior sacroiliac joint diastasis ... The anterior sacroiliac joint diastasis is due to the rupture of the anterior sacroiliac ligament, sacrospinous ligament, and sacrotuberous ligament"; "Grade 3: ... anterior and posterior sacroiliac joint diastasis". |
| YB-3 | yes | Leone: "a destruction of the posterior elements of the pelvis and a cranial shift of the hemipelvis"; "Anteriorly, this kind of trauma may show a disruption of the pubic symphysis and vertical fracture of the pubic rami." (One side; Halawi's "one or both hemipelvices" question stays open, fourth check.) |
| YB-4 | partly | Leone: "The combination of lateral compression and vertical shear is the most common type of combined mechanism injury." The page, from Alton (second check): "most often lateral compression with AP compression or vertical shear". **For the author**: Leone names only LC with VS; nothing changed. |
| YB-6 | yes | Already verified (Alton). Leone agrees: "A widening > 2.5 cm is typically associated with a lesion of the pelvic ligaments of the posterior tension band"; APC grade 1 "<2.5 cm", grades 2 and 3 ">2.5 cm". Halawi's 2 cm (fourth check, question 1) is still open. |
| YB-8 | partly; one mismatch | Leone, Table 1 ("Fracture Stability"): LC grade 1 "Stable", grade 2 "Rotational instability", grade 3 "Multidirectional instability"; APC grade 1 "Stable", grade 2 "Rotational instability", grade 3 "Multidirectional instability"; vertical shear and combined mechanism "Multidirectional instability"; text: "Combined mechanism injuries are unstable". Seven of the eight "Usually taught as" entries agree. **For the author**: LC III. The page: "rotationally unstable, vertically stable"; Leone: "Lateral compression grade 3 injuries have a multidirectional instability". Nothing changed. **For the author** too: Leone says "The Young and Burgess classification combines the mechanism and the stability of the fractures", against Alton's "The concept of stability ... is not a part of the Young and Burgess classification", which the page quotes. |
| YB-9 | yes | Already verified (Halawi, fourth check); not repeated on the calculator page. |
| LT-2 (PW) | yes | Gänsslen, Table 1: "isolated ilioischial: PW, PC, PC/W"; Table 2: "isol. Ilioischial − inferior ramus: PW". Agrees with Durkee (second check). |
| LT-2 (PC) | partly | Gänsslen: "an inferior ramus fracture is usually present in AC, PC, PC/PW, T-shaped, ACPHT and ABC fractures, while the inferior ramus is usually intact in AW, PW, pT, and T/PW", so the posterior column fracture breaks the obturator ring (usually). "Through the greater sciatic notch" is not stated. Still unread. |
| LT-2 (AW) | partly | Gänsslen, Table 2: "isol. iliopectineal − inferior ramus: AW"; the iliopectineal line is broken and the obturator ring usually intact. "The middle of the iliopectineal line" is not stated. Still unread. |
| LT-2 (AC) | partly | Gänsslen, Table 2: "isol. iliopectineal + inferior ramus: AC"; "fracture lines extending between the anterior inferior iliac spine (AIIS) up to the iliac crest ... usually seen in AC, ACPHT and ABC fractures". "Or the anterior border" is not stated. Still unread. |
| LT-2 (T) | yes | Gänsslen: "ip + ii − inferior ramus: pT, TPW"; agrees with Durkee. |
| LT-3 | yes | Gänsslen: "if a PW fragment is present according to row 2 a PC/W fracture is diagnosed" (ilioischial line and inferior ramus broken); "if PW fragment is present according to row 6 a TPW fracture is diagnosed, while a pure transverse fracture is excluded"; "T-shaped = primary transverse fracture line plus a distal column separation"; "ACPHT = primary horizontal fracture line (anterior column separation or displacement) and a typical transverse fracture exclusively in the posterior part the acetabulum (posterior 'vertical' fracture = hemitransverse component)"; "ABC definition: complete separation of both columns on axial CT images with a transverse main fracture line and no articular fragment connected to the SI-joint". |
| LT-4 | yes | Already verified (Durkee). Gänsslen: "iliopectineal line = represents to ¾ the medial part of the anterior column; disruption indicates anterior column involvement"; ilioischial line "represents the posterior column in its lower and middle parts; disruption indicates posterior column involvement". |
| LT-5 | yes | Gänsslen: "The pathognomonic feature of an ABC fracture is the spur sign, which can be optimally seen on the obturator oblique view. This spur corresponds to the iliac fragment attached to the SI-joint without having any articular fragment attached." (The page dropped the obturator oblique view on Durkee's wording, second check; Gänsslen ties the spur to that view. Nothing changed.) |
| LT-6 | yes | Already verified (Durkee). Gänsslen: "ip + ii − inferior ramus: pT, TPW". |
| LT-7 | yes | Gänsslen: "ip + ii + inferior ramus: T, ACPHT, ABC"; "if no articular part is connected an ABC fracture is proven, while an articular connection indicates an ACPHT fracture"; the T-shaped and ACPHT definitions under LT-3. |

**For the author** (nothing changed): the iliac wing sentence. The Letournel page and the pelvis CT
study say that with both lines and the obturator ring broken, "a fracture running up into the iliac
wing is both-column and one that does not is T-shaped" (from Durkee, who covers only five types).
Gänsslen: iliac fossa fracture lines are "usually seen in AC, ACPHT and ABC fractures ... Only
T-shaped fractures usually have no iliac fossa involvement", so an ACPHT fracture also runs up into
the iliac wing. The calculator itself asks about the joint surface on the ilium before the
pattern, so it still reaches ACPHT; only the sentence and the calculator's hint leave ACPHT out.

Still unread after this check: LT-2's posterior column "through the greater sciatic notch", anterior
wall "breaking the middle of the iliopectineal line" and anterior column "from the iliac crest or the
anterior border". The pages' notes now say so.
