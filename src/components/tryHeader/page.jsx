"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaPen } from "react-icons/fa";
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
import SideMenu from "./side-menu"; 

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

  // New states for mobile functionality
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileSearchKey, setMobileSearchKey] = useState("");
  const [mobileSuggestionList, setMobileSuggestionList] = useState([]);
  const [mobileSearchShow, setMobileSearchShow] = useState(false);

  const handleShowModal = () => {
    const pincode = localStorage.getItem("pincode");
    if (!pincode) {
      setShowModal(!showModal);
    }
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

  // Mobile search handler
  const mobileSearchKeyHandler = (e) => {
    setMobileSearchKey(e.target.value);
    if (e.target.value.length !== 0) {
      setMobileSearchShow(true);

      axios
        .get(`${suggestion + e.target.value}&country=${countryId}`)
        .then((response1) => {
          setMobileSuggestionList(response1.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMobileSearchShow(false);
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
    // Close mobile search as well
    setMobileSearchKey("");
    setMobileSearchShow(false);
    setShowMobileSearch(false);
  };

  // Mobile search title handler
  const mobileSearchTitleHandler = (setItem) => {
    searchTitleHandler(setItem);
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

  const cattSelHandler = (item) => {
    router.push(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
    setShowSidebar(false); // Close sidebar after navigation
  };

  const tagSelHandler = (item) => {
    router.push(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
    setShowSidebar(false); // Close sidebar after navigation
  };

  // Handle mobile search toggle
  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
    if (showMobileSearch) {
      setMobileSearchKey("");
      setMobileSearchShow(false);
    }
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Overlay for sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-full bg-white z-[9900] transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:hidden overflow-y-auto`}
      >
        <div className="flex flex-col gap-4">
          <SideMenu
            categories={categories}
            tags={tags}
            handleClose={() => setShowSidebar(false)}
            showLoginModal={() => setShow(true)}
          />
        </div>
      </div>

      <div
        className={`max-w-container mx-auto grid grid-cols-7 items-center w-full ${
          showMobileSearch ? "h-[90px]" : "h-[90px]"
        } px-6 flex items-center justify-between border-b  mt-0 border-gray-200 md:border-none  md:py-2`}
      >
        <div className="flex md:hidden items-center space-x-1 col-span-3">
          <button onClick={handleSidebarToggle}>
            <Image src="/try/menu.svg" width={24} height={24} alt="menu" />
          </button>
        </div>

        {/* Left Section - Desktop */}
        <div className="hidden md:flex items-center space-x-1 col-span-3">
          <div
            style={{ cursor: "pointer" }}
            className={Classes.CountryFlags}
            ref={nameRef}
          >
            <div
              className={`${Classes.headerElement} min-w-[24px] min-h-[24px]`}
            >
              {selectedCountry?.flag_image ? (
                <Image
                  src={selectedCountry?.flag_image}
                  alt="Selected flag"
                  className="w-[24px] h-[24px] object-cover rounded-full"
                  width={24}
                  height={24}
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
                  )
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
                            width={24}
                            height={24}
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

          <p className="text-black">Country</p>
          <div className="relative p-[1rem]">
            <Image
              src="/try/search.svg"
              width={20}
              height={20}
              alt="search"
              className="absolute left-8 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchKey || ""}
              onChange={searchKeyHanlder}
              className="pl-10 pr-2 py-1 text-black placeholder-black outline-none border-0 rounded"
            />

            {searchShow && (
              <div className="absolute top-16 left-5 bg-white shadow-md rounded w-60 z-[101] max-h-[200px] overflow-y-auto">
                {suggestionList.length > 0 ? (
                  suggestionList.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => searchTitleHandler(item)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item.name}
                    </p>
                  ))
                ) : (
                  <p className="px-3 py-2 text-gray-400">No Results Found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link href="/" className="w-14 h-16 flex items-center justify-center">
            <img src="/try/logo.svg" alt="logo" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end col-span-3">
          <div className="flex items-center justify-between space-x-6">
            <button onClick={handleMobileSearchToggle}>
              <Image
                src="/try/search.svg"
                width={20}
                height={20}
                alt="search"
                className="block md:hidden"
              />
            </button>

            <div
              style={{ cursor: "pointer" }}
              className="flex-col hidden md:flex"
              onClick={handleShowModal}
            >
              <div className="text-black font-inter font-normal text-sm align-middle uppercase">
                CHECK DELIVERY
              </div>

              {pincode ? null : (
                <div
                  onClick={handleShowModal}
                  className="font-inter font-medium text-sm text-[#017480] align-middle"
                  style={{ cursor: "pointer" }}
                >
                  Enter PinCode
                </div>
              )}
              {pincode && (
                <span
                  className="font-inter font-medium text-[14px] text-[#017480] align-middle uppercase"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {pincode} <FaPen onClick={handleShowModal} />
                </span>
              )}
            </div>
            <CheckDelivery
              show={showModal}
              handleClose={handleCloseModal}
              handleShow={handleShowModal}
            />

            <button
              onClick={() => {
                moveToWishList();
                setLoginText("Please Login");
                console.log("likeeeeee");
              }}
            >
              <Image src="/try/like.svg" width={22.76} height={20} alt="Like" />
            </button>
            <button
              className="relative"
              onClick={() => {
                moveTocart();
                setLoginText("Please Login");
              }}
            >
              <Image
                src="/try/shopingCart.svg"
                width={19.51}
                height={20}
                alt="shopping cart"
              />
              {cartItemsCount > 0 && token && (
                <div className="text-white rounded-full absolute -top-3 -right-4 z-10 bg-red-500 shadow-md  w-5 h-5 flex items-center justify-center text-xs ">
                  {cartItemsCount}
                </div>
              )}
            </button>
          </div>
          <div className="space-x-6 hidden md:block text-black relative">
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
              close={handleCloseModal}
              style={{ marginTop: "0px" }}
              setLoginText={setLoginText}
              text={loginText}
              setShowSuccessModal={setShowSuccessModal}
              setText={setText}
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="w-full px-6 py-4 md:hidden border-b border-gray-200 absolute top-[90px] left-0 right-0 bg-white z-[500]">
          <div className="relative">
            <Image
              src="/try/search.svg"
              width={20}
              height={20}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={mobileSearchKey || ""}
              onChange={mobileSearchKeyHandler}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-500 outline-none focus:border-[#017480]"
              autoFocus
            />

            {mobileSearchShow && (
              <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg z-50 max-h-[200px] overflow-y-auto border">
                {mobileSuggestionList.length > 0 ? (
                  mobileSuggestionList.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => mobileSearchTitleHandler(item)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <p className="text-black">{item.name}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3">
                    <p className="text-gray-400">No Results Found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <CategoriesNavbar
        categories={categories}
        tags={tags}
        isCartPage={isCartPage}
        isHomePage={isHomePage}
      />
    </>
  );
}

function CategoriesNavbar({ categories, tags, isCartPage, isHomePage }) {
  const fixed_tags = [
    { id: 1, name: "RINGS" },
    { id: 2, name: "EARRINGS" },
    { id: 3, name: "BANGLES" },
    { id: 4, name: "BRACELETS" },
    { id: 5, name: "NECKLACES" },
    { id: 6, name: "NOSE PINS" },
    { id: 7, name: "PENDANTS" },
    { id: 8, name: "CHARMS" },
  ];

  return (
    <>
      {!isCartPage && (
        <>
          <div className="hidden md:flex bg-white absolute top-[98px] left-1/2 -translate-x-1/2 z-10 h-[59.67px] lg:w-[856px] md:w-[768px] mx-auto items-center px-10 rounded-full shadow-sm">
            <div className="container pt-2 px-0">
              <div className="flex items-center justify-between flex-wrap text-sm text-black">
                {categories?.map((category, index) => (
                  <div key={category.id} className="flex justify-center">
                    <Link
                      href={`/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "")}`}
                      className="group relative inline-block text-black"
                    >
                      <p className="pb-2 text-center">{category.name}</p>
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[4px] w-20 bg-[#4d9ea7] rounded-t-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!isHomePage && (
            <div className="flex md:hidden w-screen bg-zinc-100 pt-2">
              <div className="flex gap-2 items-center text-sm text-black overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-2">
                {categories?.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/${category.name.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-black bg-white rounded-full py-2 px-3 border border-gray-800 whitespace-nowrap"
                  >
                    {category.name.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Header;
