import React, { useState } from "react";
import Classes from "./Filter.module.css";
import { Button, Modal } from "antd";

const FilterMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   price modal

  const showModalPrice = () => {
    setIsModalOpen(true);
  };
  const handleOkPrice = () => {
    setIsModalOpen(false);
  };
  const handleCancelPrice = () => {
    setIsModalOpen(false);
  };
  //   price modal
  return (
    <div>
      <div className={Classes.FilterMobiles}>
        <button onClick={showModalPrice}>Price</button>

        <div className={Classes.arrow1}></div>
        <button>Sort</button>

        <div className={Classes.arrow1}></div>
        <button>Filter</button>
      </div>
      <div className={Classes.PriceModal}>
        <Modal
          title="Price"
          open={isModalOpen}
          onOk={handleOkPrice}
          onCancel={handleCancelPrice}
        >
          <div className={Classes.PriceTgs}>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>above 50000</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>20000 to 30000</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>30000 to 50000</label>
            </div>

            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>less than 10000</label>
            </div>
          </div>
          <div className={Classes.PriceBtns}>
            <button>Done</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FilterMobile;
