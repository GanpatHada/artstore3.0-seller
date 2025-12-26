export interface FormField<T> {
  value: T;
  error: string | null;
}

export type BusinessType =
  | 'Individual'
  | 'Proprietorship'
  | 'Partnership'
  | 'LLP'
  | 'Private Limited';

export interface StoreFormState {
  businessName: FormField<string>;
  businessLogo: FormField<File | string | null>;
  gstin: FormField<string | null>;
  haveGSTIN: FormField<boolean>;
  businessType: FormField<BusinessType>;

  ownerName: FormField<string>;
  contactEmail: FormField<string>;
  contactPhone: FormField<string>;

  street: FormField<string>;
  city: FormField<string>;
  state: FormField<string>;
  postalCode: FormField<string>;
  country: FormField<string>;

  accountHolderName: FormField<string>;
  accountNumber: FormField<string>;
  ifscCode: FormField<string>;

  aadhaarNumber: FormField<string>;
  panNumber: FormField<string>;

  loading: boolean;
}

export type StoreFormAction =
  | {
      type: 'SET_FIELD_VALUE';
      field: Exclude<keyof StoreFormState, 'loading'>;
      payload: any;
    }
  | {
      type: 'SET_FIELD_ERROR';
      field: Exclude<keyof StoreFormState, 'loading'>;
      payload: string | null;
    }
  | {
      type: 'CLEAR_FIELD_ERROR';
      field: Exclude<keyof StoreFormState, 'loading'>;
    }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'POPULATE_FORM'; payload: StoreType }
  | { type: 'RESET_FORM' };

export type StoreType = {
  _id: string;
  seller: string;
  businessName: string;
  businessLogo: string | null;
  gstin: string | null;
  businessType: BusinessType;
  ownerName: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };

  aadhaarNumber: string;
  panNumber: string;

  isVerified: boolean;
  isActive: boolean;
};
