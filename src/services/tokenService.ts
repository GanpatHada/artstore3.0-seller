import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "../Constants";

function redirectToLogin(delay = 1000) {
  setTimeout(() => {
    window.location.href = "/login";
  }, delay);
}

export async function refreshAccessToken(redirect = true) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/auth/seller/refreshAccessToken`, {
      method: "POST",
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message);
    }
    return json.data;
  } catch (error:any) {
    if (redirect) {
      toast.error(
        error.message || "Unable to refresh token, please login again"
      );
      redirectToLogin();
      return null;
    }
    throw error
  }
}