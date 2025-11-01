// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // or use your auth logic

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Logged in → allow access
}
