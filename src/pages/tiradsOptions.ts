import type { ChoiceOption } from '../components/ChoiceGroup'

/** The "+N" shown beside a TI-RADS option, or nothing when its points do not count: a
 *  spongiform nodule scores 0 whatever else is selected (calculateTirads), so the other
 *  features' points are hidden then. */
export function pointsDetail(points: number, suppressed: boolean): string | undefined {
  return suppressed ? undefined : `+${points}`
}

/** Adds each option's points (from the same table calculateTirads scores with) as its detail.
 *  Values and labels pass through untouched. */
export function withPoints<T extends string>(table: Record<T, number>, options: { value: T; label: string }[], suppressed = false): ChoiceOption<T>[] {
  return options.map((option) => ({ ...option, detail: pointsDetail(table[option.value], suppressed) }))
}
