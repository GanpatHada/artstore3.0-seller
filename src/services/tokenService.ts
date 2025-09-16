import { BACKEND_BASE_URL } from "../Constants";

export function getAccessToken(seller:any){
  return seller.accessToken;
}

function redirectToLogin() {
  window.location.href = "/login";
}

export async function refreshAccessToken(redirect = true) {
  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/auth/seller/refreshAccessToken`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message);
    }
    return json.data;
  } catch (error: any) {
    if (redirect) {
      redirectToLogin();
      return null;
    }
    throw error;
  }
}

export async function secureFetch(
  seller: any,
  setSellerDetails: React.Dispatch<React.SetStateAction<any>>,
  input: RequestInfo,
  init: RequestInit = {}
) {
  // Merge headers and add Authorization
  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${getAccessToken(seller)}`,
  };

  try {
    // First fetch attempt
    let res = await fetch(input, { ...init, headers });
    let json = await res.json();

    // If token expired, refresh token and retry
    if (!json.success && json.errorCode === "EXPIRED_TOKEN") {
      const accessToken = await refreshAccessToken();
      if (!accessToken) return;

      // Update user state with new token
      setSellerDetails((prev:any) => ({ ...prev, accessToken }));

      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      res = await fetch(input, { ...init, headers: newHeaders });
      json = await res.json();
    }

    // If still not successful, throw error
    if (!json.success) {
      throw new Error(json.message || "Something went wrong");
    }

    return json.data;
  } catch (err: any) {
    throw new Error(err?.message || "Network error");
  }
}
