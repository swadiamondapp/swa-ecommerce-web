"use client";
import { createContext, useContext, useState } from "react";

const TrialContext = createContext();

export const TrialProvider = ({ children }) => {
  const [trialState, setTrialState] = useState({
    selectedTimeSlot: "",
    selectedDate: null,
    tryAtHomeCount: 0,
  });
  const [octnState, setOctnState] = useState({
    octnId: "",
    data: "",
    product_category: "",
  });

  return (
    <TrialContext.Provider
      value={{ trialState, setTrialState, octnState, setOctnState }}
    >
      {children}
    </TrialContext.Provider>
  );
};

export const useTrial = () => useContext(TrialContext);
