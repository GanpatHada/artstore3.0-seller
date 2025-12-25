import { BACKEND_BASE_URL } from "../Constants";
import type { Seller } from "../types/seller.types";

export function getAccessToken(seller: any) {
  return seller?.accessToken;
}


export async function refreshAccessToken() {
  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/auth/seller/refreshAccessToken`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const json = await res.json();

    if(!json.success)
      throw new Error(json.message)
    return json.data;
  } catch (error) {
    throw error;
  }
}



export async function secureFetch(
  seller: Seller,
  setSellerDetails: React.Dispatch<React.SetStateAction<any>>,
  url: RequestInfo,
  init: RequestInit = {}
){

  //headers received as args inside init

  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${getAccessToken(seller)}`,
  };

  try {
    let response = await fetch(url, { ...init, headers });
    let json = await response.json();

    //If Access token is expired only

    if (json?.success === false && json?.errorCode === "EXPIRED_TOKEN") {
      const accessToken = await refreshAccessToken();
      setSellerDetails((prev: any) => ({
        ...prev,
        accessToken,
      }));

      //now with new accessToken fetch again

      const newHeaders = {
        ...(init.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };

      response = await fetch(url, { ...init, headers: newHeaders });
      json = await response.json();
    }

    const accessTokenErrors = [
      "MISSED_TOKEN",
      "INVALID_TOKEN",
    ];

    if (json?.success === false && accessTokenErrors.includes(json.errorCode))
    {
      throw new Error("Unauthorized access")
    }

    if (json?.success === false) {
      throw new Error(json.message);
    }
    // return data if no error

    return json?.data||null;


  } catch (err: any) {
    throw new Error(err);
  }
}
