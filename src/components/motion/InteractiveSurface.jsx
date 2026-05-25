import { cn } from '../../lib/math'
import { useSurfaceTransform } from '../../hooks/useSurfaceTransform'

/**
 * Unified interactive surface: spring tilt + pointer spotlight.
 */
export default function InteractiveSurface({ children, className = '', intensity = 8 }) {
  const { ref, transform, spotlightStyle, onMove, onLeave } = useSurfaceTransform({ intensity })

  return (
    <div
      ref={ref}
      className={cn('group/surface relative', className)}
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-80"
        style={spotlightStyle}
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
