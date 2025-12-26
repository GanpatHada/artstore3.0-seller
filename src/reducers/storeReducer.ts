import type { StoreFormAction, StoreFormState } from '../types/store.types';

export const initialStoreFormState: StoreFormState = {
  businessName: { value: '', error: null },
  businessLogo: { value: null, error: null },
  gstin: { value: null, error: null },
  haveGSTIN: { value: false, error: null },

  businessType: { value: 'Individual', error: null },

  ownerName: { value: '', error: null },
  contactEmail: { value: '', error: null },
  contactPhone: { value: '', error: null },

  street: { value: '', error: null },
  city: { value: '', error: null },
  state: { value: '', error: null },
  postalCode: { value: '', error: null },
  country: { value: 'India', error: null },

  accountHolderName: { value: '', error: null },
  accountNumber: { value: '', error: null },
  ifscCode: { value: '', error: null },

  aadhaarNumber: { value: '', error: null },
  panNumber: { value: '', error: null },

  loading: false,
};

export function storeFormReducer(
  state: StoreFormState,
  action: StoreFormAction
): StoreFormState {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.field]: { ...state[action.field], value: action.payload },
      };

    case 'SET_FIELD_ERROR':
      return {
        ...state,
        [action.field]: { ...state[action.field], error: action.payload },
      };

    case 'CLEAR_FIELD_ERROR':
      return {
        ...state,
        [action.field]: { ...state[action.field], error: null },
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'POPULATE_FORM': {
      const {
        businessName,
        businessLogo,
        gstin,
        businessType,
        ownerName,
        contactEmail,
        contactPhone,
        address,
        bankDetails,
        aadhaarNumber,
        panNumber,
      } = action.payload;

      return {
        ...initialStoreFormState,
        businessName: { value: businessName, error: null },
        businessLogo: { value: businessLogo, error: null },
        gstin: { value: gstin, error: null },
        haveGSTIN: { value: !!gstin, error: null },
        businessType: { value: businessType, error: null },
        ownerName: { value: ownerName, error: null },
        contactEmail: { value: contactEmail, error: null },
        contactPhone: { value: contactPhone, error: null },
        street: { value: address.street, error: null },
        city: { value: address.city, error: null },
        state: { value: address.state, error: null },
        postalCode: { value: address.postalCode, error: null },
        country: { value: address.country, error: null },
        accountHolderName: {
          value: bankDetails.accountHolderName,
          error: null,
        },
        accountNumber: { value: bankDetails.accountNumber, error: null },
        ifscCode: { value: bankDetails.ifscCode, error: null },
        aadhaarNumber: { value: aadhaarNumber, error: null },
        panNumber: { value: panNumber, error: null },
      };
    }

    case 'RESET_FORM':
      return initialStoreFormState;

    default:
      return state;
  }
}
