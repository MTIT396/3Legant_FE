import React from "react";

const OptionsProduct = (prop) => {
  return (
    <div className="py-8 px-4 bg-neutral_2">
      <div className="mb-[22px] text-secondary">{prop.icon}</div>
      <h1 className="font-semibold text-sm text-neutral_1 leading-[22px] ">
        {prop.title}
      </h1>
      <p className="text-secondary text-xs max-w-[120px] leading-[22px] ">
        {prop.desc}
      </p>
    </div>
  );
};

export default OptionsProduct;
