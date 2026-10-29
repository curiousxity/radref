import { Cite } from './LessonPage'
import type { ScanImage } from '../data/scans/types'

/**
 * Real example scans under a lesson section or card: each one panel cropped, unchanged apart from
 * conversion to greyscale, from a CC BY open-access figure, credited with its figure and the
 * source's exact licence. The image lists are in `src/data/scans/`.
 */
export function ScanFigures({ images, wide = false }: { images: ScanImage[]; wide?: boolean }) {
  // Square frames suit single panels; `wide` keeps a wide panel at its own shape instead.
  return (
    <div className={wide ? 'cv-photos cv-photos-wide' : 'cv-photos'}>
      {images.map((image) => (
        <figure key={image.src} className="cv-photo">
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption>
            {image.caption} From <Cite doi={image.source.doi}>{image.source.short}</Cite>, {image.figure}, cropped ({image.source.licence}).
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
