"use client";
import React, { useEffect, useState } from "react";
import { Steps, Collapse } from "antd";
import CancelProductModal from "@/components/WalletModal/CancelProductModal";
import Classes from "./OrderHistoryPage2.module.css";
import { IoMdDownload } from "react-icons/io";
import { Accordion, AccordionTab } from "primereact/accordion";
import LIfeTImeModal from "@/components/lifetimemodal/lifetimemodal";
import BuyBackRequiest from "@/components/BuyBackRequiest/BuyBackRequiest";
import AddBank from "@/components/lifetimemodal/addBank";
import axios from "axios";
import * as Urls from "@/utils/urls";
import SuccessPage from "@/components/SuccessPage/SuccessPage";
import TransferMoneyModal from "@/components/WalletModal/TransferMoneyModal";
import { TbLocationFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { Modal, Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
// import { useTrackOrder } from "@/providers/trackorder-provider";
import { useOrder } from "@/providers/order-provider";
import { useAuth } from "@/providers/auth-provider";

const OrderHistorypage2 = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  // const { orderDet, setOrderDet, address, setAddress } = useTrackOrder();
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
  const [orderid, setOrderid] = useState("");
  const [total, setTotal] = useState("");
  const [promoCode, setPromoCode] = useState(null);
  const [payMode, setPayMode] = useState("");
  const { token } = useAuth();
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
  const { setOrderData, orderData } = useOrder();
  const [countryId, setCountryId] = useState("");


  const [paymentDetails, setPaymentDetails] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
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
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: "center",
  };

  const handleClick = () => {
    const hyperlink =
      singleOrderData &&
      singleOrderData.order &&
      singleOrderData.order.shipment[0].product_bag &&
      singleOrderData.order.shipment[0].product_bag.hyperlink;
    if (hyperlink) {
      router.push(hyperlink);
    }
  };

  const onChange = (key) => {
    console.log(key);
  };
  // const { data } = location.state || {};
  // const { saleBill } = data || {};
  useEffect(() => {
    const storedCountryId = localStorage.getItem("id");
    if (storedCountryId) {
      setCountryId(storedCountryId);
    }
  }, []);

  useEffect(() => {
    if (countryId) {
      singleOrderDetails();
    }
  }, [countryId]);

  const singleOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${
          Urls.myOrder +
          "/" +
          orderData.productId +
          "?shipment_id=" +
          orderData.shipmentId
        }&country=${countryId}`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      if (response.data.results.status_code === 200) {
        setSingleOrderData(response.data.results.data);
        setOrderDet(response.data.results.data.order.shipment);
        setOrderid(response.data.results.data.order.id);
        setPayMode(response.data.results.data.order.payment_mode);
        setTotal(response.data.results.data.order.grand_total);
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
        setPromoCode(singleOrderData && singleOrderData.order.promocode);
        setPaymentDetails(
          singleOrderData &&
            singleOrderData.order &&
            singleOrderData.order.payment_data
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const homeHandler = () => {
    router.pushState("/");
  };
  const orderHistory = () => {
    router.push("/my/orders");
  };
  const rateRevHandler = (proId) => {
    console.log(proId);
    router.push({
      pathname: "/rate/review",
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

      const response = await axios.post(
        `${Urls.CancelOrder}?country=${countryId}`,
        body,
        {
          headers: { Authorization: "Token 	" + token },
        }
      );
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
      const response = await axios.post(
        `${Urls.CancelOrder}?country=${countryId}`,
        body,
        {
          headers: { Authorization: "Token 	" + token },
        }
      );
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

  const cancelProduct = async (reason, notes) => {
    try {
      const body = {
        product_id: orderDet[0].product.product_id,
        order_id: orderid,
        shipment_id: orderDet[0].id,
        total_amount: total,
        payment_mode: payMode,
        cancel_type: "final",
        reason: reason ? reason.name : "No reason selected",
        notes: notes || "No notes provided",
      };
      const response = await axios.post(
        `${Urls.CancelOrder}?country=${countryId}`,
        body,
        {
          headers: { Authorization: "Token " + token },
        }
      );
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
  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  console.log(
    "singleOrderData--->1233",
    singleOrderData &&
      singleOrderData.order &&
      singleOrderData.order.shipment[0] &&
      singleOrderData.order.shipment[0].invoice
  );

  const invoiceLink =
    singleOrderData &&
    singleOrderData.order &&
    singleOrderData.order.shipment[0] &&
    singleOrderData.order.shipment[0].invoice;
  const handleDownloadClick = () => {
    if (invoiceLink) {
      const corsProxy = "https://thingproxy.freeboard.io/fetch/"; // Alternative CORS proxy
      const invoiceUrl = corsProxy + invoiceLink;

      fetch(invoiceUrl, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) {
            console.error(
              "Response status:",
              response.status,
              response.statusText
            );
            throw new Error("Error fetching the file");
          }
          return response.blob();
        })
        .then((blob) => {
          const contentType = blob.type;
          const fileExtension = contentType.split("/")[1].toLowerCase(); // Extract extension from mime type

          const fileName = `Invoice.${fileExtension}`; // Use the correct file extension
          const blobUrl = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;
          link.click();

          URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.error("Error downloading the file:", error);
          alert(
            "There was an error downloading the invoice. Please try again later."
          );
        });
    } else {
      // Open modal if invoice is unavailable
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 5000);
    }
  };

  const closeModal = () => setModalOpen(false);
  const statusCode =
    singleOrderData &&
    singleOrderData.order &&
    singleOrderData.order.shipment[0] &&
    singleOrderData.order.shipment[0].status;
  const cancelButtonTrack =
    singleOrderData &&
    singleOrderData.order &&
    singleOrderData.order.shipment[0] &&
    singleOrderData.order.shipment[0].cancel_button_track;
  const orderDate =
    singleOrderData.order &&
    singleOrderData.order.track_order_details &&
    singleOrderData.order.track_order_details &&
    singleOrderData.order.track_order_details.order_confirmed;

  const moneyDetail =
    singleOrderData &&
    singleOrderData.order &&
    singleOrderData.order.payment_data;


  return (
    <div>
      <div className={Classes.Background}>
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

        <AddBank open={addBankOpen} handleClose={() => setAddBankOpen(false)} />
        <TransferMoneyModal
          open={transferModalOpen}
          handleClose={() => setTransferModalOpen(false)}
        />
        <CancelProductModal
          open={cancelProductModal}
          handleClose={() => {
            setCancelProductModal(false);
            setError("");
          }}
          cancelProduct={cancelProduct}
          error={error}
          setError={setError}
          cancelButtonTrack={cancelButtonTrack}
        />

        <div>
          <div className={`container ${Classes.OrderMobCont}`}>
            <div className={`container ${Classes.OrderMobCont2}`}>
              <div className={Classes.Main}>
                {/* <h1 className={Classes.Title}>Shipment Details</h1>
                <h3 className={Classes.orderidh3}>
                  Order ID :{" "}
                  {singleOrderData &&
                    singleOrderData.order &&
                    singleOrderData.order.order_code}
                </h3> */}
                {/* <h3 className={Classes.orderidh3}>
                  {saleBill && <>Order ID: {saleBill}</>}
                </h3> */}
                {singleOrderData &&
                  singleOrderData.order &&
                  singleOrderData.order.shipment[0].cancel_order && (
                    <>
                      {(statusCode == 0 ||
                        statusCode == 2 ||
                        statusCode == 9) &&
                      singleOrderData.order.shipment[0].cancel_order !==
                        "Admin Approval pending" ? (
                        <div className={Classes.DeliveryDetails}>
                          <p>
                            {/* <img src={deliveryimg} alt="deliveryimg" /> */}
                            {/* Delivered on <span>26 may 2023</span> */}
                          </p>
                        </div>
                      ) : (
                        <div className={Classes.DeliveryDetails}>
                          <p>
                            <Image
                              src={`/Assets/delivery.png`}
                              alt="deliveryimg"
                              width={20}
                              height={20}
                            />
                            <span style={{ color: "red" }}>cancelled</span>
                          </p>
                        </div>
                      )}
                    </>
                  )}
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
                              {address.house} ( house ) <br /> {address.area}{" "}
                              <br /> {address.city} district <br />{" "}
                              {address.state} {address.pincode}
                            </p>
                            <p className={Classes.phoneSh}>
                              <IoCall className={Classes.phoneicons} />
                              Phone number : {address.phone_number}
                            </p>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab
                        header="Product Details"
                        style={{ paddingBottom: "0px!important" }}
                      >
                        <div className={Classes.ProductDetailsParent1}>
                          <div className={Classes.LftProductDetail}>
                            <img
                              src={
                                productDetails[0] &&
                                productDetails[0].product.thumbnail_image
                              }
                              alt="thumbnail_image"
                              style={{ maxWidth: "121px" }}
                            />
                            <div>
                              <p className={Classes.PDiamond1}>
                                {productDetails[0] &&
                                  productDetails[0].product.product_name}
                              </p>
                              <p style={{ color: "#757C81" }}>
                                {productDetails[0] &&
                                  productDetails[0].product.carat}{" "}
                                &nbsp;
                                {productDetails[0] &&
                                productDetails[0].color.colour_name
                                  ? productDetails[0].color.colour_name
                                      .charAt(0)
                                      .toUpperCase() +
                                    productDetails[0].color.colour_name.slice(1)
                                  : ""}
                                &nbsp;
                                {/* {productDetails[0] &&
                                  productDetails[0].color.size_name}{" "} */}
                                {productDetails[0] &&
                                  productDetails[0].product.gross_weight}
                                &nbsp; G
                              </p>
                              <p style={{ color: "#757C81" }}>
                                {productDetails[0] &&
                                productDetails[0].product.product_name
                                  ? productDetails[0].product.product_name
                                      .charAt(0)
                                      .toUpperCase() +
                                    productDetails[0].product.product_name
                                      .slice(1)
                                      .toLowerCase()
                                  : ""}
                                &nbsp;
                                {productDetails[0] &&
                                  productDetails[0].product
                                    .diamond_weight_preview}{" "}
                                {productDetails[0] &&
                                  productDetails[0].product.carat}{" "}
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
                        {singleOrderData &&
                          singleOrderData.order &&
                          singleOrderData.order.shipment[0].product_bag && (
                            <div
                              className={Classes.bag_details_part}
                              style={{
                                display: "flex",
                                marginLeft: "140px",
                                marginTop: "10px",
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              {singleOrderData.order.shipment[0].product_bag
                                .barcode && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Barcode
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.barcode
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .gross_weight && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Gross Weight
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.gross_weight
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .diamond_weight && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Diamond Weight
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.diamond_weight
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .no_of_diamonds && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    No of Diamonds
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.no_of_diamonds
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .net_metal && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Net Metal
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.net_metal
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .diamond_type && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Diamond Type
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.diamond_type
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .cls_weight && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    CLS Weight
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.cls_weight
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .no_of_color_stone && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    No.of colour stone
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.no_of_color_stone
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}

                              {singleOrderData.order.shipment[0].product_bag
                                .metal_type_color && (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className={Classes.bag_details_span1}>
                                    Metal Type / Color
                                  </span>
                                  <div
                                    style={{
                                      width: "50%",
                                      display: "flex",
                                      alignItems: "start",
                                    }}
                                  >
                                    <span className={Classes.bag_details_span2}>
                                      {
                                        singleOrderData.order.shipment[0]
                                          .product_bag.metal_type_color
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        <div className={Classes.crtn1}>
                          <p>
                            Certification No :{" "}
                            <span
                              style={{ color: "#0997E7", cursor: "pointer" }}
                              onClick={handleClick}
                            >
                              {/* {orderDet[0].docket_number} */}
                              {singleOrderData &&
                                singleOrderData.order &&
                                singleOrderData.order.shipment[0].product_bag &&
                                singleOrderData.order.shipment[0].product_bag
                                  .certification_number}
                            </span>
                          </p>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Payment Details">
                        <div className={Classes.parentPaymentItems}>
                          <div className={Classes.PaymentItems}>
                            <p>Item Subtotal</p>
                            <p>{moneyDetail && moneyDetail.itemsubtotal}</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Shipping</p>
                            <p>{moneyDetail && moneyDetail.shipping}</p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Total</p>
                            <p>
                              {moneyDetail &&
                              moneyDetail &&
                              moneyDetail &&
                              moneyDetail.total
                                ? moneyDetail && moneyDetail.total
                                : 0}
                            </p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Promo code</p>
                            <p style={{ color: "#000000" }}>
                              PAYDAY{" "}
                              <span
                                style={{
                                  color:
                                    promoCode === null ? "#FF0000" : "#30933A",
                                }}
                              >
                                {promoCode === null ? "Not Applied" : "Applied"}
                              </span>
                            </p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p>Coupon Discount</p>
                            <p style={{ color: "#000000" }}>
                              {moneyDetail && moneyDetail.coupon_discount
                                ? moneyDetail && moneyDetail.coupon_discount
                                : 0}
                            </p>
                          </div>
                          <div className={Classes.PaymentItems}>
                            <p style={{ color: "#000000" }}>Payable</p>
                            <p style={{ color: "#000000" }}>
                              {moneyDetail && moneyDetail.payable}
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
                              {singleOrderData.order &&
                                singleOrderData.order.track_order_details &&
                                singleOrderData.order.track_order_details &&
                                singleOrderData.order.track_order_details
                                  .order_type === "ecom" && (
                                  <>
                                    <div
                                      className={Classes.dotstatus1}
                                      style={{
                                        background:
                                          singleOrderData.order &&
                                          singleOrderData.order
                                            .track_order_details &&
                                          singleOrderData.order
                                            .track_order_details &&
                                          singleOrderData.order
                                            .track_order_details.shipped
                                            ? "#0eb533"
                                            : "#d9d9d9",
                                        border: "none",
                                      }}
                                    ></div>
                                    <div
                                      className={Classes.dotstatusline1}
                                      style={{
                                        background:
                                          singleOrderData.order &&
                                          singleOrderData.order
                                            .track_order_details &&
                                          singleOrderData.order
                                            .track_order_details &&
                                          singleOrderData.order
                                            .track_order_details.shipped
                                            ? "#0eb533"
                                            : "#d9d9d9",
                                      }}
                                    ></div>
                                  </>
                                )}
                            </div>
                            <div className={Classes.leftStatus2}>
                              <div
                                className={Classes.dotstatus1}
                                style={{
                                  background:
                                    singleOrderData.order &&
                                    singleOrderData.order.track_order_details &&
                                    singleOrderData.order.track_order_details &&
                                    singleOrderData.order.track_order_details
                                      .delivery
                                      ? "#0eb533"
                                      : "#d9d9d9",
                                }}
                              ></div>
                              {/* <div className={Classes.dotstatusline1}></div> */}
                            </div>
                            {/* <div className={Classes.leftStatus2}>
                              <div className={Classes.dotstatus1}></div>
                            </div> */}
                          </div>
                          <div className={Classes.rightStatus1}>
                            <div className={Classes.RightStausshow}>
                              <p className={Classes.RsHead}>Order confirmed</p>
                              <p style={{ color: "#A3A7AB" }}>
                                {formatDate(orderDate)}
                              </p>
                            </div>

                            {singleOrderData.order &&
                              singleOrderData.order.track_order_details &&
                              singleOrderData.order.track_order_details &&
                              singleOrderData.order.track_order_details
                                .order_type === "ecom" && (
                                <div className={Classes.RightStausshow}>
                                  <p
                                    style={{ color: "#A3A7AB" }}
                                    className={Classes.RsHead}
                                  >
                                    Shipped
                                  </p>
                                  {/* <p style={{ color: "#A3A7AB" }}>
                                  Expected by Friday 19th Oct
                                </p> */}
                                </div>
                              )}
                            {/* <div className={Classes.RightStausshow2}>
                              <p
                                style={{ color: "#A3A7AB" }}
                                className={Classes.RsHead}
                              >
                                Out of delivery
                              </p>
                              <p style={{ color: "#A3A7AB" }}></p>
                            </div> */}
                            <div
                              className={Classes.RightStausshow3}
                              style={{ position: "relative", top: "3px" }}
                            >
                              <p
                                style={{ color: "#A3A7AB" }}
                                className={Classes.RsHead}
                              >
                                Delivery
                              </p>
                              {/* <p style={{ color: "#A3A7AB" }}>
                                  Expected by Friday 19th Oct
                                </p> */}
                            </div>
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                  <div className={Classes.TrackButtons}>
                    {
                      // singleOrderData &&
                      //   singleOrderData.order &&
                      //   singleOrderData.order.shipment &&
                      //   singleOrderData.order.shipment[0].status
                      cancelButtonTrack == "Delivered" && (
                        <button
                          className={Classes.REButton}
                          onClick={() => fetchLteLbbDetails()}
                        >
                          Return / Exchange
                        </button>
                      )
                    }

                    {/* {(statusCode == 0 || statusCode == 2 || statusCode == 9) &&
                      singleOrderData.order.shipment[0].cancel_order !==
                        "Admin Approval pending" && (
                        <div className={Classes.CancelProductButton}>
                          <button onClick={() => setCancelProductModal(true)}>
                            Cancel product
                          </button>
                        </div>
                      )} */}
                    {(cancelButtonTrack == "Ordered" ||
                      cancelButtonTrack == "Shipped") && (
                      <div className={Classes.CancelProductButton}>
                        <button onClick={() => setCancelProductModal(true)}>
                          Cancel product
                        </button>
                      </div>
                    )}
                    <button
                      className={Classes.REButton2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      // onClick={() => setBuyBackOpen(true)}
                      // onClick={() => setSuccessModalOpen(true)}
                      onClick={handleDownloadClick}
                    >
                      <IoMdDownload /> Download invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* modal */}
              <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="invoice-unavailable-title"
                aria-describedby="invoice-unavailable-description"
              >
                <Box sx={modalStyles}>
                  <Typography
                    id="invoice-unavailable-title"
                    variant="h6"
                    mb={2}
                  >
                    Invoice Available in 24hr
                  </Typography>
                  <Typography
                    id="invoice-unavailable-description"
                    variant="body2"
                    mb={3}
                  >
                    Please try again later.
                  </Typography>
                  {/* <Button variant="outlined" onClick={closeModal}>
                    Close
                  </Button> */}
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistorypage2;
