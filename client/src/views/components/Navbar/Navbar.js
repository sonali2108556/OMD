import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  ContactsOutlined,
  Google,
  HomeOutlined,
  LiveHelpOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/system";

import MenuIcon from "@mui/icons-material/Menu";
import male from "../../../asset/images/male.webp";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className="Navbar" position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Google sx={{ display: { xs: "none", md: "flex", color: "#22334D" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontweight: "800 ",
              letterSpacing: "1px",
              color: "#22334D",
              textDecoration: "none",
            }}
          >
            My Pharmacy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#22334D" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography color="#22334D" textAlign="center">
                  Home
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">How it works</Typography>
              </MenuItem>

              <MenuItem component={Link} to="/about" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About Us</Typography>
              </MenuItem>

              <MenuItem component={Link} to="/contact" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact Us</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Google sx={{ display: { xs: "flex", md: "none", color: "#22334D" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "1px",

              color: "#22334D",
              textDecoration: "none",
            }}
          >
            My Pharmacy
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "30px" },
            }}
          >
            <Button size="small"
              startIcon={<HomeOutlined />}
              component={Link}
              to="/"
              className="navButton"
              onClick={handleCloseNavMenu}
            >
              Home
            </Button>
            {user && (
              <>
                <Button size="small"
                  startIcon={<ShoppingCartOutlined />}
                  className="navButton"
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/my/cart"
                >
                  My Cart
                </Button>
                <Button size="small"
                  startIcon={<ShoppingBagOutlined />}
                  className="navButton"
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/my/orders"
                >
                  My Orders
                </Button>
              </>
            )}
            <Button size="small"
              startIcon={<LiveHelpOutlined />}
              component={Link}
              to="/about"
              className="navButton"
              onClick={handleCloseNavMenu}
            >
              About Us
            </Button>

            <Button size="small"
              startIcon={<ContactsOutlined />}
              component={Link}
              to="/contact"
              className="navButton"
              onClick={handleCloseNavMenu}
            >
              Contact Us
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open Profile">
                <IconButton size="small" component={Link} to="/my/profile" sx={{ p: 0 }}>
                  <Avatar alt={user.firstName} src="/user.png"/>
                </IconButton>
              </Tooltip>
            ) : (
              <Button size="small" variant="contained" className="omd-button" component={Link} to="/auth/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
