
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f1f7f2]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200"></div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200"></div>

                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>

                <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
