import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // Debug log to help diagnose routing/auth issues
  // Remove this in production
  // eslint-disable-next-line no-console
  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
