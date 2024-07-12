import { Block, Label } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, TextField, Typography, colors } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";




function AuthLayout() {
  return (
    <Box>


      <Box className="section2-background" sx={{ flexGrow: 1, }}>
      <Box className="login-form-container">
      <Outlet/>
      </Box>
       
      </Box>
    </Box>
   
  )
}
export default AuthLayout;