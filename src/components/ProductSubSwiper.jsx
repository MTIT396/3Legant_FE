import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductSubSwiper = ({ productImages, activeSlide, onNavigate }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="max-h-[460px] w-full max-w-[90%] md:max-w-[460px] mx-auto mt-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={productImages.length >= 5 ? 5 : productImages.length}
        navigation
        breakpoints={{
          330: {
            slidesPerView: productImages.length >= 3 ? 3 : productImages.length,
          },
          460: {
            slidesPerView: productImages.length >= 4 ? 4 : productImages.length,
          },
          768: {
            slidesPerView: productImages.length >= 5 ? 5 : productImages.length,
          },
        }}
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => onNavigate(index)}
              className={`${
                activeSlide === index
                  ? "border-2 border-secondary"
                  : "border-[1px] border-gray-300"
              } h-[80px] max-w-[80px] p-2 rounded-md relative`}
            >
              {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={image}
                loading="lazy"
                alt={image}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSubSwiper;
