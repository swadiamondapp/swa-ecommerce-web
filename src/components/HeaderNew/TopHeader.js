import React, { useState, useEffect } from "react";
import Classes from "./TopHeader.module.css";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import * as Urls from "../../Urls";

const TopHeader = (props) => {
  const history = useHistory();
  const displayJoinHandler = () => {
    history.push("/join");
  };
  const [headeroffer, setHeaderoffer] = useState([]);

  useEffect(() => {
    axios
      .get(Urls.headeroffer)
      .then((response) => {
        setHeaderoffer(response.data.results.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  console.log("headeroffer", headeroffer);
  return (
    <div className={Classes.Header_top}>
      {/* <div className={`${"container"} ${Classes.HeaderTop_Text}`}>
        <div className={Classes.Top}>
          <p className={Classes.Phone}>
            <FaPhoneAlt className={Classes.TopIcon} />
            1800 257 8600
          </p>
          <p className={Classes.Mail}>
            <HiOutlineMail className={Classes.TopIcon2} />
            info@swadiamonds.com
          </p>
        </div>
        <div className={Classes.Time}>
          <p>IST (Mon - Sat) 10:00 AM to 6:00 PM</p>
        </div>
      </div> */}
      <div className={Classes.DiwaliOffersdesk}>
        {headeroffer.map((item) => (
          <>
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.head}
            </p>
            🥳
          </>
        ))}
      </div>
    </div>
  );
};
export default TopHeader;
