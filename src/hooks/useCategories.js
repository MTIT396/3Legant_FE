import { useEffect, useMemo, useState } from "react";
import { axiosClient } from "../utils/axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([{ id: 0, name: "All" }]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("api/products/categories");
        setCategories([{ id: 0, name: "All" }, ...res.data.data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const selectedCategoriesNames = useMemo(() => {
    const filterCat = categories.filter((cat) =>
      selectedCategories.includes(cat.id)
    );
    return filterCat.map((item) => item.name);
  }, [categories, selectedCategories]);

  return {
    categories,
    selectedCategories,
    setSelectedCategories,
    selectedCategoriesNames,
  };
};
