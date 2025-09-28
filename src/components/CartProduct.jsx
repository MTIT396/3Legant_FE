import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { numberWithCommas } from "../utils/util";
import { cartService } from "../services/cartService";

const CartProduct = ({ product, removeCloseButtonClass, isFixedQuantity }) => {
  const {
    product_id,
    image_url,
    product_name,
    final_price,
    quantity,
    label,
    color,
  } = product;
  const { setCart, handleCloseCart, setTotalPrice } = useContext(CartContext);
  const [inputValue, setInputValue] = useState(quantity);
  const navigate = useNavigate();
  // Remove item
  const handleRemoveCartItem = async () => {
    try {
      const res = await cartService.removeFromCart(product_id, label, color);
      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total_price);
      }
    } catch (err) {
      console.error("Failed to remove item from cart", err);
    }
  };

  // Update số lượng
  const updateQuantity = async (newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    try {
      const res = await cartService.updateCartItem(
        product_id,
        newQuantity,
        label,
        color
      );
      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total_price);
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  // Decrease / Increase
  const handleDecreaseQuantity = () => updateQuantity(inputValue - 1);
  const handleIncreaseQuantity = () => updateQuantity(inputValue + 1);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      updateQuantity(+inputValue);
    }
  };

  const goToProductPage = () => {
    navigate(`/product/${product_id}`);
    handleCloseCart();
  };

  return (
    <div className="py-2 border-b border-grey">
      <div className="flex items-center">
        <div
          onClick={goToProductPage}
          className="cursor-pointer h-[96px] max-w-[80px]"
        >
          <img
            src={image_url}
            alt={product_name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex justify-between flex-1 ml-4">
          <div className="flex flex-col">
            <p
              onClick={goToProductPage}
              className="text-sm text_neutral_1 font-semibold hover:underline mr-2 cursor-pointer"
            >
              {product_name}
            </p>
            <p className="text-xs text-secondary mt-2 ">
              {numberWithCommas(final_price)}₫
            </p>

            {/* Increase / Decrease */}

            {isFixedQuantity ? (
              <span className="font-inter font-medium text-xs mt-1 text-secondary">
                Quantity: <span className="text-third">{quantity}</span>
              </span>
            ) : (
              <div className="relative w-[80px] h-[32px] border border-secondary rounded overflow-hidden mt-2">
                <button
                  onClick={handleDecreaseQuantity}
                  className="text-secondary absolute z-[2] left-0 top-1/2 translate-x-2 -translate-y-1/2 cursor-pointer hover:text-neutral_1 transition"
                >
                  <FiMinus />
                </button>
                <input
                  onChange={(e) =>
                    setInputValue(+e.target.value === 0 ? 1 : +e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  value={inputValue === 0 ? 1 : inputValue}
                  type="number"
                  className="absolute text-sm font-semibold text-center w-full h-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                />
                <button
                  onClick={handleIncreaseQuantity}
                  className="text-secondary absolute z-[2] right-0 top-1/2 -translate-x-2 -translate-y-1/2 cursor-pointer hover:text-neutral_1 transition"
                >
                  <FiPlus />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col ">
            <h1 className="text-primary font-semibold text-sm">
              {numberWithCommas(inputValue * final_price)}₫
            </h1>
            <button
              onClick={handleRemoveCartItem}
              className={`${removeCloseButtonClass} text-secondary flex justify-end mt-2 cursor-pointer hover:text-primary transition`}
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>
      </div>
      {label && (
        <div className="flex items-center font-medium gap-2 text-sm mt-4">
          <span className="text-secondary">Options: </span>
          <div className="">{label}</div>
          {color && (
            <>
              <span> / </span>
              <div className="">{color}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartProduct;
