import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStamps } from "../../../context/StampContext";
import {
  FaTag,
  FaCartPlus,
  FaInfoCircle,
  FaGem,
  FaRuler,
  FaCheckCircle,
  FaCalendarAlt,
  FaCogs,
  FaCheck,
  FaBox,
  FaEdit,
  FaListAlt,
} from "react-icons/fa";
import BackButton from "../../../UI/BackButton";
import { useCart } from "../../../context/CartContext";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const StampDetailsPage = () => {
  const { id } = useParams();
  const { stamps } = useStamps();
  const { cart, setTemp } = useCart();
  const { user } = useAuth();
  const [stamp, setStamp] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [editableStock, setEditableStock] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(stamps);
    const foundStamp = stamps.find((stamp) => stamp._id === id);
    setStamp(foundStamp);
  }, [id, stamps]);

  useEffect(() => {
    if (stamp) {
      const isInCart = cart.some((item) => item._id === stamp._id);
      setIsAdded(isInCart);
    }
  }, [stamp, cart]);

  const token = localStorage.getItem("token");
  console.log("cart", token);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/cart/add",
        {
          itemId: stamp._id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsAdded(true);
        navigate('/items/my-cart')

        setTemp((p) => !p)
      } else {
        console.error("Failed to add item to cart:", response.data);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Something went wrong while adding the item to the cart.");
    }
  };

  const handleSaveStock = () => {
    // Update the stock (e.g., send data to the backend)
    console.log("Updated stock:", editableStock);
    setIsEditing(false);
  };
  

  if (!stamp) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-lg text-gray-500">Stamp not found.</p>
      </div>
    );
  }

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="container mx-auto py-5">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center my-auto">
            <img
              src={stamp.image}
              alt={stamp.name}
              className="w-64 h-auto object-cover rounded-md mx-auto"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h2 className="md:text-3xl text-2xl font-bold text-primary-dark md:mb-5">
              {stamp.name}
            </h2>
            <p className="text-2xl font-semibold text-background-dark dark:text-text-dark">
              ₹{stamp.price}
            </p>

            <p className="md:text-lg text-text-light dark:text-text-dark mt-2 mb-4">
              {stamp.description}
            </p>

            <div className="mt-4 text-sm md:text-base">
              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                <strong>Philatelic Bureau:: &nbsp; </strong>{" "}
                {stamp.name}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                <FaTag className="mr-1" /> <strong>Category: &nbsp; </strong>{" "}
                {stamp.category}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2 ml-5">
                <FaListAlt className="mr-1" /> <strong>Sub Category: &nbsp; </strong>{" "}
                {stamp.subitem}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                <FaCalendarAlt className="mr-1" />{" "}
                <strong>Year: &nbsp; </strong> {stamp.specifications.year}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                <FaCogs className="mr-1" />{" "}
                <strong>Specifications &nbsp; </strong>
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2 ml-5">
                <FaCheckCircle className="mr-1" />{" "}
                <strong>Condition: &nbsp; </strong>{" "}
                {stamp.specifications.condition}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2 ml-5">
                <FaRuler className="mr-1" />{" "}
                <strong>Dimensions: &nbsp; </strong>{" "}
                {stamp.specifications.dimensions}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2 ml-5">
                <FaGem className="mr-1" /> <strong>Rarity: &nbsp; </strong>{" "}
                {stamp.specifications.rarity}
              </p>

              <p className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                <FaInfoCircle className="mr-1" />{" "}
                <strong>
                  {stamp.featured ? "Featured" : "Not Featured"} &nbsp;{" "}
                </strong>
              </p>
              {user === "postalCircle" && (
                <div className="text-gray-600 dark:text-text-dark flex items-center mt-2">
                  <FaBox className="mr-1" />
                  <strong>Stock: &nbsp;</strong>
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editableStock}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 0) {
                            setEditableStock(value);
                          }
                        }}
                        className="border border-border-dark p-1 rounded w-20"
                      />
                      <button
                        className="ml-2 bg-green-500 text-white rounded p-1"
                        onClick={handleSaveStock}
                      >
                        Save
                      </button>
                      <button
                        className="ml-2 bg-gray-500 p-1 rounded text-white hover:opacity-90"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span>
                      {stamp.stock}
                      <button
                        className="ml-4 align-center"
                        onClick={() => setIsEditing(true)}
                      >
                         <FaEdit size={18} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-primary-dark text-white px-5 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-colors"
              >
                {isAdded ? <FaCheck /> : <FaCartPlus />}
                {isAdded ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mt-10">
          <h3 className="text-2xl font-bold text-primary-dark dark:text-text-dark mb-5">
            You Might Also Like
          </h3>
          <div className="grid grid-col-1 md:grid-cols-4 gap-6">
            {relatedStamps.length > 0 ? (
              relatedStamps.map((relatedStamp) => (
                <StampCard key={relatedStamp.id} stamp={relatedStamp} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
                No related stamps available.
              </p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StampDetailsPage;
