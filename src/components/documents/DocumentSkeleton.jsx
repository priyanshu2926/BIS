/**
 * @file src/components/documents/DocumentSkeleton.jsx
 * Loading Skeleton Placeholders for Documents Dashboard.
 */

export default function DocumentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading documents workspace...">
      {/* Top Banner Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2.5">
            <div className="h-5 w-36 rounded-full bg-slate-200" />
            <div className="h-8 w-56 rounded-xl bg-slate-200" />
            <div className="h-4 w-96 max-w-full rounded-lg bg-slate-100" />
          </div>
          <div className="h-11 w-40 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* 4 Stat KPI Skeletons */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded-md bg-slate-200" />
              <div className="h-8 w-8 rounded-xl bg-slate-100" />
            </div>
            <div className="h-8 w-16 rounded-lg bg-slate-200" />
            <div className="h-3 w-32 rounded-md bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="h-10 flex-1 rounded-xl bg-slate-100" />
          <div className="flex gap-2">
            <div className="h-10 w-36 rounded-xl bg-slate-100" />
            <div className="h-10 w-28 rounded-xl bg-slate-100" />
            <div className="h-10 w-24 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-3/4 rounded-md bg-slate-200" />
                  <div className="h-3 w-1/2 rounded-md bg-slate-100" />
                </div>
              </div>
              <div className="space-y-1.5 pt-2">
                <div className="h-3 w-full rounded-md bg-slate-100" />
                <div className="h-3 w-5/6 rounded-md bg-slate-100" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="h-3 w-24 rounded-md bg-slate-100" />
              <div className="h-7 w-20 rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
