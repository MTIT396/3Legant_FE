import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { axiosClient } from "../utils/axios";
const DEBOUNCE_DELAY = 500;

export const useProductFilter = (
  selectedCategories,
  selectedPrice,
  selectedSortBy
) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);

  const debouncedSearch = useDebounce(searchValue, DEBOUNCE_DELAY);

  const hasActiveFilters = useMemo(() => {
    return (
      selectedCategories.length > 0 ||
      (debouncedSearch && debouncedSearch.trim() !== "") ||
      selectedPrice.length > 0 ||
      selectedSortBy.length > 0
    );
  }, [selectedCategories, debouncedSearch, selectedPrice, selectedSortBy]);
  const filterProducts = useCallback(
    async (setFilteredData, resetToOriginal) => {
      if (!hasActiveFilters) {
        resetToOriginal();
        return;
      }

      setIsSkeletonVisible(true);

      try {
        const params = {};

        if (selectedCategories.length > 0) {
          params.categories = selectedCategories.join(",");
        }

        if (debouncedSearch?.trim()) {
          params.keywords = debouncedSearch.trim();
        }

        if (selectedPrice.length > 0) {
          params.minPrice = selectedPrice[0].min;
          if (selectedPrice[0].max) {
            params.maxPrice = selectedPrice[0].max;
          }
        }

        // Handle "All" category
        if (params.categories === "0") {
          delete params.categories;
        }

        console.log("API call params:", params); // Debug log
        const res = await axiosClient.get("api/products/filter", { params });
        let data = res.data.data;
        const sortStrategies = {
          "A - Z": (a, b) => a.name.localeCompare(b.name),
          "Z - A": (a, b) => b.name.localeCompare(a.name),
          "Giá thấp dần": (a, b) => b.sale_price - a.sale_price,
          "Giá tăng dần": (a, b) => a.sale_price - b.sale_price,
        };

        const sortKey =
          selectedSortBy.length > 0 ? selectedSortBy[0].name : null;

        data =
          sortKey && sortStrategies[sortKey]
            ? res.data.data.sort(sortStrategies[sortKey])
            : res.data.data;

        setFilteredData(data);
      } catch (err) {
        console.error("Error filtering products:", err);
      } finally {
        setIsSkeletonVisible(false);
      }
    },
    [
      debouncedSearch,
      selectedCategories,
      selectedPrice,
      selectedSortBy,
      hasActiveFilters,
    ]
  );

  return {
    searchValue,
    setSearchValue,
    isSkeletonVisible,
    filterProducts,
  };
};
