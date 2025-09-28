/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import Footer from "../../layouts/Footer";
import Navigation from "../../components/ui/MyAccount/Navigation";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { ProductContext } from "../../contexts/ProductContext";
import WishlistProduct from "../../components/ui/MyAccount/WishlistProduct";
import { useOpenStore } from "../../store/useOpenStore";

const Wishlist = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  const { wishlist, fetchWishlist } = useContext(ProductContext);

  useEffect(() => {
    fetchWishlist();
  }, [wishlist.length]); // sync wishlist

  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto relative lg:px-[160px] py-16 h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        }`}
      >
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-[32px] md:text-[48px] text-primary font-medium leading-tight text-center">
            My Account
          </h1>

          <div className="w-full flex flex-col md:flex-row gap-y-6 md:gap-x-10">
            <Navigation />
            <div className="md:px-[48px] flex-1">
              <h1 className="text-xl text-primary font-semibold leading-8 mb-6">
                Your Wishlist
              </h1>

              {!!wishlist.length ? (
                <div className="flex flex-col divide-y divide-grey rounded-lg border border-grey/40 bg-white shadow-md">
                  {wishlist.map((product) => (
                    <WishlistProduct
                      key={product.product_id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="italic flex flex-col items-center justify-center py-10 px-4 text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                    alt="Out of stock"
                    className="w-28 h-28 object-contain mb-4 opacity-80"
                  />
                  <h2 className="text-lg font-semibold text-gray-700">
                    Chưa có sản phẩm nào !
                  </h2>
                  <p className="text-sm font-inter text-gray-500 mt-2">
                    Vui lòng quay lại sau hoặc lưu vào yêu thích sản phẩm khác.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
