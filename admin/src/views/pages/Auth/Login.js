import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { GRAPH_URL } from "../../../config";
import axios from "axios";
import Alert from "../../shared/Alert";
import { setToken, getToken, removeToken } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";


var inputStyle = {
  ' .MuiInputLabel-root': {
    color: 'white !important',
  },
  ' .MuiInput-input': {
    color: 'white'
  },



}

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };


  async function handleSubmitForm(event) {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };
    // console.log(formData);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const data = {
      query: "mutation LoginUser($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    data {\n      username\n      token\n      role\n      permissions\n      id\n      email\n      firstName\n      lastName\n      dob\n      gender\n      avatar\n      phone\n    }\n    status {\n      message\n      success\n      code\n    }\n  }\n}", "variables": { "password": formData.password, "email": formData.email }
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      

      const responseData = response.data.data;
      console.log(responseData);
      if (responseData && responseData.loginUser.status.success) {
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage(responseData.loginUser.status.message);
        
        if (responseData.loginUser.data.role === "ADMIN") {
          setToken(responseData.loginUser.data.token)
          navigate("/")

        }
        else {
          setAlertMessage("Please contact administrator to get access.");
        }
      }
      else {
        setShowAlert(true);
        setAlertMessage(responseData.loginUser.status.message);
        setAlertType("warning");
      }



    }
    catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
    }
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickForget = () => {
    navigate('/auth/forget')

  }

  return (
    <Box>
      {/* <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert> */}

      <Box component="form" onSubmit={handleSubmitForm}>
        <Typography textAlign='center' variant="h4"><strong>Welcome back </strong></Typography>
        <Box sx={{ marginY: '25px', }} >
          <TextField size="small"
            onChange={handleChangeEmail}
            id="outlined-basic-password"
            value={email}
            label="Email" variant="standard" sx={inputStyle} fullWidth required />
        </Box>
        <Box sx={{ marginY: '25px' }}>
          <TextField size="small"
            type="password"
            name="password"
            onChange={handleChangePassword}
            value={password}
            id="outlined-basic-password" label="Password" variant="standard"



            sx={inputStyle} fullWidth required />
        </Box>
        <Box>
          <Button type="submit" sx={{ borderRadius: '40px', py: '10px' }} size="small" variant="contained" fullWidth>Login</Button>

          <Button type="button" onClick={handleClickForget} sx={{ textAlign: 'center', py: '10px', textDecoration: 'none', display: 'block', color: 'white', textTransform: "capitalize" }} fullWidth>Forget Password?</Button>
        </Box>

      </Box>
    </Box>
  )
}
export default Login;