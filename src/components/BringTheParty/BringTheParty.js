import React, { useState, useEffect } from "react";
import Classes from "./BringTheParty.module.css";
import { useHistory } from "react-router-dom";

const BringTheParty = (props) => {
  const history = useHistory();
  const [adds, setAdds] = useState([
    { Ad_image: "", type_id: "", is_category: false },
    { Ad_image: "", type_id: "", is_category: false },
    { Ad_image: "", type_id: "", is_category: false },
  ]);
  useEffect(() => {
    setAdds(props.add);
  }, [props]);
  const advClicked = (selAdv) => {
    if (selAdv.is_category === true) {
      history.push({
        pathname: "/new_arrivel",
        state: { data: selAdv.type_id },
      });
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: { octnId: selAdv.type_id, data: "occation" },
      });
    }
  };
  console.log("adds", adds);
  return (
    <div>
      <div className={Classes.BringThePartyWhole}>
        <div className={`container ${Classes.MobBringtheparty}`}>
          <div className="row">
            {/* <div className={`${"col-md-5"} ${Classes.BringTheParty}`}>
              <p className={Classes.Text1}>REGULAR ESSENTIALS</p>
              <h1 className={Classes.Text2}>Bring the party</h1>
              <p className={Classes.Text3}>
                Make a statement this season. From friendly gatherings to galas,
                we have dazzling jewelry to complete every holiday party look.
              </p>
            </div> */}
            <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
              <div className={`container ${Classes.MobBringtheparty}`}>
                <div className="row">
                  <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
                    <img
                      className={Classes.Image1}
                      src={adds[0].Ad_image}
                      alt="ad1"
                      onClick={() => advClicked(adds[0])}
                    />
                  </div>
                  <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
                    <img
                      className={Classes.Image2}
                      src={adds[1].Ad_image}
                      alt="ad2"
                      onClick={() => advClicked(adds[1])}
                    />
                  </div>
                  <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
                    <img
                      className={Classes.Image2}
                      src={adds[2].Ad_image}
                      alt="ad3"
                      onClick={() => advClicked(adds[2])}
                    />
                  </div>
                </div>
              </div>
              {/* <div className={Classes.Image3}>
                <img className={Classes.Image3} src={adds[2].Ad_image} alt="ad3" onClick={()=>advClicked(adds[2])} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BringTheParty;
