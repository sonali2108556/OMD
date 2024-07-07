import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";


const pages = [
    {
        title: 'Dashboard',
        id: 'home',
        link: '#'
    },
    {
        title: 'Commodities',
        id: 'commodities',
        link: '#'
    },
    {
        title: 'Orders',
        id: 'order',
        link: '#'
    },
    {
        title: 'Manufacturer',
        id: 'manufacture',
        link: '#'
    },
    {
        title: 'Payments',
        id: 'payment',
        link: '#'
    },
    {
        title: 'Customers',
        id: 'customer',
        link: '#'
    }

];

function SideBar() {
    return (
        <Box height='100%' display='flex' flexDirection='column' justifyContent='space-between' >
            {/* <Typography>hello</Typography> */}
            <Box>
                {pages.map((navItem) => {
                    return (
                        <MenuItem key={navItem.id}>
                            <Typography>{navItem.title}</Typography>
                        </MenuItem>
                    )
                })}
            </Box>
            <Box>
                <MenuItem>Logout</MenuItem>
            </Box>

        </Box>
    )
}
export default SideBar;