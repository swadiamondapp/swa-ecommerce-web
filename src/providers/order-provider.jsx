"use client";

import { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  return (
    <OrderContext.Provider
      value={{ orderData, setOrderData, reviewData, setReviewData }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
