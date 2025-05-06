import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";

const CurrencySymbol = ({ country, className, color }) => {
  switch (country) {
    case "India":
      return <BiRupee className={className} color={color} />;
    case "United States":
      return <CgDollar className={className} color={color} />;
    case "United Arab Emirates":
      return <span style={{ paddingRight: "5px" }}>AED</span>;
    default:
      return null;
  }
};

export default CurrencySymbol; 