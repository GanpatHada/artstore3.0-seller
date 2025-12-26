import { BACKEND_BASE_URL } from "../Constants";
import type { Seller } from "../types/seller.types";

/* =====================================================
   AuthError – thrown ONLY when refresh token fails
===================================================== */
export class AuthError extends Error {
  code: "REFRESH_TOKEN_FAILED";

  constructor(message: string) {
    super(message);
    this.name = "AuthError";
    this.code = "REFRESH_TOKEN_FAILED";
  }
}

/* =====================================================
   Helper: get access token from seller
===================================================== */
export function getAccessToken(seller: Seller | null) {
  return seller?.accessToken;
}

/* =====================================================
   Refresh access token using refresh token (cookie)
===================================================== */
export async function refreshAccessToken() {
  const res = await fetch(
    `${BACKEND_BASE_URL}/auth/seller/refreshAccessToken`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const json = await res.json();

  if (!json?.success) {
    throw new Error(json?.message || "Failed to refresh access token");
  }

  return json.data; // new access token
}

/* =====================================================
   Secure Fetch
===================================================== */
export async function secureFetch(
  seller: Seller,
  setSellerDetails: React.Dispatch<React.SetStateAction<any>>,
  url: RequestInfo,
  init: RequestInit = {}
) {
  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${getAccessToken(seller)}`,
  };

  try {
    let response = await fetch(url, { ...init, headers });
    let json = await response.json();

    /* 🔁 Access token expired → try refresh */
    if (json?.success === false && json?.errorCode === "EXPIRED_TOKEN") {
      let accessToken: string;

      try {
        accessToken = await refreshAccessToken();
      } catch {
        // ✅ ONLY refresh token failure throws AuthError
        throw new AuthError("Refresh token expired or invalid");
      }

      // update seller state
      setSellerDetails((prev: any) => ({
        ...prev,
        accessToken,
      }));

      // retry original request with new token
      const newHeaders = {
        ...(init.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };

      response = await fetch(url, { ...init, headers: newHeaders });
      json = await response.json();
    }

    /* ❌ Invalid / missing access token */
    const accessTokenErrors = ["MISSED_TOKEN", "INVALID_TOKEN"];

    if (!json?.success) {
      if (accessTokenErrors.includes(json.errorCode)) {
        throw new Error("Unauthorized access");
      }

      throw new Error(json?.message || "Request failed");
    }

    /* ✅ Success */
    return json?.data ?? null;
  } catch (err) {
    throw err;
  }
}
