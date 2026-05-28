import { site } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-subtle px-5 py-12 sm:px-8 lg:px-12">
      <div className="container-main flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass bg-gradient-to-br from-indigo-500/15 to-cyan-500/10 font-mono text-xs font-bold text-heading">
            JM
          </span>
          <div>
            <p className="text-sm font-medium text-theme-muted">
              {site.name}
            </p>
            <p className="mt-0.5 text-xs text-theme-muted-3">{site.title}</p>
          </div>
        </div>
        <p className="text-sm text-theme-muted-2">
          {site.location} · {year}
        </p>
      </div>
    </footer>
  )
}
