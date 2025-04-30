import { useState } from "react";
import MenuItems from "./MenuItems";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const DesktopMenu = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { user, currUser } = useAuth();

  // console.log(currUser.isPDA)

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };

  // Define all menu items
  const allMenuItems = [
    { name: "Community", link: "/community" },
    { name: "News", link: "/all-news" },

    {
      name: "Items",
      link: "/all-items",
    },
    { name: "MyCart", link: "items/my-cart" },
    { name: "Help", link: "/mediator-help" },

  ];

  // Filter menu items based on user role
  const menuItems = user === "mediator" 
    ? allMenuItems.filter((item) =>
        ["Community", "News", "Events", "Help"].includes(item.name)
      )
    : allMenuItems.filter((item) => item.name !== "Help");

  return (
    <nav className="hidden md:flex space-x-10">
      <MenuItems items={menuItems} />
      <div className="flex items-center space-x-5 relative">
        <button
          onClick={toggleSearchBar}
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
        >
          <FaSearch className="cursor-pointer" size={20} />
        </button>

        {/* User Menu */}
        <UserMenu
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        searchVisible={searchVisible}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </nav>
  );
};

export default DesktopMenu;
