import { IoIosArrowDown } from "react-icons/io";
import DropdownFilterPrices from "./DropdownFilterPrices";
import { PRICE_FILTERS } from "../constants/filter";

const PriceFilter = ({
  selectedPrice,
  isOpen,
  onToggle,
  onSelectedChange,
  globalId,
  onSetId,
}) => {
  const priceName = selectedPrice[0]?.name || "All Prices";

  return (
    <div className="flex flex-col gap-2 ml-auto xl:max-w-[280px] w-full shrink-0 flex-1">
      <h4 className="font-semibold text-base text-secondary uppercase">
        Price
      </h4>
      <div className="relative">
        <div
          onClick={onToggle}
          className="border-2 border-secondary cursor-pointer rounded-lg"
        >
          <div className="text-third flex justify-between items-center py-3">
            <h5 className="text-base font-semibold leading-[26px] ml-4">
              {priceName}
            </h5>
            <span
              className={`${
                isOpen ? "rotate-180" : ""
              } transition cursor-pointer mr-5`}
            >
              <IoIosArrowDown size={18} />
            </span>
          </div>
        </div>

        <div
          className={`${
            isOpen
              ? "md:block max-h-[318px]"
              : "md:hidden max-h-0 overflow-hidden border-none"
          } md:absolute md:top-[100%] translate-y-2 z-[8] w-full rounded-xl bg-white shadow-xl border-[1.5px] border-cardColor transition-all duration-300 ease-out`}
        >
          <div className="flex flex-col p-2 gap-[10px]">
            {PRICE_FILTERS.map((price) => (
              <DropdownFilterPrices
                key={price.id}
                price={price}
                onSelected={onSelectedChange}
                globalId={globalId}
                onSetId={onSetId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceFilter;
