import React, { useCallback, useRef } from "react";

const DropdownFilterCategory = React.memo(({ cat, onSelected }) => {
  const checkedRef = useRef(null);
  const { name, id } = cat;
  const htmlId = `cat-${id}`;
  const handleSelectedValue = useCallback(
    (e) => {
      e.target.checked
        ? onSelected((prev) => [...prev, id])
        : onSelected((prev) => prev.filter((item) => item !== id));
    },
    [id, onSelected]
  );
  return (
    <div className="rounded-lg hover:font-semibold hover:bg-cardColor py-2 transition cursor-pointer flex justify-between ">
      <h1
        onClick={() => {
          checkedRef.current.click();
        }}
        className="text-base leading-[26px] text-neutral_1 ml-2 mr-6"
      >
        {name}
      </h1>
      <div className="price-checkbox">
        <input
          ref={checkedRef}
          type="checkbox"
          onChange={handleSelectedValue}
          id={htmlId}
          className="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <label
          htmlFor={htmlId}
          className="relative pl-8 w-full block cursor-pointer mb-3 select-none"
        ></label>
      </div>
    </div>
  );
});

export default DropdownFilterCategory;
