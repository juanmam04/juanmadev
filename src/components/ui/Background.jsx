/** Site-wide backdrop — static gradients; hero has its own pointer atmosphere. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      <div
        className="absolute inset-0 dark:block light:hidden"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% -20%, var(--spotlight), transparent 58%)',
        }}
      />

      <div className="absolute inset-0 hidden light:block">
        <div className="light-mesh absolute inset-0" />
        <div className="light-aura-top absolute inset-0" />
      </div>

      <div
        className="absolute inset-0 noise"
        style={{ opacity: 'var(--noise-opacity, 0.3)' }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, var(--top-line), transparent)`,
        }}
      />
    </div>
  )
}
