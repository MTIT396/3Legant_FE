import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { BsX, BsZoomIn, BsZoomOut } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSubSwiper from "../components/ProductSubSwiper";

export default function ProductsImageSlider({ productImages }) {
  const [loaded, setLoaded] = useState(false);
  const swiperRef = useRef(null);
  const modalSwiperRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Zoom & drag
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const resetTransform = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Zoom bằng wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom((z) => {
      const newZoom = Math.min(4, Math.max(1, +(z + delta).toFixed(2)));
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      if (modalSwiperRef.current)
        modalSwiperRef.current.allowTouchMove = newZoom === 1;
      return newZoom;
    });
  };

  // Drag
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isOpen && modalSwiperRef.current) {
      modalSwiperRef.current.slideTo(activeSlide, 0);
      resetTransform();
    }
  }, [isOpen, activeSlide]);
  return (
    <div className="w-full">
      {/* Swiper chính */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative mx-auto p-2 w-full h-[380px] bg-white flex items-center justify-center overflow-hidden cursor-pointer rounded-xl shadow-sm"
              onClick={() => {
                setActiveSlide(index);
                setModalActiveIndex(index);
                setIsOpen(true);
              }}
            >
              {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={image}
                loading="lazy"
                alt={`product-${index}`}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-contain transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Sub Swiper */}
      <ProductSubSwiper
        productImages={productImages}
        activeSlide={activeSlide}
        onNavigate={(i) => {
          swiperRef.current.slideTo(i);
          setActiveSlide(i);
        }}
      />

      {/* Modal Preview */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                onSwiper={(swiper) => (modalSwiperRef.current = swiper)}
                onSlideChange={(s) => {
                  setModalActiveIndex(s.activeIndex);
                  resetTransform();
                }}
                className="w-full max-w-5xl"
              >
                {productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center w-full h-[80vh]">
                      <img
                        src={image}
                        alt={`preview-${index}`}
                        draggable={false}
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                          cursor:
                            zoom > 1
                              ? isDragging
                                ? "grabbing"
                                : "grab"
                              : "default",
                          transition: isDragging
                            ? "none"
                            : "transform 0.2s ease-out",
                        }}
                        className="max-h-full max-w-full object-contain select-none rounded-lg"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Counter */}
              <div className="absolute top-5 left-6 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium">
                {modalActiveIndex + 1} / {productImages.length}
              </div>

              {/* Controls */}
              <div className="absolute top-5 right-6 flex items-center gap-3">
                <button
                  onClick={() =>
                    setZoom((z) => {
                      const newZoom = Math.max(1, z - 0.2);
                      if (newZoom === 1) setPosition({ x: 0, y: 0 });
                      if (modalSwiperRef.current)
                        modalSwiperRef.current.allowTouchMove = newZoom === 1;
                      return newZoom;
                    })
                  }
                  className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
                >
                  <BsZoomOut className="text-white" />
                </button>

                <button
                  onClick={() =>
                    setZoom((z) => {
                      const newZoom = Math.min(4, z + 0.2);
                      if (modalSwiperRef.current)
                        modalSwiperRef.current.allowTouchMove = newZoom === 1;
                      return newZoom;
                    })
                  }
                  className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
                >
                  <BsZoomIn className="text-white" />
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    resetTransform();
                  }}
                  className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
                >
                  <BsX className="text-white text-xl" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
