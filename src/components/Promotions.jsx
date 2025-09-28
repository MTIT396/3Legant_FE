import React from "react";
import { BsCheck2Circle, BsGift } from "react-icons/bs";
import { PAYMENTS_OFFER } from "../data";

const Promotions = () => {
  return (
    <div className="mt-6">
      <div className="rounded-xl shadow-sm px-6 py-4 border border-[#73A6FA] bg-gradient-to-tr from-transparent to-[#F2F7FF]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <BsGift className="w-5 h-5 text-darkRed" />
          <h2 className="text-base font-semibold text-gray-800">
            Ưu đãi thanh toán
          </h2>
        </div>

        {/* Content */}
        <ul className="space-y-3 ">
          {PAYMENTS_OFFER.map((offer) => (
            <li key={offer.id} className="flex items-center gap-4">
              <BsCheck2Circle className="size-5 text-green" />
              {offer.logo && (
                <div className="max-w-[60px] w-full h-[16px]">
                  <img
                    src={offer.logo}
                    alt="logo"
                    className="w-full h-full object-contain "
                  />
                </div>
              )}
              <p className="text-sm text-gray-700 font-inter">{offer.text}</p>
            </li>
          ))}
        </ul>

        {/* Extra note */}
        <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
          <BsCheck2Circle className="size-5 text-green flex-shrink-0 mt-0.5" />
          <span>
            Liên hệ 3Legant. để được tư vấn giá tốt nhất cho khách hàng doanh
            nghiệp khi mua số lượng nhiều.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
