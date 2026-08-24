/**
 * @file src/components/testing/TestingSkeleton.jsx
 * Loading skeleton component for testing page.
 */

export default function TestingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="h-12 w-1/2 animate-pulse rounded-lg bg-slate-200"></div>

      {/* Product selector skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="h-6 w-1/3 animate-pulse rounded-lg bg-slate-200"></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="h-10 animate-pulse rounded-lg bg-slate-200"></div>
          <div className="h-10 animate-pulse rounded-lg bg-slate-200"></div>
        </div>
      </div>

      {/* Test requirements skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="h-6 w-1/3 animate-pulse rounded-lg bg-slate-200"></div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
