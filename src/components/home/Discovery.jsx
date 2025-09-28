import React from "react";
import hero_2 from "../../imgs/hero/hero_2.png";
import ShopNow from "../ui/ShopNow";
const Discovery = () => {
  return (
    <div className="flex items-stretch flex-col md:flex-row md:h-[532px]">
      <div className="aspect-square md:aspect-auto md:max-w-[50%] md:max-h-[532px] max-h-[367px] h-full w-full">
        <img src={hero_2} alt="" className="w-full h-full object-cover" />
      </div>
      <div className=" py-[60px] md:py-0 bg-neutral_2 w-full h-full">
        <div className="px-8 h-full md:p-0 md:ml-[72px] md:flex md:items-center ">
          <div className="md:max-w-[452px]">
            <h2 className="text-blue text-base font-bold leading-4 mb-4">
              SALE UP TO 35% OFF
            </h2>
            <h1 className="text-neutral_1 leading-[38px] font-medium text-[34px]">
              HUNDREDS of New lower prices!
            </h1>
            <p className="leading-[26px] mt-4 mb-6">
              It’s more affordable than ever to give every room in your home a
              stylish makeover
            </p>
            <ShopNow title="Shop Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discovery;
