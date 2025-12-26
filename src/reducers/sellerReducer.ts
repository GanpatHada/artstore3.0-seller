import type { SellerAction, SellerState } from '../types/seller.types';

export const initialSellerState: SellerState = {
  seller: null,
  loading: true,
  initialized: false,
};

export function sellerReducer(
  state: SellerState,
  action: SellerAction
): SellerState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        seller: action.payload,
        loading: false,
        initialized: true, // fetch done
      };
    case 'LOGOUT':
      return {
        seller: null,
        loading: false,
        initialized: true, // fetch done
      };
    case 'UPDATE_SELLER':
      if (!state.seller) return state;
      return { ...state, seller: { ...state.seller, ...action.payload } };
    default:
      return state;
  }
}
