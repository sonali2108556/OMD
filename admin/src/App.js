
import './App.css';
import { Box, Typography } from '@mui/material';
import MainLayout from "./views/layout/MainLayout";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './views/pages/Dashboard/Dashboard';
import AuthLayout from './views/layout/AuthLayout';
import Login from './views/pages/Auth/Login';
import { GRAPH_URL } from './config';
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from './config';
import ForgetPassword from './views/pages/Auth/ForgetPassword';
import Commodities from './views/pages/commodities/Commodities';



function App() {

  const navigate = useNavigate("");
  async function handleLoginByUser(params) {

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };

    const data = {
      "query": "query UserByMe {\n  userByMe {\n    data {\n      email\n      firstName\n      avatar\n      gender\n      id\n      lastName\n      permissions\n      phone\n      role\n      token\n      username\n    }\n    status {\n      code\n      message\n      success\n      type\n    }\n  }\n}"
    }
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      console.log(response);
      let responseData = response.data.data;
      if (responseData.userByMe.status.success) {

        if (responseData.userByMe.data.role === 'ADMIN') {
          navigate("/");
        }
        else{
          navigate("/auth");
        }

      }
      else {
        navigate("/auth");
      }

    }
    catch (error) {
      navigate("/auth");
      
    }

  }
  useEffect(() => {
    handleLoginByUser();
  }, [])

  return (
    <Box>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Dashboard />}></Route>
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='/auth' element={<Login />}></Route>
          <Route path='/auth/forget' element={<ForgetPassword />}></Route>
        </Route>

        <Route path='commodities' element={<Commodities />}></Route>
      </Routes>


    </Box>

  )
}

export default App;
