import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { numberWithCommas } from "../utils/util";
import { useNavigate } from "react-router-dom";
import OrderProgress from "./OrderProgress";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  const navigate = useNavigate();
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal container */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full h-[90%] overflow-auto max-w-4xl mx-4 p-6 relative"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Details
            </h2>

            {/* Progress bar */}
            <div className="mb-4">
              <OrderProgress currentStep={1} />
            </div>

            <div className="flex flex-wrap gap-6 items-center justify-between">
              {/* Delivery info */}
              <div className="md:w-[50%] w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Information
                </h3>

                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md divide-y">
                  {[
                    {
                      label: "Recipient",
                      value: `${order.first_name} ${order.last_name}`,
                    },
                    { label: "Phone", value: order.phone_number },
                    { label: "Email", value: order.email },
                    {
                      label: "Address",
                      value: `${order.address}, ${order.city}`,
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-start justify-between px-6 py-3 ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="font-medium text-sm text-gray-600">
                        {row.label}
                      </span>
                      <span className="text-gray-800 text-sm text-pretty font-semibold text-right break-words max-w-[60%]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Information
                </h3>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md divide-y">
                  {[
                    { label: "Order Code", value: `#${order.order_id}` },
                    { label: "Date", value: order.created_at },
                    {
                      label: "Total",
                      value: (
                        <span className="text-green-600 font-semibold">
                          {numberWithCommas(order.total_price)}₫
                        </span>
                      ),
                    },
                    { label: "Payment Method", value: order.payment_method },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-start justify-between px-6 py-3 ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="font-medium text-sm text-gray-600">
                        {row.label}
                      </span>
                      <span className="text-gray-800 text-sm font-semibold text-right break-words max-w-[60%]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Products
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {order.items?.map((item) => (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    key={item.order_item_id}
                    onClick={() => navigate(`/product/${item.product_id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        {item.label && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {item.color && (
                          <span
                            className="inline-block w-3 h-3 rounded-full border flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                        <span className="font-inter font-medium text-darkRed whitespace-nowrap">
                          {numberWithCommas(item.price)}₫
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <span className="text-sm font-medium text-gray-800 flex-shrink-0">
                      x{item.quantity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
