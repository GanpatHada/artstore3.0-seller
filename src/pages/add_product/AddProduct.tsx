import React, { useEffect, useState } from "react";
import Tabs from "./components/tabs/Tabs";
import ProductIdentity from "./components/product_identity/ProductIdentity";
import ProductDescription from "./components/product_description/ProductDescription";
import ProductMedia from "./components/product_media/ProductMedia";
import PricingOffers from "./components/pricing_offers/PricingOffers";
import "./AddProduct.css";
import { useProductFormContext } from "../../contexts/ProductFormContext";
import { validateProductForm } from "../../validators/productValidator";
import { fetchlistProduct } from "../../services/productService";
import { useSeller } from "../../contexts/SellerContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getStoreDetails } from "../../services/storeService";
import { StoreNotFound } from "../my_store/MyStore";
import { AuthError } from "../../services/tokenService";

const AddProduct: React.FC = () => {
  const { state, dispatch } = useProductFormContext();
  const { seller, login } = useSeller();
  const navigate = useNavigate();

  const [storeFetching, setStoreFetching] = useState(true);
  const [storeExist, setStoreExist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const toastId = toast.loading("Fetching store details...");

    const checkStore = async () => {
      try {
        const store = await getStoreDetails(seller, login);
        if (store) {
          setStoreExist(true);
          toast.success("Store details fetched successfully", { id: toastId });
        } else {
          setStoreExist(false);
          toast.error("Store not found", { id: toastId });
        }
      } catch (err: any) {
        if (err instanceof AuthError) {
          toast.error("Session expired. Please login again.", { id: toastId });
          navigate("/login", { replace: true });
          return;
        }
        setStoreExist(false);
        toast.error(err.message || "Unable to fetch store details", { id: toastId });
      } finally {
        setStoreFetching(false);
      }
    };

    checkStore();
  }, [seller, login, navigate]);

  if (storeFetching) {
    // Blank screen with only toast
    return <div id="add-product-loader"></div>;
  }

  if (!storeExist) {
    // Store not found
    return <StoreNotFound />;
  }

  // Store exists → show AddProduct form
  const handleNext = () => {
    if (state.activeTab < 3) dispatch({ type: "SET_ACTIVE_TAB", value: state.activeTab + 1 });
  };

  const handleReset = () => dispatch({ type: "RESET_FORM" });

  const handleCancel = () => {
    dispatch({ type: "RESET_FORM" });
    navigate("/");
  };

  const handleSubmit = async () => {
    const errors = validateProductForm(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    const { activeTab, errors: er, ...initState } = state;
    const formData = new FormData();
    const simpleFields = ["title", "category", "medium", "surface", "weight"];

    simpleFields.forEach((field) => {
      let value = (initState as any)[field];
      if (field === "category" && typeof value === "string") value = value.toUpperCase();
      formData.append(field, value);
    });

    formData.append("price", initState.price.toString());
    formData.append("discount", initState.discount.toString());
    formData.append("actualPrice", initState.actualPrice.toString());
    formData.append("stock", initState.stock.toString());
    formData.append("dimensions", JSON.stringify(initState.dimensions));
    formData.append("descriptions", JSON.stringify(initState.descriptions));
    initState.productImages.forEach((file: File) => formData.append("productImages", file));

    try {
      setLoading(true);
      await fetchlistProduct(seller, login, formData);
      toast.success("Product listed successfully");
      dispatch({ type: "RESET_FORM" });
      navigate("/");
    } catch (error: any) {
      if (error instanceof AuthError) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="add-product-page">
      {loading && (
        <div id="add-product-loader">
          <div className="loader"></div>
        </div>
      )}
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
