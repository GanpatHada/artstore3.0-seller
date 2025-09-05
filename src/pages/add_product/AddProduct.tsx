import React from "react";
import Tabs from "./components/tabs/Tabs";
import ProductIdentity from "./components/product_identity/ProductIdentity";
import ProductDescription from "./components/product_description/ProductDescription";
import ProductMedia from "./components/product_media/ProductMedia";
import PricingOffers from "./components/pricing_offers/PricingOffers";
import "./AddProduct.css";
import { useProductFormContext } from "../../contexts/ProductFormContext";
import { validateProductForm } from "../../validators/productValidator";

const AddProduct: React.FC = () => {
  const { state, dispatch } = useProductFormContext();

  const handleNext = () => {
    if (state.activeTab < 3) {
      dispatch({ type: "SET_ACTIVE_TAB", value: state.activeTab + 1 });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleSubmit = () => {
    const errors = validateProductForm(state);
    console.log(errors)

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return; // stop submit
    }
    console.log("Form is valid. Submitting:", state);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div id="add-product-page">
      <header>
        <Tabs />
      </header>

      <main>
        {state.activeTab === 0 && <ProductIdentity />}
        {state.activeTab === 1 && <ProductDescription />}
        {state.activeTab === 2 && <ProductMedia />}
        {state.activeTab === 3 && <PricingOffers />}
      </main>

      <footer>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <div>
          <button onClick={handleReset}>Reset</button>
          {state.activeTab < 3 ? (
            <button id="next-btn" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button id="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default AddProduct;
