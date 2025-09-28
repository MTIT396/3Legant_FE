import React from "react";
import { v4 } from "uuid";
import { accountLink } from "../../../constants/accountLink";
import { useLocation, useNavigate } from "react-router-dom";

const AccountLinks = ({ onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-3 mt-10">
      {accountLink.map((item) => (
        <button
          key={v4()}
          onClick={() => navigate(item.link)}
          className="text-left"
        >
          <p
            className={`${
              item.link === pathname
                ? "border-b border-neutral_1 text-neutral_1"
                : "text-secondary"
            } font-semibold leading-[26px] py-2 hover:text-neutral_1 transition-all`}
          >
            {item.title}
          </p>
        </button>
      ))}
      <button
        onClick={onLogout}
        className="font-semibold text-left leading-[26px] text-secondary py-2 hover:text-neutral_1 transition"
      >
        Log out
      </button>
    </div>
  );
};

export default AccountLinks;
