import React, { useCallback } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchItem = ({
  setSearchValue,
  onCloseSearchBox,
  product,
  debounceSearchValue,
}) => {
  const navigate = useNavigate();
  // Highlight text match với useMemo để tối ưu hiệu suất
  const highlightMatch = useCallback((text, query) => {
    if (!query.trim()) return text;

    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

      return parts.map((part, i) => {
        const isMatch = part.toLowerCase() === query.toLowerCase();
        return isMatch ? (
          <span key={i} className="font-medium text-blue">
            {part}
          </span>
        ) : (
          part
        );
      });
    } catch (error) {
      console.error("Lỗi highlight:", error);
      return text;
    }
  }, []);
  return (
    <div className="flex font-inter text-[15px] items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md">
      <span className="mr-2">
        <IoTrendingUp />
      </span>
      <li
        onClick={() => {
          setSearchValue(product.name);
          navigate(`/product?s=${product.name}`);
          onCloseSearchBox(false);
        }}
        key={product.product_id}
      >
        {highlightMatch(product.name, debounceSearchValue)}
      </li>
    </div>
  );
};

export default SearchItem;
