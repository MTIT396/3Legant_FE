import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { BsBoxArrowInRight, BsTrash } from "react-icons/bs";
import CartProduct from "./CartProduct";
import { v4 } from "uuid";
import Button from "./ui/Button/Button";
import noCart from "../../src/imgs/Cart.png";
import { numberWithCommas } from "../utils/util";
import { useNavigate } from "react-router-dom";
import { cartService } from "../services/cartService";
const CartFlyout = () => {
  const { cart, setCart, totalPrice, setTotalPrice, handleCloseCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
    handleCloseCart();
  };
  const handleClearCart = async () => {
    if (window.confirm("Are you sure to clear entire cart ?")) {
      try {
        const res = await cartService.clearCart();
        if (res.data.success) {
          setCart([]);
          setTotalPrice(0);
        }
      } catch (err) {
        console.error("Failed to clear cart ", err);
        alert("Failed to clear cart. Please try again.");
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-[28px] flex items-center gap-2">
            <p>Cart</p>
            <span className="text-base">({cart.length})</span>
          </h1>
          <div
            onClick={handleCloseCart}
            className="text-secondary cursor-pointer hover:text-neutral_1 transition"
          >
            <BsBoxArrowInRight size={28} />
          </div>
        </div>
      </div>
      {/* Cart Product  */}

      {cart.length > 0 ? (
        <>
          <div className="flex flex-col gap-y-4 overflow-auto">
            {cart.map((product) => {
              return <CartProduct key={v4()} product={product} />;
            })}
          </div>
        </>
      ) : (
        <div className="mt-auto">
          <div className="grayscale h-48 ">
            <img className="w-full h-full object-contain" src={noCart} alt="" />
          </div>
          <p className="text-primary text-center">Your cart is empty ...</p>
        </div>
      )}

      <div className="flex flex-col mb-4 mt-auto">
        {!!cart.length && (
          <div className="flex justify-between items-center mb-4 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-xl text-neutral_1">Total:</span>
              {totalPrice > 0 && (
                <span className="text-xl text-neutral_1 font-semibold">
                  {numberWithCommas(totalPrice)}₫
                </span>
              )}
            </div>
            <button
              onClick={handleClearCart}
              className="py-1 px-2 bg-transparent rounded-sm border border-current w-fit flex items-center gap-1 text-red text-sm hover:bg-red hover:text-white transition-colors"
            >
              <BsTrash size={18} />
              Clear All
            </button>
          </div>
        )}
        {cart.length > 0 ? (
          <Button onClick={goToCart} isAllowed="abled">
            Checkout
          </Button>
        ) : (
          <Button isAllowed="disabled">Checkout</Button>
        )}

        <div className="flex items-center justify-center">
          <button
            disabled={false}
            onClick={goToCart}
            className="text-sm mt-4 cursor-pointer text-primary font-semibold border-b border-primary"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFlyout;
