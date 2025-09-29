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
import ButtonLight from "../ui/Button/ButtonLight";
import { IoIosArrowDown } from "react-icons/io";

// Constants
const PAGE_SIZE = 20;

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
    isLoading,
    isFiltered,
    observerRef,
    hasMore,
    handleLoadMoreClick,
    showLoadMoreButton,
    showSkeleton,
    skeletonCount,
  } = useInfiniteScroll(products, PAGE_SIZE, {
    enableAutoScroll: false,
    enableLoadMoreButton: true,
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
        <div className="flex flex-wrap gap-y-4 items-center gap-x-6">
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
          />
        </div>
      </Suspense>
      {showLoadMoreButton &&
        (isLoading ? (
          <div className="size-8 mx-auto my-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <ButtonLight
            className="w-fit mx-auto font-inter text-[15px]"
            onClick={handleLoadMoreClick}
            isLoading={isLoading}
          >
            Xem thêm tất cả {products.length - productsData.length} sản phẩm
            <span>
              <IoIosArrowDown size={20} />
            </span>
          </ButtonLight>
        ))}

      {showSkeleton && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
          {Array.from({ length: skeletonCount }).map((_, index) => {
            return <SkeletonCard key={index} />;
          })}
        </div>
      )}

      {/* Intersection Observer target - only active when not filtered */}
      {!isFiltered && <div ref={observerRef} className="h-10" />}

      {!hasMore && productsData.length > 0 && !isFiltered && (
        <div className="text-center font-medium font-inter py-8 text-gray-500 border-t">
          <p>Đã hiển thị tất cả {productsData.length} sản phẩm</p>
        </div>
      )}
    </div>
  );
};

export default Products;
