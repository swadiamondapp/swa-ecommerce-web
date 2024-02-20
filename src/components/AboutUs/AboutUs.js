import React, { useEffect } from "react";
import Classes from "./AboutUs.module.css";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={Classes.Container}>
      <div className="container">
     

        <div className={Classes.Main}>
          <h1 className={Classes.Title}>About Us</h1>
        </div>
        <div className={Classes.SubText}>
          <p className={Classes.Home}>HOME /</p>
          <p className={Classes.PrivacyPolicy}>About Us</p>
        </div>
     
        <div className={Classes.Content}>
          <div className={Classes.Description}>
            <p>
              Concept of SWA Diamonds came into being from CAPESTONE Ventures
              Pvt Ltd, a leading name in wholesale diamond jewellers market,
              that does business with prominent retail jewellers. Many retail
              jewellers who deal only in gold jewellery are reluctant to add
              diamond jewellery to their stock due to certain factors. Lack of
              knowledge and experience in dealing with the quality checking of
              diamonds and difficulty in buying and selling diamond jewellery
              are their primary concerns. Terms and conditions of buy back, the
              understanding needed to use suitable packing materials for
              diamonds that should be different from the ones used for gold
              ornaments and repairing of diamond jewellery are the other reasons
              cited by most retailers who have the ability to trade diamond
              jewellery. On understanding the scenario, we brought SWA Diamonds
              to life that will ease diamond and platinum jewellery business.
            </p>

            <div className={Classes.subHeading}>Our Mission</div>
            <p>
              Our mission, SWA diamonds believes every woman desires a diamond
              and we take it as a privilege to give the best quality diamond at
              an affordable price range so that they get what they aspire for.
              The company's efforts is to make it available through exclusive
              SWA outlets in tier one cities and SWA shop in shop outlets in
              tier two and tier three cities of India so that diamonds reach the
              women in rural India too.
            </p>
            <div className={Classes.subHeading}>Brand Stroy</div>
            <p>
              The evolution of every individual starts with a realization of the
              true self. Inherent within each person is a beautiful core waiting
              to be unveiled and brought to light. Swa is the celebration of the
              spirit of the self. Each person deserves to sparkle and bring her
              inner light to life. Swa is an expression of the radiant self. Swa
              is the beginning of all of creation. The words Swagath, Swara,
              Swatantra, Swayam, Swapna, Swabhiman, Swarga, Swantham, Swaroopam,
              Swakaryam, Swasthi, Swad all start with Swa. Like the pollen
              grains that are beautiful, dainty, central to a flower and
              integral to growth – Swa is the initiator of the journey of the
              self. The self has multiple dimensions and Swa captures the
              versatile and diverse aspects of an individual (with its multiple
              diamond design). The crux of the Swa story is that ‘it all starts
              with the self’.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
