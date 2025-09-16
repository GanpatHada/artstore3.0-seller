// Types
export type ProductFormState = {
  title: string;
  category: string;
  price: number;
  discount: number;
  actualPrice: number;
  stock: number;
  medium: string;
  surface: string;
  weight: string;
  dimensions: {
    height: string;
    width: string;
    thickness: string;
  };
  descriptions: string[];
  productImages: File[];
  activeTab: number;
  errors: Record<string, string>;
};

// Actions
export type Action =
  | { type: "SET_FIELD"; field: keyof ProductFormState; value: any }
  | {
      type: "SET_DIMENSION";
      field: keyof ProductFormState["dimensions"];
      value: string;
    }
  | { type: "SET_DESCRIPTION"; index: number; value: string }
  | { type: "SET_ALL_DESCRIPTIONS"; values: string[] }

  | { type: "ADD_DESCRIPTION" }
  | { type: "REMOVE_DESCRIPTION"; index: number }
  |  { type: "ADD_IMAGE"; value: File }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "SET_ERROR"; field: keyof ProductFormState; error: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERROR"; field: keyof ProductFormState }
  | { type: "RESET_FORM" }
  | { type: "SET_ACTIVE_TAB"; value: number };

// Initial State
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

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.value };

    default:
      return state;
  }
}
