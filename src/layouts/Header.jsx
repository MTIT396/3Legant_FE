import React, { useContext, useEffect, useState } from "react";
// Icons
import { FaBars } from "react-icons/fa6";
import { BsCart } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { navLink } from "../constants/navLink";
// import noCart from "../imgs/Cart.png";
// Link

// Contexts
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ProductContext } from "../contexts/ProductContext";
import CartFlyout from "../components/CartFlyout";
import { CartContext } from "../contexts/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import SearchBox from "../components/SearchBox";
import { IoClose } from "react-icons/io5";
import { useOpenStore } from "../store/useOpenStore";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { products } = useContext(ProductContext);
  // Cart Context
  const { isOpenCart, handleOpenCart, handleCloseCart, cart, fetchCart } =
    useContext(CartContext);

  // Scroll

  // const [isScroll, setIsScroll] = useState(false);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     window.scrollY > 40 ? setIsScroll(true) : setIsScroll(false);
  //   });
  // }, []);

  // Open States
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);
  const isOpenSidebar = useOpenStore((state) => state.isOpenSidebar);
  const setIsOpenSidebar = useOpenStore((state) => state.setIsOpenSidebar);
  // Location Path
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const goToAccount = () => {
    navigate("/account");
  };
  // Fetch Cart
  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Get User
  const { user } = useUser();
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const handleOpenSearchBox = () => {
    setIsOpenSearchBox(true);
  };
  const handleCloseSearchBox = () => {
    setIsOpenSearchBox(false);
  };
  return (
    <>
      <header
        className="w-full py-[18px] left-0 right-0 fixed transition-all duration-300 ease-in-out z-[8] shadow-md bg-white"
        style={{ top: isOpenSaleOff ? "40px" : "0px" }}
      >
        <div className="container mx-auto lg:px-[160px]">
          <div className="flex justify-between items-center">
            {/* Left */}
            <div className="flex gap-1 items-center">
              <span className="block md:hidden cursor-pointer">
                <FaBars
                  onClick={() => setIsOpenSidebar(true)}
                  className=" text-neutral_1 hover:text-black transition"
                  size={28}
                />
              </span>
              <Link to={"/"}>
                <div className="flex items-center justify-center mt-1">
                  <img
                    src="/Logo3Legant.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>
            {/* Navbar & SearchBox */}
            <div className="relative flex-1 flex justify-center">
              {/* Nav */}
              <motion.div
                key="nav"
                initial={false}
                animate={{ opacity: isOpenSearchBox ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className=" items-center gap-x-10 hidden md:flex">
                  {navLink.map((item, index) => (
                    <li key={index} className="group transition">
                      <Link
                        to={item.link}
                        className={`transition text-sm font-medium ${
                          item.link === currentPath
                            ? "text-neutral_1"
                            : "text-secondary group-hover:text-neutral_1"
                        }`}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* SearchBox */}
              <AnimatePresence>
                {isOpenSearchBox && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <SearchBox setIsOpenSearchBox={setIsOpenSearchBox} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Search Icon */}
              {isOpenSearchBox ? (
                <button
                  onClick={handleCloseSearchBox}
                  className="lg:block hidden cursor-pointer"
                >
                  <IoClose size={28} />
                </button>
              ) : (
                <button
                  onClick={handleOpenSearchBox}
                  className="lg:block hidden cursor-pointer"
                >
                  <FiSearch size={24} />
                </button>
              )}
              {/* Account Icon */}
              {user ? (
                <button
                  onClick={goToAccount}
                  className="mx-2 h-[34px] w-[34px] rounded-full overflow-hidden border border-gray-200 hover:ring-2 hover:ring-secondary transition"
                >
                  <img
                    src={
                      user?.avatar
                        ? user.avatar
                        : "http://getdrawings.com/free-icon-bw/free-avatars-icons-25.png"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ) : (
                <div className="relative group px-2">
                  {/* Icon account */}
                  <button className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition">
                    <FaUserCircle size={24} />
                  </button>

                  {/* Dropdown chỉ hiện khi hover vào icon */}
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 
             overflow-hidden z-20 opacity-0 invisible 
             group-hover:opacity-100 group-hover:visible 
             group-hover:translate-y-0 group-hover:scale-100
             transition-all duration-300 ease-out 
             transform translate-y-2 scale-95"
                  >
                    <div className="flex flex-col font-third font-medium">
                      <Link
                        to="/login"
                        className="px-5 py-3 text-sm font-medium text-gray-700 
                 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 
                 hover:text-neutral_1 transition-colors duration-200"
                      >
                        Đăng nhập
                      </Link>

                      <div className="h-px bg-gray-100"></div>

                      <Link
                        to="/register"
                        className="px-5 py-3 text-sm font-medium text-gray-700 
                 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 
                 hover:text-neutral_1 transition-colors duration-200"
                      >
                        Đăng ký
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Icon*/}
              <button onClick={handleOpenCart} className="cursor-pointer">
                <BsCart size={24} />
              </button>
              <div className="rounded-full bg-[#141718] w-5 h-5 flex items-center justify-center">
                <span className="text-white text-[12px] font-semibold">
                  {cart.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Sidebar */}
        <AnimatePresence>
          {isOpenSidebar && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpenSidebar(false)}
              />
              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "tween", duration: 0.25 }}
                className="max-w-[380px] lg:max-w-[413px] p-6 z-[12] bg-white fixed top-0 left-0 bottom-0 flex flex-col w-full h-full drop-shadow-lg "
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Cart Flyout */}
        <AnimatePresence>
          {isOpenCart && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseCart}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="max-w-[380px] lg:max-w-[413px] p-6 z-20 bg-white fixed top-0 right-0 bottom-0 w-full h-full drop-shadow-lg "
              >
                <CartFlyout products={products} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
