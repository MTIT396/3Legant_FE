import React, { useEffect, useState } from "react";
import Footer from "../../layouts/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ButtonDark from "../../components/ui/Button/ButtonDark";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { numberWithCommas } from "../../utils/util";
import { orderService } from "../../services/orderService";
import confetti from "canvas-confetti";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useOpenStore } from "../../store/useOpenStore";
import { useOrderStore } from "../../store/useOrderStore";

const Order = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  const order = useOrderStore((state) => state.orderStore);
  const [orderItems, setOrderItems] = useState([]);
  const goToOrder = () => {
    navigate("/account/orders");
  };

  useEffect(() => {
    const fetchOrderItems = async () => {
      const res = await orderService.getOrder(order.id);
      setOrderItems(res.data.order.items);
    };
    fetchOrderItems();
    // Fireworks
    const duration = 3 * 1000; // 3 giây
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0, y: Math.random() - 0.2 },
      });
      // Right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1, y: Math.random() - 0.2 },
      });
    }, 250);

    // Middle
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

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
            back to home
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
              <p className="text-green text-base font-semibold leading-[26px] ml-4 mr-20">
                Shopping Cart
              </p>
            </div>
            <div className="flex items-center pb-6 border-b-2 border-green">
              <span className="h-[42px] w-[42px] rounded-full bg-green text-white flex items-center justify-center">
                <IoCheckmarkOutline size={24} />
              </span>
              <p className="text-green text-base font-semibold leading-[26px] ml-4 mr-20">
                Checkout Details
              </p>
            </div>
            <div className="flex items-center pb-6">
              <span className="h-[42px] w-[42px] rounded-full bg-third text-white flex items-center justify-center">
                3
              </span>
              <p className="text-third text-base font-semibold leading-[26px] ml-4 mr-20">
                Order Complete
              </p>
            </div>
          </div>
        </div>
        <div className="my-20 rounded-lg bg-white shadow-xl border border-grey">
          <div className="flex flex-col gap-y-10 md:py-20 p-4 items-center justify-center">
            {/* Title */}
            <div className="">
              <h2 className="text-secondary text-2xl font-semibold leading-8 mb-4 text-left sm:text-center">
                Thank you! 🎉
              </h2>
              <h1 className="text-[40px] font-medium leading-10 text-left sm:text-center mr-6">
                Your order has been received
              </h1>
            </div>
            {/* Products */}
            <div className="flex flex-wrap mx-auto gap-14">
              {orderItems.map((item) => {
                return (
                  <div
                    key={item.order_item_id}
                    className="border border-lightGrey rounded-md shadow-md"
                  >
                    <div className="max-w-[80px] h-[80px] relative p-2">
                      <img
                        className="w-full h-full object-fill"
                        src={item.image_url}
                        alt={item.name}
                      />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Info Details*/}
            {order && (
              <div className="w-full max-w-xl">
                <div className="overflow-hidden rounded-xl shadow-lg border border-lightGrey">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          colSpan="2"
                          className="px-6 py-3 text-left text-lg font-semibold text-secondary"
                        >
                          Order Information
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-6 py-3 text-sm font-medium text-secondary">
                          Order code
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-third text-right">
                          #{order.id}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-3 text-sm font-medium text-secondary">
                          Date
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-third text-right">
                          {order.created_at}
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-3 text-sm font-medium text-secondary">
                          Total
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-third text-right">
                          {numberWithCommas(order.total_price)}₫
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-3 text-sm font-medium text-secondary">
                          Payment method
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-third text-right">
                          {order.payment_method}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Button */}
            <ButtonDark onClick={goToOrder}>View purchase history</ButtonDark>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
