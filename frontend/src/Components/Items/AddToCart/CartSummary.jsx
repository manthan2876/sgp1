const CartSummary = ({ subtotal, grandTotal, handleCheckout }) => {
    return (
      <div className="bg-background-light dark:bg-background-dark md:w-1/3 rounded-lg shadow-lg dark:shadow-shadow-dark p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 dark:text-text-dark">Subtotal:</span>
          <span className="text-gray-800 dark:text-text-dark">₹{subtotal}</span>
        </div>
        <div className="flex justify-between font-bold text-xl mt-4 text-gray-800 dark:text-text-dark">
          <span>Grand total:</span>
          <span>₹{grandTotal}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-primary-dark dark:bg-primary-light text-white dark:text-primary-dark mt-2 px-4 py-2 rounded hover:opacity-90 transition-colors text-center"
        >
          Check out
        </button>
      </div>
    );
  };
  
  export default CartSummary;
  