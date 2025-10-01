import CardProduct from "../CardProduct";
import SkeletonCard from "../ui/SkeletonCard";
const SKELETON_COUNT = 10;

export const ProductGrid = ({
  productsData,
  isSkeletonVisible,
  searchValue,
  hasMore,
}) => {
  if (isSkeletonVisible) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    );
  }

  if (productsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="No products"
          className="w-40 h-40 object-contain mb-6 opacity-90"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Rất tiếc, chúng tôi không tìm thấy sản phẩm phù hợp với từ khóa hoặc
          bộ lọc của bạn. Hãy thử lại với từ khóa khác hoặc điều chỉnh bộ lọc.
        </p>
        <button
          onClick={() => (window.location.href = "/shop")}
          className="mt-6 px-5 py-2 font-inter bg-red text-sm font-medium text-white rounded-full shadow-md hover:bg-red-600 transition"
        >
          Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div>
      {searchValue && (
        <h1 className="text-secondary mt-6 font-medium mb-4">
          * Kết quả tìm kiếm <span>({productsData.length})</span>
        </h1>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-8 mb-10">
        {productsData.map((item) => (
          <CardProduct key={item.id} product={item} />
        ))}
      </ul>

      {!hasMore && productsData.length > 0 && (
        <div className="text-center font-inter py-6 text-gray-500 border-t">
          <p>Đã hiển thị hết {productsData.length} kết quả được lọc</p>
        </div>
      )}
    </div>
  );
};
