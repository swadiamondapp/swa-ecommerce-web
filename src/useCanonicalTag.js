"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useCanonicalTag = () => {
  const pathname = usePathname();
  const baseUrl = "https://www.swadiamonds.com"; // Your base URL

  useEffect(() => {
    // Create or update the canonical tag
    const canonicalUrl = `${baseUrl}${pathname.pathname}`;
    let canonicalTag = document.querySelector("link[rel='canonical']");

    if (!canonicalTag) {
      // If the canonical tag doesn't exist, create it
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    // Set the canonical URL
    canonicalTag.setAttribute("href", canonicalUrl);

    // Cleanup function to remove the canonical tag when the component unmounts
    return () => {
      if (canonicalTag) {
        document.head.removeChild(canonicalTag);
      }
    };
  }, [pathname.pathname]); // Re-run the effect when the path changes
};

export default useCanonicalTag;
