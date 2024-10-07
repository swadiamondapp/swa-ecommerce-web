import React from "react";
import Certificates from "../../Assets/Certificate.png";
import Classes from "./Certificate.module.css";

function Certificate(props) {
  return (
    <div>
      <div className={Classes.Certificates}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                className={Classes.Image}
                src={Certificates}
                alt="Certificates"
              />
            </div>
            <div className="col-md-6">
              <div className={Classes.Video}>
                <iframe
                  src={props.video}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  title="video"
                  className={Classes.YTVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
