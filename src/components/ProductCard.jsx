import { ArrowUpRight, LayoutTemplate, Tag } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'

function ProductCard({ demo, whatsappHref, featured = false }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_90px_rgba(15,23,42,0.12)] ${featured ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200/80'}`}
    >
      <div className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50 p-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-2 h-7 flex-1 rounded-full bg-white px-4 py-1 text-[11px] font-medium text-slate-400 shadow-sm">
            {demo.url.replace('https://', '')}
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[24px] p-5 text-white shadow-xl"
          style={{ backgroundImage: `linear-gradient(135deg, ${demo.accent}, #111827)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)]" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{demo.categoria}</p>
              <h3 className="mt-2 text-2xl font-black leading-tight">{demo.nombre}</h3>
            </div>
            <div className="rounded-2xl bg-white/12 p-3 text-2xl shadow-lg backdrop-blur">
              {demo.emoji}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
            {demo.stats.map((stat) => (
              <div key={stat} className="rounded-2xl border border-white/12 bg-white/10 px-3 py-3 backdrop-blur">
                <p className="text-[11px] font-medium text-white/75">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-color)]">
          <LayoutTemplate size={12} />
          Demo real
        </p>

        <p className="text-sm leading-relaxed text-slate-600">{demo.descripcion}</p>

        <div className="flex flex-wrap gap-2">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={demo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-color)]/25 hover:text-slate-950"
          >
            Ver demo
            <ArrowUpRight size={16} />
          </a>
          <WhatsAppButton href={whatsappHref} label={featured ? 'Quiero una así' : 'Pedir una similar'} className="w-full sm:w-auto" />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
