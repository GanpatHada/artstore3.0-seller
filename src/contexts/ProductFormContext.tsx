import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import {
  productFormReducer,
  initialState,
} from '../reducers/productFormReducer';
import type { ProductFormState, Action } from '../types/productForm.types';

type ProductFormContextType = {
  state: ProductFormState;
  dispatch: React.Dispatch<Action>;
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(
  undefined
);

export function ProductFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productFormReducer, initialState);

  return (
    <ProductFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductFormContext.Provider>
  );
}

export function useProductFormContext() {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error(
      'useProductFormContext must be used inside ProductFormProvider'
    );
  }
  return context;
}
