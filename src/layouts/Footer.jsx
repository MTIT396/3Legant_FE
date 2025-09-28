import React from "react";
import { navLink } from "../constants/navLink";
import { FiFacebook, FiGithub, FiInstagram } from "react-icons/fi";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-neutral_1 py-12 lg:pt-20 lg:pb-8">
      <div className="container mx-auto lg:px-[160px] text-sm text-white flex flex-col justify-center items-center">
        {/* Main Footer */}
        <div className="flex flex-col mb-10 text-center lg:flex-row lg:justify-between w-full">
          <div className="flex flex-col items-center lg:flex-row lg:gap-x-8">
            <h1 className="text-white font-medium text-2xl leading-6">
              3Legant
              <span className="text-secondary">.</span>
            </h1>
            <div className="border-b-[1.4px] border-secondary w-6 flex mt-4 lg:rotate-90 lg:m-0"></div>
            <p className="mt-4 mb-10 lg:m-0">Technologies & Decoration Store</p>
          </div>
          <div className="flex flex-col gap-y-8 lg:flex-row gap-x-10">
            {navLink.map((item) => {
              return (
                <Link
                  key={v4()}
                  to={item.link}
                  className={`cursor-pointer hover:opacity-50 transtion-all duration-300 ease-out`}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Sub Footer  */}
        <div className="gap-8 lg:p-0 lg:w-full lg:mt-4 lg:flex-row-reverse lg:justify-between py-6 flex flex-col items-center justify-center border-t border-secondary">
          <div className="flex gap-x-6">
            <span className="cursor-pointer hover:opacity-50 transtion-all duration-300 ease-out">
              <FiInstagram size={24} />
            </span>
            <span className="cursor-pointer hover:opacity-50 transtion-all duration-300 ease-out">
              <FiFacebook size={24} />
            </span>
            <span className="cursor-pointer hover:opacity-50 transtion-all duration-300 ease-out">
              <FiGithub size={24} />
            </span>
          </div>
          <div className="flex flex-col items-center lg:py-5 lg:flex-row-reverse gap-8">
            <div className="flex font-semibold text-xs">
              <p className="mr-7">Privacy Policy</p>
              <p>Terms of Use</p>
            </div>
            <p className="text-xs lg:mr-7">
              Copyright © 2025 3legant. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
