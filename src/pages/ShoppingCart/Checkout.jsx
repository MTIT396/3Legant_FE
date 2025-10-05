import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IoCheckmarkOutline } from "react-icons/io5";
import CartProduct from "../../components/CartProduct";
import Button from "../../components/ui/Button/Button";
import Footer from "../../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { orderService } from "../../services/orderService";
import { numberWithCommas } from "../../utils/util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "../../schemas/orderSchema";
import Input from "../../components/ui/Input";
import { showToast } from "../../utils/toast";
import { cartService } from "../../services/cartService";
import { useOrderStore } from "../../store/useOrderStore";
import { useOpenStore } from "../../store/useOpenStore";

const Checkout = () => {
  const { cart, setCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
  });
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);
  const setOrderStore = useOrderStore((state) => state.setOrderStore);
  const onSubmit = async (data) => {
    try {
      const res = await orderService.createOrder(data);
      if (res.data.success) {
        setOrderStore(res.data.order);
        showToast(res.data.message, "success");
        setCart([]);
        await cartService.clearCart();
        navigate("/cart/order");
      }
    } catch (error) {
      console.error("Error creating order", error);
    }
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
          onClick={() => navigate("/cart")}
          className="flex group gap-1 cursor-pointer absolute top-4 left-8 visible sm:invisible"
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
          <div className="flex justify-center flex-col xl:flex-row gap-8 w-full">
            <div className="flex items-center border-b-2 border-green pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-green text-white flex items-center justify-center">
                <IoCheckmarkOutline size={24} />
              </span>
              <p className="text-green text-base font-semibold ml-4 mr-20">
                Shopping Cart
              </p>
            </div>
            <div className="flex items-center pb-6 border-b-2 border-third">
              <span className="h-[42px] w-[42px] rounded-full bg-third text-white flex items-center justify-center">
                2
              </span>
              <p className="text-third text-base font-semibold ml-4 mr-20">
                Checkout Details
              </p>
            </div>
            <div className="flex items-center pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-third text-white flex items-center justify-center">
                3
              </span>
              <p className="text-third text-base font-semibold ml-4 mr-20">
                Order Complete
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-20 flex flex-col xl:flex-row gap-x-16 gap-y-6"
        >
          <div className="flex flex-col gap-y-6 flex-1">
            {/* Contact Info */}
            <div className="border border-third rounded py-10 px-6 flex-1 h-fit">
              <h1 className="text-xl font-medium mb-6">Contact Information</h1>
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col md:flex-row gap-6 ">
                  <Input
                    label="First name"
                    register_name="first_name"
                    errors={errors}
                    register={register}
                    type="text"
                    placeholder="First name"
                  />
                  <Input
                    label="Last Name"
                    register_name="last_name"
                    errors={errors}
                    register={register}
                    type="text"
                    placeholder="Last name"
                  />
                </div>

                <Input
                  label="Phone Number"
                  register_name="phone_number"
                  errors={errors}
                  register={register}
                  type="tel"
                  placeholder="Phone number"
                />
                <Input
                  label="Email Address"
                  register_name="email"
                  errors={errors}
                  register={register}
                  type="email"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-third rounded py-10 px-6 flex-1 h-fit">
              <h1 className="text-xl font-medium mb-6">Shipping Address</h1>
              <div className="flex flex-col gap-y-6">
                <Input
                  label="Street Address"
                  register_name="address"
                  errors={errors}
                  register={register}
                  type="text"
                  placeholder="Street address"
                />
                <Input
                  label="Country"
                  register_name="country"
                  errors={errors}
                  register={register}
                  type="text"
                  placeholder="Country"
                />
                <Input
                  label="Town / City"
                  register_name="city"
                  errors={errors}
                  register={register}
                  type="text"
                  placeholder="Town / City"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="border border-third rounded py-10 px-6 flex-1 h-fit">
              <h1 className="text-xl font-medium mb-6">Payment Method</h1>
              <div className="flex flex-col gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="COD"
                    {...register("payment_method")}
                  />
                  COD - Cash On Delivery
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="Paypal"
                    {...register("payment_method")}
                  />
                  Paypal
                </label>
                {errors.payment_method && (
                  <p className="text-red text-xs mt-1">
                    *{errors.payment_method.message}
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full" type="submit">
              Place Order
            </Button>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-4 border border-third rounded xl:max-w-[480px] h-fit">
            <h1 className="text-[28px] font-medium mb-4">Order summary</h1>
            <div className="flex flex-col">
              {cart.map((product, idx) => (
                <CartProduct
                  key={idx}
                  product={product}
                  removeCloseFunction="hidden"
                  isFixedQuantity
                />
              ))}
            </div>
            <div className="flex mt-6 mb-4 gap-x-3">
              <input
                type="text"
                className="border px-4 py-[13px] rounded flex-1 outline-none"
                placeholder="Coupon"
              />
              <Button>Apply</Button>
            </div>

            <div className="flex justify-between items-center py-3">
              <p className="text-neutral_1 text-base">Shipping</p>
              <h1 className="text-neutral_1 text-base font-semibold">Free</h1>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-neutral_1 text-base">Subtotal</p>
              <h1 className="text-neutral_1 text-base font-semibold font-inter">
                0₫
              </h1>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xl text-neutral_1 font-medium">Total</p>
              <h1 className="text-xl text-third font-bold font-inter">
                {numberWithCommas(totalPrice)}₫
              </h1>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
