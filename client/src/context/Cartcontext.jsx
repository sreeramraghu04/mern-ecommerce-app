import { useState, createContext, useEffect } from "react";

const Cartcontext = createContext();

export const CartcontextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  /* const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  } */

  return (
    <Cartcontext.Provider value={{ cart, setCart }}>
      {children}
    </Cartcontext.Provider>
  );
};

export default Cartcontext;
