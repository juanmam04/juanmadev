import { useInteractive } from '../../context/interactive'

export default function ScrollProgress() {
  const { scroll } = useInteractive()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500"
      style={{ transform: `scaleX(${scroll})` }}
      aria-hidden="true"
    />
  )
}
