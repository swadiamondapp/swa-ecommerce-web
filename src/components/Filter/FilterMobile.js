import React, { useState } from "react";
import Classes from "./Filter.module.css";
import { Button, Modal } from "antd";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const FilterMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSort, setIsModalOpenSort] = useState(false);
  const [isModalOpenFilter, setIsModalOpenFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("first"); // state to track active tab

  //   price modal

  const showModalPrice = () => {
    setIsModalOpen(true);
  };
  const handleOkPrice = () => {
    setIsModalOpen(false);
  };
  const handleCancelPrice = () => {
    setIsModalOpen(false);
  };
  //   price modal
  //   sort modal
  const showModalSort = () => {
    setIsModalOpenSort(true);
  };
  const handleOkSort = () => {
    setIsModalOpenSort(false);
  };
  const handleCancelSort = () => {
    setIsModalOpenSort(false);
  };
  //   sort modal
  //   filter modal
  const showModalFilter = () => {
    setIsModalOpenFilter(true);
  };
  const handleOkFilter = () => {
    setIsModalOpenFilter(false);
  };
  const handleCancelFilter = () => {
    setIsModalOpenFilter(false);
  };
  //   filter modal
  return (
    <div className={Classes.FilterHeads}>
      <div className={Classes.FilterMobiles}>
        <button onClick={showModalPrice}>Price</button>

        <div className={Classes.arrow1}></div>
        <button onClick={showModalSort}>Sort</button>

        <div className={Classes.arrow1}></div>
        <button onClick={showModalFilter}>Filter</button>
      </div>

      {/* price modal */}
      <div
        className={Classes.PriceModal}
        style={{ position: "relative", height: "100%" }}
      >
        <Modal
          title="Price"
          open={isModalOpen}
          onOk={handleOkPrice}
          onCancel={handleCancelPrice}
          footer={null}
          style={
            {
              // top: "auto",
              // bottom: 0,
              // margin: "0px",
              // width: "100%",
              // maxWidth: "100%",
            }
          }
        >
          <div className={Classes.PriceTgs}>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>above 50000</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>20000 to 30000</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>30000 to 50000</label>
            </div>

            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>less than 10000</label>
            </div>
          </div>
          <div className={Classes.PriceBtns}>
            <button>Done</button>
          </div>
        </Modal>
      </div>
      {/* price modal */}
      {/* sort modal */}
      <div className={Classes.PriceModal}>
        <Modal
          title="Sort by"
          open={isModalOpenSort}
          onOk={handleOkSort}
          onCancel={handleCancelSort}
          footer={null}
        >
          <div className={Classes.PriceTgs}>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>New arraivals</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>Low to high</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>High to Low</label>
            </div>

            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>Most popular</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>Discounted</label>
            </div>
            <div className={Classes.PriceTags1}>
              <input type="checkbox" />
              <label>Wedding</label>
            </div>
          </div>
          <div className={Classes.PriceBtns}>
            <button>Done</button>
          </div>
        </Modal>
      </div>
      {/* sort modal */}
      {/* filter modal */}
      <div className={Classes.PriceModal}>
        <Modal
          title="Filter"
          open={isModalOpenFilter}
          onOk={handleOkFilter}
          onCancel={handleCancelFilter}
          footer={null}
        >
          <div className={Classes.PriceTgs}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col
                  style={{
                    background: "#F7F6F2",
                    borderRadius: "5px",
                    padding: "10px 0px",
                  }}
                >
                  {/* <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link
                              eventKey="first"
                              style={{
                                background: "transparent",
                                color: "#006E7F",
                              }}
                            >
                              Categories
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="second"
                              style={{
                                background: "transparent",
                                color: "#006E7F",
                              }}
                            >
                              Metel
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="third"
                              style={{
                                background: "transparent",
                                color: "#006E7F",
                              }}
                            >
                              Occaction
                            </Nav.Link>
                          </Nav.Item>
                        </Nav> */}
                  <Nav variant="pills" className="flex-column">
                    {["first", "second", "third"].map((key) => (
                      <Nav.Item key={key}>
                        <Nav.Link
                          eventKey={key}
                          style={{
                            background: "transparent",
                            color:
                              key === activeTab
                                ? "#006E7F !important"
                                : "#475057 !important",
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
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>Earrings</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2345</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>Earrings</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2345</label>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {" "}
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>Gold</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2345</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>white gold</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2365</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>rose gold</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>3365</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>platinum</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2365</label>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {" "}
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>party</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2345</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>wedding</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2365</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>birthday</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>3365</label>
                        </div>
                      </div>
                      <div className={Classes.CategoryListMain}>
                        <div className={Classes.CategoryList}>
                          <input type="checkbox" />
                          <label>engament</label>
                        </div>
                        <div className={Classes.CategoryListAmount}>
                          <label>2365</label>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          <div className={Classes.PriceBtns2}>
            <button className={Classes.ResetBtn}>RESET</button>
            <button className={Classes.ApplyBtn}>Apply</button>
          </div>
        </Modal>
      </div>
      {/* filter modal */}
    </div>
  );
};

export default FilterMobile;
