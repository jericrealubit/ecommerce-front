import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
