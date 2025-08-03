import { jwtDecode } from "jwt-decode";

export function isAccessTokenValid() {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    console.warn("Invalid token:", e);
    return false;
  }
}