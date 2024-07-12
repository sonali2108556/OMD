import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import profileimage from "../../../assets/male.webp";
import SearchBar from "./SearchBar";
import "./Header.css";
import {Link,useNavigate} from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import { removeToken } from "../../../config";

const settings = [
  {
    title: 'Account Settings',
    link: '#',
    id: 'account-setting'
  },
  {
    title: 'Notifications',
    link: '#',
    id: 'notification'
  },
  {
    title: 'Logout',
    link: '#',
    id: 'logout'
  }
];
function Header(props) {
  const { sideBarWidth, handleSideBar, sidebarOpen } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleClick(id) {
    if(id==="logout"){
      removeToken()
      navigate('/auth');
    }
  }

  return (

    <Box className="header">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box minWidth={sideBarWidth} maxWidth={sideBarWidth} >

          <Box textAlign={sidebarOpen ? 'left' : 'center'} p={sidebarOpen ? '17px' : 'auto'}>
            {sidebarOpen ? <Typography variant="h6" >LOGO</Typography> : <Typography variant="h6">LG</Typography>}
          </Box>


        </Box>

        <Box>
          <IconButton onClick={handleSideBar}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box>
          <SearchBar></SearchBar>
        </Box>
      </Box>



      <Box className="">

        <Tooltip title="Open Settings">
          <IconButton onClick={handleOpenUserMenu}>
            <img src={profileimage} className="profile-img"></img>
          </IconButton>
        </Tooltip>

        <Menu sx={{ mt: '45px' }}
          anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>

          {settings.map((settingProfile) => {
            return (
              <MenuItem key={settingProfile.id}
                onClick={handleCloseUserMenu} >

                <Typography>{settingProfile.title}</Typography>

                <Button type="button" onClick={()=> handleClick(settingProfile.id) }></Button>

              </MenuItem>)

          })}
        </Menu>

      </Box>
    </Box>



  );
}
export default Header;