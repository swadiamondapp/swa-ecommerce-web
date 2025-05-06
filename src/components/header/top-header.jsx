import Classes from "./top-header.module.css";

const TopHeader = (props) => {
  // if (!props.headerOffer) {
  //   return null;
  // }
  return (
    <div className={Classes.Header_top}>
      <div className={Classes.DiwaliOffersdesk}>
        <div className="labelWrapper2">
          {props.headerOffer?.map((item) => (
            <>
              <p>{item.head} 🥳</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
