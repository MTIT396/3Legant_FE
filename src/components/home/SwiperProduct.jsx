/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardProduct from "../CardProduct";
import SkeletonCard from "../ui/SkeletonCard";

const SwiperProduct = ({
  products = [],
  isLoading = false,
  mode = "many",
  skeletonCount = 5,
}) => {
  // baseline slides per breakpoint cho 2 chế độ
  const BASELINES = {
    many: {
      330: 1.6,
      400: 2,
      640: 3,
      1280: 4,
      1440: 5,
    },
    little: {
      330: 1.6,
      400: 2,
      640: 2.6,
      1280: 2,
      1440: 2.6,
    },
  };

  // Tính breakpoints với clamp so với số sản phẩm
  const breakpoints = useMemo(() => {
    const baseline = BASELINES[mode] || BASELINES.many;
    const bp = {};
    Object.entries(baseline).forEach(([key, value]) => {
      // slidesPerView không vượt quá số sản phẩm có sẵn (và tối thiểu 2)
      const clampValue = Math.max(
        1,
        Math.min(value, products.length > 0 ? products.length : value)
      );
      bp[key] = { slidesPerView: clampValue };
    });
    return bp;
  }, [mode, products.length]);

  // Nếu đang loading — hiển thị skeleton slides cố định
  if (isLoading) {
    const skeletons = Array.from({ length: skeletonCount });
    return (
      <Swiper
        breakpoints={breakpoints}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={16}
        navigation={false} // thường disable nav khi loading
        grabCursor={false}
        className="mySwiper custom-swiper"
      >
        {skeletons.map((_, i) => (
          <SwiperSlide key={`skeleton-${i}`}>
            <SkeletonCard />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  // Nếu không loading và không có sản phẩm — show placeholder
  if (!isLoading && (!products || products.length === 0)) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        Không có sản phẩm để hiển thị.
      </div>
    );
  }

  // Bình thường map product -> Slide
  return (
    <Swiper
      breakpoints={breakpoints}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={16}
      navigation
      grabCursor={true}
      className="mySwiper custom-swiper w-full"
    >
      {products.map((item, index) => (
        <SwiperSlide key={item.id ?? index}>
          <CardProduct product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProduct;
