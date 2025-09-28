import React from "react";

const DropdownFilterPrices = React.memo(
  ({ price, onSelected, globalId, onSetId }) => {
    const { name, id } = price;
    const htmlId = `price-${id}`;
    const isChecked = globalId === id;
    const handleToggle = () => {
      if (isChecked) {
        onSetId(null);
        onSelected([]);
      } else {
        onSetId(id);
        onSelected([price]);
      }
    };

    return (
      <div
        onClick={handleToggle}
        className="rounded-lg hover:font-semibold hover:bg-cardColor py-2 transition cursor-pointer flex justify-between"
      >
        <h1 className="text-base leading-[26px] text-neutral_1 ml-2 mr-6">
          {name}
        </h1>

        <div className="price-checkbox">
          <input
            id={htmlId}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            onClick={(e) => e.stopPropagation()}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <label
            htmlFor={htmlId}
            onClick={(e) => e.stopPropagation()}
            className="relative pl-8 w-full block cursor-pointer mb-3 select-none"
          />
        </div>
      </div>
    );
  }
);

export default DropdownFilterPrices;
