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
    <div className={Classes.NavContainer}>
      <div className={Classes.Navbar}>
        <header>
          <div className={Classes.NavElements}>
            <div className={Classes.LeftIcons}>
              <Hamburger
                className={Classes.hamIcon}
                color="#fff"
                size={24}
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
              <img className={Classes.mobileLogo} src={Logo} />
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
              className={Classes.SlideButto}
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
