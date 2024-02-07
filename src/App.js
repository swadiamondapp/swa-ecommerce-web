import React from "react";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewArrivalPage from "./Pages/NewArrivalPage/NewArrivalPage";
import WhishlistPage from "./Pages/WishlistPage/WishlistPage";
import ReturnPolicyPage from "./Pages/ReturnPolicyPage/ReturnPolicyPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsAndConditionsPage from "./Pages/TermsAndConditionsPage/TermsAndConditionsPage";
import FAQPage from "./Pages/FAQPage/FAQPage";
import Cart from "./Pages/Cart/Cart";
import OrderHistoryPage from "./Pages/OrderHistoryPage/OrderHistoryPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage";
import OrderHistorypage2 from "./Pages/OrderHistoryPage2/OrderHistorypage2";
import OrderSuccessfulPage from "./Pages/OrderSuccessful/OrderSuccessfulPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import RateAndReview from "./Pages/RateAndReviewPage/RateAndReview";
import CategorySearch from "./Pages/NewArrivalPage/CategorySearch";
import TagSearch from "./Pages/NewArrivalPage/Tagsearch";
import New from "./components/HeaderNew/Header";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/faq" component={FAQPage} exact />
        <Route path="/wish_list" component={WhishlistPage} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/new_arrivel" component={NewArrivalPage} exact />
        <Route path="/category_search/:id" component={CategorySearch} />
        <Route path="/tag_search/:id" component={TagSearch} />

        <Route
          path="/terms_condition"
          component={TermsAndConditionsPage}
          exact
        />
        <Route path="/Return_policy_page" component={ReturnPolicyPage} exact />
        <Route path="/privacy_policy" component={PrivacyPolicyPage} exact />
        <Route path="/checkout" component={CheckOutPage} exact />
        <Route path="/place_order" component={CheckOutPage} exact />
        <Route path="/my_orders" component={OrderHistoryPage} exact />
        <Route path="/track_order" component={OrderHistorypage2} exact />
        <Route path="/about_us" component={AboutUsPage} exact />
        <Route path="/order_successful" component={OrderSuccessfulPage} exact />
        <Route path="/rate_review" component={RateAndReview} exact />
        <Route
          path="/products/:id/:color/:name"
          component={ProductDetailsPage}
          exact
        />
        <Route path="/payment" component={PaymentPage} />
      </Switch>
    </Router>
  );
}

export default App;
