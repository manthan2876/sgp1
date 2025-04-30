import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const UserMenu = ({ setModalVisible, modalVisible }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const { currUser } = useAuth();
  console.log(currUser);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    if (currUser) {
      navigate("/user-profile");
    } else {
      setUserMenuVisible(!userMenuVisible);
      setModalVisible(!modalVisible);
    }
  };

  return (
    <div className="relative">
      <FaUserCircle
        className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark cursor-pointer"
        size={28}
        onClick={toggleUserMenu}
      />

      {modalVisible && currUser === undefined && (
        <div className="absolute top-full right-0 mt-2 bg-background-light dark:bg-background-dark p-6 rounded-lg w-72 shadow-lg z-50">
          <h2 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
            Connect, Collect, Explore!
          </h2>

          <div className="space-x-4">
            <Link
              to="/auth/login"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <button className="bg-gradient-to-r from-[#808000] to-[#a2a220] text-white dark:text-text-dark py-2 px-4 rounded-lg hover:bg-accent-light dark:hover:bg-accent-dark">
                Login
              </button>
            </Link>

            <Link
              to="/user/signup"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <button className="bg-gradient-to-r from-[#808000] to-[#a2a220] text-white dark:text-text-dark py-2 px-4 rounded-lg hover:bg-accent-light dark:hover:bg-accent-dark">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
