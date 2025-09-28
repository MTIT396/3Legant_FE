/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegHeart } from "react-icons/fa";
import Button from "./ui/Button/Button";
import {
  SlSocialFacebook,
  SlSocialGithub,
  SlSocialInstagram,
} from "react-icons/sl";
import { BsCart } from "react-icons/bs";
import LineBar from "./ui/LineBar";
import { v4 } from "uuid";
import { navLink } from "../constants/navLink";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useOpenStore } from "../store/useOpenStore";
import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { axiosClient } from "../utils/axios";
import { showToast } from "../utils/toast";
import { ProductContext } from "../contexts/ProductContext";

const Sidebar = () => {
  const setIsOpenSidebar = useOpenStore((state) => state.setIsOpenSidebar);
  const { cart, setCart, setTotalPrice } = useContext(CartContext);
  const { wishlist, fetchWishlist } = useContext(ProductContext);
  useEffect(() => {
    fetchWishlist();
  }, [wishlist.length]); // sync wishlist

  const handleCloseSidebar = () => setIsOpenSidebar(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      if (window.confirm("Are you sure ?")) {
        const res = await axiosClient.post("/api/auth/logout", {});
        if (res.data.success) {
          navigate("/login");
          showToast("Đăng xuất thành công !", "success");
          setCart([]);
          setTotalPrice(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Top Sidebar */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">
          3Legant<span className="text-secondary font-semibold">.</span>
        </h1>
        <div className="p-1 cursor-pointer group transition">
          <IoClose
            onClick={handleCloseSidebar}
            size={24}
            className="text-secondary text-base group-hover:text-black transition"
          />
        </div>
      </div>
      {/* Search Bar */}
      <div className="my-4 w-full h-10 px-4 py-6 rounded-md border-secondary border bg-white flex relative overflow-hidden">
        <FiSearch
          size={24}
          className="absolute top-1/2 -translate-y-1/2 left-4"
        />
        <input
          style={{ width: "calc(100% - 48px)" }}
          type="text"
          className="ml-8 h-full w-[calc(100% - 1rem)] top-0 absolute outline-none placeholder:text-secondary placeholder:text-base"
          placeholder="Search"
        />
      </div>

      {/* List Search */}
      <div className="flex flex-col w-full h-full flex-1">
        <ul className="flex flex-col gap-4">
          {navLink.map((item) => (
            <Link to={item.link} onClick={handleCloseSidebar} key={v4()}>
              <LineBar title={item.text} down={item.down} />
            </Link>
          ))}
        </ul>
        {/* Line bar bottom */}
        <div className="flex flex-col justify-end h-full">
          <ul className="flex flex-col gap-2 mb-5">
            <li
              onClick={() => navigate("/cart")}
              className="border-b-[#ddd] pb-4 border-b flex items-center justify-between"
            >
              <p className="text-base font-medium cursor-pointer text-secondary">
                Cart
              </p>
              <div className="flex items-center gap-2">
                <BsCart
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer"
                  size={24}
                />
                <div className="rounded-full bg-[#141718] w-5 h-5 flex items-center justify-center">
                  <span className="text-white text-[12px] font-semibold">
                    {cart.length}
                  </span>
                </div>
              </div>
            </li>
            <li
              onClick={() => navigate("/account/wishlist")}
              className="border-b-[#ddd] pb-4 border-b flex items-center justify-between"
            >
              <p className="text-base font-medium cursor-pointer text-secondary">
                Wishlist
              </p>
              <div className="flex items-center gap-2">
                <FaRegHeart
                  onClick={() => navigate("/account/wishlist")}
                  className="cursor-pointer"
                  size={24}
                />
                <div className="rounded-full bg-[#141718] w-5 h-5 flex items-center justify-center">
                  <span className="text-white text-[12px] font-semibold">
                    {wishlist.length}
                  </span>
                </div>
              </div>
            </li>
            {user ? (
              <Link to="/login">
                <Button onClick={handleLogOut} className="mt-4 w-full">
                  Log out
                </Button>
              </Link>
            ) : (
              <Button onClick={handleLogOut} className="mt-4">
                Sign In
              </Button>
            )}
          </ul>
          <ul className="flex gap-x-6 items-center mt-2">
            <li className="cursor-pointer">
              <SlSocialInstagram size={24} />
            </li>
            <li className="cursor-pointer">
              <SlSocialFacebook size={24} />
            </li>
            <li className="cursor-pointer">
              <SlSocialGithub size={24} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
