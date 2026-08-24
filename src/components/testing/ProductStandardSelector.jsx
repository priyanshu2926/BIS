/**
 * @file src/components/testing/ProductStandardSelector.jsx
 * Product and standard selection component.
 */

import { useState } from 'react'

export default function ProductStandardSelector({
  products,
  standards,
  selectedProduct,
  selectedStandard,
  onSelectProduct,
  onSelectStandard,
  isLoading,
}) {
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [showStandardDropdown, setShowStandardDropdown] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [standardSearch, setStandardSearch] = useState('')

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  )

  const filteredStandards = standards.filter(
    (s) =>
      s.standard_number.toLowerCase().includes(standardSearch.toLowerCase()) ||
      s.title.toLowerCase().includes(standardSearch.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="h-24 animate-pulse rounded-lg bg-slate-200"></div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <h2 className="font-bold text-ink">Select Product & Standard</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Product selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700">Product</label>
          <button
            onClick={() => setShowProductDropdown(!showProductDropdown)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-left font-medium text-ink hover:border-navy focus:ring-2 focus:ring-navy"
          >
            {selectedProduct?.name || 'Select product...'}
            <span className="float-right text-slate-400">▼</span>
          </button>

          {showProductDropdown && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-lg border border-slate-300 bg-white shadow-lg">
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full border-b border-slate-200 px-3 py-2 text-sm focus:outline-none"
              />
              <div className="max-h-48 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product)
                        setShowProductDropdown(false)
                        setProductSearch('')
                      }}
                      className="w-full border-b border-slate-100 px-4 py-2 text-left text-sm hover:bg-slate-50"
                    >
                      <div className="font-medium text-ink">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.category}</div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-sm text-slate-500">
                    No products found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Standard selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700">Standard</label>
          <button
            onClick={() => setShowStandardDropdown(!showStandardDropdown)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-left font-medium text-ink hover:border-navy focus:ring-2 focus:ring-navy"
          >
            {selectedStandard?.standard_number || 'Select standard...'}
            <span className="float-right text-slate-400">▼</span>
          </button>

          {showStandardDropdown && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-lg border border-slate-300 bg-white shadow-lg">
              <input
                type="text"
                placeholder="Search standards..."
                value={standardSearch}
                onChange={(e) => setStandardSearch(e.target.value)}
                className="w-full border-b border-slate-200 px-3 py-2 text-sm focus:outline-none"
              />
              <div className="max-h-48 overflow-y-auto">
                {filteredStandards.length > 0 ? (
                  filteredStandards.map((standard) => (
                    <button
                      key={standard.id}
                      onClick={() => {
                        onSelectStandard(standard)
                        setShowStandardDropdown(false)
                        setStandardSearch('')
                      }}
                      className="w-full border-b border-slate-100 px-4 py-2 text-left text-sm hover:bg-slate-50"
                    >
                      <div className="font-medium text-ink">{standard.standard_number}</div>
                      <div className="text-xs text-slate-500">{standard.title}</div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-sm text-slate-500">
                    No standards found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedStandard && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
          Selected: <span className="font-semibold">{selectedStandard.title}</span>
        </div>
      )}
    </div>
  )
}
