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
  const filterSet = (params) => {
    axios
      .get(Urls.filter + params)
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
          <p>Filtter</p>
        </div>
        <div className={Classes.ParentNewArrival}>
          <div className={Classes.CategoryMainHead}>
            <div className={Classes.CategoryHead}>
              <p>Categories</p>
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
          </div>
          <div className={Classes.CategoryMainHead}>
            <div className={Classes.CategoryHead}>
              <p>Metel</p>
            </div>
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
          </div>

          {/* occation */}
          <div
            className={Classes.CategoryMainHead}
            style={{ borderBottom: "0px" }}
          >
            <div className={Classes.CategoryHead}>
              <p>Occaction</p>
            </div>

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
          </div>
          {/* occation */}
        </div>
      </div>
      {/* new category */}
    </div>
  );
};

export default FilterCatgs;
