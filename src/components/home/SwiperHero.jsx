import React from "react";
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
import { heroImages } from "../../data";
import { useNavigate } from "react-router-dom";
const SwiperHero = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      loop
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      className="rounded-md shadow-lg w-full"
    >
      {heroImages.map((item) => (
        <SwiperSlide key={item.img}>
          <div
            onClick={() => navigate(`/product?categories=${item.category}`)}
            className="md:h-[536px] h-[180px] cursor-pointer"
          >
            <img
              src={item.img}
              alt=""
              className="w-full h-full aspect-square object-fill"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperHero;
