import { BACKEND_BASE_URL } from "../Constants";
import { refreshAccessToken, secureFetch } from "./tokenService";



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
  try {
    const accessToken = await refreshAccessToken();

    const response = await fetch(`${BACKEND_BASE_URL}/seller/`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
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

export interface StatsData {
  totalProducts: number
  totalQuantity: number
  soldProducts: number
  unsoldProducts: number
  availableProducts: number
  unavailableProducts: number
}



/**
 * Fetch seller stats
 */
export async function fetchSellerStats(seller: any, login: any): Promise<StatsData> {
  const url = `${BACKEND_BASE_URL}/seller/stats`
  try {
    const data = await secureFetch(seller, login, url, {
      method: 'GET',
    })
    return data
  } catch (error) {
    throw error
  }
}
