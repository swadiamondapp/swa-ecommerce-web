import React, { useState, useEffect } from "react";
import Classes from "./Filter.module.css";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import * as Urls from "../../Urls";
const FilterCatgs = (props) => {
  const [catgSet, setCatgSet] = useState([]);
  const [colorSet, setColorSet] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [catFiltArray, setCatFiltArray] = useState([]);
  const [colorFiltarray, setColorFiltArray] = useState([]);
  const [octnFiltArray, setOcctnFilterArray] = useState([]);
  const [metalTypeArray, setMetalTypeArray] = useState([]);
  const [occation, setOccation] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [categoryWise, setCategoryWise] = useState([]);
  const [metalCategory, setMetalCategory] = useState([]);
  const [occations, setOccations] = useState([]);
  const [getProductById, setGetProductById] = useState([]);
  const [selectedOccationIds, setSelectedOccationIds] = useState([]);
  const [selectedMetalIds, setSelectedMetalIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const countryId = localStorage.getItem("id");
  console.log("countryId,new", countryId);
  const filterSet = (params) => {
    axios
      .get(`${Urls.filter + params}&country=${countryId}`)
      .then((response1) => {
        setCatgSet(response1.data.results.data.category);
        setColorSet(response1.data.results.data.colour);
        setMetalTypes(response1.data.results.data.metal_type);
        setOccation(response1.data.results.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(props.filterSearch);
    if (props.filterSearch.data === "occation") {
      filterSet("?tag=" + props.filterSearch.octnId);
    } else if (
      props.filterSearch.data === "new" ||
      props.filterSearch.data === "top"
    ) {
      filterSet("?category=&tag=");
    } else {
      filterSet("?category=" + props.filterSearch.data);
    }
  }, []);
  const catSelHandler = (catSel) => {
    let newArray = [...catFiltArray];
    const found = catFiltArray.find((element) => {
      return element.id === catSel.id;
    });
    if (!found) {
      newArray.push({ id: catSel.id, label: catSel.category });
      setCatFiltArray(newArray);
    } else {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === catSel.id) {
          newArray.splice(i, 1);
          setCatFiltArray(newArray);
        }
      }
    }
    props.filterCatg(newArray);
  };
  const colrSelHandler = (colSel) => {
    let newArray = [...colorFiltarray];
    const found = colorFiltarray.find((element) => {
      return element.id === colSel.id;
    });
    if (!found) {
      newArray.push({ id: colSel.id, label: colSel.colour });
      setColorFiltArray(newArray);
    } else {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === colSel.id) {
          newArray.splice(i, 1);
          setColorFiltArray(newArray);
        }
      }
    }
    props.filterColr(newArray);
  };
  const occtnSelHandler = (occnSet) => {
    let newArray = [...octnFiltArray];
    const found = octnFiltArray.find((element) => {
      return element.id === occnSet.id;
    });
    if (!found) {
      newArray.push({ id: occnSet.id, label: occnSet.tag });
      setOcctnFilterArray(newArray);
    } else {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === occnSet.id) {
          newArray.splice(i, 1);
          setOcctnFilterArray(newArray);
        }
      }
    }
    props.filterOctn(newArray);
  };
  const metalTypeHandler = (metalSel) => {
    let newArray = [...metalTypeArray];
    const found = metalTypeArray.find((element) => {
      return element.id === metalSel.id;
    });
    if (!found) {
      newArray.push({ id: metalSel.id, label: metalSel.metal_type });
      setMetalTypeArray(newArray);
    } else {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === metalSel.id) {
          newArray.splice(i, 1);
          setMetalTypeArray(newArray);
        }
      }
    }
    props.filterMetal(newArray);
  };
  const clearHandler = () => {};
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`${Urls.metalCategory}?country=${countryId}`)
      .then((response2) => {
        console.log("Response from metalCategory API:", response2);
        setMetalCategory(response2.data.results.data);
        setGetProductById(response2.data.results.data);
      })
      .catch((error) => {
        console.log("Error fetching metalCategory:", error);
      });

    axios.get(`${Urls.categoryWise}?country=${countryId}`).then((response) => {
      console.log("respo===>", response);
      console.log("catwise", response.data.results.data);
      setCategoryWise(response.data.results.data);
    });
    axios
      .get(`${Urls.occationalProducts}?country=${countryId}`)
      .then((responseOcc) => {
        setOccations(responseOcc.data.results.data);
        console.log(responseOcc, "occ");
      });
  }, []);

  const handleCheckboxByOccation = (id) => {
    const updatedIds = selectedOccationIds.includes(id)
      ? selectedOccationIds.filter((item) => item !== id)
      : [...selectedOccationIds, id];
    setSelectedOccationIds(updatedIds);

    // Call API with updated IDs
    const url = `${Urls.occationalProdByid}${updatedIds.join(",")}`;
    axios
      .get(url)
      .then((response) => {
        props.setProduct(response.data.results.data);
        props.setCount(response.data.results.count);
      })
      .catch((error) => {
        console.error("Error fetching products by occasion:", error);
      });
  };

  const handleCheckboxByMetal = (id) => {
    const updatedIds = selectedMetalIds.includes(id)
      ? selectedMetalIds.filter((item) => item !== id)
      : [...selectedMetalIds, id];
    setSelectedMetalIds(updatedIds);

    // Call API with updated IDs
    const url = `${Urls.productCategoryByMetal}${updatedIds.join(
      ","
    )}&country=${countryId}`;
    axios
      .get(url)
      .then((response) => {
        props.setProduct(response.data.results.data);
        props.setCount(response.data.results.count);
      })
      .catch((error) => {
        console.error("Error fetching products by metal category:", error);
      });
  };
  const handleCheckboxByCategory = (id, count) => {
    const updatedIds = selectedCategoryIds.includes(id)
      ? selectedCategoryIds.filter((item) => item !== id)
      : [...selectedCategoryIds, id];
    setSelectedCategoryIds(updatedIds);

    // props.setCount(count)

    // Call API with updated IDs
    const url = `${Urls.filterProductsById}${updatedIds.join(
      ","
    )}&country=${countryId}`;
    axios
      .get(url)
      .then((response) => {
        props.setProduct(response.data.results.data);
        props.setCount(response.data.results.count);
        console.log(response.data.results.count, "resCo====>");
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  };
  // const handleCheckboxByMetel = (id) => {
  //   if (selectedMetelId.includes(id)) {
  //     setSelectedMetalId(selectedMetelId.filter((item) => item !== id)); // Remove ID if already selected
  //   } else {
  //     setSelectedMetalId([...selectedMetelId, id]); // Add ID if not selected
  //   }
  // };
  // const handleCheckboxByCategory = (id) => {
  //   if (selectedCategoryByid.includes(id)) {
  //     setSelectedCategoryById(
  //       selectedCategoryByid.filter((item) => item !== id)
  //     );
  //   } else {
  //     setSelectedCategoryById([...selectedCategoryByid, id]); // Add ID if not selected
  //   }
  // };
  // const handleCheckboxByOccation = (id) => {
  //   if (selectedOccationById.includes(id)) {
  //     setSelectedOccationById(
  //       selectedOccationById.filter((item) => item !== id)
  //     );
  //   } else {
  //     setSelectedOccationById([...selectedOccationById, id]); // Add ID if not selected
  //   }
  // };

  console.log("props------->", props);

  return (
    <div className={`${Classes.Filter} ${isSticky ? Classes.Sticky : ""}`}>
      {/*  warnning warnning not remove */}
      {/* <Accordion defaultActiveKey={[""]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <div className={Classes.FilterText}>
            <div className="clear">
              <div>Filter</div>
             
            </div>
          </div>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {" "}
            <div className={Classes.MainText}>Colours</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className={Classes.BorderBottom}>
              {colorSet.map((item, index) => {
                return (
                  <div className={Classes.Flex} key={index}>
                    <div>
                      <input
                        type="checkbox"
                        value={item.id}
                        onClick={() => colrSelHandler(item)}
                      />
                      <label>{item.colour}</label>
                      <br />
                    </div>
                    <p className={Classes.number}>{item.count}</p>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            {" "}
            <div className={Classes.MainText}>Metal Types</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className={Classes.BorderBottom}>
              {metalTypes.map((item, index) => {
                return (
                  <div className={Classes.Flex} key={index}>
                    <div>
                      <input
                        type="checkbox"
                        value={item.id}
                        onClick={() => metalTypeHandler(item)}
                      />
                      <label>{item.metal_type}</label>
                    </div>
                    <p className={Classes.number}>{item.count}</p>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            {" "}
            <div className={Classes.MainText}>More Filter</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className={Classes.BorderBottom}>
              {occation.map((item, index) => {
                return (
                  <div className={Classes.Flex} key={index}>
                    <div>
                      <input
                        type="checkbox"
                        value={item.id}
                        onClick={() => occtnSelHandler(item)}
                      />
                      <label>{item.tag}</label>
                    </div>
                    <p className={Classes.number}>{item.count}</p>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/*  warnning warnning not remove */}
      {/* new category */}
      <div className={Classes.ParentFilter}>
        <div className={Classes.FilterHead}>
          <p>Filter</p>
        </div>
        <div className={Classes.ParentNewArrival}>
          <div className={Classes.CategoryMainHead}>
            <div className={Classes.CategoryHead}>
              <p>Categories</p>
            </div>
            {categoryWise
              .filter((item) => item.product_count > 0)
              .map((item, index) => (
                <div className={Classes.CategoryListMain} key={index}>
                  <div className={Classes.CategoryList}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxByCategory(item.id, item.product_count)
                      }
                      checked={selectedCategoryIds.includes(item.id)}
                    />
                    <label>
                      {item.name.charAt(0).toUpperCase() +
                        item.name.slice(1).toLowerCase()}
                    </label>
                  </div>
                  <div className={Classes.CategoryListAmount}>
                    <label>{item.product_count}</label>
                  </div>
                </div>
              ))}
          </div>
          <div className={Classes.CategoryMainHead}>
            <div className={Classes.CategoryHead}>
              <p>Metal</p>
            </div>
            {metalCategory
              .filter((item) => item.product_count > 0)
              .map((item, index) => (
                <div className={Classes.CategoryListMain} key={index}>
                  <div className={Classes.CategoryList}>
                    <input
                      onChange={() => handleCheckboxByMetal(item.id)}
                      checked={selectedMetalIds.includes(item.id)}
                      type="checkbox"
                    />
                    <label>
                      {item.metal_type.charAt(0).toUpperCase() +
                        item.metal_type.slice(1).toLowerCase()}
                    </label>
                  </div>
                  <div className={Classes.CategoryListAmount}>
                    <label>{item.product_count}</label>
                  </div>
                </div>
              ))}
            {/* {colorSet.map((item, index) => {
            return (
              <div className={Classes.CategoryListMain} key={index}>
                <div className={Classes.CategoryList}>
                  <input
                    type="checkbox"
                    value={item.id}
                    onClick={() => colrSelHandler(item)}
                  />
                  <label>{item.colour}</label>
                </div>
                <div className={Classes.CategoryListAmount}>
                  <label>{item.count}</label>
                </div>
              </div>
            );
          })} */}

            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>white gold</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>2365</label>
              </div>
            </div> */}
            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>rose gold</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>3365</label>
              </div>
            </div> */}
            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>platinum</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>2365</label>
              </div>
            </div> */}
          </div>

          {/* occation */}
          <div
            className={Classes.CategoryMainHead}
            style={{ borderBottom: "0px" }}
          >
            <div className={Classes.CategoryHead}>
              <p>Occasion</p>
            </div>
            {occations
              .filter((item) => item.product_count > 0)
              .map((item, index) => (
                <div className={Classes.CategoryListMain}>
                  <div className={Classes.CategoryList}>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxByOccation(item.id)}
                      checked={selectedOccationIds.includes(item.id)}
                    />
                    <label>
                      {item.name.charAt(0).toUpperCase() +
                        item.name.slice(1).toLowerCase()}
                    </label>
                  </div>
                  <div className={Classes.CategoryListAmount}>
                    <label>{item.product_count}</label>
                  </div>
                </div>
              ))}

            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>wedding</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>2365</label>
              </div>
            </div> */}
            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>birthday</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>3365</label>
              </div>
            </div> */}
            {/* <div className={Classes.CategoryListMain}>
              <div className={Classes.CategoryList}>
                <input type="checkbox" />
                <label>engagement</label>
              </div>
              <div className={Classes.CategoryListAmount}>
                <label>2365</label>
              </div>
            </div> */}
          </div>

          {/* occation */}
        </div>
      </div>
      {/* new category */}
    </div>
  );
};

export default FilterCatgs;
