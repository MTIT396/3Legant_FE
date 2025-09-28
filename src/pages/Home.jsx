import React from "react";
import Products from "../components/home/Products";
import Discovery from "../components/home/Discovery";
import Articles from "../components/Articles";
import Newsletter from "../components/Newsletter";
import Footer from "../layouts/Footer";
import SaleOff from "../components/SaleOff";
import Header from "../layouts/Header";
import Hero from "../components/home/Hero";
import PartnerCarousel from "../components/PartnerCarousel";
const Home = () => {
  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <Hero />
      <PartnerCarousel />
      <Products />
      <Discovery />
      <Articles />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
