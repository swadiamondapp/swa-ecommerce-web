
import Image from "next/image";
import Classes from "./certificate.module.css";
import React from "react";

function Certificate() {
  return (
    <div>
      <div className={Classes.Certificates}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Image
                className={Classes.Image}
                src={"/Assets/Certificate.png"}
                alt="Certificates"
                width={1000}
                height={1000}
              />
            </div>
            <div className="col-md-6">
              <div className={Classes.Video}>
                <iframe
                  src={"https://www.youtube.com/embed/s3PrxdvAihI"}
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
