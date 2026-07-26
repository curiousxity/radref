export function Badge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'good' | 'warn' | 'accent' }) {
  return <span className={`badge badge-${tone}`}>{label}</span>
}
