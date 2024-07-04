import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Section4(props) {
  return (
    <Box className="section-3-video">
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Typography variant="h5" sx={{ textAlign: "center", marginTop: "50px", color: "#22334D" }}>
            <strong>Pharmacy Has Never Been This Easy</strong>
          </Typography>
          <Box width={400} className="section3-heading"></Box>
        </Box>

        <Grid container spacing={2} marginBottom="20px">
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" sx={{ gap: 1, paddingBottom: "25px" }}>
              <Box>
                <Avatar sx={{ color: "secondary", marginTop: "20px" }} alt="Management" src="/broken-image.jpg" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Seamless Prescription Management
                </Typography>

                <Typography variant="body2">
                  Easily manage prescriptions by uploading them to our platform, with quick and efficient delivery to
                  your doorstep.
                </Typography>
              </Box>
            </Box>
            <Box display="flex" sx={{ gap: 1, paddingBottom: "25px" }}>
              <Box>
                <Avatar sx={{ color: "secondary", marginTop: "20px" }} alt="Saving" src="/broken-image.jpg" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Saving made simple
                </Typography>
                <Typography variant="body2">
                  Save money on your prescriptions with competitive pricing, exclusive discounts, and special offers on
                  high-quality medications.
                </Typography>
              </Box>
            </Box>
            <Box display="flex" sx={{ gap: 1, paddingBottom: "25px" }}>
              <Box>
                <Avatar sx={{ color: "secondary", marginTop: "20px" }} alt="Care" src="/broken-image.jpg" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Personalized Care Solutions
                </Typography>
                <Typography variant="body2">
                  Receive tailored healthcare recommendations and medication management tips based on your unique health
                  needs.
                </Typography>
              </Box>
            </Box>
            <Button
              className="btn-learnMore"
              type="button"
              size="small"
              variant="contained"
              component={Link}
              to="/about"
            >
              Learn More
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="section-3-image"></Box>
            <Typography variant="h6" sx={{ fontWeight: 800, marginBottom: "50px" }}>
              Learn more about My Pharmacy
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
