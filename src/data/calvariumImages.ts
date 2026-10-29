/**
 * The CT and MRI panels on the calvarial lesions page. Each is one panel cropped, unchanged
 * apart from conversion to greyscale, from a figure in an open-access article published under
 * CC BY 4.0, which allows reuse and adaptation with credit: the two reviews the page is written
 * from, and three case reports for the burr hole and osteomyelitis, which the reviews do not
 * illustrate. The arrows, circles and panel letters are the original authors'. The files live in `public/members/calvarium/`; `src/pages/calvarium.test.ts` checks
 * that each exists and carries its credit.
 */

export type CalvariumImage = {
  src: string
  alt: string
  /** What the arrows point at, from the source figure's caption. */
  caption: string
  source: keyof typeof CALVARIUM_SOURCES
  figure: string
}

export const CALVARIUM_SOURCES = {
  gomez: { short: 'Gomez et al. 2018', doi: '10.1007/s13244-018-0643-0' },
  pons: { short: 'Pons Escoda et al. 2020', doi: '10.1186/s13244-019-0820-9' },
  // Case reports, each checked for CC BY 4.0 in the article's licence statement; Crossref agrees
  // for Li (Frontiers) and has no licence for the two Cureus articles.
  sanjabi: { short: 'Sanjabi et al. 2026', doi: '10.7759/cureus.114767' },
  li: { short: 'Li et al. 2026', doi: '10.3389/fsurg.2026.1850959' },
  manzoor: { short: 'Manzoor et al. 2026', doi: '10.7759/cureus.110218' },
} as const

export const CC_BY = 'CC BY 4.0'

