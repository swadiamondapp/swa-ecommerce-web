"use client";
import { createContext, useContext, useState } from "react";

const TrackOrderContext = createContext();

export const TrackOrderProvider = ({ children }) => {
  const [orderDet, setOrderDet] = useState([
    {
      product: {
        thumbnail_image: "",
        product_name: "",
        carat: "",
        gross_weight: "",
        product_id: "",
      },
      color: { size_name: "" },
      quantity: "",
    },
  ]);

  const [address, setAddress] = useState({
    id: "",
    name: "",
    phone_code: "",
    phone_number: "",
    pincode: "",
    state: "",
    city: "",
    landmark: "",
    house: "",
    area: "",
    type: "",
  });

  return (
    <TrackOrderContext.Provider
      value={{ orderDet, setOrderDet, address, setAddress }}
    >
      {children}
    </TrackOrderContext.Provider>
  );
};

export const useTrackOrder = () => useContext(TrackOrderContext);
