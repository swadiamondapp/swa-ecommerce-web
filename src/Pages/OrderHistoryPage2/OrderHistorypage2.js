import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import Features from "../../components/Features/Features";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import OrderHistoryCard2 from "../../components/OrderHistory/OrderHistoryCard2/OrderHistoryCard2";
import ProductImage from "../../Assets/pandant chain 1.png";
import { Steps } from "antd";
import TrackOrder from "../../components/OrderHistory/TrackOrder/TrackOrder";
import Classes from "./OrderHistoryPage2.module.css";
import { useHistory } from "react-router-dom";
import { TbMinusVertical } from "react-icons/tb";
import moment from "moment";
import axios from "axios";
import * as Urls from "../../Urls";
const OrderHistorypage2 = (props) => {
  const history = useHistory();
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
  const [orderId, setOrderId] = useState("");
  const [total, setTotal] = useState("");
  const [subTot, setSubTot] = useState("");
  const [cartCount, setCartCount] = useState("");
  const [promoCode, setPromoCode] = useState(null);
  const [doctNum, setDoctNum] = useState("");
  const [payMode, setPayMode] = useState("");
  const [orderPlaced, setOrderPlaced] = useState("");
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    axios
      .get(Urls.myOrder + "/" + props.location.state.data, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setAddress(response1.data.results.data.order.address);
        setOrderId(response1.data.results.data.order.order_code);
        setOrderPlaced(response1.data.results.data.order.order_at);
        setTotal(response1.data.results.data.order.grand_total);
        setPromoCode(response1.data.results.data.order.promocode);
        setSubTot(response1.data.results.data.order.orders_total);
        setOrderDet(response1.data.results.data.order.shipment);
        setPayMode(response1.data.results.data.order.payment_mode);
        setDoctNum(response1.data.results.data.order.shipment[0].docket_number);
        
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

  const homeHandler = () => {
    history.pushState("/");
  };
  const orderHistory = () => {
    history.push("/my_orders");
  };
  const rateRevHandler = (proId) => {
    console.log(proId);
    history.push({ pathname: "/rate_review", state: { data: proId } });
  };
  return (
    <div>
      <div className={Classes.Background}>
        <Header countCartItems={cartCount} />

        <div>
          <div className="container">
            <div className="container">
              <div className={Classes.Main}>
                <h1 className={Classes.Title}>Shipment Details</h1>
                <div className={Classes.SubText}>
                  <p
                    className={`${Classes.Home} ${Classes.HomeNew}`}
                    onClick={homeHandler}
                    style={{ cursor: "pointer" }}
                  >
                    HOME /
                  </p>
                  <p
                    className={`${Classes.Home} ${Classes.HomeNew}`}
                    onClick={orderHistory}
                    style={{ cursor: "pointer" }}
                  >
                    ORDER HISTORY/
                  </p>
                  <p className={Classes.NewArrival}>SHIPMENT DETAILS</p>
                </div>
                <div className="d-flex" style={{ paddingBottom: "20px" }}>
                  <div className={Classes.head}>
                    Order placed on{" "}
                    <span className={Classes.date}>
                      {moment(orderPlaced).format("MMMM Do YYYY")}
                    </span>
                  </div>
                  <TbMinusVertical size={30} color="#00000" />
                  <div className={Classes.head}>
                    Order ID <span className={Classes.date}>{orderId} </span>
                  </div>
                </div>
              </div>

              <div className={Classes.shipMent}>
                <div className="row">
                  <div className="col-md-4 vl">
                    <div className={Classes.head}>Shipping details </div>
                    <p className={Classes.Adres}>
                      {address.name} <br />
                      <br />
                      {address.house} ( house ) {address.area}{" "}
                      {address.landmark} {address.city} {address.state}{" "}
                      {address.pincode} <br />
                      <br />
                      phone number : {address.phone_code + address.phone_number}
                    </p>
                  </div>
                  <div className="col-md-4 vl">
                    <div className={Classes.head}>Payment Method </div>
                    <p className={Classes.Adres}>
                      {payMode === "P" ? "Online Payment" : "Cash On Delivery"}
                    </p>
                  </div>
                  <div className="col-md-4 ">
                    <div className={Classes.head}>Order Summary </div>
                    <div className={Classes.Box}>
                      <p className={Classes.Adres}>Item Subtotal</p>
                      <div className={Classes.Adres}>{subTot}</div>
                    </div>
                    {/* <div className={Classes.Box}>
                      <p className={Classes.Adres}>Shipping</p>
                      <div className={Classes.Adres}>2000</div>
                    </div> */}
                    {/* <div className={Classes.Box}>
                      <p className={Classes.Adres}>Total</p>
                      <div className={Classes.Adres}>2000</div>
                    </div> */}
                    <div className={Classes.Box}>
                      <p className={Classes.Adres}>Promo code</p>
                      <div className={Classes.Adres}>
                        {promoCode === null ? (
                          <span>Not Applied</span>
                        ) : (
                          <span style={{ color: "#30933A" }}>Applied</span>
                        )}
                      </div>
                    </div>
                    {promoCode !== null ? (
                      <div className={Classes.Box}>
                        <p className={Classes.Adres}>Coupon Discount</p>
                        <div className={Classes.Adres}>{subTot - total}</div>
                      </div>
                    ) : null}

                    <div className={Classes.Box} style={{ fontWeight: "600" }}>
                      <p className={Classes.Adres}>Grand Total</p>
                      <div className={Classes.Adres}>{total}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Classes.Products}>
                {orderDet.map((item, index) => {
                  return (
                    <OrderHistoryCard2
                      key={index}
                      Image={item.product.thumbnail_image}
                      ProductName={item.product.product_name}
                      ProductProperty={
                        item.product.carat +
                        "KT " +
                        item.color.size_name +
                        " " +
                        item.product.gross_weight +
                        "GM"
                      }
                      // DiamondProperty="Diamond 0.680 Carat SIIJ"
                      rate={3}
                      proId={item.product.product_id}
                      price={item.items_total}
                      qty={item.quantity}
                      clicked={() => rateRevHandler(item.product.product_id)}
                    >
                      <TrackOrder doctNum = {doctNum}/>
                    </OrderHistoryCard2>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={Classes.Features}>
          <Features />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistorypage2;
