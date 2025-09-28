import { MdExpandMore, MdKeyboardArrowUp } from "react-icons/md";
import DropdownFilterCategory from "./DropdownFilterCategory";
import { IoIosArrowDown } from "react-icons/io";
const DEFAULT_CATEGORIES_COUNT = 5;

const CategoryFilter = ({
  categories,
  selectedCategoriesNames,
  isOpen,
  onToggle,
  onSelectedChange,
  showMore,
  onToggleShowMore,
}) => {
  const count = showMore ? categories.length : DEFAULT_CATEGORIES_COUNT;

  return (
    <div className="flex flex-col gap-2 xl:max-w-[280px] w-1/2 shrink-0 ">
      <h4 className="font-semibold text-base text-secondary uppercase">
        Categories
      </h4>
      <div className="relative">
        <div
          onClick={onToggle}
          className="border-2 border-secondary cursor-pointer rounded-lg"
        >
          <div className="text-third flex justify-between items-center py-3">
            <h5 className="text-base font-semibold leading-[26px] ml-4 max-w-[200px] text-ellipsis text-nowrap overflow-hidden">
              {selectedCategoriesNames.join(",") || "All Categories"}
            </h5>
            <button
              className={`${
                isOpen ? "rotate-180" : ""
              } transition cursor-pointer mr-5`}
            >
              <IoIosArrowDown size={18} />
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen
              ? "md:block max-h-[318px]"
              : "md:hidden max-h-0 overflow-hidden border-none"
          } md:absolute md:top-[100%] translate-y-2 z-[3] w-full rounded-xl bg-white shadow-xl border-[1.5px] border-cardColor transition-all duration-300 ease-out`}
        >
          <div className="flex flex-col p-2 gap-[10px]">
            {categories.slice(0, count).map((cat) => (
              <DropdownFilterCategory
                key={cat.id}
                cat={cat}
                onSelected={onSelectedChange}
              />
            ))}

            {categories.length > DEFAULT_CATEGORIES_COUNT && (
              <div
                className="flex justify-center text-sm gap-2 items-center cursor-pointer transition text-darkGrey hover:text-third ml-2"
                onClick={onToggleShowMore}
              >
                <span>{showMore ? "Collapse" : "More"}</span>
                <span>
                  {showMore ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdExpandMore size={20} />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryFilter;
