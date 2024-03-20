import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Classes from "./OrderHistoryPage.module.css";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import OrderHiistoryCard from "../../components/OrderHistory/OrderHistoryCard/OrderHistoryCard";
import ProductImage from "../../Assets/earrings.png";
import Orders from "../../components/OrderHistory/OrderHistoryCard/Orders/Orders";
import axios from "axios";
import * as Urls from "../../Urls";
import { FadeLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(Urls.myOrder, { headers: { Authorization: "Token 	" + token } })
      .then((response1) => {
        setLoading(false);
        setOrderList(response1.data.results.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(Urls.cart, { headers: { Authorization: "Token " + token } })
      .then((response1) => {
        if (response1.data.results.message === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const productViewHandler = (id, shipmentId) => {
    history.push({
      pathname: "/track_order",
      state: { data: { productId: id, shipmentId: shipmentId } },
    });
  };
  let orderLists;
  if (loading) {
    orderLists = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else if (orderList.length === 0) {
    orderLists = (
      <div className=" justify-content-center align-items-center loader">
        <h3 className={Classes.wishListHead}>No Orders Yet</h3>
      </div>
    );
  } else {
    orderLists = orderList.map((item, index) => {
      console.log("item--.>", item);
      return (
        <OrderHiistoryCard
          OrderId="SWA4R46RF46R356F45"
          OrderedTime="Ordered on 12th auguest 2021"
          key={index}
        >
          <Orders
            Image={item.shipments[0].bag_image}
            productId={item.shipments[0].product_id}
            productName={item.shipments[0].product_name}
            orderId={item.order_code}
            rating={item.shipments[0].product_rating}
            promCond={item.promocode === null ? "Not Applied" : "Applied"}
            address={item.address_name}
            ProductDate={item.status}
            Price={item.grand_total}
            Qty="4"
            clicked={() =>
              productViewHandler(item.id, item.shipments[0].shipment_id)
            }
          />
        </OrderHiistoryCard>
      );
    });
  }
  console.log("orderList--->", orderList);
  return (
    <div>
      <div className={Classes.Background}>
        <Header countCartItems={cartCount} />
        <OrderHistory>{orderLists}</OrderHistory>
        <div className={Classes.Features}>
          <Features />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
