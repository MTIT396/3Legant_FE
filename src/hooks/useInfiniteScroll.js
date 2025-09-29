/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosClient } from "../utils/axios";
import { sleep } from "../utils/time";
const LOAD_MORE_DELAY = 1000;

export const useInfiniteScroll = (allProducts, pageSize, options = {}) => {
  const {
    enableAutoScroll = true,
    enableLoadMoreButton = false,
    skeletonCount = 10,
  } = options;
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false); // Track if we're showing filtered results
  const observerRef = useRef(null);
  const handleLoadMoreClick = () => {
    if (!isLoading && hasMore && !isFiltered) {
      loadMore();
    }
  };

  // Initialize products data when allProducts change
  useEffect(() => {
    if (!isFiltered) {
      const initialData = Array.isArray(allProducts)
        ? allProducts.slice(0, pageSize)
        : [];
      setProductsData(initialData);
      setPage(1);
      setHasMore(allProducts.length > pageSize);
    }
  }, [allProducts, pageSize, isFiltered]);

  const loadMore = useCallback(async () => {
    if (isLoading || isFiltered) return;
    setIsLoading(true);

    try {
      const nextPage = page + 1;

      // Thực hiện đồng thời API + delay
      const [res] = await Promise.all([
        axiosClient.get(`/api/products`, {
          params: {
            page: nextPage,
            limit: pageSize,
          },
        }),
        sleep(LOAD_MORE_DELAY), // delay tối thiểu để tránh nhấp nháy
      ]);

      const nextProducts = res.data.products;
      setProductsData((prev) => [...prev, ...nextProducts]);
      setPage(nextPage);
      setHasMore(nextProducts.length === pageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, pageSize, isFiltered]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!enableAutoScroll || isLoading || isFiltered) return; // Don't observe when filtered

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFiltered) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [enableAutoScroll, hasMore, isLoading, loadMore, isFiltered]);

  // Method to set filtered data (disables infinite scroll)
  const setFilteredData = useCallback((filteredProducts) => {
    setProductsData(filteredProducts);
    setIsFiltered(true);
    setHasMore(false); // No more loading when filtered
  }, []);

  // Method to reset to original data (enables infinite scroll)
  const resetToOriginal = useCallback(() => {
    const initialData = Array.isArray(allProducts)
      ? allProducts.slice(0, pageSize)
      : [];
    setProductsData(initialData);
    setPage(1);
    setHasMore(allProducts.length > pageSize);
    setIsFiltered(false);
  }, [allProducts, pageSize]);
  return {
    loadMore,
    productsData,
    setProductsData,
    setFilteredData,
    resetToOriginal,
    isLoading,
    hasMore,
    isFiltered,
    observerRef,
    handleLoadMoreClick,
    skeletonCount,
    showLoadMoreButton: enableLoadMoreButton && hasMore && !isFiltered,
    showSkeleton: enableLoadMoreButton && isLoading && !isFiltered,
  };
};
