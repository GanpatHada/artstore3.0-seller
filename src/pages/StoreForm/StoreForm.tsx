import React, { useEffect, useState } from "react";
import "./StoreForm.css";
import BusinessDetails from "./components/business_details/BusinessDetails";
import Address from "./components/address/Address";
import AccountDetails from "./components/account_details/AccountDetails";
import Identity from "./components/identity/Identity";
import OwnerDetails from "./components/owner_details/OwnerDetails";
import { useStoreFormContext } from "../../contexts/StoreContext";
import { buildStoreFormData } from "../../utils/storeUtil";
import {
  createStore,
  editStore,
  getStoreDetails,
} from "../../services/storeService";
import { useSeller } from "../../contexts/SellerContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { StoreType } from "../../types/store.types";


const StoreForm: React.FC = () => {
  const navigate = useNavigate();
  const { validateStoreForm, state, dispatch } = useStoreFormContext();
  const { seller, login } = useSeller();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      if (seller) {
        try {
          const store: StoreType = await getStoreDetails(seller, login);
          if (store) {
            dispatch({ type: "POPULATE_FORM", payload: store });
            setIsEditMode(true);
          }
          else {
            dispatch({
              type: "SET_FIELD_VALUE",
              field: "ownerName",
              payload: seller.fullName,
            });
            dispatch({
              type: "SET_FIELD_VALUE",
              field: "contactEmail",
              payload: seller.email,
            });
            dispatch({
              type: "SET_FIELD_VALUE",
              field: "contactPhone",
              payload: seller.phone,
            });
            dispatch({
              type: "SET_FIELD_VALUE",
              field: "accountHolderName",
              payload: seller.fullName,
            });
          }
        } catch (error) {
          console.log("Something went wrong, proceeding to create one");
        }
      }
    };
    fetchStore();
  }, [seller, login, dispatch]);

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleSubmit = async () => {
    if (!validateStoreForm()) return;
    const formData: any = buildStoreFormData(state);
    try {
      if (isEditMode) {
        await editStore(seller, login, formData);
        toast.success("Store updated successfully");
      } else {
        await createStore(seller, login, formData);
        toast.success("Store created successfully");
      }
      navigate("/my-store");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div id="store-form">
      <h1>My Store</h1>
      <BusinessDetails />
      <OwnerDetails />
      <Address />
      <AccountDetails />
      <Identity />

      <div className="buttons">
        <button id="save-store-details-btn" onClick={handleSubmit}>
          {isEditMode ? "Save details" : "Create Store"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default StoreForm;
