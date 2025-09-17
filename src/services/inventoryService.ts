import { BACKEND_BASE_URL } from "../Constants";
import type { InventoryProduct} from "../types/inventory";
import { secureFetch } from "./tokenService";


export async function fetchInventory(
  seller: any,
  login: any
): Promise<InventoryProduct[]> {
  const url = `${BACKEND_BASE_URL}/seller/products`;

  try {
    const data = await secureFetch(seller, login, url, {
      method: "GET",
    });

    return data as InventoryProduct[];
  } catch (error) {
    throw error;
  }
}
