import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Replace this with your real auth check.
  // Example: read token from localStorage
  const token = localStorage.getItem("token");

  // If no token → user is not logged in → kick them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow the page to render
  return children;
}
