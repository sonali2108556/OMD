import React, { useState } from "react";
import "./Login.css";
import { Box, Grid, Typography, TextField, Button, styled, InputAdornment, IconButton } from "@mui/material";
import google from "../../../asset/images/google.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { GRAPH_URL, setToken } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

const CssTextField = styled(TextField)({
  borderRadius: "30px",
  "& label": {
    color: "#ffffff",
    fontSize: "0.9rem",
  },
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff !important",
      fontSize: "0.9rem",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const Login = (props) => {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

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
      query:
        "mutation LoginUser($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    data {\n      token\n      email\n      firstName\n      role\n      id\n      username\n      isActive\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: { email: formData.email, password: formData.password },
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);

      const responseData = response.data.data;
      if (responseData && responseData.loginUser.status.success) {
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage(responseData.loginUser.status.message);
        setToken(responseData.loginUser.data.token)
        window.location.reload();
      } else {
        setShowAlert(true);
        setAlertMessage(responseData.loginUser.status.message);
        setAlertType("warning");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
    }
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ backgroundColor: "#161f2b" }} px={5}>
      <Grid container>
        <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
        <Grid item xs={12} lg={6}>
          <Box className="login-box">
            <Box component="form" onSubmit={handleSubmitForm} className="login-form">
              <Box className="login-box-text">
                <Typography color="white" variant="h4">
                  <strong>Login</strong>
                </Typography>
                <Typography color="white" variant="subtitle1" letterSpacing={"0.75px"}>
                  See your growth and get consulting support!
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  borderColor: "white",
                  "&:hover": { borderColor: "white" },
                  padding: "10px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  borderRadius: "30px",
                }}
                fullWidth
                variant="outlined"
              >
                <img className="google-space" height="30px" src={google} alt="google" />
                Google
              </Button>

              <Typography color="white" variant="subtitle1" textAlign="center">
                OR
              </Typography>
              <CssTextField
                required
                type="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
              />
              <CssTextField
                required
                size="small"
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                
                onChange={handleChangePassword}
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ color: "white", paddingRight: "20px" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                sx={{ borderRadius: "30px", padding: "13px" }}
                fullWidth
                color="primary"
                variant="contained"
              >
                Login
              </Button>
              <Typography color="white" variant="subtitle1" gutterBottom textAlign={"center"}>
                Not registered yet?{" "}
                <Link to="/auth/signup" className="link-signup">
                  <strong>Sign Up</strong>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="login-background-image"></Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
