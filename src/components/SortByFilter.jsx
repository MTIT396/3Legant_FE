import { IoIosArrowDown } from "react-icons/io";
import DropdownFilterSort from "./DropdownFilterSort";
import { SORT_FILTERS } from "../constants/filter";

const SortByFilter = ({
  isOpen,
  onToggle,
  onSelectedChange,
  globalId,
  onSetId,
}) => (
  <div className="z-[3] w-full mt-auto">
    <div onClick={onToggle} className="flex cursor-pointer justify-end mt-4">
      <h1 className="text-base text-third font-semibold leading-[26px]">
        Sort by
      </h1>
      <button
        className={`${
          isOpen ? "rotate-180" : ""
        } transition cursor-pointer ml-2`}
      >
        <IoIosArrowDown size={18} />
      </button>
    </div>
    <div className="relative max-w-[280px] ml-auto">
      <div
        className={`${
          isOpen
            ? "md:block max-h-[318px]"
            : "md:hidden max-h-0 overflow-hidden border-none"
        } md:absolute md:top-[100%] right-0 translate-y-2 w-full rounded-xl bg-white shadow-xl border-[1.5px] border-cardColor transition-all duration-300 ease-out`}
      >
        <div className="flex flex-col p-2 gap-[10px] ">
          {/* sort by options go here */}
          {SORT_FILTERS.map((sortby) => (
            <DropdownFilterSort
              key={sortby.id}
              sortby={sortby}
              globalId={globalId}
              onSetId={onSetId}
              onSelected={onSelectedChange}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SortByFilter;
