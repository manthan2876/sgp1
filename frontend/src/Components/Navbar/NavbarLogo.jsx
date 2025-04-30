import { useNavigate } from "react-router-dom";
import postLogo from "../../assets/india-post-logo.webp";

const NavbarLogo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogoClick}>
      <img
        src={postLogo}
        alt="National Emblem"
        className="md:h-16 h-10"
      />
      <span className="text-primary-dark dark:text-primary-light font-bold text-lg">
        India Philatelist
      </span>
    </div>
  );
};

export default NavbarLogo;
