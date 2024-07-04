import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Signup.css";
import google from "../../../asset/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GRAPH_URL, setToken } from "../../../config";
import Alert from "../../components/Alert";
import male from "../../../asset/images/male.webp";
import female from "../../../asset/images/female.webp";
import other from "../../../asset/images/other.jpg";

const CssTextField = styled(TextField)({
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
      color: "#ffffff",
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

const Signup = (props) => {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

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
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
    };
    // console.log(formData);

    if(formData.gender === ""){
      setShowAlert(true);
      setAlertMessage("Select Gender");
      setAlertType("error");
    }

    else if(formData.password !== formData.confirmPassword) {
      // console.log("password doesn't match");
      setShowAlert(true);
      setAlertMessage("Password doesn't match.");
      setAlertType("error");
    } else {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const data = {
        query:
        "mutation CreateUser($firstName: String!, $gender: String!, $email: String!, $password: String!, $lastName: String) {\n  createUser(firstName: $firstName, gender: $gender, email: $email, password: $password, lastName: $lastName) {\n    data {\n      token\n      username\n      role\n      email\n      firstName\n      gender\n      id\n      lastName\n      isActive\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
        variables: {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
        },
      };

      try {
        const response = await axios.post(GRAPH_URL, data, config);
        // console.log(response.data);
        const responseData = response.data.data;
        if (responseData && responseData.createUser.status.success) {
          setShowAlert(true);
          setAlertType("success");
          setAlertMessage(responseData.createUser.status.message);
          setToken(responseData.createUser.data.token)
          window.location.reload();
        } else {
          setShowAlert(true);
          setAlertMessage(responseData.createUser.status.message);
          setAlertType("warning");
        }
      } catch (error) {
        setShowAlert(true);
        setAlertType("error");
        setAlertMessage(error.message);
        // console.log(error);
      }
    }
  }

  function handleChangeGender(event) {
    setGender(event.target.value);
  }

  function handleChangeFirstname(event) {
    setfirstName(event.target.value);
  }
  function handleChangeLastname(event) {
    setlastName(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleChangeconfirmPassword(event) {
    setconfirmPassword(event.target.value);
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
      {/* <Container maxWidth="xl"> */}
      <Grid container>
        <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
        <Grid item xs={12} lg={6}>
          <Box className="sign-box">
            <Box component="form" onSubmit={handleSubmitForm} className="signin-form">
              <Box className="signin-box-text">
                <Typography color="white" variant="h4">
                  <strong>Sign Up</strong>
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
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <CssTextField
                    size="small"
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    id="firstName"
                    onChange={handleChangeFirstname}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <CssTextField
                    size="small"
                    type="text"
                    name="lastName"
                    value={lastName}
                    id="lastName"
                    onChange={handleChangeLastname}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <CssTextField
                size="small"
                required
                type="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <CssTextField
                size="small"
                required
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
              <CssTextField
                size="small"
                required
                name="confirmPassword"
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={handleChangeconfirmPassword}
                id="confirmPassword"
                label="Confirm Password"
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

              <FormControl requird className="gender-card" fullWidth>
                <RadioGroup required
                  className="gender-card-radio"
                  value={gender}
                  id="gender"
                  onChange={handleChangeGender}
                  row
                  aria-labelledby="gender-input"
                  name="gender"
                >
                  <FormControlLabel
                    sx={{ backgroundImage: `url(${female})` }}
                    value="FEMALE"
                    control={<Radio className="my-radio-gender" />}
                    label="Female"
                  />
                  <FormControlLabel
                    sx={{ backgroundImage: `url(${male})` }}
                    value="MALE"
                    control={<Radio className="my-radio-gender" />}
                    label="Male"
                  />
                  <FormControlLabel
                    sx={{ backgroundImage: `url(${other})` }}
                    value="OTHER"
                    control={<Radio className="my-radio-gender" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                sx={{ borderRadius: "30px", padding: "13px", textTransform: "capitalize" }}
                fullWidth
                color="primary"
                variant="contained"
              >
                Sign Up
              </Button>
              <Typography textAlign="center" color="white" variant="subtitle1" gutterBottom>
                Already have account{" "}
                <Link to="/Login" className="signin-link">
                  <strong> Log In? </strong>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="signin-background-image"></Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};
export default Signup;
