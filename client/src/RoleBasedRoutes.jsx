// RoleBasedRoute.jsx
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "teacher") {
    return <Navigate to="/teacher-home" replace />;
  } else if (role === "student") {
    return <Navigate to="/student-dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RoleBasedRoute;