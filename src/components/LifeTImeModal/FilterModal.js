import React, { useState, useEffect } from "react";

import classes from "./LIfeTimeModal.module.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import sortimg from "../../Assets/sort.png";
import filtermobimg from "../../Assets/filter.png";
import axios from "axios";
import * as Urls from "../../Urls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const mobileStyle = {
  position: "absolute",
  bottom: 0,
  transition: "transform 0.3s ease-in-out",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
  overflow: "auto",
  maxHeight: "85%",
  width: "100%",
};
const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const FilterModal = (props) => {
  // new price modal
  const [open, setOpen] = useState(false);
  const [opensort, setOpensort] = useState(false);
  const [openfilter, setOpenfilter] = useState(false);
  const [categoryWise, setCategoryWise] = useState([]);
  const [metalCategory, setMetalCategory] = useState([]);
  const [metalType, setMetalType] = useState([]);
  const [occation, setOccation] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemId, setCheckedItemId] = useState([]);
  const [selectedMetelId, setSelectedMetalId] = useState([]);
  const [selectedCategoryByid, setSelectedCategoryById] = useState([]);
  const [selectedOccationById, setSelectedOccationById] = useState([]);
  const [getProductById, setGetProductById] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedPopular, setSelectedPopular] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const countryId = localStorage.getItem("id");
  console.log(props.openSuccessModal);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

  useEffect(() => {
    axios
      .get(Urls.metalType)
      .then((response1) => {
        console.log("Response from metalType API:", response1);
        setMetalType(response1.data.results);
      })
      .catch((error) => {
        console.log("Error fetching metalType:", error);
      });

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
        setOccation(responseOcc.data.results.data);
        console.log(responseOcc, "occ");
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   sort
  const handleOpenSort = () => {
    setOpensort(true);
  };

  const handleCloseSort = () => {
    setOpensort(false);
  };
  //   filter
  const handleOpenFilter = () => {
    setOpenfilter(true);
  };

  const handleCloseFilter = () => {
    setOpenfilter(false);
  };

  const handleCheckboxByMetel = (id) => {
    if (selectedMetelId.includes(id)) {
      setSelectedMetalId(selectedMetelId.filter((item) => item !== id)); // Remove ID if already selected
    } else {
      setSelectedMetalId([...selectedMetelId, id]); // Add ID if not selected
    }
  };
  const handleCheckboxByCategory = (id) => {
    if (selectedCategoryByid.includes(id)) {
      setSelectedCategoryById(
        selectedCategoryByid.filter((item) => item !== id)
      ); // Remove ID if already selected
    } else {
      setSelectedCategoryById([...selectedCategoryByid, id]); // Add ID if not selected
    }
  };
  const handleCheckboxByOccation = (id) => {
    if (selectedOccationById.includes(id)) {
      setSelectedOccationById(
        selectedOccationById.filter((item) => item !== id)
      ); // Remove ID if already selected
    } else {
      setSelectedOccationById([...selectedOccationById, id]); // Add ID if not selected
    }
  };
  const handleReset = () => {
    setSelectedMetalId([]);
    setSelectedCategoryById([]);
    setSelectedOccationById([]);
  };

  // const sortHandler = (selectedSort) => {
  //   // Your existing logic for sorting
  //   console.log("Selected Sort:", selectedSort);
  //   // Add more logic if needed
  // };

  // new price modal
  // const handleCheckboxChange = (id) => {
  //   if (checkedItems.includes(id)) {
  //     setCheckedItems(checkedItems.filter(item => item !== id)); // Remove ID if already checked
  //   } else {
  //     setCheckedItems([...checkedItems, id]); // Add ID if not checked
  //   }
  // };
  // const handleButtonClic = async () => {
  //   console.log(selectedMetelId);
  // // Construct the URL with selectedState as part of the query parameters
  // const url = `${Urls.productCategoryByMetal}${selectedMetelId.join(',')}`;

  // try {
  //   const response = await axios.get(url);
  //   props.setProduct(response.data.results.data);
  // } catch (error) {
  //   console.error('Error fetching product category by metal:', error);
  // }

  // };

  const handleButtonClick = async () => {
    window.scrollTo(0, 0);
    // Construct the URL with selectedState as part of the query parameters
    let urlF = "";
    let urlS = "";
    let urlT = "";

    switch (activeTab) {
      case "first":
        urlF = `${Urls.filterProductsById}${selectedCategoryByid.join(
          ","
        )}&country=${countryId}`;
        try {
          const respons = await axios.get(urlF);
          props.setProduct(respons.data.results.data);
          handleCloseFilter();
        } catch (error) {
          console.error("Error fetching product category by category:", error);
        }

        break;
      case "second":
        urlS = `${Urls.productCategoryByMetal}${selectedMetelId.join(
          ","
        )}&country=${countryId}`;
        try {
          const response = await axios.get(urlS);
          props.setProduct(response.data.results.data);
        } catch (error) {
          console.error("Error fetching product category by metal:", error);
        }
        break;
      case "third":
        urlT = `${Urls.occationalProdByid}${selectedOccationById.join(
          ","
        )}&country=${countryId}`;
        try {
          const response = await axios.get(urlT);
          props.setProduct(response.data.results.data);
        } catch (error) {
          console.error("Error fetching product category by Occation:", error);
        }
        break;
      default:
        break;
    }
  };

  // const sortChange = (value) => {
  //   setSelectedPopular(value)
  // }
  const sortChange = (value) => {
    setSelectedSort(value);
    setSelectedPopular(value);
  };

  return (
    <div>
      <div className={classes.FilterHeads}>
        <div className={classes.FilterMobiles}>
          <Button onClick={handleOpen} style={{ color: "#ffff" }}>
            Price
          </Button>
          <Modal
            // open={props.open}
            open={open}
            // onClose={props.handleClose}
            onClose={handleClose}
          >
            <Box sx={isMobileView ? mobileStyle : style}>
              <Typography>
                <div className={classes.Container}>
                  <div className={classes.LabelHead}>
                    <p>Price</p>
                    <IoMdClose
                      style={{ cursor: "pointer" }}
                      // onClick={props.handleClose}
                      onClick={handleClose}
                    />
                  </div>
                  <div className={classes.PriceTgs}>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPriceRange === "above_50000"}
                        value="above_50000"
                        onChange={() => setSelectedPriceRange("above_50000")}
                        type="checkbox"
                      />
                      <label>above 50000</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPriceRange === "btw_30000_to_50000"}
                        value="btw_30000_to_50000"
                        onChange={() =>
                          setSelectedPriceRange("btw_30000_to_50000")
                        }
                        type="checkbox"
                      />
                      <label>30000 to 50000</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPriceRange === "btw_20000_to_30000"}
                        value="btw_20000_to_30000"
                        onChange={() =>
                          setSelectedPriceRange("btw_20000_to_30000")
                        }
                        type="checkbox"
                      />
                      <label>20000 to 30000</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPriceRange === "btw_10000_to_20000"}
                        value="btw_10000_to_20000"
                        onChange={() =>
                          setSelectedPriceRange("btw_10000_to_20000")
                        }
                        type="checkbox"
                      />
                      <label>10000 to 20000</label>
                    </div>

                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPriceRange === "below_10000"}
                        value="below_10000"
                        onChange={() => setSelectedPriceRange("below_10000")}
                        type="checkbox"
                      />
                      <label>less than 10000</label>
                    </div>
                  </div>
                  <div className={classes.PriceBtns}>
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        console.log("selectedPriceRange", selectedPriceRange);
                        props.sortHandlerPrice(selectedPriceRange);
                        handleClose();
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          <div className={classes.arrow1}></div>
          <Button onClick={handleOpenSort}>
            <img src={sortimg} /> Sort
          </Button>
          <Modal
            // open={props.open}
            open={opensort}
            // onClose={props.handleClose}
            onClose={handleCloseSort}
          >
            <Box sx={isMobileView ? mobileStyle : style}>
              <Typography>
                <div className={classes.Container}>
                  <div className={classes.LabelHead}>
                    <p>Sort by</p>
                    <IoMdClose
                      style={{ cursor: "pointer" }}
                      // onClick={props.handleClose}
                      onClick={handleCloseSort}
                    />
                  </div>
                  <div className={classes.PriceTgs}>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPopular === "new"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("new")}
                      />
                      <label>New arraivals</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedSort === "LtoH"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("LtoH")}
                      />
                      <label>Low to high</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedSort === "HtoL"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("HtoL")}
                      />
                      <label>High to Low</label>
                    </div>

                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPopular === "top"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("top")}
                      />
                      <label>Most popular</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedPopular === "discounted"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("discounted")}
                      />
                      <label>Discounted</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input
                        checked={selectedSort === "wedding"}
                        type="radio"
                        name="sort"
                        onChange={() => sortChange("wedding")}
                      />
                      <label>Wedding</label>
                    </div>
                  </div>
                  <div className={classes.PriceBtns}>
                    {/* <button onClick={props.sortHandler}>Done</button> */}
                    {/* <button onClick={() => props.sortHandler(selectedSort)}>
                      Done
                    </button> */}
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        console.log("Selected Sort:", selectedSort);
                        props.sortHandler(selectedSort, selectedPopular);
                        handleCloseSort();
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          <div className={classes.arrow1}></div>
          <Button onClick={handleOpenFilter}>
            <img src={filtermobimg} /> Filter
          </Button>
          <Modal
            // open={props.open}
            open={openfilter}
            // onClose={props.handleClose}
            onClose={handleCloseFilter}
          >
            <Box sx={isMobileView ? mobileStyle : style}>
              <Typography>
                <div className={classes.Container}>
                  <div className={classes.PriceTgs}>
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <Row>
                        <Col
                          style={{
                            background: "#F7F6F2",
                            borderRadius: "5px",
                            padding: "10px 0px",
                          }}
                        >
                          <Nav variant="pills" className="flex-column">
                            {["first", "second", "third"].map((key) => (
                              <Nav.Item key={key}>
                                <Nav.Link
                                  eventKey={key}
                                  style={{
                                    background: "transparent",
                                    // color:
                                    //   key === activeTab
                                    //     ? "#006E7F"
                                    //     : "#475057 !important",
                                  }}
                                  onClick={() => setActiveTab(key)}
                                >
                                  {key === "first"
                                    ? "Categories"
                                    : key === "second"
                                    ? "Metal"
                                    : "Occasion"}
                                </Nav.Link>
                              </Nav.Item>
                            ))}
                          </Nav>
                        </Col>
                        <Col>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              {" "}
                              {categoryWise.map((item, index) => (
                                <div
                                  key={index}
                                  className={classes.CategoryListMain}
                                >
                                  <div className={classes.CategoryList}>
                                    <div className={classes.b1e}>
                                      <input
                                        type="checkbox"
                                        checked={selectedCategoryByid.includes(
                                          item.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxByCategory(item.id)
                                        }
                                      />
                                      <label>
                                        {String(item.name)
                                          .charAt(0)
                                          .toUpperCase() +
                                          String(item.name)
                                            .slice(1)
                                            .toLowerCase()}
                                        <span>{item.product_count}</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className={classes.CategoryListAmount}>
                                    <label></label>
                                  </div>
                                </div>
                              ))}
                              {/* <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      Earrings <span>43423</span>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              {" "}
                              {metalCategory.map((item, index) => (
                                <div
                                  key={index}
                                  className={classes.CategoryListMain}
                                >
                                  <div
                                    key={index}
                                    className={classes.CategoryList}
                                  >
                                    <div key={index} className={classes.b1e}>
                                      <input
                                        type="checkbox"
                                        checked={selectedMetelId.includes(
                                          item.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxByMetel(item.id)
                                        }
                                      />
                                      <label>
                                        {String(item.metal_type)
                                          .charAt(0)
                                          .toUpperCase() +
                                          String(item.metal_type)
                                            .slice(1)
                                            .toLowerCase()}{" "}
                                        <span>{item.product_count}</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {/* <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      white gold <span>2365</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      rose gold <span>3365</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      platinum <span>2365</span>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              {" "}
                              {occation.map((item, index) => (
                                <div
                                  key={index}
                                  className={classes.CategoryListMain}
                                >
                                  <div className={classes.CategoryList}>
                                    <div className={classes.b1e}>
                                      <input
                                        type="checkbox"
                                        checked={selectedOccationById.includes(
                                          item.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxByOccation(item.id)
                                        }
                                      />
                                      <label>
                                        {String(item.name)
                                          .charAt(0)
                                          .toUpperCase() +
                                          String(item.name)
                                            .slice(1)
                                            .toLowerCase()}{" "}
                                        <span>{item.product_count}</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {/* <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      wedding <span>2365</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      birthday <span>3365</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <div className={classes.b1e}>
                                    <input type="checkbox" />
                                    <label>
                                      engament <span>2365</span>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                  <div className={classes.PriceBtns2}>
                    <button className={classes.ResetBtn} onClick={handleReset}>
                      RESET
                    </button>
                    <button
                      className={classes.ApplyBtn}
                      onClick={handleButtonClick}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
