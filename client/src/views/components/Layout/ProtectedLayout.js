import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import PreFooter from "../PreFooter";

export default function ProtectedLayout({ user }) {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <Box>
      <Navbar user={user} />
      <Outlet />
      <PreFooter />
      <Footer />
    </Box>
  );
}
