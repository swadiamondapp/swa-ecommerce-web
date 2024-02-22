import React, { useState, useEffect } from "react";
import Logo from "../../Assets/swaLogo.png";
import Classes from "./Footer.module.css";
import Facebook from "../../Assets/Facebook.png";
import Instagram from "../../Assets/instagram.png";
import LinkedIn from "../../Assets/linkedin.png";
import Image1 from "../../Assets/1.png";
import Image2 from "../../Assets/2.png";
import Image3 from "../../Assets/3.png";
import Image4 from "../../Assets/4.png";
import Image5 from "../../Assets/5.png";
import Image6 from "../../Assets/6.png";
import { SiMinutemailer } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Urls from "../../Urls";
import { Accordion, AccordionTab } from "primereact/accordion";

function Footer() {
  const [catgSet, setCatgSet] = useState([]);
  const [occation, setOccation] = useState([]);
  const token = localStorage.getItem("swaToken");
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    axios
      .get(Urls.filter + "?category=&tag=")
      .then((response1) => {
        setCatgSet(response1.data.results.data.category);
        setOccation(response1.data.results.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const AboutUs = () => {
    history.push("about_us");
  };
  const catSelHandler = (id) => {
    if (history.location.pathname !== "/new_arrivel") {
      history.push({ pathname: "/new_arrivel", state: { data: id } });
    }
  };
  const occationSelHandler = (id) => {
    if (history.location.pathname !== "/new_arrivel") {
      history.push({
        pathname: "/new_arrivel",
        state: { data: "occation", octnId: id },
      });
    }
  };
  return (
    <div>
      <div className={Classes.Footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img className={Classes.Logo} src={Logo} alt="" />
              <p className={Classes.LogoText}>
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors
              </p>
            </div>
            <div className="col-md-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h1 className={Classes.Title}>General info</h1>
                    <div className={Classes.Links}>
                      <Link to="/faq">
                        <p className={Classes.Links}>FAQ</p>
                      </Link>
                      <p className={Classes.Links}> Contact us</p>
                      <p
                        className={Classes.Links}
                        onClick={AboutUs}
                        style={{ cursor: "pointer" }}
                      >
                        About us
                      </p>
                      <Link to="/privacy_policy">
                        <p className={Classes.Links}>Privacy policy</p>
                      </Link>
                      <Link to="/Return_policy_page">
                        <p className={Classes.Links}>Return policy</p>
                      </Link>
                      <Link to="/terms_condition">
                        <p className={Classes.Links}>Terms & conditions</p>
                      </Link>
                      <p className={Classes.Links}>Outlets</p>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <h1 className={Classes.Title}>Quick links</h1>
                    {catgSet.slice(0, 15).map((item, index) => {
                      return (
                        <p
                          className={Classes.Links}
                          onClick={() => catSelHandler(item.id)}
                          style={{ color: "#ffff", cursor: "pointer" }}
                          key={index}
                        >
                          {item.category}{" "}
                        </p>
                      );
                    })}
                  </div> */}
                  <div className="col-md-4">
                    <h1 className={Classes.Title}>Quick links</h1>
                    {catgSet.slice(0, 15).map((item, index) => {
                      return (
                        <p
                          className={Classes.Links}
                          onClick={() => catSelHandler(item.id)}
                          style={{ color: "#ffff", cursor: "pointer" }}
                          key={index}
                        >
                          {/* {item.category}{" "} */}
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1).toLowerCase()}
                        </p>
                      );
                    })}
                  </div>
                  <div className="col-md-4">
                    <div className={Classes.Link}>
                      {occation.slice(0, 8).map((item, index) => {
                        const tag = item.tag || ""; // Set to empty string if tag is null or undefined
                        const capitalizedTag =
                          tag.charAt(0).toUpperCase() +
                          tag.slice(1).toLowerCase();

                        return (
                          <p
                            className={Classes.Links}
                            style={{ color: "#ffff", cursor: "pointer" }}
                            key={index}
                            onClick={() => occationSelHandler(item.id)}
                          >
                            {/* {item.tag} */}
                            {capitalizedTag}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <p></p>
            </div>
            <div className="col-md-4">
              <p className={Classes.Title}>Swa contact info</p>
              <div className={Classes.Address}>
                <SiMinutemailer
                  size={28}
                  color="#99C7CD"
                  className={Classes.AddressText}
                />
                <p className={`${Classes.Links} ${Classes.AddressText}`}>
                  Ground Floor, 7/688E, Al Wahad, Chenguvetty, Kerala, 676501
                </p>
              </div>
              <div className={Classes.Address}>
                <FaPhoneAlt
                  color="#99C7CD"
                  size={15}
                  className={Classes.AddressText}
                />
                <p className={`${Classes.Links} ${Classes.AddressText}`}>
                  Toll Free Number : 1800 257 8600
                </p>
              </div>
              <div className={Classes.Address}>
                <HiOutlineMail
                  color="#99C7CD"
                  size={20}
                  className={Classes.AddressText}
                />
                <p className={`${Classes.Links} ${Classes.AddressText}`}>
                  info@swadiamonds.com
                </p>
              </div>
              <p
                style={{ paddingLeft: "20px" }}
                className={`${Classes.Title} ${Classes.FollowUs}`}
              >
                Follow us on
              </p>
              <div className={Classes.Icons}>
                <img src={Facebook} alt="" />
                <img src={LinkedIn} alt="" />
                <img src={Instagram} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile footer */}
      <div className={Classes.FooterMob}>
        <div className={Classes.LogoMobScreen}>
          <img className={Classes.Logo} src={Logo} alt="" />
        </div>
        <div className={Classes.ParentCollaps}>
          <Accordion
            multiple
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <AccordionTab header="About us">
              <p
                style={{
                  color: "#fff",

                  textAlign: "justify",
                  fontSize: "15px",
                }}
              >
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors
              </p>
            </AccordionTab>

            <AccordionTab header="Policies">
              <p className="m-0"></p>
            </AccordionTab>
            <AccordionTab header="franchise enquiry">
              <p className="m-0"></p>
            </AccordionTab>
            <AccordionTab header="Outlets">
              <p className="m-0"></p>
            </AccordionTab>
            <AccordionTab header="Quick links">
              <p className="m-0">
                <div className={Classes.MobQuicklinks}>
                  <div>
                    {catgSet.slice(0, 15).map((item, index) => {
                      return (
                        <p
                          className={Classes.Links}
                          onClick={() => catSelHandler(item.id)}
                          style={{ color: "#ffff", cursor: "pointer" }}
                          key={index}
                        >
                          {item.category}{" "}
                        </p>
                      );
                    })}
                  </div>
                  <div>
                    {occation.slice(0, 8).map((item, index) => {
                      return (
                        <p
                          className={Classes.Links}
                          style={{ color: "#ffff", cursor: "pointer" }}
                          key={index}
                          onClick={() => occationSelHandler(item.id)}
                        >
                          {item.tag}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </p>
            </AccordionTab>
          </Accordion>
        </div>
        <div className={Classes.SwaParentInfoMob}>
          <p className={Classes.Title}>Swa contact info</p>
          <div className={Classes.SwaAddresMob}>
            <div className={Classes.Address}>
              <SiMinutemailer
                size={28}
                color="#99C7CD"
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Ground Floor, 7/688E, Al Wahad, Chenguvetty, Kerala, 676501
              </p>
            </div>
            <div className={Classes.Address}>
              <FaPhoneAlt
                color="#99C7CD"
                size={15}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Toll Free Number : 1800 257 8600
              </p>
            </div>
            <div className={Classes.Address}>
              <HiOutlineMail
                color="#99C7CD"
                size={20}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                info@swadiamonds.com
              </p>
            </div>
          </div>
          <div className={Classes.FollowUsMOB}>
            <p
              style={{ paddingLeft: "20px" }}
              className={`${Classes.Title} ${Classes.FollowUs}`}
            >
              Follow us on
            </p>
            <div className={Classes.Icons}>
              <img src={Facebook} alt="" />
              <img src={LinkedIn} alt="" />
              <img src={Instagram} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.FooterDownMob}>
        <div className="">
          <div className="">
            <div className={`${""} ${Classes.FootIconImg}`}>
              <div className={Classes.FooterIconimg1}>
                <img className={Classes.FooterIcons} src={Image1} alt="" />
                <img className={Classes.FooterIcons} src={Image2} alt="" />
                <img className={Classes.FooterIcons} src={Image3} alt="" />
              </div>
              <div className={Classes.FooterIconimg1}>
                <img className={Classes.FooterIcons} src={Image4} alt="" />
                <img className={Classes.FooterIcons} src={Image5} alt="" />
                <img className={Classes.FooterIcons} src={Image6} alt="" />
              </div>
            </div>
            <div className="" style={{ paddingLeft: "0px" }}>
              <p className={Classes.FooterDownText}>
                2024 SWA Diamonds | All rights reserved
              </p>
            </div>

            <div className="">
              <p className={Classes.FooterDownTextR}>
                Designed & developed by zinfog codelabs
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* mobile footer */}
      <div className={Classes.FooterDown}>
        <div className="container">
          <div className="row">
            <div className="col-md-4" style={{ paddingLeft: "0px" }}>
              <p className={Classes.FooterDownText}>
                2024 SWA Diamonds | All rights reserved
              </p>
            </div>
            <div className={`${"col-md-4"} ${Classes.FootIconImg}`}>
              <img className={Classes.FooterIcons} src={Image1} alt="" />
              <img className={Classes.FooterIcons} src={Image2} alt="" />
              <img className={Classes.FooterIcons} src={Image3} alt="" />
              <img className={Classes.FooterIcons} src={Image4} alt="" />
              <img className={Classes.FooterIcons} src={Image6} alt="" />
              <img className={Classes.FooterIcons} src={Image5} alt="" />
            </div>
            <div className="col-md-4">
              <p className={Classes.FooterDownTextR}>
                Designed & developed by zinfog codelabs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

{
  /* <div className={Classes.FooterDown}>
<p className={Classes.FooterDownText}>
    2022 SWA Diamonds | All rights reserved
</p>
<div >
    <img className={Classes.FooterIcons} src={Image1} alt='' />
    <img className={Classes.FooterIcons} src={Image2} alt='' />
    <img className={Classes.FooterIcons} src={Image3} alt='' />
    <img className={Classes.FooterIcons} src={Image4} alt='' />
    <img className={Classes.FooterIcons} src={Image5} alt='' />
    <img className={Classes.FooterIcons} src={Image6} alt='' />
</div>
<p className={Classes.FooterDownText}>
    Site Designed & developed by zinfog codelabs
</p>
</div> */
}
