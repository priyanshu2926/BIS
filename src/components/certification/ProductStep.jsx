/**
 * @file src/components/certification/ProductStep.jsx
 * Step 1: Product identification and sector selection.
 */

import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Droplet,
  Fan,
  Layers,
  Lightbulb,
  Plug,
  Search,
  Sparkles,
} from 'lucide-react'

// Map product icon names to Lucide icons
function getProductIcon(name) {
  switch (name) {
    case 'Fan':
      return Fan
    case 'Bottle':
      return Droplet
    case 'Plug':
      return Plug
    case 'Lightbulb':
      return Lightbulb
    case 'Battery':
      return Battery
    case 'Layers':
      return Layers
    case 'Droplet':
      return Droplet
    default:
      return Layers
  }
}

export default function ProductStep({
  products = [],
  selectedProduct,
  customProductName,
  onSelectProduct,
  onCustomProductChange,
  onContinue,
  isLoading = false,
}) {
  const isSelected = (product) => selectedProduct?.id === product.id
  const hasValidSelection = Boolean(selectedProduct || customProductName.trim())

  return (
    <div className="space-y-8 animate-rise">
      {/* Header Description */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-navy">
          <Sparkles size={13} className="text-saffron" />
          <span>Step 1: Product Identification</span>
        </div>
        <h2 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
          What product do you manufacture?
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Select from common Indian industrial categories below or enter your specific product name
          to determine applicable Indian Standards (IS), mandatory QCOs, and testing protocols.
        </p>
      </div>

      {/* Custom Product Input Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Search or Enter Custom Product Name
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 transition focus-within:border-navy focus-within:bg-white focus-within:ring-2 focus-within:ring-navy/10">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            value={customProductName}
            onChange={(e) => onCustomProductChange(e.target.value)}
            placeholder="e.g. Solar Photovoltaic Module, Fire Extinguisher, PVC Pipe, Gas Stove..."
            className="w-full border-0 bg-transparent text-sm text-ink placeholder-slate-400 outline-none"
            aria-label="Enter product name"
          />
        </div>
      </div>

      {/* Preset Product Cards Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Popular Manufacturing Sectors
        </h3>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = getProductIcon(product.icon_name)
            const active = isSelected(product)

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product)}
                className={`group flex flex-col justify-between rounded-2xl border p-4.5 text-left transition duration-150 cursor-pointer ${
                  active
                    ? 'border-navy bg-blue-50/70 shadow-sm ring-2 ring-navy'
                    : 'border-slate-200 bg-white hover:border-navy/60 hover:bg-slate-50 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl transition ${
                        active ? 'bg-navy text-white' : 'bg-blue-50 text-navy group-hover:bg-navy group-hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    {active && <CheckCircle2 size={18} className="text-navy" />}
                  </div>

                  <h4 className="mt-3.5 text-sm font-bold text-ink group-hover:text-navy">
                    {product.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-2.5">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {product.category}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onContinue}
          disabled={!hasValidSelection || isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#062d5e] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{isLoading ? 'Identifying Standards...' : 'Continue to Standard Selection'}</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
