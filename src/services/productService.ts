import { BACKEND_BASE_URL } from "../Constants";
import { secureFetch } from "./tokenService";


export interface AddProduct {
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

export interface Product extends AddProduct{
    _id:string,
    averageRatings:number,
    createdAt:string,
    updatedAt:string,
    initialStock:string,
}

export interface ListProductResponse {
  product: Product;
}

export async function fetchlistProduct(
  seller: any,
  login: any,
  product: FormData
): Promise<ListProductResponse> {
      const url = `${BACKEND_BASE_URL}/products`;

  try {
    const data = await secureFetch(seller, login, url, {
      method: "POST",
      body: product,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export interface ToggleProductResponse {
  productId: string;
  isActive: boolean;
}

export async function fetchToggleProductAvailability(
  seller: any,
  login: any,
  productId: string
): Promise<ToggleProductResponse> {
  const url = `${BACKEND_BASE_URL}/products/${productId}/toggle-availability`;

  try {
    const data = await secureFetch(seller, login, url, {
      method: "PATCH",
    });

    return data as ToggleProductResponse;
  } catch (error) {
    console.error("Failed to toggle product availability:", error);
    throw error;
  }
}