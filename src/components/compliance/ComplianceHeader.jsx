/**
 * @file src/components/compliance/ComplianceHeader.jsx
 * Header component for compliance workspace showing project title and product info.
 */

export default function ComplianceHeader({ project }) {
  if (!project) return null

  return (
    <div className="mb-8">
      <p className="text-sm font-semibold text-saffron">Compliance Workspace</p>
      <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold text-ink">{project.product_name}</h1>
          <p className="mt-1 text-sm text-slate-600">{project.standard_number}</p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium text-blue-900">{project.status}</span>
        </div>
      </div>
    </div>
  )
}
