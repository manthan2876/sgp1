import { FaSearch, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import SearchBar from "../Desktop-Menu/SearchBar";
import UserMenu from "../Desktop-Menu/UserMenu";
import MenuItems from "../Desktop-Menu/MenuItems";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ menuOpen, toggleMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth(); 
  const navigate = useNavigate(); 

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleUserMenuClick = () => {
    if (user) {
      navigate("/user-profile");
    } else {
      toggleModal();
    }
  };

  const menuItems = [
    {
      name: "Learn",
      link: "/",
      dropdown: ["Tutorials", "Documentation", "FAQs"],
    },
    { name: "Community", link: "/" },
    { name: "News", link: "/" },
    { name: "Events", link: "/" },
    {
      name: "Items",
      link: "/",
      dropdown: ["Products", "Categories", "Deals"],
    },
  ];

  return (
    <div className="md:hidden flex items-center space-x-4">
      <button
        onClick={toggleSearchBar}
        className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
      >
        <FaSearch size={20} />
      </button>

      <div
        onClick={handleUserMenuClick}
        className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
      >
        <UserMenu modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </div>

      <div
        className="text-text-light dark:text-text-dark focus:outline-none hover:text-accent-light dark:hover:text-accent-dark"
        onClick={toggleMenu}
      >
        {menuOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}
      </div>

      <SearchBar searchVisible={searchVisible} setSearchVisible={setSearchVisible} />

      {menuOpen && <MenuItems items={menuItems} />}
    </div>
  );
};

export default MobileMenu;
