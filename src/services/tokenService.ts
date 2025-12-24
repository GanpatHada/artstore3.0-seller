import { BACKEND_BASE_URL } from "../Constants";

export function getAccessToken(seller: any) {
  return seller?.accessToken;
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

    const refreshTokenErrors = [
      "EXPIRED_REFRESH_TOKEN",
      "INVALID_REFRESH_TOKEN",
      "MISSED_REFRESH_TOKEN",
    ];

    if (json?.success === false) {
      if (refreshTokenErrors.includes(json.errorCode)) {
        if (redirect) {
          redirectToLogin();
          return null;
        }
      }
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

export async function secureFetch(
  seller: any,
  setSellerDetails: React.Dispatch<React.SetStateAction<any>>,
  input: RequestInfo,
  init: RequestInit = {}
) {
  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${getAccessToken(seller)}`,
  };

  try {
    let response = await fetch(input, { ...init, headers });
    let json = await response.json();

    if (json?.success === false && json?.errorCode === "EXPIRED_TOKEN") {
      const accessToken = await refreshAccessToken(true);
      if (!accessToken) return;

      setSellerDetails((prev: any) => ({
        ...prev,
        accessToken,
      }));

      const newHeaders = {
        ...(init.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };

      response = await fetch(input, { ...init, headers: newHeaders });
      json = await response.json();
    }

    const accessTokenErrors = [
      "MISSED_TOKEN",
      "INVALID_TOKEN",
    ];

    if (
      json?.success === false &&
      accessTokenErrors.includes(json.errorCode)
    ) {
      redirectToLogin();
      return;
    }

    if (json?.success === false) {
      throw new Error(json.message || "Something went wrong");
    }

    return json.data;
  } catch (err: any) {
    throw new Error(err?.message || "Network error");
  }
}
