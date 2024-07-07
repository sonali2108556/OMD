import React from "react";
import Header from "./Header/Header";
import { Box, Grid, Typography } from "@mui/material";
import { headerHeight, sideBarWidth, borderRadiusMainContent } from "../../config";
import SideBar from "./SideBar/SideBar";

function MainLayout() {

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>

      <Box height={headerHeight}>
        <Header></Header>
      </Box>

      <Box sx={{ height: `calc(100vh - ${headerHeight})`, display: "flex" }}>
        <Box width={sideBarWidth} height="inherit">
          <SideBar></SideBar>
        </Box>
        <Box sx={{ width: `calc(100vw - ${sideBarWidth})`, height: "inherit", backgroundColor: '#E1EBEE', borderTopLeftRadius: borderRadiusMainContent }}>
          <Box sx={{padding:'5px 10px'}}>
            <Typography variant="h6">This is main content</Typography>
          </Box>

        </Box>
      </Box>

    </Box>
  )
}
export default MainLayout;
