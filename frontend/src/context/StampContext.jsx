import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const StampContext = createContext();

export const StampProvider = ({ children }) => {
  const [stamps, setStamps] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { currUser } = useAuth();
  // console.log(currUser);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/get-item`)
      .then((res) => {
        console.log(res.data)
        setStamps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const userId = currUser ? currUser._id : null;
  // console.log(userId);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/wishlist/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        const wishlistItems = res.data || [];
        // console.log("Fetched wishlist:", wishlistItems);
        setWishlist(wishlistItems);
        return res.data;
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err.response || err.message);
    }
  };

  return (
    <StampContext.Provider
      value={{ stamps, setStamps, wishlist, fetchWishlist }}
    >
      {children}
    </StampContext.Provider>
  );
};

export const useStamps = () => {
  return useContext(StampContext);
};
