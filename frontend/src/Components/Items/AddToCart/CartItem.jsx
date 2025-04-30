import { useEffect } from "react";
import QuantityControl from "./QuantityControl";  
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // useEffect(() => {
  //   console.log("hello")
  // }, [item])
  
  console.log(item)
  return (
    <tr key={item._id} className="border-b border-border-light dark:border-border-dark">
      <td className="flex items-center p-4">
        <img
          src={item.PhilatelicItem.image}
          alt={item.PhilatelicItem.name}
          className="w-20 h-20 object-cover mr-4"
        />
        <p className="text-lg font-semibold text-gray-800 dark:text-text-dark">
          {item.PhilatelicItem.name}
        </p>
      </td>
      <td className="text-center font-semibold text-gray-800 dark:text-text-dark">
        Rs. {item.PhilatelicItem.price}
      </td>
      <td className="text-center">
        <QuantityControl
          quantity={item.quantity}
          updateQuantity={updateQuantity}
          itemId={item._id}
        />
      </td>
      <td className="text-center font-semibold text-gray-800 dark:text-text-dark">
        Rs. {(item.PhilatelicItem.price * item.quantity).toFixed(2)}
      </td>
      <td className="text-center">
        <button
          onClick={() => removeItem(item._id)}
          className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
