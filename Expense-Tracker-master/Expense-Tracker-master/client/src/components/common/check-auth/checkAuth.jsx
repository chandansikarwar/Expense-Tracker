import { Navigate, useLocation } from "react-router-dom";

export const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // Redirect to auth if user is not authenticated and trying to access "/"
  if (location.pathname === "/") {
    return isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/auth" />
    );
  }

  // Prevent unauthenticated users from accessing protected routes
  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  // Prevent authenticated users from accessing auth pages
  if (isAuthenticated && location.pathname.includes("/auth")) {
    return <Navigate to="/dashboard" />;
  }

  // Allow access to protected routes only if authenticated
  if (
    !isAuthenticated &&
    ["/dashboard", "/incomes", "/expenses"].some((path) =>
      location.pathname.includes(path)
    )
  ) {
    return <Navigate to="/auth" />;
  }

  // If all conditions pass, render children
  return children;
};
