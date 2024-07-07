import React, { useState } from "react";
import Header from "./Header/Header";
import { Box, Grid, Typography } from "@mui/material";
import { headerHeight, sideBarOpenWidth, borderRadiusMainContent, sidebarCloseWidth } from "../../config";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [sideBarWidth, setsidebarWidth] = useState(sideBarOpenWidth);

  const handleSideBar = (event) => {
    if (sidebarOpen) {
      setSideBarOpen(false);
      setsidebarWidth(sidebarCloseWidth);

    }
    else {
      setSideBarOpen(true);
      setsidebarWidth(sideBarOpenWidth);
    }

  }
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>

      <Box height={headerHeight}>
        <Header sideBarWidth={sideBarWidth} handleSideBar={handleSideBar} sidebarOpen={sidebarOpen}></Header>
      </Box>

      <Box sx={{ height: `calc(100vh - ${headerHeight})`, display: "flex" }}>

        <Box width={sideBarWidth}
          height="inherit">
          <SideBar sidebarOpen={sidebarOpen}></SideBar>
        </Box>

        <Box sx={{ width: `calc(100vw - ${sideBarWidth})`, height: "inherit", backgroundColor: '#E1EBEE', borderTopLeftRadius: borderRadiusMainContent }}>

          <Box sx={{ padding: '5px 10px' }}>
            <Outlet />
          </Box>

        </Box>
      </Box>

    </Box>
  )
}
export default MainLayout;
