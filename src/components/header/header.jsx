"use client";
import { useState, useEffect } from "react";
import TopHeader from "./top-header";
import MainHeader from "./main-header";
import { usePathname } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CgHeart } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import Classes from "./main-header.module.css";
import CheckDelivery from "@/components/check-delivery/check-delivery";
import { useCountries } from "@/hooks/useCountries";
import { useContext } from "react";
import { CountryContext } from "@/providers/country-provider";
import LoginSuccessModal from "../loginSuccessModal/loginsuccessmodal";
import LoginModal from "../login-modal/loginModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { suggestion, productDet } from "@/utils/urls";
import { useData } from "@/providers/data-provider";
import { useCart } from "@/providers/cart-provider";
import { MdEdit } from "react-icons/md";

function Header() {
  const router = useRouter();
  const { countryId, flag, countryName } = useContext(CountryContext);
  const { token } = useAuth();
  const [text, setText] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isCartPage = pathname === "/shoping/cart";
  const isCheckoutPage = pathname === "/cart/checkout";
  const mobileSearchBarClass = isHomePage
    ? Classes.MobileSearchBar
    : Classes.MobileSearchbarOthers;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [nameRef, setNameRef] = useState(null);
  const [dropdownRef, setDropdownRef] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [isHome, setIsHome] = useState(pathname === "/" ? true : false);
  const { countries: countryData } = useCountries();
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [loginText, setLoginText] = useState("");
  const { categories, tags } = useData();
  const { cartItemsCount } = useCart();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowModal = () => {
    // const pincode = localStorage.getItem("pincode");
    // if (!pincode) {
    setShowModal(!showModal);
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCountrySelect = (country) => {
    setOpenDropDown(false);
  };

  const searchKeyHanlder = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchShow(true);

      axios
        .get(`${suggestion + e.target.value}&country=${countryId}`)
        .then((response1) => {
          setSuggestionList(response1.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchShow(false);
    }
  };

  const searchTitleHandler = (setItem) => {
    if (setItem.type === "category") {
      router.push(`/${setItem.name.toLowerCase().replace(/\s+/g, "")}`);
    } else if (setItem.type === "product") {
      axios
        .get(`${productDet + setItem.id}?country=${countryId}`, {
          // headers: {
          //   Authorization: "Token " + token,
          // },
        })
        .then((response) => {
          router.push(`/jewellery/${response.data.results.data.alias}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setSearchKey("");
    setSearchShow(false);
  };
  const handleScroll = () => {
    if (window?.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    setPincode(pincode);
  }, []);

  console.log("countryId", countryId);

  useEffect(() => {
    if (countryData) {
      if (countryId) {
        setSelectedCountry(
          countryData.find((country) => country.id == countryId)
        );
      } else {
        setSelectedCountry(
          countryData.find((country) => country.country_name === "India")
        );
      }
    }
  }, [countryData, countryId]);

  const moveToWishList = () => {
    if (token !== null) {
      router.push("/wish-list");
    } else {
      setShow(true);
    }
  };

  const moveTocart = () => {
    if (token !== null) {
      router.push("/shoping/cart");
    } else {
      setShow(true);
    }
  };

  // const { data: homeData } = useQuery({
  //   queryKey: ["homeData", countryId],
  //   queryFn: async () => {
  //     const response = await fetch(`${home}?country=${countryId}`);
  //     const data = await response.json();
  //     return data.results.data;
  //   },
  //   enabled: !!countryId,
  // });

  const cattSelHandler = (item) => {
    router.push(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const tagSelHandler = (item) => {
    router.push(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>
      {isHomePage && <TopHeader />}
      <MainHeader
        setIsHome={setIsHome}
        isHome={isHome}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      >
        <div className={Classes.SearchIcons}>
          <div className={Classes.searchList}>
            <div
              className="labelWrapper"
              style={{
                display: searchKey.length === 0 ? "block" : "none",
                pointerEvents: "none",
              }}
            >
              <span>diamond jewellery</span>
              <span>gold jewellery</span>
              <span>platinum jewellery</span>
              <span>gemstone jewellery</span>
            </div>
            <input
              style={{
                background: "#F8F8F8",
                borderRadius: "32px",
                position: "relative",
              }}
              className={`${Classes.searchbar} font-gilroy`}
              type="text"
              value={searchKey || ""}
              onChange={searchKeyHanlder}
              placeholder="Search for "
            />
            <BsSearch
              size={22}
              className={Classes.searchIcon}
              style={{ display: searchShow ? "none" : "block" }}
            />
            <div className={Classes.searchListCont}>
              {suggestionList.length !== 0 ? (
                suggestionList.map((item, index) => {
                  return (
                    <p
                      className={Classes.SearchItem}
                      key={index}
                      onClick={() => searchTitleHandler(item)}
                    >
                      {item.name}
                    </p>
                  );
                })
              ) : (
                <p className={Classes.NoResult}>No Results Found</p>
              )}
            </div>
          </div>
          <div className={Classes.SearchMob}>
            <input
              type="text"
              value={searchKey || ""}
              onChange={searchKeyHanlder}
              className={Classes.SerachLine}
            />
            <BsSearch className={Classes.Icons} color="#FFFFFF" size={18} />
          </div>
          <div className={Classes.LogList}>
            <div
              style={{ cursor: "pointer" }}
              className={`${Classes.DeliveryPin} ${Classes.headerElement}`}
              onClick={handleShowModal}
            >
              <span className={Classes.checkDeliveryTitle}>CHECK DELIVERY</span>
              {pincode ? null : (
                <span
                  onClick={handleShowModal}
                  className={Classes.EnterPinTitle}
                  style={{ cursor: "pointer" }}
                >
                  Enter PinCode
                </span>
              )}
              {pincode && (
                <span
                  className={Classes.EnterPinTitle}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {pincode} <FaPen onClick={handleShowModal} />
                </span>
              )}
            </div>
          </div>
          <CheckDelivery
            show={showModal}
            handleClose={handleCloseModal}
            handleShow={handleShowModal}
          />
          <div className={`${Classes.outletlogo} ${Classes.headerElement}`}>
            <Link href="/product/outlets">
              <Image
                src={`/Assets/outletlogo.png`}
                width={24}
                height={24}
                alt="outlet logo"
              />
            </Link>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className={Classes.CountryFlags}
            ref={nameRef}
          >
            <div className={Classes.headerElement}>
              {selectedCountry?.flag_image ? (
                <img
                  src={selectedCountry && selectedCountry.flag_image}
                  alt="Selected flag"
                  className={Classes.selectedImage}
                />
              ) : (
                <div className="bg-teal-700 w-[30px] h-[30px] rounded-full" />
              )}
            </div>
            {openDropDown && (
              <div className={Classes.CountryDropDowns} ref={dropdownRef}>
                {countryData
                  .sort((a, b) =>
                    a.country_name === "India"
                      ? -1
                      : b.country_name === "India"
                      ? 1
                      : 0
                  ) // Sorts India to the top
                  .map((country, index) => (
                    <div className={Classes.CountryContainer} key={index}>
                      <div
                        className={Classes.contryelements}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <div>
                          <Image
                            src={country.flag_image}
                            alt={country.id}
                            className={Classes.dropDownImages}
                          />
                        </div>
                        <div>
                          <span>
                            {country.country_name === "United Arab Emirates"
                              ? "UAE"
                              : country.country_name === "Saudi Arabia"
                              ? "KSA"
                              : country.country_name === "India"
                              ? "IND"
                              : country.country_name === "United States"
                              ? "USA"
                              : country.country_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <CgHeart
            className={`${Classes.Icon} ${Classes.headerElement}`}
            color="#FFFFFF"
            size={25}
            onClick={() => {
              moveToWishList();
              setLoginText("Please Login");
            }}
          />
          <div className={Classes.CartItemNum}>
            <IoCartOutline
              className={`${Classes.Icon} ${Classes.AddToCart} ${Classes.headerElement}`}
              color="#FFFFFF"
              size={25}
              onClick={() => {
                moveTocart();
                setLoginText("Please Login");
              }}
            />
            {cartItemsCount > 0 && token && (
              <div className={Classes.ItemsNum}>{cartItemsCount}</div>
            )}
          </div>

          <LoginSuccessModal
            openSuccessModal={showSuccessModal}
            close={() => setShowSuccessModal(false)}
            state={showSuccessModal}
            text={text}
          />
          <LoginModal
            className={Classes.loginUser}
            isLog={show}
            handleOpenLogin={() => setShow(!show)}
            // logAct={props.loginHandler}
            // cartClose={cateclose}
            close={handleCloseModal}
            style={{ marginTop: "0px" }}
            setLoginText={setLoginText}
            text={loginText}
            setShowSuccessModal={setShowSuccessModal}
            setText={setText}
          />
        </div>
      </MainHeader>

      {!isCartPage && (
        <div
          className={Classes.SubHeadNav}
          style={{
            position: isSticky ? "fixed" : "static",
            top: 0,
            zIndex: 1000,
            width: "100%",
            height: "42px",
          }}
        >
          <div className="container" style={{ padding: "0px" }}>
            <div className={Classes.NavLinksDesk}>
              {categories?.map((category, index) => (
                <div key={index}>
                  <Link
                    href={`/${category.name.toLowerCase().replace(/\s+/g, "")}`}
                    style={{ color: "#ffff", cursor: "pointer" }}
                  >
                    <p>{category.name.toUpperCase()}</p>
                  </Link>
                </div>
              ))}
              {tags?.map((tag, index) => (
                <div key={index}>
                  <Link
                    href={`/${tag.name.toLowerCase().replace(/\s+/g, "")}`}
                    style={{ color: "#ffff", cursor: "pointer" }}
                  >
                    <p>{tag.name.toUpperCase()}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={
          isHomePage ? Classes.searchListCont : Classes.searchListscards
        }
        style={{ display: searchShow ? "block" : "none", zIndex: 500 }}
      >
        {suggestionList.length !== 0 ? (
          suggestionList.map((item, index) => {
            return (
              <p
                className={Classes.SearchItem}
                key={index}
                onClick={() => searchTitleHandler(item)}
              >
                {item.name}
              </p>
            );
          })
        ) : (
          <p className={Classes.NoResult}>No Results Found</p>
        )}
      </div>

      {!isCheckoutPage && !isCartPage && (
        <div
          className={`${mobileSearchBarClass} ${Classes.MobileSearchbarOthers}`}
        >
          {isHomePage && (
            <div className={Classes.mobCheckDelivery} onClick={handleShowModal}>
              <p>CHECK DELIVERY</p>
              {pincode ? null : (
                <p>
                  Enter pincode <MdEdit />
                </p>
              )}
              {pincode && (
                <span
                  className={Classes.EnterPinTitle}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#007481",
                  }}
                >
                  {pincode}{" "}
                  <FaPen
                    style={{ fontSize: "12px" }}
                    onClick={handleShowModal}
                  />
                </span>
              )}
            </div>
          )}

          {(isHomePage || showSearchBar) && (
            <div className="container">
              <div
                style={{
                  position: "relative",
                  margin: "12px 0px",
                  marginBottom: "0px",
                }}
              >
                <div
                  className="labelWrapper"
                  style={{ display: searchKey.length === 0 ? "block" : "none" }}
                >
                  <span>diamond jewellery</span>
                  <span>gold jewellery</span>
                  <span>platinum jewellery</span>
                  <span>gemstone jewellery</span>
                </div>
                <input
                  style={{ width: "100%" }}
                  type=""
                  className={Classes.searchbar}
                  placeholder="Search for"
                  value={searchKey}
                  onChange={searchKeyHanlder}
                />
                <BsSearch
                  size={22}
                  className={Classes.searchIcon}
                  style={{ display: searchShow ? "none" : "block" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {isHomePage && (
        <div className={Classes.CatList}>
          <div className="container" style={{ padding: "0px" }}>
            <div className={Classes.ParentMobSlider1}>
              <div className={Classes.MobSliderCards}>
                {categories?.map((item, index) => {
                  return (
                    <div
                      className={Classes.Offers}
                      key={index}
                      onClick={() => cattSelHandler(item)}
                    >
                      <div className={Classes.OffersInner}>
                        <img
                          style={{
                            width: "70px",
                            height: "50px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                            marginRight: "0px",
                          }}
                          className={Classes.SlideImage}
                          src={item.thumbnail}
                          alt="catg"
                        />

                        <p style={{ width: "85px", textAlign: "center" }}>
                          {item.name.slice(0, 10).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {tags?.map((item, index) => {
                  return (
                    <div
                      className={Classes.Offers}
                      key={index}
                      onClick={() => tagSelHandler(item)}
                    >
                      <div className={Classes.OffersInner}>
                        <img
                          style={{
                            width: "70px",
                            height: "50px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                          }}
                          src={item.thumbnail}
                          alt="tag"
                        />
                        <p>{item.name.slice(0, 10)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
