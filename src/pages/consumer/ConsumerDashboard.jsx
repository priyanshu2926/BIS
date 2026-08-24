import { useState } from 'react'
import ConsumerLayout from '../../layouts/ConsumerLayout'
import {
  TopicCard,
  QuickActionButton,
  HeroSearchInput,
  RecentlyViewedCard,
} from '../../components/consumer/ConsumerUI'
import {
  BotMessageSquare,
  Search,
  ShieldCheck,
  Gem,
  AlertCircle,
} from 'lucide-react'
import { popularTopics, recentlyViewed } from '../../data/consumerMockData'
import { useNavigate } from 'react-router-dom'

export default function ConsumerDashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    navigate(`/consumer/products?search=${encodeURIComponent(query)}`)
  }

  return (
    <ConsumerLayout title="Dashboard">
      <section className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-8 sm:px-8">
        <p className="text-sm font-semibold text-orange-700">Welcome to BIS Consumer Services</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-ink">How can we help you?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Understand products, standards and BIS services with simple, trustworthy information.
        </p>
        <div className="mt-6">
          <HeroSearchInput
            placeholder="Search a product or ask a question..."
            onSubmit={handleSearch}
          />
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Quick actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionButton
            icon={BotMessageSquare}
            title="Ask BIS AI"
            text="Get guidance on your questions"
            to="/consumer/assistant"
          />
          <QuickActionButton
            icon={Search}
            title="Search Product"
            text="Find standards and information"
            to="/consumer/products"
          />
          <QuickActionButton
            icon={ShieldCheck}
            title="Product Safety"
            text="Learn about product safety"
            to="/consumer/safety"
          />
          <QuickActionButton
            icon={Gem}
            title="Hallmarking"
            text="Understand gold hallmarks"
            to="/consumer/hallmarking"
          />
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-lg font-bold text-ink">Popular topics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {popularTopics.map((topic) => (
            <TopicCard
              key={topic.title}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
            />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="mt-7">
          <h2 className="text-lg font-bold text-ink">Recently viewed</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyViewed.map((item) => (
              <RecentlyViewedCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      )}
    </ConsumerLayout>
  )
}
