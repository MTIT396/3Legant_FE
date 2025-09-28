const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
    <img
      src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
      alt="No orders"
      className="w-24 h-24 object-contain mb-4 opacity-80"
    />
    <h2 className="text-lg font-semibold text-gray-700">
      Chưa có đơn hàng nào !
    </h2>
    <p className="text-sm font-inter text-gray-500 mt-2">
      Vui lòng quay lại sau hoặc tạo đơn hàng khác.
    </p>
  </div>
);
export default EmptyState;
