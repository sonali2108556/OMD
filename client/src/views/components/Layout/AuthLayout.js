import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout({ user }) {
  if (user) {
    return <Navigate to="/my/profile" replace />;
  }
  return <Outlet />;
}
