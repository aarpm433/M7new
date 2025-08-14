import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}