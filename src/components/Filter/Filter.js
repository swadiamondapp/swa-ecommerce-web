import React, { useState, useEffect } from "react";
import Classes from "./Filter.module.css";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import * as Urls from "../../Urls";
const Filter = (props) => {
  const [catgSet, setCatgSet] = useState([]);
  const [colorSet, setColorSet] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [catFiltArray, setCatFiltArray] = useState([]);
  const [colorFiltarray, setColorFiltArray] = useState([]);
  const [octnFiltArray, setOcctnFilterArray] = useState([]);
  const [metalTypeArray, setMetalTypeArray] = useState([]);
  const [occation, setOccation] = useState([]);
  const filterSet = () => {
    axios
      .get(Urls.filter)
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
    filterSet();
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
  return (
    <div className={Classes.Filter}>
      <Accordion defaultActiveKey={[""]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <div className={Classes.FilterText}>
            <div className="clear">
              <div>Filter</div>
              {/* <div className={Classes.Clear} onClick={clearHandler}>Clear All</div> */}
            </div>
          </div>
          <Accordion.Header>
            <div className={Classes.MainText}>Categories</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className={Classes.BorderBottom}>
              {catgSet.map((item, index) => {
                return (
                  <div className={Classes.Flex} key={index}>
                    <div>
                      <input
                        type="checkbox"
                        className={Classes.CheckBox}
                        value={item.id}
                        onClick={() => catSelHandler(item)}
                      />
                      <label className={Classes.Label}>{item.category}</label>
                    </div>
                    <p className={Classes.number}>{item.count}</p>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
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
            <div className={Classes.MainText}>Occation</div>
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
      </Accordion>
    </div>
  );
};

export default Filter;
