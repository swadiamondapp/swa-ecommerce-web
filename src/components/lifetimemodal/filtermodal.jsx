"use client";
import React, { useState } from "react";
import Image from "next/image";

import classes from "./lifetimemodal.module.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useFilter } from "@/providers/filter-provider";
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
  maxHeight: "78%",
  width: "100%",
};

const FilterModal = (props) => {
  const [open, setOpen] = useState(false);
  const [opensort, setOpensort] = useState(false);
  const [openfilter, setOpenfilter] = useState(false);
  const [selectedMetelId, setSelectedMetalId] = useState([]);
  const [selectedCategoryByid, setSelectedCategoryById] = useState([]);
  const [selectedOccationById, setSelectedOccationById] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedPopular, setSelectedPopular] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const { metalTypes, categories, occations, filter, isLoading, setFilter } =
    useFilter();

  const isMobileView = useIsMobile();

  const handleCheckboxChange = (value) => {
    setSelectedPriceRange((prevState) => (prevState === value ? "" : value));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPriceRange("");
  };

  const handleOpenSort = () => {
    setOpensort(true);
  };

  const handleCloseSort = () => {
    setOpensort(false);
    setSelectedSort("");
  };

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

  const sortChange = (value) => {
    setSelectedSort(value);
    setSelectedPopular(value);
  };

  const handleApplyFilter = () => {
    setFilter({
      ...filter,
      selectedCategories: selectedCategoryByid,
      selectedMetalTypes: selectedMetelId,
      selectedOccations: selectedOccationById,
    });
    handleCloseFilter();
  };

  const sortHandler = (sortValue) => {
    setFilter({
      ...filter,
      sort: sortValue
    });
  };

  return (
    <div>
      {props.count !== 0 && (
        <div className={classes.FilterHeads}>
          <div className={classes.FilterMobiles}>
            <Button onClick={handleOpen} style={{ color: "#ffff" }}>
              Price
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box sx={isMobileView ? mobileStyle : style}>
                <div>
                  <div className={classes.Container}>
                    <div className={classes.LabelHead}>
                      <p>Price</p>
                      <IoMdClose
                        style={{ cursor: "pointer" }}
                        onClick={handleClose}
                      />
                    </div>
                    <div className={classes.PriceTgs}>
                      <div className={classes.PriceTags1}>
                        <input
                          checked={selectedPriceRange === "above_50000"}
                          value="above_50000"
                          onChange={() => handleCheckboxChange("above_50000")}
                          type="checkbox"
                        />
                        <label>above 50000</label>
                      </div>
                      <div className={classes.PriceTags1}>
                        <input
                          checked={selectedPriceRange === "btw_30000_to_50000"}
                          value="btw_30000_to_50000"
                          onChange={() =>
                            handleCheckboxChange("btw_30000_to_50000")
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
                            handleCheckboxChange("btw_20000_to_30000")
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
                            handleCheckboxChange("btw_10000_to_20000")
                          }
                          type="checkbox"
                        />
                        <label>10000 to 20000</label>
                      </div>

                      <div className={classes.PriceTags1}>
                        <input
                          checked={selectedPriceRange === "below_10000"}
                          value="below_10000"
                          onChange={() => handleCheckboxChange("below_10000")}
                          type="checkbox"
                        />
                        <label>less than 10000</label>
                      </div>
                    </div>
                    <div className={classes.PriceBtns}>
                      <button
                        onClick={() => {
                          window?.scrollTo(0, 0);
                          console.log("selectedPriceRange", selectedPriceRange);
                          props.sortHandlerPrice(selectedPriceRange);
                          handleClose();
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
            <div className={classes.arrow1}></div>
            <Button onClick={handleOpenSort}>
              <Image src={"/Assets/sort.png"} alt="sortimg" width={16} height={17} /> Sort
            </Button>
            <Modal open={opensort} onClose={handleCloseSort}>
              <Box sx={isMobileView ? mobileStyle : style}>
                <div>
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
                        <label>New arrivals</label>
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
                      <button
                        onClick={() => {
                          window?.scrollTo(0, 0);
                          sortHandler(selectedSort);
                          handleCloseSort();
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
            <div className={classes.arrow1}></div>
            <Button onClick={handleOpenFilter}>
              <Image src={"/Assets/filter.png"} alt="filtermobimg" width={17} height={17} /> Filter
            </Button>
            <Modal open={openfilter} onClose={handleCloseFilter}>
              <Box sx={isMobileView ? mobileStyle : style}>
                <div>
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
                                      background: "#F7F6F2",
                                      display: "flex",
                                      alignItems: "center",
                                      fontWeight:
                                        activeTab === key
                                          ? "900 !important"
                                          : "300 !important",
                                      color:
                                        activeTab === key
                                          ? "black !important"
                                          : "inherit !important",
                                      paddingLeft: "20px",
                                      position: "relative",
                                    }}
                                    onClick={() => setActiveTab(key)}
                                  >
                                    <GoDotFill
                                      style={{
                                        marginRight: "10px",
                                        fontSize: "16px",
                                        color:
                                          activeTab === key
                                            ? "#006E7F"
                                            : "#F7F6F2",
                                      }}
                                    />
                                    <p style={{ fontSize: "12px" }}>
                                      {key === "first"
                                        ? "Categories"
                                        : key === "second"
                                        ? "Metal"
                                        : "Occasion"}
                                    </p>
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                            </Nav>
                          </Col>
                          <Col>
                            <Tab.Content>
                              <Tab.Pane eventKey="first">
                                {categories.map((item, index) => (
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
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                {metalTypes.map((item, index) => (
                                  <div
                                    key={index}
                                    className={classes.CategoryListMain}
                                  >
                                    <div className={classes.CategoryList}>
                                      <div className={classes.b1e}>
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
                                              .toLowerCase()}
                                          <span>{item.product_count}</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </Tab.Pane>
                              <Tab.Pane eventKey="third">
                                {occations.map((item, index) => (
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
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                    <div className={classes.PriceBtns2}>
                      <button
                        className={classes.ResetBtn}
                        onClick={handleReset}
                      >
                        CLEAR ALL
                      </button>
                      <button
                        className={classes.ApplyBtn}
                        onClick={handleApplyFilter}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
