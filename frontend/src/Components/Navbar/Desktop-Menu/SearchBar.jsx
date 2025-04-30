import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchVisible, search, setSearch, handleSearch, setSearchVisible }) => {

  return (
    searchVisible && (
      <devicePixelRatio
        className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[70%] bg-background-light dark:bg-background-dark shadow-md p-2 rounded-lg"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e);
            }}
            className="w-full p-2 pl-3 pr-12 border border-border-dark dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark placeholder:text-gray-500 dark:placeholder:text-gray-300"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
            onClick={handleSearch}
          >
            <FaSearch size={20} />
          </button>
        </div>
      </devicePixelRatio>
    )
  );
};

export default SearchBar;
