import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import NavbarLogo from "./NavbarLogo";
import MobileMenu from "./Mobile-Menu/MobileMenu";
import DesktopMenu from "./Desktop-Menu/DesktopMenu";
import MobileDropdownMenu from "./Mobile-Menu/MobileDropdownMenu";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { currUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {}, [currUser]);

  const isAuthPage = ["/auth/login", "/user/signup"].includes(
    location.pathname
  );

  return (
    <div className="bg-background-light dark:bg-background-dark relative z-10">
      {!isAuthPage && <TopBar />}
      <div
        className={`shadow-md dark:shadow-shadow-dark ${
          isAuthPage ? "py-8" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between md:px-28 py-3">
          {isAuthPage ? (
            <div className="flex justify-center h-0 w-full">
              <NavbarLogo />
            </div>
          ) : (
            <>
              <NavbarLogo />
              <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
              <DesktopMenu />
            </>
          )}
        </div>
        {!isAuthPage && menuOpen && <MobileDropdownMenu />}
      </div>
    </div>
  );
};

export default Navbar;
