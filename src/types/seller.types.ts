export interface Seller {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  isVerified: boolean;
  accessToken: string;
}

export type SellerAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: Seller }
  | { type: 'LOGOUT' }
  | {
      type: 'UPDATE_SELLER';
      payload: {
        fullName?: string;
        profileImage?: string | null;
      };
    };

export interface SellerState {
  seller: Seller | null;
  loading: boolean;
  initialized: boolean;
}
