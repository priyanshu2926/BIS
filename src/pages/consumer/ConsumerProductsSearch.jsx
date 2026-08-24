import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ConsumerLayout from '../../layouts/ConsumerLayout'
import { HeroSearchInput, ProductCard } from '../../components/consumer/ConsumerUI'
import { consumerProducts } from '../../data/consumerMockData'

export default function ConsumerProductsSearch() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    return consumerProducts.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categories = ['All', ...new Set(consumerProducts.map((p) => p.category))]

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleViewMore = (product) => {
    // In a real app, navigate to product detail page
    console.log('View more:', product)
  }

  const handleAskAI = (product) => {
    // Navigate to AI assistant with context
    window.location.href = `/consumer/assistant?context=${encodeURIComponent(
      `Tell me about ${product.name}`
    )}`
  }

  return (
    <ConsumerLayout title="Products & Standards">
      <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl text-ink">Search Products & Standards</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Explore BIS standards for common consumer products and learn about their requirements.
        </p>
        <div className="mt-6">
          <HeroSearchInput
            placeholder="Search for a product or standard..."
            onSubmit={handleSearch}
          />
        </div>
      </section>

      <section className="mt-7">
        <h3 className="text-sm font-bold text-slate-700">Filter by category</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">
          Results
          {searchQuery && ` for "${searchQuery}"`}
        </h2>
        {filteredProducts.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewMore={handleViewMore}
                onAskAI={handleAskAI}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-600">No products found matching your search.</p>
            <p className="mt-2 text-xs text-slate-500">Try different keywords or browse all categories.</p>
          </div>
        )}
      </section>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-ink">Need help?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          If you can't find what you're looking for, you can always ask our AI Assistant for guidance.
        </p>
        <a
          href="/consumer/assistant"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
        >
          Ask AI Assistant
        </a>
      </section>
    </ConsumerLayout>
  )
}
