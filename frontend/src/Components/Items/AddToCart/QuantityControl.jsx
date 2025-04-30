import axios from "axios";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityControl = ({ quantity, itemId }) => {
  const [cartItem, setCartItem] = useState(null); // Hold only the current item's data
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/cart/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Find the item with the matching `itemId` and set it to `cartItem`
        const matchedItem = res.data.cart.find((item) => item._id === itemId);
        setCartItem(matchedItem);
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [itemId]);

  const updateQuantity = (cartItemId, delta) => {
    axios
      .put(
        `http://localhost:5000/api/user/cart/editItem/${cartItemId}`,
        { delta },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // Find the updated item in the response and update the state
        const updatedItem = res.data.cart.find((item) => item._id === cartItemId);
        setCartItem(updatedItem);
      })
      .catch((err) => console.error("Failed to update quantity:", err));
  };

  if (!cartItem) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className="p-2 bg-gray-200 dark:bg-accent-dark rounded-full"
        onClick={() => updateQuantity(itemId, -1)}
        disabled={cartItem.quantity <= 1}
      >
        <FaMinus />
      </button>
      <span className="mx-2 text-gray-800 dark:text-text-dark">
        {cartItem.quantity}
      </span>
      <button
        className="p-2 bg-gray-200 dark:bg-accent-dark rounded-full"
        onClick={() => updateQuantity(itemId, 1)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityControl;
