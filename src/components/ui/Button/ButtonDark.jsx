import React from "react";

const ButtonDark = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="hover:text-neutral_1 hover:bg-white hover:border-neutral_1 rounded-full transition-all duration-300 ease-in-out font-medium text-base leading-7 px-10 py-[6px] border bg-primary text-white"
    >
      <span>{children}</span>
    </button>
  );
};

export default ButtonDark;
