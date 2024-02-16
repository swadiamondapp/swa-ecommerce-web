import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import Features from "../../components/Features/Features";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import OrderHistoryCard2 from "../../components/OrderHistory/OrderHistoryCard2/OrderHistoryCard2";
import ProductImage from "../../Assets/pandant chain 1.png";
import deliveryimg from "../../Assets/delivery.png";
import imgproduct from "../../Assets/diamonds.png";
import { Steps, Collapse } from "antd";
import TrackOrder from "../../components/OrderHistory/TrackOrder/TrackOrder";
import Classes from "./OrderHistoryPage2.module.css";
import { useHistory } from "react-router-dom";
import { TbMinusVertical } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { Accordion, AccordionTab } from "primereact/accordion";
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
  const { Panel } = Collapse;
  const [activeIndex, setActiveIndex] = useState();

  const onChange = (key) => {
    console.log(key);
  };
  // warnning

  // useEffect(() => {
  //   axios
  //     .get(Urls.myOrder + "/" + props.location.state.data, {
  //       headers: {
  //         Authorization: "Token " + token,
  //       },
  //     })
  //     .then((response1) => {
  //       setAddress(response1.data.results.data.order.address);
  //       setOrderId(response1.data.results.data.order.order_code);
  //       setOrderPlaced(response1.data.results.data.order.order_at);
  //       setTotal(response1.data.results.data.order.grand_total);
  //       setPromoCode(response1.data.results.data.order.promocode);
  //       setSubTot(response1.data.results.data.order.orders_total);
  //       setOrderDet(response1.data.results.data.order.shipment);
  //       setPayMode(response1.data.results.data.order.payment_mode);
  //       setDoctNum(response1.data.results.data.order.shipment[0].docket_number);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   axios
  //     .get(Urls.cart, {
  //       headers: {
  //         Authorization: "Token " + token,
  //       },
  //     })
  //     .then((response1) => {
  //       if (response1.data.results.message === "cart is empty") {
  //         setCartCount("");
  //       } else {
  //         setCartCount(response1.data.results.count);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  // warnning

  const homeHandler = () => {
    history.pushState("/");
  };
  const orderHistory = () => {
    history.push("/my_orders");
  };
  const rateRevHandler = (proId) => {
    console.log(proId);
    history.push({
      pathname: "/rate_review",
      state: { data: proId },
    });
  };

  return (
    <div>
      <div className={Classes.Background}>
        <Header countCartItems={cartCount} />

        <div>
          <div className={`container ${Classes.OrderMobCont}`}>
            <div className={`container ${Classes.OrderMobCont2}`}>
              <div className={Classes.Main}>
                {/* <h1 className={Classes.Title}>Shipment Details</h1> */}
                <h3 className={Classes.orderidh3}>
                  Order ID : SWA4R46RF46R356F45
                </h3>
                <div className={Classes.DeliveryDetails}>
                  <p>
                    <img src={deliveryimg} />
                    Delivered on <span>26 may 2023</span>
                  </p>
                </div>
                {/* <div className={Classes.SubText}>
                  <p
                    className={`${Classes.Home} ${Classes.HomeNew}`}
                    onClick={homeHandler}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    HOME /
                  </p>
                  <p
                    className={`${Classes.Home} ${Classes.HomeNew}`}
                    onClick={orderHistory}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    ORDER HISTORY/
                  </p>
                  <p className={Classes.NewArrival}>SHIPMENT DETAILS</p>
                </div> */}
                {/* <div
                  className="d-flex"
                  style={{
                    paddingBottom: "20px",
                  }}
                >
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
                </div> */}
              </div>
              {/* new design */}
              <div className={Classes.parentCollaps5}>
                <div style={{ background: "#fff", borderRadius: "8px" }}>
                  <div className={`shipment ${Classes.dmm}`}>
                    <Accordion
                      multiple
                      activeIndex={activeIndex}
                      onTabChange={(e) => setActiveIndex(e.index)}
                    >
                      <AccordionTab header="Shipping Address">
                        <div className={Classes.ShippingDetialHead}>
                          <p className={Classes.nameShipment}>
                            Mohammed Inshad
                          </p>
                          <div className={Classes.AddressShipping}>
                            <p>
                              Kottakunnan ( house ) morayur 673642 <br />{" "}
                              opposit family health center <br /> malappuram
                              district <br /> kerala 673643
                            </p>
                            <p className={Classes.phoneSh}>
                              Phone number : 9995200745
                            </p>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Product Details">
                        <div className={Classes.ProductDetailsParent1}>
                          <div className={Classes.LftProductDetail}>
                            <img src={imgproduct} />
                            <div>
                              <p className={Classes.PDiamond1}>Diamond ring</p>
                              <p style={{ color: "#757C81" }}>
                                18 KT yellow gold 12.460 GM
                              </p>
                              <p style={{ color: "#757C81" }}>
                                Diamond 0.680 Carat SIIJ
                              </p>
                              <p style={{ color: "#303A42" }}>SKU 1245</p>
                            </div>
                          </div>
                          <div className={Classes.rgtProductDetails}>
                            <p>Qty 1</p>
                          </div>
                        </div>
                        <div className={Classes.crtn1}>
                          <p>
                            Certification No :{" "}
                            <span style={{ color: "#0997E7" }}>
                              SGLJMH6786532E
                            </span>
                          </p>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Payment Details">
                        <div className={Classes.parentPaymentItems}>
                          <div className={Classes.PaymentItems}>
                            <p>Item Subtotal</p>
                            <p>27000</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Shipping</p>
                            <p>0.00</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Total</p>
                            <p>27000</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Promo code</p>
                            <p style={{ color: "#000000" }}>
                              PAYDAY{" "}
                              <span style={{ color: "#30933A" }}>Applied</span>
                            </p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Coupon Discount</p>
                            <p style={{ color: "#000000" }}>2500</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p style={{ color: "#000000" }}>Payable</p>
                            <p style={{ color: "#000000" }}>24500</p>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Track shipping">
                        <div className={Classes.ParentStatus}>
                          <div className={Classes.leftStatus1}>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus}></div>
                              <div className={Classes.dotstatusline}></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
                              <div className={Classes.dotstatusline1}></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
                              <div className={Classes.dotstatusline1}></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
                              <div className={Classes.dotstatusline1}></div>
                            </div>
                          </div>
                          <div className={Classes.rightStatus1}>
                            <div className={Classes.RightStausshow}>
                              <p className={Classes.RsHead}>Order confirmed</p>
                              <p style={{ color: "#A3A7AB" }}>
                                Tues 18 oct’2022 , 4:45 PM
                              </p>
                            </div>
                            <div className={Classes.RightStausshow}>
                              <p
                                style={{ color: "#A3A7AB" }}
                                className={Classes.RsHead}
                              >
                                Shipped
                              </p>
                              <p style={{ color: "#A3A7AB" }}>
                                Expected by Friday 19th Oct
                              </p>
                            </div>
                            <div className={Classes.RightStausshow2}>
                              <p
                                style={{ color: "#A3A7AB" }}
                                className={Classes.RsHead}
                              >
                                Out of delivery
                              </p>
                              <p style={{ color: "#A3A7AB" }}></p>
                            </div>
                            <div className={Classes.RightStausshow3}>
                              <p
                                style={{ color: "#A3A7AB" }}
                                className={Classes.RsHead}
                              >
                                Delivery
                              </p>
                              <p style={{ color: "#A3A7AB" }}></p>
                            </div>
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                  <div className={Classes.TrackButtons}>
                    <button className={Classes.REButton}>
                      Return / Exchange
                    </button>
                    <button className={Classes.REButton2}>
                      <IoMdDownload /> Download invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* new design */}

              {/* warrning **** */}
              {/* <div className={Classes.shipMent}>
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
                    
                    <div className={Classes.Box}>
                      <p className={Classes.Adres}>Promo code</p>
                      <div className={Classes.Adres}>
                        {promoCode === null ? (
                          <span>Not Applied</span>
                        ) : (
                          <span
                            style={{
                              color: "#30933A",
                            }}
                          >
                            Applied
                          </span>
                        )}
                      </div>
                    </div>
                    {promoCode !== null ? (
                      <div className={Classes.Box}>
                        <p className={Classes.Adres}>Coupon Discount</p>
                        <div className={Classes.Adres}>{subTot - total}</div>
                      </div>
                    ) : null}

                    <div
                      className={Classes.Box}
                      style={{
                        fontWeight: "600",
                      }}
                    >
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
                      <TrackOrder doctNum={doctNum} />
                    </OrderHistoryCard2>
                  );
                })}
              </div> */}
              {/* warrning **** */}
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
