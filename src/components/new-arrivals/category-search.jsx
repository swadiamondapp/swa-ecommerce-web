import React, { useState, useEffect } from "react";
import NewArrivalCard from "../../components/NewArrivals/NewArrivalCard/NewArrivalCard";
import Footer from "../Footer/Footer";
import NewArrivalDesign from "../NewArrivalDesign/NewArrivalDesign";
import DownloadOurAppImage from "../../components/DownloadOurAppImage/DownloadOurAppImage";
import Filter from "../filter/filter-category";
import Classes from "./NewArrivalPage.module.css";
import * as Urls from "../../Urls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import Header from "../../components/HeaderNew/Header";
import useCanonicalTag from "../../useCanonicalTag";

const CategorySearch = (props) => {
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
  const [count, setCount] = useState("");
  const [labelSet, setLabelSet] = useState([]);
  const [num, setNum] = useState("");
  // const countryId = localStorage.getItem("id");

  const history = useHistory();
  // const token = localStorage.getItem("swaToken");
  const [token, setToken] = useState(null);
  const [countryId, setCountryId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("swaToken");
    const countryId = localStorage.getItem("id");
    setToken(token);
    setCountryId(countryId);
  }, []);
  const filter = (newArrive, currentPage) => {
    setLoading(true);
    axios
      .get(`${Urls.productList + newArrive}&country=${countryId}`)
      .then((response1) => {
        setLoading(false);
        // const productList = [...response1.data.results.data]
        // const sortedProducts = [...productList].sort((a, b) => a.country_total_price - b.country_total_price);
        setProduct(response1.data.results.data);
        setCount(response1.data.results.count);
        setPageCount(Math.ceil(response1.data.results.count / 20));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const prodDetHandler = (prodItem) => {
    // history.push({
    //   pathname:
    //     "/products/" +
    //     prodItem.product_id +
    //     "/" +
    //     prodItem.thumbnail_colour_id +
    //     "/" +
    //     prodItem.product_name,
    //   state: { data: prodItem },
    // });
    sessionStorage.setItem(
      "productDetails",
      JSON.stringify({
        id: prodItem.product_id,
        color: prodItem.colour_id,
        name: prodItem.product_name,
      })
    );
    history.push({
      pathname: "/jewellery/" + prodItem.alias,
      state: { data: prodItem },
    });
  };
  const handlePageClick = (data) => {
    setNum(data.selected);
    window?.scrollTo(0, 0);

    if (
      occn.length !== 0 ||
      color.length !== 0 ||
      catgSet.length !== 0 ||
      metal.length !== 0 ||
      sort.length !== 0
    ) {
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
    }
  };
  const cartsCount = () => {
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
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
    window?.scrollTo(0, 0);

    filter("?category_ids=" + props.match.params.id, 1);
    setCatSet(props.match.params.id);
    setHead("Product List");
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
      .post(`${Urls.cart}?country=${countryId}`, body, {
        headers: { Authorization: "Token " + token },
      })
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
    setSort(e.target.value);
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
        e.target.value,
      1
    );
    // setLoading(true);
    // axios
    //   .get(Urls.productList + "?sort=" + e.target.value)
    //   .then((response1) => {
    //     setLoading(false);
    //     setProduct(response1.data.results.data);
    //     setPageCount(response1.data.results.count / 2);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  let products;
  let categoryName;
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
      categoryName = item.category.name;
      console.log("ringssssssss", product);
      return (
        <NewArrivalCard
          ProductImage={item.thumbnail_image}
          ProductName={item.product_name}
          ProductId={"SKU:" + item.sku}
          cartSddHandler={() => prodDetHandler(item)}
          PriceNew={
            item.is_on_discount
              ? item.country_discount_price
              : item.country_total_price
          }
          PriceOld={item.is_on_discount ? item.country_total_price : null}
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

  // const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");
  const Contryname = localStorage.getItem("country_name");
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  return (
    <div>
      <div className={Classes.Page}>
        <Header
          countCartItems={cartCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-sm-4">
              <Filter
                filterCatg={filterCatHandler}
                filterColr={filtColorHandler}
                filterOctn={filtOcctnHandler}
                filterMetal={filterMetalHanlder}
                filterSearch={{ data: props.match.params.id }}
                setCount={setCount}
              />
            </div>
            <div className="col-lg-10 col-sm-8">
              <div className={Classes.Products}>
                <NewArrivalDesign
                  head={head}
                  labArry={labelSet}
                  deltLabel={deltLbel}
                  sortHandler={sortsHHandler}
                  count={count}
                  categoryName={categoryName}
                >
                  {products}
                </NewArrivalDesign>
              </div>
              <div className={Classes.DownloadOurAppImage}>
                <DownloadOurAppImage />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CategorySearch;
