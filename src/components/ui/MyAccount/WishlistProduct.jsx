import React, { useContext } from "react";
import { IoCartOutline, IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import { CartContext } from "../../../contexts/CartContext";
import { numberWithCommas } from "../../../utils/util";
import { showToast } from "../../../utils/toast";
import { Link } from "react-router-dom";
import { wishlistService } from "../../../services/wishlistService";
import { ProductContext } from "../../../contexts/ProductContext";
import { cartService } from "../../../services/cartService";

const WishlistProduct = ({ product }) => {
  const {
    product_id,
    image_url,
    product_name,
    base_price,
    final_price,
    label,
    color,
  } = product;

  const { fetchCart, cart } = useContext(CartContext);
  const { fetchWishlist } = useContext(ProductContext);

  const existedItem = cart.find((item) => item.product_id === product_id);

  const handleAddToCart = async () => {
    try {
      const res = await cartService.addToCart(product_id, 1);
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

  const handleRemoveWishlist = async () => {
    try {
      const res = await wishlistService.removeFromWishlist(
        product_id,
        label,
        color
      );
      if (res.data.success) {
        showToast(res.data.message, "success");
        fetchWishlist();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full px-4 py-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-x-4 gap-y-2">
      {/* ảnh + tên */}
      <div className="flex gap-3 items-center">
        <Link to={`/product/${product_id}`}>
          <div className="w-[86px] h-[80px] flex items-center justify-center bg-white">
            <img
              src={image_url}
              alt={product_name}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col">
          <Link to={`/product/${product_id}`}>
            <h1 className="text-sm font-semibold hover:underline text-neutral_1">
              {product_name}
            </h1>
          </Link>
          <p className="text-sm text-neutral_1 block xl:hidden">
            {numberWithCommas(final_price)}₫
          </p>
        </div>
      </div>

      {/* giá (desktop) */}
      <div className="hidden xl:flex flex-col items-center justify-center">
        <p className="text-base text-darkRed font-semibold">
          {numberWithCommas(final_price)}₫
        </p>
        <p className="text-sm line-through text-secondary font-inter font-semibold">
          {numberWithCommas(base_price)}₫
        </p>
      </div>

      {/* action */}
      <div className="flex flex-col items-end md:items-center gap-2 mt-4 md:mt-0">
        <span onClick={handleAddToCart} className="w-fit">
          <Button>
            <span>Add to cart</span>
            <IoCartOutline size={20} />
          </Button>
        </span>
        <button
          onClick={handleRemoveWishlist}
          className="flex items-center text-secondary hover:text-third transition"
        >
          <IoClose size={20} />
          <p className="text-sm font-medium">Remove</p>
        </button>
      </div>

      {/* options */}
      {label && (
        <div className="flex items-center font-medium gap-2 text-sm md:col-span-2 xl:col-span-1 mt-2 md:mt-0">
          <span className="text-secondary">Options:</span>
          <div>{label}</div>
          {color && (
            <>
              <span>-</span>
              <div>{color}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistProduct;
