import React from "react";
import { BsEnvelope } from "react-icons/bs";
import newsletter from "../imgs/Newsletter.png";
const Newsletter = () => {
  return (
    <div className="relative bg-neutral_2">
      {/* Img */}
      <div className="lg:absolute lg:inset-0 z-[1] lg:block hidden w-full h-full ">
        <img src={newsletter} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="lg:bg-transparent relative z-[2]  container mx-auto py-[95px] flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-[28px] font-medium leading-[34px] text-primary mb-2">
            Join Our Newsletter
          </h1>
          <p className="text-sm">
            Sign up for deals, new products and promotions
          </p>
        </div>
        <div className="lg:max-w-[488px] w-full border-b border-secondary py-3">
          <div className="flex items-center">
            <div className="flex items-center gap-x-2 w-full">
              <span>
                <BsEnvelope size={24} />
              </span>
              <input
                type="text"
                className="bg-neutral_2 outline-none placeholder:text-secondary w-full"
                placeholder="Email address"
              />
            </div>
            <h1 className="justify-end text-secondary hover:text-neutral_1 transition cursor-pointer">
              Signup
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
