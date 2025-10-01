/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import SaleOff from "../components/SaleOff";
import Header from "../layouts/Header";
import { axiosClient } from "../utils/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import SkeletonCard from "../components/ui/SkeletonCard";
import { ProductContext } from "../contexts/ProductContext";
import { BRAND_FILTERS } from "../constants/filter";
import { MdCheck } from "react-icons/md";
import Footer from "../layouts/Footer";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useOpenStore } from "../store/useOpenStore";
import ButtonLight from "../components/ui/Button/ButtonLight";
import { FaAngleDown } from "react-icons/fa6";

const ITEMS_PER_PAGE = 30;

const ProductPage = () => {
  const { products } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Search Params Handler
  const [searchParams] = useSearchParams();
  const keywords = searchParams.get("s");
  const category = searchParams.get("categories");

  // Initialize infinite scroll hook
  const {
    showLoadMoreButton,
    productsData,
    setFilteredData,
    resetToOriginal,
    isLoading: isLoadingMore,
    hasMore,
    observerRef,
    allFilteredProducts,
    handleLoadMoreClick,
  } = useInfiniteScroll(products, ITEMS_PER_PAGE, {
    enableAutoScroll: false,
    enableLoadMoreButton: true,
    skeletonCount: 10,
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("api/products/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectedBrand = (brand) => {
    setSelectedBrand(brand);
  };

  // Filter products based on search params and brand
  const filterProducts = useCallback(async () => {
    try {
      setIsInitialLoading(true);

      // If no filters applied, reset to original data
      if (!keywords && !category && !selectedBrand) {
        resetToOriginal();
        setIsInitialLoading(false);
        return;
      }

      // Build API params
      const params = {};
      if (keywords) params.keywords = keywords;
      if (category) params.categories = category;

      // Fetch filtered data from API
      const res = await axiosClient.get("api/products/filter", {
        params: params,
      });

      let filteredData = res.data.data;

      // Apply brand filter if selected
      if (selectedBrand) {
        const brandName = selectedBrand.name.toLowerCase();
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(brandName)
        );
      }

      // Set filtered data (this disables infinite scroll)
      setFilteredData(filteredData);
    } catch (err) {
      console.log(err);
      setFilteredData([]);
    } finally {
      setIsInitialLoading(false);
    }
  }, [keywords, category, selectedBrand, setFilteredData, resetToOriginal]);

  // Apply filters when params change
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  // Reset brand selection when category changes
  useEffect(() => {
    setSelectedBrand(null);
  }, [category]);

  // Handle navigation to all products
  const handleShowAllProducts = () => {
    navigate(`/product`);
    setSelectedBrand(null);

    // Reset to show all products with infinite scroll
    setIsInitialLoading(true);
    resetToOriginal();
    setIsInitialLoading(false);
  };
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);
  const rootProducts =
    allFilteredProducts.length > 0 ? allFilteredProducts : products;
  return (
    <>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto lg:px-[160px] h-full ${
          isOpenSaleOff ? "mt-[100px]" : "pt-[60px]"
        } `}
      >
        <div className="flex flex-col xl:flex-row items-center justify-center gap-6 w-full py-4 mt-3 ">
          <div className="p-4 bg-white rounded-md h-full w-fit xl:max-w-[112px] drop-shadow-lg ">
            <button
              onClick={handleShowAllProducts}
              className={`
                  ${
                    !category ? "border-[#DC2626] border-2" : "border-lightGrey"
                  }
               min-w-20 h-[80px] relative w-full rounded border flex flex-col justify-center items-center p-2 overflow-hidden`}
            >
              <div className="h-[36px] max-w-20">
                <img
                  src="https://fptshop.com.vn/img/all_cate.png?w=64&q=75"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Label */}
              {!category && (
                <span
                  className="z-[2] pointer-events-none bg-darkRed absolute -top-3 -right-3 size-10 flex items-center justify-center"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                  }}
                >
                  <span className="w-full h-full bg-blue-600 relative">
                    <span className="absolute top-2 right-2 text-[10px] text-white">
                      <MdCheck size={14} />
                    </span>
                  </span>
                </span>
              )}
              <span className="text-sm">Tất cả</span>
            </button>
          </div>
          <div className="p-4 bg-white drop-shadow-lg flex justify-center items-center rounded-md max-w-[880px] w-full ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={16}
              navigation
              breakpoints={{
                330: {
                  slidesPerView: 2,
                },
                460: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
            >
              {categories.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <button
                      onClick={() => {
                        const newSearchParams = new URLSearchParams(
                          location.search
                        );
                        newSearchParams.set("categories", item.id);
                        navigate(
                          `${location.pathname}?${newSearchParams.toString()}`
                        );
                      }}
                      className={`${
                        Number(category) === item.id
                          ? "border-[#DC2626] border-2"
                          : "border-lightGrey border"
                      } group min-w-20 relative overflow-hidden h-[80px] w-full rounded flex flex-col justify-center items-center p-2`}
                    >
                      <div className="group-hover:scale-110 transition h-[36px] max-w-20">
                        <img
                          src={item.image_url}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {Number(category) === item.id && (
                        <span
                          className="z-[2] pointer-events-none bg-darkRed absolute -top-3 -right-3 size-10 flex items-center justify-center"
                          style={{
                            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                          }}
                        >
                          <span className="w-full h-full bg-blue-600 relative">
                            <span className="absolute top-2 right-2 text-[10px] text-white">
                              <MdCheck size={14} />
                            </span>
                          </span>
                        </span>
                      )}
                      <span className="text-xs sm:text-sm text-nowrap font-medium mt-1">
                        {item.name}
                      </span>
                      {Number(category) === item.id && (
                        <span className="absolute -top-3 w-6 h-6 bg-[#DC2626] -right-3 rotate-45"></span>
                      )}
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center mb-3">
          {category &&
            BRAND_FILTERS[category].map((brand) => (
              <div
                onClick={() => handleSelectedBrand(brand)}
                key={brand.id}
                className={`${
                  brand.id === selectedBrand?.id ? "border-red border-2" : ""
                } cursor-pointer max-w-[120px] w-full rounded-md h-10 border p-[2px] shadow-sm transition hover:shadow-lg`}
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
        </div>

        {keywords && (
          <div className="mb-4">
            <span className="text-secondary font-medium font-inter ">
              * Tìm thấy{" "}
              <span className="font-bold text-secondary">
                {productsData.length}
              </span>{" "}
              kết quả với từ khóa{" "}
              <span className="font-bold text-secondary">{keywords}</span>
            </span>
          </div>
        )}

        {/* Render Products Data */}
        {productsData.length === 0 && !isInitialLoading ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Out of stock"
              className="w-32 h-32 object-contain mb-4 opacity-80"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Sản phẩm tạm hết hàng
            </h2>
            <p className="text-sm font-inter text-gray-500 mt-2">
              Vui lòng quay lại sau hoặc chọn sản phẩm khác.
            </p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6 mb-10">
              {isInitialLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCard key={`skl-${index}`} />
                  ))
                : productsData.map((item) => (
                    <CardProduct key={item.id} product={item} />
                  ))}
            </ul>

            {showLoadMoreButton &&
              (isLoadingMore ? (
                <div className="size-6 mx-auto my-4 border-2 border-third shadow-xl border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ButtonLight
                  onClick={handleLoadMoreClick}
                  className="mx-auto text-[15px] font-inter"
                >
                  Xem thêm {rootProducts.length - productsData.length} kết quả{" "}
                  <FaAngleDown />
                </ButtonLight>
              ))}

            {/* Intersection observer target - only active when not filtered */}
            {hasMore && !isInitialLoading && (
              <div ref={observerRef} className="h-10"></div>
            )}

            {/* End of products message */}
            {!hasMore && productsData.length > 0 && (
              <div className="text-center font-inter py-8 text-[15px] text-gray-500 border-t">
                <p>Đã hiển thị tất cả {productsData.length} sản phẩm</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
