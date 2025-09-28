import React from "react";
import { IoMdArrowForward } from "react-icons/io";

const ShopNow = ({ title, onNavigate }) => {
  return (
    <div
      onClick={onNavigate}
      className="cursor-pointer text-neutral_1 w-fit items-center flex border-b border-neutral_1"
    >
      <p className="font-medium text-xs md:text-sm mr-1 text-nowrap leading-6">
        {title}
      </p>
      <IoMdArrowForward size={20} />
    </div>
  );
};

export default ShopNow;
