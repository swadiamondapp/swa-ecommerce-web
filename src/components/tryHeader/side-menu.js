"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useAuth } from "@/providers/auth-provider";
import Classes from "../Navbar/MobileNav.module.css";

export default function SideMenu({ categories, tags, handleClose, showLoginModal }) {
  const [activeIndex, setActiveIndex] = useState();
  const router = useRouter();
  const { token, user, logout } = useAuth();

  const handleLoginClick = () => {
    showLoginModal();
    handleClose();
  };

  const handleLogOut = () => {
    logout();
    router.push("/");
    handleClose();
  };

  const cattSelHandler = (category) => {
    router.push(`/${category.name.toLowerCase().replace(/\s+/g, "-")}`);
    handleClose();
  };

  const tagSelHandler = (tag) => {
    router.push(`/${tag.name.toLowerCase().replace(/\s+/g, "-")}`);
    handleClose();
  };

  const handlePrivacyPolicyClick = () => {
    router.push("/privacy/policy");
    handleClose();
  };

  return (
    <Box className="w-full">
      <div>
        <div className={Classes.ParentMobSection}>
          <div className={Classes.MobMainHead}>
            <div className={Classes.MobLeftSection}>
              <Image
                src={`/Assets/user.png`}
                alt="userimg"
                width="40"
                height="40"
              />
              {user ? (
                <p className="text-white font-gilroy">{user.userName}</p>
              ) : (
                <div className={Classes.MobLog_Signup}>
                  <p onClick={handleLoginClick}>
                    Login
                  </p>
                  {/* <p className={Classes.BorderLineMob}></p>
                  <p onClick={handleSignupClick}>Sign up</p> */}
                </div>
              )}
            </div>
            <div className={Classes.MobRightSection}>
              <IoMdClose
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "22px",
                }}
                // onClick={props.handleClose}
                onClick={handleClose}
              />
            </div>
          </div>
          <div className={Classes.CollapsParent}>
            <div className={Classes.parentCollaps5}>
              <div style={{ background: "#fff", borderRadius: "8px" }}>
                <div
                  className={`shipment1 ${Classes.dmm}`}
                  style={{ marginBottom: "150px" }}
                >
                  <Accordion
                    multiple
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                  >
                    <AccordionTab header="Category">
                      <div className={Classes.ShippingDetialHead}>
                        {categories?.map((category, index) => (
                          <div
                            key={index}
                            className={Classes.ParentCards1}
                            onClick={() => cattSelHandler(category)}
                            style={{
                              color: "#ffff",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              style={{ maxWidth: "45px" }}
                              src={category.thumbnail}
                              alt="thumbnail"
                            />
                            <p>{category.name.toUpperCase()}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionTab>
                    <AccordionTab header="Tags">
                      <div className={Classes.ShippingDetialHead}>
                        {tags?.map((item, index) => {
                          return (
                            <div
                              className={Classes.ParentCards2}
                              key={index}
                              onClick={() => tagSelHandler(item)}
                            >
                              <HiPlus />
                              <p>{item.name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      header="Policy"
                      onClick={handlePrivacyPolicyClick}
                    >
                      <div className={Classes.ShippingDetialHead}></div>
                    </AccordionTab>

                    {user && (
                      <AccordionTab header="Account">
                        <div className={Classes.ShippingDetialHead}>
                          <Link href="/my/profile" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                Profile
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/my/orders" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                My orders
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/wish-list" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                Wishlist
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/add/address" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                Add address
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/rate&/review" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                Write Review
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/swa/wallet" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                SWA Wallet
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                          <Link href="/swa/exchange" onClick={handleClose}>
                            <div className={Classes.LoggedDetailsList}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: "#000",
                                }}
                              >
                                Exchange Wallet
                              </p>

                              <IoIosArrowForward
                                style={{
                                  color: "#006E7F",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </Link>
                        </div>
                      </AccordionTab>
                    )}
                  </Accordion>
                  {token && (
                    <div
                      style={{ marginBottom: "100px" }}
                      onClick={handleLogOut}
                    >
                      <div className={Classes.LoggedDetailsList} onClick={handleLogOut}>
                        <p style={{ fontSize: "16px", color: "#000", marginLeft: "-3px" }}>
                          Log out
                        </p>
                        <IoIosArrowForward style={{ color: "#006E7F" }} />
                      </div>
                    </div>
                  )}

                  <Accordion>
                    <AccordionTab className="last-accordion-tab"></AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
