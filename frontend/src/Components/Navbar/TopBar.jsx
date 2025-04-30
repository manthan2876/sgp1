import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const TopBar = () => {



  const { user, setTemp, setUser } = useAuth();
  const navigate = useNavigate();

  // **Google Translate: Load and Initialize the Widget**
  


  const logOut = () => {
    axios
      .post('http://localhost:5000/api/auth/logout')
      .then(() => {
        console.log("logged out...");
        setTemp((prev) => !prev);
        setUser(null);
        localStorage.removeItem("token");
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <div className="bg-gradient-to-r from-[#808000] to-[#a2a220] text-white flex items-center justify-between px-4 md:py-2 py-1">
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="Indian Flag"
          className="h-4 w-6"
        />
        <span className="hidden md:inline text-xs font-semibold">
          GOVERNMENT OF INDIA
        </span>
      </div>

      <div className="flex items-center md:space-x-4 space-x-2">
        
        
        {!user ? (
          <Link
            to="/auth/login"
            className="bg-primary-light text-primary-dark px-5 py-2 rounded-full hover:opacity-90 transition-colors"
          >
            Login
          </Link>
        ) : (
          <button
            className="bg-primary-light text-primary-dark px-5 py-2 rounded-full hover:opacity-90 transition-colors"
            onClick={logOut}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
