export default function SkeletonCard() {
  return (
    <div
      className="bg-base rounded-2xl overflow-hidden
                 border border-secondary/20 shadow-sm
                 animate-pulse"
    >
      {/* IMAGE AREA */}
      <div className="relative h-48 bg-gray-200">
        {/* price pill */}
        <div className="absolute left-3 top-3 h-6 w-24 bg-gray-300 rounded-full"></div>

        {/* featured pill */}
        <div className="absolute right-3 top-3 h-5 w-20 bg-gray-300 rounded-full"></div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* location */}
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>

        {/* meta row */}
        <div className="flex gap-4 mt-3">
          <div className="h-3 bg-gray-300 rounded w-10"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}
