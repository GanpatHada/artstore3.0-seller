import { BACKEND_BASE_URL } from "../Constants";
import type {StoreType } from "../types/store.types";
import { secureFetch } from "./tokenService";

export interface LocationDetails {
  country: string;
  state: string;
  city: string;
}


export interface CreateOrUpdateStoreResponse {
  store: StoreType;
}

export async function getLocationByPincode(
  pincode: string
): Promise<LocationDetails> {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = (await res.json()) as {
      Status: string;
      PostOffice: { District: string; State: string; Country: string }[] | null;
    }[];

    const po = data[0]?.PostOffice?.[0];
    if (!po || data[0].Status !== "Success") {
      throw new Error("Invalid PIN code");
    }

    return {
      country: po.Country,
      state: po.State,
      city: po.District,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to fetch details";
    console.error("Error fetching location:", message);
    throw new Error(message);
  }
}
export async function createStore(seller:any,login:any,formData:any):Promise<StoreType>
{
  const url=`${BACKEND_BASE_URL}/seller/store`;
  try {
    const data = await secureFetch(seller, login, url, {
      method: "POST",
      body:formData
    });
    return data as StoreType
  } catch (error) {
    console.error("Failed to create store", error);
    throw error;
  }
}


export async function editStore(seller:any,login:any,formData:any):Promise<StoreType>
{
  const url=`${BACKEND_BASE_URL}/seller/store`;
  try {
    const data = await secureFetch(seller, login, url, {
      method: "PATCH",
      body:formData
    });
    return data as StoreType
  } catch (error) {
    console.error("Failed to edit store", error);
    throw error;
  }
}

export async function getStoreDetails(
  seller: any,
  login: any
): Promise<StoreType> {
  const url = `${BACKEND_BASE_URL}/seller/store`;
  try {
    const data = await secureFetch(seller, login, url, {
      method: "GET",
    });

    return data as StoreType;
  } catch (error) {
    console.error("Failed to fetch store details", error);
    throw error;
  }
}