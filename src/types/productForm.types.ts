export interface Product{
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
}

export interface ProductFormState extends Product{
  activeTab: number;
  errors: Record<string, string>;
};

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
  | { type: "ADD_IMAGE"; value: File }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "SET_ERROR"; field: keyof ProductFormState; error: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERROR"; field: keyof ProductFormState }
  | { type: "RESET_FORM" }
  | { type: "SET_ACTIVE_TAB"; value: number }
  | { type: "POPULATE_FORM"; payload: Product };
