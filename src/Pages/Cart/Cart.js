import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Footer from "../../components/Footer/Footer";
import CartProducts from "../../components/CartDesign/CartProducts/CartProducts";
import CartDesign from "../../components/CartDesign/CartDesign";
import Features from "../../components/Features/Features";
import Classes from "./Cart.module.css";
import axios from "axios";
import * as Urls from "../../Urls";
import ReactPaginate from "react-paginate";
import { FadeLoader } from "react-spinners";
import cartEmpty from "../../Assets/cartempty.png";

import ConformModal from "../../components/confromModal/confromModal";
import WalletModal from "../../components/WalletModal/WalletModal";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const Cart = () => {
  const [cartCount, setCartCount] = useState("");
  const [cartList, setCartList] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [show, setShow] = useState(false);
  const [img, setSelImg] = useState("");
  const [selId, setSelId] = useState("");
  const [selProAmnt, setSelProAmnt] = useState(0);
  const [productId, setProdctId] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountPay, setAmountPay] = useState("");
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    setLoading(true);
    axios
      .get(Urls.cart, { headers: { Authorization: "Token " + token } })
      .then((response1) => {
        setLoading(false);
        console.log("response1--->", response1);
        if (response1.data.results.messege === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.data.cartmaster.item_count);
        }
        setPageCount(response1.data.results.count / 20);
        setCartList(response1.data.results.data.cart_item);
        setAmountPay(response1.data.results.data.cartmaster.grand_total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageClick = (data) => {
    setLoading(true);
    let page = data.selected + 1;
    axios
      .get(Urls.cart + "?page=" + page, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        setCartCount(response1.data.results.count);
        setPageCount(response1.data.results.count / 20);
        setCartList(response1.data.results.data.cart_item);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCloseHandler = () => {
    setShow(false);
  };
  const removeCartHandler = (selItem) => {
    setSelProAmnt(selItem.items_total.toFixed(2));
    setSelImg(selItem.thumbnail_image);
    setSelId(selItem.id);
    setProdctId(selItem.product.id);
    setShow(true);
  };
  const removeHandler = (selids) => {
    setLoading(true);
    setShow(false);
    const index = cartList.findIndex((obj) => obj.id === selids);
    axios
      .delete(Urls.cart + selids + "/", {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        let cartNewArray = [];
        cartNewArray = [...cartList];
        cartNewArray.splice(index, 1);
        setCartList(cartNewArray);
        let count = cartCount;
        count = count - 1;
        setCartCount(count);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const movWishList = (selids) => {
    setShow(false);
    setLoading(true);
    const index = cartList.findIndex((obj) => obj.id === selids);
    axios
      .delete(Urls.cart + selids + "/", {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        setLoading(false);

        const body = {
          product_id: productId,
        };

        axios
          .post(Urls.wishlist, body, {
            headers: { Authorization: "Token " + token },
          })
          .then((response1) => {
            setLoading(false);
            setShow(false);
            let count = cartCount;
            count = count - 1;
            setCartCount(count);
            let cartNewArray = [];
            cartNewArray = [...cartList];
            cartNewArray.splice(index, 1);
            setCartList(cartNewArray);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let cartLists;
  if (loading) {
    cartLists = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else if (cartList.length === 0) {
    cartLists = (
      <div className="container contBg">
        <div className=" d-flex justify-content-center align-items-center loader">
          <div className="col-md-6">
            <div className={Classes.cartEmpty}>
              <img src={cartEmpty} alt="cartEmpty" />
            </div>
            <h3 className={Classes.cartListHead}>Your Cart page is empty</h3>
            <p className={Classes.cartPara}>
              Currently, there are no items in the cart. Have no worries, Keep
              surfing until you find your favorite ornaments. From wishlist to
              the cart, We wish you ‘Happy Shopping’.{" "}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    cartLists = (
      <>
        <CartDesign
          amount={amountPay}
          cartProAmnt={selProAmnt}
          // handleOpen={() => setWalletOpen(true)}
        >
          {cartList.map((item, index) => {
            return (
              <CartProducts
                key={index}
                remove={() => removeCartHandler(item)}
                ProductImage={item.thumbnail_image}
                ProductName={item.product.product_name}
                NewPrice={
                  item.product.is_on_discount
                    ? item.product.discounted_final_price
                    : item.product.total_price_final
                }
                OldPrice={item.product.total_price_final}
                discound={item.product.is_on_discount}
                disPrice={
                  item.product.is_on_discount
                    ? item.product.total_price_final -
                      item.product.discounted_final_price
                    : null
                }
                Property={
                  // item.description.carat +
                  " KT " +
                  // item.description.colour_name +
                  " " +
                  // item.description.gross_weight +
                  " GM "
                }
                DiamondProperty={
                  "Diamond "
                  // + item.description.diamond_weight_preview + " GM"
                }
                Size=""
                quanty={item.quantity}
                DeliveryDate="Delivery by tue oct 18"
              />
            );
          })}
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
            containerClassName={"pagination justify-content-end pageout"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          /> */}
        </CartDesign>
      </>
    );
  }

  return (
    <div>
      <div className={Classes.Background}>
        <Header countCartItems={cartCount} />
        <ConformModal
          handleClose={handleCloseHandler}
          title="Move from bag"
          img={img}
          movWish={() => movWishList(selId)}
          remove={() => removeHandler(selId)}
          body="Are you sure that you want to move 
        this item from the cat?"
          shows={show}
        />

        {cartLists}

        <div className={Classes.Features}>
          <SliderFeature />
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;

// const { products } = data;
// const [cartItems, setCartItems] = useState([]);
// const onAdd = (product) => {
//   const exist = cartItems.find((x) => x.id === product.id);
//   if (exist) {
//     setCartItems(
//       cartItems.map((x) =>
//         x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
//       )
//     );
//   } else {
//     setCartItems([...cartItems, { ...product, qty: 1 }]);
//   }
// };
// const onRemove = (product) => {
//   const exist = cartItems.find((x) => x.id === product.id);
//   if (exist.qty === 1) {
//     setCartItems(cartItems.filter((x) => x.id !== product.id));
//   } else {
//     setCartItems(
//       cartItems.map((x) =>
//         x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
//       )
//     );
//   }
// }
