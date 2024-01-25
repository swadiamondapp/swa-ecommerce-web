import React, { useState } from "react";
import Logo from "../../Assets/swaLogo.png";
import Hamburger from "hamburger-react";
import { FiBell } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import LoginToggle from "./LoginToggle";
import Classes from "./MobileNav.module.css";

const MobileNavbar = () => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  return (
    <div>
      <div className={Classes.Navbar}>
        <header>
          <div className={Classes.NavElements}>
            <div className={Classes.LeftIcons}>
              <Hamburger
                className={Classes.hamIcon}
                color="#fff"
                toggled={isHamOpen}
                toggle={setIsHamOpen}
                onToggle={(toggled) => {
                  if (toggled) {
                    // open a menu
                    setIsHamOpen(true);
                  } else {
                    // close a menu
                  }
                }}
              />
            </div>
            <div className={Classes.Logo}>
              <img src={Logo} />
            </div>
          </div>
          <div className={Classes.rightIcons}>
            <div>
              <FiBell className={Classes.Icon} color="#FFFFFF" size={25} />
            </div>
            <div>
              <IoCartOutline
                className={`${Classes.Icon} ${Classes.AddToCart}`}
                color="#FFFFFF"
                size={25}
                // onClick={moveTocart}
              />
            </div>
          </div>
        </header>
        {isHamOpen ? (
          <>
            <div
              style={{ marginBottom: "5rem" }}
              className={Classes.SlideButton}
            >
              <LoginToggle />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
