"use client";

import axios from "axios";
import { cart } from "@/utils/urls";
import { createContext, useContext, useState, useEffect } from "react";
import { useCountry } from "@/providers/country-provider";
import { useAuth } from "@/providers/auth-provider";

const CartContext = createContext({
  cartItemsCount: null,
  activeCart: "shopping",
  cartLoading: false,
  setActiveCart: () => {},
  clearCart: () => {}
});


export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(null);
  const [activeCart, setActiveCart] = useState("shopping");
  const [cartLoading, setCartLoading] = useState(false);
  const { countryId } = useCountry();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const fetchCart = () => {
    setCartLoading(true);
    axios
      .get(`${cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setCartItemsCount(parseInt(response1.data.results.count) || 0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCartLoading(false);
      });
  };

  function clearCart() {
    setCartItemsCount(0);
  };

  return (
    <CartContext.Provider
      value={{ cartItemsCount, setCartItemsCount, activeCart, cartLoading, setActiveCart, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
