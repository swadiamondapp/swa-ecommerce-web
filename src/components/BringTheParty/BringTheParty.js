import React from "react";
import Classes from "./BringTheParty.module.css";

const BringTheParty = (props) => {
  return (
    <div>
      <div className={Classes.BringThePartyWhole}>
        <div className="container">
          <div className="row">
            <div className={`${"col-md-5"} ${Classes.BringTheParty}`}>
              <p className={Classes.Text1}>REGULAR ESSENTIALS</p>
              <h1 className={Classes.Text2}>Bring the party</h1>
              <p className={Classes.Text3}>
                Make a statement this season. From friendly gatherings to galas,
                we have dazzling jewelry to complete every holiday party look.
              </p>
            </div>
            <div className="col-md-7">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className={Classes.Image1}
                      src={props.img1}
                      alt="ad1"
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      className={Classes.Image2}
                      src={props.img2}
                      alt="ad2"
                    />
                  </div>
                </div>
              </div>
              <div className={Classes.Image3}>
                <img className={Classes.Image3} src={props.img3} alt="ad3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BringTheParty;
