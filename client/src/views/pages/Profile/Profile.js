import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import male from "../../../asset/images/male.webp";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { GRAPH_URL, getToken, removeToken, setToken } from "../../../config";
import axios from "axios";
import moment from "moment";
import {
  AddLocationOutlined,
  CreditCardOutlined,
  HelpOutline,
  LogoutOutlined,
  PersonOutline,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Alert from "../../components/Alert";

const Profile = (props) => {
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [id, setId] = React.useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const userByMe = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "query UserByMe {\n  userByMe {\n    data {\n      avatar\n      dob\n      email\n      firstName\n      gender\n      id\n      lastName\n      phone\n    }\n    status {\n      message\n      success\n      type\n      code\n    }\n  }\n}",
    };

    try {
      const response = await axios.post(GRAPH_URL, data, config);
      // console.log(response.data);
      const temp = response.data.data;

      if (temp.userByMe.status.success) {
        setFirstName(temp.userByMe.data.firstName);
        setLastName(temp.userByMe.data.lastName);
        setEmail(temp.userByMe.data.email);
        setPhone(temp.userByMe.data.phone);
        setDob(temp.userByMe.data.dob);
        setGender(temp.userByMe.data.gender);
        setId(temp.userByMe.data.id);

      } else {
        setShowAlert(true);
        setAlertMessage(temp.userByMe.status.message);
        setAlertType("warning");
        // console.error(temp.userByMe.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };
  useEffect(() => {
    userByMe();
  }, []);

  const updateUser = async (formData) => {
    const config = {
      headers: {
        "content-type": "application/json",
        'Authorization': "Bearer " + getToken(),
      },
    };
    const data = {
      query:
        "mutation UpdateUser($newData: UpdateUser) {\n  updateUser(newData: $newData) {\n    data {\n      email\n      firstName\n      gender\n      id\n      lastName\n      phone\n      dob\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}",
      variables: {
        newData: {
          dob: formData.dob,
          firstName: formData.firstName,
          gender: formData.gender,
          lastName: formData.lastName,
          phone: formData.phone,
          id: id,
        },
      },
    };

    try {
      const apiResponse = await axios.post(GRAPH_URL, data, config);
      // console.log(apiResponse.data);
      const temp = apiResponse.data.data;

     

      if (temp.updateUser.status.success) {
        setFirstName(temp.updateUser.data.firstName);
        setLastName(temp.updateUser.data.lastName);
        setEmail(temp.updateUser.data.email);
        setPhone(temp.updateUser.data.phone);
        setDob(temp.updateUser.data.dob);
        setGender(temp.updateUser.data.gender);
        setId(temp.updateUser.data.id);
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage(temp.updateUser.status.message);
        
      } else {
        setShowAlert(true);
        setAlertMessage(temp.updateUser.status.message);
        setAlertType("warning");
        console.error(temp.updateUser.status);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(error.message);
      // console.log(error);
    }
  };

  async function handleSubmitForm(event) {
    event.preventDefault();
    const formData = {
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: moment(dob).format('L'),
    };
    updateUser(formData);
  }
  function handleChangeFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleChangeLastName(event) {
    setLastName(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePhone(event) {
    setPhone(event.target.value);
  }
  function handleChangeDob(event) {
    // console.log(event.target.value);
    setDob(event.target.value);
  }
  function handleChangeGender(event) {
    setGender(event.target.value);
  }
  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <Box marginTop="100px">
      <Box>
        <Container maxWidth="xl">
          <Grid container>
          <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>
            <Grid item xs={12} md={3}>
              <Box className="section1-menu-item">
                <Box>
                  <MenuItem onClick={() => navigate("/my//profile")}>
                    <PersonOutline fontSize="small" />
                    &nbsp;My Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/my/orders")}>
                    <ShoppingBagOutlined fontSize="small" />
                    &nbsp;Orders
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/my/cart")}>
                    <ShoppingCartOutlined fontSize="small" />
                    &nbsp;Cart
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/contact")}>
                    <HelpOutline fontSize="small" />
                    &nbsp;Help & Support
                  </MenuItem>
                  <MenuItem>
                    <CreditCardOutlined fontSize="small" />
                    &nbsp;Saved Payments
                  </MenuItem>
                  <MenuItem>
                    <AddLocationOutlined fontSize="small" />
                    &nbsp;Saved Address
                  </MenuItem>
                </Box>
                <Box>
                  <Button
                    startIcon={<LogoutOutlined />}
                    variant="outlined"
                    className="omd-button-outlined"
                    fullWidth
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box
                component="form"
                onSubmit={handleSubmitForm}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <Box display="flex" alignItems="baseline">
                    <Box className="profile-img">
                      <img src={male} width="100%" alt="male" />
                    </Box>
                    <span>
                      <CreateIcon />
                    </span>
                  </Box>
                </Box>
                <Box width={{ xs: "90%", md: "50%" }}>
                  <Box className="profile-textfield">
                    <TextField
                      id="outlined-name"
                      label="FirstName"
                      type="text"
                      value={firstName}
                      onChange={handleChangeFirstName}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box className="profile-textfield">
                    <TextField
                      id="outlined-name"
                      label="LastName"
                      type="text"
                      value={lastName}
                      onChange={handleChangeLastName}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>

                  <Box className="profile-textfield">
                    <TextField
                      id="outlined-email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                      variant="outlined"
                      size="small"
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box className="profile-textfield">
                    <TextField
                      id="outlined-phone"
                      label="Phone"
                      type="tel"
                      value={phone}
                      onChange={handleChangePhone}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box className="profile-textfield">
                    <TextField
                      id="outlined-phone"
                      label="DOB"
                      type="date"
                      value={moment(dob).format('YYYY-MM-DD')}
                      onChange={handleChangeDob}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>

                  <Box className="profile-textfield">
                    <FormControl size="small" fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender}
                        onChange={handleChangeGender}
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                    </FormControl>

                    <Button
                      className="save-button-profile"
                      type="submit"
                      sx={{}}
                      fullWidth
                      size="small"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
export default Profile;
