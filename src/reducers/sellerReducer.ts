export interface Seller {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  isVerified: boolean;
  accessToken: string;
}

export interface SellerState {
  seller: Seller | null;
  loading: boolean;
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN_SUCCESS"; payload: Seller }
  | { type: "LOGOUT" }
  | {
      type: "UPDATE_SELLER";
      payload: {
        fullName?: string;
        profileImage?: string | null;
      };
    };

export const initialSellerState: SellerState = {
  seller: null,
  loading: true,
};

export function sellerReducer(state: SellerState, action: Action): SellerState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "LOGIN_SUCCESS":
      return {
        seller: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        seller: null,
        loading: false,
      };

    case "UPDATE_SELLER":
      if (!state.seller) {
        return state;
      }
      return {
        ...state,
        seller: {
          ...state.seller,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
