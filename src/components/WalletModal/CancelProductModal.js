import React, { useState } from "react";
import Classes from "./WalletModal.module.css";
import { Dropdown } from "primereact/dropdown";

const CancelProductModal = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div>
      <div>
        <h3>Cancel this product</h3>
      </div>
      <div>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
        />
      </div>
      <textarea></textarea>
    </div>
  );
};

export default CancelProductModal;
