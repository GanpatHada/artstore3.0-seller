import { BACKEND_BASE_URL } from "../Constants";

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
