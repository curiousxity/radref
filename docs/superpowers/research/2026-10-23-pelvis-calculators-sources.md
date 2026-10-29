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

## The author's decisions, 2026-10-29

Applied to `youngburgess.ts`, `letournel.ts`, both calculator pages and the pelvis CT study. Sources
re-read for this (all in full): Alton and Gee 2014 (PMC4079881, PMC article page), Halawi 2015
(PMC4600881, PMC article page), Leone 2022 (PMC8870907, Europe PMC full text) and Gänsslen 2024
(PMC11576829, Europe PMC full text). Halawi is now also cited on the Young-Burgess page (reference
checked on Crossref: Halawi MJ. Pelvic ring injuries: emergency assessment and management. J Clin
Orthop Trauma. 2015;6(4):252-258. doi:10.1016/j.jcot.2015.08.002).

Not readable: Lawrence DA, Menn K, Baumgaertner M, Haims AH. Acetabular fractures: anatomic and
clinical considerations. AJR Am J Roentgenol. 2013;201(3):W425-W436. doi:10.2214/AJR.12.10470
(PMID 23971473; matched on Crossref). ajronline.org returns a Cloudflare challenge (403) to curl with
browser User-Agents, OpenAlex and Semantic Scholar list no open copy, it is not in PMC, and the
PubMed abstract does not mention the iliac wing or the spur sign. It is not cited; decisions 39 and
40 rest on Gänsslen (and Durkee, already cited).

| ID | Decision | Change on the page |
|----|----------|--------------------|
| 33 | APC I: keep 2.5 cm as the conventional threshold, with a caveat; 2 cm only in a source-variation note reproducing Halawi's table. | APC I now reads "symphyseal diastasis, conventionally less than 2.5 cm, with no posterior instability". The Young-Burgess page and the study add: "Published thresholds vary (Halawi), and diastasis alone does not establish stability: it is measured on a single static image, and the pelvis may have sprung back or been reduced by a binder (Alton)." 2 cm is not mentioned on any page. |
| 34 | Vertical shear: "one or both". | VS now reads "vertical (cranial) displacement of one or both hemipelves from an axial force, with the anterior and posterior ring disrupted"; the calculator asks "Is one hemipelvis, or both, displaced upwards (vertically)?"; the study's ring section says vertical shear "pushes one or both hemipelves upwards". |
| 35 | APC III: keep "rotationally and vertically unstable"; vertical displacement need not be present. | APC III now reads "complete sacroiliac joint disruption, anterior and posterior sacroiliac ligaments torn; vertical displacement need not be present"; stability "rotationally and vertically unstable, even without vertical displacement". Both pages: "APC III is rotationally and vertically unstable, but it has no vertical displacement, which is what separates it from vertical shear (Halawi; Leone): no displacement on a static image does not prove vertical stability (Alton)." Halawi's Tile table ("Rotationally unstable; vertically stable" for type B, where open-book injuries sit) is conflicting secondary-source terminology and is not shown on the pages. |
| 36 | LC III: remove the unconditional "vertically stable". | Stability now "unstable, to a degree and in a direction set by the posterior ring injury"; description "lateral compression on the side of impact with external rotation (AP compression) of the other hemipelvis, the windswept pelvis". Both pages: "LC III is unstable; how unstable, and in which direction, depends on the posterior ring injury (Leone)." The study's L5 warning (P2-2 against a vertically stable type) no longer fires for LC III. Leone's "multidirectional instability" is not turned into a requirement for vertical displacement. |
| 37 | Reconcile Young-Burgess and stability. | The "Usually taught as" column is now "Stability implication". Alton's "not a part" sentence and the "usually taught as" framing are replaced on both pages by: "Young-Burgess classifies pelvic ring injuries by the main direction of the force and the disruption it causes (Alton; Leone). The patterns inform the assessment of stability, but do not replace a direct look at the posterior ring or the stability-based Tile and AO/OTA classifications (Alton; Leone); the last column gives the usual implication of each type." |
| 38 | Combined mechanism: definition apart from frequency. | CMI now reads "combined mechanism: features of more than one primary pattern (lateral compression, AP compression, vertical shear)". Both pages: "A combined mechanism has features of more than one primary pattern (Alton); Leone describes lateral compression with vertical shear as the commonest combination (Leone)." The calculator page adds that it names a combined mechanism only for vertical displacement with lateral compression (the site's reading, YB-4). Alton's "majority ... combined with AP or VS" is no longer on the pages. |
| 39 | Iliac wing sentence: broaden; both-column is decided by detachment of the joint surface, not the wing. | Study (step 4) and Letournel page: "With the obturator ring broken as well, the fracture is T-shaped, anterior column with posterior hemitransverse, or both-column; what makes it both-column is that no articular fragment stays connected to the sacroiliac joint, not a fracture into the iliac wing. Iliac wing extension may occur in anterior column fractures, including the anterior column with posterior hemitransverse, and in both-column fractures; a T-shaped fracture usually does not reach the iliac wing." The Letournel hint says the same. The calculator logic was checked: it has no iliac wing input; both-column is reached only by "no joint surface still attached to the intact ilium" (`articularOnIlium: false`), so nothing in the logic changed. The anterior column option label ("Runs up into the ilium and down through the pubic ramus") is unchanged; it names the ilium, not the iliac wing. |
| 40 | Spur sign: "best demonstrated" on the obturator oblique view; the iliac fragment attached to the sacroiliac joint. | Study and Letournel page: "The spur sign of a both-column fracture is best seen on the obturator oblique view: it is the iliac fragment left attached to the sacroiliac joint with no joint surface on it, a shard of bone pointing backwards at the level of the acetabular roof on radiographs and CT." The study's both-column quiz explanation says the same. Not added, because no source read states it: "ipsilateral" (Gänsslen says only "the obturator oblique view") and "projecting beside the displaced acetabular fragments" (the location kept is Durkee's). |

