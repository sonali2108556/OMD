import { Block, Label } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, TextField, Typography, colors } from "@mui/material";
import React from "react";

var inputStyle = {
  ' .MuiInputLabel-root': {
    color: 'white !important',
  },
  ' .MuiInput-input': {
    color: 'white'
  },
  


}


function AuthLayout() {
  return (
    <Box>


      <Box className="section2-background" sx={{ flexGrow: 1, }}>
        <Box className="login-form-container">
          <Typography textAlign= 'center' variant="h4"><strong>Welcome back </strong></Typography>
          <Box sx={{ marginY: '25px', }}>
            <TextField size="small" id="outlined-basic" label="Email" variant="standard" sx={inputStyle} fullWidth />
          </Box>
          <Box sx={{ marginY: '25px' }}>
            <TextField size="small" id="outlined-basic" label="Password" variant="standard" sx={inputStyle} fullWidth />
          </Box>
          <Box>
            <Button sx={{ borderRadius: '40px', py: '10px'}} size="small" variant="contained" fullWidth>Login</Button>
          </Box>
          <Typography component='a' href="" sx={{ textAlign: 'center', py: '10px', textDecoration: 'none', display: 'block',color:'white' }}>Forget Password?</Typography>
        </Box>

      </Box>
    </Box>
   
  )
}
export default AuthLayout;