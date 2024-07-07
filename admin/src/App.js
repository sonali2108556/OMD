
import './App.css';
import { Box, Typography } from '@mui/material';
import MainLayout from "./views/layout/MainLayout";
import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/pages/Dashboard/Dashboard';

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Dashboard/>}></Route>
        </Route>
      </Routes>


    </Box>

  )
}

export default App;
