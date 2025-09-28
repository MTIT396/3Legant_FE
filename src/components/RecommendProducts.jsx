/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import SwiperProduct from "./home/SwiperProduct";
import { randomSlice } from "../utils/util";

const RecommendProducts = ({ suggestName }) => {
  const { products } = useContext(ProductContext);
  const [visibleProducts, setVisibleProducts] = useState([]);
  useEffect(() => {
    const filterProducts = products.filter((item) =>
      item.name.includes(suggestName)
    );
    setVisibleProducts(randomSlice(filterProducts));
  }, [suggestName]);
  return (
    visibleProducts.length > 0 && (
      <div className="">
        <h2 className="text-xl font-third text-third font-semibold">
          Có thể bạn cũng thích
        </h2>
        <div className="flex items-center gap-2 ">
          <SwiperProduct
            products={visibleProducts.slice(0, 10)}
            mode="little"
          />
        </div>
      </div>
    )
  );
};

export default RecommendProducts;
