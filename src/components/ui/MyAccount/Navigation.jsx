import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../utils/axios";
import { showToast } from "../../../utils/toast";
import { CartContext } from "../../../contexts/CartContext";
import AvatarUploader from "./AvatarUploader";
import AccountLinks from "./AccountLinks";
import MobileDropdown from "./MobileDropdown";

const Navigation = () => {
  const { setCart, setTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      if (window.confirm("Are you sure ?")) {
        const res = await axiosClient.post("/api/auth/logout", {});
        if (res.data.success) {
          navigate("/login");
          showToast("Đăng xuất thành công!", "success");
          setCart([]);
          setTotalPrice(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col px-4 py-8 bg-neutral_2 rounded-lg w-full md:min-w-[260px] md:w-[260px] h-fit md:h-full flex-shrink-0">
      {/* Avatar & Username */}
      <AvatarUploader />

      {/* Large Screen */}
      <div className="hidden md:block">
        <AccountLinks onLogout={handleLogOut} />
      </div>

      {/* Small Screen */}
      <MobileDropdown />
    </div>
  );
};

export default Navigation;
