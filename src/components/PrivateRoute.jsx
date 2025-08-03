import { Navigate } from "react-router-dom";
import { isAccessTokenValid } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = isAccessTokenValid();
  return isLoggedIn ? children : <Navigate to="/" replace />;
}