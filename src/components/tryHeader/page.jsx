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
import { func } from "joi";

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
      <div className="max-w-container mx-auto grid grid-cols-3 items-center w-full h-[90px px-6 flex items-center justify-between border-b border-gray-200 md:border-none py-4 md:py-2">
        <div className="flex md:hidden items-center space-x-1">
          <Image src="/try/menu.svg" width={24} height={24} alt="menu" />
        </div>
        {/* Left Section */}
        <div className="hidden md:flex items-center space-x-1">
          {/* <Image src="/try/indiaflag.svg" width={24} height={24} alt="country" /> */}
          <div
            style={{ cursor: "pointer" }}
            className={Classes.CountryFlags}
            ref={nameRef}
          >
            <div className={Classes.headerElement}>
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
          <div className="relative p-4">
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
              <div
                className="absolute top-16 left-5 bg-white shadow-md rounded w-60 z-50 
                  max-h-[200px] overflow-y-auto"
              >
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
        <div className="flex items-center justify-end ">
          <div className="flex items-center  justify-between space-x-6">
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
            </button>
            {/* <button onClick={() => {
                 
                
                }}>
          <Image src="/try/avatar.svg" width={15} height={20} alt="avatar" />
        </button> */}
          </div>
          <div className="space-x-6">
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
        </div>
      </div>
      <CategoriesNavbar categories={categories} tags={tags} isCartPage={isCartPage} />
    </>
  );
}

function CategoriesNavbar({ categories, tags, isCartPage }) {
  return (
    <>
      {!isCartPage && (
        <div className="hidden md:flex bg-white absolute top-[87px] left-1/2 -translate-x-1/2 z-10 h-[59.67px] w-[856px]  mx-auto  items-center px-10 rounded-full shadow-sm">
          <div className="container pt-2 px-0 ">
            <div className="flex items-center justify-between flex-wrap text-sm text-black">
              {categories?.map((category, index) => (
                <div key={index} className="flex justify-center">
                  <Link
                    href={`/${category.name.toLowerCase().replace(/\s+/g, "")}`}
                    className="group relative inline-block text-black"
                  >
                    <p className="pb-2 text-center">
                      {category.name.toUpperCase()}
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[4px] w-20 bg-[#4d9ea7] rounded-t-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                </div>
              ))}

              {tags?.map((tag, index) => (
                <div key={index} className="flex justify-center">
                  <Link
                    href={`/${tag.name.toLowerCase().replace(/\s+/g, "")}`}
                    className="group relative inline-block text-black"
                  >
                    <p className="pb-2 text-center">{tag.name.toUpperCase()}</p>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[4px] w-6 bg-[#4d9ea7] rounded-t-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
