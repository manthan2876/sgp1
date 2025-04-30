import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTag, FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useStamps } from "../../../context/StampContext";
import { useAuth } from "../../../context/AuthContext";

const StampCard = ({ stamp }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favItems, setFavItems] = useState([]);
  const { fetchWishlist } = useStamps();
  const { user } = useAuth();

  const token = localStorage.getItem("token");

  // console.log(stamp);

  // console.log("wishhhh");
  useEffect(() => {
    const fetchAndSetWishlist = async () => {
      const wishlist = await fetchWishlist();
      setFavItems(wishlist);
      // console.log(stamp._id);

      wishlist[0].PhilatelicItem.map((item) => {
        if (item._id === stamp._id) {
          setIsFavorited(true);
        }
      });
      // console.log("Fetched wishlist in useEffect:", wishlist[0].PhilatelicItem[0]._id);
    };

    fetchAndSetWishlist();
  }, []);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    setIsLoading(true);
    try {
      if (isFavorited) {
        const response = await axios.delete(
          `http://localhost:5000/api/user/wishlist/remove/${stamp._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setIsFavorited(false);
        } else {
          console.error(
            "Failed to remove from wishlist:",
            response.data.message
          );
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/user/wishlist/add",
          { productId: stamp._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.status === 200 &&
          response.data.message === "Product added to wishlist"
        ) {
          setIsFavorited(true);
        } else {
          console.error("Failed to add to wishlist:", response.data.message);
        }
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(stamp)

  const imageUrl =
    stamp.image && stamp.image.length > 0
      ? stamp.image
      : "path/to/default-image.jpg";

  return (
    <div className="w-full h-full bg-background-light dark:bg-background-dark border border-border-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg duration-200 flex flex-col transition-transform transform hover:scale-[1.01] relative">
      <div
        className={`absolute top-2 right-2 cursor-pointer z-10 ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={toggleFavorite}
      >
        {user !== "postalCircle" &&
          (isFavorited ? (
            <FaStar size={22} className="text-yellow-500" />
          ) : (
            <FaRegStar size={22} className="text-yellow-500" />
          ))}
      </div>

      <img
        src={imageUrl}
        alt={stamp.name}
        className="w-full md:h-44 h-64 object-contain grayscale sepia border-b-2 border-border-dark"
      />

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1 gap-2">
            <h3 className="font-semibold text-base text-text-light dark:text-text-dark">
              {stamp.name}
            </h3>
            {stamp.rarity === "Unique" && (
              <span className="bg-yellow-500 text-xs px-2 py-1 rounded text-black">
                Limited
              </span>
            )}
          </div>

          <p className="text-background-dark font-semibold dark:text-accent-dark mb-1 flex items-center">
            <span className="mr-1">₹</span>
            {stamp.price}
          </p>

          <p className="text-text-light dark:text-text-dark text-sm mb-1 line-clamp-2">
            {stamp.description}
          </p>

          <div className="flex flex-col gap-2 justify-between my-4">
            <p className="text-xs text-gray-600 dark:text-text-dark flex items-center">
              <FaTag className="mr-1" />
              <strong>Category: &nbsp; </strong> {stamp.category}
            </p>
            <p className="text-xs text-gray-600 dark:text-text-dark flex items-center">
              <strong>Philatelic Bureau: &nbsp; </strong> {stamp.name}
            </p>
          </div>
        </div>

        <Link
          to={`/items/stamp/${stamp._id}`}
          className="bg-primary-dark text-white w-full px-4 py-2 rounded hover:opacity-90 transition-colors text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default StampCard;
