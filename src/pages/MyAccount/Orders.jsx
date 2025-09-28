import React, { useEffect, useState } from "react";
import Footer from "../../layouts/Footer";
import Navigation from "../../components/ui/MyAccount/Navigation";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { orderService } from "../../services/orderService";
import { numberWithCommas } from "../../utils/util";
import OrderDetailsModal from "../../components/OrderDetailsModal";

import EmptyState from "../../components/ui/EmptyState";
import { useOpenStore } from "../../store/useOpenStore";

const Orders = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await orderService.getOrders();
        setOrders(orderData.data.order);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, []);

  const handleViewDetails = async (order_id) => {
    try {
      const res = await orderService.getOrder(order_id);
      setOrderDetails(res.data.order);
    } catch (err) {
      console.error("handle view details collapsed", err);
    }
  };
  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto lg:px-[160px] py-20 h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        } `}
      >
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-[54px] text-primary font-medium leading-[58px]">
            My Account
          </h1>

          {/* Content */}
          <div className="w-full flex flex-col md:flex-row gap-y-6">
            <Navigation />

            <div className="md:px-[72px] flex-1">
              <h1 className="text-xl text-primary font-semibold leading-8 mb-5">
                Orders History
              </h1>

              {/* Table */}
              <div className="overflow-hidden shadow-md rounded-2xl border border-gray-200">
                {/* Desktop Table */}
                <table className="hidden md:table w-full text-sm text-left text-gray-600 border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 border-r last:border-r-0"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 border-r last:border-r-0"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 border-r last:border-r-0"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 border-r last:border-r-0"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center border-r last:border-r-0"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-800 border-r last:border-r-0">
                            #{order.order_id}
                          </td>
                          <td className="px-6 py-4 border-r last:border-r-0">
                            {order.created_at}
                          </td>
                          <td className="px-6 py-4 border-r last:border-r-0">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-red-500 font-semibold font-inter border-r last:border-r-0">
                            {numberWithCommas(order.total_price)}₫
                          </td>
                          <td className="px-6 py-4 text-center border-r last:border-r-0">
                            <button
                              onClick={() => {
                                setIsOpen(true);
                                handleViewDetails(order.order_id);
                              }}
                              className="text-green hover:underline font-medium"
                            >
                              View details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-6 text-gray-500 italic"
                        >
                          <EmptyState />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Mobile Card Layout */}
                <div className="block md:hidden divide-y">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <div
                        key={index}
                        className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">
                            #{order.order_id}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          📅 {order.created_at}
                        </div>
                        <div className="text-sm font-semibold text-red-500">
                          {numberWithCommas(order.total_price)}₫
                        </div>
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            handleViewDetails(order.order_id);
                          }}
                          className="text-green text-sm font-medium underline self-start"
                        >
                          View details
                        </button>
                      </div>
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderDetailsModal
        isOpen={isOpen}
        order={orderDetails}
        onClose={() => setIsOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default Orders;
