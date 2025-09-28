import React from "react";
import ShopNow from "./ShopNow";

const ArticlesEle = (prop) => {
  return (
    <div className="">
      <div className="aspect-square w-full">
        <img src={prop.img} alt="" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-base font-semibold leading-[26px] mt-4 mb-2">
        {prop.title}
      </h1>
      <ShopNow title="Read More" />
    </div>
  );
};

export default ArticlesEle;
