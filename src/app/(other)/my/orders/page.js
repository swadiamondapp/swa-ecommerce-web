"use client";
import React, { useState, useEffect } from "react";
import Classes from "@/components/OrderHistory/OrderHistoryCard/OrderHistoryCard.module.css";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import OrderHiistoryCard from "@/components/OrderHistory/OrderHistoryCard/OrderHistoryCard";
import Orders from "@/components/OrderHistory/OrderHistoryCard/Orders/Orders";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useOrder } from "@/providers/order-provider";
import { useCountry } from "@/providers/country-provider";
import { useAuth } from "@/providers/auth-provider";
import Feature from "@/components/features/features";
import { useCart } from "@/providers/cart-provider";

const OrderHistoryPage = () => {
  const { countryId } = useCountry();
  const { fetchCart } = useCart();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setOrderData } = useOrder();

  const { token } = useAuth();

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  useEffect(() => {
    if (token && countryId) {
      getOrders();
    }
  }, [token, countryId]);

  const getOrders = async () => {
    setLoading(true);
    axios
      .get(`${Urls.myOrder}?country=${countryId}`, {
        headers: { Authorization: "Token 	" + token },
      })
      .then((response1) => {
        setLoading(false);
        setOrderList(response1.data.results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const productViewHandler = (id, shipmentId) => {
    setOrderData({ productId: id, shipmentId });
    router.push("/track/orders");
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
      return (
        <OrderHiistoryCard
          OrderId="SWA4R46RF46R356F45"
          OrderedTime="Ordered on 12th auguest 2021"
          key={index}
        >
          <Orders
            Image={item.shipments}
            ShipmentStatus={item.shipments && item.shipments.shipment_status}
            productId={item.shipments && item.shipments.product_id}
            productName={item.shipments && item.shipments.product_name}
            orderId={item.order_code}
            rating={item.shipments[0] && item.shipments[0].product_rating}
            promCond={item.promocode === null ? "Not Applied" : "Applied"}
            address={item.address_name}
            ProductDate={item.status}
            Price={item.grand_total}
            Qty="4"
            clicked={() =>
              productViewHandler(item.id, item.shipments[0].shipment_id)
            }
            currentId={item.id}
            allData={item}
          />
        </OrderHiistoryCard>
      );
    });
  }

  return (
    <>
      <div className={Classes.Background + " py-2"}>
        <OrderHistory>{orderLists}</OrderHistory>
      </div>
      <Feature />
    </>
  );
};

export default OrderHistoryPage;
