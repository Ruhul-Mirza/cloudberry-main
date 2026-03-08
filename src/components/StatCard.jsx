"use client";

export default function StatsCard({ icon, count, label, percent }) {
  return (
    <div className="rounded border border-gray-200 bg-white p-6">
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h2 className="text-3xl font-semibold text-gray-900">{count}</h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
          {icon}
        </div>
      </div>

      {/* progress bar */}
      <div className="w-full">
        <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">{percent}% of total</p>
      </div>

    </div>
  );
}