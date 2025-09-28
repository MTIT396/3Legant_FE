import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BRAND_FILTERS } from "../constants/filter";
import { AiOutlineCopyright } from "react-icons/ai";
import { Autoplay } from "swiper/modules";
export default function PartnerCarousel() {
  const brands = [
    { id: 1111, name: "Ecobazar", img: "/ecobazar.png" },
    ...BRAND_FILTERS[1],
  ];

  return (
    <div className="py-6 mt-8 bg-white container mx-auto sm:p-4 lg:px-[160px] sm:pl-8 ">
      <h2 className="text-3xl font-third flex items-center justify-center gap-2 font-bold mb-8">
        Partner Brands
        <span>
          <AiOutlineCopyright size={20} />
        </span>{" "}
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        breakpoints={{
          330: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1280: {
            spaceBetween: 16,
            slidesPerView: brands.length >= 5 ? 5 : brands.length,
          },
        }}
        spaceBetween={30}
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="max-w-5xl mx-auto"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex justify-center">
            <img
              src={brand.img}
              alt={brand.name}
              className="h-16 object-contain grayscale hover:grayscale-0 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
