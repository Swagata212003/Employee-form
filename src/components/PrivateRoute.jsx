import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redirect if not logged in
};

export default PrivateRoute;
