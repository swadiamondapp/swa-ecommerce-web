import Link from "next/link";
import Classes from "./main-header.module.css";
import { usePathname } from "next/navigation";
import MobileNavbar from "../Navbar/MobileNavbar";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";
const MainHeader = (props) => {
  const pathname = usePathname();
  const isCartPage = pathname === "/shoping/cart";
  const { activeCart, setActiveCart } = useCart();

  const toggleCart = (cartType) => {
    setActiveCart(cartType);
  };

  return (
    <div>
      <MobileNavbar
        setIsHome={props.setIsHome}
        isHome={props.isHome}
        setSelectedCountry={props.setSelectedCountry}
        selectedCountry={props.selectedCountry}
        setShowSuccessModal={props.setShowSuccessModal}
        activeCart={activeCart}
        setActiveCart={setActiveCart}
        setText={props.setText}
        showSearchBar={props.showSearchBar}
        setShowSearchBar={props.setShowSearchBar}
      />
      <header className={`${Classes.headerNav}`}>
        <div className={`${Classes.header}`}>
          <div className={`${"container"} ${Classes.ParentHeader}`}>
            <div
              className={`${Classes.SwaHead} ${
                isCartPage ? Classes.cartPage : ""
              }`}
            >
              <Link
                id="brand"
                className={`${Classes.logo} ${Classes.headerElement}`}
                href="/"
              >
                <Image
                  src={`/Assets/desklogo.svg`}
                  alt="logo"
                  height={52}
                  width={74}
                />
              </Link>
              <Link id="brand" className={Classes.swaMob} href="/">
                <Image
                  src={`/Assets/moblogo.png`}
                  alt="logo"
                  width={40}
                  height={40}
                />
              </Link>
              {isCartPage && (
                <div>
                  <div className={Classes.Parentcartitems}>
                    <div
                      className={
                        activeCart === "shopping" ? Classes.ActiveCarthead : ""
                      }
                      onClick={() => toggleCart("shopping")}
                    >
                      Shopping Cart
                    </div>
                    <div
                      className={
                        activeCart === "trial" ? Classes.ActiveCarthead : ""
                      }
                      onClick={() => toggleCart("trial")}
                    >
                      Trial Cart
                    </div>
                  </div>
                </div>
              )}
              {!isCartPage && props.children}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
