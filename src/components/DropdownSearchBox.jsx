import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchItem from "./ui/SearchItem";

const DropdownSearchBox = ({
  products,
  debounceSearchValue,
  setSearchValue,
  onCloseSearchBox,
}) => {
  const [countShowMore, setCountShowMore] = useState(4);
  const showMoreValue = 4;

  // Không mutate mảng gốc
  const visibleProducts = useMemo(
    () => products.slice(0, countShowMore),
    [products, countShowMore]
  );

  const handleShowProducts = useCallback(() => {
    setCountShowMore((prev) => prev + showMoreValue);
  }, [showMoreValue]);

  const hasMoreProducts = countShowMore < products.length;

  return (
    <ul className="flex flex-col gap-2 px-4 py-2">
      <AnimatePresence>
        {visibleProducts.map((product) => (
          <motion.li
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SearchItem
              setSearchValue={setSearchValue}
              onCloseSearchBox={onCloseSearchBox}
              product={product}
              debounceSearchValue={debounceSearchValue}
            />
          </motion.li>
        ))}
      </AnimatePresence>

      {hasMoreProducts && (
        <div className="flex justify-center items-center">
          <button
            onClick={handleShowProducts}
            className="text-blue hover:underline text-[15px] font-medium"
          >
            Xem thêm
          </button>
        </div>
      )}
    </ul>
  );
};

export default React.memo(DropdownSearchBox);
