import { BACKEND_BASE_URL } from "../Constants";
import type { Product } from "../types/productForm.types";
import { secureFetch } from "./tokenService";

type ProductFormResponse = {
  productId: string;
};

export async function fetchlistProduct(
  seller: any,
  login: any,
  product: FormData
): Promise<ProductFormResponse> {
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

export async function fetchEditProduct(
  seller: any,
  login: any,
  product: FormData,
  productId:string
): Promise<ProductFormResponse> {
  const url = `${BACKEND_BASE_URL}/products/edit/${productId}`;

  try {
    const data = await secureFetch(seller, login, url, {
      method: "PUT",
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

export async function getProductDetails(
  seller:any,
  login:any,
  productId:string
):Promise<Product>{
  const url = `${BACKEND_BASE_URL}/products/${productId}`;
  try {
    const data = await secureFetch(seller, login, url, {
      method: "GET",
    });

    return data;
  } catch (error) {
    console.error("Failed to get product details", error);
    throw error;
  }
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
