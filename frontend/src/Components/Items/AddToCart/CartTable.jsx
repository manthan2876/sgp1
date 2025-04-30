import CartItem from "./CartItem";

const CartTable = ({ cart, updateQuantity, removeItem }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark rounded-lg shadow-lg dark:shadow-shadow-dark p-6 mb-6">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark font-semibold text-gray-600 dark:text-gray-200">
            <th className="w-1/2 text-left p-2">Items</th>
            <th className="w-1/6 text-center">Price</th>
            <th className="w-1/6 text-center">Quantity</th>
            <th className="w-1/6 text-center">Total</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