Quotes relied on:

- Alton and Gee: "APC I injuries show less than 2.5 cm of symphyseal widening and have no posterior
  instability either clinically or radiographically"; "In the original description by Young et
  al., a 2.5-cm diastasis at the symphysis pubis was the criterion to differentiate APC I from APC
  II injuries ... This measurement is made off a single, static radiograph at one time. However,
  Gardner et al. showed pelvic ring injuries recoil and the displacement seen on pelvic AP
  radiographs often underrepresent the actual degree of injury as the pelvis may have “sprung back”
  or it may be reduced by a pelvic binder or sheet"; "These data suggest that unstressed imaging
  may underrepresent the degree of injury and true pelvic instability"; "VS injuries result from an
  axially loaded force delivered over one or both hemipelves lateral to the midline"; "Complex
  injury patterns are a combination of any three primary patterns (APC, LC, or VS)"; "The vector of
  force applied to the pelvic ring is an important determining factor in resulting injury pattern
  and is the foundation of the Young and Burgess classification system"; "AP-directed forces cause
  deformity or instability in a predictable pattern based on the injury and disruption of anterior
  and posterior pelvic structures"; "The concept of stability, central to the AO/OTA classification
  system, is not a part of the Young and Burgess classification"; the AO/OTA system "separates
  pelvic ring injuries based on anatomic location and stability"; "This classification system is
  limited in its description of posterior ring injuries".
- Halawi, Table 2: "Symphysis diastasis < 2 cm; SI joints intact" (APC I); "Symphysis diastasis
  with disruption of the anterior and posterior SI ligaments" (APC III); "Vertical displacement of
  one or both hemipelvices" (VS); "A combination of the above injuries" (combined). Text: "APCIII
  can be differentiated from VS injury by the absence of vertical displacement of the hemipelvis."
  Table 1 (Tile): type B "Rotationally unstable; vertically stable".
- Leone: "Once the pelvic ring fracture is recognized, it is essential to assess its stability.
  Fractures and dislocations of the posterior part of the pelvic ring, and in particular the degree
  of involvement of the posterior tension band, affect the stability of the pelvic ring"; Tile
  "Type B fractures have rotational instability, but they are vertically stable, due to an
  incomplete disruption of the posterior arch structures"; "Type C fractures are vertically and
  rotationally unstable, and they are characterized by a complete disruption of the anterior and
  posterior arches"; "The Young and Burgess classification combines the mechanism and the stability
  of the fractures"; "The first step in using this system is the identification of the main
  direction of the force vector"; LC "Grade 3: the lateral compression force is associated with a
  contralateral anteroposterior compression force, with an external rotation of the contralateral
  hemipelvis (“windswept pelvis”) ... Lateral compression grade 3 injuries have a multidirectional
  instability"; APC "Grade 3: ... anterior and posterior sacroiliac joint diastasis ...
  Anterior–posterior compression grade 3 injuries have a multidirectional instability"; vertical
  shear "a destruction of the posterior elements of the pelvis and a cranial shift of the
  hemipelvis ... Anteriorly, this kind of trauma may show a disruption of the pubic symphysis and
  vertical fracture of the pubic rami. Rotational and vertical instability is the result of vertical
  shear injuries"; "The combination of lateral compression and vertical shear is the most common
  type of combined mechanism injury."
- Gänsslen: "Some fracture types show fracture lines extending between the anterior inferior iliac
  spine (AIIS) up to the iliac crest. These fracture types represent iliac fossa involvement, which
  is usually seen in AC, ACPHT and ABC fractures ... Only T-shaped fractures usually have no iliac
  fossa involvement. Thus, if no fracture line extends into the iliac wing, a T-shaped fracture is
  likely"; "ABC definition: complete separation of both columns on axial CT images with a transverse
  main fracture line and no articular fragment connected to the SI-joint"; "if no articular part is
  connected an ABC fracture is proven, while an articular connection indicates an ACPHT fracture";
  "The pathognomonic feature of an ABC fracture is the spur sign, which can be optimally seen on the
  obturator oblique view. This spur corresponds to the iliac fragment attached to the SI-joint
  without having any articular fragment attached."

Claim status after these decisions: YB-2, YB-3, YB-4 and YB-8 now match their sources' wording; the
Young-Burgess page had no "Unchecked draft" note and still has none. The Letournel page keeps its
"Unchecked draft" note while the three LT-2 phrases (posterior column through the greater sciatic
notch, anterior wall at the middle of the iliopectineal line, the anterior column's upper end) are
unread.
