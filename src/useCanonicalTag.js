import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCanonicalTag = () => {
  const location = useLocation();
  const baseUrl = "https://www.swa.co"; // Your base URL

  useEffect(() => {
    // Create or update the canonical tag
    const canonicalUrl = `${baseUrl}${location.pathname}`;
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
  }, [location.pathname]); // Re-run the effect when the path changes
};

export default useCanonicalTag;
