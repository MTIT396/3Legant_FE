import React, { useState } from "react";
import { v4 } from "uuid";
import { IoIosArrowDown } from "react-icons/io";
import { accountLink } from "../../../constants/accountLink";
import { useNavigate, useLocation } from "react-router-dom";

const MobileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="block md:hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full bg-white justify-between items-center px-4 py-[14px] border-2 border-secondary rounded-lg cursor-pointer mt-10 relative"
      >
        <p className="text-neutral_1 font-semibold">
          {accountLink.find((item) => item.link === pathname)?.title}
        </p>
        <span className="text-secondary">
          <IoIosArrowDown size={18} />
        </span>
        <div
          className={`${
            isOpen ? "max-h-[318px]" : "max-h-0 overflow-hidden border-none"
          } absolute top-[116%] left-0 bg-white w-full rounded-lg border border-grey drop-shadow-lg transition-all duration-300 ease-out flex flex-col`}
        >
          {accountLink.map((link) => (
            <button
              key={v4()}
              onClick={() => navigate(link.link)}
              className="text-neutral_1 font-semibold text-left py-[14px] px-4 hover:bg-neutral_2 transition"
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDropdown;
