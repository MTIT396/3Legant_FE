import React, { useContext, useState } from "react";
import { BsCartPlus, BsHeart, BsHeartFill } from "react-icons/bs";
import Button from "./ui/Button/Button";
import { CartContext } from "../contexts/CartContext";
import { numberWithCommas } from "../utils/util";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toast";
import { cartService } from "../services/cartService";
import { ProductContext } from "../contexts/ProductContext";
import { wishlistService } from "../services/wishlistService";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useUser } from "../contexts/UserContext";
const BACKUP_IMG = "https://topperworld.in/media/2022/09/coming-soon.png";

const CardProduct = React.memo(({ product }) => {
  const { user } = useUser();
  // Destructuring Products
  const { id, image_url, name, sale_price, base_price, rating } = product;
  // Cart Handler
  const { fetchCart, cart } = useContext(CartContext);

  // Wishlist Handler
  const { wishlist, fetchWishlist } = useContext(ProductContext);
  const wishlistIds = wishlist.map((item) => item.product_id);
  const [isHearted, setIsHearted] = useState(wishlistIds.includes(product.id));
  const handleToggleHeart = async () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng !", "error");
      return;
    }
    try {
      if (isHearted) {
        // Remove Wishlists Handler
        const res = await wishlistService.removeFromWishlist(id);
        if (res.data.success) {
          showToast(res.data.message, "info");
          fetchWishlist();
        }
      } else {
        // Add To Wishlists Handler
        const res = await wishlistService.addToWishlist(id);
        if (res.data.success) {
          showToast(res.data.message, "success");
          fetchWishlist();
        }
      }
      setIsHearted(!isHearted);
    } catch (err) {
      console.error(err);
    }
  };

  // Add to Cart
  const existedItem = cart.find((item) => item.id === id);
  const handleAddToCart = async () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng !", "error");
      return;
    }
    try {
      const res = await cartService.addToCart(id, 1);
      // Get Cart
      fetchCart();
      if (res.data.success && !existedItem) {
        showToast("Thêm giỏ hàng thành công !", "success");
      } else {
        showToast("Đã có sản phẩm trong giỏ hàng !", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="group bg-transparent relative">
      <div className="relative w-full md:h-[280px] h-[200px] overflow-hidden rounded-lg border border-grey cursor-pointer">
        <Link to={`/product/${id}`}>
          <div className="relative mx-auto w-[75%] h-full bg-white flex items-center justify-center overflow-hidden p-2">
            <img
              src={image_url || BACKUP_IMG}
              alt={name}
              className="w-full h-full object-contain object-center transition-all ease-in-out duration-300 md:group-hover:scale-[1.05]"
            />
          </div>
        </Link>

        <button
          onClick={handleToggleHeart}
          className="shadow-lg bg-white rounded-full p-2 absolute top-4 right-4 cursor-pointer"
        >
          {isHearted ? (
            <BsHeartFill size={18} className="text-red transition " />
          ) : (
            <BsHeart
              size={18}
              className="text-secondary transition hover:text-red"
            />
          )}
        </button>
        <span
          onClick={handleAddToCart}
          className="absolute bottom-0 translate-y-[110%] left-4 right-4 transition-all duration-300 ease-out md:group-hover:bottom-4 md:group-hover:translate-y-0"
        >
          <Button className="w-full">Add to cart</Button>
        </span>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          {rating && (
            <>
              <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
              <span className="text-sm font-inter font-medium ml-1 text-darkGrey">
                {rating}
              </span>
            </>
          )}
          <button className="ml-auto" onClick={handleAddToCart}>
            <BsCartPlus
              size={24}
              className="text-secondary hover:text-third transition 
              "
            />
          </button>
        </div>
        <Link to={`/product/${id}`}>
          <p className="sm:text-[15px] text-sm font-semibold leading-6 line-clamp-2 text-ellipsis overflow-hidden">
            {name}
          </p>
        </Link>
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-x-3 ">
          <p className="font-inter font-semibold text-sm sm:text-base text-[#dd2f2c] ">
            {numberWithCommas(sale_price) || "Đang cập nhật"}₫
          </p>
          {base_price && (
            <p className="font-inter font-medium line-through text-xs sm:text-sm  text-secondary">
              {numberWithCommas(base_price)}₫
            </p>
          )}
        </div>
      </div>
      {sale_price && base_price && (
        <div className="absolute -top-[6px] left-4">
          <span className="badge-hook ">
            <span className="text-xs font-inter">Giảm</span>{" "}
            {Math.round(((base_price - sale_price) / base_price) * 100)}%
          </span>
        </div>
      )}
    </li>
  );
});

export default CardProduct;
