import DotField from '../canvas/DotField'

/** Hero backdrop — subtle interactive dots, nothing fancy. */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <DotField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
    </div>
  )
}
