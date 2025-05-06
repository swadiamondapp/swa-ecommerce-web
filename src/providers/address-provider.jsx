"use client";

import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [otherpaymentData, setOtherPaymentData] = useState(null);

  return (
    <AddressContext.Provider
      value={{
        paymentData,
        setPaymentData,
        otherpaymentData,
        setOtherPaymentData,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
