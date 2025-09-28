import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
  ...props
}) => {
  const base =
    "flex items-center justify-center gap-2 py-2 px-[18px] text-nowrap border border-transparent cursor-pointer rounded-md transition duration-300 ease-in-out font-medium text-base ";
  const variants = {
    primary:
      "bg-black text-white hover:text-black hover:bg-white hover:border-primary hover:border",
    secondary: "bg-blue",
  };
  let isAllowed;
  if (props.isAllowed === "abled") {
    isAllowed = false;
  }
  if (props.isAllowed === "disabled") {
    isAllowed = true;
  }
  return (
    <button
      onClick={onClick}
      disabled={isAllowed}
      className={twMerge(
        base,
        className,
        variants[variant],
        isAllowed
          ? "cursor-not-allowed hover:bg-black hover:text-white"
          : "cursor-pointer"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
