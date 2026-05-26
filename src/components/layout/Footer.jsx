import { site } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] px-5 py-12 sm:px-8 lg:px-12">
      <div className="container-main flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-gradient-to-br from-indigo-500/15 to-cyan-500/10 font-mono text-xs font-bold text-white">
            JM
          </span>
          <div>
            <p className="text-sm font-medium text-zinc-300">
              {site.name}
            </p>
            <p className="mt-0.5 text-xs text-zinc-600">{site.title}</p>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          {site.location} · {year}
        </p>
      </div>
    </footer>
  )
}
