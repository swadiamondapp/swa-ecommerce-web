import React from "react";
import Classes from "./OrderHistory.module.css";
import { useHistory } from "react-router-dom";
const OrderHistory = (props) => {
  const history = useHistory();
  const homeHandler = () => {
    history.push("/");
  };
  return (
    <div>
      <div className={`${Classes.abcd} container`}>
        <div className={`${Classes.abcd} container`}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>My Orders</h1>
            <div className={Classes.SubText}>
              <p
                className={`${Classes.Home} ${Classes.HomeNew}`}
                onClick={homeHandler}
              >
                HOME /
              </p>
              <p className={Classes.NewArrival}>MY ORDERS</p>
            </div>
          </div>
          {/* <div className={Classes.SearchOrder}>
              <input type='text' className={Classes.SearchBar} placeholder="Search Your order" />
              <input type='submit' className={Classes.SearchButton} value='Search order' />
            </div> */}
          <div className={Classes.Products}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