export const calvariumImages = {
  arachnoidGranulation: {
    src: '/members/calvarium/arachnoid-granulation.jpg',
    alt: 'Axial CT: well-defined lucencies along the inner table of the occipital bone beside the transverse sinuses',
    caption: 'Arachnoid granulations along the inner table by the transverse sinuses (arrowheads).',
    source: 'gomez',
    figure: 'Fig. 23a',
  },
  venousLake: {
    src: '/members/calvarium/venous-lake.jpg',
    alt: 'Axial CT: an oval lucency along the inner table of the left parietal bone',
    caption: 'A venous lake along the left parietal bone (dashed arrow), which enhanced on MRI, and prominent venous channels in the frontal bones (thick arrows).',
    source: 'gomez',
    figure: 'Fig. 24d',
  },
  parietalForamina: {
    src: '/members/calvarium/parietal-foramina.jpg',
    alt: 'Axial CT: symmetric full-thickness defects in both parietal bones',
    caption: 'Enlarged parietal foramina: symmetric defects on both sides (arrowheads).',
    source: 'pons',
    figure: 'Fig. 1f',
  },
  hyperostosisFrontalis: {
    src: '/members/calvarium/hyperostosis-frontalis.jpg',
    alt: 'Axial CT: irregular nodular thickening of the inner table of the frontal bone on both sides',
    caption: 'Hyperostosis frontalis interna: irregular thickening of the frontal inner table (arrowheads).',
    source: 'gomez',
    figure: 'Fig. 25a',
  },
  epidermoidCt: {
    src: '/members/calvarium/epidermoid-ct.jpg',
    alt: 'Coronal CT: an expansile lucent lesion in the right frontal bone thinning both tables',
    caption: 'Epidermoid cyst: expansile right frontal lesion (thick arrow) thinning the inner and outer tables (dashed arrows).',
    source: 'gomez',
    figure: 'Fig. 13a',
  },
  epidermoidDwi: {
    src: '/members/calvarium/epidermoid-dwi.jpg',
    alt: 'Axial diffusion-weighted MRI: the same lesion is bright',
    caption: 'The same cyst on diffusion-weighted imaging: restricted diffusion (arrowhead).',
    source: 'gomez',
    figure: 'Fig. 13d',
  },
  dermoid: {
    src: '/members/calvarium/dermoid.jpg',
    alt: 'Axial CT: a small midline fat-containing lesion in the frontal region',
    caption: 'Dermoid cyst: midline fat-containing frontal lesion (thick arrow).',
    source: 'gomez',
    figure: 'Fig. 14a',
  },
  hemangioma: {
    src: '/members/calvarium/hemangioma.jpg',
    alt: 'CT: a markedly expanded segment of skull with coarse radiating trabeculae',
    caption: 'Intraosseous hemangioma: marked expansion with enlarged trabeculae in a "spoke-wheel" pattern (dashed arrow).',
    source: 'pons',
    figure: 'Fig. 5d',
  },
  lch: {
    src: '/members/calvarium/lch.jpg',
    alt: 'Axial CT bone window in a child: a lytic left frontal defect with bevelled edges and an overlying soft-tissue mass',
    caption: 'Langerhans cell histiocytosis: destructive left frontal lesion with bevelled edges (dashed arrows) and a soft-tissue component (thick arrow).',
    source: 'gomez',
    figure: 'Fig. 5b',
  },
  metastasis: {
    src: '/members/calvarium/metastasis.jpg',
    alt: 'Axial CT: an expansile destructive lesion of the frontal skull',
    caption: 'Metastasis from renal cell carcinoma: expansile destructive frontal lesion (arrowheads).',
    source: 'gomez',
    figure: 'Fig. 18a',
  },
  myeloma: {
    src: '/members/calvarium/myeloma.jpg',
    alt: 'Axial CT: several small round lucencies scattered through the vault',
    caption: 'Multiple myeloma: multiple "punched-out" lytic lesions (arrows).',
    source: 'gomez',
    figure: 'Fig. 16b',
  },
  fibrousDysplasia: {
    src: '/members/calvarium/fibrous-dysplasia.jpg',
    alt: 'Axial CT: an expansile lesion of hazy ground-glass density in the right greater wing of the sphenoid',
    caption: 'Fibrous dysplasia: expansile ground-glass lesion, here in the right greater sphenoid wing (arrow).',
    source: 'gomez',
    figure: 'Fig. 2a',
  },
  paget: {
    src: '/members/calvarium/paget.jpg',
    alt: 'Axial CT: a thickened vault with dense patchy bone and coarse trabeculae',
    caption: 'Paget disease: increased density and thickened trabeculae (arrows).',
    source: 'gomez',
    figure: 'Fig. 10a',
  },
  osteoma: {
    src: '/members/calvarium/osteoma.jpg',
    alt: 'Axial CT: a dense rounded bony lump on the outer table of the left frontal bone',
    caption: 'Osteoma: dense lesion on the outer table of the left frontal bone (arrow).',
    source: 'gomez',
    figure: 'Fig. 3a',
  },
  meningioma: {
    src: '/members/calvarium/meningioma.jpg',
    alt: 'CT: a diploe-centred lesion with marked spiculated thickening of the bone',
    caption: 'Meningioma centred in the diploe, with marked spiculated hyperostosis (arrows).',
    source: 'pons',
    figure: 'Fig. 12h',
  },
  burrHoleCt: {
    src: '/members/calvarium/burr-hole-ct.jpg',
    alt: 'Axial CT angiogram: a gap through the skull in each temporal region, circled',
    caption: 'Burr holes in both temporal regions (circles and arrows), from earlier revascularization surgery.',
    source: 'sanjabi',
    figure: 'Fig. 1',
  },
  burrHole3d: {
    src: '/members/calvarium/burr-hole-3d.jpg',
    alt: '3D CT surface rendering of the skull: a small round hole through the bone',
    caption: 'The burr-hole site from an earlier subdural haematoma drainage, on 3D CT.',
    source: 'li',
    figure: 'Fig. 2D',
  },
  osteomyelitis: {
    src: '/members/calvarium/osteomyelitis.jpg',
    alt: 'Axial CT: forehead swelling over an eroded, fragmented left frontal bone',
    caption: 'Erosion of the left frontal bone with thinning of the inner and outer tables (arrow), suggesting osteomyelitis.',
    source: 'manzoor',
    figure: 'Fig. 2',
  },
} satisfies Record<string, CalvariumImage>
