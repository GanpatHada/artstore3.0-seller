import { BACKEND_BASE_URL } from "../Constants";


export interface Seller {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  isVerified: boolean;
  accessToken: string;
}


export interface LoginResponse {
  seller: Seller;
  accessToken: string;
}


export interface RegistrationResponse {
  email: string;
}

// -----------------
// Seller Login
// -----------------
export async function fetchSellerLogin(
  emailOrPhone: string = "guru@gmail.com",
  password: string = "guru123"
): Promise<LoginResponse> {
  const url = `${BACKEND_BASE_URL}/auth/seller/login`;

  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    return {
      seller: data.data.seller as Seller,
      accessToken: data.data.accessToken as string,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Unable to login at the moment");
  }
}

// -----------------
// Seller Registration
// -----------------
export async function fetchSellerRegistration(
  fullName: string,
  email: string,
  phone: string,
  password: string
): Promise<RegistrationResponse> {
  const url = `${BACKEND_BASE_URL}/auth/seller/signup`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return {
      email: data.data.email as string,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Unable to register at the moment");
  }
}
