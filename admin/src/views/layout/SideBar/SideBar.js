import { Box, Icon, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FactoryIcon from '@mui/icons-material/Factory';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


const pages = [
    {
        title: 'Dashboard',
        id: 'home',
        link: '#',
        icon: <DashboardIcon fontSize="small" />
    },
    {
        title: 'Commodities',
        id: 'commodities',
        link: '#',
        icon: <CategoryIcon fontSize="small" />
    },
    {
        title: 'Orders',
        id: 'order',
        link: '#',
        icon: <ShoppingCartIcon fontSize="small" />
    },
    {
        title: 'Manufacturer',
        id: 'manufacture',
        link: '#',
        icon: <FactoryIcon fontSize="small" />
    },
    {
        title: 'Payments',
        id: 'payment',
        link: '#',
        icon: <PaymentsIcon fontSize="small" />
    },
    {
        title: 'Customers',
        id: 'customer',
        link: '#',
        icon: <PersonIcon fontSize="small" />
    }

];

function SideBar(props) {
    const {sidebarOpen} = props;
    return (
        <Box height='100%' display='flex' flexDirection='column' justifyContent='space-between' alignItems={sidebarOpen?'flex-start':'center'}>
           
            <Box >
                {pages.map((navItem) => {
                    return (

                        <MenuItem key={navItem.id} sx={{ gap: '10px' }}>

                            {navItem.icon}

                           {sidebarOpen&&<Typography>{navItem.title}</Typography>}
                        </MenuItem>
                    )
                })}
            </Box>
            <Box mb='15px'>

                <MenuItem sx={{gap:"10px"}}>
                    <LogoutIcon fontSize="small"/>
                    {sidebarOpen? <Typography>Logout</Typography>:null}
                </MenuItem>
            </Box>

        </Box>
    )
}
export default SideBar;