
export default function SkeletonPropertyDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="h-[420px] bg-gray-200 rounded-xl"></div>

        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>

          <div className="flex gap-4 mt-6">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>

          <div className="h-24 bg-gray-200 rounded mt-6"></div>
        </div>
      </div>
    </div>
  );
}
