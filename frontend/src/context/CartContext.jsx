import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [temp, setTemp] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/cart/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCart(res.data.cart);
        // setTemp((p)=>!p)
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [temp]);

  const getCart = () => {
    axios
      .get(`http://localhost:5000/api/user/cart/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCart(res.data.cart);
        setTemp((p)=>!p)
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === cartItemId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  
    axios
      .put(
        `http://localhost:5000/api/user/cart/editItem/${cartItemId}`,
        { delta },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setCart(res.data.cart); 
      })
      .catch((err) => {
        console.error("Failed to update quantity:", err);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === cartItemId
              ? { ...item, quantity: item.quantity - delta }
              : item
          )
        );
      });
  };
  

  const removeItem = (cartItemId) => {
    axios
      .put(
        `http://localhost:5000/api/user/cart/remove/${cartItemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setCart(res.data.cart); 
        setTemp((p) => !p)
      })
      .catch((err) => console.error("Failed to remove item:", err));
  };

  return (
    <CartContext.Provider value={{ cart, updateQuantity, removeItem, getCart, setTemp }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
