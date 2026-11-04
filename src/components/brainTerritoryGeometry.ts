/*
 * Path builders for the vascular territories map. Each structure is a superellipse
 * (|x/a|^n + |y/b|^n = 1); each territory is the part of one between two rays from an origin,
 * between two fractions of the distance to the edge. Neighbouring territories built from the same
 * oval, origin and fractions share their edges exactly. Angles are degrees clockwise from
 * anterior (up) as viewed.
 */

export type Oval = { cx: number; cy: number; a: number; b: number; n: number }
export type Point = { x: number; y: number }

const round = (v: number) => Math.round(v * 10) / 10

function inside(o: Oval, x: number, y: number) {
  return Math.abs((x - o.cx) / o.a) ** o.n + Math.abs((y - o.cy) / o.b) ** o.n <= 1
}

function direction(deg: number): Point {
  const t = (deg * Math.PI) / 180
  return { x: Math.sin(t), y: -Math.cos(t) }
}

/** Distance from `from` (inside the oval) to its edge along the ray at `deg`. */
export function reach(o: Oval, from: Point, deg: number): number {
  const dir = direction(deg)
  let lo = 0
  let hi = 2 * Math.max(o.a, o.b) + Math.hypot(from.x - o.cx, from.y - o.cy)
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (inside(o, from.x + dir.x * mid, from.y + dir.y * mid)) lo = mid
    else hi = mid
  }
  return lo
}

function at(o: Oval, from: Point, deg: number, fraction: number): Point {
  const dir = direction(deg)
  const r = reach(o, from, deg) * fraction
  return { x: from.x + dir.x * r, y: from.y + dir.y * r }
}

function path(points: Point[]) {
  return `M${points.map((p) => `${round(p.x)} ${round(p.y)}`).join(' L')} Z`
}

/**
 * The part of the oval clockwise from `start` to `end`, between `inner` and `outer` fractions of
 * the reach. With `inner` 0 the sector closes at the origin; a full turn with `inner` above 0 is a
 * ring, drawn as the outer loop and then the inner loop the other way round, so the nonzero fill
 * rule leaves a hole with no seam.
 */
export function sector(o: Oval, from: Point, start: number, end: number, inner = 0, outer = 1): string {
  const span = (((end - start) % 360) + 360) % 360 || 360
  const steps = Math.max(2, Math.ceil(span / 3))
  const angles = Array.from({ length: steps + 1 }, (_, i) => start + (span * i) / steps)
  const points = angles.map((deg) => at(o, from, deg, outer))
  if (inner === 0) return path(span < 360 ? [...points, from] : points)
  const back = angles.reverse().map((deg) => at(o, from, deg, inner))
  return span < 360 ? path([...points, ...back]) : `${path(points)} ${path(back)}`
}

/** The whole oval's edge. */
export function outline(o: Oval): string {
  return sector(o, { x: o.cx, y: o.cy }, 0, 360)
}

/** An ellipse rotated by `rot` degrees, as a path, for the deep nuclei and ventricles. */
export function blob(cx: number, cy: number, rx: number, ry: number, rot = 0): string {
  const t = (rot * Math.PI) / 180
  const points = Array.from({ length: 48 }, (_, i) => {
    const u = (i / 48) * 2 * Math.PI
    const x = rx * Math.cos(u)
    const y = ry * Math.sin(u)
    return { x: cx + x * Math.cos(t) - y * Math.sin(t), y: cy + x * Math.sin(t) + y * Math.cos(t) }
  })
  return path(points)
}
