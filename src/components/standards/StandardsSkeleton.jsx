/**
 * @file src/components/standards/StandardsSkeleton.jsx
 * Skeleton loader component matching StandardCard layout during async search.
 */

export default function StandardsSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs animate-pulse"
        >
          <div>
            {/* Top Badge & Bookmark Placeholder */}
            <div className="flex items-center justify-between">
              <div className="h-5 w-28 rounded-full bg-slate-200" />
              <div className="h-7 w-7 rounded-lg bg-slate-200" />
            </div>

            {/* Standard Number & Title */}
            <div className="mt-3.5 space-y-2">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-100" />
            </div>

            {/* Description lines */}
            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-5/6 rounded bg-slate-100" />
            </div>
          </div>

          {/* Bottom Tags & Buttons */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
            <div className="h-6 w-24 rounded bg-slate-100" />
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-lg bg-slate-200" />
              <div className="h-8 w-16 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
