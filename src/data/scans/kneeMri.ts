import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the knee mri study (`src/studies/KneeMriStudy.tsx`). */
export const kneeMriScans = {
  pivotShiftBruise: {
    src: '/scans/knee-mri/pivot-shift-bruise.jpg',
    alt: 'Sagittal fat-suppressed proton density MRI of the knee with bright marrow edema in the lateral femoral condyle, marked by an asterisk, and in the back of the lateral tibial plateau, marked by an arrow',
    caption: 'Sagittal proton density fat-saturated image of the left knee of a soccer player after a non-contact ACL tear: bone bruises in the lateral femoral condyle (asterisk) and the lateral tibial plateau (arrow), a combination the authors found more often in pivoting-sport athletes.',
    source: S.ubl2025,
    figure: 'Fig. 3D',
  },
  bucketHandleTear: {
    src: '/scans/knee-mri/bucket-handle-tear.jpg',
    alt: 'Sagittal fat-suppressed proton density MRI of the knee showing two parallel dark bands in the intercondylar notch, the posterior cruciate ligament and a displaced meniscal fragment beneath it, labelled a and b',
    caption: 'Sagittal PD fat-suppressed image in a 34-year-old man after a rotational injury: a low-signal curvilinear structure lies in the intercondylar notch, parallel and immediately anterior to the PCL (dashed arrow, a), producing the double PCL sign. It is the displaced bucket-handle fragment of the medial meniscus (arrow, b).',
    source: S.koutserimpas2026,
    figure: 'Fig. 1A',
  },
  meniscalExtrusion: {
    src: '/scans/knee-mri/meniscal-extrusion.jpg',
    alt: 'Coronal fat-suppressed proton density MRI of the medial knee compartment with two vertical lines measuring 6.4 mm of medial meniscus extrusion beyond the tibial margin',
    caption: 'Coronal PD fat-suppressed image in a 69-year-old woman with a complete radial tear of the posterior root of the medial meniscus and a subchondral insufficiency fracture of the medial tibial plateau: the meniscus is extruded 6.4 mm, measured between the peripheral chondro-osseous margin of the tibia and the outer edge of the meniscus on the image with the greatest volume of the medial tibial spine (asterisk).',
    source: S.nguyen2026,
    figure: 'Fig. 18',
  },
  discoidMeniscus: {
    src: '/scans/knee-mri/discoid-meniscus.jpg',
    alt: 'Sagittal fat-suppressed T2 MRI through the lateral compartment of a young knee showing a continuous slab of meniscus spanning the joint between the femur and tibia, marked by an arrow',
    caption: 'Sagittal T2 fat-suppressed image of a discoid lateral meniscus: the bow-tie appearance persists on the more central slices instead of turning into two opposing triangles (arrow).',
    source: S.lefevre2016,
    figure: 'Fig. 16b',
  },
  aclTear: {
    src: '/scans/knee-mri/acl-tear.jpg',
    alt: 'Sagittal proton density MRI of the knee in which the anterior cruciate ligament is replaced by high signal with discontinuous fibres, marked by a thin arrow',
    caption: 'Sagittal proton density image: high signal in the ACL with fibre discontinuity (arrow), proven to be a complete ACL tear.',
    source: S.parkar2024,
    figure: 'Fig. 2A',
  },
  mclTear: {
    src: '/scans/knee-mri/mcl-tear.jpg',
    alt: 'Coronal fat-suppressed proton density MRI of the knee with disrupted, oedematous proximal medial collateral ligament fibres at the femoral attachment, marked by an arrow',
    caption: 'Coronal proton density fat-saturated image of a right knee: complete proximal tear of the medial collateral ligament, both superficial and deep parts (arrow).',
    source: S.cristiani2024,
    figure: 'Fig. 1a',
  },
  patellarDislocation: {
    src: '/scans/knee-mri/patellar-dislocation.jpg',
    alt: 'Axial fat-suppressed proton density MRI of the knee after lateral patellar dislocation showing a torn medial patellofemoral ligament, a flat trochlea and bright bone bruises in the medial patella and lateral femoral condyle',
    caption: 'Axial PD fat-suppressed image after a transient lateral patellar dislocation: disruption of the medial patellofemoral ligament (open arrow) and trochlear dysplasia (arrowheads). Edema in the medial patella and the lateral femoral condyle (arrow) is bone contusion from the recent dislocation.',
    source: S.jibri2019,
    figure: 'Fig. 7',
  },
  osteochondralDefect: {
    src: '/scans/knee-mri/osteochondral-defect.jpg',
    alt: 'Coronal proton density MRI of the knee with a fluid-filled defect in the articular surface of the femoral condyle marked by a star, a displaced fragment marked by an arrowhead, and marrow edema marked by arrows',
    caption: 'Coronal proton density image after a fall: an osteochondral defect (star) with a dislodged osteochondral fragment (arrowhead), and slight oedema in the femur (arrows).',
    source: S.parkar2024,
    figure: 'Fig. 4A',
  },
  bakerCyst: {
    src: '/scans/knee-mri/baker-cyst.jpg',
    alt: 'Axial fat-suppressed T2 MRI of the knee with a bright fluid-filled popliteal cyst posteromedially and its narrow neck to the joint, marked by a small black arrow',
    caption: 'Axial fat-suppressed T2-weighted image: a Baker cyst (enlarged medial gastrocnemius-semimembranosus recess) lies posteromedially, with a connecting stalk to the knee joint between the medial gastrocnemius and semimembranosus tendons (black arrow).',
    source: S.vanhoenacker2016,
    figure: 'Fig. 23A',
  },
} satisfies Record<string, ScanImage>
