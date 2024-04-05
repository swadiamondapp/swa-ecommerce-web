import React, { useState, useEffect } from "react";
import NewArrivalCard from "../../components/NewArrivals/NewArrivalCard/NewArrivalCard";
import Footer from "../../components/Footer/Footer";
import NewArrivalDesign from "../../components/NewArrivalDesign/NewArrivalDesign";
import DownloadOurAppImage from "../../components/DownloadOurAppImage/DownloadOurAppImage";
import Filter from "../../components/Filter/FilterCatg";
import Classes from "./NewArrivalPage.module.css";
import * as Urls from "../../Urls";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import Header from "../../components/HeaderNew/Header";
import FilterMobile from "../../components/Filter/FilterMobile";
import Features from "../../components/Features/Features";
import FilterModal from "../../components/LifeTImeModal/FilterModal";
import SliderFeature from "../../components/ProductDetails/SliderFeature";

const NewArrivalPage = (props) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catgSet, setCatSet] = useState("");
  const [color, setColor] = useState("");
  const [head, setHead] = useState("");
  const [occn, setOccn] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [metal, setMetal] = useState("");
  const [sort, setSort] = useState("");
  const [cartCount, setCartCount] = useState("");
  const [labelSet, setLabelSet] = useState([]);
  const [num, setNum] = useState("");
  const [count, setCount] = useState("");
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("swaToken");
  const productCategory = props.location.state.product_category;
  // const categoryName = props.location.state.categoryName
  const filter = (newArrive, currentPage) => {
    setLoading(true);
    axios
      .get(
        Urls.productList + newArrive,
        token && {
          headers: { Authorization: "Token " + token },
        }
      )
      .then((response1) => {
        setLoading(false);
        // const productList = [...response1.data.results.data]
        // const sortedProducts = [...productList].sort((a, b) => a.total_price_final - b.total_price_final);
        setProduct(response1.data.results.data);
        setCount(response1.data.results.count);
        setPageCount(Math.ceil(response1.data.results.count / 20));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const prodDetHandler = (prodItem) => {
    history.push({
      pathname:
        "/products/" +
        prodItem.product_id +
        "/" +
        prodItem.thumbnail_colour_id +
        "/" +
        prodItem.product_name,
      state: { data: prodItem },
    });
  };
  const handlePageClick = (data) => {
    setNum(data.selected);
    window.scrollTo(0, 0);

    if (
      occn.length !== 0 ||
      color.length !== 0 ||
      catgSet.length !== 0 ||
      metal.length !== 0 ||
      sort.length !== 0
    ) {
      console.log("test");
      filter(
        "?occasion_tag_ids=" +
          occn +
          "&color_ids=" +
          color +
          "&category_ids=" +
          catgSet +
          "&metal_type=" +
          metal +
          "&sort=" +
          sort,
        data.selected + 1
      );
    } else if (props.location.state.data === "new") {
      filter('?filter_type="new&sort=' + sort, data.selected + 1);
    } else if (props.location.state.data === "top") {
      filter('?filter_type="top&sort=' + sort, data.selected + 1);
    } else if (props.location.state.data === "filMin") {
      filter("?max_price=" + props.location.state.price, data.selected + 1);
    }
  };
  const cartsCount = () => {
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props.location.state.data);

    if (props.location.state.data === "new") {
      filter('?filter_type="new', 1);
      setHead("New Arrivals");
      cartsCount();
    } else if (props.location.state.data === "top") {
      filter('?filter_type="top', 1);
      setHead("Top Demanded Items");
      cartsCount();
    } else if (props.location.state.data === "filMin") {
      filter("?max_price=" + props.location.state.price, 1);
      setHead("Under " + props.location.state.price);
      cartsCount();
    } else if (props.location.state.data === "occation") {
      filter("?occasion_tag_ids=" + props.location.state.octnId, 1);
      setHead("Products");
      setOccn(props.location.state.octnId);
    } else if (props.location.state.data !== undefined) {
      filter("?category_ids=" + props.location.state.data, 1);
      setCatSet(props.location.state.data);
      setHead("Products");
    }
  }, []);
  const filterCatHandler = (filtSet) => {
    let delimiter = ", ";
    let catSet = "";
    let catLabel = [];
    for (let i = 0; i < filtSet.length; i++) {
      catSet += filtSet[i].id;
      catLabel.push(filtSet[i].label);
      if (i < filtSet.length - 1) {
        catSet += delimiter;
      }
      setCatSet(catSet);
    }
    setLabelSet(catLabel);

    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catSet +
        "&metal_type=" +
        metal +
        "&sort=" +
        sort,
      1
    );
  };
  const filtColorHandler = (colSets) => {
    let delimiter = ", ";
    let colSet = "";
    let colLabel = [];
    for (let i = 0; i < colSets.length; i++) {
      colSet += colSets[i].id;
      colLabel.push(colSets[i].label);
      if (i < colSets.length - 1) {
        colSet += delimiter;
      }
      setColor(colSet);
    }
    setLabelSet(colLabel);
    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        colSet +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metal +
        "&sort=" +
        sort,
      1
    );
  };
  const filtOcctnHandler = (octnsTag) => {
    let delimiter = ", ";
    let octnSet = "";
    let occnLabel = [];
    for (let i = 0; i < octnsTag.length; i++) {
      octnSet += octnsTag[i].id;
      occnLabel.push(octnsTag[i].label);
      if (i < octnsTag.length - 1) {
        octnSet += delimiter;
      }
      setOccn(octnSet);
    }
    setLabelSet(occnLabel);
    filter(
      "?occasion_tag_ids=" +
        octnSet +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metal +
        "&sort=" +
        sort,
      1
    );
  };
  const filterMetalHanlder = (metalTag) => {
    let delimiter = ", ";
    let metalSet = "";
    let metaLabel = [];
    for (let i = 0; i < metalTag.length; i++) {
      metalSet += metalTag[i].id;
      metaLabel.push(metalTag[i].label);
      if (i < metalTag.length - 1) {
        metalSet += delimiter;
      }
      setMetal(metalSet);
    }
    setLabelSet(metalSet);
    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metalSet +
        "&sort=" +
        sort,
      1
    );
  };
  const deltLbel = (indx) => {
    let arrayDlt = [...labelSet];
    arrayDlt.splice(indx, 1);
    setLabelSet(arrayDlt);
  };
  const cartAddHandler = (product) => {
    const body = {
      product_id: product.product_id,
      color_id: product.colour_id,
      size_id: 1,
      quantity: 1,
    };

    axios
      .post(Urls.cart, body, { headers: { Authorization: "Token " + token } })
      .then((response1) => {
        if (response1.data.results.message === "item added") {
          let count = cartCount;
          count = count + 1;
          setCartCount(count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sortsHHandler = (e) => {
    // console.log("......?", e.target.value);
    setSort(e.target.value);
    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metal +
        "&sort=" +
        e.target.value +
        "&filter_type=" +
        e.target.value,
      1
    );
    // setLoading(true);
    // axios
    //   .get(Urls.productList + "?sort=" + e.target.value)
    //   .then((response1) => {
    //     setLoading(false);
    //     setProduct(response1.data.results.data);
    //     setPageCount(Math.ceil(response1.data.results.count / 20));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  // mobile sort
  const sortsHHandler2 = (selectedSort, selectedPopular) => {
    console.log("......?", selectedPopular);
    // setSort(selectedSort);
    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metal +
        "&sort=" +
        selectedSort +
        "&filter_type=" +
        selectedPopular,
      1
    );
  };
  // price filter modal
  const sortsHHandlerPrice = (selectedPriceRange) => {
    // setSort(selectedSort);
    filter(
      "?occasion_tag_ids=" +
        occn +
        "&color_ids=" +
        color +
        "&category_ids=" +
        catgSet +
        "&metal_type=" +
        metal +
        "&price_range=" +
        selectedPriceRange,

      1
    );
  };

  let products;
  if (loading) {
    products = (
      <div className="d-flex justify-content-center align-items-center loader">
        {" "}
        <FadeLoader color="#00464d" />
      </div>
    );
  } else if (product.length === 0) {
    products = (
      <div className="d-flex justify-content-center align-items-center loader">
        No data found
      </div>
    );
  } else {
    products = product.map((item, index) => {
      return (
        <NewArrivalCard
          ProductImage={item.thumbnail_image}
          ProductName={item.product_name}
          ProductId={"SKU:" + item.sku}
          cartSddHandler={() => prodDetHandler(item)}
          PriceNew={
            item.is_on_discount
              ? item.discounted_final_price
              : item.total_price_final
          }
          PriceOld={item.is_on_discount ? item.total_price_final : null}
          key={index}
          Discount={
            item.discount_percentage !== null
              ? item.discount_percentage + "%OFF"
              : item.discount_percentage
          }
          clicked={() => prodDetHandler(item)}
          wishAct={item.wishlist_id}
          prodet={item}
        />
      );
    });
  }

  return (
    <div>
      <div className={Classes.Page}>
        <Header countCartItems={cartCount} />
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-4">
              <Filter
                filterCatg={filterCatHandler}
                filterColr={filtColorHandler}
                filterOctn={filtOcctnHandler}
                filterMetal={filterMetalHanlder}
                filterSearch={props.location.state}
                setProduct={setProduct}
              />
            </div>
            <div className="col-lg-9 col-sm-8">
              <div className={Classes.Products}>
                <NewArrivalDesign
                  head={head}
                  labArry={labelSet}
                  deltLabel={deltLbel}
                  sortHandler={sortsHHandler}
                  count={count}
                  categoryName={productCategory}
                >
                  {/* <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    forcePage={num}
                    pageCount={pageCount}
                    previousLabel="<  Prev"
                    renderOnZeroPageCount={null}
                    containerClassName={
                      "pagination justify-content-start pageout"
                    }
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

                  {products}
                </NewArrivalDesign>
                {/* <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  forcePage={num}
                  pageCount={pageCount}
                  previousLabel="<  Prev"
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
                {/* <FilterMobile /> */}
                <FilterModal
                  head={head}
                  labArry={labelSet}
                  deltLabel={deltLbel}
                  sortHandler={sortsHHandler2}
                  sortHandlerPrice={sortsHHandlerPrice}
                  count={count}
                  categoryName={productCategory}
                  setProduct={setProduct}
                >
                  {" "}
                  {products}
                </FilterModal>
              </div>

              <div className={Classes.DownloadOurAppImage}>
                <div className={Classes.NewArrivalsPage}>
                  <DownloadOurAppImage />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SliderFeature />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default NewArrivalPage;
