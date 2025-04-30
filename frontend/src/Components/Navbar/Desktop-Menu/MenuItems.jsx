import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const MenuItems = ({ items }) => {
  return (
    <div className="hidden md:flex space-x-10">
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className="relative group">
          {/* Main Menu Item */}
          <NavLink
            to={item.link}
            className="flex items-center font-bold text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-all"
          >
            {item.name}
            {Array.isArray(item.dropdown) && item.dropdown.length > 0 && (
              <span className="ml-1 flex items-center">
                <AiFillCaretDown className="group-hover:hidden" />
                <AiFillCaretUp className="hidden group-hover:block" />
              </span>
            )}
          </NavLink>

          {/* Dropdown Menu */}
          {Array.isArray(item.dropdown) && item.dropdown.length > 0 && (
            <div className="absolute z-10 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-lg rounded-lg mt-2 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200">
              <ul className="p-2 space-y-2">
                {item.dropdown.map((option, dropdownIndex) => {
                  // Ensure that `option` is an object with valid `name` and `link`
                  if (typeof option === "object" && option.name && option.link) {
                    return (
                      <li key={dropdownIndex}>
                        <NavLink
                          to={option.link}
                          className="block px-4 py-2 hover:text-accent-light dark:hover:text-accent-dark cursor-pointer"
                        >
                          {option.name}
                        </NavLink>
                      </li>
                    );
                  }
                  return null; // If the option is not a valid object, return null
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
