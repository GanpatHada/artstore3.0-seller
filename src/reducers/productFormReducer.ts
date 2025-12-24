import type { Action, ProductFormState } from "../types/productForm.types";

export const initialState: ProductFormState = {
  title: "",
  category: "",
  price: 0,
  discount: 0,
  actualPrice: 0,
  stock: 0,
  medium: "",
  surface: "",
  weight: "",
  dimensions: { height: "", width: "", thickness: "" },
  descriptions: [],
  productImages: [],
  activeTab: 0,
  errors: {},
};

export function productFormReducer(
  state: ProductFormState,
  action: Action
): ProductFormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_DIMENSION":
      return {
        ...state,
        dimensions: { ...state.dimensions, [action.field]: action.value },
      };

    case "SET_DESCRIPTION":
      return {
        ...state,
        descriptions: state.descriptions.map((d, i) =>
          i === action.index ? action.value : d
        ),
      };

    case "SET_ALL_DESCRIPTIONS":
      return { ...state, descriptions: action.values };

    case "ADD_DESCRIPTION":
      return { ...state, descriptions: [...state.descriptions, ""] };

    case "REMOVE_DESCRIPTION":
      return {
        ...state,
        descriptions: state.descriptions.filter((_, i) => i !== action.index),
      };

    case "ADD_IMAGE":
      return {
        ...state,
        productImages: [...state.productImages, action.value as File],
      };

    case "REMOVE_IMAGE":
      return {
        ...state,
        productImages: state.productImages.filter((_, i) => i !== action.index),
      };

    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "CLEAR_ERROR": {
      const { [action.field]: _, ...rest } = state.errors;
      return { ...state, errors: rest };
    }

    case "RESET_FORM":
      return initialState;
    case "POPULATE_FORM":
      return {
        ...state,
        ...action.payload,
        productImages: [],
      };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.value };


    default:
      return state;
  }
}
