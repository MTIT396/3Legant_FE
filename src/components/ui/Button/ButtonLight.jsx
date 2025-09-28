import React from "react";
import { twMerge } from "tailwind-merge";

const ButtonLight = ({ children, onClick, className, isLoading }) => {
  const base =
    "group flex items-center justify-center gap-2 hover:text-white hover:bg-neutral_1 rounded-full transition-all duration-300 ease-in-out font-medium text-base leading-7 px-10 py-[6px] bg-transparent border border-neutral_1 text-neutral_1";
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={twMerge(base, className)}
    >
      {children}
    </button>
  );
};

export default ButtonLight;
