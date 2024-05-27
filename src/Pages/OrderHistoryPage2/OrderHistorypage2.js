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
import CancelProductModal from "../../components/WalletModal/CancelProductModal";
import Classes from "./OrderHistoryPage2.module.css";
import { useHistory } from "react-router-dom";
import { TbMinusVertical } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { Accordion, AccordionTab } from "primereact/accordion";
import LIfeTImeModal from "../../components/LifeTImeModal/LIfeTImeModal";
import BuyBackRequiest from "../../components/BuyBackRequiest/BuyBackRequiest";
import AddBank from "../../components/LifeTImeModal/AddBank";
import moment from "moment";
import axios from "axios";
import * as Urls from "../../Urls";
// import SuccessPage from "../../components/SuccessMessageModal/SuccessModal";
import SuccessPage from "../../components/SuccessPage/SuccessPage";
import TransferMoneyModal from "../../components/WalletModal/TransferMoneyModal";
import { TbLocationFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";

const OrderHistorypage2 = (props) => {
  const history = useHistory();
  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });
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
  const [productDetails, setProductDetails] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderid, setOrderid] = useState("");
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
  const [open, setOpen] = useState(false);
  const [buyBackOpen, setBuyBackOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [cancelProductModal, setCancelProductModal] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [lteLbbData, setLteLbbData] = useState([]);
  const [type, setType] = useState("");
  const [singleOrderData, setSingleOrderData] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [addressData, setAddressData] = useState({
    sEmail: "",
    sPhone: "",
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "kerala",
    hNumber_Bname: "",
    streetColony: "",
    landMark: "",
  });

  const onChange = (key) => {
    console.log(key);
  };
  // warnning

  useEffect(() => {
    // axios
    //   .get(Urls.myOrder + "/" + props.location.state.data.productId, {
    //     headers: {
    //       Authorization: "Token " + token,
    //     },
    //   })
    //   .then((response1) => {
    //     console.log("response1->", response1);
    //     setAddress(response1.data.results.data.order.address);
    //     setOrderId(response1.data.results.data.order.order_code);
    //     setOrderid(response1.data.results.data.order.id);
    //     setOrderPlaced(response1.data.results.data.order.order_at);
    //     setTotal(response1.data.results.data.order.grand_total);
    //     setPromoCode(response1.data.results.data.order.promocode);
    //     setSubTot(response1.data.results.data.order.orders_total);
    //     setOrderDet(response1.data.results.data.order.shipment);
    //     setPayMode(response1.data.results.data.order.payment_mode);
    //     setDoctNum(response1.data.results.data.order.shipment[0].docket_number);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // axios
    //   .get(Urls.cart, {
    //     headers: {
    //       Authorization: "Token " + token,
    //     },
    //   })
    //   .then((response1) => {
    //     if (response1.data.results.message === "cart is empty") {
    //       setCartCount("");
    //     } else {
    //       setCartCount(response1.data.results.count);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    singleOrderDetails();
  }, []);
  // warnning

  const singleOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${Urls.myOrder +
          "/" +
          props.location.state.data.productId +
          "?shipment_id=" +
          props.location.state.data.shipmentId}?country=${countryId}`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      if (response.data.results.status_code === 200) {
        setSingleOrderData(response.data.results.data);
        response.data.results.data &&
          response.data.results.data.order &&
          response.data.results.data.order.address &&
          setAddress({
            ...address,
            name: response.data.results.data.order.address.name,
            phone_number: response.data.results.data.order.address.phone_number,
            pincode: response.data.results.data.order.address.pincode,
            city: response.data.results.data.order.address.city,
            state: response.data.results.data.order.address.state,
            house: response.data.results.data.order.address.house,
            area: response.data.results.data.order.address.area,
            landmark: response.data.results.data.order.address.landmark,
          });
        setProductDetails(
          response.data.results.data &&
            response.data.results.data.order &&
            response.data.results.data.order.shipment
        );
        setPaymentDetails(
          response.data.results.data &&
            response.data.results.data.order &&
            response.data.results.data.order.payment_data
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchLteLbbDetails = async () => {
    try {
      const body = {
        order_id: orderid,
        shipment_id: orderDet[0].id,
        product_id: orderDet[0].product.product_id,
        total_amount: total,
        payment_mode: payMode,
        cancel_type: "initial",
      };

      const response = await axios.post(Urls.CancelOrder, body, {
        headers: { Authorization: "Token 	" + token },
      });
      if (response.data.results.status_code === 200) {
        setLteLbbData(response.data.results);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancellationProceedWith = async () => {
    try {
      const body = {
        order_id: orderid,
        shipment_id: orderDet[0].id,
        product_id: orderDet[0].product.product_id,
        total_amount: total,
        payment_mode: payMode,
        refund_type: type,
        cancel_type: "final",
        phone_code: "+91",
        phone_number: addressData.mobile,
        pincode: addressData.pincode,
        state: addressData.state,
        city: addressData.city,
        landmark: addressData.landMark,
        house: addressData.hNumber_Bname,
        street: addressData.streetColony,
      };
      console.log(body);
      const response = await axios.post(Urls.CancelOrder, body, {
        headers: { Authorization: "Token 	" + token },
      });
      if (response.data.results.status_code === 200) {
        setBuyBackOpen(false);
        setOpen(false);
        setSuccessModalOpen(true);
        setTimeout(() => {
          setSuccessModalOpen(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelProduct = async () => {
    try {
      const body = {
        product_id: orderDet[0].product.product_id,
        order_id: orderid,
        shipment_id: orderDet[0].id,
        total_amount: total,
        payment_mode: payMode,
        cancel_type: "final",
        reason: "aaaaaaaaaaa",
        notes: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      };
      const response = await axios.post(Urls.CancelOrder, body, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status_code === 200) {
        setCancelProductModal(false);
        setSuccessModalOpen(true);
        singleOrderDetails();
        setTimeout(() => {
          setSuccessModalOpen(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(
    "singleOrderData--->1233",
    singleOrderData && singleOrderData.order && singleOrderData.order
  );

  console.log(
    "singleOrderData--->12",
    singleOrderData &&
      singleOrderData.data &&
      singleOrderData.data.order &&
      singleOrderData.data.order.address
  );

  console.log("paymentDetails--->", paymentDetails);

  return (
    <div>
      <div className={Classes.Background}>
        <Header
          countCartItems={cartCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <LIfeTImeModal
          open={open}
          handleClose={() => setOpen(false)}
          orderid={orderid}
          payMode={payMode}
          total={total}
          shipmentId={orderDet[0].id}
          productId={orderDet[0].product.product_id}
          lteLbbData={lteLbbData}
          handleOpen={() => {
            setBuyBackOpen(true);
          }}
          setType={setType}
        />
        <BuyBackRequiest
          open={buyBackOpen}
          handleClose={() => setBuyBackOpen(false)}
          cancellationProceedWith={cancellationProceedWith}
          addressData={addressData}
          setAddressData={setAddressData}
        />
        <SuccessPage
          open={successModalOpen}
          handleClose={() => setSuccessModalOpen(false)}
        />
        {/*
        <AddBank open={addBankOpen} handleClose={() => setAddBankOpen(false)} />
        <TransferMoneyModal
        open={transferModalOpen}
        handleClose={() => setTransferModalOpen(false)}
      /> */}
        <CancelProductModal
          open={cancelProductModal}
          handleClose={() => setCancelProductModal(false)}
          cancelProduct={cancelProduct}
        />

        <div>
          <div className={`container ${Classes.OrderMobCont}`}>
            <div className={`container ${Classes.OrderMobCont2}`}>
              <div className={Classes.Main}>
                {/* <h1 className={Classes.Title}>Shipment Details</h1> */}
                <h3 className={Classes.orderidh3}>Order ID : {orderId}</h3>
                <div className={Classes.DeliveryDetails}>
                  <p>
                    <img src={deliveryimg} />
                    Delivered on <span>26 may 2023</span>
                  </p>
                </div>
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
                          <p className={Classes.nameShipment}>{address.name}</p>
                          <div className={Classes.AddressShipping}>
                            <p className={Classes.AddressSh1}>
                              <TbLocationFilled
                                className={Classes.AddressIcons}
                              />
                              {address.house} ( house ) {address.city}{" "}
                              {address.pincode} <br /> {address.area} <br />{" "}
                              {address.city} district <br /> {address.state}
                            </p>
                            <p className={Classes.phoneSh}>
                              <IoCall className={Classes.phoneicons} />
                              Phone number : {address.phone_number}
                            </p>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Product Details">
                        <div className={Classes.ProductDetailsParent1}>
                          <div className={Classes.LftProductDetail}>
                            <img
                              src={
                                productDetails[0] &&
                                productDetails[0].product.thumbnail_image
                              }
                              style={{ maxWidth: "121px" }}
                            />
                            <div>
                              <p className={Classes.PDiamond1}>
                                {productDetails[0] &&
                                  productDetails[0].product.product_name}
                              </p>
                              <p style={{ color: "#757C81" }}>
                                18 KT yellow gold 12.460 GM
                              </p>
                              <p style={{ color: "#757C81" }}>
                                Diamond 0.680 Carat SIIJ
                              </p>
                              <p style={{ color: "#303A42" }}>
                                SKU{" "}
                                {productDetails[0] &&
                                  productDetails[0].product.sku}
                              </p>
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
                              {orderDet[0].docket_number}
                            </span>
                          </p>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Payment Details">
                        <div className={Classes.parentPaymentItems}>
                          <div className={Classes.PaymentItems}>
                            <p>Item Subtotal</p>
                            <p>{paymentDetails.itemsubtotal}</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Shipping</p>
                            <p>{paymentDetails.shipping}</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Total</p>
                            <p>{paymentDetails.total}</p>
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
                            <p style={{ color: "#000000" }}>
                              {paymentDetails.coupon_discount
                                ? paymentDetails.coupon_discount
                                : 0}
                            </p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p style={{ color: "#000000" }}>Payable</p>
                            <p style={{ color: "#000000" }}>
                              {paymentDetails.payable}
                            </p>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab
                        header="Track Order"
                        style={{ fontFamily: "lato", fontWeight: "500" }}
                      >
                        <div className={Classes.ParentStatus}>
                          <div className={Classes.leftStatus1}>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus}></div>
                              <div className={Classes.dotstatusline}></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div
                                className={Classes.dotstatus1}
                                style={{
                                  background: "#0eb533",
                                  border: "none",
                                }}
                              ></div>
                              <div
                                className={Classes.dotstatusline1}
                                style={{ background: "#0eb533" }}
                              ></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
                              <div className={Classes.dotstatusline1}></div>
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
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
                    {singleOrderData &&
                      singleOrderData.order &&
                      singleOrderData.order.shipment &&
                      singleOrderData.order.shipment[0].status === 4 && (
                        <button
                          className={Classes.REButton}
                          onClick={() => fetchLteLbbDetails()}
                        >
                          Return / Exchange
                        </button>
                      )}
                    {singleOrderData &&
                      singleOrderData.order &&
                      singleOrderData.order.shipment &&
                      singleOrderData.order.shipment[0].status === 2 &&
                      singleOrderData.order.shipment[0].cancel_order !==
                        "Admin Approval pending" && (
                        <div className={Classes.CancelProductButton}>
                          <button onClick={() => setCancelProductModal(true)}>
                            Cancel product
                          </button>
                        </div>
                      )}
                    <button
                      className={Classes.REButton2}
                      // onClick={() => setBuyBackOpen(true)}
                      // onClick={() => setSuccessModalOpen(true)}
                    >
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
