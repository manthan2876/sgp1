import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../UI/BackButton";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";

const MyCart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  console.log(cart)

  const calculateSubtotal = () =>
    cart
      .reduce(
        (total, item) => total + item.PhilatelicItem.price * item.quantity,
        0
      )
      .toFixed(2);

  const calculateGrandTotal = (subtotal) => parseFloat(subtotal).toFixed(2);

  const subtotal = calculateSubtotal();
  const grandTotal = calculateGrandTotal(subtotal);

  const handleCheckout = () => {
    navigate("/items/my-cart/checkout");
  };

  return (
    <div className="relative bg-background-light dark:bg-background-dark min-h-screen">
      <BackButton />
      <div className="container mx-auto p-4 px-8">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-primary-light md:mb-3 md:mt-0 mt-1 mb-5">
          Your Cart ({cart.length} items)
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
            <p>Your cart is empty. Add some items to view them here.</p>
          </div>
        ) : (
          <>
            <CartTable
              cart={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
            <div className="flex justify-end">
              <CartSummary
                subtotal={subtotal}
                grandTotal={grandTotal}
                handleCheckout={handleCheckout}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;
