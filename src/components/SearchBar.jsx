import { CiSearch } from "react-icons/ci";

// Sub-components
const SearchBar = ({ searchValue, setSearchValue }) => (
  <div className="flex flex-col gap-2">
    <h1 className="font-semibold text-base text-secondary uppercase">Search</h1>
    <div className="border-2 rounded-lg border-secondary overflow-hidden py-3 px-4 mb-6 flex xl:max-w-[604px]">
      <span className="mr-1">
        <CiSearch size={24} />
      </span>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="outline-none w-full placeholder:text-secondary"
        placeholder="Search for products"
      />
    </div>
  </div>
);
export default SearchBar;
