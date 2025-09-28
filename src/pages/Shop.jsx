import React from "react";
import Hero from "../components/shop/Hero";
import Newsletter from "../components/Newsletter";
import Footer from "../layouts/Footer";
import Products from "../components/shop/Products";
import SaleOff from "../components/SaleOff";
import Header from "../layouts/Header";

const Shop = () => {
  return (
    <>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <Hero />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Shop;
