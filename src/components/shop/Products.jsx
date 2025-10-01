import { useContext, useEffect, useState, Suspense, useCallback } from "react";

import { ProductContext } from "../../contexts/ProductContext";
import SkeletonCard from "../ui/SkeletonCard";
import { useDropdownStates } from "../../hooks/useDropdownStates";
import { useCategories } from "../../hooks/useCategories";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import CategoryFilter from "../CategoryFilter";
import { ProductGrid } from "./ProductGrid";
import SortByFilter from "../SortByFilter";
import PriceFilter from "../PriceFilter";
import SearchBar from "../SearchBar";

// Constants
const PAGE_SIZE = 30;

// Main Component
const Products = () => {
  const { products } = useContext(ProductContext);
  const { dropdowns, toggleDropdown } = useDropdownStates();
  // Categories
  const {
    categories,
    selectedCategories,
    setSelectedCategories,
    selectedCategoriesNames,
  } = useCategories();
  // Price & Sort Filter
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState([]);
  const [priceId, setPriceId] = useState(null);
  const [sortId, setSortId] = useState(null);
  const { searchValue, setSearchValue, isSkeletonVisible, filterProducts } =
    useProductFilter(selectedCategories, selectedPrice, selectedSortBy);
  // Infinite Scroll
  const {
    productsData,
    setFilteredData,
    resetToOriginal,
    isFiltered,
    observerRef,
    hasMore,
    showSkeleton,
    skeletonCount,
  } = useInfiniteScroll(products, PAGE_SIZE, {
    enableAutoScroll: true,
    enableLoadMoreButton: false,
    skeletonCount: 10,
  });
  const [isShowMore, setIsShowMore] = useState(false);
  // Apply filters when dependencies change
  useEffect(() => {
    filterProducts(setFilteredData, resetToOriginal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProducts, setFilteredData, resetToOriginal]);

  const toggleShowMore = useCallback(() => {
    setIsShowMore((prev) => !prev);
  }, []);
  return (
    <div className="container mx-auto lg:px-[160px] mt-[60px]">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      {/* Filters */}
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col md:flex-row gap-y-4 items-center gap-x-6">
          <CategoryFilter
            categories={categories}
            selectedCategoriesNames={selectedCategoriesNames}
            isOpen={dropdowns.category}
            onToggle={() => toggleDropdown("category")}
            onSelectedChange={setSelectedCategories}
            showMore={isShowMore}
            onToggleShowMore={toggleShowMore}
          />

          <PriceFilter
            selectedPrice={selectedPrice}
            isOpen={dropdowns.price}
            onToggle={() => toggleDropdown("price")}
            onSelectedChange={setSelectedPrice}
            globalId={priceId}
            onSetId={setPriceId}
          />
        </div>
        <SortByFilter
          isOpen={dropdowns.sortBy}
          onToggle={() => toggleDropdown("sortBy")}
          onSelectedChange={setSelectedSortBy}
          globalId={sortId}
          onSetId={setSortId}
        />
      </div>
      {/* Product List */}
      <Suspense fallback={<SkeletonCard />}>
        <div className="mt-6">
          <ProductGrid
            productsData={productsData}
            isSkeletonVisible={isSkeletonVisible}
            searchValue={searchValue}
            isFiltered={isFiltered}
            hasMore={hasMore}
          />
          {/* Intersection Observer target - works for both filtered and non-filtered */}
          <div ref={observerRef} className="h-10" />
        </div>
      </Suspense>

      {/* Skeleton */}
      {showSkeleton && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
          {Array.from({ length: skeletonCount }).map((_, index) => {
            return <SkeletonCard key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
