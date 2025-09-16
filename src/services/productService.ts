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