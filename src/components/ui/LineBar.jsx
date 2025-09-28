import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const LineBar = ({ title, down }) => {
  return (
    <li className="border-b-[#ddd] pb-6 border-b-[1.6px] flex items-center justify-between">
      <p className="text-base font-medium cursor-pointer">{title}</p>
      <span className={`${down ? "block" : "hidden"} cursor-pointer`}>
        <IoChevronDownOutline size={24} />
      </span>
    </li>
  );
};

export default LineBar;
