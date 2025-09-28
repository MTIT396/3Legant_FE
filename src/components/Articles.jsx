import React from "react";
import ShopNow from "./ui/ShopNow";
import ArticlesEle from "./ui/ArticlesEle";
import { articlesData } from "../data";
const Articles = () => {
  return (
    <div className="lg:px-[160px] container mx-auto py-10">
      <div className="flex justify-between mb-10">
        <h1 className="text-[34px] font-medium leading-9 ">Articles</h1>
        <ShopNow title="More Articles" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-6 gap-y-6">
        {articlesData.map((item, index) => (
          <ArticlesEle key={index} img={item.img} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
