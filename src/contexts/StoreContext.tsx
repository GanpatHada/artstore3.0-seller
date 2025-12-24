import React, { createContext, useContext, useReducer, type ReactNode } from "react";
import validator from "validator";

import {
  storeFormReducer,
  initialStoreFormState,
} from "../reducers/storeReducer";
import type { StoreFormAction, StoreFormState } from "../types/store.types";

type StoreFormContextType = {
  state: StoreFormState;
  dispatch: React.Dispatch<StoreFormAction>;
  validateStoreForm: () => boolean;
};

type StoreFieldKey = Exclude<keyof StoreFormState, "loading">;


const StoreContext = createContext<StoreFormContextType | undefined>(undefined);

export function StoreFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeFormReducer, initialStoreFormState);

  const validateStoreForm = (): boolean => {
    let isValid = true;

    const setError = (field: StoreFieldKey, message: string) => {
      isValid = false;
      dispatch({ type: "SET_FIELD_ERROR", field, payload: message });
    };

    const clearError = (field: StoreFieldKey) => {
      dispatch({ type: "CLEAR_FIELD_ERROR", field });
    };

    // BUSINESS NAME
    if (state.businessName.value.trim().length < 3)
      setError("businessName", "Business name must be at least 3 characters");
    else clearError("businessName");

    // BUSINESS TYPE
    const validTypes = [
      "Individual",
      "Proprietorship",
      "Partnership",
      "LLP",
      "Private Limited",
    ] as const;

    if (!validTypes.includes(state.businessType.value))
      setError(
        "businessType",
        "Business type must be Individual, Proprietorship, Partnership, LLP, or Private Limited"
      );
    else clearError("businessType");

    // OWNER
    if (state.ownerName.value.trim().length < 3)
      setError("ownerName", "Owner name must be at least 3 characters");
    else clearError("ownerName");

    // EMAIL
    if (!state.contactEmail.value) {
      setError("contactEmail", "Contact email is required");
    } else if (!validator.isEmail(state.contactEmail.value)) {
      setError("contactEmail", "Invalid email address");
    } else {
      clearError("contactEmail");
    }

    // PHONE
    if (
      state.contactPhone.value.length < 10 ||
      state.contactPhone.value.length > 15
    )
      setError("contactPhone", "Phone number must be 10-15 digits");
    else clearError("contactPhone");

    // ADDRESS
    if (!state.street.value) setError("street", "Street is required");
    else clearError("street");

    if (!state.city.value) setError("city", "City is required");
    else clearError("city");

    if (!state.state.value) setError("state", "State is required");
    else clearError("state");

    if (!state.postalCode.value)
      setError("postalCode", "Postal code is required");
    else clearError("postalCode");

    // BANK DETAILS
    if (!state.accountHolderName.value)
      setError("accountHolderName", "Account holder name is required");
    else clearError("accountHolderName");

    if (!state.accountNumber.value)
      setError("accountNumber", "Account number is required");
    else clearError("accountNumber");

    if (!state.ifscCode.value)
      setError("ifscCode", "IFSC code is required");
    else clearError("ifscCode");

    // IDENTITY
    if (!/^\d{12}$/.test(state.aadhaarNumber.value))
      setError("aadhaarNumber", "Aadhaar must be exactly 12 digits");
    else clearError("aadhaarNumber");

    if (state.panNumber.value.length !== 10)
      setError("panNumber", "PAN must be exactly 10 characters");
    else clearError("panNumber");

    // GSTIN validation
    if (state.haveGSTIN.value) {
      if (!state.gstin.value || state.gstin.value.length !== 15) {
        setError("gstin", "GSTIN must be exactly 15 characters");
      } else {
        clearError("gstin");
      }
    } else {
      clearError("gstin");
    }

    return isValid;
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, validateStoreForm }}>
      {children}
    </StoreContext.Provider>
  );
}


export function useStoreFormContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreFormContext must be used inside StoreFormProvider");
  }
  return context;
}
