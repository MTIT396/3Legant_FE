import React, { useContext, useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { ProductContext } from "../contexts/ProductContext";
import { useDebounce } from "../hooks/useDebounce";
import DropdownSearchBox from "./DropdownSearchBox";
import { useNavigate } from "react-router-dom";
import SearchItem from "./ui/SearchItem";

const SearchBox = ({ setIsOpenSearchBox }) => {
  const { products } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dropProducts, setDropProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceSearchValue = useDebounce(searchValue, 500);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // Lấy danh sách sản phẩm phổ biến (có thể thay bằng API)
  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!debounceSearchValue.trim()) {
          setDropProducts([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));

        const tempProducts = products.filter((item) =>
          item.name
            .toLowerCase()
            .includes(debounceSearchValue.trim().toLowerCase())
        );
        setDropProducts(tempProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debounceSearchValue, products]);

  // Click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle KeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/product?s=${searchValue}`);
      setIsOpenSearchBox(false);
      inputRef.current.blur();
    }
  };
  return (
    <div className="flex justify-center items-center drop-shadow-sm">
      <div className="relative" ref={dropdownRef}>
        <div className="w-[660px] h-[48px] rounded-full overflow-hidden border flex items-center bg-white group">
          <input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            className="w-full h-full outline-none px-8 placeholder:text-darkGrey placeholder:text-[15px]"
            placeholder="Search for laptop, mobile phone, watch, ..."
          />
          <button
            onClick={() => {
              navigate(`/product?s=${searchValue}`);
              setIsOpenSearchBox(false);
            }}
            className="bg-[#FEE2E2] rounded-full text-[#DC2626] p-2 mr-2 transition-all ease-out duration-300 group-focus-within:bg-[#DC2626] group-focus-within:text-white hover:bg-[#DC2626] hover:text-white"
          >
            <IoSearch size={24} />
          </button>
        </div>

        {showDropdown && (
          <div className="w-full max-h-[375px] overflow-auto bg-white absolute top-[110%] left-0 rounded-lg drop-shadow-lg z-10">
            {isLoading ? (
              <div className="size-6 mx-auto my-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
            ) : debounceSearchValue ? (
              !!dropProducts.length ? (
                <ul>
                  <DropdownSearchBox
                    products={dropProducts}
                    debounceSearchValue={debounceSearchValue}
                    setSearchValue={setSearchValue}
                    onCloseSearchBox={setIsOpenSearchBox}
                  />
                </ul>
              ) : (
                <div className="flex items-center px-8 py-4">
                  <IoSearch size={20} color="#DC2626" />
                  <div className="ml-2">
                    Không tìm thấy kết quả với từ khóa{" "}
                    <span className="font-semibold">
                      "{debounceSearchValue}"
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="p-4">
                <h3 className="font-semibold font-inter text-gray-700 mb-2">
                  Sản phẩm phổ biến
                </h3>
                <ul>
                  {popularProducts.map((product, index) => (
                    <SearchItem
                      setSearchValue={setSearchValue}
                      onCloseSearchBox={setIsOpenSearchBox}
                      product={product}
                      debounceSearchValue={debounceSearchValue}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
