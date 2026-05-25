const topCategories = [
  'Electricistas',
  'Plomeros',
  'Pintores',
  'Limpieza del hogar',
  'Jardinería',
]

const trustPoints = [
  'Profesionales verificados',
  'Valoraciones reales',
  'Contacto directo',
]

export default function ServoMockup() {
  return (
    <a
      href="https://servo.com.uy"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.1] shadow-2xl shadow-blue-500/10 transition-transform duration-500 hover:scale-[1.01]"
      aria-label="Ver Servo en servo.com.uy"
    >
      <div className="relative flex items-center gap-2 border-b border-white/[0.06] bg-zinc-900/95 px-4 py-2.5 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-amber-500/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-white/[0.08] bg-black/50 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="font-mono text-[10px] text-zinc-400">servo.com.uy</span>
        </div>
      </div>

      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-950 sm:aspect-[16/10]">
        <img
          src="/servo-preview.png"
          alt="Captura de Servo — marketplace de servicios en Uruguay"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent sm:max-w-[55%]"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              servo
              <span className="text-blue-500">o</span>
            </span>
          </div>

          <p className="mt-3 max-w-[280px] text-sm font-bold leading-snug text-white sm:text-base">
            Encontrá el servicio que necesitás,{' '}
            <span className="text-blue-400">cerca tuyo.</span>
          </p>
          <p className="mt-1 max-w-[260px] text-[10px] text-zinc-400 sm:text-xs">
            Profesionales verificados, valoraciones reales y contacto directo.
          </p>

          <div className="mt-3 flex max-w-[300px] overflow-hidden rounded-lg border border-white/10 bg-white shadow-lg">
            <span className="flex-1 truncate px-3 py-2 text-[10px] text-zinc-500">
              Buscar servicio o categoría...
            </span>
            <span className="bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white">
              Buscar
            </span>
          </div>

          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {trustPoints.map((point) => (
              <li key={point} className="text-[9px] text-zinc-500">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute right-3 top-3 hidden w-36 rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 backdrop-blur-md sm:block">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
            Servicios más buscados
          </p>
          <ol className="mt-2 space-y-1.5">
            {topCategories.map((cat, i) => (
              <li
                key={cat}
                className="flex items-center gap-2 text-[9px] text-zinc-300"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600/80 text-[8px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="truncate">{cat}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </a>
  )
}
