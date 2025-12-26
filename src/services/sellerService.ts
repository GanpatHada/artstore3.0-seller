import { BACKEND_BASE_URL } from '../Constants';
import { AuthError, refreshAccessToken, secureFetch } from './tokenService';

export interface SellerResponseData {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  isVerified: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export type SellerDetailsResponse = ApiResponse<SellerResponseData>;

export interface SellerWithToken extends SellerResponseData {
  accessToken: string;
}

export async function fetchSellerDetails(): Promise<SellerWithToken> {
  let accessToken: string;
  try {
    accessToken = await refreshAccessToken();
  } catch (error) {
    throw new AuthError('Session expired. Please login again.');
  }
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/seller/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: SellerDetailsResponse = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return { ...data.data, accessToken };
  } catch (error) {
    throw error;
  }
}

interface UpdateData {
  fullName?: string;
  profileImage?: File | null;
}

export interface UpdateProfileResponse {
  fullName?: string;
  profileImage?: string | null;
}

export async function fetchUpdateProfile(
  seller: any,
  login: any,
  data: UpdateData
): Promise<UpdateProfileResponse> {
  const url = `${BACKEND_BASE_URL}/seller`;

  try {
    const formData = new FormData();

    if (data.fullName !== undefined) {
      formData.append('fullName', data.fullName);
    }

    if (data.profileImage === null) {
      // explicitly remove profile image
      formData.append('profileImage', 'null');
    } else if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage);
    }

    const result = await secureFetch(seller, login, url, {
      method: 'PATCH',
      body: formData,
    });

    return result as UpdateProfileResponse;
  } catch (error) {
    throw error;
  }
}

export const logout = async (seller: any, login: any): Promise<null> => {
  const url = `${BACKEND_BASE_URL}/seller/logout`;

  try {
    const data = await secureFetch(seller, login, url, {
      method: 'POST',
      credentials: 'include',
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface StatsData {
  totalProducts: number;
  totalStockAdded: number;
  totalSold: number;
  remainingStock: number;
  availableProducts: number;
  unavailableProducts: number;
}

/**
 * Fetch seller stats
 */
export async function fetchSellerStats(
  seller: any,
  login: any
): Promise<StatsData> {
  const url = `${BACKEND_BASE_URL}/seller/stats`;
  try {
    const data = await secureFetch(seller, login, url, {
      method: 'GET',
    });
    return data;
  } catch (error) {
    throw error;
  }
}
