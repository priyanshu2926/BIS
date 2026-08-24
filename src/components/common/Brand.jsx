import { Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3 rounded-md" aria-label="BIS AI Assistant home">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${light ? 'bg-white/15 text-white' : 'bg-navy text-white'}`}>
        <Landmark size={21} aria-hidden="true" />
      </span>
      <span className={`text-base font-bold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
        BIS AI Assistant
      </span>
    </Link>
  )
}
