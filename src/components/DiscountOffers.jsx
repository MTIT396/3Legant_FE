import React from "react";
import { BsCheck2Circle, BsGift } from "react-icons/bs";
import { DISCOUNT_OFFERS } from "../data";

const DiscountOffers = () => {
  return (
    <div className="mt-6">
      <div className="rounded-xl shadow-sm px-6 py-4 border border-[#73A6FA] bg-gradient-to-tr from-transparent to-[#F2F7FF]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <BsGift className="w-5 h-5 text-darkRed" />
          <h2 className="text-base font-semibold text-gray-800">
            Khuyến mãi hấp dẫn
          </h2>
        </div>

        {/* Content */}
        <ul className="space-y-3 ">
          {DISCOUNT_OFFERS.map((offer) => (
            <li key={offer.id} className="flex items-center gap-4">
              <BsCheck2Circle className="size-5 text-blue shrink-0" />
              <p className="text-sm text-gray-700 font-inter">{offer.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscountOffers;
