import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const UrlShare = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const productColor = queryParams.get("color");
  const productName = queryParams.get("name");
  const productAlias = queryParams.get("alias");

  useEffect(() => {
    prodDetHandler();
  }, [queryParams]);

  const prodDetHandler = () => {
    sessionStorage.setItem(
      "productDetails",
      JSON.stringify({
        id: productId,
        color: productColor,
        name: productName,
      })
    );
    history.push({
      pathname: "/jewellery/" + productAlias,
      //   state: { data: prodItem },
    });
  };
  return <div></div>;
};

export default UrlShare;
