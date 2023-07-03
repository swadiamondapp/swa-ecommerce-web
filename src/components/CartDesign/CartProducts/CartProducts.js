import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import WishListTag from "../../../Assets/WishListTag.png";
import { BiRupee } from "react-icons/bi";
import Classes from "../CartDesign.module.css";

function CartProducts(props) {
  return (
    <div>
      <div className={Classes.CartItems}>
        <div className="container">
          <div className="row">
            <div className={`${"col-md-12"} ${"col-lg-4"}`}>
              <div className={Classes.Products}>
                <img
                  className={Classes.ProductImage}
                  src={props.ProductImage}
                  alt=" "
                />
              </div>
            </div>
            <div className={`${"col-md-12"} ${"col-lg-8"}`}>
              <div className={Classes.ProductDetails}>
                <p>{props.ProductName}</p>
              </div>
              <div className={Classes.Price}>
                <p className={Classes.PriceNew}>
                  <BiRupee className={Classes.BiRupee} size={25} />
                  {props.NewPrice}
                </p>
                {props.discound ? (
                  <p className={Classes.PriceOld}>
                    <BiRupee className={Classes.BiRupee} size={25} />
                    {props.OldPrice}
                  </p>
                ) : null}
              </div>
              {props.discound ? (
                <p className={Classes.SavedMoney}>
                  Hurray! You have saved{" "}
                  <BiRupee
                    className={Classes.Rupee}
                    size={15}
                    color="#30933A"
                  />
                  {props.disPrice.toFixed(2)}
                </p>
              ) : null}
              <p className={Classes.ProductProperty}>
                {props.Property} | {props.DiamondProperty}
              </p>
              <p className={Classes.Quantity}>Quantity : {props.quanty}</p>
            </div>
          </div>
        </div>
        <div className={Classes.Delivery}>
          <TbTruckDelivery size={20} color="#30933A" />
          <p className={Classes.DeliveryExpected}>{props.DeliveryDate}</p>
        </div>
        <div className={Classes.RemoveMove}>
          <div className={Classes.Remove}>
            <RiDeleteBin5Line
              size={20}
              onClick={props.remove}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p
            className={Classes.Delete}
            onClick={props.remove}
            style={{ cursor: "pointer" }}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartProducts;
