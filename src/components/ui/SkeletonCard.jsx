const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white shadow-sm rounded-2xl p-4 w-full h-[280px] border border-gray-100">
      {/* Ảnh */}
      <div className="relative w-full h-40 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"></div>
      </div>

      {/* Tiêu đề */}
      <div className="h-4 w-5/6 bg-gray-300 rounded-lg mb-3"></div>

      {/* Sub info */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
