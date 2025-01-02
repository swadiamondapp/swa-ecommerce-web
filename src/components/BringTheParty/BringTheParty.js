import React, { useState, useEffect } from "react";
import Classes from "./BringTheParty.module.css";
import { useHistory } from "react-router-dom";
import banner1 from "../../Assets/swabanner1.png";
import banner2 from "../../Assets/swabanner2.png";
import banner3 from "../../Assets/swabanner3.png";

const BringTheParty = (props) => {
  const history = useHistory();
  const [adds, setAdds] = useState([
    { Ad_image: "", Ad_video: "", type_id: "", is_category: false },
    { Ad_image: "", Ad_video: "", type_id: "", is_category: false },
    { Ad_image: "", Ad_video: "", type_id: "", is_category: false },
  ]);
  console.log("anasadds1", adds);
  useEffect(() => {
    setAdds(props.add);
  }, [props]);
  const advClicked = (selAdv) => {
    if (selAdv.is_category === true) {
      history.push({
        pathname: "/new/arrivals",
        state: { data: selAdv.type_id },
      });
    } else {
      history.push({
        pathname: "/new/arrivals",
        state: { octnId: selAdv.type_id, data: "occation" },
      });
    }
  };
  console.log("addsbringparty", adds);
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
                  {adds.map((item, index) => (
                    <>
                      {item.Ad_image && (
                        <div
                          className={`col-md-12 ${Classes.MobBringtheparty}`}
                        >
                          <img
                            className={Classes.Image1}
                            src={item.Ad_image && item.Ad_image}
                            // src={banner1}
                            alt="ad1"
                            onClick={() => advClicked(adds[0])}
                          />
                        </div>
                      )}
                      {item.Ad_video && (
                        <div
                          className={`col-md-6 ${Classes.MobBringthepartyvideo}`}
                        >
                          <video
                            className={Classes.Video1}
                            src={item.Ad_video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onClick={() => advClicked(item)}
                          />
                        </div>
                      )}
                    </>
                  ))}

                  {/* <div
                    className={`col-md-12 ${Classes.MobBringtheparty}`}
                    style={{ paddingBottom: "10px" }}
                  >
                    <img
                      className={Classes.Image2}
                      src={adds[1] && adds[1].Ad_image}
                      // src={banner2}
                      alt="ad2"
                      onClick={() => advClicked(adds[1])}
                    />
                  </div>
                  <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
                    <img
                      className={Classes.Image2}
                      src={adds[2] && adds[2].Ad_image}
                      // src={
                      //   "https://swaecommain.swa.co/media/product/ads/banner3.png"
                      // }
                      alt="ad3"
                      onClick={() => advClicked(adds[2])}
                    />
                  </div> */}
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
