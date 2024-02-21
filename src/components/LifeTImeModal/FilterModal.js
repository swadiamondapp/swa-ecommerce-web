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
  const [activeTab, setActiveTab] = useState("first");
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

  // new price modal
  return (
    <div>
      <div className={classes.FilterHeads}>
        <div className={classes.FilterMobiles}>
          <Button onClick={handleOpen}>Price</Button>
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
                      <input type="checkbox" />
                      <label>above 50000</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>20000 to 30000</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>30000 to 50000</label>
                    </div>

                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>less than 10000</label>
                    </div>
                  </div>
                  <div className={classes.PriceBtns}>
                    <button>Done</button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          <div className={classes.arrow1}></div>
          <Button onClick={handleOpenSort}>Sort</Button>
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
                    <p>Sort</p>
                    <IoMdClose
                      style={{ cursor: "pointer" }}
                      // onClick={props.handleClose}
                      onClick={handleCloseSort}
                    />
                  </div>
                  <div className={classes.PriceTgs}>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>New arraivals</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>Low to high</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>High to Low</label>
                    </div>

                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>Most popular</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>Discounted</label>
                    </div>
                    <div className={classes.PriceTags1}>
                      <input type="checkbox" />
                      <label>Wedding</label>
                    </div>
                  </div>
                  <div className={classes.PriceBtns}>
                    <button>Done</button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          <div className={classes.arrow1}></div>
          <Button onClick={handleOpenFilter}>Filter</Button>
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
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>Earrings</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2345</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>Earrings</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2345</label>
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              {" "}
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>Gold</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2345</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>white gold</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2365</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>rose gold</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>3365</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>platinum</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2365</label>
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              {" "}
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>party</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2345</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>wedding</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2365</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>birthday</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>3365</label>
                                </div>
                              </div>
                              <div className={classes.CategoryListMain}>
                                <div className={classes.CategoryList}>
                                  <input type="checkbox" />
                                  <label>engament</label>
                                </div>
                                <div className={classes.CategoryListAmount}>
                                  <label>2365</label>
                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                  <div className={classes.PriceBtns2}>
                    <button className={classes.ResetBtn}>RESET</button>
                    <button className={classes.ApplyBtn}>Apply</button>
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
