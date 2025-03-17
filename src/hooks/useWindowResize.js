"use client";

import { useState, useEffect } from "react";

export const useWindowResize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    const handleResize = () => {
      setIsMobile(window?.innerWidth >= 300 && window?.innerWidth <= 575);
    };
    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return {isMobile};
};