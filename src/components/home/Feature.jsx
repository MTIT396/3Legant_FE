import React from "react";
import ShopNow from "../ui/ShopNow";
import { useNavigate } from "react-router-dom";

const Feature = (prop) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between h-[180px] gap-8 sm:px-6 sm:py-10 p-4 shadow-md rounded-xl bg-gradient-to-br from-transparent to-[#F2F7FF] border-[#73A6FA] border">
      <div className="mt-auto">
        <h1 className="sm:text-[28px] text-[24px] font-medium text-neutral_1">
          {prop.title}
        </h1>
        <ShopNow
          onNavigate={() => {
            navigate(`/product?categories=${prop.id}`);
          }}
          title="Shop Now"
        />
      </div>
      <div className="max-h-[140px] max-w-[280px] w-full flex items-center mx-auto">
        <img
          src={prop.img}
          alt={prop.title}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export default Feature;
