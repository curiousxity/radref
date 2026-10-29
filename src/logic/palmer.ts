/**
 * Palmer classification of triangular fibrocartilage complex (TFCC) lesions (Palmer, J Hand
 * Surg Am 1989). Shared by the Palmer calculator and the wrist MRI study.
 *
 * The paper is paywalled; the classes are checked against von Borstel and colleagues' review,
 * which reproduces Palmer's table (Magn Reson Med Sci 2017; the same table is in Margulies et al.,
 * J Hand Microsurg 2021). By the author's decision of 2026-10-29, 1B and 1C use the table's
 * labels, and the 1C anatomy (the lunate and triquetrum) is given beside it, from Vassa et al.
 * (Pol J Radiol 2020) (claims PA-1 to PA-3 in
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md).
 */

export type PalmerClass = '1A' | '1B' | '1C' | '1D' | '2A' | '2B' | '2C' | '2D' | '2E'

export const palmerClasses: PalmerClass[] = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '2E']

export const palmerDescriptions: Record<PalmerClass, string> = {
  '1A': 'central perforation', // PA-1
  // PA-1, von Borstel 2017, Table 3: "1B: Ulnar avulsion with or without distal ulnar fracture".
  '1B': 'ulnar avulsion, with or without a distal ulnar fracture',
  // PA-1, Table 3: "1C: Distal avulsion"; Vassa 2020: "traumatic avulsions from the peripheral
  // volar attachments at the lunate or triquetral bones, specifically the ulnolunate and
  // ulnotriquetral ligaments".
  '1C': 'distal avulsion, involving the carpal attachments of the TFCC (at the lunate or triquetrum)',
  '1D': 'radial avulsion, with or without a fracture of the sigmoid notch', // PA-1
  '2A': 'TFCC wear', // PA-2
  '2B': 'TFCC wear with lunate and/or ulnar chondromalacia', // PA-2
  '2C': 'TFCC perforation with lunate and/or ulnar chondromalacia', // PA-2
  '2D': 'TFCC perforation with lunate and/or ulnar chondromalacia and lunotriquetral ligament perforation', // PA-2
  '2E': 'TFCC perforation with lunate and/or ulnar chondromalacia, lunotriquetral ligament perforation and ulnocarpal arthritis', // PA-2
}

/** PA-3: class 1 is traumatic, class 2 degenerative (ulnocarpal abutment). */
export function palmerKind(c: PalmerClass): 'traumatic' | 'degenerative' {
  return c.startsWith('1') ? 'traumatic' : 'degenerative'
}

export function palmerSentence(c: PalmerClass): string {
  return `TFCC lesion, Palmer ${c} (${palmerKind(c)}): ${palmerDescriptions[c]}.`
}
