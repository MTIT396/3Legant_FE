import React, { useContext, useEffect, useState } from "react";
import SaleOff from "../components/SaleOff";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { axiosClient } from "../utils/axios";
import { getWords, numberWithCommas } from "../utils/util";
import SkeletonCard from "../components/ui/SkeletonCard";
import { MdCheck, MdKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Button from "../components/ui/Button/Button";
import ButtonLight from "../components/ui/Button/ButtonLight";
import { CartContext } from "../contexts/CartContext";
import { showToast } from "../utils/toast";
import { BsPinAngle, BsStarFill } from "react-icons/bs";
import { cartService } from "../services/cartService";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import Newsletter from "../components/Newsletter";
import Footer from "../layouts/Footer";
import { wishlistService } from "../services/wishlistService";
import { ProductContext } from "../contexts/ProductContext";
import { Rating } from "@smastrom/react-rating";
import { AdditionalInfo } from "../components/AdditionalInfo";
import { Reviews } from "../components/Reviews";
import { HiColorSwatch } from "react-icons/hi";
import { Questions } from "../components/Questions";
import ProductsImageSlider from "./ProductsImageSlider";
import { useOpenStore } from "../store/useOpenStore";
import { useUser } from "../contexts/UserContext";
import RecommendProducts from "../components/RecommendProducts";
import Policies from "../components/ui/Policies";
import DiscountOffers from "../components/DiscountOffers";
import Promotions from "../components/Promotions";

const Product = () => {
  const { user } = useUser();
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  const { id } = useParams();
  const product_id = Number(id);

  const [productImages, setProductImages] = useState(null);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add to Cart
  const { fetchCart, cart } = useContext(CartContext);

  // state chọn version/color
  const [versionIndex, setVersionIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  useEffect(() => setColorIndex(0), [versionIndex]);

  // Helpers
  const variants = details?.variants || [];
  const currentVariant = variants[versionIndex] || null;
  const colors = currentVariant?.colors || [];
  const currentColor = colors[colorIndex] || null;

  const base_price_interface =
    currentVariant?.base_price ?? details?.base_price;
  const sale_price_interface =
    currentColor?.price ??
    currentVariant?.sale_price ??
    details?.sale_price ??
    0;

  const selectedLabel = currentVariant?.label || null;
  const selectedColor = currentColor?.color_name || null;

  // Add to Cart Handler
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = async () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng !", "error");
      return;
    }
    try {
      // Check tồn tại trong cart (cả product + label + color)
      const existedItem = cart.find(
        (item) =>
          item.id === product_id &&
          item.label === selectedLabel &&
          item.color === selectedColor
      );

      if (existedItem) {
        showToast("Đã có sản phẩm trong giỏ hàng !", "info");
        return;
      }

      const res = await cartService.addToCart(
        product_id,
        quantity,
        selectedLabel,
        selectedColor
      );

      if (res.data.success) {
        await fetchCart();
        showToast("Thêm giỏ hàng thành công !", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Có lỗi xảy ra, vui lòng thử lại!", "error");
    }
  };

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get(`/api/products/${id}`);
        setProductImages(res.data.data.images);
        setDetails(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Wishlist Handler
  const { wishlist, fetchWishlist } = useContext(ProductContext);
  const wishlistIds = wishlist.map((item) => item.id);
  const [isHearted, setIsHearted] = useState(wishlistIds.includes(product_id));

  const handleToggleHeart = async () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng !", "error");
      return;
    }
    try {
      if (isHearted) {
        const res = await wishlistService.removeFromWishlist(id);
        if (res.data.success) {
          showToast(res.data.message, "info");
          fetchWishlist();
        }
      } else {
        const res = await wishlistService.addToWishlist(
          id,
          selectedLabel,
          selectedColor
        );
        if (res.data.success) {
          showToast(res.data.message, "success");
          fetchWishlist();
        } else {
          showToast(res.data.message, "info");
          fetchWishlist();
        }
      }
      setIsHearted(!isHearted);
    } catch (err) {
      console.error(err);
    }
  };

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const res = await axiosClient.get(`/api/reviews/${product_id}`);
        setReviews(res.data.reviews);
        setRating(res.data.average_rating);
      };
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  }, [product_id]);

  // Handle Menu Selection
  const [selected, setSelected] = useState("Reviews");
  const barMenu = [
    { name: "Additional Info", component: AdditionalInfo },
    { name: "Questions", component: Questions },
    { name: "Reviews", component: (props) => <Reviews {...props} /> },
  ];
  const ActiveComponent = barMenu.find(
    (menu) => menu.name === selected
  ).component;
  const suggestedName = getWords(details?.name, 1);
  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto mb-10 lg:px-[160px] h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        } `}
      >
        {isLoading || !productImages ? (
          <SkeletonCard />
        ) : (
          <>
            <div className="flex flex-col xl:flex-row pt-10">
              {/* Slider Images */}
              <div className="flex flex-col gap-10 xl:max-w-[50%] flex-1 w-full">
                <div>
                  <ProductsImageSlider productImages={productImages} />
                </div>

                {/* Specifications */}
                {details?.technicals?.length > 0 && (
                  <div className="sm:p-4 px-0 py-4 font-fourth">
                    <h2 className="text-xl font-semibold mb-4">
                      Thông số kỹ thuật
                    </h2>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full table-auto border-collapse">
                        <tbody>
                          {details.technicals.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200">
                              <th
                                scope="row"
                                className="w-1/3 px-4 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-r border-gray-300"
                              >
                                {item.name}
                              </th>
                              <td
                                className={`${
                                  idx === 1
                                    ? "text-blue font-medium"
                                    : "text-gray-800"
                                } px-4 py-3 text-sm bg-white`}
                              >
                                {item.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* You may also like */}
                <RecommendProducts suggestName={suggestedName} />
              </div>

              {/* Content */}
              <div className="xl:px-8 flex-1">
                {/* Top Properties */}
                <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 mb-4">
                  <div className="">
                    {rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Rating
                          style={{ maxWidth: 90 }}
                          value={Number(rating).toFixed(1)}
                          readOnly
                        />
                        <span className="text-sm mt-1 ml-[10px]">
                          {reviews.length} reviews
                        </span>
                      </div>
                    )}
                    <h1 className="xl:text-[26px] sm:mt-0 mt-4 text-xl font-semibold xl:leading-[42px]">
                      {details?.name || "Đang cập nhật"}
                    </h1>
                  </div>

                  {/* Product Price */}
                  <div className="relative shadow-md w-full px-6 py-4 rounded-3xl sm:w-fit border border-[#73A6FA] bg-gradient-to-tr from-transparent to-[#F2F7FF]">
                    {base_price_interface && (
                      <div className="absolute -top-2 right-6">
                        <span className="badge-hook_v2 font-inter">
                          giảm{" "}
                          <span className="font-medium text-[13px]">
                            {" "}
                            {Math.round(
                              ((base_price_interface - sale_price_interface) /
                                base_price_interface) *
                                100
                            )}
                            %
                          </span>
                        </span>
                      </div>
                    )}

                    <span className="text-sm text-third font-medium">
                      Giá sản phẩm
                    </span>
                    <div className="flex mt-1 items-center gap-3">
                      <span className="font-semibold text-[26px] leading-[34px]">
                        {numberWithCommas(sale_price_interface)}₫
                      </span>
                      {base_price_interface && (
                        <div className="flex items-center">
                          <span className="font-medium text-lg font-inter text-secondary line-through">
                            {numberWithCommas(base_price_interface)}₫
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  {base_price_interface && (
                    <div className="font-inter text-sm flex items-center gap-2">
                      <span>
                        <BsPinAngle size={18} className="text-red" />
                      </span>
                      <span className="font-medium text-red">
                        Tiết kiệm lên đến:{" "}
                      </span>
                      <span className="font-semibold text-[15px] text-darkRed opacity">
                        {numberWithCommas(
                          base_price_interface - sale_price_interface
                        )}
                        ₫
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  {rating > 0 && (
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold text-xl">
                        {Number(rating).toFixed(1)}
                      </span>
                      <BsStarFill size={16} className="text-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Version & Color */}
                {variants.length > 0 && (
                  <div className="border-b border-[#ccc] pb-6 mb-6">
                    {/* Versions */}
                    <span className="flex items-center text-darkGrey mb-4">
                      <h4 className="text-sm font-semibold">Choose Version</h4>
                      <MdKeyboardArrowRight size={24} />
                    </span>
                    <div className="flex items-center gap-3 flex-wrap">
                      {variants.map((value, index) => (
                        <div
                          key={value.id}
                          onClick={() => setVersionIndex(index)}
                          className={`${
                            index === versionIndex
                              ? "border-darkRed"
                              : "border-gray-300"
                          } hover:-translate-y-1 hover:shadow-lg transition relative overflow-hidden px-3 py-4 min-w-[80px] text-center cursor-pointer rounded-md border-2 shadow-sm flex flex-col gap-2`}
                        >
                          <span className="text-base text-nowrap text-primary font-semibold">
                            {value.label}
                          </span>
                          {index === versionIndex && (
                            <span
                              className="pointer-events-none bg-darkRed absolute -top-3 -right-3 size-10 flex items-center justify-center"
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
                        </div>
                      ))}
                    </div>

                    {/* Colors */}
                    {colors.length > 0 && (
                      <>
                        <span className="mt-6 flex items-center text-darkGrey mb-4">
                          <h4 className="text-sm font-semibold">
                            Choose Color
                          </h4>
                          <MdKeyboardArrowRight size={24} />
                        </span>
                        <div className="flex items-center gap-3 flex-wrap">
                          {colors.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => setColorIndex(index)}
                              className={`${
                                index === colorIndex
                                  ? "border-darkRed"
                                  : "border-gray-300"
                              } hover:-translate-y-1 transition relative overflow-hidden min-w-[120px] px-3 py-2 cursor-pointer rounded-md border-2 shadow-sm flex flex-col gap-1`}
                            >
                              <div className="flex items-center gap-2">
                                <HiColorSwatch className="text-secondary" />
                                <span className="text-sm text-primary font-third font-bold">
                                  {item.color_name}
                                </span>
                              </div>
                              <span className="text-sm font-medium font-third text-third">
                                {numberWithCommas(item.price)}₫
                              </span>
                              {index === colorIndex && (
                                <span
                                  className="pointer-events-none bg-darkRed absolute -top-3 -right-3 size-10 flex items-center justify-center"
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
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Quantity & Wishlist */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-between rounded-md bg-grey px-3 py-2 w-[112px]">
                    <button
                      onClick={handleDecrease}
                      className="text-secondary hover:text-black transition"
                    >
                      <FiMinus />
                    </button>
                    <span className="font-medium text-neutral_1">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="text-secondary hover:text-black transition"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <ButtonLight
                    onClick={handleToggleHeart}
                    className="w-full rounded-md"
                  >
                    <FiHeart size={18} />
                    <span>Wishlist</span>
                  </ButtonLight>
                </div>
                <Button onClick={handleAddToCart} className="w-full mb-8">
                  Add To Cart
                </Button>

                {/* Promotion */}
                <Promotions />
                {/* Discount Offers */}
                <DiscountOffers />
                {/* Policies */}
                <Policies />
              </div>
            </div>

            {/* Menu bar */}
            <div className="flex items-center flex-wrap sm:gap-20 justify-between sm:justify-start border-b border-lightGrey mt-6 mb-8">
              {barMenu.map((menu, index) => (
                <span
                  key={index}
                  onClick={() => setSelected(menu.name)}
                  className={`${
                    menu.name === selected
                      ? "text-third font-medium border-b border-third"
                      : ""
                  } cursor-pointer hover:text-third transition text-base text-secondary font-medium leading-8`}
                >
                  {menu.name}
                </span>
              ))}
            </div>

            {/* Menu Items */}
            {<ActiveComponent product_id={product_id} reviews={reviews} />}
          </>
        )}
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
