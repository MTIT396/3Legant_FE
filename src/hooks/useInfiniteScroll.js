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
  const [isFiltered, setIsFiltered] = useState(false);

  // Store all filtered products for pagination
  const [allFilteredProducts, setAllFilteredProducts] = useState([]);
  const observerRef = useRef(null);

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
    if (isLoading) return;
    setIsLoading(true);

    try {
      const nextPage = page + 1;

      if (isFiltered) {
        // Load more from filtered products (client-side pagination)
        await sleep(LOAD_MORE_DELAY);

        const startIndex = nextPage * pageSize;
        const endIndex = startIndex + pageSize;
        const nextProducts = allFilteredProducts.slice(startIndex, endIndex);

        setProductsData((prev) => [...prev, ...nextProducts]);
        setPage(nextPage);
        setHasMore(endIndex < allFilteredProducts.length);
      } else {
        // Load more from API (server-side pagination)
        const [res] = await Promise.all([
          axiosClient.get(`/api/products`, {
            params: {
              page: nextPage,
              limit: pageSize,
            },
          }),
          sleep(LOAD_MORE_DELAY),
        ]);

        const nextProducts = res.data.products;
        setProductsData((prev) => [...prev, ...nextProducts]);
        setPage(nextPage);
        setHasMore(nextProducts.length === pageSize);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, pageSize, isFiltered, allFilteredProducts]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!enableAutoScroll || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
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
  }, [enableAutoScroll, hasMore, isLoading, loadMore]);

  const handleLoadMoreClick = useCallback(() => {
    if (!isLoading && hasMore) {
      loadMore();
    }
  }, [isLoading, hasMore, loadMore]);

  // Method to set filtered data (enables infinite scroll for filtered results)
  const setFilteredData = useCallback(
    (filteredProducts) => {
      setAllFilteredProducts(filteredProducts);
      const initialData = filteredProducts.slice(0, pageSize);
      setProductsData(initialData);
      setPage(0); // Reset to page 0 for filtered data
      setHasMore(filteredProducts.length > pageSize);
      setIsFiltered(true);
    },
    [pageSize]
  );

  // Method to reset to original data
  const resetToOriginal = useCallback(() => {
    const initialData = Array.isArray(allProducts)
      ? allProducts.slice(0, pageSize)
      : [];
    setProductsData(initialData);
    setPage(1);
    setHasMore(allProducts.length > pageSize);
    setIsFiltered(false);
    setAllFilteredProducts([]);
  }, [allProducts, pageSize]);

  return {
    allFilteredProducts,
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
    showLoadMoreButton: enableLoadMoreButton && hasMore,
    showSkeleton: !enableLoadMoreButton && isLoading,
  };
};
