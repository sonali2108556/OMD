import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Box>
      <Box className="Footer">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
              <Typography className="footer-item">My Pharmacy</Typography>

              <Typography className="footer-style" component={Link} to="/">Home</Typography>
              <Typography className="footer-style" component={Link} to="/commodities/list">Medications</Typography>
              <Typography className="footer-style" component={Link} to="/contact">Support</Typography>
              <Typography className="footer-style" component={Link} to="/">FAQs</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography className="footer-item">Address</Typography>

              <Typography className="footer-style">Lalru, Ambala Chandigarh Expy</Typography>
              <Typography className="footer-style">Dera Bassi, Punjab</Typography>
              <Typography className="footer-style">140501</Typography>
              <Typography className="footer-style" component="a" href="tel:+911800242456">+91-1800-242456</Typography>
            </Grid>

            <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "end" }}>
              <Typography className="footer-item">More Info</Typography>

              <Typography className="footer-style" component={Link} to="/contact">Contact Us</Typography>
              <Typography className="footer-style" component={Link} to="/about">About Us</Typography>
              <Typography className="footer-style" component={Link} to="/">Privacy</Typography>
              <Typography className="footer-style" component={Link} to="/">Disclaimer</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="footer-last">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" gap={3} paddingY="20px" flexWrap="wrap">
            <Typography variant="body2" color="white">
              @ 2024 My Pharmacy | All rights reserved
            </Typography>
            <Box display="flex" justifyContent="center" gap={5}>
              <Typography variant="body2" color="white">
                Privacy
              </Typography>
              <Typography variant="body2" color="white">
                Terms
              </Typography>
              <Typography variant="body2" color="white">
                Disclaimer
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
