import { useCallback, useState } from "react";

export const useDropdownStates = () => {
  const [dropdowns, setDropdowns] = useState({
    category: false,
    price: false,
    sortBy: false,
  });

  const toggleDropdown = useCallback((type) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }, []);
  return { dropdowns, toggleDropdown };
};
