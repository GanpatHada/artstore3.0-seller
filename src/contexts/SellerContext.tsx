import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import { sellerReducer, initialSellerState } from '../reducers/sellerReducer';
import { fetchSellerDetails } from '../services/sellerService';
import type { Seller, SellerState } from '../types/seller.types';

interface SellerContextType extends SellerState {
  login: (seller: Seller) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  dispatch: React.Dispatch<any>;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const SellerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(sellerReducer, initialSellerState);

  const login = (seller: Seller) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: seller });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  useEffect(() => {
    const initSeller = async () => {
      try {
        const sellerDetails = await fetchSellerDetails();
        dispatch({ type: 'LOGIN_SUCCESS', payload: sellerDetails });
      } catch {
        dispatch({ type: 'LOGOUT' });
      }
    };

    initSeller();
  }, []);

  return (
    <SellerContext.Provider
      value={{
        ...state,
        login,
        logout,
        setLoading,
        dispatch,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = (): SellerContextType => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
};
