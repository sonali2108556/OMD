import { Box } from "@mui/material";
import React  from "react";
import { Outlet } from "react-router-dom";
import PreFooter from '../PreFooter';
import Footer from "../Footer";
import Navbar from "../Navbar/Navbar";

const MainLayout=({user})=>{
    return (
        <Box>
          <Navbar user={user}/>
          <Outlet/>
          <PreFooter/>
          <Footer/>
        </Box>
    );
}
export default MainLayout;