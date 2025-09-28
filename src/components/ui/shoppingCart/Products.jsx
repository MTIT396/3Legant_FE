import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../../utils/util";
import { CartContext } from "../../../contexts/CartContext";
import { cartService } from "../../../services/cartService";

const Products = ({ product }) => {
  const {
    product_id,
    image_url,
    final_price,
    label,
    color,
    product_name,
    quantity,
  } = product;
  const { setCart, setTotalPrice } = useContext(CartContext);

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
  return (
    <div className="flex py-4 border-b border-grey">
      <div className="flex min-w-[316px] items-stretch">
        <Link to={`/product/${product_id}`}>
          <div className="max-w-[80px] mr-4 cursor-pointer">
            <img
              src={image_url}
              alt={product_name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-1 justify-center">
          <Link to={`/product/${product_id}`}>
            <h1 className="font-semibold text-sm text-neutral_1 cursor-pointer hover:underline max-w-[200px]">
              {product_name}
            </h1>
          </Link>
          {label && (
            <div className="flex items-center font-medium gap-1 text-xs font-inter">
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
          <button
            onClick={handleRemoveCartItem}
            className="font-medium text-sm flex cursor-pointer items-center text-secondary hover:text-third transition"
          >
            <span className="">
              <IoClose size={24} />
            </span>
            <span>Remove</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[74px] items-center justify-center flex-1 text-center">
        <span className="font-semibold">{quantity}</span>
        <p className="text-lg text-neutral_1 font-semibold leading-8 font-inter">
          {numberWithCommas(final_price * quantity)}₫
        </p>
        <p className="text-third leading-8 font-medium font-inter">0₫</p>
      </div>
    </div>
  );
};

export default Products;
