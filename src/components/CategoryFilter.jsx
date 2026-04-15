import { Search, SlidersHorizontal } from 'lucide-react'

function CategoryFilter({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section id="catalogo" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-color)]">
          Catálogo
        </p>
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
          Nuestros productos
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        {/* Search */}
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre del producto..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[var(--brand-color)] focus:bg-white focus:ring-4 focus:ring-[var(--brand-color)]/12"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <SlidersHorizontal size={12} />
            Filtrar:
          </span>
          {categories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`rounded-xl px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                  isActive
                    ? 'bg-[var(--brand-color)] text-white shadow-md shadow-[var(--brand-color)]/25 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter
