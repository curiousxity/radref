import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the shoulder mri study (`src/studies/ShoulderMriStudy.tsx`). */
export const shoulderMriScans = {
  hillSachsLesion: {
    src: '/scans/shoulder-mri/hill-sachs-lesion.jpg',
    alt: 'Axial fat-saturated T2-weighted MRI of the shoulder at the level of the coracoid process, with an arrow on a defect in the posterolateral humeral head and an arrowhead on the coracoid.',
    caption: 'Axial fat-saturated T2-weighted MRI at the level of the coracoid process (arrowhead) showing a Hill-Sachs defect (arrow) in a patient with a history of anterior shoulder dislocation.',
    source: S.kadi2017,
    figure: 'Fig. 4b',
  },
  supraspinatusFullTear: {
    src: '/scans/shoulder-mri/supraspinatus-full-tear.jpg',
    alt: 'Oblique coronal fat-suppressed PD-weighted MRI of the shoulder with a fluid-bright gap through the full thickness of the supraspinatus tendon at its insertion, marked by a black and a white arrow.',
    caption: 'Oblique coronal fat-suppressed PD-weighted MRI showing a full-thickness supraspinatus tendon tear that connects the articular side (white arrow) with the bursal side (black arrow).',
    source: S.yubran2024,
    figure: 'Fig. 10b',
  },
  goutallierGrade4: {
    src: '/scans/shoulder-mri/goutallier-grade4.jpg',
    alt: 'Oblique sagittal T1-weighted MRI of the shoulder labelled Grade 4, with the rotator cuff muscle bellies largely replaced by bright fat.',
    caption: 'Oblique sagittal T1-weighted MRI from a series grading fatty atrophy of the supraspinatus and infraspinatus with the modified Goutallier classification; this panel is grade 4, more fat than muscle.',
    source: S.yubran2024,
    figure: 'Fig. 23e',
  },
  subscapularisTear: {
    src: '/scans/shoulder-mri/subscapularis-tear.jpg',
    alt: 'Axial PD-weighted MRI of a right shoulder with a long arrow on a torn subscapularis tendon and a short double-headed arrow showing its medial retraction from the lesser tuberosity.',
    caption: 'Axial PD-weighted MRI in a 49-year-old man who could not extend his arm after a fall, showing a full-thickness subscapularis tendon tear (long arrow) with medial retraction (short double-headed arrow).',
    source: S.ahmad2022,
    figure: 'Fig. 5a',
  },
  bicepsDislocation: {
    src: '/scans/shoulder-mri/biceps-dislocation.jpg',
    alt: 'Axial fat-suppressed T2-weighted MRI of a right shoulder with an arrow on the long head of biceps tendon displaced medially out of the bicipital groove, and arrowheads on small cysts in the greater tuberosity.',
    caption: 'Axial T2-weighted fat-suppressed MRI in the same patient with a full-thickness subscapularis tear, showing medial displacement of the long head of the biceps tendon (arrow); the arrowheads mark subchondral cysts at the greater tuberosity.',
    source: S.ahmad2022,
    figure: 'Fig. 5b',
  },
  bankartLesion: {
    src: '/scans/shoulder-mri/bankart-lesion.jpg',
    alt: 'Axial fat-saturated T1-weighted MR arthrogram of the shoulder with contrast distending the joint and an arrow on the anteroinferior labrum separated from the glenoid rim.',
    caption: 'Axial fat-saturated T1-weighted MR arthrogram showing a Bankart lesion: the anteroinferior labrum is torn off the glenoid rim and has an irregular inferior outline (arrow).',
    source: S.pouliart2016,
    figure: 'Fig. 5',
  },
  slapTear: {
    src: '/scans/shoulder-mri/slap-tear.jpg',
    alt: 'Coronal oblique fat-suppressed T1-weighted MR arthrogram of the superior labrum with an arrow on contrast that runs laterally into the base of the superior labrum.',
    caption: 'Coronal oblique fat-suppressed T1-weighted MR arthrogram in a type II SLAP lesion, showing a laterally oriented contrast collection at the superior labrum (arrow), a feature of a labral tear.',
    source: S.mercouris2023,
    figure: 'Fig. 4c',
  },
  haglLesion: {
    src: '/scans/shoulder-mri/hagl-lesion.jpg',
    alt: 'Coronal fat-saturated T1-weighted MR arthrogram of the shoulder with an arrow on the axillary pouch, whose normal U shape has become a J shape with a thick, irregular inferior glenohumeral ligament.',
    caption: 'Coronal fat-saturated T1-weighted MR arthrogram of a HAGL lesion: the torn inferior glenohumeral ligament has a thickened, irregular, wavy outline and the U-shaped axillary pouch has become J-shaped (arrow).',
    source: S.pouliart2016,
    figure: 'Fig. 11b',
  },
  paralabralCystDenervation: {
    src: '/scans/shoulder-mri/paralabral-cyst-denervation.jpg',
    alt: 'Sagittal fat-suppressed PD-weighted MRI of the shoulder with a white arrow on a bright cyst at the spinoglenoid notch and a grey arrow on the infraspinatus muscle, which is small and slightly bright.',
    caption: 'Sagittal fat-suppressed PD-weighted MRI in a 20-year-old man with 6 months of shoulder weakness: a paralabral cyst from a posterior labral tear (white arrow) extends into the spinoglenoid notch, and the infraspinatus shows atrophy and mild denervation oedema (grey arrow), sparing the supraspinatus.',
    source: S.mangi2022,
    figure: 'Fig. 4b',
  },
  sublabralRecess: {
    src: '/scans/shoulder-mri/sublabral-recess.jpg',
    alt: 'Coronal oblique fat-suppressed T1-weighted MR arthrogram of the superior glenoid with two arrows on a thin line of contrast between the superior labrum and the glenoid cartilage.',
    caption: 'Coronal oblique fat-suppressed T1-weighted MR arthrogram of a sublabral recess: a linear high signal undercuts the superior labrum (arrows), following the contour of the glenoid cartilage without extending behind the biceps anchor.',
    source: S.kadi2017,
    figure: 'Fig. 13a',
  },
} satisfies Record<string, ScanImage>
