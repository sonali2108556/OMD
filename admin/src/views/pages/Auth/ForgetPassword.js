import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { GRAPH_URL } from "../../../config";
import axios from "axios";
import Alert from "../../shared/Alert";
import { setToken, getToken, removeToken } from "../../../config";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";


var inputStyle = {
    ' .MuiInputLabel-root': {
        color: 'white !important',
    },
    ' .MuiInput-input': {
        color: 'white'
    },



}

function ForgetPassword() {

    const [email, setEmail] = useState("");
   
    const [alertType, setAlertType] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowAlert(false);
        setAlertMessage("");
    };


    async function handleForgetForm() {

        const formData = {
            email: email,
            
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
            console.log(response.data);

            //const responseData = response.data.data;

            // if (responseData && responseData.loginUser.status.message) {
            //     setShowAlert(true);
            //     setAlertType("success");
            //     setAlertMessage(responseData.loginUser.status.message);

            // }
            // else {
            //     setShowAlert(true);
            //     setAlertMessage(responseData.loginUser.status.message);
            //     setAlertType("warning");
            // }

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
   
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function handleClick () {
          navigate('/auth');
      }

    return (
        <Box>
            <Alert message={alertMessage} show={showAlert} type={alertType} handleClose={handleClose}></Alert>

            <Box component="form" onSubmit={handleForgetForm}>
                <Typography textAlign='center' variant="h4"><strong>Forget Password </strong></Typography>
                <Box sx={{ marginY: '25px', }} >
                    <TextField size="small"
                        onChange={handleChangeEmail}
                        id="outlined-basic"
                        value={email}
                        label="Email" variant="standard" sx={inputStyle} fullWidth required />
                </Box>

                <Box>
                    <Button type="submit" sx={{ borderRadius: '40px', py: '10px' }} size="small" variant="contained" fullWidth>Forget</Button>
                </Box>

            </Box>
        </Box>
    )
}
export default ForgetPassword;