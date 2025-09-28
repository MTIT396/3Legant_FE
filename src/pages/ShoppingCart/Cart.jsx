import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Products from "../../components/ui/shoppingCart/Products";
import { v4 } from "uuid";
import { RiCoupon3Line } from "react-icons/ri";
import Button from "../../components/ui/Button/Button";
import Footer from "../../layouts/Footer";
import CartProduct from "../../components/CartProduct";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/util";
import noCart from "../../imgs/Cart.png";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { useOpenStore } from "../../store/useOpenStore";

const Cart = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  const { cart, totalPrice } = useContext(CartContext);
  const id_1 = v4();
  const id_2 = v4();
  const id_3 = v4();
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/cart/checkout");
  };
  const backToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto relative lg:px-[160px] py-20 h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        } `}
      >
        {/* Back */}
        <button
          onClick={backToHome}
          className="flex gap-1 group cursor-pointer absolute top-4 left-8 visible sm:invisible"
        >
          <span className="text-darkGrey group-hover:text-third transition">
            <IoIosArrowBack size={18} />
          </span>
          <p className="text-sm font-medium text-darkGrey group-hover:text-third transition">
            back
          </p>
        </button>
        {/* Process */}
        <div className="flex flex-col gap-10 items-center ">
          <h1 className="text-[54px] text-primary font-medium leading-[58px]">
            Cart
          </h1>
          <div className="flex justify-center flex-col md:flex-row gap-8 w-full">
            <div className="flex items-center border-b-2 border-third pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-third text-white flex items-center justify-center">
                1
              </span>
              <p className="text-third text-base font-semibold leading-[26px] ml-4 xl:mr-20">
                Shopping Cart
              </p>
            </div>
            <div className="flex items-center pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-lightGrey text-white flex items-center justify-center">
                2
              </span>
              <p className="text-lightGrey text-base font-semibold leading-[26px] ml-4 xl:mr-20">
                Checkout Details
              </p>
            </div>
            <div className="flex items-center pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-lightGrey text-white flex items-center justify-center">
                3
              </span>
              <p className="text-lightGrey text-base font-semibold leading-[26px] ml-4 xl:mr-20">
                Order Complete
              </p>
            </div>
          </div>
        </div>
        <div className="flex py-0 md:pt-20 gap-16 flex-col xl:flex-row">
          <div className="flex flex-col flex-1">
            {/* Title Field */}
            <div className="flex text-base font-semibold leading-7 border-b border-secondary pb-4">
              <h1 className="min-w-[316px]">Product</h1>
              <div className="hidden lg:block flex-1">
                <div className="grid grid-cols-3 gap-x-[74px] ">
                  <h1 className="text-center">Quantity</h1>
                  <h1 className="text-center">Price</h1>
                  <h1 className="text-center">Subtotal</h1>
                </div>
              </div>
            </div>
            {/* Products */}

            {/* Laptop , PC */}
            <div className="hidden lg:flex h-full">
              {cart.length > 0 ? (
                <div className="flex flex-col xl:max-h-[420px] xl:overflow-auto">
                  {cart.map((product) => {
                    return (
                      <Products key={product.cart_item_id} product={product} />
                    );
                  })}
                </div>
              ) : (
                <div className="mx-auto mt-6">
                  <div className="grayscale h-48 ">
                    <img
                      className="w-full h-full object-contain"
                      src={noCart}
                      alt=""
                    />
                  </div>
                  <p className="text-primary text-center">
                    Your cart is empty ...
                  </p>
                </div>
              )}
            </div>
            {/* Mobile */}

            <div className="block lg:hidden">
              {cart.length > 0 ? (
                <div className="flex flex-col xl:max-h-[420px] xl:overflow-auto">
                  {cart.map((item) => {
                    return (
                      <CartProduct key={item.cart_item_id} product={item} />
                    );
                  })}
                </div>
              ) : (
                <div className="mx-auto mt-6">
                  <div className="grayscale h-48 ">
                    <img
                      className="w-full h-full object-contain"
                      src={noCart}
                      alt=""
                    />
                  </div>
                  <p className="text-primary text-center">
                    Your cart is empty ...
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Cart Summary */}
          <div className="block xl:hidden">
            <div className="flex flex-col max-w-[424px] w-full">
              <h1 className="text-xl text-neutral_1 font-medium leading-7">
                Have a coupon?
              </h1>
              <p className="text-secondary mt-2 mb-4">
                Add your code for an instant cart discount
              </p>
              <div className="flex items-center border border-secondary py-3 px-4">
                <span className="text-secondary">
                  <RiCoupon3Line size={24} />
                </span>
                <input
                  type="text"
                  className="placeholder:text-secondary ml-2 w-full placeholder:font-medium outline-none"
                  placeholder="Coupon code"
                />
                <button className="text-neutral_1 leading-7 font-medium hover:opacity-80 transition">
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="border border-neutral_1 rounded-md p-6 xl:min-w-[460px]">
            <div className="flex flex-col ">
              <h1 className="text-xl font-medium leading-7 mb-4">
                Cart Summary
              </h1>

              {/* Free Shipping */}
              <div className="flex flex-col gap-y-3">
                <div className="rounded border border-neutral_1 flex items-center justify-between p-4 hover:bg-saleBgColor">
                  <div className="flex">
                    <div className="price-checkbox">
                      <input
                        type="checkbox"
                        className="w-0 h-0 absolute opacity-0"
                        id={id_1}
                      />
                      <label
                        htmlFor={id_1}
                        className="relative pl-6 w-full block cursor-pointer select-none mb-3"
                      ></label>
                    </div>
                    <p className="ml-3 font-light text-neutral_1">
                      Free Shipping
                    </p>
                  </div>
                  <p className="font-light text-neutral_1">$0.00</p>
                </div>
                {/* Express Shipping */}
                <div className="rounded border border-neutral_1 flex items-center justify-between p-4 hover:bg-saleBgColor">
                  <div className="flex">
                    <div className="price-checkbox">
                      <input
                        type="checkbox"
                        className="w-0 h-0 absolute opacity-0"
                        id={id_2}
                      />
                      <label
                        htmlFor={id_2}
                        className="relative pl-6 w-full block cursor-pointer select-none mb-3"
                      ></label>
                    </div>
                    <p className="ml-3 font-light text-neutral_1">
                      Express Shipping
                    </p>
                  </div>
                  <p className="font-light text-neutral_1">$0.00</p>
                </div>
                {/* Pick Up */}
                <div className="rounded border border-neutral_1 flex items-center justify-between p-4 hover:bg-saleBgColor">
                  <div className="flex">
                    <div className="price-checkbox">
                      <input
                        type="checkbox"
                        className="w-0 h-0 absolute opacity-0"
                        id={id_3}
                      />
                      <label
                        htmlFor={id_3}
                        className="relative pl-6 w-full block cursor-pointer select-none mb-3"
                      ></label>
                    </div>
                    <p className="ml-3 font-light text-neutral_1">Pick Up</p>
                  </div>
                  <p className="font-light text-neutral_1">$0.00</p>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex justify-between py-3 border-b border-grey">
                <p className="text-neutral_1 font-light">Subtotal</p>
                <p className="text-neutral_1 font-semibold font-inter">0₫</p>
              </div>
              <div className="flex justify-between py-3 text-xl font-semibold mb-4">
                <p className="text-neutral_1">Total</p>
                <p className="text-neutral_1 font-inter">
                  {numberWithCommas(totalPrice)}₫
                </p>
              </div>
              {/* Checkout Button */}
              <Button onClick={goToCheckout}>Checkout</Button>
            </div>
          </div>
        </div>
        {/* Coupon */}
        <div className="hidden xl:block">
          <div className="flex flex-col max-w-[424px] w-full">
            <h1 className="text-xl text-neutral_1 font-medium leading-7">
              Have a coupon?
            </h1>
            <p className="text-secondary mt-2 mb-4">
              Add your code for an instant cart discount
            </p>
            <div className="flex items-center border border-secondary py-3 px-4">
              <span className="text-secondary">
                <RiCoupon3Line size={24} />
              </span>
              <input
                type="text"
                className="placeholder:text-secondary ml-2 w-full placeholder:font-medium outline-none"
                placeholder="Coupon code"
              />
              <button className="text-neutral_1 leading-7 font-medium hover:opacity-80 transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
